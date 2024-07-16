<template>
  <v-card class="mb-2" elevation="4">
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn
        @click="handleViewPayment"
        :disabled="isSelectedUser"
        prepend-icon="mdi-eye-outline"
        width="100"
        color="primary"
        class="bg-info text-white"
      >
        View
      </v-btn>
      <v-btn
        @click="handleNewPayment"
        :disabled="!isSelectedUser"
        prepend-icon="mdi-plus-outline"
        width="200"
        color="primary"
        class="bg-primary text-white"
      >
        New Payment
      </v-btn>
      <v-btn
        @click="handleCancelPayment"
        :disabled="isSelectedUser"
        prepend-icon="mdi-toggle-switch"
        width="150"
        color="primary"
        class="bg-error text-white"
      >
        Cancel</v-btn
      >
    </v-card-actions>
  </v-card>
  <v-card class="mb-2" elevation="4">
    <ReusableTable
      :items-per-page="10"
      :serverItems="serverItems"
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
      @open-filter="openFilterOptions"
    >
      <!-- Custom templates for each column -->
      <template v-for="column in headers" v-slot:[`column-${column.key}`]="{ item }">
        <!-- customize rendering for each column here -->
        <span v-if="column.key ==='building'" :key="column.key">{{
          item.stations.floors ? item.stations.floors.building.description : ""
        }}</span>
        <span v-if="column.key === 'floor'" :key="column.key">{{
          item.stations.floors ?  item.stations.floors.description : ""
        }}</span>

        <span v-if="column.key === 'roomstatus'" :key="column.key">
          {{ item.room_status ? item.room_status.room_description : "" }}</span
        >
        <span v-if="column.key === 'roomClass'" :key="column.key">
          {{ item.room_class ? item.room_class.room_class_description : "" }}</span
        >
        <span v-if="column.key === 'station'" :key="column.key">
          {{ item.stations ? item.stations.station_description : "" }}</span
        >
        <span v-if="column.key === 'isactive'" :key="column.key">
          {{ item.isactive == 1 ? "Active" : "In Active" }}</span
        >

        <!-- Add more custom logic for other columns -->
      </template>
    </ReusableTable>
  </v-card>
  <SummaryModal 
    :show="open_summary_modal"
    :summary_header="'Cashier Services'"
    :data="ancillary_services_test_data"
    @close-dialog="closeViewSummary"
  />
  <v-menu
    v-model="open_filter_options"
    :close-on-content-click="false"
    offset-y
    activator="#filter-button"
  >
    <template v-slot:activator="{ on, attrs }">
      <div></div>
    </template>
    <v-card width="450px" rounded="lg">
      <v-toolbar density="compact">
        <v-toolbar-title>Filter Options</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn icon @click="closeFilterOptions">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-toolbar>
      <v-divider></v-divider>
      <v-card-text>
        <v-row>
          <!-- <v-col cols="12" md="6">
            <v-select label="Status" variant="outlined" density="compact" v-model="filter.status"></v-select>
          </v-col> -->
          <!-- Add filter options as needed -->
        </v-row>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn class="bg-primary text-white" @click="applyFilters">Apply Filters</v-btn>
      </v-card-actions>
    </v-card>
  </v-menu>

  <!-- Forms -->
  <ORSequenceNumber :open_sequence_setting="open_sequence_setting" @close-dialog="closeSequenceSetting" @save-settings="handleCashierSettings" />
  <NewPayment :open_payment_form="open_payment_form" :payload="payload" @close-dialog="closeHandlePayment" />
  <CancelPayment :open_cancel_form="open_cancel_form" @close-dialog="closeCancelPayment" />

</template>

<script setup>
import ReusableTable from "~/components/reusables/ReusableTable.vue";
import ORSequenceNumber from "./forms/ORSequenceNumber.vue";
import NewPayment from "./forms/NewPayment.vue";
import CancelPayment from "./forms/CancelPayment.vue";

definePageMeta({
  layout: "root-layout",
});

const { selectedRowDetails, isrefresh } = storeToRefs(useSubcomponentSelectedRowDetailsStore());
const isSelectedUser = ref(true);
const pageTitle = ref("Cashier Services");
const currentTab = ref(false);
const showTabs = ref(false);
const tableTabs = ref([]);
const payload = ref({});

const totalItems = ref(0);
const itemsPerPage = ref(15);
const search = ref("");
const filter = ref({});
const open_filter_options = ref(false);
const open_sequence_setting = ref(false);
const open_cancel_form = ref(false);
const open_payment_form = ref(false);
const params = ref("");
const loading = ref(true);
const open_summary_modal = ref(false);
const ancillary_services_test_data = ref([
  { label: "For Rendering", value: "1" },
  { label: "Fully Rendered", value: "2" },
  { label: "Partially Rendered", value: "3" },
  { label: "Cancelled", value: "4" },
  { label: "Credit Notes", value: "5" },
  { label: "Package Deals", value: "6" },
]); 

const headers = [
  {
    title: "OR Num",
    align: "start",
    sortable: true,
    width: "10%",
  },
  {
    title: "RefNum",
    align: "start",
    sortable: true,
    width: "10%",
  },
  {
    title: "Revenue",
    align: "start",
    sortable: true,
    width: "10%",
  },
  {
    title: "Patient ID",
    align: "start",
    sortable: true,
    width: "10%",
  },
  {
    title: "Case No",
    align: "start",
    sortable: true,
    width: "10%",
  },
  {
    title: "Patient Name",
    align: "start",
    sortable: true,
    width: "30%",
  },
  {
    title: "Amount",
    align: "start",
    sortable: true,
    width: "15%",
  },
  {
    title: "TransDate",
    align: "start",
    sortable: true,
    width: "5%",
  },
];
const serverItems = ref([]);
const handleRefresh = () => {
    loadItems();
};
const handleSearch = (keyword) => {
  // Handle search action
    loadItems(null, keyword);
};
const openFilterOptions = () => {
  setTimeout(() => {
    open_filter_options.value = true;
  }, 100);
};
const closeFilterOptions = () => {
  open_filter_options.value = false;
};
const applyFilters = () => {
  console.log('Filters applied:', filter.value);
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
const handleViewPayment = () => {
  alert("VIEW");
};
const handleCashierSettings = (settings) => {
  payload.value = settings;
  open_sequence_setting.value = false;
};
const handleNewPayment = () => {
  open_payment_form.value = true;
  setTimeout(() => {
    open_payment_form.value = true;
    open_sequence_setting.value = true;
  }, 100);
};
const closeSequenceSetting = () => {
  open_payment_form.value = false;
  open_sequence_setting.value = false;
  payload.value = {};
};
const closeHandlePayment = () => {
  open_payment_form.value = false;
  payload.value = {};
}
const handleCancelPayment = () => {
  open_cancel_form.value = true;
};
const closeCancelPayment = () => {
  open_cancel_form.value = false;
}

const ViewSummary = () => {
  open_summary_modal.value = true;
}
const closeViewSummary = () => {
  open_summary_modal.value = false;
}

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
  serverItems.value = newServerItems;
};

</script>

<style>
.v-data-table {
  overflow-x: auto;
}
</style>
