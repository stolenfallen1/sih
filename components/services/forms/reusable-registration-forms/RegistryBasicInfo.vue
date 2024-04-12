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
                    readonly
                    hide-details
                    density="compact"
                ></v-text-field>
            </v-col>
            <v-col cols="12" class="form-col">
                <v-list-subheader class="form-header">
                    {{ form_type === 'outpatient' ? 'OPD Case DateTime' : (form_type === 'emergency' ? 'ER Case DateTime' : 'IPD Case DateTime') }} <span style="color: red;" class="mdi mdi-check"></span>
                </v-list-subheader>
                <v-text-field
                    variant="solo"
                    v-model="payload.case_datetime"
                    type="date"
                    hide-details
                    density="compact"
                ></v-text-field>
            </v-col>
            <v-col cols="12" class="form-col">
                <v-list-subheader class="form-header">
                    {{ form_type === 'outpatient' ? 'OPD Case Type' : (form_type === 'emergency' ? 'ER Case Type' : 'IPD Case Type') }} <span style="color: red;" class="mdi mdi-check"></span>
                </v-list-subheader>
                <v-autocomplete
                    item-title="case_type"
                    item-value="id"
                    placeholder="Select Case Type"
                    v-model="payload.case_type"
                    hide-details
                    clearable
                    :items="[]"
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
                    placeholder="Select How Admitted"
                    v-model="payload.how_admitted"
                    hide-details
                    clearable
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
                    hide-details
                    readonly
                    clearable
                    :items="[]"
                    density="compact"
                    variant="solo"
                ></v-autocomplete>
            </v-col>
            <v-col cols="12" class="form-col">
                <v-list-subheader class="form-header">Transaction Type <span style="color: red;" class="mdi mdi-check"></span></v-list-subheader>
                <v-autocomplete
                    item-title="transaction_type"
                    item-value="id"
                    placeholder="Select Transaction Type"
                    v-model="payload.mscAccount_trans_types"
                    
                    hide-details
                    clearable
                    :items="[]"
                    density="compact"
                    variant="solo"
                ></v-autocomplete>
            </v-col>
            <v-col cols="12" class="form-col">
                <!-- Default New Patient -->
                <v-list-subheader class="form-header">Patient Category <span style="color: red;" class="mdi mdi-check"></span></v-list-subheader>
                <v-autocomplete
                    item-title="patient_category"
                    item-value="id"
                    placeholder="Select Patient Category"
                    v-model="payload.mscPatient_category"
                    readonly
                    hide-details
                    clearable
                    :items="[]"
                    density="compact"
                    variant="solo"
                ></v-autocomplete>
            </v-col>
            <v-col cols="12" class="form-col">
                <v-list-subheader class="form-header">Hospitalization Plan <span style="color: red;" class="mdi mdi-check"></span></v-list-subheader>
                <v-autocomplete
                    item-title="hosp_plan"
                    item-value="id"
                    placeholder="Select Hospital Plan"
                    v-model="payload.hosp_plan"
                    hide-details
                    clearable
                    :items="hospitalizationPlans"
                    density="compact"
                    variant="solo"
                    @update:model-value="handleHospitalizationPlan"
                ></v-autocomplete>
            </v-col>
            <v-col cols="12" class="form-col">
                <v-list-subheader class="form-header">Classification</v-list-subheader>
                <v-autocomplete
                    item-title="classification"
                    item-value="id"
                    placeholder="Select Classification"
                    v-model="payload.classification"
                    hide-details
                    clearable
                    :items="[]"
                    density="compact"
                    variant="solo"
                ></v-autocomplete>
            </v-col>
            <v-col cols="12" class="form-col">
                <v-list-subheader class="form-header">Membership</v-list-subheader>
                <v-autocomplete
                    item-title="membership"
                    item-value="id"
                    placeholder="Select Membership"
                    v-model="payload.msc_PHIC_Memberships"
                    hide-details
                    clearable
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
                    placeholder="Select Service Type"
                    v-model="payload.mscService_type"
                    
                    hide-details
                    clearable
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
                    placeholder="Select Sub Service Type"
                    v-model="payload.mscService_type2"
                    hide-details
                    clearable
                    :items="[]"
                    density="compact"
                    variant="solo"
                ></v-autocomplete>
            </v-col>
            <v-col cols="12" class="form-col">
                <v-list-subheader class="form-header">Price Group <span style="color: red;" class="mdi mdi-check"></span></v-list-subheader>
                <v-autocomplete
                    item-title="price_group"
                    item-value="id"
                    placeholder="Select Price Group"
                    v-model="payload.mscPrice_Groups"
                    
                    hide-details
                    clearable
                    :items="[]"
                    density="compact"
                    variant="solo"
                ></v-autocomplete>
            </v-col>
            <v-col cols="12" class="form-col">
                <v-list-subheader class="form-header">Price Scheme <span style="color: red;" class="mdi mdi-check"></span></v-list-subheader>
                <v-autocomplete
                    item-title="price_scheme"
                    item-value="id"
                    placeholder="Select Price Schemes"
                    v-model="payload.mscPrice_Schemes"
                    
                    hide-details
                    clearable
                    :items="[]"
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
                    class="cursor-pointer"
                    readonly
                    density="compact"
                    variant="solo"
                ></v-text-field>
            </v-col>
            <v-col cols="12" class="form-col">
                <v-list-subheader class="form-header">Reffered From </v-list-subheader>
                <v-autocomplete
                    item-title="reffered_from"
                    item-value="id"
                    placeholder="Select Reffered From"
                    v-model="payload.referred_from_HCI"
                    hide-details
                    clearable
                    :items="[]"
                    density="compact"
                    variant="solo"
                ></v-autocomplete>
            </v-col>
            <v-col cols="12" class="form-col">
                <v-list-subheader class="form-header">PHIC Reference No. </v-list-subheader>
                <v-text-field
                    variant="solo"
                    v-model="payload.phic_ref_no"
                    readonly
                    hide-details
                    density="compact"
                ></v-text-field>
            </v-col>
            <v-col cols="12" class="form-col">
                <v-list-subheader class="form-header">Referring HCI</v-list-subheader>
                <v-text-field
                    item-title="description"
                    item-value="id"
                    variant="solo"
                    v-model="payload.referred_from_HCI_code"
                    readonly
                    hide-details
                    prepend-icon="mdi-plus-box"
                    @click:prepend="openReferringHciCode"
                    density="compact"
                ></v-text-field>
            </v-col>
            <v-col cols="12" class="form-col">
                <v-list-subheader class="form-header">Referring HCI Address </v-list-subheader>
                <v-text-field
                    variant="solo"
                    v-model="payload.referred_from_HCI_address"
                    readonly
                    hide-details
                    prepend-icon="mdi-plus-box"
                    @click:prepend="openReferringHciAddress"
                    density="compact"
                ></v-text-field>
            </v-col>
        </v-col>
        <v-col cols="4">
            <v-col cols="12" class="form-col">
                <v-list-subheader class="form-header">Passport No. </v-list-subheader>
                <v-text-field
                    variant="solo"
                    type="number"
                    v-model="payload.passport_no"
                    readonly
                    hide-details
                    density="compact"
                ></v-text-field>
            </v-col>
            <v-col cols="12" class="form-col">
                <v-list-subheader class="form-header">OSCA ID No. </v-list-subheader>
                <v-text-field
                    variant="solo"
                    type="number"
                    placeholder="Enter OSCA ID No."
                    v-model="payload.osca_id_no"
                    hide-details
                    density="compact"
                ></v-text-field>
            </v-col>
            <v-col cols="12" class="form-col">
                <v-list-subheader class="form-header">ID Presented </v-list-subheader>
                <v-text-field
                    variant="solo"
                    placeholder="Enter ID Presented"
                    v-model="payload.id_presented"
                    hide-details
                    density="compact"
                ></v-text-field>
            </v-col>
            <v-col cols="12" class="form-col">
                <v-list-subheader class="form-header">ID Number </v-list-subheader>
                <v-text-field
                    variant="solo"
                    type="number"
                    placeholder="Enter ID Number"
                    v-model="payload.id_number"
                    hide-details
                    density="compact"
                ></v-text-field>
            </v-col>
            <v-col cols="12" class="form-col">
                <v-list-subheader class="form-header">Department </v-list-subheader>
                <v-autocomplete
                    item-title="department"
                    item-value="id"
                    placeholder="Select Department"
                    v-model="payload.department"
                    
                    hide-details
                    clearable
                    :items="[]"
                    density="compact"
                    variant="solo"
                ></v-autocomplete>
            </v-col>
            <v-col v-if="form_type === 'inpatient'" cols="12" class="form-col">
                <v-list-subheader class="form-header">Newborn Status </v-list-subheader>
                <v-autocomplete
                    item-title="department"
                    item-value="id"
                    v-model="payload.newborn_status"
                    readonly
                    hide-details
                    clearable
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
                    placeholder="Select Source of Admission"
                    v-model="payload.source_of_admission"
                    hide-details
                    clearable
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
                    placeholder="Select Medical Social Service"
                    v-model="payload.medical_social_service"
                    
                    hide-details
                    clearable
                    :items="['A', 'B', 'C']"
                    density="compact"
                    variant="solo"
                ></v-autocomplete>
            </v-col>
            <v-col v-if="form_type === 'outpatient'" cols="12" class="form-col">
                <v-list-subheader class="form-header">Chief Complaints </v-list-subheader>
                <v-textarea 
                    hide-details 
                    density="compact" 
                    variant="solo" 
                    v-model="payload.clinical_chief_complaint"
                    placeholder="Enter Chief Complaints"
                ></v-textarea>
            </v-col>
            <v-col v-if="form_type === 'inpatient'" cols="12" class="form-col">
                <v-list-subheader class="form-header">Diet Desc </v-list-subheader>
                <v-text-field
                    v-model="payload.diet_desc"
                    hide-details
                    prepend-icon="mdi-plus-box"
                    @click:prepend="openDietDesc"
                    class="cursor-pointer"
                    readonly
                    density="compact"
                    variant="solo"
                ></v-text-field>
            </v-col>
        </v-col>
    </v-row>
    <discount-scheme 
        :open_discount_scheme_table="open_discount_scheme_table" 
        @close-dialog="closeHandleDiscountScheme" 
        @handle-select="handleSelectDiscountScheme"
    />
    <hci-code 
        :open_referring_hci_code_table="open_referring_hci_code_table"
        @close-dialog="closeReferringHciCode"
        @handle-select="handleReferringHciCode"
    />
    <hci-address 
        :open_referring_hci_address_form="open_referring_hci_address_form"
        @close-dialog="closeReferringHciAddress"
        @submit-address="handleReferringHciAddress"
    />
    <diet-desc-list 
        :open_diet_desc="open_diet_desc"
        @close-dialog="closeDietDesc"
        @handle-select="handleDietDesc"
    />
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