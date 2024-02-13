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
        :disabled="doctorlist.length > 0 ? true : false"
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
  <v-card class="mb-2" elevation="2">
    <ReusableTable
      :items-per-page="itemsPerPage"
      :serverItems="doctorlist"
      :totalItems="totalItems"
      :loading="loading"
      :tabs="tableTabs"
      :columns="headers"
      :showTabs="showTabs"
      :itemsPerPage="itemsPerPage"
      :tableTitle="pageTitle"
      :current-tab="currentTab"
      @fetchPage="loadItems"
      @selected-row="selectedUser"
      @action-search="handleSearch"
      @action-refresh="handleRefresh"
    >
      <!-- Custom templates for each column -->
      <template v-for="column in headers" v-slot:[`column-${column.key}`]="{ item }">
        <!-- customize rendering for each column here -->
        <span v-if="column.key ==='category'" :key="column.key">{{
          item.doctor_category ? item.doctor_category.category_description : "asdasd"
        }}</span>
        <span v-if="column.key === 'specialization_id'" :key="column.key">{{
          item.doctor_specialty ? item.doctor_specialty.specialization_description : ""
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
  </v-card>
</template>

<script setup>
import ReusableTable from "~/components/system-settings/tables/ReusableTable.vue";
definePageMeta({
  layout: "root-layout",
});

const { selectedRowDetails, isrefresh } = storeToRefs(useSubcomponentSelectedRowDetailsStore());
const isSelectedUser = ref(true);
const pageTitle = ref("Consultants");
const currentTab = ref(false);
const showTabs = ref(false);
const tableTabs = ref([]);

const totalItems = ref(0);
const itemsPerPage = ref(40);
const search = ref("");
const params = ref("");
const loading = ref(true);
const headers = [
  {
    title: "Code",
    align: "start",
    sortable: true,
    key: "doctor_code",
    width: "5%",
  },
  { title: "Category", key: "category", align: "start", width: "5%", sortable: false },
  { title: "Specialization", key: "specialization_id", align: "start", width: "5%", sortable: false },
  { title: "Consultant Name", key: "doctor_name", align: "start", width: "40%", sortable: false },
  {
    title: "PHIC No.",
    key: "philhealth_accreditation_no",
    align: "start",
    width: "10%",
    sortable: false,
  },
  { title: "Email", key: "email", align: "start", width: "30%", sortable: false },
];
const doctorlist = ref([]);
const handleRefresh = () => {
   loadItems();
};
const handleSearch = (keyword) => {
  // Handle search action
   loadItems(null, keyword);
};
const selectedUser = (item) => {
  isSelectedUser.value = true;
  isrefresh.value = false;
  selectedRowDetails.value.id = ""; //clear state id for subcomponents ?id=''
  selectedRowDetails.value.role_id = ""; //clear state id for subcomponents ?id=''

  if(item){
    selectedRowDetails.value =  Object.assign({}, item);; //set state id for subcomponents ?id=item.id value
    isrefresh.value = true;
    isSelectedUser.value = false;
  }else{
    isrefresh.value = false;
    isSelectedUser.value = true;
  }
};
const handleView = () => {
  
};
const handleEdit = () => {
  
};
const handleNew = () => {
  
};
const DeactiveUser = () => {
  
};

const loadItems = async (options = null, searchkeyword = null) => {
  try {
    loading.value = true;

    let keyword = searchkeyword || "";
      params.value = options  ? "page=" + options.page + "&per_page=" + options.itemsPerPage + "&keyword=" + options.keyword
    : "page=1&per_page=10&keyword=" + keyword;
    const response = await fetch(useApiUrl()+'/doctors'+ "?" + params.value || "", {
      headers: {
        Authorization: `Bearer `+ useToken(),
      },
    });
    const data = await response.json();
    updateTotalItems(data.total);
    updateServerItems(data.data);
    loading.value = false;
    // tableColumns.value = currentTabInfo?.columns || [];
  } catch (error) {
    console.error("Error fetching data:", error);
    loading.value = false;
  } finally {
    loading.value = false;
  }
};
const updateTotalItems = (newTotalItems) => {
  totalItems.value = newTotalItems;
};

const updateServerItems = (newServerItems) => {
  doctorlist.value = newServerItems;
};

</script>

<style>
.v-data-table {
  overflow-x: auto;
}
</style>
