<template>
    <v-card class="mb-2" elevation="2">
       <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn @click="ViewUserDetails"  :disabled="isSelectedUser ? false : true" prepend-icon="mdi-eye-outline"  width="100" color="primary" class="bg-info text-white"> View </v-btn>
            <v-btn @click="openAddRecordDialog" :disabled="tableData.length == 0 ? false : true" prepend-icon="mdi-plus-outline" width="100" color="primary" class="bg-primary text-white"> New </v-btn>
            <v-btn  prepend-icon="mdi-pencil"  :disabled="tableData.length == 0 ? false : true" width="100" color="primary" class="bg-success text-white"> Edit </v-btn>
            <v-btn prepend-icon="mdi-delete" :disabled="tableData.length == 0 ? false : true" width="100" color="primary" class="bg-error text-white"> Delete </v-btn>
        </v-card-actions>
    </v-card>
    <v-dialog v-model="inputDialog" width="750">
        <registration-form :payload="payload" @register-user="registerUser" @close-dialog="closeDialog"></registration-form>
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
        {{
        item.warehouse ? item.warehouse.warehouse_description : ""
      }}</span>
       <span v-if="column.key === 'birthdate'">
        {{
        item.birthdate ? formatDate(item.birthdate) : ""
      }}</span>

       <span v-if="column.key === 'isactive'">
        {{
        item.isactive == 1 ?  "Active": "In Active"
      }}</span>
      
      <!-- Add more custom logic for other columns -->
    </template>
  </ReusableTable>
</template>

<script setup>
import { storeToRefs } from "pinia";
import moment from 'moment';
moment.locale('en');
import RegistrationForm from "~/components/system-settings/forms/system-users/RegistrationForm.vue";
import ReusableTable from "~/components/system-settings/tables/ReusableTable.vue";
const { id,isrefresh } = storeToRefs(useSubcomponentIDStore()); // state id for subcomponents ?id=123

import { ref } from "vue";
definePageMeta({
  layout: "root-layout",
});

// Auth refs and config
const config = useRuntimeConfig();
const token = useCookie('token');

// Dialog refs ( form )
const searchDialog = ref(false);
const inputDialog = ref(false);

const payload = ref({});
const isSelectedUser = ref(false);

// States for opening and closing dialogs
const closeSearchDialog = () => {
  searchDialog.value = false;
};
const closeDialog = () => {
  inputDialog.value = false;
};
const openAddRecordDialog = () => {
  searchDialog.value = false;
  inputDialog.value = true;
};
const ViewUserDetails = () => {
  searchDialog.value = false;
  inputDialog.value = true;
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
    endpoint: "https://jsonplaceholder.typicode.com/comments",
    columns: [
      { title: "Group Code", key: "userId", align: "start", sortable: true },
      { title: "Group Name", key: "id", align: "end" },
      { title: "Remarks", key: "id", align: "end" },
    ],
  },
]);
const pageTitle = ref(""); // This should be dynamic base on the current tab
const params = ref("");

// Fetch Data sample
const fetchData = async (options = null, searchkeyword = null) => {
  let keyword = searchkeyword || '';
  params.value = options ? "page=" + options.page + "&per_page=" + options.itemsPerPage+"&keyword="+ options.keyword : "page=1&per_page=10&keyword="+keyword;
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
  fetchData(null,keyword);
};

const handleRefresh = () => {
  fetchData();
};


const selectedUser = (item) =>{
    isSelectedUser.value = false;
    isrefresh.value = false;
    id.value = ''; //clear state id for subcomponents ?id=''
    if(item){
      item.birthdate = formatDate(item.birthdate);
      item.warehouse_id = parseInt(item.warehouse_id);
      item.position_id = parseInt(item.position_id);
      item.section_id = parseInt(item.section_id);
      item.role_id = parseInt(item.role_id);
      item.branch_id = parseInt(item.branch_id);
      item.suffix = parseInt(item.suffix);
      payload.value = Object.assign({},item);
      id.value = item.id; //set state id for subcomponents ?id=item.id value
      isrefresh.value = true;
      isSelectedUser.value = true;
    }
}

const registerUser  = async (payload) =>{
    const { data, pending } = await useFetch('http://10.4.15.15/api/users', {
        method: 'post',
        headers: { 
            'Authorization': `Bearer ${token.value}`,
            'Content-Type': 'application/json'
            
         },
        body:{payload:payload},
      });
      if (data.value) {
        closeDialog();
        fetchData(null,payload.lastname);
      }
}
// fetchData();
handleTabChange(currentTab.value);
onMounted(async () => {
  id.value = '';
});
onUpdated(() => {
  id.value = '';
});
const formatDate =(value)=>{
   return moment(value).format("YYYY-MM-DD");
}
</script>

<style scoped></style>
