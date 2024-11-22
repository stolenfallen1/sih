<template>
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

    <Snackbar />

    <CarrySuppliesOrder
        :open_carry_order_form="open_carry_order_form" 
        :patient_type="patient_type" 
        :item="selected_item"
        @ordered-carried="handleOrderCarried" 
        @close-dialog="closeCarryOrderForm" />

</template>

<script setup>
import CarrySuppliesOrder from './CarrySuppliesOrder.vue';

definePageMeta({
    layout: "root-layout",
});

const open_carry_order_form = ref(false);
const selected_item = ref([]);
const patient_type = ref(0);
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
        const response = await useMethod("get", "get-opd-ancillary-orders", "", "");
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
        const response = await useMethod("get", "get-er-ancillary-orders", "", "");
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
        const response = await useMethod("get", "get-ipd-ancillary-orders", "", "");
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

const fetchAllCounts = async () => {
    await fetchOutPatientCount();
    await fetchERPatientCount();
    await fetchInPatientCount();
};

const handleOrderCarried = () => {
    medicine_request_data.value = medicine_request_data.value.filter(item => item.requestNum !== selected_item.value.requestNum);
    fetchAllCounts();
}

const closeCarryOrderForm = () => {
    open_carry_order_form.value = false;
    selected_item.value = [];
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
