<template>
    <v-dialog :model-value="show" rounded="lg" scrollable @update:model-value="closeDialog" max-width="750px">
        <form @submit.prevent="onSubmit">
            <v-card rounded="lg">
                <v-toolbar density="compact" color="#6984ff" hide-details>
                    <v-toolbar-title>Discharge Registry Account {{ selectedRowDetails.id }}</v-toolbar-title>
                    <v-btn color="white" @click="closeDialog">
                        <v-icon>mdi-close</v-icon>
                    </v-btn>
                </v-toolbar>
                <v-divider></v-divider>
                <v-card-text>
                    <v-card elevation="4">
                        <v-toolbar density="compact" hide-details>
                            <v-toolbar-title class="toolbar-title">Patient Account Information</v-toolbar-title>
                        </v-toolbar>
                        <v-card-text>
                            <v-row>
                                <v-col cols="12">
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
                                <v-col cols="6">
                                    <v-text-field 
                                        label="Outpatient No." 
                                        v-model="payload.find(item => item.outpatient_case_no).outpatient_case_no"
                                        variant="outlined" 
                                        density="compact" 
                                        hide-details 
                                        readonly
                                    ></v-text-field>
                                </v-col>
                                <v-col cols="4">
                                    <v-text-field 
                                        label="Registry Case Type" 
                                        v-model="payload.find(item => item.registry_case_type).registry_case_type"
                                        variant="outlined" 
                                        density="compact" 
                                        hide-details 
                                        readonly
                                    ></v-text-field>
                                </v-col>
                                <v-col cols="4">
                                    <v-text-field 
                                        type="date"
                                        label="Outpatient Date" 
                                        v-model="payload.find(item => item.outpatient_date).outpatient_date"
                                        variant="outlined" 
                                        density="compact" 
                                        hide-details 
                                        readonly
                                    ></v-text-field>
                                </v-col>
                                <v-col cols="4">
                                    <v-text-field
                                        label="Account Balance" 
                                        v-model="payload.find(item => item.account_balance).account_balance"
                                        variant="outlined" 
                                        density="compact" 
                                        hide-details 
                                        readonly
                                    ></v-text-field>
                                </v-col>
                            </v-row>
                        </v-card-text>
                    </v-card>
                    <v-card elevation="4">
                        <v-toolbar density="compact" hide-details>
                            <v-toolbar-title class="toolbar-title">Discharge Diagnosis</v-toolbar-title>
                        </v-toolbar>
                        <v-card-text>
                            <v-row>
                                <v-col cols="12">
                                    <v-textarea
                                        label="Discharge Diagnosis"
                                        variant="outlined" 
                                        density="compact" 
                                        hide-details
                                    ></v-textarea>
                                </v-col>
                            </v-row>
                        </v-card-text>
                    </v-card>
                    <v-card elevation="4">
                        <v-toolbar density="compact" hide-details>
                            <v-toolbar-title class="toolbar-title">Secondary Discharge Diagnosis</v-toolbar-title>
                        </v-toolbar>
                        <v-card-text>
                            <v-row>
                                <v-col cols="12">
                                    <v-textarea
                                        label="Secondary Discharge Diagnosis"
                                        variant="outlined" 
                                        density="compact" 
                                        hide-details
                                    ></v-textarea>
                                </v-col>
                            </v-row>
                        </v-card-text>
                    </v-card>
                    <v-card elevation="4">
                        <v-toolbar density="compact" hide-details>
                            <v-toolbar-title class="toolbar-title">Discharge Remarks</v-toolbar-title>
                        </v-toolbar>
                        <v-card-text>
                            <v-row>
                                <v-col cols="12">
                                    <v-textarea
                                        label="Discharge Remarks"
                                        variant="outlined" 
                                        density="compact" 
                                        hide-details
                                    ></v-textarea>
                                </v-col>
                            </v-row>
                        </v-card-text>
                    </v-card>
                </v-card-text>
                <v-divider></v-divider>
                <v-card-actions>
                    <v-btn color="blue-darken-1 border border-info" @click="closeDialog"> Close </v-btn>
                    <v-spacer></v-spacer>
                    <v-btn class="bg-primary text-white" type="submit">Select</v-btn>
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
    {
        account_balance: '00.00',
    },
]);

const onSubmit = () => {
    alert("Test!");
    emits('closeDialog');
};

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