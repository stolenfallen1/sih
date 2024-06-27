<template>
    <v-dialog :model-value="show" rounded="lg" scrollable @update:model-value="closeDialog" max-width="950px">
        <v-card rounded="lg">
            <v-toolbar density="compact" color="#107bac" hide-details>
                <v-toolbar-title>PhilHealth Claim Reports {{ selectedRowDetails.id }}</v-toolbar-title> 
                <v-btn color="white" @click="closeDialog">
                    <v-icon>mdi-close</v-icon>
                </v-btn>
            </v-toolbar>
            <v-card-text>
                <v-card elevation="4">
                    <v-toolbar density="compact" hide-details>
                        <v-toolbar-title class="toolbar-title">Membership Information</v-toolbar-title>
                    </v-toolbar>
                    <v-card-text>
                        <v-row>
                            <v-col cols="6">
                                <v-row>
                                    <v-col cols="12">
                                        <v-text-field 
                                            label="Registry No."
                                            v-model="payload.registryNo"
                                            variant="outlined"
                                            density="compact"
                                            hide-details
                                            readonly
                                        ></v-text-field>
                                    </v-col>
                                    <v-col cols="12" class="form-col">
                                        <v-text-field 
                                            label="Patient Name"
                                            v-model="payload.patientName"
                                            variant="outlined"
                                            density="compact"
                                            hide-details
                                            readonly
                                        ></v-text-field>
                                    </v-col>
                                    <v-col cols="12" class="form-col">
                                        <v-text-field 
                                            label="Transaction Type"
                                            v-model="payload.transactionType"
                                            variant="outlined"
                                            density="compact"
                                            hide-details
                                            readonly
                                        ></v-text-field>
                                    </v-col>
                                    <v-col cols="12" class="form-col">
                                        <v-text-field 
                                            label="Employer ID No."
                                            v-model="payload.employerIdNo"
                                            variant="outlined"
                                            density="compact"
                                            hide-details
                                            readonly
                                        ></v-text-field>
                                    </v-col>
                                    <v-col cols="12" class="form-col">
                                        <v-text-field 
                                            label="Employer Name"
                                            v-model="payload.employerName"
                                            variant="outlined"
                                            density="compact"
                                            hide-details
                                            readonly
                                        ></v-text-field>
                                    </v-col>
                                </v-row>
                            </v-col>
                            <v-col cols="6">
                                <v-row>
                                    <v-col cols="12">
                                        <v-text-field 
                                            label="Member ID No."
                                            v-model="payload.memberIdNo"
                                            variant="outlined"
                                            density="compact"
                                            hide-details
                                            readonly
                                        ></v-text-field>
                                    </v-col>
                                    <v-col cols="12" class="form-col">
                                        <v-text-field 
                                            label="Member Name"
                                            v-model="payload.memberName"
                                            variant="outlined"
                                            density="compact"
                                            hide-details
                                            readonly
                                        ></v-text-field>
                                    </v-col>
                                    <v-col cols="12" class="form-col">
                                        <v-text-field 
                                            label="Membership"
                                            v-model="payload.membership"
                                            variant="outlined"
                                            density="compact"
                                            hide-details
                                            readonly
                                        ></v-text-field>
                                    </v-col>
                                    <v-col cols="12" class="form-col">
                                        <v-text-field 
                                            label="Entity Name"
                                            v-model="payload.entityName"
                                            variant="outlined"
                                            density="compact"
                                            hide-details
                                            readonly
                                        ></v-text-field>
                                    </v-col>
                                </v-row>
                            </v-col>
                        </v-row>
                    </v-card-text>
                </v-card>
                <v-card elevation="4" class="mt-4">
                    <v-toolbar density="compact" hide-details>
                        <v-toolbar-title class="toolbar-title">Report Document Options</v-toolbar-title>
                    </v-toolbar>
                    <v-card-text>
                        <v-row>
                            <v-col cols="12">
                                <v-radio-group v-model="payload.isDocumentSetting">
                                    <div style="display: flex; justify-content: center; align-items: center;">
                                        <v-radio label="Claim Form 3" density="compact" hide-details value="1"></v-radio>
                                        <v-btn :disabled="isButtonDisabled('1')" @click="openClaimForm3Details">Claim Form 3</v-btn>
                                    </div>
                                    <div style="display: flex; justify-content: center; align-items: center;" class="mt-2">
                                        <v-radio label="Claim Form 4" density="compact" hide-details value="3"></v-radio>
                                        <v-btn :disabled="isButtonDisabled('3')" @click="openClaimForm4Processing">Claim Form 4</v-btn>
                                    </div>
                                    <!-- <div style="display: flex; justify-content: center; align-items: center;" class="mt-2">
                                        <v-radio label="Medicare Analysis with Preparation / Code for 12, S-2010" density="compact" hide-details value="4"></v-radio>
                                        <v-btn :disabled="isButtonDisabled('4')">Medicare Analysis</v-btn> 
                                    </div> -->
                                </v-radio-group>
                            </v-col>
                        </v-row>
                    </v-card-text>
                </v-card>
                <v-card elevation="4" class="mt-4">
                    <v-toolbar density="compact" hide-details>
                        <v-toolbar-title class="toolbar-title">EClaims Options</v-toolbar-title>
                    </v-toolbar>
                    <v-card-text>
                        <v-row>
                            <v-col cols="3">
                                <v-row>
                                    <v-col cols="12">
                                        <v-autocomplete
                                            label="Consent Type"
                                            variant="outlined"
                                            density="compact"
                                            hide-details
                                            readonly
                                        ></v-autocomplete>
                                    </v-col>
                                </v-row>
                            </v-col>
                            <v-col cols="3">
                                <v-row>
                                    <v-col cols="12">
                                        <v-autocomplete
                                            label="Date"
                                            type="date"
                                            variant="outlined"
                                            density="compact"
                                            hide-details
                                            readonly
                                        ></v-autocomplete>
                                    </v-col>
                                    <v-col cols="12" class="form-col">
                                        <v-autocomplete
                                            label="Thumb Marked By"
                                            variant="outlined"
                                            density="compact"
                                            hide-details
                                            readonly
                                        ></v-autocomplete>
                                    </v-col>
                                </v-row>
                            </v-col>
                            <v-col cols="3">
                                <v-row>
                                    <v-col cols="12">
                                        <v-autocomplete
                                            label="Relation to Patient"
                                            variant="outlined"
                                            density="compact"
                                            hide-details
                                            readonly
                                        ></v-autocomplete>
                                    </v-col>
                                    <v-col cols="12" class="form-col">
                                        <v-text-field
                                            label="Specify Others"
                                            variant="outlined"
                                            density="compact"
                                            hide-details
                                            readonly
                                        ></v-text-field>
                                    </v-col>
                                </v-row>
                            </v-col>
                            <v-col cols="3">
                                <v-row>
                                    <v-col cols="12">
                                        <v-autocomplete
                                            label="Reason for Signing"
                                            variant="outlined"
                                            density="compact"
                                            hide-details
                                            readonly
                                        ></v-autocomplete>
                                    </v-col>
                                    <v-col cols="12" class="form-col">
                                        <v-text-field
                                            label="Specify Others"
                                            variant="outlined"
                                            density="compact"
                                            hide-details
                                            readonly
                                        ></v-text-field>
                                    </v-col>
                                </v-row>
                            </v-col>
                        </v-row>
                    </v-card-text>
                </v-card>
                <v-card elevation="4" class="mt-4">
                    <v-toolbar density="compact" hide-details>
                        <v-toolbar-title class="toolbar-title">Other Options</v-toolbar-title>
                    </v-toolbar>
                    <v-card-text>
                        <v-row>
                            <v-col cols="4">
                                <v-checkbox label="Include Final Diagnosis" density="compact" hide-details></v-checkbox>
                            </v-col>
                            <v-col cols="4">
                                <v-checkbox label="Exclude Non-Compensable" density="compact" hide-details></v-checkbox>
                            </v-col>
                            <v-col cols="4">
                                <v-checkbox label="for Dialysis Patient" density="compact" hide-details></v-checkbox>
                            </v-col>
                            <v-col cols="12">
                                <v-radio-group v-model="payload.isOtherOptions" inline style="display: flex; justify-content: center;">
                                    <v-radio class="mr-4" label="with Label" density="compact" value="0" hide-details></v-radio>
                                    <v-radio label="without Label" density="compact" value="1" hide-details></v-radio>
                                </v-radio-group>
                            </v-col>
                        </v-row>
                    </v-card-text>
                </v-card>
            </v-card-text>
            <v-divider></v-divider>
            <v-card-actions>
                <v-btn color="blue-darken-1 border border-info" @click="closeDialog"> Close </v-btn>
                <v-spacer></v-spacer>
                <v-btn class="bg-info text-white" @click="onPreview">Preview</v-btn>
                <v-btn class="bg-primary text-white" @click="onPrint">Print</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
    <Claim3Form3Details :show="open_claim_3_details" @close-dialog="closeClaimForm3Details" />
    <Claim4Processing :show="open_claim_4_processing" @close-dialog="closeClaimForm4Processing" />
</template>

<script setup>
import Claim3Form3Details from "./sub-forms/ClaimForm3Details.vue";
import ClaimForm4ProcessingDialog from "../clam-form4processing/ClaimForm4ProcessingDialog.vue";

const props = defineProps({
    show: {
        type: Boolean,
        default: () => false,
        required: true,
    },
});

const open_claim_3_details = ref(false);
const open_claim_4_processing = ref(false);

const openClaimForm3Details = () => {
    open_claim_3_details.value = true;
}
const closeClaimForm3Details = () => {
    open_claim_3_details.value = false;
}

const openClaimForm4Processing = () => {
    open_claim_4_processing.value = true;
}
const closeClaimForm4Processing = () => {
    open_claim_4_processing.value = false;
}

const emits = defineEmits(['close-dialog']);

const { selectedRowDetails } = storeToRefs(useSubcomponentSelectedRowDetailsStore()); 
const payload = ref({
    isDocumentSetting: null
});

const isButtonDisabled = (value) => {
    return payload.value.isDocumentSetting !== value;
};

const onPreview = () => {
    alert('Preview');
}

const onPrint = () => {
    alert('Print');
}

const closeDialog = () => {
    emits('close-dialog');
}

</script>

<style scoped>
.toolbar-title {
    font-size: 16px; 
    font-style: italic; 
    text-align: center;
}
.form-col {
    margin-top: -16px !important;
}
</style>