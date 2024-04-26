<template>
    <v-dialog :model-value="show" rounded="lg" scrollable @update:model-value="closeDialog" max-width="900px">
        <form @submit.prevent="onSubmit">
            <v-card>
                <v-toolbar density="compact" color="#6984ff" hide-details>
                    <v-toolbar-title>Discharge Instruction Form {{ selectedRowDetails.id }}</v-toolbar-title>
                    <v-btn color="white" @click="closeDialog">
                        <v-icon>mdi-close</v-icon>
                    </v-btn>
                </v-toolbar>
                <v-card-text>
                    <v-card elevation="4">
                        <v-toolbar density="compact" hide-details>
                            <v-toolbar-title class="toolbar-title">Report Details List</v-toolbar-title>
                        </v-toolbar>
                        <v-card-text>
                            <v-row>
                                <v-col cols="12">
                                    <v-table density="compact" height="40vh">
                                        <thead>
                                            <tr>
                                                <th>Medicines</th>
                                                <th>Method of Administration</th>
                                                <th>Morning</th>
                                                <th>Afternoon</th>
                                                <th>Evening</th>
                                                <th>Other Instructions</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <template>
                                                <tr class="cursor-pointer">
                                                    <!-- contents -->
                                                </tr>
                                            </template>
                                        </tbody>
                                        <v-divider></v-divider>
                                    </v-table>
                                </v-col>
                            </v-row>
                        </v-card-text>
                        <v-divider></v-divider>
                        <v-card-actions>
                            <v-btn color="blue-darken-1 border border-info" @click="addMedicines">
                                + <v-icon class="mr-2">mdi-pill</v-icon> Add Medicines
                            </v-btn>
                        </v-card-actions>
                    </v-card>
                    <v-card class="mt-4">
                        <v-card-text>
                            <v-list-subheader>Additional Instructions</v-list-subheader>
                            <v-row>
                                <v-col cols="6">
                                    <v-textarea 
                                        label="Diet"
                                        variant="outlined"
                                        v-model="payload.diet"
                                        density="compact"
                                        hide-details
                                    ></v-textarea>
                                </v-col>
                                <v-col cols="6">
                                    <v-textarea 
                                        label="General Remiders"
                                        variant="outlined"
                                        v-model="payload.general_reminders"
                                        density="compact"
                                        hide-details
                                    ></v-textarea>
                                </v-col>
                                <v-col cols="12" class="form-col">
                                    <v-textarea 
                                        label="Diagnostic procedure(s) and/or Laboratory test(s) to prepare for"
                                        variant="outlined"
                                        v-model="payload.diagnostic_procedure"
                                        density="compact"
                                        hide-details
                                    ></v-textarea>
                                </v-col>
                                <v-col cols="12" class="form-col">
                                    <v-textarea 
                                        label="Activities and related instructions"
                                        variant="outlined"
                                        v-model="payload.activities"
                                        density="compact"
                                        hide-details
                                    ></v-textarea>
                                </v-col>
                            </v-row>
                        </v-card-text>
                    </v-card>
                    <v-row class="mt-2" style="display: flex; justify-content: center;">
                        <v-list-subheader>Pharmacist on duty: </v-list-subheader>
                        <v-col cols="3">
                            <v-text-field 
                                label="Checked by"
                                variant="outlined"
                                v-model="payload.checked_by_pharmacist_on_duty"
                                density="compact"
                                hide-details
                            ></v-text-field>
                        </v-col>
                        <v-list-subheader>Time of checking: </v-list-subheader>
                        <v-col cols="3">
                            <v-text-field 
                                label="Checktime"
                                variant="outlined"
                                v-model="payload.checktime"
                                density="compact"
                                hide-details
                            ></v-text-field>
                        </v-col>
                    </v-row>
                </v-card-text>
                <v-card-actions>
                    <v-btn color="blue-darken-1 border border-info" @click="closeDialog"> Close </v-btn>
                    <v-spacer></v-spacer>
                    <v-btn class="bg-info text-white" type="submit">Preview</v-btn>
                    <v-btn class="bg-info text-white" type="submit">Print</v-btn>
                    <v-btn class="bg-primary text-white" type="submit">Save</v-btn>
                </v-card-actions>
            </v-card>
        </form>
    </v-dialog>
    <OpdAddDischargeMedicine :open_add_medicines="open_add_medicines" @close-dialog="closeAddMedicines" @handle-submit="handleSelectMedicine" />
</template>

<script setup>
import OpdAddDischargeMedicine from "./sub-forms/OpdAddDischargeMedicine.vue";

const props = defineProps({
    show: {
        type: Boolean,
        default: () => false,
        required: true,
    },
});

const payload = ref({});
const open_add_medicines = ref(false);

const { selectedRowDetails } = storeToRefs(useSubcomponentSelectedRowDetailsStore()); 

const emits = defineEmits(['close-dialog'])

const addMedicines = () => {
    open_add_medicines.value = true;
}
const handleSelectMedicine = () => {
    alert("Medicine selected");
    open_add_medicines.value = false;
}
const closeAddMedicines = () => {
    open_add_medicines.value = false;
}

const onSubmit = () => {
    alert("Submit");
}

const closeDialog = () => {
    emits('close-dialog');
}
</script>

<style scoped>
.toolbar-title {
    font-size: 16px; 
    font-style: italic; 
    text-align: center;
}
.form-col {
    margin-top: -16px !important;
}
</style>