<template>
    <v-dialog :model-value="open_payment_form" rounded="lg" @update:model-value="closeDialog"  scrollable max-width="1120px">
        <form @submit.prevent="openConfirmDialog">
            <v-card rounded="lg" class="card">
                <v-toolbar density="compact" color="#107bac" hide-details>
                    <v-toolbar-title>OR Transaction Form</v-toolbar-title>
                    <v-spacer></v-spacer>
                    <v-btn color="white" @click="closeDialog">
                        <v-icon>mdi-close</v-icon>
                    </v-btn>
                </v-toolbar>
                <v-divider></v-divider>
                <v-card-text>
                    <v-row>
                        <v-col cols="6">
                            <v-row>
                                <v-col cols="6" class="form-col">
                                    <v-list-subheader class="form-header">OR Number</v-list-subheader>
                                    <v-text-field
                                        variant="solo"
                                        density="compact"
                                        required
                                        hide-details
                                    ></v-text-field>
                                </v-col>
                                <v-col cols="6" class="form-col">
                                    <v-list-subheader class="form-header">Payment Code</v-list-subheader>
                                    <v-autocomplete
                                        variant="solo"
                                        density="compact"
                                        required
                                        hide-details
                                    ></v-autocomplete>
                                </v-col>
                                <v-col cols="4" class="form-col">
                                    <v-list-subheader class="form-header">Case No</v-list-subheader>
                                    <v-text-field
                                        variant="solo"
                                        density="compact"
                                        required
                                        hide-details
                                    ></v-text-field>
                                </v-col>
                                <v-col cols="4" class="form-col">
                                    <v-list-subheader class="form-header">Account No</v-list-subheader>
                                    <v-text-field
                                        variant="solo"
                                        density="compact"
                                        required
                                        hide-details
                                    ></v-text-field>
                                </v-col>
                                <v-col cols="4" class="form-col">
                                    <v-list-subheader class="form-header">Charge Slip</v-list-subheader>
                                    <v-text-field
                                        variant="solo"
                                        density="compact"
                                        required
                                        hide-details
                                    ></v-text-field>
                                </v-col>
                                <v-col cols="12" class="form-col">
                                    <v-list-subheader class="form-header">Payors Name</v-list-subheader>
                                    <v-text-field
                                        variant="solo"
                                        density="compact"
                                        required
                                        hide-details
                                    ></v-text-field>
                                </v-col>
                                <v-divider class="mt-2 mb-2" />
                                <v-col cols="6" class="form-col">
                                    <v-list-subheader class="form-header">Hospital Bills</v-list-subheader>
                                    <v-text-field
                                        variant="solo"
                                        density="compact"
                                        required
                                        hide-details
                                    ></v-text-field>
                                </v-col>
                                <v-col cols="6" class="form-col">
                                    <v-list-subheader class="form-header">User</v-list-subheader>
                                    <v-text-field
                                        variant="solo"
                                        density="compact"
                                        required
                                        hide-details
                                    ></v-text-field>
                                </v-col>
                                <v-col cols="6" class="form-col">
                                    <v-list-subheader class="form-header">Credit Limit</v-list-subheader>
                                    <v-text-field
                                        variant="solo"
                                        density="compact"
                                        required
                                        hide-details
                                    ></v-text-field>
                                </v-col>
                                <v-col cols="6" class="form-col">
                                    <v-list-subheader class="form-header">Company</v-list-subheader>
                                    <v-text-field
                                        variant="solo"
                                        density="compact"
                                        required
                                        hide-details
                                    ></v-text-field>
                                </v-col>
                                <v-col cols="6" class="form-col">
                                    <v-list-subheader class="form-header">Collection Date</v-list-subheader>
                                    <v-text-field
                                        type="date"
                                        v-model="payload.collection_date"
                                        variant="solo"
                                        density="compact"
                                        required
                                        hide-details
                                    ></v-text-field>
                                </v-col>
                                <v-col cols="6" class="form-col">
                                    <v-list-subheader class="form-header">Shift</v-list-subheader>
                                    <v-text-field
                                        variant="solo"
                                        density="compact"
                                        required
                                        hide-details
                                    ></v-text-field>
                                </v-col>
                            </v-row>
                        </v-col>
                        <v-col cols="6">
                            <!-- <template> -->
                                <v-table density="compact" height="375" class="styled-table">
                                    <thead>
                                        <tr>
                                            <th>RefNum</th>
                                            <th>Revenue</th>
                                            <th>Item ID</th>
                                            <th>Patient ID</th>
                                            <th>Particulars</th>
                                            <th>Amount</th>
                                            <th>Quantity</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <!-- <template> -->
                                            <tr>
                                                <td style="margin: 0; padding: 1px;" width="100%"> </td>
                                                <td style="margin: 0; padding: 1px;" width="100%"> </td>
                                                <td style="margin: 0; padding: 1px;" width="100%"> </td>
                                                <td style="margin: 0; padding: 1px;" width="100%"> </td>
                                                <td style="margin: 0; padding: 1px;" width="100%"> </td>
                                                <td style="margin: 0; padding: 1px;" width="100%"> </td>
                                            </tr>
                                        <!-- </template> -->
                                    </tbody>
                                    <v-divider></v-divider>
                                </v-table>
                            <!-- </template> -->
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-divider class="mt-2 mb-2" />
                        <v-col cols="4">
                            <v-row>
                                <v-col cols="12" class="form-col">
                                    <v-list-subheader class="form-header">Charge Slip</v-list-subheader>
                                    <v-text-field
                                        variant="solo"
                                        density="compact"
                                        required
                                        hide-details
                                    ></v-text-field>
                                </v-col>
                                <v-col cols="12" class="form-col">
                                    <v-list-subheader class="form-header">Item Code / Qty</v-list-subheader>
                                    <v-text-field
                                        variant="solo"
                                        density="compact"
                                        required
                                        hide-details
                                    ></v-text-field>
                                </v-col>
                            </v-row>
                        </v-col>
                        <v-col cols="4">
                            <v-row>
                                <v-col cols="12" class="form-col">
                                    <v-list-subheader class="form-header">Discount</v-list-subheader>
                                    <v-text-field
                                        variant="solo"
                                        density="compact"
                                        required
                                        hide-details
                                    ></v-text-field>
                                </v-col>
                                <v-col cols="12" class="form-col">
                                    <v-list-subheader class="form-header">Withholding Tax</v-list-subheader>
                                    <v-text-field
                                        variant="solo"
                                        density="compact"
                                        required
                                        hide-details
                                    ></v-text-field>
                                </v-col>
                            </v-row>
                        </v-col>
                        <v-col cols="4">
                            <v-row>
                                <v-col cols="12" class="form-col">
                                    <v-list-subheader class="form-header">Item Amount</v-list-subheader>
                                    <v-text-field
                                        variant="solo"
                                        density="compact"
                                        required
                                        hide-details
                                    ></v-text-field>
                                </v-col>
                                <v-col cols="12" class="form-col">
                                    <v-list-subheader class="form-header">Sub Total</v-list-subheader>
                                    <v-text-field
                                        variant="solo"
                                        density="compact"
                                        required
                                        hide-details
                                    ></v-text-field>
                                </v-col>
                            </v-row>
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col cols="12" class="form-col">
                            <v-list-subheader class="form-header">Select mode of payment</v-list-subheader>
                            <v-col cols="4" class="form-col">
                                <v-autocomplete
                                    variant="solo"
                                    density="compact"
                                    required
                                    hide-details
                                    v-model="payment_method"
                                    :items="paymentMethods"
                                ></v-autocomplete>
                            </v-col>
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-divider class="mt-2 mb-2" />
                        <v-col cols="8" v-if="payment_method === 'Cash'">
                            <v-row>
                                <v-col cols="6" class="form-col">
                                    <v-list-subheader class="form-header">Cash Amount</v-list-subheader>
                                    <v-text-field
                                        variant="solo"
                                        density="compact"
                                        required
                                        hide-details
                                    ></v-text-field>
                                </v-col>
                                <v-col cols="6" class="form-col">
                                    <v-list-subheader class="form-header">Cash Tendered</v-list-subheader>
                                    <v-text-field
                                        variant="solo"
                                        density="compact"
                                        required
                                        hide-details
                                    ></v-text-field>
                                </v-col>
                                <v-col cols="6" class="form-col">
                                    <v-list-subheader class="form-header">Change</v-list-subheader>
                                    <v-text-field
                                        variant="solo"
                                        density="compact"
                                        required
                                        hide-details
                                    ></v-text-field>
                                </v-col>
                            </v-row>
                        </v-col>
                        <v-col cols="8" v-if="payment_method === 'Check'">
                            <v-row>
                                <v-col cols="6" class="form-col">
                                    <v-list-subheader class="form-header">Drawee Bank</v-list-subheader>
                                    <v-text-field
                                        variant="solo"
                                        density="compact"
                                        required
                                        hide-details
                                    ></v-text-field>
                                </v-col>
                                <v-col cols="6" class="form-col">
                                    <v-list-subheader class="form-header">Check No.</v-list-subheader>
                                    <v-text-field
                                        variant="solo"
                                        density="compact"
                                        required
                                        hide-details
                                    ></v-text-field>
                                </v-col>
                                <v-col cols="6" class="form-col">
                                    <v-list-subheader class="form-header">Check Date</v-list-subheader>
                                    <v-text-field
                                        type="date"
                                        variant="solo"
                                        density="compact"
                                        required
                                        hide-details
                                    ></v-text-field>
                                </v-col>
                                <v-col cols="6" class="form-col">
                                    <v-list-subheader class="form-header">Amount</v-list-subheader>
                                    <v-text-field
                                        type="number"
                                        variant="solo"
                                        density="compact"
                                        required
                                        hide-details
                                    ></v-text-field>
                                </v-col>
                            </v-row>
                        </v-col>
                        <v-col cols="8" v-if="payment_method === 'Credit'">
                            <v-row>
                                <v-col cols="6" class="form-col">
                                    <v-list-subheader class="form-header">Card</v-list-subheader>
                                    <v-text-field
                                        variant="solo"
                                        density="compact"
                                        required
                                        hide-details
                                    ></v-text-field>
                                </v-col>
                                <v-col cols="6" class="form-col">
                                    <v-list-subheader class="form-header">Approval #</v-list-subheader>
                                    <v-text-field
                                        variant="solo"
                                        density="compact"
                                        required
                                        hide-details
                                    ></v-text-field>
                                </v-col>
                                <v-col cols="6" class="form-col">
                                    <v-list-subheader class="form-header">Date</v-list-subheader>
                                    <v-text-field
                                        type="date"
                                        variant="solo"
                                        density="compact"
                                        required
                                        hide-details
                                    ></v-text-field>
                                </v-col>
                                <v-col cols="6" class="form-col">
                                    <v-list-subheader class="form-header">Card Amount</v-list-subheader>
                                    <v-text-field
                                        type="number"
                                        variant="solo"
                                        density="compact"
                                        required
                                        hide-details
                                    ></v-text-field>
                                </v-col>
                            </v-row>
                        </v-col>
                        <v-col cols="4">
                            <v-row>
                                <v-col cols="12" class="form-col">
                                    <p style="font-size: 18px; font-weight: bold; padding-bottom: 10px;">Total Payment:</p>
                                    <v-text-field
                                        variant="outlined"
                                        density="compact"
                                        required
                                        hide-details
                                    ></v-text-field>
                                </v-col>
                            </v-row>
                        </v-col>
                    </v-row>
                </v-card-text>
                <v-divider></v-divider>
                <v-card-actions>
                    <v-btn variant="outlined" color="info" @click="closeDialog"> Close </v-btn>
                    <v-spacer></v-spacer>
                    <v-btn class="bg-info text-white" type="submit">Reset</v-btn>
                    <v-btn class="bg-primary text-white" type="submit">Save</v-btn>
                </v-card-actions>
            </v-card>
        </form>
    </v-dialog>
    <Confirmation 
        :show="confirmDialog"
        :payload="password_payload"
        @submit="onSubmit"
        @close="closeConfirmDialog"
    />
</template>
<script setup>
const props = defineProps({
    open_payment_form: {
        type: Boolean,
        default: () => false,
        required: true,
    },
    payload: {
        type: Object,
        default: () => {},
        required: false,
    }
});

const { selectedRowDetails } = storeToRefs(useSubcomponentSelectedRowDetailsStore());
const emits = defineEmits(["close-dialog"]);
const password_payload = ref({});
const confirmDialog = ref(false);
const payment_method = ref("");
const paymentMethods = ["Cash", "Credit", "Check"];

const closeDialog = () => {
    emits("close-dialog");
    password_payload.value = {};
    payment_method.value = "";
};

const openConfirmDialog = () => {
    confirmDialog.value = true;
};

const closeConfirmDialog = () => {
    confirmDialog.value = false;
};

const onSubmit = async (user_details) => {
    if (user_details.user_passcode === usePasscode()) {
        alert("TEST CANCELLATION");
        closeConfirmDialog();
        closeDialog();
    } else {
        return useSnackbar(true, "error", "Password incorrect.");
    }
};
</script>

<style scoped>
.form-header {
    color: #000;
    margin: -12px 0px -12px 0px;
    font-weight: 500;
}
.form-col {
    padding: 3.25px 5px 3.25px 5px !important;
    margin: 0px !important;
}
.styled-table th {
    padding: 8px;
    border: 1px solid #eceaea;
    margin: 0;
}
.styled-table {
    background-color: #f8f8f8;
    margin: 0;
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
    border-radius: 10px; 
    border: 3px solid #f5f5f5; 
}
.styled-table::-webkit-scrollbar-track {
    background-color: #f5f5f5; 
    border-radius: 10px; 
}
</style>