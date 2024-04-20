<template>
  <v-dialog :model-value="show" rounded="lg" @update:model-value="closeDialog" scrollable max-width="700px">
     <v-card rounded="lg">
      <v-toolbar density="compact" color="#6984ff" hide-details>
        <v-toolbar-title>Departments. Warehouses</v-toolbar-title>
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
              item-title="description"
              item-value="id"
              label="Warehouse Group"
              :items="warehouse_group"
              v-model="data.warehouse_Group_Id"
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
          height="50vh"
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

      <!-- <v-toolbar density="compact" color="#6984ff" hide-details>
          <v-toolbar-title>Departments. Warehouses</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-btn color="white" @click="closeDialog">
              <v-icon>mdi-close</v-icon>
          </v-btn>
      </v-toolbar>
      <v-card>
          <v-card-title>
              <v-spacer></v-spacer>
              <v-text-field
                  label="Search by Description"
                  rounded
                  hide-details
                  density="compact"
                  variant="outlined"
                  prepend-inner-icon="mdi-magnify"
              >
              </v-text-field>
          </v-card-title>
          <v-card-text>
            <v-data-table density="compact" height="60vh" :headers="headers" :items="data" hide-details>
                <template v-slot:item="{ item }">
                    <tr>
                        <td>
                          <v-btn
                            size="small"
                            density="compact"
                            color="primary"
                            icon="mdi-link-circle-outline"
                            @click="openSectionsDialog"
                          >
                          </v-btn>
                        </td>
                        <td>{{ item.code }}</td>
                        <td>{{ item.description }}</td>
                        <td>{{ item.code }}</td>
                        <td>{{ item.description }}</td>
                        <td>
                            <v-icon color="green mr-3" @click="onEdit">mdi-pencil</v-icon>
                            <v-icon color="red" @click="onDelete">mdi-trash-can</v-icon>
                        </td>
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
  <department-warehouses-form :payload="payload" :branch="branch" :warehouse_group="warehouse_group" :open_form_dialog="open_form_dialog" @close-dialog="closeFormDialog" @handle-submit="onSubmit" />
  <sections-dialog :open_sections_dialog="open_sections_dialog" @close-dialog="closeSectionsDialog" />
<deleteConfirmation  :show="confirmation" @confirm="confirm" @close="closeconfirmation" />>
</template>

<script setup>
import DepartmentWarehousesForm from './sub-forms/DepartmentWarehousesForm.vue';
import SectionsDialog from './sub-forms/SectionsDialog.vue';
import nuxtStorage from "nuxt-storage";
const itemCategories = JSON.parse(nuxtStorage.localStorage.getData("items-group")) || [];
const branch = JSON.parse(nuxtStorage.localStorage.getData("branches")) || [];
const warehouse_group = ref([]);
const props = defineProps({
  show: {
      type: Boolean,
      default: () => false,
      required: true,
  },
})

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
  { title: "Description", key: "warehouse_description", align: "start", width: "60%" },
  { title: "", key: "actions", align: "start" },
];
const data = ref({
  title: "List of Unit",
  keyword: "",
  warehouse_Group_Id: parseInt(2),
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
  getwarehouseGroup();
};
const loadItems = async (page = null, itemsPerPage = null, sortBy = null) => {
  data.value.loading = true;
  let pageno = page || 1;
  let itemPerpageno = itemsPerPage || 10;
  let warehouse_group  = data.value.warehouse_Group_Id || '';
  let params =
    "page=" + pageno + "&per_page=" + itemPerpageno + "&keyword=" + data.value.keyword+ "&warehouse_Group_Id=" + warehouse_group;
  const response = await useMethod("get", "get-warehouse?", "", params);
  if (response) {
    serverItems.value = response.warehouse.data;
    totalItems.value = response.warehouse.total;
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
  payload.value.warehouse_Group_Id = parseInt(item.warehouse_Group_Id);
  payload.value.warehouse_Branch_Id = parseInt(item.warehouse_Branch_Id);
  payload.value.isHemodialysis = item.isHemodialysis == 1 ? true : false;
  payload.value.isPeritoneal = item.isPeritoneal == 1 ? true : false;
  payload.value.isLINAC = item.isLINAC == 1 ? true : false;
  payload.value.isCOBALT = item.isCOBALT == 1 ? true : false;
  payload.value.isChemotherapy = item.isChemotherapy == 1 ? true : false;
  payload.value.isBrachytherapy = item.isBrachytherapy == 1 ? true : false;
  payload.value.isDebridement = item.isDebridement == 1 ? true : false;
  payload.value.isTBDots = item.isTBDots == 1 ? true : false;
  payload.value.isPAD = item.isPAD == 1 ? true : false;
  payload.value.isRadioTherapy = item.isRadioTherapy == 1 ? true : false;
  payload.value.isWarehouse = item.isWarehouse == 1 ? true : false;
  payload.value.isDispensing = item.isDispensing == 1 ? true : false;
  payload.value.isPurchasing = item.isPurchasing == 1 ? true : false;
  payload.value.isAllowedRR = item.isAllowedRR == 1 ? true : false;
  payload.value.isActive = item.isActive == 1 ? true : false;
};

const getwarehouseGroup = async()=>{
  if(warehouse_group.value.length > 0) return;
   const response = await useMethod("get", "get-warehouse-list", "","");
    if (response) {
      warehouse_group.value = response.data;
    }
}

const onSubmit = async (payload) => {
  let response;
  isloading.value = true;
  if (payload.id) {
    response = await useMethod("put", "update-warehouse", payload, "", payload.id);
  } else {
    response = await useMethod("post", "create-warehouse", payload);
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
      "delete-warehouse",
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


const open_sections_dialog = ref(false) 
const confirmationDialog  = ref(false)


const openSectionsDialog = () => {
  open_sections_dialog.value = true;
}

const closeSectionsDialog = () => {
  open_sections_dialog.value = false;
}

const confirmDelete = () => {
  confirmationDialog.value = false;
}

</script>

<style scoped>
</style>