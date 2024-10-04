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
      :serverItems="doctorlist"
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
        <!-- customize rendering for each column here -->
        <span v-if="column.key === 'category'" :key="column.key">{{
          item.doctor_category ? item.doctor_category.category_description : "asdasd"
        }}</span>
        <span v-if="column.key === 'specialization_id'" :key="column.key">{{
          item.doctor_specialty ? item.doctor_specialty.specialization_description : ""
        }}</span>

        <span v-if="column.key === 'warehouse'" :key="column.key">
          {{ item.warehouse ? item.warehouse.warehouse_description : "" }}</span
        >
        <span v-if="column.key === 'birthdate'" :key="column.key">
          {{ item.birthdate ? formatDate(item.birthdate) : "" }}</span
        >
        <span v-if="column.key === 'isactive'" :key="column.key">
            <v-chip color="green" v-if="item.isactive == 1">Active</v-chip>
            <v-chip color="red" v-else>Inactive</v-chip>
        </span>
        <!-- Add more custom logic for other columns -->
      </template>
    </ReusableTable>

    <!-- Central Lookup Search Form -->
    <CentralLookUpForm
      @close-dialog="closeCentralFormDialog"
      @search="SearchConsultant"
      @selected-row="selectedDoctor"
      :central_form_dialog="central_form_dialog"
      :search_results="search_results"
      :search_payload="search_payload"
      @open-form="openFormDialog"
    />
    
    <ConsultantForm
      :form_dialog="form_dialog"
      @close-dialog="closeFormDialog"
      @submit-form="confirmation"
      :payload="payload"
    />
    <Confirmation
    :show="confirmationDialog"
    :payload="payload"
    :error_msg="error_msg"
    :loading="loading"
    @close="closeConfirmation"
    @submit="submitDoctorsForm"
    />
    <SummaryModal 
      :show="open_summary_modal"
      :summary_header="'Consultant'"
      :data="consultant_test_data"
      @close-dialog="closeViewSummary"
    />
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

  <!-- Master File Consultants Sub components -->
  <MFItemExaminationDialog :show="MFListOfItemExaminations" @close-dialog="useSubComponents('MFListOfItemExaminations', false)" />
  <MFListOfPatientsDialog :show="MFListOfPatients" @close-dialog="useSubComponents('MFListOfPatients', false)" />
  <MFGetDoctorAccreditationNoDialog :show="MFGetDoctorAccreditationNo" @close-dialog="useSubComponents('MFGetDoctorAccreditationNo', false)" />

  <!-- Master File Consultants Processing and Queries -->
  <PFItemsPerServiceTypeDialog :show="PFItemsPerServiceType" @close-dialog="useProcessingQueries('PFItemsPerServiceType', false)" />
</template>

<script setup>
import ReusableTable from "~/components/reusables/ReusableTable.vue";
import CentralLookUpForm from "~/components/reusables/CentralLookUpForm.vue";
import ConsultantForm from "./Form.vue";
import nuxtStorage from "nuxt-storage";
import { PQConsultantsDialog } from "~/store/processing-queries/master-file/PQConsultantsDialog";
// import { storeToRefs } from "pinia";
// import { useSnackBarStore } from "~/store/SnackBar";
// const { setSnackbar } = useSnackBarStore();
const {
  MFListOfItemExaminations,
  MFListOfPatients,
  MFGetDoctorAccreditationNo,
  MFDoctorsAccreditationCheck,
} = storeToRefs(MFConsultantsDialog());

const { 
  PFItemsPerServiceType,
  DoctorsWithExpiringLicense,
} = storeToRefs(PQConsultantsDialog());

definePageMeta({
  layout: "root-layout",
});
const confirmationDialog = ref(false);
const error_msg = ref('');
const { selectedRowDetails, isrefresh } = storeToRefs(
  useSubcomponentSelectedRowDetailsStore()
);
const isSelectedUser = ref(true);
const pageTitle = ref("Consultants");
const currentTab = ref(false);
const showTabs = ref(false);
const tableTabs = ref([]);

const totalItems = ref(0);
const itemsPerPage = ref(40);
const search = ref({});
const params = ref("");
const loading = ref(true);
const userdetails = ref(null);

const search_payload = ref({
  isloading:false
});
const filter = ref({});
const open_filter_options = ref(false);
const form_dialog = ref(false);
const central_form_dialog = ref(false);
const search_results = ref([]);
const open_summary_modal = ref(false);
const consultant_test_data = ref([
  { label: "Residents", value: "123" },
  { label: "Regular Consultants", value: "456" },
  { label: "Visiting Consultants", value: "789" },
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

const doctorlist = ref([]);
const payload = ref({
  isloading:false
});

const selectedDoctor = (item) => {
  payload.value.id = ""; //clear state id for subcomponents ?id=''
  payload.value.role_id = ""; //clear state id for subcomponents ?id=''
  payload.value = Object.assign({});
  if (item) {
    payload.value = Object.assign({}, item); //set state id for subcomponents ?id=item.id value
    payload.value.specialization_primary_id = parseInt(item.specialization_primary_id);
    payload.value.service_type = parseInt(item.service_type);
    payload.value.category_id = parseInt(item.category_id);
    payload.value.suffix_id = parseInt(item.suffix_id);
    payload.value.sex_id = parseInt(item.sex_id);
    payload.value.birthdate = useDateMMDDYYY(item.birthdate);
    payload.value.prc_license_expiry_date = useDateMMDDYYY(item.prc_license_expiry_date);
    payload.value.philhealth_accreditation_expiry_date = useDateMMDDYYY(
      item.philhealth_accreditation_expiry_date
    );
    payload.value.isactive = parseInt(item.isactive) == 1 ? true : false;
  }
};

const handleRefresh = () => {
  loadItems();
};

const SearchConsultant = async (payload) => {
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
  const response = await fetch(useApiUrl() + "/search-doctors" + "?" + params || "", {
    headers: {
      Authorization: `Bearer ` + useToken(),
    },
  });
  if (response) {
    const data = await response.json();
    updateSearchItems(data);
    search_payload.value.isloading = false;
  }
};

const handleSearch = (keyword) => {
  // Handle search action
  search_payload.value.lastname = useSeperateName(keyword,'lastname');
  search_payload.value.firstname = useSeperateName(keyword,'firstname');
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
  payload.value = Object.assign({});

  if (item) {
    selectedRowDetails.value = Object.assign({}, item); //set state id for subcomponents ?id=item.id value
    payload.value = Object.assign({}, item);
    isrefresh.value = true;
    isSelectedUser.value = false;
  } else {
    isrefresh.value = false;
    isSelectedUser.value = true;
  }
};

const details = () => {
  if (payload) {
    payload.value.specialization_primary_id = parseInt(
      payload.value.specialization_primary_id
    );
    payload.value.service_type = parseInt(payload.value.service_type);
    payload.value.category_id = parseInt(payload.value.category_id);
    payload.value.suffix_id = parseInt(payload.value.suffix_id);
    payload.value.sex_id = parseInt(payload.value.sex_id);
    payload.value.civil_status_id = parseInt(payload.value.civil_status_id);
    payload.value.prc_type_id = parseInt(payload.value.prc_type_id);
    payload.value.phic_group_id = parseInt(payload.value.phic_group_id);
    payload.value.service_class_id = parseInt(payload.value.service_class_id);
    payload.value.isVatable = parseInt(payload.value.isVatable);
    payload.value.birthdate = useDateMMDDYYY(payload.value.birthdate);
    payload.value.EWTTax = parseInt(payload.value.WithHolding__tax_rate);
    payload.value.age = useCalculateAge(useDateMMDDYYY(payload.value.birthdate));
    payload.value.prc_license_expiry_date = useDateMMDDYYY(payload.value.prc_license_expiry_date);
    payload.value.philhealth_accreditation_expiry_date = useDateMMDDYYY(payload.value.philhealth_accreditation_expiry_date);
    payload.value.isactive = parseInt(payload.value.isactive) == 1 ? true : false;
    payload.value.residentialaddress = payload.value.doctor_address ? payload.value.doctor_address.full_address : '';
    payload.value.clinicaddress =payload.value.doctor_clinic_address ? payload.value.doctor_clinic_address.full_address : '';
    form_dialog.value = true;
  }
};

const handleView = () => {
  if(Object.keys(payload.value).length === 0) return useSnackbar(true,"error","Select Doctor");
  details();
  payload.value.type = 'view';
};
const handleEdit = () => {
  if(Object.keys(payload.value).length === 0) return useSnackbar(true,"error","Select Doctor");
  details();
  payload.value.type = 'edit';
};

const handleNew = () => {
  payload.value.type = 'new';
  central_form_dialog.value = true;
};
const DeactiveUser = () => {};

const ViewSummary = () => {
  open_summary_modal.value = true;
}
const closeViewSummary = () => {
  open_summary_modal.value = false;
}

const closeCentralFormDialog = () => {
  central_form_dialog.value = false;
};

const openFormDialog = (type) => {
  if(type == 'new'){
    payload.value = Object.assign({});
  }
  if (payload.value.id) {
    search_results.value = [];
    details();
    payload.value.type = 'edit';
  } else {
    payload.value.lastname = search_payload.value.lastname;
    payload.value.firstname = search_payload.value.firstname;
  }
  form_dialog.value = true;
};


const closeFormDialog = () => {
  form_dialog.value = false;
  payload.value = Object.assign({});
  selectedUser(null);
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
    const response = await fetch(useApiUrl() + "/doctors" + "?" + params.value || "", {
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
  doctorlist.value = newServerItems;
};

const updateSearchItems = (items) => {
  search_results.value = items;
  console.log(search_results.value, "search");
};


const closeConfirmation = ()=>{
  confirmationDialog.value = false;
}
const confirmation = ()=>{
  confirmationDialog.value = true;
}

const submitDoctorsForm = async (details) => {
  if (usePasscode() == details.user_passcode) {
      if (payload.value) {

        loading.value = true;
        let method = "POST";
        let id = "";
        if (payload.value.id) {
          id = payload.value.id;
          method = "PUT";
        }
        const response = await $fetch(useApiUrl() + `/consultants/` + id, {
          method: method,
          headers: {
            Authorization: `Bearer ` + useToken(),
            "Content-Type": "application/json",
          },
          body: { payload: payload.value },
        });
        if (response.msg) {
          confirmationDialog.value = false;
          loading.value = false;
          loadItems(null, payload.value.lastname);
          closeFormDialog();
          return useSnackbar(true,"success",response.msg);
        }
      }
   }else {
    error_msg.value = "Incorrect Passcode";
    setTimeout(() => {
      error_msg.value = "";
    }, 3000);
  }
};

onMounted(() => {
  userdetails.value = useGetData("user_details");
});
</script>

<style>
.v-data-table {
  overflow-x: auto;
}
.dialog-bottom-transition-enter-active,
.dialog-bottom-transition-leave-active {
  transition: transform 0.2s ease-in-out;
}
</style>
