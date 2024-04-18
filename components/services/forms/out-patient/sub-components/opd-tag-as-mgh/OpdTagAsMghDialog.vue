<template>
    <v-dialog :model-value="show" rounded="lg" scrollable @update:model-value="closeDialog" max-width="800px">
        <form @submit.prevent="onSubmit">
            <v-card rounded="lg">
                <v-toolbar density="compact" color="#6984ff" hide-details>
                    <v-toolbar-title>Outpatient Case May Go Home Tagging {{ selectedRowDetails.id }}</v-toolbar-title>
                    <v-btn color="white" @click="closeDialog">
                        <v-icon>mdi-close</v-icon>
                    </v-btn>
                </v-toolbar>
                <v-card-text>
                    <v-row>
                        <v-col cols="3">
                            <v-text-field
                                label="MGH Queue No."
                                v-model="payload.find(item => item.mgh_queue_no).mgh_queue_no"
                                variant="outlined"
                                density="compact"
                                hide-details
                                readonly
                            ></v-text-field>
                        </v-col>
                        <v-col cols="3">
                            <v-text-field
                                label="Registry Track No."
                                v-model="payload.find(item => item.registry_case_no).registry_case_no"
                                variant="outlined"
                                density="compact"
                                hide-details
                                readonly
                            ></v-text-field>
                        </v-col>
                        <v-col cols="3">
                            <v-text-field
                                label="Outpatient Case No."
                                v-model="payload.find(item => item.outpatient_case_no).outpatient_case_no"
                                variant="outlined"
                                density="compact"
                                hide-details
                                readonly
                            ></v-text-field>
                        </v-col>
                        <v-col cols="3">
                            <v-text-field
                                type="date"
                                label="Outpatient Case DateTime"
                                v-model="payload.find(item => item.outpatient_date).outpatient_date"
                                variant="outlined"
                                density="compact"
                                hide-details
                                readonly
                            ></v-text-field>
                        </v-col>
                        <v-col cols="4">
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
                                label="Patient Name"
                                v-model="payload.find(item => item.patient_name).patient_name"
                                variant="outlined"
                                density="compact"
                                hide-details
                                readonly
                            ></v-text-field>
                        </v-col>
                        <v-col cols="4">
                            <v-autocomplete
                                label="Disposition"
                                v-model="payload.disposition"
                                variant="outlined"
                                density="compact"
                                hide-details
                            ></v-autocomplete>
                        </v-col>
                        <v-col cols="12">
                            <v-autocomplete
                                label="Referred to"
                                v-model="payload.referred_to"
                                variant="outlined"
                                density="compact"
                                readonly
                                hide-details
                            ></v-autocomplete>
                        </v-col>
                        <v-col cols="6">
                            <v-text-field
                                class="cursor-pointer"
                                label="Referred HCI / Code"
                                v-model="payload.referred_hci_code"
                                variant="outlined"
                                density="compact"
                                readonly
                                hide-details
                                prepend-icon="mdi-plus-box"         
                            ></v-text-field>
                        </v-col>
                        <v-col cols="6">
                            <v-text-field
                                class="cursor-pointer"
                                label="Referred HCI Address"
                                v-model="payload.referred_hci_address"
                                variant="outlined"
                                density="compact"
                                readonly
                                hide-details
                                prepend-icon="mdi-plus-box"
                            ></v-text-field>
                        </v-col>
                        <v-col cols="12">
                            <v-textarea
                                label="Referreal Reason"
                                v-model="payload.referreal_reason"
                                variant="outlined"
                                density="compact"
                                hide-details
                                readonly
                            ></v-textarea>
                        </v-col>
                        <v-col cols="12">
                            <v-text-field
                                label="Causes of Referral"
                                v-model="payload.causes_of_referral"
                                variant="outlined"
                                density="compact"
                                hide-details
                                readonly
                            ></v-text-field>
                        </v-col>
                        <v-col cols="12">
                            <v-autocomplete
                                label="Outpatient Result"
                                variant="outlined"
                                density="compact"
                                :items="outpatient_result"
                                v-model="payload.outpatient_result"
                                clearable
                                hide-details
                            ></v-autocomplete>
                        </v-col>
                        <v-col cols="12">
                            <v-card elevation="4">
                                <v-card-text>
                                    <v-list-subheader>Para Legal Indicators</v-list-subheader>
                                    <v-checkbox label="Expired / Died in less than 48 hours upon admission" density="compact" hide-details :readonly="payload.outpatient_result !== 'Dead'" ></v-checkbox>
                                    <v-checkbox label="Autopsy procedure is done?" density="compact" hide-details :readonly="payload.outpatient_result !== 'Dead'" ></v-checkbox>
                                </v-card-text>
                            </v-card>
                        </v-col>
                        <v-col cols="6">
                            <v-text-field
                                type="date"
                                label="Died Date Time"
                                variant="outlined"
                                density="compact"
                                :readonly="payload.outpatient_result !== 'Dead'"
                                hide-details
                            ></v-text-field>
                        </v-col>
                        <v-col cols="6">
                            <v-autocomplete
                                label="Type of Death"
                                variant="outlined"
                                density="compact"
                                :readonly="payload.outpatient_result !== 'Dead'"
                                hide-details
                            ></v-autocomplete>
                        </v-col>
                        <v-col cols="12">
                            <v-textarea
                                label="Initial Impression"
                                v-model="payload.initial_impression"
                                variant="outlined"
                                density="compact"
                                hide-details
                                readonly
                            ></v-textarea>
                        </v-col>
                        <v-col cols="12">
                            <v-autocomplete
                                label="Patient Status"
                                v-model="payload.patient_status"
                                variant="outlined"
                                density="compact"
                                hide-details
                            ></v-autocomplete>
                        </v-col>
                        <v-col cols="12">
                            <v-textarea
                                label="Discharge Diagnosis"
                                v-model="payload.discharge_diagnosis"
                                variant="outlined"
                                density="compact"
                                hide-details
                                readonly
                            ></v-textarea>
                        </v-col>
                    </v-row>
                </v-card-text>
                <v-divider></v-divider>
                <v-card-actions>
                    <v-btn color="blue-darken-1 border border-info" @click="closeDialog"> Close </v-btn>
                    <v-spacer></v-spacer>
                    <v-btn class="bg-primary text-white" type="submit">Save</v-btn>
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

const emits = defineEmits(['close-dialog']);

const { selectedRowDetails } = storeToRefs(useSubcomponentSelectedRowDetailsStore()); 

const outpatient_result = ref(['Improved', 'Dead', 'Stable', 'Diagnosis Only']);

const payload = ref([
    {
        mgh_queue_no: '123',
    },
    {
        registry_case_no: '456',
    },
    {
        outpatient_case_no: '999',
    },
    {
        outpatient_date: '2024-04-15',
    },
    {
        patient_name: 'John Doe',
    },
]);

const closeDialog = () => {
    emits('close-dialog');
}

const onSubmit = () => {
    alert('Outpatient may go home!, Bye biaaatch');
    emits('close-dialog');
}

</script>

<style scoped>
</style>