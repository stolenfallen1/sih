<template>
  <v-dialog :model-value="show" rounded="lg" @update:model-value="closeDialog"  scrollable max-width="980px">
    <v-card rounded="lg">
      <v-toolbar density="compact" color="#6984ff" hide-details>
        <v-toolbar-title>Zipcode Template</v-toolbar-title>
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
          :items-length="totalItems"
          :loading="data.loading"
          item-value="id"
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
          <template v-slot:item.region_code="{ item }">
            {{ item.regions ? item.regions.region_name :'' }}
          </template>
          <template v-slot:item.province_code="{ item }">
            {{ item.provinces ? item.provinces.province_name :'' }}
          </template>
          <template v-slot:item.municipality_code="{ item }">
            {{ item.muncipalities ? item.muncipalities.municipality_name :'' }}
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
        <v-toolbar density="compact" color="#6984ff" hide-details>
          <v-toolbar-title>Zipcode Details</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-btn color="white" @click="closeForm">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-toolbar>
        <v-divider></v-divider>

        <v-card-text>
          <v-row>
               <v-col cols="12">
                <v-autocomplete
                  :items="region_data"
                  item-title="region_name"
                  item-value="region_code"
                  density="compact"
                  variant="outlined"
                  hide-details
                  v-model="payload.region_code"
                  @update:model-value="getProvince"
                  label="Region"
                  :loading="region_loading"
                ></v-autocomplete>
              </v-col>
              <v-col cols="12">
                <v-autocomplete
                  :items="province_data"
                  item-title="province_name"
                  item-value="province_code"
                  density="compact"
                  variant="outlined"
                  hide-details
                  v-model="payload.province_code"
                  @update:model-value="getMunicipality"
                  label="Province"
                  :loading="province_loading"
                ></v-autocomplete>
              </v-col>
               <v-col cols="12">
                <v-autocomplete
                  label="Municipality"
                  variant="outlined"
                  :items="municipality_data"
                  item-title="municipality_name"
                  item-value="municipality_code"
                  density="compact"
                  hide-details
                  v-model="payload.municipality_code"
                  :loading="municipality_loading"
                ></v-autocomplete>
              </v-col>
               <v-col cols="12">
                <v-text-field
                  label="Zip Code"
                  variant="outlined"
                  density="compact"
                  v-model="payload.zip_code"
                  placeholder="Enter Zip code"
                  hide-details
                ></v-text-field>
              </v-col>
              <v-col cols="4">
                <v-checkbox
                  class="mt-0 mb-0"
                  hide-details
                  density="compact"
                  v-model="payload.isactive"
                  label="Status"
                ></v-checkbox>
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
    { title: "ID", key: "id", width: "5%" },
    { title: "Region", key: "region_code", width: "18%" },
    { title: "Province", key: "province_code", width: "18%" },
    { title: "Municipality", key: "municipality_code", width: "18%" },
    { title: "Zip Code", key: "zip_code", width: "18%" },
    { title: "Status", key: "isactive", width: "8%" },
    { title: '', key: 'actions', align: 'start', width: "15%" },
];

const data = ref({
  title: "List of zip-codes",
  keyword: "",
  loading: false,
  filter: {},
  tab: 0,
  param_tab: 1,
});

const itemsPerPage = ref(10);
const totalItems = ref(0);
const serverItems = ref([]);
const region_loading = ref(false);
const province_loading = ref(false);
const municipality_loading = ref(false);
let region_data = ref([]);
let province_data = ref([]);
let municipality_data = ref([]);
const initialize = ({ page, itemsPerPage, sortBy }) => {
  loadItems(page, itemsPerPage, sortBy);
};

const loadItems = async (page = null, itemsPerPage = null, sortBy = null) => {
  data.value.loading = true;
  let pageno = page || 1;
  let itemPerpageno = itemsPerPage || 10;
  let params =
    "page=" + pageno + "&per_page=" + itemPerpageno + "&keyword=" + data.value.keyword;
  const response = await useMethod("get", "zip-codes?", "", params);
  if (response) {
    serverItems.value = response.data;
    totalItems.value = response.total;
    data.value.loading = false;
  }
};

const getRegion = async () => {
  region_loading.value = true;
  const response = await useMethod("get", "get-regions", "", "");
  if (response) {
    region_data.value = response;
    region_loading.value = false;
  } 
};

const getProvince = async () => {
  province_loading.value = true;
  const response = await useMethod("get" , "get-province?region_code=" + payload.value.region_code, "" , "" );
  if (response) {
    province_data.value = response.data;
    province_loading.value = false;
  } 
  
};

const getMunicipality = async () => {
  municipality_loading.value = true;
  const params = "?region_code=" + payload.value.region_code + "&province_code=" + payload.value.province_code;
  const response = await useMethod("get", "get-municipality" + params, "", "");
  if (response) {
    municipality_data.value = response.data;
    municipality_loading.value = false;
  } 
};
const search = () => {
  loadItems();
};

const openForm = () => {
  payload.value = Object.assign({});
  getRegion();
  open_form_dialog.value = true;
};

const closeForm = () => {
  payload.value = Object.assign({});
  open_form_dialog.value = false;
};

const onEdit = (item) => {
  openForm();
  getRegion();
  payload.value = Object.assign({});
  payload.value = Object.assign({}, item);
  payload.value.isactive = item.isactive == 1 ? true : false;
};

const onSubmit = async () => {
  let response;
  isloading.value = true;
  
  if (payload.value.id) {
    response = await useMethod("put", "zip-codes", payload.value, "", payload.value.id);
  } else {
    response = await useMethod("post", "zip-codes", payload.value);
  }
  if (response) {
    useSnackbar(true, "green", response.msg);
    loadItems();
    closeForm();
    payload.value = Object.assign({});
    isloading.value = false;
  }
};
const confirm = async () => {
  if (payload.value.id) {
    let response = await useMethod(
      "delete",
      "zip-codes",
      payload.value,
      "",
      payload.value.id
    );
    if (response) {
      confirmation.value = false;
      useSnackbar(true, "green", response.msg);
      loadItems();
      closeForm();
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
</script>

<style scoped></style>
