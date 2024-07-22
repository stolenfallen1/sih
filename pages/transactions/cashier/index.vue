<template>
  <v-card class="mb-2" elevation="4">
    <v-card-actions>
      <v-btn
        @click="openCashierSettings"
        :disabled="!isSelectedUser"
        prepend-icon="mdi-plus-outline"
        width="200"
        color="primary"
        class="bg-primary text-white" 
      >
        Cashier Settings
      </v-btn>
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
        Cancel OR</v-btn
      >
      <v-btn
        prepend-icon="mdi-information-box-outline"
        width="150"
        color="primary"
        class="bg-warning text-white"
      >
        Reports</v-btn
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
      <!-- <template v-for="column in headers" v-slot:[`column-${column.key}`]="{ item }">
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

      </template> -->
    </ReusableTable>
  </v-card>
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

  <Snackbar />

  <!-- Forms -->
  <ORSequenceNumber :open_sequence_setting="open_sequence_setting" @close-dialog="closeSequenceSetting" @save-settings="handleCashierSettings" />
  <NewPayment :open_payment_form="open_payment_form" :payload="payload" @close-dialog="closeHandlePayment" @save-payment="onPaymentSubmission" />
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
const openCashierSettings = () => {
  open_sequence_setting.value = true;
  console.log("Open Cashier Settings");
}
const handleCashierSettings = (settings) => {
  payload.value = settings;
  open_sequence_setting.value = false;
};
const handleNewPayment = () => {
  open_payment_form.value = true;
};
const onPaymentSubmission = async (payload) => {
  // console.log(payload);
  if (payload) {
    const response = await useMethod("post", "save-payment", payload);
    if (response) {
      useSnackbar(true, "green", response.message);
    } else {
      useSnackbar(true, "red", "Failed to save payment");
    }
  }
};
const closeSequenceSetting = () => {
  open_sequence_setting.value = false;
};
const closeHandlePayment = () => {
  open_payment_form.value = false;
}
const handleCancelPayment = () => {
  open_cancel_form.value = true;
};
const closeCancelPayment = () => {
  open_cancel_form.value = false;
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

onMounted(() => {
  console.log("TEST");
})

</script>

<style>
.v-data-table {
  overflow-x: auto;
}
</style>
