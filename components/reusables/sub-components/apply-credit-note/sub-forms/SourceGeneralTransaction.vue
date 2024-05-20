<template>
    <v-dialog :model-value="open_source_transaction_general" rounded="lg" scrollable @update:model-value="closeDialog" max-width="1120px">    
        <form @submit.prevent="onSubmit">        
            <v-card rounded="lg">
                <v-toolbar density="compact" color="#6984ff" hide-details>
                    <v-toolbar-title>Process Credit Note {{ selectedRowDetails.id }}</v-toolbar-title>
                    <v-btn color="white" @click="closeDialog">
                        <v-icon>mdi-close</v-icon>
                    </v-btn>
                </v-toolbar>
                <v-divider></v-divider>
                <v-card-text>
                    <v-card elevation="4">
                        <v-toolbar density="compact" hide-details>
                            <v-toolbar-title class="toolbar-title">Source Transaction General Information</v-toolbar-title>
                        </v-toolbar>
                        <v-card-text>
                            <v-row>
                                <v-col cols="6">
                                    <v-row>
                                        <v-col cols="12">
                                            <v-text-field
                                                label="Requisition Date"
                                                v-model="payload.requisition_date"
                                                type="number"
                                                density="compact"
                                                variant="outlined"
                                                hide-details
                                                readonly
                                            ></v-text-field> 
                                        </v-col>
                                        <v-col cols="12" class="form-col">
                                            <v-text-field
                                                label="Requisition No."
                                                v-model="payload.requisition_no"
                                                type="number"
                                                density="compact"
                                                variant="outlined"
                                                hide-details
                                                readonly
                                            ></v-text-field> 
                                        </v-col>
                                        <v-col cols="12" class="form-col">
                                            <v-autocomplete
                                                label="Document Type"
                                                v-model="payload.document_type"
                                                density="compact"
                                                variant="outlined"
                                                hide-details
                                                readonly
                                            ></v-autocomplete> 
                                        </v-col> 
                                        <v-col cols="12" class="form-col">
                                            <v-text-field
                                                label="Document Date"
                                                v-model="payload.document_date"
                                                type="date"
                                                density="compact"
                                                variant="outlined"
                                                hide-details
                                                readonly
                                            ></v-text-field> 
                                        </v-col> 
                                        <v-col cols="12" class="form-col">
                                            <v-text-field
                                                label="Document No"
                                                v-model="payload.document_no"
                                                type="number"
                                                density="compact"
                                                variant="outlined"
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
                                                label="Transaction No."
                                                v-model="payload.transaction_no"
                                                type="number"
                                                density="compact"
                                                variant="outlined"
                                                hide-details
                                                readonly
                                            ></v-text-field> 
                                        </v-col>
                                        <v-col cols="12" class="form-col">
                                            <v-text-field
                                                label="Grand Amount"
                                                v-model="payload.grand_amount"
                                                type="number"
                                                density="compact"
                                                variant="outlined"
                                                hide-details
                                                readonly
                                            ></v-text-field> 
                                        </v-col>
                                        <v-col cols="12" class="form-col">
                                            <v-autocomplete
                                                label="Discount"
                                                v-model="payload.discount"
                                                type="number"
                                                density="compact"
                                                variant="outlined"
                                                hide-details
                                                readonly
                                            ></v-autocomplete> 
                                        </v-col> 
                                        <v-col cols="12" class="form-col">
                                            <v-text-field
                                                label="Output Tax"
                                                v-model="payload.output_tax"
                                                type="number"
                                                density="compact"
                                                variant="outlined"
                                                hide-details
                                                readonly
                                            ></v-text-field> 
                                        </v-col> 
                                        <v-col cols="12" class="form-col">
                                            <v-text-field
                                                label="Net Amount"
                                                v-model="payload.net_amount"
                                                type="number"
                                                density="compact"
                                                variant="outlined"
                                                hide-details
                                                readonly
                                            ></v-text-field> 
                                        </v-col>   
                                    </v-row>
                                </v-col>
                            </v-row>
                            <v-data-table-server
                                class="animated animatedFadeInUp fadeInUp mt-4"
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
                                height="40vh"
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
                    <v-btn class="bg-primary text-white" type="submit">Finalize</v-btn>
                </v-card-actions>
            </v-card>
        </form>
    </v-dialog>
</template>

<script setup>
const props = defineProps({
    open_source_transaction_general: {
        type: Boolean,
        default: () => false,
    },
    payload: {
        type: Object,
        default: () => ({}),
    },
})

const { selectedRowDetails } = storeToRefs(useSubcomponentSelectedRowDetailsStore()); 

const emits = defineEmits(['close-dialog'])

const closeDialog = () => {
    emits('close-dialog');
}

const headers = [
    { title: "Item ID",  align: "start", sortable: false, key: "id" },
    { title: "Description",  align: "start", sortable: false, key: "description" },
    { title: "Price",  align: "start", sortable: false, key: "price" },
    { title: "Unit",  align: "start", sortable: false, key: "unit" },
    { title: "Qty Rendered",  align: "start", sortable: false, key: "rendered_qty" },
    { title: "Qty Returned",  align: "start", sortable: false, key: "returned_qty" },
    { title: "Qty Balance",  align: "start", sortable: false, key: "balance_qty" },
    { title: "Qty for Return",  align: "start", sortable: false, key: "qty_for_return" },
];

const data = ref({
    title: "List of payment-methods",
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
    loadItems(page, itemsPerPage, sortBy);
};
const loadItems = async (page = null, itemsPerPage = null, sortBy = null) => {
    data.value.loading = true;
    let pageno = page || 1;
    let itemPerpageno = itemsPerPage || 10;
    let params =
        "page=" + pageno + "&per_page=" + itemPerpageno + "&keyword=" + data.value.keyword;
    const response = await useMethod("get", "payment-methods?", "", params);
    if (response) {
        serverItems.value = response.data;
        totalItems.value = response.total;
        data.value.loading = false;
    }
};

const search = () => {
    loadItems();
}

const onSubmit = () => {
    alert('Finalized');
    emits('close-dialog');
}
</script>

<style scoped>
.toolbar-title {
    font-size: 16px; 
    font-style: italic; 
    text-align: center;
}
.form-col {
    margin-top: -16px !important;
}
</style>