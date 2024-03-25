<template>
  <v-dialog :model-value="show" rounded="lg" persistent scrollable max-width="950px">
    <v-card rounded="lg">
      <v-toolbar density="compact" color="#6984ff" hide-details>
        <v-toolbar-title>Account Group</v-toolbar-title>
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
          <template v-slot:item.class="{ item }">
            {{ item.get_account_class ? item.get_account_class.Class : "" }}
          </template>
           <template v-slot:item.type="{ item }">
            {{ item.get_account_type ? item.get_account_type.account_type : "" }}
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
    rounded="lg"
    persistent
    scrollable
    max-width="600px"
  >
    <form @submit.prevent="onSubmit">
      <v-card rounded="lg">
        <v-toolbar density="compact" color="#6984ff" hide-details>
          <v-toolbar-title>Account Group Details</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-btn color="white" @click="closeForm">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-toolbar>
        <v-divider></v-divider>
        <v-card-text>
          <v-row>
            <v-col cols="3">
              <v-text-field
                label="ID"
                hide-details
                readonly
                v-model="payload.id"
                density="compact"
                variant="outlined"
              ></v-text-field>
            </v-col>
             <v-col cols="9">
                <v-text-field
                 density="compact"
                  variant="outlined"
                  required
                  v-model="payload.account_group_code"
                  label="Enter  Code"
                  clearable
                  hide-details
                ></v-text-field>
              </v-col>
            <v-col cols="12">
                <v-text-field
                 density="compact"
                  variant="outlined"
                  required
                  v-model="payload.account_group_description"
                  label="Enter Description"
                  clearable
                  hide-details
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-textarea
                 density="compact"
                  variant="outlined"
                  required
                  v-model="payload.remarks"
                  label="Enter Remarks"
                  clearable
                  hide-details
                ></v-textarea>
              </v-col>
             <v-col cols="6">
                <v-autocomplete
                  :items="account_class"
                 item-title="Description"
                 item-value="id"
                 density="compact"
                  variant="outlined"
                  hide-details
                  v-model="payload.account_class"
                  label="Select Account Type"
                  clearable
                ></v-autocomplete>
              </v-col>
              <v-col cols="6">
                <v-autocomplete
                 :items="account_type"
                 item-title="account_description"
                 item-value="id"
                 density="compact"
                  variant="outlined"
                  hide-details
                  v-model="payload.account_type"
                  label="Select Account Class"
                  clearable
                ></v-autocomplete>
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
  {
    title: "Code",
    align: "start",
    sortable: false,
    key: "account_group_code",
    width: "10%"
  },
  { title: "Account Type", key: "type", align: "start", sortable: false,width: "15%" },
  { title: "Class", key: "class", align: "start",sortable: false, width: "10%" },
  { title: "Description", key: "account_group_description", align: "start",sortable: false, width: "35%" },
  { title: "Remarks", key: "remarks", align: "start",sortable: false, width: "15%" },
  { title: "", key: "actions", align: "start",sortable: false, width: "25%" },
];

const data = ref({
  title: "List of Account Group",
  keyword: "",
  loading: false,
  filter: {},
  tab: 0,
  param_tab: 1,
});

const itemsPerPage = ref(10);
const totalItems = ref(0);
const serverItems = ref([]);
const account_type = ref([]);
const account_class = ref([]);
const initialize = ({ page, itemsPerPage, sortBy }) => {
  loadItems(page, itemsPerPage, sortBy);
};

const loadItems = async (page = null, itemsPerPage = null, sortBy = null) => {
  data.value.loading = true;
  let pageno = page || 1;
  let itemPerpageno = itemsPerPage || 10;
  let params =
    "page=" + pageno + "&per_page=" + itemPerpageno + "&keyword=" + data.value.keyword;
  const response = await useMethod("get", "account-groups?", "", params);
  if (response) {
    serverItems.value = response.data;
    totalItems.value = response.total;
    data.value.loading = false;
  }
};



const accountClass = async () => {
  const response = await useMethod("get","get-account-class","","");
  if (response) {
    account_class.value = response;
  }
};
const accountType = async () => {
  const response = await useMethod("get","get-account-type","","");
  if (response) {
    account_type.value = response;
  }
};

const search = () => {
  loadItems();
};

const openForm = () => {
  payload.value = Object.assign({});
  accountClass();
  accountType();
  open_form_dialog.value = true;
};

const closeForm = () => {
  payload.value = Object.assign({});
  open_form_dialog.value = false;
};

const onEdit = (item) => {
  openForm();
  payload.value = Object.assign({}, item);
  payload.value.isactive = item.isactive == 1 ? true : false;
  payload.value.account_class = parseInt(item.account_class) ? parseInt(item.account_class) : "";
  payload.value.account_type = parseInt(item.account_type) ? parseInt(item.account_type) : "";
};

const onSubmit = async () => {
  let response;
  isloading.value = true;
  if (payload.value.id) {
    response = await useMethod("put", "account-groups", payload.value, "", payload.value.id);
  } else {
    response = await useMethod("post", "account-groups", payload.value);
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
      "account-groups",
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
useKeyboardEscToClose(closeDialog);
</script>

<style scoped></style>
