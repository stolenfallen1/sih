<template>
    <v-dialog :model-value="show" rounded="lg" scrollable @update:model-value="closeDialog" max-width="800px">
        <form @submit.prevent="onSubmit">
            <v-card rounded="lg">
                <v-toolbar density="compact" color="#6984ff" hide-details>
                    <v-toolbar-title>
                        {{ form_type === 'outpatient' ? 'Outpatient Case May Go Home Tagging' : (form_type === 'emergency' ? 'Emergency Case May Go Home Tagging' : 'Inpatient Case May Go Home Tagging') }} {{ selectedRowDetails.id }}
                    </v-toolbar-title>
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
                                :label="form_type === 'outpatient' ? 'Outpatient Case No.' : (form_type === 'emergency' ? 'ER Case No.' : 'Admission No.')"
                                v-model="payload.find(item => item.case_no).case_no"
                                variant="outlined"
                                density="compact"
                                hide-details
                                readonly
                            ></v-text-field>
                        </v-col>
                        <v-col cols="3">
                            <v-text-field
                                type="date"
                                :label="form_type === 'outpatient' ? 'Outpatient Date' : (form_type === 'emergency' ? 'ER Case Date' : 'Admission Date')"
                                v-model="payload.find(item => item.case_date).case_date"
                                variant="outlined"
                                density="compact"
                                hide-details
                                readonly
                            ></v-text-field>
                        </v-col>
                        <v-col :cols="form_type === 'inpatient' ? 3 : 4" class="form-col">
                            <v-text-field
                                label="Patient ID"
                                v-model="selectedRowDetails.id"
                                variant="outlined"
                                density="compact"
                                hide-details
                                readonly
                            ></v-text-field>
                        </v-col>
                        <v-col :cols="form_type === 'inpatient' ? 3 : 4" class="form-col">
                            <v-text-field
                                label="Patient Name"
                                v-model="payload.find(item => item.patient_name).patient_name"
                                variant="outlined"
                                density="compact"
                                hide-details
                                readonly
                            ></v-text-field>
                        </v-col>
                        <v-col :cols="form_type === 'inpatient' ? 3 : 4" class="form-col">
                            <v-autocomplete
                                label="Disposition"
                                v-model="payload.disposition"
                                variant="outlined"
                                density="compact"
                                hide-details
                            ></v-autocomplete>
                        </v-col>
                        <v-col v-if="form_type === 'inpatient'" cols="3" class="form-col">
                            <v-text-field
                                label="Room No."
                                variant="outlined"
                                density="compact"
                                hide-details
                                readonly
                            ></v-text-field>
                        </v-col>
                        <v-col cols="12" class="form-col" v-if="form_type === 'outpatient' || form_type === 'inpatient'">
                            <v-autocomplete
                                label="Referred to"
                                v-model="payload.referred_to"
                                variant="outlined"
                                density="compact"
                                readonly
                                hide-details
                            ></v-autocomplete>
                        </v-col>
                        <v-col cols="6" class="form-col" v-if="form_type === 'outpatient' || form_type === 'inpatient'">
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
                        <v-col cols="6" class="form-col" v-if="form_type === 'outpatient' || form_type === 'inpatient'">
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
                        <v-col cols="12" class="form-col" v-if="form_type === 'outpatient' || form_type === 'inpatient'">
                            <v-textarea
                                label="Referreal Reason"
                                v-model="payload.referreal_reason"
                                variant="outlined"
                                density="compact"
                                hide-details
                                readonly
                            ></v-textarea>
                        </v-col>
                        <v-col cols="12" class="form-col" v-if="form_type === 'outpatient' || form_type === 'inpatient'">
                            <v-text-field
                                label="Causes of Referral"
                                v-model="payload.causes_of_referral"
                                variant="outlined"
                                density="compact"
                                hide-details
                                readonly
                            ></v-text-field>
                        </v-col>
                        <v-col cols="12" class="form-col">
                            <v-autocomplete
                                :label="form_type === 'outpatient' ? 'Outpatient Result' : (form_type === 'emergency' ? 'ER Result' : 'Admission Result')"
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
                        <v-col cols="6" class="form-col" v-if="form_type === 'inpatient'">
                            <v-autocomplete
                                label="Type of Delivery"
                                variant="outlined"
                                density="compact"
                                readonly
                                hide-details
                            ></v-autocomplete>
                        </v-col>
                        <v-col cols="6" class="form-col" v-if="form_type === 'inpatient'">
                            <v-autocomplete
                                label="Indication for CS"
                                variant="outlined"
                                density="compact"
                                readonly
                                hide-details
                            ></v-autocomplete>
                        </v-col>
                        <v-col cols="12" class="form-col">
                            <v-textarea
                                label="Initial Impression"
                                v-model="payload.initial_impression"
                                variant="outlined"
                                density="compact"
                                hide-details
                                readonly
                            ></v-textarea>
                        </v-col>
                        <v-col cols="12" class="form-col">
                            <v-autocomplete
                                label="Patient Status"
                                v-model="payload.patient_status"
                                variant="outlined"
                                density="compact"
                                hide-details
                            ></v-autocomplete>
                        </v-col>
                        <v-col cols="12" class="form-col">
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
    form_type: {
        type: String,
        default: () => '',
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
        case_no: '999',
    },
    {
        case_date: '2024-04-15',
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
.form-col {
    margin-top: -16px !important;
}
</style>