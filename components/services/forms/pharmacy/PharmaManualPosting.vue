<template>
    <v-dialog :model-value="open_pharma_manual_posting" rounded="lg" @update:model-value="closeDialog" max-width="1120px">
        <v-card rounded="lg">
            <v-toolbar density="compact" color="#107bac" hide-details>
                <v-toolbar-title>
                    Manual Posting
                    {{ patient_type == 2 ? '( OUTPATIENT )' : (patient_type == 5 ? '( EMERGENCY )' : '( INPATIENT )') }}
                </v-toolbar-title>
                <v-spacer></v-spacer>
                <v-btn color="white" @click="closeDialog">
                <v-icon>mdi-close</v-icon>
                </v-btn>
            </v-toolbar>
            <v-divider></v-divider>
            <v-card-text>
                <v-card elevation="4" class="mb-4">
                    <v-card-text>
                        <v-row>
                            <v-col cols="2" class="pa-1">
                                <v-row>
                                    <v-col cols="12">
                                        <v-text-field
                                            label="Case No."
                                            v-model="payload.caseNo"
                                            variant="outlined"
                                            class="cursor-pointer"
                                            append-icon="mdi-plus-box"
                                            hint="Case No."
                                            density="compact"
                                            @keyup.enter="getPatientPostedMeds"
                                            hide-details
                                            outlined
                                            focused
                                        ></v-text-field>
                                    </v-col>
                                </v-row>
                            </v-col>
                            <v-col cols="2" class="pa-1">
                                <v-row>
                                    <v-col cols="12">
                                        <v-text-field
                                            label="Patient ID"
                                            v-model="payload.patient_Id"
                                            variant="outlined"
                                            density="compact"
                                            hide-details
                                            outlined
                                            readonly
                                        ></v-text-field>
                                    </v-col>
                                </v-row>
                            </v-col>
                            <v-col :cols="patient_type == 6 ? '4' : '8'" class="pa-1">
                                <v-row>
                                    <v-col cols="12">
                                        <v-text-field
                                            label="Patient Name"
                                            v-model="payload.patient_Name"
                                            variant="outlined"
                                            density="compact"
                                            hide-details
                                            outlined
                                            readonly
                                        ></v-text-field>
                                    </v-col>
                                </v-row>
                            </v-col>
                            <v-col v-if="patient_type == 6" cols="2" class="pa-1">
                                <v-row>
                                    <v-col cols="12">
                                        <v-text-field
                                            label="Room No."
                                            v-model="payload.room_No"
                                            variant="outlined"
                                            density="compact"
                                            hide-details
                                            outlined
                                            readonly
                                        ></v-text-field>
                                    </v-col>
                                </v-row>
                            </v-col>
                            <v-col v-if="patient_type == 6" cols="2" class="pa-1">
                                <v-row>
                                    <v-col cols="12">
                                        <v-text-field
                                            label="Station"
                                            v-model="payload.station_No"
                                            variant="outlined"
                                            density="compact"
                                            hide-details
                                            outlined
                                            readonly
                                        ></v-text-field>
                                    </v-col>
                                </v-row>
                            </v-col>
                        </v-row>
                        <v-row>
                            <v-col cols="2" class="pa-1">
                                <v-row>
                                    <v-col cols="12">
                                        <v-text-field
                                            label="Doctor ID"
                                            v-model="payload.doctor_id"
                                            variant="outlined"
                                            density="compact"
                                            hide-details
                                            outlined
                                            readonly
                                        ></v-text-field>
                                    </v-col>
                                </v-row>
                            </v-col>
                            <v-col cols="6" class="pa-1">
                                <v-row>
                                    <v-col cols="12">
                                        <v-text-field
                                            label="Requesting Doctor"
                                            v-model="payload.attending_Doctor_fullname"
                                            variant="outlined"
                                            density="compact"
                                            hide-details
                                            outlined
                                            readonly
                                        ></v-text-field>
                                    </v-col>
                                </v-row>
                            </v-col>
                            <v-col cols="2" class="pa-1">
                                <v-row>
                                    <v-col cols="12">
                                        <v-text-field
                                            label="Age"
                                            v-model="payload.age"
                                            variant="outlined"
                                            density="compact"
                                            hide-details
                                            outlined
                                            readonly
                                        ></v-text-field>
                                    </v-col>
                                </v-row>
                            </v-col>
                            <v-col cols="2" class="pa-1">
                                <v-row>
                                    <v-col cols="12">
                                        <v-text-field
                                            label="Sex"
                                            v-model="payload.sex"
                                            variant="outlined"
                                            density="compact"
                                            hide-details
                                            outlined
                                            readonly
                                        ></v-text-field>
                                    </v-col>
                                </v-row>
                            </v-col>
                        </v-row>
                        <v-row>
                            <v-col cols="2" class="pa-1">
                                <v-row>
                                    <v-col cols="12">
                                        <v-text-field
                                            label="Guarantor ID"
                                            v-model="payload.guarantor_Id"
                                            variant="outlined"
                                            density="compact"
                                            hide-details
                                            outlined
                                            readonly
                                        ></v-text-field>
                                    </v-col>
                                </v-row>
                            </v-col>
                            <v-col cols="5" class="pa-1">
                                <v-row>
                                    <v-col cols="12">
                                        <v-text-field
                                            label="Guarantor Name"
                                            v-model="payload.guarantor_Name"
                                            variant="outlined"
                                            density="compact"
                                            hide-details
                                            outlined
                                            readonly
                                        ></v-text-field>
                                    </v-col>
                                </v-row>
                            </v-col>
                            <v-col cols="2" class="pa-1">
                                <v-row>
                                    <v-col cols="12">
                                        <v-text-field
                                            label="Credit Limit"
                                            v-model="payload.credit_Limit"
                                            variant="outlined"
                                            density="compact"
                                            hide-details
                                            outlined
                                            readonly
                                        ></v-text-field>
                                    </v-col>
                                </v-row>
                            </v-col>
                            <v-col cols="3" class="pa-1">
                                <v-row>
                                    <v-col cols="12">
                                        <v-text-field
                                            label="Account"
                                            v-model="payload.account"
                                            variant="outlined"
                                            density="compact"
                                            hide-details
                                            outlined
                                            readonly
                                        ></v-text-field>
                                    </v-col>
                                </v-row>
                            </v-col>
                        </v-row>
                    </v-card-text>
                </v-card>
                <v-card elevation="4">
                    <v-card-text>
                        <div style="display: flex; justify-content: end; align-items: center; margin-bottom: 10px;">
                            <div v-if="payload.patient_Name != null" >
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
                                <v-btn class="bg-info text-white" density="compact" style="margin-right: 10px;" @click="clearData">Clear</v-btn>
                            </div>
                        </div>
                        <v-table density="compact" height="40vh" class="styled-table">
                                <thead>
                                    <tr>
                                        <th>Code</th>
                                        <th>Item Code</th>
                                        <th>Description</th>
                                        <th>Frequency</th>
                                        <th>On Hand Quantity</th> 
                                        <th>Request Quantity</th> 
                                        <th>Price ( each )</th> 
                                        <th>Amount</th>
                                        <th>STAT</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <template v-for="(item, index) in Medicines">
                                        <tr>
                                            <td> <input class="input medicine-focus" v-model="item.code" @keyup.enter="handleAddMedicine(item, index)" :readonly="item.isReadonly" /> </td>
                                            <td> <input class="input medicine-focus" v-model="item.map_item_id" @keyup.enter="handleAddMedicine(item, index)" :readonly="item.isReadonly" /> </td>
                                            <td> <input class="input medicine-focus" v-model="item.item_name" @keyup.enter="handleAddMedicine(item, index)" readonly /> </td>
                                            <td> <input class="input medicine-focus" :value="item.frequency ? item.frequency.description : ''"  @keyup.enter="openFrequencyList(item)" readonly /> </td> 
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
                                        <td colspan="7" class="text-right">Total Amount: </td>
                                        <td>{{ usePeso(totalAmount) }}</td> 
                                    </tr>
                                </tfoot>
                            </v-table>
                    </v-card-text>
                </v-card>
            </v-card-text>
            <v-divider></v-divider>
            <v-card-actions>
                <v-btn color="blue-darken-1 border border-info" @click="closeDialog"> Close </v-btn>
                <v-spacer></v-spacer>
                <v-btn class="text-white bg-primary" @click="confirmCharge" :disabled="payload.account == 'Self-Pay' && patient_type != 6">Submit</v-btn>
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
                    CAN'T MANUALLY POST MEDICINE CHARGES FOR OPD / ER PATIENTS THAT ARE TAGGED AS SELF-PAY.
                </h2>
            </v-card-text>
        </v-card>
    </v-dialog>

    <Snackbar />

    <frequency-list 
        :open_frequency_list="open_frequency_list"
        @handle-select="handleSelectedFrequency"
        @close-dialog="closeFrequencyList"
    />

    <!-- 
    regarding sa patienttype nga props if OPD siya and naka Cash get the item_Selling_Price_Out
    else get the item_Selling_Price_In
    Sa ER or IPD default na bisan naka Cash or Company / Insurance get the item_Selling_Price_In
    Or you can actually just remove that prop kay since dili man pd maka manual posting charge if ang OPD patient is tagged as self-pay or cash so tanan dre by default uses the item_Selling_Price_In
    -->
    <list-of-items 
        :open_items_list="open_items_list"
        :patienttype="props.patient_type == 2 && payload.account == 'Self-Pay' ? 1 : 2" 
        :user_input_revenue_code="user_input_revenue_code"
        :warehouse_id="selectedWarehouseID"
        :itemcodes="itemcodes"
        @handle-select="handleSelectedItem"
        @close-dialog="closeItemsList"
    />

    <Confirmation 
        :show="chargeconfirmation"
        :payload="payload"
        :loading="isLoadingBtn"
        :error_msg="error_msg"
        @submit="onSubmit"
        @close="closeConfirmation"
    />
</template>

<script setup>
import ListOfItems from "../../../../pages/services/out-patient/components/OPDListOfItems.vue";
import FrequencyList from "../../../../pages/services/out-patient/components/OPDFrequencyList.vue";

const props = defineProps({
    open_pharma_manual_posting: {
        type: Boolean,
        default: () => false,
        required: true,
    },
    patient_type: {
        type: Number,
        default: () => '',
        required: true,
    },
});

const payload = ref({});
const Medicines = ref([
    {
        code: "",
        map_item_id: "",
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
const emits = defineEmits(["close-dialog"]);
const isLoadingBtn = ref(false);
const chargeconfirmation = ref(false);
const user_attempts = ref(0);
const error_msg = ref("");
const medicine_revenue_data = ref([]);
const medicine_revenue_data_display = ref([]);
const warning_cannot_be_revoked = ref(false);
const selectedWarehouseID = ref(null); 
const open_frequency_list = ref(false);
const open_items_list = ref(false);
const user_input_revenue_code = ref("PH");
const itemcodes = ref([]);
const current_item = ref({});
const credit_limit = ref(null);

const data = ref({
    title: "List of posted medicines",
    keyword: "",
    loading: false,
    filter: {},
    tab: 0,
    param_tab: 1,
});

const getPatientPostedMeds = async () => {
    if (!payload.value.caseNo) {
        return useSnackbar(true, "error", "Please enter case number.");
    }
    data.value.loading = true;
    try {
        const response = await useMethod("get", "get-patient-for-charging?case_No=", "", payload.value.caseNo);
        if (response.mscAccount_Trans_Types != props.patient_type) {
            clearData();
            useSnackbar(true, "error", "No patient found, Please double check");
        } else {
            payload.value.patient_Type = props.patient_type;
            payload.value.patient_Id = response.patient_details.patient_Id;
            payload.value.case_No = response.patient_details.case_No;
            payload.value.age = response.patient_details.age;
            payload.value.patient_Name = response.patient_details.lastname + ', ' + response.patient_details.firstname + ' ' + response.patient_details.middlename;
            payload.value.sex = response.patient_details.sex && response.patient_details.sex.sex_description ? response.patient_details.sex.sex_description : null;
            payload.value.account = response.mscPrice_Schemes && response.mscPrice_Schemes == 1 ? 'Self-Pay' : 'Company / Insurance';
            payload.value.doctor_id = response.attending_Doctor ? response.attending_Doctor : 'N/A';
            payload.value.attending_Doctor_fullname = response.attending_Doctor_fullname ? response.attending_Doctor_fullname : 'N/A';
            payload.value.guarantor_Id = response.guarantor_Id;
            payload.value.guarantor_Name = response.guarantor_Name;
            payload.value.credit_Limit = payload.value.account == 'Self-Pay' ? 'N/A' : (response.isWithCreditLimit != 0 && response.guarantor_Credit_Limit != null ? usePeso(response.guarantor_Credit_Limit) : 'OPEN');
            warning_cannot_be_revoked.value = response.mscPrice_Schemes == 1 && props.patient_type != 6 ? true : false;
        }
    } catch (error) {
    console.error(error);
    } finally {
        data.value.loading = false;
    }
}

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

            if (medicine_revenue_data.value.length > 0 ) {
                selectedWarehouseID.value = medicine_revenue_data.value[0].warehouse_id;
            }

            medicine_revenue_data_display.value = medicine_revenue_data.value.map(item => {
                return { code: item.code, description: item.description }
            });
        } 
    } else {
        useSnackbar(true, "error", "Failed to get revenue codes.");
    }
};

const clearData = () => {
    payload.value = {};
    Medicines.value = [
        {
            code: "",
            map_item_id: "",
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
    ];
}

const closeItemsList = () => {
    open_items_list.value = false;
}

const handleSelectedItem = (selected_item) => {
    const lastRow = Medicines.value[Medicines.value.length - 1];
    lastRow.map_item_id = selected_item.map_item_id;
    lastRow.item_name = selected_item.item_name + ' ' + selected_item.item_Description;
    lastRow.price = selected_item.ware_house_items ? usePeso(selected_item.ware_house_items[0].price) : '0';
    lastRow.item_OnHand = selected_item.ware_house_items ? parseInt(selected_item.ware_house_items[0].item_OnHand) : 'N/A';
    lastRow.item_ListCost = selected_item.ware_house_items ? parseInt(selected_item.ware_house_items[0].item_ListCost) : 'N/A';
};

const focusNextMedicine = (index) => {
    const inputs = document.querySelectorAll('.medicine-focus');
    const transactionCodeInput = inputs[(index + 1) * 9];
    if (transactionCodeInput) {
        transactionCodeInput.focus();
    }
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
    item.warehouse_id = matchingRevenue.warehouse_id;
    item.warehouse_medsys_id = matchingRevenue.warehouse_map_itemid;

    user_input_revenue_code.value = item.code;
    if(item.code && !item.map_item_id && !item.item_name) {

        open_items_list.value = true;
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

const confirmCharge = () => {
    let medicines = Medicines.value.filter(obj => obj.code !== '');
    payload.value.Medicines = medicines;

    if (payload.value.Medicines.length === 0) {
        return useSnackbar(true, "error", "Please add medicines.");
    } 

    for (const item of medicines) {
        const frequency = item.frequency || null;
        if (!frequency) {
            useSnackbar(true, "error", "Specify the Frequency before proceeding.");
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

    chargeconfirmation.value = true;
}

const onSubmit = async (user_details) => {
    if (user_details.user_passcode === usePasscode()) {
        try {
            isLoadingBtn.value = true;
            credit_limit.value = payload.value.credit_Limit == 'OPEN' ? null : parseFloat(payload.value.credit_Limit.replace(/[^0-9.-]+/g, ''));
            if (credit_limit.value != null && totalAmount.value > credit_limit.value) {
                let excessAmount = credit_limit.value;
                const confirmCharge = window.confirm(`Credit limit exceeded for a total of ${usePeso(excessAmount)}. Do you want to continue?`);
                if (!confirmCharge) {
                    isLoadingBtn.value = false;
                    closeConfirmation();
                } else {
                    const response = await useMethod("post", "submit-manual-posting-meds", payload.value);
                    if (response) {
                        useSnackbar(true, "success", "Successfully posted charges.");
                        closeDialog();
                        closeConfirmation();
                    } else {
                        useSnackbar(true, "error", "Failed to post charges.");
                    }
                }
            } else {
                const response = await useMethod("post", "submit-manual-posting-meds", payload.value);
                if (response) {
                    useSnackbar(true, "success", "Successfully posted charges.");
                    closeDialog();
                    closeConfirmation();
                } else {
                    useSnackbar(true, "error", "Failed to post charges.");
                }
            }
        } catch (error) {
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
};

const removeMedicineItem = (item) => {
    const index = Medicines.value.indexOf(item);
    if (index > -1) {
        Medicines.value.splice(index, 1);
    }
};

const openFrequencyList = (item) => {
    open_frequency_list.value = true; 
    current_item.value = item; 
};

const handleSelectedFrequency = (selected_item) => {
    if (selected_item && selected_item.description) {
        current_item.value.frequency = {
        id: selected_item.dosage_id, 
        description: selected_item.description,
        };
    } else {
        current_item.value.frequency = { id: null, description: '' }; 
    }
    closeFrequencyList(); 
};

const closeFrequencyList = () => {
    open_frequency_list.value = false;
};

const closeWarningDialog = () => {
    warning_cannot_be_revoked.value = false;
    clearData();
}

const updateAmount = (item) => {
    const cleanedPrice = item.price.replace(/[^\d.-]/g, ''); 
    const quantity = Number(item.quantity) || 0; 
    const price = Number(cleanedPrice) || 0; 
    item.amount = `₱ ${(quantity * price).toFixed(2)}`; 
}

const totalAmount = computed(() => {
    return Medicines.value.reduce((acc, item) => {
        const cleanedAmount = item.amount.replace(/[^\d.-]/g, ''); 
        return acc + Number(cleanedAmount); 
    }, 0); 
});

const closeDialog = () => {
    clearData();
    emits('close-dialog');
}

onMounted(() => {
    getRevenueCode();
})
</script>

<style scoped>
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