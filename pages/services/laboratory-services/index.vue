<template>
    <v-card class="mb-2" elevation="4">
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
          @click="handleView('view')"
          :disabled="isSelectedUser"
          prepend-icon="mdi-eye-outline"
          width="100"
          color="primary"
          class="bg-info text-white"
        >
          View
        </v-btn>
        <v-btn
          @click="RevokeUser"
          prepend-icon="mdi-toggle-switch"
          :disabled="isSelectedUser"
          width="300"
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
        <div v-if="column.key === 'SOA' && item.patient_registry && item.patient_registry[0].mscPrice_Schemes == 2" >
          <v-tooltip text="Statement of Account">
            <template v-slot:activator="{ props }">
              <v-btn v-bind="props" density="compact" hide-details @click="openPatientSOA(item)">
                <v-icon>mdi-clipboard-file-outline</v-icon>
              </v-btn>
            </template>
          </v-tooltip>
        </div>
        <div v-if="column.key === 'registry_Status'" :key="column.key" class="isActive">
          <span 
            :style="{ cursor: 'default', display: 'block', height: '26px', width: '9px', backgroundColor: item.patient_registry && item.patient_registry[0].mscPatient_Category == 2 ? 'blue' : 'green' }" 
            :title="item.patient_registry && item.patient_registry[0].mscPatient_Category == 2 ? 'New Patient' : 'Old Patient'"
            />
        </div>
        <div v-if="column.key === 'isHMO'" :key="column.key" class="isHMO">
          <span 
            :style="{ cursor: 'default', display: 'block', height: '26px', width: '9px', backgroundColor: item.patient_registry && item.patient_registry[0].mscPrice_Schemes == 2 ? 'yellow' : 'orange' }" 
            :title="item.patient_registry && item.patient_registry[0].mscPrice_Schemes == 2 ? 'HMO ' : 'Self Pay'" 
            />
        </div>
        <span v-if="column.key === 'case_No'" :key="column.key">
          {{ item.patient_registry ? item.patient_registry[0].case_No : "..." }}
        </span>
        <span v-if="column.key === 'sex'" :key="column.key" style="display: flex;">
          <v-icon v-if="item.sex && item.sex.sex_description === 'Male'" color="primary">mdi-gender-male</v-icon>
          <v-icon v-else color="pink">mdi-gender-female</v-icon>
          {{ item.sex ? item.sex.sex_description : "..." }}
        </span>
        <span v-if="column.key === 'birthdate'" :key="column.key">
          {{ item.birthdate ? useDateMMDDYYY(item.birthdate) : "..." }}
        </span>
        <span v-if="column.key === 'registry_date'" :key="column.key">
          {{ item.patient_registry && item.patient_registry[0].registry_Date ? useDateMMDDYYY(item.patient_registry[0].registry_Date) : "..." }}
        </span>
        <span v-if="column.key === 'discharged_date'" :key="column.key">
          {{ item.patient_registry && item.patient_registry[0].discharged_Date ? useDateMMDDYYY(item.patient_registry[0].discharged_Date) : "..." }}
        </span>
        <span v-if="column.key === 'revoked_Date'" :key="column.key">
          {{ item.patient_registry && item.patient_registry[0].revoked_Date ? useDateMMDDYYY(item.patient_registry[0].revoked_Date) : "..." }}
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
</template>

<script setup>
import ReusableTable from "~/components/reusables/ReusableTable.vue";
import DischargeNoticeForm from "./forms/DischargeNoticeForm.vue";

definePageMeta({
  layout: "root-layout",
});

const { selectedRowDetails, isrefresh } = storeToRefs(useSubcomponentSelectedRowDetailsStore());
const payload = ref({});
const isSelectedUser = ref(true);
const pageTitle = ref("Laboratory Services");
const currentTab = ref(1);
const showTabs = ref(true);
const columns = ref([]);
const newDischargedPatient = ref(false);
const isBlinking = ref(false);
const open_discharge_notice = ref(false);

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
    endpoint: useApiUrl() + "/get-outpatient",
    columns: [
              {
                title: "",
                align: "start",
                sortable: false,
                key: "Rendered",
              },
              {
                title: "",
                align: "start",
                sortable: false,
                key: "Active",
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
                key: "lastname",
              },
              {
                title: "OR No.",
                align: "start",
                sortable: false,
                key: "ORNum",
              },
              {
                title: "Age",
                align: "start",
                sortable: false,
                key: "age",
              },
              {
                title: "Requisition No.",
                align: "start",
                sortable: false,
                key: "requisition_no",
              },
              {
                title: "Requisition DateTime",
                align: "start",
                sortable: false,
                key: "requisition_datetime",
              },
              {
                title: "Requesting Physician",
                align: "start",
                sortable: false,
                key: "requesting_physician",
              },
              {
                title: "Render DateTime",
                align: "start",
                sortable: false,
                key: "render_datetime",
              },
              {
                title: "Amount",
                align: "start",
                sortable: false,
                key: "amount",
              },
              {
                title: "Payment Amount",
                align: "start",
                sortable: false,
                key: "payment_amount",
              },
              {
                title: "Payer",
                align: "start",
                sortable: false,
                key: "payer",
              },
              {
                title: "Requested By",
                align: "start",
                sortable: false,
                key: "requested_by",
              },
              {
                title: "Rendered By",
                align: "start",
                sortable: false,
                key: "rendered_by",
              },
              {
                title: "Cancelled By",
                align: "start",
                sortable: false,
                key: "cancelled_by",
              },
    ],
  },
  {
    label: "Emergency",
    title: "Emergency's Record",
    value: 2,
    endpoint: useApiUrl() + "/get-outpatient",
    columns: [
            {
                title: "",
                align: "start",
                sortable: false,
                key: "Rendered",
              },
              {
                title: "",
                align: "start",
                sortable: false,
                key: "Active",
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
                key: "lastname",
              },
              {
                title: "OR No.",
                align: "start",
                sortable: false,
                key: "ORNum",
              },
              {
                title: "Age",
                align: "start",
                sortable: false,
                key: "age",
              },
              {
                title: "Bed No.",
                align: "start",
                sortable: false,
                key: "bed_no",
              },
              {
                title: "Requisition No.",
                align: "start",
                sortable: false,
                key: "requisition_no",
              },
              {
                title: "Requisition DateTime",
                align: "start",
                sortable: false,
                key: "requisition_datetime",
              },
              {
                title: "Requesting Physician",
                align: "start",
                sortable: false,
                key: "requesting_physician",
              },
              {
                title: "Render DateTime",
                align: "start",
                sortable: false,
                key: "render_datetime",
              },
              {
                title: "Amount",
                align: "start",
                sortable: false,
                key: "amount",
              },
              {
                title: "Payment Amount",
                align: "start",
                sortable: false,
                key: "payment_amount",
              },
              {
                title: "Payer",
                align: "start",
                sortable: false,
                key: "payer",
              },
              {
                title: "Requested By",
                align: "start",
                sortable: false,
                key: "requested_by",
              },
              {
                title: "Rendered By",
                align: "start",
                sortable: false,
                key: "rendered_by",
              },
              {
                title: "Cancelled By",
                align: "start",
                sortable: false,
                key: "cancelled_by",
              },
    ],
  },
  {
    label: "In-Patient",
    title: "In-Patient's Record",
    value: 3,
    endpoint: useApiUrl() + "/get-outpatient",
    columns: [
              {
                title: "",
                align: "start",
                sortable: false,
                key: "Rendered",
              },
              {
                title: "",
                align: "start",
                sortable: false,
                key: "Active",
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
                key: "lastname",
              },
              {
                title: "OR No.",
                align: "start",
                sortable: false,
                key: "ORNum",
              },
              {
                title: "Age",
                align: "start",
                sortable: false,
                key: "age",
              },
              {
                title: "Room No.",
                align: "start",
                sortable: false,
                key: "room_no",
              },
              {
                title: "Requisition No.",
                align: "start",
                sortable: false,
                key: "requisition_no",
              },
              {
                title: "Requisition DateTime",
                align: "start",
                sortable: false,
                key: "requisition_datetime",
              },
              {
                title: "Requesting Physician",
                align: "start",
                sortable: false,
                key: "requesting_physician",
              },
              {
                title: "Render DateTime",
                align: "start",
                sortable: false,
                key: "render_datetime",
              },
              {
                title: "Amount",
                align: "start",
                sortable: false,
                key: "amount",
              },
              {
                title: "Case No.",
                align: "start",
                sortable: false,
                key: "case_No",
              },
              {
                title: "OR No.",
                align: "start",
                sortable: false,
                key: "ORNum",
              },
              {
                title: "Payment Amount",
                align: "start",
                sortable: false,
                key: "payment_amount",
              },
              {
                title: "Payer",
                align: "start",
                sortable: false,
                key: "payer",
              },
              {
                title: "Requested By",
                align: "start",
                sortable: false,
                key: "requested_by",
              },
              {
                title: "Rendered By",
                align: "start",
                sortable: false,
                key: "rendered_by",
              },
              {
                title: "Cancelled By",
                align: "start",
                sortable: false,
                key: "cancelled_by",
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

const viewDischargedPatients = () => {
  open_discharge_notice.value = true;
  newDischargedPatient.value = false;
  isBlinking.value = false;
};

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
