<template>
    <v-row class="mb-2">
        <v-col cols="4">
            <v-row>
                <v-col cols="12">
                    <v-card elevation="4">
                        <v-card-text>
                            <p>
                                <span style="font-weight: bolder; font-style: italic; color: red;">NOTE: </span>&nbsp;This action is <span style="text-decoration: underline; font-weight: bolder;">irreversible</span>. 
                                Once the OR is cancelled, you cannot undo this action. And will need to re-issue a new OR.
                            </p>
                        </v-card-text>
                    </v-card>
                </v-col>
                <v-col cols="6">
                    <v-list-subheader class="form-header">OR Number</v-list-subheader>
                    <v-text-field
                        variant="solo"
                        density="compact"
                        @keyup.enter="searchORNumber"
                        v-model="payload.ORNumber"
                        required
                        hide-details
                    ></v-text-field>
                </v-col>
                <v-col cols="6">
                    <v-list-subheader class="form-header">TransDate</v-list-subheader>
                    <v-text-field
                        type="date"
                        variant="solo"
                        density="compact"
                        v-model="payload.CancelDate"
                        required
                        hide-details
                    ></v-text-field>
                </v-col>
                <v-col cols="12">
                    <v-list-subheader class="form-header">Reason for Cancellation</v-list-subheader>
                    <v-textarea
                        variant="solo"
                        density="compact"
                        v-model="payload.CancelledReason"
                        required
                        hide-details
                    ></v-textarea>
                </v-col>
            </v-row>
        </v-col>
        <v-col cols="8">
            <v-table density="compact" height="35vh"  class="styled-table" :hover="true">
                <thead>
                    <tr>
                        <th>Patient ID</th>
                        <th>Case No.</th>
                        <th>OR No.</th>
                        <th>Ref No.</th>
                        <th>Revenue ID</th>
                        <th>Particulars</th>
                        <th>Quantity</th>
                        <th>Amount</th>
                    </tr>
                </thead>
                <tbody>
                    <template v-for="(item, index) in table_data" :key="index">
                        <tr>
                            <td> {{ item.patient_Id }} </td>
                            <td> {{ item.case_No }} </td>
                            <td> {{ item.ORNumber }} </td>
                            <td> {{ item.refNum }}</td>
                            <td> {{ item.revenueID }} </td>
                            <td> {{ item?.items?.exam_description ? item?.items?.exam_description : item?.doctor_details?.doctor_name }} </td>
                            <td> {{ item.quantity }} </td>
                            <td> {{ usePeso(item.amount) }} </td>
                        </tr>
                    </template>
                </tbody>
            </v-table>
        </v-col>
    </v-row>
    <v-btn class="bg-info text-white mr-2" @click="resetTransactionForm">Reset</v-btn>
    <v-btn class="bg-error text-white" @click="openConfirmDialog">Cancel OR</v-btn>
    <Confirmation 
        :show="confirmDialog"
        :payload="password_payload"
        :loading="isLoadingBtn"
        :error_msg="error_msg"
        @submit="onSubmit"
        @close="closeConfirmDialog"
    />
</template>
<script setup>
const payload = ref({});
const table_data = ref([]);
const emits = defineEmits(["close-dialog"]);
const password_payload = ref({});
const confirmDialog = ref(false);
const isLoadingBtn = ref(false);
const user_attempts = ref(0);
const error_msg = ref('');

const openConfirmDialog = () => {
    if (payload.value.CancelledReason == null || payload.value.CancelDate == null) {
        return useSnackbar(true, "error", "Cancel Date and Reason for Cancellation is required.");
    } else {
        confirmDialog.value = true;
    }
};

const closeConfirmDialog = () => {
    confirmDialog.value = false;
};

const searchORNumber = async () => {
    if (payload.value.ORNumber) {
        const response = await useMethod("get", "get-or-for-cancellation?ORNumber=", "", payload.value.ORNumber);
        if (response && response.data) {
            if (response.data.length > 0) {
                table_data.value = response.data;
                payload.value.patient_Id = response.data[0].patient_Id;
                payload.value.case_No = response.data[0].case_No;
                payload.value.refNum = response.data[0].refNum;
            } else {
                return useSnackbar(true, "error", "OR Number not found.");
            }
        }
    } else {
        return useSnackbar(true, "error", "Please enter OR Number.");
    }
}

const resetTransactionForm = () => {
    payload.value = {};
    table_data.value = [];
};

const onSubmit = async (user_details) => {
    if (user_details.user_passcode === usePasscode()) {
        const response = await fetch(useApiUrl() + "/cancel-ornumber", {
            method: "put",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + useToken()
            },
            body: JSON.stringify({ items: payload.value })
        });
        if (response) {
            useSnackbar(true, "success", "OR Number cancelled successfully.");
            resetTransactionForm();
            closeConfirmDialog();
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

const formatDate = (date) => {
    const d = new Date(date);
    const month = '' + (d.getMonth() + 1);
    const day = '' + d.getDate();
    const year = d.getFullYear();
    
    return [year, month.padStart(2, '0'), day.padStart(2, '0')].join('-');
};

onMounted(() => {
    payload.value.CancelDate = formatDate(new Date());
});
</script>

<style scoped>
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
.styled-table::-webkit-scrollbar {
    width: 12px;
}
</style>