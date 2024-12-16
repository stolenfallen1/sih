<template>
    <v-dialog :model-value="open_posted_supply" rounded="lg" @update:model-value="closeDialog" max-width="1120px">
        <v-card rounded="lg">
            <v-toolbar density="compact" color="#107bac" hide-details>
                <v-toolbar-title>
                    List of Posted Supplies 
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
                                            v-model="payload.caseNo"
                                            variant="outlined"
                                            class="cursor-pointer"
                                            append-icon="mdi-plus-box"
                                            hint="Case No."
                                            density="compact"
                                            @keyup.enter="getPatientPostedSupplies"
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
                    </v-card-text>
                </v-card>
                <v-card elevation="4">
                    <v-card-text>
                        <div style="display: flex; align-items: center; justify-content: space-between;">
                            <p>List of Posted Supplies</p>
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
                                {{ useDateTimeFormater(item.nurse_logbook.process_Date) }}
                            </template>

                            <template v-slot:item.transaction_Qty="{ item }">
                                {{ item.transaction_Qty > 0 
                                    ? parseInt(item.transaction_Qty) 
                                    : (item.transaction_Qty < 0 
                                        ? `(${Math.abs(parseInt(item.transaction_Qty))})` 
                                        : 'N/A') }}
                            </template>

                            <template v-slot:item.transaction_Item_TotalAmount="{ item }">
                                {{ item.transaction_Item_TotalAmount > 0 
                                    ? usePeso(item.transaction_Item_TotalAmount) 
                                    : (item.transaction_Item_TotalAmount < 0 
                                        ? `(${(usePeso(Math.abs(item.transaction_Item_TotalAmount)))})` 
                                        : 'N/A') }}
                            </template>

                            <template #bottom />
                        </v-data-table-server>
                    </v-card-text>
                </v-card>
            </v-card-text>
            <v-divider></v-divider>
            <v-card-actions>
                <v-row class="pa-2">
                    <v-col cols="6" class="pa-1">
                        <v-text-field 
                            label="Total Posted"
                            v-model="totalPosted"
                            variant="outlined"
                            hint="Case No."
                            density="compact"
                            readonly
                            hide-details
                            outlined
                        ></v-text-field>
                    </v-col>
                    <v-col cols="6" class="pa-1">
                        <v-text-field 
                            label="Total Amount"
                            v-model="totalAmount"
                            variant="outlined"
                            hint="Case No."
                            density="compact"
                            readonly
                            hide-details
                            outlined
                        ></v-text-field>
                    </v-col>
                    <v-col cols="6" class="pa-1">
                        <v-text-field 
                            label="Total Returned"
                            v-model="totalReturned"
                            variant="outlined"
                            hint="Case No."
                            density="compact"
                            readonly
                            hide-details
                            outlined
                        ></v-text-field>
                    </v-col>
                    <v-col cols="6" class="pa-1">
                        <v-text-field 
                            label="Total Discount"
                            v-model="totalDiscount"
                            variant="outlined"
                            hint="Case No."
                            density="compact"
                            readonly
                            hide-details
                            outlined
                        ></v-text-field>
                    </v-col>
                </v-row>
                <v-spacer></v-spacer>
                <v-btn class="text-white bg-info" @click="onPrint">Print All</v-btn>
                <v-btn color="blue-darken-1 border border-info" @click="closeDialog"> Close </v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
    <Snackbar />
</template>

<script setup>
import { createApp } from 'vue';
import AncillaryPostedReports from '~/public/reports/ancillary/AncillaryPostedReports.vue';

const props = defineProps({
    open_posted_supply: {
        type: Boolean,
        default: () => false,
        required: true,
    },
    patient_type: {
        type: Number,
        default: () => '',
        required: true,
    },
});

const payload = ref({});
const emits = defineEmits(["close-dialog"]);
const serverItems = ref([]);

const headers = [
    { title: "Trans Date",  align: "start", sortable: false, key: "nurse_logbook.process_Date" },
    { title: "Encoder",  align: "start", sortable: false, key: "nurse_logbook.process_By" },
    { title: "Item ID",  align: "start", sortable: false, key: "nurse_logbook.item_Id" },
    { title: "Description",  align: "start", sortable: false, key: "nurse_logbook.description" },
    { title: "Quantity",  align: "start", sortable: false, key: "transaction_Qty" },
    { title: "Amount",  align: "start", sortable: false, key: "transaction_Item_TotalAmount" },
];

const data = ref({
    title: "List of posted supplies",
    keyword: "",
    loading: false,
    filter: {},
    tab: 0,
    param_tab: 1,
});

const getPatientPostedSupplies = async () => {
    if (!payload.value.caseNo) {
        return useSnackbar(true, "error", "Please enter case number.");
    }
    data.value.loading = true;
    try {
        const response = await useMethod("get", "get-ancillary-posted-supplies?case_No=", "", payload.value.caseNo);
        if (response) {
            if (response.patient_details.inventory_data.length === 0) {
                clearData();
                useSnackbar(true, "error", "No posted supplies found for this patient.");
                return;
            } else if (response.patient_details.mscAccount_Trans_Types != props.patient_type) {
                clearData();
                useSnackbar(true, "error", "No posted supplies found for this patient.");
                return;
            } else {
                payload.value.patient_Id = response.patient_details.patient_Id;
                payload.value.case_No = response.patient_details.case_No;
                payload.value.age = response.patient_details.age;
                payload.value.patient_Name = response.patient_details.patient_Name;
                payload.value.sex = response.patient_details.sex;
                payload.value.account = response.patient_details.mscPrice_Schemes;
                payload.value.birthdate = response.patient_details.birthdate;
                payload.value.attending_Doctor_fullname = response.patient_details.doctor;
                serverItems.value = response.patient_details.inventory_data;
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


const totalPosted = computed(() => {
    if (serverItems.value.length === 0) return null;
    const totalPostedValue = serverItems.value.reduce((acc, item) => acc + parseFloat(item.transaction_Qty || 0), 0);
    return totalPostedValue;
});

const totalReturned = computed(() => {
    if (serverItems.value.length === 0) return null;
    const totalReturnedValue = serverItems.value.reduce((acc, item) => acc + parseFloat(item.transaction_Qty < 0 ? item.transaction_Qty : 0), 0);
    return Math.abs(totalReturnedValue);
});

const totalDiscount = computed(() => {
    if (serverItems.value.length === 0) return null;
    return serverItems.value.reduce((acc, item) => acc + parseFloat(item.transaction_Discount || 0), 0);
});

const printRequistion = (payload, charges) => {
    const newWindow = window.open('', '_blank', 'width=900,height=750');
    if (newWindow) {
        const app = createApp(AncillaryPostedReports, {
            payload: payload,
            charges: charges,
        });
        app.mount(newWindow.document.body);
        nextTick(() => {
            newWindow.print();
            newWindow.onafterprint = () => {
                newWindow.close();
            }
        });
    }
}

const print_payload = ref({});
const print_charges = ref([]);
const onPrint = () => {
    print_payload.value = {
        patient_Id: payload.value.patient_Id,
        case_No: payload.value.case_No,
        patient_Name: payload.value.patient_Name,
        birthdate: payload.value.birthdate,
        age: payload.value.age,
        sex: payload.value.sex,
        account: payload.value.account,
        attending_Doctor_fullname: payload.value.attending_Doctor_fullname,
    }
    print_charges.value = serverItems.value;
    printRequistion(print_payload.value, print_charges.value);
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