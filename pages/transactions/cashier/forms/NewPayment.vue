<template>
    <v-row>
        <v-col cols="12">
            <div style="display: flex; justify-content: space-between; align-items: center;">
                <p style="font-size: 17px; font-weight: bolder; text-decoration: underline;">Item Details</p>
                <v-btn color="primary" style="border-radius: 0; margin-bottom: 2px;" @click="openCashierSettings"><v-icon class="mr-2">mdi-cog-outline</v-icon>Change Cashier Settings</v-btn>
            </div>
            <v-table density="compact" height="25vh"  class="styled-table">
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
                            <td> {{ item.items.transaction_code}} </td>
                            <td> {{ item.itemID }} </td>
                            <td> {{ item.items.exam_description }} </td>
                            <td> {{ item.amount }}</td>
                        </tr>
                    </template>
                </tbody>
            </v-table>
        </v-col>
    </v-row>
    <v-row class="mt-7">
        <v-col cols="4">
            <v-row>
                <v-col cols="6" >
                    <v-list-subheader class="form-header">OR Number</v-list-subheader> 
                    <v-text-field
                        variant="solo"
                        density="compact"
                        v-model="payload.ORNumber"
                        readonly
                        required
                        hide-details
                    ></v-text-field>
                </v-col>
                <v-col cols="6" >
                    <v-list-subheader class="form-header">Payment Code</v-list-subheader>
                    <v-autocomplete
                        variant="solo"
                        density="compact"
                        v-model="payload.payment_code"
                        hide-details
                    ></v-autocomplete>
                </v-col>
                <v-col cols="6" >
                    <v-list-subheader class="form-header">Admission No</v-list-subheader>
                    <v-text-field
                        v-model="payload.register_id_no"
                        readonly
                        variant="solo"
                        density="compact"
                        hide-details
                    ></v-text-field>
                </v-col>
                <v-col cols="6" >
                    <v-list-subheader class="form-header">Account No</v-list-subheader>
                    <v-text-field
                        variant="solo"
                        density="compact"
                        v-model="payload.account_no"
                        hide-details
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
                    <v-list-subheader class="form-header">Charge Slip</v-list-subheader>
                    <v-text-field
                        variant="solo"
                        density="compact"
                        v-model="payload.refNum"
                        @keyup.enter="searchChargeItem"
                        hide-details
                    ></v-text-field>
                </v-col>
                <v-col cols="6" >
                    <v-list-subheader class="form-header">Collection Date</v-list-subheader>
                    <v-text-field
                        type="date"
                        v-model="payload.collection_date"
                        readonly
                        variant="solo"
                        density="compact"
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
                    ></v-text-field>
                </v-col>
                <v-col cols="6" >
                    <v-list-subheader class="form-header">Credit Limit</v-list-subheader>
                    <v-text-field
                        variant="solo"
                        density="compact"
                        v-model="payload.credit_limit"
                        hide-details
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
                    ></v-text-field>
                </v-col>
                <v-col cols="6" >
                    <v-list-subheader class="form-header">Transaction Code</v-list-subheader>
                    <v-text-field
                        v-model="payload.transaction_code"
                        variant="solo"
                        density="compact"
                        hide-details
                    ></v-text-field>
                </v-col>
                <v-col cols="12" >
                    <v-list-subheader class="form-header">Particulars</v-list-subheader>
                    <v-textarea
                        v-model="payload.particulars"
                        variant="solo"
                        density="compact"
                        hide-details
                    ></v-textarea>
                </v-col>
                <v-col cols="8" >
                    <v-list-subheader class="form-header">Discount</v-list-subheader>
                    <v-autocomplete
                        variant="solo"
                        density="compact"
                        v-model="payload.discount"
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
                        type="number"
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
                    ></v-text-field>
                </v-col>
                <v-col cols="12" >
                    <v-list-subheader class="form-header">Withholding Tax</v-list-subheader>
                    <v-text-field
                        variant="solo"
                        density="compact"
                        v-model="payload.withholding_tax"
                        hide-details
                    ></v-text-field>
                </v-col>
                <v-col cols="12" >
                <v-list-subheader class="form-header">TOTAL PAYMENT</v-list-subheader>
                <v-text-field
                    variant="outlined"
                    v-model="payload.total_payment"
                    hide-details
                ></v-text-field>
            </v-col>
            </v-row>
        </v-col>
    </v-row>
    <v-row>
        <v-col cols="4" >
            <p style="font-size: 17px; font-weight: bolder; text-decoration: underline;">Cash</p>
            <v-col cols="12" >
                <v-list-subheader class="form-header">Cash Amount</v-list-subheader>
                <v-text-field
                    type="number"
                    variant="solo"
                    density="compact"
                    v-model="payload.cash_amount"
                    hide-details
                ></v-text-field>
            </v-col>
            <v-col cols="12" >
                <v-list-subheader class="form-header">Cash Tenedered</v-list-subheader>
                <v-text-field
                    type="number"
                    variant="solo"
                    density="compact"
                    v-model="payload.cash_tendered"
                    hide-details
                ></v-text-field>
            </v-col>
            <v-col cols="12" >
                <v-list-subheader class="form-header">Change</v-list-subheader>
                <v-text-field
                    type="number"
                    variant="solo"
                    density="compact"
                    v-model="payload.cash_change"
                    hide-details
                ></v-text-field>
            </v-col>
        </v-col>
        <v-col cols="4" >
            <p style="font-size: 17px; font-weight: bolder; text-decoration: underline;">Card</p>
            <v-col cols="12" >
                <v-list-subheader class="form-header">Card</v-list-subheader>
                <v-autocomplete
                    item-title="Card"
                    item-value="CardID"
                    v-model="payload.card"
                    variant="solo"
                    :items="card_data"
                    density="compact"
                    hide-details
                ></v-autocomplete>
            </v-col>
            <v-col cols="12" >
                <v-list-subheader class="form-header">Approval #</v-list-subheader>
                <v-text-field
                    variant="solo"
                    density="compact" 
                    v-model="payload.card_approval_number"
                    hide-details
                ></v-text-field>
            </v-col>
            <v-col cols="12" >
                <v-list-subheader class="form-header">Date</v-list-subheader>
                <v-text-field
                    type="date"
                    variant="solo"
                    v-model="payload.card_date"
                    density="compact"
                    hide-details
                ></v-text-field>
            </v-col>
            <v-col cols="12" >
                <v-list-subheader class="form-header">Card Amount</v-list-subheader>
                <v-text-field
                    type="number"
                    variant="solo"
                    v-model="payload.card_amount"
                    density="compact"
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
                    v-model="payload.drawee_bank"
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
                <v-list-subheader class="form-header">Amount</v-list-subheader>
                <v-text-field
                    type="number"
                    variant="solo"
                    density="compact"
                    v-model="payload.check_amount"
                    hide-details
                ></v-text-field>
            </v-col>
        </v-col>
    </v-row>
    <v-spacer></v-spacer>
    <v-btn class="bg-info text-white mr-2" @click="resetTransactionForm">Reset</v-btn>
    <v-btn class="bg-primary text-white" @click="openConfirmDialog">Save</v-btn>
    <ORSequenceNumber 
        :open_cashier_settings="open_cashier_settings"
        @close-dialog="closeCashierSettings"
        @save-settings="handleCashierSettings"
    />
    <RecieptsInfo 
        :open_reciepts_form="open_reciepts_form"
        @close-dialog="closeRecieptsForm"
    />
    <Confirmation 
        :show="confirmDialog"
        :payload="password_payload"
        @submit="onSubmit"
        @close="closeConfirmDialog"
    />    
</template>
<script setup>
import ORSequenceNumber from "./ORSequenceNumber.vue";
import RecieptsInfo from "./ReceiptsInfo.vue";

const payload = ref({})
const emits = defineEmits(["close-dialog", "save-payment"]);
let table_tab = ref("0");
const table_data = ref([]);
const open_reciepts_form = ref(false);
const open_cashier_settings = ref(false);
const password_payload = ref({});
const confirmDialog = ref(false);

const openConfirmDialog = () => {
    confirmDialog.value = true;
};

const closeConfirmDialog = () => {
    confirmDialog.value = false;
};

const closeRecieptsForm = () => {
    open_reciepts_form.value = false;
};

const openCashierSettings = () => {
    open_cashier_settings.value = true;
};

const handleCashierSettings = (settings) => {
    payload.value = settings;
    open_cashier_settings.value = false;
};

const closeCashierSettings = () => {
    open_cashier_settings.value = false;
};

const searchChargeItem = async () => {
    if (payload.value.refNum) {
        const response = await useMethod("get", "get-charge-item?refNum=", "", payload.value.refNum);
        if (response && response.data && response.data.length > 0) {
            table_data.value = response.data; // For table data
            payload.value.patient_id = response.data[0].patient_id;
            payload.value.register_id_no = response.data[0].register_id_no;
            payload.value.transaction_code = response.data[0].items && response.data[0].items.transaction_code;
            payload.value.itemID = response.data.map(item => item.itemID).join(" , ");
            payload.value.particulars = response.data.map(item => item.items.exam_description).join(" , ");
            payload.value.amount = response.data.map(item => parseFloat(item.amount)).reduce((a, b) => a + b, 0);
        } else if (response && response.data && response.data.length === 0) {
            return useSnackbar(true, "error", "Charge slip not found.");
        }
    } else {
        return useSnackbar(true, "error", "Please enter charge slip.");
    }
}

const resetTransactionForm = () => {
    table_data.value = [];
    payload.value.patient_id = null;
    payload.value.register_id_no = null;
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

const onSubmit = async (user_details) => {
    if (user_details.user_passcode === usePasscode()) {
        console.log(payload.value);
        closeConfirmDialog();
    } else {
        return useSnackbar(true, "error", "Password incorrect.");
    }
};


const card_data = ref([
    {
        "CardID": 2,
        "Card": "AMEXCO"
    },
    {
        "CardID": 5,
        "Card": "DINERS"
    },
    {
        "CardID": 10,
        "Card": "MASTERCARD"
    },
    {
        "CardID": 11,
        "Card": "VISA"
    },
    {
        "CardID": 14,
        "Card": "PAYMAYA"
    },
    {
        "CardID": 15,
        "Card": "BANCNET"
    },
    {
        "CardID": 16,
        "Card": "DEBIT CARD"
    },
    {
        "CardID": 17,
        "Card": "JCB"
    },
    {
        "CardID": 18,
        "Card": "UNION PAY"
    },
    {
        "CardID": 19,
        "Card": "GCASH"
    },
    {
        "CardID": 20,
        "Card": "ATM"
    }
]);

// const getCardData = async () => {
//     const credit_res = await useMethod("get", "get-credit-cards", "", "");
//     const debit_res = await useMethod("get", "get-debit-cards", "", "");
//     if (credit_res && debit_res) {
//         card_data.value = [...debit_res, ...credit_res];
//     }
// }

onMounted(() => {
    // getCardData();
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
::-webkit-scrollbar {
    width: 16px;
}
::-webkit-scrollbar-thumb {
    background-color: #727272; 
    border: 3px solid #f5f5f5; 
}
::-webkit-scrollbar-track {
    background-color: #f5f5f5; 
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
    width: 16px;
}
.styled-table::-webkit-scrollbar-thumb {
    background-color: #727272; 
    border: 3px solid #f5f5f5; 
}
.styled-table::-webkit-scrollbar-track {
    background-color: #f5f5f5; 
}
</style>