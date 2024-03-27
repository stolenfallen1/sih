<template>
  <v-dialog :model-value="show" rounded="lg" @update:model-value="closeDialog" scrollable max-width="750px">
    <v-card rounded="lg">
      <v-toolbar density="compact" color="#6984ff" hide-details>
        <v-toolbar-title>Antibiotic Class</v-toolbar-title>
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
          <template v-slot:item.isActive="{ item }">
            {{ item.isActive == 1 ? "Active" : "In-active" }}
          </template>
          <template v-slot:item.actions="{ item }">
            <v-icon color="green mr-3" @click="onEdit(item)">mdi-pencil</v-icon>
            <v-icon color="red" @click="onDelete(item)">mdi-trash-can</v-icon>
          </template>
        </v-data-table-server>
      </v-card-text>
      <v-divider></v-divider>
      <v-card-actions>
        <v-btn color="blue-darken-1" @click="closeDialog"> Close </v-btn>
        <v-spacer></v-spacer>
        <v-btn class="bg-primary text-white" type="submit" @click="openForm"
          >Add</v-btn
        >
      </v-card-actions>
    </v-card>
  </v-dialog>

  <v-dialog
    :model-value="open_form_dialog"
    @update:model-value="closeForm"
    rounded="lg"
    scrollable
    max-width="600px"
  >
    <form @submit.prevent="onSubmit">
      <v-card rounded="lg">
        <v-toolbar density="compact" color="#6984ff" hide-details>
          <v-toolbar-title>Antibiotic Class Details</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-btn color="white" @click="closeForm">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-toolbar>
        <v-divider></v-divider>

        <v-card-text>
          <v-row>
            <v-col cols="4">
              <v-text-field
                label="Code"
                placeholder="Enter Code"
                hide-details
                v-model="payload.code"
                density="compact"
                variant="outlined"
              ></v-text-field>
            </v-col>
            <v-col cols="8">
              <v-text-field
                label="Antibiotic Name"
                placeholder="Enter Antibiotic name"
                hide-details
                v-model="payload.name"
                density="compact"
                variant="outlined"
                required
              ></v-text-field>
            </v-col>
            <v-col cols="4">
              <v-checkbox
                class="mt-0 mb-0"
                v-model="payload.isActive"
                hide-details
                density="compact"
                label="Is Active"
              ></v-checkbox>
            </v-col>
          </v-row>
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions>
          <v-btn color="blue-darken-1" @click="closeForm"> Close </v-btn>
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
  { title: "Code", key: "code", width: "5%" , align: "start"},
  { title: "Name", key: "name", width: "50%", align: "start" },
  { title: "Status", key: "isActive", width: "10%", align: "start" },
  { title: "", key: "actions", width: "15%", align: "start" },
];
const data = ref({
  title: "List of Antiboitic Class",
  keyword: "",
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
  let params =
    "page=" + pageno + "&per_page=" + itemPerpageno + "&keyword=" + data.value.keyword;
  const response = await useMethod("get", "get-antibiotic-class?", "", params);
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
};

const onEdit = (item) => {
  openForm();
  payload.value = Object.assign({});
  payload.value = Object.assign({}, item);
  payload.value.isActive = item.isActive == 1 ? true : false;
};

const onSubmit = async () => {
  let response;
  isloading.value = true;
  if (payload.value.id) {
    response = await useMethod("put", "update-antibiotic-class", payload.value, "", payload.value.id);
  } else {
    response = await useMethod("post", "create-antibiotic-class", payload.value);
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
      "get-antibiotic-class",
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
