<template>
    <v-dialog :model-value="show" rounded="lg" scrollable @update:model-value="closeDialog" max-width="1120px">
        <form @submit.prevent="onSubmit">
            <v-card rounded="lg">
                <v-card-title class="pa-0">
                    <v-toolbar density="compact" color="#6984ff" hide-details>
                        <v-toolbar-title>PhilHealth Claim Form for Processing {{ selectedRowDetails.id }}</v-toolbar-title>
                        <v-btn color="white" @click="closeDialog">
                            <v-icon>mdi-close</v-icon>
                        </v-btn>
                    </v-toolbar>
                    <v-tabs v-model="tab" color="#2a73c5">
                        <v-tab value="0"><v-icon start>mdi-form-select</v-icon>First Page</v-tab>
                        <v-tab value="1"><v-icon start>mdi-form-select</v-icon>Second Page</v-tab>
                    </v-tabs>
                </v-card-title>
                <v-divider></v-divider>
                <v-card-text style="max-height: auto">
                    <v-window v-model="tab">
                        <v-row>
                            <v-col cols="12">
                                <v-window-item class="pa-1">
                                    <v-card elevation="4">
                                        <v-card-text>
                                            <v-list-subheader class="sub-header">I. Health Care Institution ( HCI ) Information</v-list-subheader>
                                            <v-row>
                                                <v-col cols="6">
                                                    <v-text-field 
                                                        label="Name of HCI"
                                                        v-model="payload.hci_name"
                                                        density="compact"
                                                        hide-details
                                                        variant="outlined"
                                                        readonly
                                                    ></v-text-field>
                                                </v-col>
                                                <v-col col="6">
                                                    <v-text-field 
                                                        type="number"
                                                        label="Accreditation No."
                                                        v-model="payload.accreditation_no"
                                                        density="compact"
                                                        hide-details
                                                        variant="outlined"
                                                        readonly
                                                    ></v-text-field>
                                                </v-col>
                                                <v-col cols="12" class="form-col">
                                                    <v-text-field 
                                                        label="Address of HCI"
                                                        v-model="payload.hci_address"
                                                        density="compact"
                                                        hide-details
                                                        variant="outlined"
                                                        readonly
                                                    ></v-text-field>
                                                </v-col>
                                            </v-row>
                                        </v-card-text>
                                    </v-card>
                                    <v-card elevation="4" class="mt-2">
                                        <v-card-text>
                                            <v-list-subheader class="sub-header">II. Patient's Data</v-list-subheader>
                                            <v-row>
                                                <v-col cols="3">
                                                    <v-text-field 
                                                        label="Last Name"
                                                        v-model="payload.lastname"
                                                        density="compact"
                                                        hide-details
                                                        variant="outlined"
                                                        readonly
                                                    ></v-text-field>
                                                </v-col>
                                                <v-col cols="3">
                                                    <v-text-field 
                                                        label="First Name"
                                                        v-model="payload.firstname"
                                                        density="compact"
                                                        hide-details
                                                        variant="outlined"
                                                        readonly
                                                    ></v-text-field>
                                                </v-col>
                                                <v-col cols="3">
                                                    <v-text-field 
                                                        label="Middle Name"
                                                        v-model="payload.middlename"
                                                        density="compact"
                                                        hide-details
                                                        variant="outlined"
                                                        readonly
                                                    ></v-text-field>
                                                </v-col>
                                                <v-col cols="3">
                                                    <v-text-field 
                                                        label="Suffix"
                                                        v-model="payload.suffix"
                                                        density="compact"
                                                        hide-details
                                                        variant="outlined"
                                                        readonly
                                                    ></v-text-field>
                                                </v-col>
                                            </v-row>
                                            <v-row>
                                                <v-col cols="6">
                                                    <v-row>
                                                        <v-col cols="12" class="form-col">
                                                            <v-textarea 
                                                                label="Chief Complaint"
                                                                v-model="payload.chief_complaint"
                                                                variant="outlined"
                                                                density="compact"
                                                                hide-details
                                                            ></v-textarea>
                                                        </v-col>
                                                        <v-col cols="12" class="form-col">
                                                            <v-textarea 
                                                                label="Admitting Diagnosis"
                                                                v-model="payload.admitting_diagnosis"
                                                                variant="outlined"
                                                                density="compact"
                                                                hide-details
                                                                readonly
                                                            ></v-textarea>
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
                                                </v-col>
                                                <v-col cols="6">
                                                    <v-row>
                                                        <v-col cols="12" class="form-col">
                                                            <v-text-field 
                                                                type="number"
                                                                label="PIN"
                                                                v-model="payload.pin"
                                                                density="compact"
                                                                hide-details
                                                                variant="outlined"
                                                                readonly
                                                            ></v-text-field>
                                                        </v-col>
                                                        <v-col cols="12" class="form-col">
                                                            <v-text-field 
                                                                type="number"
                                                                label="Age"
                                                                v-model="payload.age"
                                                                density="compact"
                                                                hide-details
                                                                variant="outlined"
                                                                readonly
                                                            ></v-text-field>
                                                        </v-col>
                                                        <v-col cols="12" class="form-col">
                                                            <v-text-field 
                                                                type="date"
                                                                label="Birthdate"
                                                                v-model="payload.birthdate"
                                                                density="compact"
                                                                hide-details
                                                                variant="outlined"
                                                                readonly
                                                            ></v-text-field>
                                                        </v-col>
                                                        <v-col cols="12" class="form-col">
                                                            <v-text-field 
                                                                label="Sex / Gender"
                                                                v-model="payload.sex"
                                                                density="compact"
                                                                hide-details
                                                                variant="outlined"
                                                                readonly
                                                            ></v-text-field>
                                                        </v-col>
                                                        <v-col cols="12" class="form-col">
                                                            <v-text-field 
                                                                label="1st Case rate code"
                                                                v-model="payload.first_case_rate_code"
                                                                density="compact"
                                                                hide-details
                                                                variant="outlined"
                                                                readonly
                                                            ></v-text-field>
                                                        </v-col>
                                                        <v-col cols="12" class="form-col">
                                                            <v-text-field 
                                                                label="2nd Case rate code"
                                                                v-model="payload.second_case_rate_code"
                                                                density="compact"
                                                                hide-details
                                                                variant="outlined"
                                                                readonly
                                                            ></v-text-field>
                                                        </v-col>
                                                        <v-col cols="6" class="form-col">
                                                            <v-text-field 
                                                                type="date"
                                                                label="Date Admitted"
                                                                v-model="payload.date_admitted"
                                                                density="compact"
                                                                hide-details
                                                                variant="outlined"
                                                                readonly
                                                            ></v-text-field>
                                                        </v-col>
                                                        <v-col cols="6" class="form-col">
                                                            <v-text-field 
                                                                label="Time Admitted"
                                                                v-model="payload.time_admitted"
                                                                density="compact"
                                                                hide-details
                                                                variant="outlined"
                                                                readonly
                                                            ></v-text-field>
                                                        </v-col>
                                                        <v-col cols="6" class="form-col">
                                                            <v-text-field 
                                                                type="date"
                                                                label="Date Discharge"
                                                                v-model="payload.date_discharge"
                                                                density="compact"
                                                                hide-details
                                                                variant="outlined"
                                                                readonly
                                                            ></v-text-field>
                                                        </v-col>
                                                        <v-col cols="6" class="form-col">
                                                            <v-text-field 
                                                                label="Time Discharge"
                                                                v-model="payload.time_discharge"
                                                                density="compact"
                                                                hide-details
                                                                variant="outlined"
                                                                readonly
                                                            ></v-text-field>
                                                        </v-col>
                                                    </v-row>
                                                </v-col>
                                            </v-row>
                                        </v-card-text>
                                    </v-card>
                                    <v-card elevation="4" class="mt-2">
                                        <v-card-text>
                                            <v-list-subheader class="sub-header">III. Reason for Admission</v-list-subheader>
                                            <v-row>
                                                <v-col cols="6">
                                                    <v-textarea 
                                                        label="History of Present Illness"
                                                        v-model="payload.history_of_present_illness"
                                                        variant="outlined"
                                                        density="compact"
                                                        hide-details
                                                    ></v-textarea>
                                                </v-col>
                                                <v-col cols="6">
                                                    <v-textarea 
                                                        label="Pertinent Past Medical History"
                                                        v-model="payload.pertinent_past_medical_history"
                                                        variant="outlined"
                                                        density="compact"
                                                        hide-details
                                                    ></v-textarea>
                                                </v-col>
                                            </v-row>
                                            <v-list-subheader v-if="user_gender === 'Female'"> * OB / GYN History</v-list-subheader>
                                            <v-row v-if="user_gender === 'Female'">
                                                <v-col cols="4">
                                                    <v-row>
                                                        <v-col cols="12">
                                                            <v-text-field 
                                                                type="number"
                                                                label="Gravidity ( Pregnancy Count )"
                                                                v-model="payload.gravidity"
                                                                density="compact"
                                                                hide-details
                                                                variant="outlined"
                                                                readonly
                                                            ></v-text-field>
                                                        </v-col>
                                                        <v-col cols="12" class="form-col">
                                                            <v-text-field 
                                                                type="number"
                                                                label="Parity ( Delivery Count )"
                                                                v-model="payload.parity"
                                                                density="compact"
                                                                hide-details
                                                                variant="outlined"
                                                                readonly
                                                            ></v-text-field>
                                                        </v-col>
                                                    </v-row>                                                    
                                                </v-col>
                                                <v-col cols="4">
                                                    <v-row>
                                                        <v-col cols="12">
                                                            <v-text-field 
                                                                type="number"
                                                                label="Obstetrics Code"
                                                                v-model="payload.obstetrics_code"
                                                                density="compact"
                                                                hide-details
                                                                variant="outlined"
                                                                readonly
                                                            ></v-text-field>
                                                        </v-col>
                                                        <v-col cols="12" class="form-col">
                                                            <v-text-field 
                                                                type="number"
                                                                label="Full Term Pregnancy"
                                                                v-model="payload.full_term_pregnancy"
                                                                density="compact"
                                                                hide-details
                                                                variant="outlined"
                                                                readonly
                                                            ></v-text-field>
                                                        </v-col>
                                                        <v-col cols="12" class="form-col">
                                                            <v-text-field 
                                                                type="number"
                                                                label="Premature Pregnancy"
                                                                v-model="payload.premature_pregnancy"
                                                                density="compact"
                                                                hide-details
                                                                variant="outlined"
                                                                readonly
                                                            ></v-text-field>
                                                        </v-col>
                                                        <v-col cols="12" class="form-col">
                                                            <v-text-field 
                                                                type="number"
                                                                label="No. of Abortion"
                                                                v-model="payload.no_of_abortion"
                                                                density="compact"
                                                                hide-details
                                                                variant="outlined"
                                                                readonly
                                                            ></v-text-field>
                                                        </v-col>
                                                        <v-col cols="12" class="form-col">
                                                            <v-text-field 
                                                                type="number"
                                                                label="No. of Living Children"
                                                                v-model="payload.no_of_living_children"
                                                                density="compact"
                                                                hide-details
                                                                variant="outlined"
                                                                readonly
                                                            ></v-text-field>
                                                        </v-col>
                                                    </v-row>                                                   
                                                </v-col>
                                                <v-col cols="4">
                                                    <v-row>
                                                        <v-col cols="12">
                                                            <v-text-field 
                                                                type="number"
                                                                label="Age of First Menstruation"
                                                                v-model="payload.age_of_first_menstruation"
                                                                density="compact"
                                                                hide-details
                                                                variant="outlined"
                                                                readonly
                                                            ></v-text-field>
                                                        </v-col>
                                                        <v-col cols="12" class="form-col">
                                                            <v-text-field 
                                                                label="Period Duration"
                                                                v-model="payload.period_duration"
                                                                density="compact"
                                                                hide-details
                                                                variant="outlined"
                                                                readonly
                                                            ></v-text-field>
                                                        </v-col>
                                                        <v-col cols="12" class="form-col">
                                                            <v-text-field 
                                                                label="LMP"
                                                                v-model="payload.lmp"
                                                                density="compact"
                                                                hide-details
                                                                variant="outlined"
                                                                readonly
                                                            ></v-text-field>
                                                        </v-col>
                                                    </v-row>                                                      
                                                </v-col>
                                            </v-row>
                                            <v-list-subheader> * Pertinent Signs and Symptoms: ( Please check at least one )</v-list-subheader>
                                            <v-row>
                                                <v-col cols="3">
                                                    <v-checkbox label="Altered mental sensorium" v-model="payload.altered_mental_sensorium" density="compact" hide-details></v-checkbox>
                                                    <v-checkbox label="Abdominal cramp/pain" v-model="payload.abdominal_cramp" density="compact" hide-details></v-checkbox>
                                                    <v-checkbox label="Anorexia" v-model="payload.anorexia" density="compact" hide-details></v-checkbox>
                                                    <v-checkbox label="Bleeding gums" v-model="payload.bleeding_gums" density="compact" hide-details></v-checkbox>
                                                    <v-checkbox label="Body weakness" v-model="payload.body_weakness" density="compact" hide-details></v-checkbox>
                                                    <v-checkbox label="Blurring vision" v-model="payload.blurring_vision" density="compact" hide-details></v-checkbox>
                                                    <v-checkbox label="Chest pain/discomfort" v-model="payload.chest_pain" density="compact" hide-details></v-checkbox>
                                                    <v-checkbox label="Constipation" v-model="payload.constipation" density="compact" hide-details></v-checkbox>
                                                    <v-checkbox label="Cough" v-model="payload.cough" density="compact" hide-details></v-checkbox>
                                                </v-col>
                                                <v-col cols="3">
                                                    <v-checkbox label="Diarrhea" v-model="payload.diarrhea" density="compact" hide-details></v-checkbox>
                                                    <v-checkbox label="Dizziness" v-model="payload.dizziness" density="compact" hide-details></v-checkbox>
                                                    <v-checkbox label="Dysphagia" v-model="payload.dysphagia" density="compact" hide-details></v-checkbox>
                                                    <v-checkbox label="Dyspnea" v-model="payload.dyspnea" density="compact" hide-details></v-checkbox>
                                                    <v-checkbox label="Dysuria" v-model="payload.dysuria" density="compact" hide-details></v-checkbox>
                                                    <v-checkbox label="Epistaxis" v-model="payload.epistaxis" density="compact" hide-details></v-checkbox>
                                                    <v-checkbox label="Fever" v-model="payload.fever" density="compact" hide-details></v-checkbox>
                                                    <v-checkbox label="Frequency of urination" v-model="payload.frequency_of_urination" density="compact" hide-details></v-checkbox>
                                                    <v-checkbox label="Headache" v-model="payload.headache" density="compact" hide-details></v-checkbox>
                                                </v-col>
                                                <v-col cols="3">
                                                    <v-checkbox label="Hematemesis" v-model="payload.hematemesis" density="compact" hide-details></v-checkbox>
                                                    <v-checkbox label="Hematuria" v-model="payload.hematuria" density="compact" hide-details></v-checkbox>
                                                    <v-checkbox label="Hemoptysis" v-model="payload.hemoptysis" density="compact" hide-details></v-checkbox>
                                                    <v-checkbox label="Irritability" v-model="payload.irritability" density="compact" hide-details></v-checkbox>
                                                    <v-checkbox label="Jaundice" v-model="payload.jaundice" density="compact" hide-details></v-checkbox>
                                                    <v-checkbox label="Lower extremity edema" v-model="payload.lower_extremity_edema" density="compact" hide-details></v-checkbox>
                                                    <v-checkbox label="Myalgia" v-model="payload.myalgia" density="compact" hide-details></v-checkbox>
                                                    <v-checkbox label="Orthpnea" v-model="payload.orthpnea" density="compact" hide-details></v-checkbox>
                                                </v-col>
                                                <v-col cols="3">
                                                    <v-checkbox label="Palpitations" v-model="payload.palpitations" density="compact" hide-details></v-checkbox>
                                                    <v-checkbox label="Seizures" v-model="payload.seizures" density="compact" hide-details></v-checkbox>
                                                    <v-checkbox label="Skin rashes" v-model="payload.skin_rashes" density="compact" hide-details></v-checkbox>
                                                    <v-checkbox label="Stool, bloody/black tarry/mucoid" v-model="payload.stool_bloody_mucoid" density="compact" hide-details></v-checkbox>
                                                    <v-checkbox label="Sweating" v-model="payload.sweating" density="compact" hide-details></v-checkbox>
                                                    <v-checkbox label="Urgency" v-model="payload.urgency" density="compact" hide-details></v-checkbox>
                                                    <v-checkbox label="Vomiting" v-model="payload.vomiting" density="compact" hide-details></v-checkbox>
                                                    <v-checkbox label="Weight loss" v-model="payload.weight_loss" density="compact" hide-details></v-checkbox>
                                                </v-col>
                                                <v-col cols="2" class="form-col">
                                                    <v-checkbox label="Pain:" v-model="payload.pain" density="compact" hide-details></v-checkbox>
                                                </v-col>
                                                <v-col cols="10" class="form-col">
                                                    <v-text-field 
                                                        :disabled="!payload.pain"
                                                        label="What kind of pain?"
                                                        variant="outlined"
                                                        density="compact"
                                                        hide-details
                                                    ></v-text-field>
                                                </v-col>
                                                <v-col cols="2" class="form-col">
                                                    <v-checkbox label="Other" v-model="payload.isOther" density="compact" hide-details></v-checkbox>
                                                </v-col>
                                                <v-col cols="10" class="form-col">
                                                    <v-text-field 
                                                        :disabled="!payload.isOther"
                                                        label="Other Signs and Symptoms"
                                                        variant="outlined"
                                                        density="compact"
                                                        hide-details
                                                    ></v-text-field>
                                                </v-col>
                                            </v-row>
                                            <v-list-subheader> * Referred from another Health Care Institution: ( HCI )</v-list-subheader>
                                            <v-row>
                                                <v-col cols="2" style="margin-bottom: -25px;">
                                                    <v-radio-group inline v-model="payload.isReferredFromHCI">
                                                        <v-checkbox label="No" value="0" density="compact" hide-details></v-checkbox>
                                                        <v-checkbox label="Yes" value="1" density="compact" hide-details></v-checkbox>
                                                    </v-radio-group>
                                                </v-col>
                                                <v-col cols="10">
                                                    <v-text-field 
                                                        :disabled="payload.isReferredFromHCI === '0' || !payload.isReferredFromHCI"
                                                        v-model="payload.referred_from_hci_reason"
                                                        label="Reason"
                                                        variant="outlined"
                                                        density="compact"
                                                        hide-details
                                                    ></v-text-field>
                                                </v-col>
                                                <v-col cols="2"></v-col> <!-- Spacer -->
                                                <v-col cols="10" class="form-col">
                                                    <v-text-field
                                                        :disabled="payload.isReferredFromHCI === '0' || !payload.isReferredFromHCI"
                                                        label="Name of the Originating HCI"
                                                        v-model="payload.originating_hci_name"
                                                        variant="outlined"
                                                        density="compact"
                                                        hide-details
                                                    ></v-text-field>
                                                </v-col>
                                            </v-row>
                                            <v-list-subheader> * Physical Examination ( Pertinent Findings per System )</v-list-subheader>
                                            <v-row>
                                                <v-col cols="12">
                                                    <v-row>
                                                        <v-col cols="2">
                                                            <v-list-subheader>General Survey: </v-list-subheader>
                                                        </v-col>
                                                        <v-col cols="5" style="margin-bottom: -25px;">
                                                            <v-radio-group inline v-model="payload.isGeneralSurvey">
                                                                <v-checkbox label="Awake and alert" value="0" density="compact" hide-details></v-checkbox>
                                                                <v-checkbox label="Altered sensorium" value="1" density="compact" hide-details></v-checkbox>
                                                            </v-radio-group>
                                                        </v-col>
                                                        <v-col cols="5">
                                                            <v-text-field 
                                                                :disabled="payload.isGeneralSurvey === '0' || !payload.isGeneralSurvey"
                                                                v-model="payload.general_survey_specify"
                                                                label="Specify"
                                                                variant="outlined"
                                                                density="compact"
                                                                hide-details
                                                            ></v-text-field>
                                                        </v-col>
                                                    </v-row>
                                                </v-col>
                                                <v-col cols="12">
                                                    <v-row>
                                                        <v-col cols="2">
                                                            <v-list-subheader>Vital Signs: </v-list-subheader>
                                                        </v-col>
                                                        <v-col cols="2">
                                                            <v-text-field
                                                                label="Systolic BP"
                                                                v-model="payload.systolic_bp"
                                                                variant="outlined"
                                                                density="compact"
                                                                hide-details
                                                            ></v-text-field>
                                                        </v-col>
                                                        <v-col cols="2">
                                                            <v-text-field
                                                                label="Diastolic BP"
                                                                v-model="payload.diastolic_bp"
                                                                variant="outlined"
                                                                density="compact"
                                                                hide-details
                                                            ></v-text-field>
                                                        </v-col>
                                                        <v-col cols="1">
                                                            <v-text-field
                                                                label="HR"
                                                                variant="outlined"
                                                                v-model="payload.hr"
                                                                density="compact"
                                                                hide-details
                                                            ></v-text-field>
                                                        </v-col>
                                                        <v-col cols="1">
                                                            <v-text-field
                                                                label="RR"
                                                                variant="outlined"
                                                                v-model="payload.rr"
                                                                density="compact"
                                                                hide-details
                                                            ></v-text-field>
                                                        </v-col>
                                                        <v-col cols="4">
                                                            <v-text-field
                                                                label="Temperature (Celsius)"
                                                                v-model="payload.temperature"
                                                                variant="outlined"
                                                                density="compact"
                                                                hide-details
                                                            ></v-text-field>
                                                        </v-col>
                                                    </v-row>
                                                </v-col>
                                            </v-row>
                                        </v-card-text>
                                    </v-card>
                                </v-window-item>
                                <v-window-item class="pa-1">
                                    <v-row>
                                        <v-col cols="12">
                                            <v-row>
                                                <v-col cols="2">
                                                    <v-list-subheader class="sub-header">HEENT </v-list-subheader>
                                                </v-col>
                                                <v-col cols="10">
                                                    <v-row>
                                                        <v-col cols="3">
                                                            <v-checkbox label="Essentially normal" v-model="payload.heent_essentially_normal" density="compact" hide-details></v-checkbox>
                                                            <v-checkbox label="Icteric sclerae" v-model="payload.heent_icteric_sclerae" density="compact" hide-details></v-checkbox>
                                                        </v-col>
                                                        <v-col cols="3">
                                                            <v-checkbox label="Abornal pupillary reaction" v-model="payload.heent_abornal_pupillary_reaction" density="compact" hide-details></v-checkbox>
                                                            <v-checkbox label="Pale conjunctivae" v-model="payload.heent_pale_conjunctivae" density="compact" hide-details></v-checkbox>
                                                        </v-col>
                                                        <v-col cols="3">
                                                            <v-checkbox label="Cervical lympadenopathy" v-model="payload.heent_cervical_lympadenopathy" density="compact" hide-details></v-checkbox>
                                                            <v-checkbox label="Sunken eyeballs" v-model="payload.heent_sunken_eyeballs" density="compact" hide-details></v-checkbox>
                                                        </v-col>
                                                        <v-col cols="3">
                                                            <v-checkbox label="Dry mucous membrane" v-model="payload.heent_dry_mucuous" density="compact" hide-details></v-checkbox>
                                                            <v-checkbox label="Sunken fontanelle" v-model="payload.heent_sunken_fontanelle" density="compact" hide-details></v-checkbox>
                                                        </v-col>
                                                        <v-col cols="2" class="form-col">
                                                            <v-checkbox label="Other" v-model="payload.is_other_heent" density="compact" hide-details></v-checkbox>
                                                        </v-col>
                                                        <v-col cols="10" class="form-col">
                                                            <v-text-field
                                                                label="Specify"
                                                                variant="outlined"
                                                                density="compact"
                                                                hide-details
                                                                :disabled="!payload.is_other_heent"
                                                            ></v-text-field>
                                                        </v-col>
                                                    </v-row>
                                                </v-col>
                                            </v-row>
                                            <v-row>
                                                <v-col cols="2">
                                                    <v-list-subheader class="sub-header">CHEST / LUNGS </v-list-subheader>
                                                </v-col>
                                                <v-col cols="10">
                                                    <v-row>
                                                        <v-col cols="3">
                                                            <v-checkbox label="Essentially normal" v-model="payload.chest_essentially_normal" density="compact" hide-details></v-checkbox>
                                                            <v-checkbox label="Lumps over breast(s)" v-model="payload.chest_lumps_breast" density="compact" hide-details></v-checkbox>
                                                        </v-col>
                                                        <v-col cols="3">
                                                            <v-checkbox label="Asymmetrical chest expansion" v-model="payload.asymmetrical_chest" density="compact" hide-details></v-checkbox>
                                                            <v-checkbox label="Rales/crackles/rhonchi" v-model="payload.rales_crackles_rhonchi" density="compact" hide-details></v-checkbox>
                                                        </v-col>
                                                        <v-col cols="3">
                                                            <v-checkbox label="Decreased breath sounds" v-model="payload.decreased_breath_sounds" density="compact" hide-details></v-checkbox>
                                                            <v-checkbox label="Intercostal rib retraction" v-model="payload.intercostal_rib_retraction" density="compact" hide-details></v-checkbox>
                                                        </v-col>
                                                        <v-col cols="3">
                                                            <v-checkbox label="Wheezes" v-model="payload.wheezes" density="compact" hide-details></v-checkbox>
                                                        </v-col>
                                                        <v-col cols="2" class="form-col">
                                                            <v-checkbox label="Other" v-model="payload.is_other_chestlungs" density="compact" hide-details></v-checkbox>
                                                        </v-col>
                                                        <v-col cols="10" class="form-col">
                                                            <v-text-field
                                                                label="Specify"
                                                                variant="outlined"
                                                                density="compact"
                                                                hide-details
                                                                :disabled="!payload.is_other_chestlungs"
                                                            ></v-text-field>
                                                        </v-col>
                                                    </v-row>
                                                </v-col>
                                            </v-row>
                                            <v-row>
                                                <v-col cols="2">
                                                    <v-list-subheader class="sub-header">CVS </v-list-subheader>
                                                </v-col>
                                                <v-col cols="10">
                                                    <v-row>
                                                        <v-col cols="3">
                                                            <v-checkbox label="Essentially normal" v-model="payload.cvs_essentially_normal" density="compact" hide-details></v-checkbox>
                                                            <v-checkbox label="Irregular rhythm" v-model="payload.cvs_irregular_rhythm" density="compact" hide-details></v-checkbox>
                                                        </v-col>
                                                        <v-col cols="3">
                                                            <v-checkbox label="Displaced apex beat" v-model="payload.displaced_apex_beat" density="compact" hide-details></v-checkbox>
                                                            <v-checkbox label="Muffled heart sounds" v-model="payload.muffled_heart_sounds" density="compact" hide-details></v-checkbox>
                                                        </v-col>
                                                        <v-col cols="3">
                                                            <v-checkbox label="Heave and/or thrills" v-model="payload.heave_thrills" density="compact" hide-details></v-checkbox>
                                                            <v-checkbox label="Murmur" v-model="payload.murmur" density="compact" hide-details></v-checkbox>
                                                        </v-col>
                                                        <v-col cols="3">
                                                            <v-checkbox label="Pericardial buldge" v-model="payload.pericardial_buldge" density="compact" hide-details></v-checkbox>
                                                        </v-col>
                                                        <v-col cols="2" class="form-col">
                                                            <v-checkbox label="Other" v-model="payload.is_other_cvs" density="compact" hide-details></v-checkbox>
                                                        </v-col>
                                                        <v-col cols="10" class="form-col">
                                                            <v-text-field
                                                                label="Specify"
                                                                variant="outlined"
                                                                density="compact"
                                                                hide-details
                                                                :disabled="!payload.is_other_cvs"
                                                            ></v-text-field>
                                                        </v-col>
                                                    </v-row>
                                                </v-col>
                                            </v-row>
                                            <v-row>
                                                <v-col cols="2">
                                                    <v-list-subheader class="sub-header">ABDOMEN </v-list-subheader>
                                                </v-col>
                                                <v-col cols="10">
                                                    <v-row>
                                                        <v-col cols="3">
                                                            <v-checkbox label="Essentially normal" v-model="payload.abdomen_essentailly_normal" density="compact" hide-details></v-checkbox>
                                                            <v-checkbox label="Palpable mass(es)" v-model="payload.abdomen_palpable_mass" density="compact" hide-details></v-checkbox>
                                                        </v-col>
                                                        <v-col cols="3">
                                                            <v-checkbox label="Abdominal rigidity" v-model="payload.abdominal_rigidity" density="compact" hide-details></v-checkbox>
                                                            <v-checkbox label="Tympanitic/dull abdomen" v-model="payload.tympanitic_abdomen" density="compact" hide-details></v-checkbox>
                                                        </v-col>
                                                        <v-col cols="3">
                                                            <v-checkbox label="Abdominal tenderness" v-model="payload.abdominal_tenderness" density="compact" hide-details></v-checkbox>
                                                            <v-checkbox label="Uterine contraction" v-model="payload.uterine_contraction" density="compact" hide-details></v-checkbox>
                                                        </v-col>
                                                        <v-col cols="3">
                                                            <v-checkbox label="Hyperactibe bowl sounds" v-model="payload.hyperactibe_bowl_sounds" density="compact" hide-details></v-checkbox>
                                                        </v-col>
                                                        <v-col cols="2" class="form-col">
                                                            <v-checkbox label="Other" v-model="payload.is_other_abdomen" density="compact" hide-details></v-checkbox>
                                                        </v-col>
                                                        <v-col cols="10" class="form-col">
                                                            <v-text-field
                                                                label="Specify"
                                                                variant="outlined"
                                                                density="compact"
                                                                hide-details
                                                                :disabled="!payload.is_other_abdomen"
                                                            ></v-text-field>
                                                        </v-col>
                                                    </v-row>
                                                </v-col>
                                            </v-row>
                                            <v-row>
                                                <v-col cols="2">
                                                    <v-list-subheader class="sub-header">GU (IE) </v-list-subheader>
                                                </v-col>
                                                <v-col cols="10">
                                                    <v-row>
                                                        <v-col cols="3">
                                                            <v-checkbox label="Essentially normal" v-model="payload.guie_essentially_normal" density="compact" hide-details></v-checkbox>
                                                        </v-col>
                                                        <v-col cols="3">
                                                            <v-checkbox label="Blood stained in examining finger" v-model="payload.guie_blood_stained" density="compact" hide-details></v-checkbox>
                                                        </v-col>
                                                        <v-col cols="3">
                                                            <v-checkbox label="Cervical dilatation" v-model="payload.guie_cervical_dilatation" density="compact" hide-details></v-checkbox>
                                                        </v-col>
                                                        <v-col cols="3">
                                                            <v-checkbox label="Presence of adnomal discharge" v-model="payload.guie_presence_adnomal_discharge" density="compact" hide-details></v-checkbox>
                                                        </v-col>
                                                        <v-col cols="2" class="form-col">
                                                            <v-checkbox label="Other" v-model="payload.is_other_guie" density="compact" hide-details></v-checkbox>
                                                        </v-col>
                                                        <v-col cols="10" class="form-col">
                                                            <v-text-field
                                                                label="Specify"
                                                                variant="outlined"
                                                                density="compact"
                                                                hide-details
                                                                :disabled="!payload.is_other_guie"
                                                            ></v-text-field>
                                                        </v-col>
                                                    </v-row>
                                                </v-col>
                                            </v-row>
                                            <v-row>
                                                <v-col cols="2">
                                                    <v-list-subheader class="sub-header">SKIN </v-list-subheader>
                                                </v-col>
                                                <v-col cols="10">
                                                    <v-row>
                                                        <v-col cols="3">
                                                            <v-checkbox label="Essentially normal" v-model="payload.skin_essentially_normal" density="compact" hide-details></v-checkbox>
                                                            <v-checkbox label="Edema/swelling " v-model="payload.skin_swelling " density="compact" hide-details></v-checkbox>
                                                            <v-checkbox label="Rashes/Petechiae" v-model="payload.skin_petechiae" density="compact" hide-details></v-checkbox>
                                                        </v-col>
                                                        <v-col cols="3">
                                                            <v-checkbox label="Clubbing" v-model="payload.skin_clubbing" density="compact" hide-details></v-checkbox>
                                                            <v-checkbox label="Decreased mobility" v-model="payload.skin_decreased_mobility" density="compact" hide-details></v-checkbox>
                                                            <v-checkbox label="Weak pulses" v-model="payload.skin_weak_pulses" density="compact" hide-details></v-checkbox>
                                                        </v-col>
                                                        <v-col cols="3">
                                                            <v-checkbox label="Cold clammy" v-model="payload.skin_cold_clammy" density="compact" hide-details></v-checkbox>
                                                            <v-checkbox label="Plae nailbeds" v-model="payload.skin_plae_nailbeds" density="compact" hide-details></v-checkbox>
                                                        </v-col>
                                                        <v-col cols="3">
                                                            <v-checkbox label="Cyanosis/motted skin" v-model="payload.skin_cyanosis_skin" density="compact" hide-details></v-checkbox>
                                                            <v-checkbox label="Poor skin turgor" v-model="payload.skin_poor_skin_turgor" density="compact" hide-details></v-checkbox>
                                                        </v-col>
                                                        <v-col cols="2" class="form-col">
                                                            <v-checkbox label="Other" v-model="payload.is_other_skin" density="compact" hide-details></v-checkbox>
                                                        </v-col>
                                                        <v-col cols="10" class="form-col">
                                                            <v-text-field
                                                                label="Specify"
                                                                variant="outlined"
                                                                density="compact"
                                                                hide-details
                                                                :disabled="!payload.is_other_skin"
                                                            ></v-text-field>
                                                        </v-col>
                                                    </v-row>
                                                </v-col>
                                            </v-row>
                                            <v-row>
                                                <v-col cols="2">
                                                    <v-list-subheader class="sub-header">NEURO-EXAM </v-list-subheader>
                                                </v-col>
                                                <v-col cols="10">
                                                    <v-row>
                                                        <v-col cols="3">
                                                            <v-checkbox label="Essentially normal" v-model="payload.neuro_essentially_normal" density="compact" hide-details></v-checkbox>
                                                            <v-checkbox label="Presence of abnormal reflex(es) " v-model="payload.neuro_presence_abnormal_reflex" density="compact" hide-details></v-checkbox>
                                                        </v-col>
                                                        <v-col cols="3">
                                                            <v-checkbox label="Abnormal gait" v-model="payload.neuro_abnormal_gait" density="compact" hide-details></v-checkbox>
                                                            <v-checkbox label="Poor/altered memory" v-model="payload.neuro_poor_memory" density="compact" hide-details></v-checkbox>
                                                        </v-col>
                                                        <v-col cols="3">
                                                            <v-checkbox label="Abnormal position sense" v-model="payload.neuro_abnormal_position_sense" density="compact" hide-details></v-checkbox>
                                                            <v-checkbox label="Poor muscle tone/strength" v-model="payload.neuro_poor_muscle_strength" density="compact" hide-details></v-checkbox>
                                                        </v-col>
                                                        <v-col cols="3">
                                                            <v-checkbox label="Abnormal sensation" v-model="payload.neuro_abnormal_sensation" density="compact" hide-details></v-checkbox>
                                                            <v-checkbox label="Poor coordination" v-model="payload.neuro_poor_coordination" density="compact" hide-details></v-checkbox>
                                                        </v-col>
                                                        <v-col cols="2" class="form-col">
                                                            <v-checkbox label="Other" v-model="payload.is_other_neuro_exam" density="compact" hide-details></v-checkbox>
                                                        </v-col>
                                                        <v-col cols="10" class="form-col">
                                                            <v-text-field
                                                                label="Specify"
                                                                variant="outlined"
                                                                density="compact"
                                                                hide-details
                                                                :disabled="!payload.is_other_neuro_exam"
                                                            ></v-text-field>
                                                        </v-col>
                                                    </v-row>
                                                </v-col>
                                            </v-row>
                                            <v-card elevation="4" class="mt-10 px-4">
                                                <v-card-text>
                                                    <v-row>
                                                        <v-col cols="5">
                                                            <v-row>
                                                                <v-col cols="12" style="text-align: center;">
                                                                    <v-btn>IV. COURSE IN THE WARD</v-btn>
                                                                </v-col>
                                                                <v-list-subheader>Surgical Procedure / RVS Code</v-list-subheader>
                                                                <v-col cols="12" class="form-col">
                                                                    <v-text-field 
                                                                        variant="outlined"
                                                                        disabled 
                                                                        density="compact"
                                                                        hide-details
                                                                    ></v-text-field>
                                                                </v-col>
                                                                <v-col cols="12" class="form-col">
                                                                    <v-autocomplete
                                                                        item-title="status_name"
                                                                        item-value="id"
                                                                        label="Status"
                                                                        v-model="payload.surgical_procedure_rvs_code_status"
                                                                        hide-details
                                                                        clearable
                                                                        density="compact"
                                                                        variant="outlined"
                                                                    ></v-autocomplete>
                                                                </v-col>
                                                                <v-col cols="12" class="form-col">
                                                                    <v-textarea 
                                                                        label="Deficiency Remarks:"
                                                                        v-model="payload.deficiency_remarks"
                                                                        variant="outlined"
                                                                        density="compact"
                                                                        hide-details
                                                                    ></v-textarea>
                                                                </v-col>
                                                            </v-row>
                                                        </v-col>
                                                        <v-col cols="7">
                                                            <v-row>
                                                                <v-col cols="12" style="text-align: center;">
                                                                    <v-btn>V. DRUGS / MEDICINES</v-btn>
                                                                </v-col>
                                                                <v-col cols="12" style="text-align: center;">
                                                                    <v-list-subheader class="sub-header">VI. Outcome of Treatment</v-list-subheader>
                                                                </v-col>
                                                                <v-row>
                                                                    <v-col cols="12" class="form-col">
                                                                        <v-radio-group inline v-model="payload.outcome_treatment">
                                                                            <v-checkbox label="Improved" value="improved" density="compact" hide-details></v-checkbox>
                                                                            <v-checkbox label="Hama" value="hama" density="compact" hide-details></v-checkbox>
                                                                            <v-checkbox label="Expired" value="expired" density="compact" hide-details></v-checkbox>
                                                                            <v-checkbox label="Absconded" value="absconded" density="compact" hide-details></v-checkbox>
                                                                            <v-checkbox label="Transferred" value="transferred" density="compact" hide-details></v-checkbox>
                                                                        </v-radio-group>
                                                                    </v-col>
                                                                </v-row>
                                                                <v-col cols="12" class="form-col">
                                                                    <v-textarea 
                                                                        label="Specifiy reason"
                                                                        v-model="payload.outcome_treatment_specify_reason"
                                                                        variant="outlined"
                                                                        density="compact"
                                                                        hide-details
                                                                        readonly
                                                                    ></v-textarea>
                                                                </v-col>
                                                            </v-row>
                                                        </v-col>
                                                    </v-row>
                                                </v-card-text>
                                            </v-card>
                                        </v-col>
                                    </v-row>
                                </v-window-item>
                            </v-col>
                        </v-row>
                    </v-window>
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

let tab = ref("0");
const user_gender = ref('Female');

const { selectedRowDetails } = storeToRefs(useSubcomponentSelectedRowDetailsStore()); 

const emits = defineEmits(['close-dialog'])
const payload = ref({});
payload.value.isReferredFromHCI = '0';
payload.value.isGeneralSurvey = '0';

const test = () => {
    console.log(payload.isReferredFromHCI);
}

const onSubmit = () => {
    alert('PhilHealth Claim Form for Processing submitted!');
    payload.value = {};
    emits('close-dialog');
    payload.value.isReferredFromHCI = '0';
    payload.value.isGeneralSurvey = '0';
    tab.value = '0';
}

const closeDialog = () => {
    emits('close-dialog');
    payload.value = {};
    payload.value.isReferredFromHCI = '0';
    payload.value.isGeneralSurvey = '0';
    tab.value = '0';
}
</script>

<style scoped>
.sub-header {
    font-weight: bold; 
    font-style: italic; 
    text-decoration: underline;
}
.form-col {
    margin-top: -16px !important;
}
</style>