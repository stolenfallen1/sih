<template>
    <v-card class="mb-2" elevation="4">
        <v-card-actions>
            <div style="display: flex; justify-content: center; align-items: center;">
                <p style="font-weight: bolder; color: #228B22; font-size: larger; margin-right: 10px;">Pending Requests</p>
                <v-btn style="border: 1px solid #000;" @click="handleOutPatientRequest()">Out-Patient</v-btn>
                <v-btn style="border: 1px solid #000;" @click="handleEmergencyRequest()">Emergency</v-btn>
                <v-btn style="border: 1px solid #000;" @click="handleInPatientRequest()">In-Patient</v-btn>
            </div>
            <v-spacer></v-spacer>
            <v-btn prepend-icon="mdi-pill-off" class="bg-error text-white">
                Returned Medicines
                <v-menu activator="parent" open-on-hover>
                    <v-list>
                        <v-list-item
                            v-for="(item, index) in menuCodes"
                            :key="index"
                            :value="index"
                            class="hoverable-list-item"
                        >
                            <v-list-item-title>{{ item.description }}</v-list-item-title>
                        </v-list-item>
                    </v-list>
                </v-menu>
            </v-btn>
            <v-btn prepend-icon="mdi-file-document-edit-outline" class="bg-success text-white">
                Correction Entry
                <v-menu activator="parent" open-on-hover>
                    <v-list>
                        <v-list-item
                            v-for="(item, index) in menuCodes"
                            :key="index"
                            :value="index"
                            class="hoverable-list-item"
                        >
                            <v-list-item-title>{{ item.description }}</v-list-item-title>
                        </v-list-item>
                    </v-list>
                </v-menu>
            </v-btn>
            <v-btn prepend-icon="mdi-medication-outline" class="bg-primary text-white">
                Posted Medicines
                <v-menu activator="parent" open-on-hover>
                    <v-list>
                        <v-list-item
                            v-for="(item, index) in menuCodes"
                            :key="index"
                            :value="index"
                            class="hoverable-list-item"
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
    <Snackbar />
</template>

<script setup>
definePageMeta({
    layout: "root-layout",
});

const menuCodes = ref([
    { id: 1, description: "OPD - Out-Patient", code: 2 }, // Codes here are msc_Account_Trans_Types
    { id: 2, description: "ER - Emergency", code: 5 }, // Codes here are msc_Account_Trans_Types
    { id: 3, description: "IPD - In-Patient", code: 6 }, // Codes here are msc_Account_Trans_Types
]); 

const handleOutPatientRequest = async () => {

}

const handleEmergencyRequest = async () => {

}

const handleInPatientRequest = async () => {

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
