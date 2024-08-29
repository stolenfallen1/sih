<template>
    <v-dialog :model-value="form_dialog" :persistent="true" hide-overlay width="1280" scrollable>
        <v-form ref="form" @submit.prevent="onSubmit">
            <v-card rounded="lg">
                <v-toolbar density="compact" color="#107bac" hide-details>
                    <v-toolbar-title>Inpatient Registration Form</v-toolbar-title>
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
                                <i-p-d-patient-basic-info :clicked_option="clicked_option" :payload="payload" :formErrors="formErrors" />
                            </v-window-item>
                            <v-window-item class="pa-1">
                                <i-p-d-registry-basic-info :clicked_option="clicked_option" :payload="payload" :formErrors="formErrors" :form_type="formType" />
                            </v-window-item>
                            <v-window-item class="pa-1">
                                <i-p-d-other-details-info :clicked_option="clicked_option" :payload="payload" :form_type="formType" />
                            </v-window-item>
                            <v-window-item class="pa-1">
                                <i-p-d-hmo-info :clicked_option="clicked_option" :payload="payload" />
                            </v-window-item>
                            <v-window-item class="pa-1">
                                <i-p-d-consultant-info :clicked_option="clicked_option" :payload="payload" />
                            </v-window-item>
                            <v-window-item class="pa-1">
                                <i-p-d-allergies-info :clicked_option="clicked_option" :payload="payload" />
                            </v-window-item>
                            <v-window-item class="pa-1">
                                <i-p-d-remarks-info :clicked_option="clicked_option" :payload="payload" />
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
</template>

<script setup>
import { usePatientStore } from '@/store/selectedPatient';

const patientStore = usePatientStore();

const props = defineProps({
    form_dialog:{
        type:Boolean,
        default:()=>false
    },
    clicked_option: {
        type: String,
        default: () => ''
    }
});

let tab = ref("0");
const formErrors = ref({});
const formType = ref('inpatient');
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
    formErrors.value = {};
}

const findTabIndexByError = (field) => {
    switch (field) {
        case "lastname": return "0";
        case "firstname": return "0";
        case "sex_id": return "0";
        case "civilstatus_id": return "0";
        case "birthdate": return "0";
        case "register_Source": return "1";
        case "register_Casetype": return "1";
        case "mscAccount_trans_types": return "1";
        case "mscAccount_type": return "1";
        case "mscPrice_Groups": return "1";
        case "mscPrice_Schemes": return "1";
        default: return "0";
    }
}

const focusField = (fieldName) => {
    const fieldRef = $refs[fieldName];
    if (fieldRef && fieldRef.focus) {
        fieldRef.focus();
    }
}

const onSubmit = async () => {
    formErrors.value = {};
    let valid = ref(true);

    if (!payload.value.lastname) {
        formErrors.value.lastname = "Lastname is required";
        valid.value = false;
    }
    if (!payload.value.firstname) {
        formErrors.value.firstname = "Firstname is required";
        valid.value = false;
    }
    if (!payload.value.sex_id) {
        formErrors.value.sex_id = "Sex is required";
        valid.value = false;
    }
    if (!payload.value.civilstatus_id) {
        formErrors.value.civilstatus_id = "Civil Status is required";
        valid.value = false;
    }
    if (!payload.value.birthdate) {
        formErrors.value.birthdate = "Birthdate is required";
        valid.value = false;
    }
    if (!payload.value.register_Source) {
        formErrors.value.register_Source = "Register Source is required";
        valid.value = false;
    }
    if (!payload.value.register_Casetype) {
        formErrors.value.register_Casetype = "Register Casetype is required";
        valid.value = false;
    }
    if (!payload.value.mscAccount_trans_types) {
        formErrors.value.mscAccount_trans_types = "Transaction type is required";
        valid.value = false;
    }
    if (!payload.value.mscAccount_type) {
        formErrors.value.mscAccount_type = "Hospitalization  type is required";
        valid.value = false;
    }
    if (!payload.value.mscPrice_Groups) {
        formErrors.value.mscPrice_Groups = "Price Group is required";
        valid.value = false;
    }
    if (!payload.value.mscPrice_Schemes) {
        formErrors.value.mscPrice_Schemes = "Price Scheme is required";
        valid.value = false;
    }
    if (!payload.value.mscService_Type) {
        formErrors.value.mscService_Type = "Service Type is required";
        valid.value = false;
    }
    if (!payload.value.mscBroughtBy_Relationship_Id) {
        formErrors.value.mscBroughtBy_Relationship_Id = "Brought By is required";
        valid.value = false;
    }

    if (!valid.value) {
        const firstErrorField = Object.keys(formErrors.value)[0];
        tab.value = findTabIndexByError(firstErrorField);

        await nextTick();
        focusField(firstErrorField);
        return;
    }

    isLoading.value = true;
    try {
        if (payload.value.id) {
            const response = await useMethod("put", "update-inpatient", payload.value, "", payload.value.patient_id);
            if (response) {
                useSnackbar(true, "green", response.message);
                isLoading.value = false;
                payload.value = Object.assign({});
                closeDialog();
                tab.value = "0";
            } 
        } else {
            response = await useMethod("post", "register-inpatient", payload.value);
            if (response) {
                useSnackbar(true, "green", response.message);
                isLoading.value = false;
                payload.value = Object.assign({});
                closeDialog();
                tab.value = "0";
            }
        }
    } catch (error) {
        isLoading.value = false;
        useSnackbar(true, "red", error.message);
    }
}

onUpdated(() => {
    if (selectedRowDetails.value) {
        payload.value = Object.assign({}, selectedRowDetails.value);
        payload.value.sex_id = parseInt(selectedRowDetails.value.sex_id) ? parseInt(selectedRowDetails.value.sex_id) : '';
        payload.value.suffix_id = parseInt(selectedRowDetails.value.suffix_id) ? parseInt(selectedRowDetails.value.suffix_id) : '';
        payload.value.civilstatus_id = parseInt(selectedRowDetails.value.civilstatus_id) ? parseInt(selectedRowDetails.value.civilstatus_id) : '';
        payload.value.birthdate = useDateMMDDYYY(selectedRowDetails.value.birthdate) ? useDateMMDDYYY(selectedRowDetails.value.birthdate) : '';
        payload.value.register_id_no = selectedRowDetails.value.patient_registry && selectedRowDetails.value.patient_registry.register_id_no ? selectedRowDetails.value.patient_registry.register_id_no : '';
        payload.value.registry_date = useDateMMDDYYY(selectedRowDetails.value.registry_date) ? useDateMMDDYYY(selectedRowDetails.value.registry_date) : '';
        payload.value.mscPrice_Groups = selectedRowDetails.value.patient_registry && parseInt(selectedRowDetails.value.patient_registry.mscPrice_Groups) ? parseInt(selectedRowDetails.value.patient_registry.mscPrice_Groups) : '';
        payload.value.mscPrice_Schemes = selectedRowDetails.value.patient_registry && parseInt(selectedRowDetails.value.patient_registry.mscPrice_Schemes) ? parseInt(selectedRowDetails.value.patient_registry.mscPrice_Schemes) : '';
        payload.value.religion_id = parseInt(selectedRowDetails.value.religion_id) ? parseInt(selectedRowDetails.value.religion_id) : '';
        payload.value.nationality_id = parseInt(selectedRowDetails.value.nationality_id) ? parseInt(selectedRowDetails.value.nationality_id) : '';

        // ADDRESS
        const Address = ref({});
        Address.value.bldgstreet = selectedRowDetails.value.bldgstreet ? selectedRowDetails.value.bldgstreet : '';
        Address.value.region_id = parseInt(selectedRowDetails.value.region_id) ? parseInt(selectedRowDetails.value.region_id) : '';
        Address.value.province_id = parseInt(selectedRowDetails.value.province_id) ? parseInt(selectedRowDetails.value.province_id) : '';
        Address.value.municipality_id = parseInt(selectedRowDetails.value.municipality_id) ? parseInt(selectedRowDetails.value.municipality_id) : '';
        Address.value.barangay_id = parseInt(selectedRowDetails.value.barangay_id) ? parseInt(selectedRowDetails.value.barangay_id) : '';
        Address.value.country_id = parseInt(selectedRowDetails.value.country_id) ? parseInt(selectedRowDetails.value.country_id) : '';
        payload.value.address = Address.value;
        console.log('Address:', payload.value.address); 

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
    } 
});
</script>

<style scoped>
.scrollable-content {
    overflow-y: auto;
    max-height: calc(100vh - 200px); 
}
</style>