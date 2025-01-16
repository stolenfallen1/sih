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
        v-if="currentTab === 1"
        @click="RevokeUser"
        prepend-icon="mdi-toggle-switch"
        :disabled="isSelectedUser"
        width="150"
        color="primary"
        class="bg-error text-white"
      >
        Revoke</v-btn
      >
      <v-btn
        v-if="currentTab === 2"
        @click="UnrevokeUser"
        prepend-icon="mdi-toggle-switch"
        :disabled="isSelectedUser"
        width="150"
        color="primary"
        class="bg-error text-white"
      >
        Unrevoke</v-btn
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
      :columns="columns"
      :showTabs="showTabs"
      :itemsPerPage="itemsPerPage"
      :tableTitle="pageTitle"
      :current-tab="currentTab"
      :test="test"
      @fetchPage="loadItems"
      @selected-row="selectedUser"
      @tab-change="handleTabChange"
      @action-search="handleSearch"
      @action-refresh="handleRefresh"
      @open-filter="openFilterOptions"
    >
      <template v-for="column in columns" v-slot:[`column-${column.key}`]="{ item }">
        <div v-if="column.key === 'SOA' && item.patient_registry && item.patient_registry[0].mscPrice_Schemes != 1" >
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
            :style="{ cursor: 'default', display: 'block', height: '26px', width: '9px', backgroundColor: item.patient_registry && item.patient_registry[0].mscPrice_Schemes != 1 ? 'yellow' : 'orange' }" 
            :title="item.patient_registry && item.patient_registry[0].mscPrice_Schemes != 1 ? 'HMO' : 'Self Pay'" 
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

  <OutPatientRegistration :clicked_option="clicked_option" :form_dialog="form_dialog" @patient-registered="loadPatient" @close-dialog="closeAddFormDialog" />
  <RevokeRegistrationForm :open_revoke_form="open_revoke_form" @close-dialog="closeRevokeUser" @refresh-data="loadItems" />
  <UnrevokeRegistrationForm :open_unrevoke_form="open_unrevoke_form" @close-dialog="closeUnrevokeUser" @refresh-data="loadItems" />
  <SOADisplayForm :open_patient_soa="open_patient_soa" :patient="selectedPatient" @close-dialog="closePatientSOA" />
  
  <!-- Out-patients Sub components -->
  <!-- <PatientProfileDialog :show="PatientProfile" :form_payload="payload" @close-dialog="useSubComponents('PatientProfile', false)" />
  <SuspendDialog :show="Suspend" :form_type="form_type" @close-dialog="useSubComponents('Suspend', false)" /> -->
  <RequisitionsDialog :show="Requisitions" :form_type="form_type" @close-dialog="handleClose('Requisitions')" />
  <PostChargesDialog :show="PostCharges" @close-dialog="handleClose('PostCharges')" />
  <OPDPostMedicineSuppliesDialog :show="OPDPostMedicineSupplies" @close-dialog="handleClose('OPDPostMedicineSupplies')" />
  <!-- <PrintTransReceiptDialog :show="PrintTransactionReceipt" @close-dialog="useSubComponents('PrintTransactionReceipt', false)"/>
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
  <ClaimForm4ProcessingDialog :show="ClaimForm4Processing" @close-dialog="useSubComponents('ClaimForm4Processing', false)" /> -->

  <!-- Out-patients Processing Querires -->
  <!-- <ItemServicesStatusReportDialog :show="ItemsAndServicesStatusReport" @close-dialog="useProcessingQueries('ItemsAndServicesStatusReport', false)" />
  <MayGoHomePatientListDialog :show="MayGoHomePatientList" @close-dialog="useProcessingQueries('MayGoHomePatientList', false)" />
  <Cf4DischargedPatientsDialog :show="Cf4ForDischargedPatients" :form_type="form_type" @close-dialog="useProcessingQueries('Cf4ForDischargedPatients', false)" /> -->
</template>

<script setup>
import PatientProfileDialog from "../../../components/master-file/forms/patient/FormContainer.vue";
import OPDPostMedicineSuppliesDialog from "./components/OPDPostMedicineSuppliesDialog.vue";
import { usePatientStore } from '@/store/selectedPatient';

const patientStore = usePatientStore();

import ReusableTable from "~/components/reusables/ReusableTable.vue";
const {
  PatientProfile,
  Suspend,
  Requisitions,
  PostCharges,
  OPDPostMedicineSupplies,
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
const pageTitle = ref("");
const currentTab = ref(1);
const showTabs = ref(true);
const serverItems = ref([]);
const columns = ref([]);
const test = ref(['test']);
const selectedRows = ref([]);
const tableTabs = ref([
  {
    label: "Registered",
    title: "Registered patients today.",
    value: 1,
    endpoint: useLaravelAPI() + "/get-outpatient",
    columns: [
              {
                title: "",
                align: "start",
                sortable: false,
                key: "SOA",
              },
              {
                title: "",
                align: "start",
                sortable: false,
                key: "registry_Status",
              },
              {
                title: "",
                align: "start",
                sortable: false,
                key: "isHMO",
              },
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
                key: "registry_date",
                align: "start",
                sortable: false,
              },
              {
                title: "Discharged Date",
                key: "discharged_date",
                align: "start",
                sortable: false,
              },
    ],
  },
  {
    label: "Revoked",
    title: "Revoked patients today.",
    value: 2,
    endpoint: useLaravelAPI() + "/get-revoked-outpatient",
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
                key: "registry_date",
                align: "start",
                sortable: false,
              },
              {
                title: "Revoked Date",
                key: "revoked_Date",
                align: "start",
                sortable: false,
              },
    ],
  },
  {
    label: "Transferred",
    title: "Transferred patients today.",
    value: 3,
    endpoint: useLaravelAPI() + "/get-revoked-outpatient",
    columns: [
              {
                title: "Patient ID",
                align: "start",
                sortable: false,
                key: "patient_Id",
              },
              {
                title: "ER Case No.",
                align: "start",
                sortable: false,
                key: "er_case_no",
              },
              {
                title: "ER Bed No.",
                align: "start",
                sortable: false,
                key: "room_no",
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
                key: "registry_date",
                align: "start",
                sortable: false,
              },
              {
                title: "Discharged Date",
                key: "discharged_date",
                align: "start",
                sortable: false,
              },
    ],
  },
  {
    label: "Admitted",
    title: "Admitted patients today.",
    value: 4,
    endpoint: useLaravelAPI() + "/get-revoked-outpatient",
    columns: [
              {
                title: "Patient ID",
                align: "start",
                sortable: false,
                key: "patient_Id",
              },
              {
                title: "Admission No.",
                align: "start",
                sortable: false,
                key: "admission_no",
              },
              {
                title: "Room No.",
                align: "start",
                sortable: false,
                key: "room_no",
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
                key: "registry_date",
                align: "start",
                sortable: false,
              },
              {
                title: "Discharged Date",
                key: "discharged_date",
                align: "start",
                sortable: false,
              },
    ],
  },
]);
const central_form_dialog = ref(false);
const search_results = ref([]);
const search_payload = ref({});
const form_dialog = ref(false);
const clicked_option = ref("");
const form_type = ref("outpatient")
const payload = ref({});
const selectedPatient = ref({});
const open_revoke_form = ref(false);
const open_unrevoke_form = ref(false);
const open_patient_soa = ref(false);

const totalItems = ref(0);
const itemsPerPage = ref(50);
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

const handleRefresh = () => {
  loadItems();
};
const handleSearch = (keyword) => {
  loadItems(null, keyword);
};
const loadPatient = (patientDetails) =>{
  const keyword = patientDetails;

  console.log(patientDetails,'patient de')
  loadItems(null, keyword);
}
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
  selectedRowDetails.value = Object.assign({}, item); 
  if(item){
    selectedRowDetails.value =  Object.assign({}, item); //set state id for subcomponents ?id=item.id value
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
  central_form_dialog.value = true;
  clicked_option.value = clickedOption;
};
const closeCentralFormDialog = () => {
  central_form_dialog.value = false;
  search_payload.value = {};
  search_results.value = [];
  selectedPatient.value = {};
};

const openAddFormDialog = (type) => {
  if (type === 'new') {
        form_dialog.value = true;
        closeCentralFormDialog();
    } else if (type === 'old') {  
          patientStore.setSelectedPatient(selectedPatient.value);
          if (patientStore.selectedPatient && patientStore.selectedPatient.id) {  
              form_dialog.value = true;
              closeCentralFormDialog();
          } else {
              return useSnackbar(true, "error", "No item selected.");
          }
    } 
};

const closeAddFormDialog = () => {
  form_dialog.value = false;
  selectedRowDetails.value = Object.assign({}, {});
  isSelectedUser.value = true;
  search_payload.value = {};
  search_results.value = [];
  test.value = [];
};

const SearchOutPatient = async (payload) => {
  search_payload.value.isloading = true;
  let lastname = payload.lastname || "";
  let firstname = payload.firstname || "";
  let middlename = payload.middlename || "";
  let birthdate = payload.birthdate || "";
  let params = "page=1&per_page=10&lastname=" + lastname + "&firstname=" + firstname + "&middlename=" + middlename + "&birthdate=" + birthdate;

  const response = await fetch(
    useLaravelAPI() + "/search-patient-master" + "?" + params || "",
    {
      headers: {
        Authorization: `Bearer ` + useToken(),
      },
    }
  );
  if (response) {
    const data = await response.json();
    search_results.value = data;
    search_payload.value.isloading = false;
  }
};
const selectedOutPatient = (item) => {
  selectedPatient.value = item;
};

const RevokeUser = () => {
  open_revoke_form.value = true;
};

const closeRevokeUser = () => {
  open_revoke_form.value = false;
};

const UnrevokeUser = () => {
  open_unrevoke_form.value = true;
}
const closeUnrevokeUser = () => {
  open_unrevoke_form.value = false;
}

const ViewSummary = () => {
  open_summary_modal.value = true;
}
const closeViewSummary = () => {
  open_summary_modal.value = false;
}

const openPatientSOA = (patient) => {
  selectedPatient.value = patient;
  open_patient_soa.value = true;
}
const closePatientSOA = () => {
  selectedPatient.value = {};
  open_patient_soa.value = false;
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

const handleClose = (dialogName) => {
  selectedRowDetails.value = Object.assign({}); 
  selectedRows.value = [];
  test.value = [];
  isSelectedUser.value = true;
  useSubComponents(dialogName, false);
}

handleTabChange(currentTab.value);
</script>

<style>
.v-data-table {
  overflow-x: auto;
}
.isActive {
  margin-right: -15px !important;
}
.isHMO {
  margin-left: -15px !important;
}
</style>
