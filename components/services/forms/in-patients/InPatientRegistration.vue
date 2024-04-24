<template>
    <v-dialog :model-value="form_dialog" :persistent="true" hide-overlay width="1280" scrollable>
        <form @submit.prevent="handleSubmit">
            <v-card rounded="lg">
                <v-toolbar density="compact" color="#6984ff" hide-details>
                    <v-toolbar-title>Inpatient Registration Form</v-toolbar-title>
                    <v-btn color="white" @click="closeDialog">
                        <v-icon>mdi-close</v-icon>
                    </v-btn>
                </v-toolbar>
                <v-card-text>
                    <v-row>
                        <v-col cols="3">
                        <v-tabs
                            v-model="tab"
                            direction="vertical"
                            color="primary"
                            center-active
                            density="compact"
                        >
                            <v-tab value="0"><v-icon start>mdi-form-select</v-icon> Patient Basic Information </v-tab>
                            <v-tab value="1"><v-icon start>mdi-form-select</v-icon> Registry Information </v-tab>
                            <v-tab value="2"><v-icon start>mdi-form-select</v-icon> Other Details </v-tab>
                            <v-tab value="3"><v-icon start>mdi-form-select</v-icon> HMOs .Guarantors </v-tab>
                            <v-tab value="4"><v-icon start>mdi-form-select</v-icon> Consultants .Physicians </v-tab>
                            <v-tab value="5"><v-icon start>mdi-form-select</v-icon> Allergies </v-tab>
                            <v-tab value="6"><v-icon start>mdi-form-select</v-icon> Notes .Remarks </v-tab>
                        </v-tabs>
                        </v-col>
                        <v-divider vertical color="#2a73c5"></v-divider>
                        <v-col cols="9" class="scrollable-content">
                        <v-window v-model="tab">
                            <v-window-item class="pa-1">
                                <patient-basic-info :payload="payload" />
                            </v-window-item>
                            <v-window-item class="pa-1">
                                <registry-basic-info :payload="payload" :form_type="formType" />
                            </v-window-item>
                            <v-window-item class="pa-1">
                                <other-details-info :payload="payload" :form_type="formType" />
                            </v-window-item>
                            <v-window-item class="pa-1">
                                <hmo-info :payload="payload" />
                            </v-window-item>
                            <v-window-item class="pa-1">
                                <consultant-info :payload="payload" />
                            </v-window-item>
                            <v-window-item class="pa-1">
                                <allergies-info :payload="payload" />
                            </v-window-item>
                            <v-window-item class="pa-1">
                                <remarks-info :payload="payload" />
                            </v-window-item>
                        </v-window>
                        </v-col>
                    </v-row>
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

let tab = ref("0");
const formType = ref('inpatient');

const payload = ref({});

const emits = defineEmits(['close-dialog']);

const closeDialog = () => {
    emits('close-dialog');
    tab.value = "0";
}

const handleSubmit = () => {
    console.log(payload.value); // This might throw error when logging sir kay some required autocomplete / select fields only has empty array
    tab.value = "0";
}
</script>

<style scoped>
.expansion-title {
    font-size: 18px; 
    font-style: italic;
}
</style>