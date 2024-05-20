<template>
    <v-dialog :model-value="show" rounded="lg" scrollable @update:model-value="closeDialog" max-width="700px">  
        <form @submit.prevent="onSubmit">        
            <v-card rounded="lg">
                <v-toolbar density="compact" color="#6984ff" hide-details>
                    <v-toolbar-title>Hold Account {{ selectedRowDetails.id }}</v-toolbar-title>
                    <v-btn color="white" @click="closeDialog">
                        <v-icon>mdi-close</v-icon>
                    </v-btn>
                </v-toolbar>
                <v-divider></v-divider>
                <v-card-text>
                    <v-card elevation="4">
                        <v-card-text>
                            <p>
                                <span style="font-weight: bold; font-style: italic;" >NOTE: </span>Setting patient account status as "On-Hold" by clicking the equivalent checkbox
                                control will mean putting all transaction of active registry case in "Cash Basis only" until it is released. If you are not 100% sure that you do 
                                understand what this process is all about, please seek assistance from your immediate supervisor or the system administrator.
                            </p>
                        </v-card-text>
                    </v-card>
                    <v-card elevation="4" class="mt-4">
                        <v-toolbar density="compact" hide-details>
                            <v-toolbar-title class="toolbar-title">Patient Account to be hold</v-toolbar-title>
                        </v-toolbar>
                        <v-card-text>
                            <v-row>
                                <v-col cols="12">
                                    <v-text-field 
                                        label="Patient ID"
                                        v-model="payload.id"
                                        variant="outlined"
                                        density="compact"
                                        hide-details
                                    ></v-text-field>
                                </v-col>
                                <v-col cols="12" class="form-col">
                                    <v-text-field 
                                        label="MR Locator No."
                                        v-model="payload.mrLocatorNo"
                                        variant="outlined"
                                        density="compact"
                                        hide-details
                                    ></v-text-field>
                                </v-col>
                                <v-col cols="12" class="form-col">
                                    <v-text-field 
                                        label="Patient Name"
                                        v-model="payload.patientName"
                                        variant="outlined"
                                        density="compact"
                                        hide-details
                                    ></v-text-field>
                                </v-col>
                                <v-col cols="12" class="form-col">
                                    <v-text-field 
                                        label="Debit"
                                        v-model="payload.debit"
                                        variant="outlined"
                                        density="compact"
                                        hide-details
                                    ></v-text-field>
                                </v-col>
                                <v-col cols="12" class="form-col">
                                    <v-text-field 
                                        label="Credit"
                                        v-model="payload.credit"
                                        variant="outlined"
                                        density="compact"
                                        hide-details
                                    ></v-text-field>
                                </v-col>
                                <v-col cols="12" class="form-col">
                                    <v-text-field 
                                        label="Balance"
                                        v-model="payload.balance"
                                        variant="outlined"
                                        density="compact"
                                        hide-details
                                    ></v-text-field>
                                </v-col>
                                <v-col cols="12" class="form-col">
                                    <v-text-field 
                                        label="Reference Date"
                                        v-model="payload.referenceDate"
                                        variant="outlined"
                                        density="compact"
                                        hide-details
                                    ></v-text-field>
                                </v-col>
                                <v-col cols="12" class="form-col">
                                    <v-textarea
                                        label="Remarks"
                                        v-model="payload.remarks"
                                        variant="outlined"
                                        density="compact"
                                        hide-details
                                    ></v-textarea>
                                </v-col>
                                <v-col cols="12" class="form-col">
                                    <v-checkbox 
                                        label="Set Patient on Hold"
                                        v-model="payload.isOnHold"
                                        variant="outlined"
                                        density="compact"
                                        hide-details
                                    ></v-checkbox>
                                </v-col>
                            </v-row>
                        </v-card-text>
                    </v-card>
                </v-card-text>
                <v-divider></v-divider>
                <v-card-actions>
                    <v-btn color="blue-darken-1 border border-info" @click="closeDialog"> Close </v-btn>
                    <v-spacer></v-spacer>
                    <v-btn class="bg-primary text-white" type="submit">Confirm</v-btn>
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

const payload = ref({});

const { selectedRowDetails } = storeToRefs(useSubcomponentSelectedRowDetailsStore()); 

const emits = defineEmits(['close-dialog'])

const onSubmit = () => {
    alert('Submit');
    emits('close-dialog');
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