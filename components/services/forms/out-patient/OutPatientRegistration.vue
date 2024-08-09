<template>
    <v-dialog :model-value="form_dialog" :persistent="true" hide-overlay width="1280">
        <v-form ref="form" @submit.prevent="onSubmit">
            <v-card rounded="lg">
                <v-toolbar density="compact" color="#107bac" hide-details>
                    <v-toolbar-title>Outpatient Registration Form</v-toolbar-title>
                    <v-btn color="white" @click="closeDialog">
                        <v-icon>mdi-close</v-icon>
                    </v-btn>
                </v-toolbar>
                <v-card-text>
                    <v-row>
                        <v-col cols="3">
                        <v-tabs
                            v-model="tab"
                            direction="vertical"
                            color="primary"
                            center-active
                            density="compact"
                        >
                            <v-tab value="0"><v-icon start>mdi-form-select</v-icon> Patient Basic Information </v-tab>
                            <v-tab value="1"><v-icon start>mdi-form-select</v-icon> Registry Information </v-tab>
                            <v-tab value="2"><v-icon start>mdi-form-select</v-icon> Other Details </v-tab>
                            <v-tab value="3"><v-icon start>mdi-form-select</v-icon> HMOs .Guarantors </v-tab>
                            <v-tab value="4"><v-icon start>mdi-form-select</v-icon> Consultants .Physicians </v-tab>
                            <v-tab value="5"><v-icon start>mdi-form-select</v-icon> Allergies </v-tab>
                            <v-tab value="6"><v-icon start>mdi-form-select</v-icon> Notes .Remarks </v-tab>
                        </v-tabs>
                        </v-col>
                        <v-divider vertical color="#2a73c5"></v-divider>
                        <v-col cols="9" class="scrollable-content">
                        <v-window v-model="tab">
                            <v-window-item class="pa-1">
                                <o-p-d-patient-basic-info :clicked_option="clicked_option" :payload="payload" />
                            </v-window-item>
                            <v-window-item class="pa-1">
                                <o-p-d-registry-basic-info :clicked_option="clicked_option" :payload="payload" :form_type="formType" />
                            </v-window-item>
                            <v-window-item class="pa-1">
                                <o-p-d-other-details-info :clicked_option="clicked_option" :payload="payload" :form_type="formType" />
                            </v-window-item>
                            <v-window-item class="pa-1">
                                <o-p-d-hmo-info :clicked_option="clicked_option" :payload="payload" />
                            </v-window-item>
                            <v-window-item class="pa-1">
                                <o-p-d-consultant-info :clicked_option="clicked_option" :payload="payload" />
                            </v-window-item>
                            <v-window-item class="pa-1">
                                <o-p-d-allergies-info :clicked_option="clicked_option" :payload="payload" />
                            </v-window-item>
                            <v-window-item class="pa-1">
                                <o-p-d-remarks-info :clicked_option="clicked_option" :payload="payload" />
                            </v-window-item>
                        </v-window>
                        </v-col>
                    </v-row>
                </v-card-text>
                <v-divider></v-divider>
                <v-card-actions>
                    <v-btn color="blue-darken-1 border border-info border border-info" @click="closeDialog"> Close </v-btn>
                    <v-checkbox 
                        class="ml-8"
                        :readonly="clicked_option === 'view'"
                        label="With consent from patient to access his/her records"
                        hide-details
                        density="compact"
                    ></v-checkbox>
                    <v-spacer></v-spacer>
                    <v-btn v-if="clicked_option === 'new' || clicked_option === 'edit'" class="bg-primary text-white" type="submit">
                        {{ clicked_option === 'new' ? 'Register Patient' : 'Update Patient' }}
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-form>
    </v-dialog>
    <Snackbar />
</template>

<script setup>
import { usePatientStore } from '@/store/selectedPatient';

const patientStore = usePatientStore();

const props = defineProps({
    form_dialog:{
        type:Boolean,
        default:() => false
    },
    clicked_option: {
        type: String,
        default: () => ''
    },
});
let tab = ref("0");
const formType = ref('outpatient');
const { selectedRowDetails } = storeToRefs(useSubcomponentSelectedRowDetailsStore());
const payload = ref({
    address: {},
    selectedGuarantor: [],
    selectedConsultant: [],
});
const isLoading = ref(false);

const emits = defineEmits(['close-dialog']);

const closeDialog = () => {
    emits('close-dialog');
    tab.value = "0";
    payload.value = {};
    patientStore.clearSelectedPatient();
}

const onSubmit = async () => {
    isLoading.value = true;
    if (payload.value.id) {
        const response = await useMethod("put", "update-outpatient", payload.value, "", payload.value.id);
        if (response) {
            useSnackbar(true, "green", response.message);
            isLoading.value = false;
            payload.value = Object.assign({});
            closeDialog();
            tab.value = "0";
        } 
    } else {
        const errors = validation();

        if (errors.length > 0) {
            for (let i = 0; i < errors.length; i++) {
                useSnackbar(true, "red", errors[i].msg);
                await new Promise(resolve => setTimeout(resolve, 1000));  
            }
            isLoading.value = false;
            return;
        } 

        response = await useMethod("post", "register-outpatient", payload.value);
        if (response) {
            useSnackbar(true, "green", response.message);
            isLoading.value = false;
            payload.value = Object.assign({});
            closeDialog();
            tab.value = "0";
        }
    }
}
const validation = ()=>{
    let error_msg = [];
    if(!payload.value.lastname) {
        error_msg.push({msg:"Lastname is required"});
    }
    if(!payload.value.firstname) {
        error_msg.push({msg:"Firstname is required"});
    }
    if(!payload.value.sex_id) {
        error_msg.push({msg:"Sex is required"});
    }
    if(!payload.value.civilstatus_id) {
        error_msg.push({msg:"Civil Status is required"});
    }
    if(!payload.value.birthdate) {
        error_msg.push({msg:"Birthdate is required"});
    }
    if(!payload.value.registry_date) {
        error_msg.push({msg:"Registry Date is required"});
    }
    // if(!payload.value.registry_type) {
    //     error_msg.push({msg:"Registry Type is required"});
    // }
    if(!payload.value.mscAccount_trans_types) {
        error_msg.push({msg:"Transaction Type is required"});
    }
    // if(!payload.value.hosp_plan) { 
    //     error_msg.push({msg:"Hospitalization Plan is required"});
    // }
    if(!payload.value.mscPrice_Groups) {
        error_msg.push({msg:"Price Group is required"});
    }
    if(!payload.value.mscPrice_Schemes) {
        error_msg.push({msg:"Price Scheme is required"});
    }
    // Inpatient only
    // if(!payload.value.how_admitted) {
    //     error_msg.push({msg:"How Admitted is required"});
    // }
    return error_msg;
}

onUpdated(() => {
    if (selectedRowDetails.value && selectedRowDetails.value.id) {
        payload.value = Object.assign({}, selectedRowDetails.value);
        payload.value.sex_id = parseInt(selectedRowDetails.value.sex_id) ? parseInt(selectedRowDetails.value.sex_id) : '';
        payload.value.suffix_id = parseInt(selectedRowDetails.value.suffix_id) ? parseInt(selectedRowDetails.value.suffix_id) : '';
        payload.value.civilstatus_id = parseInt(selectedRowDetails.value.civilstatus_id) ? parseInt(selectedRowDetails.value.civilstatus_id) : '';
        payload.value.birthdate = useDateMMDDYYY(selectedRowDetails.value.birthdate) ? useDateMMDDYYY(selectedRowDetails.value.birthdate) : '';
        payload.value.register_id_no = selectedRowDetails.value.patient_registry && selectedRowDetails.value.patient_registry.register_id_no ? selectedRowDetails.value.patient_registry.register_id_no : '';
        payload.value.registry_date = useDateMMDDYYY(selectedRowDetails.value.registry_date) ? useDateMMDDYYY(selectedRowDetails.value.registry_date) : '';
        payload.value.mscPrice_Groups = selectedRowDetails.value.patient_registry && parseInt(selectedRowDetails.value.patient_registry.mscPrice_Groups) ? parseInt(selectedRowDetails.value.patient_registry.mscPrice_Groups) : 'TEST';
        payload.value.mscPrice_Schemes = selectedRowDetails.value.patient_registry && parseInt(selectedRowDetails.value.patient_registry.mscPrice_Schemes) ? parseInt(selectedRowDetails.value.patient_registry.mscPrice_Schemes) : 'TEST';
        payload.value.religion_id = parseInt(selectedRowDetails.value.religion_id) ? parseInt(selectedRowDetails.value.religion_id) : '';
        payload.value.nationality_id = parseInt(selectedRowDetails.value.nationality_id) ? parseInt(selectedRowDetails.value.nationality_id) : '';

        // For HMO GUARANTORS
        const Guarantor = ref([]);
        if (selectedRowDetails.value.patient_registry) {
            selectedRowDetails.value.patient_registry.guarantor_approval_date = useDateMMDDYYY(selectedRowDetails.value.patient_registry.guarantor_approval_date);
            selectedRowDetails.value.patient_registry.guarantor_validity_date = useDateMMDDYYY(selectedRowDetails.value.patient_registry.guarantor_validity_date);
            Guarantor.value.push(selectedRowDetails.value.patient_registry)
        }
        payload.value.selectedGuarantor = Guarantor.value;

        // For CONSULTANTS
        const Consultant = ref([]);
        if (selectedRowDetails.value.patient_registry) {
            Consultant.value.push(selectedRowDetails.value.patient_registry)
        }
        payload.value.selectedConsultant = Consultant.value;

        payload.value.registry_remarks = selectedRowDetails.value.patient_registry && selectedRowDetails.value.patient_registry.registry_remarks ? selectedRowDetails.value.patient_registry.registry_remarks : '';
    } else {
        if (patientStore.selectedPatient && patientStore.selectedPatient.id) { 
            console.log(patientStore.selectedPatient);
            payload.value = Object.assign({}, patientStore.selectedPatient);
            payload.value.sex_id = parseInt(patientStore.selectedPatient.sex_id) ? parseInt(patientStore.selectedPatient.sex_id) : '';
            payload.value.suffix_id = parseInt(patientStore.selectedPatient.suffix_id) ? parseInt(patientStore.selectedPatient.suffix_id) : '';
            payload.value.civilstatus_id = parseInt(patientStore.selectedPatient.civilstatus_id) ? parseInt(patientStore.selectedPatient.civilstatus_id) : '';
            payload.value.birthdate = useDateMMDDYYY(patientStore.selectedPatient.birthdate) ? useDateMMDDYYY(patientStore.selectedPatient.birthdate) : '';
            payload.value.register_id_no = patientStore.selectedPatient.patient_registry_details && patientStore.selectedPatient.patient_registry_details.register_id_no ? patientStore.selectedPatient.patient_registry_details.register_id_no : '';
            payload.value.registry_date = useDateMMDDYYY(patientStore.selectedPatient.registry_date) ? useDateMMDDYYY(patientStore.selectedPatient.registry_date) : '';
            payload.value.mscPrice_Groups = patientStore.selectedPatient.patient_registry_details && parseInt(patientStore.selectedPatient.patient_registry_details.mscPrice_Groups) ? parseInt(patientStore.selectedPatient.patient_registry_details.mscPrice_Groups) : 'TEST';
            payload.value.mscPrice_Schemes = patientStore.selectedPatient.patient_registry_details && parseInt(patientStore.selectedPatient.patient_registry_details.mscPrice_Schemes) ? parseInt(patientStore.selectedPatient.patient_registry_details.mscPrice_Schemes) : 'TEST';
            payload.value.religion_id = parseInt(patientStore.selectedPatient.religion_id) ? parseInt(patientStore.selectedPatient.religion_id) : '';
            payload.value.nationality_id = parseInt(patientStore.selectedPatient.nationality_id) ? parseInt(patientStore.selectedPatient.nationality_id) : '';
    
            // For HMO GUARANTORS
            const Guarantor = ref([]);
            if (patientStore.selectedPatient.patient_registry_details) {
                patientStore.selectedPatient.patient_registry_details.guarantor_approval_date = useDateMMDDYYY(patientStore.selectedPatient.patient_registry_details.guarantor_approval_date);
                patientStore.selectedPatient.patient_registry_details.guarantor_validity_date = useDateMMDDYYY(patientStore.selectedPatient.patient_registry_details.guarantor_validity_date);
                Guarantor.value.push(patientStore.selectedPatient.patient_registry_details)
            }
            payload.value.selectedGuarantor = Guarantor.value;
    
            // For CONSULTANTS
            const Consultant = ref([]);
            if (patientStore.selectedPatient.patient_registry_details) {
                Consultant.value.push(patientStore.selectedPatient.patient_registry_details)
            }
            payload.value.selectedConsultant = Consultant.value;
    
            payload.value.registry_remarks = patientStore.selectedPatient.patient_registry_details && patientStore.selectedPatient.patient_registry_details.registry_remarks ? patientStore.selectedPatient.patient_registry_details.registry_remarks : '';
        }
    }
});
</script>

<style scoped>
.scrollable-content {
    overflow-y: auto;
    max-height: calc(100vh - 200px); 
}
</style>