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
        @click="handleNew('new')"
        :disabled="!isSelectedUser"
        prepend-icon="mdi-plus-outline"
        width="100"
        color="primary"
        class="bg-primary text-white"
      >
        New
      </v-btn>
      <v-btn
        @click="handleEdit('edit')"
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
      <v-btn
        @click="ViewSummary"
        prepend-icon="mdi-information-box-outline"
        width="150"
        color="primary"
        class="bg-warning text-white"
      >
        Summary</v-btn
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
      <template v-for="column in headers" v-slot:[`column-${column.key}`]="{ item }">
        <span v-if="column.key === 'sex'" :key="column.key" style="display: flex;">
          <v-icon v-if="item.sex && item.sex.sex_description === 'Male'" color="primary">mdi-gender-male</v-icon>
          <v-icon v-else color="pink">mdi-gender-female</v-icon>
          {{ item.sex ? item.sex.sex_description : "..." }}
        </span>
        <span v-if="column.key === 'birthdate'" :key="column.key">
          {{ item.birthdate ? useDateMMDDYYY(item.birthdate) : "..." }}
        </span>
        <span v-if="column.key === 'patient_registry'" :key="column.key">
          {{ item.patient_registry ? useDateMMDDYYY(item.patient_registry.registry_date) : "..." }}
        </span>
      </template>
    </ReusableTable>
  </v-card>

  <CentralLookUpForm 
    :central_form_dialog="central_form_dialog"
    @close-dialog="closeCentralFormDialog"
    @search="SearchOutPatient"
    @selected-row="selectedOutPatient"
    :search_results="search_results"
    :search_payload="search_payload"
    @open-form="openAddFormDialog"
  />

  <SummaryModal 
    :show="open_summary_modal"
    :summary_header="'Outpatient'"
    :data="outpatients_test_data"
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

  <OutPatientRegistration :clicked_option="clicked_option" :form_dialog="form_dialog" @close-dialog="closeAddFormDialog" />
  
  <!-- Out-patients Sub components -->
  <PatientProfileDialog :show="PatientProfile" :form_payload="form_payload" @close-dialog="useSubComponents('PatientProfile', false)" />
  <SuspendDialog :show="Suspend" :form_type="form_type" @close-dialog="useSubComponents('Suspend', false)" />
  <RequisitionsDialog :show="Requisitions" :form_type="form_type" @close-dialog="useSubComponents('Requisitions', false)" />
  <PostChargesDialog :show="PostCharges" @close-dialog="useSubComponents('PostCharges', false)" />
  <PrintTransReceiptDialog :show="PrintTransactionReceipt" @close-dialog="useSubComponents('PrintTransactionReceipt', false)"/>
  <PostCorporatePackageDialog :show="PostCorporateMedicalPackage" @close-dialog="useSubComponents('PostCorporateMedicalPackage', false)"/>
  <PostDiagnosticPackageDialog :show="PostDiagnosticMedicalPackage" @close-dialog="useSubComponents('PostDiagnosticMedicalPackage', false)"/> 
  <PostAdjustmentDialog :show="PostAdjustments" @close-dialog="useSubComponents('PostAdjustments', false)" />
  <PostProfessionalFeesDialog :show="PostProfessionalFees" @close-dialog="useSubComponents('PostProfessionalFees', false)" />
  <PostDiscountsDialog :show="PostDiscounts" @close-dialog="useSubComponents('PostDiscounts', false)" />
  <PostArTransferDialog :show="PostArTransfer" :form_type="form_type" @close-dialog="useSubComponents('PostArTransfer', false)" />
  <ViewExamUpshotDialog :show="ViewExaminationUpshot" @close-dialog="useSubComponents('ViewExaminationUpshot', false)" />
  <ApplyPromissoryNoteDialog :show="ApplyPromissoryNote" @close-dialog="useSubComponents('ApplyPromissoryNote', false)" />
  <ApplyMedicalPackageDialog :show="ApplyMedicalPackage" @close-dialog="useSubComponents('ApplyMedicalPackage', false)" />
  <TagAsMghDialog :show="TagAsMgh" :form_type="form_type" @close-dialog="useSubComponents('TagAsMgh', false)" />
  <UntagAsMghDialog :show="UntagAsMgh" @close-dialog="useSubComponents('UntagAsMgh', false)" />
  <DischargeDialog :show="Discharge" :form_type="form_type" @close-dialog="useSubComponents('Discharge', false)" />
  <DischargeInstructionDialog :show="DischargeInstruction" @close-dialog="useSubComponents('DischargeInstruction', false)" />
  <PostFinalDiagnosisDialog :show="PostFinalDiagnosis" @close-dialog="useSubComponents('PostFinalDiagnosis', false)" />
  <SoaBillingDialog :show="SoaBillingStatement" @close-dialog="useSubComponents('SoaBillingStatement', false)" />
  <ViewPrintReportsDialog :show="ViewPrintReports" @close-dialog="useSubComponents('ViewPrintReports', false)" />
  <AdmitPatientDialog :show="AdmitPatient" :form_type="form_type" @close-dialog="useSubComponents('AdmitPatient', false)" />
  <TransferErDialog :show="TransferToEr" @close-dialog="useSubComponents('TransferToEr', false)" />
  <PrintClaimFormsDialog :show="PrintClaimForms" @close-dialog="useSubComponents('PrintClaimForms', false)" />
  <ClaimForm4ProcessingDialog :show="ClaimForm4Processing" @close-dialog="useSubComponents('ClaimForm4Processing', false)" />

  <!-- Out-patients Processing Querires -->
  <ItemServicesStatusReportDialog :show="ItemsAndServicesStatusReport" @close-dialog="useProcessingQueries('ItemsAndServicesStatusReport', false)" />
  <MayGoHomePatientListDialog :show="MayGoHomePatientList" @close-dialog="useProcessingQueries('MayGoHomePatientList', false)" />
  <Cf4DischargedPatientsDialog :show="Cf4ForDischargedPatients" :form_type="form_type" @close-dialog="useProcessingQueries('Cf4ForDischargedPatients', false)" />
</template>

<script setup>
import PatientProfileDialog from "../../../components/master-file/forms/patient/FormContainer.vue";

import ReusableTable from "~/components/reusables/ReusableTable.vue";
const {
  PatientProfile,
  Suspend,
  Requisitions,
  PostCharges,
  PrintTransactionReceipt,
  PostCorporateMedicalPackage,
  PostDiagnosticMedicalPackage,
  PostAdjustments,
  PostProfessionalFees,
  PostDiscounts,
  PostArTransfer,
  ViewExaminationUpshot,
  ApplyPromissoryNote,
  ApplyMedicalPackage,
  TagAsMgh,
  UntagAsMgh,
  Discharge,
  DischargeInstruction,
  PostFinalDiagnosis,
  SoaBillingStatement,
  ViewPrintReports,
  AdmitPatient,
  TransferToEr,
  PrintClaimForms,
  ClaimForm4Processing,
} = storeToRefs(OpdSubComponentsDialog());

const { 
  ItemsAndServicesStatusReport,
  DocumentArchives,
  MayGoHomePatientList,
  Cf4ForDischargedPatients,
} = storeToRefs(PQOutpatientDialog());

definePageMeta({
  layout: "root-layout",
});

const { selectedRowDetails, isrefresh } = storeToRefs(useSubcomponentSelectedRowDetailsStore());
const isSelectedUser = ref(true);
const pageTitle = ref("Out Patient");
const currentTab = ref(false);
const showTabs = ref(false);
const tableTabs = ref([]);
const central_form_dialog = ref(false);
const search_results = ref([]);
const search_payload = ref({});
const form_dialog = ref(false);
const clicked_option = ref("");
const form_type = ref("outpatient")
const form_payload = ref({});

const totalItems = ref(0);
const itemsPerPage = ref(50);
const search = ref("");
const filter = ref({});
const open_filter_options = ref(false);
const params = ref("");
const loading = ref(true);
const open_summary_modal = ref(false);
const outpatients_test_data = ref([
  { label: "Active", value: "1", color: "green" },
  { label: "Discharged", value: "2", color: "lightblue" },
  { label: "May Go Home", value: "3", color: "yellow" },
  { label: "Untagged as MGH", value: "4", color: "lightgreen" },
  { label: "Cancelled", value: "5", color: "red" },
  { label: "Died", value: "6", color: "black" },
]); 

const headers = [
  {
    title: "ID",
    align: "start",
    sortable: false,
    key: "id",
  },
  {
    title: "Patient Code",
    align: "start",
    sortable: false,
    key: "patient_id",
  },
  {
    title: "Last Name",
    key: "lastname",
    align: "start",
    sortable: false,
  },
  {
    title: "First Name",
    key: "firstname",
    align: "start",
    sortable: false,
  },
  {
    title: "Sex",
    key: "sex",
    align: "start",
    sortable: false,
  },
  {
    title: "Birth Date",
    key: "birthdate",
    align: "start",
    sortable: false,
  },
  {
    title: "Registry Date",
    key: "patient_registry",
    align: "start",
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
const handleView = (clickedOption) => {
  form_dialog.value = true;
  clicked_option.value = clickedOption;
};
const handleEdit = (clickedOption) => {
  form_dialog.value = true;
  clicked_option.value = clickedOption;
};
const handleNew = (clickedOption) => {
  central_form_dialog.value = true;
  clicked_option.value = clickedOption;
};
const closeCentralFormDialog = () => {
  central_form_dialog.value = false;
};
const openAddFormDialog = () => {
  form_dialog.value = true;
};
const closeAddFormDialog = () => {
  form_dialog.value = false;
};
const selectedOutPatient = () => {
};
const SearchOutPatient = () => {
};

const DeactiveUser = () => {
  
};

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
    : "page=1&per_page=50&keyword=" + keyword;
    const response = await fetch(useApiUrl()+'/get-outpatient'+ "?" + params.value || "", {
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
