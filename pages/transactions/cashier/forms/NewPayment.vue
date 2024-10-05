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
                            <td> {{ payload.payment_code === 1 ? usePeso(item.amount) : item.amount }} </td>
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
                    <v-list-subheader class="form-header" style="color: #107bac; font-weight: bolder; cursor: pointer;">OR Number</v-list-subheader> 
                    <v-text-field
                        variant="outlined"
                        density="compact"
                        v-model="payload.ORNumber"
                        @click="openCashierSettings"
                        readonly
                        hide-details
                    ></v-text-field>
                </v-col>
                <v-col cols="6">
                    <v-list-subheader class="form-header">Admission No</v-list-subheader>
                    <v-text-field
                        ref="caseNoRef"
                        v-model="payload.case_No"
                        variant="outlined"
                        density="compact"
                        hide-details
                        @keyup.enter="handleFocus($event, caseNoRef)"
                    ></v-text-field>
                </v-col>
                <v-col cols="12">
                    <v-list-subheader class="form-header">Payment Code</v-list-subheader>
                    <v-autocomplete
                        ref="paymentCodeRef"
                        variant="outlined"
                        density="compact"
                        item-title="description"
                        item-value="id"
                        :items="payment_codes"
                        v-model="payload.payment_code"
                        @keyup.enter="handleFocus($event, paymentCodeRef)"
                        clearable
                        hide-details
                    ></v-autocomplete>
                </v-col>
                <v-col cols="6" v-if="payload.payment_code !== 6">
                    <v-list-subheader class="form-header">Charge Slip</v-list-subheader>
                    <v-text-field
                        ref="chargeSlipRef"
                        variant="outlined"
                        density="compact"
                        v-model="payload.refNum"
                        @keyup.enter="handleFocus($event, chargeSlipRef)"
                        hide-details
                    ></v-text-field>
                </v-col>
                <v-col cols="6" v-if="payload.payment_code === 6">
                    <v-list-subheader class="form-header">Company Code</v-list-subheader>
                    <v-text-field
                        ref="companyCodeRef"
                        variant="outlined"
                        density="compact"
                        v-model="payload.company_code"
                        @keyup.enter="handleFocus($event, companyCodeRef)"
                        hide-details
                    ></v-text-field>
                </v-col>
                <v-col cols="6" >
                    <v-list-subheader class="form-header">Account No</v-list-subheader>
                    <v-text-field
                        variant="outlined"
                        density="compact"
                        v-model="payload.accountnum"
                        hide-details
                        readonly
                    ></v-text-field>
                </v-col>
                <v-col cols="12" >
                    <v-list-subheader class="form-header">Payors Name</v-list-subheader>
                    <v-text-field
                        ref="payorsNameRef"
                        variant="outlined"
                        density="compact"
                        v-model="payload.payors_name"
                        @keyup.enter="handleFocus($event, payorsNameRef)"
                        hide-details
                    ></v-text-field>
                </v-col>
                <v-col cols="6" >
                    <v-list-subheader class="form-header">Hospital Bills</v-list-subheader>
                    <v-text-field
                        variant="outlined"
                        density="compact"
                        v-model="payload.hospital_bills"
                        hide-details
                        readonly
                    ></v-text-field>
                </v-col>
                <v-col cols="6" >
                    <v-list-subheader class="form-header">Credit Limit</v-list-subheader>
                    <v-text-field
                        variant="outlined"
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
                        variant="outlined"
                        density="compact"
                        hide-details
                        readonly
                    ></v-text-field>
                </v-col>
                <v-col cols="6" >
                    <v-list-subheader class="form-header">Transaction Code</v-list-subheader>
                    <v-text-field
                        v-model="payload.transaction_code"
                        variant="outlined"
                        density="compact"
                        hide-details
                        readonly
                    ></v-text-field>
                </v-col>
                <v-col cols="12" >
                    <v-list-subheader class="form-header">Particulars</v-list-subheader>
                    <v-textarea
                        v-model="payload.particulars"
                        variant="outlined"
                        density="compact"
                        hide-details
                        readonly
                    ></v-textarea>
                </v-col>
                <v-col cols="8" >
                    <v-list-subheader class="form-header">Discount</v-list-subheader>
                    <v-autocomplete
                        ref="discountRef"
                        variant="outlined"
                        density="compact"
                        item-title="description"
                        item-value="id"
                        v-model="payload.discount"
                        :items="discount_types"
                        @keyup.enter="handleFocus($event, discountRef)"
                        hide-details
                    ></v-autocomplete>
                </v-col>
                <v-col cols="4" >
                    <v-list-subheader class="form-header">Percent ( % )</v-list-subheader>
                    <v-text-field
                        ref="discountPercentRef"
                        variant="outlined"
                        type="number"
                        density="compact"
                        @change="calculateTotals"
                        @keyup.enter="handleFocus($event, discountPercentRef)"
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
                        ref="amountRef"
                        v-model="payload.amount"
                        @change="calculateTotals"
                        @keyup.enter="handleFocus($event, amountRef)"
                        variant="outlined"
                        density="compact"
                        hide-details
                    ></v-text-field>
                </v-col>
                <v-col cols="12" >
                    <v-list-subheader class="form-header">Total Discount</v-list-subheader>
                    <v-text-field
                        variant="outlined"
                        density="compact"
                        v-model="payload.total_discount"
                        hide-details
                        readonly
                    ></v-text-field>
                </v-col>
                <v-col cols="12" >
                    <v-list-subheader class="form-header">Sub Total</v-list-subheader>
                    <v-text-field
                        variant="outlined"
                        density="compact"
                        v-model="payload.sub_total"
                        hide-details
                        readonly
                    ></v-text-field>
                </v-col>
                <v-col cols="12">
                    <v-list-subheader class="form-header">Withholding Tax</v-list-subheader>
                    <v-text-field
                        ref="withholdingTaxRef"
                        variant="outlined"
                        density="compact"
                        v-model="payload.withholding_tax" 
                        @change="calculateTotals"
                        @keyup.enter="handleFocus($event, withholdingTaxRef)"
                        hide-details
                    ></v-text-field>
                </v-col>
                <v-col cols="12" >
                <v-list-subheader class="form-header" style="color: #107bac; font-weight: bolder;">Total Payment</v-list-subheader>
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
    <p style="margin-top: 30px; margin-bottom: 10px; font-weight: bolder; color: #107bac; border-top: 1px solid #E4E4E4;">Mode of Payment</p>
    <v-row style="margin-bottom: 0px;">
        <v-col cols="4">
            <p style="font-size: 17px; font-weight: bolder; text-decoration: underline;">Card</p>
            <v-col cols="12" >
                <v-list-subheader class="form-header">Card Type</v-list-subheader>
                <v-autocomplete
                    item-title="payment_description"
                    item-value="id"
                    v-model="payload.card_type_id"
                    variant="outlined"
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
                    variant="outlined"
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
                            variant="outlined"
                            v-model="payload.card_date"
                            density="compact"
                            hide-details
                        ></v-text-field>
                    </v-col>
                    <v-col cols="5">
                        <v-list-subheader class="form-header">Approval #</v-list-subheader>
                        <v-text-field
                            variant="outlined"
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
                    variant="outlined"
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
                    variant="outlined"
                    density="compact"
                    v-model="payload.bank_check"
                    hide-details
                ></v-text-field>
            </v-col>
            <v-col cols="12" >
                <v-list-subheader class="form-header">Check No.</v-list-subheader>
                <v-text-field
                    variant="outlined"
                    density="compact"
                    v-model="payload.check_no"
                    hide-details
                ></v-text-field>
            </v-col>
            <v-col cols="12" >
                <v-list-subheader class="form-header">Check Date</v-list-subheader>
                <v-text-field
                    type="date"
                    variant="outlined"
                    density="compact"
                    v-model="payload.check_date"
                    hide-details
                ></v-text-field>
            </v-col>
            <v-col cols="12" >
                <v-list-subheader class="form-header">Amount to Pay</v-list-subheader>
                <v-text-field
                    variant="outlined"
                    density="compact"
                    v-model="tempCheckAmount"
                    @blur="updateCheckAmount"
                    hide-details
                ></v-text-field>
            </v-col>
        </v-col>
        <v-col cols="4" >
            <p style="font-size: 17px; font-weight: bolder; text-decoration: underline;">Cash</p>
            <v-col cols="12">
                <v-list-subheader class="form-header">Cash Amount</v-list-subheader>
                <v-text-field
                    variant="outlined"
                    density="compact"
                    v-model="tempCashAmount"
                    @blur="updateCashAmount"
                    hide-details
                ></v-text-field>
            </v-col>
            <v-col cols="12">
                <v-list-subheader class="form-header">Cash Tendered</v-list-subheader>
                <v-text-field
                    variant="outlined"
                    density="compact"
                    v-model="tempCashTendered"
                    @blur="updateCashTendered"
                    hide-details
                ></v-text-field>
            </v-col>
            <v-col cols="12">
                <v-list-subheader class="form-header">Change</v-list-subheader>
                <v-text-field
                    variant="outlined"
                    density="compact"
                    v-model="formattedCashChange"
                    readonly
                    hide-details
                ></v-text-field>
            </v-col>
            <v-col cols="12" style="margin-bottom: 5px;">
                <v-btn class="bg-info text-white mr-2" @click="resetTransactionForm">Reset</v-btn>
                <v-btn class="bg-primary text-white" @click="openRecieptsInfo">Save</v-btn>
            </v-col>
        </v-col>
    </v-row>
    <v-spacer></v-spacer>
    <ORSequenceNumber
        :open_cashier_settings="open_cashier_settings"
        @close-dialog="closeCashierSettings"
        @save-settings="handleCashierSettings"
    />
    <RecieptsInfo 
        :payload="payload"
        :open_reciepts_form="open_reciepts_form"
        @close-dialog="closeRecieptsForm"
        @submit="openConfirmDialog"
    /> 
    <Confirmation 
        :payload="payload"
        :show="confirm_password"
        :loading="isLoadingBtn"
        :error_msg="error_msg"
        @close="closeConfirmDialog"
        @submit="onSubmit"
    />
</template>
<script setup>
import ORSequenceNumber from "./ORSequenceNumber.vue";
import RecieptsInfo from "./ReceiptsInfo.vue";

const emits = defineEmits(["close-dialog"]);
const table_data = ref([]);
const open_reciepts_form = ref(false);
const open_cashier_settings = ref(false);
const confirm_password = ref(false);
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
const formErrors = ref({});
const isLoadingBtn = ref(false);
const user_attempts = ref(0);
const error_msg = ref('');

const tempCashAmount = ref(payload.value.cash_amount);
const tempCashTendered = ref(payload.value.cash_tendered);
const tempCardAmount = ref(payload.value.card_amount);
const tempCheckAmount = ref(payload.value.check_amount);

const paymentCodeRef = ref(null);
const caseNoRef = ref(null);
const chargeSlipRef = ref(null);
const companyCodeRef = ref(null);
const payorsNameRef = ref(null);
const amountRef = ref(null);
const discountRef = ref(null);
const discountPercentRef = ref(null);
const withholdingTaxRef = ref(null);

const focusOrder = {
    1: [paymentCodeRef, chargeSlipRef, payorsNameRef, amountRef, discountRef, discountPercentRef, withholdingTaxRef],
    5: [paymentCodeRef, caseNoRef, chargeSlipRef, payorsNameRef, amountRef, discountRef, discountPercentRef, withholdingTaxRef],
    6: [paymentCodeRef, companyCodeRef, caseNoRef, amountRef, discountRef, discountPercentRef, withholdingTaxRef],
}

const focusNextField = (currentField, paymentCode) => {
    const formFields = focusOrder[paymentCode].map(ref => {
        // console.log('Current Ref:', ref);
        if (ref && ref.value) {
            return ref.value;
        } else {
            console.warn(`Ref is undefined or does not have a value:`, ref);
            return null; 
        }
    }).filter(Boolean);
    // console.log('Current Field:', currentField);
    // console.log('Form Fields:', formFields);
    if (formFields.length === 0) {
        console.warn('No fields to focus on for payment code:', paymentCode);
        return; 
    }
    const currentFieldIndex = formFields.indexOf(currentField);
    // console.log('Current Field Index:', currentFieldIndex);
    if (currentFieldIndex !== -1 && currentFieldIndex < formFields.length - 1) {
        nextTick(() => {
            const nextField = formFields[currentFieldIndex + 1];
            // console.log('Focusing next field:', nextField);
            if (nextField && nextField.focus) {
                nextField.focus();
            } 
            // else {
            //     console.error('Next field is not valid or does not have focus method:', nextField);
            // }
        });
    }
};

const handleFocus = async (event, currentField) => {
    if (!payload.value.payment_code) return useSnackbar(true, "error", "Please select payment code.");
    if (currentField === caseNoRef.value) {
        const isValid = await getPatientByCaseNo();  
        if (!isValid) {
            currentField.focus(); 
            return;  
        }
    }
    if (currentField === chargeSlipRef.value || currentField === companyCodeRef.value) {
        const isValid = await handleKeyEnter();  
        if (!isValid) {
            currentField.focus(); 
            return;  
        }
    }
    nextTick(() => {
        focusNextField(currentField, payload.value.payment_code);  
    });
};

const openRecieptsInfo = () => {
    open_reciepts_form.value = true;
};

const closeRecieptsForm = () => {
    open_reciepts_form.value = false;
};

const openConfirmDialog = async () => {
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
            payload.value.patient_Id = response.data[0].patient_Id;
            payload.value.case_No = response.data[0].case_No;
            payload.value.transaction_code = response.data[0].revenueID;
            payload.value.payors_name = response.data[0].patient_Name;
            payload.value.guarantor_Credit_Limit = "SELF-PAY";
            payload.value.accountnum = response.data[0].patient_Id;
            payload.value.request_doctors_id = response.data[0].requestDoctorID;

            const exam_description = response.data.map(item => item.items?.exam_description).filter(Boolean).join(" , ");
            const doctor_names = response.data.map(item => item.doctor_details?.doctor_name).filter(Boolean).join(" , ");
            payload.value.particulars = exam_description || doctor_names;

            const paymentTotal = response.data.reduce((acc, item) => acc + (parseFloat(item.amount) || 0), 0).toString();
            payload.value.amount = usePeso(paymentTotal);

            table_data.value = response.data.map(item => ({
                id: item.id,
                form: item.form,
                revenueID: item.revenueID,
                itemID: item.itemID,
                amount: item.amount,
                charge_type: item.stat,
                specimen: item.specimenId,
                barcode: item.Barcode,
                items: item.items,
                doctor_details: item.doctor_details
            }));

            payload.value.Items = table_data.value;
            return true;

        } else if (response && response.data && response.data.length === 0) {
            useSnackbar(true, "error", "Charge slip not found.");
            return false;
        }
    } else {
        useSnackbar(true, "error", "Please enter charge slip.");
        return false;
    }
}

const getPatientByCaseNo = async () => {
    if (payload.value.payment_code == null || payload.value.payment_code == "") {
        useSnackbar(true, "error", "Please select payment code.");
        return false;
    } 
    if (payload.value.payment_code == 6 && payload.value.company_code == null || payload.value.company_code == "") {
        useSnackbar(true, "error", "Please enter company code first.");
        return false;
    } 
    if (payload.value.case_No) {
        const response = await useMethod("get", "get-patient-by-caseno?case_No=", "", payload.value.case_No);
        if (response && response.data && response.data.length > 0) {
            payload.value.patient_Id = response.data[0].patient_Id;
            payload.value.guarantor_Credit_Limit = response.data[0].guarantor_Credit_Limit ? usePeso(response.data[0].guarantor_Credit_Limit) : "OPEN";

            switch (payload.value.payment_code) {
                case 5:
                    payload.value.accountnum = response.data[0].guarantor_Id ? response.data[0].guarantor_Id : null;
                    payload.value.payors_name = response.data[0].patient_details 
                        ? `${response.data[0].patient_details.lastname || ''}, ${response.data[0].patient_details.firstname || ''} ${response.data[0].patient_details.middlename || ''}`.trim()
                        : null;
                    break;
                case 6:
                    if (payload.value.company_code != response.data[0].guarantor_Id) {
                        payload.value.guarantor_Credit_Limit = null;
                        payload.value.particulars = null;
                        table_data.value = null;
                        useSnackbar(true, "error", "Company code does not match with the Patient's Company Code.");
                        return false;
                    } else {
                        getOPDBill();
                        payload.value.particulars = response.data[0].patient_details
                            ? `${response.data[0].patient_details.lastname || ''}, ${response.data[0].patient_details.firstname || ''} ${response.data[0].patient_details.middlename || ''}`.trim() + ` (${useDateMMDDYYY(response.data[0].registry_Date) || ''})`
                            : null;
                    }
                    break;
                default:
                    break;
            }
            return true;

        } else {
            useSnackbar(true, "error", "Patient not found.");
            return false;
        }
    } else {
        useSnackbar(true, "error", "Please enter admission number.");
        return false;
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
            payload.value.hospital_bills = usePeso(data.data[0]["Total Hospital Bill"]);
            payload.value.amount = usePeso(data.data[0]["Total Hospital Bill"]);

            switch(payload.value.payment_code) {
                case 5:
                    payload.value.itemID = "PY";
                    payload.value.particulars = "Hospital Bill";
                    table_data.value = [{ revenueID: "HB", itemID: "PY", items: { exam_description: "Hospital Bill" }, amount: payload.value.hospital_bills }];
                    payload.value.Items = table_data.value;
                    break;
                case 6:
                    payload.value.itemID = "CP";
                    table_data.value = [{ revenueID: payload.value.case_No, itemID: "CP", items: { exam_description: payload.value.particulars }, amount: payload.value.hospital_bills }];
                    payload.value.Items = table_data.value;
                    break;
                default:
                    break;
            }
            return true;
        } else {
            useSnackbar(true, "error", "Patient has no charges.");
            return false;
        }
    }
}

const getCompanyDetails = async () => {
    if (!payload.value.company_code) {
        useSnackbar(true, "error", "Please enter company code.");
        return false;
    }

    payload.value.company_code = payload.value.company_code.toUpperCase();
    const response = await useMethod("get", "get-company-details?company_code=", "", payload.value.company_code);
    
    if (response && response.data) {
        payload.value.accountnum = response.data.guarantor_code;
        payload.value.payors_name = response.data.guarantor_name;
        return true;
    }
    return false; 
}

const handleKeyEnter = async () => {
    if (payload.value.payment_code == null || payload.value.payment_code === "") return useSnackbar(true, "error", "Please select payment code.");

    switch(payload.value.payment_code) {
        case 1:
            const isSearchChargeItemValid = await searchChargeItem();
            return isSearchChargeItemValid;
        case 5:
            if (!payload.value.case_No) {
                useSnackbar(true, "error", "Please enter admission number.");
                return false;
            } 

            const refNum = payload.value.refNum?.toUpperCase();
            if (!refNum || refNum !== 'HB') {
                useSnackbar(true, "error", !refNum ? "Please enter charge slip." : "Use 'HB' to Trigger Hospital Bill.");
                return false;
            }

            const isGetOPDBillValid = await getOPDBill();
            return isGetOPDBillValid;
        case 6:
            const isCompanyDetailsValid = await getCompanyDetails();
            return isCompanyDetailsValid;
        default:
            return false;
    }
}

const resetTransactionForm = () => {
    // Reset table data
    table_data.value = [];

    // Reset payload values
    payload.value = {
        patient_Id: null,
        case_No: null,
        account_no: null,
        payors_name: null,
        refNum: null,
        hospital_bills: null,
        credit_limit: null,
        itemID: null,
        transaction_code: null,
        particulars: null,
        discount: null,
        discount_percent: null,
        amount: null,
        total_discount: null,
        sub_total: null,
        withholding_tax: null,
        total_payment: null,
        cash_amount: null,
        cash_tendered: null,
        cash_change: null,
        card: null,
        card_approval_number: null,
        card_date: null,
        card_amount: null,
        drawee_bank: null,
        check_no: null,
        check_date: null,
        check_amount: null,
    };

    // Reset temporary variables for input fields
    tempCashAmount.value = null;
    tempCashTendered.value = null;
    tempCardAmount.value = null;
    tempCheckAmount.value = null;

    // Reset form errors
    formErrors.value = {};
};

const onSubmit = async (user_details) => {
    if (user_details.user_passcode === usePasscode()) {
        switch(payload.value.payment_code) {
            case 1:
                const cashtrans_res = await useMethod("post", "save-cash-transaction", payload.value);
                if (cashtrans_res) {
                    useSnackbar(true, "success", "Payment successfully saved.");
                    resetTransactionForm();
                    closeRecieptsForm();
                    closeConfirmDialog();
                }
                break;
            case 5:
                const opdbill_res = await useMethod("post", "save-opbill", payload.value);
                if (opdbill_res) {
                    useSnackbar(true, "success", "Payment successfully saved.");
                    resetTransactionForm();
                    closeRecieptsForm();
                    closeConfirmDialog();
                }
                break;
            case 6:
                const companybill_res = await useMethod("post", "save-companybill", payload.value);
                if (companybill_res) {
                    useSnackbar(true, "success", "Payment successfully saved.");
                    resetTransactionForm();
                    closeRecieptsForm();
                    closeConfirmDialog();
                }
                break;
            default:
                break;
        }
    } else if (user_details.user_passcode !== usePasscode() && user_attempts.value == 5) {
        error_msg.value = "Too many wrong attempts, Please try again after 20 seconds.";
        isLoadingBtn.value = true;
        setTimeout(() => {
            isLoadingBtn.value = false;
            user_attempts.value = 0;
            error_msg.value = "";
        }, 20000);
    } else {
        user_attempts.value += 1;
        return useSnackbar(true, "error", "Password incorrect.");
    } 
};

const formatNumber = (value) => {
    const number = parseFloat(value);
    return isNaN(number) ? '' : usePeso(number);
}

const formattedCashChange = computed(() => formatNumber(payload.value.cash_change));

const calculateTotals = () => {
    const cleanedAmount = parseCurrencyInput(payload.value.amount);
    const discountPercent = parseFloat(payload.value.discount_percent) || 0;
    const withholdingTax = parseFloat(payload.value.withholding_tax) || 0;

    if (isNaN(cleanedAmount)) {
        payload.value.sub_total = usePeso(0);
        payload.value.total_payment = usePeso(0);
        return;
    }

    const discount = (cleanedAmount * discountPercent) / 100;
    payload.value.total_discount = usePeso(discount);

    payload.value.amount = usePeso(cleanedAmount);

    const subTotal = cleanedAmount - discount;
    payload.value.sub_total = usePeso(subTotal > 0 ? subTotal : 0); 

    payload.value.withholding_tax = usePeso(withholdingTax);

    const totalPayment = subTotal - withholdingTax;
    payload.value.total_payment = usePeso(totalPayment > 0 ? totalPayment : 0); 
};

watch(() => payload.value.amount, () => {
    try {
        const cleanedAmount = parseCurrencyInput(payload.value.amount);
        payload.value.sub_total = usePeso(cleanedAmount);
        payload.value.total_payment = usePeso(cleanedAmount);
    } catch (error) {
        console.error('Error in watch amount:', error);
    }
});



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

watchEffect(() => {
    if (payload.value.cash_amount && payload.value.cash_tendered) {
        payload.value.cash_change = parseFloat(payload.value.cash_tendered) - parseFloat(payload.value.cash_amount);
    } else {
        payload.value.cash_change = null;
    }
});

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
    setTimeout(() => {
        openCashierSettings();
        cardPaymentMethod();
        cashierPaymentCode();
        discountMethod();
    }, 1000);
});
onUnmounted(() => {
    closeCashierSettings();
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
.error-input {
    border: 1px solid red;
    border-radius: 8px;
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
