<template>
    <v-row>
        <v-col cols="6">
            <v-row>
                <v-col cols="12" class="form-group">
                    <label class="form-label">Register Source <span style="color: red;">*</span></label>
                    <div class="select-wrapper">
                        <select class="form-select" :class="{ 'input-error': formErrors.register_Source }" :disabled="clicked_option === 'view'" v-model="payload.register_Source">
                            <option v-for="(item, index) in register_source_data" :key="index" :value="item.id">
                                {{ item.description }}
                            </option>
                        </select>
                        <span class="arrow-icon mdi mdi-chevron-down"></span>
                    </div>
                </v-col>
            </v-row>
            <v-row>
                <v-col cols="12" class="form-group">
                    <label class="form-label">Register CaseType <span style="color: red;">*</span></label>
                    <div class="select-wrapper">
                        <select class="form-select" :class="{ 'input-error': formErrors.register_Casetype }" :disabled="clicked_option === 'view'" v-model="payload.register_Casetype">
                            <option v-for="(item, index) in register_casetype_data" :key="index" :value="item.id">
                                {{ item.description }}
                            </option>
                        </select>
                        <span class="arrow-icon mdi mdi-chevron-down"></span>
                    </div>
                </v-col>
            </v-row>
            <v-row>
                <v-col cols="12" class="form-group">
                    <label class="form-label">Transaction Type <span style="color: red;">*</span></label>
                    <div class="select-wrapper">
                        <select class="form-select" :class="{ 'input-error': formErrors.mscAccount_Trans_Types }" :disabled="clicked_option === 'view'" v-model="payload.mscAccount_Trans_Types">
                            <option v-for="(item, index) in transaction_type_data" :key="index" :value="item.id">
                                {{ item.description }}
                            </option>
                        </select>
                        <span class="arrow-icon mdi mdi-chevron-down"></span>
                    </div>
                </v-col>
            </v-row>
            <v-row>
                <v-col cols="12" class="form-group">
                    <label class="form-label">Hospital Plan <span style="color: red;">*</span></label>
                    <div class="select-wrapper">
                        <select class="form-select" :class="{ 'input-error': formErrors.mscAccount_Type }" :disabled="clicked_option === 'view'" v-model="payload.mscAccount_Type">
                            <option v-for="(item, index) in hospitalization_plan_data" :key="index" :value="item.id" :selected="payload.mscAccount_Type === item.id ? true : false">
                                {{ item.description }}
                            </option>
                        </select>
                        <span class="arrow-icon mdi mdi-chevron-down"></span>
                    </div>
                </v-col>
            </v-row>
            <v-row>
                <v-col cols="12" class="form-group">
                    <label class="form-label">Price Group <span style="color: red;">*</span></label>
                    <div class="select-wrapper">
                        <select class="form-select" :class="{ 'input-error': formErrors.mscPrice_Groups }" :disabled="clicked_option === 'view'" v-model="payload.mscPrice_Groups">
                            <option v-for="(item, index) in price_group_data" :key="index" :value="item.id" >
                                {{ item.description }}
                            </option>
                        </select>
                        <span class="arrow-icon mdi mdi-chevron-down"></span>
                    </div>
                </v-col>
            </v-row>
            <v-row>
                <v-col cols="12" class="form-group">
                    <label class="form-label">Price Scheme <span style="color: red;">*</span></label>
                    <div class="select-wrapper">
                        <select class="form-select" :class="{ 'input-error': formErrors.mscPrice_Schemes }"  v-model="payload.mscPrice_Schemes">
                            <option 
                                v-for="scheme in price_scheme_data" 
                                :key="scheme.id" 
                                :value="scheme.id" :selected="scheme.id == filteredPriceSchemes[0].id ? true : false">
                                {{ scheme.description }}
                            </option>
                           <!-- <option v-if="filteredPriceSchemes.length > 0" :value="filteredPriceSchemes[0].id">
                                {{ filteredPriceSchemes[0].description }} {{ filteredPriceSchemes.length }}
                            </option> -->
                        </select>
                        <span class="arrow-icon mdi mdi-chevron-down"></span>
                    </div>
                </v-col>
            </v-row>
            <v-row>
                <v-col cols="12" class="form-group">
                    <label class="form-label">Service Type</label>
                    <div class="select-wrapper">
                        <select class="form-select" :disabled="clicked_option === 'view'" v-model="payload.mscService_Type">
                            <option v-for="(item, index) in service_type_data" :key="index" :value="item.id">
                                {{ item.description }}
                            </option>
                        </select>
                        <span class="arrow-icon mdi mdi-chevron-down"></span>
                    </div>
                </v-col>
            </v-row>
        </v-col>
        <v-col cols="6">
            <v-row>
                <v-col cols="12" class="form-group">
                    <label class="form-label">Case Indicator</label>
                    <div class="select-wrapper">
                        <select class="form-select" :disabled="clicked_option === 'view'" v-model="payload.mscCase_Indicators_Id">
                            <option v-for="(item, index) in case_indicator_data" :key="index" :value="item.id">
                                {{ item.description }}
                            </option>
                        </select>
                        <span class="arrow-icon mdi mdi-chevron-down"></span>
                    </div>
                </v-col>
            </v-row>
            <v-row>
                <v-col cols="12" class="form-group">
                    <label class="form-label">Medical Package</label>
                    <span class="mdi mdi-plus-box" style="cursor: pointer; margin-right: 10px;" @click="openMedicalPackageList" :disabled="clicked_option === 'view'"></span>
                    <input
                        v-model="payload.medical_Package_Name"
                        class="form-input"
                        readonly
                    />
                </v-col>
            </v-row>
            <v-row>
                <v-col cols="12" class="form-group">
                    <label class="form-label">Companion</label>
                    <div class="select-wrapper">
                        <select class="form-select" :disabled="clicked_option === 'view'" v-model="payload.mscBroughtBy_Relationship_Id">
                            <option v-for="(item, index) in patient_brought_by" :key="index" :value="item.id">
                                {{ item.description }}
                            </option>
                        </select>
                        <span class="arrow-icon mdi mdi-chevron-down"></span>
                    </div>
                </v-col>
            </v-row>
            <v-row>
                <v-col cols="12" class="form-group">
                    <label class="form-label">ID Presented</label>
                    <div class="select-wrapper">
                        <select class="form-select" :disabled="clicked_option === 'view'" v-model="payload.id_presented">
                            <option v-for="(item, index) in id_types_data" :key="index" :value="item.id">
                                {{ item.id_description }}
                            </option>
                        </select>
                        <span class="arrow-icon mdi mdi-chevron-down"></span>
                    </div>
                </v-col>
            </v-row>
            <v-row>
                <v-col cols="12" class="form-group">
                    <label class="form-label">ID Number</label>
                    <input
                        type="number"
                        v-model="payload.id_number"
                        class="form-input"
                        :disabled="clicked_option === 'view'"
                    />
                </v-col>
            </v-row>
            <v-row>
                <v-col cols="12" class="form-group">
                    <label class="form-label">Patient Identifier</label>
                    <div class="select-wrapper">
                        <select class="form-select" :disabled="clicked_option === 'view'" v-model="payload.patientIdentifier">
                            <option v-for="(item, index) in patientIdentifiers" :key="index" :value="item.id">
                                {{ item.name }}
                            </option>
                        </select>
                        <span class="arrow-icon mdi mdi-chevron-down"></span>
                    </div>
                </v-col>
            </v-row>
        </v-col>
    </v-row>

    <o-p-d-medical-package-list :open_medical_package_list="open_medical_package_list" @close-dialog="closeMedicalPackageList" @handle-select="handleSelectPackage" />
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

const open_medical_package_list = ref(false);

const openMedicalPackageList = () => {
    open_medical_package_list.value = true;
}
const handleSelectPackage = (selected_item) => {
    props.payload.medical_Package_Id = selected_item[0].id;
    props.payload.medical_Package_Name = selected_item[0].package_description;
    props.payload.medical_Package_Amount = selected_item[0].package_amount;
};
const closeMedicalPackageList = () => {
    open_medical_package_list.value = false;
}

const patientIdentifiers = ref([
    { id: 1, name: 'Hemo Patient' },
    { id: 2, name: 'Peritoneal Patient' },
    { id: 3, name: 'LINAC' },
    { id: 4, name: 'COBALT' },
    { id: 5, name: 'Blood Trans Patient' },
    { id: 6, name: 'Chemo Patient' },
    { id: 7, name: 'Brachytherapy Patient' },
    { id: 8, name: 'Debridement' },
    { id: 9, name: 'TB DOTS' },
    { id: 10, name: 'PAD Patient' },
    { id: 11, name: 'Radio Patient' },
]);

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
        props.payload.mscAccount_Trans_Types = parseInt(transaction_type.id);
    } else {
        props.payload.mscAccount_Trans_Types = [];
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
    if (props.form_type === "outpatient") {
        let opd_filter = ["Emergency Patient", "Inpatient", "Ambulatory Patient"];
        price_group_data.value = response.filter(item => !opd_filter.includes(item.description));
        let price_group = response.find(item => item.description === "Standard");
        props.payload.mscPrice_Groups = parseInt(price_group.id);
    } else {
        props.payload.mscPrice_Groups = [];
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

const case_indicator_data = ref([]);
const case_indicator_loading = ref(false);
const getCaseIndicator = async () => {
    case_indicator_loading.value = true;
    const response = await useMethod("get", "get-case-indicators", "", "");
    if(response) {
        case_indicator_data.value = response;
        case_indicator_loading.value = false;
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

const filteredPriceSchemes = computed(() => {
    const selectedHospPlan = props.payload.mscAccount_Type;
    return price_scheme_data.value.filter((item) => item.id === selectedHospPlan);
});

watch(() => props.payload.mscAccount_Type, (newMscAccountTypeValue) => {
    let newPriceScheme;
    switch (newMscAccountTypeValue) {
        case 1:
            newPriceScheme = 1;// self pay
            props.payload.selectedGuarantor = [];
            break;
        case 2:
            newPriceScheme = 2; // HMO / Company / Pre-Payment
            break;
        case 3:
            newPriceScheme = 4; // Government Assistance
            break;
        default:
            newPriceScheme = null; // Handle other cases or defaults if needed
    }
    if (newPriceScheme !== null) {
        props.payload.mscPrice_Schemes = parseInt(newPriceScheme);
    }
});

watch(() => props.payload.mscPrice_Schemes, (newSchemeValue) => {
    let newHospitalPlan;
    switch (newSchemeValue) {
        case 1:
            newHospitalPlan = 1; // self pay
            props.payload.selectedGuarantor = [];
            break;
        case 2:
            newHospitalPlan = 2; // HMO / Company  / Pre-Payment
            break;
        case 3:
            newHospitalPlan = 2; // HMO / Company  / Pre-Payment
            break;
        case 4:
            newHospitalPlan = 3; // Government Assistance
            break;
        default:
            newHospitalPlan = null; // Handle other cases or defaults if needed
    }

    if (newHospitalPlan !== null) {
        props.payload.mscAccount_Type = parseInt(newHospitalPlan);
    }
});

onMounted(() => {
    getRegisterSource();
    getTransactionType();
    getRegisteryCaseType();
    getHospitalizationPlan();
    getPriceGroup();
    getPriceScheme();
    getServiceType();
    getPatientBroughtBy();
    getCaseIndicator();
    getIdTypes();
});

onUnmounted(() => {
    register_source_data.value      = [];
    transaction_type_data.value     = [];
    register_casetype_data.value    = [];
    hospitalization_plan_data.value = [];
    price_group_data.value          = [];
    price_scheme_data.value         = [];
    service_type_data.value         = [];
    patient_brought_by.value        = [];
    case_indicator_data.value       = [];
    id_types_data.value             = [];
});
</script>

<style scoped>
.form-group {
    display: flex;
    align-items: center;
}
.form-label {
    flex: 0 0 40%;
    text-align: left;
    margin-right: 8px;
}
.form-input,
.form-select {
    flex: 1;
    width: 100%;
    padding: 4px;
    border: 1px solid #000;
    border-radius: 4px;
    background-color: #fff;
    box-sizing: border-box;
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
}
.input-error {
    border-color: red;
}
.select-wrapper {
    position: relative;
    display: inline-block;
    width: 100%;
}
.arrow-icon {
    position: absolute;
    top: 50%;
    right: 10px;
    transform: translateY(-50%);
    font-size: 16px;
    color: #000;
    pointer-events: none; 
}
input[readonly] {
    background-color: #f5f5f5;
}
</style>