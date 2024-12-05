<template>
    <v-dialog v-if="selectedRowDetails.value?.patient_registry?.[0]?.discharged_Date !== null || selectedRowDetails.value?.patient_registry?.[0]?.discharged_Date === null" :model-value="show" rounded="lg" scrollable @update:model-value="closeDialog" max-width="400px"> 
        <v-alert
            border="left"
            color="red"
            dismissible
            elevation="24"
            icon="mdi-alert-circle"
        >
           <div class="note">
                <span>Note:</span>
                <p class="message">This action is not available at this time; please call the IT Department when it's necessary.</p>
           </div>
        </v-alert>
    </v-dialog>
    <v-dialog v-if="selectedRowDetails.value?.patient_registry?.[0]?.discharged_Date === null && selectedRowDetails.value?.patient_registry?.[0]?.discharged_Date !== null" :model-value="show" rounded="lg" scrollable @update:model-value="closeDialog" max-width="750px">
        <form @submit.prevent="onSubmit">
            <v-card rounded="lg">
                <v-toolbar density="compact" color="#107bac" hide-details>
                    <v-toolbar-title>
                        {{ form_type === 'outpatient' ? 'Suspend Outpatient Registry Account Window' : (form_type === 'emergency' ? 'Suspend Emergency Registry Account Window' : 'Suspend Inpatient Registry Account Window') }} 
                        {{ selectedRowDetails.id }}
                    </v-toolbar-title>
                    <v-btn color="white" @click="closeDialog">
                        <v-icon>mdi-close</v-icon>
                    </v-btn>
                </v-toolbar>
                <v-divider></v-divider>
                <v-card-text>
                    <v-card elevation="4">
                        <v-toolbar density="compact" hide-details>
                            <v-toolbar-title class="toolbar-title">Patient Registry Information</v-toolbar-title>
                        </v-toolbar>
                        <v-card-text>
                            <v-row>
                                <v-col cols="12">
                                    <v-text-field 
                                        label="Patient Name"
                                        v-model="payload.find(item => item.patient_name).patient_name"
                                        variant="outlined" 
                                        density="compact" 
                                        hide-details 
                                        readonly
                                    ></v-text-field>
                                </v-col>
                                <v-col cols="6">
                                    <v-text-field 
                                        label="Patient ID" 
                                        v-model="selectedRowDetails.id"
                                        variant="outlined" 
                                        density="compact" 
                                        hide-details 
                                        readonly
                                    ></v-text-field>
                                </v-col>
                                <v-col cols="6">
                                    <v-text-field 
                                        :label="form_type === 'outpatient' ? 'Outpatient Case No' : (form_type === 'emergency' ? 'Emergency Case No' : 'Admission No')" 
                                        v-model="payload.find(item => item.case_no).case_no"
                                        variant="outlined" 
                                        density="compact" 
                                        hide-details 
                                        readonly
                                    ></v-text-field>
                                </v-col>
                                <v-col cols="4">
                                    <v-text-field 
                                        label="Registry Case Type" 
                                        v-model="payload.find(item => item.registry_case_type).registry_case_type"
                                        variant="outlined" 
                                        density="compact" 
                                        hide-details 
                                        readonly
                                    ></v-text-field>
                                </v-col>
                                <v-col cols="4">
                                    <v-text-field 
                                        type="date"
                                        :label="form_type === 'outpatient' ? 'Outpatient Date' : (form_type === 'emergency' ? 'Emergency Date' : 'Admission Date')" 
                                        v-model="payload.find(item => item.case_date).case_date"
                                        variant="outlined" 
                                        density="compact" 
                                        hide-details 
                                        readonly
                                    ></v-text-field>
                                </v-col>
                                <v-col cols="4">
                                    <v-text-field
                                        label="Account Balance" 
                                        v-model="payload.find(item => item.account_balance).account_balance"
                                        variant="outlined" 
                                        density="compact" 
                                        hide-details 
                                        readonly
                                    ></v-text-field>
                                </v-col>
                            </v-row>
                        </v-card-text>
                    </v-card>
                    <v-card elevation="4">
                        <v-toolbar density="compact" hide-details>
                            <v-toolbar-title class="toolbar-title">Card Transactions for Suspended Accounts</v-toolbar-title>
                        </v-toolbar>
                        <v-card-text>
                            <v-row>
                                <v-col cols="12">
                                    <v-checkbox label="Allow Cash Transaction for Suspended Accounts" density="compact" hide-details></v-checkbox>
                                    <p>This indicator alert users that the selected patient is tagged as SUSPENDED on particular department(s) can still proceed on transaction(s) but on CASH BASIS only.</p>
                                </v-col>
                            </v-row>
                        </v-card-text>
                    </v-card>
                    <v-card elevation="4">
                        <v-toolbar density="compact" hide-details>
                            <v-toolbar-title class="toolbar-title">Departmental Suspension of Transactions</v-toolbar-title>
                        </v-toolbar>
                        <v-card-text>
                            <p>
                                This option blocks all transactions to be posted for selected department(s). Only authorized users can check or uncheck a department in the 
                                list that want it included or excluded in the supervision of doing transactions in the name of the currently selected patient.
                            </p><br/>
                            <v-divider></v-divider>
                            <v-data-table-server
                                class="animated animatedFadeInUp fadeInUp"
                                v-model:items-per-page="itemsPerPage"
                                :headers="headers"
                                :items="serverItems"
                                :items-length="totalItems"
                                :loading="data.loading"
                                item-value="id"
                                :hover="true"
                                @update:options="initialize"
                                show-select
                                select-strategy="single"
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
                                <template #bottom></template>
                            </v-data-table-server>
                        </v-card-text>
                    </v-card>
                </v-card-text>
                <v-divider></v-divider>
                <v-card-actions>
                    <v-btn color="blue-darken-1 border border-info" @click="closeDialog"> Close </v-btn>
                    <v-spacer></v-spacer>
                    <v-btn class="bg-primary text-white" type="submit">Select</v-btn>
                </v-card-actions>
            </v-card>
        </form>
    </v-dialog>
</template>

<script setup>
const props = defineProps({
    show: {
        type: Boolean,
        default: () => false,
        required: true,
    },
    form_type: {
        type: String,
        default: () => '',
    }
});

const { selectedRowDetails } = storeToRefs(useSubcomponentSelectedRowDetailsStore()); 

const payload = ref([
    {
        patient_name: 'John Doe',
    },
    {
        registry_case_type: 'Outpatient',
    },
    {
        case_no: '123',
    },
    {
        case_date: '2024-04-15',
    },
    {
        account_balance: '00.00',
    },
]);

const headers = [
    { title: "Department", key: "department", align: "start", width: "60%" },
];


const data = ref({
    title: "List of Bank",
    keyword: "",
    loading: false,
    filter: {},
    tab: 0,
    param_tab: 1,
});
const itemsPerPage = ref(10);
const totalItems = ref(0);
const serverItems = ref([]);
const initialize = ({ page, itemsPerPage, sortBy }) => {
    // loadItems(page, itemsPerPage, sortBy);
    null
};

const loadItems = async (page = null, itemsPerPage = null, sortBy = null) => {
    data.value.loading = true;
    let pageno = page || 1;
    let itemPerpageno = itemsPerPage || 10;
    let params =
        "page=" + pageno + "&per_page=" + itemPerpageno + "&keyword=" + data.value.keyword;
    const response = await useMethod("get", "banks?", "", params);
    if (response) {
        serverItems.value = response.data;
        totalItems.value = response.total;
        data.value.loading = false;
    }
};

const onSubmit = () => {
    alert("Test!");
    emits('closeDialog');
};

const emits = defineEmits(['close-dialog'])

const closeDialog = () => {
    emits('close-dialog');
}
</script>

<style scoped>
    .toolbar-title {
        font-size: 16px; 
        font-style: italic; 
        text-align: center;
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