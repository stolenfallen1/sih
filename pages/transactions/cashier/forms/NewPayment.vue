<template>
    <v-dialog :model-value="open_payment_form" rounded="lg" @update:model-value="closeDialog"  scrollable max-width="1120px">
        <v-card rounded="lg">
            <v-toolbar density="compact" color="#107bac" hide-details>
                <v-toolbar-title>OR Transaction Form</v-toolbar-title>
                <v-spacer></v-spacer>
                <v-btn color="white" @click="closeDialog">
                    <v-icon>mdi-close</v-icon>
                </v-btn>
            </v-toolbar>
            <v-card-text>
                <v-row>
                    <v-col cols="12" class="pa-1">
                        <v-tabs
                            v-model="table_tab"
                            color="primary"
                            density="compact"
                        >
                            <v-tab value="0" ><v-icon start>mdi-form-select</v-icon>Details</v-tab>
                            <v-tab value="1"><v-icon start>mdi-form-select</v-icon>Charge Slip</v-tab>
                        </v-tabs>
                        <v-window v-model="table_tab">
                            <v-window-item value="0">
                                    <v-table density="compact" height="25vh"  class="styled-table">
                                        <thead>
                                            <tr>
                                                <th>Dept Code</th>
                                                <th>Item Code</th>
                                                <th>Description</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <template v-for="(item, index) in table_data" :key="index">
                                                <tr>
                                                    <td> {{ item.items.transaction_code}} </td>
                                                    <td> {{ item.itemID }} </td>
                                                    <td> {{ item.items.exam_description }} </td>
                                                </tr>
                                            </template>
                                        </tbody>
                                    </v-table>
                            </v-window-item>
                            <v-window-item value="1">
                                <v-table density="compact" height="25vh"  class="styled-table">
                                    <thead>
                                        <tr>
                                            <th>Reference</th>
                                            <th>Item Code</th>
                                            <th>Description</th>
                                            <th>Amount</th>
                                            <th>Disc. Code</th>
                                            <th>Disc. Amount</th>
                                            <th>Ref No.</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <!-- <template> -->
                                            <tr>
                                                <td> </td>
                                                <td> </td>
                                                <td> </td>
                                                <td> </td>
                                                <td>  </td>
                                                <td> </td>
                                                <td> </td>
                                                <td> </td>
                                            </tr>
                                        <!-- </template> -->
                                    </tbody>
                                </v-table>
                            </v-window-item>
                        </v-window>
                    </v-col>
                </v-row>
                <v-row>
                    <v-divider class="ma-1" color="#107bac" style="opacity: 0.3;" thickness="2" />
                    <v-col cols="4">
                        <v-row>
                            <v-col cols="6" class="pa-1">
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
                            <v-col cols="6" class="pa-1">
                                <v-list-subheader class="form-header">Payment Code</v-list-subheader>
                                <v-autocomplete
                                    variant="solo"
                                    density="compact"
                                    hide-details
                                ></v-autocomplete>
                            </v-col>
                            <v-col cols="6" class="pa-1">
                                <v-list-subheader class="form-header">Admission No</v-list-subheader>
                                <v-text-field
                                    v-model="payload.register_id_no"
                                    readonly
                                    variant="solo"
                                    density="compact"
                                    hide-details
                                ></v-text-field>
                            </v-col>
                            <v-col cols="6" class="pa-1">
                                <v-list-subheader class="form-header">Account No</v-list-subheader>
                                <v-text-field
                                    variant="solo"
                                    density="compact"
                                    hide-details
                                ></v-text-field>
                            </v-col>
                            <v-col cols="12" class="pa-1">
                                <v-list-subheader class="form-header">Payors Name</v-list-subheader>
                                <v-text-field
                                    variant="solo"
                                    density="compact"
                                    hide-details
                                ></v-text-field>
                            </v-col>
                            <v-col cols="6" class="pa-1">
                                <v-list-subheader class="form-header">Charge Slip</v-list-subheader>
                                <v-text-field
                                    variant="solo"
                                    density="compact"
                                    v-model="payload.refNum"
                                    @keyup.enter="searchChargeItem"
                                    hide-details
                                ></v-text-field>
                            </v-col>
                            <v-col cols="6" class="pa-1">
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
                            <v-col cols="6" class="pa-1">
                                <v-list-subheader class="form-header">Hospital Bills</v-list-subheader>
                                <v-text-field
                                    variant="solo"
                                    density="compact"
                                    hide-details
                                ></v-text-field>
                            </v-col>
                            <v-col cols="6" class="pa-1">
                                <v-list-subheader class="form-header">Credit Limit</v-list-subheader>
                                <v-text-field
                                    variant="solo"
                                    density="compact"
                                    hide-details
                                ></v-text-field>
                            </v-col>
                        </v-row>
                    </v-col>
                    <v-col cols="5">
                        <v-row>
                            <v-col cols="6" class="pa-1">
                                <v-list-subheader class="form-header">Item Code / Qty</v-list-subheader>
                                <v-text-field
                                    v-model="payload.itemID"
                                    variant="solo"
                                    density="compact"
                                    hide-details
                                ></v-text-field>
                            </v-col>
                            <v-col cols="6" class="pa-1">
                                <v-list-subheader class="form-header">Transaction Code</v-list-subheader>
                                <v-text-field
                                    v-model="payload.transaction_code"
                                    variant="solo"
                                    density="compact"
                                    hide-details
                                ></v-text-field>
                            </v-col>
                            <v-col cols="12" class="pa-1">
                                <v-list-subheader class="form-header">Particulars</v-list-subheader>
                                <v-textarea
                                    v-model="payload.particulars"
                                    variant="solo"
                                    density="compact"
                                    hide-details
                                ></v-textarea>
                            </v-col>
                            <v-col cols="8" class="pa-1">
                                <v-list-subheader class="form-header">Discount</v-list-subheader>
                                <v-autocomplete
                                    variant="solo"
                                    density="compact"
                                    hide-details
                                ></v-autocomplete>
                            </v-col>
                            <v-col cols="4" class="pa-1">
                                <v-list-subheader class="form-header">Percent ( % )</v-list-subheader>
                                <v-text-field
                                    variant="solo"
                                    density="compact"
                                    hide-details
                                ></v-text-field>
                            </v-col>
                        </v-row>
                    </v-col>
                    <v-col cols="3">
                        <v-row>
                            <v-col cols="12" class="pa-1">
                                <v-list-subheader class="form-header">Item Amount</v-list-subheader>
                                <v-text-field
                                    v-model="payload.amount"
                                    type="number"
                                    variant="solo"
                                    density="compact"
                                    hide-details
                                ></v-text-field>
                            </v-col>
                            <v-col cols="12" class="pa-1">
                                <v-list-subheader class="form-header">Total Discount</v-list-subheader>
                                <v-text-field
                                    type="number"
                                    variant="solo"
                                    density="compact"
                                    hide-details
                                ></v-text-field>
                            </v-col>
                            <v-col cols="12" class="pa-1">
                                <v-list-subheader class="form-header">Sub Total</v-list-subheader>
                                <v-text-field
                                    type="number"
                                    variant="solo"
                                    density="compact"
                                    hide-details
                                ></v-text-field>
                            </v-col>
                            <v-col cols="12" class="pa-1">
                                <v-list-subheader class="form-header">Withholding Tax</v-list-subheader>
                                <v-text-field
                                    variant="solo"
                                    density="compact"
                                    hide-details
                                ></v-text-field>
                            </v-col>
                            <v-col cols="12" class="pa-1">
                            <v-list-subheader class="form-header">TOTAL PAYMENT</v-list-subheader>
                            <v-text-field
                                variant="outlined"
                                hide-details
                            ></v-text-field>
                        </v-col>
                        </v-row>
                    </v-col>
                </v-row>
                <v-row>
                    <v-divider color="#107bac" style="opacity: 0.3;" thickness="2" />
                    <v-col cols="4" class="pa-1">
                        <p style="font-size: 17px; font-weight: bolder; text-decoration: underline;">Cash</p>
                        <v-col cols="12" class="pa-1">
                            <v-list-subheader class="form-header">Cash Amount</v-list-subheader>
                            <v-text-field
                                type="number"
                                variant="solo"
                                density="compact"
                                hide-details
                            ></v-text-field>
                        </v-col>
                        <v-col cols="12" class="pa-1">
                            <v-list-subheader class="form-header">Cash Tenedered</v-list-subheader>
                            <v-text-field
                                type="number"
                                variant="solo"
                                density="compact"
                                hide-details
                            ></v-text-field>
                        </v-col>
                        <v-col cols="12" class="pa-1">
                            <v-list-subheader class="form-header">Change</v-list-subheader>
                            <v-text-field
                                type="number"
                                variant="solo"
                                density="compact"
                                hide-details
                            ></v-text-field>
                        </v-col>
                    </v-col>
                    <v-col cols="4" class="pa-1">
                        <p style="font-size: 17px; font-weight: bolder; text-decoration: underline;">Card</p>
                        <v-col cols="12" class="pa-1">
                            <v-list-subheader class="form-header">Card</v-list-subheader>
                            <v-autocomplete
                                item-title="description"
                                item-value="id"
                                v-model="payload.card"
                                variant="solo"
                                density="compact"
                                hide-details
                            ></v-autocomplete>
                        </v-col>
                        <v-col cols="12" class="pa-1">
                            <v-list-subheader class="form-header">Approval #</v-list-subheader>
                            <v-text-field
                                variant="solo"
                                density="compact" 
                                v-model="payload.card_approval_number"
                                hide-details
                            ></v-text-field>
                        </v-col>
                        <v-col cols="12" class="pa-1">
                            <v-list-subheader class="form-header">Date</v-list-subheader>
                            <v-text-field
                                type="date"
                                variant="solo"
                                v-model="payload.card_date"
                                density="compact"
                                hide-details
                            ></v-text-field>
                        </v-col>
                        <v-col cols="12" class="pa-1">
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
                    <v-col cols="4" class="pa-1">
                        <p style="font-size: 17px; font-weight: bolder; text-decoration: underline;">Cheque</p>
                        <v-col cols="12" class="pa-1">
                            <v-list-subheader class="form-header">Drawee Bank</v-list-subheader>
                            <v-text-field
                                variant="solo"
                                density="compact"
                                hide-details
                            ></v-text-field>
                        </v-col>
                        <v-col cols="12" class="pa-1">
                            <v-list-subheader class="form-header">Check No.</v-list-subheader>
                            <v-text-field
                                variant="solo"
                                density="compact"
                                hide-details
                            ></v-text-field>
                        </v-col>
                        <v-col cols="12" class="pa-1">
                            <v-list-subheader class="form-header">Check Date</v-list-subheader>
                            <v-text-field
                                type="date"
                                variant="solo"
                                density="compact"
                                hide-details
                            ></v-text-field>
                        </v-col>
                        <v-col cols="12" class="pa-1">
                            <v-list-subheader class="form-header">Amount</v-list-subheader>
                            <v-text-field
                                type="number"
                                variant="solo"
                                density="compact"
                                hide-details
                            ></v-text-field>
                        </v-col>
                    </v-col>
                </v-row>
            </v-card-text>
            <v-divider></v-divider>
            <v-card-actions>
                <v-btn variant="outlined" color="info" @click="closeDialog"> Close </v-btn>
                <v-spacer></v-spacer>
                <v-btn class="bg-info text-white" type="submit">Reset</v-btn>
                <v-btn class="bg-primary text-white" @click="openConfirmDialog">Save</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
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
import RecieptsInfo from "./ReceiptsInfo.vue";

const props = defineProps({
    open_payment_form: {
        type: Boolean,
        default: () => false,
        required: true,
    },
    payload: {
        type: Object,
        default: () => {},
        required: true,
    }
});

const emits = defineEmits(["close-dialog", "save-payment"]);
let table_tab = ref("0");
const table_data = ref([]);
const open_reciepts_form = ref(false);
const password_payload = ref({});
const confirmDialog = ref(false);

const closeDialog = () => {
    emits("close-dialog");
    password_payload.value = {};
};

const openConfirmDialog = () => {
    confirmDialog.value = true;
};

const closeConfirmDialog = () => {
    confirmDialog.value = false;
};

const closeRecieptsForm = () => {
    open_reciepts_form.value = false;
};

const searchChargeItem = async () => {
    if (props.payload.refNum) {
        const response = await useMethod("get", "get-charge-item?refNum=", "", props.payload.refNum);
        if (response && response.data && response.data.length > 0) {
            table_data.value = response.data; // For table data
            props.payload.patient_id = response.data[0].patient_id;
            props.payload.register_id_no = response.data[0].register_id_no;
            props.payload.itemID = response.data[0].itemID;
            props.payload.transaction_code = response.data[0].items && response.data[0].items.transaction_code;
            props.payload.particulars = response.data[0].items && response.data[0].items.exam_description;
            props.payload.amount = response.data[0].amount;
        }
    } else {
        return useSnackbar(true, "error", "Please enter charge slip.");
    }
}

const onSubmit = async (user_details) => {
    if (user_details.user_passcode === usePasscode()) {
        emits("save-payment", props.payload);
        closeConfirmDialog();
        closeDialog();
    } else {
        return useSnackbar(true, "error", "Password incorrect.");
    }
};

const credit_data = ref({});
const debit_data = ref({});

const getCreditData = async () => {
    const response = await useMethod("get", "get-credit-cards", "", "");
    if (response) {
        credit_data.value = response;
    }
};
const getDebitData = async () => {
    const response = await useMethod("get", "get-debit-cards", "", "");
    if (response) {
        debit_data.value = response;
    }
};

onMounted(() => {
    getCreditData();
    getDebitData();
});
</script>

<style scoped>
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