<template>
    <v-dialog :model-value="open_form_dialog" rounded="lg" scrollable @update:model-value="closeDialog" max-width="1120px">       
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
                        <v-toolbar-title class="toolbar-title">Item Quantity for Return</v-toolbar-title>
                    </v-toolbar>
                    <v-card-text>
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
                    <v-btn class="bg-primary text-white" type="submit">Finalize</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script setup>
const props = defineProps({
    open_form_dialog: {
        type: Boolean,
        default: () => false,
    },
})

const { selectedRowDetails } = storeToRefs(useSubcomponentSelectedRowDetailsStore()); 

const payload = ref({});

const emits = defineEmits(['close-dialog'])

const headers = [
    { title: "Patient Name",  align: "start", sortable: false, key: "patient_name" },
    { title: "Requisition Date",  align: "start", sortable: false, key: "requisition_date" },
    { title: "Requisition No.",  align: "start", sortable: false, key: "requisition_no" },
    { title: "Department",  align: "start", sortable: false, key: "Department" },
    { title: "Document Type",  align: "start", sortable: false, key: "document_type" },
    { title: "Document No.",  align: "start", sortable: false, key: "document_no" },
    { title: "Document Date",  align: "start", sortable: false, key: "document_date" },
    { title: "Transaction No.",  align: "start", sortable: false, key: "transaction_no" },
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