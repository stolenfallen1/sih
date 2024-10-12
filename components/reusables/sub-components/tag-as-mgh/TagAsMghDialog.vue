<template>
    <v-dialog :model-value="show" rounded="lg" scrollable @update:model-value="closeDialog" max-width="800px">
        <form @submit.prevent="openConfirmDialog">
            <v-card rounded="lg">
                <v-toolbar density="compact" color="#107bac" hide-details>
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
                                v-model="payload.mgh_queue_no"
                                :value="0"
                                variant="outlined"
                                density="compact"
                                hide-details
                                readonly
                            ></v-text-field>
                        </v-col>
                        <v-col cols="3">
                            <v-text-field
                                label="Registry Track No."
                                v-model="payload.er_Case_No"
                                variant="outlined"
                                density="compact"
                                hide-details
                                readonly
                            ></v-text-field>
                        </v-col>
                        <v-col cols="3">
                            <v-text-field
                                :label="form_type === 'outpatient' ? 'Outpatient Case No.' : (form_type === 'emergency' ? 'ER Case No.' : 'Admission No.')"
                                v-model="payload.case_No"
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
                                v-model="payload.registry_Date"
                                variant="outlined"
                                density="compact"
                                hide-details
                                readonly
                            ></v-text-field>
                        </v-col>
                        <v-col :cols="form_type === 'inpatient' ? 3 : 4" class="form-col">
                            <v-text-field
                                label="Patient ID"
                                v-model="payload.patient_Id"
                                variant="outlined"
                                density="compact"
                                hide-details
                                readonly
                            ></v-text-field>
                        </v-col>
                        <v-col :cols="form_type === 'inpatient' ? 3 : 4" class="form-col">
                            <v-text-field
                                label="Patient Name"
                                v-model="payload.name"
                                variant="outlined"
                                density="compact"
                                hide-details
                                readonly
                            ></v-text-field>
                        </v-col>
                        <v-col :cols="form_type === 'inpatient' ? 3 : 4" class="form-col">
                            <v-autocomplete
                                label="Disposition"
                                v-model="payload.mscDisposition_Id"
                                :items="disposition_data"
                                item-title="description"
                                item-value="id"
                                :readonly="clicked_option === 'view'"
                                :clearable="clicked_option === 'new' || clicked_option === 'edit'"
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
                                :items="erResult_data"
                                item-title="description"
                                item-value="id"
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
                        <v-col v-if="parseInt(payload.mscDisposition_Id) === 7 || payload.outpatient_result === 'Dead'" cols="6">
                            <v-text-field
                                type="date"
                                label="Died Date Time"
                                variant="outlined"
                                density="compact"
                                hide-details
                            ></v-text-field>
                        </v-col>
                        <v-col v-if="parseInt(payload.mscDisposition_Id) === 7 || payload.outpatient_result === 'Dead'" cols="6">
                            <v-autocomplete
                                label="Type of Death"
                                variant="outlined"
                                density="compact"
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

    <Confirmation 
        :show="showDialog"
        :payload="payload"
        :loading="isLoading"
        @submit="onSubmit"
        @close="closeConfirmDialog"
    />
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

const showDialog = ref(false);
const isLoading = ref(false);

const openConfirmDialog = async () => {
    showDialog.value = true;
}
const closeConfirmDialog = () => {
        showDialog.value = false;
    }


const disposition_data = ref([]);
const disposition_loading = ref(false);
const getDisposition = async () => {
    disposition_loading.value = true;
    const response = await useMethod("get", "disposition", "", "");
    if (response) {
        disposition_data.value = response;
        disposition_loading.value = false;
    } 
};

const erResult_data = ref([]);
const erResult_loading = ref(false);
const getErResult = async () => {
    erResult_loading.value = true;
    try {
        const response = await useMethod("get", "get-er-result", "", "");
        if(response) {
            erResult_data.value = response;
            erResult_loading.value = false;
        }

    } catch(error) {
        useSnackbar(true, "red", response.message || 'Failed to fetch er result');
        erResult_loading.value.false;
    }
}

const emits = defineEmits(['close-dialog']);
const { selectedRowDetails } = storeToRefs(useSubcomponentSelectedRowDetailsStore()); 

const payload = ref([
    {
        mgh_queue_no: 0,
    }
]);

const closeDialog = () => {
    emits('close-dialog');
}

const onSubmit = async () => {
    let response;
    isLoading.value = true;
    try{
        response = await useMethod("put", "tag-patient-maygohome", payload.value, "", payload.value.case_No);
        if(response) {
            useSnackbar(true, "green", response.message);
            isLoading.value = false;
            closeConfirmDialog();
        }
    } catch(error) {    
        useSnackbar(true, "red", response.message || 'Tagged Failed');
        closeConfirmDialog();
    }
}

onMounted(() => {
    getDisposition();
    getErResult();
})

onUpdated(() => {
    if (selectedRowDetails.value && selectedRowDetails.value.id) {
        if (payload.value.id !== selectedRowDetails.value.id) { 
            payload.value                 = Object.assign({}, selectedRowDetails.value);
            payload.value.name            = (selectedRowDetails.value.lastname &&
                                                selectedRowDetails.value.firstname
                                            ) ? selectedRowDetails.value.lastname + ', ' + selectedRowDetails.value.firstname + ' ' + selectedRowDetails.value.middlename : '';

            payload.value.patient_Id      = selectedRowDetails.value.patient_Id ? selectedRowDetails.value.patient_Id : '';
            payload.value.suffix_id       = parseInt(selectedRowDetails.value.suffix_id) ? parseInt(selectedRowDetails.value.suffix_id) : '';
            payload.value.case_No         = selectedRowDetails.value.patient_registry && selectedRowDetails.value.patient_registry[0].case_No ? selectedRowDetails.value.patient_registry[0].case_No : '';
            payload.value.er_Case_No      = selectedRowDetails.value.patient_registry && parseInt(selectedRowDetails.value.patient_registry[0].er_Case_No) ? parseInt(selectedRowDetails.value.patient_registry[0].er_Case_No) : '';
            payload.value.registry_Date   = useDateMMDDYYY(selectedRowDetails.value.registry_Date) ? useDateMMDDYYY(selectedRowDetails.value.registry_Date) : '';
        }
    } 
})


</script>

<style scoped>
.form-col {
    margin-top: -16px !important;
}
</style>