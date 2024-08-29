<template>
    <v-row>
        <v-col cols="4">
            <v-row>
                <v-col cols="12" class="form-group">
                    <label class="form-label">Patient ID</label>
                    <input
                        v-model="payload.patient_id"
                        placeholder="Auto Generated"
                        readonly
                        class="form-input"
                    />
                </v-col>
            </v-row>
            <v-row>
                <v-col cols="12" class="form-group">
                    <label class="form-label">Case No.</label>
                    <input
                        v-model="payload.register_id_no"
                        placeholder="Auto Generated"
                        readonly
                        class="form-input"
                    />
                </v-col>
            </v-row>
            <v-row>
                <v-col cols="12" class="form-group">
                    <label class="form-label">Lastname <span style="color: red;">*</span></label> 
                    <input
                        :type="payload.isConfidentialPatient ? 'password' : 'text'"
                        v-model="payload.lastname"
                        class="form-input"
                        :class="{ 'input-error': formErrors.lastname }"
                    />
                </v-col>
            </v-row>
            <v-row>
                <v-col cols="12" class="form-group">
                    <label class="form-label">Firstname <span style="color: red;">*</span></label>
                    <input
                        :type="payload.isConfidentialPatient ? 'password' : 'text'"
                        v-model="payload.firstname"
                        class="form-input"
                        :class="{ 'input-error': formErrors.firstname }"
                    />
                </v-col>
            </v-row>
            <v-row>
                <v-col cols="12" class="form-group">
                    <label class="form-label">Middlename</label>
                    <input
                        :type="payload.isConfidentialPatient ? 'password' : 'text'"
                        v-model="payload.middlename"
                        class="form-input"
                    />
                </v-col>
            </v-row>
            <v-row>
                <v-col cols="12" class="form-group">
                    <label class="form-label">Alias</label>
                    <input
                        type="text"
                        v-model="payload.alias"
                        class="form-input"
                        :readonly="!payload.isConfidentialPatient"
                    />
                </v-col>
            </v-row>
        </v-col>
        <v-col cols="8">
            <v-row>
                <v-col cols="6">
                    <v-row>
                        <v-col cols="12" class="form-group">
                            <label class="form-label">Suffix</label>
                            <div class="select-wrapper">
                                <select class="form-select" v-model="payload.suffix_id">
                                    <option v-for="(suffix, index) in suffix_data" :key="index" :value="suffix.id">
                                        {{ suffix.abbreviations }}
                                    </option>
                                </select>
                                <span class="arrow-icon mdi mdi-chevron-down"></span>
                            </div>
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col cols="12" class="form-group">
                            <label class="form-label">Sex <span style="color: red;">*</span></label>
                            <div class="select-wrapper">
                                <select class="form-select" :class="{ 'input-error': formErrors.sex_id }" v-model="payload.sex_id">
                                    <option v-for="(sex, index) in sex_data" :key="index" :value="sex.id">
                                        {{ sex.sex_description }}
                                    </option>
                                </select>
                                <span class="arrow-icon mdi mdi-chevron-down"></span>
                            </div>
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col cols="12" class="form-group">
                            <label class="form-label">Landline #</label>
                            <input
                                type="number"
                                v-model="payload.telephone_number"
                                class="form-input"
                            />
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col cols="12" class="form-group">
                            <label class="form-label">Phone #</label>
                            <input
                                type="number"
                                v-model="payload.mobile_number"
                                class="form-input"
                            />
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col cols="12" class="form-group">
                            <label class="form-label">Email</label>
                            <input
                                type="email"
                                v-model="payload.email_address"
                                class="form-input"
                            />
                        </v-col>
                    </v-row>
                </v-col>
                <v-col cols="6">
                    <v-row>
                        <v-col cols="12" class="form-group">
                            <label class="form-label">Civil Status <span style="color: red;">*</span></label>
                            <div class="select-wrapper">
                                <select class="form-select" :class="{ 'input-error': formErrors.civilstatus_id }" v-model="payload.civilstatus_id">
                                    <option v-for="(civil_status, index) in civil_status_data" :key="index" :value="civil_status.id">
                                        {{ civil_status.civil_status_description }}
                                    </option>
                                </select>
                                <span class="arrow-icon mdi mdi-chevron-down"></span>
                            </div>
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col cols="12" class="form-group">
                            <label class="form-label">Birthdate <span style="color: red;">*</span></label>
                            <input
                                type="date"
                                v-model="payload.birthdate"
                                class="form-input"
                                @change="updatebirthdate"
                                :class="{ 'input-error': formErrors.birthdate }"
                            />
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col cols="12" class="form-group">
                            <label class="form-label">Birth Time</label>
                            <input
                                type="time"
                                v-model="payload.birthtime"
                                class="form-input"
                            />
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col cols="12" class="form-group">
                            <label class="form-label">Age</label>
                            <input
                                type="number"
                                readonly
                                v-model="payload.age"
                                class="form-input"
                                placeholder="Auto Compute"
                            />
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col cols="12" class="form-group">
                            <input type="checkbox" id="isConfidentialPatient" name="isConfidentialPatient" v-model="payload.isConfidentialPatient" style="cursor: pointer;">
                            <label style="margin-left: 10px;">Confidential Record</label>
                        </v-col>
                    </v-row>
                </v-col>
            </v-row>
            <v-row>
                <v-col cols="12" class="form-group">
                    <label style="margin-right: 15px;">Full Address</label>
                    <span class="mdi mdi-plus-box" style="cursor: pointer; margin-right: 10px;" @click="handleOpenAddressForm"></span>
                    <textarea
                        :value="fullAddress"
                        class="form-input"
                        readonly
                    />
                </v-col>
            </v-row>
        </v-col>
    </v-row>
    <o-p-d-address-details-form :address_form_dialog="address_form_dialog" :payload="payload" @close-dialog="closeAddressForm" @handle-submit="handleSubmitAddress" />
</template>

<script setup>
const props = defineProps({
    payload: {
        type: Object,
        required: true,
        default: () => ({})
    },
    clicked_option: {
        type: String,
        default: () => ''
    },
    formErrors: {
        type: Object,
        default: () => ({})
    },
})

const address_form_dialog = ref(false);
const sex_data = ref([]);
const sex_loading = ref(false);
const getSex = async () => {
    sex_loading.value = true;
    const response = await useMethod("get", "get-sex", "", "");
    if (response) {
        sex_data.value = response;
        sex_loading.value = false;
    } 
};
const civil_status_data = ref([]);
const civil_status_loading = ref(false);
const getCivilStatus = async () => {
    civil_status_loading.value = true;
    const response = await useMethod("get", "get-civil-status", "", "");
    if (response) {
        civil_status_data.value = response;
        civil_status_loading.value = false;
    } 
};
const suffix_data = ref([]);
const suffix_loading = ref(false);
const getSuffix = async () => {
    suffix_loading.value = true;
    const response = await useMethod("get", "get-suffix", "", "");
    if (response) {
        suffix_data.value = response;
        suffix_loading.value = false;
    }
}
const updatebirthdate = ()=>{
    props.payload.age = 0;
    if(props.payload.birthdate){
        props.payload.age = useCalculateAge(useDateMMDDYYY(props.payload.birthdate));
    }
}

const handleOpenAddressForm = () => {
    if (props.clicked_option === 'view') return;
    address_form_dialog.value = true;
};

const fullAddress = ref("");
const handleSubmitAddress = (address) => {
    console.log(address);
    const { bldgstreet, region_name, province_name, municipality_name, barangay_name, country_name } = address;
    const { region_id, province_id, municipality_id, barangay_id, country_id } = address;

    fullAddress.value = [bldgstreet, barangay_name, municipality_name, province_name, region_name, country_name]
        .filter(Boolean)
        .join(', ');
    props.payload.address = {
        bldgstreet,
        region_id,
        province_id,
        municipality_id,
        barangay_id,
        country_id
    };
};

const closeAddressForm = () => {
    address_form_dialog.value = false;
};

onMounted(() => {
    getSex();
    getCivilStatus();
    getSuffix();
});
</script>

<style scoped>
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
.input-error {
    border-color: red;
}
.error-message {
    color: red;
    font-size: 0.8em;
    margin-top: 4px; 
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
textarea[readonly] {
    background-color: #f5f5f5;
}
</style>