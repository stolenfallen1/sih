<template>
    <v-dialog v-if="isDischarge !== null || isTagAsMgh !== null" :model-value="show" rounded="lg" scrollable @update:model-value="closeDialog" max-width="400px"> 
        <v-card
            color="red"
        >
            <v-card-title
                class="bg-error text-white"
            >
            Alert Message
            </v-card-title>
            <v-card-text>
                <v-alert
                    dismissible
                    elevation="24"
                    icon="mdi-alert-circle"
                >
                    <div class="note">
                        <span>Note:</span>
                        <p>
                            Can't post or request charges for patients that have been tagged for May Go Home (MGH) or have been discharged.
                        </p>
                    </div>
                </v-alert>
            </v-card-text>
            <v-card-actions
                class="bg-error text-white"
                elevation="24"
            >
                <v-spacer></v-spacer>
                <v-btn 
                    bg-color="primary" text
                    @click="CloseAlertMessageDialog">Close</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
    <v-dialog v-if="isDischarge === null && isTagAsMgh === null" :model-value="show" rounded="lg" scrollable @update:model-value="closeDialog" max-width="1120px">    
        <v-card rounded="lg">
            <v-toolbar density="compact" color="#107bac" hide-details>
                <v-toolbar-title>List Of Items Medicines / Supplies Entry</v-toolbar-title>
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
                                        <th>Selling Price</th>
                                        <th>Quantity</th> 
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
                                            <td> <input 
                                                    class="input medicine-focus" 
                                                    v-model="item.frequency_description" 
                                                    @keyup.enter="openFrequencyList(index)" 
                                                    :class="{ 'error-border': item.frequencyError }" 
                                                    @input="clearError(item, 'frequency')"
                                                    readonly  
                                                /> 
                                            </td>
                                            <td> <input class="input medicine-focus" v-model="item.price" readonly /> </td>
                                            <td> <input 
                                                    class="input medicine-focus" 
                                                    v-model="item.quantity" 
                                                    @input="handleTotalMedicine(item, 'quantity')" 
                                                    :class="{ 'error-border': item.quantityError }" 
                                                /> 
                                            </td>
                                            <td> <input class="input medicine-focus" v-model="item.amount" readonly /> </td>
                                            <td> <input class="input medicine-focus" v-model="item.remarks" /> </td>
                                            <td>
                                                <select class="input medicine-focus" v-model="item.charge_type">
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
                                        <td colspan="4" class="text-right">Total Amount: </td>
                                        <td> {{ usePeso(totalAmount) }} </td>
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
                                        <th>Selling Price</th> 
                                        <th>Quantity</th> 
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
                                            <td> <input class="input supplies-focus" v-model="item.price" readonly /> </td>
                                            <td> <input class="input medicine-focus" v-model="item.quantity" @input="handleTotalSupply(item, 'quantity')" :class="{ 'error-border': item.quantityError }"  /> </td>
                                            <td> <input class="input medicine-focus" v-model="item.amount" readonly /> </td>
                                            <td> <input class="input supplies-focus" v-model="item.remarks" /> </td>
                                            <td>
                                                <select class="input supplies-focus" v-model="item.charge_type">
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
                                        <td colspan="4" class="text-right">Total Amount: </td>
                                        <td>{{ usePeso(totalSupplyAmount) }}</td>
                                    </tr>
                                </tfoot>
                            </v-table>
                        </v-expansion-panel-text>
                    </v-expansion-panel>

                    <v-expansion-panel>
                        <v-expansion-panel-title color="#107bac">
                            Posted Medicine
                        </v-expansion-panel-title>
                        <v-expansion-panel-text>
                            <v-data-table
                                :headers="medicineHeaders"
                                :items="chargeMedicineList"
                                :items-per-page="10"
                                class="elevation-1"
                                item-value="request_num"
                                height="48vh"
                                density="compact"
                                show-select
                                select-strategy="multiple"
                                v-model="selectedMedicineItems"
                                @update:modelValue="handleSelectionChangeMedicine"
                                >
                                <template v-slot:item.status="{ item }">
                                    <span :style="{ color: item.status === 'Paid' ? 'green' : item.status === 'Unpaid' ? 'orange' : 'red' }">
                                        {{ item.status }}
                                    </span>
                                </template>
                                <template v-slot:item.net_amount="{ item }">
                                    {{ usePeso(item.net_amount) }}
                                </template>
                                <template v-slot:footer>
                                    <tr>
                                        <td colspan="6" class="text-right">Total Amount:</td>
                                        <td>{{ usePeso(totalAmount) }}</td>
                                    </tr>
                                </template>
                            </v-data-table>
                        </v-expansion-panel-text>
                    </v-expansion-panel>

                    <v-expansion-panel>
                        <v-expansion-panel-title color="#107bac">
                            Posted Supply
                        </v-expansion-panel-title>
                        <v-expansion-panel-text>
                            <v-data-table
                                :items="chargeSupplyList" 
                                :headers="supplyHeaders" 
                                :items-per-page="10"
                                class="elevation-1"
                                item-value="request_num"
                                height="48vh"
                                density="compact"
                                show-select
                                select-strategy="multiple"
                                v-model="selectedSupplyItems"
                                @update:modelValue="handleSelectionChangeSupply"
                                >
                                <template v-slot:item.status="{ item }">
                                    <span :style="{ color: item.status === 'Paid' ? 'green' : item.status === 'Unpaid' ? 'orange' : 'red' }">
                                        {{ item.status }}
                                    </span>
                                </template>
                                <template v-slot:item.net_amount="{ item }">
                                    {{ usePeso(item.net_amount) }}
                                </template>
                                <template v-slot:footer>
                                    <tr>
                                        <td colspan="6" class="text-right">Total Amount:</td>
                                        <td>{{ usePeso(totalAmount) }}</td>
                                    </tr>
                                </template>
                            </v-data-table>
                        </v-expansion-panel-text>
                    </v-expansion-panel>
                </v-expansion-panels>
            </v-card-text>
            <v-card-actions>
                <v-btn color="blue-darken-1 border border-info" @click="closeDialog"> Close </v-btn>
                <v-btn 
                    class="bg-error text-white" 
                    :disabled="reference_id.value === 0" 
                    @click="openConfirmDialog"
                    > 
                    Cancel Charges 
                </v-btn>
                <v-spacer></v-spacer>
                <v-btn class="bg-primary text-white" @click="openConfirmDialog"> Save Entry </v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>

    <list-of-items 
        :open_items_list="open_items_list_for_medicines" 
        :patienttype="payload.charge_to === 'Self-Pay' ? 1 : 2"
        :payload="payload"
        :user_input_revenue_code="user_input_revenue_code"
        :warehouse_id="selectedWarehouseID"
        :chargecode="chargecode"
        @handle-select="(selected_item) => handleSelectedItem(selected_item, 'medicines')" 
        @close-dialog="closeItemsDialogForMedicines" 
    />

    <list-of-items 
        :open_items_list="open_items_list_for_supplies" 
        :patienttype="payload.charge_to === 'Self-Pay' ? 1 : 2"
        :payload="payload"
        :user_input_revenue_code="user_input_revenue_code"
        :warehouse_id="selectedWarehouseID"
        :chargecode="chargecode"
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
        @close="closeConfirmCharge"
    />

    <Confirmation 
        :show="revokeconfirmation"
        :payload="payload"
        :loading="isLoadingBtn"
        :error_msg="error_msg"
        @submit="onRevoke"
        @close="closeConfirmRevoke"
    />

    <Confirmation 
        :show="showDialog"
        :payload="payload"
        :loading="isLoading"
        @submit="onSubmit"
        @close="closeConfirmDialog"
    />

    <WarningDialog
        :showWarning="showWarning"
        @close="closeWarningDialog"
        @confirm="confirmCharges"
    />

</template>

<script setup>
    import ListOfItems from './ERListOfItems.vue';
    import ListOfFrequency from './ERFrequencyList.vue';
    import WarningChargeConfirmation from '~/components/reusables/WarningChargeConfirmation.vue';
    import ConsultantSpecializationForm from '~/components/reusables/build-file/consultant-specializations/sub-forms/ConsultantSpecializationForm.vue';

    const props = defineProps({
        show: {
            type: Boolean,
            default: () => false,
        },
    })

    const { selectedRowDetails } = storeToRefs(useSubcomponentSelectedRowDetailsStore()); 
    const emits = defineEmits(['close-dialog', 'post-charges', 'revoke-charges', 'patient-registered']);
    const isLoading = ref(false);
    const credit_limit = ref(null);
    let panel = ref([0, 1, 2, 3]);
    const payload = ref({
        reference_id: []
    });
    const chargecode = ref([]);
    const open_items_list_for_medicines = ref(false);
    const open_items_list_for_supplies = ref(false);
    const open_frequency_list = ref(false);
    const user_input_revenue_code = ref('');
    const isLoadingBtn = ref(false);
    const showDialog = ref(false);
    const showWarning = ref(false);
    const postCharges = ref([]);
    const charge_to = ref([
        { value: 1, text: "Self-Pay" },
        { value: 2, text: "Company / Insurance" }, 
    ]);

    const openConfirmDialog = async () => {
        if (Medicines.value.length > 0 && !validateMedicines()) {
            useSnackbar(
                true,
                "error",
                'Please fill up all required fields for medicines.'
            );
            return; 
        } 
        if (Supplies.value.length > 0 && !validateSupplies()) {
            useSnackbar(
                true,
                "error",
                'Please fill up all required fields for supplies.'
            );
            return; 
        }
        showDialog.value = true;
    }

    const closeConfirmDialog = () => {
        showDialog.value = false;
    }

    const Medicines = ref([
        {
            code: "",
            item_id: "",
            item_name: "",
            frequency: "",
            quantity: "",
            selling_price: "",
            amount: "",
            remarks: "",
            stat: "",
        }
    ]);

    const Supplies = ref([
        {
            code: "",
            item_id: "",
            item_name: "",
            frequency: "",
            selling_price: "",
            amount: "",
            remarks: "",
            stat: "",
        }
    ]);

    const medicine_revenue_data = ref([]);
    const medicine_revenue_data_display = ref([]);
    const supplies_revenue_data = ref([]);
    const supplies_revenue_data_display = ref([]);
    const selectedWarehouseID = ref(0); 

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
                if (medicine_revenue_data.value.length > 0) {
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
        const transactionCodeInput = inputs[(index + 1) * 8];
        if (transactionCodeInput) {
            transactionCodeInput.focus();
        }
    };

    const focusNextSupplies = (index) => {
        const inputs = document.querySelectorAll('.supplies-focus');
        const transactionCodeInput = inputs[(index + 1) * 6];
        if (transactionCodeInput) {
            transactionCodeInput.focus();
        }
    };

    const openFrequencyList = (rowIndex) => {
        currentRowIndex.value = rowIndex;
        open_frequency_list.value = true;
    }
    const currentRowIndex = ref(null);

    const handleFrequencySelect = (selected_item) => {
        handleSelectedFrequency(selected_item, currentRowIndex.value);
    };

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
        user_input_revenue_code.value = item.code;
        if(item.code && !item.map_item_id && !item.item_name) {
            open_items_list_for_medicines.value = true;
            let medicines = Medicines.value.filter(function (obj) {
                return obj.code !== '' && obj.map_item_id !== '' && obj.item_name !== '';
            });
            let resultArray = medicines.filter(item => item.code.toUpperCase() === lastRow.code.toUpperCase()).map(item => item.map_item_id);
            chargecode.value = resultArray;
        }

        if(item.code && item.map_item_id && item.item_name) {
            const isItemCodeAndRevenueAlreadyExists = Medicines.value.slice(0, index).some(row => row.map_item_id === lastRow.map_item_id && row.code === lastRow.code);
                if(!isItemCodeAndRevenueAlreadyExists) {
                    Medicines.value.push({
                        code: "",
                        item_id: "",
                        item_name: "",
                        frequency: "",
                        quantity: "",
                        amount: "",
                        remarks: "",
                        stat: "",
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
        user_input_revenue_code.value = item.code;
        if(item.code && !item.map_item_id && !item.item_name) {
            open_items_list_for_supplies.value = true;
            let supplies = Supplies.value.filter(function (obj) {
                return obj.code !== '' && obj.map_item_id !== '' && obj.item_name !== '';
            });
            let resultArray = supplies.filter(item => item.code.toUpperCase() === lastRow.code.toUpperCase()).map(item => item.map_item_id);
            chargecode.value = resultArray;
        }
        if(item.code && item.map_item_id && item.item_name) {
            const isItemCodeAndRevenueAlreadyExists = Supplies.value.slice(0, index).some(row => row.map_item_id === lastRow.map_item_id && row.code === lastRow.code);
                if(!isItemCodeAndRevenueAlreadyExists) {
                    Supplies.value.push({
                        code: "",
                        item_id: "",
                        item_name: "",
                        frequency: "",
                        quantity: "",
                        amount: "",
                        remarks: "",
                        stat: "",
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
            lastRow.item_id = selected_item.ware_house_items ? selected_item.ware_house_items[0].item_Id : '';
            lastRow.map_item_id = selected_item.map_item_id;
            lastRow.item_name = selected_item.item_name + ' ' + selected_item.item_Description;
            lastRow.price = selected_item.ware_house_items ? usePeso(selected_item.ware_house_items[0].price) : '0';
        } else if (listType === 'supplies') {
            const lastRow = Supplies.value[Supplies.value.length - 1];
            lastRow.item_id = selected_item.ware_house_items ? selected_item.ware_house_items[0].item_Id : '';
            lastRow.map_item_id = selected_item.map_item_id;
            lastRow.item_name = selected_item.item_name + ' ' + selected_item.item_Description;
            lastRow.price = selected_item.ware_house_items ? usePeso(selected_item.ware_house_items[0].price) : '0';
        }
    };

    //This function will validate if frequency and quantity is empty
    const validateSupplies = () => {
        let isValid = true;
        const validRows = Supplies.value.filter((item) => item.quantity || item.item_name);
        if (validRows.length === 0) {
            return true;
        }
        validRows.forEach((item) => {
            if (!item.quantity) {
                item.quantityError = true; 
                isValid = false;
            } else {
                item.quantityError = false; 
            }
        });
        return isValid;
    };

    const validateMedicines = () => {
        let isValid = true;
        const validRows = Medicines.value.filter((item) => item.frequency || item.quantity || item.item_name);
        if (validRows.length === 0) {
            return true;
        }
        validRows.forEach((item) => {
            if (!item.frequency) {
                item.frequencyError = true;
                isValid = false;
            } else {
                item.frequencyError = false;
            }
            if (!item.quantity) {
                item.quantityError = true; 
                isValid = false;
            } else {
                item.quantityError = false; 
            }
            });
        return isValid;
    };


    const clearError = (item, field) => {
        if (field === 'frequency' && item.frequency) {
            item.frequencyError = false; 
        }

        if (field === 'quantity' && item.quantity) {
            item.quantityError = false;
        }
    };

    const handleTotalMedicine = (item) => {
        console.log('Payload Medicines : ', payload.value);
        const itemStocks = payload.value.medicine_stocks_OnHand.find(
            (selectedItem) => parseInt(selectedItem.medicine_id) === parseInt(item.item_id)
        );
        if (!itemStocks) {
            console.error(`Stock not found for item ID: ${item.item_id}`);
            useSnackbar(
                true,
                "error",
                `No stock found for item ID: ${item.item_id}`
            );
            return;
        }
        if (!item.base_price) {
            item.base_price = parseFloat(item.price.replace(/[^0-9.-]+/g, ''));
        }
        const base_price = parseFloat(item.base_price) || 0;
        let quantity = parseInt(item.quantity) || 0; 
        const availableStock = parseFloat(itemStocks.medicine_stock) || 0;
        if (quantity > availableStock) {
            console.warn(
                `Insufficient stock! Entered: ${quantity}, Available: ${availableStock}`
            );
            useSnackbar(
                true,
                "error",
                `Insufficient stock for item ${item.item_id}. Only ${availableStock} units are available.`
            );
            quantity = availableStock;
            item.quantity = availableStock;
        }
        if (!isNaN(quantity) && !isNaN(base_price)) {
            item.amount = (quantity * base_price).toFixed(2);
        } else {
            item.amount = "0.00";
        }
        if (quantity <= availableStock) {
            calculateTotalAmountMedicine();
        }
    };

    const handleTotalSupply = (item) => {
        const itemStocks = payload.value.supply_stocks_OnHand.find(
            (selectedItem) => parseInt(selectedItem.supply_id) === parseInt(item.item_id)
        );
        if (!itemStocks) {
            console.error(`Stock not found for item ID: ${item.item_id}`);
            useSnackbar(
                true,
                "error",
                `No stock found for item ID: ${item.item_id}`
            );
            return;
        }
        if (!item.base_price) {
            item.base_price = parseFloat(item.price.replace(/[^0-9.-]+/g, ''));
        }
        const base_price = parseFloat(item.base_price) || 0;
        let quantity = parseInt(item.quantity) || 0; 
        const availableStock = parseFloat(itemStocks.supply_stock) || 0;
        if (quantity > availableStock) {
            console.warn(
                `Insufficient stock! Entered: ${quantity}, Available: ${availableStock}`
            );
            useSnackbar(
                true,
                "error",
                `Insufficient stock for item ${item.item_id}. Only ${availableStock} units are available.`
            );
            quantity = availableStock;
            item.quantity = availableStock;
        }
        if (!isNaN(quantity) && !isNaN(base_price)) {
            item.amount = (quantity * base_price).toFixed(2);
        } else {
            item.amount = "0.00";
        }
        if (quantity <= availableStock) {
            calculateTotalAmountSupply();
        }
    };


    const totalAmount = ref(0);
    const calculateTotalAmountMedicine = () => {
        totalAmount.value = 0;
        Medicines.value.forEach(item => {
            const itemAmount = parseFloat(item.amount) || 0; 
            (totalAmount.value += itemAmount).toFixed(2);
        });
    }

    const totalSupplyAmount = ref(0)
    const calculateTotalAmountSupply = () => {
        totalSupplyAmount.value = 0;
        Supplies.value.forEach(item => {
            const itemSupplyAmount = parseFloat(item.amount) || 0;
            (totalSupplyAmount.value += itemSupplyAmount).toFixed(2);
        })
    }

    const handleSelectedFrequency = (selected_item) => {
    if (currentRowIndex.value !== null) {
        const row = Medicines.value[currentRowIndex.value];
        if (row) {
            row.frequency = selected_item.dosage_id;
            row.frequency_description = selected_item.description;
        } else {
            console.error(`No row found at index: ${currentRowIndex.value}`);
        }
    } else {
        console.error("currentRowIndex is null or undefined");
    }
    open_frequency_list.value = false; // Close the dialog
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
    const reference_id = ref(0);
    const medsys_assess_id = ref(0);
    // const handleCancelCharges = async (request_id, assess_num) => {
    //     reference_id.value = request_id;
    //     medsys_assess_id.value = assess_num;
    //     openConfirmDialog()
            
    // }
    // const onSubmit = async () => {
    //     isLoading.value = true;
    //     isLoadingBtn.value = true;
        
    //     const medicines = Medicines.value.filter(obj => obj.code !== '');
    //     const supplies = Supplies.value.filter(obj => obj.code !== '');

    //     let flagMedicine = true;
    //     let flagSupply = true;

    //     payload.value.Medicines = medicines;
    //     payload.value.Supplies = supplies;
    //     payload.value.reference_id = reference_id.value;
    //     payload.value.medsys_AssessNum = medsys_assess_id.value;
    //     console.log('Payload: ', payload.value);
    //     try {
    //         if(parseInt(defineProcess.value) === 1) {
    //             await processCharges();
    //         } else {
    //             if (payload.value.medicine_stocks_OnHand !== undefined) {
    //                 const sufficient_mdecine_stocks = checkStockAvailability(payload.value.medicine_stocks_OnHand, medicines, 'medicine', (flag) => flagMedicine = flag);
    //                 console.log('Sufficient Medicine: ', sufficient_mdecine_stocks);
    //                 if(!sufficient_mdecine_stocks) {
    //                     useSnackbar(true, "error", 'Cannot charge, double-check item stocks for medicines or supplies.');
    //                     return;
    //                 }
    //             }
    //             if (payload.value.supply_stocks_OnHand !== undefined) {
    //                 const suficient_stocks_supply = checkStockAvailability(payload.value.supply_stocks_OnHand, supplies, 'supply', (flag) => flagSupply = flag);
    //                 console.log('Sufficient Supply: ', suficient_stocks_supply);
    //                 if(!suficient_stocks_supply) {
    //                     useSnackbar(true, "error", 'Cannot charge, double-check item stocks for medicines or supplies.');
    //                     return;
    //                 }
    //             }
    //             if (flagMedicine || flagSupply) {
    //                 if (payload.value.charge_to === "Company / Insurance") {
    //                     credit_limit.value = payload.value.guarantor_Credit_Limit === 'OPEN'
    //                         ? null
    //                         : parseFloat(payload.value.guarantor_Credit_Limit.replace(/[^0-9.-]+/g, ''));
    //                     if (credit_limit.value !== null && parseFloat(totalAmount.value) > credit_limit.value) {
    //                         if (confirm(`Insufficient credit limit! Total is ${totalAmount.value}, but your credit limit is only ${credit_limit.value}. Proceed anyway?`)) {
    //                             await processCharges();
    //                         } else {
    //                             useSnackbar(true, "warning", 'Charge process halted. Please review the items.');
    //                         }
    //                     } else {
    //                         await processCharges();
    //                     }
    //                 } else {
    //                     await processCharges();
    //                 }
    //             } else {
    //                 useSnackbar(true, "error", 'Cannot charge, double-check item stocks for medicines or supplies.');
    //             }
    //         }
    //     } catch (error) {
    //         handleErrorResponse(error);
    //     } finally {
    //         defineProcess.value = 0;
    //         isLoadingBtn.value = false;
    //         isLoading.value = false;
    //         clearFields();
    //         closeConfirmDialog();
    //     }
    // };

    const onSubmit = async () => {
        isLoading.value = true;
        isLoadingBtn.value = true;
        const medicines = Medicines.value.filter(obj => obj.code !== '');
        const supplies = Supplies.value.filter(obj => obj.code !== '');
        let flagMedicine = true;
        let flagSupply = true;
        payload.value.Medicines = medicines;
        payload.value.Supplies = supplies;
        payload.value.reference_id = reference_id.value;
        payload.value.medsys_AssessNum = medsys_assess_id.value;
        try {
            if (parseInt(defineProcess.value) === 1) {
                await processCharges();
            } else {
                if (flagMedicine && flagSupply) {
                    if (payload.value.charge_to === "Company / Insurance") {
                        credit_limit.value = payload.value.guarantor_Credit_Limit === 'OPEN'
                            ? null
                            : parseFloat(payload.value.guarantor_Credit_Limit.replace(/[^0-9.-]+/g, ''));

                        if (credit_limit.value !== null && parseFloat(totalAmount.value) > credit_limit.value) {
                            if (confirm(`Insufficient credit limit! Total is ${totalAmount.value}, but your credit limit is only ${credit_limit.value}. Proceed anyway?`)) {
                                await processCharges();
                            } else {
                                useSnackbar(true, "warning", 'Charge process halted. Please review the items.');
                            }
                        } else {
                            await processCharges();
                        }
                    } else {
                        await processCharges();
                    }
                } else {
                    useSnackbar(true, "error", 'Cannot charge, double-check item stocks for medicines or supplies.');
                }
            }
        } catch (error) {
            handleErrorResponse(error);
        } finally {
            defineProcess.value = 0;
            isLoadingBtn.value = false;
            isLoading.value = false;
            clearFields();
            closeConfirmDialog();
        }
    };

    const processCharges = async () => {
        let response = {};
        try{
            if(parseInt(defineProcess.value) === 1) {
                response = await useMethod("post", "er-cancel-charge", payload.value);
            } else {
                response = await useMethod("post", "er-medicine-supplies-charges", payload.value);
            }
            if (response) {
                useSnackbar(true, "success", response.message);
                clearFields()
                closeConfirmDialog();
                payload.value.user_userid = '';
                payload.value.user_passcode = '';
                await getMedicineCharges();
            } else {
                useSnackbar(true, "error", 'Failed to post charges. Please try again.');
            }
        } catch(error) {
            handleErrorResponse(error);
        }
    };

    const handleErrorResponse = (error) => {
        if (error?.response?.status === 404) {
            useSnackbar(true, "error", 'Incorrect Username or Passcode');
        } else {
            useSnackbar(true, "error", "CATCH ERROR: Call IT Department");
        }
        isLoading.value = false;
        isLoadingBtn.value = false;
    };

    const closeWarningDialog = () => {
        showWarning.value = false;
    };

    const confirmCharges = async () => {
        showWarning.value = false;
        await processCharges(); 
    };

    const closeDialog = () => {
        emits('patient-registered')
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

    const CloseAlertMessageDialog = () => {
        closeDialog();
    }

    const clearFields = () => {
        panel.value = [0, 1, 2, 3];
        Medicines.value = [
            {
                code: "",
                item_name: "",
                frequency: "",
                quantity: "",
                amount: "",
                remarks: "",
                stat: "",
            }
        ];

        Supplies.value = [
            {
                code: "",
                item_name: "",
                quantity: "",
                amount: "",
                remarks: "",
                stat: "",
            }
        ]
        totalAmount.value = 0;
        totalSupplyAmount.value = 0;
    }
    const chargeMedicineList    = ref([]);
    const chargeSupplyList      = ref([]);
    const grandtotal = computed(() =>
        chargeMedicineList.value.reduce((acc, item) => acc + parseFloat(item.Amount), 0)
    );

    const medicineHeaders = ref([
        { title: "",                    key: "select",      sortable: false },
        { title: "Status",              key: "status",      sortable: false },
        { title: 'Code',                key: 'code',        sortable: false },
        { title: 'Reference Number',    key: 'request_num', sortable: false },
        { title: 'Item',                key: 'item_name',   sortable: false },
        { title: 'Quantity',            key: 'quantity',    sortable: false },
        { title: 'Frequency',           key: 'dosage',      sortable: false },
        { title: 'Amount',              key: 'net_amount',  sortable: false },
        // { title: 'Action',              key: 'action',      sortable: false }
    ]);

    const supplyHeaders = ref([
        { title: "Status",              key: "status",      sortable: false },
        { title: 'Code',                key: 'code',        sortable: false },
        { title: 'Reference Number',    key: 'request_num', sortable: false },
        { title: 'Item Name',           key: 'item_name',   sortable: false },
        { title: 'Quantity',            key: 'quantity',    sortable: false },
        { title: 'Net Amount',          key: 'net_amount',  sortable: false },
        // { title: 'Action',              key: 'action',      sortable: false }
    ]);

    const allCharges = ref([]);
    const getMedicineCharges = async () => {
        try {
            chargeMedicineList.value = [];
            chargeSupplyList.value = [];
            const response = await useMethod("get", "get-charge-items/", "", payload.value.case_No);
            const data = Array.isArray(response) ? response : response.data;
            if (data && Array.isArray(data) && data.length > 0) {
                const filteredMedicineData = data.filter(
                    item => (item.revenue_Id === 'EM' ||
                            item.revenue_Id === 'PH' ||
                            parseInt(item.isMedicine) === 1) &&
                            item.record_Status !== 'R'
                );
                chargeMedicineList.value = filteredMedicineData.map(item => ({
                    status: item.ORN !== null || item.record_Status === 'W'
                            ? 'Paid' 
                            : (item.record_Status === 'X' || parseInt(item.record_Status) === 27) ? 'Unpaid' : 'Canceled',
                    code: item.item_Id,
                    item_name: item.description || '-',
                    price: item.price ? parseFloat(item.price).toFixed(2) : '-',
                    quantity: item.Quantity ? parseInt(item.Quantity) : '-',
                    dosage: item.frequency,
                    net_amount: item.amount ? parseFloat(item.amount).toFixed(2) : '-',
                    request_num: item.referenceNum,
                    assess_num: item.assessnum
                }));

                const filteredSupplyData = data.filter(
                    item => (item.revenue_Id === 'RS' ||
                            item.revenue_Id === 'PH' ||
                            parseInt(item.isSupplies) === 1) &&
                            item.record_Status !== 'R'
                );
                chargeSupplyList.value = filteredSupplyData.map(item => ({
                    status: item.ORN !== null || item.record_Status === 'W'
                            ? 'Paid' : (item.record_Status === 'X' || parseInt(item.record_Status) === 27) ? 'Unpaid' : 'Canceled',
                    code: item.item_Id,
                    item_name: item.description || '-',
                    price: item.price ? parseFloat(item.price).toFixed(2) : '-',
                    quantity: item.Quantity ? parseInt(item.Quantity) : '-',
                    dosage: item.dosage || '-',
                    net_amount: item.amount ? parseFloat(item.amount).toFixed(2) : '-',
                    request_num: item.referenceNum,
                    assess_num: item.assessnum
                }));
                allCharges.value = [...chargeMedicineList.value, ...chargeSupplyList.value];
            } 
        } catch (error) {
            console.error("An error occurred while fetching charges:", error);
        }
    };

    const defineProcess = ref(0)
    const selectedMedicineItems = ref([]);
    const ItemsMedicineSelected = ref([]);
    const handleSelectionChangeMedicine = (newSelectedItems) => {
        defineProcess.value = 1;
        reference_id.value = newSelectedItems;
        const selectedReferenceIds = new Set(newSelectedItems.map(item => item.reference_id));
        chargeMedicineList.value.forEach(item => {
            if (selectedReferenceIds.has(item.reference_id)) {
                if (!selectedMedicineItems.value.includes(item)) {
                    ItemsMedicineSelected.value.push(item); 
                }
            } else {
                const index = selectedMedicineItems.value.indexOf(item);
                if (index > -1) {
                    selectedMedicineItems.value.splice(index, 1); 
                }
            }
        });
    };

    const selectedSupplyItems = ref([]);
    const ItemsSupplySelected = ref([]);
    const handleSelectionChangeSupply = (newSelectedItems) => {
        defineProcess.value = 1;
        reference_id.value = newSelectedItems;
        const selectedReferenceIds = new Set(newSelectedItems.map(item => item.reference_id));
        chargeSupplyList.value.forEach(item => {
            if (selectedReferenceIds.has(item.reference_id)) {
                if (!selectedSupplyItems.value.includes(item)) {
                    ItemsSupplySelected.value.push(item); 
                }
            } else {
                const index = selectedSupplyItems.value.indexOf(item);
                if (index > -1) {
                    selectedSupplyItems.value.splice(index, 1); 
                }
            }
        });
    };

    watchEffect(() => {
        if (payload.value.account == 'Self-Pay') {
            payload.value.charge_to = 'Self-Pay';
        } else {
            payload.value.charge_to = 'Company / Insurance';
        }
    })

    watch(() => payload.value.case_No, (newValue) => {
        if (newValue) {
            getMedicineCharges();
        }
    });

    const isDischarge = ref('');
    const isTagAsMgh = ref('')
    onUpdated(() => {
        if (selectedRowDetails.value && selectedRowDetails.value.id) {
            if (payload.value.id !== selectedRowDetails.value.id) { 
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
                isDischarge.value = selectedRowDetails.value.patient_registry && selectedRowDetails.value.patient_registry[0].discharged_Date;
                isTagAsMgh.value    = selectedRowDetails.value.patient_registry && selectedRowDetails.value.patient_registry[0].mgh_Datetime;
            }
        }
    })

    onMounted(() => {
        getRevenueCode();
        getMedicineCharges(); 
    });

    onBeforeUnmount(() => {
        chargeMedicineList.value = [];
        chargeSupplyList.value = [];
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
    .note {
        padding: 20 0px !important;
    }
    .note span {
        font-size: 20px;
        color: #000;
        font-weight: bold;
        font-style: italic;
    }
    .error-border {
        border: 2px solid red;
        border-radius: 5px;
    }
    
</style>