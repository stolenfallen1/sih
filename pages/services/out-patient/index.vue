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
        :disabled="serverItems.length > 0 ? true : false"
        prepend-icon="mdi-plus-outline"
        width="100"
        color="primary"
        class="bg-primary text-white"
      >
        New
      </v-btn>
      <v-btn
        @click="handleEdit"
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


  <AdjustmentTypesDialog 
    :show="AdjustmentTypes"
    @close-dialog="closeAdjustmentTypes"
  />
  <AllergiesDialog 
    :show="Allergies"
    @close-dialog="closeAllergies"
  />
  <BillingTemplateDialog
    :show="BillingTemplates"
    @close-dialog="closeBillingTemplates"
  />
  <BillingTemplateGroupDialog 
    :show="BillingTemplateGroups"
    @close-dialog="closeBillingTemplateGroups"
  />
  <CsCaseIndicatorsDialog
    :show="CsCaseIndicators"
    @close-dialog="closeCsCaseIndicators"
  />
  <DeathTypesDialog 
    :show="DeathTypes"
    @close-dialog="closeDeathTypes"
  />
  <DiscountSchemesDialog 
    :show="DiscountSchemes"
    @close-dialog="closeDiscountSchemes"
  />
  <DispositionTypesDialog
    :show="DispositionTypes"
    @close-dialog="closeDispositionTypes"
  />
  <ExcellenceCentersDialog
    :show="ExcellenceCenters"
    @close-dialog="closeExcellenceCenters"
  />
  <ReferringCentersDialog 
    :show="ReferringCenters"
    @close-dialog="closeReferringCenters"
  />
  <MedicalServiceTypesDialog 
    :show="MedicalServiceTypes"
    @close-dialog="closeMedicalServiceTypes"
  />
  <MedicalSubServiceTypesDialog 
    :show="MedicalSubServiceTypes"
    @close-dialog="closeMedicalSubServiceTypes"
  />
  <PriceSchemesDialog 
    :show="PriceSchemes"
    @close-dialog="closePriceSchemes"
  />
  <HospitalizationTransactionTypesDialog 
    :show="HospitalTransactionTypes"
    @close-dialog="closeHospitalTransactionTypes"
  />
  <HospitalizationTypesDialog 
    :show="HospitalizationTypes"
    @close-dialog="closeHospitalizationTypes"
  />
  <HospitalizationPlansDialog
    :show="HospitalizationPlans"
    @close-dialog="closeHospitalizationPlans"
  />
  <HospitalizationCaseTypesDialog
    :show="HospitalizationCaseTypes"
    @close-dialog="closeHospitalizationCaseTypes"
  />
  <InternalControlTableDialog 
    :show="InternalControlTable"
    @close-dialog="closeInternalControlTable"
  />
  <ListOfAttendantDialog 
    :show="ListOfAttendant"
    @close-dialog="closeListOfAttendant"
  />
  <SurgicalProcedureCategoryDialog
    :show="SurgicalProceduresCategory"
    @close-dialog="closeSurgicalProceduresCategory"
  />
  <BodySystemsDialog
    :show="BodySystems"
    @close-dialog="closeBodySystems"
  />
  <BodyOrgansDialog 
    :show="BodyOrgans"
    @close-dialog="closeBodyOrgans"
  />

</template>

<script setup>
import ReusableTable from "~/components/reusables/ReusableTable.vue";
// Table and Template store
const {
  AdjustmentTypes,
  Allergies,
  BillingTemplates,
  BillingTemplateGroups,
  CsCaseIndicators,
  DeathTypes,
  DiscountSchemes,
  DispositionTypes,
  ExcellenceCenters,
  ReferringCenters,
  MedicalServiceTypes,
  MedicalSubServiceTypes,
  PriceSchemes,
  HospitalTransactionTypes,
  HospitalizationTypes,
  HospitalizationPlans,
  HospitalizationCaseTypes,
  InternalControlTable,
  ListOfAttendant,
  SurgicalProcedures,
  SurgicalProceduresCategory,
  BodySystems,
  BodyOrgans,
  TypesOfAnesthesia,
  DocumentCategories,
  OtherHospitalServices,
  MedialSocialService,
  ListOfPetBreed,
  EducationalAttainments,
} = storeToRefs(OutPatientsTemplateDialog())
// Table and Template components
import AdjustmentTypesDialog from "~/components/reusables/outpatient-templates/adjustment-types/AdjustmentTypesDialog.vue";
import AllergiesDialog from "~/components/reusables/outpatient-templates/allergies/AllergiesDialog.vue";
import BillingTemplateDialog from "~/components/reusables/outpatient-templates/billing-templates/BillingTemplateDialog.vue";
import BillingTemplateGroupDialog from "~/components/reusables/outpatient-templates/billing-template-groups/BillingTemplateGroupDialog.vue";
import CsCaseIndicatorsDialog from "../../../components/reusables/outpatient-templates/cs-case-indicators/CsCaseIndicatorsDialog.vue";
import DeathTypesDialog from "~/components/reusables/outpatient-templates/death-types/DeathTypesDialog.vue";
import DiscountSchemesDialog from "~/components/reusables/outpatient-templates/discount-schemes/DiscountSchemesDialog.vue";
import DispositionTypesDialog from "~/components/reusables/outpatient-templates/disposition-types/DispositionTypesDialog.vue";
import ExcellenceCentersDialog from "~/components/reusables/outpatient-templates/excellence-centers/ExcellenceCentersDialog.vue";
import ReferringCentersDialog from "~/components/reusables/outpatient-templates/referring-centers/ReferringCentersDialog.vue";
import MedicalServiceTypesDialog from "~/components/reusables/outpatient-templates/medical-service-types/MedicalServiceTypesDialog.vue";
import MedicalSubServiceTypesDialog from "~/components/reusables/outpatient-templates/medical-sub-service-types/MedicalSubServiceTypesDialog.vue";
import PriceSchemesDialog from "~/components/reusables/outpatient-templates/price-schemes/PriceSchemesDialog.vue";
import HospitalizationTransactionTypesDialog from "~/components/reusables/outpatient-templates/hospitalization-transaction-types/HospitalizationTransactionTypesDialog.vue";
import HospitalizationTypesDialog from "~/components/reusables/outpatient-templates/hospitalization-types/HospitalizationTypesDialog.vue";
import HospitalizationPlansDialog from "~/components/reusables/outpatient-templates/hospitalization-plans/HospitalizationPlansDialog.vue";
import HospitalizationCaseTypesDialog from "~/components/reusables/outpatient-templates/hospitalization-case-types/HospitalizationCaseTypesDialog.vue";
import InternalControlTableDialog from "~/components/reusables/outpatient-templates/internal-control-table/InternalControlTableDialog.vue";
import ListOfAttendantDialog from "~/components/reusables/outpatient-templates/list-of-attendant/ListOfAttendantDialog.vue";
// Surgical Procedures
import SurgicalProcedureCategoryDialog from "~/components/reusables/outpatient-templates/surgical-procedures-category/SurgicalProcedureCategoryDialog.vue";
import BodySystemsDialog from "~/components/reusables/outpatient-templates/body-systems/BodySystemsDialog.vue";
import BodyOrgansDialog from "~/components/reusables/outpatient-templates/body-organs/BodyOrgansDialog.vue";

definePageMeta({
  layout: "root-layout",
});

const { selectedRowDetails, isrefresh } = storeToRefs(useSubcomponentSelectedRowDetailsStore());
const isSelectedUser = ref(true);
const pageTitle = ref("Out Patient");
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
const handleView = () => {
  
};
const handleEdit = () => {
  
};
const handleNew = () => {
  
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

// Table and template methods
const closeAdjustmentTypes = () => {
  AdjustmentTypes.value = false;
}
const closeAllergies = () => {
  Allergies.value = false;
}
const closeBillingTemplates = () => {
  BillingTemplates.value = false;
}
const closeBillingTemplateGroups = () => {
  BillingTemplateGroups.value = false;
}
const closeCsCaseIndicators = () => {
  CsCaseIndicators.value = false;
}
const closeDeathTypes = () => {
  DeathTypes.value = false;
}
const closeDiscountSchemes = () => {
  DiscountSchemes.value = false;
}
const closeDispositionTypes = () => {
  DispositionTypes.value = false;
}
const closeExcellenceCenters = () => {
  ExcellenceCenters.value = false;
}
const closeReferringCenters = () => {
  ReferringCenters.value = false;
}
const closeMedicalServiceTypes = () => {
  MedicalServiceTypes.value = false;
}
const closeMedicalSubServiceTypes = () => {
  MedicalSubServiceTypes.value = false;
}
const closePriceSchemes = () => {
  PriceSchemes.value = false;
}
const closeHospitalTransactionTypes = () => {
  HospitalTransactionTypes.value = false;
}
const closeHospitalizationTypes = () => {
  HospitalizationTypes.value = false;
}
const closeHospitalizationPlans = () => {
  HospitalizationPlans.value = false;
}
const closeHospitalizationCaseTypes = () => {
  HospitalizationCaseTypes.value = false;
}
const closeInternalControlTable = () => {
  InternalControlTable.value = false;
}
const closeListOfAttendant = () => {
  ListOfAttendant.value = false;
}
const closeSurgicalProceduresCategory = () => {
  SurgicalProceduresCategory.value = false;
}
const closeBodySystems = () => {
  BodySystems.value = false;
}
const closeBodyOrgans = () => {
  BodyOrgans.value = false;
}

</script>

<style>
.v-data-table {
  overflow-x: auto;
}
</style>
