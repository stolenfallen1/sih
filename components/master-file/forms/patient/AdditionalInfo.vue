<template>
    <v-row>
        <v-col lg="12">
            <v-card elevation="2">
                <v-card-title>Other ID Information</v-card-title>
                <v-card-text>
                    <v-table density="compact">
                        <thead>
                            <tr>
                                <th v-for="(header, index) in idHeaders" :key="index">
                                    {{ header }}
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td v-for="(header, index) in idHeaders" :key="index">
                                    <template v-if="showIdTextFields">
                                        <v-text-field
                                            v-model="idFields[index]"
                                            type="text"
                                            density="compact"
                                            variant="outlined"
                                        ></v-text-field>
                                    </template>
                                </td>
                            </tr>
                        </tbody>
                    </v-table>
                </v-card-text>
                <v-card-actions>
                    <v-btn class="bg-primary text-white" type="submit" @click="addIdField">
                        {{ showIdTextFields ? 'Save' : 'Add' }}
                    </v-btn>
                    <v-btn class="bg-error text-white" type="submit" @click="deleteIdField" v-if="showIdTextFields">
                        Delete
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-col>
    </v-row>

    <v-row>
        <v-col lg="12">
            <v-card elevation="2">
                <v-card-title>Other Patient Information</v-card-title>
                <v-card-text>
                    <v-table density="compact">
                        <thead>
                            <tr>
                                <th v-for="(header, index) in patientHeaders" :key="index">
                                    {{ header }}
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td v-for="(header, index) in patientHeaders" :key="index">
                                    <template v-if="showPatientTextFields">
                                        <v-text-field
                                            v-model="patientFields[index]"
                                            type="text"
                                            density="compact"
                                            variant="outlined"
                                        ></v-text-field>
                                    </template>
                                </td>
                            </tr>
                        </tbody>
                    </v-table>
                </v-card-text>
                <v-card-actions>
                    <v-btn class="bg-primary text-white" type="submit" @click="addPatientField">
                        {{ showPatientTextFields ? 'Save' : 'Add' }}
                    </v-btn>
                    <v-btn class="bg-error text-white" type="submit" @click="deletePatientField" v-if="showPatientTextFields">
                        Delete
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-col>
    </v-row>
</template>

<script setup>
const idHeaders = ['ID Type', 'ID Number', 'Date Issue', 'Date Expiry', 'Serial Number', 'Authority'];
const patientHeaders = ['Description', 'Value'];

const showIdTextFields = ref(false);
const idFields = ref([]);

const showPatientTextFields = ref(false);
const patientFields = ref([]);

const addIdField = () => {
if (!showIdTextFields.value) {
    showIdTextFields.value = true;
    idFields.value = Array(idHeaders.length).fill('');
} else {
    // Save the data or perform any other action needed
    console.log('Saving ID Information:', idFields.value);
    showIdTextFields.value = false;
}
};

const deleteIdField = () => {
    showIdTextFields.value = false;
    idFields.value = [];
};

const addPatientField = () => {
    if (!showPatientTextFields.value) {
        showPatientTextFields.value = true;
        patientFields.value = Array(patientHeaders.length).fill('');
    } else {
        // Save the data or perform any other action needed
        console.log('Saving Patient Information:', patientFields.value);
        showPatientTextFields.value = false;
    }
};

const deletePatientField = () => {
    showPatientTextFields.value = false;
    patientFields.value = [];
};
</script>

<style scoped>
</style>
