<template>
    <v-dialog :model-value="show" rounded="lg" scrollable @update:model-value="closeDialog" max-width="1120px">    
        <v-card rounded="lg">
            <v-toolbar density="compact" color="#107bac" hide-details>
                <v-toolbar-title>Medicine / Supply Charges to Patient's Account</v-toolbar-title>
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
                            Post Medicine Transactions
                            <v-spacer></v-spacer>
                            <v-btn class="mr-4" density="compact">
                                <v-icon>mdi-help-circle-outline</v-icon>
                                &nbsp; View Help Code
                                <v-menu activator="parent">
                                    <v-list>
                                    <v-list-item
                                        v-for="(item, index) in medicine_revenue_data"
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
                                        <th>Code</th>
                                        <th>Item Description</th>
                                        <th>Frequency</th>
                                        <th>On Hand Quantity</th> 
                                        <th>Request Quantity</th> 
                                        <th>Price ( each )</th> 
                                        <th>Amount</th>
                                        <th>Remarks</th>
                                        <th>STAT</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <template v-for="(item, index) in Medicines">
                                        <tr>
                                            <td> <input class="input medicine-focus" v-model="item.code" @keyup.enter="handleAddMedicine(item, index)" :readonly="item.isReadonly" /> </td>
                                            <td> <input class="input medicine-focus" v-model="item.item_name" @keyup.enter="handleAddMedicine(item, index)" readonly /> </td>
                                            <td> <input class="input medicine-focus" v-model="item.frequency_description" @keyup.enter="openFrequencyList" readonly /> </td> 
                                            <td> <input class="input medicine-focus" v-model="item.item_OnHand" @keyup.enter="handleAddMedicine(item, index)" readonly /> </td>
                                            <td> 
                                                <input 
                                                    class="input medicine-focus" 
                                                    v-model="item.quantity" 
                                                    @input="updateAmount(item)"
                                                /> 
                                            </td>
                                            <td> <input class="input medicine-focus" v-model="item.price" readonly /> </td>
                                            <td> <input class="input medicine-focus" v-model="item.amount" readonly /> </td>
                                            <td> <input class="input medicine-focus" v-model="item.remarks" /> </td>
                                            <td>
                                                <select class="input medicine-focus" v-model="item.stat">
                                                    <option value="1">Routine</option>
                                                    <option value="2">Stat</option>
                                                </select>
                                            </td>
                                            <td v-if="!item.isAdd" class="cursor-pointer" ><v-icon @click="handleAddMedicine(item, index)" color="primary">mdi-plus-box</v-icon></td>
                                            <td v-if="item.isDelete" class="cursor-pointer"><v-icon @click="removeMedicineItem(item)" color="red">mdi-delete</v-icon></td> 
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
                        <v-expansion-panel-title color="#107bac">
                            Post Supplies Transactions
                            <v-spacer></v-spacer>
                            <v-btn class="mr-4" density="compact">
                                <v-icon>mdi-help-circle-outline</v-icon>
                                &nbsp; View Help Code
                                <v-menu activator="parent">
                                    <v-list>
                                    <v-list-item
                                        v-for="(item, index) in supplies_revenue_data_display"
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
                                        <th>Code</th>
                                        <th>Item Description</th>
                                        <th>On Hand Quantity</th> 
                                        <th>Request Quantity</th> 
                                        <th>Price ( each )</th> 
                                        <th>Amount</th>
                                        <th>Remarks</th>
                                        <th>STAT</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <template v-for="(item, index) in Supplies">
                                        <tr>
                                            <td> <input class="input supplies-focus" v-model="item.code" @keyup.enter="handleAddSupplies(item, index)" :readonly="item.isReadonly" /> </td>
                                            <td> <input class="input supplies-focus" v-model="item.item_name" @keyup.enter="handleAddSupplies(item, index)" readonly /> </td>
                                            <td> <input class="input supplies-focus" v-model="item.item_OnHand" @keyup.enter="handleAddSupplies(item, index)" readonly /> </td>
                                            <td> 
                                                <input 
                                                    class="input supplies-focus" 
                                                    v-model="item.quantity" 
                                                    @input="updateAmount(item)"
                                                /> 
                                            </td>
                                            <td> <input class="input supplies-focus" v-model="item.price" readonly /> </td>
                                            <td> <input class="input supplies-focus" v-model="item.amount" readonly /> </td>
                                            <td> <input class="input supplies-focus" v-model="item.remarks" /> </td>
                                            <td>
                                                <select class="input supplies-focus" v-model="item.stat">
                                                    <option value="1">Routine</option>
                                                    <option value="2">Stat</option>
                                                </select>
                                            </td>
                                            <td v-if="!item.isAdd" class="cursor-pointer" ><v-icon @click="handleAddSupplies(item, index)" color="primary">mdi-plus-box</v-icon></td>
                                            <td v-if="item.isDelete" class="cursor-pointer"><v-icon @click="removeSuppliesItem(item)" color="red">mdi-delete</v-icon></td> 
                                        </tr>
                                    </template>
                                </tbody>
                                <tfoot>
                                    <tr>
                                        <td colspan="5" class="text-right">Total Amount: </td>
                                        <td>{{ usePeso(totalAmount) }}</td>
                                    </tr>
                                </tfoot>
                            </v-table>
                        </v-expansion-panel-text>
                    </v-expansion-panel>
                    <v-expansion-panel>
                        <v-expansion-panel-title color="#107bac">
                            Posted Medicine / Supplies Transactions
                            <v-spacer></v-spacer>
                            <v-btn class="mr-4" density="compact">
                                <v-icon>mdi-help-circle-outline</v-icon>
                                <v-menu activator="parent">
                                    <v-list>
                                        <v-list-item>
                                            <div style="display: flex; align-items: center;">
                                                <span style="width: 10px; height: 10px; background-color: blue; margin-right: 10px;"></span>
                                                <v-list-item-title>Medicines</v-list-item-title>
                                            </div>
                                        </v-list-item>
                                        <v-list-item>
                                            <div style="display: flex; align-items: center;">
                                                <span style="width: 10px; height: 10px; background-color: red; margin-right: 10px;"></span>
                                                <v-list-item-title>Supplies</v-list-item-title>
                                            </div>
                                        </v-list-item>
                                    </v-list>
                                </v-menu>
                            </v-btn>
                        </v-expansion-panel-title>
                        <v-expansion-panel-text>
                            <v-tabs
                                v-model="history_tab"
                                color="primary"
                                >
                                    <v-tab value="0" v-if="payload.account == 'Company / Insurance'">Company / Insurance</v-tab>
                                    <v-tab value="1">Cash Assessment</v-tab>
                            </v-tabs>
                            <v-window v-model="history_tab">
                                <v-window-item value="0">
                                    <v-table density="compact" height="40vh" class="styled-table">
                                        <thead>
                                            <tr>
                                                <th></th>
                                                <th></th>
                                                <th>Ref #</th>
                                                <th>Item ID</th>
                                                <th>Item Description</th>
                                                <th>Frequency</th>
                                                <th>Quantity</th> 
                                                <th>Amount</th> 
                                                <th>STAT</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <template v-for="(item, index) in history_data_insurancesbasis" :key="index">
                                                <tr>
                                                    <td> 
                                                        <input 
                                                            type="checkbox"
                                                            :checked="isCheckedCharges(item)" 
                                                            @change="toggleSelectedCharge(item)"
                                                        />
                                                    </td>
                                                    <td>
                                                        <div 
                                                            :style="{ width: '10px', height: '15px', backgroundColor: item.dosage ? 'blue' : 'red', marginLeft: '10px' }"
                                                            :title="item.dosage ? 'Medicine' : 'Supply'">
                                                        </div>
                                                    </td>
                                                    <td> <input readonly :value="item.refNum ? item.refNum : item.requestNum" /> </td>
                                                    <td> <input readonly :value="item.itemID ? item.itemID : item.item_Id" /> </td>
                                                    <td> <input readonly :value="item.description ? item.description : item.requestDescription" /> </td>
                                                    <td> <input readonly :value="item.dosage ? item.dosage : 'Not Applicable' " /> </td>
                                                    <td> <input readonly :value="item.quantity ? parseInt(item.quantity) : parseInt(item.Quantity)" /> </td>
                                                    <td> <input readonly :value="usePeso(item.amount)" /> </td>
                                                    <td> <input readonly :value="item.stat == 1 || item.stat == null ? 'Routine' : item.stat == 2 ? 'Stat' : ''" /> </td>
                                                </tr>
                                            </template>
                                        </tbody>
                                    </v-table>
                                </v-window-item>
                                <v-window-item value="1">
                                    <v-table density="compact" height="40vh" class="styled-table">
                                        <thead>
                                            <tr>
                                                <th></th>
                                                <th></th>
                                                <th></th>
                                                <th>Ref #</th>
                                                <th>Item ID</th>
                                                <th>Item Description</th>
                                                <th>Frequency</th>
                                                <th>Quantity</th> 
                                                <th>Amount</th> 
                                                <th>STAT</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <template v-for="(item, index) in history_data_cashbasis" :key="index">
                                                <tr>
                                                    <td> 
                                                        <input 
                                                            type="checkbox"
                                                            :checked="isCheckedCharges(item)" 
                                                            @change="toggleSelectedCharge(item)"
                                                        />
                                                    </td>
                                                    <td>
                                                        <div 
                                                            :style="{ width: '10px', height: '15px', backgroundColor: item.dosage ? 'blue' : 'red', marginLeft: '10px' }"
                                                            :title="item.dosage ? 'Medicine' : 'Supply'">
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <span v-if="item.source != null">
                                                            <v-chip color="green" v-if="item.source == 'NurseLogBook'">Paid</v-chip>
                                                            <v-chip color="red" v-else>Unpaid</v-chip>
                                                        </span>
                                                    </td>
                                                    <td> <input readonly :value="item.refNum ? item.refNum : item.requestNum" /> </td>
                                                    <td> <input readonly :value="item.itemID ? item.itemID : item.item_Id" /> </td>
                                                    <td> <input readonly :value="item.description ? item.description : item.requestDescription" /> </td>
                                                    <td> <input readonly :value="item.dosage ? item.dosage : 'Not Applicable' " /> </td>
                                                    <td> <input readonly :value="item.quantity ? parseInt(item.quantity) : parseInt(item.Quantity)" /> </td>
                                                    <td> <input readonly :value="usePeso(item.amount)" /> </td>
                                                    <td> <input readonly :value="item.stat == 1 || item.stat == null ? 'Routine' : item.stat == 2 ? 'Stat' : ''" /> </td>
                                                </tr>
                                            </template>
                                        </tbody>
                                    </v-table>
                                </v-window-item>
                            </v-window>
                        </v-expansion-panel-text>
                    </v-expansion-panel>
                </v-expansion-panels>
            </v-card-text>
            <v-divider></v-divider>
            <v-card-actions>
                <v-btn color="blue-darken-1 border border-info" @click="closeDialog"> Close </v-btn>
                <v-btn class="text-white bg-error" @click="confirmRevoke">Revoke Charge</v-btn>
                <v-spacer></v-spacer>
                <v-btn class="bg-primary text-white" @click="confirmCharge"> Save Entry </v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>

    <v-dialog :model-value="warning_cannot_be_revoked" rounded="lg" max-width="450px" @update:model-value="closeWarningDialog">
        <v-card elevation="4" rounded="lg">
            <v-toolbar density="compact" color="red" hide-details>
                <v-toolbar-title>
                    <v-icon size="25">mdi-alert</v-icon> WARNING
                </v-toolbar-title>
                <v-spacer></v-spacer>
                <v-btn color="white" @click="closeWarningDialog">
                    <v-icon>mdi-close</v-icon>
                </v-btn>
            </v-toolbar>
            <v-card-text>
                <h2 style="text-align: left;">
                    CAN'T REVOKED ITEMS THAT HAS BEEN PAID! CONTACT CASHIER INSTEAD TO CANCEL
                    <span style="color: red;">ORNUMBER</span>
                </h2>
            </v-card-text>
        </v-card>
    </v-dialog>

    <snackbar />

    <list-of-items 
        :open_items_list="open_items_list_for_medicines" 
        :patienttype="payload.charge_to === 'Self-Pay' ? 1 : 2"
        :user_input_revenue_code="user_input_revenue_code"
        :warehouse_id="selectedWarehouseID"
        :itemcodes="itemcodes"
        @handle-select="(selected_item) => handleSelectedItem(selected_item, 'medicines')" 
        @close-dialog="closeItemsDialogForMedicines" 
    />

    <list-of-items 
        :open_items_list="open_items_list_for_supplies" 
        :patienttype="payload.charge_to === 'Self-Pay' ? 1 : 2"
        :user_input_revenue_code="user_input_revenue_code"
        :warehouse_id="selectedWarehouseID"
        :itemcodes="itemcodes"
        @handle-select="(selected_item) => handleSelectedItem(selected_item, 'supplies')" 
        @close-dialog="closeItemsDialogForSupplies" 
    />

    <list-of-frequency 
        :open_frequency_list="open_frequency_list"
        @handle-select="handleSelectedFrequency"
        @close-dialog="closeFrequencyList"
    />

    <Confirmation 
        :show="chargeconfirmation"
        :payload="payload"
        :loading="isLoadingBtn"
        :error_msg="error_msg"
        @submit="onSubmit"
        @close="closeConfirmation"
    />

    <Confirmation 
        :show="revokeconfirmation"
        :payload="payload"
        :loading="isLoadingBtn"
        :error_msg="error_msg"
        @submit="onRevoke"
        @close="closeConfirmRevoke"
    />
</template>

<script setup>
import ListOfItems from './OPDListOfItems.vue';
import ListOfFrequency from './OPDFrequencyList.vue';

const props = defineProps({
    show: {
        type: Boolean,
        default: () => false,
    },
})

const { selectedRowDetails } = storeToRefs(useSubcomponentSelectedRowDetailsStore()); 
const emits = defineEmits(['close-dialog'])

let panel = ref([0, 1]);
const payload = ref({});
const chargecode = ref([]);
const chargeconfirmation = ref(false);
const revokeconfirmation = ref(false);
const isLoadingBtn = ref(false);
const error_msg = ref('');
const user_attempts = ref(0);
const open_items_list_for_medicines = ref(false);
const open_items_list_for_supplies = ref(false);
const open_frequency_list = ref(false);
const user_input_revenue_code = ref('');
const warning_cannot_be_revoked = ref(false);
const charge_to = ref([
    { value: 1, text: "Self-Pay" },
    { value: 2, text: "Company / Insurance" }, 
]);
const credit_limit = ref(null);
const Medicines = ref([
    {
        code: "",
        item_name: "",
        frequency: "",
        item_OnHand: "",
        item_ListCost: "",
        quantity: "",
        price: "",
        amount: "",
        remarks: "",
        stat: 1,
        warehouse_id: "",
    }
]);
const Supplies = ref([
    {
        code: "",
        item_name: "",
        item_OnHand: "",
        item_ListCost: "",
        quantity: "",
        price: "",
        amount: "",
        remarks: "",
        warehouse_id: "",
        stat: 1,
    }
]);

const medicine_revenue_data = ref([]);
const medicine_revenue_data_display = ref([]);
const supplies_revenue_data = ref([]);
const supplies_revenue_data_display = ref([]);
const selectedWarehouseID = ref(null); 
const selected_charge_item = ref([]);
const itemcodes = ref([]);
let history_tab = ref("0");
const getRevenueCode = async () => {
    const revenue_res = await useMethod("get", "get-transaction-codes", "", "");
    if (revenue_res) {
        const desiredCodes = useRevenueCode();
        if (desiredCodes && Array.isArray(desiredCodes)) {
            medicine_revenue_data.value = revenue_res.filter(item => {
                return item.id 
                    && item.isMedicine == "1"
                    && desiredCodes.map(code => code.toString()).includes(item.id.toString());
            });
            supplies_revenue_data.value = revenue_res.filter(item => {
                return item.id 
                    && item.isSupplies == "1"
                    && desiredCodes.map(code => code.toString()).includes(item.id.toString());
            });

            if (medicine_revenue_data.value.length > 0 ) {
                selectedWarehouseID.value = medicine_revenue_data.value[0].warehouse_id;
            }
            if (supplies_revenue_data.value.length > 0) {
                selectedWarehouseID.value = supplies_revenue_data.value[0].warehouse_id;
            }

            medicine_revenue_data_display.value = medicine_revenue_data.value.map(item => {
                return { code: item.code, description: item.description }
            });
            supplies_revenue_data_display.value = supplies_revenue_data.value.map(item => {
                return { code: item.code, description: item.description }
            });
        } 
    } else {
        useSnackbar(true, "error", "Failed to get revenue codes.");
    }
};

const focusNextMedicine = (index) => {
    const inputs = document.querySelectorAll('.medicine-focus');
    const transactionCodeInput = inputs[(index + 1) * 9];
    if (transactionCodeInput) {
        transactionCodeInput.focus();
    }
};

const focusNextSupplies = (index) => {
    const inputs = document.querySelectorAll('.supplies-focus');
    const transactionCodeInput = inputs[(index + 1) * 8];
    if (transactionCodeInput) {
        transactionCodeInput.focus();
    }
};

const openFrequencyList = () => {
    open_frequency_list.value = true;
}

const handleAddMedicine = (item, index) => {
    item.code = item.code.toUpperCase();
    const lastRow = Medicines.value[Medicines.value.length - 1];
    if (!item.code) {
        return useSnackbar(true, "error", "Code Should not be empty.");
    }
    const desiredCodes = medicine_revenue_data.value.map(item => item.code);
    if (desiredCodes.includes(item.code) === false) {
        return useSnackbar(true, "error", "Invalid Code, refer to help code.");
    }

    const matchingRevenue = medicine_revenue_data.value.find(revenue => revenue.code === item.code);
    if (!matchingRevenue) return;
    selectedWarehouseID.value = matchingRevenue.warehouse_id;
    item.warehouse_id = matchingRevenue.warehouse_id;
    item.warehouse_medsys_id = matchingRevenue.warehouse_map_itemid;

    user_input_revenue_code.value = item.code;
    if(item.code && !item.map_item_id && !item.item_name) {

        open_items_list_for_medicines.value = true;
        let medicines = Medicines.value.filter(function (obj) {
            return obj.code !== '' && obj.map_item_id !== '' && obj.item_name !== '';
        });
        let resultArray = medicines.filter(item => item.code.toUpperCase() === lastRow.code.toUpperCase()).map(item => item.map_item_id);
        itemcodes.value = resultArray;
    }
    if(item.code && item.map_item_id && item.item_name) {
        const isItemCodeAndRevenueAlreadyExists = Medicines.value.slice(0, index).some(row => row.map_item_id === lastRow.map_item_id && row.code === lastRow.code);
            if(!isItemCodeAndRevenueAlreadyExists) {
                Medicines.value.push({
                    code: "",
                    item_name: "",
                    frequency_description: "", 
                    item_OnHand: "",
                    item_ListCost: "",
                    quantity: "",
                    amount: "",
                    remarks: "",
                    stat: 1,
                    warehouse_id: "",
                    warehouse_medsys_id: "",
            });
            if (lastRow) {
                lastRow.isReadonly = true;
                lastRow.isDelete = true;
                lastRow.isAdd = true;
            }
        }
        nextTick(() => {
            focusNextMedicine(index);
        })
    }
};

const handleAddSupplies = (item, index) => {
    item.code = item.code.toUpperCase();
    const lastRow = Supplies.value[Supplies.value.length - 1];
    if (!item.code) {
        return useSnackbar(true, "error", "Code Should not be empty.");
    }
    const desiredCodes = supplies_revenue_data.value.map(item => item.code);
    if (desiredCodes.includes(item.code) === false) {
        return useSnackbar(true, "error", "Invalid Code, refer to help code.");
    }

    const matchingRevenue = supplies_revenue_data.value.find(revenue => revenue.code === item.code);
    if (!matchingRevenue) return;
    selectedWarehouseID.value = matchingRevenue.warehouse_id;
    item.warehouse_id = matchingRevenue.warehouse_id;
    item.warehouse_medsys_id = matchingRevenue.warehouse_map_itemid;

    user_input_revenue_code.value = item.code;
    if(item.code && !item.map_item_id && !item.item_name) {

        open_items_list_for_supplies.value = true;
        let supplies = Supplies.value.filter(function (obj) {
            return obj.code !== '' && obj.map_item_id !== '' && obj.item_name !== '';
        });
        let resultArray = supplies.filter(item => item.code.toUpperCase() === lastRow.code.toUpperCase()).map(item => item.map_item_id);
        itemcodes.value = resultArray;
    }
    if(item.code && item.map_item_id && item.item_name) {
        const isItemCodeAndRevenueAlreadyExists = Supplies.value.slice(0, index).some(row => row.map_item_id === lastRow.map_item_id && row.code === lastRow.code);
            if(!isItemCodeAndRevenueAlreadyExists) {
                Supplies.value.push({
                    code: "",
                    warehouse_id: "",
                    item_name: "",
                    item_OnHand: "",
                    item_ListCost: "",
                    quantity: "",
                    amount: "",
                    remarks: "",
                    stat: 1,
                    warehouse_id: "",
                    warehouse_medsys_id: "",
            });
            if (lastRow) {
                lastRow.isReadonly = true;
                lastRow.isDelete = true;
                lastRow.isAdd = true;
            }
        }
        nextTick(() => {
            focusNextSupplies(index);
        })
    }
};

const handleSelectedItem = (selected_item, listType) => {
    if (listType === 'medicines') {
        const lastRow = Medicines.value[Medicines.value.length - 1];
        lastRow.map_item_id = selected_item.map_item_id;
        lastRow.item_name = selected_item.item_name + ' ' + selected_item.item_Description;
        lastRow.price = selected_item.ware_house_items ? usePeso(selected_item.ware_house_items[0].price) : '0';
        lastRow.item_OnHand = selected_item.ware_house_items ? parseInt(selected_item.ware_house_items[0].item_OnHand) : 'N/A';
        lastRow.item_ListCost = selected_item.ware_house_items ? parseInt(selected_item.ware_house_items[0].item_ListCost) : 'N/A';
    } else if (listType === 'supplies') {
        const lastRow = Supplies.value[Supplies.value.length - 1];
        lastRow.map_item_id = selected_item.map_item_id;
        lastRow.item_name = selected_item.item_name + ' ' + selected_item.item_Description;
        lastRow.price = selected_item.ware_house_items ? usePeso(selected_item.ware_house_items[0].price) : '0';
        lastRow.item_OnHand = selected_item.ware_house_items ? parseInt(selected_item.ware_house_items[0].item_OnHand) : 'N/A';
        lastRow.item_ListCost = selected_item.ware_house_items ? parseInt(selected_item.ware_house_items[0].item_ListCost) : 'N/A';
    }
};


const handleSelectedFrequency = (selected_item) => {
    const lastRow = Medicines.value[Medicines.value.length - 1];
    lastRow.frequency = selected_item.dosage_id; 
    lastRow.frequency_description = selected_item.description; 
};

const removeMedicineItem = (selectedItem) => {
    Medicines.value = Medicines.value.filter(item => !(item.map_item_id === selectedItem.map_item_id && item.code === selectedItem.code));
}

const removeSuppliesItem = (selectedItem) => {
    Supplies.value = Supplies.value.filter(item => !(item.map_item_id === selectedItem.map_item_id && item.code === selectedItem.code));
}

const closeItemsDialogForMedicines = () => {
    open_items_list_for_medicines.value = false;
}

const closeItemsDialogForSupplies = () => {
    open_items_list_for_supplies.value = false;
}

const closeFrequencyList = () => {
    open_frequency_list.value = false;
}

const updateAmount = (item) => {
    const cleanedPrice = item.price.replace(/[^\d.-]/g, ''); 
    const quantity = Number(item.quantity) || 0; 
    const price = Number(cleanedPrice) || 0; 
    item.amount = `₱ ${(quantity * price).toFixed(2)}`; 
}

const totalMedicineAmount = computed(() => {
    return Medicines.value.reduce((acc, item) => {
        const cleanAmount = typeof item.amount === 'string'
            ? parseFloat(item.amount.replace(/[^\d.-]/g, ''))
            : parseFloat(item.amount) || 0;
        return acc + (cleanAmount || 0);
    }, 0);
});

const totalSupplyAmount = computed(() => {
    return Supplies.value.reduce((acc, item) => {
        const cleanAmount = typeof item.amount === 'string'
            ? parseFloat(item.amount.replace(/[^\d.-]/g, ''))
            : parseFloat(item.amount) || 0;
        return acc + (cleanAmount || 0);
    }, 0);
});

// const chargeAmountHistory = computed(() => {
//     return charges_history_data.value ? charges_history_data.value.reduce((acc, item) => acc + parseFloat(item.net_amount), 0) : 0;
// });
// const cashAmountHistory = computed(() => {
//     return cash_assessment_history.value ? cash_assessment_history.value.reduce((acc, item) => acc + parseFloat(item.amount), 0) : 0;
// });
// const chargeProfFeeAmountHistory = computed(() => {
//     return professional_fees_history.value ? professional_fees_history.value.reduce((acc, item) => acc + parseFloat(item.net_amount), 0) : 0;
// });
// const cashProfFeeAmountHistory = computed(() => {
//     return cash_prof_fee_history.value ? cash_prof_fee_history.value.reduce((acc, item) => acc + parseFloat(item.amount), 0) : 0;
// });

// const totalHistoryAmount = computed(() => chargeAmountHistory.value + cashAmountHistory.value + chargeProfFeeAmountHistory.value + cashProfFeeAmountHistory.value);
const patientExcessAmount = computed(() => parseFloat((totalHistoryAmount.value ? totalAmount.value + totalHistoryAmount.value : totalAmount.value).toFixed(2)));

const totalAmount = computed(() => totalMedicineAmount.value + totalSupplyAmount.value);

const confirmCharge = () => {
    let medicines = Medicines.value.filter(obj => obj.code !== '');
    let supplies = Supplies.value.filter(obj => obj.code !== '');
    payload.value.Medicines = medicines;
    payload.value.Supplies = supplies;

    if (payload.value.Medicines.length === 0 && payload.value.Supplies.length === 0) {
        return useSnackbar(true, "error", "Please add medicine or supplies charges to proceed");
    } 

    for (const item of medicines) {
        const frequency = item.frequency || null;
        if (!frequency) {
            useSnackbar(true, "error", "Specify the Frequency before proceeding");
            return;
        }

        const quantity = parseInt(item.quantity) || 0;  
        if (quantity === 0) {
            useSnackbar(true, "error", "Specify the Quantity before proceeding");
            return;
        }   
        if (quantity > parseInt(item.item_OnHand)) {
            useSnackbar(true, "error", "Request Quantity can't be higher than Stocks On Hand");
            return;
        }
    }

    for (const item of supplies) {
        const quantity = parseInt(item.quantity) || 0;  
        if (quantity === 0) {
            useSnackbar(true, "error", "Specify the Quantity before proceeding");
            return;
        }   
        if (quantity > parseInt(item.item_OnHand)) {
            useSnackbar(true, "error", "Request Quantity can't be higher than Stocks On Hand");
            return;
        }
    }

    chargeconfirmation.value = true;
}

const onSubmit = async (user_details) => {
    if (user_details.user_passcode === usePasscode()) {
        try {
            isLoadingBtn.value = true;
            credit_limit.value = payload.value.guarantor_Credit_Limit == 'OPEN' ? null : parseFloat(payload.value.guarantor_Credit_Limit.replace(/[^0-9.-]+/g, ''));
            if (credit_limit.value != null && totalAmount.value > credit_limit.value) {
                let excessAmount = credit_limit.value;
                const confirmCharge = window.confirm(`Credit limit exceeded for a total of ${usePeso(excessAmount)}. Do you want to continue?`);
                if (!confirmCharge) {
                    isLoadingBtn.value = false;
                    closeConfirmation();
                } else {
                    const response = await useMethod("post", "charge-medicine-supplies", payload.value);
                    if (response) {
                        useSnackbar(true, "success", "Successfully posted charges.");
                        closeDialog();
                        closeConfirmation();
                    } else {
                        useSnackbar(true, "error", "Failed to post charges.");
                    }
                }
            } else {
                const response = await useMethod("post", "charge-medicine-supplies", payload.value);
                if (response) {
                    useSnackbar(true, "success", "Successfully posted charges.");
                    closeDialog();
                    closeConfirmation();
                } else {
                    useSnackbar(true, "error", "Failed to post charges.");
                }
            }
        } catch (error) {
            console.log(error);
            return useSnackbar(true, "error", "CATCH ERROR: Call IT Department");
        } finally {
            isLoadingBtn.value = false;
        }
    }  else {
        user_attempts.value += 1;
        useSnackbar(true, "error", "Password incorrect.");
        if (user_attempts.value == 5) {
            error_msg.value = "Too many wrong attempts, Please try again after 20 seconds.";
            isLoadingBtn.value = true;
            setTimeout(() => {
                isLoadingBtn.value = false;
                user_attempts.value = 0;
                error_msg.value = "";
            }, 20000);
        }
    }
};

const closeConfirmation = () => {
    chargeconfirmation.value = false;
}

const isCheckedCharges = (item) => {
    if (selected_charge_item.value.length === 0) return false;
    const isChecked = selected_charge_item.value.some(selectedItem => 
        selectedItem.id === item.id && selectedItem.charge_type === payload.value.charge_to
    );
    return isChecked;
};


const toggleSelectedCharge = (item) => {
    const isMedicine = item.dosage !== null;
    const chargeItem = { 
        ...item, 
        charge_type: payload.value.charge_to,
        item_type: isMedicine ? "Medicine" : "Supplies", 
    };

    if (selected_charge_item.value.some(selectedItem => selectedItem.id === chargeItem.id && selectedItem.charge_type === chargeItem.charge_type)) {
        selected_charge_item.value = selected_charge_item.value.filter(i => 
            !(i.id === chargeItem.id && i.charge_type === chargeItem.charge_type)
        );
    } else {
        selected_charge_item.value.push(chargeItem);
    }
};

const closeWarningDialog = () => {
    selected_charge_item.value = []; 
    warning_cannot_be_revoked.value = false;
}

const confirmRevoke = () => {
    if (selected_charge_item.value.map(item => item.source).includes("NurseLogBook") && selectedRowDetails.value.patient_registry[0].mscPrice_Schemes == 1) {
        return warning_cannot_be_revoked.value = true;
    }

    if (selected_charge_item.value.length > 0) {
        revokeconfirmation.value = true;
    } else {
        return useSnackbar(true, "error", "Please select items to revoke.");
    }
}

const onRevoke = async (user_details) => {
    if (user_details.user_passcode !== usePasscode() && user_attempts.value < 5) {
        user_attempts.value += 1;
        useSnackbar(true, "error", "Password incorrect.");
    } else if (user_details.user_passcode !== usePasscode() && user_attempts.value == 5) {
        error_msg.value = "Too many wrong attempts, Please try again after 20 seconds.";
        isLoadingBtn.value = true;
        setTimeout(() => {
            isLoadingBtn.value = false;
            user_attempts.value = 0;
            error_msg.value = "";
        }, 20000);
    } else {
        const response = await fetch(useApiUrl() + "/revoke-medicine-supplies-charge", {
            method: "put",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + useToken()
            },
            body: JSON.stringify({ items: selected_charge_item.value })
        });
        if (response) {
            useSnackbar(true, "success", "Charges revoked successfully.");
            closeConfirmRevoke();
            getChargesHistory();
        } else {
            return useSnackbar(true, "error", "Failed to revoke charges.");
        }
    } 
}

const closeConfirmRevoke = () => {
    revokeconfirmation.value = false;
    user_attempts.value = 0;
    selected_charge_item.value = []; 
}

const closeDialog = () => {
    emits('close-dialog');
    panel.value = [0, 1];
    Medicines.value = [
        {
            code: "",
            item_name: "",
            frequency: "",
            item_OnHand: "",
            quantity: "",
            price: "",
            remarks: "",
            stat: "",
        }
    ];
    Supplies.value = [
        {
            code: "",
            item_name: "",
            item_OnHand: "",
            quantity: "",
            price: "",
            remarks: "",
            stat: "",
        }
    ]
}

const history_data_insurancesbasis = ref([]);
const history_data_cashbasis = ref([]); 
const getChargesHistory = async () => {
    try {
        const response = await fetch(useApiUrl() + "/get-medicine-supplies-charge-history", {
            method: "post",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + useToken()
            },
            body: JSON.stringify({
                patient_Id: payload.value.patient_Id,
                case_No: payload.value.case_No,
            })
        });

        const responseData = await response.json();
        if (response.ok) {
            // if the value of the return data souce is from "NurseLogBook" then it is 
        } else {
            return useSnackbar(true, "error", "No data found.");
        }
    } catch (error) {
        return useSnackbar(true, "error", "Failed to fetch charges history.");
    }
}

watchEffect(() => {
    if (payload.value.account == 'Self-Pay') {
        payload.value.charge_to = 'Self-Pay';
    } else {
        payload.value.charge_to = 'Company / Insurance';
    }
})

onUpdated(() => {
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

    if (payload.value.patient_Id && payload.value.case_No) {
        getChargesHistory();
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
</style>