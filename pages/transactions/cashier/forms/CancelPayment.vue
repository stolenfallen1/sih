<template>
    <v-row>
        <v-col cols="4">
            <v-row>
                <v-col cols="12">
                    <v-card elevation="4">
                        <v-card-text>
                            <p>
                                <span style="font-weight: bold; font-style: italic;" >NOTE: </span>&nbsp;This action is irreversible. 
                                Once the OR is cancelled, you cannot undo this action. And will need to re-issue a new OR.
                            </p>
                        </v-card-text>
                    </v-card>
                </v-col>
                <v-col cols="6">
                    <v-text-field
                        variant="solo"
                        density="compact"
                        label="OR Number"
                        @keyup.enter="searchORNumber"
                        v-model="payload.RefNum"
                        required
                        hide-details
                    ></v-text-field>
                </v-col>
                <v-col cols="6">
                    <v-text-field
                        type="date"
                        variant="solo"
                        density="compact"
                        label="TransDate"
                        required
                        hide-details
                    ></v-text-field>
                </v-col>
                <v-col cols="12">
                    <v-textarea
                        variant="solo"
                        density="compact"
                        label="Reason for Cancellation"
                        required
                        hide-details
                    ></v-textarea>
                </v-col>
            </v-row>
        </v-col>
        <v-col cols="8">
            <!-- <template> -->
                <v-table density="compact" height="325" class="styled-table">
                    <thead>
                        <tr>
                            <th>Patient ID</th>
                            <th>Revenue ID</th>
                            <th>RefNum</th>
                            <th>Particulars</th>
                            <th>Amount</th>
                            <th>Quantity</th>
                        </tr>
                    </thead>
                    <tbody>
                        <!-- <template> -->
                            <tr>
                                <td> </td>
                                <td> </td>
                                <td> </td>
                                <td> </td>
                                <td> </td>
                            </tr>
                        <!-- </template> -->
                    </tbody>
                    <v-divider></v-divider>
                </v-table>
            <!-- </template> -->
        </v-col>
    </v-row>
    <v-btn class="bg-error text-white" type="submit">Cancel OR</v-btn>
    <Confirmation 
        :show="confirmDialog"
        :payload="password_payload"
        @submit="onSubmit"
        @close="closeConfirmDialog"
    />
</template>
<script setup>

const { selectedRowDetails } = storeToRefs(useSubcomponentSelectedRowDetailsStore());
const payload = ref({});
const emits = defineEmits(["close-dialog"]);
const password_payload = ref({});
const confirmDialog = ref(false);

const closeDialog = () => {
    emits("close-dialog");
    password_payload.value = {};
};

const openConfirmDialog = () => {
    confirmDialog.value = true;
};

const closeConfirmDialog = () => {
    confirmDialog.value = false;
};

const searchORNumber = async () => {
    if (payload.value.RefNum) {
        const response = await useMethod("get", "get-ornumber?RefNum=", "", payload.value.RefNum);
        if (response) {
            console.log(response);
        } else if (response && response.data && response.data.length === 0) {
            return useSnackbar(true, "error", "OR Number not found.");
        }
    } else {
        return useSnackbar(true, "error", "Please enter OR Number.");
    }
}

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
.styled-table th {
    padding: 8px;
    border: 1px solid #eceaea;
    margin: 0;
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