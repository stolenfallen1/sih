<template>
  <v-card class="mb-2" elevation="4">
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
        prepend-icon="mdi-plus-outline"
        width="100"
        color="primary"
        class="bg-primary text-white"
      >
        New
      </v-btn>

      <v-btn
        @click="handleEdit"
        :disabled="isSelectedUser"
        prepend-icon="mdi-pencil"
        width="100"
        color="primary"
        class="bg-success text-white"
      >
        Edit
      </v-btn>
      <v-btn
        @click="DeactiveUser"
        :disabled="isSelectedUser"
        prepend-icon="mdi-toggle-switch"
        width="150"
        color="primary"
        class="bg-error text-white"
      >
        Deactive</v-btn
      >
    </v-card-actions>
  </v-card>
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
      <span v-if="column.key === 'birthdate'" :key="column.key">
        {{ useDateMMDDYYY(item.birthdate) }}
      </span>
      <span v-if="column.key === 'isactive'" :key="column.key">
        {{ item.isactive == 1 ? "Active" : "In Active" }}
      </span>

      <!-- Add more custom logic for other columns -->
    </template>
  </ReusableTable>
  <!-- Central Lookup Search Form -->
  <CentralLookUpForm
    :central_form_dialog="central_form_dialog"
    @close-dialog="closeCentralFormDialog"
    @search="SearchPatient"
    @selected-row="selectedPatient"
    :search_results="search_results"
    :search_payload="search_payload"
    @open-form="openAddFormDialog"
  />
  <FormContainer
    :show="form_dialog"
    :form_payload="form_payload"
    @close-dialog="closeFormContainer"
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

  <!-- Out-patients Sub components -->
  <OutpatientCaseHistoryDialog :show="OutpatientCaseHistory" @close-dialog="useSubComponents('OutpatientCaseHistory', false)" />
  <EmergencyCaseHistoryDialog :show="EmergencyCaseHistory" @close-dialog="useSubComponents('EmergencyCaseHistory', false)" />
  <InpatientCaseHistoryDialog :show="InpatientCaseHistory" @close-dialog="useSubComponents('InpatientCaseHistory', false)" />
  <HoldReleaseAccountDialog :show="HoldReleaseAccount" @close-dialog="useSubComponents('HoldReleaseAccount', false)" />
  <ViewHs7HistoricalDataDialog :show="ViewHs7HistoricalData" @close-dialog="useSubComponents('ViewHs7HistoricalData', false)" />
</template>

<script setup>
import ReusableTable from "~/components/reusables/ReusableTable.vue";
import FormContainer from "~/components/master-file/forms/patient/FormContainer.vue";
import { PQPatientMasterDialog } from "~/store/processing-queries/master-file/PQPatientMasterDialog";

const {
  OutpatientCaseHistory,
  EmergencyCaseHistory,
  InpatientCaseHistory,
  HoldReleaseAccount,
  ViewHs7HistoricalData,
  ViewingOfResultImage,
  DietCounseling, 
} = storeToRefs(MFPatientsDialog());

const {
  DocumentArchives,
  ReissuePrivilegeCard,
} = storeToRefs(PQPatientMasterDialog());

definePageMeta({
  layout: "root-layout",
});

const central_form_dialog = ref(false);
const form_dialog = ref(false);
const search_payload = ref({});
const search_results = ref([]);
const filter = ref({});
const open_filter_options = ref(false);
const form_payload = ref({});
const { selectedRowDetails, isrefresh } = storeToRefs(useSubcomponentSelectedRowDetailsStore());
const isSelectedUser = ref(true);
const pageTitle = ref("Patient Master");
const currentTab = ref(false);
const showTabs = ref(false);
const tableTabs = ref([]);
const totalItems = ref(0);
const itemsPerPage = ref(15);
const search = ref("");
const params = ref("");
const loading = ref(true);
const headers = [
  {
    title: "Patient ID",
    align: "start",
    sortable: true,
    key: "patient_id",
    width: "9%",
  },
  {
    title: "Patient Name",
    key: "patient_name",
    align: "start",
    width: "30%",
    sortable: false,
  },
  {
    title: "Birthdate",
    key: "birthdate",
    align: "start",
    width: "15%",
    sortable: false,
  },
  {
    title: "Address",
    key: "bldgstreet",
    align: "start",
    width: "25%",
    sortable: false,
  },
  {
    title: "Mobile No.",
    key: "mobile_number",
    align: "start",
    width: "15%",
    sortable: false,
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

const selectedPatient = (item) => {
  form_payload.value.id = ""; //clear state id for subcomponents ?id=''
  form_payload.value.role_id = ""; //clear state id for subcomponents ?id=''
  form_payload.value = Object.assign({});
  if (item) {
    form_payload.value = Object.assign({}, item); //set state id for subcomponents ?id=item.id value
    form_payload.value.suffix_id = parseInt(item.suffix_id);
    form_payload.value.sex_id = item.sex_id ? parseInt(item.sex_id) : 0;
    form_payload.value.civilstatus_id = parseInt(item.civilstatus_id);
    form_payload.value.nationality_id = parseInt(item.nationality_id);
    form_payload.value.religion_id = parseInt(item.religion_id);
    form_payload.value.birthdate = useDateMMDDYYY(item.birthdate);
  }
};
const selectedUser = (item) => {
  isSelectedUser.value = true;
  isrefresh.value = false;
  selectedRowDetails.value.id = ""; //clear state id for subcomponents ?id=''
  selectedRowDetails.value.role_id = ""; //clear state id for subcomponents ?id=''

  form_payload.value = Object.assign({}); //set state id for subcomponents ?id=item.id value
  if (item) {
    form_payload.value = Object.assign({}, item);
    selectedRowDetails.value = Object.assign({}, item); //set state id for subcomponents ?id=item.id value
    isrefresh.value = true;
    isSelectedUser.value = false;
  } else {
    isrefresh.value = false;
    isSelectedUser.value = true;
  }
};

const details = () => {
  if (form_payload) {
    form_payload.value.suffix_id = parseInt(form_payload.value.suffix_id);
    form_payload.value.sex_id = parseInt(form_payload.value.sex_id);
    form_payload.value.civilstatus_id = parseInt(form_payload.value.civilstatus_id);
    form_payload.value.nationality_id = parseInt(form_payload.value.nationality_id);
    form_payload.value.religion_id = parseInt(form_payload.value.religion_id);
    form_payload.value.birthdate = useDateMMDDYYY(form_payload.value.birthdate);
  }
};

const handleView = () => {
  // handle View action
  if (Object.keys(form_payload.value).length === 0)
    return useSnackbar(true, "error", "Select Patient");
  details();
  form_dialog.value = true;
  form_payload.value.type = "view";
};

const handleNew = () => {
  form_payload.value = Object.assign({});
  form_payload.value.type = "new";
  central_form_dialog.value = true;
};
const closeCentralFormDialog = () => {
  form_payload.value = Object.assign({});
  central_form_dialog.value = false;
};
const openAddFormDialog = (type) => {
  if (type == "new") {
    form_payload.value = Object.assign({});
  }
  if (form_payload.value.id) {
    search_results.value = [];
    details();
    form_payload.value.type = "edit";
  } else {
    form_payload.value.lastname = search_payload.value.lastname;
    form_payload.value.firstname = search_payload.value.firstname;
  }
  form_dialog.value = true;
};
const closeFormContainer = () => {
  form_payload.value = Object.assign({});
  form_dialog.value = false;
};

const handleEdit = () => {
  if (Object.keys(form_payload.value).length === 0)
    return useSnackbar(true, "error", "Select Patient");
  details();
  form_dialog.value = true;
  form_payload.value.type = "edit";
};

const DeactiveUser = () => {
  if (Object.keys(form_payload.value).length === 0)
    return useSnackbar(true, "error", "Select Patient");
  // handle Deactive action
  form_dialog.value = true;
  form_payload.value.type = "edit";
};

const SearchPatient = async (payload) => {
  search_payload.value.isloading = true;
  let lastname = payload.lastname || "";
  let firstname = payload.firstname || "";
  let middlename = payload.middlename || "";
  let birthdate = payload.birthdate || "";
  let params =
    "page=1&per_page=10&lastname=" +
    lastname +
    "&firstname=" +
    firstname +
    "&middlename=" +
    middlename +
    "&birthdate=" +
    birthdate;
  const response = await fetch(
    useApiUrl() + "/search-patient-master" + "?" + params || "",
    {
      headers: {
        Authorization: `Bearer ` + useToken(),
      },
    }
  );
  if (response) {
    const data = await response.json();
    updateSearchItems(data);
    search_payload.value.isloading = false;
  }
};

const updateSearchItems = (items) => {
  search_results.value = items;
  console.log(search_results.value, "search");
};

const loadItems = async (options = null, searchkeyword = null) => {
  try {
    loading.value = true;
    let keyword = searchkeyword || "";
    params.value = options
      ? "page=" +
        options.page +
        "&per_page=" +
        options.itemsPerPage +
        "&keyword=" +
        options.keyword
      : "page=1&per_page=10&keyword=" + keyword;
    const response = await fetch(
      useApiUrl() + "/patient-master" + "?" + params.value || "",
      {
        headers: {
          Authorization: `Bearer ` + useToken(),
        },
      }
    );
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

<style scoped></style>
