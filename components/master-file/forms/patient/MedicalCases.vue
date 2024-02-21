<template>
    <v-row>
        <v-col lg="12">
            <v-card elevation="2">
                <v-card-title class="text-center">Dispensary Registration History</v-card-title>
                <v-card-text>
                    <v-table density="compact">
                        <thead>
                            <tr>
                                <th v-for="(header, index) in dispensaryHeader" :key="index" >
                                    {{ header }}
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td v-for="(header, index) in dispensaryHeader" :key="index">
                                    <template v-if="showDispensaryTextFields">
                                        <v-text-field
                                            v-model="dispensaryFields[index]"
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
                    <v-btn class="bg-primary text-white" type="submit" @click="addDispensaryField">
                        {{ showDispensaryTextFields ? 'Save' : 'Add' }}
                    </v-btn>
                    <v-btn class="bg-error text-white" type="submit" @click="deleteDispensaryField" v-if="showDispensaryTextFields">
                        Delete
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-col>
        <v-col lg="12">
            <v-card elevation="2">
                <v-card-title class="text-center">Medical Cases</v-card-title>
                <v-card-text>
                    <v-table density="compact">
                        <thead>
                            <tr>
                                <th>Description</th>
                                <th>Notes</th>
                            </tr>
                        </thead>
                    </v-table>
                </v-card-text>
                <v-card-actions>
                    <v-btn class="bg-primary text-white" type="submit" @click="openTemplateDialog">
                        Add
                    </v-btn>
                    <v-btn class="bg-error text-white" type="submit">
                        Delete
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-col>
    </v-row>
    <creation-template :template_dialog="template_dialog" @close-dialog="closeTemplateDialog" />
</template>

<script setup>
import CreationTemplate from "./sub-forms/CreationTemplate.vue";

const dispensaryHeader = ['ICD10 Description', 'Hospital / Clinic Name', 'Registration Date', 'Discharge Date']

const showDispensaryTextFields = ref(false)
const dispensaryFields = ref([])

const template_dialog = ref(false)

const addDispensaryField = () => {
    if (!showDispensaryTextFields.value) {
        showDispensaryTextFields.value = true;
        dispensaryFields.value = Array(dispensaryHeader.length).fill('');
    } else {
        // Save the data or perform any other action needed
        console.log('Saving Patient Information:', dispensaryFields.value);
        showDispensaryTextFields.value = false;
    }
};
const deleteDispensaryField = () => {
    showDispensaryTextFields.value = false;
    dispensaryFields.value = [];
};

const openTemplateDialog = () => {
    template_dialog.value = true;
};

const closeTemplateDialog = () => {
    template_dialog.value = false;
};
</script>

<style scoped>

</style>