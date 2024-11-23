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
			disabled
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
			disabled
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
		<v-card-title> Print Reports</v-card-title>
		<v-row>
			<v-col cols="3">
				<v-col cols="12">
					<v-btn  @click="handleReportByDept">
						<v-icon
							color="#0D47A1"
							size="large"
						>mdi-newspaper</v-icon>
						Census Report (By Stations)
					</v-btn>
				</v-col>
				<v-col cols="12">
					<v-btn  @click="handleReportByAllDept">
						<v-icon
							color="#0D47A1"
							size="large"
						>mdi-newspaper</v-icon>
						Census Report (All Stations)
					</v-btn>
				</v-col>
			</v-col>
			<v-col cols="3">
				<v-col cols="12">
					<v-btn  @click="handleReportDietList">
						<v-icon
							color="#F44336"
							size="large"
						>mdi-fruit-watermelon</v-icon>
						Diet List (By Stations)
					</v-btn>
				</v-col>
				<v-col cols="12">
					<v-btn  @click="handleReportForDischargePatient">
						<v-icon
							color="#4CAF50"
							size="large"
						>mdi-hospital-building</v-icon>
						Discharges for the Day
					</v-btn>
				</v-col>
			</v-col>
			<v-col cols="3">
				<v-col cols="12">
					<v-btn  @click="handleDetailedIncomeReport">
						<v-icon
							color="#4CAF50"
							size="large"
						>mdi-newspaper</v-icon>
						Income Report (Detailed)
					</v-btn>
				</v-col>
				<v-col cols="12">
					<v-btn  @click="handleIncomeReportSummary">
						<v-icon
							color="#E65100"
							size="large"
						>mdi-newspaper</v-icon>
						Income Report (Summary)
					</v-btn>
				</v-col>
			</v-col>
			<v-col cols="3">
				<v-col cols="12">
					<v-btn  @click="handleListOfMedicineReport">
						<v-icon
							color="#0277BD"
							size="large"
						>mdi-pill-multiple</v-icon>
						List of Medicines Posted
					</v-btn>
				</v-col>
				<v-col cols="12">
					<v-btn  @click="handleListOfRequestReport">
						<v-icon
							color="#0D47A1"
							size="large"
						>mdi-newspaper</v-icon>
						List of Request / Orders
					</v-btn>
				</v-col>
				<v-col cols="12">
					<v-btn  @click="handleListOfSupplyReport">
						<v-icon
							color="#F44336"
							size="large"
						>mdi-medical-bag</v-icon>
						List of Supplies Posted
					</v-btn>
				</v-col>
			</v-col>
		</v-row>
	</v-card>
	<SummaryModal 
		:show="open_summary_modal"
		:summary_header="'Nursing Services'"
		:data="nursing_services_test_data"
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

  <!-- Out-patients Sub components -->
  <PatientProfileDialog :show="PatientProfile" :form_payload="form_payload" @close-dialog="useSubComponents('PatientProfile', false)" />
  <RequisitionsDialog :show="Requisitions" :form_type="form_type" @close-dialog="useSubComponents('Requisitions', false)" />
  <PostChargesDialog :show="PostCharges" @close-dialog="useSubComponents('PostCharges', false)" />
  <ApplyCreditNoteDialog :show="ApplyCreditNote" @close-dialog="useSubComponents('ApplyCreditNote', false)" />
  <ViewExamUpshotDialog :show="ViewExaminationUpshot" @close-dialog="useSubComponents('ViewExaminationUpshot', false)" />
  <TagAsMghDialog :show="TagAsMgh" :form_type="form_type" @close-dialog="useSubComponents('TagAsMgh', false)" />
  <UntagAsMghDialog :show="UntagAsMgh" @close-dialog="useSubComponents('UntagAsMgh', false)" />
  <DischargeDialog :show="Discharge" :form_type="form_type" @close-dialog="useSubComponents('Discharge', false)" />
  <DischargeInstructionDialog :show="DischargeInstruction" @close-dialog="useSubComponents('DischargeInstruction', false)" />
  <RelocatePatientDialog :show="RelocatePatient" @close-dialog="useSubComponents('RelocatePatient', false)" />
  <NurseEndorsementFormDialog :show="NurseEndorsementForm" @close-dialog="useSubComponents('NurseEndorsementForm', false)" />
  <ViewPatientDietHistoryDialog :show="ViewPatientDietHistory" @close-dialog="useSubComponents('ViewPatientDietHistory', false)" />
  <ViewDrugsAndMedicinesDialog :show="ViewDrugsAndMedicines" @close-dialog="useSubComponents('ViewDrugsAndMedicines', false)" />
  <ViewStatementOfAccountDialog :show="ViewStatementOfAccount" @close-dialog="useSubComponents('ViewStatementOfAccount', false)" />
  <ClaimForm4ProcessingDialog :show="ClaimForm4Processing" @close-dialog="useSubComponents('ClaimForm4Processing', false)" />

  <!-- Nursing Services Processing Queries -->
  <DietaryTransactionDialog :show="DietaryTransactions" @close-dialog="useProcessingQueries('DietaryTransactions', false)" />
  <MayGoHomePatientListDialog :show="MayGoHomePatientList" @close-dialog="useProcessingQueries('MayGoHomePatientList', false)" />
  <RoomStatusAvailabilityDialog :show="RoomStatusAvailability" @close-dialog="useProcessingQueries('RoomStatusAvailability', false)" /> 
</template>

<script setup>
  import PatientProfileDialog from "../../../components/master-file/forms/patient/FormContainer.vue";

  import ReusableTable from "~/components/reusables/ReusableTable.vue";
  const {
    PatientProfile,
    Requisitions,
    PostCharges,
    ApplyCreditNote,
    ViewExaminationUpshot,
    NurseActvity,
    TagAsMgh,
    UntagAsMgh,
    Discharge,
    DischargeInstruction,
    RelocatePatient,
    NurseEndorsementForm,
    ViewPatientDietHistory,
    ViewDrugsAndMedicines,
    ViewStatementOfAccount,
    ClaimForm4Processing,
  } = storeToRefs(NursingSubComponentsDialog());

  const { 
    DietaryTransactions,
    MayGoHomePatientList,
    RoomStatusAvailability,
  } = storeToRefs(PQNursingServicesDialog());

  definePageMeta({
    layout: "root-layout",
  });

  const { selectedRowDetails, isrefresh } = storeToRefs(useSubcomponentSelectedRowDetailsStore());
  const isSelectedUser = ref(true);
  const pageTitle = ref("Nursing Activity");
  const currentTab = ref(false);
  const showTabs = ref(false);
  const tableTabs = ref([]);
  const form_payload = ref({});

  const totalItems = ref(0);
  const itemsPerPage = ref(15);
  const search = ref("");
  const filter = ref({});
  const open_filter_options = ref(false);
  const params = ref("");
  const loading = ref(true);
  const open_summary_modal = ref(false);
  const nursing_services_test_data = ref([
    { label: "Admissions", value: "1" },
    { label: "MGH", value: "2" },
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
  const handleView = () => {
    
  };
  const handleEdit = () => {
    
  };
  const handleNew = () => {
    
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

  const handleReportByDept = async () => {
	loading.value = true;
	try {
		const response = await useMethod("get", "generate-er-daily-report", "", "");
		if (response) {
			const blobUrl = URL.createObjectURL(response);
			console.log('BLOB : ', blobUrl)
			window.open(blobUrl, '_blank');
		} else {
			useSnackbar(true, "red", response.message || 'Failed to generate statement');
			isLoading.value = false;
		}
    } catch (error) {
		if (error.response && error.response.status === 404) {
			useSnackbar(true, "red", error.response.message || 'Billing is empty');
		} else {
			useSnackbar(true, "red", error.response.message || 'Failed to generate statement');
		}
		isLoading.value = false;

	} finally {
		isLoading.value = false;
	}
  }

//   const createAccountStatement = async () => {
//         let caseNo = selectedRowDetails.value.patient_registry[0].case_No;
//         try {
//             const response = await useMethod("get", `generate-statement-summary/${caseNo}`, "", "");
//             if (response) {
//                 const blobUrl = URL.createObjectURL(response);
//                 console.log('BLOB : ', blobUrl)
//                 window.open(blobUrl, '_blank');
//             } else {
//                 useSnackbar(true, "red", response.message || 'Failed to generate statement');
//                 isLoading.value = false;
//             }
//         } catch (error) {
//             if (error.response && error.response.status === 404) {
//                 useSnackbar(true, "red", error.response.message || 'Billing is empty');
//             } else {
//                 useSnackbar(true, "red", error.response.message || 'Failed to generate statement');
//             }
//             isLoading.value = false;
//         } finally {
//             isLoading.value = false;
//         }
//     };


  const handleReportByAllDept = async () => {
	loading.value = true;
	try {
		
	} catch(error) {

	} finally {
		loading.value = false;
	}
  }

  const handleReportDietList = async () => {
	alert('Ready to print report diet list')
  }

  const handleReportForDischargePatient = async () => {
	alert('Ready to print report Discharged Patient with in the day')
  }

  const handleDetailedIncomeReport = async () => {
	alert('Ready to print Detailed Income Report')
  }

  const handleIncomeReportSummary = async () => {
	alert('Ready to print Income summary report')
  }

  const handleListOfMedicineReport = async () => {
	alert('Ready to print List of Medicine report')
  }

  const handleListOfRequestReport = async () => {
	alert('Ready to print Request report')
  }

  const handleListOfSupplyReport = async () => {
	alert('Ready to print List of supply report')
  }

</script>

<style>
.v-data-table {
  overflow-x: auto;
}
</style>
