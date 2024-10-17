<template>
    <v-dialog :model-value="show" rounded="lg" scrollable @update:model-value="closeDialog" max-width="750px">
        <form @submit.prevent="openConfirmDialog">
            <v-card rounded="lg">
                <v-toolbar density="compact" color="#107bac" hide-details>
                    <v-toolbar-title>Discharge Registry Account {{ selectedRowDetails.id }}</v-toolbar-title>
                    <v-btn color="white" @click="closeDialog">
                        <v-icon>mdi-close</v-icon>
                    </v-btn>
                </v-toolbar>
                <v-divider></v-divider>
                <v-card-text>
                    <v-card elevation="4">
                        <v-toolbar density="compact" hide-details>
                            <v-toolbar-title class="toolbar-title">Patient Account Information</v-toolbar-title>
                        </v-toolbar>
                        <v-card-text>
                            <v-row>
                                <v-col cols="6">
                                    <v-text-field 
                                        label="Patient Name"
                                        v-model="payload.name"
                                        variant="outlined" 
                                        density="compact" 
                                        hide-details 
                                        readonly
                                    ></v-text-field>
                                </v-col>
                                <v-col cols="6">
                                    <v-text-field 
                                        :label="form_type === 'outpatient' ? 'Outpatient Case No.' : (form_type === 'emergency' ? 'ER Case No.' : 'Admission No.')" 
                                        v-model="payload.case_No"
                                        variant="outlined" 
                                        density="compact" 
                                        hide-details 
                                        readonly
                                    ></v-text-field>
                                </v-col>
                                <v-col cols="6" class="form-col">
                                    <v-text-field 
                                        type="date"
                                        :label="form_type === 'outpatient' ? 'Outpatient Case Date' : (form_type === 'emergency' ? 'ER Case Date' : 'Admission Date')" 
                                        v-model="payload.registry_Date"
                                        variant="outlined" 
                                        density="compact" 
                                        hide-details 
                                        readonly
                                    ></v-text-field>
                                </v-col>
                                <v-col cols="6" class="form-col">
                                    <v-text-field 
                                        type="date"
                                        label="Discharge Date Time" 
                                        v-model="payload.mgh_Datetime"
                                        variant="outlined" 
                                        density="compact" 
                                        hide-details 
                                        readonly
                                    ></v-text-field>
                                </v-col>
                                <v-col cols="4" class="form-col">
                                    <v-text-field 
                                        label="Debit" 
                                        variant="outlined" 
                                        v-model="charges"
                                        density="compact" 
                                        hide-details 
                                        readonly
                                    ></v-text-field>
                                </v-col>
                                <v-col cols="4" class="form-col">
                                    <v-text-field 
                                        label="Credit" 
                                        variant="outlined" 
                                        v-model="credit"
                                        density="compact" 
                                        hide-details 
                                        readonly
                                    ></v-text-field>
                                </v-col>
                                <v-col cols="4" class="form-col">
                                    <v-text-field 
                                        label="Balance" 
                                        variant="outlined" 
                                        v-model="balance"
                                        density="compact" 
                                        hide-details 
                                        readonly
                                    ></v-text-field>
                                </v-col>
                            </v-row>
                        </v-card-text>
                    </v-card>
                    <v-card elevation="4">
                        <v-toolbar density="compact" hide-details>
                            <v-toolbar-title class="toolbar-title">Discharge Diagnosis</v-toolbar-title>
                        </v-toolbar>
                        <v-card-text>
                            <v-row>
                                <v-col cols="12">
                                    <v-textarea
                                        label="Discharge Diagnosis"
                                        v-model="payload.discharge_Diagnosis"
                                        variant="outlined" 
                                        density="compact" 
                                        hide-details
                                    ></v-textarea>
                                </v-col>
                            </v-row>
                        </v-card-text>
                    </v-card>
                    <v-card elevation="4">
                        <v-toolbar density="compact" hide-details>
                            <v-toolbar-title class="toolbar-title">Secondary Discharge Diagnosis</v-toolbar-title>
                        </v-toolbar>
                        <v-card-text>
                            <v-row>
                                <v-col cols="12">
                                    <v-textarea
                                        label="Secondary Discharge Diagnosis"
                                        v-model="payload.secondary_discharge_Diagnosis"
                                        variant="outlined" 
                                        density="compact" 
                                        hide-details
                                    ></v-textarea>
                                </v-col>
                            </v-row>
                        </v-card-text>
                    </v-card>
                    <v-card elevation="4">
                        <v-toolbar density="compact" hide-details>
                            <v-toolbar-title class="toolbar-title">Discharge Remarks</v-toolbar-title>
                        </v-toolbar>
                        <v-card-text>
                            <v-row>
                                <v-col cols="12">
                                    <v-textarea
                                        label="Discharge Remarks"
                                        v-model="payload.discharge_remarks"
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
                    <v-btn class="bg-primary text-white" type="submit">Discharge Patient</v-btn>
                </v-card-actions>
            </v-card>
        </form>
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
    const props = defineProps({
        show: {
            type: Boolean,
            default: () => false,
            required: true,
        },
        form_type: {
            type: String,
            default: () => '',
        },
    });

        const { selectedRowDetails } = storeToRefs(useSubcomponentSelectedRowDetailsStore()); 

    const showDialog = ref(false);
    const isLoading = ref(false);

    const openConfirmDialog = async () => {
        showDialog.value = true;
    }

    const closeConfirmDialog = () => {
            showDialog.value = false;
        }

    const emits = defineEmits(['close-dialog'])

    const closeDialog = () => {
        emits('close-dialog');
    }

    const balance = ref([]);
    const credit = ref([]);
    const charges = ref([])
    const balance_loading = ref(false);
    const getPatientBalance = async () => {
        balance_loading.value = true;
        let case_No = selectedRowDetails.value.patient_registry?.[0]?.case_No;
        try {
        
            const response = await useMethod("get", `patient-balance/${case_No}`, "", "", "");
            if(response) {
                balance.value = response.Total_Charges;
                credit.value = response.Credit;
                charges.value = response.Charges;
            }
        } catch (error) {
      
            useSnackbar(true, "red", error.message || 'Failed to fetch result');
        } finally {
            balance_loading.value = false; // Ensure loading state is reset
        }
    };

    const onSubmit = async () => {
        isLoading.value = true;
        let response
        try{
            response = await useMethod("put", "discharge-patient", payload.value, "", payload.value.case_No);
            if(response) {
                useSnackbar(true, "green", response.message);
                isLoading.value = false;
                closeConfirmDialog();
                useSubComponents('Discharge', false)
            }
        } catch(error) {    
            useSnackbar(true, "red", response.message || 'Tagged Failed');
        }
    }

    const payload = ref([
            {
                balance: balance.value,
                credit: credit.value,
                charges: charges.value
            }
        ]);

    onUpdated(() => {
        if (selectedRowDetails.value && selectedRowDetails.value.id) {
            if (payload.value.id !== selectedRowDetails.value.id) { 

                payload.value       = Object.assign({}, selectedRowDetails.value);
                payload.value.name  = selectedRowDetails.value.lastname && selectedRowDetails.value.firstname 
                    ? `${selectedRowDetails.value.lastname}, ${selectedRowDetails.value.firstname} ${selectedRowDetails.value.middlename || ''}` 
                    : '';
                payload.value.patient_Id    = selectedRowDetails.value.patient_Id || '';
                payload.value.case_No       = selectedRowDetails.value.patient_registry?.[0]?.case_No || '';
                payload.value.suffix_id     = parseInt(selectedRowDetails.value.suffix_id) || '';
                payload.value.er_Case_No    = parseInt(selectedRowDetails.value.patient_registry?.[0]?.er_Case_No) || '';
                payload.value.registry_Date = useDateMMDDYYY(selectedRowDetails.value.registry_Date) || '';
                payload.value.mgh_Datetime  = useDateMMDDYYY(selectedRowDetails.value.mgh_Datetime) || '';

                getPatientBalance();
            }
        }
    });

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