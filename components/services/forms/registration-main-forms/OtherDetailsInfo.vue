<template>
    <v-row>
        <v-col cols="4">
            <v-col cols="12" class="form-col">
                <v-list-subheader class="form-header">Birth Place</v-list-subheader>
                <v-text-field
                    variant="solo"
                    v-model="payload.birthplace"
                    :readonly="clicked_option === 'view'"
                    hide-details
                    density="compact"
                ></v-text-field>
            </v-col>
            <v-col cols="12" class="form-col">
                <v-list-subheader class="form-header">Religion</v-list-subheader>
                <v-autocomplete
                    item-title="religion_name"
                    item-value="id"
                    v-model="payload.religion_id"
                    :readonly="clicked_option === 'view'"
                    hide-details
                    :clearable="clicked_option === 'new' || clicked_option === 'edit'"
                    :items="religion_data"
                    density="compact"
                    variant="solo"
                ></v-autocomplete>
            </v-col>
            <v-col cols="12" class="form-col">
                <v-list-subheader class="form-header">Nationality</v-list-subheader>
                <v-autocomplete
                    item-title="nationality"
                    item-value="id"
                    v-model="payload.nationality_id"
                    :readonly="clicked_option === 'view'"
                    hide-details
                    :clearable="clicked_option === 'new' || clicked_option === 'edit'"
                    :items="nationality_data"
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
                    :value="fullAddress"
                    readonly
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
                        v-model="payload.death_date"
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
                        item-title="description"
                        item-value="id"
                        placeholder="Choose Type of Death"
                        v-model="payload.mscDeath_types_id"
                        :disabled="!payload.dead_on_arrival"
                        :readonly="clicked_option === 'view'"
                        hide-details
                        :clearable="clicked_option === 'new' || clicked_option === 'edit'"
                        :items="death_types_data"
                        density="compact"
                        variant="solo"
                    ></v-autocomplete>
                </v-col>
            </v-row>
            <v-col cols="12" class="form-col">
                    <v-list-subheader class="form-header mt-1">Chief Complaints </v-list-subheader>
                    <v-textarea 
                        hide-details 
                        density="compact" 
                        variant="solo" 
                        v-model="payload.clinical_chief_complaint"
                        :readonly="clicked_option === 'view'"
                    ></v-textarea>
            </v-col>
        </v-col>
    </v-row>
    <medical-package-list :medical_package_dialog="medical_package_dialog" @close-dialog="closeMedicalPackage" @handle-select="handleSelectPackage" />
    <address-details-form :address_form_dialog="address_form_dialog" :payload="payload" @close-dialog="closeAddressForm" @handle-submit="handleSubmitAddress" />
</template>

<script setup>

const { selectedRowDetails } = storeToRefs(useSubcomponentSelectedRowDetailsStore());
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
    if (props.clicked_option === 'view') return;
    address_form_dialog.value = true;
};

const fullAddress = ref("");
const handleSubmitAddress = (address) => {
    console.log(address);
    const { bldgstreet, region_name, province_name, municipality_name, barangay_name, country_name } = address;
    const { region_id, province_id, municipality_id, barangay_id, country_id } = address;

    fullAddress.value = [bldgstreet, barangay_name, municipality_name, province_name, region_name, country_name].filter(Boolean).join(', '); 
    props.payload.address = {
        bldgstreet,
        region_id,
        province_id,
        municipality_id,
        barangay_id,
        country_id
    };
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

const religion_data = ref([]);
const religion_loading = ref(false);
const getReligion = async () => {
    religion_loading.value = true;
    const response = await useMethod("get", "get-religions", "", "");
    if (response) {
        religion_data.value = response;
        religion_loading.value = false;
    }
}
const nationality_data = ref([]);
const nationality_loading = ref(false);
const getNationality = async () => {
    nationality_loading.value = true;
    const response = await useMethod("get", "get-nationalities", "", "");
    if (response) {
        nationality_data.value = response;
        nationality_loading.value = false;
    }
}

const death_types_data = ref([]);
const death_types_loading = ref(false);
const getDeathTypes = async () => {
    death_types_loading.value = true;
    const response = await useMethod("get", "get-death-type", "", "");
    if (response) {
        death_types_data.value = response;
        death_types_loading.value = false;
    } 
};

onMounted(() => {
    getReligion();
    getNationality();
    getDeathTypes();
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