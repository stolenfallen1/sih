<template>
    <v-dialog :model-value="form_dialog" :persistent="true" hide-overlay width="1280" scrollable>
        <form @submit.prevent="onSubmit">
            <v-card rounded="lg">
                <v-toolbar density="compact" color="#6984ff" hide-details>
                    <v-toolbar-title>Emergency Case Registration Form</v-toolbar-title>
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
                                <patient-basic-info :clicked_option="clicked_option" :payload="payload" />
                            </v-window-item>
                            <v-window-item class="pa-1">
                                <registry-basic-info :clicked_option="clicked_option" :payload="payload" :form_type="formType" />
                            </v-window-item>
                            <v-window-item class="pa-1">
                                <other-details-info :clicked_option="clicked_option" :payload="payload" :form_type="formType" />
                            </v-window-item>
                            <v-window-item class="pa-1">
                                <hmo-info :clicked_option="clicked_option" :payload="payload" />
                            </v-window-item>
                            <v-window-item class="pa-1">
                                <consultant-info :clicked_option="clicked_option" :payload="payload" />
                            </v-window-item>
                            <v-window-item class="pa-1">
                                <allergies-info :clicked_option="clicked_option" :payload="payload" />
                            </v-window-item>
                            <v-window-item class="pa-1">
                                <remarks-info :clicked_option="clicked_option" :payload="payload" />
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
                        :readonly="clicked_option === 'view'"
                        label="With consent from patient to access his/her records"
                        hide-details
                        density="compact"
                    ></v-checkbox>
                    <v-spacer></v-spacer>
                    <v-btn v-if="clicked_option === 'new' || clicked_option === 'edit'" class="bg-primary text-white" type="submit" @click="validateBeforeSubmit">
                        {{ clicked_option === 'new' ? 'Register Patient' : 'Update Patient' }}
                    </v-btn>
                </v-card-actions>
            </v-card>
        </form>
    </v-dialog>
</template>

<script setup>

const props = defineProps({
    form_dialog: {
        type:Boolean,
        default:()=>false
    },
    clicked_option: {
        type: String,
        default: () => ''
    }
});

let tab = ref("0");
const formType = ref('emergency');

const payload = ref({});
const checkType = ref(false);
const tab_payload = ref({
    patient_basic_info: true,
    registry_information: true,
})

const emits = defineEmits(['close-dialog']);

const closeDialog = () => {
    emits('close-dialog');
    tab.value = "0";
    payload.value = {};
}

const validation = () => {
    if(!payload.value.lastname || !payload.value.firstname || !payload.value.sex_id || !payload.value.civilstatus_id || !payload.value.birthdate) {
        alert('Please fill up all required fields');
        tab.value = "0";
        checkType.value = true;
        tab_payload.value.patient_basic_info = false;
    } else {
        if(!payload.value.case_datetime || !payload.value.case_type || !payload.value.mscAccount_trans_types || !payload.value.mscPatient_category || !payload.value.hosp_plan || !payload.value.mscPrice_Groups || !payload.value.mscPrice_Schemes) {
            alert('Please fill up all required fields');
            tab.value = "1";
            checkType.value = true;
            tab_payload.value.registry_information = false;
        } 
    }
}

const validateBeforeSubmit = () => {
    validation();
}

const onSubmit = () => {
    if(tab_payload.value.patient_basic_info && tab_payload.value.registry_information) {
        alert('Please fill up all required fields');
    } else {
        alert('Successfully Registered Patient!');
        tab.value = "0";
        payload.value = {};
        checkType.value = false;
        tab_payload.value = {
            patient_basic_info: true,
            registry_information: true,
        }
    }
}
</script>

<style scoped>
</style>