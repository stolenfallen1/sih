<template>
  <v-dialog :model-value="show" rounded="lg" persistent scrollable max-width="990px">
    <v-card rounded="lg">
      <v-toolbar density="compact" color="#6984ff" hide-details>
        <v-toolbar-title>Bank Account</v-toolbar-title>
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
            <template v-slot:item.bank_id="{ item }">
            {{ item.bank ? item.bank.description : "" }}
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
          <v-toolbar-title>Bank Account Details</v-toolbar-title>
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
                label="Code"
                hide-details
                readonly
                v-model="payload.id"
                density="compact"
                variant="outlined"
              ></v-text-field>
            </v-col>
             <v-col cols="9">
                <v-autocomplete
                  :items="bank_list"
                 item-title="description"
                 item-value="id"
                 density="compact"
                  variant="outlined"
                  
                  hide-details
                  v-model="payload.bank_id"
                  
                  label="Select Bank"
                  clearable
                ></v-autocomplete>
              </v-col>
              <v-col cols="12">
                <v-text-field
                 density="compact"
                  variant="outlined"
                  required
                  v-model="payload.bankbranch"
                  
                  label="Enter Bank Branch"
                  clearable
                  hide-details
                ></v-text-field>
              </v-col>

              <v-col cols="6">
                <v-text-field
                 density="compact"
                  variant="outlined"
                  required
                  v-model="payload.bankAcctName"
                  
                  label="Enter Account Name"
                  clearable
                  hide-details
                ></v-text-field>
              </v-col>
              <v-col cols="6">
                <v-text-field
                 density="compact"
                  variant="outlined"
                  required
                  v-model="payload.bankAcctNo"
                  
                  label="Enter Account No"
                  clearable
                  hide-details
                ></v-text-field>
              </v-col>
              <v-col cols="6">
                <v-text-field
                 density="compact"
                  variant="outlined"
                  required
                  v-model="payload.swiftCode"
                  
                  label="Enter Swiftcode"
                  clearable
                  hide-details
                ></v-text-field>
              </v-col>
              <v-col cols="6">
                <v-text-field
                 density="compact"
                  variant="outlined"
                  required
                  v-model="payload.checkno"
                  
                  label="Enter Checkno"
                  clearable
                  hide-details
                ></v-text-field>
              </v-col>
              <v-col cols="6">
                <v-text-field
                 density="compact"
                  variant="outlined"
                  required
                  v-model="payload.bankTelNo"
                  
                  label="Enter TelNo"
                  clearable
                  hide-details
                ></v-text-field>
              </v-col>

              <v-col cols="6">
                <v-text-field
                 density="compact"
                  variant="outlined"
                  required
                  v-model="payload.contactPersonForBank"
                  
                  label="Enter >Contact Person For Bank"
                  clearable
                  hide-details
                ></v-text-field>
              </v-col>
              <v-col cols="6">
                <v-text-field
                 density="compact"
                  variant="outlined"
                  required
                  v-model="payload.contactPersonPosition"
                  
                  label="Enter Contact Person Position"
                  clearable
                  hide-details
                ></v-text-field>
              </v-col>
              <v-col cols="6">
                <v-text-field
                 density="compact"
                  variant="outlined"
                  required
                  v-model="payload.website_url"
                  
                  label="Enter Website Url"
                  clearable
                  hide-details
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-checkbox
                  class="mt-0 mb-0"
                  v-model="payload.isactive"
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
  {
    title: "Code",
    align: "start",
    sortable: false,
    key: "id",
  },
  { title: "Bank", key: "bank_id", align: "start", sortable: false,width: "30%" },
  { title: "Account Name", key: "bankAcctName", align: "start",sortable: false, width: "20%" },
  { title: "Account No", key: "bankAcctNo", align: "start",sortable: false, width: "15%" },
  { title: "Swiftcode", key: "swiftCode", align: "start",sortable: false, width: "10%" },
  { title: "Contact", key: "Contact", align: "start",sortable: false, width: "10%" },
  { title: "", key: "actions", align: "start",sortable: false, width: "20%" },
];

const data = ref({
  title: "List of Bank",
  keyword: "",
  loading: false,
  filter: {},
  tab: 0,
  param_tab: 1,
});

const itemsPerPage = ref(10);
const totalItems = ref(0);
const serverItems = ref([]);
const bank_list = ref([]);
const initialize = ({ page, itemsPerPage, sortBy }) => {
  loadItems(page, itemsPerPage, sortBy);
};

const loadItems = async (page = null, itemsPerPage = null, sortBy = null) => {
  data.value.loading = true;
  let pageno = page || 1;
  let itemPerpageno = itemsPerPage || 10;
  let params =
    "page=" + pageno + "&per_page=" + itemPerpageno + "&keyword=" + data.value.keyword;
  const response = await useMethod("get", "bank-accounts?", "", params);
  if (response) {
    serverItems.value = response.data;
    totalItems.value = response.total;
    data.value.loading = false;
  }
};



const banklist = async () => {
  const response = await useMethod("get","get-banks","","");
  if (response) {
    bank_list.value = response;
  }
  
};

const search = () => {
  loadItems();
};

const openForm = () => {
  payload.value = Object.assign({});
  banklist();
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
  payload.value.bank_id = parseInt(item.bank_id);
};

const onSubmit = async () => {
  let response;
  isloading.value = true;
  if (payload.value.id) {
    response = await useMethod("put", "bank-accounts", payload.value, "", payload.value.id);
  } else {
    response = await useMethod("post", "bank-accounts", payload.value);
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
      "bank-accounts",
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
