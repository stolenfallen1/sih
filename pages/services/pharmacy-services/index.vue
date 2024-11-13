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
                <v-menu activator="parent" open-on-hover>
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
                <v-menu activator="parent" open-on-hover>
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
                <v-menu activator="parent" open-on-hover>
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
            <v-btn
                prepend-icon="mdi-pill-multiple"
                class="bg-success text-white"
            >
            Manual Posting
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

    <CarryOrderForm 
        :open_carry_order_form="open_carry_order_form" 
        :patient_type="patient_type" :item="selected_item"
        @ordered-carried="handleOrderCarried" 
        @close-dialog="closeCarryOrderForm" />
    <PharmaPostedMedicines :open_posted_medicine="open_posted_medicine" :patient_type="patient_type" @close-dialog="closePostedMedicine" />
    <PharmaCorrectionEntry :open_correction_entry="open_correction_entry" :patient_type="patient_type" @close-dialog="closeCorrectionEntry" />
    <PharmaReturnedMedicines :open_returned_medicines="open_returned_medicines" :patient_type="patient_type" @close-dialog="closeReturnedMedicines" />
    <Snackbar />
</template>

<script setup>
import CarryOrderForm from './forms/CarryOrderForm.vue';
import PharmaPostedMedicines from './forms/PharmaPostedMedicines.vue';
import PharmaCorrectionEntry from './forms/PharmaCorrectionEntry.vue';
import PharmaReturnedMedicines from './forms/PharmaReturnedMedicines.vue';

definePageMeta({
    layout: "root-layout",
});

const open_carry_order_form = ref(false);
const open_posted_medicine = ref(false);
const open_correction_entry = ref(false);
const open_returned_medicines = ref(false);
const selected_item = ref([]);
const patient_type = ref(0);
const menuCodes = ref([
    { id: 1, description: "OPD - Out-Patient", code: 2 },
    { id: 2, description: "ER - Emergency", code: 5 },
    { id: 3, description: "IPD - In-Patient", code: 6 },
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
        const response = await useMethod("get", "get-opd-pharmacy-orders", "", "");
        if (response) {
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
    alert("Emergency Request");
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
        console.log(item);
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

const fetchAllCounts = async () => {
    await fetchOutPatientCount();
    await fetchERPatientCount();
    await fetchInPatientCount();
};

const handleOrderCarried = () => {
    medicine_request_data.value = medicine_request_data.value.filter(item => item.requestNum !== selected_item.value.requestNum);
    fetchAllCounts();
}

onMounted(() => {
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
