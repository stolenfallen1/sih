<template>
    <v-row>
        <v-col cols="4">
            <v-col cols="12" class="form-col">
                <v-list-subheader class="form-header">Birth Place</v-list-subheader>
                <v-text-field
                    variant="outlined"
                    v-model="payload.birthplace"
                    :readonly="clicked_option === 'view'"
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
                    :clearable="clicked_option === 'new' || clicked_option === 'edit'"
                    :items="religion_data"
                    density="compact"
                    variant="outlined"
                ></v-autocomplete>
            </v-col>
            <v-col cols="12" class="form-col">
                <v-list-subheader class="form-header">Nationality</v-list-subheader>
                <v-autocomplete
                    item-title="nationality"
                    item-value="id"
                    v-model="payload.nationality_id"
                    :readonly="clicked_option === 'view'"
                    :clearable="clicked_option === 'new' || clicked_option === 'edit'"
                    :items="nationality_data"
                    density="compact"
                    variant="outlined"
                ></v-autocomplete>
            </v-col>
            <v-col cols="12" class="form-col">
                <v-list-subheader class="form-header">Full Address</v-list-subheader>
                <v-textarea 
                    density="compact" 
                    variant="outlined"
                    v-model="payload.address"
                    :value="fullAddress"
                    readonly
                    class="cursor-pointer"
                    prepend-icon="mdi-plus-box"
                    @click:prepend="handleOpenAddressForm"
                ></v-textarea>
            </v-col>
        </v-col>
        <v-col cols="4" v-if="payload.civilstatus_id !== 3">
            <v-col cols="12" class="form-col">
                <v-list-subheader class="form-header">Father Last Name</v-list-subheader>
                <v-text-field
                    variant="outlined"
                    v-model="payload.fatherLastname"
                    :readonly="clicked_option === 'view'"
                    density="compact"
                ></v-text-field>
            </v-col>
            <v-col cols="12" class="form-col">
                <v-list-subheader class="form-header">Father First Name</v-list-subheader>
                <v-text-field
                    variant="outlined"
                    v-model="payload.fatherFirstname"
                    :readonly="clicked_option === 'view'"
                    density="compact"
                ></v-text-field>
            </v-col>
            <v-col cols="12" class="form-col">
                <v-list-subheader class="form-header">Father Middle Name</v-list-subheader>
                <v-text-field
                    variant="outlined"
                    v-model="payload.fatherMiddlename"
                    :readonly="clicked_option === 'view'"
                    density="compact"
                ></v-text-field>
            </v-col>
            <v-col cols="12" class="form-col">
                <v-list-subheader class="form-header">Father Birth Date</v-list-subheader>
                <v-text-field
                    variant="outlined"
                    type="date"
                    v-model="payload.fatherBirthdate"
                    :readonly="clicked_option === 'view'"
                    density="compact"
                ></v-text-field>
            </v-col>
            <v-col cols="12" class="form-col">
                <v-list-subheader class="form-header">Father Age</v-list-subheader>
                <v-text-field
                    variant="outlined"
                    v-model="payload.fatherAge"
                    readonly
                    placeholder="Auto Compute"
                    density="compact"
                ></v-text-field>
            </v-col>
        </v-col>
        <v-col cols="4" v-if="payload.civilstatus_id !== 3">
            <v-col cols="12" class="form-col">
                <v-list-subheader class="form-header">Mother Last Name</v-list-subheader>
                <v-text-field
                    variant="outlined"
                    v-model="payload.motherLastname"
                    :readonly="clicked_option === 'view'"
                    density="compact"
                ></v-text-field>
            </v-col>
            <v-col cols="12" class="form-col">
                <v-list-subheader class="form-header">Mother First Name</v-list-subheader>
                <v-text-field
                    variant="outlined"
                    v-model="payload.motherFirstname"
                    :readonly="clicked_option === 'view'"
                    density="compact"
                ></v-text-field>
            </v-col>
            <v-col cols="12" class="form-col">
                <v-list-subheader class="form-header">Mother Middle Name</v-list-subheader>
                <v-text-field
                    variant="outlined"
                    v-model="payload.motherMiddlename"
                    :readonly="clicked_option === 'view'"
                    density="compact"
                ></v-text-field>
            </v-col>
            <v-col cols="12" class="form-col">
                <v-list-subheader class="form-header">Mother Birth Date</v-list-subheader>
                <v-text-field
                    variant="outlined"
                    type="date"
                    v-model="payload.motherBirthdate"
                    :readonly="clicked_option === 'view'"
                    density="compact"
                ></v-text-field>
            </v-col>
            <v-col cols="12" class="form-col">
                <v-list-subheader class="form-header">Mother Age</v-list-subheader>
                <v-text-field
                    variant="outlined"
                    v-model="payload.motherAge"
                    readonly
                    placeholder="Auto Compute"
                    density="compact"
                ></v-text-field>
            </v-col>
        </v-col>
        <v-col cols="4" v-if="payload.civilstatus_id === 3">
            <v-col cols="12" class="form-col">
                <v-list-subheader class="form-header">Spouse Last Name</v-list-subheader>
                <v-text-field
                    variant="outlined"
                    v-model="payload.fatherLastname"
                    :readonly="clicked_option === 'view'"
                    density="compact"
                ></v-text-field>
            </v-col>
            <v-col cols="12" class="form-col">
                <v-list-subheader class="form-header">Spouse First Name</v-list-subheader>
                <v-text-field
                    variant="outlined"
                    v-model="payload.fatherFirstname"
                    :readonly="clicked_option === 'view'"
                    density="compact"
                ></v-text-field>
            </v-col>
            <v-col cols="12" class="form-col">
                <v-list-subheader class="form-header">Spouse Middle Name</v-list-subheader>
                <v-text-field
                    variant="outlined"
                    v-model="payload.fatherMiddlename"
                    :readonly="clicked_option === 'view'"
                    density="compact"
                ></v-text-field>
            </v-col>
            <v-col cols="12" class="form-col">
                <v-list-subheader class="form-header">Spouse Birth Date</v-list-subheader>
                <v-text-field
                    variant="outlined"
                    type="date"
                    v-model="payload.fatherBirthdate"
                    :readonly="clicked_option === 'view'"
                    density="compact"
                ></v-text-field>
            </v-col>
            <v-col cols="12" class="form-col">
                <v-list-subheader class="form-header">Spouse Age</v-list-subheader>
                <v-text-field
                    variant="outlined"
                    v-model="payload.fatherAge"
                    readonly
                    placeholder="Auto Compute"
                    density="compact"
                ></v-text-field>
            </v-col>
        </v-col>
        <v-col cols="4" v-if="payload.civilstatus_id === 3">
            <v-col cols="12" class="form-col">
                <v-list-subheader class="form-header">Guardian Last Name</v-list-subheader>
                <v-text-field
                    variant="outlined"
                    v-model="payload.motherLastname"
                    :readonly="clicked_option === 'view'"
                    density="compact"
                ></v-text-field>
            </v-col>
            <v-col cols="12" class="form-col">
                <v-list-subheader class="form-header">Guardian First Name</v-list-subheader>
                <v-text-field
                    variant="outlined"
                    v-model="payload.motherFirstname"
                    :readonly="clicked_option === 'view'"
                    density="compact"
                ></v-text-field>
            </v-col>
            <v-col cols="12" class="form-col">
                <v-list-subheader class="form-header">Guardian Middle Name</v-list-subheader>
                <v-text-field
                    variant="outlined"
                    v-model="payload.motherMiddlename"
                    :readonly="clicked_option === 'view'"
                    density="compact"
                ></v-text-field>
            </v-col>
            <v-col cols="12" class="form-col">
                <v-list-subheader class="form-header">Guardian Birth Date</v-list-subheader>
                <v-text-field
                    variant="outlined"
                    type="date"
                    v-model="payload.motherBirthdate"
                    :readonly="clicked_option === 'view'"
                    density="compact"
                ></v-text-field>
            </v-col>
            <v-col cols="12" class="form-col">
                <v-list-subheader class="form-header">Guardian Age</v-list-subheader>
                <v-text-field
                    variant="outlined"
                    v-model="payload.motherAge"
                    readonly
                    placeholder="Auto Compute"
                    density="compact"
                ></v-text-field>
            </v-col>
        </v-col>
    </v-row>
    <o-p-d-address-details-form :address_form_dialog="address_form_dialog" :payload="payload" @close-dialog="closeAddressForm" @handle-submit="handleSubmitAddress" />
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
    font-weight: bold;
}
.form-col {
    padding: 3.25px 0px 3.25px 0px !important;
    margin: 0px !important;
}
</style>