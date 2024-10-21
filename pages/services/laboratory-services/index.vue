<template>
    <v-card class="mb-2" elevation="4">
      <v-card-actions>
        <p style="font-weight: bolder; color: #228B22; font-size: larger; margin-right: 10px;">Laboratory Services</p>
        <v-spacer></v-spacer>
        <v-btn
          @click="handleView()"
          :disabled="isSelectedUser"
          prepend-icon="mdi-eye-outline"
          color="primary"
          class="bg-info text-white"
        >
          View
        </v-btn>
        <v-btn
          @click="handleCancellation()"
          prepend-icon="mdi-toggle-switch"
          :disabled="isSelectedUser"
          color="primary"
          class="bg-error text-white"
        >
          Request Cancellation</v-btn
        >
      </v-card-actions>
    </v-card>
  <v-card class="mb-2" elevation="4">
    <ReusableTable
      :items-per-page="50"
      :serverItems="serverItems"
      :totalItems="totalItems"
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
  <div class="floating-wrapper">
    <v-btn
      v-if="newDischargedPatient"
      class="floating-button"
      :class="{ 'blinking': isBlinking }"
      @click="viewDischargedPatients"
      icon
    >
      <v-icon>mdi-bell-ring-outline</v-icon>
    </v-btn>
    <span v-if="isBlinking" class="floating-text">Discharge Notice</span>
  </div>
  <DischargeNoticeForm :open_discharge_notice="open_discharge_notice" @close-dialog="closeDischargeNotice" />
  <PatientLabCharges :open_patient_info_and_charges="open_patient_info_and_charges" :items="items" @close-dialog="closePatientInfoAndCharges" />
  <RequestCancellation :open_request_cancellation="open_request_cancellation" :items="items" @close-dialog="closeRequestCancellation" />
  <Snackbar />
</template>

<script setup>
import ReusableTable from "~/components/reusables/ReusableTable.vue";
import DischargeNoticeForm from "./forms/DischargeNoticeForm.vue";
import PatientLabCharges from "./forms/PatientLabCharges.vue";
import RequestCancellation from "./forms/RequestCancellation.vue";

definePageMeta({
  layout: "root-layout",
});

const { selectedRowDetails, isrefresh } = storeToRefs(useSubcomponentSelectedRowDetailsStore());
const payload = ref({});
const items = ref({});
const isSelectedUser = ref(true);
const currentTab = ref(1);
const pageTitle = ref("");
const showTabs = ref(true);
const columns = ref([]);
const test = ref(['test']);
const newDischargedPatient = ref(false);
const isBlinking = ref(false);
const open_discharge_notice = ref(false);
const open_patient_info_and_charges = ref(false);
const open_request_cancellation = ref(false);

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

const checkForDischargedPatients = async () => {
  try {
    const response = await useMethod("get", "get-discharged-patient-today", "", "");
    if (response) {
      newDischargedPatient.value = true;
      isBlinking.value = true;
    } else {
      isBlinking.value = false;
      console.log("No discharged patients found");
    }
  } catch (error) {
    console.error("Error fetching discharged patients:", error);
  }
};

const closeDischargeNotice = () => {
  open_discharge_notice.value = false;
}

const closePatientInfoAndCharges = () => {
  selectedRowDetails.value = Object.assign({}, {});
  test.value = [];
  isSelectedUser.value = true;
  open_patient_info_and_charges.value = false;
}

const closeRequestCancellation = () => {
  selectedRowDetails.value = Object.assign({}, {});
  test.value = [];
  isSelectedUser.value = true;
  open_request_cancellation.value = false;
}

const viewDischargedPatients = () => {
  open_discharge_notice.value = true;
  newDischargedPatient.value = false;
  isBlinking.value = false;
};

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

const handleCancellation = () => {
  items.value = {
    patient_Id: selectedRowDetails.value.patient_Id,
    case_No: selectedRowDetails.value.case_No,
    mscAccount_Trans_Types: selectedRowDetails.value.mscAccount_Trans_Types,
  };
  if (items.value !== null) {
    open_request_cancellation.value = true;
  }
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
  const intervalId = setInterval(checkForDischargedPatients, 15000);
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
.floating-wrapper {
  position: absolute;
  bottom: 2px;
  right: 20px;
  text-align: center;
  z-index: 999;
}
.floating-button {
  background-color: red;
  color: white;
}
.floating-text {
  display: block;
  color: red;
  font-weight: bold;
  margin-top: 5px; 
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
