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
    :form_container="form_dialog"
    :form_payload="form_payload"
    @close-dialog="closeFormContainer"
  />

  <DiscountSchemesDialog 
    :show="DiscountSchemes"
    @close-dialog="closeDiscountSchemes"
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
  <PriceGroupDialog 
    :show="PriceGroup"
    @close-dialog="closePriceGroup"
  />
  <DocumentCategoriesDialog 
    :show="DocumentCategories"
    @close-dialog="closeDocumentCategories"
  />
  <PatientAddInfoDialog 
    :show="PatientAddtionalInformation"
    @close-dialog="closePatientAddtionalInformation"
  />
  <BadHabitsDialog 
    :show="BadHabits"
    @close-dialog="closeBadHabits"
  />
  <IdTypesDialog
    :show="IdTypes"
    @close-dialog="closeIdTypes"
  />
  <AuthoritiesDialog
    :show="Authorities"
    @close-dialog="closeAuthorities"
  />
  <EmploymentInfoPositionDialog 
    :show="EmploymentInformationPositions"
    @close-dialog="closeEmploymentInformationPositions"
  />
  <EmployerNameDialog 
    :show="EmployerName"
    @close-dialog="closeEmployerName"
  />
  <OtherSpecialistDialog 
    :show="OtherSpecialist"
    @close-dialog="closeOtherSpecialist"
  />
  <FacilitiesDialog 
    :show="Facilities"
    @close-dialog="closeFacilities"
  />
  <LoaDepartmentDialog 
    :show="LoaDepartment"
    @close-dialog="closeLoaDepartment"
  />
  <MilitaryClassificationDialog 
    :show="MilitaryClassification"
    @close-dialog="closeMilitaryClassification"
  />

</template>

<script setup>
import ReusableTable from "~/components/reusables/ReusableTable.vue";
import CentralLookUpForm from "~/components/reusables/CentralLookUpForm.vue";
import FormContainer from "~/components/master-file/forms/patient/FormContainer.vue";
// Table and templates store 
const { 
  DiscountSchemes,
  MedicalServiceTypes,
  MedicalSubServiceTypes,
  PriceSchemes,
  PriceGroup,
  DocumentCategories,
  PatientAddtionalInformation,
  BadHabits,
  IdTypes,
  Authorities,
  EmploymentInformationPositions,
  EmployerName,
  OtherSpecialist,
  Facilities,
  LoaDepartment,
  MilitaryClassification,
} = storeToRefs(PatientsTemplateDialog())
// Table and templates component
import DiscountSchemesDialog from "~/components/reusables/patients-templates/discount-schemes/DiscountSchemesDialog.vue";
import MedicalServiceTypesDialog from "~/components/reusables/patients-templates/medical-service-types/MedicalServiceTypesDialog.vue";
import MedicalSubServiceTypesDialog from "~/components/reusables/patients-templates/medical-sub-service-types/MedicalSubServiceTypesDialog.vue";
import PriceSchemesDialog from "~/components/reusables/patients-templates/price-schemes/PriceSchemesDialog.vue";
import PriceGroupDialog from "~/components/reusables/patients-templates/price-group/PriceGroupDialog.vue";
import DocumentCategoriesDialog from "~/components/reusables/patients-templates/document-categories/DocumentCategoriesDialog.vue";
import PatientAddInfoDialog from "~/components/reusables/patients-templates/patient-add-info/PatientAddInfoDialog.vue";
import BadHabitsDialog from "~/components/reusables/patients-templates/bad-habits/BadHabitsDialog.vue";
import IdTypesDialog from "~/components/reusables/patients-templates/id-types/IdTypesDialog.vue";
import AuthoritiesDialog from "~/components/reusables/patients-templates/authorities/AuthoritiesDialog.vue";
import EmploymentInfoPositionDialog from "~/components/reusables/patients-templates/employment-information-position/EmploymentInfoPositionDialog.vue";
import EmployerNameDialog from "~/components/reusables/patients-templates/employer-name/EmployerNameDialog.vue";
import OtherSpecialistDialog from "~/components/reusables/patients-templates/other-specialist/OtherSpecialistDialog.vue";
import FacilitiesDialog from "~/components/reusables/patients-templates/facilities/FacilitiesDialog.vue";
import LoaDepartmentDialog from "~/components/reusables/patients-templates/loa-department/LoaDepartmentDialog.vue";
import MilitaryClassificationDialog from "~/components/reusables/patients-templates/military-classification/MilitaryClassificationDialog.vue";

definePageMeta({
  layout: "root-layout",
});

const central_form_dialog = ref(false);
const form_dialog = ref(false);
const search_payload = ref({});
const search_results = ref([]);
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

// Tables and template methods
const closeDiscountSchemes = () => {
  DiscountSchemes.value = false;
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
const closePriceGroup = () => {
  PriceGroup.value = false;
}
const closeDocumentCategories = () => {
  DocumentCategories.value = false;
}
const closePatientAddtionalInformation = () => {
  PatientAddtionalInformation.value = false;
}
const closeBadHabits = () => {
  BadHabits.value = false;
}
const closeIdTypes = () => {
  IdTypes.value = false;
}
const closeAuthorities = () => {
  Authorities.value = false
}
const closeEmploymentInformationPositions = () => {
  EmploymentInformationPositions.value = false
}
const closeEmployerName = () => {
  EmployerName.value = false;
}
const closeOtherSpecialist = () => {
  OtherSpecialist.value = false;
}
const closeFacilities = () => {
  Facilities.value = false;
}
const closeLoaDepartment = () => {
  LoaDepartment.value = false;
}
const closeMilitaryClassification = () => {
  MilitaryClassification.value = false;
}

</script>

<style scoped></style>
