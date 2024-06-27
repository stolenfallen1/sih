<template>
    <v-dialog :model-value="show" rounded="lg" scrollable @update:model-value="closeDialog" max-width="600px">
        <form @submit.prevent="onSubmit">        
            <v-card rounded="lg">
                <v-toolbar density="compact" color="#107bac" hide-details>
                    <v-toolbar-title>Print Transaction Slip {{ selectedRowDetails.id }}</v-toolbar-title>
                    <v-btn color="white" @click="closeDialog">
                        <v-icon>mdi-close</v-icon>
                    </v-btn>
                </v-toolbar>
                <v-divider></v-divider>
                <v-card-text>
                    <v-card elevation="4">
                        <v-card-text>
                            <p>
                                <span style="font-weight: bold; font-style: italic;" >NOTE: </span>Please double check the information of the transaction you are about to print. Make sure
                                that the target printer is on and ready the press "Print" button to print or "Preview" button to view in the screen. Otherwise, press "Close" button to continue
                            </p>
                        </v-card-text>
                    </v-card>
                    <v-row class="mt-2">
                        <v-col cols="12">
                            <v-text-field
                                label="OPD Case No."
                                v-model="payload.find(item => item.outpatient_case_no).outpatient_case_no"
                                variant="outlined"
                                density="compact"
                                hide-details
                                readonly
                            ></v-text-field>
                        </v-col>
                        <v-col cols="12">
                            <v-text-field
                                label="Patient ID"
                                v-model="selectedRowDetails.id"
                                variant="outlined"
                                density="compact"
                                hide-details
                                readonly
                            ></v-text-field>
                        </v-col>
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
                        <v-col cols="12">
                            <v-text-field
                                type="date"
                                label="Transaction Date"
                                v-model="payload.find(item => item.outpatient_date).outpatient_date"
                                variant="outlined"
                                density="compact"
                                hide-details
                                readonly
                            ></v-text-field>
                        </v-col>
                    </v-row>
                </v-card-text>
                <v-divider></v-divider>
                <v-card-actions>
                    <v-btn color="blue-darken-1 border border-info" @click="closeDialog"> Close </v-btn>
                    <v-spacer></v-spacer>
                    <v-btn class="bg-info text-white" type="submit">Preview</v-btn>
                    <v-btn class="bg-primary text-white" type="submit">Print</v-btn>
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

const { selectedRowDetails } = storeToRefs(useSubcomponentSelectedRowDetailsStore()); 

const payload = ref([
    {
        patient_name: 'John Doe',
    },
    {
        outpatient_case_no: '123',
    },
    {
        outpatient_date: '2024-04-15',
    },
]);

const onSubmit = () => {
    alert('Submit');
    emits('close-dialog');
}

const emits = defineEmits(['close-dialog'])

const closeDialog = () => {
    emits('close-dialog');
}
</script>

<style scoped>
</style>