<template>
    <v-dialog :model-value="print_slip" rounded="lg" scrollable @update:model-value="closeDialog" max-width="900px">
        <form @submit.prevent="onSubmit">        
            <v-card rounded="lg">
                <v-toolbar density="compact" color="#107bac" hide-details>
                    <v-toolbar-title>TO CHANGE AS HISTORY OF PATIENTS REQUISITIONS {{ selectedRowDetails.id }}</v-toolbar-title>
                    <v-btn color="white" @click="closeDialog">
                        <v-icon>mdi-close</v-icon>
                    </v-btn>
                </v-toolbar>
                <v-divider></v-divider>
                <v-card-text>
                    <v-card elevation="4">
                        <v-card-text>
                            <p>
                                <span style="font-weight: bold; font-style: italic;" >NOTE: </span>Please double check the information of the requisition you are about to print. 
                                Make sure that the target printer is turned on and ready then press "Print" button to print or "Preview" button to view in the screen, Otherwise
                                press "Close" button.
                            </p>
                            <v-row class="mt-2">
                                <v-col cols="12">
                                    <v-text-field
                                        :label="form_type === 'outpatient' ? 'OPD Case No.' : (form_type === 'emergency' ? 'ER Case No.' : 'IPD Case No.')"
                                        v-model="payload.case_no"
                                        variant="outlined"
                                        density="compact"
                                        hide-details
                                    ></v-text-field>
                                </v-col>
                                <v-col cols="12" class="form-col">
                                    <v-text-field
                                        label="Patient ID"
                                        v-model="payload.patient_id"
                                        variant="outlined"
                                        density="compact"
                                        hide-details
                                    ></v-text-field>
                                </v-col>
                                <v-col cols="12" class="form-col">
                                    <v-text-field
                                        label="Patient Name"
                                        v-model="payload.patient_name"
                                        variant="outlined"
                                        density="compact"
                                        hide-details
                                    ></v-text-field>
                                </v-col>
                                <v-col cols="12" class="form-col">
                                    <v-text-field
                                        label="Requisition Date"
                                        v-model="payload.requisition_date"
                                        type="date"
                                        variant="outlined"
                                        density="compact"
                                        hide-details
                                    ></v-text-field>
                                </v-col>
                                <v-col cols="12" class="form-col">
                                    <v-text-field
                                        label="Requisition No."
                                        v-model="payload.requisition_no"
                                        variant="outlined"
                                        density="compact"
                                        hide-details
                                    ></v-text-field>
                                </v-col>
                                <v-col cols="12" class="form-col">
                                    <p class="mt-4">Print Option</p>
                                    <v-radio-group inline density="compact" hide-details>
                                        <v-radio label="Requisition Slip" value="0" density="compact"></v-radio>
                                        <v-radio label="Requisition Slip for Imaging" value="1" density="compact"></v-radio>
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
        </form>
    </v-dialog>
</template>

<script setup>
const props = defineProps({
    print_slip: {
        type: Boolean,
        default: () => false,
    },
    payload: {
        type: Object,
        default: () => ({}),
    },
    form_type: {
        type: String,
        default: () => '',
    },
})

const { selectedRowDetails } = storeToRefs(useSubcomponentSelectedRowDetailsStore()); 

const onSubmit = () => {
    alert('Submit');
    emits('close-dialog');
}

const emits = defineEmits(['close-dialog'])

const closeDialog = () => {
    emits('close-dialog');
}

const onPreview = () => {
    alert("Preview");
}

const onPrint = () => {
    alert("Print");
}
</script>

<style scoped>
.form-col {
    margin-top: -16px !important;
}
</style>