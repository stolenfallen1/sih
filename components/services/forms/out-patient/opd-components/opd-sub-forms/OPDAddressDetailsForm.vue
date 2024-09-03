<template>
    <v-dialog
        :model-value="address_form_dialog"
        @update:model-value="closeDialog"
        hide-overlay
        width="750"
    >
        <form @submit.prevent="handleSubmit">
            <v-card rounded="lg">
                <v-toolbar density="compact" color="#107bac" hide-details>
                    <v-toolbar-title>Address Form</v-toolbar-title>
                    <v-btn color="white" @click="closeDialog">
                        <v-icon>mdi-close</v-icon>
                    </v-btn>
                </v-toolbar>
                <v-card-text>
                    <v-container>
                        <v-row>
                            <v-col cols="6" class="pa-1">
                                <v-list-subheader class="form-header">Building No. / Street </v-list-subheader>
                                <v-text-field
                                    v-model="address_data.bldgstreet"
                                    variant="outlined"
                                    density="compact"
                                    hide-details
                                ></v-text-field>
                            </v-col>
                            <v-col cols="6" class="pa-1">
                                <v-list-subheader class="form-header">Region </v-list-subheader>
                                <v-autocomplete
                                    v-model="address_data.region_id"
                                    item-title="region_name"
                                    item-value="region_code"
                                    :items="region_data"
                                    @update:model-value="updateRegion"
                                    :loading="region_data_loading"
                                    hide-details
                                    clearable
                                    density="compact" 
                                    variant="outlined"
                                ></v-autocomplete>
                            </v-col>
                            <v-col cols="6" class="pa-1">
                                <v-list-subheader class="form-header">Province / State </v-list-subheader>
                                <v-autocomplete
                                    v-model="address_data.province_id"
                                    item-title="province_name"
                                    item-value="province_code"
                                    :items="province_data"
                                    @update:model-value="updateProvince"
                                    :loading="province_data_loading"
                                    hide-details
                                    clearable
                                    density="compact"
                                    variant="outlined"
                                ></v-autocomplete>
                            </v-col>
                            <v-col cols="6" class="pa-1">
                                <v-list-subheader class="form-header">Town / Municipality </v-list-subheader>
                                <v-autocomplete
                                    v-model="address_data.municipality_id"
                                    item-title="municipality_name"
                                    item-value="municipality_code"
                                    :items="municipality_data"
                                    @update:model-value="updateMunicipality"
                                    :loading="municipality_data_loading"
                                    hide-details
                                    clearable
                                    density="compact"
                                    variant="outlined"
                                ></v-autocomplete>
                            </v-col>
                            <v-col cols="6" class="pa-1">
                                <v-list-subheader class="form-header">Barangay </v-list-subheader>
                                <v-autocomplete
                                    v-model="computedBarangayID"
                                    item-title="barangay_name"
                                    item-value="id"
                                    :items="barangay_data"
                                    @update:model-value="updateBarangay"
                                    :loading="barangay_data_loading"
                                    hide-details
                                    clearable
                                    density="compact"
                                    variant="outlined"
                                ></v-autocomplete>
                            </v-col>
                            <v-col cols="6" class="pa-1">
                                <v-list-subheader class="form-header">Country </v-list-subheader>
                                <v-autocomplete
                                    v-model="computedCountryID"
                                    item-title="country_name"
                                    item-value="id"
                                    :items="country_data"
                                    @update:model-value="updateCountry"
                                    :loading="country_data_loading"
                                    hide-details
                                    clearable
                                    density="compact"
                                    variant="outlined"
                                ></v-autocomplete>
                            </v-col>
                        </v-row>
                    </v-container>
                </v-card-text>
                <v-divider></v-divider>
                <v-card-actions>
                    <v-btn color="blue-darken-1 border border-info" @click="closeDialog"> Close </v-btn>
                    <v-spacer></v-spacer>
                    <v-btn
                        class="bg-primary text-white"
                        type="submit"
                    >
                        Submit Address
                    </v-btn>
                </v-card-actions>
            </v-card>
        </form>
    </v-dialog>
</template>

<script setup>
const emits = defineEmits(['close-dialog', 'handle-submit']);
const props = defineProps({
    address_form_dialog: {
        type: Boolean,
        default: () => false,
        required: true,
    },
    payload:{
        type: Object,
        default: () => ({})
    }
})

const address_data = ref({
    region_id: null,
    region_name: '',
    province_id: null,
    province_name: '',
    municipality_id: null,
    municipality_name: '',
    barangay_id: null,
    barangay_name: '',
    country_id: null,
    country_name: '',
});

const handleSubmit = () => {
    emits("handle-submit", address_data.value);
    closeDialog();
};

const closeDialog = () => {
    emits("close-dialog");
};

const region_data = ref([]);
const region_data_loading = ref(false);
const getRegion = async () => {
    region_data_loading.value = true;
    const response = await useMethod("get", "get-regions", "", "");
    if (response) {
        region_data.value = response;
        region_data_loading.value = false;
    }
};
const updateRegion = (value) => {
    const selected = region_data.value.find(item => item.region_code === value);
    address_data.value.region_id = value;
    address_data.value.region_name = selected ? selected.region_name : '';
    getProvince();
}

const province_data = ref([]);
const province_data_loading = ref(false);
const getProvince = async () => {
    province_data_loading.value = true;
    const response = await useMethod("get" , "get-province?region_code=" + address_data.value.region_id, "" , "" );
    if (response) {
        province_data.value = response.data;
        province_data_loading.value = false;
    }
}
const updateProvince = (value) => {
    const selected = province_data.value.find(item => item.province_code === value);
    address_data.value.province_id = value;
    address_data.value.province_name = selected ? selected.province_name : '';
    getMunicipality();
}

const municipality_data = ref([]);
const municipality_data_loading = ref(false);
const getMunicipality = async () => {
    municipality_data_loading.value = true;
    const params = "?region_code=" + address_data.value.region_id + "&province_code=" + address_data.value.province_id;
    const response = await useMethod("get", "get-municipality" + params, "", "");
    if (response) {
        municipality_data.value = response.data;
        municipality_data_loading.value = false;
    }
}
const updateMunicipality = (value) => {
    const selected = municipality_data.value.find(item => item.municipality_code === value);
    address_data.value.municipality_id = value;
    address_data.value.municipality_name = selected ? selected.municipality_name : '';
    getBarangay();
}

const barangay_data = ref([]);
const barangay_data_loading = ref(false);
const getBarangay = async () => {
    barangay_data_loading.value = true;
    const params = "?region_code=" + address_data.value.region_id + "&province_code=" + address_data.value.province_id + "&municipality_code=" + address_data.value.municipality_id;
    const response = await useMethod("get", "get-barangays" + params, "", "");
    if (response) {
        barangay_data.value = response.data;
        barangay_data_loading.value = false;
    }
}
const computedBarangayID = computed(() => {
    return isNaN(address_data.value.barangay_id) ? null : address_data.value.barangay_id;
});
const updateBarangay = (value) => {
    const selected = barangay_data.value.find(item => item.id === value);
    address_data.value.barangay_id = value;
    address_data.value.barangay_name = selected ? selected.barangay_name : '';
}

const country_data = ref([]);
const country_data_loading = ref(false);
const getCountry = async () => {
    country_data_loading.value = true;
    const response = await useMethod("get", "get-country-list", "", "");
    if (response) {
        country_data.value = response;
        country_data_loading.value = false;
    } 
}
const computedCountryID = computed(() => {
    return isNaN(address_data.value.country_id) ? null : address_data.value.country_id;
});
const updateCountry = (value) => {
    const selected = country_data.value.find(item => item.id === value);
    address_data.value.country_id = value;
    address_data.value.country_name = selected ? selected.country_name : '';
}

onMounted(() => {
    getRegion();
    getCountry();
})
onUpdated(() => {
    if (props.payload) {
        address_data.value.bldgstreet = props.payload ? props.payload.bldgstreet : '';
        updateRegion(props.payload.region_id);       
        address_data.value.region_id = props.payload ? props.payload.region_id : '';
        address_data.value.province_id = props.payload ? parseInt(props.payload.province_id) : '';
        updateProvince(props.payload.province_id);        
        address_data.value.municipality_id = props.payload ? parseInt(props.payload.municipality_id) : '';
        updateMunicipality(props.payload.municipality_id);
        updateBarangay(props.payload.barangay_id);
        address_data.value.barangay_id = props.payload ? parseInt(props.payload.barangay_id) : '';
        updateCountry(props.payload.country_id);
        address_data.value.country_id = props.payload ? parseInt(props.payload.country_id) : '';
    }
})
</script>

<style scoped>
.form-header {
    color: #000;
    margin: -12px 0px -12px 0px;
    font-weight: 500;
}
</style>
