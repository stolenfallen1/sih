<template>
    <v-row>
        <v-col cols="12">
            <div style="display: flex; justify-content: space-between; align-items: center;">
                <p style="font-size: 17px; font-weight: bolder; text-decoration: underline;">Item Details</p>
            </div>
            <v-table density="compact" height="25vh"  class="styled-table" hover>
                <thead>
                    <tr>
                        <th>Dept Code</th>
                        <th>Item Code</th>
                        <th>Description</th>
                        <th>Amount</th>
                    </tr>
                </thead>
                <tbody>
                    <template v-for="(item, index) in table_data" :key="index">
                        <tr>
                            <td> {{ item?.revenueID }} </td>
                            <td> {{ item?.itemID }} </td>
                            <td> {{ item?.items?.exam_description ? item?.items?.exam_description : item?.doctor_details?.doctor_name  }} </td>
                            <td> {{ item.amount }} </td>
                        </tr>
                    </template>
                </tbody>
            </v-table>
        </v-col>
    </v-row>
    <v-row class="mt-7">
        <v-col cols="4">
            <v-row>
                <v-col cols="6">
                    <v-list-subheader class="form-header" style="color: red; font-weight: bolder; cursor: pointer;">OR Number</v-list-subheader> 
                    <v-text-field
                        variant="solo"
                        density="compact"
                        v-model="payload.ORNumber"
                        @click="openCashierSettings"
                        readonly
                        required
                        hide-details
                    ></v-text-field>
                </v-col>
                <v-col cols="6" >
                    <v-list-subheader class="form-header">Admission No</v-list-subheader>
                    <v-text-field
                        v-model="payload.case_No"
                        variant="solo"
                        density="compact"
                        hide-details
                        @keyup.enter="getPatientByCaseNo"
                    ></v-text-field>
                </v-col>
                <v-col cols="12" >
                    <v-list-subheader class="form-header">Payment Code</v-list-subheader>
                    <v-autocomplete
                        variant="solo"
                        density="compact"
                        item-title="description"
                        item-value="id"
                        :items="payment_codes"
                        v-model="payload.payment_code"
                        clearable
                        hide-details
                    ></v-autocomplete>
                </v-col>
                <v-col cols="6" v-if="payload.payment_code !== 6">
                    <v-list-subheader class="form-header">Charge Slip</v-list-subheader>
                    <v-text-field
                        variant="solo"
                        density="compact"
                        v-model="payload.refNum"
                        @keyup.enter="handleKeyEnter"
                        hide-details
                    ></v-text-field>
                </v-col>
                <v-col cols="6" v-if="payload.payment_code === 6">
                    <v-list-subheader class="form-header">Company Code</v-list-subheader>
                    <v-text-field
                        variant="solo"
                        density="compact"
                        v-model="payload.company_code"
                        hide-details
                    ></v-text-field>
                </v-col>
                <v-col cols="6" >
                    <v-list-subheader class="form-header">Account No</v-list-subheader>
                    <v-text-field
                        variant="solo"
                        density="compact"
                        v-model="payload.accountnum"
                        hide-details
                        readonly
                    ></v-text-field>
                </v-col>
                <v-col cols="12" >
                    <v-list-subheader class="form-header">Payors Name</v-list-subheader>
                    <v-text-field
                        variant="solo"
                        density="compact"
                        v-model="payload.payors_name"
                        hide-details
                    ></v-text-field>
                </v-col>
                <v-col cols="6" >
                    <v-list-subheader class="form-header">Hospital Bills</v-list-subheader>
                    <v-text-field
                        variant="solo"
                        density="compact"
                        v-model="payload.hospital_bills"
                        hide-details
                        readonly
                    ></v-text-field>
                </v-col>
                <v-col cols="6" >
                    <v-list-subheader class="form-header">Credit Limit</v-list-subheader>
                    <v-text-field
                        :style="{ border: payload.hospital_bills > payload.guarantor_Credit_Limit ? '1px solid red' : '' }"
                        variant="solo"
                        density="compact"
                        v-model="payload.guarantor_Credit_Limit"
                        hide-details
                        readonly
                    ></v-text-field>
                </v-col>
            </v-row>
        </v-col>
        <v-col cols="5">
            <v-row>
                <v-col cols="6" >
                    <v-list-subheader class="form-header">Item Code / Qty</v-list-subheader>
                    <v-text-field
                        v-model="payload.itemID"
                        variant="solo"
                        density="compact"
                        hide-details
                        readonly
                    ></v-text-field>
                </v-col>
                <v-col cols="6" >
                    <v-list-subheader class="form-header">Transaction Code</v-list-subheader>
                    <v-text-field
                        v-model="payload.transaction_code"
                        variant="solo"
                        density="compact"
                        hide-details
                        readonly
                    ></v-text-field>
                </v-col>
                <v-col cols="12" >
                    <v-list-subheader class="form-header">Particulars</v-list-subheader>
                    <v-textarea
                        v-model="payload.particulars"
                        variant="solo"
                        density="compact"
                        hide-details
                        readonly
                    ></v-textarea>
                </v-col>
                <v-col cols="8" >
                    <v-list-subheader class="form-header">Discount</v-list-subheader>
                    <v-autocomplete
                        variant="solo"
                        density="compact"
                        item-title="description"
                        item-value="id"
                        v-model="payload.discount"
                        :items="discount_types"
                        hide-details
                    ></v-autocomplete>
                </v-col>
                <v-col cols="4" >
                    <v-list-subheader class="form-header">Percent ( % )</v-list-subheader>
                    <v-text-field
                        variant="solo"
                        density="compact"
                        v-model="payload.discount_percent"
                        hide-details
                    ></v-text-field>
                </v-col>
            </v-row>
        </v-col>
        <v-col cols="3">
            <v-row>
                <v-col cols="12" >
                    <v-list-subheader class="form-header">Item Amount</v-list-subheader>
                    <v-text-field
                        v-model="payload.amount"
                        variant="solo"
                        density="compact"
                        hide-details
                    ></v-text-field>
                </v-col>
                <v-col cols="12" >
                    <v-list-subheader class="form-header">Total Discount</v-list-subheader>
                    <v-text-field
                        type="number"
                        variant="solo"
                        density="compact"
                        v-model="payload.total_discount"
                        hide-details
                        readonly
                    ></v-text-field>
                </v-col>
                <v-col cols="12" >
                    <v-list-subheader class="form-header">Sub Total</v-list-subheader>
                    <v-text-field
                        type="number"
                        variant="solo"
                        density="compact"
                        v-model="payload.sub_total"
                        hide-details
                        readonly
                    ></v-text-field>
                </v-col>
                <v-col cols="12" >
                    <v-list-subheader class="form-header">Withholding Tax</v-list-subheader>
                    <v-text-field
                        variant="solo"
                        density="compact"
                        v-model="payload.withholding_tax"
                        hide-details
                        readonly
                    ></v-text-field>
                </v-col>
                <v-col cols="12" >
                <v-list-subheader class="form-header" style="color:red; font-weight: bolder;">Total Payment</v-list-subheader>
                <v-text-field
                    variant="outlined"
                    v-model="payload.total_payment"
                    hide-details
                    readonly
                ></v-text-field>
            </v-col>
            </v-row>
        </v-col>
    </v-row>
    <p style="margin-top: 30px; margin-bottom: 10px; font-weight: bolder; color: red; border-top: 1px solid #E4E4E4;">Mode of Payment</p>
    <v-row>
        <v-col cols="4" >
            <p style="font-size: 17px; font-weight: bolder; text-decoration: underline;">Cash</p>
            <v-col cols="12">
                <v-list-subheader class="form-header">Cash Amount</v-list-subheader>
                <v-text-field
                    variant="solo"
                    density="compact"
                    v-model="tempCashAmount"
                    @blur="updateCashAmount"
                    hide-details
                ></v-text-field>
            </v-col>
            <v-col cols="12">
                <v-list-subheader class="form-header">Cash Tendered</v-list-subheader>
                <v-text-field
                    variant="solo"
                    density="compact"
                    v-model="tempCashTendered"
                    @blur="updateCashTendered"
                    hide-details
                ></v-text-field>
            </v-col>
            <v-col cols="12">
                <v-list-subheader class="form-header">Change</v-list-subheader>
                <v-text-field
                    variant="solo"
                    density="compact"
                    v-model="formattedCashChange"
                    readonly
                    hide-details
                ></v-text-field>
            </v-col>
        </v-col>
        <v-col cols="4">
            <p style="font-size: 17px; font-weight: bolder; text-decoration: underline;">Card</p>
            <v-col cols="12" >
                <v-list-subheader class="form-header">Card Type</v-list-subheader>
                <v-autocomplete
                    item-title="payment_description"
                    item-value="id"
                    v-model="payload.card_type_id"
                    variant="solo"
                    clearable
                    :items="card_types"
                    @update:model-value="handleCardItems"
                    density="compact"
                    hide-details
                ></v-autocomplete>
            </v-col>
            <v-col cols="12" >
                <v-list-subheader class="form-header">Card</v-list-subheader>
                <v-autocomplete
                    item-title="description"
                    item-value="id"
                    v-model="payload.card_id"
                    variant="solo"
                    clearable
                    :readonly="!payload.card_type_id"
                    :items="card_data"
                    density="compact"
                    hide-details
                ></v-autocomplete>
            </v-col>
            <v-col cols="12" class="mt-3">
                <v-row>
                    <v-col cols="7">
                        <v-list-subheader class="form-header">Expiry Date</v-list-subheader>
                        <v-text-field
                            type="date"
                            variant="solo"
                            v-model="payload.card_date"
                            density="compact"
                            hide-details
                        ></v-text-field>
                    </v-col>
                    <v-col cols="5">
                        <v-list-subheader class="form-header">Approval #</v-list-subheader>
                        <v-text-field
                            variant="solo"
                            density="compact" 
                            v-model="payload.card_approval_number"
                            hide-details
                        ></v-text-field>
                    </v-col>
                </v-row>
            </v-col>
            <v-col cols="12" class="mt-2">
                <v-list-subheader class="form-header">Amount to Pay</v-list-subheader>
                <v-text-field
                    variant="solo"
                    density="compact"
                    v-model="tempCardAmount"
                    @blur="updateCardAmount"
                    hide-details
                ></v-text-field>
            </v-col>
        </v-col>
        <v-col cols="4" >
            <p style="font-size: 17px; font-weight: bolder; text-decoration: underline;">Cheque</p>
            <v-col cols="12" >
                <v-list-subheader class="form-header">Drawee Bank</v-list-subheader>
                <v-text-field
                    variant="solo"
                    density="compact"
                    v-model="payload.bank_check"
                    hide-details
                ></v-text-field>
            </v-col>
            <v-col cols="12" >
                <v-list-subheader class="form-header">Check No.</v-list-subheader>
                <v-text-field
                    variant="solo"
                    density="compact"
                    v-model="payload.check_no"
                    hide-details
                ></v-text-field>
            </v-col>
            <v-col cols="12" >
                <v-list-subheader class="form-header">Check Date</v-list-subheader>
                <v-text-field
                    type="date"
                    variant="solo"
                    density="compact"
                    v-model="payload.check_date"
                    hide-details
                ></v-text-field>
            </v-col>
            <v-col cols="12" >
                <v-list-subheader class="form-header">Amount to Pay</v-list-subheader>
                <v-text-field
                    variant="solo"
                    density="compact"
                    v-model="tempCheckAmount"
                    @blur="updateCheckAmount"
                    hide-details
                ></v-text-field>
            </v-col>
        </v-col>
    </v-row>
    <v-spacer></v-spacer>
    <v-btn class="bg-info text-white mr-2" @click="resetTransactionForm">Reset</v-btn>
    <v-btn class="bg-primary text-white" @click="openRecieptsInfo">Save</v-btn>
    <ORSequenceNumber 
        :open_cashier_settings="open_cashier_settings"
        @close-dialog="closeCashierSettings"
        @save-settings="handleCashierSettings"
    />
    <RecieptsInfo 
        :payload="payload"
        :open_reciepts_form="open_reciepts_form"
        @close-dialog="closeRecieptsForm"
        @submit="onParseReciept"
    /> 
</template>
<script setup>
import ORSequenceNumber from "./ORSequenceNumber.vue";
import RecieptsInfo from "./ReceiptsInfo.vue";

const emits = defineEmits(["close-dialog"]);
const table_data = ref([]);
const open_reciepts_form = ref(false);
const open_cashier_settings = ref(false);
const payload = ref({
    Items: [],
    collection_date: new Date().toISOString().substr(0, 10),
    Shift: null,
    cash_amount: null,
    cash_tendered: null,
    cash_change: null,
    card_amount: null,
    check_amount: null,
    status: null,
});
const card_types = ref([]);
const card_data = ref([]);
const payment_codes = ref([]);
const discount_types = ref([]);

const tempCashAmount = ref(payload.value.cash_amount);
const tempCashTendered = ref(payload.value.cash_tendered);
const tempCardAmount = ref(payload.value.card_amount);
const tempCheckAmount = ref(payload.value.check_amount);

const openRecieptsInfo = () => {
    open_reciepts_form.value = true;
};

const closeRecieptsForm = () => {
    open_reciepts_form.value = false;
};

const openConfirmDialog = () => {
    confirm_password.value = true;
};

const closeConfirmDialog = () => {
    confirm_password.value = false;
};

const openCashierSettings = () => {
    open_cashier_settings.value = true;
};

const handleCashierSettings = (settings) => {
    payload.value.ORNumber = "OR" + settings[0].LastORnumber + settings[0].ORSuffix;
    payload.value.collection_date = useDateMMDDYYY(settings[0].collection_date);
    payload.value.Shift = settings[0].shift_id;
};

const closeCashierSettings = () => {
    open_cashier_settings.value = false;
};

const searchChargeItem = async () => {
    if (payload.value.refNum) {
        const response = await useMethod("get", "get-charge-item?refNum=", "", payload.value.refNum);
        if (response && response.data && response.data.length > 0) {
            table_data.value = response.data; 
            payload.value.patient_id = response.data[0].patient_id;
            payload.value.case_No = response.data[0].case_No;
            payload.value.transaction_code = response.data[0].revenueID;
            payload.value.itemID = response.data.map(item => item.itemID) ? response.data.map(item => item.itemID).join(" , ") : null;

            const exam_description = response.data.map(item => item.items?.exam_description).filter(Boolean).join(" , ");
            const doctor_names = response.data.map(item => item.doctor_details?.doctor_name).filter(Boolean).join(" , ");
            payload.value.particulars = exam_description || doctor_names;
            payload.value.amount = response.data.map(item => parseFloat(item.amount)).filter(amount => !isNaN(amount)).reduce((a, b) => a + b, 0);

            payload.value.Items = table_data.value;

        } else if (response && response.data && response.data.length === 0) {
            return useSnackbar(true, "error", "Charge slip not found.");
        }
    } else {
        return useSnackbar(true, "error", "Please enter charge slip.");
    }
}

const getPatientByCaseNo = async () => {
    if (payload.value.case_No) {
        const response = await useMethod("get", "get-patient-by-caseno?case_No=", "", payload.value.case_No);
        if (response && response.data && response.data.length > 0) {
            payload.value.patient_Id = response.data[0].patient_Id ? response.data[0].patient_Id : null;
            payload.value.guarantor_Credit_Limit = response.data[0].guarantor_Credit_Limit ? usePeso(response.data[0].guarantor_Credit_Limit) : "OPEN";
            payload.value.accountnum = response.data[0].guarantor_Id ? response.data[0].guarantor_Id : null;
            payload.value.payors_name = response.data[0].patient_details 
                ? `${response.data[0].patient_details.lastname || ''}, ${response.data[0].patient_details.firstname || ''} ${response.data[0].patient_details.middlename || ''}`.trim()
                : null;
        } else {
            return useSnackbar(true, "error", "Patient not found.");
        }
    } else {
        return useSnackbar(true, "error", "Please enter admission number.");
    }
}

const getOPDBill = async () => {
    let items = {
        HospitalBill: 'HB',
        case_No: payload.value.case_No,
    };
    const response = await fetch(useApiUrl() + "/get-opd-bill", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + useToken()
        },
        body: JSON.stringify({ items })
    });
    if (response.ok) {
        const data = await response.json();
        
        if (data && data.data && data.data[0] && data.data[0]["Total Hospital Bill"]) {
            payload.value.itemID = "PY";
            payload.value.hospital_bills = usePeso(data.data[0]["Total Hospital Bill"]);
            payload.value.amount = usePeso(data.data[0]["Total Hospital Bill"]);
            payload.value.particulars = "Hospital Bill";
            table_data.value = [{ revenueID: "HB", itemID: "PY", items: { exam_description: "Hospital Bill" }, amount: payload.value.hospital_bills }];
        }
    }
}

const handleKeyEnter = () => {
    if (payload.value.payment_code == null || payload.value.payment_code === "") return useSnackbar(true, "error", "Please select payment code.");

    if (payload.value.payment_code === 1) {
        searchChargeItem();
    } else if (payload.value.payment_code === 5) {
        if (!payload.value.case_No) return useSnackbar(true, "error", "Please enter admission number.");

        payload.value.refNum = payload.value.refNum.toUpperCase();
        if (payload.value.refNum !== 'HB') {
            return useSnackbar(true, "error", "Use 'HB' to Trigger Hospital Bill.");
        } else {
            getOPDBill();
        }
    } else {
        alert("Wala pana na develop");
    }
}

const resetTransactionForm = () => {
    table_data.value = [];
    payload.value.patient_id = null;
    payload.value.case_No = null;
    payload.value.account_no = null;
    payload.value.payors_name = null;
    payload.value.refNum = null;
    payload.value.hospital_bills = null;
    payload.value.credit_limit = null;
    payload.value.itemID = null;
    payload.value.transaction_code = null;
    payload.value.particulars = null;
    payload.value.discount = null;
    payload.value.discount_percent = null;
    payload.value.amount = null;
    payload.value.total_discount = null;
    payload.value.sub_total = null;
    payload.value.withholding_tax = null;
    payload.value.total_payment = null;
    payload.value.cash_amount = null;
    payload.value.cash_tendered = null;
    payload.value.cash_change = null;
    payload.value.card = null;
    payload.value.card_approval_number = null;
    payload.value.card_date = null;
    payload.value.card_amount = null;
    payload.value.drawee_bank = null;
    payload.value.check_no = null;
    payload.value.check_date = null;
    payload.value.check_amount = null;
};

const onParseReciept = (payload) => {
    open_reciepts_form.value = false;
    confirm_password.value = true;
}

const onSubmit = async (user_details) => {
    if (user_details.user_passcode === usePasscode()) {
        const response = await useMethod("post", "save-payment", payload.value);
        if (response) {
            useSnackbar(true, "success", "Payment successfully saved.");
            resetTransactionForm();
            getLastORNumber();
            closeConfirmDialog();
        }
    } else {
        return useSnackbar(true, "error", "Password incorrect.");
    }
};

const formatNumber = (value) => {
    const number = parseFloat(value);
    return isNaN(number) ? '' : usePeso(number);
}

const formattedCashChange = computed(() => formatNumber(payload.value.cash_change));

const parseCurrencyInput = (value) => {
    return parseFloat(value.replace(/[₱,]/g, '')) || null;
}

const updateCashAmount = () => {
    const parsedValue = parseCurrencyInput(tempCashAmount.value);
    payload.value.cash_amount = parsedValue;
    tempCashAmount.value = formatNumber(parsedValue);
}

const updateCashTendered = () => {
    const parsedValue = parseCurrencyInput(tempCashTendered.value);
    payload.value.cash_tendered = parsedValue;
    tempCashTendered.value = formatNumber(parsedValue);
}

const updateCardAmount = () => {
    const parsedValue = parseCurrencyInput(tempCardAmount.value);
    payload.value.card_amount = parsedValue;
    tempCardAmount.value = formatNumber(parsedValue);
}

const updateCheckAmount = () => {
    const parsedValue = parseCurrencyInput(tempCheckAmount.value);
    payload.value.check_amount = parsedValue;
    tempCheckAmount.value = formatNumber(parsedValue);
}

watch(() => {
    if (payload.value.cash_amount && payload.value.cash_tendered) {
        payload.value.cash_change = parseFloat(payload.value.cash_tendered) - parseFloat(payload.value.cash_amount);
    } else {
        payload.value.cash_change = null;
    }
    // if (payload.value.amount && payload.value.total_discount) {
    //     payload.value.sub_total = parseFloat(payload.value.amount) - parseFloat(payload.value.total_discount);
    // }
    // if (payload.value.sub_total && payload.value.withholding_tax) {
    //     payload.value.total_payment = parseFloat(payload.value.sub_total) - parseFloat(payload.value.withholding_tax);
    // }
    // if (payload.value.card_amount) {
    //     payload.value.total_payment = parseFloat(payload.value.sub_total) - parseFloat(payload.value.card_amount);
    // }
    // if (payload.value.check_amount) {
    //     payload.value.total_payment = parseFloat(payload.value.sub_total) - parseFloat(payload.value.check_amount);
    // }
}, { deep: true });

const cardPaymentMethod = async () => {
    const response = await useMethod("get", "get-payment-methods", "", "");
    if (response) {
        card_types.value = response.filter(method => method.payment_description === "Credit Card" || method.payment_description === "Debit Card");
    }
}

const discountMethod = async () => {
    const response = await useMethod("get", "get-cashier-discount", "", "");
    if (response) {
        discount_types.value = response.data;
    }
}

const cashierPaymentCode = async () => {
    const response = await useMethod("get", "get-payment-codes", "", "");
    if (response) {
        let payment_codes_filter = ["Deposit Transaction", "Partial Payment Transaction", "Lump Sum Transaction"];
        payment_codes.value = response.filter(code => !payment_codes_filter.includes(code.description)); 
    }
}

const handleCardItems = async () => {
    if (payload.value.card_type_id === 2) {
        const response = await useMethod("get", "get-credit-cards", "", "");
        if (response) {
            card_data.value = response;
        }
    } else if (payload.value.card_type_id === 3) {
        const response = await useMethod("get", "get-debit-cards", "", "");
        if (response) {
            card_data.value = response;
        }
    } 
}

onMounted(() => {
    cardPaymentMethod();
    cashierPaymentCode();
    discountMethod();
});
</script>

<style scoped>
:deep(.v-col) {
    padding-top: 2px;
    padding-bottom: 2px;
}
:deep(.v-text-field input) {
    padding: 0;
    padding-left: 10px;
    padding-right: 10px;
    margin: 0;
}
.form-header {
    color: #000;
    margin: -12px 0px -12px 0px;
    font-weight: 500;
}
.styled-table th {
    max-width: 100%;
    padding: 8px;
    margin: 0;
}
.styled-table {
    background-color: #f8f8f8;
    border: 1px solid #D3D3D3;
    margin-top: 1px;
}
.styled-table {
    overflow-y: auto;
    scrollbar-width: thin; 
    scrollbar-color: #727272 #f5f5f5; 
}
.styled-table::-webkit-scrollbar {
    width: 12px;
}
.styled-table::-webkit-scrollbar-thumb {
    background-color: #107bac; 
    border-radius: 10px; 
    border: 3px solid #f5f5f5; 
}
.styled-table::-webkit-scrollbar-track {
    background-color: #f5f5f5; 
}
</style>
