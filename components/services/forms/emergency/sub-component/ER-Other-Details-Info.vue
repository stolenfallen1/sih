<template>
    <v-card>
        <v-card-text>
            <v-row class="py-2">
                <v-col cols="6">
                    <fieldset class="pa-3 rounded-fieldset">
                        <legend class="pa-2">Patient Other Details</legend>
                        <v-row>
                            <v-col cols="4">
                                <v-list-subheader class="form-header">Birth Place</v-list-subheader>
                            </v-col>
                            <v-col>
                                <v-text-field
                                    variant="outlined"
                                    v-model="payload.birthplace"
                                    :readonly="clicked_option === 'view'"
                                    hide-details
                                    density="compact"
                                ></v-text-field>
                            </v-col>
                        </v-row>
                        <v-row>
                            <v-col cols="4">
                                <v-list-subheader class="form-header">Religion</v-list-subheader>
                            </v-col>
                            <v-col>
                                <v-autocomplete
                                    item-title="religion_name"
                                    item-value="id"
                                    v-model="payload.religion_id"
                                    :readonly="clicked_option === 'view'"
                                    hide-details
                                    :clearable="clicked_option === 'new' || clicked_option === 'edit'"
                                    :items="religion_data"
                                    density="compact"
                                    variant="outlined"
                                ></v-autocomplete>
                            </v-col>
                        </v-row>
                        <v-row>
                            <v-col cols="4">
                                <v-list-subheader class="form-header">Nationality</v-list-subheader>
                            </v-col>
                            <v-col>
                                <v-autocomplete
                                    item-title="nationality"
                                    item-value="id"
                                    v-model="payload.nationality_id"
                                    :readonly="clicked_option === 'view'"
                                    hide-details
                                    :clearable="clicked_option === 'new' || clicked_option === 'edit'"
                                    :items="nationality_data"
                                    density="compact"
                                    variant="outlined"
                                ></v-autocomplete>
                            </v-col>
                        </v-row>
                    </fieldset>
                </v-col>
                <v-col cols="6">
                    <fieldset class="pa-3 rounded-fieldset">
                        <legend class="pa-2">Patient ID's</legend>
                        <v-row>
                            <v-col cols="5">
                                <v-list-subheader class="form-header">ID Presented </v-list-subheader>
                            </v-col>
                            <v-col>
                                <v-autocomplete
                                    item-title="id_description"
                                    item-value="id"
                                    v-model="payload.id_presented"
                                    :readonly="clicked_option === 'view'"
                                    :clearable="clicked_option === 'new' || clicked_option === 'edit'"
                                    hide-details
                                    :items="id_types_data"
                                    density="compact"
                                    variant="outlined"
                                ></v-autocomplete>
                            </v-col>
                        </v-row>
                        <v-row>
                            <v-col cols="5">
                                <v-list-subheader class="form-header">ID Number </v-list-subheader>
                            </v-col>
                            <v-col>
                                <v-text-field
                                    variant="outlined"
                                    type="number"
                                    v-model="payload.id_number"
                                    :readonly="clicked_option === 'view'"
                                    hide-details
                                    density="compact"
                                ></v-text-field>
                            </v-col>
                        </v-row>
                        <v-row>
                            <v-col cols="5">
                                <v-list-subheader class="form-header">OSCA ID No.</v-list-subheader>
                            </v-col>
                            <v-col>
                                <v-text-field
                                    variant="outlined"
                                    type="number"
                                    v-model="payload.osca_id_no"
                                    :readonly="clicked_option === 'view'"
                                    hide-details
                                    density="compact"
                                ></v-text-field>
                            </v-col>
                        </v-row>
                    </fieldset>
                </v-col>
            </v-row>
            <v-row>
                <v-col cols="6">
                    <fieldset class="pa-3 rounded-fieldset">
                        <legend class="pa-2">Body Measures</legend>
                        <v-row>
                            <v-col cols="5">
                                <v-list-subheader class="form-header">Weight (kg)</v-list-subheader>
                            </v-col>
                            <v-col>
                                <v-text-field
                                    variant="outlined"
                                    type="number"
                                    v-model="payload.weight"
                                    :readonly="clicked_option === 'view'"
                                    @update:model-value="calculateBmi"
                                    hide-details
                                    density="compact"
                                ></v-text-field>
                            </v-col>
                        </v-row>
                        <v-row>
                            <v-col cols="5">
                                <v-list-subheader class="form-header">Height (cm)</v-list-subheader>
                            </v-col>
                            <v-col>
                                <v-text-field
                                    variant="outlined"
                                    type="number"
                                    v-model="payload.height"
                                    :readonly="clicked_option === 'view'"
                                    @update:model-value="calculateBmi"
                                    hide-details
                                    density="compact"
                                ></v-text-field>
                            </v-col>
                        </v-row>
                        <v-row>
                            <v-col cols="5">
                                <v-list-subheader class="form-header">BMI</v-list-subheader>
                            </v-col>
                            <v-col>
                                <v-text-field
                                    variant="outlined"
                                    v-model="payload.bmi"
                                    placeholder="Auto Generated"
                                    readonly
                                    hide-details
                                    density="compact"
                                ></v-text-field>
                            </v-col>
                        </v-row>
                    </fieldset>
                </v-col>
                <v-col cols="6">
                    <fieldset class="pa-3 rounded-fieldset">
                        <legend class="pa-2">Vital Signs</legend>
                        <v-row>
                            <v-col cols="5">
                                <v-list-subheader class="form-header">BP Systolic</v-list-subheader>
                            </v-col>
                            <v-col>
                                <v-text-field
                                    variant="outlined"
                                    v-model="payload.bloodPressureSystolic"
                                    :readonly="clicked_option === 'view'"
                                    hide-details
                                    density="compact"
                                ></v-text-field>
                            </v-col>
                        </v-row>
                        <v-row>
                            <v-col cols="5">
                                <v-list-subheader class="form-header">BP Diastolic</v-list-subheader>
                            </v-col>
                            <v-col>
                                <v-text-field
                                    variant="outlined"
                                    v-model="payload.bloodPressureDiastolic"
                                    :readonly="clicked_option === 'view'"
                                    hide-details
                                    density="compact"
                                ></v-text-field>
                            </v-col>
                        </v-row>
                        <v-row>
                            <v-col cols="5">
                                <v-list-subheader class="form-header">Temperature</v-list-subheader>
                            </v-col>
                            <v-col>
                                <v-text-field
                                    variant="outlined"
                                    v-model="payload.temperature"
                                    :readonly="clicked_option === 'view'"
                                    hide-details
                                    density="compact"
                                ></v-text-field>
                            </v-col>
                        </v-row>
                        <v-row>
                            <v-col cols="5">
                                <v-list-subheader class="form-header">Pulse Rate</v-list-subheader>
                            </v-col>
                            <v-col>
                                <v-text-field
                                    variant="outlined"
                                    v-model="payload.pulseRate"
                                    :readonly="clicked_option === 'view'"
                                    hide-details
                                    density="compact"
                                ></v-text-field>
                            </v-col>
                        </v-row>
                        <v-row>
                            <v-col cols="5">
                                <v-list-subheader class="form-header">Respitory</v-list-subheader>
                            </v-col>
                            <v-col>
                                <v-text-field
                                    variant="outlined"
                                    v-model="payload.respiratoryRate"
                                    :readonly="clicked_option === 'view'"
                                    hide-details
                                    density="compact"
                                ></v-text-field>
                            </v-col>
                        </v-row>
                        <v-row>
                            <v-col cols="5">
                                <v-list-subheader class="form-header">Oxygen Sat</v-list-subheader>
                            </v-col>
                            <v-col>
                                <v-text-field
                                    variant="outlined"
                                    v-model="payload.oxygenSaturation"
                                    :readonly="clicked_option === 'view'"
                                    hide-details
                                    density="compact"
                                ></v-text-field>
                            </v-col>
                        </v-row>
                    </fieldset>
                </v-col>
            </v-row>
        </v-card-text>
    </v-card>
    <v-divider class="py-2"></v-divider>
    <v-row class="px-2">
        <v-col cols="12">
            <v-col cols="12" class="form-col">
                <v-list-subheader class="form-header mt-1">Chief Complaints <span style="color: red;" class="mdi mdi-check"></span></v-list-subheader>
                <v-textarea 
                    ref="chief_Complaint_Description"
                    density="compact" 
                    variant="outlined" 
                    v-model="payload.chief_Complaint_Description"
                    :readonly="clicked_option === 'view'"
                    :required="form_type === 'emergency'"
                    :error-messages="formErrors.chief_Complaint_Description ? [formErrors.chief_Complaint_Description] : []"
                ></v-textarea>
            </v-col>
        </v-col>
    </v-row>
    <medical-package-list :medical_package_dialog="medical_package_dialog" @close-dialog="closeMedicalPackage" @handle-select="handleSelectPackage" />
</template>

<script setup>

const { selectedRowDetails } = storeToRefs(useSubcomponentSelectedRowDetailsStore());
const props = defineProps({
    payload: {
        type: Object,
        required: true,
        default: () => ({})
    },
    form_type: {
        type: String,
        required: true,
        default: () => ''
    },
    clicked_option: {
        type: String,
        default: () => ''
    },
    formErrors: {
        type: Object,
        default: () => ({})
    },
})

const medical_package_dialog = ref(false);
const isEmployee = ref(false);


const handleMedicalPackage = () => {
    medical_package_dialog.value = true;
};

const handleSelectPackage = () => {
    alert('Medical Package selected');
    medical_package_dialog.value = false;
}

const closeMedicalPackage = () => {
    medical_package_dialog.value = false;
};

const id_types_data = ref([]);
const id_types_loading = ref(false);
const getIdTypes = async () => {
    id_types_loading.value = true;
    const response = await useMethod("get", "get-id-types", "", "");
    if (response) {
        id_types_data.value = response;
        id_types_loading.value = false;
    } 
};


const calculateBmi = () => {
    if (props.payload.weight && props.payload.height) {
        const weight = parseFloat(props.payload.weight);
        const height = (parseFloat(props.payload.height))/100;
        const bmi = weight / (Math.pow(height, 2));
        props.payload.bmi = bmi.toFixed(2);
    } else {
        props.payload.bmi = "";
    }
}

const religion_data = ref([]);
const religion_loading = ref(false);
const getReligion = async () => {
    religion_loading.value = true;
    const response = await useMethod("get", "get-religions", "", "");
    if (response) {
        religion_data.value = response;
        religion_loading.value = false;
    }
}
const nationality_data = ref([]);
const nationality_loading = ref(false);
const getNationality = async () => {
    nationality_loading.value = true;
    const response = await useMethod("get", "get-nationalities", "", "");
    if (response) {
        nationality_data.value = response;
        nationality_loading.value = false;
    }
}

const death_types_data = ref([]);
const death_types_loading = ref(false);
const getDeathTypes = async () => {
    death_types_loading.value = true;
    const response = await useMethod("get", "get-death-type", "", "");
    if (response) {
        death_types_data.value = response;
        death_types_loading.value = false;
    } 
};

const mscComplaint_data = ref([]);
const mscComplaintsLoading = ref(false);
const getmscComplsints = async () => {
    mscComplaintsLoading.value = true;
    const response = await useMethod("get", "get-msc-complaint", "", "");
    if(response) {
        mscComplaint_data.value = response;
        mscComplaintsLoading.value = false;
    }
}
onMounted(() => {
    getReligion();
    getNationality();
    getmscComplsints();
    getIdTypes();
});
</script>

<style scoped>
    .form-header {
        color: #000;
        margin: -12px 04px -12px 0px;
        padding-left: 10px;
        font-weight: 500;
    }
    .form-col {
        padding: 3.25px 0px 3.25px 0px !important;
        margin: 0px !important;
    }
    .v-input--density-compact {
        --v-input-control-height: 20px !important;
    }

    .bottom-aligned-textarea textarea {
        display: flex;
        flex-direction: column;
        justify-content: flex-end; /* Align text at the bottom */
        height: 150px; /* Adjust height as needed */
        padding-bottom: 10px; /* Add padding if needed */
        box-sizing: border-box; /* Ensure padding is included in the height */
    }
    .truncate-text .v-input__control {
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
    }

    .truncate-text .v-field__input {
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        max-height: 32px; /* Adjust this value as needed to ensure a consistent height */
    }
    .field-group-label {
        color: #2196F3; 
    }
    .rounded-fieldset {
        padding: 16px;
        border-radius: 8px;
        border: 1px solid #c0c0c0;
    }

    .v-row {
        margin: -18px !important;
    }

    legend {
        padding-left: 10px;
        padding-right: 2px;
        font-size: 1.1rem;
    }

</style>