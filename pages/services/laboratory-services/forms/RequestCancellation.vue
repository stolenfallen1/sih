<template>
    <v-dialog :model-value="open_request_cancellation" rounded="lg" @update:model-value="closeDialog" max-width="1120px">
        <v-card rounded="lg">
        <v-toolbar density="compact" color="#107bac" hide-details>
            <v-toolbar-title>Request Cancellation</v-toolbar-title>
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
                        <v-col cols="12">
                            <v-text-field
                                v-model="payload.patient_name"
                                label="Patient Name"
                                variant="outlined"
                                density="compact"
                                hide-details
                                outlined
                                readonly
                            ></v-text-field>
                        </v-col>
                    </v-row>
                </v-col>
                <v-col cols="3">
                    <v-row>
                        <v-col cols="12">
                            <v-text-field
                                v-model="payload.patient_Id"
                                label="Patient ID"
                                variant="outlined"
                                density="compact"
                                hide-details
                                outlined
                                readonly
                            ></v-text-field>
                        </v-col>
                    </v-row>
                </v-col>
                <v-col cols="3">
                    <v-row>
                        <v-col cols="12">
                            <v-text-field
                                v-model="payload.case_No"
                                label="Case No"
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
                <v-col cols="2">
                    <v-row>
                        <v-col cols="12">
                            <v-text-field
                                v-model="payload.patient_Age"
                                label="Age"
                                variant="outlined"
                                density="compact"
                                hide-details
                                outlined
                                readonly
                            ></v-text-field>
                        </v-col>
                    </v-row>
                </v-col>
                <v-col cols="2">
                    <v-row>
                        <v-col cols="12">
                            <v-text-field
                                v-model="payload.registry_Date"
                                label="Registry Date"
                                variant="outlined"
                                density="compact"
                                hide-details
                                outlined
                                readonly
                            ></v-text-field>
                        </v-col>
                    </v-row>
                </v-col>
                <v-col cols="5">
                    <v-row>
                        <v-col cols="12">
                            <v-text-field
                                v-model="payload.attending_Doctor_fullname"
                                label="Requesting Physician"
                                variant="outlined"
                                density="compact"
                                hide-details
                                outlined
                                readonly
                            ></v-text-field>
                        </v-col>
                    </v-row>
                </v-col>
                <v-col cols="3">
                    <v-row>
                        <v-col cols="12">
                            <v-text-field
                                v-model="payload.account"
                                label="Account"
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
            <v-divider style="margin-top: 20px;"></v-divider>
            <v-row>
                <v-col cols="12">
                    <v-data-table-server
                        class="animated animatedFadeInUp fadeInUp"
                        v-model:items-per-page="itemsPerPage"
                        :headers="headers"
                        :items="serverItems"
                        :items-length="totalItems"
                        :loading="data.loading"
                        :hover="true"
                        item-value="itemcharged"
                        @update:options="initialize"
                        fixed-header
                        density="compact"
                        height="60vh"
                    >
                        <template
                            v-for="(head, index) of headers"
                            v-slot:[`item.${head.value}`]="props"
                        >
                            <td class="test" :props="props" :key="index">
                            <slot :name="head.value" :item="props.item">
                                {{ props.item[head.value] || "..." }}
                            </slot>
                            </td>
                        </template>
                        <template v-slot:item.renderdate="{ item }">
                            {{ item.renderdate ? useDateMMDDYYY(item.renderdate) : "" }}
                        </template>
                        <template v-slot:item.requestStatus="{ item }">
                            <v-chip color="orange" v-if="item.requestStatus == 'X'">Pending</v-chip>
                            <v-chip color="green" v-else>Done</v-chip>
                        </template>
                        <template v-slot:item.resultStatus="{ item }">
                            <v-chip color="orange" v-if="item.resultStatus == 'X'">Pending</v-chip>
                            <v-chip color="green" v-else>Done</v-chip>
                        </template>
                        <template v-slot:item.archive="{ item }">
                            <v-icon style="color: red; cursor: pointer;" @click="openRemarksForm(item.itemcharged)">mdi-archive-alert</v-icon>
                        </template>
                        <template v-slot:item.cancel="{ item }">
                            <v-icon style="color: red; cursor: pointer;" @click="cancelLabItem">mdi-trash-can</v-icon>
                        </template>
                    </v-data-table-server>
                </v-col>
            </v-row>
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue-darken-1 border border-info" @click="closeDialog"> Close </v-btn>
        </v-card-actions>
        </v-card>
    </v-dialog>
    <v-dialog
        :model-value="open_cancellation_remarks"
        @update:model-value="closeRemarksForm"
        rounded="lg"
        max-width="500px"
    >
        <form>
            <v-card rounded="lg">
                <v-toolbar density="compact" color="#107bac" hide-details>
                    <v-toolbar-title>Clear Patient</v-toolbar-title>
                    <v-spacer></v-spacer>
                    <v-btn color="white" @click="closeRemarksForm">
                        <v-icon>mdi-close</v-icon>
                    </v-btn>
                </v-toolbar>
                <v-card-text>
                    <v-row>
                        <v-col cols="12">
                            <v-textarea 
                                label="Remarks"
                                placeholder="Enter cancellation remarks here"
                                v-model="payload.remarks"
                                variant="outlined"
                                density="compact"
                                hide-details
                                required
                            ></v-textarea>
                        </v-col>
                    </v-row>
                </v-card-text>
                <v-divider></v-divider>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn class="bg-primary text-white" @click="confirmOnCancel">Save Remarks</v-btn>
                    <v-btn color="blue-darken-1 border border-info" @click="closeRemarksForm">Close</v-btn>
                </v-card-actions>
            </v-card>
        </form>
    </v-dialog>

    <Confirmation
        :show="cancelconfirmation"
        :payload="payload"
        @submit="archiveLabItem"
        @close="closeConfirmOnCancel"
    />
</template>

<script setup>
const props = defineProps({
    open_request_cancellation: {
        type: Boolean,
        default: () => false,
        required: true,
    },
    items: {
        type: Object,
        default: () => {},
        required: true,
    }
});

const { selectedRowDetails, isrefresh } = storeToRefs(useSubcomponentSelectedRowDetailsStore());
const payload = ref({});
const emits = defineEmits(["close-dialog"]);
const open_cancellation_remarks = ref(false);
const cancelconfirmation = ref(false);
const itemsToArchive = ref([]);
const item_value = ref(null);

const data = ref({
    title: "List of Patient Lab Charges",
    keyword: "",
    loading: false,
    filter: {},
    tab: 0,
    param_tab: 1,
});
const headers = [
    { title: "Ref No.", key: "refNum", align: "start", sortable: false },
    { title: "Profile ID", key: "itemcharged", align: "start", sortable: false },
    { title: "Exam ID", key: "itemid", align: "start", sortable: false },
    { title: "Exam", key: "exam", align: "start", sortable: false },
    { title: "Specimen", key: "specimen", align: "start", sortable: false },
    { title: "Quantity", key: "qty", align: "start", sortable: false },
    { title: "Rendered By", key: "renderby", align: "start", sortable: false },
    { title: "Rendered Date", key: "renderdate", align: "start", sortable: false },
    { title: "Request Status", key: "requestStatus", align: "start", sortable: false },
    { title: "Result Status", key: "resultStatus", align: "start", sortable: false },
    { title: "", key: "archive", align: "start", sortable: false },
    { title: "", key: "cancel", align: "start", sortable: false },
];

const itemsPerPage = ref(20);
const totalItems = ref(0);
const serverItems = ref([]);

const initialize = ({ page, itemsPerPage }) => {
    loadItems(page, itemsPerPage);
};

const loadItems = async (page = null, itemsPerPage = null) => {
    data.value.loading = true;
    let pageno = page || 1;
    let itemPerpageno = itemsPerPage || 20;
    let params = `page=${pageno}&per_page=${itemPerpageno}`;

    try {
        const response = await fetch(useApiUrl() + `/get-lab-exams-uncancelled?${params}`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + useToken() 
            },
            body: JSON.stringify({
                items: props.items,
            })
        });

        if (response.ok) {
            const responseData = await response.json();
            serverItems.value = responseData.data;
            totalItems.value = responseData.total;
        } 
    } catch (error) {
        useSnackbar(true, "green", "Error fetching data");
        console.error(error);
    } finally {
        data.value.loading = false;
    }
};

const openRemarksForm = (itemValue) => {
    itemsToArchive.value = serverItems.value.filter(item => item.itemcharged === itemValue);
    item_value.value = itemValue;
    open_cancellation_remarks.value = true;
}

const closeRemarksForm = () => {
    open_cancellation_remarks.value = false;
}

// Staff cancellation
const archiveLabItem = async (user_details) => {
    if (user_details.user_passcode === usePasscode()) {
        const items = {
            itemcharged: item_value.value,
            case_No: payload.value.case_No,
            remarks: payload.value.remarks,
        };
        if (itemsToArchive.value.length > 1) {
            const confirmCancellation = window.confirm("This exam is a part of a package panel. By cancelling this exam, all exams under this package will be cancelled. Do you want to proceed?");
            if (confirmCancellation) {
                const response = await fetch(useApiUrl() + "/archive-lab-exam", {
                method: "post",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + useToken()
                },
                    body: JSON.stringify({ items: items })
                });
                if (response) {
                    closeConfirmOnCancel();
                    closeRemarksForm();
                    loadItems();
                    return useSnackbar(true, "green", "Exam cancelled successfully");
                } else {
                    return useSnackbar(true, "error", "Cancellation failed");
                }
            } else {
                closeConfirmOnCancel();
                closeRemarksForm();
                useSnackbar(true, "red", "Failed to cancel Exam");
            }
        } else {
            const response = await fetch(useApiUrl() + "/archive-lab-exam", {
            method: "post",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + useToken()
            },
                body: JSON.stringify({ items: items })
            });
            if (response) {
                closeConfirmOnCancel();
                closeRemarksForm();
                loadItems();
                return useSnackbar(true, "green", "Exam cancelled successfully");
            } else {
                return useSnackbar(true, "error", "Cancellation failed");
            }
        } 
    } else {
        return useSnackbar(true, "red", "Invalid passcode");
    }
};

const confirmOnCancel = () => {
    if (payload.value.remarks == null || payload.value.remarks == "") {
        return useSnackbar(true, "red", "Remarks is required");
    } else {
        cancelconfirmation.value = true;
    }
}

const closeConfirmOnCancel = () => {
    cancelconfirmation.value = false;
}

// Head Staff / Supervisor cancellation
const cancelLabItem = () => {
    // API ROUTE: cancel-lab-exam
    useSnackbar(true, "green", "Cancel Lab Item");
};

const closeDialog = () => {
    emits("close-dialog");
};

onUpdated(() => {
    if (selectedRowDetails.value != null) {
        payload.value.patient_name = 
        (selectedRowDetails.value?.patient_details?.lastname ? selectedRowDetails.value?.patient_details?.lastname : "N/A") + 
        ", " + (selectedRowDetails.value?.patient_details?.firstname ? selectedRowDetails.value?.patient_details?.firstname : "N/A") + 
        " " + (selectedRowDetails.value?.patient_details?.middlename ? selectedRowDetails.value?.patient_details?.middlename : "N/A");
        payload.value.patient_Id = selectedRowDetails.value?.patient_Id;
        payload.value.case_No = selectedRowDetails.value?.case_No;
        payload.value.patient_Age = selectedRowDetails.value?.patient_Age ? selectedRowDetails.value?.patient_Age : "N/A";
        payload.value.registry_Date = selectedRowDetails.value?.registry_Date ? useDateMMDDYYY(selectedRowDetails.value?.registry_Date) : "N/A";
        payload.value.attending_Doctor_fullname = selectedRowDetails.value?.attending_Doctor_fullname ? selectedRowDetails.value?.attending_Doctor_fullname : "N/A";
        payload.value.account = selectedRowDetails.value?.mscPrice_Schemes && selectedRowDetails.value?.mscPrice_Schemes  == 1 ? "Self-Pay" : "Company / Insurance";
    } 
})
</script>

<style scoped>
</style>