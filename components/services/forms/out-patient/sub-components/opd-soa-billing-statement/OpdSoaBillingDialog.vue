<template>
    <v-dialog :model-value="show" rounded="lg" scrollable @update:model-value="closeDialog" max-width="900px">
        <v-card rounded="lg">
            <v-toolbar density="compact" color="#6984ff" hide-details>
                <v-toolbar-title>Registry Account Ledger Summary {{ selectedRowDetails.id }}</v-toolbar-title>
                <v-btn color="white" @click="closeDialog">
                    <v-icon>mdi-close</v-icon>
                </v-btn>
            </v-toolbar>
            <v-divider></v-divider>
            <v-card-text>
                <v-row class="mb-2">
                    <v-col cols="6">
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
                                    label="Registry Number"
                                    v-model="payload.find(item => item.registry_number).registry_number"
                                    variant="outlined"
                                    density="compact"
                                    hide-details
                                    readonly
                                ></v-text-field>
                            </v-col>
                            <v-col cols="6">
                                <v-text-field
                                    type="date"
                                    label="Registry Case Date"
                                    v-model="payload.find(item => item.registry_case_date).registry_case_date"
                                    variant="outlined"
                                    density="compact"
                                    hide-details
                                    readonly
                                ></v-text-field>
                            </v-col>
                        </v-row>
                    </v-col>
                    <v-col cols="6">
                        <v-row>
                            <v-col cols="12">
                                <v-text-field
                                    label="Registry Tracking No."
                                    v-model="payload.find(item => item.registry_tracking_no).registry_tracking_no"
                                    variant="outlined"
                                    density="compact"
                                    hide-details
                                    readonly
                                ></v-text-field>
                            </v-col>
                            <v-col cols="12">
                                <v-text-field
                                    type="date"
                                    label="Assumed Date of Discharge"
                                    v-model="payload.find(item => item.assumed_date_of_discharge).assumed_date_of_discharge"
                                    variant="outlined"
                                    density="compact"
                                    hide-details
                                    readonly
                                ></v-text-field>
                            </v-col>
                        </v-row>
                    </v-col>
                </v-row>
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
            <v-divider></v-divider>
            <v-card-actions>
                <v-btn color="blue-darken-1 border border-info" @click="closeDialog"> Close </v-btn>
                <v-spacer></v-spacer>
                <!-- <v-btn class="bg-primary text-white" >Generate GST</v-btn>
                <v-btn class="bg-primary text-white" >Unpost GST</v-btn> -->
                <v-btn class="bg-primary text-white" @click.prevent="openGenerateReport">Generate SOA Report</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
    <opd-generate-soa-report :open_generate_report="open_generate_report" @close-dialog="closeGenerateReport" @handle-submit="handleGenerateReport" />
</template>

<script setup>
import OpdGenerateSoaReport from './sub-forms/OpdGenerateSoaReport.vue';

const props = defineProps({
    show: {
        type: Boolean,
        default: () => false,
        required: true,
    },
});

const { selectedRowDetails } = storeToRefs(useSubcomponentSelectedRowDetailsStore()); 
const open_generate_report = ref(false);

const payload = ref([
    {
        patient_name: 'John Doe',
    },
    {
        registry_number: '123',
    },
    {
        registry_case_date: '2024-04-15',
    },
    {
        registry_tracking_no: '456',
    },
    {
        assumed_date_of_discharge: '2024-04-15',
    },
]);

const total_payload = ref({}); // I change lang sir to payload from total_payload since nag himo kog static payload above for now thanks! :)

const headers = [
    { title: "Description", key: "description", align: "start", width: "50%" },
    { title: "Debit", key: "debit", align: "start", width: "15%" },
    { title: "Credit", key: "credit", align: "start", width: "15%" },
    { title: "Balance", key: "balance", align: "start", width: "15%" },
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

const openGenerateReport = () => {
    open_generate_report.value = true;
}

const handleGenerateReport = () => {
    alert('Report Generated');
    open_generate_report.value = false;
}

const closeGenerateReport = () => {
    open_generate_report.value = false;
}

const emits = defineEmits(['close-dialog'])

const closeDialog = () => {
    emits('close-dialog');
}
</script>

<style scoped>
</style>