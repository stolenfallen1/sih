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

  <CentralLookUpForm 
    :central_form_dialog="central_form_dialog"
    @close-dialog="closeCentralFormDialog"
    @search="SearchEmergencyPatient"
    @selected-row="selectedEmergencyPatient"
    :search_results="search_results"
    :search_payload="search_payload"
    @open-form="openAddFormDialog"
  />

  <SummaryModal 
    :show="open_summary_modal"
    :summary_header="'Emergency'"
    :data="outpatients_test_data"
    @close-dialog="closeViewSummary"
  />

  <EmergencyRegistration :clicked_option="clicked_option" :form_dialog="form_dialog" @close-dialog="closeAddFormDialog" />
  <!-- Out-patients Sub components -->
  <PatientProfileDialog :show="PatientProfile" :form_payload="form_payload" @close-dialog="useSubComponents('PatientProfile', false)" />
  <SuspendDialog :show="Suspend" :form_type="form_type" @close-dialog="useSubComponents('Suspend', false)" />
  <PostCorporatePackageDialog :show="PostCorporateMedicalPackage" @close-dialog="useSubComponents('PostCorporateMedicalPackage', false)"/>
  <PostDiagnosticPackageDialog :show="PostDiagnosticMedicalPackage" @close-dialog="useSubComponents('PostDiagnosticMedicalPackage', false)"/> 
  <PostAdjustmentDialog :show="PostAdjustments" @close-dialog="useSubComponents('PostAdjustments', false)" />
  <PostProfessionalFeesDialog :show="PostProfessionalFees" @close-dialog="useSubComponents('PostProfessionalFees', false)" />
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
  <ClaimForm4ProcessingDialog :show="ClaimForm4Processing" @close-dialog="useSubComponents('ClaimForm4Processing', false)" />
</template>

<script setup>
import PatientProfileDialog from "../../../components/master-file/forms/patient/FormContainer.vue";

import ReusableTable from "~/components/reusables/ReusableTable.vue";
const {
  PatientProfile,
  Suspend, 
  PostCorporateMedicalPackage, 
  PostDiagnosticMedicalPackage, 
  PostAdjustments, 
  PostProfessionalFees, 
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
  ClaimForm4Processing, 
} = storeToRefs(ERSubComponentsDialog());

definePageMeta({
  layout: "root-layout",
});

const { selectedRowDetails, isrefresh } = storeToRefs(useSubcomponentSelectedRowDetailsStore());
const isSelectedUser = ref(true);
const pageTitle = ref("Emergency");
const currentTab = ref(false);
const showTabs = ref(false);
const tableTabs = ref([]);
const central_form_dialog = ref(false);
const search_results = ref([]);
const search_payload = ref({});
const form_dialog = ref(false);
const clicked_option = ref("");
const form_type = ref("emergency")
const form_payload = ref({});

const totalItems = ref(0);
const itemsPerPage = ref(15);
const search = ref("");
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
    sortable: true,
    key: "id",
    width: "5%",
  },
  {
    title: "Code",
    align: "start",
    sortable: true,
    key: "doctor_code",
    width: "5%",
  },
  {
    title: "Category",
    key: "category",
    align: "start",
    width: "5%",
    sortable: false,
  },
  {
    title: "Specialization",
    key: "specialization_id",
    align: "start",
    width: "5%",
    sortable: false,
  },
  {
    title: "Consultant Name",
    key: "doctor_name",
    align: "start",
    width: "40%",
    sortable: false,
  },
  {
    title: "PHIC No.",
    key: "philhealth_accreditation_no",
    align: "start",
    width: "10%",
    sortable: false,
  },
  {
    title: "Email",
    key: "email",
    align: "start",
    width: "30%",
    sortable: false,
  },
   {
    title: "Status",
    key: "isactive",
    align: "start",
    width: "30%",
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
  clicked_option.value = clickedOption;
  form_dialog.value = true;
};
const handleEdit = (clickedOption) => {
  clicked_option.value = clickedOption;
  form_dialog.value = true;
};
const handleNew = (clickedOption) => {
  clicked_option.value = clickedOption;
  central_form_dialog.value = true;
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
const selectedEmergencyPatient = () => {
};
const SearchEmergencyPatient = () => {
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
