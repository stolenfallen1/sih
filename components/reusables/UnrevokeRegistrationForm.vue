<template>
    <div>
        <v-dialog :model-value="open_unrevoke_form" rounded="lg" @update:model-value="closeDialog"  scrollable max-width="575px">
            <v-card rounded="lg">
                <v-toolbar density="compact" color="#107bac" hide-details>
                    <v-toolbar-title>Unrevoke Patient Form</v-toolbar-title>
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
                                        <span style="font-weight: bold; font-style: italic;" >NOTE: </span>&nbsp;This process will change the status of the Patient Registry from Revoked Patient to 'Active Registered Patient'.
                                        Press the 'Unrevoke' button to proceed. 
                                    </p>
                                </v-card-text>
                            </v-card>
                        </v-col>
                    </v-row>
                </v-card-text>
                <v-divider></v-divider>
                <v-card-actions>
                    <v-btn color="blue-darken-1 border border-info" @click="closeDialog"> Close </v-btn>
                    <v-spacer></v-spacer>
                    <v-btn class="bg-primary text-white" @click="onSubmit">Unrevoke</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </div>
</template>
<script setup>
const props = defineProps({
    open_unrevoke_form: {
        type: Boolean,
        default: () => false,
    },
});

const { selectedRowDetails } = storeToRefs(useSubcomponentSelectedRowDetailsStore());
const emits = defineEmits(["close-dialog", "refresh-data"]);

const closeDialog = () => {
    emits("close-dialog");
};

const onSubmit = async () => {
    const response = await useMethod("put", "unrevoke-patient", "", "", selectedRowDetails.value.patient_id);
    if (response) {
        closeDialog();
        emits("refresh-data");
        return useSnackbar(true, "success", "Patient unrevoked successfully.");
    } else {
        return useSnackbar(true, "error", "Failed to revoke patient.");
    }
};
</script>