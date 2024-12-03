<template>
    <v-dialog :model-value="show" rounded="lg" scrollable @update:model-value="closeDialog" max-width="600px">
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
                    <!-- <v-row class="mt-2">
                        <v-col cols="12">
                            <v-textarea
                                label="Remarks"
                                v-model="payload.remarks"
                                variant="outlined"
                                density="compact"
                                hide-details
                            ></v-textarea>
                        </v-col>
                    </v-row> -->
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

    const emits = defineEmits(['close-dialog']);
    
    const { selectedRowDetails } = storeToRefs(useSubcomponentSelectedRowDetailsStore()); 

    const payload = ref([
        {
            mgh_queue_no: 0,
        }
    ]);

    const closeDialog = () => {
        emits('close-dialog');
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

    onUpdated(() => {
        if (selectedRowDetails.value && selectedRowDetails.value.id) {
            if (payload.value.id !== selectedRowDetails.value.id) { 
                payload.value                   = Object.assign({}, selectedRowDetails.value);
                payload.value.patient_Id        = selectedRowDetails.value.patient_Id ? selectedRowDetails.value.patient_Id : '';
                payload.value.suffix_id         = parseInt(selectedRowDetails.value.suffix_id) ? parseInt(selectedRowDetails.value.suffix_id) : '';
                payload.value.case_No           = selectedRowDetails.value.patient_registry && selectedRowDetails.value.patient_registry[0].case_No ? selectedRowDetails.value.patient_registry[0].case_No : '';
            }
        } 
    })

</script>

<style scoped>
</style>