<template>
  <v-card class="mb-2" elevation="2">
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn
        @click="handleView"
        :disabled="isSelectedUser"
        prepend-icon="mdi-eye-outline"
        width="100"
        color="primary"
        class="bg-info text-white"
      >
        View
      </v-btn>
      <v-btn
        @click="handleNew"
        :disabled="tableData.length > 0 ? true : false"
        prepend-icon="mdi-plus-outline"
        width="100"
        color="primary"
        class="bg-primary text-white"
      >
        New
      </v-btn>
      <v-btn
        @click="handleEdit"
        prepend-icon="mdi-pencil"
        :disabled="isSelectedUser"
        width="100"
        color="primary"
        class="bg-success text-white"
      >
        Edit
      </v-btn>
      <v-btn
        v-if="currentTab == 'one'"
        @click="DeactiveUser"
        prepend-icon="mdi-toggle-switch"
        :disabled="isSelectedUser"
        width="150"
        color="primary"
        class="bg-error text-white"
      >
        Deactive</v-btn
      >
    </v-card-actions>
  </v-card>
  <v-dialog v-model="inputDialog" width="950" scrollable>
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
    :showTabs="showTabs"
    @selected-row="selectedUser"
    @tab-change="handleTabChange"
    @action-search="handleSearch"
    @action-refresh="handleRefresh"
    @fetchPage="fetchData"
  >
    <!-- Custom templates for each column -->
    <template v-for="column in columns" v-slot:[`column-${column.key}`]="{ item }">
      <!-- customize rendering for each column here -->
      <span v-if="column.key === 'role'" :key="column.key">{{
        item.role ? item.role.name : ""
      }}</span>
      <span v-if="column.key === 'branch'" :key="column.key">{{
        item.branch ? item.branch.abbreviation : ""
      }}</span>

      <span v-if="column.key === 'warehouse'" :key="column.key">
        {{ item.warehouse ? item.warehouse.warehouse_description : "" }}</span
      >
      <span v-if="column.key === 'birthdate'" :key="column.key">
        {{ item.birthdate ? formatDate(item.birthdate) : "" }}</span
      >
      <span v-if="column.key === 'isactive'" :key="column.key">
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
  

  <Modules @submit="submitModules" :isloading="isLoading" :show="ModuleDialog" :id="selectedRowDetails.id" @close="closeModule"></Modules>
  <ModuleForm
    :moduleDialog="moduleDialog"
    @close-dialog="closeModuleDialog"
    @submit-user-group="submitUserGroup"
    :usergroup_payload="usergroup_payload"
  ></ModuleForm>
  <Snackbar :show="isShowSnackBar" :text="text"></Snackbar>
</template>

<script setup>
import Modules from "./modules/Modules";

import nuxtStorage from "nuxt-storage";
import { storeToRefs } from "pinia";
import moment from "moment";
moment.locale("en");
// import TableAndTemplateFormDialog state 
const { ModuleDialog} = storeToRefs(TableAndTemplateFormDialog());

import RegistrationForm from "~/components/system-settings/forms/system-users/RegistrationForm.vue";
import ReusableTable from "~/components/reusables/ReusableTable.vue";
import ModuleForm from "./modules/ModuleForm.vue";
const { selectedRowDetails, isrefresh } = storeToRefs(useSubcomponentSelectedRowDetailsStore()); // state id for subcomponents ?id=123
let userdetails = JSON.parse(nuxtStorage.localStorage.getData("user_details"));
const  {subcomponents}  = storeToRefs(useNavigationMenuStore());
definePageMeta({
  layout: "root-layout",
});

// Dialog refs ( form )
const inputDialog = ref(false);
const moduleDialog = ref(false);

const payload = ref({
  type: "",
  isactive: "1",
  user_passcode: "",
  systems: [],
});

//  Table refs and tab related
const tableData = ref([]);
const columns = ref([]);
const totalItems = ref(0);
const itemsPerPage = ref(15);
const isLoading = ref(false);
const showTabs = ref(true);
const currentTab = ref("one");
const tableTabs = ref([
  {
    label: "Individual User",
    title: "List of system users",
    value: "one",
    endpoint: useApiUrl() + `/users`,
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
    endpoint: useApiUrl() + `/roles`,
    columns: [
      { title: "Group Code", key: "id", align: "start", width: "17%", sortable: true },
      { title: "Group Name", key: "display_name", align: "start" },
      { title: "Status", key: "isactive", align: "start" },
    ],
  },
]);
const pageTitle = ref(""); // This should be dynamic base on the current tab
const params = ref("");
const usergroup_payload = ref({});
const isSelectedUser = ref(true);
const confirmationDialog = ref(false);
const updateconfirmationDialog = ref(false);
const error_msg = ref("");
const isShowSnackBar = ref(false);
const text = ref("");

// States for opening and closing dialogs

const closeModule = () => {
  ModuleDialog.value = false;
};
const closeDialog = () => {
  inputDialog.value = false;
};

const closeModuleDialog = () => {
  moduleDialog.value = false;
};

const openAddRecordDialog = () => {
  payload.value = Object.assign({});
  payload.value.type = "new";
  inputDialog.value = true;
};

const DeactiveUser = () => {
  if (selectedRowDetails.value.id) {
    payload.value.type = "edit";
    inputDialog.value = true;
  }
};

const EditUserDetails = () => {
  if (selectedRowDetails.value.id) {
    payload.value.type = "edit";
    inputDialog.value = true;
  }
};

const ViewUserDetails = () => {
  if (selectedRowDetails.value.id) {
    payload.value.type = "view";
    inputDialog.value = true;
  }
};

const ViewUserGroups = () => {
  if (selectedRowDetails.value.id) {
    moduleDialog.value = true;
  } else {
    moduleDialog.value = true;
  }
};

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
    // if ((options != null || options == null) && currentTab.value == 'two') return; // ge addan ra nko ani condition
    isLoading.value = true;
    const currentTabInfo = tableTabs.value.find((tab) => tab.value === currentTab.value);
    const response = await fetch(currentTabInfo?.endpoint + "?" + params.value || "", {
      headers: {
        Authorization: `Bearer `+ useToken(),
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

const handleNew = () => {
  if (currentTab.value == "one") {
    openAddRecordDialog();
  } else {
    usergroup_payload.value = Object.assign({});
    usergroup_payload.value.type = "new";
    ViewUserGroups();
  }
};

const handleView = () => {
  if (currentTab.value == "one") {
    ViewUserDetails();
  } else {
    ViewUserGroups();
  }
};

const handleEdit = () => {
  if (currentTab.value == "one") {
    usergroup_payload.value.type = "view";
    EditUserDetails();
  } else {
    usergroup_payload.value.type = "edit";
    ViewUserGroups();
  }
};

const handleTabChange = (tabValue) => {
  selectedRowDetails.value.id = "";
  payload.value = Object.assign({});
  usergroup_payload.value = Object.assign({});
  isSelectedUser.value = true;
  currentTab.value = tabValue;
  columns.value = tableTabs.value[0].columns;

  if (tabValue == "two") {
    columns.value = tableTabs.value[1].columns;
    usergroup();
  }else{
    individualuser();
  }
  const currentTabInfo = tableTabs.value.find((tab) => tab.value === tabValue);
  fetchData();
  pageTitle.value = currentTabInfo?.title || "";
};

const individualuser = () => {
  subcomponents.value = useSystemUserTab('one');
};

const usergroup = () => {
  subcomponents.value = useSystemUserTab('two');
};

const handleSearch = (keyword) => {
  // Handle search action
  fetchData(null, keyword);
};

const handleRefresh = () => {
  fetchData();
};

const selectedUser = (item) => {
  isSelectedUser.value = true;
  isrefresh.value = false;
  selectedRowDetails.value.id = ""; //clear state id for subcomponents ?id=''
  selectedRowDetails.value.role_id = ""; //clear state id for subcomponents ?id=''
  if (item && currentTab.value == "one") {
    item.birthdate = formatDate(item.birthdate);
    item.warehouse_id = parseInt(item.warehouse_id);
    item.position_id = item.position_id;
    item.section_id = parseInt(item.section_id) ? "1" : 1;
    item.role_id = parseInt(item.role_id);
    item.branch_id = parseInt(item.branch_id);
    item.suffix = parseInt(item.suffix);
    payload.value = Object.assign({}, item);
    selectedRowDetails.value =  Object.assign({}, item);; //set state id for subcomponents ?id=item.id value
    isrefresh.value = true;
    isSelectedUser.value = false;
  } else if (item && currentTab.value == "two") {
    selectedRowDetails.value =  Object.assign({}, item);
    selectedRowDetails.value.role_id = item.id; //set state id for subcomponents ?id=item.id value
    item.isactive = item.isactive == 1 ? true : false;
    usergroup_payload.value = Object.assign({}, item);
    console.log(usergroup_payload);
    isrefresh.value = true;
    isSelectedUser.value = false;
  }
  console.log(selectedRowDetails.value.id,'1223')
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
    const { data } = await useFetch(useApiUrl() + `/users`, {
      method: "post",
      headers: {
        Authorization: `Bearer `+ useToken(),
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
    const { data } = await useFetch(useApiUrl() + `/users/` + payload.id, {
      method: "PUT",
      headers: {
        Authorization: `Bearer `+ useToken(),
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

const submitUserGroup = async (payload) => {
  let method = "post";
  let id = "";
  if (payload.id) {
    method = "PUT";
    id = "/" + payload.id;
  }
  const { data } = await useFetch(useApiUrl() + `/roles` + id, {
    method: method,
    headers: {
      Authorization: `Bearer `+ useToken(),
      "Content-Type": "application/json",
    },
    body: { payload: payload },
  });

  if (data.value) {
    snackbar(data.value.msg);
    closeModuleDialog();
    currentTab.value = "two";
    fetchData(null, payload.name);
  }
};

const snackbar = (value) => {
  isShowSnackBar.value = true;
  text.value = value;
  setTimeout(() => {
    isShowSnackBar.value = false;
    text.value = "";
  }, 3000);
};

// fetchData();
handleTabChange(currentTab.value);
onMounted(async () => {
  selectedRowDetails.value.id = "";
  selectedRowDetails.value.role_id = "";
});
onUpdated(() => {
  // selectedRowDetails.value.id = '';
});
const formatDate = (value) => {
  return moment(value).format("YYYY-MM-DD");
};

const submitModules = async(payload)=>{
   
    isLoading.value = true;
    const response = await $fetch(useApiUrl()  + `/submit-selected-permission`, {
        method: "post",
        headers: {
        Authorization: `Bearer `+ useToken(),
        "Content-Type": "application/json",
        },
        body: {
            payload: payload.selectedModule,
            remove_permission: payload.removeModule,
            id:selectedRowDetails.value.id
        },
    });
    if(response){
      useSnackbar(true, "green", response.message);
      if(payload.type == 'module'){
        ModuleDialog.value = false;
      }
      isLoading.value = false;
      fetchData(null, null);
    }
}

</script>

<style scoped></style>
