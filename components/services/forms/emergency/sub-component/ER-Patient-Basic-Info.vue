<template>
    <v-card class="pa-4 mb-4">
        <v-card-title class="text-h6">Patient Information</v-card-title>
        <v-card-text>
            <v-row class="py-2">
                <v-col cols="4">
                    <v-col cols="12" class="form-col">
                        <v-list-subheader class="form-header">Patient ID</v-list-subheader>
                        <v-text-field
                            variant="outlined"
                            v-model="payload.patient_Id"
                            placeholder="Auto Generated"
                            readonly
                            hide-details
                            density="compact"
                        ></v-text-field>
                    </v-col>
                </v-col>
                <v-col cols="4">
                    <v-col cols="12" class="form-col">
                        <v-list-subheader class="form-header">Patient Case No.</v-list-subheader>
                        <v-text-field
                            variant="outlined"
                            v-model="payload.case_No"
                            placeholder="Auto Generated"
                            hide-details
                            readonly
                            density="compact"
                        ></v-text-field>
                    </v-col>
                </v-col>
                <v-col cols="4">
                    <v-col cols="12" class="form-col">
                        <v-list-subheader class="form-header">ER Case No.</v-list-subheader>
                        <v-text-field
                            variant="outlined"
                            v-model="payload.er_Case_No"
                            placeholder="Auto Generated"
                            hide-details
                            readonly
                            density="compact"
                        ></v-text-field>
                    </v-col>
                </v-col>
            </v-row>
            <v-divider class="py-2"></v-divider>
            <v-row class="py-2">
                <v-col cols="4">
                    <fieldset class="pa-2 rounded-fieldset">
                        <legend class="pa-2">Patient Name</legend>
                        <v-col cols="12" class="form-col">
                            <v-list-subheader class="form-header">Last name <span style="color: red;" class="mdi mdi-check"></span></v-list-subheader>
                            <v-text-field
                                ref="lastname"
                                v-model="payload.lastname"
                                :readonly="clicked_option === 'view'"
                                :type="enableConfidential ? 'password' : 'text'"
                                autofocus
                                hide-details
                                density="compact"
                                variant="outlined"
                                :error-messages="formErrors.lastname ? [formErrors.lastname] : []"
                            ></v-text-field>
                        </v-col>
                        <v-col cols="12" class="form-col">
                            <v-list-subheader class="form-header">First name <span style="color: red;" class="mdi mdi-check"></span></v-list-subheader>
                            <v-text-field
                                ref="firstname"
                                variant="outlined"
                                v-model="payload.firstname"
                                :readonly="clicked_option === 'view'"
                                autofocus
                                :type="enableConfidential ? 'password' : 'text'"
                                hide-details
                                density="compact"
                                :error-messages="formErrors.firstname ? [formErrors.firstname] : []"
                            ></v-text-field>
                        </v-col>
                        <v-col cols="12" class="form-col">
                            <v-list-subheader class="form-header">Middle name</v-list-subheader>
                            <v-text-field
                                variant="outlined"
                                v-model="payload.middlename"
                                :readonly="clicked_option === 'view'"
                                hide-details
                                density="compact"
                            ></v-text-field>
                        </v-col>
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
                                variant="outlined"
                            ></v-autocomplete>
                        </v-col>
                    </fieldset>
                </v-col>
                <v-col cols="4">
                    <fieldset class="pa-2 rounded-fieldset">
                        <legend class="pa-2">Patient Other Info</legend>
                        <v-col cols="12" class="form-col">
                            <v-list-subheader class="form-header">Sex <span style="color: red;" class="mdi mdi-check"></span></v-list-subheader>
                            <v-autocomplete
                                ref="sex_id"
                                :items="sex_data"
                                item-title="sex_description"
                                item-value="id"
                                v-model="payload.sex_id"
                                :clearable="(clicked_option === 'new' || clicked_option === 'edit') && !payload.sex_id"
                                :error-messages="formErrors.sex_id ? [formErrors.sex_id] : []"
                                hide-details
                                density="compact"
                                variant="outlined"
                            ></v-autocomplete>
                        </v-col>
                        <v-col cols="12" class="form-col">
                            <v-list-subheader class="form-header">Birth Date <span style="color: red;" class="mdi mdi-check"></span></v-list-subheader>
                            <v-text-field
                                ref="birthdate"
                                variant="outlined"
                                v-model="payload.birthdate"
                                :readonly="clicked_option === 'view'"
                                type="date"
                                :error-messages="formErrors.birthdate ? [formErrors.birthdate] : []"
                                hide-details
                                density="compact"
                                @update:model-value="updatebirthdate"
                            ></v-text-field>
                        </v-col>
                        <v-col cols="12" class="form-col">
                            <v-list-subheader class="form-header">Age</v-list-subheader>
                            <v-text-field
                                variant="outlined"
                                v-model="payload.age"
                                readonly
                                type="number"
                                hide-details
                                density="compact"
                            ></v-text-field>
                        </v-col>
                        <v-col cols="12" class="form-col">
                            <v-list-subheader class="form-header">Civil Status <span style="color: red;" class="mdi mdi-check"></span></v-list-subheader>
                            <v-autocomplete
                                ref="civilstatus_id"
                                :items="civil_status_data"
                                item-title="civil_status_description"
                                item-value="id"
                                v-model="payload.civilstatus_id"
                                :readonly="clicked_option === 'view'"
                                :clearable="clicked_option === 'new' || clicked_option === 'edit'"
                                :error-messages="formErrors.civilstatus_id ? [formErrors.civilstatus_id] : []"
                                hide-details
                                density="compact"
                                variant="outlined"
                            ></v-autocomplete>
                        </v-col>
                    </fieldset>
                </v-col>
                <v-col cols="4">
                    <fieldset class="pa-2 rounded-fieldset">
                        <legend class="pa-2">Patient Contact Info</legend>
                        <v-col cols="12" class="form-col">
                            <v-list-subheader class="form-header">Telephone No.</v-list-subheader>
                            <v-text-field
                                variant="outlined"
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
                                variant="outlined"
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
                                variant="outlined"
                                v-model="payload.email_address"
                                :readonly="clicked_option === 'view'"
                                type="email"
                                hide-details
                                density="compact"
                            ></v-text-field>
                        </v-col>
                        <v-col cols="12">
                            <v-checkbox
                                v-model="enableConfidential"
                                :label="`Confidential Patient`"
                                color="primary"
                            ></v-checkbox>
                        </v-col>
                    </fieldset>
                </v-col>
            </v-row>
            <v-divider class="py-2"></v-divider>
            <v-row>
                <v-col cols="12">
                    <v-col cols="12" class="form-col">
                        <v-list-subheader class="form-header">Patient Full Address</v-list-subheader>
                        <v-textarea 
                            hide-details 
                            density="compact" 
                            variant="outlined"
                            v-model="payload.address"
                            :value="fullAddress"
                            readonly
                            class="cursor-pointer"
                            prepend-icon="mdi-plus-box"
                            @click:prepend="handleOpenAddressForm"
                        ></v-textarea>
                    </v-col>
                </v-col>
            </v-row>
        </v-card-text>
    </v-card>
    <div v-if="parseInt(payload.civilstatus_id) === 2 || parseInt(payload.civilstatus_id) === 1" class="py-1">
        <v-card class="pa-4 mb-4">
            <v-card-title class="text-h6">Parent's / Guardian</v-card-title>
            <v-card-text>
                <v-row class="py-2">
                    <v-col cols="4">
                        <fieldset class="pa-2 rounded-fieldset">
                            <legend class="pa-2">Mother's Name</legend>
                            <v-col cols="12" class="form-col">
                                <v-list-subheader class="form-header">Mother Lastname </v-list-subheader>
                                <v-text-field
                                    variant="outlined"
                                    v-model="payload.motherLastname"
                                    :readonly="clicked_option === 'view'"
                                    hide-details
                                    density="compact"
                                ></v-text-field>
                            </v-col>
                            <v-col cols="12" class="form-col">
                                <v-list-subheader class="form-header">Mother Firstname </v-list-subheader>
                                <v-text-field
                                    variant="outlined"
                                    v-model="payload.motherFirstname"
                                    :readonly="clicked_option === 'view'"
                                    hide-details
                                    density="compact"
                                ></v-text-field>
                            </v-col>
                            <v-col cols="12" class="form-col">
                                <v-list-subheader class="form-header">Mother Middlename </v-list-subheader>
                                <v-text-field
                                    variant="outlined"
                                    v-model="payload.motherMiddlename"
                                    :readonly="clicked_option === 'view'"
                                    hide-details
                                    density="compact"
                                ></v-text-field>
                            </v-col>
                            <v-col cols="12" class="form-col">
                                <v-list-subheader class="form-header">Mothers Suffix </v-list-subheader>
                                <v-autocomplete
                                    item-title="abbreviations"
                                    item-value="id"
                                    :items="suffix_data"
                                    v-model="payload.motherSuffix_id"
                                    :readonly="clicked_option === 'view'"
                                    hide-details
                                    :clearable="clicked_option === 'new' || clicked_option === 'edit'"
                                    density="compact"
                                    variant="outlined"
                                ></v-autocomplete>
                            </v-col>
                        </fieldset>
                    </v-col>
                    <v-col cols="4">
                        <fieldset class="pa-2 rounded-fieldset">
                            <legend class="pa-2">Mother's Other Info</legend>
                            <v-col cols="12" class="form-col">
                                <v-list-subheader class="form-header">Birth Date </v-list-subheader>
                                <v-text-field
                                    variant="outlined"
                                    v-model="payload.motherBirthdate"
                                    :readonly="clicked_option === 'view'"
                                    type="date"
                                    hide-details
                                    density="compact"
                                    @update:model-value="updateMotherBirthdate"
                                ></v-text-field>
                            </v-col>
                            <v-col cols="12" class="form-col">
                                <v-list-subheader class="form-header">Age</v-list-subheader>
                                <v-text-field
                                    variant="outlined"
                                    v-model="payload.motherAge"
                                    readonly
                                    type="number"
                                    hide-details
                                    density="compact"
                                ></v-text-field>
                            </v-col>
                        </fieldset>
                    </v-col>
                    <v-col cols="4">
                        <fieldset class="pa-2 rounded-fieldset">
                            <legend class="pa-2">Mother's Contact Info</legend>
                            <v-col cols="12" class="form-col">
                                <v-list-subheader class="form-header">Mother's Telephone No. </v-list-subheader>
                                <v-text-field
                                    variant="outlined"
                                    v-model="payload.mothertelephone_number"
                                    :readonly="clicked_option === 'view'"
                                    hide-details
                                    density="compact"
                                ></v-text-field>
                            </v-col>
                            <v-col cols="12" class="form-col">
                                <v-list-subheader class="form-header">Mother's Mobile No. </v-list-subheader>
                                <v-text-field
                                    variant="outlined"
                                    v-model="payload.mothermobile_number"
                                    :readonly="clicked_option === 'view'"
                                    hide-details
                                    density="compact"
                                ></v-text-field>
                            </v-col>
                        </fieldset>
                    </v-col>
                </v-row>
                <v-divider class="py-2"></v-divider>
                <v-row>
                    <v-col cols="4">
                        <fieldset class="pa-2 rounded-fieldset">
                            <legend class="pa-2">Father's Name</legend>
                            <v-col cols="12" class="form-col">
                                <v-list-subheader class="form-header">Father Lastname </v-list-subheader>
                                <v-text-field
                                    variant="outlined"
                                    v-model="payload.fatherLastname"
                                    :readonly="clicked_option === 'view'"
                                    hide-details
                                    density="compact"
                                ></v-text-field>
                            </v-col>
                            <v-col cols="12" class="form-col">
                                <v-list-subheader class="form-header">Fathers Firstname </v-list-subheader>
                                <v-text-field
                                    variant="outlined"
                                    v-model="payload.fatherFirstname"
                                    :readonly="clicked_option === 'view'"
                                    hide-details
                                    density="compact"
                                ></v-text-field>
                            </v-col>
                            <v-col cols="12" class="form-col">
                                <v-list-subheader class="form-header">Father Middlename </v-list-subheader>
                                <v-text-field
                                    variant="outlined"
                                    v-model="payload.fatherMiddlename"
                                    :readonly="clicked_option === 'view'"
                                    hide-details
                                    density="compact"
                                ></v-text-field>
                            </v-col>
                            <v-col cols="12" class="form-col">
                                <v-list-subheader class="form-header">Fathers Suffix </v-list-subheader>
                                <v-autocomplete
                                    item-title="abbreviations"
                                    item-value="id"
                                    :items="suffix_data"
                                    v-model="payload.fatherSuffix_id"
                                    :readonly="clicked_option === 'view'"
                                    hide-details
                                    :clearable="clicked_option === 'new' || clicked_option === 'edit'"
                                    density="compact"
                                    variant="outlined"
                                ></v-autocomplete>
                            </v-col>
                        </fieldset>
                    </v-col>
                    <v-col cols="4">
                        <fieldset class="pa-2 rounded-fieldset">
                            <legend class="pa-2">Father's Other Info</legend>
                            <v-col cols="12" class="form-col">
                                <v-list-subheader class="form-header">Birth Date </v-list-subheader>
                                <v-text-field
                                    variant="outlined"
                                    v-model="payload.fatherBirthdate"
                                    :readonly="clicked_option === 'view'"
                                    type="date"
                                    hide-details
                                    density="compact"
                                    @update:model-value="updateFatherBirthdate"
                                ></v-text-field>
                            </v-col>
                            <v-col cols="12" class="form-col">
                                <v-list-subheader class="form-header">Age</v-list-subheader>
                                <v-text-field
                                    variant="outlined"
                                    v-model="payload.fatherAge"
                                    readonly
                                    type="number"
                                    hide-details
                                    density="compact"
                                ></v-text-field>
                            </v-col>
                        </fieldset>
                    </v-col>
                    <v-col cols="4">
                        <fieldset class="pa-2 rounded-fieldset">
                            <legend class="pa-2">Father's Contact Info</legend>
                            <v-col cols="12" class="form-col">
                                <v-list-subheader class="form-header">Father's Telephone No. </v-list-subheader>
                                <v-text-field
                                    variant="outlined"
                                    v-model="payload.fathertelephone_number"
                                    :readonly="clicked_option === 'view'"
                                    hide-details
                                    density="compact"
                                ></v-text-field>
                            </v-col>
                            <v-col cols="12" class="form-col">
                                <v-list-subheader class="form-header">Father's Telephone No. </v-list-subheader>
                                <v-text-field
                                    variant="outlined"
                                    v-model="payload.fathermobile_number"
                                    :readonly="clicked_option === 'view'"
                                    hide-details
                                    density="compact"
                                ></v-text-field>
                            </v-col>
                        </fieldset>
                    </v-col>
                </v-row>
            </v-card-text>
        </v-card>
    </div>
    <div v-if="parseInt(payload.civilstatus_id) === 3" class="py-1">
        <v-card class="pa-4 mb-4">
            <v-card-title class="text-h6">Spouse Information</v-card-title>
            <v-card-text>
                <v-row>
                    <v-col cols="6">
                        <v-col cols="12" class="form-col">
                            <v-list-subheader class="form-header">Spouse Lastname </v-list-subheader>
                            <v-text-field
                                variant="outlined"
                                v-model="payload.spLastname"
                                :readonly="clicked_option === 'view'"
                                hide-details
                                density="compact"
                            ></v-text-field>
                        </v-col>
                        <v-col cols="12" class="form-col">
                            <v-list-subheader class="form-header">Spouse Firstname </v-list-subheader>
                            <v-text-field
                                variant="outlined"
                                v-model="payload.spFirstname"
                                :readonly="clicked_option === 'view'"
                                hide-details
                                density="compact"
                            ></v-text-field>
                        </v-col>
                        <v-col cols="12" class="form-col">
                            <v-list-subheader class="form-header">Spouse Middlename </v-list-subheader>
                            <v-text-field
                                variant="outlined"
                                v-model="payload.spMiddlename"
                                :readonly="clicked_option === 'view'"
                                hide-details
                                density="compact"
                            ></v-text-field>
                        </v-col>
                    </v-col>

                    <v-col cols="6">
                        <v-col cols="12" class="form-col">
                            <v-list-subheader class="form-header">Spouse Suffix </v-list-subheader>
                            <v-autocomplete
                                item-title="abbreviations"
                                item-value="id"
                                :items="suffix_data"
                                v-model="payload.spSuffix_id"
                                :readonly="clicked_option === 'view'"
                                hide-details
                                :clearable="clicked_option === 'new'"
                                density="compact"
                                variant="outlined"
                            ></v-autocomplete>
                        </v-col>
        
                        <v-col cols="12" class="form-col">
                            <v-list-subheader class="form-header">Spouse Telephone No. </v-list-subheader>
                            <v-text-field
                                variant="outlined"
                                v-model="payload.sptelephone_number"
                                :readonly="clicked_option === 'view'"
                                hide-details
                                density="compact"
                            ></v-text-field>
                        </v-col>
    
                        <v-col cols="12" class="form-col">
                            <v-list-subheader class="form-header">Spouse Mobile No. </v-list-subheader>
                            <v-text-field
                                variant="outlined"
                                v-model="payload.spmobile_number"
                                :readonly="clicked_option === 'view'"
                                hide-details
                                density="compact"
                            ></v-text-field>
                        </v-col>
                    </v-col>
                </v-row>
            </v-card-text>
        </v-card>
    </div>
    <e-r-address-details-form :address_form_dialog="address_form_dialog" :payload="payload" @close-dialog="closeAddressForm" @handle-submit="handleSubmitAddress" />
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
    },
    formErrors: {
        type: Object,
        default: () => ({})
    },
})

const fullAddress = ref("");
const handleSubmitAddress = (address) => {
    console.log(address);
    const { bldgstreet, region_name, province_name, municipality_name, barangay_name, country_name } = address;
    const { region_id, province_id, municipality_id, barangay_id, country_id } = address;

    fullAddress.value = [bldgstreet, barangay_name, municipality_name, province_name, region_name, country_name].filter(Boolean).join(', '); 
    props.payload.address = {
        bldgstreet,
        region_id,
        province_id,
        municipality_id,
        barangay_id,
        country_id
    };
};

const sex_data = ref([]);
const sex_loading = ref(false);
const address_form_dialog = ref(false);
const enableConfidential = ref(false);

const handleOpenAddressForm = () => {
    if (props.clicked_option === 'view') return;
    address_form_dialog.value = true;
};

const closeAddressForm = () => {
    address_form_dialog.value = false;
};

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
        if(civil_status_data.value.length > 0) {
            props.payload.civilstatus_id = civil_status_data.value[1].id
        }
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

const updateMotherBirthdate = () => {
    props.payload.motherAge = 0;
    if(props.payload.motherBirthdate){
        props.payload.motherAge = useCalculateAge(useDateMMDDYYY(props.payload.motherBirthdate));
    }
}

const updateFatherBirthdate = () => {
    props.payload.fatherAge = 0;
    if(props.payload.fatherBirthdate){
        props.payload.fatherAge = useCalculateAge(useDateMMDDYYY(props.payload.fatherBirthdate));
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

    .fieldset-title {
        font-weight: bold;
        text-transform: uppercase;
        border-bottom: 1px solid #ccc;
        padding-bottom: 8px;
        margin-bottom: 16px;
    }
    .field-group-label {
        color: #2196F3; 
    }

    .rounded-fieldset {
        padding: 16px;
        border-radius: 8px;
        border: 1px solid #c0c0c0;
    }

</style>