<template>
    <v-card class="mb-2 pt-2" elevation="4">
        <p style="font-weight: bolder; color: #228B22; font-size: larger; margin-bottom: 10px; text-align: center;">Pharmacy Services</p>
        <div style="display: flex; justify-content: center; align-items: center;">
            <v-btn style="border: 1px solid #000; margin-right: 5px;" 
                @click="handleOutPatientRequest()" 
                :class="{ blinking: isOPDBlinking, 'red-background': isOPDBlinking }"
                :disabled="outPatientCount === 0">
                Out-Patient
                <span v-if="outPatientCount > 0" class="notification-count">{{ outPatientCount }}</span>
            </v-btn>
            <v-btn style="border: 1px solid #000; margin-right: 5px;" 
                @click="handleEmergencyRequest()" 
                :class="{ blinking: isERBlinking, 'red-background': isERBlinking }"
                :disabled="erCount === 0">
                Emergency
                <span v-if="erCount > 0" class="notification-count">{{ erCount }}</span>
            </v-btn>
            <v-btn style="border: 1px solid #000;" 
                @click="handleInPatientRequest()" 
                :class="{ blinking: isIPDBlinking, 'red-background': isIPDBlinking }"
                :disabled="inPatientCount === 0">
                In-Patient
                <span v-if="inPatientCount > 0" class="notification-count">{{ inPatientCount }}</span>
            </v-btn>
        </div>
        <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn prepend-icon="mdi-medication-outline" class="bg-primary text-white">
                Posted Medicines
                <v-menu activator="parent">
                    <v-list>
                        <v-list-item
                            v-for="(item, index) in menuCodes"
                            :key="index"
                            :value="index"
                            class="hoverable-list-item"
                            @click="openPostedMedicine(item.code)"
                        >
                            <v-list-item-title>{{ item.description }}</v-list-item-title>
                        </v-list-item>
                    </v-list>
                </v-menu>
            </v-btn>
            <v-btn prepend-icon="mdi-file-document-edit-outline" class="bg-warning text-white">
                Correction Entry
                <v-menu activator="parent">
                    <v-list>
                        <v-list-item
                            v-for="(item, index) in menuCodes"
                            :key="index"
                            :value="index"
                            class="hoverable-list-item"
                            @click="openCorrectionEntry(item.code)"
                        >
                            <v-list-item-title>{{ item.description }}</v-list-item-title>
                        </v-list-item>
                    </v-list>
                </v-menu>
            </v-btn>
            <v-btn prepend-icon="mdi-pill-off" class="bg-error text-white">
                Returned Medicines
                <v-menu activator="parent">
                    <v-list>
                        <v-list-item
                            v-for="(item, index) in menuCodes"
                            :key="index"
                            :value="index"
                            class="hoverable-list-item"
                            @click="openReturnedMedicines(item.code)"
                        >
                            <v-list-item-title>{{ item.description }}</v-list-item-title>
                        </v-list-item>
                    </v-list>
                </v-menu>
            </v-btn>
            <v-btn
                prepend-icon="mdi-information-outline"
                class="bg-info text-white"
            >
            Drug Inquiry
            </v-btn>
            <v-btn prepend-icon="mdi-chart-bar" class="bg-success text-white">
            Reports
            <v-menu activator="parent">
                <v-list>
                    <v-list-item
                    v-for="(item, index) in reportMenuCodes"
                    class="hoverable-list-item cursor-default"
                    :key="index"
                    >
                    <v-list-item-title>{{ item.description }}</v-list-item-title>
                    <template v-slot:append>
                        <v-icon v-if="item.subMenus" icon="mdi-menu-right" size="x-small"></v-icon>
                    </template>

                    <v-menu v-if="item.subMenus" activator="parent" open-on-hover submenu location="end">
                        <v-list>
                        <v-list-item
                            v-for="(subMenu, subIndex) in item.subMenus"
                            :key="subIndex"
                            class="hoverable-list-item cursor-pointer"
                            @click="item.id != 3 ? openDateSelection(item.id, subMenu.id) : printUnitDesoReport(subMenu.id)"
                        >
                            <v-list-item-title>{{ subMenu.description }}</v-list-item-title>
                        </v-list-item>
                        </v-list>
                    </v-menu>
                    </v-list-item>
                </v-list>
            </v-menu>
        </v-btn>
            <v-btn prepend-icon="mdi-pill-multiple" class="bg-primary text-white">
                Manual Posting
                <v-menu activator="parent">
                    <v-list>
                        <v-list-item
                            v-for="(item, index) in menuCodes"
                            :key="index"
                            :value="index"
                            class="hoverable-list-item"
                            @click="openManualPosting(item.code)"
                        >
                            <v-list-item-title>{{ item.description }}</v-list-item-title>
                        </v-list-item>
                    </v-list>
                </v-menu>
            </v-btn>
            <v-spacer></v-spacer>
        </v-card-actions>
    </v-card>
    <v-card class="mb-4" elevation="4">
        <v-data-table
            density="compact"
            height="70vh"
            :headers="table_headers"
            :items="medicine_request_data"
            :items-per-page="100"
            :hover="true"
            hide-details
        >
            <template v-slot:item="{ item }">
                <tr style="cursor: pointer;" @click="handleSelectedItem(item)">
                    <td>{{ item.patient_Id }}</td>
                    <td>{{ item.case_No }}</td>
                    <td>{{ item.patient_Name }}</td>
                    <td>{{ item.requestNum }}</td>
                </tr>
            </template>
            <template #bottom />
        </v-data-table>
    </v-card>

    <CarryMedicineOrder 
        :open_carry_order_form="open_carry_order_form" 
        :patient_type="patient_type" 
        :item="selected_item"
        @ordered-carried="handleOrderCarried" 
        @close-dialog="closeCarryOrderForm" />
        
    <PharmaPostedMedicines :open_posted_medicine="open_posted_medicine" :patient_type="patient_type" @close-dialog="closePostedMedicine" />
    <PharmaCorrectionEntry :open_correction_entry="open_correction_entry" :patient_type="patient_type" @close-dialog="closeCorrectionEntry" />
    <PharmaReturnedMedicines :open_returned_medicines="open_returned_medicines" :patient_type="patient_type" @close-dialog="closeReturnedMedicines" />
    <PharmaManualPosting :open_pharma_manual_posting="open_pharma_manual_posting" :patient_type="patient_type" @close-dialog="closeManualPosting" />

    <v-dialog v-model="showSelectDate" max-width="320px" @update:model-value="closeDateSelection">
        <v-card>
            <v-card-title>
                <span style="font-size: large;">Select Specific {{ menu_id == 1 ? 'Day' : 'Month' }}
                    <span style="font-weight: bolder;">{{ sub_menu_id == 1 ? '( OPD )' : (sub_menu_id == 2 ? '( ER )' : '( IPD )') }}</span>
                </span>
            </v-card-title>
            <v-card-text>
                <div>
                    <v-row justify="center">
                        <input v-if="menu_id == 1" type="date" v-model="selectedDate" style="text-align: center; border: 1px solid #000; border-radius: 10px; padding: 5px; margin-right: 10px;" />
                        <input v-if="menu_id == 2" type="month" v-model="selectedMonth" style="text-align: center; border: 1px solid #000; border-radius: 10px; padding: 5px; margin-right: 10px;" />
                    </v-row>
                </div>
            </v-card-text>
            <v-divider style="margin-top: 20px;"></v-divider>
            <v-card-actions>
                <v-btn color="blue-darken-1 border border-info" @click="closeDateSelection"> Close </v-btn>
                <v-spacer></v-spacer>
                <v-btn class="bg-primary text-white" @click="handleReportSubMenu">Generate</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>

    <Snackbar />
</template>

<script setup>
import CarryMedicineOrder from '../../../components/services/forms/pharmacy/CarryMedicineOrder.vue';
import PharmaPostedMedicines from '../../../components/services/forms/pharmacy/PharmaPostedMedicines.vue';
import PharmaCorrectionEntry from '../../../components/services/forms/pharmacy/PharmaCorrectionEntry.vue';
import PharmaReturnedMedicines from '../../../components/services/forms/pharmacy/PharmaReturnedMedicines.vue';
import PharmaManualPosting from '~/components/services/forms/pharmacy/PharmaManualPosting.vue';

definePageMeta({
    layout: "root-layout",
});

const open_carry_order_form = ref(false);
const open_posted_medicine = ref(false);
const open_correction_entry = ref(false);
const open_returned_medicines = ref(false);
const open_pharma_manual_posting = ref(false);
const selected_item = ref([]);
const patient_type = ref(0);
const menu_id = ref(0);
const sub_menu_id = ref(0);
const showSelectDate = ref(false);
const selectedDate = ref(new Date().toISOString().substr(0, 10));
const selectedMonth = ref(new Date().toISOString().substr(0, 7));
const menuCodes = ref([
    { id: 1, description: "OPD - Out-Patient", code: 2 },
    { id: 2, description: "ER - Emergency", code: 5 },
    { id: 3, description: "IPD - In-Patient", code: 6 },
]); 
const reportMenuCodes = ref([
    {
        id: 1,
        description: "Daily Income Report",
        subMenus: [
            {
                id: 1,
                description: "Out-Patient",
            },
            {
                id: 2,
                description: "Emergency",
            },
            {
                id: 3,
                description: "In-Patient",
            },
        ],
    },
    {
        id: 2,
        description: "Monthly Income Report",
        subMenus: [
            {
                id: 1,
                description: "Out-Patient",
            },
            {
                id: 2,
                description: "Emergency",
            },
            {
                id: 3,
                description: "In-Patient",
            },
        ],
    },
    {
        id: 3,
        description: "Patient Unit Dose Report",
        subMenus: [
            {
                id: 1,
                description: "Out-Patient",
            },
            {
                id: 2,
                description: "Emergency",
            },
            {
                id: 3,
                description: "In-Patient",
            },
        ],
    },
]);
const table_headers = [
    { title: "Patient ID", align: "start", key: "patient_Id", sortable: false },
    { title: "Case No", align: "start", key: "case_No", sortable: false },
    { title: "Patient Name", align: "start", key: "patient_Name", sortable: false },
    { title: "Request No.", align: "start", key: "requestNum", sortable: false },
];

const medicine_request_data = ref([]); 

const outPatientCount = ref(0);
const outPatientData = ref([]);
const isOPDBlinking = ref(false);

const fetchOutPatientCount = async () => {
    try {
        const response = await $fetch("http://localhost:3001/api/get-opd-pharma-orders");
        if (response) {
            console.log("Out-Patient Data:", response);
            outPatientData.value = response;
            outPatientCount.value = Object.keys(response).length;
            isOPDBlinking.value = outPatientCount.value > 0;
        }
    } catch (error) {
        console.error("Error fetching out-patient data:", error);
    }
};

const handleOutPatientRequest = async () => {  
    medicine_request_data.value = outPatientData.value;
    medicine_request_data.value.forEach((item) => {
        item.patient_type = 2;
    });
}

const erCount = ref(0);
const erData = ref([]);
const isERBlinking = ref(false);
const fetchERPatientCount = async () => {
    try {
        const response = await useMethod("get", "get-er-pharmacy-orders", "", "");
        if (response) {
            erData.value = response;
            erCount.value = response.length;
            isERBlinking.value = response.length > 0;
        }
    } catch (error) {
        console.error(error);
    }
}

const handleEmergencyRequest = async () => {
    medicine_request_data.value = erData.value;
    medicine_request_data.value.forEach((item) => {
        item.patient_type = 5;
    });
}

const inPatientCount = ref(0);
const inPatientData = ref([]);
const isIPDBlinking = ref(false);
const fetchInPatientCount = async () => {
    try {
        const response = await useMethod("get", "get-ipd-pharmacy-orders", "", "");
        if (response) {
            inPatientData.value = response;
            inPatientCount.value = response.length;
            isIPDBlinking.value = response.length > 0;
        }
    } catch (error) {
        console.error(error);
    }
}

const handleInPatientRequest = async () => {
    alert("In-Patient Request");
}

const handleSelectedItem = (item) => {
    if (item.requestNum !== null || item.requestNum !== undefined) {
        open_carry_order_form.value = true;
        patient_type.value = item.patient_type;
        selected_item.value = item;
    }
}

const closeCarryOrderForm = () => {
    open_carry_order_form.value = false;
    selected_item.value = [];
}

const openPostedMedicine = (type) => {
    patient_type.value = type;
    open_posted_medicine.value = true;
}

const closePostedMedicine = () => {
    open_posted_medicine.value = false;
    patient_type.value = 0;
}

const openCorrectionEntry = (type) => {
    patient_type.value = type;
    open_correction_entry.value = true;
}

const closeCorrectionEntry = () => {
    open_correction_entry.value = false;
    patient_type.value = 0;
}

const openReturnedMedicines = (type) => {
    patient_type.value = type;
    open_returned_medicines.value = true;
}

const closeReturnedMedicines = () => {
    open_returned_medicines.value = false;
    patient_type.value = 0;
}

const openManualPosting = (type) => {
    patient_type.value = type;
    open_pharma_manual_posting.value = true;
}

const closeManualPosting = () => {
    open_pharma_manual_posting.value = false;
    patient_type.value = 0;
}

const fetchAllCounts = async () => {
    await fetchOutPatientCount();
    await fetchERPatientCount();
    await fetchInPatientCount();
};

const handleOrderCarried = () => {
    medicine_request_data.value = medicine_request_data.value.filter(item => item.requestNum !== selected_item.value.requestNum);
    fetchAllCounts();
}

const openDateSelection = (itemId, subMenuId) => {
    menu_id.value = itemId;
    sub_menu_id.value = subMenuId;
    showSelectDate.value = true;
}

const closeDateSelection = () => {
    showSelectDate.value = false;
    selectedDate.value = new Date().toISOString().substr(0, 10);
    selectedMonth.value = new Date().toISOString().substr(0, 7);
}

const handleReportSubMenu = async () => { 
    // NOTE SINCE THIS THE GENERATION FOR CS DEPARTMENT AKOA GI STATIC ANG REVENUE ID
    let revenueID = "PH";
    if (menu_id.value && menu_id.value == 1) {
        switch (sub_menu_id.value) {
            case 1:
                const opd_daily_income_res = await useMethod("get", `daily-income-report?revenueID=${revenueID}&patient_Type=${sub_menu_id.value}&date=${selectedDate.value}`, "", "");
                    if (opd_daily_income_res) {
                        const blobUrl = URL.createObjectURL(opd_daily_income_res);
                        window.open(blobUrl, '_blank');
                    } 
                    break;
            case 2:
                const er_daily_income_res = await useMethod("get", `daily-income-report?revenueID=${revenueID}&patient_Type=${sub_menu_id.value}&date=${selectedDate.value}`, "", "");
                    if (er_daily_income_res) {
                        const blobUrl = URL.createObjectURL(er_daily_income_res);
                        window.open(blobUrl, '_blank');
                    } 
                    break;
            case 3:
                const ipd_daily_income_res = await useMethod("get", `daily-income-report?revenueID=${revenueID}&patient_Type=${sub_menu_id.value}&date=${selectedDate.value}`, "", "");
                    if (ipd_daily_income_res) {
                        const blobUrl = URL.createObjectURL(ipd_daily_income_res);
                        window.open(blobUrl, '_blank');
                    } 
                    break;
            default:
                break;
        }
    } else if (menu_id.value && menu_id.value == 2) {
        switch (sub_menu_id.value) {
            case 1:
                const opd_daily_income_res = await useMethod("get", `monthly-income-report?revenueID=${revenueID}&patient_Type=${sub_menu_id.value}&month=${selectedMonth.value}`, "", "");
                    if (opd_daily_income_res) {
                        const blobUrl = URL.createObjectURL(opd_daily_income_res);
                        window.open(blobUrl, '_blank');
                    } 
                    break;
            case 2:
                const er_daily_income_res = await useMethod("get", `monthly-income-report?revenueID=${revenueID}&patient_Type=${sub_menu_id.value}&month=${selectedMonth.value}`, "", "");
                    if (er_daily_income_res) {
                        const blobUrl = URL.createObjectURL(er_daily_income_res);
                        window.open(blobUrl, '_blank');
                    } 
                    break;
            case 3:
                const ipd_daily_income_res = await useMethod("get", `monthly-income-report?revenueID=${revenueID}&patient_Type=${sub_menu_id.value}&month=${selectedMonth.value}`, "", "");
                    if (ipd_daily_income_res) {
                        const blobUrl = URL.createObjectURL(ipd_daily_income_res);
                        window.open(blobUrl, '_blank');
                    } 
                    break;
            default:
                break;
        }
    }
};

const printUnitDesoReport = async (subMenuId) => {
    const response = await useMethod("get", `pharmacy-unit-dose-report?patient_Type=${subMenuId}`, "", "");
    if (response) {
        const blobUrl = URL.createObjectURL(response);
        window.open(blobUrl, '_blank');
    }
}

onMounted(async() => {
    const intervalId = setInterval(fetchAllCounts, 5000);
    onBeforeUnmount(() => {
        clearInterval(intervalId);
    });
});
</script>

<style>
.hoverable-list-item {
    transition: background-color 0.2s ease;
}
.hoverable-list-item:hover {
    background-color: #f5f5f5; 
    color: #1976D2; 
}
.blinking {
    animation: blink 1.25s infinite;
}
.red-background {
    background-color: red;
    color: white; 
}
@keyframes blink {
    0%, 100% { opacity: 1; }
    50% { opacity: 0; }
}
.notification-count {
    margin-left: 5px;
    color: white; 
    font-weight: bolder;
    font-size: larger;
}

</style>
