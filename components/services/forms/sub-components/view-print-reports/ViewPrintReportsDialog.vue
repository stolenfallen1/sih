<template>
    <v-dialog :model-value="show" rounded="lg" scrollable @update:model-value="closeDialog" max-width="600px">
        <form @submit.prevent="onSubmit">        
            <v-card rounded="lg">
                <v-toolbar density="compact" color="#6984ff" hide-details>
                    <v-toolbar-title>View Print Registry Reports {{ selectedRowDetails.id }}</v-toolbar-title>
                    <v-btn color="white" @click="closeDialog">
                        <v-icon>mdi-close</v-icon>
                    </v-btn>
                </v-toolbar>
                <v-divider></v-divider>
                <v-card-text>
                    <v-row>
                        <v-col cols="6">
                            <v-text-field
                                label="Patient Name"
                                v-model="payload.find(item => item.patient_name).patient_name"
                                variant="outlined"
                                density="compact"
                                hide-details
                                readonly
                            ></v-text-field>
                        </v-col>
                        <v-col cols="6">
                            <v-text-field
                                label="Patient ID"
                                v-model="selectedRowDetails.id"
                                variant="outlined"
                                density="compact"
                                hide-details
                                readonly
                            ></v-text-field>
                        </v-col>
                        <v-col cols="4">
                            <v-text-field
                                label="Registry Type"
                                v-model="payload.find(item => item.registry_case_type).registry_case_type"
                                variant="outlined"
                                density="compact"
                                hide-details
                                readonly
                            ></v-text-field>
                        </v-col>
                        <v-col cols="4">
                            <v-text-field
                                label="Outpatient Case No."
                                v-model="payload.find(item => item.outpatient_case_no).outpatient_case_no"
                                variant="outlined"
                                density="compact"
                                hide-details
                                readonly
                            ></v-text-field>
                        </v-col>
                        <v-col cols="4">
                            <v-text-field
                                type="date"
                                label="Case Date"
                                v-model="payload.find(item => item.outpatient_date).outpatient_date"
                                variant="outlined"
                                density="compact"
                                hide-details
                                readonly
                            ></v-text-field>
                        </v-col>
                    </v-row>
                    <v-card elevation="4" class="mt-4">
                        <v-toolbar density="compact" hide-details>
                            <v-toolbar-title class="toolbar-title">Report Details List</v-toolbar-title>
                        </v-toolbar>
                        <v-card-text>
                            <v-radio-group>
                                <div style="display: flex;">
                                    <v-radio label="Data Sheet" value="0"></v-radio>
                                    <v-autocomplete placeholder="Select Data Sheet" variant="outlined" density="compact" hide-details></v-autocomplete>
                                </div>
                                <v-radio label="Miscellaneous Slip" value="1"></v-radio>
                                <v-radio label="Room Transfer Fee Slip" value="2"></v-radio>
                                <v-radio label="Admission Card" value="3"></v-radio>
                                <v-radio label="Letter of Consent" value="4"></v-radio>
                                <v-radio label="Letter of Consent for Operation" value="5"></v-radio>
                                <v-radio label="Regular Admission Slip" value="6"></v-radio>
                                <v-radio label="Emergency Case Slip" value="7"></v-radio>
                                <v-radio label="Discharge Instruction Form" value="8"></v-radio>
                                <v-radio label="Discharge / Clearance Notice" value="9"></v-radio>
                            </v-radio-group>
                        </v-card-text>
                    </v-card>
                </v-card-text>
                <v-divider></v-divider>
                <v-card-actions>
                    <v-btn color="blue-darken-1 border border-info" @click="closeDialog"> Close </v-btn>
                    <v-spacer></v-spacer>
                    <v-btn class="bg-info text-white" type="submit">Preview</v-btn>
                    <v-btn class="bg-primary text-white" type="submit">Print</v-btn>
                </v-card-actions>
            </v-card>
        </form>
    </v-dialog>
</template>

<script setup>
const props = defineProps({
    show: {
        type: Boolean,
        default: () => false,
        required: true,
    },
});

const { selectedRowDetails } = storeToRefs(useSubcomponentSelectedRowDetailsStore()); 

const payload = ref([
    {
        patient_name: 'John Doe',
    },
    {
        registry_case_type: 'Outpatient',
    },
    {
        outpatient_case_no: '123',
    },
    {
        outpatient_date: '2024-04-15',
    },
]);

const onSubmit = () => {
    alert('Submit');
    emits('close-dialog');
}

const emits = defineEmits(['close-dialog'])

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
</style>