<template>
    <v-dialog
        :model-value="address_form_dialog"
        @update:model-value="closeDialog"
        hide-overlay
        width="750"
    >
        <form @submit.prevent="handleSubmit">
            <v-card rounded="lg">
                <v-toolbar density="compact" color="#6984ff" hide-details>
                    <v-toolbar-title>Address Form</v-toolbar-title>
                    <v-btn color="white" @click="closeDialog">
                        <v-icon>mdi-close</v-icon>
                    </v-btn>
                </v-toolbar>
                <v-card-text>
                    <v-container>
                        <v-row>
                            <v-col cols="6" class="pa-1">
                                <v-list-subheader class="form-header">Building No. / Street <span style="color: red;" class="mdi mdi-check"></span></v-list-subheader>
                                <v-text-field
                                    v-model="address_data.bldgstreet"
                                    variant="solo"
                                    density="compact"
                                    hide-details
                                ></v-text-field>
                            </v-col>
                            <v-col cols="6" class="pa-1">
                                <v-list-subheader class="form-header">Region <span style="color: red;" class="mdi mdi-check"></span></v-list-subheader>
                                <v-autocomplete
                                    v-model="address_data.region_id"
                                    item-title="region_name"
                                    item-value="region_code"
                                    :items="region_data"
                                    @update:model-value="updateRegion"
                                    hide-details
                                    clearable
                                    density="compact" 
                                    variant="solo"
                                ></v-autocomplete>
                            </v-col>
                            <v-col cols="6" class="pa-1">
                                <v-list-subheader class="form-header">Province / State <span style="color: red;" class="mdi mdi-check"></span></v-list-subheader>
                                <v-autocomplete
                                    v-model="address_data.province_id"
                                    item-title="province_name"
                                    item-value="province_code"
                                    :items="province_data"
                                    @update:model-value="updateProvince"
                                    hide-details
                                    clearable
                                    density="compact"
                                    variant="solo"
                                ></v-autocomplete>
                            </v-col>
                            <v-col cols="6" class="pa-1">
                                <v-list-subheader class="form-header">Town / Municipality <span style="color: red;" class="mdi mdi-check"></span></v-list-subheader>
                                <v-autocomplete
                                    v-model="address_data.municipality_id"
                                    item-title="municipality_name"
                                    item-value="municipality_code"
                                    :items="municipality_data"
                                    @update:model-value="updateMunicipality"
                                    hide-details
                                    clearable
                                    density="compact"
                                    variant="solo"
                                ></v-autocomplete>
                            </v-col>
                            <v-col cols="6" class="pa-1">
                                <v-list-subheader class="form-header">Barangay <span style="color: red;" class="mdi mdi-check"></span></v-list-subheader>
                                <v-autocomplete
                                    v-model="address_data.barangay_id"
                                    item-title="barangay_name"
                                    item-value="id"
                                    :items="barangay_data"
                                    @update:model-value="updateBarangay"
                                    hide-details
                                    clearable
                                    density="compact"
                                    variant="solo"
                                ></v-autocomplete>
                            </v-col>
                            <v-col cols="6" class="pa-1">
                                <v-list-subheader class="form-header">Country </v-list-subheader>
                                <v-autocomplete
                                    v-model="address_data.country_id"
                                    item-title="country_name"
                                    item-value="id"
                                    :items="country_data"
                                    @update:model-value="updateCountry"
                                    hide-details
                                    clearable
                                    density="compact"
                                    variant="solo"
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
const getRegion = async () => {
    const response = await useMethod("get", "get-regions", "", "");
    if (response) {
        region_data.value = response;
    }
};
const updateRegion = (value) => {
    const selected = region_data.value.find(item => item.region_code === value);
    address_data.value.region_id = value;
    address_data.value.region_name = selected ? selected.region_name : '';
    getProvince();
}

const province_data = ref([]);
const getProvince = async () => {
    const response = await useMethod("get" , "get-province?region_code=" + address_data.value.region_id, "" , "" );
    if (response) {
        province_data.value = response.data;
    }
}
const updateProvince = (value) => {
    const selected = province_data.value.find(item => item.province_code === value);
    address_data.value.province_id = value;
    address_data.value.province_name = selected ? selected.province_name : '';
    getMunicipality();
}

const municipality_data = ref([]);
const getMunicipality = async () => {
    const params = "?region_code=" + address_data.value.region_id + "&province_code=" + address_data.value.province_id;
    const response = await useMethod("get", "get-municipality" + params, "", "");
    if (response) {
        municipality_data.value = response.data;
    }
}
const updateMunicipality = (value) => {
    const selected = municipality_data.value.find(item => item.municipality_code === value);
    address_data.value.municipality_id = value;
    address_data.value.municipality_name = selected ? selected.municipality_name : '';
    getBarangay();
}

const barangay_data = ref([]);
const getBarangay = async () => {
    const params = "?region_code=" + address_data.value.region_id + "&province_code=" + address_data.value.province_id + "&municipality_code=" + address_data.value.municipality_id;
    const response = await useMethod("get", "get-barangays" + params, "", "");
    if (response) {
        barangay_data.value = response.data;
    }
}
const updateBarangay = (value) => {
    const selected = barangay_data.value.find(item => item.id === value);
    address_data.value.barangay_id = value;
    address_data.value.barangay_name = selected ? selected.barangay_name : '';
}

const country_data = ref([]);
const getCountry = async () => {
    const response = await useMethod("get", "get-country-list", "", "");
    if (response) {
        country_data.value = response;
    }
}
const updateCountry = (value) => {
    const selected = country_data.value.find(item => item.id === value);
    address_data.value.country_id = value;
    address_data.value.country_name = selected ? selected.country_name : '';
}

onMounted(() => {
    getRegion();
    getCountry();
})
</script>

<style scoped>
.form-header {
    color: #000;
    margin: -12px 0px -12px 0px;
    font-weight: 500;
}
</style>
