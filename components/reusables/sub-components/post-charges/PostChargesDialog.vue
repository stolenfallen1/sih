<template>
    <v-dialog :model-value="show" rounded="lg" scrollable @update:model-value="closeDialog" max-width="1120px">
        <v-card rounded="lg">
            <v-toolbar density="compact" color="#6984ff" hide-details>
                <v-toolbar-title>Post Charges to Patient's Account {{ selectedRowDetails.id }}</v-toolbar-title>
                <v-btn color="white" @click="closeDialog">
                    <v-icon>mdi-close</v-icon>
                </v-btn>
            </v-toolbar>
            <v-divider></v-divider>
            <v-card-text>
                <v-card elevation="4" class="mb-4">
                    <v-card-text>
                        <p style="font-style: italic; font-weight: bold; font-size: 16px;">Patient Info</p>
                        <v-row class="mt-1">
                            <v-col cols="6">
                                <v-row>
                                    <v-col cols="12">
                                        <v-text-field 
                                            label="Patient Name"
                                            v-model="payload.patient_name"
                                            variant="solo"
                                            density="compact"
                                            hide-details
                                            readonly
                                        ></v-text-field>
                                    </v-col>
                                    <v-col cols="12" class="form-col">
                                        <v-text-field 
                                            label="ID No."
                                            v-model="payload.patient_id"
                                            variant="solo"
                                            density="compact"
                                            hide-details
                                            readonly
                                        ></v-text-field>
                                    </v-col>
                                </v-row>
                                <v-row class="form-col">
                                    <v-col cols="6">
                                        <v-text-field 
                                            label="Civil Status"
                                            v-model="payload.civil_status"
                                            variant="solo"
                                            density="compact"
                                            hide-details
                                            readonly
                                        ></v-text-field>
                                    </v-col>
                                    <v-col cols="6">
                                        <v-text-field 
                                            label="Gender"
                                            v-model="payload.sex"
                                            variant="solo"
                                            density="compact"
                                            hide-details
                                            readonly
                                        ></v-text-field>
                                    </v-col>
                                </v-row>
                                <v-row class="form-col">
                                    <v-col cols="6">
                                        <v-text-field 
                                            label="Birthdate"
                                            v-model="payload.birthdate"
                                            type="date"
                                            variant="solo"
                                            density="compact"
                                            hide-details
                                            readonly
                                        ></v-text-field>
                                    </v-col>
                                    <v-col cols="6">
                                        <v-text-field 
                                            label="Age"
                                            v-model="payload.age"
                                            type="number"
                                            variant="solo"
                                            density="compact"
                                            hide-details
                                            readonly
                                        ></v-text-field>
                                    </v-col>
                                </v-row>
                            </v-col>
                            <v-col cols="6">
                                <v-row>
                                    <v-col cols="6">
                                        <v-text-field 
                                            label="Case No."
                                            v-model="payload.case_no"
                                            variant="solo"
                                            density="compact"
                                            hide-details
                                            readonly
                                        ></v-text-field>
                                    </v-col>
                                    <v-col cols="6">
                                        <v-text-field 
                                            label="Account"
                                            v-model="payload.account"
                                            variant="solo"
                                            density="compact"
                                            hide-details
                                            readonly
                                        ></v-text-field>
                                    </v-col>
                                    <v-col cols="12" class="form-col">
                                        <v-text-field 
                                            label="Registry Case Date"
                                            v-model="payload.registry_date"
                                            type="date"
                                            variant="solo"
                                            density="compact"
                                            hide-details
                                            readonly
                                        ></v-text-field>
                                    </v-col>
                                    <v-col cols="3" class="form-col">
                                        <v-text-field
                                            label="ID"
                                            v-model="payload.attending_doctor"
                                            variant="solo"
                                            density="compact"
                                            hide-details
                                            readonly
                                        ></v-text-field>
                                    </v-col>
                                    <v-col cols="9" class="form-col">
                                        <v-text-field
                                            label="Physician Name"
                                            v-model="payload.attending_doctor_fullname"
                                            variant="solo"
                                            density="compact"
                                            hide-details
                                            readonly
                                        ></v-text-field>
                                    </v-col>
                                    <v-col cols="3" class="form-col">
                                        <v-text-field
                                            label="ID"
                                            v-model="payload.guarantor_id"
                                            variant="solo"
                                            density="compact"
                                            hide-details
                                            readonly
                                        ></v-text-field>
                                    </v-col>
                                    <v-col cols="9" class="form-col">
                                        <v-text-field
                                            label="Guarantor Name"
                                            v-model="payload.guarantor_name"
                                            variant="solo"
                                            density="compact"
                                            hide-details
                                            readonly
                                        ></v-text-field>
                                    </v-col>
                                </v-row>
                            </v-col>
                        </v-row>
                    </v-card-text>
                </v-card>
                <v-expansion-panels
                    v-model="panel"
                    variant="accordion"
                    multiple
                    >
                    <v-expansion-panel>
                        <v-expansion-panel-title>
                            Post Charge Transactions
                            <v-spacer></v-spacer>
                            <v-btn class="mr-4" density="compact">
                                <v-icon>mdi-help-circle-outline</v-icon>
                                &nbsp; View Help Code
                                <v-menu activator="parent">
                                    <v-list>
                                    <v-list-item
                                        v-for="(item, index) in revenue_code"
                                        :key="index"
                                        :value="index"
                                    >
                                        <v-list-item-title>{{ item.code }} - {{ item.description }}</v-list-item-title>
                                    </v-list-item>
                                    </v-list>
                                </v-menu>
                            </v-btn>
                        </v-expansion-panel-title>
                        <v-expansion-panel-text>
                            <v-table density="compact" height="40vh">
                                <thead>
                                    <tr>
                                        <th>Dept Code</th>
                                        <th>Item Code</th>
                                        <th>Description</th>
                                        <th>Type</th> 
                                        <th>Specimen</th> <!-- Autofill -->
                                        <th>Qty</th>
                                        <th>Price</th>
                                        <th>Reader</th>
                                        <th>Reader Name</th>
                                        <th>Reader Fee</th>
                                        <th width="4"></th> 
                                        <th>Date</th> <!-- Autofill -->
                                        <th>Time</th> <!-- Autofill -->
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td class="td" width="100%"> <input class="input" v-model="keyword" @keyup.enter="handleRevenueCode" /> </td>
                                        <td class="td" width="100%"> <input class="input" @keyup.enter="handleChargingCode" </td>
                                        <td class="td" width="100%"> <input class="input" /> </td>
                                        <td class="td" width="100%"> <input class="input" /> </td>
                                        <td class="td" width="100%"> <input class="input" /> </td>
                                        <td class="td" width="100%"> <input class="input" /> </td>
                                        <td class="td" width="100%"> <input class="input" /> </td>
                                        <td class="td" width="100%"> <input class="input" /> </td>
                                        <td class="td" width="100%"> <input class="input" /> </td>
                                        <td class="td" width="100%"> <input class="input" /> </td>
                                        <td class="td" width="100%"> <input class="input" /> </td>
                                        <td class="td" width="100%"> <input class="input" /> </td>
                                        <td class="td" width="100%"> <input class="input" /> </td>
                                        <td class="cursor-pointer"><v-icon color="blue">mdi-plus-box</v-icon></td>
                                        <td class="cursor-pointer"><v-icon color="red">mdi-delete</v-icon></td>
                                    </tr>
                                </tbody>
                            </v-table>
                        </v-expansion-panel-text>
                    </v-expansion-panel>

                    <v-expansion-panel>
                        <v-expansion-panel-title>Professional Fee</v-expansion-panel-title>
                        <v-expansion-panel-text>
                            <v-row>
                                <v-col cols="12">
                                    <h1>TO ADD</h1>
                                </v-col>
                            </v-row>
                        </v-expansion-panel-text>
                    </v-expansion-panel>

                    <v-expansion-panel>
                        <v-expansion-panel-title>Requisition Notes .Remarks</v-expansion-panel-title>
                        <v-expansion-panel-text>
                            <v-row>
                                <v-col cols="12">
                                    <v-textarea
                                        label="Requisition Remarks"
                                        v-model="payload.requisition_remarks"
                                        placeholder="Enter requisition remarks here"
                                        variant="solo"
                                        density="compact"
                                        hide-details
                                    ></v-textarea>
                                </v-col>
                            </v-row>
                        </v-expansion-panel-text>
                    </v-expansion-panel>

                    <v-expansion-panel>
                        <v-expansion-panel-title>Rendering Notes .Remarks</v-expansion-panel-title>
                        <v-expansion-panel-text>
                            <v-row>
                                <v-col cols="12">
                                    <v-textarea
                                        label="Rendering Remarks"
                                        v-model="payload.rendering_remarks"
                                        placeholder="Enter rendering remarks here"
                                        variant="solo"
                                        density="compact"
                                        hide-details
                                    ></v-textarea>
                                </v-col>
                            </v-row>
                        </v-expansion-panel-text>
                    </v-expansion-panel>

                    <v-expansion-panel>
                        <v-expansion-panel-title>Post Charge History</v-expansion-panel-title>
                        <v-expansion-panel-text>
                            <v-row>
                                <v-col cols="12">
                                    <h1>TO ADD</h1>
                                </v-col>
                            </v-row>
                        </v-expansion-panel-text>
                    </v-expansion-panel>
                </v-expansion-panels>
            </v-card-text>
            <v-divider></v-divider>
            <v-card-actions>
                <v-btn color="blue-darken-1 border border-info" @click="closeDialog"> Close </v-btn>
                <v-spacer></v-spacer>
                <v-btn class="bg-primary text-white">Save</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
    <doctors-list :open_doctors_list="open_doctors_list" @close-dialog="closeDoctorsList" />
    <charges-list 
        :open_charges_list="open_charges_list" 
        :patienttype="patienttype" 
        :user_input_revenue_code="user_input_revenue_code" 
        @handle-select="handleSelectedChargeItem" 
        @close-dialog="closeChargesList" 
    />
</template>

<script setup>
import DoctorsList from './sub-forms/DoctorsList.vue';
import ChargesList from './sub-forms/ChargesList.vue';
const props = defineProps({
    show: {
        type: Boolean,
        default: () => false,
        required: true,
    },
});


let panel = ref([0]);
const { selectedRowDetails } = storeToRefs(useSubcomponentSelectedRowDetailsStore()); 
const emits = defineEmits(['close-dialog']) 

const closeDialog = () => {
    emits('close-dialog');
    panel.value = [0];
    keyword.value = '';
}

const keyword = ref('');
const patienttype = ref(null);
const test_value = ref({});
const revenue_code = ref([
    { code: 'LX', description: 'Linen Department' },
    { code: 'MD', description: 'Prof Fee' },
    { code: 'LB', description: 'Laboratory' },
    { code: 'HD', description: 'Hemodialysis' },
]);
const user_input_revenue_code = ref('');
const open_doctors_list = ref(false);
const open_charges_list = ref(false);

const handleRevenueCode = (e) => {
    if (e.target.value === '') {
        return useSnackbar(true, "error", "Dept Code Should not be empty.");
    }
    const user_inputs = e.target.value.toUpperCase();
    e.target.value = user_inputs;
    if (user_inputs !== 'LX' && user_inputs !== 'MD' && user_inputs !== 'LB' && user_inputs !== 'HD') {
        return useSnackbar(true, "error", "Invalid Dept Code, refer to help code.");
    }
    e.preventDefault();
    const inputs = document.querySelectorAll('.input');
    const index = Array.from(inputs).indexOf(e.target);
    if (index === inputs.length - 1) {
        inputs[0].focus();
    } else {
        inputs[index + 1].focus();
    }
};
const handleChargingCode = async () => {
    const revenue_res = await useMethod("get", "revenue-code?keyword=", "", keyword.value);
    if (revenue_res) {
        user_input_revenue_code.value = revenue_res.data[0].transaction_code; 
    } 

    if (user_input_revenue_code.value === 'MD') {
        open_doctors_list.value = true;
    } else {
        open_charges_list.value = true;
    }
};
const handleSelectedChargeItem = (selected_item) => {
    test_value.value = selected_item;
    console.log(test_value.value);
}
const closeDoctorsList = () => {
    open_doctors_list.value = false;
};
const closeChargesList = () => {
    open_charges_list.value = false;
};

const payload = ref({
    patient_name: "",
    patient_id: null,
    civil_status: "",
    sex: "",
    birthdate: null,
    age: null,
    case_no: null,
    account: null,
    registry_date: null,
    attending_doctor: null,
    attending_doctor_fullname: "",
    guarantor_id: null,
    guarantor_name: "",
});
onUpdated(() => {
    // Forda display
    payload.value.patient_name = selectedRowDetails.value.lastname + ', ' + selectedRowDetails.value.firstname + ' ' + selectedRowDetails.value.middlename || '';
    payload.value.patient_id = selectedRowDetails.value.patient_id || '';
    payload.value.civil_status = selectedRowDetails.value.civil_status && selectedRowDetails.value.civil_status.civil_status_description || '';
    payload.value.sex = selectedRowDetails.value.sex && selectedRowDetails.value.sex.sex_description || '';
    payload.value.birthdate = useDateMMDDYYY(selectedRowDetails.value.birthdate) || '';
    payload.value.age = selectedRowDetails.value.age || '';
    payload.value.case_no = selectedRowDetails.value.patient_registry && selectedRowDetails.value.patient_registry.register_id_no || '';
    payload.value.account = selectedRowDetails.value.patient_registry && selectedRowDetails.value.patient_registry.guarantor_id ? "Company / Insurance" : "Self-Pay";
    payload.value.registry_date = selectedRowDetails.value.patient_registry && useDateMMDDYYY(selectedRowDetails.value.patient_registry.registry_date) || '';
    payload.value.attending_doctor = selectedRowDetails.value.patient_registry && selectedRowDetails.value.patient_registry.attending_doctor || 'N/A';
    payload.value.attending_doctor_fullname = selectedRowDetails.value.patient_registry && selectedRowDetails.value.patient_registry.attending_doctor_fullname || 'N/A';
    payload.value.guarantor_id = selectedRowDetails.value.patient_registry && selectedRowDetails.value.patient_registry.guarantor_id || 'N/A';
    payload.value.guarantor_name = selectedRowDetails.value.patient_registry && selectedRowDetails.value.patient_registry.guarantor_name || 'N/A';
    // Forda payload for charging code
    patienttype.value = selectedRowDetails.value.patient_registry && parseInt(selectedRowDetails.value.patient_registry.mscPrice_Schemes) || null;
})
</script>

<style scoped>
.toolbar-title {
    font-size: 16px; 
    font-style: italic; 
    text-align: center;
}
.form-col {
    margin-top: -16px !important;
}
.td {
    margin: 0;
    padding: 1px;
}
.input {
    border-bottom: 1px solid #A9A9A9;
    padding: 0;
    margin: 0;
}
</style>