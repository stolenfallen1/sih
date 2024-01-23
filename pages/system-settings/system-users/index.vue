<template>
  <v-container>
    <v-row justify="start">
      <v-dialog v-model="searchDialog" width="800">
        <template v-slot:activator="{ props }">
          <v-btn color="#117dad" v-bind="props">+ Add User</v-btn>
        </template>
        <search-user
          @close-search-dialog="closeSearchDialog"
          @open-dialog="openAddRecordDialog"
        />
      </v-dialog>
    </v-row>
    <v-row>
      <v-dialog v-model="inputDialog" width="1024">
        <registration-form @close-dialog="closeDialog"></registration-form>
      </v-dialog>
    </v-row>
  </v-container>

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
    @tab-change="handleTabChange"
    @action-search="handleSearch"
    @action-refresh="handleRefresh"
  />
</template>

<script setup>
import RegistrationForm from "~/components/system-settings/forms/system-users/RegistrationForm.vue";
import SearchUser from "~/components/system-settings/forms/system-users/SearchUser.vue";
import ReusableTable from "~/components/system-settings/tables/ReusableTable.vue";
import { ref } from "vue";
definePageMeta({
  layout: "root-layout",
});

const config = useRuntimeConfig();
const token = useCookie('token');
const tableData = ref([]);
const columns = ref([]);
const totalItems = ref(0);
const itemsPerPage = ref(15);
const isLoading = ref(false);
// Dialog state
const searchDialog = ref(false);
const inputDialog = ref(false);
// Tabs
const currentTab = ref("one");
const tableTabs = ref([
  {
    label: "Individual User",
    title: "List of system users",
    value: "one",
    endpoint: `${config.public.apiBase}`+ "/users?page=1&per_page=15",
    columns: [
      {
        title: "IDNumber",
        key: "idnumber",
        width: "10%",
        align: "start",
        sortable: true,
      },
      { title: "User Name", key: "name", width: "30%", align: "start" },
      { title: "User Group", key: "role", width: "15%", align: "start" },
      { title: "Position", key: "position_id", width: "15%", align: "start" },
      { title: "Branch", key: "branch", width: "5%", align: "start" },
      { title: "Department", key: "warehouse", width: "30%", align: "start" },
    ],
  },
  {
    label: "User Groups",
    title: "List of user Groups",
    value: "two",
    endpoint: "https://jsonplaceholder.typicode.com/comments",
    columns: [
      { title: "User ID", key: "userId", align: "start", sortable: true },
      { title: "User Name", key: "id", align: "end" },
      { title: "User Name", key: "id", align: "end" },
      { title: "User Name", key: "id", align: "end" },
    ],
  },
]);
const pageTitle = ref(""); // This should be dynamic base on the current tab
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

// Fetch Data sample
const fetchData = async () => {
  try {
    isLoading.value = true;
    const currentTabInfo = tableTabs.value.find((tab) => tab.value === currentTab.value);
    const response = await fetch(currentTabInfo?.endpoint || "", {
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
const handleTabChange = (tabValue, page, item, tab) => {
  currentTab.value = tabValue;
  columns.value = tableTabs.value[0].columns;
  if (tabValue == "two") {
    columns.value = tableTabs.value[1].columns;
  }
  const currentTabInfo = tableTabs.value.find((tab) => tab.value === tabValue);
  fetchData();
  pageTitle.value = currentTabInfo?.title || "";
};
fetchData();
handleTabChange(currentTab.value);

const handleSearch = () => {
  // Handle search action
};

const handleRefresh = () => {
  fetchData();
};

// const handleDots = () => {};
</script>

<style scoped></style>
