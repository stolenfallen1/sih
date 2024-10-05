<template>
    <v-dialog :model-value="show" rounded="lg" scrollable @update:model-value="closeDialog" max-width="1120px">
        <v-card rounded="lg">
            <v-toolbar density="compact" color="#107bac" hide-details>
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
                                            v-model="payload.patient_Name"
                                            variant="solo"
                                            density="compact"
                                            hide-details
                                            readonly
                                        ></v-text-field>
                                    </v-col>
                                    <v-col cols="12">
                                        <v-text-field 
                                            label="ID No."
                                            v-model="payload.patient_Id"
                                            variant="solo"
                                            density="compact"
                                            hide-details
                                            readonly
                                        ></v-text-field>
                                    </v-col>
                                </v-row>
                                <v-row>
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
                                <v-row>
                                    <v-col cols="4">
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
                                    <v-col cols="4">
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
                                    <v-col cols="4">
                                        <v-text-field 
                                            label="Registry Case Date"
                                            v-model="payload.registry_Date"
                                            type="date"
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
                                            v-model="payload.case_No"
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
                                    <v-col cols="3">
                                        <v-text-field
                                            label="ID"
                                            v-model="payload.attending_Doctor"
                                            variant="solo"
                                            density="compact"
                                            hide-details
                                            readonly
                                        ></v-text-field>
                                    </v-col>
                                    <v-col cols="9">
                                        <v-text-field
                                            label="Physician Name"
                                            v-model="payload.attending_Doctor_fullname"
                                            variant="solo"
                                            density="compact"
                                            hide-details
                                            readonly
                                        ></v-text-field>
                                    </v-col>
                                    <v-col cols="3">
                                        <v-text-field
                                            label="ID"
                                            v-model="payload.guarantor_Id"
                                            variant="solo"
                                            density="compact"
                                            hide-details
                                            readonly
                                        ></v-text-field>
                                    </v-col>
                                    <v-col cols="9">
                                        <v-text-field
                                            label="Guarantor Name"
                                            v-model="payload.guarantor_Name"
                                            variant="solo"
                                            density="compact"
                                            hide-details
                                            readonly
                                        ></v-text-field>
                                    </v-col>
                                    <v-col cols="6" v-if="payload.account == 'Company / Insurance'">
                                        <v-text-field
                                            label="Credit Limit"
                                            v-model="payload.guarantor_Credit_Limit"
                                            variant="solo"
                                            density="compact"
                                            hide-details
                                            readonly
                                        />
                                    </v-col>
                                    <v-col cols="6">
                                        <v-autocomplete
                                            bg-color="#C0C0C0"
                                            label="Charge To"
                                            item-title="text"
                                            item-value="id"
                                            v-model="payload.charge_to"
                                            :items="charge_to"
                                            :readonly="payload.account == 'Self-Pay'"
                                            variant="solo"
                                            density="compact"
                                            hide-details
                                        ></v-autocomplete>
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
                        <v-expansion-panel-title color="#107bac">
                            Post Charge Transactions
                            <v-spacer></v-spacer>
                            <v-btn class="mr-4" density="compact">
                                <v-icon>mdi-help-circle-outline</v-icon>
                                &nbsp; View Help Code
                                <v-menu activator="parent">
                                    <v-list>
                                    <v-list-item
                                        v-for="(item, index) in revenue_code_data_display"
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
                                    </tr>
                                </thead>
                                <tbody>
                                    <template v-for="(item,index) in Charges">
                                        <tr>
                                            <td> <input class="input charge-focus" v-model="item.code" @keyup.enter="handleAddCharge(item,index)" :readonly="item.isReadonly" /> </td>
                                            <td> <input class="input charge-focus" v-model="item.map_item_id" @keyup.enter="handleAddCharge(item,index)" readonly /> </td> 
                                            <td> <input class="input charge-focus" v-model="item.exam_description" @keyup.enter="handleAddCharge(item,index)" readonly /> </td>
                                            <td>
                                                <select class="input charge-focus" v-model="item.charge_type">
                                                    <option value="1">Routine</option>
                                                    <option value="2">Stat</option>
                                                </select>
                                            </td>
                                            <td>
                                                <select class="input charge-focus" v-model="item.specimen">
                                                    <option v-for="(specimen, sIndex) in item.specimens" :key="sIndex" :value="specimen.id">
                                                        {{ specimen.description }}
                                                    </option>
                                                </select>
                                            </td>
                                            <td> <input class="input charge-focus" v-model="item.quantity" readonly /> </td>
                                            <td> <input class="input charge-focus" v-model="item.price" readonly /> </td>
                                            <td v-if="!item.isAdd" class="cursor-pointer" ><v-icon @click="handleAddCharge(item,index)" color="primary">mdi-plus-box</v-icon></td>
                                            <td v-if="item.isDelete" class="cursor-pointer"><v-icon @click="removeChargeItem(item)" color="red">mdi-delete</v-icon></td> 
                                        </tr>
                                    </template>
                                </tbody>
                                <tfoot>
                                    <tr>
                                        <td colspan="6" class="text-right">Total Amount: </td>
                                        <td>{{ usePeso(totalAmount) }}</td>
                                    </tr>
                                </tfoot>
                            </v-table>
                        </v-expansion-panel-text>
                    </v-expansion-panel>

                    <v-expansion-panel>
                        <v-expansion-panel-title color="#107bac">Professional Fee</v-expansion-panel-title>
                        <v-expansion-panel-text>
                            <v-table density="compact" height="35vh" class="styled-table">
                                <thead>
                                    <tr>
                                        <th>Dept Code</th>
                                        <th>PF Code</th>
                                        <th>PF Name</th>
                                        <th>Amount</th> 
                                    </tr>
                                </thead>
                                <tbody>
                                    <template v-for="(item, index) in DoctorCharges">
                                        <tr>
                                            <td> <input class="input pf-focus" v-model="item.code" @keyup.enter="handleAddProfessionalFee(item, index)" readonly /> </td>
                                            <td> <input class="input pf-focus" v-model="item.doctor_code" @keyup.enter="handleAddProfessionalFee(item, index)" readonly /> </td>
                                            <td> <input class="input pf-focus" v-model="item.doctor_name" @keyup.enter="handleAddProfessionalFee(item, index)" readonly/> </td>
                                            <td> <input class="input pf-focus" v-model="item.amount" type="number" /> </td>
                                            <td v-if="!item.isAdd" class="cursor-pointer" ><v-icon color="primary" @click="handleAddProfessionalFee(item, index)">mdi-plus-box</v-icon></td>
                                            <td v-if="item.isDelete" class="cursor-pointer"><v-icon @click="removePFItem(item)" color="red">mdi-delete</v-icon></td> 
                                        </tr>
                                    </template>
                                </tbody>
                                <tfoot>
                                    <tr>
                                        <td colspan="3" class="text-right">Total Amount: </td>
                                        <td>{{ usePeso(totalAmount) }}</td>
                                    </tr>
                                </tfoot>
                            </v-table>
                        </v-expansion-panel-text>
                    </v-expansion-panel>

                    <v-expansion-panel>
                        <v-expansion-panel-title color="#107bac">Post Charge History</v-expansion-panel-title>
                        <v-expansion-panel-text>
                            <v-tabs
                            v-model="charge_history_tab"
                            color="primary"
                            >
                                <v-tab value="0" v-if="payload.account == 'Company / Insurance'"><v-icon start>mdi-form-select</v-icon>Company / Insurance</v-tab>
                                <v-tab value="1"><v-icon start>mdi-form-select</v-icon>Cash Assessment</v-tab>
                            </v-tabs>
                            <v-window v-model="charge_history_tab">
                                <v-window-item value="0">
                                    <template v-if="charges_history_data">
                                        <v-table density="compact" height="30vh" class="styled-table">
                                            <thead>
                                                <tr>
                                                    <th></th>
                                                    <th>Reference Number</th>
                                                    <th>Dept Code</th>
                                                    <th>Item Code</th>
                                                    <th>Description</th>
                                                    <th>Qty</th>
                                                    <th>Amount</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <template v-for="item in charges_history_data">
                                                    <tr>
                                                        <td> <input type="checkbox" :checked="isCheckedCharges(item)" @change="toggleChargeSelection(item)" /></td>
                                                        <td> <input readonly :value="item.refNum" /> </td>
                                                        <td> <input readonly :value="item.revenueID" /> </td>
                                                        <td> <input readonly :value="item.itemID" /> </td>
                                                        <td> <input readonly :value="item?.items?.exam_description" /> </td>
                                                        <td> <input readonly :value="parseInt(item.quantity)" /> </td>
                                                        <td> <input readonly :value="usePeso(item.net_amount)" /> </td>
                                                    </tr>
                                                </template>
                                            </tbody>
                                            <tfoot>
                                                <tr>
                                                    <td colspan="6" class="text-right">Total Amount: </td>
                                                    <td>
                                                        {{  usePeso(chargeAmountHistory) }}
                                                    </td>
                                                </tr>
                                            </tfoot>
                                        </v-table>
                                    </template>
                                </v-window-item>
                                <v-window-item value="1">
                                    <template v-if="cash_assessment_history">
                                        <v-table density="compact" height="30vh" class="styled-table">
                                            <thead>
                                                <tr>
                                                    <th></th>
                                                    <th>Status</th>
                                                    <th>Reference Number</th>
                                                    <th>Dept Code</th>
                                                    <th>Item Code</th>
                                                    <th>Description</th>
                                                    <th>Qty</th>
                                                    <th>Amount</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <template v-for="item in cash_assessment_history">
                                                    <tr>
                                                        <td> <input type="checkbox" :checked="isCheckedCashAssessment(item)" @change="toggleCashAssessmentSelection(item)" /></td>
                                                        <td> 
                                                            <span>
                                                                <v-chip color="green" v-if="payload.account !== 'Company / Insurance'">Paid</v-chip> 
                                                                <v-chip color="red" v-else>Unpaid</v-chip>
                                                            </span>
                                                        </td>
                                                        <td> <input readonly :value="item.refNum" /> </td>
                                                        <td> <input readonly :value="item.revenueID" /> </td>
                                                        <td> <input readonly :value="item.itemID" /> </td>
                                                        <td> <input readonly :value="item?.items?.exam_description" /> </td>
                                                        <td> <input readonly :value="parseInt(item.quantity)" /> </td>
                                                        <td> <input readonly :value="usePeso(item.amount)" /> </td>
                                                    </tr>
                                                </template>
                                            </tbody>
                                            <tfoot>
                                                <tr>
                                                    <td colspan="7" class="text-right">Total Amount: </td>
                                                    <td>
                                                        {{ usePeso(cashAmountHistory) }}
                                                    </td>
                                                </tr>
                                            </tfoot>
                                        </v-table>
                                    </template>
                                </v-window-item>
                            </v-window>
                        </v-expansion-panel-text>
                    </v-expansion-panel>

                    <v-expansion-panel>
                        <v-expansion-panel-title color="#107bac">Professional Fee History</v-expansion-panel-title>
                        <v-expansion-panel-text>
                            <v-tabs
                            v-model="pf_history_tab"
                            color="primary"
                            >
                                <v-tab value="0" v-if="payload.account == 'Company / Insurance'"><v-icon start>mdi-form-select</v-icon>Company / Insurance</v-tab>
                                <v-tab value="1"><v-icon start>mdi-form-select</v-icon>Cash Assessment</v-tab>
                            </v-tabs>
                            <v-window v-model="pf_history_tab">
                                <v-window-item value="0">
                                    <template v-if="professional_fees_history">
                                        <v-table density="compact" height="30vh" class="styled-table">
                                            <thead>
                                                <tr>
                                                    <th></th>
                                                    <th>Reference Number</th>
                                                    <th>Dept Code</th>
                                                    <th>PF Code</th>
                                                    <th>PF Name</th>
                                                    <th>Amount</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <template v-for="item in professional_fees_history">
                                                    <tr>
                                                        <td> <input type="checkbox" :checked="isCheckedCharges(item)" @change="toggleChargeSelection(item)" /></td>
                                                        <td> <input readonly :value="item.refNum" /> </td>
                                                        <td> <input readonly :value="item.revenueID" /> </td>
                                                        <td> <input readonly :value="item.itemID" /> </td>
                                                        <td> <input readonly :value="item?.doctor_details?.doctor_name" /> </td>
                                                        <td> <input readonly :value="usePeso(item.net_amount)" /> </td>
                                                    </tr>
                                                </template>
                                            </tbody>
                                            <tfoot>
                                                <tr>
                                                    <td colspan="5" class="text-right">Total Amount: </td>
                                                    <td>
                                                        {{ usePeso(chargeProfFeeAmountHistory) }}
                                                    </td>
                                                </tr>
                                            </tfoot>
                                        </v-table>
                                    </template>
                                </v-window-item>
                                <v-window-item value="1">
                                    <template v-if="cash_prof_fee_history">
                                        <v-table density="compact" height="30vh" class="styled-table">
                                            <thead>
                                                <tr>
                                                    <th></th>
                                                    <th>Status</th>
                                                    <th>Reference Number</th>
                                                    <th>Dept Code</th>
                                                    <th>PF Code</th>
                                                    <th>PF Name</th>
                                                    <th>Amount</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <template v-for="item in cash_prof_fee_history">
                                                    <tr>
                                                        <td> <input type="checkbox" :checked="isCheckedCashAssessment(item)" @change="toggleCashAssessmentSelection(item)" /></td>
                                                        <td> 
                                                            <span>
                                                                <v-chip color="green" v-if="payload.account !== 'Company / Insurance'">Paid</v-chip> 
                                                                <v-chip color="red" v-else>Unpaid</v-chip>
                                                            </span>
                                                        </td>
                                                        <td> <input readonly :value="item.refNum" /> </td>
                                                        <td> <input readonly :value="item.revenueID" /> </td>
                                                        <td> <input readonly :value="item.itemID" /> </td>
                                                        <td> <input readonly :value="item?.doctor_details?.doctor_name" /> </td>
                                                        <td> <input readonly :value="usePeso(item.amount)" /> </td>
                                                    </tr>
                                                </template>
                                            </tbody>
                                            <tfoot>
                                                <tr>
                                                    <td colspan="6" class="text-right">Total Amount: </td>
                                                    <td>
                                                        {{ usePeso(cashProfFeeAmountHistory) }}
                                                    </td>
                                                </tr>
                                            </tfoot>
                                        </v-table>
                                    </template>
                                </v-window-item>
                            </v-window>
                        </v-expansion-panel-text>
                    </v-expansion-panel>
                </v-expansion-panels>
            </v-card-text>
            <v-divider></v-divider>
            <v-card-actions>
                <v-btn variant="outlined" color="info" @click="closeDialog">Close</v-btn>
                <v-btn class="text-white bg-error" @click="confirmRevoke">Revoke Charge</v-btn>
                <v-btn class="text-white bg-info" @click="onPrint">Print</v-btn>
                <v-spacer></v-spacer>
                <v-btn :loading="isLoadingBtn" :disabled="isLoadingBtn" class="text-white bg-primary" @click="confirmCharge">Charge and Print</v-btn>

            </v-card-actions>
        </v-card>
    </v-dialog>

    <charges-list 
        :open_charges_list="open_charges_list" 
        :patienttype="payload.charge_to === 'Self-Pay' ? 1 : 2" 
        @handle-select="handleSelectedChargeItem"
        :user_input_revenue_code="user_input_revenue_code" 
        :chargecode="chargecode"
        @close-dialog="closeChargesList" 
    />

    <p-f-list
        :open_professionals_list="open_professionals_list"
        @handle-select="handleSelectedProfessionalFee"
        @close-dialog="closeProfessionalsList"
    />

    <Confirmation 
        :show="chargeconfirmation"
        :payload="payload"
        @submit="onSubmit"
        @close="closeConfirmCharge"
    />

    <Confirmation 
        :show="revokeconfirmation"
        :payload="payload"
        @submit="onRevoke"
        @close="closeConfirmRevoke"
    />
</template>

<script setup>
import { createApp } from 'vue';
import ChargesList from './sub-forms/ChargesList.vue';
import PFList from './sub-forms/PFList.vue';
import ChargeReports from "../../../../public/reports/charges/ChargeReports.vue";
import CashAssessmentReports from "../../../../public/reports/charges/CashAssessmentReports.vue";

const props = defineProps({
    show: {
        type: Boolean,
        default: () => false,
        required: true,
    },
});

let panel = ref([0, 1]);
let charge_history_tab = ref("0");
let pf_history_tab = ref("0");

const { selectedRowDetails } = storeToRefs(useSubcomponentSelectedRowDetailsStore()); 
const emits = defineEmits(['close-dialog']) 

const user_input_revenue_code = ref('');
const open_charges_list = ref(false);
const open_professionals_list = ref(false);
const isLoadingBtn = ref(false);
const charges_history_data = ref([]);
const cash_assessment_history = ref([]);
const professional_fees_history = ref([]);
const cash_prof_fee_history = ref([]);
const selected_charges = ref([]);
const selected_cash_assessment = ref([]);
const charge_to = ref([
    { value: 1, text: "Self-Pay" },
    { value: 2, text: "Company / Insurance" }, 
]);
const credit_limit = ref(null);

const chargeconfirmation = ref(false);
const revokeconfirmation = ref(false);

const isCheckedCharges = (item) => {
    return selected_charges.value.includes(item);
}
const isCheckedCashAssessment = (item) => {
    return selected_cash_assessment.value.includes(item);
}

const toggleChargeSelection = (item) => {
    if (selected_charges.value.includes(item)) {
        selected_charges.value = selected_charges.value.filter(i => i !== item);
    } else {
        selected_charges.value.push(item);
    }
}

const toggleCashAssessmentSelection = (item) => {
    if (selected_cash_assessment.value.includes(item)) {
        selected_cash_assessment.value = selected_cash_assessment.value.filter(i => i !== item);
    } else {
        selected_cash_assessment.value.push(item);
    }
}

watch(charge_history_tab, (newTab) => {
    if (newTab == 0) {
        selected_cash_assessment.value = [];
    } else if (newTab == 1) {
        selected_charges.value = [];
    }
});

watch(pf_history_tab, (newTab) => {
    if (newTab == 0) {
        selected_cash_assessment.value = [];
    } else if (newTab == 1) {
        selected_charges.value = [];
    }
});

const chargecode = ref([]);
const payload = ref({});

const Charges = ref([
    {
        code: "",
        map_item_id: "",
        exam_description: "",
        charge_type: 1,
        drcr: "",
        lgrp: "",
        specimen: "",
        quantity: 1,
        price: null,
        barcode_prefix: "",
        record_status: null,
    }
]);
const DoctorCharges = ref([
    {
        code: "MD",
        doctor_code: "",
        doctor_name: "",
        drcr: "",
        lgrp: "",
        amount: null,
        record_status: null,
    }
]);

const revenue_code_data = ref([]);
const revenue_code_data_display = ref([]);
const getRevenueCode = async () => {
    const revenue_res = await useMethod("get", "get-transaction-codes", "", "");
    if (revenue_res) {
        const desiredCodes = useRevenueCode();
        if (desiredCodes && Array.isArray(desiredCodes)) {
            revenue_code_data.value = revenue_res.filter(item => desiredCodes.includes(item.id.toString()));
            revenue_code_data_display.value = revenue_code_data.value.filter(item => item.code !== "MD");
        } 
    } else {
        useSnackbar(true, "error", "Failed to get revenue codes.");
    }
};

const totalChargesAmount = computed(() => {
    return Charges.value.reduce((acc, item) => {
        const cleanPrice = typeof item.price === 'string'
            ? parseFloat(item.price.replace(/[^\d.-]/g, ''))
            : parseFloat(item.price) || 0;
        return acc + (cleanPrice || 0);
    }, 0);
});

const totalDoctorChargesAmount = computed(() => {
    return DoctorCharges.value.reduce((acc, item) => {
        const cleanAmount = typeof item.amount === 'string'
            ? parseFloat(item.amount.replace(/[^\d.-]/g, ''))
            : parseFloat(item.amount) || 0;
        return acc + (cleanAmount || 0);
    }, 0);
});

const chargeAmountHistory = computed(() => {
    return charges_history_data.value ? charges_history_data.value.reduce((acc, item) => acc + parseFloat(item.net_amount), 0) : 0;
});
const cashAmountHistory = computed(() => {
    return cash_assessment_history.value ? cash_assessment_history.value.reduce((acc, item) => acc + parseFloat(item.amount), 0) : 0;
});
const chargeProfFeeAmountHistory = computed(() => {
    return professional_fees_history.value ? professional_fees_history.value.reduce((acc, item) => acc + parseFloat(item.net_amount), 0) : 0;
});
const cashProfFeeAmountHistory = computed(() => {
    return cash_prof_fee_history.value ? cash_prof_fee_history.value.reduce((acc, item) => acc + parseFloat(item.amount), 0) : 0;
});

const totalAmount = computed(() => totalChargesAmount.value + totalDoctorChargesAmount.value);
const totalHistoryAmount = computed(() => chargeAmountHistory.value + cashAmountHistory.value + chargeProfFeeAmountHistory.value + cashProfFeeAmountHistory.value);
const patientExcessAmount = computed(() => parseFloat((totalHistoryAmount.value ? totalAmount.value + totalHistoryAmount.value : totalAmount.value).toFixed(2)));

const handleAddCharge = (item, index) => {
    item.code = item.code.toUpperCase();
    const lastRow = Charges.value[Charges.value.length - 1];
    if (!item.code) {
        return useSnackbar(true, "error", "Dept Code Should not be empty.");
    }
    if (item.code === "MD") {
        return useSnackbar(true, "error", "Invalid Dept Code, refer to help code.");
    }
    const desiredCodes = revenue_code_data.value.map(item => item.code);
    if (desiredCodes.includes(item.code) === false) {
        return useSnackbar(true, "error", "Invalid Dept Code, refer to help code.");
    }

    const matchingRevenue = revenue_code_data.value.find(revenue => revenue.code === item.code);
    if (matchingRevenue) {
        item.drcr = matchingRevenue.drcr;
        item.lgrp = matchingRevenue.lgrp;
    } else {
        item.drcr = "";
        item.lgrp = "";
    }

    user_input_revenue_code.value = item.code;
    if(item.code && !item.map_item_id && !item.exam_description){

        open_charges_list.value = true;
        let charges = Charges.value.filter(function (obj) {
            return obj.code !== '' && obj.map_item_id !== '' && obj.exam_description !== '';
        });
        let resultArray = charges.filter(item => item.code.toUpperCase() === lastRow.code.toUpperCase()).map(item => item.map_item_id);
        chargecode.value = resultArray;
    }
    if(item.code && item.map_item_id && item.exam_description){
        const isItemCodeAndRevenueAlreadyExists = Charges.value.slice(0, index).some(row => row.map_item_id === lastRow.map_item_id && row.code === lastRow.code);
            if(!isItemCodeAndRevenueAlreadyExists){
                Charges.value.push({
                    code: "",
                    map_item_id: "",
                    exam_description: "",
                    charge_type: 1,
                    specimen: "",
                    quantity: 1,
                    price: 0,
            });
            if (lastRow) {
                lastRow.isReadonly = true;
                lastRow.isDelete = true;
                lastRow.isAdd = true;
            }
        }
        nextTick(() => {
            focusChargeTransaction(index);
        })
    }
};

const removeChargeItem = (selectedItem) => {
    Charges.value = Charges.value.filter(item => !(item.map_item_id === selectedItem.map_item_id && item.code === selectedItem.code));
}

const removePFItem = (selectedItem) => {
    const indexToRemove = DoctorCharges.value.findIndex(item => item.doctor_code === selectedItem.doctor_code && item.code === selectedItem.code);
    if (indexToRemove !== -1) {
        DoctorCharges.value.splice(indexToRemove, 1);
    }
};


const focusChargeTransaction = (index) => {
    const inputs = document.querySelectorAll('.charge-focus');
    const transactionCodeInput = inputs[(index + 1) * 7];
    if (transactionCodeInput) {
        transactionCodeInput.focus();
    }
};

const focusPFTransaction = (index) => {
    const inputs = document.querySelectorAll('.pf-focus');
    const transactionCodeInput = inputs[(index + 1) * 4];
    if (transactionCodeInput) {
        transactionCodeInput.focus();
    }
};

const handleSelectedChargeItem = async (selected_item) => {
    const lastRow = Charges.value[Charges.value.length - 1];
    lastRow.map_item_id = selected_item.map_item_id;
    lastRow.exam_description = selected_item.exam_description;
    lastRow.price = selected_item.prices ? usePeso(selected_item.prices[0].price) : '0';
    lastRow.totalamount = selected_item.price;
    lastRow.barcode_prefix = selected_item?.sections?.barcodeid_prefix ? selected_item.sections.barcodeid_prefix : null;

    if (lastRow.map_item_id && lastRow.code === 'LB') {
        const response = await useMethod("get", "get-charges-specimen?map_item_id=", "", lastRow.map_item_id);
        if (response && response.data && response.data.length > 0) {
            lastRow.specimens = response.data.map(item => item.specimens) || [];
            lastRow.specimen = lastRow.specimens.length > 0 ? lastRow.specimens[0].id : '';
        } 
    } 
};

const handleAddProfessionalFee = (item, index) => {
    item.code  = "MD";
    const lastRow = DoctorCharges.value[DoctorCharges.value.length - 1];
    if (item.code && !item.doctor_code && !item.doctor_name) {
        open_professionals_list.value = true;
    }

    const matchingRevenue = revenue_code_data.value.find(revenue => revenue.code === item.code);
    if (matchingRevenue) {
        item.drcr = matchingRevenue.drcr;
        item.lgrp = matchingRevenue.lgrp;
    } else {
        item.drcr = "";
        item.lgrp = "";
    }

    if (item.code && item.doctor_code && item.doctor_name) {
        DoctorCharges.value.push({
            code: "MD",
            doctor_code: "",
            doctor_name: "",
            amount: null,
        });
        if (lastRow) {
            lastRow.isReadonly = true;
            lastRow.isDelete = true;
            lastRow.isAdd = true;
        }
    }
    nextTick(() => {
        focusPFTransaction(index);
    })
}

const handleSelectedProfessionalFee = (selected_item) => {
    const lastRow = DoctorCharges.value[DoctorCharges.value.length - 1];
    lastRow.doctor_code = selected_item.doctor_code;
    lastRow.doctor_name = selected_item.doctor_name;
    closeProfessionalsList();
}

const closeProfessionalsList = () => {
    open_professionals_list.value = false;
};

const closeChargesList = () => {
    open_charges_list.value = false;
};
const onPrint = async () => {
    if (selected_charges.value.length > 0) { 
        printCharges(payload.value, selected_charges.value);
    } else if (selected_cash_assessment.value.length > 0) {
        printCashAssessment(payload.value, selected_cash_assessment.value);
    } 
}

const printCharges = (payload, charges) => {
    const newWindow = window.open('', '_blank', 'width=900,height=750');
    if (newWindow) {
        const app = createApp(ChargeReports, {
            payload: payload,
            charges: charges,
        });
        app.mount(newWindow.document.body);
        nextTick(() => {
            newWindow.print();
            newWindow.onafterprint = () => {
                newWindow.close();
            }
        });
    }
}

const printCashAssessment = (payload, charges) => {
    const newWindow = window.open('', '_blank', 'width=900,height=750');
    if (newWindow) {
        const app = createApp(CashAssessmentReports, {
            payload: payload,
            charges: charges,
        });
        app.mount(newWindow.document.body);
        nextTick(() => {
            newWindow.print();
            newWindow.onafterprint = () => {
                newWindow.close();
            }
        });
    }
}

const confirmCharge = () => {
    let charges = Charges.value.filter(obj => obj.code !== '');
    let doctorcharges = DoctorCharges.value.filter(obj => obj.doctor_code !== '');
    if (doctorcharges.map(item => item.amount).includes(null)) {
        isLoadingBtn.value = false;
        return useSnackbar(true, "error", "Please input amount for professional fees.");
    }
    if (charges.length === 0 && doctorcharges.length === 0) {
        isLoadingBtn.value = false;
        return useSnackbar(true, "error", "Please add charges or professional fees.");
    }
    chargeconfirmation.value = true;
    payload.value.Charges = charges;
    payload.value.DoctorCharges = doctorcharges;
}


const onSubmit = async (user_details) => {
    // if (user_details.user_passcode === usePasscode()) {
    //     isLoadingBtn.value = true;
        if (payload.value.charge_to === "Company / Insurance") {
            try {
                credit_limit.value = payload.value.guarantor_Credit_Limit === 'OPEN' ? null : parseFloat(payload.value.guarantor_Credit_Limit.replace(/[^0-9.-]+/g, ''));
                if (credit_limit.value != null && patientExcessAmount.value > credit_limit.value) {
                    let excessAmount = patientExcessAmount.value - credit_limit.value;
                    const confirmCharge = window.confirm(`Credit limit exceeded for a total of ${usePeso(excessAmount)}. Do you want to continue?`);
                    if (!confirmCharge) {
                        isLoadingBtn.value = false;
                        closeConfirmCharge();
                    } else {
                        payload.value.msc_price_scheme_id = 2;
                        let response = await useMethod("post", "post-his-charge", payload.value);
                        if (response) {
                            useSnackbar(true, "success", `Charges posted successfully but with excess amount of ${usePeso(excessAmount)}`);
                            closeDialog();
                            closeConfirmCharge();
                            printCharges(payload.value, response.data.charges);
                        } else {
                            if (error.response && error.response.status === 404) {
                                useSnackbar(true, "error", 'Incorrect Username or Passcode');
                                isLoading.value = false;
                            } else {
                                return useSnackbar(true, "error", "Failed to post charges.");
                            }
                        }
                    }
                } else {
                    payload.value.msc_price_scheme_id = 2;
                    let response = await useMethod("post", "post-his-charge", payload.value);
                    if (response) {
                        useSnackbar(true, "success", "Charges posted successfully.");
                        closeDialog();
                        closeConfirmCharge();
                        printCharges(payload.value, response.data.charges);
                    } else {
                        if (error.response && error.response.status === 404) {
                            useSnackbar(true, "error", 'Incorrect Username or Passcode');
                            isLoading.value = false;
                        } else {
                            return useSnackbar(true, "error", "Failed to post charges.");
                        }
                    }
                } 
            } catch (error) {
                if (error.response && error.response.status === 404) {
                        useSnackbar(true, "error", 'Incorrect Username or Passcode');
                        isLoading.value = false;
                } else {
                    return useSnackbar(true, "error", "CATCH ERROR: Call IT Department");
                }

            } finally {
                isLoadingBtn.value = false;
            }
        } else {
            try {
                payload.value.msc_price_scheme_id = 1;
                let response = await useMethod("post", "post-cash-assessment", payload.value);
                if (response) {
                    useSnackbar(true, "success", "Charges posted successfully.");
                    closeDialog();
                    closeConfirmCharge();
                    printCashAssessment(payload.value, response.data.charges);
                } else {
                    if (error.response && error.response.status === 404) {
                        useSnackbar(true, "error", 'Incorrect Username or Passcode');
                        isLoading.value = false;
                    } else {
                        return useSnackbar(true, "error", "Failed to post charges.");
                    }
                }
            } catch (error) {
                if (error.response && error.response.status === 404) {
                        useSnackbar(true, "error", 'Incorrect Username or Passcode');
                        isLoading.value = false;
                } else {
                    return useSnackbar(true, "error", "CATCH ERROR: Call IT Department");
                }
                return useSnackbar(true, "error", "CATCH ERROR: Call IT Department");
            } finally {
                isLoadingBtn.value = false;
            }
        }
    // } else {
    //     return useSnackbar(true, "error", "Password incorrect.");
    // }
};

const closeConfirmCharge = () => {
    chargeconfirmation.value = false;
}

const confirmRevoke = () => {
    if (selected_charges.value.length > 0 || selected_cash_assessment.value.length > 0) {
        revokeconfirmation.value = true;
    } else {
        return useSnackbar(true, "error", "Please select charges to revoke.");
    }
}
const onRevoke = async (user_details) => {
    if (user_details.user_passcode !== usePasscode()) {
        return useSnackbar(true, "error", "Password incorrect.");
    } else {
        switch(charge_history_tab.value || pf_history_tab.value) {
            case "0":
                revokeSelectedCharges(selected_charges.value);
                break;
            case "1":
                revokeSelectedCashAssessment(selected_cash_assessment.value);
                break;
        }
    }
}

const revokeSelectedCharges = async (charges) => {
    try {
        const response = await fetch(useApiUrl() + "/revoke-his-charge", {
            method: "put",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + useToken()
            },
            body: JSON.stringify({ items: charges })
        });
        if (response) {
            useSnackbar(true, "success", "Charges revoked successfully.");
            closeConfirmRevoke();
            getChargesHistory();
            getProfFeeHistory();
        } else {
            return useSnackbar(true, "error", "Failed to revoke charges.");
        }
    } catch (error) {
        return useSnackbar(true, "error", "Failed to revoke charges.");
    }
}

const revokeSelectedCashAssessment = async (charges) => {
    try {
        const response = await fetch(useApiUrl() + "/revoke-cash-assessment", {
            method: "put",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + useToken()
            },
            body: JSON.stringify({ items: charges })
        });
        if (response) {
            useSnackbar(true, "success", "Charges revoked successfully.");
            closeConfirmRevoke();
            getCashAssessmentHistory();
            getCashProfHistory();
        } else {
            if (error.response && error.response.status === 404) {
                useSnackbar(true, "error", 'Incorrect Username or Passcode');
                isLoading.value = false;
            } else {
                return useSnackbar(true, "error", "Failed to revoke charges.");
            }
        }
    } catch (error) {
        if (error.response && error.response.status === 404) {
                useSnackbar(true, "error", 'Incorrect Username or Passcode');
                isLoading.value = false;
            } else {
                return useSnackbar(true, "error", "Failed to revoke charges.");
            }
    }
}

const closeConfirmRevoke = () => {
    revokeconfirmation.value = false;
    selected_charges.value = [];
    selected_cash_assessment.value = [];
}


const getChargesHistory = async () => {
    try {
        const charges_res = await fetch(useApiUrl() + "/post-charge-history", {
            method: "post",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + useToken()
            },
            body: JSON.stringify({
                patient_Id: payload.value.patient_Id,
                case_No: payload.value.case_No,
                code: '',
            })
        });

        const responseData = await charges_res.json();
        if (charges_res.ok) {
            charges_history_data.value = responseData.data;
        } else {
            return useSnackbar(true, "error", "No data found.");
        }
    } catch (error) {
        return useSnackbar(true, "error", "Failed to fetch charges history.");
    }
}

const getCashAssessmentHistory = async () => {
    try {
        const cash_assessment_res = await fetch(useApiUrl() + "/cash-assessment-history", {
            method: "post",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + useToken()
            },
            body: JSON.stringify({
                patient_Id: payload.value.patient_Id,
                case_No: payload.value.case_No,
                code: '',
            })
        });

        const responseData = await cash_assessment_res.json();
        if (cash_assessment_res.ok) {
            cash_assessment_history.value = responseData.data;
        } else {
            return useSnackbar(true, "error", "No data found.");
        }
    } catch (error) {
        return useSnackbar(true, "error", "Failed to fetch cash assessment history.");
    }
}

const getProfFeeHistory = async () => {
    try {
        const prof_fees_res = await fetch(useApiUrl() + "/post-charge-history", {
            method: "post",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + useToken()
            },
            body: JSON.stringify({
                patient_Id: payload.value.patient_Id,
                case_No: payload.value.case_No,
                code: 'MD',
            })
        });

        const responseData = await prof_fees_res.json();
        if (prof_fees_res.ok) {
            professional_fees_history.value = responseData.data;
        } else {
            return useSnackbar(true, "error", "No data found.");
        }
    } catch (error) {
        return useSnackbar(true, "error", "Failed to fetch professional history.");
    }
}

const getCashProfHistory = async () => {
    try {
        const cash_assessment_res = await fetch(useApiUrl() + "/cash-assessment-history", {
            method: "post",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + useToken()
            },
            body: JSON.stringify({
                patient_Id: payload.value.patient_Id,
                case_No: payload.value.case_No,
                code: 'MD',
            })
        });

        const responseData = await cash_assessment_res.json();
        if (cash_assessment_res.ok) {
            cash_prof_fee_history.value = responseData.data;
        } else {
            return useSnackbar(true, "error", "No data found.");
        }
    } catch (error) {
        return useSnackbar(true, "error", "Failed to fetch cash assessment history.");
    }
}

const closeDialog = () => {
    emits('close-dialog');
    panel.value = [0, 1];
    Charges.value = [
        {
            code: "",
            map_item_id: "",
            exam_description: "",
            charge_type: 1,
            specimen: "",
            quantity: 1,
            price: 0,
        }
    ];
    DoctorCharges.value = [
        {
            code: "MD",
            doctor_code: "",
            doctor_name: "",
            amount: null,
        }
    ];
    selected_charges.value = [];
    selected_cash_assessment.value = [];
    totalAmount.value = null;
    totalHistoryAmount.value = null;
    credit_limit.value = null;
    payload.value.charge_to = payload.value.account;
}

watchEffect(() => {
    charge_history_tab.value = payload.value.account == 'Company / Insurance' ? "0" : "1";
    pf_history_tab.value = payload.value.account == 'Company / Insurance' ? "0" : "1";
    if (payload.value.account == 'Self-Pay') {
        payload.value.charge_to = 'Self-Pay';
    } else {
        payload.value.charge_to = 'Company / Insurance';
    }
})

// const pendingStatus = await useStatus("Pending");
onUpdated(() => {
    // if (pendingStatus && pendingStatus.length > 0) {
    //     payload.value.status = pendingStatus[0].id;
    // }
    // Forda display
    payload.value.patient_Name = selectedRowDetails.value.lastname + ', ' + selectedRowDetails.value.firstname + ' ' + selectedRowDetails.value.middlename || '';
    payload.value.patient_Id = selectedRowDetails.value.patient_Id || '';
    payload.value.civil_status = selectedRowDetails.value.civil_status && selectedRowDetails.value.civil_status.civil_status_description || '';
    payload.value.sex = selectedRowDetails.value.sex && selectedRowDetails.value.sex.sex_description || '';
    payload.value.birthdate = useDateMMDDYYY(selectedRowDetails.value.birthdate) || '';
    payload.value.age = selectedRowDetails.value.age || '';
    payload.value.case_No = selectedRowDetails.value.patient_registry && selectedRowDetails.value.patient_registry[0].case_No || '';
    payload.value.account = selectedRowDetails.value.patient_registry && selectedRowDetails.value.patient_registry[0].mscPrice_Schemes == 1 ? "Self-Pay" : "Company / Insurance";
    payload.value.registry_Date = selectedRowDetails.value.patient_registry && useDateMMDDYYY(selectedRowDetails.value.patient_registry[0].registry_Date) || '';
    payload.value.attending_Doctor = selectedRowDetails.value.patient_registry && selectedRowDetails.value.patient_registry[0].attending_Doctor || 'N/A';
    payload.value.attending_Doctor_fullname = selectedRowDetails.value.patient_registry && selectedRowDetails.value.patient_registry[0].attending_Doctor_fullname || 'N/A';
    payload.value.guarantor_Id = selectedRowDetails.value.patient_registry && selectedRowDetails.value.patient_registry[0].guarantor_Id || payload.value.patient_Id;
    payload.value.guarantor_Name = selectedRowDetails.value.patient_registry && selectedRowDetails.value.patient_registry[0].guarantor_Name || 'PERSONAL';
    payload.value.guarantor_Credit_Limit = selectedRowDetails.value.patient_registry 
            && selectedRowDetails.value.patient_registry[0].guarantor_Credit_Limit !== null 
            && selectedRowDetails.value.patient_registry[0].guarantor_Credit_Limit !== undefined
            ? usePeso(selectedRowDetails.value.patient_registry[0].guarantor_Credit_Limit) 
            : "OPEN";

    // Charges history
    if (payload.value.patient_Id && payload.value.case_No) {
        getChargesHistory();
        getProfFeeHistory();
        getCashAssessmentHistory();
        getCashProfHistory(); 
    }
})

onMounted(() => {
    getRevenueCode();
});
</script>

<style scoped>
:deep(.v-expansion-panel-text__wrapper) {
    padding: 0 !important;
}
.styled-table th, .styled-table td {
    padding: 8px;
    border: 1px solid #eceaea;
    margin: 0;
}
.input {
    border-bottom: 1px solid #A9A9A9;
    padding: 4px 8px;
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
    border-radius: 10px; 
}
.empty-history-info {
    text-align: center;
    font-style: italic;
    padding: 20px 0 20px 0;
    font-size: 17.5px;
    font-weight: 500;
}
</style>