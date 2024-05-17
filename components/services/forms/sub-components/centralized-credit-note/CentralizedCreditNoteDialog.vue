<template>
    <v-dialog :model-value="show" rounded="lg" scrollable @update:model-value="closeDialog" max-width="1120px">       
        <v-card rounded="lg">
            <v-toolbar density="compact" color="#6984ff" hide-details>
                <v-toolbar-title>Centralized Credit Note Application {{ selectedRowDetails.id }}</v-toolbar-title>
                <v-btn color="white" @click="closeDialog">
                    <v-icon>mdi-close</v-icon>
                </v-btn>
            </v-toolbar>
            <v-divider></v-divider>
            <v-card-text>
                <v-card elevation="4">
                    <v-toolbar density="compact" hide-details>
                        <v-toolbar-title class="toolbar-title">Select from List of Valid Item Transaction</v-toolbar-title>
                    </v-toolbar>
                    <v-card-text>
                        <v-row>
                            <v-col :cols="payload.case_type === 'Inpatient' ? '4' : '6'">
                                <v-autocomplete
                                    label="Registry Case Type"
                                    v-model="payload.case_type"
                                    variant="outlined"
                                    density="compact"
                                    hide-details
                                    :items="['Inpatient', 'Outpatient', 'Emergency']"
                                ></v-autocomplete>
                            </v-col>
                            <v-col cols="4" v-if="payload.case_type === 'Inpatient'">
                                <v-text-field
                                    label="Admission Date"
                                    type="date"
                                    variant="outlined"
                                    density="compact"
                                    hide-details
                                ></v-text-field>
                            </v-col>
                            <v-col cols="6" v-if="payload.case_type === 'Outpatient' || payload.case_type === 'Emergency'">
                                <v-text-field
                                    label="Case Date"
                                    type="date"
                                    variant="outlined"
                                    density="compact"
                                    hide-details
                                ></v-text-field>
                            </v-col>
                            <v-col cols="4" v-if="payload.case_type === 'Inpatient'">
                                <v-text-field
                                    label="Discharge Date"
                                    type="date"
                                    variant="outlined"
                                    density="compact"
                                    hide-details
                                ></v-text-field>
                            </v-col>
                            <v-col cols="12" class="form-col">
                                <v-text-field
                                    label="Search here..."
                                    density="compact"
                                    variant="outlined"
                                    prepend-inner-icon="mdi-magnify"
                                    v-model="data.keyword"
                                    @keyup.enter="search"
                                ></v-text-field> 
                            </v-col> 
                        </v-row>
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
                <v-btn class="bg-info text-white" @click="openFormDialog"> {{ "Next>>" }} </v-btn>
                    <v-btn class="bg-primary text-white">Finalize</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
    <ItemQuantityForReturn :open_form_dialog="open_form_dialog" @close-dialog="closeFormDialog" />
</template>

<script setup>
import ItemQuantityForReturn from "./sub-forms/ItemQuantityForReturn.vue";

const props = defineProps({
    show: {
        type: Boolean,
        default: () => false,
    },
})

const { selectedRowDetails } = storeToRefs(useSubcomponentSelectedRowDetailsStore()); 

const payload = ref({});

const emits = defineEmits(['close-dialog'])
const open_form_dialog = ref(false);

const headers = [
    { title: "Case No.",  align: "start", sortable: false, key: "case_no" },
    { title: "Patient Name",  align: "start", sortable: false, key: "patient_name" },
    { title: "Type",  align: "start", sortable: false, key: "type" },
    { title: "Document No",  align: "start", sortable: false, key: "document_no" },
    { title: "Document Date",  align: "start", sortable: false, key: "document_date" },
    { title: "Item ID",  align: "start", sortable: false, key: "item_id" },
    { title: "Description",  align: "start", sortable: false, key: "description" },
    { title: "Qty Rendered",  align: "start", sortable: false, key: "qty_rendered" },
    { title: "Qty Returned",  align: "start", sortable: false, key: "qty_returned" },
    { title: "Qty Balance",  align: "start", sortable: false, key: "qty_balance" },
    { title: "Qty For Return",  align: "start", sortable: false, key: "qty_for_return" },
    { title: "Price",  align: "start", sortable: false, key: "price" },
    { title: "Unit",  align: "start", sortable: false, key: "unit" },
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

const openFormDialog = () => {
    open_form_dialog.value = true;
}
const closeFormDialog = () => {
    open_form_dialog.value = false;
}

const onSubmit = () => {
    alert('Finalized');
    emits('close-dialog');
}

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
.form-col {
    margin-top: -16px !important;
}
</style>