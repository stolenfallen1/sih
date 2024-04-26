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
    @search="SearchOutPatient"
    @selected-row="selectedOutPatient"
    :search_results="search_results"
    :search_payload="search_payload"
    @open-form="openAddFormDialog"
  />
  <OutPatientRegistration :clicked_option="clicked_option" :form_dialog="form_dialog" @close-dialog="closeAddFormDialog" />
  <!-- Out-patients Sub components -->
  <OpdSuspendDialog :show="OpdSuspend" @close-dialog="useSubComponents('OpdSuspend', false)" />
  <OpdPrintTransReceiptDialog :show="OpdPrintTransactionReceipt" @close-dialog="useSubComponents('OpdPrintTransactionReceipt', false)"/>
  <OpdPostCorporatePackageDialog :show="OpdPostCorporateMedicalPackage" @close-dialog="useSubComponents('OpdPostCorporateMedicalPackage', false)"/>
  <OpdPostDiagnosticPackageDialog :show="OpdPostDiagnosticMedicalPackage" @close-dialog="useSubComponents('OpdPostDiagnosticMedicalPackage', false)"/> 
  <OpdPostAdjustmentDialog :show="OpdPostAdjustments" @close-dialog="useSubComponents('OpdPostAdjustments', false)" />
  <OpdPostProfessionalFeesDialog :show="OpdPostProfessionalFees" @close-dialog="useSubComponents('OpdPostProfessionalFees', false)" />
  <OpdPostArTransferDialog :show="OpdPostArTransfer" @close-dialog="useSubComponents('OpdPostArTransfer', false)" />
  <OpdViewExamUpshotDialog :show="OpdViewExaminationUpshot" @close-dialog="useSubComponents('OpdViewExaminationUpshot', false)" />
  <OpdApplyPromissoryNoteDialog :show="OpdApplyPromissoryNote" @close-dialog="useSubComponents('OpdApplyPromissoryNote', false)" />
  <OpdTagAsMghDialog :show="OpdTagAsMgh" @close-dialog="useSubComponents('OpdTagAsMgh', false)" />
  <OpdUntagAsMghDialog :show="OpdUntagAsMgh" @close-dialog="useSubComponents('OpdUntagAsMgh', false)" />
  <OpdDischargeDialog :show="OpdDischarge" @close-dialog="useSubComponents('OpdDischarge', false)" />
  <OpdDischargeInstructionDialog :show="OpdDischargeInstruction" @close-dialog="useSubComponents('OpdDischargeInstruction', false)" />
  <OpdPostFinalDiagnosisDialog :show="OpdPostFinalDiagnosis" @close-dialog="useSubComponents('OpdPostFinalDiagnosis', false)" />
  <OpdSoaBillingDialog :show="OpdSoaBillingStatement" @close-dialog="useSubComponents('OpdSoaBillingStatement', false)" />
  <OpdViewPrintReportsDialog :show="OpdViewPrintReports" @close-dialog="useSubComponents('OpdViewPrintReports', false)" />
  <OpdAdmitPatientDialog :show="OpdAdmitPatient" @close-dialog="useSubComponents('OpdAdmitPatient', false)" />
  <OpdTransferErDialog :show="OpdTransferToEr" @close-dialog="useSubComponents('OpdTransferToEr', false)" />
  <OpdClaimForm4ProcessingDialog :show="OpdClaimForm4Processing" @close-dialog="useSubComponents('OpdClaimForm4Processing', false)" />
</template>

<script setup>
import ReusableTable from "~/components/reusables/ReusableTable.vue";
const {
  OpdSuspend,
  OpdPrintTransactionReceipt,
  OpdPostCorporateMedicalPackage,
  OpdPostDiagnosticMedicalPackage,
  OpdPostAdjustments,
  OpdPostProfessionalFees,
  OpdPostArTransfer,
  OpdViewExaminationUpshot,
  OpdApplyPromissoryNote,
  OpdTagAsMgh,
  OpdUntagAsMgh,
  OpdDischarge,
  OpdDischargeInstruction,
  OpdPostFinalDiagnosis,
  OpdSoaBillingStatement,
  OpdViewPrintReports,
  OpdAdmitPatient,
  OpdTransferToEr,
  OpdClaimForm4Processing,
} = storeToRefs(OpdSubComponentsDialog());

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

const totalItems = ref(0);
const itemsPerPage = ref(15);
const search = ref("");
const params = ref("");
const loading = ref(true);
const headers = [
  {
    title: "Building",
    align: "start",
    sortable: true,
    key: "building",
    width: "10%",
  },
  { title: "Floor Name", key: "floor", align: "center", width: "10%", sortable: false },
  { title: "Room No.", key: "room_code", align: "center", width: "10%", sortable: false },
  {
    title: "No.Of Beds",
    key: "total_beds",
    align: "center",
    width: "10%",
    sortable: false,
  },
  { title: "Room Status", key: "roomstatus", align: "center", width: "15%", sortable: false },
  { title: "Room Type", key: "roomClass", align: "center", width: "15%", sortable: false },
  {
    title: "Nursing Station",
    key: "station",
    align: "center",
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

const loadItems = async (options = null, searchkeyword = null) => {
  try {
    loading.value = true;

    let keyword = searchkeyword || "";
      params.value = options  ? "page=" + options.page + "&per_page=" + options.itemsPerPage + "&keyword=" + options.keyword
    : "page=1&per_page=10&keyword=" + keyword;
    const response = await fetch(useApiUrl()+'/rooms-and-beds'+ "?" + params.value || "", {
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
