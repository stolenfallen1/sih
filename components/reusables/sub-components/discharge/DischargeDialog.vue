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

    const emits = defineEmits(['close-dialog', 'patient-registered'])
    
    const closeDialog = () => {
        emits('close-dialog');
    }

    const balance           = ref([]);
    const credit            = ref([]);
    const charges           = ref([])
    const balance_loading   = ref(false);
    const isElible          = ref(false);
    const isDischarged      = ref(false);
    const isProcessed       = ref(false);
    const pageLoader        = ref(false);
    const value             = ref(0)
    const interval          = ref(null)

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

    const startLoader = () => {
        clearInterval(interval.value);
        value.value = 0;
        interval.value = setInterval(() => {
            if (value.value === 100) {
                value.value = 0 
            } else {
                value.value += 10
            }
        }, 1000)
    }

    const stopLoader = () => {
        clearInterval(interval.value);
        value.value = 0; 
    };

    const dichargedDate = () => {
        const today = new Date();
        const year = today.getFullYear();
        const month = String(today.getMonth() + 1).padStart(2, '0'); 
        const day = String(today.getDate()).padStart(2, '0'); 
        payload.value.dicharge_date = `${year}-${month}-${day}`;
    }

    onMounted(() => {
        startLoader();
    })

    onBeforeUnmount(() => {
        stopLoader();
    })

    const onSubmit = async () => {
        isLoading.value = true;
        let response
        try{
            response = await useMethod("put", "discharge-patient", payload.value, "", payload.value.case_No);
            if(response) {
                emits('patient-registered');
                useSnackbar(true, "green", response.message);
                isLoading.value = false;
                useSubComponents('Discharge', false)
                closeConfirmDialog();
            }
        } catch(error) {    
            useSnackbar(true, "red", response.message || 'Tagged Failed');
        } finally {
            isLoading.value = false;
            closeDialog();
        }
    }

    const payload = ref([
        {
            balance: balance.value,
            credit: credit.value,
            charges: charges.value
        }
    ]);

    const patientEligibilityForDischarge = async (case_No) => {
        isLoading.value = true;
        pageLoader.value = true;
        isElible.value = false;
        isDischarged.value = false
        isProcessed.value = false;
        startLoader();
        let response;
        try {
            response = await useMethod("get", "check-elgibility-for-discharge/", "", case_No);
            if(response) {
                if(parseInt(response.isEligible) === 0 && parseInt(response.isDischarged) === 0) {
                    isElible.value = false;
                    isDischarged.value = false
                    isProcessed.value = false;
                    isLoading.value = false;
                } else if(parseInt(response.isEligible) === 0 && parseInt(response.isDischarged) === 1) {
                    isElible.value = false;
                    isDischarged.value = true
                    isProcessed.value = false;
                    isLoading.value = false;
                }else {
                    isElible.value = true;
                    isDischarged.value = false
                    isLoading.value = false;
                }
                console.log('Response : ',response.isEligible);
            }
        } catch(error) {
            console.log('Error' + error);
        } finally {
            isLoading.value = false;
            pageLoader.value = false;
            stopLoader();
            isProcessed.value = true;
        }
    }

    watch(() => selectedRowDetails.value, async (newRow, oldRow) => {
            if (newRow && newRow.id && (!oldRow || newRow.id !== oldRow.id)) {
                    payload.value = {
                        ...newRow,
                        name: newRow.lastname && newRow.firstname
                            ? `${newRow.lastname}, ${newRow.firstname} ${newRow.middlename || ''}`
                            : '',
                        patient_Id: newRow.patient_Id || '',
                        suffix_id: parseInt(newRow.suffix_id) || '',
                        case_No: newRow.patient_registry?.[0]?.case_No || '',
                        er_Case_No: parseInt(newRow.patient_registry?.[0]?.er_Case_No) || '',
                        registry_Date: useDateMMDDYYY(newRow.registry_Date) || ''
                    };
                    getPatientBalance();
                    dichargedDate();
                    await patientEligibilityForDischarge(newRow.patient_registry?.[0]?.case_No);
                }
            },
        { immediate: true } 
    );

    const CloseAlertMessageDialog = () => {
        emits('patient-registered');
        closeDialog();
    }

</script>

<template>
    <div v-if="isProcessed">
        <div v-if="isElible && !isDischarged">
            <v-dialog 
                :model-value="show" 
                rounded="lg" 
                scrollable 
                @update:model-value="closeDialog" 
                max-width="800px" 
                >
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
                                                v-model="payload.dicharge_date"
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
        </div>
        <div v-else>
            <v-dialog 
                :model-value="show" 
                rounded="lg" 
                scrollable 
                @update:model-value="closeDialog" 
                max-width="400px"
                >
                <v-card
                    color="red"
                    >
                    <v-card-title
                        class="bg-error text-white"
                        >
                        Alert Message
                    </v-card-title>
                    <v-card-text>
                        <div v-if="!isElible && !isDischarged">
                            <v-alert
                                border="left"
                                dismissible
                                elevation="24"
                                icon="mdi-alert-circle"
                                >
                                <div class="note">
                                    <span>Note:</span>
                                    <p class="message">You cannot send a discharge order at this time. This patient has not yet been tagged for May Go Home.</p>
                                </div>
                            </v-alert>
                        </div>
                        <div v-if="!isElible && isDischarged">
                            <v-alert
                                border="left"
                                dismissible
                                elevation="24"
                                icon="mdi-alert-circle"
                                >
                                <div class="note">
                                    <span>Note:</span>
                                    <p class="message">The patient already has a discharge order, Please be advise or may call IT Department for futher assistance. Thank yo.</p>
                                </div>
                            </v-alert>
                        </div>
                    </v-card-text>
                    <v-card-actions
                            class="bg-error text-white"
                            elevation="24"
                        >
                            <v-spacer></v-spacer>
                            <v-btn 
                                bg-color="primary" text
                                @click="CloseAlertMessageDialog">Close</v-btn>
                        </v-card-actions>
                </v-card>
            </v-dialog>
        </div>
    </div>
    <div v-else>
        <v-dialog 
            :model-value="show" 
            rounded="lg" 
            scrollable 
            @update:model-value="closeDialog" 
            :style="{maxWidth: isProcessed ? '800px' : '500px'}" 
            >
            <v-card size="small" color="transparent">
                <v-card-text>
                    <div class="text-center">
                        <v-progress-circular :model-value="value" :rotate="360" :size="100" :width="15" color="#107bac">
                            <template v-slot:default> {{ value }} % </template>
                        </v-progress-circular><br/>
                        Checking Eligibility for May Go Home...
                    </div>
                </v-card-text>
            </v-card>
        </v-dialog>
    </div>
    <Confirmation 
        :show="showDialog"
        :payload="payload"
        :loading="isLoading"
        @submit="onSubmit"
        @close="closeConfirmDialog"
    />

</template>

<style scoped>
      .toolbar-title {
        font-size: 16px; 
        font-style: italic; 
        text-align: center;
    }
    .form-col {
        margin-top: -16px !important;
    }
    .info-icon {
        font-size: 50px !important;
    }
    /* .alert-text {
        padding: 10px !important;
        font-size: 16px;
        line-height: 2rem;
        color: #F44336 !important;
    } */
    .note {
        padding: 20 0px !important;
    }
    .note span {
        font-size: 20px;
        color: #000;
        font-weight: bold;
        font-style: italic;
    }
</style>