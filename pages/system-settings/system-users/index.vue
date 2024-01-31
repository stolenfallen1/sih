<template>
  <v-card class="mb-2" elevation="2">
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn
        @click="ViewUserDetails"
        :disabled="isSelectedUser ? false : true"
        prepend-icon="mdi-eye-outline"
        width="100"
        color="primary"
        class="bg-info text-white"
      >
        View
      </v-btn>
      <v-btn
        @click="openAddRecordDialog"
        :disabled="tableData.length == 0 ? false : true"
        prepend-icon="mdi-plus-outline"
        width="100"
        color="primary"
        class="bg-primary text-white"
      >
        New
      </v-btn>
      <v-btn
        @click="EditUserDetails"
        prepend-icon="mdi-pencil"
        :disabled="isSelectedUser ? false : true"
        width="100"
        color="primary"
        class="bg-success text-white"
      >
        Edit
      </v-btn>
      <v-btn
        @click="DeactiveUser"
        prepend-icon="mdi-toggle-switch"
        :disabled="isSelectedUser ? false : true"
        width="150"
        color="primary"
        class="bg-error text-white"
      >
        Deactive</v-btn
      >
    </v-card-actions>
  </v-card>
  <v-dialog v-model="inputDialog" width="750" scrollable>
    <registration-form
      :payload="payload"
      @update-user="updateConfirmation"
      @register-user="submitConfirmation"
      @close-dialog="closeDialog"
    ></registration-form>
  </v-dialog>

  <ReusableTable
    :items-per-page="10"
    :serverItems="tableData"
    :totalItems="totalItems"
    :loading="isLoading"
    :tabs="tableTabs"
    :columns="columns"
    :itemsPerPage="itemsPerPage"
    :tableTitle="pageTitle"
    :current-tab="currentTab"
    @selected-row="selectedUser"
    @tab-change="handleTabChange"
    @action-search="handleSearch"
    @action-refresh="handleRefresh"
    @fetchPage="fetchData"
  >
    <!-- Custom templates for each column -->
    <template v-for="column in columns" v-slot:[`column-${column.key}`]="{ item }">
      <!-- customize rendering for each column here -->
      <span v-if="column.key === 'role'">{{ item.role ? item.role.name : "" }}</span>
      <span v-if="column.key === 'branch'">{{
        item.branch ? item.branch.abbreviation : ""
      }}</span>

      <span v-if="column.key === 'warehouse'">
        {{ item.warehouse ? item.warehouse.warehouse_description : "" }}</span
      >
      <span v-if="column.key === 'birthdate'">
        {{ item.birthdate ? formatDate(item.birthdate) : "" }}</span
      >

      <span v-if="column.key === 'isactive'">
        {{ item.isactive == 1 ? "Active" : "In Active" }}</span
      >

      <!-- Add more custom logic for other columns -->
    </template>
  </ReusableTable>
  <Confirmation
    :show="confirmationDialog"
    :payload="payload"
    :error_msg="error_msg"
    @close="closeConfirmation"
    @submit="registerUser"
  />
  <Confirmation
    :show="updateconfirmationDialog"
    :payload="payload"
    :error_msg="error_msg"
    @close="closeupdateConfirmation"
    @submit="updateUser"
  />
  <Snackbar :show="isShowSnackBar" :text="text"></Snackbar>
</template>

<script setup>
import nuxtStorage from "nuxt-storage";
import { storeToRefs } from "pinia";
import moment from "moment";
moment.locale("en");
import RegistrationForm from "~/components/system-settings/forms/system-users/RegistrationForm.vue";
import ReusableTable from "~/components/system-settings/tables/ReusableTable.vue";
const { id, isrefresh } = storeToRefs(useSubcomponentIDStore()); // state id for subcomponents ?id=123
let userdetails = JSON.parse(nuxtStorage.localStorage.getData("user_details"));
definePageMeta({
  layout: "root-layout",
});

// Auth refs and config
const config = useRuntimeConfig();
const token = useCookie("token");

// Dialog refs ( form )
const inputDialog = ref(false);

const payload = ref({
  type: "",
  isactive: "1",
  user_passcode: "",
});
const isSelectedUser = ref(false);
const confirmationDialog = ref(false);
const updateconfirmationDialog = ref(false);
const error_msg = ref("");
const isShowSnackBar = ref(false);
const text = ref("");

// States for opening and closing dialogs

const closeDialog = () => {
  inputDialog.value = false;
};

const openAddRecordDialog = () => {
  payload.value = Object.assign({});
  payload.value.type = "new";
  inputDialog.value = true;
};

const DeactiveUser = () => {
  if (id.value) {
    payload.value.type = "edit";
    inputDialog.value = true;
  }
};

const EditUserDetails = () => {
  if (id.value) {
    payload.value.type = "edit";
    inputDialog.value = true;
  }
};
const ViewUserDetails = () => {
  if (id.value) {
    payload.value.type = "view";
    inputDialog.value = true;
  }
};
// Table refs and tab related
const tableData = ref([]);
const columns = ref([]);
const totalItems = ref(0);
const itemsPerPage = ref(15);
const isLoading = ref(false);
const currentTab = ref("one");
const tableTabs = ref([
  {
    label: "Individual User",
    title: "List of system users",
    value: "one",
    endpoint: `${config.public.apiBase}` + `/users`,
    columns: [
      {
        title: "User ID",
        key: "idnumber",
        width: "10%",
        align: "start",
        sortable: true,
      },
      { title: "User Name", key: "name", width: "30%", align: "start" },
      { title: "Birth of date", key: "birthdate", width: "20%", align: "start" },
      {
        title: "Department",
        key: "warehouse",
        width: "30%",
        align: "start",
      },
      { title: "Status", key: "isactive", width: "20%", align: "start" },
    ],
  },
  {
    label: "User Groups",
    title: "List of user Groups",
    value: "two",
    endpoint: `${config.public.apiBase}` + `/roles`,
    columns: [
      { title: "Group Code", key: "id", align: "start",  width: "20%", sortable: true },
      { title: "Group Name", key: "display_name", align: "start" },
    ],
  },
]);
const pageTitle = ref(""); // This should be dynamic base on the current tab
const params = ref("");

// Fetch Data sample
const fetchData = async (options = null, searchkeyword = null) => {
  let keyword = searchkeyword || "";
  params.value = options
    ? "page=" +
      options.page +
      "&per_page=" +
      options.itemsPerPage +
      "&keyword=" +
      options.keyword
    : "page=1&per_page=10&keyword=" + keyword;
  // useCookie new hook in nuxt 3

  try {
    if (options != null) return; // ge addan ra nko ani condition
    isLoading.value = true;
    const currentTabInfo = tableTabs.value.find((tab) => tab.value === currentTab.value);
    const response = await fetch(currentTabInfo?.endpoint + "?" + params.value || "", {
      headers: {
        Authorization: `Bearer ${token.value}`,
      },
    });
    const data = await response.json();
    updateTotalItems(data.total);
    updateServerItems(data.data);
    // tableColumns.value = currentTabInfo?.columns || [];
  } catch (error) {
    console.error("Error fetching data:", error);
  } finally {
    isLoading.value = false;
  }
};

const updateTotalItems = (newTotalItems) => {
  totalItems.value = newTotalItems;
};

const updateServerItems = (newServerItems) => {
  tableData.value = newServerItems;
};

const handleTabChange = (tabValue) => {
  currentTab.value = tabValue;
  columns.value = tableTabs.value[0].columns;
  if (tabValue == "two") {
    columns.value = tableTabs.value[1].columns;
  }
  const currentTabInfo = tableTabs.value.find((tab) => tab.value === tabValue);
  fetchData();
  pageTitle.value = currentTabInfo?.title || "";
};

const handleSearch = (keyword) => {
  // Handle search action
  fetchData(null, keyword);
};

const handleRefresh = () => {
  fetchData();
};

const selectedUser = (item) => {
  isSelectedUser.value = false;
  isrefresh.value = false;
  id.value = ""; //clear state id for subcomponents ?id=''
  if (item) {
    item.birthdate = formatDate(item.birthdate);
    item.warehouse_id = parseInt(item.warehouse_id);
    item.position_id = parseInt(item.position_id) ? "1" : 1;
    item.section_id = parseInt(item.section_id) ? "1" : 1;
    item.role_id = parseInt(item.role_id);
    item.branch_id = parseInt(item.branch_id);
    item.suffix = parseInt(item.suffix) ? "1" : 1;
    payload.value = Object.assign({}, item);
    id.value = item.id; //set state id for subcomponents ?id=item.id value
    isrefresh.value = true;
    isSelectedUser.value = true;
  }
};



const updateConfirmation = () => {
  updateconfirmationDialog.value = true;
};

const closeupdateConfirmation = () => {
  updateconfirmationDialog.value = false;
};

const submitConfirmation = () => {
  confirmationDialog.value = true;
};

const closeConfirmation = () => {
  confirmationDialog.value = false;
};

const registerUser = async (payload) => {
  console.log(payload);
  console.log(userdetails.passcode, "asd");
  if (userdetails.passcode == payload.user_passcode) {
    const { data } = await useFetch(`${config.public.apiBase}` + `/users`, {
      method: "post",
      headers: {
        Authorization: `Bearer ${token.value}`,
        "Content-Type": "application/json",
      },
      body: { payload: payload },
    });
    if (data.value) {
      snackbar(data.value.msg);
      closeDialog();
      confirmationDialog.value = false;
      fetchData(null, payload.lastname);
    }
  } else {
    error_msg.value = "Incorrect Passcode";
    setTimeout(() => {
      error_msg.value = "";
    }, 3000);
  }
};

const updateUser = async (payload) => {
  console.log(payload);
  if (userdetails.passcode == payload.user_passcode) {
    const { data } = await useFetch(`${config.public.apiBase}` + `/users/` + payload.id, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token.value}`,
        "Content-Type": "application/json",
      },
      body: { payload: payload },
    });
    if (data.value) {
      snackbar(data.value.msg);
      closeDialog();
      updateconfirmationDialog.value = false;
      fetchData(null, payload.lastname);
    }
  } else {
    error_msg.value = "Incorrect Passcode";
    setTimeout(() => {
      error_msg.value = "";
    }, 3000);
  }
};
const snackbar = (value) =>{
    isShowSnackBar.value = true;
    text.value = value;
    setTimeout(() => {
      isShowSnackBar.value = false;
      text.value = '';
    }, 3000);
};
// fetchData();
handleTabChange(currentTab.value);
onMounted(async () => {
  id.value = "";
});
onUpdated(() => {
  // id.value = '';
});
const formatDate = (value) => {
  return moment(value).format("YYYY-MM-DD");
};
</script>

<style scoped></style>
