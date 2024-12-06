<template>
    <v-dialog :model-value="open_returned_medicines" rounded="lg" @update:model-value="closeDialog" max-width="1120px">
        <v-card rounded="lg">
            <v-toolbar density="compact" color="#107bac" hide-details>
                <v-toolbar-title>
                    Post Returned Medicines
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
                            <v-col cols="3" class="pa-1">
                                <v-row>
                                    <v-col cols="12">
                                        <v-text-field
                                            label="Case No."
                                            v-model="payload.case_No"
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
                            <v-col :cols="patient_type == 6 ? '5' : '9'" class="pa-1">
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
                            <v-col cols="3" class="pa-1">
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
                            <v-col cols="7" class="pa-1">
                                <v-row>
                                    <v-col cols="12">
                                        <v-text-field
                                            label="Requesting Physician"
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
                        </v-row>
                        <v-row>
                            <v-col cols="6" class="pa-1">
                                <v-row>
                                    <v-col cols="12">
                                        <v-text-field
                                            label="Credit Memo"
                                            v-model="creditMemo"
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
                                            label="Total"
                                            v-model="totalAmount"
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
                        <div style="display: flex; align-items: center; justify-content: space-between;">
                            <p>List of Posted Medicines</p>
                            <div>
                                <v-btn class="bg-info text-white" v-if="payload.patient_Name != null" style="margin-right: 10px;" @click="clearData">Clear</v-btn>
                            </div>
                        </div>
                        <v-data-table-server
                            class="animated animatedFadeInUp fadeInUp mt-4"
                            :items-per-page="100"
                            :headers="headers"
                            :items="serverItems"
                            :loading="data.loading"
                            :model-value="selectedOrders"
                            @update:modelValue="handleSelectedOrders"
                            show-select
                            item-value="id"
                            :hover="true"
                            fixed-header
                            density="compact"
                            height="40vh"
                        >
                            <template v-for="(head, index) of headers" v-slot:[`item.${head.value}`]="props">
                                <td class="test" :key="index">
                                    <slot :name="head.value" :item="props.item">
                                        {{ props.item[head.value] || "..." }}
                                    </slot>
                                </td>
                            </template>

                            <template v-slot:item.nurse_logbook.process_Date="{ item }">
                                {{ useDateMMDDYYY(item.nurse_logbook.process_Date) }}
                            </template>

                            <template v-slot:item.transaction_Qty="{ item }">
                                {{ parseInt(item.transaction_Qty) || "N/A" }}
                            </template>

                            <template v-slot:item.transaction_Item_SellingAmount="{ item }">
                                {{ usePeso(item.transaction_Item_SellingAmount) || "N/A" }}
                            </template>

                            <template v-slot:item.transaction_Item_TotalAmount="{ item }">
                                {{ usePeso(item.transaction_Item_TotalAmount) }}
                            </template>

                            <template #bottom />
                        </v-data-table-server>
                    </v-card-text>
                </v-card>
            </v-card-text>
            <v-divider></v-divider>
            <v-card-actions>
                <v-btn color="blue-darken-1 border border-info" @click="closeDialog"> Close </v-btn>
                <v-spacer></v-spacer>
                <v-btn class="bg-primary text-white" @click="openSelectedItems" v-if="isDischargedDate == null && isDischargedUserID == null">Proceed to Submission</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>

    <v-dialog :model-value="warning_already_discharge_dialog" rounded="lg" max-width="450px" @update:model-value="closeWarningDialog">
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
                <h2 style="text-align: left;">CAN'T RETURN MEDICINES FOR THIS PATIENT! ALREADY DISCHARGED!</h2>
            </v-card-text>
        </v-card>
    </v-dialog>
    
    <v-dialog :model-value="open_selected_items_dialog" rounded="lg" max-width="950px" @update:model-value="closeSelectedItemsDialog">
        <v-card elevation="4" rounded="lg">
            <v-toolbar density="compact" color="#107bac" hide-details>
                <v-toolbar-title>
                    Selected Medicine to Return
                </v-toolbar-title>
                <v-spacer></v-spacer>
                <v-btn color="white" @click="closeSelectedItemsDialog">
                    <v-icon>mdi-close</v-icon>
                </v-btn>
            </v-toolbar>
            <v-card-text>
                <v-card elevation="4">
                    <v-card-text>
                        <v-data-table
                            density="compact"
                            :headers="tableHeaders"
                            :items="selected_items_data"
                            :items-per-page="100"
                            fixed-header
                            hide-details
                            height="40vh"
                        >
                            <template v-slot:item.price="{ item }">
                                <input
                                    style="border-bottom: 1px solid #A9A9A9;"
                                    :value="item.ware_house_items && item.ware_house_items.length > 0
                                        ? usePeso(item.ware_house_items[0].price)
                                        : 'No Price Found'"
                                    readonly
                                />
                            </template>

                            <template v-slot:item.transaction_Qty="{ item }">
                                {{ parseInt(item.transaction_Qty) }}
                            </template>

                            <template v-slot:item.Quantity_To_return="{ item }">
                                <input
                                    style="width: 100px; border-bottom: 1px solid #A9A9A9;"
                                    v-model="item.Quantity_To_return"
                                    type="number"
                                    :max="item.transaction_Qty"
                                    @input="updateAmount(item)"
                                />
                            </template>

                            <template v-slot:item.transaction_Item_SellingAmount="{ item }">
                                {{ usePeso(item.transaction_Item_SellingAmount) }}
                            </template>

                            <template v-slot:item.return_total_amount="{ item }">
                                <input
                                    style="border-bottom: 1px solid #A9A9A9;"
                                    readonly
                                    :value="item.display_return_total_amount"
                                />
                            </template>

                            <template #bottom></template>
                        </v-data-table>
                    </v-card-text>
                </v-card>
                <v-card elevation="4" style="margin-top: 12px;">
                    <v-card-text>
                        <v-row>
                            <v-col cols="12">
                                <v-textarea
                                    v-model="payload.remarks"
                                    variant="outlined"
                                    label="Return Remarks"
                                    hint="Reason as to why..."
                                    density="compact"
                                ></v-textarea>
                            </v-col>
                        </v-row>
                    </v-card-text>
                </v-card>
            </v-card-text>
            <v-divider></v-divider>
            <v-card-actions>
                <v-btn color="blue-darken-1 border border-info" @click="closeSelectedItemsDialog"> Close </v-btn>
                <v-spacer></v-spacer>
                <v-btn class="bg-primary text-white" @click="openReturnMedsConfirmation">Return Medicine</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>

    <Confirmation 
        :show="returnMedsConfirmation"
        :payload="payload"
        :loading="isLoadingBtn"
        :error_msg="error_msg"
        @submit="onSubmitReturnMeds"
        @close="closeReturnMedsConfirmation"
    />  
</template>

<script setup>
const props = defineProps({
    open_returned_medicines: {
        type: Boolean,
        default: () => false,
        required: true,
    },
    patient_type: {
        type: Number,
        default: () => '',
        required: true,
    }
});

const payload = ref({
    Items: [],
});
const emits = defineEmits(["close-dialog"]);
const serverItems = ref([]);
const selectedOrders = ref([]);
const returnMedsConfirmation = ref(false);
const isLoadingBtn = ref(false);
const error_msg = ref("");
const user_attempts = ref(0);
const isDischargedDate = ref();
const isDischargedUserID = ref();
const warning_already_discharge_dialog = ref(false);
const selected_items_data = ref([]);
const open_selected_items_dialog = ref(false);

const closeWarningDialog = () => {
    warning_already_discharge_dialog.value = false;
};

const headers = [
    { title: "Trans Date",  align: "start", sortable: false, key: "nurse_logbook.process_Date" },
    { title: "Encoder",  align: "start", sortable: false, key: "nurse_logbook.process_By" },
    { title: "Item ID",  align: "start", sortable: false, key: "nurse_logbook.item_Id" },
    { title: "Description",  align: "start", sortable: false, key: "nurse_logbook.description" },
    { title: "Dosage",  align: "start", sortable: false, key: "transaction_Item_Med_Frequency_Id" },
    { title: "Quantity",  align: "start", sortable: false, key: "transaction_Qty" },
    { title: "Price",  align: "start", sortable: false, key: "transaction_Item_SellingAmount" },
    { title: "Amount",  align: "start", sortable: false, key: "transaction_Item_TotalAmount" },
];

const tableHeaders = [
    { title: "Item ID",  align: "start", sortable: false, key: "nurse_logbook.item_Id" },
    { title: "Description", align: "start", sortable: false, key: "nurse_logbook.description" },
    { title: "Quantity", align: "start", sortable: false, key: "transaction_Qty" },
    { title: "Quantity to Return", align: "start", sortable: false, key: "Quantity_To_return" },
    { title: "Price", align: "start", sortable: false, key: "transaction_Item_SellingAmount" },
    { title: "Amount", align: "start", sortable: false, key: "return_total_amount" },
];

const data = ref({
    title: "List of posted medicines",
    keyword: "",
    loading: false,
    filter: {},
    tab: 0,
    param_tab: 1,
});

const getPatientPostedMeds = async () => {
    if (!payload.value.case_No) {
        return useSnackbar(true, "error", "Please provide a case number.");
    } 
    data.value.loading = true;
    try {
        const response = await useMethod("get", "get-pharmacy-posted-meds?case_No=", "", payload.value.case_No);
        if (response) {
            if (response.patient_details.inventory_data.length === 0) {
                clearData();
                useSnackbar(true, "error", "No posted medicines found for this patient.");
                return;
            } else {
                payload.value.patient_Id = response.patient_details.patient_Id;
                payload.value.age = response.patient_details.age;
                payload.value.patient_Name = response.patient_details.inventory_data[0].nurse_logbook.patient_Name;
                payload.value.attending_Doctor_fullname = response.patient_details.doctor;
                serverItems.value = response.patient_details.inventory_data;
                isDischargedDate.value = response.patient_details.discharged_Date;
                isDischargedUserID.value = response.patient_details.discharged_Userid;
                if (isDischargedDate.value != null && isDischargedUserID.value != null) {
                    warning_already_discharge_dialog.value = true;
                }
            }
        } 
    } catch (error) {
        console.error(error);
    } finally {
        data.value.loading = false;
    }
}

const clearData = () => {
    payload.value = {};
    serverItems.value = [];
}

const totalAmount = computed(() => {
    if (serverItems.value.length === 0) return null;
    const totalAmountValue = serverItems.value.reduce((acc, item) => acc + parseFloat(item.transaction_Item_TotalAmount || 0), 0);
    return usePeso(totalAmountValue);
});

const creditMemo = computed(() => {
    if (serverItems.value.length === 0) return null;
    const creditMemo =  serverItems.value.reduce((acc, item) => acc + parseFloat(item.transaction_CreditMemo_Number || 0), 0); 
    if (creditMemo == 0) return "N/A";
});

const handleSelectedOrders = (selectedRow) => {
    selectedOrders.value = selectedRow;
};


const openSelectedItems = () => {
    selected_items_data.value = selectedOrders.value.map(rowId => {
        const item = serverItems.value.find(item => item.id === rowId);
        if (item) {
            item.return_total_amount = 0;
            item.Quantity_To_return = '';
        }
        return item;
    });
    if (selected_items_data.value.length === 0 || selected_items_data.value == null) {
        useSnackbar(true, "error", "Please select an item to return.");
        return;
    }
    open_selected_items_dialog.value = true;
};

const updateAmount = (item) => {
    const sellingAmount = item.transaction_Item_SellingAmount.replace(/[^0-9.-]+/g, ''); 
    const quantityToReturn = parseInt(item.Quantity_To_return); 

    if (!isNaN(sellingAmount) && !isNaN(quantityToReturn)) {
        let totalAmount = sellingAmount * quantityToReturn;
        item.return_total_amount = parseFloat(totalAmount.toFixed(2));
        item.display_return_total_amount = usePeso(totalAmount);
    } else {
        item.return_total_amount = 0;
        item.display_return_total_amount = "N/A";
    }
};


const closeSelectedItemsDialog = () => {
    selectedOrders.value = []; 
    selected_items_data.value = []; 
    open_selected_items_dialog.value = false;
}

const openReturnMedsConfirmation = () => {
    payload.value.Items = selected_items_data.value;

    for (let i = 0; i < payload.value.Items.length; i++) {
        if (payload.value.Items[i].Quantity_To_return == null || payload.value.Items[i].Quantity_To_return == "") {
            useSnackbar(true, "error", "Please provide the quantity to return. It' cannot be empty.");
            return;
        }
    }

    if (payload.value.remarks == null || payload.value.remarks == "") {
        useSnackbar(true, "error", "Please provide a reason for returning the medicine.");
        return;
    }

    returnMedsConfirmation.value = true;
}

const closeReturnMedsConfirmation = () => {
    returnMedsConfirmation.value = false;
}

const onSubmitReturnMeds = async (user_details) => {
    if (user_details.user_passcode === usePasscode()) {
        const response = await useMethod("post", "post-return-medicine", payload.value);   
        if (response) {
            useSnackbar(true, "success", "Medicine returned successfully.");
            closeReturnMedsConfirmation();
            closeSelectedItemsDialog();
            closeDialog();
        } 
    } else {
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
}


const closeDialog = () => {
    serverItems.value = [];
    payload.value = {};
    emits('close-dialog');
}
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