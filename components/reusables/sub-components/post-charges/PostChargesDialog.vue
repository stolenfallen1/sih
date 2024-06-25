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
                                        v-for="(item, index) in revenue_code_data"
                                        :key="index"
                                        :value="index"
                                    >
                                        <v-list-item-title>{{ item.transaction_code }} - {{ item.transaction_description }}</v-list-item-title>
                                    </v-list-item>
                                    </v-list>
                                </v-menu>
                            </v-btn>
                        </v-expansion-panel-title>
                        <v-expansion-panel-text>
                            <v-table density="compact" height="40vh" class="styled-table">
                                <thead>
                                    <tr>
                                        <th>Dept Code</th>
                                        <th>Item Code</th>
                                        <th>Description</th>
                                        <th>Type</th> 
                                        <th>Specimen</th> 
                                        <th>Qty</th>
                                        <th>Price</th>
                                        <th>Reader</th>
                                        <th>Reader Name</th>
                                        <th>Reader Fee</th>
                                        <th>Schedule Date</th> 
                                        <th>Time</th> 
                                    </tr>
                                </thead>
                                <tbody>
                                    <template v-for="(item,index) in Charges">
                                        <tr>
                                            <td> <input class="input test" v-model="item.transaction_code" @keyup.enter="handleAddNewRow(item,index)" :readonly="item.isReadonly" /> </td>
                                            <td> <input class="input test" v-model="item.map_item_id" @keyup.enter="handleAddNewRow(item,index)" readonly /> </td> 
                                            <td> <input class="input test" v-model="item.exam_description" @keyup.enter="handleAddNewRow(item,index)" readonly /> </td>
                                            <td>
                                                <select class="input test" v-model="item.charge_type">
                                                    <option value="1">Routine</option>
                                                    <option value="2">Stat</option>
                                                </select>
                                            </td>
                                            <td> <input class="input test" v-model="item.specimen" /> </td>
                                            <td> <input class="input test" v-model="item.quantity" readonly /> </td>
                                            <td> <input class="input test" v-model="item.price" readonly /> </td>
                                            <td> <input class="input test" v-model="item.reader" /> </td>
                                            <td> <input class="input test" v-model="item.reader_name" /> </td>
                                            <td> <input class="input test" v-model="item.reader_fee" type="number" /> </td>
                                            <td> <input class="input test" v-model="item.charge_date" type="date" /> </td>
                                            <td> <input class="input test" v-model="item.charge_time" type="time" /> </td>
                                            <td class="cursor-pointer" ><v-icon @click="handleAddNewRow(item,index)" color="primary">mdi-plus-box</v-icon></td>
                                            <td v-if="index !== 0" class="cursor-pointer"><v-icon @click="removeRow(item)" color="red">mdi-delete</v-icon></td> 
                                        </tr>
                                    </template>
                                </tbody>
                            </v-table>
                        </v-expansion-panel-text>
                    </v-expansion-panel>

                    <v-expansion-panel>
                        <v-expansion-panel-title>Professional Fee</v-expansion-panel-title>
                        <v-expansion-panel-text>
                            <v-table density="compact" height="40vh" class="styled-table">
                                <thead>
                                    <tr>
                                        <th>Dept Code</th>
                                        <th>PF Code</th>
                                        <th>PF Name</th>
                                        <th>Amount</th> 
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td> <input class="input" v-model="payload.pf_transaction_code" @keyup.enter="handleRevenueCode" /> </td>
                                        <td> <input class="input" v-model="payload.pf_code" @keyup.enter="handleDoctorCode" readonly /> </td>
                                        <td> <input class="input" v-model="payload.pf_name" readonly/> </td>
                                        <td> <input class="input" v-model="payload.pf_amount" type="number" /> </td>
                                        <td class="cursor-pointer"><v-icon color="blue">mdi-plus-box</v-icon></td>
                                        <td class="cursor-pointer"><v-icon color="red">mdi-delete</v-icon></td>
                                    </tr>
                                </tbody>
                            </v-table>
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
                <v-btn :loading="isLoadingBtn" :disabled="isLoadingBtn" class="bg-primary text-white" @click="onSubmit">Charge</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
    <doctors-list 
        :open_doctors_list="open_doctors_list" 
        @handle-select="handleSelectedDoctor"
        @close-dialog="closeDoctorsList" 
    />
    <charges-list 
        :open_charges_list="open_charges_list" 
        :patienttype="patienttype" 
        @handle-select="handleSelectedChargeItem"
        :user_input_revenue_code="user_input_revenue_code" 
        :chargecode="chargecode"
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

let panel = ref([0, 1, 2, 3]);
const { selectedRowDetails } = storeToRefs(useSubcomponentSelectedRowDetailsStore()); 
const emits = defineEmits(['close-dialog']) 

const patienttype = ref(null);
const user_input_revenue_code = ref('');
const open_doctors_list = ref(false);
const open_charges_list = ref(false);
const isLoadingBtn = ref(false);

const chargecode = ref([]);
const payload = ref({
    // Patient info payload
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

const Charges = ref([
    {
        // Charges: [],
        // Charge info payload
        transaction_code: "",
        map_item_id: "",
        exam_description: "",
        charge_type: 1,
        specimen: "",
        quantity: 1,
        price: 0,
        reader: "",
        reader_name: "",
        reader_fee: "",
        charge_date: null,
        charge_time: null,

        // Professional Fee payload
        pf_transaction_code: "",
        pf_code: "",
        pf_name: "",
        pf_amount: null,
    }
]);

const revenue_code_data = ref([]);
const getRevenueCode = async () => {
    const revenue_res = await useMethod("get", "get-transaction-codes", "", "");
    if (revenue_res) {
        const desiredCodes = ['LX', 'LB', 'HD'];
        revenue_code_data.value = revenue_res.filter(item => desiredCodes.includes(item.transaction_code));
    }
};

const handleAddNewRow = (item,index) => {
    item.transaction_code = item.transaction_code.toUpperCase();
    const lastRow = Charges.value[Charges.value.length - 1];
    if (!item.transaction_code) {
        return useSnackbar(true, "error", "Dept Code Should not be empty.");
    }
    const desiredCodes = ['LX', 'LB', 'HD'];
    if (desiredCodes.includes(item.transaction_code) === false) {
        return useSnackbar(true, "error", "Invalid Dept Code, refer to help code.");
    }

    user_input_revenue_code.value = item.transaction_code;
    if(item.transaction_code && !item.map_item_id && !item.exam_description){

        open_charges_list.value = true;
        let charges = Charges.value.filter(function (obj) {
            return obj.transaction_code !== '' && obj.map_item_id !== '' && obj.exam_description !== '';
        });
        let resultArray = charges.filter(item => item.transaction_code.toUpperCase() === lastRow.transaction_code.toUpperCase()).map(item => item.map_item_id);
        chargecode.value = resultArray;
    }
    if(item.transaction_code && item.map_item_id && item.exam_description){
        const isItemCodeAndRevenueAlreadyExists = Charges.value.slice(0, index).some(row => row.map_item_id === lastRow.map_item_id && row.transaction_code === lastRow.transaction_code);
            if(!isItemCodeAndRevenueAlreadyExists){
                Charges.value.push({
                    transaction_code: "",
                    map_item_id: "",
                    exam_description: "",
                    charge_type: 1,
                    specimen: "",
                    quantity: 1,
                    price: 0,
                    reader: "",
                    reader_name: "",
                    reader_fee: "",
                    charge_date: null,
                    charge_time: null,
                    pf_transaction_code: "",
                    pf_code: "",
                    pf_name: "",
                    pf_amount: null,
            });
            if (lastRow) {
                lastRow.isReadonly = true;
            }
        }
        nextTick(() => {
            focusTransactionCodeInput(index);
        })
    }
};

const clear = (index)=>{
    Charges.value = [];
    Charges.value.push({
            transaction_code: "",
            map_item_id: "",
            exam_description: "",
            charge_type: 1,
            specimen: "",
            quantity: 1,
            price: 0,
            reader: "",
            reader_name: "",
            reader_fee: "",
            charge_date: null,
            charge_time: null,
            pf_transaction_code: "",
            pf_code: "",
            pf_name: "",
            pf_amount: null,
    });
}

const removeRow = (selectedItem) => {
    Charges.value = Charges.value.filter(item => !(item.map_item_id === selectedItem.map_item_id && item.transaction_code === selectedItem.transaction_code));
}

const focusTransactionCodeInput = (index) => {
    const inputs = document.querySelectorAll('.input.test');
    const transactionCodeInput = inputs[(index + 1) * 12];
    if (transactionCodeInput) {
        transactionCodeInput.focus();
    }
};

const handleRevenueCode = (item) => {
    if (!item.transaction_code) {
        return useSnackbar(true, "error", "Dept Code Should not be empty.");
    }
    const desiredCodes = ['LX', 'LB', 'HD'];
    if (desiredCodes.includes(item.transaction_code) === false) {
        return useSnackbar(true, "error", "Invalid Dept Code, refer to help code.");
    }
};

const handleSelectedChargeItem = (selected_item) => {
    const lastRow = Charges.value[Charges.value.length - 1];
    lastRow.map_item_id = selected_item.map_item_id;
    lastRow.exam_description = selected_item.exam_description;
    lastRow.price = selected_item.prices ? usePeso(selected_item.prices[0].price) : '0';
    lastRow.totalamount = selected_item.price;
};

const closeChargesList = () => {
    open_charges_list.value = false;
};

const handleDoctorCode = async () => {
    const revenue_res = await useMethod("get", "revenue-code?keyword=", "", payload.value.pf_transaction_code);
    if (revenue_res) {
        user_input_revenue_code.value = revenue_res.data[0].transaction_code; 
    }
    if (user_input_revenue_code.value === 'MD') {
        open_doctors_list.value = true;
    }
}

const handleSelectedDoctor = (selected_item) => {
    payload.value.pf_code = selected_item[0]?.doctor_code;
    payload.value.pf_name = selected_item[0]?.doctor_name;
};

const closeDoctorsList = () => {
    open_doctors_list.value = false;
};

const onSubmit = async () => {
    isLoadingBtn.value = true;
    let charges = Charges.value.filter(function (obj) {
        return obj.transaction_code !== '';
    });
    payload.value.Charges = charges;
    try {
        if (payload.value.Charges.length > 0) {
            let response = await useMethod("post", "post-his-charge", payload.value);
            if (response) {
                useSnackbar(true, "success", "Charges posted successfully.");
                closeDialog();
            } else {
                return useSnackbar(true, "error", "Failed to post charges.");
            }
        } else {
            return useSnackbar(true, "error", "Please add charges.");
        }
    } catch (error) {
        return useSnackbar(true, "error", "Failed to post charges.");
    } finally {
        isLoadingBtn.value = false;
    }
};

const charges_history_data = ref([]);
const getChargesHistory = () => {
    const charges_history_res = useMethod("get", "get-his-charges", "", "");
    if (charges_history_res) {
        charges_history_data.value = charges_history_res;
    }
}

const closeDialog = () => {
    emits('close-dialog');
    panel.value = [0, 1, 2, 3];
    payload.value = [];
}

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
onMounted(() => {
    getRevenueCode();
    getChargesHistory();
});
</script>

<style scoped>
:deep(.v-expansion-panel-text__wrapper) {
    padding: 0 !important;
}
.styled-table th, .styled-table td {
    padding: 8px;
    border: 1px solid #ddd;
    margin: 0;
}
.input {
    border-bottom: 1px solid #A9A9A9;
    padding: 4px 8px;
}
.styled-table {
    overflow-y: auto;
    scrollbar-width: thin; 
    scrollbar-color: #6984FF #f5f5f5; 
}
.styled-table::-webkit-scrollbar {
    width: 16px;
}
.styled-table::-webkit-scrollbar-thumb {
    background-color: #6984FF; 
    border-radius: 10px; 
    border: 3px solid #f5f5f5; 
}
.styled-table::-webkit-scrollbar-track {
    background-color: #f5f5f5; 
    border-radius: 10px; 
}
</style>