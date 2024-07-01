<template>
    <div>
        <v-dialog :model-value="open_revoke_form" rounded="lg" @update:model-value="closeDialog"  scrollable max-width="600px">
            <form @submit.prevent="openConfirmDialog">
                <v-card rounded="lg">
                    <v-toolbar density="compact" color="#107bac" hide-details>
                        <v-toolbar-title>Revoke Patient Form</v-toolbar-title>
                        <v-spacer></v-spacer>
                        <v-btn color="white" @click="closeDialog">
                            <v-icon>mdi-close</v-icon>
                        </v-btn>
                    </v-toolbar>
                    <v-divider></v-divider>
                    <v-card-text>
                        <v-row>
                            <v-col cols="12">
                                <v-card elevation="4">
                                    <v-card-text>
                                        <p>
                                            <span style="font-weight: bold; font-style: italic;" >NOTE: </span>&nbsp;This process will change the status of the Patient Registry from Active Registered Patient to 'Revoked'. 
                                            Please provide the necessary remarks for the revocation of the patient as to why. 
                                        </p>
                                    </v-card-text>
                                </v-card>
                            </v-col>
                            <v-col cols="12">
                                <v-textarea
                                    focused
                                    variant="outlined"
                                    v-model="payload.revoked_remarks"
                                    density="compact"
                                    label="Revoking Remarks"
                                    required
                                    hide-details
                                ></v-textarea>
                            </v-col>
                        </v-row>
                    </v-card-text>
                    <v-divider></v-divider>
                    <v-card-actions>
                        <v-btn variant="outlined" color="info" @click="closeDialog"> Close </v-btn>
                        <v-spacer></v-spacer>
                        <v-btn class="bg-primary text-white" type="submit">Revoke</v-btn>
                    </v-card-actions>
                </v-card>
            </form>
        </v-dialog>
    </div>
    <Confirmation 
        :show="confirmDialog"
        :payload="payload"
        @submit="onSubmit"
        @close="closeConfirmDialog"
    />
</template>
<script setup>
const props = defineProps({
    open_revoke_form: {
        type: Boolean,
        default: () => false,
    },
});

const { selectedRowDetails } = storeToRefs(useSubcomponentSelectedRowDetailsStore());
const emits = defineEmits(["close-dialog", "refresh-data"]);
const payload = ref({});
const confirmDialog = ref(false);

const closeDialog = () => {
    emits("close-dialog");
    payload.value = {};
};

const openConfirmDialog = () => {
    confirmDialog.value = true;
};

const closeConfirmDialog = () => {
    confirmDialog.value = false;
};

const onSubmit = async (user_details) => {
    if (user_details.user_passcode === usePasscode()) {
        const data = {
            patient_id: selectedRowDetails.value.patient_id,
            revoked_remarks: payload.value.revoked_remarks,
        };
        const response = await useMethod("put", "revoke-patient", data, "", selectedRowDetails.value.patient_id);
        if (response) {
            closeConfirmDialog();
            closeDialog();
            emits("refresh-data");
            return useSnackbar(true, "success", "Patient revoked successfully.");
        } else {
            return useSnackbar(true, "error", "Failed to revoke patient.");
        }
    } else {
        return useSnackbar(true, "error", "Password incorrect.");
    }
};
</script>