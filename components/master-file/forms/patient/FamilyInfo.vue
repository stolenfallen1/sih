<template>
    <v-card class="px-4" elevation="2">
        <v-card-title class="text-center">Spouse Information</v-card-title>
            <v-card-text>
                <v-col cols="12">
                    <v-row>
                        <v-col cols="6">
                            <v-text-field
                                label="Spouse Name"
                                type="text"
                                density="compact"
                                variant="outlined"
                            ></v-text-field>
                        </v-col>
                        <v-col cols="3">
                            <v-text-field
                                label="Spouse Occupation"
                                type="text"
                                density="compact"
                                variant="outlined"
                            ></v-text-field>
                        </v-col>
                        <v-col cols="3">
                            <v-text-field
                                label="Birth Date"
                                density="compact"
                                type="date"
                                variant="outlined"
                            ></v-text-field>
                        </v-col>
                        <v-col cols="3">
                            <v-text-field
                                label="Contact No."
                                type="text"
                                density="compact"
                                variant="outlined"
                            ></v-text-field>
                        </v-col>
                        <v-col cols="3">
                            <v-text-field
                                label="Email"
                                type="text"
                                density="compact"
                                variant="outlined"
                            ></v-text-field>
                        </v-col>
                        <v-col cols="3">
                            <v-text-field
                                label="Date of Marriage"
                                density="compact"
                                type="date"
                                variant="outlined"
                            ></v-text-field>
                        </v-col>
                        <v-col cols="3">
                            <v-text-field
                                label="TIN"
                                type="text"
                                density="compact"
                                variant="outlined"
                            ></v-text-field>
                        </v-col>
                        <v-col lg="12">
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
            </v-card-text>
    </v-card>
    <v-card class="mt-1" elevation="2">
        <v-card-title>
            <v-tabs v-model="tab" bg-color="primary" center-active>
                <v-tab value="1">Father's Information</v-tab>
                <v-tab value="2">Mother's Information</v-tab>
                <v-tab value="3">Other Family Members</v-tab>
            </v-tabs>
        </v-card-title>
        <v-card-text>
            <div v-if="tab === '1'">
                <v-row class="mt-1">
                    <v-col cols="8">
                        <v-text-field
                            label="Fullname"
                            type="text"
                            density="compact"
                            variant="outlined"
                        ></v-text-field>
                    </v-col>
                    <v-col lg="4">
                        <v-text-field
                            label="Birth Date"
                            density="compact"
                            type="date"
                            variant="outlined"
                        ></v-text-field>
                    </v-col>
                    <v-col cols="3">
                        <v-text-field
                            label="Occupation"
                            type="text"
                            density="compact"
                            variant="outlined"
                        ></v-text-field>
                    </v-col>
                    <v-col cols="3">
                        <v-text-field
                            label="Birthplace"
                            type="text"
                            density="compact"
                            variant="outlined"
                        ></v-text-field>
                    </v-col>
                    <v-col cols="3">
                        <v-text-field
                            label="Contact No."
                            type="text"
                            density="compact"
                            variant="outlined"
                        ></v-text-field>
                    </v-col>
                    <v-col cols="3">
                        <v-text-field
                            label="Email"
                            type="text"
                            density="compact"
                            variant="outlined"
                        ></v-text-field>
                    </v-col>
                    <v-col lg="12">
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
            <div v-if="tab === '2'">
                <v-row class="mt-1">
                    <v-col cols="8">
                        <v-text-field
                            label="Fullname"
                            type="text"
                            density="compact"
                            variant="outlined"
                        ></v-text-field>
                    </v-col>
                    <v-col lg="4">
                        <v-text-field
                            label="Birth Date"
                            density="compact"
                            type="date"
                            variant="outlined"
                        ></v-text-field>
                    </v-col>
                    <v-col cols="3">
                        <v-text-field
                            label="Occupation"
                            type="text"
                            density="compact"
                            variant="outlined"
                        ></v-text-field>
                    </v-col>
                    <v-col cols="3">
                        <v-text-field
                            label="Birthplace"
                            type="text"
                            density="compact"
                            variant="outlined"
                        ></v-text-field>
                    </v-col>
                    <v-col cols="3">
                        <v-text-field
                            label="Contact No."
                            type="text"
                            density="compact"
                            variant="outlined"
                        ></v-text-field>
                    </v-col>
                    <v-col cols="3">
                        <v-text-field
                            label="Email"
                            type="text"
                            density="compact"
                            variant="outlined"
                        ></v-text-field>
                    </v-col>
                    <v-col lg="12">
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
            <div v-if="tab === '3'">
                <v-row class="mt-1">
                    <v-col lg="12">
                        <v-card>
                            <v-card-text>
                                <v-table density="compact">
                                    <thead>
                                        <tr>
                                            <th v-for="(header, index) in other_family_headers" :key="index">
                                                {{ header }}
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td v-for="(header, index) in other_family_headers" :key="index">
                                                <template v-if="showIdTextFields">
                                                    <v-text-field
                                                        v-model="idFields[index]"
                                                        type="text"
                                                        density="compact"
                                                        variant="outlined"
                                                    ></v-text-field>
                                                </template>
                                            </td>
                                        </tr>
                                    </tbody>
                                </v-table>
                        </v-card-text>
                        <v-card-actions>
                            <v-btn class="bg-primary text-white" type="submit" @click="addIdField">
                                {{ showIdTextFields ? 'Save' : 'Add' }}
                            </v-btn>
                            <v-btn class="bg-error text-white" type="submit" @click="deleteIdField" v-if="showIdTextFields">
                                Delete
                            </v-btn>
                        </v-card-actions>
                        </v-card>
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
        ></address-form>
    </v-dialog>
</template>

<script setup>
import AddressForm from "./sub-forms/AddressForm.vue";

let tab = ref("1")
const other_family_headers = ['Relationship', 'Last name', 'First name', 'Middle name', 'Suffix name', 'Birth Date', 'Contact No.'];
const showIdTextFields = ref(false);
const idFields = ref([]);

const address_form_dialog = ref(false);
const address_form_type = ref();

const addIdField = () => {
if (!showIdTextFields.value) {
    showIdTextFields.value = true;
    idFields.value = Array(idHeaders.length).fill('');
} else {
    // Save the data or perform any other action needed
    console.log('Saving ID Information:', idFields.value);
    showIdTextFields.value = false;
}
};
const deleteIdField = () => {
    showIdTextFields.value = false;
    idFields.value = [];
};

const handleOpenAddressForm = (type) => {
    address_form_type.value = type;
    address_form_dialog.value = true;
    alert(`Address Form Opened. Type: ${type}`)
};

const closeAddressForm = () => {
    address_form_dialog.value = false;
};

const handleAddressSubmission = () => {
    alert(`Address Submitted. Type: ${address_form_type.value}`);
}
</script>

<style scoped>

</style>