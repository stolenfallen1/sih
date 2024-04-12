<template>
    <v-dialog :model-value="form_dialog" :persistent="true" hide-overlay width="1120" scrollable>
        <form @submit.prevent="handleSubmit">
            <v-card rounded="lg">
                <v-toolbar density="compact" color="#6984ff" hide-details>
                    <v-toolbar-title>Inpatient Registration Form</v-toolbar-title>
                    <v-btn color="white" @click="closeDialog">
                        <v-icon>mdi-close</v-icon>
                    </v-btn>
                </v-toolbar>
                <v-card-text>
                    <v-expansion-panels
                        v-model="panel"
                        :disabled="disabled"
                        multiple
                        flat
                        variant="accordion"
                    >
                        <v-expansion-panel elevation="4">
                            <v-expansion-panel-title color="#2a73c5" class="expansion-title" :ripple="true">Patient Basic Information</v-expansion-panel-title>
                            <v-expansion-panel-text>
                                <patient-basic-info :payload="payload" />
                            </v-expansion-panel-text>
                        </v-expansion-panel>

                        <v-expansion-panel elevation="4">
                            <v-expansion-panel-title color="#2a73c5" class="expansion-title" :ripple="true">Registry Basic Information</v-expansion-panel-title>
                            <v-expansion-panel-text>
                                <registry-basic-info :payload="payload" :form_type="formType" />
                            </v-expansion-panel-text>
                        </v-expansion-panel>

                        <v-expansion-panel elevation="4">
                            <v-expansion-panel-title color="#2a73c5" class="expansion-title" :ripple="true">Other Details</v-expansion-panel-title>
                            <v-expansion-panel-text>
                                <other-details-info :payload="payload" :form_type="formType" />
                            </v-expansion-panel-text>
                        </v-expansion-panel>

                        <v-expansion-panel elevation="4">
                            <v-expansion-panel-title color="#2a73c5" class="expansion-title" :ripple="true">HMO . Guarantors</v-expansion-panel-title>
                            <v-expansion-panel-text>
                                <hmo-info :payload="payload" />
                            </v-expansion-panel-text>
                        </v-expansion-panel>

                        <v-expansion-panel elevation="4">
                            <v-expansion-panel-title color="#2a73c5" class="expansion-title" :ripple="true">Consultant . Physicians</v-expansion-panel-title>
                            <v-expansion-panel-text>
                                Some Content
                            </v-expansion-panel-text>
                        </v-expansion-panel>

                        <v-expansion-panel elevation="4">
                            <v-expansion-panel-title color="#2a73c5" class="expansion-title" :ripple="true">Allergies</v-expansion-panel-title>
                            <v-expansion-panel-text>
                                Some Content
                            </v-expansion-panel-text>
                        </v-expansion-panel>

                        <v-expansion-panel elevation="4">
                            <v-expansion-panel-title color="#2a73c5" class="expansion-title" :ripple="true">Notes . Remarks</v-expansion-panel-title>
                            <v-expansion-panel-text>
                                Some Content
                            </v-expansion-panel-text>
                        </v-expansion-panel>
                    </v-expansion-panels>
                </v-card-text>
                <v-divider></v-divider>
                <v-card-actions>
                    <v-btn color="blue-darken-1 border border-info border border-info" @click="closeDialog"> Close </v-btn>
                    <v-checkbox 
                        class="ml-8"
                        label="With consent from patient to access his/her records"
                        hide-details
                        density="compact"
                    ></v-checkbox>
                    <v-spacer></v-spacer>
                    <v-btn class="bg-primary text-white" type="submit">Register</v-btn>
                </v-card-actions>
            </v-card>
        </form>
    </v-dialog>
</template>

<script setup>

const props = defineProps({
    form_dialog:{
        type:Boolean,
        default:()=>false
    }
});

const panel = ref([0, 1]);
const disabled = ref(false);
const formType = ref('inpatient');

const payload = ref({});
const activateButton = ref(false);

const emits = defineEmits(['close-dialog']);

const closeDialog = () => {
    emits('close-dialog');
}

const handleMedicalPackage = () => {
    alert("Medical Package");
}

const handleAddress = () => {
    alert("Address");
}

const handleSubmit = () => {
    console.log(payload.value); // This might throw error when logging sir kay some required autocomplete / select fields only has empty array
}
</script>

<style scoped>
.expansion-title {
    font-size: 18px; 
    font-style: italic;
}
</style>