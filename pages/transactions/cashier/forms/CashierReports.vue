<template>
    <v-row class="mb-2">
        <v-col cols="6">
            <v-row>
                <v-col cols="12">
                    <p style="font-weight: bolder; color: red; font-size: larger; padding-bottom: 10px;">Detailed Reports</p>
                    <v-list-subheader class="form-header">Report Date</v-list-subheader>
                    <v-text-field
                        variant="solo"
                        density="compact"
                        type="date"
                        @keyup.enter="searchORNumber"
                        v-model="payload.ORNumber"
                        required
                        hide-details
                    ></v-text-field>
                </v-col>
                <v-col cols="12">
                    <v-list-subheader class="form-header">Encoder Options</v-list-subheader>
                    <v-radio-group density="compact" hide-details>
                        <v-checkbox label="All Encoders" value="0" hide-details density="compact"></v-checkbox>
                        <v-row>
                            <v-col cols="6">
                                <v-checkbox label="Per Encoder" value="1" hide-details density="compact"></v-checkbox>
                            </v-col>
                            <v-col cols="6">
                                <v-text-field
                                    placeholder="Enter Encoder Name"
                                    variant="solo"
                                    density="compact"
                                    hide-details
                                    readonly
                                />
                            </v-col>
                        </v-row>
                    </v-radio-group>
                </v-col>
                <v-col cols="12">
                    <v-list-subheader class="form-header">Shift Options</v-list-subheader>
                    <v-radio-group density="compact" hide-details>
                        <v-checkbox label="All Shifts" value="0" hide-details density="compact"></v-checkbox>
                        <v-row>
                            <v-col cols="6">
                                <v-checkbox label="Specific Shift" value="0" hide-details density="compact"></v-checkbox>
                            </v-col>
                            <v-col cols="6">
                                <v-autocomplete
                                    placeholder="Select Shift"
                                    variant="solo"
                                    density="compact"
                                    hide-details
                                    readonly
                                />
                            </v-col>
                        </v-row>
                    </v-radio-group>
                </v-col>
                <v-btn class="bg-primary text-white" style="margin-left: 10px;">Print Preview</v-btn>
            </v-row>
        </v-col>
        <v-col cols="6">
            <v-row>
                <v-col cols="12">
                    <p style="font-weight: bolder; color: red; font-size: larger; padding-bottom: 10px;">Summary Reports</p>
                    <v-list-subheader class="form-header">Report Date</v-list-subheader>
                    <v-text-field
                        variant="solo"
                        density="compact"
                        type="date"
                        @keyup.enter="searchORNumber"
                        v-model="payload.ORNumber"
                        required
                        hide-details
                    ></v-text-field>
                </v-col>
                <v-col cols="12">
                    <v-list-subheader class="form-header">Encoder Options</v-list-subheader>
                    <v-radio-group density="compact" hide-details>
                        <v-checkbox label="All Encoders" value="0" hide-details density="compact"></v-checkbox>
                        <v-row>
                            <v-col cols="6">
                                <v-checkbox label="Per Encoder" value="1" hide-details density="compact"></v-checkbox>
                            </v-col>
                            <v-col cols="6">
                                <v-text-field
                                    placeholder="Enter Encoder Name"
                                    variant="solo"
                                    density="compact"
                                    hide-details
                                    readonly
                                />
                            </v-col>
                        </v-row>
                    </v-radio-group>
                </v-col>
                <v-col cols="12">
                    <v-list-subheader class="form-header">Shift Options</v-list-subheader>
                    <v-radio-group density="compact" hide-details>
                        <v-checkbox label="All Shifts" value="0" hide-details density="compact"></v-checkbox>
                        <v-row>
                            <v-col cols="6">
                                <v-checkbox label="Specific Shift" value="0" hide-details density="compact"></v-checkbox>
                            </v-col>
                            <v-col cols="6">
                                <v-autocomplete
                                    placeholder="Select Shift"
                                    variant="solo"
                                    density="compact"
                                    hide-details
                                    readonly
                                />
                            </v-col>
                        </v-row>
                    </v-radio-group>
                </v-col>
                <v-btn class="bg-primary text-white" style="margin-left: 10px;">Print Preview</v-btn>
            </v-row>
        </v-col>
    </v-row>
    <Confirmation 
        :show="confirmDialog"
        :payload="password_payload"
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

const openConfirmDialog = () => {
    if (payload.value.CancelledReason == null || payload.value.CancelDate == null) {
        return useSnackbar(true, "error", "Cancel Date and Reason for Cancellation is required.");
    } 
    if (payload.value.CancelledReason.toLowerCase().includes("system")) {
        return useSnackbar(true, "error", "System Error as Reason is invalid.");
    }
    confirmDialog.value = true;
};

const closeConfirmDialog = () => {
    confirmDialog.value = false;
};

const searchORNumber = async () => {
    if (payload.value.ORNumber) {
        const response = await useMethod("get", "get-ornumber?ORNumber=", "", payload.value.ORNumber);
        if (response && response.data) {
            if (response.data.length > 0) {
                table_data.value = response.data;
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