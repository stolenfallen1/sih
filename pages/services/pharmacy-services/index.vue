<template>
    <v-card class="mb-2 pt-2" elevation="4">
        <p style="font-weight: bolder; color: #228B22; font-size: larger; margin-bottom: 10px; text-align: center;">Pharmacy Services</p>
        <div style="display: flex; justify-content: center; align-items: center;">
            <v-btn style="border: 1px solid #000; margin-right: 5px;" @click="handleOutPatientRequest()">Out-Patient</v-btn>
            <v-btn style="border: 1px solid #000; margin-right: 5px;" @click="handleEmergencyRequest()">Emergency</v-btn>
            <v-btn style="border: 1px solid #000;" @click="handleInPatientRequest()">In-Patient</v-btn>
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
                prepend-icon="mdi-cash-check"
                class="bg-success text-white"
            >
            Assessment Entry
            </v-btn>
            <v-spacer></v-spacer>
        </v-card-actions>
    </v-card>
    <v-card class="mb-4" elevation="4">
        <v-table density="compact" height="75vh" class="styled-table">
            <thead>
                <tr>
                    <th>Patient ID</th>
                    <th>Case No</th>
                    <th>Patient Name</th> 
                    <th>Room</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td> </td>
                    <td> </td>
                    <td> </td>
                    <td> </td>
                </tr>
            </tbody>
        </v-table>
    </v-card>

    <PharmaPostedMedicines :open_posted_medicine="open_posted_medicine" :patient_type="patient_type" @close-dialog="closePostedMedicine" />
    <PharmaCorrectionEntry :open_correction_entry="open_correction_entry" :patient_type="patient_type" @close-dialog="closeCorrectionEntry" />
    <PharmaReturnedMedicines :open_returned_medicines="open_returned_medicines" :patient_type="patient_type" @close-dialog="closeReturnedMedicines" />
    <Snackbar />
</template>

<script setup>
import PharmaPostedMedicines from './forms/PharmaPostedMedicines.vue';
import PharmaCorrectionEntry from './forms/PharmaCorrectionEntry.vue';
import PharmaReturnedMedicines from './forms/PharmaReturnedMedicines.vue';

definePageMeta({
    layout: "root-layout",
});

const open_posted_medicine = ref(false);
const open_correction_entry = ref(false);
const open_returned_medicines = ref(false);
const patient_type = ref(0);
const menuCodes = ref([
    { id: 1, description: "OPD - Out-Patient", code: 2 }, // Codes here are msc_Account_Trans_Types
    { id: 3, description: "IPD - In-Patient", code: 6 }, // Codes here are msc_Account_Trans_Types
]); 

const handleOutPatientRequest = async () => {

}

const handleEmergencyRequest = async () => {

}

const handleInPatientRequest = async () => {

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


</script>

<style>
.hoverable-list-item {
    transition: background-color 0.2s ease;
}
.hoverable-list-item:hover {
    background-color: #f5f5f5; 
    color: #1976D2; 
}
</style>
