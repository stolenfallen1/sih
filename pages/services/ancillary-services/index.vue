<template>
  <v-card class="mb-2" elevation="4">
    <v-card-actions>
      <p style="font-weight: bolder; color: #228B22; font-size: larger; margin-right: 10px;">Ancillary Services</p>
      <v-spacer></v-spacer>
      <v-btn
        :disabled="isSelectedUser"
        prepend-icon="mdi-eye-outline"
        color="primary"
        class="bg-info text-white"
      >
        View
      </v-btn>
      <v-btn
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
      :use-filter="true"
      @fetchPage="loadItems"
      @selected-row="selectedUser"
      @tab-change="handleTabChange"
      @action-search="handleSearch"
      @action-refresh="handleRefresh"
      @open-filter="openFilterOptions"
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

  <v-menu
    v-model="open_filter_options"
    :close-on-content-click="false"
    offset-y
    activator="#filter-button"
  >
    <template v-slot:activator="{ on, attrs }">
      <div></div>
    </template>
    <v-card width="425px" rounded="lg">
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
          <v-col cols="12">
            <p>Department</p>
            <v-autocomplete
              item-value="id"
              item-title="warehouse_description"
              v-model="selectedDepartment"
              :items="department_list"
              density="compact"
              variant="outlined"
              hide-details
            ></v-autocomplete>
          </v-col>
          <!-- <v-col cols="12" style="margin-top: -10px;">
            <p>By Transaction Status</p>
            <v-autocomplete
              item-value="id"
              item-title="status_description"
              v-model="selectedStatus"
              :items="status_list"
              density="compact"
              variant="outlined"
              hide-details
            ></v-autocomplete>
          </v-col> -->
        </v-row>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn class="bg-primary text-white" @click="applyFilters">Apply Filters</v-btn>
      </v-card-actions>
    </v-card>
  </v-menu>

  <Snackbar />

  <!-- Ancillary Services Sub components -->
  <!-- <PatientProfileDialog :show="PatientProfile" :form_payload="form_payload" @close-dialog="useSubComponents('PatientProfile', false)" />
  <DirectRenderDialog :show="DirectRender" @close-dialog="useSubComponents('DirectRender', false)" />
  <DrugAdministrationDialog :show="DrugAdministration" @close-dialog="useSubComponents('DrugAdministration', false)" />
  <ApplyCreditNoteDialog :show="ApplyCreditNote" @close-dialog="useSubComponents('ApplyCreditNote', false)" />
  <CentralizedCreditNoteDialog :show="CentralizedCreditNote" @close-dialog="useSubComponents('CentralizedCreditNote', false)" /> -->
</template>

<script setup>
import ReusableTable from "~/components/reusables/ReusableTable.vue";

const {
  PatientProfile,
  DirectRender,
  DrugAdministration,
  ApplyCreditNote,
  CentralizedCreditNote,
} = storeToRefs(AncillarySubComponentsDialog());

const { 
  PrintPendingRequisition
} = storeToRefs(PQAncillaryServicesDialog());

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

const totalItems = ref(0);
const itemsPerPage = ref(15);
const search = ref("");
const filter = ref({});
const selectedDepartment = ref(null);
const selectedStatus = ref(null);
const open_filter_options = ref(false);
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
  loadItems(null, keyword);
};
const openFilterOptions = () => {
  setTimeout(() => {
    open_filter_options.value = true;
  }, 100);
};
const closeFilterOptions = () => {
  open_filter_options.value = false;
  selectedDepartment.value = null;
};
const applyFilters = () => {
  console.log("Filter Options", {
    selectedDepartment: selectedDepartment.value,
    // selectedStatus: selectedStatus.value,
  }); 
  closeFilterOptions(); 
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

const department_list = ref([]);
const department_list_loading = ref(false);
const getDepartment = async () => {
    department_list_loading.value = true;
    const response = await fetch(useApiUrl() + "/get-departments-list", {
      headers: {
        Authorization: `Bearer `+ useToken(),
      },
    });
    if (response) {
      const data = await response.json();
      department_list.value = data;
      department_list_loading.value = false;
    }
};
const status_list = ref([
  { id: 1, status_description: 'For Rendering' },
  { id: 2, status_description: 'Rendered' },
  { id: 3, status_description: 'Cancelled' },
]);

const updateTotalItems = (newTotalItems) => {
totalItems.value = newTotalItems;
};

const updateServerItems = (newServerItems) => {
serverItems.value = newServerItems;
};

handleTabChange(currentTab.value);

watchEffect(() => {
  getDepartment();
})
</script>

<style>
</style>
