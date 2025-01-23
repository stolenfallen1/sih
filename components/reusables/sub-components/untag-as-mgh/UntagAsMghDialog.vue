<template>
    <v-dialog v-if="isDischarge !== null && isTagAsMgh !== null" :model-value="show" rounded="lg" scrollable @update:model-value="closeDialog" max-width="400px">
        <v-card
            color="red"
        >
            <v-card-title
                class="bg-error text-white"
            >
            Alert Message
            </v-card-title>
            <v-card-text>
                <v-alert
                    dismissible
                    elevation="24"
                    icon="mdi-alert-circle"
                >
                    <div class="note">
                        <span>Note:</span>
                        <p>
                            Can't Untag May Go Home (MGH) for patients that have been already discharged.
                        </p>
                    </div>
                </v-alert>
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
    <v-dialog v-if="isDischarge === null && isTagAsMgh === null" :model-value="show" rounded="lg" scrollable @update:model-value="closeDialog" max-width="400px">
        <v-card
            color="red"
        >
            <v-card-title
                class="bg-error text-white"
            >
            Alert Message
            </v-card-title>
            <v-card-text>
                <v-alert
                    dismissible
                    elevation="24"
                    icon="mdi-alert-circle"
                >
                    <div class="note">
                        <span>Note:</span>
                        <p>
                            Can't Untag May Go Home (MGH) for patients that have not been tagged yet for May Go Home (MGH).
                        </p>
                    </div>
                </v-alert>
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
    <v-dialog v-if="isDischarge === null && isTagAsMgh !== null" :model-value="show" rounded="lg" scrollable @update:model-value="closeDialog" max-width="600px">
        <form @submit.prevent="openConfirmDialog">        
            <v-card rounded="lg">
                <v-toolbar density="compact" color="#107bac" hide-details>
                    <v-toolbar-title>Untag as May Go Home Patient : {{ selectedRowDetails.patient_Id }}</v-toolbar-title>
                    <v-btn color="white" @click="closeDialog">
                        <v-icon>mdi-close</v-icon>
                    </v-btn>
                </v-toolbar>
                <v-divider></v-divider>
                <v-card-text>
                    <v-card elevation="4">
                        <v-card-text>
                            <p>
                                <span style="font-weight: bold; font-style: italic;" >NOTE: </span>You are about to untag this registry from May Go Home Status.
                                Please specify in the remarks entry box the reason before pushing through with this process.
                            </p>
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

    const showDialog = ref(false);
    const isLoading = ref(false);

    const openConfirmDialog = async () => {
        showDialog.value = true;
    }
    const closeConfirmDialog = () => {
        showDialog.value = false;
    }

    const emits = defineEmits(['close-dialog', 'patient-registered']);
    
    const { selectedRowDetails } = storeToRefs(useSubcomponentSelectedRowDetailsStore()); 

    const payload = ref([
        {
            mgh_queue_no: 0,
        }
    ]);

    const closeDialog = () => {
        emits('patient-registered');
        emits('close-dialog');
    }

    const CloseAlertMessageDialog = () => {
        closeDialog();
    }

    const onSubmit = async () => {
        let response;
        isLoading.value = true;
        try{
            response = await useMethod("put", "untag-patient-maygohome", payload.value, "", payload.value.case_No);
            if(response) {
                useSnackbar(true, "green", response.message);
                isLoading.value = false;
                closeConfirmDialog();
                useSubComponents('UntagAsMgh', false)
            } 
        } catch(error) { 
            if (error.response && error.response.status === 400) {
                useSnackbar(true, "red", response.message || 'Patient has already been discharged or not been tagged as may go home.');
                isLoading.value = false;
            } else if(error.response && error.response.status === 404) {
                useSnackbar(true, "red", 'Incorrect Username or Passcode');
                isLoading.value = false;
            } else {  
                useSnackbar(true, "red", response.message || 'Tagged Failed');
                isLoading.value = false;
            }
        } finally {
            isLoading.value = false;
        }
    }

    const isDischarge = ref('');
    const isTagAsMgh = ref('')
    
    onUpdated(() => {
        if (selectedRowDetails.value && selectedRowDetails.value.id) {
            if (payload.value.id !== selectedRowDetails.value.id) { 
                payload.value.patient_Id        = selectedRowDetails.value.patient_Id ? selectedRowDetails.value.patient_Id : '';
                payload.value.suffix_id         = parseInt(selectedRowDetails.value.suffix_id) ? parseInt(selectedRowDetails.value.suffix_id) : '';
                payload.value.case_No           = selectedRowDetails.value.patient_registry && selectedRowDetails.value.patient_registry[0].case_No ? selectedRowDetails.value.patient_registry[0].case_No : '';

                isDischarge.value   = selectedRowDetails.value.patient_registry && selectedRowDetails.value.patient_registry[0].discharged_Date;
                isTagAsMgh.value    = selectedRowDetails.value.patient_registry && selectedRowDetails.value.patient_registry[0].mgh_Datetime;

            }
        } 
    })

</script>

<style scoped>
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