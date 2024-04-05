<template>
    <v-row>
        <v-col cols="4">
            <v-col cols="12" class="form-col">
                <v-text-field
                    variant="outlined"
                    label="Birth Place"
                    v-model="payload.birth_place"
                    placeholder="Enter Birth Place"
                    hide-details
                    density="compact"
                ></v-text-field>
            </v-col>
            <v-col cols="12" class="form-col">
                <v-autocomplete
                    item-title="religion"
                    item-value="id"
                    label="Religion"
                    placeholder="Select Religion"
                    v-model="payload.religion"
                    hide-details
                    clearable
                    :items="['Catholic', 'Muslim', 'Christian']"
                    density="compact"
                    variant="outlined"
                ></v-autocomplete>
            </v-col>
            <v-col cols="12" class="form-col">
                <v-autocomplete
                    item-title="nationality"
                    item-value="id"
                    label="Nationality"
                    placeholder="Select Nationality"
                    v-model="payload.nationality"
                    hide-details
                    clearable
                    :items="['Spanish', 'Japanese', 'Filipino']"
                    density="compact"
                    variant="outlined"
                ></v-autocomplete>
            </v-col>
            <v-col cols="12" class="form-col">
                <v-checkbox label="Hemodialysis Patient?" hide-details density="compact"></v-checkbox>
            </v-col>
            <v-col cols="12" class="form-col">
                <v-checkbox v-model="payload.isPackage" label="With Hospital Package?" hide-details density="compact"></v-checkbox>
                <v-btn :disabled="!payload.isPackage" @click="handleMedicalPackage">Apply Medical Package</v-btn>
            </v-col>
        </v-col>
        <v-col cols="8">
            <v-col cols="12" class="form-col">
                <v-textarea 
                    hide-details 
                    density="compact" 
                    variant="outlined" 
                    label="Temporary Address"
                    v-model="payload.temporary_address"
                    class="cursor-pointer"
                    prepend-icon="mdi-plus-box"
                    @click:prepend="handleOpenAddressForm"
                ></v-textarea>
            </v-col>
            <v-col cols="12" class="form-col">
                <v-checkbox class="ml-12" label="Check if Temporary Address is the same as Permanent Address" hide-details density="compact"></v-checkbox>
            </v-col>
            <v-col cols="12" class="form-col">
                <v-textarea 
                    hide-details 
                    density="compact" 
                    variant="outlined" 
                    label="Permanent Address"
                    v-model="payload.permanent_address"
                    class="cursor-pointer"
                    prepend-icon="mdi-plus-box"
                    @click:prepend="handleOpenAddressForm"
                ></v-textarea>
            </v-col>
        </v-col>
    </v-row>
    <address-details-form :address_form_dialog="address_form_dialog" @close-dialog="closeAddressForm" @handle-submit="handleSubmitAddress" />
</template>

<script setup>
const props = defineProps({
    payload: {
        type: Object,
        required: true,
        default: () => ({})
    }
})

const with_hospital_pacakge = ref(false);
const address_form_dialog = ref(false);

const handleOpenAddressForm = () => {
    address_form_dialog.value = true;
};

const handleSubmitAddress = () => {
    alert('Address submitted');
    address_form_dialog.value = false;
};

const closeAddressForm = () => {
    address_form_dialog.value = false;
};
</script>

<style scoped>
.form-col {
    padding: 3.25px 0px 3.25px 0px !important;
    margin: 0px !important;
}
</style>