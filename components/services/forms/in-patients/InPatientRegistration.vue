<template>
    <v-dialog :model-value="form_dialog" :persistent="true" hide-overlay width="1280" scrollable>
        <div v-if="isVisible" class="data-loader">
            <v-progress-circular
                :model-value="value" 
                :rotate="360" :size="100" 
                :width="15" color="#107bac"
                >
                <template 
                    v-slot:default> {{ value }} % 
                </template>
            </v-progress-circular>
        </div>
        <v-form ref="form" @submit.prevent="openConfirmDialog">
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
                        <v-col class="scrollable-content">
                        <v-window v-model="tab">
                            <v-window-item class="pa-1">
                                <i-p-d-patient-basic-info :clicked_option="clicked_option" :payload="payload" :formErrors="formErrors" />
                            </v-window-item>
                            <v-window-item class="pa-1">
                                <i-p-d-registry-basic-info :clicked_option="clicked_option" :payload="payload" :formErrors="formErrors" @toggle-loader="handleLoader" @update-progress="updateProgress"  :form_type="formType" />
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

    <Confirmation 
        :show="showDialog"
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
            default:()=>false
        },
        clicked_option: {
            type: String,
            default: () => ''
        }
    });

    const isVisible = ref(false);
    const value = ref(0);
    const handleLoader = (status) => {
        isVisible.value = status;
    }
    const updateProgress = (progress) => {
        value.value = progress;
    };

    let tab = ref("0");
    const showDialog = ref(false);
    const formErrors = ref({});
    const formType = ref('inpatient');
    const { selectedRowDetails } = storeToRefs(useSubcomponentSelectedRowDetailsStore());
    const payload = ref({
        address: {},
        selectedGuarantor: [],
        selectedConsultant: [],
    });
    const isLoading = ref(false);

    const emits = defineEmits(['close-dialog', 'patient-registered']);

    const closeConfirmDialog = () => {
        emits('close-dialog');
        showDialog.value = false;
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
            case "mscService_Type" : return "1";
            case "mscBroughtBy_Relationship_Id" : return "1"
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
        if (!payload.value.mscAccount_Trans_Types) {
            formErrors.value.mscAccount_Trans_Types = "Transaction type is required";
            valid.value = false;
        }
        if (!payload.value.mscAccount_Type) {
            formErrors.value.mscAccount_Type = "Hospitalization  type is required";
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
        showDialog.value = true;
    }

    const closeDialog = () => {
        showDialog.value = false;
        emits('close-dialog');
        tab.value = "0";
        payload.value = {};
        formErrors.value = {};
    }

    const onSubmit = async (user_details) => {
        if (user_details.user_passcode === usePasscode()) {
            isLoading.value = true;
            try {
                if (payload.value.id) {
                    const response = await useMethod("put", "update-patient", payload.value, "", payload.value.patient_Id);
                    if (response) {
                        useSnackbar(true, "green", response.message);
                        isLoading.value = false;
                        payload.value = Object.assign({});
                        closeDialog();
                        tab.value = "0";
                        emits('patient-registered');
                    } 
                } else {
                    response = await useMethod("post", "register-patient", payload.value);
                    if (response) {
                        useSnackbar(true, "green", response.message);
                        isLoading.value = false;
                        payload.value = Object.assign({});
                        closeDialog();
                        tab.value = "0";
                        emits('patient-registered');
                    }
                }
            } catch (error) {
                isLoading.value = false;
                useSnackbar(true, "red", error.message);
            }
        } else {
            return useSnackbar(true, "error", "Password incorrect.");
        }
    }

    watchEffect(() => {
        if (selectedRowDetails.value && selectedRowDetails.value.id) {
            payload.value = Object.assign({}, selectedRowDetails.value);
            payload.value.sex_id = parseInt(selectedRowDetails.value.sex_id) ? parseInt(selectedRowDetails.value.sex_id) : '';
            payload.value.suffix_id = parseInt(selectedRowDetails.value.suffix_id) ? parseInt(selectedRowDetails.value.suffix_id) : '';
            payload.value.civilstatus_id = parseInt(selectedRowDetails.value.civilstatus_id) ? parseInt(selectedRowDetails.value.civilstatus_id) : '';
            payload.value.birthdate = useDateMMDDYYY(selectedRowDetails.value.birthdate) ? useDateMMDDYYY(selectedRowDetails.value.birthdate) : '';
            payload.value.case_No = selectedRowDetails.value.patient_registry && selectedRowDetails.value.patient_registry[0].case_No ? selectedRowDetails.value.patient_registry[0].case_No : '';
            payload.value.registry_date = useDateMMDDYYY(selectedRowDetails.value.registry_date) ? useDateMMDDYYY(selectedRowDetails.value.registry_date) : '';
            payload.value.mscPrice_Groups = selectedRowDetails.value.patient_registry && parseInt(selectedRowDetails.value.patient_registry.mscPrice_Groups) ? parseInt(selectedRowDetails.value.patient_registry.mscPrice_Groups) : '';
            payload.value.mscPrice_Schemes = selectedRowDetails.value.patient_registry && parseInt(selectedRowDetails.value.patient_registry.mscPrice_Schemes) ? parseInt(selectedRowDetails.value.patient_registry.mscPrice_Schemes) : '';
            payload.value.religion_id = parseInt(selectedRowDetails.value.religion_id) ? parseInt(selectedRowDetails.value.religion_id) : '';
            payload.value.nationality_id = parseInt(selectedRowDetails.value.nationality_id) ? parseInt(selectedRowDetails.value.nationality_id) : '';

            // ADDRESS
            const Address = ref({});
            Address.value.bldgstreet = selectedRowDetails.value.bldgstreet ? selectedRowDetails.value.bldgstreet : '';
            Address.value.region_id =  selectedRowDetails.value.region_id ? parseInt(selectedRowDetails.value.region_id) : '';
            Address.value.province_id = selectedRowDetails.value.province_id ? parseInt(selectedRowDetails.value.province_id) : '';
            Address.value.municipality_id = selectedRowDetails.value.municipality_id ? parseInt(selectedRowDetails.value.municipality_id) : '';
            Address.value.barangay_id =  selectedRowDetails.value.barangay_id ? parseInt(selectedRowDetails.value.barangay_id) : '';
            Address.value.country_id =  selectedRowDetails.value.country_id ? parseInt(selectedRowDetails.value.country_id) : '';
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
        } else {
            if (patientStore.selectedPatient && patientStore.selectedPatient.id != null) { 
                // console.log('Selected Patient : ', patientStore.selectedPatient.patient_Id)
                payload.value                   = Object.assign({}, patientStore.selectedPatient);
                payload.value.patient_Id        = patientStore.selectedPatient.patient_Id ? patientStore.selectedPatient.patient_Id : '';
                payload.value.sex_id            = parseInt(patientStore.selectedPatient.sex_id) ? parseInt(patientStore.selectedPatient.sex_id) : '';
                payload.value.suffix_id         = parseInt(patientStore.selectedPatient.suffix_id) ? parseInt(patientStore.selectedPatient.suffix_id) : '';
                payload.value.civilstatus_id    = parseInt(patientStore.selectedPatient.civilstatus_id) ? parseInt(patientStore.selectedPatient.civilstatus_id) : '';
                payload.value.birthdate         = useDateMMDDYYY(patientStore.selectedPatient.birthdate) ? useDateMMDDYYY(patientStore.selectedPatient.birthdate) : '';
                payload.value.case_No           = selectedRowDetails.value.patient_registry && selectedRowDetails.value.patient_registry[0].case_No ? selectedRowDetails.value.patient_registry[0].case_No : '';
                payload.value.registry_Date     = useDateMMDDYYY(patientStore.selectedPatient.registry_Date) ? useDateMMDDYYY(patientStore.selectedPatient.registry_Date) : '';
                payload.value.mscPrice_Groups   = patientStore.selectedPatient.patient_registry_details && parseInt(patientStore.selectedPatient.patient_registry_details.mscPrice_Groups) ? parseInt(patientStore.selectedPatient.patient_registry_details.mscPrice_Groups) : '';
                payload.value.mscPrice_Schemes  = patientStore.selectedPatient.patient_registry_details && parseInt(patientStore.selectedPatient.patient_registry_details.mscPrice_Schemes) ? parseInt(patientStore.selectedPatient.patient_registry_details.mscPrice_Schemes) : '';
                payload.value.religion_id       = parseInt(patientStore.selectedPatient.religion_id) ? parseInt(patientStore.selectedPatient.religion_id) : '';
                payload.value.nationality_id    = parseInt(patientStore.selectedPatient.nationality_id) ? parseInt(patientStore.selectedPatient.nationality_id) : '';
        
                // For HMO GUARANTORS
                const Guarantor = ref([]);
                if (patientStore.selectedPatient.patient_registry_details) {
                    patientStore.selectedPatient.patient_registry_details.guarantor_Approval_date = useDateMMDDYYY(patientStore.selectedPatient.patient_registry_details.guarantor_Approval_date);
                    patientStore.selectedPatient.patient_registry_details.guarantor_Validity_date = useDateMMDDYYY(patientStore.selectedPatient.patient_registry_details.guarantor_Validity_date);
                    Guarantor.value.push(patientStore.selectedPatient.patient_registry_details)
                }
                payload.value.selectedGuarantor = Guarantor.value;
        
                // For CONSULTANTS
                const Consultant = ref([]);
                if (patientStore.selectedPatient.patient_registry_details) {
                    Consultant.value.push(patientStore.selectedPatient.patient_registry_details)
                }
                payload.value.selectedConsultant    = Consultant.value;
                payload.value.registry_remarks      = patientStore.selectedPatient.patient_registry_details && patientStore.selected
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