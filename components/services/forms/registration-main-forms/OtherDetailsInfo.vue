<template>
    <v-row>
        <v-col cols="4">
            <v-col cols="12" class="form-col">
                <v-list-subheader class="form-header">Birth Place</v-list-subheader>
                <v-text-field
                    variant="solo"
                    v-model="payload.birthplace"
                    :readonly="clicked_option === 'view'"
                    placeholder="Enter Birth Place"
                    hide-details
                    density="compact"
                ></v-text-field>
            </v-col>
            <v-col cols="12" class="form-col">
                <v-list-subheader class="form-header">Religion</v-list-subheader>
                <v-autocomplete
                    item-title="religion"
                    item-value="id"
                    placeholder="Select Religion"
                    v-model="payload.religion_id"
                    :readonly="clicked_option === 'view'"
                    hide-details
                    clearable
                    :items="['Catholic', 'Muslim', 'Christian']"
                    density="compact"
                    variant="solo"
                ></v-autocomplete>
            </v-col>
            <v-col cols="12" class="form-col">
                <v-list-subheader class="form-header">Nationality</v-list-subheader>
                <v-autocomplete
                    item-title="nationality"
                    item-value="id"
                    placeholder="Select Nationality"
                    v-model="payload.nationality_id"
                    :readonly="clicked_option === 'view'"
                    hide-details
                    clearable
                    :items="['Spanish', 'Japanese', 'Filipino']"
                    density="compact"
                    variant="solo"
                ></v-autocomplete>
            </v-col>
            <v-col v-if="form_type === 'inpatient'" cols="12" class="form-col">
                <v-list-subheader class="form-header">Admission Reference No.</v-list-subheader>
                <v-text-field
                    variant="solo"
                    v-model="payload.admission_reference_no"
                    :readonly="clicked_option === 'view'"
                    placeholder="Enter Admission Reference No."
                    hide-details
                    density="compact"
                ></v-text-field>
            </v-col>
            <v-col v-if="form_type === 'outpatient'" cols="12" class="form-col">
                <v-checkbox label="Hemodialysis Patient?" hide-details density="compact" :readonly="clicked_option === 'view'"></v-checkbox>
            </v-col>
            <v-col cols="12" class="form-col">
                <v-checkbox v-model="payload.isWithMedicalPackage" :readonly="clicked_option === 'view'" label="With Hospital Package?" hide-details density="compact"></v-checkbox>
                <v-btn :disabled="!payload.isWithMedicalPackage" :readonly="clicked_option === 'view'" @click="handleMedicalPackage">Apply Medical Package</v-btn>
            </v-col>
        </v-col>
        <v-col cols="8">
            <v-col cols="12" class="form-col">
                <v-list-subheader class="form-header">Full Address</v-list-subheader>
                <v-textarea 
                    hide-details 
                    density="compact" 
                    variant="solo"
                    v-model="payload.address"
                    :readonly="clicked_option === 'view'"
                    class="cursor-pointer"
                    prepend-icon="mdi-plus-box"
                    @click:prepend="handleOpenAddressForm"
                ></v-textarea>
            </v-col>
            <v-col v-if="form_type === 'emergency'" cols="5" class="form-col">
                <v-checkbox label="Dead on Arrival?" v-model="payload.dead_on_arrival" :readonly="clicked_option === 'view'" hide-details density="compact"></v-checkbox>
            </v-col>
            <v-row v-if="form_type === 'emergency'">
                <v-col cols="5">
                    <v-list-subheader class="form-header">Death Date Time</v-list-subheader>
                    <v-text-field
                        variant="solo"
                        v-model="payload.timeofdeath"
                        :disabled="!payload.dead_on_arrival"
                        :readonly="clicked_option === 'view'"
                        type="date"
                        hide-details
                        density="compact"
                    ></v-text-field>
                </v-col>
                <v-col cols="7">
                    <v-list-subheader class="form-header">Type of Death</v-list-subheader>
                    <v-autocomplete
                        item-title="type_of_death"
                        item-value="id"
                        placeholder="Choose Type of Death"
                        v-model="payload.typeofdeath_id"
                        :disabled="!payload.dead_on_arrival"
                        :readonly="clicked_option === 'view'"
                        hide-details
                        clearable
                        :items="[]"
                        density="compact"
                        variant="solo"
                    ></v-autocomplete>
                </v-col>
            </v-row>
        </v-col>
    </v-row>
    <medical-package-list :medical_package_dialog="medical_package_dialog" @close-dialog="closeMedicalPackage" @handle-select="handleSelectPackage" />
    <address-details-form :address_form_dialog="address_form_dialog" @close-dialog="closeAddressForm" @handle-submit="handleSubmitAddress" />
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
})

const medical_package_dialog = ref(false);
const address_form_dialog = ref(false);

const handleOpenAddressForm = () => {
    address_form_dialog.value = true;
};

const handleSubmitAddress = () => {
    alert('Address submitted');
    address_form_dialog.value = false;
};

const handleMedicalPackage = () => {
    medical_package_dialog.value = true;
};

const handleSelectPackage = () => {
    alert('Medical Package selected');
    medical_package_dialog.value = false;
}

const closeMedicalPackage = () => {
    medical_package_dialog.value = false;
};

const closeAddressForm = () => {
    address_form_dialog.value = false;
};
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