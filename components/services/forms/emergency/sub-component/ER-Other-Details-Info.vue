<template>
    <v-row>
        <v-col cols="3">
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
        </v-col>
        <v-col cols="3">
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
        </v-col>
        <v-col cols="3">
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
        </v-col>
    </v-row>

    <v-row>
        <v-col cols="3">
            <v-col cols="12" class="form-col">
                <v-list-subheader class="form-header">ID Presented </v-list-subheader>
                <v-autocomplete
                    item-title="id_description"
                    item-value="id"
                    v-model="payload.id_presented"
                    :readonly="clicked_option === 'view'"
                    :clearable="clicked_option === 'new' || clicked_option === 'edit'"
                    hide-details
                    :items="id_types_data"
                    density="compact"
                    variant="solo"
                ></v-autocomplete>
            </v-col>
        </v-col>
        <v-col cols="3">
            <v-col cols="12" class="form-col">
                <v-list-subheader class="form-header">ID Number </v-list-subheader>
                <v-text-field
                    variant="solo"
                    type="number"
                    v-model="payload.id_number"
                    :readonly="clicked_option === 'view'"
                    hide-details
                    density="compact"
                ></v-text-field>
            </v-col>
        </v-col>
        <v-col cols="3">
            <v-col cols="12" class="form-col">
                <v-list-subheader class="form-header">OSCA ID No. </v-list-subheader>
                <v-text-field
                    variant="solo"
                    type="number"
                    v-model="payload.osca_id_no"
                    :readonly="clicked_option === 'view'"
                    hide-details
                    density="compact"
                ></v-text-field>
            </v-col>
        </v-col>
        <v-col cols="3">
            <v-col cols="12" class="form-col">
                <v-list-subheader class="form-header">Patient Brought By</v-list-subheader>
                <v-autocomplete
                    v-model="payload.mscBroughtBy_Relationship_Id"
                    :items="patientBroughtBy"
                    item-title="description"
                    item-value="id"
                    :readonly="clicked_option === 'view'"
                    :clearable="clicked_option === 'new' || clicked_option === 'edit'"
                    variant="solo"
                    density="compact"
                    hide-details
                ></v-autocomplete>
            </v-col>
        </v-col>
    </v-row>

    <div v-if="parseInt(payload.civilstatus_id) !== 3">
        <v-row>
            <v-col cols="3">
                <v-col cols="12" class="form-col">
                    <v-list-subheader class="form-header">Mother Lastname </v-list-subheader>
                    <v-text-field
                        variant="solo"
                        v-model="payload.motherLastname"
                        :readonly="clicked_option === 'view'"
                        hide-details
                        density="compact"
                    ></v-text-field>
                </v-col>
            </v-col>
            
            <v-col cols="3">
                <v-col cols="12" class="form-col">
                    <v-list-subheader class="form-header">Mother Firstname </v-list-subheader>
                    <v-text-field
                        variant="solo"
                        v-model="payload.motherFirstname"
                        :readonly="clicked_option === 'view'"
                        hide-details
                        density="compact"
                    ></v-text-field>
                </v-col>
            </v-col>

            <v-col cols="3">
                <v-col cols="12" class="form-col">
                    <v-list-subheader class="form-header">Mother Middlename </v-list-subheader>
                    <v-text-field
                        variant="solo"
                        v-model="payload.motherMiddlename"
                        :readonly="clicked_option === 'view'"
                        hide-details
                        density="compact"
                    ></v-text-field>
                </v-col>
            </v-col>

            <v-col cols="3">
                <v-col cols="12" class="form-col">
                    <v-list-subheader class="form-header">Mothers Suffix </v-list-subheader>
                    <v-autocomplete
                        item-title="abbreviations"
                        item-value="id"
                        :items="suffix_data"
                        v-model="payload.motherSuffix_id"
                        :readonly="clicked_option === 'view'"
                        hide-details
                        :clearable="clicked_option === 'new' || clicked_option === 'edit'"
                        density="compact"
                        variant="solo"
                    ></v-autocomplete>
                </v-col>
            </v-col>
        </v-row>
        <v-row>
            <v-col cols="3">
                <v-col cols="12" class="form-col">
                    <v-list-subheader class="form-header">Father Lastname </v-list-subheader>
                    <v-text-field
                        variant="solo"
                        v-model="payload.fatherLastname"
                        :readonly="clicked_option === 'view'"
                        hide-details
                        density="compact"
                    ></v-text-field>
                </v-col>
            </v-col>
            
            <v-col cols="3">
                <v-col cols="12" class="form-col">
                    <v-list-subheader class="form-header">Fathers Firstname </v-list-subheader>
                    <v-text-field
                        variant="solo"
                        v-model="payload.fatherFirstname"
                        :readonly="clicked_option === 'view'"
                        hide-details
                        density="compact"
                    ></v-text-field>
                </v-col>
            </v-col>

            <v-col cols="3">
                <v-col cols="12" class="form-col">
                    <v-list-subheader class="form-header">Father Middlename </v-list-subheader>
                    <v-text-field
                        variant="solo"
                        v-model="payload.fatherMiddlename"
                        :readonly="clicked_option === 'view'"
                        hide-details
                        density="compact"
                    ></v-text-field>
                </v-col>
            </v-col>

            <v-col cols="3">
                <v-col cols="12" class="form-col">
                    <v-list-subheader class="form-header">Fathers Suffix </v-list-subheader>
                    <v-autocomplete
                        item-title="abbreviations"
                        item-value="id"
                        :items="suffix_data"
                        v-model="payload.fatherSuffix_id"
                        :readonly="clicked_option === 'view'"
                        hide-details
                        :clearable="clicked_option === 'new' || clicked_option === 'edit'"
                        density="compact"
                        variant="solo"
                    ></v-autocomplete>
                </v-col>
            </v-col>
        </v-row>
    </div>

    <div v-if="parseInt(payload.civilstatus_id) === 3">
        <v-row>
            <v-col cols="3">
                <v-col cols="12" class="form-col">
                    <v-list-subheader class="form-header">Spouse Lastname </v-list-subheader>
                    <v-text-field
                        variant="solo"
                        v-model="payload.spLastname"
                        :readonly="clicked_option === 'view'"
                        hide-details
                        density="compact"
                    ></v-text-field>
                </v-col>
            </v-col>

            <v-col cols="3">
                <v-col cols="12" class="form-col">
                    <v-list-subheader class="form-header">Spouse Firstname </v-list-subheader>
                    <v-text-field
                        variant="solo"
                        v-model="payload.spFirstname"
                        :readonly="clicked_option === 'view'"
                        hide-details
                        density="compact"
                    ></v-text-field>
                </v-col>
            </v-col>

            <v-col cols="3">
                <v-col cols="12" class="form-col">
                    <v-list-subheader class="form-header">Spouse Middlename </v-list-subheader>
                    <v-text-field
                        variant="solo"
                        v-model="payload.spMiddlename"
                        :readonly="clicked_option === 'view'"
                        hide-details
                        density="compact"
                    ></v-text-field>
                </v-col>
            </v-col>

            <v-col cols="3">
                <v-col cols="12" class="form-col">
                    <v-list-subheader class="form-header">Spouse Suffix </v-list-subheader>
                    <v-autocomplete
                        item-title="abbreviations"
                        item-value="id"
                        :items="suffix_data"
                        v-model="payload.spSuffix_id"
                        :readonly="clicked_option === 'view'"
                        hide-details
                        :clearable="clicked_option === 'new' || clicked_option === 'edit'"
                        density="compact"
                        variant="solo"
                    ></v-autocomplete>
                </v-col>
            </v-col>
        </v-row>
    </div>

    <v-row>
        <v-col cols="4">
            <!-- <v-col cols="12" class="form-col">
                <v-checkbox v-model="payload.isWithMedicalPackage" :readonly="clicked_option === 'view'" label="With Hospital Package?" hide-details density="compact"></v-checkbox>
                <v-btn :disabled="!payload.isWithMedicalPackage" :readonly="clicked_option === 'view'" @click="handleMedicalPackage">Apply Medical Package</v-btn>
            </v-col> -->

            <v-col cols="12" class="form-col">
                <v-checkbox 
                    label="Is the patient employed" 
                    v-model="payload.isEmployee" 
                    color="primary" 
                    density="compact"
                ></v-checkbox>
            </v-col>

            <v-col cols="12" class="form-col">
                <v-checkbox 
                    label="Dead on Arrival?" 
                    v-model="payload.dead_on_arrival" 
                    color="primary" 
                    :readonly="clicked_option === 'view'" 
                    hide-details density="compact"
                ></v-checkbox>
            </v-col>
        </v-col>
        <v-col cols="8">
            <v-col cols="12" class="form-col">
                <v-list-subheader class="form-header">Patient Full Address</v-list-subheader>
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
        </v-col>
    </v-row>
    <v-row>
        <v-col cols="3">
            <v-col cols="12" class="form-col">
                <v-list-subheader class="form-header">Occupation</v-list-subheader>
                <v-text-field
                    :disabled="!payload.isEmployee"
                    variant="solo"
                    v-model="payload.occupation"
                    hide-details
                    density="compact"
                ></v-text-field>
            </v-col>
        </v-col>
        <v-col cols="3">
            <v-col cols="12" class="form-col">
                <v-list-subheader class="form-header">Date & Time of Death</v-list-subheader>
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
        </v-col>
        <v-col cols="3">
            <v-col cols="12" class="form-col">
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
        </v-col>
    </v-row>
    <v-row>
        <v-col cols="12">
            <v-col cols="12" class="form-col">
                    <v-list-subheader class="form-header mt-1">Chief Complaints <span v-if="form_type === 'emergency'" style="color: red;" class="mdi mdi-check"></span></v-list-subheader>
                    <v-textarea 
                        hide-details 
                        density="compact" 
                        variant="solo" 
                        v-model="payload.clinical_chief_complaint"
                        :readonly="clicked_option === 'view'"
                        :required="form_type === 'emergency'"
                    ></v-textarea>
            </v-col>
        </v-col>
    </v-row>
    <medical-package-list :medical_package_dialog="medical_package_dialog" @close-dialog="closeMedicalPackage" @handle-select="handleSelectPackage" />
    <e-r-address-details-form :address_form_dialog="address_form_dialog" :payload="payload" @close-dialog="closeAddressForm" @handle-submit="handleSubmitAddress" />
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
const isEmployee = ref(false);

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

const id_types_data = ref([]);
const id_types_loading = ref(false);
const getIdTypes = async () => {
    id_types_loading.value = true;
    const response = await useMethod("get", "get-id-types", "", "");
    if (response) {
        id_types_data.value = response;
        id_types_loading.value = false;
    } 
};


const patientBroughtBy = ref([]);
const patientBroughtBy_loading = ref(false);
const getPatientBroughtBy = async () => {
    patientBroughtBy_loading.value = true;
    const response = await useMethod("get", "patient-brought-by", "", "");
    if(response) {
        patientBroughtBy.value = response;
        patientBroughtBy_loading.value = false;
    }
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

const mscComplaint_data = ref([]);
const mscComplaintsLoading = ref(false);
const getmscComplsints = async () => {
    mscComplaintsLoading.value = true;
    const response = await useMethod("get", "get-msc-complaint", "", "");
    if(response) {
        mscComplaint_data.value = response;
        mscComplaintsLoading.value = false;
    }
}
onMounted(() => {
    getReligion();
    getNationality();
    getDeathTypes();
    getmscComplsints();
    getIdTypes();
    getPatientBroughtBy();
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
.v-input--density-compact {
    --v-input-control-height: 20px !important;
}
</style>