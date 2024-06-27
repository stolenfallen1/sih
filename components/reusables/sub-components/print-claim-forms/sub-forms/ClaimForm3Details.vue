<template>
    <v-dialog :model-value="show" rounded="lg" scrollable @update:model-value="closeDialog" max-width="1120px">
        <form @submit.prevent="onSubmit">
            <v-card rounded="lg">
                <v-card-title class="pa-0">
                    <v-toolbar density="compact" color="#107bac" hide-details>
                        <v-toolbar-title>PhilHealth Claim Form 3 {{ selectedRowDetails.id }}</v-toolbar-title>
                        <v-btn color="white" @click="closeDialog">
                            <v-icon>mdi-close</v-icon>
                        </v-btn>
                    </v-toolbar>
                </v-card-title>
                <v-divider></v-divider>
                <v-card-text>
                    <v-row>
                        <v-col cols="12">
                            <v-text-field 
                                label="PhilHealth Accreditation No. (PAN) - Institutional Health Provider"
                                v-model="payload.philHealthAccreditationNo"
                                variant="outlined"
                                density="compact"
                                hide-details
                                readonly
                            ></v-text-field>
                        </v-col>
                        <v-col cols="4" class="form-col">
                            <v-text-field
                                label="Last Name"
                                v-model="payload.lastname"
                                variant="outlined"
                                density="compact"
                                hide-details
                                readonly
                            ></v-text-field>
                        </v-col>
                        <v-col cols="4" class="form-col">
                            <v-text-field
                                label="First Name"
                                v-model="payload.firstname"
                                variant="outlined"
                                density="compact"
                                hide-details
                                readonly
                            ></v-text-field>
                        </v-col>
                        <v-col cols="4" class="form-col">
                            <v-text-field
                                label="Middle Name"
                                v-model="payload.middlename"
                                variant="outlined"
                                density="compact"
                                hide-details
                                readonly
                            ></v-text-field>
                        </v-col>
                        <v-col cols="3" class="form-col">
                            <v-text-field
                                label="Date Admitted"
                                v-model="payload.dateAdmitted"
                                variant="outlined"
                                density="compact"
                                hide-details
                                readonly
                            ></v-text-field>
                        </v-col>
                        <v-col cols="3" class="form-col">
                            <v-text-field
                                label="Time Admitted"
                                v-model="payload.timeAdmitted"
                                variant="outlined"
                                density="compact"
                                hide-details
                                readonly
                            ></v-text-field>
                        </v-col>
                        <v-col cols="3" class="form-col">
                            <v-text-field
                                label="Date Discharged"
                                v-model="payload.dateDischarged"
                                variant="outlined"
                                density="compact"
                                hide-details
                                readonly
                            ></v-text-field>
                        </v-col>
                        <v-col cols="3" class="form-col">
                            <v-text-field
                                label="Time Discharged"
                                v-model="payload.timeDischarged"
                                variant="outlined"
                                density="compact"
                                hide-details
                                readonly
                            ></v-text-field>
                        </v-col>
                        <v-col cols="6" class="form-col">
                            <v-textarea
                                label="Chief Complaint"
                                v-model="payload.chiefComplaint"
                                variant="outlined"
                                density="compact"
                                hide-details
                            ></v-textarea>
                        </v-col>
                        <v-col cols="6" class="form-col">
                            <v-textarea
                                label="Brief History of Patient Illness"
                                v-model="payload.briefHistory"
                                variant="outlined"
                                density="compact"
                                hide-details
                            ></v-textarea>
                        </v-col>
                        <v-col cols="12" class="form-col">
                            <v-row>
                                <v-col cols="12">
                                    <p style="font-style: italic;">Physical Examination</p>
                                </v-col>
                                <v-col cols="12" class="form-col" style="display: flex; align-items: center;">
                                    <p class="mr-4">Vital signs: </p>
                                    <v-row>
                                        <v-col cols="3">
                                            <v-text-field
                                                label="BP"
                                                variant="outlined"
                                                density="compact"
                                                hide-details
                                            ></v-text-field>
                                        </v-col>
                                        <v-col cols="3">
                                            <v-text-field
                                                label="CR"
                                                variant="outlined"
                                                density="compact"
                                                hide-details
                                            ></v-text-field>
                                        </v-col>
                                        <v-col cols="3">
                                            <v-text-field
                                                label="RR"
                                                variant="outlined"
                                                density="compact"
                                                hide-details
                                            ></v-text-field>
                                        </v-col>
                                        <v-col cols="3">
                                            <v-text-field
                                                label="TEMP"
                                                variant="outlined"
                                                density="compact"
                                                hide-details
                                            ></v-text-field>
                                        </v-col>
                                    </v-row>
                                </v-col>
                                <v-col cols="6" class="form-col">
                                    <v-row>
                                        <v-col cols="12">
                                            <v-text-field
                                                label="General Survey"
                                                v-model="payload.generalSurvey"
                                                variant="outlined"
                                                density="compact"
                                                hide-details
                                            ></v-text-field>
                                        </v-col>
                                        <v-col cols="12" class="form-col">
                                            <v-text-field
                                                label="HEENT"
                                                v-model="payload.heent"
                                                variant="outlined"
                                                density="compact"
                                                hide-details
                                            ></v-text-field>
                                        </v-col>
                                        <v-col cols="12" class="form-col">
                                            <v-text-field
                                                label="Chest / Lungs"
                                                v-model="payload.chestLungs"
                                                variant="outlined"
                                                density="compact"
                                                hide-details
                                            ></v-text-field>
                                        </v-col>
                                        <v-col cols="12" class="form-col">
                                            <v-text-field
                                                label="CVS"
                                                v-model="payload.cvs"
                                                variant="outlined"
                                                density="compact"
                                                hide-details
                                            ></v-text-field>
                                        </v-col>
                                    </v-row>
                                </v-col>
                                <v-col cols="6" class="form-col">
                                    <v-row>
                                        <v-col cols="12">
                                            <v-text-field
                                                label="Abdomen"
                                                v-model="payload.abdomen"
                                                variant="outlined"
                                                density="compact"
                                                hide-details
                                            ></v-text-field>
                                        </v-col>
                                        <v-col cols="12" class="form-col">
                                            <v-text-field
                                                label="GU (IE)"
                                                v-model="payload.gu"
                                                variant="outlined"
                                                density="compact"
                                                hide-details
                                            ></v-text-field>
                                        </v-col>
                                        <v-col cols="12" class="form-col">
                                            <v-text-field
                                                label="Skin extremities"
                                                v-model="payload.skinExtremities"
                                                variant="outlined"
                                                density="compact"
                                                hide-details
                                            ></v-text-field>
                                        </v-col>
                                        <v-col cols="12" class="form-col">
                                            <v-text-field
                                                label="Neuro Examination"
                                                v-model="payload.neuroExamination"
                                                variant="outlined"
                                                density="compact"
                                                hide-details
                                            ></v-text-field>
                                        </v-col>
                                    </v-row>
                                </v-col>
                            </v-row>
                        </v-col>
                        <v-col cols="12" class="form-col">
                            <v-textarea
                                label="Course in the Ward"
                                v-model="payload.courseInWard"
                                variant="outlined"
                                density="compact"
                                hide-details
                            ></v-textarea>
                        </v-col>
                        <v-col cols="12" class="form-col">
                            <v-textarea
                                label="Pertinent Laboratory and Diagnostic Findings"
                                v-model="payload.pertinentLabFindings"
                                variant="outlined"
                                density="compact"
                                hide-details
                            ></v-textarea>
                        </v-col>
                        <v-col cols="12">
                            <v-row>
                                <p class="mt-2 mx-6">Disposition on Discharge</p>
                                <v-radio-group inline v-model="payload.isDispositionDischarge">
                                    <v-checkbox label="Improved" density="compact" hide-details value="0"></v-checkbox>
                                    <v-checkbox label="Transfered" density="compact" hide-details value="1"></v-checkbox>
                                    <v-checkbox label="HAMA" density="compact" hide-details value="2"></v-checkbox>
                                    <v-checkbox label="Absconded" density="compact" hide-details value="3"></v-checkbox>
                                    <v-checkbox label="Expired" density="compact" hide-details value="4"></v-checkbox>
                                </v-radio-group>
                            </v-row>
                        </v-col>
                    </v-row>
                    <v-card elevation="4" class="mt-2">
                        <v-card-title class="pa-0">
                            <v-tabs v-model="tab" color="#2a73c5">
                                <v-tab value="0"><v-icon start>mdi-form-select</v-icon>Prenatal Consultation</v-tab>
                                <v-tab value="1"><v-icon start>mdi-form-select</v-icon>Delivery Outcome</v-tab>
                                <v-tab value="2"><v-icon start>mdi-form-select</v-icon>Postpartum Care</v-tab>
                            </v-tabs>
                        </v-card-title>
                        <v-card-text style="max-height: auto">
                            <v-window v-model="tab">
                                <v-row>
                                    <v-col cols="12">
                                        <v-window-item class="pa-1">
                                            <PrenatalConsultation :payload="payload" />
                                        </v-window-item>
                                        <v-window-item class="pa-1">
                                            <DeliveryOutcome :payload="payload" />
                                        </v-window-item>
                                        <v-window-item class="pa-1">
                                            <PostPartumCare :payload="payload" />
                                        </v-window-item>
                                    </v-col>
                                </v-row>
                            </v-window>
                        </v-card-text>
                    </v-card>
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
import PrenatalConsultation from "./claim-form-3-sub-forms/PrenatalConsultation.vue";
import DeliveryOutcome from "./claim-form-3-sub-forms/DeliveryOutcome.vue";
import PostPartumCare from "./claim-form-3-sub-forms/PostPartumCare.vue";

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

const onSubmit = () => {
    alert('PhilHealth Claim 3');
    payload.value = {};
    emits('close-dialog');
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