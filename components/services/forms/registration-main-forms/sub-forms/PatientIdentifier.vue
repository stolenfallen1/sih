<template>
    <v-dialog :model-value="open_patient_identifier" rounded="lg" @update:model-value="closeDialog" scrollable max-width="700px">       
        <v-card rounded="lg">
            <v-toolbar density="compact" color="#107bac" hide-details>
                <v-toolbar-title>Select all that applies</v-toolbar-title>
                <v-btn color="white" @click="closeDialog">
                    <v-icon>mdi-close</v-icon>
                </v-btn>
            </v-toolbar>
            <v-divider></v-divider>
            <v-card-text>
                <v-row>
                    <v-col cols="12">
                        <v-row>
                            <v-col cols="4" class="form-col">
                                <v-checkbox label="Hemo Patient" density="compact" hide-details v-model="selectedPatientIdentifier.isHemodialysis"></v-checkbox>
                            </v-col>
                            <v-col cols="4" class="form-col">
                                <v-checkbox label="Peritoneal" density="compact" hide-details v-model="selectedPatientIdentifier.isPeritoneal"></v-checkbox>
                            </v-col>
                            <v-col cols="4" class="form-col">
                                <v-checkbox label="LINAC" density="compact" hide-details v-model="selectedPatientIdentifier.isLINAC"></v-checkbox>
                            </v-col>
                            <v-col cols="4" class="form-col">
                                <v-checkbox label="COBALT" density="compact" hide-details v-model="selectedPatientIdentifier.isCOBALT"></v-checkbox>
                            </v-col>
                            <v-col cols="4" class="form-col">
                                <v-checkbox label="Blood Trans Patient" density="compact" hide-details v-model="selectedPatientIdentifier.isBloodTrans"></v-checkbox>
                            </v-col>
                            <v-col cols="4" class="form-col">
                                <v-checkbox label="Chemo Patient" density="compact" hide-details v-model="selectedPatientIdentifier.isChemotherapy"></v-checkbox>
                            </v-col>
                            <v-col cols="4" class="form-col">
                                <v-checkbox label="Brachytherapy" density="compact" hide-details v-model="selectedPatientIdentifier.isBrachytherapy"></v-checkbox>
                            </v-col>
                            <v-col cols="4" class="form-col">
                                <v-checkbox label="Debridement" density="compact" hide-details v-model="selectedPatientIdentifier.isDebridement"></v-checkbox>
                            </v-col>
                            <v-col cols="4" class="form-col">
                                <v-checkbox label="DOTS" density="compact" hide-details v-model="selectedPatientIdentifier.isTBDots"></v-checkbox>
                            </v-col>
                            <v-col cols="4" class="form-col">
                                <v-checkbox label="PAD" density="compact" hide-details v-model="selectedPatientIdentifier.isPAD"></v-checkbox>
                            </v-col>
                            <v-col cols="4" class="form-col">
                                <v-checkbox label="Radio Patient" density="compact" hide-details v-model="selectedPatientIdentifier.isRadioTherapy"></v-checkbox>
                            </v-col>
                        </v-row>
                    </v-col>
                </v-row>
            </v-card-text>
            <v-divider></v-divider>
            <v-card-actions>
                <v-btn color="blue-darken-1 border border-info" @click="closeDialog"> Close </v-btn>
                <v-spacer></v-spacer>
                <v-btn class="bg-primary text-white" @click="onSelect">Continue</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script setup>
const props = defineProps({
    open_patient_identifier: {
        type: Boolean,
        default: () => false,
        required: true,
    },
})

const selectedPatientIdentifier = ref([]);

const emits = defineEmits(['close-dialog', 'handle-select']);

const onSelect = () => {
    emits('handle-select', selectedPatientIdentifier.value);
    closeDialog();
}

const closeDialog = () => {
    emits('close-dialog');
    selectedPatientIdentifier.value = [];
}

</script>

<style scoped>
.form-col {
    padding: 3.25px 0px 3.25px 0px !important;
    margin: 0px !important;
}
</style>