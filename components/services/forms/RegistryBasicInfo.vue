<template>
    <v-row>
        <v-col cols="4">
            <v-col cols="12" class="form-col">
                <v-text-field
                    variant="outlined"
                    label="Outpatient No."
                    type="number"
                    placeholder="Outpatient No."
                    v-model="payload.outpatient_no"
                    readonly
                    hide-details
                    density="compact"
                ></v-text-field>
            </v-col>
            <v-col cols="12" class="form-col">
                <v-text-field
                    variant="outlined"
                    label="Case Datetime"
                    v-model="payload.case_datetime"
                    type="date"
                    hide-details
                    density="compact"
                ></v-text-field>
            </v-col>
            <v-col cols="12" class="form-col">
                <v-autocomplete
                    item-title="case_type"
                    item-value="id"
                    label="Case Type"
                    placeholder="Select Case Type"
                    v-model="payload.case_type"
                    required
                    hide-details
                    clearable
                    :items="[]"
                    density="compact"
                    variant="outlined"
                ></v-autocomplete>
            </v-col>
            <v-col cols="12" class="form-col">
                <v-autocomplete
                    item-title="transaction_type"
                    item-value="id"
                    label="Transaction Type"
                    placeholder="Select Transaction Type"
                    v-model="payload.transaction_type"
                    required
                    hide-details
                    clearable
                    :items="[]"
                    density="compact"
                    variant="outlined"
                ></v-autocomplete>
            </v-col>
            <v-col cols="12" class="form-col">
                <v-autocomplete
                    item-title="patient_category"
                    item-value="id"
                    label="Patient Category"
                    placeholder="Select Patient Category"
                    v-model="payload.patient_category"
                    readonly
                    hide-details
                    clearable
                    :items="[]"
                    density="compact"
                    variant="outlined"
                ></v-autocomplete>
            </v-col>
            <v-col cols="12" class="form-col">
                <v-autocomplete
                    item-title="hosp_plan"
                    item-value="id"
                    label="Hosp. Plan"
                    placeholder="Select Hospital Plan"
                    v-model="payload.hosp_plan"
                    required
                    hide-details
                    clearable
                    :items="[]"
                    density="compact"
                    variant="outlined"
                ></v-autocomplete>
            </v-col>
            <v-col cols="12" class="form-col">
                <v-autocomplete
                    item-title="classification"
                    item-value="id"
                    label="Classification"
                    placeholder="Select Classification"
                    v-model="payload.classification"
                    required
                    hide-details
                    clearable
                    :items="[]"
                    density="compact"
                    variant="outlined"
                ></v-autocomplete>
            </v-col>
            <v-col cols="12" class="form-col">
                <v-autocomplete
                    item-title="membership"
                    item-value="id"
                    label="Membership"
                    placeholder="Select Membership"
                    v-model="payload.membership"
                    hide-details
                    clearable
                    :items="[]"
                    density="compact"
                    variant="outlined"
                ></v-autocomplete>
            </v-col>
        </v-col>
        <v-col cols="4">
            <v-col cols="12" class="form-col">
                <v-autocomplete
                    item-title="service_type"
                    item-value="id"
                    label="Service Type"
                    placeholder="Select Service Type"
                    v-model="payload.service_type"
                    required
                    hide-details
                    clearable
                    :items="[]"
                    density="compact"
                    variant="outlined"
                ></v-autocomplete>
            </v-col>
            <v-col cols="12" class="form-col">
                <v-autocomplete
                    item-title="sub_service_type"
                    item-value="id"
                    label="Sub Service Type"
                    placeholder="Select Sub Service Type"
                    v-model="payload.sub_service_type"
                    hide-details
                    clearable
                    :items="[]"
                    density="compact"
                    variant="outlined"
                ></v-autocomplete>
            </v-col>
            <v-col cols="12" class="form-col">
                <v-autocomplete
                    item-title="price_group"
                    item-value="id"
                    label="Price Group"
                    placeholder="Select Price Group"
                    v-model="payload.price_group"
                    required
                    hide-details
                    clearable
                    :items="[]"
                    density="compact"
                    variant="outlined"
                ></v-autocomplete>
            </v-col>
            <v-col cols="12" class="form-col">
                <v-autocomplete
                    item-title="price_scheme"
                    item-value="id"
                    label="Price Schemes"
                    placeholder="Select Price Schemes"
                    v-model="payload.price_scheme"
                    required
                    hide-details
                    clearable
                    :items="[]"
                    density="compact"
                    variant="outlined"
                ></v-autocomplete>
            </v-col>
            <v-col cols="12" class="form-col">
                <v-text-field
                    label="Discount Schemes"
                    v-model="payload.discount_scheme"
                    hide-details
                    prepend-icon="mdi-plus-box"
                    @click:prepend="openHandleDiscountScheme"
                    class="cursor-pointer"
                    readonly
                    density="compact"
                    variant="outlined"
                ></v-text-field>
            </v-col>
            <v-col cols="12" class="form-col">
                <v-autocomplete
                    item-title="reffered_from"
                    item-value="id"
                    label="Reffered From"
                    placeholder="Select Reffered From"
                    v-model="payload.reffered_from"
                    hide-details
                    clearable
                    :items="[]"
                    density="compact"
                    variant="outlined"
                ></v-autocomplete>
            </v-col>
            <v-col cols="12" class="form-col">
                <v-text-field
                    variant="outlined"
                    label="PHIC Reference No."
                    v-model="payload.phic_ref_no"
                    readonly
                    hide-details
                    density="compact"
                ></v-text-field>
            </v-col>
            <v-col cols="12" class="form-col">
                <v-text-field
                    item-title="description"
                    item-value="id"
                    variant="outlined"
                    label="Referring HCI Code"
                    v-model="payload.referring_hci_code"
                    readonly
                    hide-details
                    prepend-icon="mdi-plus-box"
                    @click:prepend="openReferringHciCode"
                    density="compact"
                ></v-text-field>
            </v-col>
            <v-col cols="12" class="form-col">
                <v-text-field
                    variant="outlined"
                    label="Referring HCI Address"
                    v-model="payload.referring_hci_address"
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
                <v-text-field
                    variant="outlined"
                    label="Passport No."
                    type="number"
                    placeholder="Enter Passport No."
                    v-model="payload.passport_no"
                    readonly
                    hide-details
                    density="compact"
                ></v-text-field>
            </v-col>
            <v-col cols="12" class="form-col">
                <v-text-field
                    variant="outlined"
                    label="Enter OSCA ID No."
                    type="number"
                    placeholder="OSCA ID No."
                    v-model="payload.osca_id_no"
                    hide-details
                    density="compact"
                ></v-text-field>
            </v-col>
            <v-col cols="12" class="form-col">
                <v-text-field
                    variant="outlined"
                    label="ID Presented"
                    placeholder="Enter ID Presented"
                    v-model="payload.id_presented"
                    hide-details
                    density="compact"
                ></v-text-field>
            </v-col>
            <v-col cols="12" class="form-col">
                <v-text-field
                    variant="outlined"
                    label="ID Number"
                    type="number"
                    placeholder="Enter ID Number"
                    v-model="payload.id_number"
                    hide-details
                    density="compact"
                ></v-text-field>
            </v-col>
            <v-col cols="12" class="form-col">
                <v-text-field
                    variant="outlined"
                    label="Department"
                    placeholder="Enter Department"
                    v-model="payload.department"
                    hide-details
                    density="compact"
                ></v-text-field>
            </v-col>
            <v-col cols="12" class="form-col">
                <v-autocomplete
                    item-title="medical_social_service"
                    item-value="id"
                    label="Medical Social Service"
                    placeholder="Select Medical Social Service"
                    v-model="payload.medical_social_service"
                    
                    hide-details
                    clearable
                    :items="['A', 'B', 'C']"
                    density="compact"
                    variant="outlined"
                ></v-autocomplete>
            </v-col>
            <v-col cols="12" class="form-col">
                <v-textarea 
                    hide-details 
                    density="compact" 
                    variant="outlined" 
                    label="Chief Complaints"
                    v-model="payload.chief_complaints"
                    placeholder="Enter Chief Complaints"
                ></v-textarea>
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
</template>

<script setup>
const props = defineProps({
    payload: {
        type: Object,
        required: true,
        default: () => ({})
    }
});

let referring_hci_code = ref([]);
const open_discount_scheme_table = ref(false);
const open_referring_hci_code_table = ref(false);
const open_referring_hci_address_form = ref(false);

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
    alert("Referring HCI Code: " + referring_hci_code.value.id + "\nReferring HCI Description: " + referring_hci_code.value.description + "\nReferred ICHP: " + referring_hci_code.value.referred_ichp);
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
</script>

<style scoped>
.form-col {
    padding: 3.25px 0px 3.25px 0px !important;
    margin: 0px !important;
}
</style>