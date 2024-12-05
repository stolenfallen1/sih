<template>
    <div>
        <v-row class="py-4">
            <v-col cols="4">
                <fieldset class="pa-2 rounded-fieldset">
                    <legend class="pa-2">Registry Source & Plan</legend>
                    <v-col cols="12" class="form-col">
                        <v-list-subheader class="form-header">Register Source</v-list-subheader>
                        <v-autocomplete
                            variant="outlined"
                            :items="register_source_data"
                            item-title="description"
                            item-value="id"
                            v-model="payload.register_Source"
                            hide-details
                            density="compact"
                        ></v-autocomplete>
                    </v-col>
                    <v-col cols="12" class="form-col">
                        <v-col cols="12" class="form-col">
                            <v-list-subheader class="form-header">Transaction Type <span style="color: red;" class="mdi mdi-check"></span></v-list-subheader>
                            <v-autocomplete
                                ref="mscAccount_Trans_Types"
                                :items="transaction_type_data"
                                item-title="description"
                                item-value="id"
                                v-model="payload.mscAccount_Trans_Types"
                                :readonly="clicked_option === 'view'"
                                :clearable="clicked_option === 'new' || clicked_option === 'edit'"
                                density="compact"
                                variant="outlined"
                                :error-messages="formErrors.mscAccount_Trans_Types ? [formErrors.mscAccount_Trans_Types] : []"
                                hide-details
                            ></v-autocomplete>
                        </v-col>
                    </v-col>
                    <v-col cols="12" class="form-col">
                        <v-list-subheader class="form-header">Hospitalization Plan <span style="color: red;" class="mdi mdi-check"></span></v-list-subheader>
                        <v-autocomplete
                            ref="mscAccount_Type"
                            :items="hospitalization_plan_data"
                            item-title="description"
                            item-value="id"
                            v-model="payload.mscAccount_Type"
                            :readonly="clicked_option === 'view'"
                            :clearable="clicked_option === 'new' || clicked_option === 'edit'"
                            :error-messages="formErrors.mscAccount_Type ? [formErrors.mscAccount_Type] : []"
                            hide-details
                            density="compact"
                            variant="outlined"
                            @update:model-value="handleHospitalizationPlan"
                        ></v-autocomplete>
                    </v-col>
                    <v-col cols="12" class="form-col">
                        <v-list-subheader class="form-header">Price Group <span style="color: red;" class="mdi mdi-check"></span></v-list-subheader>
                        <v-autocomplete
                            ref="mscPrice_Groups"
                            :items="price_group_data"
                            item-title="description"
                            item-value="id"
                            v-model="payload.mscPrice_Groups"
                            :error-messages="formErrors.mscPrice_Groups ? [formErrors.mscPrice_Groups] : []"
                            hide-details
                            density="compact"
                            readonly
                            variant="outlined"
                        ></v-autocomplete>
                    </v-col>
                    <v-col cols="12" class="form-col">
                        <v-list-subheader class="form-header">Price Scheme <span style="color: red;" class="mdi mdi-check"></span></v-list-subheader>
                        <v-autocomplete
                            ref="mscPrice_Schemes"
                            :items="price_scheme_data"
                            item-title="description"
                            item-value="id"
                            v-model="payload.mscPrice_Schemes"
                            :disabled="clicked_option === 'view'"
                            :error-messages="formErrors.mscPrice_Schemes ? [formErrors.mscPrice_Schemes] : []"
                            hide-details
                            readonly
                            density="compact"
                            variant="outlined"
                        ></v-autocomplete>
                    </v-col>
                </fieldset>
            </v-col>
            <v-col cols="4">
                <fieldset class="pa-2 rounded-fieldset">
                    <legend class="pa-2">Registry Type & Service</legend>
                    <v-col cols="12" class="form-col">
                        <v-col cols="12" class="form-col">
                            <v-list-subheader class="form-header">Register Case Type</v-list-subheader>
                            <v-autocomplete
                                variant="outlined"
                                :items="register_case_type_data"
                                item-title="description"
                                item-value="id"
                                v-model="payload.register_Casetype"
                                hide-details
                                density="compact"
                            ></v-autocomplete>
                        </v-col>
                        <v-list-subheader class="form-header">
                            ER Case Date<span style="color: red;" class="mdi mdi-check"></span>
                        </v-list-subheader>
                        <v-text-field
                            ref="registry_date"
                            variant="outlined"
                            v-model="payload.registry_Date"
                            :readonly="clicked_option === 'view'"
                            type="date"
                            :error-messages="formErrors.registry_Date ? [formErrors.registry_Date] : []"
                            hide-details
                            density="compact"
                        ></v-text-field>
                    </v-col>
                    <v-col cols="12" class="form-col">
                        <v-list-subheader class="form-header">Patient Brought By</v-list-subheader>
                        <v-autocomplete
                            v-model="payload.mscBroughtBy_Relationship_Id"
                            :items="patientBroughtBy"
                            item-title="description"
                            item-value="id"
                            :readonly="clicked_option === 'view'"
                            :clearable="clicked_option === 'new' || clicked_option === 'edit'"
                            variant="outlined"
                            density="compact"
                            hide-details
                        ></v-autocomplete>
                    </v-col>
                    <v-col cols="12" class="form-col">
                        <v-list-subheader class="form-header">Service Type </v-list-subheader>
                        <v-autocomplete
                            :items="service_type_data"
                            item-title="description"
                            item-value="id"
                            variant="outlined"
                            v-model="payload.mscService_Type"
                            :readonly="clicked_option === 'view'"
                            hide-details
                            density="compact"
                        ></v-autocomplete>
                    </v-col>
                    <v-col cols="12" class="form-col">
                        <v-list-subheader class="form-header">Area / Bed No. </v-list-subheader>
                        <v-text-field
                            variant="outlined"
                            v-model="payload.er_Bedno"
                            :readonly="clicked_option === 'view'"
                            hide-details
                            density="compact"
                        ></v-text-field>
                    </v-col>
                </fieldset>
            </v-col>
            <v-col cols="4" class="py-3">
                <fieldset class="pa-2 rounded-fieldset">
                    <legend class="pa-2">Registry Death Info</legend>
                    <v-col cols="12" class="form-col">
                        <v-checkbox 
                            label="Dead on Arrival?" 
                            v-model="payload.dead_on_arrival" 
                            color="primary" 
                            :readonly="clicked_option === 'view'" 
                            hide-details 
                            density="compact"
                        ></v-checkbox>
                    </v-col>
                    <v-col cols="12" class="form-col">
                        <v-list-subheader :class="{'text-muted' : !payload.dead_on_arrival, 'form-header': true}">Date of Death</v-list-subheader>
                        <v-text-field
                                variant="outlined"
                                v-model="payload.dateOfDeath"
                                :disabled="!payload.dead_on_arrival"
                                :readonly="clicked_option === 'view'"
                                type="date"
                                hide-details
                                density="compact"
                            ></v-text-field>
                    </v-col>
                    <v-col cols="12" class="form-col">
                        <v-list-subheader :class="{'text-muted' : !payload.dead_on_arrival, 'form-header': true}">Time of Death</v-list-subheader>
                        <v-text-field
                            variant="outlined"
                            v-model="payload.timeOfDeath"
                            :disabled="!payload.dead_on_arrival"
                            :readonly="clicked_option === 'view'"
                            type="time"
                            density="compact"
                            hide-details
                        ></v-text-field>
                    </v-col>
                    <v-col cols="12" class="form-col">
                        <v-list-subheader :class="{'text-muted' : !payload.dead_on_arrival, 'form-header': true}">Type of Death</v-list-subheader>
                            <v-autocomplete
                                item-title="description"
                                item-value="id"
                                placeholder="Choose Type of Death"
                                v-model="payload.typeOfDeath_id"
                                :disabled="!payload.dead_on_arrival"
                                :readonly="clicked_option === 'view'"
                                hide-details
                                :clearable="clicked_option === 'new' || clicked_option === 'edit'"
                                :items="death_types_data"
                                density="compact"
                                variant="outlined"
                            ></v-autocomplete>
                    </v-col>
                </fieldset>
            </v-col>
        </v-row>
        <v-divider class="py-2"></v-divider>
        <v-row class="py-2">
            <v-col cols="6">
                <v-col cols="12" class="form-col">
                    <v-checkbox-btn
                        label="Referred from another hospital?"
                        v-model="enabled"
                        class="pe-2"
                        size="large"
                        color="primary"
                    ></v-checkbox-btn>
                </v-col>
            </v-col>
            <v-col cols="6">
                <v-col cols="12" class="form-col">
                    <v-list-subheader class="form-header">Dispostion</v-list-subheader>
                    <v-autocomplete
                        v-model="payload.mscDisposition_Id"
                        :items="disposition_data"
                        item-title="description"
                        item-value="id"
                        :readonly="clicked_option === 'view'"
                        :clearable="clicked_option === 'new' || clicked_option === 'edit'"
                        variant="outlined"
                        density="compact"
                        hide-details
                    ></v-autocomplete>
                </v-col>
            </v-col>
        </v-row>
        <v-divider class="py-2"></v-divider>
        <v-row class="py-2">
            <v-col cols="4">
                <fieldset class="pa-2 rounded-fieldset">
                    <legend class="pa-2">Refered From</legend>
                    <v-col cols="12" class="form-col">
                        <v-list-subheader :class="{'text-muted': !enabled && parseInt(payload.mscDisposition_Id) !== 3, 'form-header': true}">Refered From HCI</v-list-subheader>
                        <v-text-field
                            v-model="payload.referred_From_HCI"
                            :readonly="clicked_option === 'view'"
                            :clearable="clicked_option === 'new' || clicked_option === 'edit'"
                            :disabled="!enabled && parseInt(payload.mscDisposition_Id) !== 3"
                            variant="outlined"
                            density="compact"
                            hide-details
                        ></v-text-field>
                    </v-col>
                    <v-col cols="12" class="form-col">
                        <v-list-subheader :class="{'text-muted': !enabled && parseInt(payload.mscDisposition_Id) !== 3, 'form-header': true}"> Refered From HCI Code</v-list-subheader>
                        <v-text-field
                            v-model="payload.referred_From_HCI_code"
                            :readonly="clicked_option === 'view'"
                            :clearable="clicked_option === 'new' || clicked_option === 'edit'"
                            :disabled="!enabled && parseInt(payload.mscDisposition_Id) !== 3"
                            variant="outlined"
                            density="compact"
                            hide-details
                        ></v-text-field>
                    </v-col>
                    <v-col cols="12" class="form-col">
                        <v-list-subheader :class="{'text-muted': !enabled && parseInt(payload.mscDisposition_Id) !== 3, 'form-header': true}">Refered From HCI Address</v-list-subheader>
                        <v-textarea 
                            hide-details 
                            density="compact" 
                            variant="outlined"
                            v-model="payload.referred_From_HCI_address"
                            :disabled="!enabled && parseInt(payload.mscDisposition_Id) !== 3"
                            :value="!!payload.referred_From_HCI_address ? payload.referred_From_HCI_address : fullFromHCIAddress"
                            class="cursor-pointer"
                            readonly
                            prepend-icon="mdi-plus-box"
                            @click:prepend="handleOpenAddressForm"
                        ></v-textarea>
                    </v-col>
                </fieldset>
            </v-col>
            <v-col cols="4">
                <fieldset class="pa-2 rounded-fieldset">
                    <legend class="pa-2">Refered To</legend>
                    <v-col cols="12" class="form-col">
                        <v-list-subheader :class="{'text-muted': !enabled && parseInt(payload.mscDisposition_Id) !== 3, 'form-header': true}">Refered To HCI</v-list-subheader>
                        <v-text-field
                            v-model="payload.referred_To_HCI"
                            :readonly="clicked_option === 'view'"
                            :clearable="clicked_option === 'new' || clicked_option === 'edit'"
                            :disabled="!enabled && parseInt(payload.mscDisposition_Id) !== 3"
                            variant="outlined"
                            density="compact"
                            hide-details
                        ></v-text-field>
                    </v-col>
                    <v-col cols="12" class="form-col">
                        <v-list-subheader :class="{'text-muted': !enabled && parseInt(payload.mscDisposition_Id) !== 3, 'form-header': true}">Refered To HCI Code</v-list-subheader>
                        <v-text-field
                            v-model="payload.referred_To_HCI_code"
                            :readonly="clicked_option === 'view'"
                            :clearable="clicked_option === 'new' || clicked_option === 'edit'"
                            :disabled="!enabled && parseInt(payload.mscDisposition_Id) !== 3"
                            variant="outlined"
                            density="compact"
                            hide-details
                        ></v-text-field>
                    </v-col>
                    <v-col cols="12" class="form-col">
                        <v-list-subheader :class="{'text-muted': !enabled && parseInt(payload.mscDisposition_Id) !== 3, 'form-header': true}">Refered To HCI Address</v-list-subheader>
                        <v-textarea 
                            hide-details 
                            density="compact" 
                            variant="outlined"
                            v-model="payload.referred_To_HCI_address"
                            :disabled="!enabled && parseInt(payload.mscDisposition_Id) !== 3"
                            :value="!!payload.referred_To_HCI_address ? payload.referred_To_HCI_address : fullToHCIAddress"
                            readonly
                            class="cursor-pointer"
                            prepend-icon="mdi-plus-box"
                            @click:prepend="handleOpenAddressFormTo"
                        ></v-textarea>
                    </v-col>
                </fieldset>
            </v-col>

            <v-col cols="4">
                <fieldset class="pa-2 rounded-fieldset">
                    <legend class="pa-2">Referral Details</legend>
                    <v-col cols="12" class="form-col">
                        <v-list-subheader :class="{'text-muted': !enabled && parseInt(payload.mscDisposition_Id) !== 3, 'form-header': true}">Refering Doctor</v-list-subheader>
                        <v-text-field
                            v-model="payload.referring_Doctor"
                            :readonly="clicked_option === 'view'"
                            :clearable="clicked_option === 'new' || clicked_option === 'edit'"
                            :disabled="parseInt(payload.mscDisposition_Id) !== 3 && !enabled"
                            variant="outlined"
                            density="compact"
                            hide-details
                        ></v-text-field>
                    </v-col>
                    <v-col cols="12" class="form-col">
                        <v-list-subheader :class="{'text-muted': !enabled && parseInt(payload.mscDisposition_Id) !== 3, 'form-header': true}">Reason for Referal</v-list-subheader>
                        <v-textarea
                            v-model="payload.referral_Reason"
                            :readonly="clicked_option === 'view'"
                            :clearable="clicked_option === 'new' || clicked_option === 'edit'"
                            :disabled="parseInt(payload.mscDisposition_Id) !== 3 && !enabled"
                            variant="outlined"
                            hide-details
                        ></v-textarea>
                    </v-col>
                </fieldset>
            </v-col>
        </v-row>
        <e-r-address-details-form :address_form_dialog="address_form_dialog" :payload="payload" @close-dialog="closeAddressForm" @handle-submit="handleSubmitAddress" />
        <e-r-address-details-form :address_form_dialog="address_form_dialogTo" :payload="payload" @close-dialog="closeAddressFormTo" @handle-submit="handleSubmitAddressTo" />
    </div>

</template>

<script setup>
const props = defineProps({
    payload: {
        type: Object,
        required: true,
        default: () => ({mscAccount_type: null})
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
});

const emits = defineEmits(['hospitalization-plan', 'toggle-loader', 'update-progress']);

let referring_hci_code = ref([]);
const address_form_dialog = ref(false);
const address_form_dialogTo = ref(false);
const open_discount_scheme_table = ref(false);
const open_referring_hci_code_table = ref(false);
const open_referring_hci_address_form = ref(false);
const open_diet_desc = ref(false);
const enabled = ref(false)
const isDataReady = ref(false);
const value = ref(0)
const interval = ref(null)

const startLoader = () => {
    emits('toggle-loader', true);
    clearInterval(interval.value);
    value.value = 0;
    interval.value = setInterval(() => {
        if (value.value === 100) {
            value.value = 0 
        } else {
            value.value += 10
        }
        emits('update-progress', value.value);
    }, 1000)
}

const stopLoader = () => {
    emits('toggle-loader', false);
    clearInterval(interval.value);
    value.value = 0; 
    emits('update-progress', value.value);
};


// if(enabled) {
//     props.payload.append('payload.isreferredFrom', true)
// } else {
//     props.payload.append('payload.isreferredFrom', false)
// }
const handleHospitalizationPlan = () => { 
    props.payload.hosp_plan = props.payload.hosp_plan;
}

const handleOpenAddressForm = () => {
    if (props.clicked_option === 'view') return;
    address_form_dialog.value = true;
};

const handleOpenAddressFormTo = () => {
    if (props.clicked_option === 'view') return;
    address_form_dialogTo.value = true;
}

const fullFromHCIAddress = ref("");
const handleSubmitAddress = (referred_From_HCI_address) => {
    const { bldgstreet, region_name, province_name, municipality_name, barangay_name, country_name } = referred_From_HCI_address;
    const { region_id, province_id, municipality_id, barangay_id, country_id } = referred_From_HCI_address;

    fullFromHCIAddress.value = [bldgstreet, barangay_name, municipality_name, province_name, region_name, country_name]
        .filter(Boolean)
        .join(', ');
    props.payload.referred_From_HCI_address = {
        bldgstreet,
        region_id,
        province_id,
        municipality_id,
        barangay_id,
        country_id
    };
    props.payload.FromHCIAddress = fullFromHCIAddress.value;
};


const fullToHCIAddress = ref("");
const handleSubmitAddressTo = (referred_To_HCI_address) => {
    const { bldgstreet, region_name, province_name, municipality_name, barangay_name, country_name } = referred_To_HCI_address;
    const { region_id, province_id, municipality_id, barangay_id, country_id } = referred_To_HCI_address;

    fullToHCIAddress.value = [bldgstreet, barangay_name, municipality_name, province_name, region_name, country_name]
        .filter(Boolean)
        .join(', ');
    props.payload.referred_To_HCI_address = {
        bldgstreet,
        region_id,
        province_id,
        municipality_id,
        barangay_id,
        country_id
    };
    props.payload.ToHCIAddress = fullToHCIAddress.value;
};


const closeAddressForm = () => {
    address_form_dialog.value = false;
};

const closeAddressFormTo = () => {
    address_form_dialogTo.value = false;
}

const openHandleDiscountScheme = () => {
    open_discount_scheme_table.value = true;
}
const handleSelectDiscountScheme = (selected_item) => {
    // props.payload.discount_scheme = selected_item.item.description;
    // props.payload.discount_scheme_id = selected_item.item.id;
    open_discount_scheme_table.value = false;
}
const closeHandleDiscountScheme = () => {
    open_discount_scheme_table.value = false;
}

const openReferringHciCode = () => {
    open_referring_hci_code_table.value = true;
}
const handleReferringHciCode = (selected_item) => {
    referring_hci_code.value = selected_item.item;
    open_referring_hci_code_table.value = false;
}
const closeReferringHciCode = () => {
    open_referring_hci_code_table.value = false;
}

const openReferringHciAddress = () => {
    open_referring_hci_address_form.value = true;
}
const handleReferringHciAddress = () => {

}
const closeReferringHciAddress = () => {
    open_referring_hci_address_form.value = false;
}

const openDietDesc = () => {
    open_diet_desc.value = true;
}
const handleDietDesc = () => {
    alert('Diet Desc');
    open_diet_desc.value = false;
}
const closeDietDesc = () => {
    open_diet_desc.value = false;
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

const patientBroughtBy = ref([]);
const patientBroughtBy_loading = ref(false);
const getPatientBroughtBy = async () => {
    patientBroughtBy_loading.value = true;
    const response = await useMethod("get", "patient-brought-by", "", "");
    if(response) {
        patientBroughtBy.value = response;
        props.payload.mscBroughtBy_Relationship_Id = patientBroughtBy.value[0].id;
        patientBroughtBy_loading.value = false;
    }
};



const loadDespostion = async () => {
    const response = await useMethod("get","disposition");
    if(response) {
        console.log(response);
    } else {
        console.log('Error')
    }
}

const disposition_data = ref([]);
const disposition_loading = ref(false);
const getDisposition = async () => {
    disposition_loading.value = true;
    const response = await useMethod("get", "disposition", "", "");
    if (response) {
        disposition_data.value = response;
        disposition_loading.value = false;
    } 
};


const service_type_data = ref([]);
const service_type_loading = ref(false);
const getServiceType = async () => {
   service_type_loading.value = true;
    const response = await useMethod("get", "service-type", "", "");
    if (response) {
       service_type_data.value = response;
       service_type_loading.value = false;
    } 
};


const patientIdentifiers = ref([
    "Hemo Patient",
    "Peritoneal Patient",
    "LINAC",
    "COBALT",
    "Blood Trans Patient",
    "Chemo Patient",
    "Brachytherapy Patient",
    "Debridement",
    "TB DOTS",
    "PAD Patient",
    "Radio Patient",
])

// Fetch autocomplete / select items data
const transaction_type_data = ref([]);
const transaction_type_loading = ref(false);
const getTransactionType = async () => {
    transaction_type_loading.value = true;
    const response = await useMethod("get", "get-transaction-type", "", "");
    if (response) {
        transaction_type_data.value = response;
        transaction_type_loading.value = false;
    } 
    if (props.form_type === "outpatient") {
        let register_type = response.find(item => item.description === "Outpatient Consultation");
        props.payload.mscAccount_Trans_Types = parseInt(register_type.id);
    } else if (props.form_type === "emergency") {
        let register_type = response.find(item => item.description === "Emergency Case");
        props.payload.mscAccount_Trans_Types = parseInt(register_type.id);
    } else if (props.form_type === "inpatient") {
        let register_type = response.find(item => item.description === "Inpatient Case");
        props.payload.mscAccount_Trans_Types = parseInt(register_type.id);
    } else {
        props.payload.mscAccount_Trans_Types = [];
    }
};

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

const hospitalization_plan_data = ref([]);
const hospitalization_plan_loading = ref(false);
const getHospitalizationPlan = async () => {
    hospitalization_plan_loading.value = true;
    const response = await useMethod("get", "get-hospital-plan", "", "");
    if (response) {
        hospitalization_plan_data.value = response;
        console.log('Hospitalization Data : ', hospitalization_plan_data);
        if (!props.payload.mscAccount_Type && hospitalization_plan_data.value.length > 0) {
            props.payload.mscAccount_Type = hospitalization_plan_data.value[0].id;
        }
        hospitalization_plan_loading.value = false;
    } 
};

const register_source_data = ref([]);
const register_source_loading = ref(false);
const registerSource = async () => {
    register_source_loading.value = true;
    const response = await useMethod("get", "get-admission-source", "", "");
    if (response) {
        register_source_data.value = response.filter(source => source.description === 'Emergency Room');
        props.payload.register_Source = register_source_data.value[0].id
        console.log('Registry Source : ', register_source_data);
    }
    register_source_loading.value = false;
}

const register_case_type_data = ref([]);
const register_case_type_loading = ref(false);
const registerCaseType = async () => {
    register_case_type_loading.value = true;
    const response = await useMethod("get", "get-case-type", "", "");
    if (response) {
        register_case_type_data.value = response.filter(source => source.description === 'Emergency Patient');
        props.payload.register_Casetype = register_case_type_data.value[0].id;
    }
    register_case_type_loading.value = false;
}

const price_group_data = ref([]);
const price_group_loading = ref(false);

const getPriceGroup = async () => {
    price_group_loading.value = true;
    const response = await useMethod("get", "list-price-groups", "", "");
    if (response) {
        price_group_data.value = response;
        updatePriceGroup()
    }
    price_group_loading.value = false;
};

const price_scheme_data = ref([]);
const price_scheme_loading = ref(false);
const getPriceScheme = async () => {
    price_scheme_loading.value = true;
    const response = await useMethod("get", "list-price-schemes", "", "");
    if (response) {
        price_scheme_data.value = response;
        updatePriceScheme();
    } 
    price_scheme_loading.value = false;
};

const updatePriceGroup = () => {
    if (price_group_data.value.length > 0) {
        if (parseInt(props.payload.mscAccount_Type) === 1) {
            props.payload.mscPrice_Groups = price_group_data.value[1].id;
        } else {
            props.payload.mscPrice_Groups = price_group_data.value[1].id;
        }
    }
};

const updatePriceScheme = () => {
    if (price_scheme_data.value.length > 0) {
        if (parseInt(props.payload.mscAccount_Type) === 1) {
            props.payload.mscPrice_Schemes = price_scheme_data.value[0].id;
        } else {
            props.payload.mscPrice_Schemes = price_scheme_data.value[1].id;
        }
    }
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

const loadData = async () => {
    startLoader();
    try {
        await getTransactionType();
        await getDeathTypes();
        await getHospitalizationPlan();
        await getPriceGroup();
        await getPriceScheme();
        await getIdTypes();
        await getDisposition();
        await getPatientBroughtBy();
        await getNationality();
        await getServiceType();
        await registerSource();
        await registerCaseType();
        if(
            transaction_type_data && 
            death_types_data &&
            hospitalization_plan_data &&
            price_group_data &&
            price_scheme_data &&
            id_types_data &&
            disposition_data &&
            patientBroughtBy &&
            nationality_data &&
            service_type_data &&
            register_source_data &&
            register_case_type_data

        ) {
            stopLoader();
        }
    } catch(error) {
        console.log('ERROR! ' + error);
    } finally {
        isDataReady.value = true;
        stopLoader();
    }

}


onMounted(() => {
    loadData();
});

watch(() => props.payload.mscAccount_Type, (newVal, oldVal) => {
    if (newVal !== oldVal) {
        updatePriceGroup();
        updatePriceScheme();
    }
});

watch(() => enabled,(newValue) => {
    props.payload.isreferredFrom = newValue ? true : false;
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

    .text-muted {
        color: #6c757d; /* Muted text color */
        opacity: 0.7;   /* Optional: Slightly reduces opacity */
    }
    .rounded-fieldset {
        padding: 16px;
        border-radius: 8px;
        border: 1px solid #c0c0c0;
    }

    .data-loader {
        position: fixed;
        top: 0;
        left: 0;
        width: 80vw;
        height: 100vh;
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: rgba(0, 0, 0, 0.1);
        z-index: 99999;
    }

    .overlay {
        display: flex;
        justify-content: center;
        align-items: center;
    }

</style>