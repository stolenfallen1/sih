<template>
    <v-row>
        <v-col cols="5">
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
                        readonly
                        variant="solo"
                        density="compact"
                        label="OR Number"
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
        <v-col cols="7">
            <!-- <template> -->
                <v-table density="compact" height="325" class="styled-table">
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
    <v-btn class="bg-error text-white" type="submit">Cancel OR</v-btn>
    <Confirmation 
        :show="confirmDialog"
        :payload="password_payload"
        @submit="onSubmit"
        @close="closeConfirmDialog"
    />
</template>
<script setup>
const props = defineProps({
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