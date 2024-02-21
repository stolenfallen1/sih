<template>
    <v-card class="px-4" elevation="2">
        <v-row class="mt-1">
            <v-col cols="12" sm="8" md="9">
                <v-row>
                    <v-col lg="12">
                        <v-text-field
                            label="Email"
                            type="text"
                            density="compact"
                            variant="outlined"
                        ></v-text-field>
                    </v-col>
                </v-row>
            </v-col>
            <v-col cols="12" sm="4" md="3">
                <v-row>
                    <v-col lg="12">
                        <v-checkbox
                            label="Send patient result(s) online?"
                        ></v-checkbox>            
                    </v-col>
                </v-row>
            </v-col>
        </v-row>
        <v-row>
            <v-col cols="12">
                <v-row>
                    <v-col lg="6">
                        <v-text-field
                            label="Telephone No."
                            type="text"
                            density="compact"
                            variant="outlined"
                        ></v-text-field>
                    </v-col>
                    <v-col lg="6">
                        <v-text-field
                            label="Mobile No."
                            type="text"
                            density="compact"
                            variant="outlined"
                        ></v-text-field>
                    </v-col>
                    <v-col lg="11" class="mt-1">
                        <v-textarea
                            class="cursor-pointer"
                            label="Full Address"
                            prepend-icon="mdi-plus-box"
                            @click.prepend="handleOpenAddressForm(1)"
                            variant="outlined"
                        ></v-textarea>
                    </v-col>
                </v-row>
            </v-col>
        </v-row>
    </v-card>
    <!-- Next of Kin and In Charge of Account -->
    <v-card class="mt-1" elevation="2">
        <v-card-title>
            <v-tabs v-model="tab_option1" bg-color="primary" center-active>
                <v-tab value="1">Next of Kin</v-tab>
                <v-tab value="2">In Charge of Account</v-tab>
            </v-tabs>
        </v-card-title>
        <v-card-text>
            <div v-if="tab_option1 === '1'">
                <v-row class="mt-1">
                    <v-col cols="12">
                        <v-text-field
                            label="Fullname"
                            type="text"
                            density="compact"
                            variant="outlined"
                        ></v-text-field>
                    </v-col>
                    <v-col cols="4">
                        <v-select
                        label="Relationship"
                        :items="relationship"
                        variant="outlined"
                        density="compact"
                        ></v-select>
                    </v-col>
                    <v-col cols="4">
                        <v-text-field
                            label="Contact No."
                            type="text"
                            density="compact"
                            variant="outlined"
                        ></v-text-field>
                    </v-col>
                    <v-col cols="4">
                        <v-text-field
                            label="Email"
                            type="text"
                            density="compact"
                            variant="outlined"
                        ></v-text-field>
                    </v-col>
                    <v-col lg="11" class="mt-1">
                        <v-textarea
                            class="cursor-pointer"
                            label="Full Address"
                            prepend-icon="mdi-plus-box"
                            @click.prepend="handleOpenAddressForm(2)"
                            variant="outlined"
                        ></v-textarea>
                    </v-col>
                </v-row>
            </div>
            <div v-if="tab_option1 === '2'">
                <v-row class="mt-1">
                    <v-col cols="12">
                        <v-text-field
                            label="Fullname"
                            type="text"
                            density="compact"
                            variant="outlined"
                        ></v-text-field>
                    </v-col>
                    <v-col cols="4">
                        <v-select
                        label="Relationship"
                        :items="relationship"
                        variant="outlined"
                        density="compact"
                        ></v-select>
                    </v-col>
                    <v-col cols="4">
                        <v-text-field
                            label="Contact No."
                            type="text"
                            density="compact"
                            variant="outlined"
                        ></v-text-field>
                    </v-col>
                    <v-col cols="4">
                        <v-text-field
                            label="Email"
                            type="text"
                            density="compact"
                            variant="outlined"
                        ></v-text-field>
                    </v-col>
                    <v-col lg="11" class="mt-1">
                        <v-textarea
                            class="cursor-pointer"
                            label="Full Address"
                            prepend-icon="mdi-plus-box"
                            @click.prepend="handleOpenAddressForm(3)"
                            variant="outlined"
                        ></v-textarea>
                    </v-col>
                </v-row>
            </div>
        </v-card-text>
    </v-card>
    <!-- Emergency Contact and Employment Information -->
    <v-card class="mt-1" elevation="2">
        <v-card-title>
            <v-tabs v-model="tab_option2" bg-color="primary" center-active>
                <v-tab value="1">Contact Person in case of Emergency</v-tab>
                <v-tab value="2">Employment Information</v-tab>
            </v-tabs>
        </v-card-title>
        <v-card-text>
            <div v-if="tab_option2 === '1'">
                <v-row class="mt-1">
                    <v-col cols="8">
                        <v-text-field
                            label="Fullname"
                            type="text"
                            density="compact"
                            variant="outlined"
                        ></v-text-field>
                    </v-col>
                    <v-col cols="4">
                        <v-text-field
                            label="Occupation"
                            type="text"
                            density="compact"
                            variant="outlined"
                        ></v-text-field>
                    </v-col>
                    <v-col cols="4">
                        <v-select
                        label="Relationship"
                        :items="relationship"
                        variant="outlined"
                        density="compact"
                        ></v-select>
                    </v-col>
                    <v-col cols="4">
                        <v-text-field
                            label="Contact No."
                            type="text"
                            density="compact"
                            variant="outlined"
                        ></v-text-field>
                    </v-col>
                    <v-col cols="4">
                        <v-text-field
                            label="Email"
                            type="text"
                            density="compact"
                            variant="outlined"
                        ></v-text-field>
                    </v-col>
                    <v-col lg="11" class="mt-1">
                        <v-textarea
                            class="cursor-pointer"
                            label="Full Address"
                            prepend-icon="mdi-plus-box"
                            @click.prepend="handleOpenAddressForm(4)"
                            variant="outlined"
                        ></v-textarea>
                    </v-col>
                </v-row>
            </div>
            <div v-if="tab_option2 === '2'">
                <v-row class="mt-1">
                    <v-col cols="8">
                        <v-text-field
                            label="Employer Name"
                            type="text"
                            density="compact"
                            variant="outlined"
                        ></v-text-field>
                    </v-col>
                    <v-col cols="4">
                        <v-text-field
                            label="Position"
                            type="text"
                            density="compact"
                            variant="outlined"
                        ></v-text-field>
                    </v-col>
                    <v-col cols="6">
                        <v-text-field
                            label="Contact No."
                            type="text"
                            density="compact"
                            variant="outlined"
                        ></v-text-field>
                    </v-col>
                    <v-col cols="6">
                        <v-text-field
                            label="Email"
                            type="text"
                            density="compact"
                            variant="outlined"
                        ></v-text-field>
                    </v-col>
                    <v-col lg="11" class="mt-1">
                        <v-textarea
                            class="cursor-pointer"
                            label="Full Address"
                            prepend-icon="mdi-plus-box"
                            @click.prepend="handleOpenAddressForm(5)"
                            variant="outlined"
                        ></v-textarea>
                    </v-col>
                </v-row>
            </div>
        </v-card-text>
    </v-card>
    <v-dialog
        v-model="address_form_dialog"
        persistent
        hide-overlay
        width="650"
    >
        <address-form
            @close-dialog="closeAddressForm"
            @handle-submit="handleAddressSubmission"
        />
    </v-dialog>
</template>

<script setup>
import AddressForm from "./sub-forms/AddressForm.vue";

let tab_option1 = ref("1")
let tab_option2 = ref("1")
const address_form_dialog = ref(false)
const address_form_type = ref()


const relationship = [
    "Father",
    "Mother",
    "Brother",
    "Sister",
    "Grandfather",
    "Grandmother",
    "Spouse",
    "Other",
];
const handleOpenAddressForm = (type) => {
    address_form_type.value = type;
    address_form_dialog.value = true;
    alert(`Address Form Opened. Type: ${type}`);
};
const closeAddressForm = () => {
    address_form_dialog.value = false;
};
const handleAddressSubmission = () => {
    alert(`Address Submitted. Type: ${address_form_type.value}`);
};
</script>

<style scoped>

</style>