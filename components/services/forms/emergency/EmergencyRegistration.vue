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
                    <v-toolbar-title>Emergency Case Registration Form</v-toolbar-title>
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
                                    <ER-Patient-Basic-Info :clicked_option="clicked_option" :formErrors="formErrors" :payload="payload" />
                                </v-window-item>
                                <v-window-item class="pa-1">
                                    <ER-Registry-Basic-Info :clicked_option="clicked_option" :formErrors="formErrors" :payload="payload" :form_type="formType" @toggle-loader="handleLoader" @update-progress="updateProgress" />
                                </v-window-item>
                                <v-window-item class="pa-1">
                                    <ER-Other-Details-Info :clicked_option="clicked_option" :formErrors="formErrors" :payload="payload" :form_type="formType" />
                                </v-window-item>
                                <v-window-item class="pa-1">
                                    <ER-HMO-Info :clicked_option="clicked_option" :payload="payload" />
                                </v-window-item>
                                <v-window-item class="pa-1">
                                    <ER-Consultant-Info :clicked_option="clicked_option" :payload="payload" />
                                </v-window-item>
                                <v-window-item class="pa-1">
                                    <ER-Allergies-Info :clicked_option="clicked_option" :payload="payload" />
                                </v-window-item>
                                <v-window-item class="pa-1">
                                    <ER-Remarks-Info :clicked_option="clicked_option" :payload="payload" />
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

            <Confirmation 
                :show="showDialog"
                :payload="payload"
                :loading="isLoading"
                @submit="onSubmit"
                @close="closeConfirmDialog"
            />
        </v-form>
    </v-dialog>
    <v-snackbar
        v-model="showSnackbar"
        :timeout="2000"
        color="#D50000"
        elevation="24"
        location="top right"
        multi-line="true"
    >
        <p><strong>ERROR! </strong>Incorrect password</p>
    </v-snackbar>
</template>

<script setup>
    import { usePatientStore } from '@/store/selectedPatient';
    const { selectedRowDetails } = storeToRefs(useSubcomponentSelectedRowDetailsStore());
    const patientStore = usePatientStore();
    const props = defineProps({
        form_dialog: {
            type:Boolean,
            default:()=>false
        },
        clicked_option: {
            type: String,
            default: () => ''
        }
    });
    const showSnackbar = ref(false);
    const showDialog = ref(false);
    const isVisible = ref(false);
    const value = ref(0);

    const handleLoader = (status) => {
        isVisible.value = status;
    }

    const updateProgress = (progress) => {
        value.value = progress;
    };

    let tab = ref("0");
    const formErrors = ref({});
    const formType = ref('emergency');
    const isLoadingBtn = ref(false);
    const findTabIndexByError = (field) => {
        switch (field) {
            case "lastname": return "0";
            case "firstname": return "0";
            case "sex_id": return "0";
            case "civilstatus_id": return "0";
            case "birthdate": return "0";
            case "mscAccount_Trans_Types": return "1";
            case "dateOfDeath": return "1";
            case "registry_Date": return "0";
            case "mscAccount_Type": return "1";
            case "mscPrice_Groups": return "1";
            case "mscPrice_Schemes": return "1";
            case "chief_Complaint_Description": return "2";
            default: return "0";
        }
    }

    const focusField = (fieldName) => {
        const fieldRef = $refs[fieldName];
        if (fieldRef && fieldRef.focus) {
            fieldRef.focus();
        }
    }

    const payload = ref({
        address: {},
        referred_From_HCI_address: {},
        referred_To_HCI_address: {},
        selectedConsultant: [],
    });

    const isLoading = ref(false);
    const emits = defineEmits(['close-dialog', 'patient-registered']);
    const patientDetail = ref({});

    const closeDialog = () => {
        showDialog.value = false;
        emits('close-dialog');
        tab.value = "0";
        payload.value = {};
        formErrors.value = {};
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
        // if (!payload.value.register_Source) {
        //     formErrors.value.register_Source = "Register Source is required";
        //     valid.value = false;
        // }
        // if (!payload.value.register_Casetype) {
        //     formErrors.value.register_Casetype = "Register Casetype is required";
        //     valid.value = false;
        // }
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
        if (!payload.value.chief_Complaint_Description) {
            formErrors.value.chief_Complaint_Description = "Clinical chief complaint is required";
            valid.value = false;
        }
        if(payload.value.dead_on_arrival && !payload.value.dateOfDeath) {
            formErrors.value.dateOfDeath = "Date of Death is Required"
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
    const closeConfirmDialog = () => {
        showDialog.value = false;
    }
    const onSubmit = async () => {
        try {
            isLoading.value = true;
            let response;
            if (payload.value.id) {
                response = await useMethod("put", "update-patient", payload.value, "", payload.value.patient_Id);
                if (response) {
                    useSnackbar(true, "green", response.message);
                    patientDetail.value = response.data; 
                    emits('patient-registered', patientDetail.value);
                }
            } else {
                console.log('Payload : ', payload.value);
                response = await useMethod("post", "register-patient", payload.value);
                if (response) {
                    useSnackbar(true, "green", response.message);
                    payload.value = {};
                    patientDetail.value = response.data;
                    emits('patient-registered', patientDetail.value);
                }
            }
        } catch (error) {
            console.error("Error in submission:", error);
            useSnackbar(true, "red", error.message || 'An error occurred');
        } finally {
            isLoading.value = false;
            closeDialog();
        }
    };

    onUpdated(() => {
        if (selectedRowDetails.value && selectedRowDetails.value.id) {
            payload.value                               = Object.assign({}, selectedRowDetails.value);
            payload.value.middlename                    = selectedRowDetails.value.middlename ? selectedRowDetails.value.middlename : '';
            payload.value.telephone_number              = selectedRowDetails.value.telephone_number ? selectedRowDetails.value.telephone_number : '';
            payload.value.mobile_number                 = selectedRowDetails.value.mobile_number ? selectedRowDetails.value.mobile_number : '';
            payload.value.email_address                 = selectedRowDetails.value.email_address ? selectedRowDetails.value.email_address : '';
            payload.value.sex_id                        = parseInt(selectedRowDetails.value.sex_id) ? parseInt(selectedRowDetails.value.sex_id) : '';
            payload.value.suffix_id                     = parseInt(selectedRowDetails.value.suffix_id) ? parseInt(selectedRowDetails.value.suffix_id) : '';
            payload.value.civilstatus_id                = parseInt(selectedRowDetails.value.civilstatus_id) ? parseInt(selectedRowDetails.value.civilstatus_id) : '';
            payload.value.birthdate                     = useDateMMDDYYY(selectedRowDetails.value.birthdate) ? useDateMMDDYYY(selectedRowDetails.value.birthdate) : '';
            //Parent or Guardias on Record
            payload.value.motherLastname                = selectedRowDetails.value.motherLastname ? selectedRowDetails.value.motherLastname : '';
            payload.value.motherFirstname               = selectedRowDetails.value.motherFirstname ? selectedRowDetails.value.motherFirstname : '';
            payload.value.motherMiddlename              = selectedRowDetails.value.motherMiddlename ? selectedRowDetails.value.motherMiddlename : '';
            payload.value.motherSuffix_id               = selectedRowDetails.value.motherSuffix_id ? selectedRowDetails.value.motherSuffix_id : '';
            payload.value.motherBirthdate               = selectedRowDetails.value.motherBirthdate ? useDateMMDDYYY(selectedRowDetails.value.motherBirthdate) : '';
            payload.value.mothertelephone_number        = selectedRowDetails.value.mothertelephone_number ? selectedRowDetails.value.mothertelephone_number : '';
            payload.value.mothermobile_number           = selectedRowDetails.value.mothermobile_number ? selectedRowDetails.value.mothermobile_number : '';
            
            payload.value.fatherLastname                = selectedRowDetails.value.fatherLastname ? selectedRowDetails.value.fatherLastname : '';
            payload.value.fatherFirstname               = selectedRowDetails.value.fatherFirstname ? selectedRowDetails.value.fatherFirstname : '';
            payload.value.fatherMiddlename              = selectedRowDetails.value.fatherMiddlename ? selectedRowDetails.value.fatherMiddlename : '';
            payload.value.fatherSuffix_id               = selectedRowDetails.value.fatherSuffix_id ? selectedRowDetails.value.fatherSuffix_id : '';
            payload.value.fatherBirthdate               = selectedRowDetails.value.fatherBirthdate ? useDateMMDDYYY(selectedRowDetails.value.fatherBirthdate) : '';
            payload.value.fathertelephone_number        = selectedRowDetails.value.fathertelephone_number ? selectedRowDetails.value.fathertelephone_number : '';
            payload.value.fathermobile_number           = selectedRowDetails.value.fathermobile_number ? selectedRowDetails.value.fathermobile_number : '';

            payload.value.spLastname                    = selectedRowDetails.value.spLastname ? selectedRowDetails.value.spLastname : '';
            payload.value.spFirstname                   = selectedRowDetails.value.spFirstname ? selectedRowDetails.value.spFirstname : '';
            payload.value.spMiddlename                  = selectedRowDetails.value.spMiddlename ? selectedRowDetails.value.spMiddlename : '';
            payload.value.spSuffix_id                   = selectedRowDetails.value.spSuffix_id ? selectedRowDetails.value.spSuffix_id : '';
            payload.value.spBirthdate                   = selectedRowDetails.value.spBirthdate ? useDateMMDDYYY(selectedRowDetails.value.spBirthdate) : '';
            payload.value.sptelephone_number            = selectedRowDetails.value.sptelephone_number ? selectedRowDetails.value.sptelephone_number : '';
            payload.value.spmobile_number               = selectedRowDetails.value.spmobile_number ? selectedRowDetails.value.spmobile_number : '';

            payload.value.case_No                       = selectedRowDetails.value.patient_registry && selectedRowDetails.value.patient_registry[0].case_No ? selectedRowDetails.value.patient_registry[0].case_No : '';
            payload.value.er_Case_No                    = selectedRowDetails.value.patient_registry && parseInt(selectedRowDetails.value.patient_registry[0].er_Case_No) ? parseInt(selectedRowDetails.value.patient_registry[0].er_Case_No) : '';
            payload.value.registry_Date                 = useDateMMDDYYY(selectedRowDetails.value.registry_Date) ? useDateMMDDYYY(selectedRowDetails.value.registry_Date) : '';
            payload.value.mscAccount_Type               = selectedRowDetails.value.patient_registry && parseInt(selectedRowDetails.value.patient_registry[0].mscAccount_Type) ? parseInt(selectedRowDetails.value.patient_registry.mscAccount_Type) : '';
            payload.value.mscPrice_Groups               = selectedRowDetails.value.patient_registry && parseInt(selectedRowDetails.value.patient_registry[0].mscPrice_Groups) ? parseInt(selectedRowDetails.value.patient_registry.mscPrice_Groups) : '';
            payload.value.mscPrice_Schemes              = selectedRowDetails.value.patient_registry && parseInt(selectedRowDetails.value.patient_registry[0].mscPrice_Schemes) ? parseInt(selectedRowDetails.value.patient_registry.mscPrice_Schemes) : '';
            payload.value.religion_id                   = parseInt(selectedRowDetails.value.religion_id) ? parseInt(selectedRowDetails.value.religion_id) : '';
            payload.value.nationality_id                = parseInt(selectedRowDetails.value.nationality_id) ? parseInt(selectedRowDetails.value.nationality_id) : '';
            payload.value.telephone_number              = selectedRowDetails.value.telephone_number ? selectedRowDetails.value.telephone_number : ''; 
            payload.value.mobile_number                 = selectedRowDetails.value.mobile_number ? selectedRowDetails.value.mobile_number : '';
            // ADDRESS      
            const Address = ref({});
            Address.value.bldgstreet                    = selectedRowDetails.value.bldgstreet ? selectedRowDetails.value.bldgstreet : '';
            Address.value.region_id                     = parseInt(selectedRowDetails.value.region_id) ? parseInt(selectedRowDetails.value.region_id) : '';
            Address.value.province_id                   = parseInt(selectedRowDetails.value.province_id) ? parseInt(selectedRowDetails.value.province_id) : '';
            Address.value.municipality_id               = parseInt(selectedRowDetails.value.municipality_id) ? parseInt(selectedRowDetails.value.municipality_id) : '';
            Address.value.barangay_id                   = parseInt(selectedRowDetails.value.barangay_id) ? parseInt(selectedRowDetails.value.barangay_id) : '';
            Address.value.country_id                    = parseInt(selectedRowDetails.value.country_id) ? parseInt(selectedRowDetails.value.country_id) : '';
            payload.value.address                       = Address.value;

            // REGISTRY
            payload.value.mscAccount_Type               = selectedRowDetails.value.patient_registry && parseInt(selectedRowDetails.value.patient_registry[0].mscAccount_Type) ? parseInt(selectedRowDetails.value.patient_registry[0].mscAccount_Type) : '';
            payload.value.register_Source               = selectedRowDetails.value.patient_registry && parseInt(selectedRowDetails.value.patient_registry[0].register_Source) ? parseInt(selectedRowDetails.value.patient_registry[0].register_Source) : '';
            payload.value.register_Casetype             = selectedRowDetails.value.patient_registry && parseInt(selectedRowDetails.value.patient_registry[0].register_Casetype) ? parseInt(selectedRowDetails.value.patient_registry[0].register_Casetype) : '';
            payload.value.mscBroughtBy_Relationship_Id  = selectedRowDetails.value.patient_registry && parseInt(selectedRowDetails.value.patient_registry[0].mscBroughtBy_Relationship_Id) ? parseInt(selectedRowDetails.value.patient_registry[0].mscBroughtBy_Relationship_Id) : '';
            payload.value.mscService_Type               = selectedRowDetails.value.patient_registry && parseInt(selectedRowDetails.value.patient_registry[0].mscService_Type) ? parseInt(selectedRowDetails.value.patient_registry[0].mscService_Type) : '';
            payload.value.er_Bedno                      = selectedRowDetails.value.patient_registry && selectedRowDetails.value.patient_registry[0].er_Bedno ? selectedRowDetails.value.patient_registry[0].er_Bedno : '';
            payload.value.referred_From_HCI             = selectedRowDetails.value.patient_registry && selectedRowDetails.value.patient_registry[0].referred_From_HCI ? selectedRowDetails.value.patient_registry[0].referred_From_HCI : '';
            payload.value.referred_From_HCI_code        = selectedRowDetails.value.patient_registry && selectedRowDetails.value.patient_registry[0].referred_From_HCI_code ? selectedRowDetails.value.patient_registry[0].referred_From_HCI_code : '';
            payload.value.referred_To_HCI               = selectedRowDetails.value.patient_registry && selectedRowDetails.value.patient_registry[0].referred_To_HCI ? selectedRowDetails.value.patient_registry[0].referred_To_HCI : '';
            payload.value.referred_To_HCI_code          = selectedRowDetails.value.patient_registry && selectedRowDetails.value.patient_registry[0].referred_To_HCI_code ? selectedRowDetails.value.patient_registry[0].referred_To_HCI_code : '';
            payload.value.referred_From_HCI_address     = selectedRowDetails.value.patient_registry && selectedRowDetails.value.patient_registry[0].referred_From_HCI_address ? selectedRowDetails.value.patient_registry[0].referred_From_HCI_address : '';
            payload.value.referred_To_HCI_address       = selectedRowDetails.value.patient_registry && selectedRowDetails.value.patient_registry[0].referred_To_HCI_address ? selectedRowDetails.value.patient_registry[0].referred_To_HCI_address : '';
            payload.value.referring_Doctor              = selectedRowDetails.value.patient_registry && selectedRowDetails.value.patient_registry[0].referring_Doctor ? selectedRowDetails.value.patient_registry[0].referring_Doctor : '';
            payload.value.referral_Reason               = selectedRowDetails.value.patient_registry && selectedRowDetails.value.patient_registry[0].referral_Reason ? selectedRowDetails.value.patient_registry[0].referral_Reason : '';
            
            // OTHER DETAILS
            payload.value.chief_Complaint_Description   = selectedRowDetails.value.patient_registry && selectedRowDetails.value.patient_registry[0].chief_Complaint_Description ? selectedRowDetails.value.patient_registry[0].chief_Complaint_Description : '';
            payload.value.bloodPressureSystolic         = selectedRowDetails.value.patient_registry && selectedRowDetails.value.patient_registry[0].bloodPressureSystolic ? selectedRowDetails.value.patient_registry[0].bloodPressureSystolic : '';
            payload.value.bloodPressureDiastolic        = selectedRowDetails.value.patient_registry && selectedRowDetails.value.patient_registry[0].bloodPressureDiastolic ? selectedRowDetails.value.patient_registry[0].bloodPressureDiastolic : '';
            payload.value.temperature                   = selectedRowDetails.value.patient_registry && selectedRowDetails.value.patient_registry[0].temperatute ? selectedRowDetails.value.patient_registry[0].temperatute : '';
            payload.value.pulseRate                     = selectedRowDetails.value.patient_registry && selectedRowDetails.value.patient_registry[0].pulseRate ? selectedRowDetails.value.patient_registry[0].pulseRate : '';
            payload.value.respiratoryRate               = selectedRowDetails.value.patient_registry && selectedRowDetails.value.patient_registry[0].respiratoryRate ? selectedRowDetails.value.patient_registry[0].respiratoryRate : '';
            payload.value.oxygenSaturation              = selectedRowDetails.value.patient_registry && selectedRowDetails.value.patient_registry[0].oxygenSaturation ? selectedRowDetails.value.patient_registry[0].oxygenSaturation : '';
           
            // For HMO GUARANTORS
            const Guarantor = ref([]);
            if (selectedRowDetails.value.patient_registry && selectedRowDetails.value.patient_registry[0].guarantor_Id != null) {
                let guarantor_Id                        = selectedRowDetails.value.patient_registry[0].guarantor_Id ? selectedRowDetails.value.patient_registry[0].guarantor_Id : '';
                let guarantor_name                      = selectedRowDetails.value.patient_registry[0].guarantor_Name ? selectedRowDetails.value.patient_registry[0].guarantor_Name : '';
                let guarantor_Approval_code             = selectedRowDetails.value.patient_registry[0].guarantor_Approval_code ? selectedRowDetails.value.patient_registry[0].guarantor_Approval_code : '';
                let guarantor_Approval_no               = selectedRowDetails.value.patient_registry[0].guarantor_Approval_no ? selectedRowDetails.value.patient_registry[0].guarantor_Approval_no : '';
                let guarantor_Approval_date             = useDateMMDDYYY(selectedRowDetails.value.patient_registry[0].guarantor_Approval_date) ? useDateMMDDYYY(selectedRowDetails.value.patient_registry[0].guarantor_Approval_date) : '';
                let guarantor_Validity_date             = useDateMMDDYYY(selectedRowDetails.value.patient_registry[0].guarantor_Validity_date) ? useDateMMDDYYY(selectedRowDetails.value.patient_registry[0].guarantor_Validity_date) : '';
                let guarantor_Credit_Limit              = selectedRowDetails.value.patient_registry[0].guarantor_Credit_Limit ? selectedRowDetails.value.patient_registry[0].guarantor_Credit_Limit : '';
                
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
                let attending_Doctor = selectedRowDetails.value.patient_registry[0].attending_Doctor.trim() ? selectedRowDetails.value.patient_registry[0].attending_Doctor.trim() : '';
                let attending_Doctor_fullname = selectedRowDetails.value.patient_registry[0].attending_Doctor_fullname.trim() ? selectedRowDetails.value.patient_registry[0].attending_Doctor_fullname.trim() : '';
                
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
            if (patientStore.selectedPatient && patientStore.selectedPatient.id) { 
                payload.value                   = Object.assign({}, patientStore.selectedPatient);
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
                payload.value.registry_remarks      = patientStore.selectedPatient.patient_registry_details && patientStore.selectedPatient.patient_registry_details.registry_remarks ? patientStore.selectedPatient.patient_registry_details.registry_remarks : '';
            }
        }
    });

</script>

<style scoped>
    .scrollable-content {
        overflow-y: auto;
        max-height: calc(100vh - 200px); 
    }

    .v-progress-circular {
        margin: 1rem;
    }

    .data-loader {
        position: fixed;
        top: 0;
        left: 0;
        width: 80vw;
        height: 100vh;
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: rgba(0, 0, 0, 0.1);
        z-index: 99999;
    }

    .overlay {
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .v-card {
        position: relative !important;
        z-index: auto !important;
    }
</style>