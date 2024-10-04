<template>
  <v-dialog :model-value="show" rounded="lg" @update:model-value="closeDialog"  scrollable max-width="750px">
    <v-card rounded="lg">
      <v-toolbar density="compact" color="#107bac" hide-details>
        <v-toolbar-title>Item Categories</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn color="white" @click="closeDialog">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-toolbar>
      <v-divider></v-divider>
      <v-card-text>
        <v-row>
          <v-col cols="5">
            <v-autocomplete
              item-title="name"
              item-value="id"
              label="Item Group"
              :items="itemCategories"
              v-model="data.item_group_id"
              @update:model-value="search"
              hide-details
              density="compact"
              variant="outlined"
              clearable
            ></v-autocomplete>
          </v-col>
          <v-col cols="7">
            <v-text-field
              label="Search by Description"
              density="compact"
              v-model="data.keyword"
              variant="outlined"
              @keyup.enter="search"
              prepend-inner-icon="mdi-magnify"
            >
            </v-text-field>
          </v-col>
        </v-row>
        <v-divider></v-divider>
        <v-data-table-server
          class="animated animatedFadeInUp fadeInUp"
          v-model:items-per-page="itemsPerPage"
          :headers="headers"
          :items="serverItems"
          :items-length="totalItems"
          :loading="data.loading"
          item-value="id"
          :hover="true"
          @update:options="initialize"
          show-select
          select-strategy="single"
          fixed-header
          density="compact"
          height="60vh"
        >
          <template
            v-for="(head, index) of headers"
            v-slot:[`item.${head.value}`]="props"
          >
            <td class="test" :props="props" :key="index">
              <slot :name="head.value" :item="props.item">
                {{ props.item[head.value] || "..." }}
              </slot>
            </td>
          </template>
          <template v-slot:item.isactive="{ item }">
            {{ item.isactive == 1 ? "Active" : "In-active" }}
          </template>
          <template v-slot:item.actions="{ item }">
            <v-icon color="green mr-3" @click="onEdit(item)">mdi-pencil</v-icon>
            <v-icon color="red" @click="onDelete(item)">mdi-trash-can</v-icon>
          </template>
        </v-data-table-server>
      </v-card-text>
      <v-divider></v-divider>
      <v-card-actions>
        <v-btn color="blue-darken-1 border border-info" @click="closeDialog"> Close </v-btn>
        <v-spacer></v-spacer>
        <v-btn class="bg-primary text-white" type="submit" @click="openFormDialog"
          >Add</v-btn
        >
      </v-card-actions>
    </v-card>

    <!-- <v-toolbar density="compact" color="#107bac" hide-details>
        <v-toolbar-title>Item Categories</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn color="white" @click="closeDialog">
            <v-icon>mdi-close</v-icon>
        </v-btn>
    </v-toolbar>
    <v-card>
        <v-card-title>
            <v-row>
                <v-col cols="6">
                    <v-text-field
                        label="Search by Description"
                        rounded
                        hide-details
                        density="compact"
                        variant="outlined"
                        prepend-inner-icon="mdi-magnify"
                    >
                    </v-text-field>
                </v-col>
                <v-col cols="6">
                    <v-autocomplete
                        item-title="section"
                        item-value="id"
                        label="Choose a Category"
                        :items="itemCategories" 
                        hide-details
                        density="compact"
                        variant="outlined"
                    ></v-autocomplete>
                </v-col>
            </v-row>
        </v-card-title>
        <v-card-text>
            <v-data-table density="compact" height="60vh" :headers="headers" :items="data">
                <template v-slot:item="{ item }">
                    <tr>
                        <td>{{ item.description }}</td>
                        <td>{{ item.inpatient_sales }}</td>
                        <td>{{ item.outpatient_sales }}</td>
                        <td>{{ item.emergency_sales }}</td>
                        <td>{{ item.inpatient_ocd }}</td>
                        <td>{{ item.outpatient_ocd }}</td>
                        <td>{{ item.emergency_ocd }}</td>
                        <td>{{ item.inventory }}</td>
                        <td>{{ item.reader_fees }}</td>
                        <td>{{ item.expenses }}</td>
                    </tr>
                </template>
                <template #bottom></template>
            </v-data-table>
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions>
            <v-btn color="blue-darken-1 border border-info" @click="closeDialog"> Close </v-btn>
            <v-spacer></v-spacer>
            <v-btn class="bg-primary text-white" type="submit" @click="openFormDialog">Add</v-btn>
        </v-card-actions>
    </v-card> -->
  </v-dialog>
  
  <item-categories-form
    :payload="payload"
    :itemCategories="itemCategories"
    :open_form_dialog="open_form_dialog"
    @close-dialog="closeFormDialog"
    @handle-submit="onSubmit"
  />
   <deleteConfirmation  :show="confirmation" @confirm="confirm" @close="closeconfirmation" />
</template>

<script setup>
import ItemCategoriesForm from "./sub-form/ItemCategoriesForm.vue";

import nuxtStorage from "nuxt-storage";
// const itemCategories = JSON.parse(nuxtStorage.localStorage.getData("items-group")) || [];
const props = defineProps({
  show: {
    type: Boolean,
    default: () => false,
    required: true,
  },
});
const emits = defineEmits(["close-dialog"]);
const confirmation = ref(false);
const payload = ref({});
const isloading = ref(false);
const open_form_dialog = ref(false);
const headers = [
  {
    title: "code",
    align: "start",
    sortable: false,
    key: "id",
  },
  { title: "Description", key: "name", align: "start", width: "60%" },
  { title: "", key: "actions", align: "start" },
];
const data = ref({
  title: "List of Unit",
  keyword: "",
  item_group_id: parseInt(1),
  loading: false,
  filter: {},
  tab: 0,
  param_tab: 1,
});
const itemsPerPage = ref(10);
const totalItems = ref(0);
const serverItems = ref([]);
const initialize = ({ page, itemsPerPage, sortBy }) => {
  loadItems(page, itemsPerPage, sortBy);
};
const loadItems = async (page = null, itemsPerPage = null, sortBy = null) => {
  data.value.loading = true;
  let pageno = page || 1;
  let itemPerpageno = itemsPerPage || 10;
  let inv_group  = data.value.item_group_id || '';
  let params =
    "page=" + pageno + "&per_page=" + itemPerpageno + "&keyword=" + data.value.keyword+ "&invgroup_id=" + inv_group;
  const response = await useMethod("get", "get-categories?", "", params);
  if (response) {
    serverItems.value = response.data;
    totalItems.value = response.total;
    data.value.loading = false;
  }
};
const search = () => {
  loadItems();
};

const openFormDialog = () => {
  payload.value = Object.assign({});
  open_form_dialog.value = true;
};

const closeFormDialog = () => {
  payload.value = Object.assign({});
  open_form_dialog.value = false;
};

const onEdit = (item) => {
  openFormDialog();
  payload.value = Object.assign({});
  payload.value = Object.assign({}, item);
  payload.value.invgroup_id = parseInt(item.invgroup_id);
  payload.value.isactive = item.isactive == 1 ? true : false;
};

const onSubmit = async (payload) => {
  let response;
  isloading.value = true;
  if (payload.id) {
    response = await useMethod("put", "update-category", payload, "", payload.id);
  } else {
    response = await useMethod("post", "create-category", payload);
  }
  if (response) {
    useSnackbar(true, "green", response.msg);
    loadItems();
    closeFormDialog();
    payload.value = Object.assign({});
    isloading.value = false;
  }
};
const confirm = async () => {
  if (payload.value.id) {
    let response = await useMethod(
      "delete",
      "delete-category",
      payload.value,
      "",
      payload.value.id
    );
    if (response) {
      confirmation.value = false;
      useSnackbar(true, "green", response.msg);
      loadItems();
      closeFormDialog();
      payload.value = Object.assign({});
      isloading.value = false;
    }
  }
};
const closeconfirmation = () => {
  confirmation.value = false;
};
const onDelete = (item) => {
  payload.value = Object.assign({});
  payload.value = Object.assign({}, item);
  confirmation.value = true;
};
const closeDialog = () => {
  emits("close-dialog");
};

// const open_form_dialog = ref(false)

// const headers = [
//   {
//       title: "Description",
//       align: "start",
//       sortable: true,
//   },
//   {
//       title: "Inpatient Sales",
//       align: "start",
//       sortable: false,
//   },
//   {
//       title: "Outpatient Sales",
//       align: "start",
//       sortable: false,
//   },
//   {
//       title: "Emergency Sales",
//       align: "start",
//       sortable: true,
//   },
//   {
//       title: "Inpatient Cost of Sales",
//       align: "start",
//       sortable: true,
//   },
//   {
//       title: "Outpatient Cost of Sales",
//       align: "start",
//       sortable: true,
//   },
//   {
//       title: "Emergency Cost of Sales",
//       align: "start",
//       sortable: true,
//   },
//   {
//       title: "Inventory",
//       align: "start",
//       sortable: true,
//   },
//   {
//       title: "Reader Fees",
//       align: "start",
//       sortable: true,
//   },
//   {
//       title: "Expenses",
//       align: "start",
//       sortable: true,
//   },
// ];

// // const data = [
//   {
//     description: "TEST description",
//     inpatient_sales: "SALES IPD",
//     outpatient_sales: "SALES OPD",
//     emergency_sales: "SALES ERD",
//     inpatient_ocd: "Cost of Sales IPD",
//     outpatient_ocd: "Cost of Sales OPD",
//     emergency_ocd: "Cost of Sales ERD",
//     inventory: "INVENTORY",
//     reader_fees: "",
//     expenses: "",
//   },
//   {
//     description: "TEST description",
//     inpatient_sales: "SALES IPD",
//     outpatient_sales: "SALES OPD",
//     emergency_sales: "SALES ERD",
//     inpatient_ocd: "Cost of Sales IPD",
//     outpatient_ocd: "Cost of Sales OPD",
//     emergency_ocd: "Cost of Sales ERD",
//     inventory: "INVENTORY",
//     reader_fees: "",
//     expenses: "",
//   }
// // ];
</script>

<style scoped></style>
