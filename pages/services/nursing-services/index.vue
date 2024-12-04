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
				@click="RevokeUser"
				prepend-icon="mdi-toggle-switch"
				:disabled="isSelectedUser"
				width="150"
				color="primary"
				class="bg-error text-white"
			>
				Revoke
			</v-btn>

			<v-btn
				@click="ViewReports"
				prepend-icon="mdi-information-box-outline"
				width="150"
				color="primary"
				class="bg-warning text-white"
			>
				Reports</v-btn
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
			@fetchPage="loadItems"
			@selected-row="selectedUser"
			@tab-change="handleTabChange"
			@action-search="handleSearch"
			@action-refresh="handleRefresh"
			@open-filter="openFilterOptions"
		>
			<template v-for="column in columns" v-slot:[`column-${column.key}`]="{ item }">

				<div v-if="column.key === 'registry_status'" :key="column.key" class="isActive">
					<span 
						:style="{ 
							cursor: 'default', 
							display: 'block', 
							height: '26px', 
							width: '9px', 
							backgroundColor: 
								item.patient_registry && 
								item.patient_registry[0].mscPatient_Category == 2 
								? 'blue' 
								: 'green' 
						}" 
						:title="
							item.patient_registry && 
							item.patient_registry[0].mscPatient_Category == 2 
							? 'New Patient' 
							: 'Old Patient'
						"
					/>
				</div>
				<div v-if="column.key === 'isHMO'" :key="column.key" class="isHMO">
					<span 
						:style="{ 
							cursor: 'default', 
							display: 'block', 
							height: '26px', 
							width: '9px', 
							backgroundColor: 
								item.patient_registry && 
								item.patient_registry[0].guarantor_Name !== 'Self Pay' && 
                item.patient_registry[0].guarantor_Name !== null
								? 'yellow' 
								: 'orange' 
						}" 

						:title="
							item.patient_registry && 
							item.patient_registry[0].guarantor_Name !== 'Self Pay' && 
              item.patient_registry[0].guarantor_Name !== null
							? 'HMO ' 
							: 'Self Pay'
						"
					/>
				</div>

				<span 
					v-if="column.key === 'case_No'" 
					:key="column.key">
					{{ 
						item.patient_registry 
						? item.patient_registry[0].case_No 
						: "..." 
					}}
				</span>

				<span 
					v-if="column.key === 'sex'" 
					:key="column.key" style="display: flex;">

					<v-icon 
						v-if="item.sex && 
						item.sex.sex_description === 'Male'" 
						color="primary">
						mdi-gender-male
					</v-icon>

					<v-icon 
						v-else 
						color="pink">
						mdi-gender-female
					</v-icon>

					{{ 
						item.sex 
						? item.sex.sex_description 
						: "..." 
					}}
				</span>

				<span 
					v-if="column.key === 'birthdate'" 
					:key="column.key">
					{{ 
						item.birthdate 
						? useDateMMDDYYY(item.birthdate) 
						: "..." 
					}}
				</span>

				<span 
					v-if="column.key === 'registry_date'" 
					:key="column.key">
					{{ 
						item.patient_registry && 
						item.patient_registry[0].registry_Date 
						? useDateMMDDYYY(item.patient_registry[0].registry_Date) 
						: "..." 
					}}
				</span>

				<span 
					v-if="column.key === 'discharged_date'" 
					:key="column.key">
					{{ 
						item.patient_registry && 
						item.patient_registry[0].discharged_Date 
						? useDateMMDDYYY(item.patient_registry[0].discharged_Date) 
						: "..." 
					}}
				</span>

				<span 
					v-if="column.key === 'revoked_Date'" 
					:key="column.key">
					{{ 
						item.patient_registry && 
						item.patient_registry[0].revoked_Date 
						? useDateMMDDYYY(item.patient_registry[0].revoked_date) 
						: "..." 
					}}
				</span>
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
		:data="erPatient_test_data"
		@close-dialog="closeViewSummary"
	/>

  <ReportModal 
		:show="open_report_modal"
		:summary_header="'Reports'"
		@close-dialog="closeViewReports"
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

  	<EmergencyRegistration :clicked_option="clicked_option" :form_dialog="form_dialog" @patient-registered="loadPatient" @close-dialog="closeAddFormDialog" />
  
	<!-- Emergency Sub components -->
	<PatientProfileDialog :show="PatientProfile" :form_payload="payload" @close-dialog="useSubComponents('PatientProfile', false)" />
	<SuspendDialog :show="Suspend" :form_type="form_type" @close-dialog="useSubComponents('Suspend', false)" />
	<RequisitionsDialog :show="Requisitions" :form_type="form_type" @close-dialog="useSubComponents('Requisitions', false)" />
	<PostChargesDialog :show="PostCharges" @close-dialog="useSubComponents('PostCharges', false)" />
  <NurseActivityDialog :show="NurseActivity" :form_type="form_type" @close-dialog="useSubComponents('NurseActivity', false)" /> 
  <ERPostMedicineSuppliesDialog :show="ERPostMedicineSupplies" @close-dialog="useSubComponents('ERPostMedicineSupplies', false)" />
</template>

<script setup>
import PatientProfileDialog from "../../../components/master-file/forms/patient/FormContainer.vue";

import { usePatientStore } from '@/store/selectedPatient';

const patientStore = usePatientStore();

import ReusableTable from "~/components/reusables/ReusableTable.vue";
import Snackbar from "~/components/reusables/snackbar.vue";
const {
  PatientProfile,
  Suspend, 
  Requisitions,
  PostCharges,
  NurseActivity,
  ERPostMedicineSupplies,

} = storeToRefs(ERSubComponentsDialog());

const { 
  MayGoHomePatientList,
  DocumentArchives,
  Cf4ForDischargedPatients,
} = storeToRefs(PQEmergencyPatientDialog());

definePageMeta({
  layout: "root-layout",
});

const { selectedRowDetails, isrefresh } = storeToRefs(useSubcomponentSelectedRowDetailsStore());
const isSelectedUser = ref(true);
const pageTitle = ref("");
const currentTab = ref(1);
const showTabs = ref(true);
const columns = ref([]);
const central_form_dialog = ref(false);
const search_results = ref([]);
const search_payload = ref({});
const form_dialog = ref(false);
const clicked_option = ref("");
const form_type = ref("emergency")
const payload = ref({});
const selectedPatient = ref({});
const open_revoke_form = ref(false);
const open_unrevoke_form = ref(false);


const tableTabs = ref([
  {
    label: "Registered",
    title: "Registered patients today.",
    value: 1,
    endpoint: useApiUrl() + "/get-emergency",
    columns: [
              {
                title: "",
                align: "start",
                sortable: false,
                key: "registry_status",
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
    endpoint: useApiUrl() + "/get-revoked-emergency-patient",
    columns: [
              {
                title: "",
                align: "start",
                sortable: false,
                key: "registry_status",
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
    endpoint: useApiUrl() + "/get-revoked-emergency-patient",
    columns: [
              {
                title: "",
                align: "start",
                sortable: false,
                key: "registry_status",
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
                title: "ER Case No.",
                align: "start",
                sortable: false,
                key: "er_case_No",
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
    endpoint: useApiUrl() + "/get-revoked-emergency-patient",
    columns: [
              {
                title: "",
                align: "start",
                sortable: false,
                key: "registry_status",
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
                key: "patient_id",
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

const totalItems = ref(0);
const itemsPerPage = ref(15);
const search = ref("");
const filter = ref({});
const open_filter_options = ref(false);
const params = ref("");
const loading = ref(true);
const open_report_modal = ref(false);

const erPatient_test_data = ref([
  { label: "Active", value: "1", color: "green" },
  { label: "Discharged", value: "2", color: "lightblue" },
  { label: "May Go Home", value: "3", color: "yellow" },
  { label: "Untagged as MGH", value: "4", color: "lightgreen" },
  { label: "Cancelled", value: "5", color: "red" },
  { label: "Died", value: "6", color: "black" },
]); 

const headers = [
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
    selectedRowDetails.value.id = ""; 
    selectedRowDetails.value.role_id = ""; 
    selectedRowDetails.value = Object.assign({}, item); 
    if(item){
        selectedRowDetails.value =  Object.assign({}, item);;
        isrefresh.value = true;
        isSelectedUser.value = false;
    } else{
        isrefresh.value = false;
        isSelectedUser.value = true;
    }
    };

const loadPatient = (patientDetails) => {
  const keyword = patientDetails || "";
  loadItems(null, keyword);
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
  search_payload.value = {};
  search_results.value = [];
  selectedPatient.value = {};
};

const openAddFormDialog = (type) => {
  if (type === 'new') {
        form_dialog.value = true;
        closeCentralFormDialog();
    } else if (type === 'old') {  
        // let curDate = useDateMMDDYYY(new Date());
        // let curDate = '2024-08-14';
        // if(curDate == useDateMMDDYYY(patientStore?.selectedPatient?.updated_at)) {
        //     return useSnackbar(true, 'error', 'Patient is already registered.')
        // } else {
          // console.log(patientStore.selectedPatient.created_at)
          patientStore.setSelectedPatient(selectedPatient.value);
          if (patientStore.selectedPatient && patientStore.selectedPatient.id) {  
              form_dialog.value = true;
              closeCentralFormDialog();
          } else {
              return useSnackbar(true, "error", "No item selected.");
          }
        // }
    } 
};
const closeAddFormDialog = () => {
  form_dialog.value = false;
  search_payload.value = {};
  search_results.value = [];
};

const selectedEmergencyPatient = (item) => {
  selectedPatient.value = item;
};

const SearchEmergencyPatient = async (payload) => {
  search_payload.value.isloading = true;
  let lastname = payload.lastname || "";
  let firstname = payload.firstname || "";
  let middlename = payload.middlename || "";
  let birthdate = payload.birthdate || "";
  let params = "page=1&per_page=10&lastname=" + lastname + "&firstname=" + firstname + "&middlename=" + middlename + "&birthdate=" + birthdate;

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
    search_results.value = data;
    search_payload.value.isloading = false;
  }
};

// const RevokeUser = async () => {
//   response = await useMethod("put", "update-emergency", payload.value, "", payload.value.patient_id);
//     if (response) {
//         useSnackbar(true, "green", response.message);
//         isLoading.value = false;
//         tab.value = "0";
//     }
// };

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


const ViewReports = () => {
  open_report_modal.value = true;
}
const closeViewReports = () => {
  open_report_modal.value = false;
}


const loadItems = async (options = null, searchkeyword = null) => {
	try {
		loading.value = true;
		const keyword = searchkeyword || "";
		params.value = options
		? `page=${options.page}&per_page=${options.itemsPerPage}&keyword=${options.keyword}`
		: `page=1&per_page=50&keyword=${keyword}`;
		const currentTabInfo = tableTabs.value.find((tab) => tab.value === currentTab.value);
		const response = await fetch(`${currentTabInfo?.endpoint}?${params.value}`, {
			headers: {
				Authorization: `Bearer ${useToken()}`,
			},
		});

		const data = await response.json();
		if (data && data.data) {
			updateTotalItems(data.total);
			updateServerItems(data.data);
		} else {
			console.log("Data not found or response error");
		}
	} catch (error) {
		console.error("Error fetching data:", error);
	} finally {
		loading.value = false;
 	}
}


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



handleTabChange(currentTab.value);
</script>

<style>
.v-data-table {
  overflow-x: auto;
}
</style>
