<template>
    <v-card class="mb-2" elevation="4">
      <v-card-actions>
        <p style="font-weight: bolder; color: #228B22; font-size: larger; margin-right: 10px;">Laboratory Services</p>
        <v-spacer></v-spacer>
        <v-btn
          @click="handleView()"
          :disabled="isSelectedUser"
          prepend-icon="mdi-eye-outline"
          class="bg-info text-white"
        >
          View
        </v-btn>
        <v-btn
          @click="openPatientCheckLabStatus()"
          prepend-icon="mdi-eye-outline"
          class="bg-success text-white"
        >
          Patient Lab Request Status
        </v-btn>
      </v-card-actions>
    </v-card>
  <v-card class="mb-2" elevation="4">
    <ReusableTable
      :items-per-page="50"
      :serverItems="serverItems"
      :totalItems="totalItems"
      :table-height="tableHeight"
      :loading="loading"
      :tabs="tableTabs"
      :columns="columns"
      :showTabs="showTabs"
      :test="test"
      :itemsPerPage="itemsPerPage"
      :tableTitle="pageTitle"
      :current-tab="currentTab"
      @fetchPage="loadItems"
      @selected-row="selectedUser"
      @tab-change="handleTabChange"
      @action-search="handleSearch"
      @action-refresh="handleRefresh"
    >
      <template v-for="column in columns" v-slot:[`column-${column.key}`]="{ item }">
        <span v-if="column.key === 'patient_details.lastname'" :key="column.key">
          {{ item.patient_details ? item.patient_details?.lastname + " , " + item.patient_details?.firstname + "  " + item.patient_details?.middlename : "" }}
        </span>
        <span v-if="column.key === 'patient_Age'" :key="column.key">
          {{ item.patient_Age ? item.patient_Age : "" }}
        </span>
        <span v-if="column.key === 'patient_details.birthdate'" :key="column.key">
          {{ item.patient_details ? useDateMMDDYYY(item.patient_details.birthdate) : "" }}
        </span>
        <span v-if="column.key === 'ornumber'" :key="column.key">
          {{ item.billing_out ? item.billing_out[0].ornumber : "" }}
        </span>
        <span v-if="column.key === 'refNum'" :key="column.key">
          {{ item.billing_out ? item.billing_out[0].refNum : "" }}
        </span>
      </template>
    </ReusableTable>
  </v-card>

  <main class="button-container">
    <div style="display: flex; align-items: center; flex-direction: column;">
      <v-btn
        v-if="newOPDLabRequest"
        class="floating-button-opd"
        :class="{ 'blinking': isOPDBlinking }"
        @click="openCarryOrderForm('OPD')"
        icon
      >
        <v-icon>mdi-bell-ring-outline</v-icon>
      </v-btn>
      <span v-if="isOPDBlinking" class="floating-text">Out-patient Lab Request</span>
    </div>
    <div style="display: flex; align-items: center; flex-direction: column;">
      <v-btn
        v-if="newERLabRequest"
        class="floating-button-er"
        :class="{ 'blinking': isERBlinking }"
        @click="openCarryOrderForm('ER')"
        icon
      >
        <v-icon>mdi-bell-ring-outline</v-icon>
      </v-btn>
      <span v-if="isERBlinking" class="floating-text">Emergency Lab Request</span>
    </div>
    <div style="display: flex; align-items: center; flex-direction: column;">
      <v-btn
        v-if="newIPDLabRequest"
        class="floating-button-ipd"
        :class="{ 'blinking': isIPDBlinking }"
        icon
      >
        <v-icon>mdi-bell-ring-outline</v-icon>
      </v-btn>
      <span v-if="isIPDBlinking" class="floating-text">In-patient Lab Request</span>
    </div>
  </main>

  <CarryLabOrder 
    :open_pending_patients_list="open_pending_patients_list" 
    :patient_type="patient_type" 
    :item="selected_item"
    @close-dialog="closeCarryOrderForm" 
  />

  <PatientLabCharges :open_patient_info_and_charges="open_patient_info_and_charges" :items="items" @close-dialog="closePatientInfoAndCharges" />
  <Snackbar />
</template>

<script setup>
import ReusableTable from "~/components/reusables/ReusableTable.vue";
import CarryLabOrder from "./forms/CarryLabOrder.vue";
import PatientLabCharges from "./forms/PatientLabCharges.vue";

definePageMeta({
  layout: "root-layout",
});

const { selectedRowDetails, isrefresh } = storeToRefs(useSubcomponentSelectedRowDetailsStore());
const payload = ref({});
const items = ref({});
const isSelectedUser = ref(true);
const currentTab = ref(1);
const pageTitle = ref("");
const tableHeight = ref("58vh");
const showTabs = ref(true);
const columns = ref([]);
const test = ref(['test']);
const open_pending_patients_list = ref(false);
const newOPDPatientData = ref([]);
const newERPatientData = ref([]);
const newIPDPatientData = ref([]);
const newOPDLabRequest = ref(false);
const newERLabRequest = ref(false);
const newIPDLabRequest = ref(false);
const isOPDBlinking = ref(false);
const isERBlinking = ref(false);
const isIPDBlinking = ref(false);
const open_patient_info_and_charges = ref(false);
const open_patient_check_lab_status = ref(false);
const patient_type = ref(0);
const selected_item = ref([]);

const totalItems = ref(0);
const itemsPerPage = ref(15);
const search = ref("");
const params = ref("");
const loading = ref(true);
const tableTabs = ref([
  {
    label: "Out-Patient",
    title: "Out-Patient's Record",
    value: 1,
    endpoint: useApiUrl() + "/get-opd-patients",
    columns: [
              {
                title: "Patient ID",
                align: "start",
                sortable: false,
                key: "patient_Id",
              },
              {
                title: "Case No.",
                align: "start",
                sortable: false,
                key: "case_No",
              },
              {
                title: "Patient Name",
                align: "start",
                sortable: false,
                key: "patient_details.lastname",
              },
              {
                title: "Age",
                align: "start",
                sortable: false,
                key: "patient_Age",
              },
              {
                title: "Birthdate",
                align: "start",
                sortable: false,
                key: "patient_details.birthdate",
              },
              {
                title: "Requesting Physician",
                align: "start",
                sortable: false,
                key: "attending_Doctor_fullname",
              },
    ],
  },
  {
    label: "Emergency",
    title: "Emergency's Record",
    value: 2,
    endpoint: useApiUrl() + "/get-er-patients",
    columns: [
              {
                title: "Patient ID",
                align: "start",
                sortable: false,
                key: "patient_Id",
              },
              {
                title: "Case No.",
                align: "start",
                sortable: false,
                key: "case_No",
              },
              {
                title: "Bed No.",
                align: "start",
                sortable: false,
                key: "er_Bedno",
              },
              {
                title: "Patient Name",
                align: "start",
                sortable: false,
                key: "patient_details.lastname",
              },
              {
                title: "Age",
                align: "start",
                sortable: false,
                key: "patient_Age",
              },
              {
                title: "Birthdate",
                align: "start",
                sortable: false,
                key: "patient_details.birthdate",
              },
              {
                title: "Requesting Physician",
                align: "start",
                sortable: false,
                key: "attending_Doctor_fullname",
              },
    ],
  },
  {
    label: "In-Patient",
    title: "In-Patient's Record",
    value: 3,
    endpoint: useApiUrl() + "/get-ipd-patients",
    columns: [
              {
                title: "Patient ID",
                align: "start",
                sortable: false,
                key: "patient_Id",
              },
              {
                title: "Case No.",
                align: "start",
                sortable: false,
                key: "case_No",
              },
              {
                title: "Bed No.",
                align: "start",
                sortable: false,
                key: "room_Code",
              },
              {
                title: "Patient Name",
                align: "start",
                sortable: false,
                key: "patient_details.lastname",
              },
              {
                title: "Age",
                align: "start",
                sortable: false,
                key: "patient_Age",
              },
              {
                title: "Birthdate",
                align: "start",
                sortable: false,
                key: "patient_details.birthdate",
              },
              {
                title: "Requesting Physician",
                align: "start",
                sortable: false,
                key: "attending_Doctor_fullname",
              },
    ],
  },
]);
const serverItems = ref([]);
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
  selectedRowDetails.value.id = ""; 
  selectedRowDetails.value.role_id = ""; 

  if(item){
    selectedRowDetails.value =  Object.assign({}, item);; 
    isrefresh.value = true;
    isSelectedUser.value = false;
  }else{
    isrefresh.value = false;
    isSelectedUser.value = true;
  }
};

const closePatientInfoAndCharges = () => {
  selectedRowDetails.value = Object.assign({}, {});
  test.value = [];
  isSelectedUser.value = true;
  open_patient_info_and_charges.value = false;
}

const handleView = async () => {
  items.value = {
    patient_Id: selectedRowDetails.value.patient_Id,
    case_No: selectedRowDetails.value.case_No,
    mscAccount_Trans_Types: selectedRowDetails.value.mscAccount_Trans_Types,
  };
  if (items.value !== null) {
    open_patient_info_and_charges.value = true;
  }
}

const openPatientCheckLabStatus = () => {
  open_patient_check_lab_status.value = true;
}

const closePatientCheckLabStatus = () => {
  open_patient_check_lab_status.value = false;
}

const loadItems = async (options = null, searchkeyword = null) => {
  try {
    loading.value = true;

    let keyword = searchkeyword || "";
      params.value = options  ? "page=" + options.page + "&per_page=" + options.itemsPerPage + "&keyword=" + options.keyword
    : "page=1&per_page=50&keyword=" + keyword;

    const currentTabInfo = tableTabs.value.find((tab) => tab.value === currentTab.value);
    const response = await fetch(currentTabInfo?.endpoint + "?" + params.value || "", {
      headers: {
        Authorization: `Bearer `+ useToken(),
      },
    });
    const data = await response.json();
    updateTotalItems(data.total);
    updateServerItems(data.data);
    loading.value = false;
  } catch (error) {
    console.error("Error fetching data:", error);
    loading.value = false;
  } finally {
    loading.value = false;
  }
};

const fetchOutPatientCount = async () => {
    try {
      const response = await useMethod("get", "get-laboratory-opd-orders", "", "");
      if (response) {
        newOPDPatientData.value = response;
        if (newOPDPatientData.value.length > 0) {
          newOPDLabRequest.value = true;
          isOPDBlinking.value = true;
        }
      } else {
        isOPDBlinking.value = false;
      }
    } catch (error) {
      console.error("Error fetching out-patient data:", error);
    }
}

const closeCarryOrderForm = () => {
  open_pending_patients_list.value = false;
}

const fetchERPatientCount = async () => {
  try {
      const response = await useMethod("get", "get-laboratory-er-orders", "", "");
      if (response) {
        newERPatientData.value = response;
        if (newERPatientData.value.length > 0) {
          newERLabRequest.value = true;
          isERBlinking.value = true;
        }
      } else {
        isERBlinking.value = false;
      }
    } catch (error) {
      console.error("Error fetching out-patient data:", error);
    }
}

// const fetchInPatientCount = async () => {
  
// }

const openCarryOrderForm = (type) => {
  selected_item.value = []; 

  if (type === "OPD") {
    selected_item.value = newOPDPatientData.value;
    patient_type.value = 2;
  } else if (type === "ER") {
    selected_item.value = newERPatientData.value;
    patient_type.value = 5;
  } 

  open_pending_patients_list.value = true;
};

const fetchAllCounts = async () => {
    await fetchOutPatientCount();
    await fetchERPatientCount();
    // await fetchInPatientCount();
};

const handleTabChange = (tabValue) => {
  selectedRowDetails.value.id = "";
  payload.value = Object.assign({}, {});
  currentTab.value = tabValue;
  columns.value = tableTabs.value.find((tab) => tab.value === tabValue).columns;
  const currentTabInfo = tableTabs.value.find((tab) => tab.value === tabValue);
  pageTitle.value = currentTabInfo.title || "";
  loadItems();
}

const updateTotalItems = (newTotalItems) => {
  totalItems.value = newTotalItems;
};

const updateServerItems = (newServerItems) => {
  serverItems.value = newServerItems;
};

onMounted(() => {
  const intervalId = setInterval(fetchAllCounts, 5000);
  onBeforeUnmount(() => {
    clearInterval(intervalId);
  });
});


handleTabChange(currentTab.value);
</script>

<style>
.v-data-table {
  overflow-x: auto;
}
.button-container {
  display: flex;
  justify-content: space-around;
}
.floating-button-opd {
  background-color: red;
  color: white;
}
.floating-button-er {
  background-color: red;
  color: white;
}
.floating-button-ipd {
  background-color: red;
  color: white;
}
.floating-text {
  display: block;
  color: red;
  font-weight: bold;
}
.blinking {
  animation: blinking 1s infinite;
}
@keyframes blinking {
  0% { opacity: 1; }
  50% { opacity: 0.5; }
  100% { opacity: 1; }
}

</style>
