<template>
  <v-dialog :model-value="show" rounded="lg" @update:model-value="closeDialog"  scrollable max-width="750px">
    <v-card rounded="lg">
      <v-toolbar density="compact" color="#107bac" hide-details>
        <v-toolbar-title>Diet Type</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn color="white" @click="closeDialog">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-toolbar>
      <v-divider></v-divider>
      <v-card-text>
        <v-text-field
          label="Search by Description"
          density="compact"
          variant="outlined"
          prepend-inner-icon="mdi-magnify"
          clearable
          v-model="data.keyword"
          @keyup.enter="search"
        >
        </v-text-field>
        <v-divider></v-divider>
        <v-data-table-server
          class="animated animatedFadeInUp fadeInUp"
          v-model:items-per-page="itemsPerPage"
          :headers="headers"
          :items="serverItems"
          :items-length="reset_indicator ? 0 : totalItems"
          :loading="data.loading"
          item-value="id"
          :hover="true"
          @update:options="initialize"
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
              <v-chip color="green" v-if="item.isactive == 1">Active</v-chip>
              <v-chip color="red" v-else>Inactive</v-chip>
          </template>
          <template v-slot:item.actions="{ item }">
              <v-icon color="green mr-2" @click="onEdit(item)">mdi-pencil</v-icon>
              <v-icon color="red mr-2" @click="onDelete(item)">mdi-trash-can</v-icon>
          </template>
        </v-data-table-server>
      </v-card-text>
      <v-divider></v-divider>
      <v-card-actions>
        <v-btn color="blue-darken-1 border border-info" @click="closeDialog"> Close </v-btn>
        <v-spacer></v-spacer>
        <v-btn class="bg-primary text-white" type="submit" @click="openForm"
          >Add</v-btn
        >
      </v-card-actions>
    </v-card>
  </v-dialog>

  <v-dialog
    :model-value="open_form_dialog"
    rounded="lg"
    @update:model-value="closeForm"
    scrollable
    max-width="600px"
  >
    <form @submit.prevent="onSubmit">
      <v-card rounded="lg">
        <v-toolbar density="compact" color="#107bac" hide-details>
          <v-toolbar-title>Diet Type Details</v-toolbar-title>
          <v-btn color="white" @click="closeForm">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-toolbar>
        <v-divider></v-divider>
        <v-card-text>
          <v-row>
              <v-col cols="12">
                <v-textarea
                  variant="outlined"
                  density="compact"
                  label="Description"
                  placeholder="Enter Description"
                  required
                  v-model="payload.description"
                  clearable
                  hide-details
                ></v-textarea>
              </v-col>
              <v-col cols="12" class="form-col">
                <v-checkbox label="Status" density="compact" hide-details v-model="payload.isactive"></v-checkbox>
              </v-col>
          </v-row>
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions>
          <v-btn color="blue-darken-1 border border-info" @click="closeForm"> Close </v-btn>
          <v-spacer></v-spacer>
          <v-btn class="bg-primary text-white" type="submit">Submit</v-btn>
        </v-card-actions>
      </v-card>
    </form>
  </v-dialog>
  
  <deleteConfirmation
    :show="confirmation"
    @confirm="confirm"
    @close="closeconfirmation"
  />
</template>

<script setup>
const props = defineProps({
  show: {
    type: Boolean,
    default: () => false,
    required: true,
  },
});

const confirmation = ref(false);
const emits = defineEmits(["close-dialog"]);
const payload = ref({});
const isloading = ref(false);
const open_form_dialog = ref(false);
const headers = [
  {
    title: "Code",
    align: "start",
    sortable: false,
    key: "id",
  },
  { title: "Description", key: "description", align: "start", width: "60%" },
  { title: "Status", key: "isactive", align: "start", width: "10%" },
  { title: "", key: "actions", align: "start", width: "20%" },
];
const data = ref({
  title: "List of Diet Types",
  keyword: "",
  loading: false,
  filter: {},
  tab: 0,
  param_tab: 1,
});

const itemsPerPage = ref(15);
const totalItems = ref(0);
const serverItems = ref([]);
const default_page = ref(1);
const reset_indicator = ref(false);
const initialize = ({ page, itemsPerPage, sortBy }) => {
  loadItems(page, itemsPerPage, sortBy);
};
const loadItems = async (page = null, itemsPerPage = null, sortBy = null) => {
  data.value.loading = true;
  let pageno = page || default_page.value;
  let itemPerpageno = itemsPerPage || 15;
  let params = "page=" +pageno + "&per_page=" + itemPerpageno + "&keyword=" + data.value.keyword;
  const response = await useMethod("get", "diet-type?", "", params);
  if (response) {
    serverItems.value = response.data;
    totalItems.value = response.total;
    data.value.loading = false;
  }
};
const search = () => {
  loadItems();
};

const openForm = () => {
  payload.value = Object.assign({});
  open_form_dialog.value = true;
};

const closeForm = () => {
  payload.value = Object.assign({});
  open_form_dialog.value = false;
  default_page.value = 1;
};

const onEdit = (item) => {
  openForm();
  payload.value = Object.assign({});
  payload.value = Object.assign({}, item);
  payload.value.isactive = item.isactive == 1 ? true : false;
};

const onSubmit = async () => {
  let response;
  isloading.value = true;
  if (payload.value.id) {
    response = await useMethod("put", "diet-type", payload.value, "", payload.value.id);
  } else {
    response = await useMethod("post", "diet-type", payload.value);
  }
  if (response) {
    useSnackbar(true, "green", response.msg);
    loadItems();
    closeForm();
    reset_indicator.value = true;
    payload.value = Object.assign({});
    default_page.value = 1;
    isloading.value = false;
    setTimeout(() => {
      reset_indicator.value = false;
    }, 100)
  }
};
const confirm = async () => {
  if(payload.value.id){
      let response = await useMethod("delete","diet-type", payload.value, "", payload.value.id);
      if(response) {
          confirmation.value = false;
          useSnackbar(true,"green",response.msg);
          loadItems();
          closeFormDialog();
          payload.value = Object.assign({});
          default_page.value = 1;
          isloading.value = false;
      }
  }
}

const closeconfirmation = () => {
  confirmation.value = false;
}
const onDelete = (item) => {
  payload.value = Object.assign({});
  payload.value = Object.assign({},item);
  confirmation.value = true;
}
const closeDialog = () => {
  emits("close-dialog");
};
</script>

<style scoped>
.form-col {
    margin-top: -16px !important;
}
</style>
