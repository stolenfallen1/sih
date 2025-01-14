<template>
    <v-dialog :model-value="form_dialog" :persistent="true" hide-overlay width="1280">
        <v-form ref="form" @submit.prevent="openConfirmDialog">
            <v-card rounded="lg">
                <v-toolbar density="compact" color="#107bac" hide-details>
                    <v-toolbar-title>
                        {{ clicked_option === 'new' ? 'Out-Patient Registration' : (clicked_option === 'edit' ? 'View Out-Patient Registration' : 'Update Out-Patient Registration') }}
                    </v-toolbar-title>
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
                                <v-tab value="0"><v-icon start>mdi-form-select</v-icon> Personal Information </v-tab>
                                <v-tab value="1"><v-icon start>mdi-form-select</v-icon> Registry Information </v-tab>
                                <v-tab value="2"><v-icon start>mdi-form-select</v-icon> Other Details </v-tab>
                                <v-tab value="3"><v-icon start>mdi-form-select</v-icon> Guarantors </v-tab>
                                <v-tab value="4"><v-icon start>mdi-form-select</v-icon> Consultants </v-tab>
                                <v-tab value="5"><v-icon start>mdi-form-select</v-icon> Allergies </v-tab>
                                <v-tab value="6"><v-icon start>mdi-form-select</v-icon> Notes .Remarks </v-tab>
                            </v-tabs>
                        </v-col>
                        <v-divider vertical color="#000"></v-divider>
                        <v-col class="scrollable-content">
                            <v-window v-model="tab">
                                <v-window-item class="pa-1">
                                    <o-p-d-patient-basic-info :clicked_option="clicked_option" :payload="payload" :formErrors="formErrors" />
                                </v-window-item>
                                <v-window-item class="pa-1">
                                    <o-p-d-registry-basic-info :clicked_option="clicked_option" :payload="payload" :formErrors="formErrors" :form_type="formType" />
                                </v-window-item>
                                <v-window-item class="pa-1">
                                    <o-p-d-other-details-info :clicked_option="clicked_option" :payload="payload" :formErrors="formErrors" :form_type="formType" />
                                </v-window-item>
                                <v-window-item class="pa-1">
                                    <o-p-d-hmo-info :clicked_option="clicked_option" :payload="payload" :formErrors="formErrors" />
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
    <Confirmation 
        :show="confirmDialog"
        :payload="payload"
        :loading="isLoading"
        @submit="onSubmit"
        @close="closeConfirmDialog"
    />
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
const formErrors = ref({});
const formType = ref('outpatient');
const { selectedRowDetails } = storeToRefs(useSubcomponentSelectedRowDetailsStore());
const payload = ref({
    address: {},
    selectedGuarantor: [],
    selectedConsultant: [],
    selectedAllergy: [],
});
const confirmDialog = ref(false);
const isLoading = ref(false);
const requiredFieldMessage = ref([]); // Array to collect all required fields
const emits = defineEmits(['close-dialog', 'patient-registered']);

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
        case "mscAccount_Trans_Types": return "1";
        case "mscAccount_Type": return "1";
        case "mscPrice_Groups": return "1";
        case "mscPrice_Schemes": return "1";
        case "guarantor": return "3";
        case "consultant": return "4";
        default: return "0";
    }
}

const focusField = (fieldName) => {
    
    const fieldRef = $refs[fieldName];
    if (fieldRef && fieldRef.focus) {
        fieldRef.focus();
    }
}

const openConfirmDialog = async () => {
    formErrors.value = {};
    let valid = ref(true);
   
    // Define the required fields and their error messages
    const requiredFields = [
        { key: "lastname",               message: "Last name is required." },
        { key: "firstname",              message: "First name is required." },
        { key: "sex_id",                 message: "Sex is required." },
        { key: "civilstatus_id",         message: "Civil status is required." },
        { key: "birthdate",              message: "Birthdate is required." },
        { key: "register_Source",        message: "Register source is required." },
        { key: "register_Casetype",      message: "Register case type is required." },
        { key: "mscAccount_Trans_Types", message: "Account transaction type is required." },
        { key: "mscAccount_Type",        message: "Account type is required." },
        { key: "mscPrice_Groups",        message: "Price group is required." },
        { key: "mscPrice_Schemes",       message: "Price scheme is required." },
    ];
    // Validate required fields
    requiredFields.forEach((field) => {
        if (!payload.value[field.key]) {
        // Add error if the field is invalid
        formErrors.value[field.key] = field.message;
        valid.value = false;

        // Add the message if not already present
        if (!requiredFieldMessage.value.includes(field.message)) {
            requiredFieldMessage.value.push(field.message);
        }
    } else {
        // Remove error if the field is valid
        delete formErrors.value[field.key];

        // Remove the corresponding message
        const messageIndex = requiredFieldMessage.value.indexOf(field.message);
        if (messageIndex > -1) {
            requiredFieldMessage.value.splice(messageIndex, 1);
        }
    }
    });
    // Special validations
    if (payload && payload.value.mscAccount_Type !== 1) {
    // Check if selectedGuarantor is not provided or is empty
    if (!payload.value.selectedGuarantor || payload.value.selectedGuarantor.length === 0) {
        formErrors.value.guarantor = 'Required Guarantor';
        valid.value = false;

        // Add the guarantor error message if not already present
        if (!requiredFieldMessage.value.includes(formErrors.value.guarantor)) {
            requiredFieldMessage.value.push(formErrors.value.guarantor);
        }
        } else {
            // Remove guarantor error if valid
            delete formErrors.value.guarantor;
            const guarantorIndex = requiredFieldMessage.value.indexOf('Required Guarantor');
            if (guarantorIndex > -1) {
                requiredFieldMessage.value.splice(guarantorIndex, 1);
            }

            // Validate each guarantor in the array
            payload.value.selectedGuarantor.forEach((guarantor, index) => {
                const errorKey = `guarantor_${index}_guarantor_Credit_Limit`;

                if (!guarantor.isOpen) {
                    // If isOpen is false, guarantor_Credit_Limit is required
                   
                    if (!guarantor.guarantor_Credit_Limit || guarantor.guarantor_Credit_Limit === '') {
                        formErrors.value.guarantor = 'Required Guarantor';
                        formErrors.value[errorKey] = `Credit limit is required for guarantor `;
                        valid.value = false;

                        // Add error message if not already present
                        if (!requiredFieldMessage.value.includes(formErrors.value[errorKey])) {
                            requiredFieldMessage.value.push(formErrors.value[errorKey]);
                        }
                    } else {
                        // Remove error if guarantor_Credit_Limit is valid
                        formErrors.value.consultant = 'Required Consultant';
                        delete formErrors.value[errorKey];
                        const creditLimitIndex = requiredFieldMessage.value.indexOf(
                            `Credit limit is required for guarantor `
                        );
                        if (creditLimitIndex > -1) {
                            requiredFieldMessage.value.splice(creditLimitIndex, 1);
                        }
                    }
                } else {
                    // Remove guarantor_Credit_Limit error if isOpen is true
                    delete formErrors.value[errorKey];
                    const creditLimitIndex = requiredFieldMessage.value.indexOf(
                        `Credit limit is required for guarantor `
                    );
                    if (creditLimitIndex > -1) {
                        requiredFieldMessage.value.splice(creditLimitIndex, 1);
                    }
                }
            });
        }
    }


    if (payload && (!payload.value.selectedConsultant || payload.value.selectedConsultant.length === 0)) {
        formErrors.value.consultant = 'Required Consultant';
        valid.value = false;

        // Add the consultant error message if not already present
        if (!requiredFieldMessage.value.includes(formErrors.value.consultant)) {
            requiredFieldMessage.value.push(formErrors.value.consultant);
        }
    } else {
        // Remove consultant error if valid
        delete formErrors.value.consultant;
        const consultantIndex = requiredFieldMessage.value.indexOf('Required Consultant');
        if (consultantIndex > -1) {
            requiredFieldMessage.value.splice(consultantIndex, 1);
        }
    }
    
    if (!valid.value) {
        if(requiredFieldMessage.value.length > 0){
            useMultipleSnackbar(true, "error", requiredFieldMessage.value);
        }
        const firstErrorField = Object.keys(formErrors.value)[0];
        tab.value = findTabIndexByError(firstErrorField);
        await nextTick();
        // focusField(firstErrorField);
        return;
    } 
    confirmDialog.value = true;
};

const closeConfirmDialog = () => {
    confirmDialog.value = false;
};

const onSubmit = async (user_details) => {
    if (user_details.user_passcode === usePasscode()) {
        isLoading.value = true;
        try {
            if (payload.value.id) {
                const response = await useMethod("put", "update-patient", payload.value, "", payload.value.patient_id);
                if (response) {
                    useSnackbar(true, "green", "Patient updated successfully.");
                    isLoading.value = false;
                    payload.value = Object.assign({});
                    tab.value = "0";
                    const patientDetail = payload.value.lastname;
                    emits('patient-registered', patientDetail);
                    closeDialog();
                    closeConfirmDialog();
                } 
            } else {
                const response = await useMethod("post", "register-patient", payload.value);   
                if (response) {
                    useSnackbar(true, "green", "Patient registered successfully.");
                    isLoading.value = false;
                    payload.value = Object.assign({});
                    tab.value = "0";
                    const patientDetail = payload.value.lastname;
                    emits('patient-registered', patientDetail);
                    closeDialog();
                    closeConfirmDialog();
                }
            }
        } catch (error) {
            isLoading.value = false;
            useSnackbar(true, "red", error.message);
        } finally {
            isLoading.value = false;
        }
    } else {
        return useSnackbar(true, "error", "Password incorrect.");
    }
}

watchEffect(() => {
    if (selectedRowDetails.value && selectedRowDetails.value.id) {
        // Personal Information
        console.log(selectedRowDetails.value);
        payload.value = Object.assign({}, selectedRowDetails.value);
        payload.value.id = selectedRowDetails.value.id ? selectedRowDetails.value.id : '';
        payload.value.patient_id = selectedRowDetails.value.patient_Id ? selectedRowDetails.value.patient_Id : '';
        payload.value.register_id_no = selectedRowDetails.value.patient_registry && selectedRowDetails.value.patient_registry[0].case_No ? selectedRowDetails.value.patient_registry[0].case_No : '';
        payload.value.lastname = selectedRowDetails.value.lastname ? selectedRowDetails.value.lastname : '';
        payload.value.firstname = selectedRowDetails.value.firstname ? selectedRowDetails.value.firstname : '';
        payload.value.middlename = selectedRowDetails.value.middlename ? selectedRowDetails.value.middlename : '';
        payload.value.sex_id = parseInt(selectedRowDetails.value.sex_id) ? parseInt(selectedRowDetails.value.sex_id) : '';
        payload.value.suffix_id = parseInt(selectedRowDetails.value.suffix_id) ? parseInt(selectedRowDetails.value.suffix_id) : '';
        payload.value.civilstatus_id = parseInt(selectedRowDetails.value.civilstatus_id) ? parseInt(selectedRowDetails.value.civilstatus_id) : '';
        payload.value.birthdate = useDateMMDDYYY(selectedRowDetails.value.birthdate) ? useDateMMDDYYY(selectedRowDetails.value.birthdate) : '';
        payload.value.age = selectedRowDetails.value.age ? selectedRowDetails.value.age : '';
        // Registry Information
        payload.value.register_Source = selectedRowDetails.value.patient_registry && parseInt(selectedRowDetails.value.patient_registry[0].register_Source) ? parseInt(selectedRowDetails.value.patient_registry[0].register_Source) : '';
        payload.value.register_Casetype = selectedRowDetails.value.patient_registry && parseInt(selectedRowDetails.value.patient_registry[0].register_Casetype) ? parseInt(selectedRowDetails.value.patient_registry[0].register_Casetype) : '';
        payload.value.mscAccount_Trans_Types = selectedRowDetails.value.patient_registry && parseInt(selectedRowDetails.value.patient_registry[0].mscAccount_Trans_Types) ? parseInt(selectedRowDetails.value.patient_registry[0].mscAccount_Trans_Types) : '';
        payload.value.mscAccount_Type = selectedRowDetails.value.patient_registry && parseInt(selectedRowDetails.value.patient_registry[0].mscAccount_Type) ? parseInt(selectedRowDetails.value.patient_registry[0].mscAccount_Type) : '';
        payload.value.mscPrice_Groups = selectedRowDetails.value.patient_registry && parseInt(selectedRowDetails.value.patient_registry[0].mscPrice_Groups) ? parseInt(selectedRowDetails.value.patient_registry[0].mscPrice_Groups) : '';
        payload.value.mscPrice_Schemes = selectedRowDetails.value.patient_registry && parseInt(selectedRowDetails.value.patient_registry[0].mscPrice_Schemes) ? parseInt(selectedRowDetails.value.patient_registry[0].mscPrice_Schemes) : '';
        payload.value.mscService_Type = selectedRowDetails.value.patient_registry && parseInt(selectedRowDetails.value.patient_registry[0].mscService_Type) ? parseInt(selectedRowDetails.value.patient_registry[0].mscService_Type) : '';
        payload.value.mscCase_Indicators_Id = selectedRowDetails.value.patient_registry && parseInt(selectedRowDetails.value.patient_registry[0].mscCase_Indicators_Id) ? parseInt(selectedRowDetails.value.patient_registry[0].mscCase_Indicators_Id) : '';
        payload.value.mscBroughtBy_Relationship_Id = selectedRowDetails.value.patient_registry && parseInt(selectedRowDetails.value.patient_registry[0].mscBroughtBy_Relationship_Id) ? parseInt(selectedRowDetails.value.patient_registry[0].mscBroughtBy_Relationship_Id) : '';
        payload.value.medical_Package_Name = selectedRowDetails.value.patient_registry && selectedRowDetails.value.patient_registry[0].medical_Package_Name ? selectedRowDetails.value.patient_registry[0].medical_Package_Name : '';
        // Other Details
        payload.value.birthplace = selectedRowDetails.value.birthplace ? selectedRowDetails.value.birthplace : '';
        payload.value.religion_id = parseInt(selectedRowDetails.value.religion_id) ? parseInt(selectedRowDetails.value.religion_id) : '';
        payload.value.nationality_id = parseInt(selectedRowDetails.value.nationality_id) ? parseInt(selectedRowDetails.value.nationality_id) : '';
        // Patient Identifier
        const patientIdentifierMapping = {
            isHemodialysis: 1,
            isPeritoneal: 2,
            isLINAC: 3,
            isCOBALT: 4,
            isBloodTrans: 5,
            isChemotherapy: 6,
            isBrachytherapy: 7,
            isDebridement: 8,
            isTBDots: 9,
            isPAD: 10,
            isRadioTherapy: 11,
        }
        const patientIdentifierTemp = selectedRowDetails.value.patient_registry ? selectedRowDetails.value.patient_registry[0] : {};
        let foundPatientIdentifier = '';
        for (const [key, value] of Object.entries(patientIdentifierMapping)) {
            if (patientIdentifierTemp[key] == 1) {
                foundPatientIdentifier = value;
                break;
            }
        }
        payload.value.patientIdentifier = foundPatientIdentifier;

        // For HMO GUARANTORS
        const Guarantor = ref([]);
        if (selectedRowDetails.value.patient_registry && selectedRowDetails.value.patient_registry[0].guarantor_Id != null && selectedRowDetails.value.patient_registry[0].guarantor_Name != 'PERSONAL') {
            let guarantor_Id = selectedRowDetails.value.patient_registry[0].guarantor_Id ? selectedRowDetails.value.patient_registry[0].guarantor_Id : '';
            let guarantor_name = selectedRowDetails.value.patient_registry[0].guarantor_Name ? selectedRowDetails.value.patient_registry[0].guarantor_Name : '';
            let guarantor_Approval_code = selectedRowDetails.value.patient_registry[0].guarantor_Approval_code ? selectedRowDetails.value.patient_registry[0].guarantor_Approval_code : 'N/A';
            let guarantor_Approval_no = selectedRowDetails.value.patient_registry[0].guarantor_Approval_no ? selectedRowDetails.value.patient_registry[0].guarantor_Approval_no : 'N/A';
            let guarantor_Approval_date = useDateMMDDYYY(selectedRowDetails.value.patient_registry[0].guarantor_Approval_date) ? useDateMMDDYYY(selectedRowDetails.value.patient_registry[0].guarantor_Approval_date) : '';
            let guarantor_Validity_date = useDateMMDDYYY(selectedRowDetails.value.patient_registry[0].guarantor_Validity_date) ? useDateMMDDYYY(selectedRowDetails.value.patient_registry[0].guarantor_Validity_date) : '';
            let guarantor_Credit_Limit = selectedRowDetails.value.patient_registry[0].guarantor_Credit_Limit ? selectedRowDetails.value.patient_registry[0].guarantor_Credit_Limit : '';
            Guarantor.value.push({
                guarantor_Id,
                guarantor_name,
                guarantor_Approval_code,
                guarantor_Approval_no,
                guarantor_Approval_date,
                guarantor_Validity_date,
                guarantor_Credit_Limit
            });
        }
        payload.value.selectedGuarantor = Guarantor.value;

        // For CONSULTANTS
        const Consultant = ref([]);
        if (selectedRowDetails.value.patient_registry && selectedRowDetails.value.patient_registry[0].attending_Doctor != null) {
            let attending_Doctor = selectedRowDetails.value.patient_registry[0].attending_Doctor ? selectedRowDetails.value.patient_registry[0].attending_Doctor : '';
            let attending_Doctor_fullname = selectedRowDetails.value.patient_registry[0].attending_Doctor_fullname ? selectedRowDetails.value.patient_registry[0].attending_Doctor_fullname : '';
            Consultant.value.push({
                attending_Doctor,
                attending_Doctor_fullname
            });
        }
        payload.value.selectedConsultant = Consultant.value;

        const Allergy = ref([]);

        if (selectedRowDetails.value.patient_registry && Array.isArray(selectedRowDetails.value.patient_registry)) {
            selectedRowDetails.value.patient_registry.forEach(reg => {
                if (reg.allergies && Array.isArray(reg.allergies)) {
                    reg.allergies.forEach(allergy => {
                        const allergy_id = allergy.allergy_type_id || '';
                        const allergy_name = allergy.allergy_description || ''; 
                        const symptoms = allergy.symptoms_allergy.map(symptom => ({
                            description: symptom.symptom_Description  
                        })) || []; 
                        const cause = allergy.cause_of_allergy.map(cause => cause.description).join(', ') || '';
                        const drugUsed = allergy.drug_used_for_allergy.map(drug => drug.drug_Description).join(', ') || ''; 

                        Allergy.value.push({
                            allergy_id,
                            allergy_name,
                            symptoms,
                            cause,
                            drugUsed
                        });
                    });
                }
            });
        }

        payload.value.selectedAllergy = Allergy.value;


        payload.value.registry_Remarks = selectedRowDetails.value.patient_registry && selectedRowDetails.value.patient_registry[0].registry_Remarks ? selectedRowDetails.value.patient_registry[0].registry_Remarks : '';
    } else {
        if (patientStore.selectedPatient != null && patientStore.selectedPatient.id != null && patientStore.selectedPatient.patient_Id != null) {  
            console.log(patientStore.selectedPatient);
            payload.value = Object.assign({}, patientStore.selectedPatient);
            payload.value.patient_id = patientStore.selectedPatient.patient_Id;
            payload.value.lastname = patientStore.selectedPatient.lastname ? patientStore.selectedPatient.lastname : '';
            payload.value.firstname = patientStore.selectedPatient.firstname ? patientStore.selectedPatient.firstname : '';
            payload.value.middlename = patientStore.selectedPatient.middlename ? patientStore.selectedPatient.middlename : null;
            payload.value.birthdate = useDateMMDDYYY(patientStore.selectedPatient.birthdate) ? useDateMMDDYYY(patientStore.selectedPatient.birthdate) : '';
        } else {
            return;
        }
    }
});

onUnmounted(() => {
    payload.value = Object.assign({}, {});
    selectedRowDetails.value = {};
    closeConfirmDialog();
})
</script>

<style scoped>
.scrollable-content {
    overflow-y: auto;
    max-height: calc(100vh - 200px); 
}
</style>