<template>
    <v-row>
        <v-col cols="3">
            <v-col cols="12" class="form-col">
                <v-list-subheader class="form-header">
                    IPD Case Date<span style="color: red;" class="mdi mdi-check"></span>
                </v-list-subheader>
                <v-text-field
                    variant="underlined"
                    :value="handleCaseDate"
                    readonly
                    type="date"
                    density="compact"
                ></v-text-field>
            </v-col>
            <v-col cols="12" class="form-col">
                <v-list-subheader class="form-header">Register Source <span style="color: red;" class="mdi mdi-check"></span></v-list-subheader>
                <v-autocomplete
                    :items="register_source_data"
                    item-title="description"
                    item-value="id"
                    v-model="payload.register_Source"
                    :readonly="clicked_option === 'view'"
                    :clearable="clicked_option === 'new' || clicked_option === 'edit'"
                    density="compact"
                    variant="underlined"
                    :error-messages="formErrors.register_Source ? [formErrors.register_Source] : []"
                ></v-autocomplete>
            </v-col>
            <v-col cols="12" class="form-col">
                <v-list-subheader class="form-header">Register Casetype <span style="color: red;" class="mdi mdi-check"></span></v-list-subheader>
                <v-autocomplete
                    :items="register_casetype_data"
                    item-title="description"
                    item-value="id"
                    v-model="payload.register_Casetype"
                    :readonly="clicked_option === 'view'"
                    :clearable="clicked_option === 'new' || clicked_option === 'edit'"
                    density="compact"
                    variant="underlined"
                    :error-messages="formErrors.register_Casetype ? [formErrors.register_Casetype] : []"
                ></v-autocomplete>
            </v-col>
            <v-col cols="12" class="form-col">
                <v-list-subheader class="form-header">Transaction Type <span style="color: red;" class="mdi mdi-check"></span></v-list-subheader>
                <v-autocomplete
                    :items="transaction_type_data"
                    item-title="description"
                    item-value="id"
                    v-model="payload.mscAccount_trans_types"
                    :readonly="clicked_option === 'view'"
                    :clearable="clicked_option === 'new' || clicked_option === 'edit'"
                    density="compact"
                    variant="underlined"
                    :error-messages="formErrors.mscAccount_trans_types ? [formErrors.mscAccount_trans_types] : []"
                ></v-autocomplete>
            </v-col>
            <v-col cols="12" class="form-col">
                <v-list-subheader class="form-header">Hospitalization Plan <span style="color: red;" class="mdi mdi-check"></span></v-list-subheader>
                <v-autocomplete
                    :items="hospitalization_plan_data"
                    item-title="description"
                    item-value="id"
                    v-model="payload.mscAccount_type"
                    :readonly="clicked_option === 'view'"
                    :clearable="clicked_option === 'new' || clicked_option === 'edit'"
                    density="compact"
                    variant="underlined"
                    :error-messages="formErrors.mscAccount_type ? [formErrors.mscAccount_type] : []"
                ></v-autocomplete>
            </v-col>
        </v-col>
        <v-col cols="3">
            <v-col cols="12" class="form-col">
                <v-list-subheader class="form-header">Price Group <span style="color: red;" class="mdi mdi-check"></span></v-list-subheader>
                <v-autocomplete
                    :items="price_group_data"
                    item-title="description"
                    item-value="id"
                    v-model="payload.mscPrice_Groups"
                    :readonly="clicked_option === 'view'"
                    :clearable="clicked_option === 'new' || clicked_option === 'edit'"
                    density="compact"
                    variant="underlined"
                    :error-messages="formErrors.mscPrice_Groups ? [formErrors.mscPrice_Groups] : []"
                ></v-autocomplete>
            </v-col>
            <v-col cols="12" class="form-col">
                <v-list-subheader class="form-header">Price Scheme <span style="color: red;" class="mdi mdi-check"></span></v-list-subheader>
                <v-autocomplete
                    :items="price_scheme_data"
                    item-title="description"
                    item-value="id"
                    v-model="payload.mscPrice_Schemes"
                    :readonly="clicked_option === 'view'"
                    :clearable="clicked_option === 'new' || clicked_option === 'edit'"
                    density="compact"
                    variant="underlined"
                    :error-messages="formErrors.mscPrice_Schemes ? [formErrors.mscPrice_Schemes] : []"
                ></v-autocomplete>
            </v-col>
            <v-col cols="12" class="form-col">
                <v-row>
                    <v-col cols="7">
                        <v-list-subheader class="form-header">Room </v-list-subheader>
                        <v-text-field
                            v-model="payload.room_Id"
                            prepend-icon="mdi-plus-box"
                            @click:prepend="openHandleDiscountScheme"
                            readonly
                            class="cursor-pointer"
                            density="compact"
                            variant="underlined"
                        ></v-text-field>
                    </v-col>
                    <v-col cols="5">
                        <v-list-subheader class="form-header">Rate</v-list-subheader>
                        <v-text-field
                            v-model="payload.room_Rate"
                            readonly
                            class="cursor-pointer"
                            density="compact"
                            variant="underlined"
                        ></v-text-field>
                    </v-col>
                </v-row>
            </v-col>
            <v-col cols="12" class="form-col">
                <v-list-subheader class="form-header">Diet </v-list-subheader>
                <v-text-field
                    v-model="payload.mscDiet_Meal_Id"
                    prepend-icon="mdi-plus-box"
                    @click:prepend="openHandleDiscountScheme"
                    readonly
                    class="cursor-pointer"
                    density="compact"
                    variant="underlined"
                ></v-text-field>
            </v-col>
            <v-col cols="12" class="form-col">
                <v-list-subheader class="form-header">Disposition </v-list-subheader>
                <v-autocomplete
                    :items="disposition_data"
                    item-title="description"
                    item-value="id"
                    v-model="payload.mscDisposition_Id"
                    :readonly="clicked_option === 'view'"
                    :clearable="clicked_option === 'new' || clicked_option === 'edit'"
                    density="compact"
                    variant="underlined"
                ></v-autocomplete>
            </v-col>
        </v-col>
        <v-col cols="3">
            <h1>SPACE FOR MGA IPANG ADD TOMS</h1>
        </v-col>
        <v-col cols="3">
            <v-col cols="12" class="form-col">
                <v-list-subheader class="form-header">Service Type </v-list-subheader>
                <v-autocomplete
                    :items="service_type_data"
                    item-title="description"
                    item-value="id"
                    v-model="payload.mscService_Type"
                    :readonly="clicked_option === 'view'"
                    :clearable="clicked_option === 'new' || clicked_option === 'edit'"
                    density="compact"
                    variant="underlined"
                    :error-messages="formErrors.mscPrice_Groups ? [formErrors.mscPrice_Groups] : []"
                ></v-autocomplete>
            </v-col>
            <v-col cols="12" class="form-col">
                <v-list-subheader class="form-header">Patient Brought By </v-list-subheader>
                <v-autocomplete
                    :items="patient_brought_by"
                    item-title="description"
                    item-value="id"
                    v-model="payload.mscBroughtBy_Relationship_Id"
                    :readonly="clicked_option === 'view'"
                    :clearable="clicked_option === 'new' || clicked_option === 'edit'"
                    density="compact"
                    variant="underlined"
                    :error-messages="formErrors.mscPrice_Groups ? [formErrors.mscPrice_Groups] : []"
                ></v-autocomplete>
            </v-col>
            <v-col cols="12" class="form-col">
                <v-list-subheader class="form-header">ID Presented </v-list-subheader>
                <v-autocomplete
                    item-title="id_description"
                    item-value="id"
                    v-model="payload.id_presented"
                    :readonly="clicked_option === 'view'"
                    :clearable="clicked_option === 'new' || clicked_option === 'edit'"
                    :items="id_types_data"
                    density="compact"
                    variant="underlined"
                ></v-autocomplete>
            </v-col>
            <v-col cols="12" class="form-col">
                <v-list-subheader class="form-header">ID Number </v-list-subheader>
                <v-text-field
                    variant="underlined"
                    type="number"
                    v-model="payload.id_number"
                    :readonly="clicked_option === 'view'"
                    density="compact"
                ></v-text-field>
            </v-col>
            <v-col cols="12" class="form-col">
                <v-list-subheader class="form-header">Patient Identifier</v-list-subheader>
                <v-autocomplete
                    v-model="payload.patientIdentifier"
                    :items="patientIdentifiers"
                    item-title="name"
                    item-value="id"
                    :readonly="clicked_option === 'view'"
                    :clearable="clicked_option === 'new' || clicked_option === 'edit'"
                    variant="underlined"
                    density="compact"
                ></v-autocomplete>
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

const emits = defineEmits(['hospitalization-plan']);

let referring_hci_code = ref([]);
const open_discount_scheme_table = ref(false);
const open_referring_hci_code_table = ref(false);
const open_referring_hci_address_form = ref(false);
const open_diet_desc = ref(false);

const handleCaseDate = computed(() => {
    const today = new Date().toISOString().split('T')[0];
    props.payload.registry_date = today;
    return today;
});

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

// const patientIdentifiers = ref([
//     { id: 1, name: 'Hemo Patient' },
//     { id: 2, name: 'Peritoneal Patient' },
//     { id: 3, name: 'LINAC' },
//     { id: 4, name: 'COBALT' },
//     { id: 5, name: 'Blood Trans Patient' },
//     { id: 6, name: 'Chemo Patient' },
//     { id: 7, name: 'Brachytherapy Patient' },
//     { id: 8, name: 'Debridement' },
//     { id: 9, name: 'TB DOTS' },
//     { id: 10, name: 'PAD Patient' },
//     { id: 11, name: 'Radio Patient' },
// ]);
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

const register_source_data = ref([]);
const register_source_loading = ref(false);
const getRegisterSource = async () => {
    register_source_loading.value = true;
    const response = await useMethod("get", "get-admission-source", "", "");
    if (response) {
        register_source_data.value = response;
        register_source_loading.value = false;
    }
    if (props.form_type === "outpatient") {
        let opd_filter = ["Emergency Room", "Delivery Room", "Inpatient", "Direct Admission"];
        register_source_data.value = response.filter(item => !opd_filter.includes(item.description));
        let register_source = response.find(item => item.description === "Outpatient");
        props.payload.register_Source = parseInt(register_source.id);
    } else if (props.form_type === "emergency") {
        let register_source = response.find(item => item.description === "Emergency Room");
        props.payload.register_Source = parseInt(register_source.id);
    } else if (props.form_type === "inpatient") {
        let ipd_filter = ["Emergency Room", "Happydoc ", "Outpatient"];
        register_source_data.value = response.filter(item => !ipd_filter.includes(item.description));
        let register_source = response.find(item => item.description === "Inpatient");
        props.payload.register_Source = parseInt(register_source.id);
    } else {
        props.payload.register_Source = [];
    }
}

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
        let opd_filter = ["Emergency Case", "Inpatient Case"];
        transaction_type_data.value = response.filter(item => !opd_filter.includes(item.description));
        let transaction_type = response.find(item => item.description === "Outpatient Consultation");
        props.payload.mscAccount_trans_types = parseInt(transaction_type.id);
    } else if (props.form_type === "emergency") {
        let transaction_type = response.find(item => item.description === "Emergency Case");
        props.payload.mscAccount_trans_types = parseInt(transaction_type.id);
    } else if (props.form_type === "inpatient") {
        let ipd_filter = ["Emergency Case", "Outpatient Consultation", "HappyDoc OutPatient", "Annual Physical Examination", "Executive Checkup"];
        transaction_type_data.value = response.filter(item => !ipd_filter.includes(item.description));
        let transaction_type = response.find(item => item.description === "Inpatient Case");
        props.payload.mscAccount_trans_types = parseInt(transaction_type.id);
    } else {
        props.payload.mscAccount_trans_types = [];
    }
};

const register_casetype_data = ref([]);
const register_casetype_loading = ref(false);
const getRegisteryCaseType = async () => {
    register_casetype_loading.value = true;
    const response = await useMethod("get", "get-case-type", "", "");
    if (response) {
        register_casetype_data.value = response;
        register_casetype_loading.value = false;
    } 
    if (props.form_type === "outpatient") {
        let opd_filter = ["Emergency Patient", "Inpatient", "Ambulatory Patient"];
        register_casetype_data.value = response.filter(item => !opd_filter.includes(item.description));
        let register_casetype = response.find(item => item.description === "Outpatient");
        props.payload.register_Casetype = parseInt(register_casetype.id);
    } else if (props.form_type === "emergency") {
        let register_casetype = response.find(item => item.description === "Emergency Patient");
        props.payload.register_Casetype = parseInt(register_casetype.id);
    } else if (props.form_type === "inpatient") {
        let ipd_filter = ["Outpatient", "Emergency Patient", "Day Patient (Day Case)"];
        register_casetype_data.value = response.filter(item => !ipd_filter.includes(item.description));
        let register_casetype = response.find(item => item.description === "Inpatient");
        props.payload.register_Casetype = parseInt(register_casetype.id);
    } else {
        props.payload.register_Casetype = [];
    }
};

const hospitalization_plan_data = ref([]);
const hospitalization_plan_loading = ref(false);
const getHospitalizationPlan = async () => {
    hospitalization_plan_loading.value = true;
    const response = await useMethod("get", "get-hospital-plan", "", "");
    if (response) {
        hospitalization_plan_data.value = response;
        hospitalization_plan_loading.value = false;
    } 
};

const price_group_data = ref([]);
const price_group_loading = ref(false);
const getPriceGroup = async () => {
    price_group_loading.value = true;
    const response = await useMethod("get", "list-price-groups", "", "");
    if (response) {
        price_group_data.value = response;
        price_group_loading.value = false;
    } 
};
const price_scheme_data = ref([]);
const price_scheme_loading = ref(false);
const getPriceScheme = async () => {
    price_scheme_loading.value = true;
    const response = await useMethod("get", "list-price-schemes", "", "");
    if (response) {
        price_scheme_data.value = response;
        price_scheme_loading.value = false;
    } 
};

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
    const response = await useMethod("get", "get-services-type", "", "");
    if (response) {
        service_type_data.value = response;
        service_type_loading.value = false;
    } 
};

const patient_brought_by = ref([]);
const patient_brought_by_loading = ref(false);
const getPatientBroughtBy = async () => {
    patient_brought_by_loading.value = true;
    const response = await useMethod("get", "patient-brought-by", "", "");
    if(response) {
        patient_brought_by.value = response;
        patient_brought_by_loading.value = false;
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

onMounted(() => {
    getRegisterSource();
    getTransactionType();
    getRegisteryCaseType();
    getHospitalizationPlan();
    getPriceGroup();
    getPriceScheme();
    getDisposition();
    getServiceType();
    getPatientBroughtBy();
    getIdTypes();
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