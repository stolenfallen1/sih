<template>
    <v-dialog :model-value="open_rendered_transactions" rounded="lg" scrollable @update:model-value="closeDialog" max-width="1000px">     
        <v-card rounded="lg">
            <v-toolbar density="compact" color="#107bac" hide-details>
                <v-toolbar-title>Rendered Requisitions Transactions</v-toolbar-title>
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
                <v-data-table-server
                class="animated animatedFadeInUp fadeInUp mt-4"
                :items-per-page="100"
                :headers="headers"
                :items="serverItems"
                :loading="data.loading"
                item-value="id"
                :hover="true"
                @update:options="fetchRenderedTransactions"
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

                <template v-slot:item.patient_Id="{ item }">
                    <span 
                        :style="{
                            display: 'inline-block',
                            width: '12px',
                            height: '12px',
                            borderRadius: '2px',
                            backgroundColor: item && item.ismedicine === '1' ? 'blue' : 
                                            item && item.isprocedure === '1' ? 'green' : 
                                            item && item.issupplies === '1' ? 'red' : 'gray'
                        }"
                        :title="item && item.ismedicine === '1' ? 'Medicines' :
                                item && item.isprocedure === '1' ? 'Procedures' :
                                item && item.issupplies === '1' ? 'Supplies' : 'N/A'"
                    >
                    </span>
                </template>

                <template v-slot:item.Quantity="{ item }">
                    {{ parseInt(item.Quantity) || parseInt(item.Quantity) || "N/A" }}
                </template>

                <template v-slot:item.dosage="{ item }">
                    <span v-if="item.dosage">
                        {{ item.dosage }}
                    </span>
                    <span v-else style="color: red;">
                        N/A
                    </span>
                </template>

                <template v-slot:item.amount="{ item }">
                    {{ usePeso(item.amount) }}
                </template>

                <template v-slot:item.process_Date="{ item }">
                    {{ useDateTimeFormater(item.process_Date) }}
                </template>

                <template #bottom></template>
            </v-data-table-server>
            </v-card-text>
            <v-divider></v-divider>
            <v-card-actions>
                <v-btn color="blue-darken-1 border border-info" @click="closeDialog"> Close </v-btn>
                <v-spacer></v-spacer>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script setup>
const props = defineProps({
    open_rendered_transactions: {
        type: Boolean,
        default: () => false,
    },
    patient_Id: {
        type: String,
        required: true,
    },
    case_No: {
        type: String,
        required: true,
    }
});

const serverItems = ref([]);

const headers = [
    { title: "",  align: "start", sortable: false, key: "patient_Id" },
    { title: "Code",  align: "start", sortable: false, key: "revenue_Id" },
    { title: "Item ID",  align: "start", sortable: false, key: "item_Id" },
    { title: "Description",  align: "start", sortable: false, key: "description" },
    { title: "Quantity",  align: "start", sortable: false, key: "Quantity" },
    { title: "Frequency",  align: "start", sortable: false, key: "dosage" },
    { title: "Amount",  align: "start", sortable: false, key: "amount" },
    { title: "Process By",  align: "start", sortable: false, key: "process_By" },
    { title: "Process Date",  align: "start", sortable: false, key: "process_Date" },
];

const data = ref({
    title: "List of rendered requisitions transactions",
    keyword: "",
    loading: false,
    filter: {},
    tab: 0,
    param_tab: 1,
});

const fetchRenderedTransactions = async () => {
    const response = await fetch(useLaravelAPI() + "/get-rendered-transactions", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + useToken()
        },
        body: JSON.stringify({ patient_Id: props.patient_Id, case_No: props.case_No })
    });

    if (response.ok) {
        const data = await response.json();
        serverItems.value = data;
    } 
};

const emits = defineEmits(['close-dialog'])

const closeDialog = () => {
    emits('close-dialog');
}

watch(() => props.open_rendered_transactions, (newVal) => {
    if (newVal) {
        fetchRenderedTransactions();
    }
});
</script>

<style scoped>
.form-col {
    margin-top: -16px !important;
}
</style>