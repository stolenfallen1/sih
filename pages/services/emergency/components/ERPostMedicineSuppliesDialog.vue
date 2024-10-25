<template>
    <v-dialog :model-value="show" rounded="lg" scrollable @update:model-value="closeDialog" max-width="1120px">    
        <v-card rounded="lg">
            <v-toolbar density="compact" color="#107bac" hide-details>
                <v-toolbar-title>OPDListOfItems.vueine / Supplies Entry</v-toolbar-title>
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
                                            <td> <input class="input medicine-focus" v-model="item.frequency_description" @keyup.enter="openFrequencyList" readonly /> </td>
                                            <td> <input class="input medicine-focus" v-model="item.price" readonly /> </td>
                                            <td> <input class="input medicine-focus" v-model="item.quantity" @input="handleTotalMedicine(item)" /> </td>
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
                                        <td> <input class="input medicine-focus" v-model="totalAmount" readonly /> </td>
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
                                            <td> <input class="input medicine-focus" v-model="item.quantity" @input="handleTotalSupply(item)" /> </td>
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
                                        <td colspan="3" class="text-right">Total Amount: </td>
                                        <!-- <td>{{ usePeso(totalAmount) }}</td> -->
                                    </tr>
                                </tfoot>
                            </v-table>
                        </v-expansion-panel-text>
                    </v-expansion-panel>
                </v-expansion-panels>
            </v-card-text>
            <v-card-actions>
                <v-btn color="blue-darken-1 border border-info" @click="closeDialog"> Close </v-btn>
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
    const emits = defineEmits(['close-dialog'])
    const isLoading = ref(false);
    const credit_limit = ref(null);
    let panel = ref([0, 1]);
    const payload = ref({});
    const chargecode = ref([]);
    const open_items_list_for_medicines = ref(false);
    const open_items_list_for_supplies = ref(false);
    const open_frequency_list = ref(false);
    const user_input_revenue_code = ref('');
    const isLoadingBtn = ref(false);
    const showDialog = ref(false);
    const showWarning = ref(false);

    const openConfirmDialog = async () => {
        showDialog.value = true;
    }

    const closeConfirmDialog = () => {
        showDialog.value = false;
    }

    const charge_to = ref([
        { value: 1, text: "Self-Pay" },
        { value: 2, text: "Company / Insurance" }, 
    ]);

    const Medicines = ref([
        {
            code: "",
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
    const selectedWarehouseID = ref(null); 

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
        const transactionCodeInput = inputs[(index + 1) * 7];
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
                        item_name: "",
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
            lastRow.map_item_id = selected_item.map_item_id;
            lastRow.item_name = selected_item.item_name + ' ' + selected_item.item_Description;
            lastRow.price = selected_item.ware_house_items ? usePeso(selected_item.ware_house_items[0].price) : '0';
        } else if (listType === 'supplies') {
            const lastRow = Supplies.value[Supplies.value.length - 1];
            lastRow.map_item_id = selected_item.map_item_id;
            lastRow.item_name = selected_item.item_name + ' ' + selected_item.item_Description;
            lastRow.price = selected_item.ware_house_items ? usePeso(selected_item.ware_house_items[0].price) : '0';
        }
    };


    const handleTotalMedicine = (item) => {
        if (!item.base_price) {
            item.base_price = parseFloat(item.price.replace(/[^0-9.-]+/g, ''));
        }

        const base_price = item.base_price;
        const quantity = parseInt(item.quantity) || 0;

        if (!isNaN(quantity) && !isNaN(base_price)) {
            item.amount = (quantity * base_price).toFixed(2);
            calculateTotalAmountMedicine();
        } else {
            item.price = "0.00"; 
        }
    };

    
    const handleTotalSupply = (item) => {
        if (!item.base_price) {
            item.base_price = parseFloat(item.price.replace(/[^0-9.-]+/g, ''));
        }

        const base_price = item.base_price;
        const quantity = parseInt(item.quantity) || 0;

        if (!isNaN(quantity) && !isNaN(base_price)) {
            item.amount = (quantity * base_price).toFixed(2);
            calculateTotalAmountSupply();
        } else {
            item.price = "0.00"; 
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

    const calculateTotalAmountSupply = () => {
        totalAmount.value = 0;

        Supplies.value.forEach(item => {
            const itemAmount = parseFloat(item.amount) || 0;
            (totalAmount.value += itemAmount).toFixed(2);
        })
    }

  
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


    const onSubmit = async () => {

        isLoading.value = true;
        isLoadingBtn.value = true;

        const medicines = Medicines.value.filter(obj => obj.code !== '');
        const supplies = Supplies.value.filter(obj => obj.code !== '');

        let flagMedicine = true;
        let flagSupply = true;

        payload.value.Medicines = medicines;
        payload.value.Supplies = supplies;

        try {

            if (payload.value.medicine_stocks_OnHand !== undefined) {
                checkStockAvailability(payload.value.medicine_stocks_OnHand, medicines, 'medicine', (flag) => flagMedicine = flag);
            }

            if (payload.value.supply_stocks_OnHand !== undefined) {
                checkStockAvailability(payload.value.supply_stocks_OnHand, supplies, 'supply', (flag) => flagSupply = flag);
            }

            if (flagMedicine || flagSupply) {

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

        } catch (error) {

            handleErrorResponse(error);

        } finally {

            isLoadingBtn.value = false;
            isLoading.value = false;
            closeDialog();
            closeConfirmCharge();
            closeConfirmDialog();
        }
    };

    const checkStockAvailability = (stocksOnHand, items, itemType, updateFlag) => {
        stocksOnHand.forEach((stock, index) => {
            const item = items[index];
            if (!item) return;

            const requiredQuantity = parseInt(item.quantity);
            const availableStocks = parseInt(stock.stock);

            if (availableStocks < requiredQuantity) {
                const itemId = stock.id;
                updateFlag(false);
                useSnackbar(true, "error", `Insufficient stock! for ${itemId}. You requested ${requiredQuantity} units, but only ${availableStocks} are available.`);
            }
        });
    };

    const processCharges = async () => {
        try{
            const response = await useMethod("post", "er-medicine-supplies-charges", payload.value);
            if (response.message) {
                useSnackbar(true, "success", response.message);
                closeDialog();
                closeConfirmCharge();
                closeConfirmDialog();
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
        emits('close-dialog');
        panel.value = [0, 1];
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