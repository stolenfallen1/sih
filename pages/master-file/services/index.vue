<template>
  <v-card class="mb-2" elevation="2">
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
  <v-card class="mb-2" elevation="2">
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
      @tab-change="handleTabChange"
    >
      <!-- Custom templates for each column -->
      <template v-for="column in headers" v-slot:[`column-${column.key}`]="{ item }">
        <!-- customize rendering for each column here -->
        <span v-if="column.key === 'category_id'" :key="column.key">
          {{ item.category ? item.category.category_description : "" }}</span
        >
        <span v-if="column.key === 'isactive'" :key="column.key">
          {{ item.isactive == 1 ? "Active" : "In Active" }}</span
        >

        <!-- Add more custom logic for other columns -->
      </template>
    </ReusableTable>
  </v-card>
  <FormContainer
    :form_payload="form_payload"
    @submit-form="confirmation"
    :item_supplies_form="form_container"
    :currentTabValue="currentTabValue"
    @close-dialog="closeFormDialog"
  />

  <!-- Central Lookup Search Form -->
  <CentralSupplyLookUp
    :central_form_dialog="central_form_dialog"
    @close-dialog="closeCentralFormDialog"
    @search="SearchExamsandProcedures"
    :headers="center_form_headers"
    @selected-row="selectedExamsandProcedures"
    :search_results="search_results"
    :search_payload="search_payload"
    @open-form="openAddFormDialog"
  />

  <Confirmation
    :show="confirmationDialog"
    :payload="form_payload"
    :error_msg="error_msg"
    :loading="loading"
    @close="closeConfirmation"
    @submit="submitItemandSuppliesForm"
    />

  <BillingReportCategoryDialog
    :show="BillingReportCategory"
    @close-dialog="closeBillingReportCategory"
  />
  <CollectionReportMainDialog 
    :show="CollectionReportMainHeader" 
    @close-dialog="closeCollectionReportMain" 
  />
  <CollectionReportGroupDialog 
    :show="CollectionReportGroupHeader"  
    @close-dialog="closeCollectionReportGroup"
  />
  <CptModifierDialog
    :show="CptModifiers" 
    @close-dialog="closeCptModifier"
  />
  <CptSectionDialog  
    :show="CptSections"
    @close-dialog="closeCptSections"
  />
  <CptSubSectionDialog 
    :show="CptSubSections"
    @close-dialog="closeCptSubSections"
  />
  <DepartmentGroupDialog 
    :show="DepartmentGroups"
    @close-dialog="closeDepartmentGroups"
  />
  <DosageDialog 
    :show="Dosages"
    @close-dialog="closeDosages"
  />
  <DrugAdminGroupDialog 
    :show="DrugAdminGroups"
    @close-dialog="closeDrugAdminGroups"
  />
  <DohDrugListDialog 
    :show="DohDrugLists"
    @close-dialog="closeDohDrugLists"
  />
  <DxMedicalPackagesDialog 
    :show="DxMedicalPackages"
    @close-dialog="closeDxMedicalPackages"
  />
  <GenericNameDialog 
    :show="GenericNames"
    @close-dialog="closeGenericNames"
  />
  <IndicationDialog 
    :show="Indications"
    @close-dialog="closeIndications"
  />
  <ItemPriceGroupsDialog 
    :show="ItemPriceGroups"
    @close-dialog="closeItemPriceGroups"
  />
  <ItemPricingSchemeDialog 
    :show="ItemPricingSchemes"
    @close-dialog="closeItemPricingSchemes"
  />
  <ItemUnitsDialog 
    :show="ItemUnits"
    @close-dialog="closeItemUnits"
  />
  <MedicationDurationsDialog 
    :show="MedicationDurations"
    @close-dialog="closeMedicationDurations"
  />
  <MedicationFrequenciesDialog 
      :show="MedicationFrequencies"
      @close-dialog="closeMedicationFrequencies"
  />
  <MedicationPreparationsDialog 
      :show="MedicationPreparations"
      @close-dialog="closeMedicationPreparations"
  />
  <MedicationRoutesDialog 
      :show="Routes"
      @close-dialog="closeMedicationRoutes"
  />
  <OthersDialog 
    :show="Others"
    @close-dialog="closeOthersDialog"
  />  
  <PhicItemCategoriesDialog 
    :show="PhicItemCategories"
    @close-dialog="closePhicItemCategories"
  /> 
  <UnitOfMeasuresDialog 
    :show="UnitOfMeasures"
    @close-dialog="closeUnitOfMeasures"
  />
  <ModalitiesDialog 
    :show="Modalities"
    @close-dialog="closeModalities"
  />
  <SpecimensDialog 
    :show="Specimens"
    @close-dialog="closeSpecimens"
  />
</template>

<script setup>
import { storeToRefs } from "pinia";
import ReusableTable from "~/components/reusables/ReusableTable.vue";
import FormContainer from "~/components/master-file/forms/services/Form.vue";
import CentralSupplyLookUp from "~/components/reusables/CentralSupplyLookUp.vue";
// Table and templates store
const {
    BillingReportCategory, 
    CollectionReportMainHeader, 
    CollectionReportGroupHeader, 
    CptModifiers, 
    CptSections, 
    CptSubSections, 
    DepartmentGroups, 
    DepartmentWarehouses, 
    Dosages, 
    DrugAdminGroups, 
    DohDrugLists, 
    DxMedicalPackages, 
    GenericNames, 
    Indications, 
    ItemCategories, 
    ItemPriceGroups, 
    ItemPricingSchemes, 
    ItemTemplates, 
    ItemUnits, 
    MedicationDurations, 
    MedicationFrequencies, 
    MedicationPreparations, 
    Routes, 
    Others, 
    PhicItemCategories, 
    UnitOfMeasures, 
    Modalities, 
    Specimens, 
} = storeToRefs(TableAndTemplateFormDialog());
// Table and templates component
import BillingReportCategoryDialog from "~/components/reusables/items-services-templates/billing-report/BillingReportCategoryDialog.vue";
import CollectionReportMainDialog from "~/components/reusables/items-services-templates/collection-report-main/CollectionReportMainDialog.vue";
import CollectionReportGroupDialog from "~/components/reusables/items-services-templates/collection-report-group/CollectionReportGroupDialog.vue";
import CptModifierDialog from "~/components/reusables/items-services-templates/cpt-modifiers/CptModifierDialog.vue";
import CptSectionDialog from "~/components/reusables/items-services-templates/cpt-sections/CptSectionDialog.vue";
import CptSubSectionDialog from "~/components/reusables/items-services-templates/cpt-sub-sections/CptSubSectionDialog.vue";
import DepartmentGroupDialog from "~/components/reusables/items-services-templates/department-groups/DepartmentGroupDialog.vue";
import DosageDialog from "~/components/reusables/items-services-templates/dosages/DosageDialog.vue";
import DrugAdminGroupDialog from "~/components/reusables/items-services-templates/drug-admin-group/DrugAdminGroupDialog.vue";
import DohDrugListDialog from "~/components/reusables/items-services-templates/doh-drug-list/DohDrugListDialog.vue";
import DxMedicalPackagesDialog from "~/components/reusables/items-services-templates/dx-medical-packages/DxMedicalPackagesDialog.vue";
import GenericNameDialog from "~/components/reusables/items-services-templates/generic-names/GenericNameDialog.vue";
import IndicationDialog from "~/components/reusables/items-services-templates/indications/IndicationDialog.vue";
import ItemPriceGroupsDialog from "~/components/reusables/items-services-templates/item-price-groups/ItemPriceGroupsDialog.vue";
import ItemPricingSchemeDialog from "~/components/reusables/items-services-templates/item-pricing-schemes/ItemPricingSchemesDialog.vue";
import ItemUnitsDialog from "~/components/reusables/items-services-templates/item-units/ItemUnitsDialog.vue";
import MedicationDurationsDialog from "~/components/reusables/items-services-templates/medication-durations/MedicationDurationsDialog.vue";
import MedicationFrequenciesDialog from "~/components/reusables/items-services-templates/medication-frequencies/MedicationFrequenciesDialog.vue";
import MedicationPreparationsDialog from "~/components/reusables/items-services-templates/medication-preparations/MedicationPreparationsDialog.vue";
import MedicationRoutesDialog from "~/components/reusables/items-services-templates/routes/MedicationRoutesDialog.vue";
import OthersDialog from "~/components/reusables/items-services-templates/others/OthersDialog.vue";
import PhicItemCategoriesDialog from "~/components/reusables/items-services-templates/phic-item-categories/PhicItemCategoriesDialog.vue";
import UnitOfMeasuresDialog from "~/components/reusables/items-services-templates/unit-of-measures/UnitOfMeasuresDialog.vue";
import ModalitiesDialog from "~/components/reusables/items-services-templates/modalities/ModalitiesDialog.vue";
import SpecimensDialog from "~/components/reusables/items-services-templates/specimens/SpecimensDialog.vue";

definePageMeta({
  layout: "root-layout",
});

const confirmationDialog = ref(false);
const error_msg = ref('');

const { selectedRowDetails, isrefresh } = storeToRefs(
  useSubcomponentSelectedRowDetailsStore()
);
const { subcomponents } = storeToRefs(useNavigationMenuStore());
const isSelectedUser = ref(true);
const pageTitle = ref("Services");
const currentTab = ref(false);
const showTabs = ref(true);
const currentTabValue = ref("2");
const tableTabs = ref([
  { label: "Examinations", value: 2 },
  { label: "Procedures", value: 3 },
]);
const totalItems = ref(0);
const itemsPerPage = ref(40);
const params = ref("");
const loading = ref(true);
const serverItems = ref([]);
const search_results = ref([]);
const form_payload = ref({
    msc_item_group:parseInt(2)
});
const search_payload = ref({});
const form_container = ref(false);
const central_form_dialog = ref(false);
const center_form_headers = ref([
  {
    title: "Code",
    align: "start",
    sortable: true,
    key: "map_item_id",
    width: "5%",
  },
  {
    title: "Item Description",
    key: "exam_description",
    align: "start",
    width: "80%",
    sortable: false,
  },
]);
const headers = ref([
  {
    title: "Code",
    align: "start",
    sortable: true,
    key: "id",
    width: "5%",
  },
  {
    title: "Revenue Code",
    key: "map_revenue_code",
    align: "start",
    width: "10%",
    sortable: false,
  },
  {
    title: "Item Category",
    key: "category_id",
    align: "start",
    width: "10%",
    sortable: false,
  },
  {
    title: "Item Description",
    key: "exam_description",
    align: "start",
    width: "50%",
    sortable: false,
  },
  {
    title: "Barcode ID",
    key: "barcodeid",
    align: "start",
    width: "20%",
    sortable: false,
  },
]);

const closeConfirmation = ()=>{
  confirmationDialog.value = false;
}
const confirmation = ()=>{
  confirmationDialog.value = true;
}


const submitItemandSuppliesForm = async (details) => {
  if (usePasscode() == details.user_passcode) {
      if (form_payload.value) {

        loading.value = true;
        let method = "POST";
        let id = "";
        if (form_payload.value.id) {
          id = form_payload.value.id;
          method = "PUT";
        }
        const response = await $fetch(useApiUrl() + `/item-and-services/` + id, {
          method: method,
          headers: {
            Authorization: `Bearer ` + useToken(),
            "Content-Type": "application/json",
          },
          body: { payload: form_payload.value },
        });
        if (response.message) {
          confirmationDialog.value = false;
          loading.value = false;
          loadItems(null, form_payload.value.itemname);
          closeFormDialog();
          return useSnackbar(true,"success",response.message);
        }
      }
   }else {
    error_msg.value = "Incorrect Passcode";
    setTimeout(() => {
      error_msg.value = "";
    }, 3000);
  }
};


const closeCentralFormDialog = () => {
  form_payload.value = Object.assign({});
  central_form_dialog.value = false;
  search_payload.value = Object.assign({});
};

const SearchExamsandProcedures = async (payload) => {
  let itemcode = payload.itemcode || "";
  let itemname = payload.itemname || "";
  if (itemname.length <= 3)
    return useSnackbar(true, "error", "Search atleast 3 characters");
  search_payload.value.isloading = true;
  let params = "itemcode=" + itemcode + "&itemname=" + itemname;
  const response = await $fetch(useApiUrl() + "/search-services" + "?" + params || "", {
    headers: {
      Authorization: `Bearer ` + useToken(),
    },
  });

  console.log(response);
  if (response) {
    search_payload.value.isloading = false;
    search_results.value = response;
  }
};
const selectedExamsandProcedures = (item) => {
  form_payload.value.id = ""; //clear state id for subcomponents ?id=''
  form_payload.value.role_id = ""; //clear state id for subcomponents ?id=''
  form_payload.value = Object.assign({});
  if (item) {
    form_payload.value = Object.assign({},item);
    form_payload.value.msc_item_group = parseInt(item.msc_item_group) ? parseInt(item.msc_item_group) : "";
    form_payload.value.msc_item_category_ID = parseInt(item.msc_item_category_ID) ? parseInt(item.msc_item_category_ID) : "";
  }
};

const openAddFormDialog = (type) => {
  if (type == "new") {
    form_payload.value = Object.assign({});
  }
  if (form_payload.value.id) {
    search_results.value = [];
    form_payload.value.type = "edit";
    details();
  } else {
    form_payload.value.item_name = search_payload.value.itemname;
  }
  form_container.value = true;
};

const handleTabChange = (tabValue) => {
  currentTabValue.value = tabValue;
  if (tabValue == "2") {
    examinations();
  } else if (tabValue == "3") {
    procedures();
  }
  loadItems(null, null, tabValue);
};


const details = () => {
  if (form_payload.value) {
    form_payload.value.msc_item_group = parseInt(form_payload.value.msc_item_group) ? parseInt(form_payload.value.msc_item_group) : "";
    form_payload.value.msc_item_category_ID = Object.assign({},form_payload.value.category);
    form_payload.value.msc_modalities_id = parseInt(form_payload.value.msc_modalities_id) ? parseInt(form_payload.value.msc_modalities_id) : "";
    form_payload.value.exam_section = parseInt(form_payload.value.exam_section) ? parseInt(form_payload.value.exam_section) : "";
    form_payload.value.isCharging = parseInt(form_payload.value.isCharging) ? true : false;
    form_payload.value.isConsultation = parseInt(form_payload.value.isConsultation) ? true : false;
    form_payload.value.isDoctorfee = parseInt(form_payload.value.isDoctorfee) ? true : false;
    form_payload.value.isImaging = parseInt(form_payload.value.isImaging) ? true : false;
    form_payload.value.isProfile = parseInt(form_payload.value.isProfile) ? true : false;
    form_payload.value.isPhic = parseInt(form_payload.value.isPhic) ? true : false;
    form_payload.value.isVATExempt = parseInt(form_payload.value.isVATExempt) ? true : false;
    form_payload.value.isVatable = parseInt(form_payload.value.isVatable) ? true : false;
    form_payload.value.isZeroRated = parseInt(form_payload.value.isZeroRated) ? true : false;
    form_payload.value.isactive = parseInt(form_payload.value.isactive) ? true : false;
    form_payload.value.isallowdiscount = parseInt(form_payload.value.isallowdiscount) ? true : false;
    form_payload.value.isallowstat = parseInt(form_payload.value.isallowstat) ? true : false;
    form_payload.value.includeInStatement = parseInt(form_payload.value.includeInStatement) ? true : false;
  }
};


const examinations = () => {
  subcomponents.value = useServicesTab("1");
};

const procedures = () => {
  subcomponents.value = useServicesTab("2");
};

const handleRefresh = () => {
  loadItems();
};
const handleSearch = (keyword) => {
  // Handle search action
  loadItems(null, keyword, currentTabValue.value);
};

const selectedUser = (item) => {
  isSelectedUser.value = true;
  isrefresh.value = false;
  selectedRowDetails.value.id = ""; //clear state id for subcomponents ?id=''
  selectedRowDetails.value.role_id = ""; //clear state id for subcomponents ?id=''
   form_payload.value = Object.assign({});
  if (item) {
    selectedRowDetails.value = Object.assign({}, item); //set state id for subcomponents ?id=item.id value
    form_payload.value = Object.assign({}, item); //set state id for subcomponents ?id=item.id value
    isrefresh.value = true;
    isSelectedUser.value = false;
  } else {
    isrefresh.value = false;
    isSelectedUser.value = true;
  }
};
const handleView = () => {
    if (Object.keys(form_payload.value).length === 0)
    return useSnackbar(true, "error", "Select Services");
    details();
    form_container.value = true;
};
const handleEdit = () => {
    if (Object.keys(form_payload.value).length === 0)
    return useSnackbar(true, "error", "Select Services");
    details();
    form_container.value = true;

};
const handleNew = () => {
  central_form_dialog.value = true;
};
const DeactiveUser = () => {};

const loadItems = async (options = null, searchkeyword = null, item_group_id = null) => {
  try {
    loading.value = true;
    let itemgroup = item_group_id ||  currentTabValue.value;
    let keyword = searchkeyword || "";
    params.value = options
      ? "page=" +
        options.page +
        "&per_page=" +
        options.itemsPerPage +
        "&item_group_id=" +
        itemgroup +
        "&keyword=" +
        options.keyword
      : "page=1&per_page=10&item_group_id=" + itemgroup + "&keyword=" + keyword;
    const response = await fetch(useApiUrl() + "/item-and-services" + "?" + params.value || "", {
      headers: {
        Authorization: `Bearer ` + useToken(),
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

const closeFormDialog = () => {
  form_container.value = false;
  form_payload.value = Object.assign({});
};

// Tables and Dialogs Methods
const closeBillingReportCategory = () => {
  BillingReportCategory.value = false;
};
const closeCollectionReportMain = () => {
  CollectionReportMainHeader.value = false;
};
const closeCollectionReportGroup = () => {
    CollectionReportGroupHeader.value = false;
};
const closeCptModifier = () => {
    CptModifiers.value = false;
};
const closeCptSections = () => {
    CptSections.value = false;
};
const closeCptSubSections = () => {
    CptSubSections.value = false;
};
const closeDepartmentGroups = () => {
    DepartmentGroups.value = false;
};
const closeDosages = () => {
    Dosages.value = false;
};
const closeDrugAdminGroups = () => {
    DrugAdminGroups.value = false;
};
const closeDohDrugLists = () => {
    DohDrugLists.value = false;
};
const closeDxMedicalPackages = () => {
    DxMedicalPackages.value = false;
}
const closeGenericNames = () => {
    GenericNames.value = false;
};
const closeIndications = () => {
    Indications.value = false;
};
const closeItemPriceGroups = () => {
    ItemPriceGroups.value = false;
};
const closeItemPricingSchemes = () => {
    ItemPricingSchemes.value = false;
};
const closeItemUnits = () => {
    ItemUnits.value = false;
};
const closeMedicationDurations = () => {
    MedicationDurations.value = false;
};
const closeMedicationFrequencies = () => {
    MedicationFrequencies.value = false;
};
const closeMedicationPreparations = () => {
    MedicationPreparations.value = false;
};
const closeMedicationRoutes = () => {
    Routes.value = false;
};
const closeOthersDialog = () => {
    Others.value = false;
}
const closePhicItemCategories = () => {
    PhicItemCategories.value = false;
}
const closeUnitOfMeasures = () => {
  UnitOfMeasures.value = false;
}
const closeModalities = () => {
  Modalities.value = false;
}
const closeSpecimens = () => {
  Specimens.value = false;
}
</script>

<style>
.v-data-table {
  overflow-x: auto;
}
</style>
