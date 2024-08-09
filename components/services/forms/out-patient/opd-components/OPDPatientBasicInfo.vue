<template>
    <v-row>
        <v-col cols="3">
            <v-col cols="12" class="form-col">
                <v-list-subheader class="form-header">Patient ID</v-list-subheader>
                <v-text-field
                    variant="solo"
                    v-model="payload.patient_id"
                    placeholder="Auto Generated"
                    readonly
                    hide-details
                    density="compact"
                ></v-text-field>
            </v-col>
            <v-col cols="12" class="form-col">
                <v-list-subheader class="form-header">Patient Case No.</v-list-subheader>
                <v-text-field
                    variant="solo"
                    v-model="payload.register_id_no"
                    placeholder="Auto Generated"
                    readonly
                    hide-details
                    density="compact"
                ></v-text-field>
            </v-col>
            <v-col cols="12" class="form-col">
                <v-list-subheader class="form-header">Last name <span style="color: red;" class="mdi mdi-check"></span></v-list-subheader>
                <v-text-field
                    v-model="payload.lastname"
                    :readonly="clicked_option === 'view'"
                    type="text"
                    autofocus
                    hide-details
                    density="compact"
                    variant="solo"
                    ></v-text-field>
            </v-col>
            <v-col cols="12" class="form-col">
                <v-list-subheader class="form-header">First name <span style="color: red;" class="mdi mdi-check"></span></v-list-subheader>
                <v-text-field
                    variant="solo"
                    v-model="payload.firstname"
                    :readonly="clicked_option === 'view'"
                    type="text"
                    hide-details
                    density="compact"
                ></v-text-field>
            </v-col>
            <v-col cols="12" class="form-col">
                <v-list-subheader class="form-header">Middle name</v-list-subheader>
                <v-text-field
                    variant="solo"
                    v-model="payload.middlename"
                    :readonly="clicked_option === 'view'"
                    hide-details
                    density="compact"
                ></v-text-field>
            </v-col>
        </v-col>
        <v-col cols="3">
            <v-col cols="12" class="form-col">
                <v-list-subheader class="form-header">Suffix</v-list-subheader>
                <v-autocomplete
                    item-title="abbreviations"
                    item-value="id"
                    :items="suffix_data"
                    v-model="payload.suffix_id"
                    :readonly="clicked_option === 'view'"
                    hide-details
                    :clearable="clicked_option === 'new' || clicked_option === 'edit'"
                    density="compact"
                    variant="solo"
                ></v-autocomplete>
            </v-col>
            <v-col cols="12" class="form-col">
                <v-list-subheader class="form-header">Sex <span style="color: red;" class="mdi mdi-check"></span></v-list-subheader>
                <v-autocomplete
                    :items="sex_data"
                    item-title="sex_description"
                    item-value="id"
                    v-model="payload.sex_id"
                    :readonly="clicked_option === 'view'"
                    :clearable="clicked_option === 'new' || clicked_option === 'edit'"
                    hide-details
                    density="compact"
                    variant="solo"
                ></v-autocomplete>
            </v-col>
            <v-col cols="12" class="form-col">
                <v-list-subheader class="form-header">Telephone No.</v-list-subheader>
                <v-text-field
                    variant="solo"
                    v-model="payload.telephone_number"
                    :readonly="clicked_option === 'view'"
                    type="number"
                    hide-details
                    density="compact"
                ></v-text-field>
            </v-col>
            <v-col cols="12" class="form-col">
                <v-list-subheader class="form-header">Mobile No.</v-list-subheader>
                <v-text-field
                    variant="solo"
                    v-model="payload.mobile_number"
                    :readonly="clicked_option === 'view'"
                    type="number"
                    hide-details
                    density="compact"
                ></v-text-field>
            </v-col>
            <v-col cols="12" class="form-col">
                <v-list-subheader class="form-header">Email Address</v-list-subheader>
                <v-text-field
                    variant="solo"
                    v-model="payload.email_address"
                    :readonly="clicked_option === 'view'"
                    type="email"
                    hide-details
                    density="compact"
                ></v-text-field>
            </v-col>
        </v-col>
        <v-col cols="3">
            <v-col cols="12" class="form-col">
                <v-list-subheader class="form-header">Civil Status <span style="color: red;" class="mdi mdi-check"></span></v-list-subheader>
                <v-autocomplete
                    :items="civil_status_data"
                    item-title="civil_status_description"
                    item-value="id"
                    v-model="payload.civilstatus_id"
                    :readonly="clicked_option === 'view'"
                    :clearable="clicked_option === 'new' || clicked_option === 'edit'"
                    hide-details
                    density="compact"
                    variant="solo"
                ></v-autocomplete>
            </v-col>
            <v-col cols="12" class="form-col">
                <v-list-subheader class="form-header">Birth Date <span style="color: red;" class="mdi mdi-check"></span></v-list-subheader>
                <v-text-field
                    variant="solo"
                    v-model="payload.birthdate"
                    :readonly="clicked_option === 'view'"
                    type="date"
                    hide-details
                    density="compact"
                    @update:model-value="updatebirthdate"
                ></v-text-field>
            </v-col>
            <v-col cols="12" class="form-col">
                <v-list-subheader class="form-header">Birth Time</v-list-subheader>
                <v-text-field
                    variant="solo"
                    v-model="payload.birthtime"
                    :readonly="clicked_option === 'view'"
                    readonly
                    hide-details
                    density="compact"
                ></v-text-field>
            </v-col>
            <v-col cols="12" class="form-col">
                <v-list-subheader class="form-header">Age</v-list-subheader>
                <v-text-field
                    variant="solo"
                    v-model="payload.age"
                    placeholder="Auto Compute"
                    readonly
                    type="number"
                    hide-details
                    density="compact"
                ></v-text-field>
            </v-col>
            <v-col cols="12" class="form-col">
                <v-list-subheader class="form-header">Alias</v-list-subheader>
                <v-text-field
                    variant="solo"
                    v-model="payload.alias"
                    :readonly="clicked_option === 'view'"
                    hide-details
                    density="compact"
                ></v-text-field>
            </v-col>
        </v-col>
        <v-col cols="3">
            <v-col cols="12" class="form-col">
                <v-list-subheader class="form-header">Temperature</v-list-subheader>
                <v-text-field
                    variant="solo"
                    v-model="payload.temperature"
                    :readonly="clicked_option === 'view'"
                    hide-details
                    density="compact"
                ></v-text-field>
            </v-col>
            <v-col cols="12" class="form-col">
                <v-row>
                    <v-col cols="6">
                        <v-list-subheader class="form-header">BP Sys</v-list-subheader>
                        <v-text-field
                            variant="solo"
                            v-model="payload.bloodPressureSystolic"
                            :readonly="clicked_option === 'view'"
                            hide-details
                            density="compact"
                        ></v-text-field>
                    </v-col>
                    <v-col cols="6">
                        <v-list-subheader class="form-header">BP Dias</v-list-subheader>
                        <v-text-field
                            variant="solo"
                            v-model="payload.bloodPressureDiastolic"
                            :readonly="clicked_option === 'view'"
                            hide-details
                            density="compact"
                        ></v-text-field>
                    </v-col>
                </v-row>
            </v-col>
            <v-col cols="12" class="form-col">
                <v-list-subheader class="form-header">Weight (kg)</v-list-subheader>
                <v-text-field
                    variant="solo"
                    type="number"
                    v-model="payload.weight"
                    :readonly="clicked_option === 'view'"
                    @update:model-value="calculateBmi"
                    hide-details
                    density="compact"
                ></v-text-field>
            </v-col>
            <v-col cols="12" class="form-col">
                <v-list-subheader class="form-header">Height (cm)</v-list-subheader>
                <v-text-field
                    variant="solo"
                    type="number"
                    v-model="payload.height"
                    :readonly="clicked_option === 'view'"
                    @update:model-value="calculateBmi"
                    hide-details
                    density="compact"
                ></v-text-field>
            </v-col>
            <v-col cols="12" class="form-col">
                <v-list-subheader class="form-header">BMI</v-list-subheader>
                <v-text-field
                    variant="solo"
                    v-model="payload.bmi"
                    placeholder="Auto Generated"
                    readonly
                    hide-details
                    density="compact"
                ></v-text-field>
            </v-col>
        </v-col>
    </v-row>
</template>

<script setup>
const props = defineProps({
    payload: {
        type: Object,
        required: true,
        default: () => ({})
    },
    clicked_option: {
        type: String,
        default: () => ''
    }
})

const sex_data = ref([]);
const sex_loading = ref(false);
const getSex = async () => {
    sex_loading.value = true;
    const response = await useMethod("get", "get-sex", "", "");
    if (response) {
        sex_data.value = response;
        sex_loading.value = false;
    } 
};
const civil_status_data = ref([]);
const civil_status_loading = ref(false);
const getCivilStatus = async () => {
    civil_status_loading.value = true;
    const response = await useMethod("get", "get-civil-status", "", "");
    if (response) {
        civil_status_data.value = response;
        civil_status_loading.value = false;
    } 
};
const suffix_data = ref([]);
const suffix_loading = ref(false);
const getSuffix = async () => {
    suffix_loading.value = true;
    const response = await useMethod("get", "get-suffix", "", "");
    if (response) {
        suffix_data.value = response;
        suffix_loading.value = false;
    }
}
const updatebirthdate = ()=>{
    props.payload.age = 0;
    if(props.payload.birthdate){
        props.payload.age = useCalculateAge(useDateMMDDYYY(props.payload.birthdate));
    }
}

const calculateBmi = () => {
    if (props.payload.weight && props.payload.height) {
        const weight = parseFloat(props.payload.weight);
        const height = parseFloat(props.payload.height);
        const bmi = weight / (height * height);
        props.payload.bmi = bmi.toFixed(2);
    } else {
        props.payload.bmi = "";
    }
}

onMounted(() => {
    getSex();
    getCivilStatus();
    getSuffix();
});
</script>

<style scoped>
.form-header {
    color: #000;
    margin: -12px 0px -12px 0px;
    font-weight: 500;
}
.form-col {
    padding: 3.25px 0px 3.25px 0px !important;
    margin: 0px !important;
}
</style>