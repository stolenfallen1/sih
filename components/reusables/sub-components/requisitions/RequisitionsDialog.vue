<template>
    <v-dialog v-if="isDischarge !== null" :model-value="show" rounded="lg" scrollable @update:model-value="closeDialog" max-width="400px"> 
        <v-alert
            border="left"
            color="red"
            dismissible
            elevation="24"
            icon="mdi-alert-circle"
        >
           <div class="note">
                <span>Note:</span>
                <p class="message">Cannot post or request charges for patients that have been discharged.</p>
           </div>
          
        </v-alert>
    </v-dialog>
    <v-dialog v-if="isDischarge === null" :model-value="show" rounded="lg" scrollable @update:model-value="closeDialog" max-width="1120px">    
        <v-card rounded="lg">
            <v-toolbar density="compact" color="#107bac" hide-details>
                <v-toolbar-title>Requisitions Charges to Patient's Account</v-toolbar-title>
                <v-btn class="mr-4" density="compact" style="background-color: #FFF;">
                    <v-icon style="color: #000;">mdi-help-circle-outline</v-icon>
                    <v-menu activator="parent">
                        <v-list>
                            <v-list-item>
                                <div style="display: flex; align-items: center;">
                                    <span style="width: 10px; height: 10px; background-color: blue; margin-right: 10px;"></span>
                                    <v-list-item-title>Medicines</v-list-item-title>
                                </div>
                            </v-list-item>
                            <v-list-item>
                                <div style="display: flex; align-items: center;">
                                    <span style="width: 10px; height: 10px; background-color: red; margin-right: 10px;"></span>
                                    <v-list-item-title>Supplies</v-list-item-title>
                                </div>
                            </v-list-item>
                            <v-list-item>
                                <div style="display: flex; align-items: center;">
                                    <span style="width: 10px; height: 10px; background-color: green; margin-right: 10px;"></span>
                                    <v-list-item-title>Procedures</v-list-item-title>
                                </div>
                            </v-list-item>
                        </v-list>
                    </v-menu>
                </v-btn>
                <v-btn color="white" @click="closeDialog">
                    <v-icon>mdi-close</v-icon>
                </v-btn>
            </v-toolbar>
            <v-divider></v-divider>
            <v-card-text>
                <v-row>
                    <v-col cols="6">
                        <v-text-field
                            label="Searh by Description / Code / Item ID"
                            variant="outlined"
                            density="compact"
                            prepend-inner-icon="mdi-magnify"
                            hide-details
                            v-model="data.keyword"
                            @keyup.enter="search"
                        ></v-text-field>
                    </v-col>
                    <v-col cols="3">
                        <v-btn class="bg-success text-white" @click="openRenderedTransaction"> Rendered Transactions </v-btn>
                    </v-col>
                    <v-col cols="3">
                        <v-btn class="bg-error text-white" @click="openCancelledTransaction"> Cancelled Transactions </v-btn>
                    </v-col>
                </v-row>
                <v-data-table-server
                    class="animated animatedFadeInUp fadeInUp mt-4"
                    :items-per-page="100"
                    :headers="headers"
                    :items="serverItems"
                    :loading="data.loading"
                    item-value="details.id"
                    :model-value="selectedRequisitionItem"
                    show-select
                    :hover="true"
                    @update:modelValue="handleSelectedRow"
                    @update:options="getPatientRequisitions"
                    fixed-header
                    density="compact"
                    height="50vh"
                >
                    <template v-for="(head, index) of headers" v-slot:[`item.${head.value}`]="props">
                        <td class="test" :key="index">
                            <slot :name="head.value" :item="props.item">
                                {{ props.item[head.value] || "..." }}
                            </slot>
                        </td>
                    </template>

                    <template v-slot:item.patient_Id="{ item }">
                        <span 
                            :style="{
                                display: 'inline-block',
                                width: '12px',
                                height: '12px',
                                borderRadius: '2px',
                                backgroundColor: item.details && item.details.ismedicine === '1' ? 'blue' : 
                                                item.details && item.details.isprocedure === '1' ? 'green' : 
                                                item.details && item.details.issupplies === '1' ? 'red' : 'gray'
                            }"
                            :title="item.details && item.details.ismedicine === '1' ? 'Medicines' :
                                    item.details && item.details.isprocedure === '1' ? 'Procedures' :
                                    item.details && item.details.issupplies === '1' ? 'Supplies' : 'N/A'"
                        >
                        </span>
                    </template>
                    
                    <template v-slot:item.details.refNum="{ item }">
                        {{ item.details.refNum || item.details.requestNum || "N/A" }}
                    </template>

                    <template v-slot:item.details.revenueID="{ item }">
                        {{ item.details.revenueID || item.details.revenue_Id || "N/A" }}
                    </template>

                    <template v-slot:item.details.itemID="{ item }">
                        {{ item.details.itemID || item.details.item_Id || "N/A" }}
                    </template>

                    <template v-slot:item.details.requestDescription="{ item }">
                        {{ item.details.requestDescription || item.details.description || "N/A" }}
                    </template>

                    <template v-slot:item.details.quantity="{ item }">
                        {{ parseInt(item.details.quantity) || parseInt(item.details.Quantity) || "N/A" }}
                    </template>

                    <template v-slot:item.details.amount="{ item }">
                        {{ usePeso(item.details.amount) }}
                    </template>

                    <template v-slot:item.details.created_at="{ item }">
                        {{ useDateMMDDYYY(item.created_at) }}
                    </template>

                    <template v-slot:item.isUnpaid="{ item }">
                        <v-chip color="red" v-if="item.isUnpaid == true">Pending Payment</v-chip>
                        <v-chip color="orange" v-else-if="item.isUnpaid == false">Pending Order</v-chip>
                    </template>

                    <template #bottom></template>
                </v-data-table-server>
            </v-card-text>
            <v-divider></v-divider>
            <v-card-actions>
                <v-btn color="blue-darken-1 border border-info" @click="closeDialog"> Close </v-btn>
                <v-btn class="text-white bg-error" @click="confirmRevoke">Revoke Charge</v-btn>
                <v-btn class="text-white bg-info" @click="onPrint">Print</v-btn>
                <v-spacer></v-spacer>
                <v-btn class="bg-primary text-white" @click="openMultiDepartmentSelection('supply')" prepend-icon="mdi-warehouse">Add Supplies</v-btn>
                <v-btn class="bg-primary text-white" @click="openMultiDepartmentSelection('medicine')" prepend-icon="mdi-pill">Add Medicines</v-btn>
                <v-btn class="bg-primary text-white" @click="openMultiDepartmentSelection('procedure')" prepend-icon="mdi-needle">Add Procedures</v-btn>
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
                    {{ warning_description }}
                </h2>
            </v-card-text>
        </v-card>
    </v-dialog>

    <v-dialog :model-value="revoke_remarks_dialog" rounded="lg" max-width="550px" @update:model-value="closeRemarksRevoke">
        <v-card elevation="4" rounded="lg">
            <v-toolbar density="compact" color="#107bac" hide-details>
                <v-toolbar-title>Revoke Item Remarks</v-toolbar-title>
                <v-spacer></v-spacer>
                <v-btn color="white" @click="closeRemarksRevoke">
                    <v-icon>mdi-close</v-icon>
                </v-btn>
            </v-toolbar>
            <v-card-text>
                <v-row>
                    <v-col cols="12">
                        <v-textarea 
                            v-model="payload.remarks" 
                            variant="outlined"
                            label="Remarks"
                            hint="Reason as to why you want to revoke this item..." 
                            density="compact" 
                        ></v-textarea>
                    </v-col>
                </v-row>
            </v-card-text>
            <v-divider></v-divider>
            <v-card-actions>
                <v-btn color="blue-darken-1 border border-info" @click="closeRemarksRevoke">Close</v-btn>
                <v-spacer></v-spacer>
                <v-btn class="bg-primary text-white" @click="openRevokeConfirmation">Confirm</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>

    <RequisitionMultiItemSelection 
        :open_medical_item_selection="open_medical_item_selection" 
        :category="category" 
        :roleID="roleID"
        @submit-requisition="getPatientRequisitions"
        @close-dialog="closeMultiDepartmentSelection"
        /> 
    <RenderedRequisitions 
        :open_rendered_transactions="open_rendered_transactions"  
        :patient_Id="selectedRowDetails.patient_Id"
        :case_No="selectedRowDetails.patient_registry && selectedRowDetails.patient_registry[0].case_No ? selectedRowDetails.patient_registry[0].case_No : null"
        @close-dialog="closeRenderedTransactions" 
    />
    <CancelledRequisitions 
        :open_cancelled_transactions="open_cancelled_transactions"  
        :patient_Id="selectedRowDetails.patient_Id"
        :case_No="selectedRowDetails.patient_registry && selectedRowDetails.patient_registry[0].case_No ? selectedRowDetails.patient_registry[0].case_No : null"
        @close-dialog="closeCancelledTransactions"
    />
    <Confirmation 
        :show="revokeconfirmation"
        :payload="payload"
        :loading="isLoadingBtn"
        :error_msg="error_msg"
        @submit="onRevoke"
        @close="closeRevokeConfirmation"
    />
</template>

<script setup>
import { createApp } from 'vue';
import nuxtStorage from 'nuxt-storage'; 
import RenderedRequisitions from './sub-forms/RenderedRequisitions.vue';
import CancelledRequisitions from './sub-forms/CancelledRequisitions.vue';
import RequisitionMultiItemSelection from './sub-forms/RequisitionMultiItemSelection.vue';
import RequisitionReports from '~/public/reports/charges/requisition/RequisitionReports.vue';

const props = defineProps({
    show: {
        type: Boolean,
        default: () => false,
    },
    form_type: {
        type: String,
        default: () => '',
    },
})

const { selectedRowDetails } = storeToRefs(useSubcomponentSelectedRowDetailsStore()); 

const emits = defineEmits(['close-dialog'])
const payload = ref({
    Items: [],
});
const open_medical_item_selection = ref(false);
const serverItems = ref([]);
const category = ref(null);
const open_rendered_transactions = ref(false);
const open_cancelled_transactions = ref(false);
const revokeconfirmation = ref(false);
const error_msg = ref('');
const isLoadingBtn = ref(false);
const selected_items = ref([]);
const warning_cannot_be_revoked = ref(false);
const warning_description = ref("");
const revoke_remarks_dialog = ref(false);

const openMultiDepartmentSelection = (selectedCategory) => {
    category.value = selectedCategory;
    open_medical_item_selection.value = true;
}
const closeMultiDepartmentSelection = () => {
    open_medical_item_selection.value = false;
}
const openRenderedTransaction = () => {
    open_rendered_transactions.value = true;
}
const openCancelledTransaction = () => {
    open_cancelled_transactions.value = true;
}
const closeRenderedTransactions = () => {
    open_rendered_transactions.value = false;
}
const closeCancelledTransactions = () => {
    open_cancelled_transactions.value = false;
}

const closeDialog = () => {
    serverItems.value = [];
    selectedRequisitionItem.value = [];
    selected_items.value = [];
    emits('close-dialog');
}

const closeWarningDialog = () => {
    warning_cannot_be_revoked.value = false;
    selectedRequisitionItem.value = [];
    selected_items.value = [];
}

const headers = [
    { title: "",  align: "start", sortable: false, key: "patient_Id" },
    { title: "Ref #",  align: "start", sortable: false, key: "details.refNum" },
    { title: "Item ID",  align: "start", sortable: false, key: "details.itemID" },
    { title: "Description",  align: "start", sortable: false, key: "details.requestDescription" },
    { title: "Quantity",  align: "start", sortable: false, key: "details.quantity" },
    { title: "Amount",  align: "start", sortable: false, key: "details.amount" },
    { title: "Request Date",  align: "start", sortable: false, key: "details.created_at" },
    { title: "Status",  align: "start", sortable: false, key: "isUnpaid", align: 'center' },
];

const data = ref({
    title: "List of patient requisitions",
    keyword: "",
    loading: false,
    filter: {},
    tab: 0,
    param_tab: 1,
});

const getPatientRequisitions = async () => {
    if (selectedRowDetails.value.patient_registry && selectedRowDetails.value.patient_registry[0].mscPrice_Schemes != null) {
        const items = {
            patient_Id: selectedRowDetails.value.patient_Id,
            case_No: selectedRowDetails.value.patient_registry[0].case_No ? selectedRowDetails.value.patient_registry[0].case_No : null,
            account: selectedRowDetails.value.patient_registry[0].mscPrice_Schemes ? selectedRowDetails.value.patient_registry[0].mscPrice_Schemes : null,
        };
        data.value.loading = true;
        try {
            const response = await fetch(useApiUrl() + `/get-patients-requisitions?keyword=${data.value.keyword}`, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + useToken()
                },
                body: JSON.stringify({ items })
            });
    
            if (response.ok) {
                const data = await response.json();
                serverItems.value = data.data;
            } 
        } catch (error) {
            console.error(error);
        } finally {
            data.value.loading = false;
        }
    }
}

const selectedRequisitionItem = ref([]);
const handleSelectedRow = (selectedRows) => {
    selectedRequisitionItem.value = selectedRows;
    const selectedItems = selectedRows.map(rowId => serverItems.value.find(item => item.details.id === rowId));  
    selected_items.value = selectedItems;
} 

const printRequistion = (payload, charges) => {
    const newWindow = window.open('', '_blank', 'width=900,height=750');
    if (newWindow) {
        const app = createApp(RequisitionReports, {
            payload: payload,
            charges: charges,
        });
        app.mount(newWindow.document.body);
        nextTick(() => {
            newWindow.print();
            newWindow.onafterprint = () => {
                newWindow.close();
                selectedRequisitionItem.value = [];
                selected_items.value = [];
            }
        });
    }
}

const onPrint = () => {
    if (selected_items.value.length === 0 || selected_items.value == null || selected_items.value === undefined) {
        useSnackbar(true, "error", "Please select item to print");
    } else if (selected_items.value.some(item => item.recordStatus === null) && 
                selected_items.value.some(item => item.recordStatus !== null)) {
        warning_description.value = "CAN'T PRINT ITEMS THAT ARE BOTH PENDING PAYMENT AND PENDING ORDERED!";
        warning_cannot_be_revoked.value = true;
    } else {
        printRequistion(selectedRowDetails.value, selected_items.value);
    }
};


const confirmRevoke = () => {
    payload.value.account = selectedRowDetails.value.patient_registry 
                            && selectedRowDetails.value.patient_registry[0].mscPrice_Schemes 
                            ? selectedRowDetails.value.patient_registry[0].mscPrice_Schemes : null;

    if (selected_items.value.length == 0 || selected_items.value == null || selected_items.value == undefined) {
        useSnackbar(true, "error", "Please select item to revoke");
    } else if (selected_items.value.some(item => item.isUnpaid == false) && payload.value.account == 1) {
        warning_description.value = "CAN'T REVOKED ITEMS THAT HAS BEEN PAID! CONTACT CASHIER INSTEAD TO CANCEL";
        warning_cannot_be_revoked.value = true;
    } else {
        payload.value.Items = selected_items.value;
        revoke_remarks_dialog.value = true;
    }
}

const closeRemarksRevoke = () => {
    revoke_remarks_dialog.value = false;
    payload.value.remarks = '';
}

const openRevokeConfirmation = () => {
    revokeconfirmation.value = true;
}

const closeRevokeConfirmation = () => {
    revokeconfirmation.value = false;
}

const onRevoke = async (user_details) => {
    switch(roleID.value) {
        case '27':
            const response = await useMethod("post", "cancel-requisition-request", payload.value);
            if (response) {
                closeRemarksRevoke();
                closeRevokeConfirmation();
                getPatientRequisitions();
                selectedRequisitionItem.value = [];
                selected_items.value = [];
            }
        default: 
            if (user_details.user_passcode === usePasscode()) {
                const response = await useMethod("post", "cancel-requisition-request", payload.value);
                if (response) {
                    closeRemarksRevoke();
                    closeRevokeConfirmation();
                    getPatientRequisitions();
                    selectedRequisitionItem.value = [];
                    selected_items.value = [];
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
            break;
    }
}


const search = (keyword) => {
    getPatientRequisitions(keyword);
}

watch(() => props.show, (newVal) => {
    if (newVal) {
        getPatientRequisitions();
    }
});

const user_detail = ref({});
const roleID = ref('');
onMounted(() => {
    const userDetails = JSON.parse(nuxtStorage.localStorage.getData('user_details') || '{}');
    user_detail.value = userDetails;
    roleID.value = user_detail.value?.role_id;
});

const isDischarge = ref('');
onUpdated(() => {
    isDischarge.value = selectedRowDetails.value.patient_registry && selectedRowDetails.value.patient_registry[0].discharged_Date;
    console.log('Is Discharged Values : ', isDischarge.value)
})
</script>

<style scoped>
    .form-col {
        margin-top: -16px !important;
    }
    .note {
        padding: 20 0px !important;
    }
    .note span {
        font-size: 20px;
        color: #ffffe0;
        font-weight: bold;
        font-style: italic;
    }
</style>