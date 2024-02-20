<template>
    <v-card>
        <form @submit.prevent="submit">
            <v-card-title>
                <v-card-actions>
                    <p>Consultant Information Form</p>
                    <v-spacer></v-spacer>
                    <v-btn color="black" @click="closeDialog">X</v-btn>
                </v-card-actions>
                <v-tabs v-model:model-value="tab" bg-color="primary">
                    <v-tab value="one">General Information</v-tab>
                    <v-tab value="two">Contacts and Addresses</v-tab>
                </v-tabs>
            </v-card-title>
            <v-card-text style="max-height: auto">
                <v-window v-model:model-value="tab" class="pa-0">
                    <v-window-item value="one" class="pa-1">
                        <v-row>
                            <v-col cols="12" sm="8" md="9">
                                <v-list-subheader inset>
                                    Personal Information
                                </v-list-subheader>
                                <v-row>
                                    <v-col lg="4">
                                        <v-text-field
                                            label="Lastname*"
                                            type="text"
                                            v-model:model-value="payload.lastname"
                                            :rules="[
                                                (v) =>
                                                    !!v || 'Lastname is required',
                                            ]"
                                            density="compact"
                                            variant="outlined"
                                        ></v-text-field>
                                    </v-col>
                                    <v-col lg="4">
                                        <v-text-field
                                            label="Firstname*"
                                            type="text"
                                            v-model:model-value="payload.firstname"
                                            :rules="[
                                                (v) =>
                                                    !!v || 'Firstname is required',
                                            ]"
                                            density="compact"
                                            variant="outlined"
                                        ></v-text-field>
                                    </v-col>
                                    <v-col lg="4">
                                        <v-text-field
                                            label="Middlename"
                                            type="text"
                                            v-model:model-value="payload.middlename"
                                            density="compact"
                                            hide-details
                                            variant="outlined"
                                        ></v-text-field>
                                    </v-col>
                                </v-row>
                                <v-row class="mt-1">
                                    <v-col lg="4">
                                        <v-autocomplete
                                            item-title="abbreviations"
                                            item-value="id"
                                            :items="suffix"
                                            v-model:model-value="payload.suffix_id"
                                            label="Suffix"
                                            hide-details
                                            clearable
                                            density="compact"
                                            variant="outlined"
                                        ></v-autocomplete>
                                    </v-col>
                                    <v-col cols="4">
                                        <v-text-field
                                            label="Birth Date"
                                            density="compact"
                                            v-model:model-value="payload.birthdate"
                                            type="date"
                                            variant="outlined"
                                        ></v-text-field>
                                    </v-col>
                                    <v-col cols="4">
                                        <v-autocomplete
                                            item-title="sex_description"
                                            item-value="id"
                                            :items="gender"
                                            v-model:model-value="payload.sex_id"
                                            label="Gender"
                                            hide-details
                                            density="compact"
                                            variant="outlined"
                                        ></v-autocomplete>
                                    </v-col>
                                </v-row>
                                <v-row class="mt-1">
                                    <v-col lg="4">
                                        <v-text-field
                                            label="TIN*"
                                            type="text"
                                            v-model:model-value="payload.TIN"
                                            :rules="[
                                                (v) => !!v || 'TIN is required',
                                            ]"
                                            density="compact"
                                            variant="outlined"
                                        ></v-text-field>
                                    </v-col>
                                    <v-col cols="4">
                                        <v-text-field
                                            label="Bank Account Name"
                                            type="text"
                                            v-model:model-value="payload.bank_account_name"
                                            density="compact"
                                            variant="outlined"
                                        ></v-text-field>
                                    </v-col>
                                    <v-col cols="4">
                                        <v-text-field
                                            label="Bank Account Number"
                                            v-model:model-value="payload.bank_account_no"
                                            type="text"
                                            density="compact"
                                            variant="outlined"
                                        ></v-text-field>
                                    </v-col>
                                </v-row>
                                <v-list-subheader inset>
                                    PTR and S2 Information
                                </v-list-subheader>
                                <v-divider color="primary"></v-divider>
                                <v-row class="mt-1">
                                    <v-col lg="6">
                                        <v-text-field
                                            label="PTR Number"
                                            v-model:model-value="payload.ptr_no"
                                            type="text"
                                            density="compact"
                                            variant="outlined"
                                        ></v-text-field>
                                    </v-col>
                                    <v-col lg="6">
                                        <v-text-field
                                            label="S2 Consultant Number"
                                            type="text"
                                            v-model:model-value="payload.s2_no"
                                            density="compact"
                                            variant="outlined"
                                        ></v-text-field>
                                    </v-col>
                                </v-row>
                                <v-list-subheader inset>
                                    PRC Information
                                </v-list-subheader>
                                <v-divider color="primary"></v-divider>
                                <v-row class="mt-1">
                                    <v-col lg="4">
                                        <v-autocomplete
                                            item-title="abbreviations"
                                            item-value="id"
                                            label="PRC License Type"
                                            v-model:model-value="payload.bank_account_no"
                                            hide-details
                                            clearable
                                            density="compact"
                                            variant="outlined"
                                        ></v-autocomplete>
                                    </v-col>
                                    <v-col cols="4">
                                        <v-text-field
                                            label="PRC License Number"
                                            type="text"
                                            v-model:model-value="payload.prc_license_no"
                                            density="compact"
                                            variant="outlined"
                                        ></v-text-field>
                                    </v-col>
                                    <v-col cols="4">
                                        <v-text-field
                                            label="PRC Expiry Date"
                                            v-model:model-value="payload.prc_license_expiry_date"
                                            density="compact"
                                            type="date"
                                            variant="outlined"
                                        ></v-text-field>
                                    </v-col>
                                </v-row>
                                <v-list-subheader inset>
                                    PHIC Information
                                </v-list-subheader>
                                <v-divider color="primary"></v-divider>
                                <v-row class="mt-1">
                                    <v-col lg="3">
                                        <v-text-field
                                            label="PHIC Number"
                                            type="text"
                                            v-model:model-value="payload.philhealth_accreditation_no"
                                            density="compact"
                                            variant="outlined"
                                        ></v-text-field>
                                    </v-col>
                                    <v-col cols="3">
                                        <v-autocomplete
                                            item-title="abbreviations"
                                            item-value="id"
                                            label="PHIC Group"
                                            hide-details
                                            clearable
                                            density="compact"
                                            variant="outlined"
                                        ></v-autocomplete>
                                    </v-col>
                                    <v-col cols="3">
                                        <v-text-field
                                            v-model:model-value="payload.philhealth_accreditation_expiry_date"
                                            label="PHIC Expiry Date"
                                            density="compact"
                                            type="date"
                                            variant="outlined"
                                        ></v-text-field>
                                    </v-col>
                                    <v-col cols="3">
                                        <v-text-field
                                            label="PMCC Number"
                                            type="text"
                                            v-model:model-value="payload.pmcc_no"
                                            density="compact"
                                            variant="outlined"
                                        ></v-text-field>
                                    </v-col>
                                </v-row>
                                <v-list-subheader inset>
                                    VAT and Tax Information
                                </v-list-subheader>
                                <v-divider color="primary"></v-divider>
                                <v-row class="mt-1">
                                    <v-col cols="4">
                                        <v-autocomplete
                                            item-title="abbreviations"
                                            item-value="id"
                                            v-model:model-value="payload.isVatable"
                                            label="VAT Condition"
                                            hide-details
                                            clearable
                                            density="compact"
                                            variant="outlined"
                                        ></v-autocomplete>
                                    </v-col>
                                    <v-col cols="4">
                                        <v-text-field
                                            label="Professional Fee VAT Rate"
                                            type="text"
                                            density="compact"
                                            v-model:model-value="payload.professional_fee_vat_rate"
                                            variant="outlined"
                                        ></v-text-field>
                                    </v-col>
                                    <v-col cols="4">
                                        <v-text-field
                                            label="Reader's Fee VAT Rate"
                                            type="text"
                                            density="compact"
                                            v-model:model-value="payload.readers_fee_vat_rate"
                                            variant="outlined"
                                        ></v-text-field>
                                    </v-col>
                                </v-row>
                                <v-row class="mt-1">
                                    <v-col lg="6">
                                        <v-autocomplete
                                            item-title="abbreviations"
                                            item-value="id"
                                            label="EWT Tax Description"
                                            v-model:model-value="payload.WithHolding__tax_rate"
                                            hide-details
                                            clearable
                                            density="compact"
                                            variant="outlined"
                                        ></v-autocomplete>
                                    </v-col>
                                    <v-col lg="6">
                                        <v-text-field
                                            label="Expanded WTax Rate"
                                            type="text"
                                            hide-details
                                            density="compact"
                                            variant="outlined"
                                        ></v-text-field>
                                    </v-col>
                                </v-row>
                            </v-col>
                            <v-col cols="12" sm="4" md="3">
                                <v-row>
                                    <!-- Digital Signature -->
                                    <!-- <v-col cols="12" align="center">
                                        <v-card class="pa-1">
                                            <v-avatar rounded="0" size="155">
                                                <v-img
                                                    cover
                                                    width="100%"
                                                    alt="Selected Image"
                                                ></v-img>
                                            </v-avatar>
                                        </v-card>
                                    </v-col> -->
                                    <v-col cols="12" align="center">
                                        <v-card class="pa-1">
                                            <v-avatar rounded="0" size="155">
                                                <v-img
                                                    cover
                                                    width="100%"
                                                    alt="Selected Image"
                                                ></v-img>
                                            </v-avatar>
                                        </v-card>
                                    </v-col>
                                    <v-col cols="12">
                                        <v-file-input
                                            class="mt-3"
                                            type="file"
                                            variant="outlined"
                                            bg-color="primary"
                                            clearable
                                            label="Manage Picture"
                                            density="compact"
                                            hide-details
                                        ></v-file-input>
                                    </v-col>
                                    <v-col lg="12">
                                        <v-text-field
                                            label="Doctors ID*"
                                            v-model:model-value="payload.doctor_code"
                                            type="text"
                                            hide-details
                                            :rules="[
                                                (v) =>
                                                    !!v || 'Doctors ID is required',
                                            ]"
                                            density="compact"
                                            variant="outlined"
                                        ></v-text-field>
                                    </v-col>
                                    <v-col lg="12">
                                        <v-text-field
                                            label="Custom Specialization"
                                            type="text"
                                            hide-details
                                            density="compact"
                                            variant="outlined"
                                        ></v-text-field>
                                    </v-col>
                                    <v-col lg="12">
                                        <v-autocomplete
                                            item-title="category_description"
                                            item-value="id"
                                            label="Category"
                                            v-model:model-value="payload.category_id"
                                            :items="doctor_category"
                                            hide-details
                                            clearable
                                            density="compact"
                                            variant="outlined"
                                        ></v-autocomplete>
                                    </v-col>
                                    <v-col lg="12">
                                        <v-autocomplete
                                            item-title="category_description"
                                            item-value="id"
                                            label="Service Class"
                                            hide-details
                                            clearable
                                            density="compact"
                                            variant="outlined"
                                        ></v-autocomplete>
                                    </v-col>
                                    <v-col lg="12">
                                        <v-autocomplete
                                            item-title="specialization_description"
                                            item-value="id"
                                            label="Specialization"
                                            :items="specializations"
                                            v-model:model-value="payload.specialization_primary_id"
                                            hide-details
                                            clearable
                                            density="compact"
                                            variant="outlined"
                                        ></v-autocomplete>
                                    </v-col>
                                    <v-col lg="12">
                                        <v-autocomplete
                                            item-title="description"
                                            item-value="id"
                                            :items="service_type"
                                            v-model:model-value="payload.service_type"
                                            label="Service Type"
                                            hide-details
                                            clearable
                                            density="compact"
                                            variant="outlined"
                                        ></v-autocomplete>
                                    </v-col>
                                    <v-col lg="12">
                                        <v-autocomplete
                                            item-title="abbreviations"
                                            item-value="id"
                                            label="Class Codes"
                                            hide-details
                                            clearable
                                            density="compact"
                                            variant="outlined"
                                        ></v-autocomplete>
                                    </v-col>
                                    <v-col lg="12">
                                        <v-autocomplete
                                            item-title="abbreviations"
                                            item-value="id"
                                            label="Department"
                                            hide-details
                                            clearable
                                            density="compact"
                                            variant="outlined"
                                        ></v-autocomplete>
                                    </v-col>
                                    <v-col lg="12">
                                        <v-checkbox
                                            label="Active Consultant?"
                                        ></v-checkbox>
                                    </v-col>
                                </v-row>
                            </v-col>
                        </v-row>
                    </v-window-item>

                    <v-window-item value="two">
                        <v-row>
                            <v-col lg="4" class="mt-1">
                                <v-text-field
                                    label="Email Address"
                                    v-model:model-value="payload.email"
                                    type="text"
                                    density="compact"
                                    variant="outlined"
                                ></v-text-field>
                            </v-col>
                            <v-col lg="4" class="mt-1">
                                <v-text-field
                                    label="Telephone Number"
                                    v-model:model-value="payload.mobile_no"
                                    type="text"
                                    density="compact"
                                    variant="outlined"
                                ></v-text-field>
                            </v-col>
                            <v-col lg="4" class="mt-1">
                                <v-text-field
                                    label="Mobile Number"
                                    v-model:model-value="payload.mobile_no"
                                    type="text"
                                    density="compact"
                                    variant="outlined"
                                ></v-text-field>
                            </v-col>
                        </v-row>
                        <v-row>
                            <v-col lg="11" class="mt-1">
                                <v-textarea
                                    class="cursor-pointer"
                                    label="Residential Address"
                                    prepend-icon="mdi-plus-box"
                                    @click:prepend="handleOpenAddressForm"
                                    variant="outlined"
                                ></v-textarea>
                            </v-col>
                        </v-row>
                        <v-row>
                            <v-col lg="11" class="mt-1">
                                <v-textarea
                                    class="cursor-pointer"
                                    label="Clinic Address"
                                    prepend-icon="mdi-plus-box"
                                    @click:prepend="handleOpenAddressForm"
                                    variant="outlined"
                                ></v-textarea>
                            </v-col>
                        </v-row>
                    </v-window-item>
                </v-window>
            </v-card-text>
            <v-divider></v-divider>
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn
                    class="bg-primary text-white"
                    type="submit"
                    >Add Consultant</v-btn
                >
            </v-card-actions>
        </form>
        <v-dialog
            v-model:model-value="address_form_dialog"
            persistent
            hide-overlay
            width="650"
        >
            <AddressForm
                @close-dialog="closeAddressForm"
                @handle-submit="handleAddressSubmission"
            />
        </v-dialog>
    </v-card>
</template>

<script setup>
import nuxtStorage from 'nuxt-storage';
import AddressForm from "./AddressForm.vue";
const emits = defineEmits();
const props = defineProps({
    payload:{
        type:Object,
        default:()=>{}
    }
});

const address_form_dialog = ref(false);
const gender = JSON.parse(nuxtStorage.localStorage.getData("sex"));
const suffix = JSON.parse(nuxtStorage.localStorage.getData("suffix"));
const service_type = JSON.parse(nuxtStorage.localStorage.getData("services-type"));
const doctor_category = JSON.parse(nuxtStorage.localStorage.getData("doctorscategory"));
const specializations = JSON.parse(nuxtStorage.localStorage.getData("doctor-specialization"));


const submit = () => {
    emits("submit-form",props.payload);
};

const closeDialog = () => {
    emits("close-dialog");
};

const handleOpenAddressForm = () => {
    address_form_dialog.value = true;
};

const closeAddressForm = () => {
    address_form_dialog.value = false;
};

const handleAddressSubmission = () => {
    alert("Address Submitted");
};

const tab = ref(null);
</script>

<style scoped></style>
