<template>
    <v-card>
        <v-card-title>
            <v-card-actions>
                <p>Consultant Information Form</p>
                <v-spacer></v-spacer>
                <v-btn color="black" @click="closeDialog">X</v-btn>
            </v-card-actions>
            <v-tabs v-model="tab" bg-color="primary">
                <v-tab value="one">General Information</v-tab>
                <v-tab value="two">Contacts and Addresses</v-tab>
            </v-tabs>
        </v-card-title>
        <v-card-text style="max-height: auto">
            <v-window v-model="tab" class="pa-0">
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
                                        density="compact"
                                        hide-details
                                        variant="outlined"
                                    ></v-text-field>
                                </v-col>
                            </v-row>
                            <v-row class="mt-1">
                                <v-col lg="4">
                                    <v-select
                                        item-title="abbreviations"
                                        item-value="id"
                                        label="Suffix"
                                        required
                                        hide-details
                                        clearable
                                        density="compact"
                                        variant="outlined"
                                    ></v-select>
                                </v-col>
                                <v-col cols="4">
                                    <v-text-field
                                        label="Birth Date"
                                        density="compact"
                                        type="date"
                                        variant="outlined"
                                    ></v-text-field>
                                </v-col>
                                <v-col cols="4">
                                    <v-select
                                        item-title="abbreviations"
                                        item-value="id"
                                        label="Gender"
                                        required
                                        hide-details
                                        clearable
                                        density="compact"
                                        variant="outlined"
                                    ></v-select>
                                </v-col>
                            </v-row>
                            <v-row class="mt-1">
                                <v-col lg="4">
                                    <v-text-field
                                        label="TIN*"
                                        type="text"
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
                                        density="compact"
                                        variant="outlined"
                                    ></v-text-field>
                                </v-col>
                                <v-col cols="4">
                                    <v-text-field
                                        label="Bank Account Number"
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
                                        type="text"
                                        density="compact"
                                        variant="outlined"
                                    ></v-text-field>
                                </v-col>
                                <v-col lg="6">
                                    <v-text-field
                                        label="S2 Consultant Number"
                                        type="text"
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
                                    <v-select
                                        item-title="abbreviations"
                                        item-value="id"
                                        label="PRC License Type"
                                        required
                                        hide-details
                                        clearable
                                        density="compact"
                                        variant="outlined"
                                    ></v-select>
                                </v-col>
                                <v-col cols="4">
                                    <v-text-field
                                        label="PRC License Number"
                                        type="text"
                                        density="compact"
                                        variant="outlined"
                                    ></v-text-field>
                                </v-col>
                                <v-col cols="4">
                                    <v-text-field
                                        label="PRC Expiry Date"
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
                                        density="compact"
                                        variant="outlined"
                                    ></v-text-field>
                                </v-col>
                                <v-col cols="3">
                                    <v-select
                                        item-title="abbreviations"
                                        item-value="id"
                                        label="PHIC Group"
                                        required
                                        hide-details
                                        clearable
                                        density="compact"
                                        variant="outlined"
                                    ></v-select>
                                </v-col>
                                <v-col cols="3">
                                    <v-text-field
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
                                    <v-select
                                        item-title="abbreviations"
                                        item-value="id"
                                        label="VAT Condition"
                                        required
                                        hide-details
                                        clearable
                                        density="compact"
                                        variant="outlined"
                                    ></v-select>
                                </v-col>
                                <v-col cols="4">
                                    <v-text-field
                                        label="Professional Fee VAT Rate"
                                        type="text"
                                        density="compact"
                                        variant="outlined"
                                    ></v-text-field>
                                </v-col>
                                <v-col cols="4">
                                    <v-text-field
                                        label="Reader's Fee VAT Rate"
                                        type="text"
                                        density="compact"
                                        variant="outlined"
                                    ></v-text-field>
                                </v-col>
                            </v-row>
                            <v-row class="mt-1">
                                <v-col lg="6">
                                    <v-select
                                        item-title="abbreviations"
                                        item-value="id"
                                        label="EWT Tax Description"
                                        required
                                        hide-details
                                        clearable
                                        density="compact"
                                        variant="outlined"
                                    ></v-select>
                                </v-col>
                                <v-col lg="6">
                                    <v-text-field
                                        label="Expanded WTax Rate"
                                        type="text"
                                        required
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
                                        type="text"
                                        required
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
                                        required
                                        hide-details
                                        density="compact"
                                        variant="outlined"
                                    ></v-text-field>
                                </v-col>
                                <v-col lg="12">
                                    <v-select
                                        item-title="abbreviations"
                                        item-value="id"
                                        label="Category"
                                        required
                                        hide-details
                                        clearable
                                        density="compact"
                                        variant="outlined"
                                    ></v-select>
                                </v-col>
                                <v-col lg="12">
                                    <v-select
                                        item-title="abbreviations"
                                        item-value="id"
                                        label="Service Class"
                                        required
                                        hide-details
                                        clearable
                                        density="compact"
                                        variant="outlined"
                                    ></v-select>
                                </v-col>
                                <v-col lg="12">
                                    <v-select
                                        item-title="abbreviations"
                                        item-value="id"
                                        label="Specialization"
                                        required
                                        hide-details
                                        clearable
                                        density="compact"
                                        variant="outlined"
                                    ></v-select>
                                </v-col>
                                <v-col lg="12">
                                    <v-select
                                        item-title="abbreviations"
                                        item-value="id"
                                        label="Service Type"
                                        required
                                        hide-details
                                        clearable
                                        density="compact"
                                        variant="outlined"
                                    ></v-select>
                                </v-col>
                                <v-col lg="12">
                                    <v-select
                                        item-title="abbreviations"
                                        item-value="id"
                                        label="Class Codes"
                                        required
                                        hide-details
                                        clearable
                                        density="compact"
                                        variant="outlined"
                                    ></v-select>
                                </v-col>
                                <v-col lg="12">
                                    <v-select
                                        item-title="abbreviations"
                                        item-value="id"
                                        label="Department"
                                        required
                                        hide-details
                                        clearable
                                        density="compact"
                                        variant="outlined"
                                    ></v-select>
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
                                type="text"
                                density="compact"
                                variant="outlined"
                            ></v-text-field>
                        </v-col>
                        <v-col lg="4" class="mt-1">
                            <v-text-field
                                label="Telephone Number"
                                type="text"
                                density="compact"
                                variant="outlined"
                            ></v-text-field>
                        </v-col>
                        <v-col lg="4" class="mt-1">
                            <v-text-field
                                label="Mobile Number"
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
                                @click.prepend="handleOpenAddressForm"
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
                                @click.prepend="handleOpenAddressForm"
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
                @click.prevent="submit"
                >Add Consultant</v-btn
            >
        </v-card-actions>
        <v-dialog
            v-model="address_form_dialog"
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
import AddressForm from "./AddressForm.vue";
const emits = defineEmits();

const address_form_dialog = ref(false);

const submit = () => {
    alert("Submitted");
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
