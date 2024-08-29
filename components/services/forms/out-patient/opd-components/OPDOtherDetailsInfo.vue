<template>
    <p style="font-weight: bold; font-style: italic; font-size: large;">Additional Patient Information</p>
    <v-divider color="#000" style="margin-bottom: 15px;"></v-divider>
    <v-row style="margin-bottom: 25px;">
        <v-col cols="4">
            <v-row>
                <v-col cols="12" class="form-group">
                    <label class="form-label">Birth Place</label>
                    <input
                        type="text"
                        v-model="payload.birthplace"
                        class="form-input"
                    />
                </v-col>
            </v-row>
            <v-row>
                <v-col cols="12" class="form-group">
                    <label class="form-label">Religion</label>
                    <div class="select-wrapper">
                        <select class="form-select" v-model="payload.religion_id">
                            <option v-for="(item, index) in religion_data" :key="index" :value="item.id">
                                {{ item.religion_name }}
                            </option>
                        </select>
                        <span class="arrow-icon mdi mdi-chevron-down"></span>
                    </div>
                </v-col>
            </v-row>
            <v-row>
                <v-col cols="12" class="form-group">
                    <label class="form-label">Nationality</label>
                    <div class="select-wrapper">
                        <select class="form-select" v-model="payload.nationality_id">
                            <option v-for="(item, index) in nationality_data" :key="index" :value="item.id">
                                {{ item.nationality }}
                            </option>
                        </select>
                        <span class="arrow-icon mdi mdi-chevron-down"></span>
                    </div>
                </v-col>
            </v-row>
        </v-col>
        <v-col cols="4">
            <v-row>
                <v-col cols="12" class="form-group">
                    <label class="form-label">Temperature</label>
                    <input
                        type="text"
                        v-model="payload.temperature"
                        class="form-input"
                    />
                </v-col>
            </v-row>
            <v-row>
                <v-col cols="12" class="form-group">
                    <label class="form-label">BP Sys</label>
                    <input
                        type="text"
                        v-model="payload.bloodPressureSystolic"
                        class="form-input"
                    />
                </v-col>
            </v-row>
            <v-row>
                <v-col cols="12" class="form-group">
                    <label class="form-label">BP Dias</label>
                    <input
                        type="text"
                        v-model="payload.bloodPressureDiastolic"
                        class="form-input"
                    />
                </v-col>
            </v-row>
        </v-col>
        <v-col cols="4">
            <v-row>
                <v-col cols="12" class="form-group">
                    <label class="form-label">Weight (kg)</label>
                    <input
                        type="text"
                        v-model="payload.weight"
                        @change="calculateBmi"
                        class="form-input"
                    />
                </v-col>
            </v-row>
            <v-row>
                <v-col cols="12" class="form-group">
                    <label class="form-label">Height (cm)</label>
                    <input
                        type="text"
                        v-model="payload.height"
                        @change="calculateBmi"
                        class="form-input"
                    />
                </v-col>
            </v-row>
            <v-row>
                <v-col cols="12" class="form-group">
                    <label class="form-label">BMI</label>
                    <input
                        type="text"
                        v-model="payload.bmi"
                        placeholder="Auto Generate"
                        class="form-input"
                        readonly
                    />
                </v-col>
            </v-row>
        </v-col>
    </v-row>
    <p style="margin-top: 25px; font-weight: bold; font-style: italic; font-size: large;">Parent's / Spouse Information</p>
    <v-divider color="#000" style="margin-bottom: 15px;"></v-divider>
    <v-row>
        <v-col cols="4">
            <v-row>
                <v-col cols="12" class="form-group">
                    <label class="form-label">Father Lastname</label>
                    <input
                        type="text"
                        v-model="payload.fatherLastname"
                        class="form-input"
                    />
                </v-col>
            </v-row>
            <v-row>
                <v-col cols="12" class="form-group">
                    <label class="form-label">Father Firstname</label>
                    <input
                        type="text"
                        v-model="payload.fatherFirstname"
                        class="form-input"
                    />
                </v-col>
            </v-row>
            <v-row>
                <v-col cols="12" class="form-group">
                    <label class="form-label">Father Middlename</label>
                    <input
                        type="text"
                        v-model="payload.fatherMiddlename"
                        class="form-input"
                    />
                </v-col>
            </v-row>
            <v-row>
                <v-col cols="12" class="form-group">
                    <label class="form-label">Father Birthdate</label>
                    <input
                        type="date"
                        v-model="payload.fatherBirthdate"
                        class="form-input"
                        @change="updateFatherBirthDate"
                    />
                </v-col>
            </v-row>
            <v-row>
                <v-col cols="12" class="form-group">
                    <label class="form-label">Father Age</label>
                    <input
                        type="number"
                        v-model="payload.fatherAge"
                        class="form-input"
                        placeholder="Auto Compute"
                        readonly
                    />
                </v-col>
            </v-row>
        </v-col>
        <v-col cols="4">
            <v-row>
                <v-col cols="12" class="form-group">
                    <label class="form-label">Mother Lastname</label>
                    <input
                        type="text"
                        v-model="payload.motherLastname"
                        class="form-input"
                    />
                </v-col>
            </v-row>
            <v-row>
                <v-col cols="12" class="form-group">
                    <label class="form-label">Mother Firstname</label>
                    <input
                        type="text"
                        v-model="payload.motherFirstname"
                        class="form-input"
                    />
                </v-col>
            </v-row>
            <v-row>
                <v-col cols="12" class="form-group">
                    <label class="form-label">Mother Middlename</label>
                    <input
                        type="text"
                        v-model="payload.motherMiddlename"
                        class="form-input"
                    />
                </v-col>
            </v-row>
            <v-row>
                <v-col cols="12" class="form-group">
                    <label class="form-label">Mother Birthdate</label>
                    <input
                        type="date"
                        v-model="payload.motherBirthdate"
                        class="form-input"
                        @change="updateMotherBirthDate"
                    />
                </v-col>
            </v-row>
            <v-row>
                <v-col cols="12" class="form-group">
                    <label class="form-label">Mother Age</label>
                    <input
                        type="number"
                        v-model="payload.motherAge"
                        class="form-input"
                        placeholder="Auto Compute"
                        readonly
                    />
                </v-col>
            </v-row>
        </v-col>
        <v-col cols="4">
            <v-row>
                <v-col cols="12" class="form-group">
                    <label class="form-label">Spouse Lastname</label>
                    <input
                        type="text"
                        class="form-input"
                    />
                </v-col>
            </v-row>
            <v-row>
                <v-col cols="12" class="form-group">
                    <label class="form-label">Spouse Firstname</label>
                    <input
                        type="text"
                        class="form-input"
                    />
                </v-col>
            </v-row>
            <v-row>
                <v-col cols="12" class="form-group">
                    <label class="form-label">Spouse Middlename</label>
                    <input
                        type="text"
                        class="form-input"
                    />
                </v-col>
            </v-row>
            <v-row>
                <v-col cols="12" class="form-group">
                    <label class="form-label">Spouse Birthdate</label>
                    <input
                        type="date"
                        class="form-input"
                    />
                </v-col>
            </v-row>
            <v-row>
                <v-col cols="12" class="form-group">
                    <label class="form-label">Spouse Age</label>
                    <input
                        type="number"
                        class="form-input"
                        placeholder="Auto Compute"
                        readonly
                    />
                </v-col>
            </v-row>
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

const updateFatherBirthDate = ()=>{
    props.payload.fatherAge = 0;
    if(props.payload.fatherBirthdate){
        props.payload.fatherAge = useCalculateAge(useDateMMDDYYY(props.payload.fatherBirthdate));
    }
}

const updateMotherBirthDate = ()=>{
    props.payload.motherAge = 0;
    if(props.payload.motherBirthdate){
        props.payload.motherAge = useCalculateAge(useDateMMDDYYY(props.payload.motherBirthdate));
    }
}

const calculateBmi = () => {
    if (props.payload.weight && props.payload.height) {
        const weight = parseFloat(props.payload.weight);
        const height = parseFloat(props.payload.height);
        const bmi = weight / (height * height);
        props.payload.bmi = bmi.toFixed(2);
    } else {
        props.payload.bmi = "";
    }
}

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
.form-group {
    display: flex;
    align-items: center;
}
.form-label {
    flex: 0 0 40%;
    text-align: left;
    margin-right: 8px;
}
.form-input,
.form-select {
    flex: 1;
    width: 100%;
    padding: 4px;
    border: 1px solid #000;
    border-radius: 4px;
    background-color: #fff;
    box-sizing: border-box;
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
}
.select-wrapper {
    position: relative;
    display: inline-block;
    width: 100%;
}
.arrow-icon {
    position: absolute;
    top: 50%;
    right: 10px;
    transform: translateY(-50%);
    font-size: 16px;
    color: #000;
    pointer-events: none; 
}
input[readonly] {
    background-color: #f5f5f5;
}
</style>