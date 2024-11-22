<template>
    <v-dialog :model-value="open_pending_patients_list" rounded="lg" @update:model-value="closeDialog" max-width="1120px">
        <v-card rounded="lg">
            <v-toolbar density="compact" color="#107bac" hide-details>
                <v-toolbar-title>
                    Pending Patient's List
                    {{ patient_type == 2 ? '( OUTPATIENT )' : (patient_type == 5 ? '( EMERGENCY )' : '( INPATIENT )') }}
                </v-toolbar-title>
                <v-spacer></v-spacer>
                <v-btn color="white" @click="closeDialog">
                <v-icon>mdi-close</v-icon>
                </v-btn>
            </v-toolbar>
            <v-card-text>
                <v-data-table
                    density="compact"
                    height="70vh"
                    :headers="patient_table_headers"
                    :items="props.item"
                    :items-per-page="100"
                    :hover="true"
                    hide-details
                >
                    <template v-slot:item="{ item }">
                        <tr style="cursor: pointer;" @click="handleSelectedItem(item)">
                            <td>{{ item.patient_Id }}</td>
                            <td>{{ item.case_No }}</td>
                            <td>{{ item.patient_Name }}</td>
                            <td>{{ item.refNum }}</td>
                        </tr>
                    </template>
                    <template #bottom />
                </v-data-table>
            </v-card-text>
        </v-card>
    </v-dialog>

    <v-dialog v-model="open_carry_order_form" rounded="lg" @update:model-value="closeCarryOrder" max-width="1020px">
        <v-card rounded="lg">
            <v-toolbar density="compact" color="#107bac" hide-details>
                <v-toolbar-title>
                    Carry Laboratory Order
                    {{ patient_type == 2 ? '( OUTPATIENT )' : (patient_type == 5 ? '( EMERGENCY )' : '( INPATIENT )') }}
                </v-toolbar-title>
                <v-spacer></v-spacer>
                <v-btn color="white" @click="closeCarryOrder">
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
                                    v-model="patient_details.patient_Name"
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
                                    v-model="patient_details.patient_Id"
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
                                    v-model="patient_details.case_No"
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
                                    v-model="patient_details.refNum"
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
                            :headers="table_headers"
                            :items="Object.keys(patient_details.lab_services)"
                            height="40vh"
                            density="compact"
                            hide-details
                            :hover="true"
                            fixed-header
                        >
                            <template v-slot:body>
                                <template v-for="(services, profileId) in patient_details.lab_services" :key="profileId">
                                    <tr>
                                        <td colspan="100%" style="font-weight: 500; font-size: medium; background-color: #f0f0f0;">
                                            <div style="display: flex; justify-content: space-between; align-items: center; width: 100%;">
                                                <div style="display: flex; align-items: center;">
                                                    <v-checkbox
                                                        v-model="selectedOrders"
                                                        :value="profileId" 
                                                        density="compact"
                                                        hide-details
                                                    />
                                                    <span style="margin-left: 10px;">Profile ID: {{ profileId }}</span> 
                                                </div>
                                                <div style="flex-grow: 1;"></div> 
                                            </div>
                                        </td>
                                    </tr>
                                    <tr v-for="item in services" :key="item.id" style="cursor: pointer;">
                                        <td></td> <!-- spacer -->
                                        <td>{{ item.itemId }}</td>
                                        <td>{{ item.description }}</td>
                                        <td>{{ parseInt(item.quantity) }}</td>
                                        <td>
                                            <v-chip color="warning" v-if="item.request_Status == 'X'" >
                                                {{ 'Pending' }}
                                            </v-chip>
                                            <v-chip color="success" v-else>
                                                {{ 'N/A' }}
                                            </v-chip>
                                        </td>
                                    </tr>
                                </template>
                            </template>
                            <template #bottom />
                        </v-data-table>
                    </v-card-text>
                </v-card>
            </v-card-text>
            <v-card-actions>
                <v-btn color="blue-darken-1 border border-info border border-info" @click="closeCarryOrder"> Close </v-btn>
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
    open_pending_patients_list: {
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
const open_carry_order_form = ref(false);
const open_remarks_dialog = ref(false);
const carryOrderConfirmation = ref(false);
const cancelOrderConfirmation = ref(false);
const error_msg = ref('');
const user_attempts = ref(0);
const patient_details = ref({});
const selectedOrders = ref([]);

const patient_table_headers = [
    { title: "Patient ID", align: "start", key: "patient_Id", sortable: false },
    { title: "Case No", align: "start", key: "case_No", sortable: false },
    { title: "Patient Name", align: "start", key: "patient_Name", sortable: false },
    { title: "Request Num", align: "start", key: "", sortable: false },
]

const table_headers = [
    { title: "", align: "start", key: "spacer", sortable: false },
    { title: "Exam ID", align: "start", key: "itemId", sortable: false },
    { title: "Description", align: "start", key: "description", sortable: false },
    { title: "Quantity", align: "start", key: "Quantity", sortable: false },
    { title: "Status", align: "start", key: "request_Status", sortable: false },
];

const emits = defineEmits(["close-dialog"]);

const setPayloadProperties = () => {
    payload.value.patient_Id = patient_details.value.patient_Id;
    payload.value.case_No = patient_details.value.case_No;
    payload.value.refNum = patient_details.value.refNum;
    payload.value.patient_Type = props.patient_type == 2 ? 'O' : (props.patient_type == 5 ? 'E' : 'I');
    payload.value.Orders = [];

    if (patient_details.value.lab_services) {

        Object.keys(patient_details.value.lab_services).forEach(profileId => {
            const orders = patient_details.value.lab_services[profileId];
            const filteredOrders = orders.filter(order => selectedOrders.value.includes(order.profileId));

            if (filteredOrders.length > 0) {
                filteredOrders.forEach(order => {
                    payload.value.Orders.push({
                        profileId: order.profileId,
                        itemId: order.itemId,
                    });
                });
            }
        });
    }
};



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
    if (payload.value.remarks == "" || payload.value.remarks == null) {
        useSnackbar(true, "error", "Please provide a reason for cancelling the order.");
        return;
    }
    cancelOrderConfirmation.value = true;
};

const onCancel = async (user_details) => {
    if (user_details.user_passcode === usePasscode()) {
        isLoadingBtn.value = true;
        try {
            const response = await useMethod("post", "cancel-laboratory-exam", payload.value);   
            if (response) {
                useSnackbar(true, "success", "Lab Requests successfully cancelled.");
                closeCancellation();
                closeRemarksDialog();
                closeCarryOrder();
                closeDialog();
            } 
        } catch (error) {
            useSnackbar(true, "error", "Call IT Department!");
        } finally {
            isLoadingBtn.value = false;
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
}

const handleSelectedItem = (item) => {
    patient_details.value = item;
    open_carry_order_form.value = true;
}

const confirmCarryOrder = () => {
    if (selectedOrders.value.length == 0) {
        useSnackbar(true, "error", "Please select an order to carry.");
        return;
    }
    
    setPayloadProperties();
    carryOrderConfirmation.value = true;
};

const onSubmit = async (user_details) => {
    if (user_details.user_passcode === usePasscode()) {
        isLoadingBtn.value = true;
        try {
            const response = await useMethod("post", "carry-laboratory-exam", payload.value);   
            if (response) {
                useSnackbar(true, "success", "Lab Requests successfully carried.");
                closeConfirmation();
                closeCarryOrder();
                closeDialog();
            } 
        } catch (error) {
            useSnackbar(true, "error", "Call IT Department!");
        } finally {
            isLoadingBtn.value = false;
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

const closeCarryOrder = () => {
    selectedOrders.value = [];
    payload.value = {
        Orders: [],
    };
    open_carry_order_form.value = false;
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