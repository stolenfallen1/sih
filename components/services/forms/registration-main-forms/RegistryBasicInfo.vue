<template>
    <v-row>
        <v-col cols="4">
            <v-col cols="12" class="form-col">
                <v-list-subheader class="form-header">
                    {{ form_type === 'outpatient' ? 'OPD Case No.' : (form_type === 'emergency' ? 'ER Case No.' : 'IPD Case No.') }}
                </v-list-subheader>
                <v-text-field
                    variant="solo"
                    type="number"
                    v-model="payload.case_no"
                    placeholder="Auto Generated"
                    readonly
                    hide-details
                    density="compact"
                ></v-text-field>
            </v-col>
            <v-col cols="12" class="form-col">
                <v-list-subheader class="form-header">
                    {{ form_type === 'outpatient' ? 'OPD Case Date' : (form_type === 'emergency' ? 'ER Case Date' : 'IPD Case Date') }} <span style="color: red;" class="mdi mdi-check"></span>
                </v-list-subheader>
                <v-text-field
                    variant="solo"
                    v-model="payload.registry_date"
                    :readonly="clicked_option === 'view'"
                    type="date"
                    hide-details
                    density="compact"
                ></v-text-field>
            </v-col>
            <v-col cols="12" class="form-col">
                <v-list-subheader class="form-header">
                    {{ form_type === 'outpatient' ? 'OPD Registry Type' : (form_type === 'emergency' ? 'ER Registry Type' : 'IPD Registry Type') }} <span style="color: red;" class="mdi mdi-check"></span>
                </v-list-subheader>
                <v-autocomplete
                    :items="[]"
                    item-title="description"
                    item-value="id"
                    v-model="payload.register_type"
                    :readonly="clicked_option === 'view'"
                    :clearable="clicked_option === 'new' || clicked_option === 'edit'"
                    hide-details
                    density="compact"
                    variant="solo"
                ></v-autocomplete>
            </v-col>
            <v-col v-if="form_type === 'inpatient'" cols="12" class="form-col">
                <v-list-subheader class="form-header">
                    How admitted <span style="color: red;" class="mdi mdi-check"></span>
                </v-list-subheader>
                <v-autocomplete
                    item-title="how_admitted"
                    item-value="id"
                    v-model="payload.how_admitted"
                    :readonly="clicked_option === 'view'"
                    :clearable="clicked_option === 'new' || clicked_option === 'edit'"
                    hide-details
                    :items="[]"
                    density="compact"
                    variant="solo"
                ></v-autocomplete>
            </v-col>
            <v-col v-if="form_type === 'emergency'" cols="12" class="form-col">
                <v-list-subheader class="form-header">
                    Area / Bed No 
                </v-list-subheader>
                <v-autocomplete
                    item-title="area_bed_no"
                    item-value="id"
                    v-model="payload.area_bed_no"
                    :readonly="clicked_option === 'view'"
                    :clearable="clicked_option === 'new' || clicked_option === 'edit'"
                    hide-details
                    :items="[]"
                    density="compact"
                    variant="solo"
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
                    hide-details
                    density="compact"
                    variant="solo"
                ></v-autocomplete>
            </v-col>
            <v-col cols="12" class="form-col">
                <v-list-subheader class="form-header">Hospitalization Plan <span style="color: red;" class="mdi mdi-check"></span></v-list-subheader>
                <v-autocomplete
                    :items="hospitalizationPlans"
                    item-title="description"
                    item-value="id"
                    v-model="payload.hosp_plan"
                    :readonly="clicked_option === 'view'"
                    :clearable="clicked_option === 'new' || clicked_option === 'edit'"
                    hide-details
                    density="compact"
                    variant="solo"
                    @update:model-value="handleHospitalizationPlan"
                ></v-autocomplete>
            </v-col>
            <v-col cols="12" class="form-col">
                <v-list-subheader class="form-header">Membership</v-list-subheader>
                <v-autocomplete
                    item-title="membership"
                    item-value="id"
                    v-model="payload.msc_PHIC_Memberships"
                    :readonly="clicked_option === 'view'"
                    :clearable="clicked_option === 'new' || clicked_option === 'edit'"
                    hide-details
                    :items="[]"
                    density="compact"
                    variant="solo"
                ></v-autocomplete>
            </v-col>
        </v-col>
        <v-col cols="4">
            <v-col cols="12" class="form-col">
                <v-list-subheader class="form-header">Service Type</v-list-subheader>
                <v-autocomplete
                    item-title="service_type"
                    item-value="id"
                    v-model="payload.mscService_type"
                    :readonly="clicked_option === 'view'"
                    :clearable="clicked_option === 'new' || clicked_option === 'edit'"
                    hide-details
                    :items="[]"
                    density="compact"
                    variant="solo"
                ></v-autocomplete>
            </v-col>
            <v-col cols="12" class="form-col">
                <v-list-subheader class="form-header">Sub Service Type</v-list-subheader>
                <v-autocomplete
                    item-title="sub_service_type"
                    item-value="id"
                    v-model="payload.mscService_type2"
                    :readonly="clicked_option === 'view'"
                    :clearable="clicked_option === 'new' || clicked_option === 'edit'"
                    hide-details
                    :items="[]"
                    density="compact"
                    variant="solo"
                ></v-autocomplete>
            </v-col>
            <v-col cols="12" class="form-col">
                <v-list-subheader class="form-header">Price Group <span style="color: red;" class="mdi mdi-check"></span></v-list-subheader>
                <v-autocomplete
                    :items="price_group_data"
                    item-title="description"
                    item-value="id"
                    v-model="payload.mscPrice_Groups"
                    :readonly="clicked_option === 'view'"
                    :clearable="clicked_option === 'new' || clicked_option === 'edit'"
                    hide-details
                    density="compact"
                    variant="solo"
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
                    hide-details
                    density="compact"
                    variant="solo"
                ></v-autocomplete>
            </v-col>
            <v-col cols="12" class="form-col">
                <v-list-subheader class="form-header">Discount Scheme </v-list-subheader>
                <v-text-field
                    v-model="payload.mscAccount_discount_id"
                    hide-details
                    prepend-icon="mdi-plus-box"
                    @click:prepend="openHandleDiscountScheme"
                    readonly
                    class="cursor-pointer"
                    density="compact"
                    variant="solo"
                ></v-text-field>
            </v-col>
            <v-col v-if="form_type === 'inpatient'" cols="12" class="form-col">
                <v-list-subheader class="form-header">Diet Desc </v-list-subheader>
                <v-text-field
                    v-model="payload.diet_desc"
                    hide-details
                    prepend-icon="mdi-plus-box"
                    @click:prepend="openDietDesc"
                    class="cursor-pointer"
                    :readonly="clicked_option === 'view'"
                    density="compact"
                    variant="solo"
                ></v-text-field>
            </v-col>
        </v-col>
        <v-col cols="4">
            <v-col cols="12" class="form-col">
                <v-list-subheader class="form-header">OSCA ID No. </v-list-subheader>
                <v-text-field
                    variant="solo"
                    type="number"
                    v-model="payload.osca_id_no"
                    :readonly="clicked_option === 'view'"
                    hide-details
                    density="compact"
                ></v-text-field>
            </v-col>
            <v-col cols="12" class="form-col">
                <v-list-subheader class="form-header">ID Presented </v-list-subheader>
                <v-text-field
                    variant="solo"
                    v-model="payload.id_presented"
                    :readonly="clicked_option === 'view'"
                    hide-details
                    density="compact"
                ></v-text-field>
            </v-col>
            <v-col cols="12" class="form-col">
                <v-list-subheader class="form-header">ID Number </v-list-subheader>
                <v-text-field
                    variant="solo"
                    type="number"
                    v-model="payload.id_number"
                    :readonly="clicked_option === 'view'"
                    hide-details
                    density="compact"
                ></v-text-field>
            </v-col>
            <v-col v-if="form_type === 'inpatient'" cols="12" class="form-col">
                <v-list-subheader class="form-header">Newborn Status </v-list-subheader>
                <v-autocomplete
                    item-title="department"
                    item-value="id"
                    v-model="payload.newborn_status"
                    :readonly="clicked_option === 'view'"
                    :clearable="clicked_option === 'new' || clicked_option === 'edit'"
                    hide-details
                    :items="[]"
                    density="compact"
                    variant="solo"
                ></v-autocomplete>
            </v-col>
            <v-col v-if="form_type === 'inpatient'" cols="12" class="form-col">
                <v-list-subheader class="form-header">Source of Admission </v-list-subheader>
                <v-autocomplete
                    item-title="department"
                    item-value="id"
                    v-model="payload.source_of_admission"
                    :readonly="clicked_option === 'view'"
                    :clearable="clicked_option === 'new' || clicked_option === 'edit'"
                    hide-details
                    :items="[]"
                    density="compact"
                    variant="solo"
                ></v-autocomplete>
            </v-col>
            <v-col cols="12" class="form-col">
                <v-list-subheader class="form-header">Medical Social Service </v-list-subheader>
                <v-autocomplete
                    item-title="medical_social_service"
                    item-value="id"
                    v-model="payload.medical_social_service"
                    :readonly="clicked_option === 'view'"
                    :clearable="clicked_option === 'new' || clicked_option === 'edit'"
                    hide-details
                    :items="['A', 'B', 'C']"
                    density="compact"
                    variant="solo"
                ></v-autocomplete>
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
                    variant="solo"
                    density="compact"
                    hide-details
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
    }
});

const emits = defineEmits(['hospitalization-plan']);

let referring_hci_code = ref([]);
const open_discount_scheme_table = ref(false);
const open_referring_hci_code_table = ref(false);
const open_referring_hci_address_form = ref(false);
const open_diet_desc = ref(false);
const hospitalizationPlans = ["Self Pay", "Insurance", 'Company'];

const handleHospitalizationPlan = () => { 
    props.payload.hosp_plan = props.payload.hosp_plan;
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
        props.payload.mscAccount_trans_types = parseInt(register_type.id);
    } else if (props.form_type === "emergency") {
        let register_type = response.find(item => item.description === "Emergency Case");
        props.payload.mscAccount_trans_types = parseInt(register_type.id);
    } else if (props.form_type === "inpatient") {
        let register_type = response.find(item => item.description === "Inpatient Case");
        props.payload.mscAccount_trans_types = parseInt(register_type.id);
    } else {
        props.payload.mscAccount_trans_types = [];
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

onMounted(() => {
    getTransactionType();
    getPriceGroup();
    getPriceScheme();
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