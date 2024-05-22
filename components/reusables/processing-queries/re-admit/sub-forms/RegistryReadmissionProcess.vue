<template>
    <v-dialog :model-value="open_readmit_dialog" rounded="lg" scrollable @update:model-value="closeDialog" max-width="600px">
        <form @submit.prevent="onSubmit">
            <v-card rounded="lg">
                <v-toolbar density="compact" color="#6984ff" hide-details>
                    <v-toolbar-title>Registry Readmission Process {{ selectedRowDetails.id }}</v-toolbar-title> 
                    <v-btn color="white" @click="closeDialog">
                        <v-icon>mdi-close</v-icon>
                    </v-btn>
                </v-toolbar>
                <v-divider></v-divider>
                <v-card-text>
                    <v-card elevation="4">
                        <v-toolbar density="compact" hide-details>
                            <v-toolbar-title class="toolbar-title">Patient Account Registry Basic Information</v-toolbar-title>
                        </v-toolbar>
                        <v-card-text>
                            <v-row>
                                <v-col cols="12">
                                    <v-text-field
                                        label="Patient Name"
                                        v-model="payload.find(item => item.patient_name).patient_name"
                                        variant="outlined"
                                        density="compact"
                                        hide-details
                                        readonly
                                    ></v-text-field>
                                </v-col>
                                <v-col cols="12" class="form-col">
                                    <v-text-field
                                        label="Patient Name"
                                        v-model="selectedRowDetails.id"
                                        variant="outlined"
                                        density="compact"
                                        hide-details
                                        readonly
                                    ></v-text-field>
                                </v-col>
                                <v-col cols="12" class="form-col">
                                    <v-text-field
                                        label="Admission Case No."
                                        v-model="payload.find(item => item.admission_case_no).admission_case_no"
                                        variant="outlined"
                                        density="compact"
                                        hide-details
                                        readonly
                                    ></v-text-field>
                                </v-col>
                                <v-col cols="12" class="form-col">
                                    <v-text-field
                                        label="Admission Case Date"
                                        type="date"
                                        v-model="payload.find(item => item.admission_case_date).admission_case_date"
                                        variant="outlined"
                                        density="compact"
                                        hide-details
                                        readonly
                                    ></v-text-field>
                                </v-col>
                                <v-col cols="12" class="form-col">
                                    <v-autocomplete
                                        label="Room No"
                                        v-model="payload.find(item => item.room_no).room_no"
                                        variant="outlined"
                                        density="compact"
                                        hide-details
                                    ></v-autocomplete>
                                </v-col>
                                <v-col cols="12" class="form-col">
                                    <v-autocomplete
                                        label="Bed No"
                                        v-model="payload.find(item => item.bed_no).bed_no"
                                        variant="outlined"
                                        density="compact"
                                        hide-details
                                    ></v-autocomplete>
                                </v-col>
                                <v-col cols="12" class="form-col">
                                    <v-autocomplete
                                        label="Re-admit as"
                                        v-model="payload.readmitAs"
                                        variant="outlined"
                                        density="compact"
                                        hide-details
                                    ></v-autocomplete>
                                </v-col>
                            </v-row>
                        </v-card-text>
                    </v-card>
                    <v-card elevation="4" class="mt-4">
                        <v-toolbar density="compact" hide-details>
                            <v-toolbar-title class="toolbar-title">Readmission Remarks</v-toolbar-title>
                        </v-toolbar>
                        <v-card-text>
                            <v-row>
                                <v-col cols="12">
                                    <p>
                                        <span style="font-weight: bold; font-style: italic;" >NOTE: </span>This process will change the status of the Admission Registry from 'Discharged' to 'Active'. If 
                                        in case current room and bed is no longer available, choose another room and bed for the patient upon clicking "Readmit" button. Follow the instructions thereafter.
                                    </p>
                                </v-col>
                                <v-col cols="12" class="form-col">
                                    <v-textarea
                                        variant="outlined"
                                        density="compact"
                                        hide-details
                                    ></v-textarea>
                                </v-col>
                            </v-row>
                        </v-card-text>
                    </v-card>
                </v-card-text>
                <v-divider></v-divider>
                <v-card-actions>
                    <v-btn color="blue-darken-1 border border-info" @click="closeDialog"> Close </v-btn>
                    <v-spacer></v-spacer>
                    <v-btn class="bg-primary text-white" type="submit">Readmit</v-btn>
                </v-card-actions>
            </v-card>
        </form>
    </v-dialog>
</template>

<script setup>
const props = defineProps({
    open_readmit_dialog: {
        type: Boolean,
        default: () => false,
        required: true,
    },
});

const open_card_holder = ref(false);
const { selectedRowDetails } = storeToRefs(useSubcomponentSelectedRowDetailsStore()); 

const payload = ref([
    {
        patient_name: 'John Doe',
    },
    {
        admission_case_no: '666',
    },
    {
        admission_case_date: '2024-04-12',
    },
    {
        room_no: '123',
    },
    {
        bed_no: '456',
    },
]);

const onSubmit = () => {
    alert("Test!");
    emits('closeDialog');
};

const emits = defineEmits(['close-dialog'])

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