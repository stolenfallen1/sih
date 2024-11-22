<template>
    <v-dialog :model-value="open_carry_order_form" rounded="lg" @update:model-value="closeDialog" max-width="1120px">
        <v-card rounded="lg">
            <v-toolbar density="compact" color="#107bac" hide-details>
                <v-toolbar-title>
                    Carry Supplies Order
                    {{ patient_type == 2 ? '( OUTPATIENT )' : (patient_type == 5 ? '( EMERGENCY )' : '( INPATIENT )') }}
                </v-toolbar-title>
                <v-spacer></v-spacer>
                <v-btn color="white" @click="closeDialog">
                <v-icon>mdi-close</v-icon>
                </v-btn>
            </v-toolbar>
            <v-card-text>
                <v-card elevation="4" class="mb-4">
                    <v-card-text>
                        <v-row>
                            <v-col cols="12">
                                <v-text-field
                                    label="Patient Name"
                                    variant="outlined"
                                    class="cursor-pointer"
                                    v-model="item.patient_Name"
                                    density="compact"
                                    hide-details
                                    readonly
                                ></v-text-field>
                            </v-col>
                            <v-col cols="4" class="pt-0">
                                <v-text-field
                                    label="Patient ID"
                                    variant="outlined"
                                    class="cursor-pointer"
                                    v-model="item.patient_Id"
                                    density="compact"
                                    hide-details
                                    readonly
                                ></v-text-field>
                            </v-col>
                            <v-col cols="4" class="pt-0">
                                <v-text-field
                                    label="Case No."
                                    variant="outlined"
                                    class="cursor-pointer"
                                    v-model="item.case_No"
                                    density="compact"
                                    hide-details
                                    readonly
                                ></v-text-field>
                            </v-col>
                            <v-col cols="4" class="pt-0">
                                <v-text-field
                                    label="Request No."
                                    variant="outlined"
                                    class="cursor-pointer"
                                    v-model="item.requestNum"
                                    density="compact"
                                    hide-details
                                    readonly
                                ></v-text-field>
                            </v-col>
                        </v-row>
                    </v-card-text>
                </v-card>
                <v-card elevation="4">
                    <v-card-text>
                        <p style="font-weight: bolder; font-size: larger; padding-bottom: 10px; text-decoration: underline;">List of Requests</p>
                        <v-data-table
                            density="compact"
                            height="50vh"
                            :headers="table_headers"
                            :items="item?.items"  
                            :hover="true"
                            hide-details
                            fixed-header
                        >
                            <template v-slot:item="{ item }">
                                <tr style="cursor: pointer;">
                                    <td>
                                        <v-checkbox
                                            v-model="selectedOrders"
                                            :value="item.item_Id"
                                            density="compact"
                                            hide-details
                                            color="#000"
                                            class="pa-0"
                                        />
                                    </td>
                                    <td>{{ item.item_Id }}</td>
                                    <td>{{ item.description }}</td>
                                    <td style="color: green; font-weight: bolder;">{{ parseInt(item.item_OnHand) }}</td>
                                    <td style="color: blue; font-weight: bolder;">{{ parseInt(item.Quantity) }}</td>
                                    <td>
                                        <input 
                                            style="border: 1px solid #000; width: 75px; border-radius: 5px; padding: 2px; padding-left: 10px;"
                                            type="number" 
                                            v-model="item.Carry_Quantity"
                                            :max="item.Quantity"
                                        />
                                    </td>
                                    <td>{{ usePeso(item.price) }}</td>
                                    <td>{{ usePeso(item.amount) }}</td>
                                </tr>
                            </template>
                            <template #bottom></template>
                        </v-data-table>
                    </v-card-text>
                </v-card>
            </v-card-text>
            <v-card-actions>
                <v-btn color="blue-darken-1 border border-info border border-info" @click="closeDialog"> Close </v-btn>
                <v-spacer></v-spacer>
                <v-btn class="bg-error text-white" @click="openRemarksDialog">Cancel Order</v-btn>
                <v-btn class="bg-primary text-white" @click="confirmCarryOrder">Carry Order</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog> 

    <v-dialog v-model="open_remarks_dialog" rounded="lg" @update:model-value="closeRemarksDialog" max-width="650px">
        <v-card rounded="lg">
            <v-toolbar density="compact" color="#107bac" hide-details>
                <v-toolbar-title>
                    Cancellation Remarks
                </v-toolbar-title>
                <v-spacer></v-spacer>
                <v-btn color="white" @click="closeRemarksDialog">
                <v-icon>mdi-close</v-icon>
                </v-btn>
            </v-toolbar>
            <v-card-text>
                <v-card elevation="4">
                    <v-card-text>
                        <p>Remarks</p>
                        <v-textarea  
                            v-model="payload.remarks"
                            variant="outlined"
                            density="compact"
                            hint="Reason for cancelling the order"
                        />
                    </v-card-text>
                </v-card>
            </v-card-text>
            <v-card-actions>
                <v-btn color="blue-darken-1 border border-info border border-info" @click="closeRemarksDialog">Close</v-btn>
                <v-spacer></v-spacer>
                <v-btn class="bg-error text-white" @click="confirmCancelOrder">Proceed Cancellation</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>

    <Confirmation 
        :show="carryOrderConfirmation"
        :payload="payload"
        :loading="isLoadingBtn"
        :error_msg="error_msg"
        @submit="onSubmit"
        @close="closeConfirmation"
    />  

    <Confirmation 
        :show="cancelOrderConfirmation"
        :payload="payload"
        :loading="isLoadingBtn"
        :error_msg="error_msg"
        @submit="onCancel"
        @close="closeCancellation"
    />  
</template>

<script setup>
const props = defineProps({
    open_carry_order_form: {
        type: Boolean,
        default: () => false,
        required: true,
    },
    patient_type: {
        type: Number,
        default: () => '',
        required: true,
    },
    item: {
        type: Object,
        default: () => {},
        required: true,
    },
});

const payload = ref({
    Orders: [],
});
const isLoadingBtn = ref(false);
const open_remarks_dialog = ref(false);
const carryOrderConfirmation = ref(false);
const cancelOrderConfirmation = ref(false);
const error_msg = ref('');
const user_attempts = ref(0);
const selectedOrders = ref([]);

const table_headers = [
    { title: "", align: "start", key: "select", sortable: false },
    { title: "Item ID", align: "start", key: "item_Id", sortable: false },
    { title: "Description", align: "start", key: "description", sortable: false },
    { title: "Stocks", align: "start", key: "item_OnHand", sortable: false },
    { title: "Request Quantity", align: "start", key: "Quantity", sortable: false },
    { title: "Quantity", align: "start", key: "Carry Quantity", sortable: false },
    { title: "Item Price", align: "start", key: "price", sortable: false },
    { title: "Amount", align: "start", key: "amount", sortable: false },
    { title: "", align: "start", key: "cancel", sortable: false },
];

const emits = defineEmits(["close-dialog", "ordered-carried"]);

const setPayloadProperties = () => {
    payload.value.patient_Id = props.item.patient_Id;
    payload.value.case_No = props.item.case_No;
    payload.value.requestNum = props.item.requestNum;

    payload.value.Orders = props.item.items
        .filter(order => selectedOrders.value.includes(order.item_Id))
        .map(order => ({
            warehouse_Id: order.section_Id,
            item_Id: order.item_Id,
            revenue_Id: order.revenue_Id,
            quantity: order.Quantity,
            Carry_Quantity: order.Carry_Quantity,
            item_OnHand: order.item_OnHand,
            item_ListCost: order.item_ListCost,
            price: order.price,
            amount: order.amount,
    }));
}

const openRemarksDialog = () => {
    if (selectedOrders.value.length == 0) {
        useSnackbar(true, "error", "Please select an order to cancel.");
        return;
    }

    setPayloadProperties();
    open_remarks_dialog.value = true;
}

const closeRemarksDialog = () => {
    open_remarks_dialog.value = false;
}

const confirmCancelOrder = () => {
    cancelOrderConfirmation.value = true;
};

const onCancel = async (user_details) => {
    if (user_details.user_passcode === usePasscode()) {
        const response = await useMethod("post", "cancel-ancillary-order", payload.value);   
        if (response) {
            useSnackbar(true, "success", "Order successfully cancelled.");
            emits("ordered-carried");
            closeCancellation();
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

const closeCancellation = () => {
    cancelOrderConfirmation.value = false;
    closeRemarksDialog();
}

const confirmCarryOrder = () => {
    if (selectedOrders.value.length == 0) {
        useSnackbar(true, "error", "Please select an order to carry.");
        return;
    }
    for (let i = 0; i < selectedOrders.value.length; i++) {
        const order = props.item.items.find(order => order.item_Id == selectedOrders.value[i]);
        if (order.Carry_Quantity > order.Quantity) {
            useSnackbar(true, "error", "Carry quantity cannot be greater than the request quantity.");
            return;
        }
    }

    setPayloadProperties();
    carryOrderConfirmation.value = true;
};

const onSubmit = async (user_details) => {
    if (user_details.user_passcode === usePasscode()) {
        const response = await useMethod("post", "carry-ancillary-order", payload.value);   
        if (response) {
            useSnackbar(true, "success", "Order successfully carried.");
            emits("ordered-carried");
            closeConfirmation();
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

const closeConfirmation = () => {
    carryOrderConfirmation.value = false;
};

const closeDialog = () => {
    selectedOrders.value = [];
    payload.value = {
        Orders: [],
    };
    emits("close-dialog");
};

</script>

<style scoped>
</style>