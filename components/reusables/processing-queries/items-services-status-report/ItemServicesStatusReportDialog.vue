<template>
    <v-dialog :model-value="show" rounded="lg" scrollable @update:model-value="closeDialog" max-width="1120px">
        <v-card rounded="lg">
            <v-toolbar density="compact" color="#107bac" hide-details>
                <v-toolbar-title>List of Items and Supplies {{ selectedRowDetails.id }}</v-toolbar-title> 
                <v-btn color="white" @click="closeDialog">
                    <v-icon>mdi-close</v-icon>
                </v-btn>
            </v-toolbar>
            <v-divider></v-divider>
            <v-card-text>
                <v-card elevation="4">
                    <v-card-text>
                        <v-row>
                            <v-col cols="4">
                                <v-autocomplete
                                    label="Report Option"
                                    variant="outlined"
                                    density="compact"
                                    hide-details
                                ></v-autocomplete>
                            </v-col>
                            <v-col cols="4">
                                <v-text-field
                                    label="Reference Date Range To"
                                    type="date"
                                    variant="outlined"
                                    density="compact"
                                    hide-details
                                ></v-text-field>
                            </v-col>
                            <v-col cols="4">
                                <v-text-field
                                    label="Reference Date Range From"
                                    type="date"
                                    variant="outlined"
                                    density="compact"
                                    hide-details
                                ></v-text-field>
                            </v-col>
                            <v-col cols="6" class="form-col">
                                <v-text-field
                                    label="Department"
                                    variant="outlined"
                                    density="compact"
                                    hide-details
                                    readonly
                                    prepend-icon="mdi-plus-box"
                                    @click:prepend="selectDepartment"
                                ></v-text-field>
                            </v-col>
                            <v-col cols="6" class="form-col">
                                <v-text-field
                                    label="Items and Services"
                                    variant="outlined"
                                    density="compact"
                                    hide-details
                                    readonly
                                    prepend-icon="mdi-plus-box"
                                    @click:prepend="selectItemsServices"
                                ></v-text-field>
                            </v-col>
                        </v-row>
                    </v-card-text>
                </v-card>
                <v-card elevation="4" class="mt-4">
                    <v-toolbar density="compact" hide-details>
                        <v-toolbar-title class="toolbar-title">Transaction Line Items</v-toolbar-title>
                    </v-toolbar>
                    <v-card-text>
                        <v-text-field
                            label="Search here..."
                            density="compact"
                            variant="outlined"
                            prepend-inner-icon="mdi-magnify"
                            v-model="data.keyword"
                            @keyup.enter="search"
                        ></v-text-field>
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
                <v-btn class="bg-primary text-white" @click.prevent="onSubmit">Select</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
    <AncillaryDepartmentSelectionList :open_ancillary_department_list="open_ancillary_department_list" @close-dialog="closeSelectDepartment" />
    <SelectItemsServices :open_items_services_list="open_items_services_list" @close-dialog="closeSelectItemsServices" />
</template>

<script setup>
import AncillaryDepartmentSelectionList from "@/components/reusables/AncillaryDepartmentSelectionList.vue";
import SelectItemsServices from "./sub-forms/SelectItemsServices.vue";

const props = defineProps({
    show: {
        type: Boolean,
        default: () => false,
        required: true,
    },
});

const { selectedRowDetails } = storeToRefs(useSubcomponentSelectedRowDetailsStore()); 

const payload = ref({});
const open_ancillary_department_list = ref(false);
const open_items_services_list = ref(false);

const headers = [
    { title: "Patient Name",  align: "start", sortable: false, key: "patient_name" },
    { title: "Document No",  align: "start", sortable: false, key: "document_no" },
    { title: "Item ID",  align: "start", sortable: false, key: "item_id" },
    { title: "Item Description",  align: "start", sortable: false, key: "item_description" },
    { title: "Rendered Qty",  align: "start", sortable: false, key: "rendered_qty" },
    { title: "Rendered Price",  align: "start", sortable: false, key: "rendered_price" },
    { title: "Amount",  align: "start", sortable: false, key: "amount" },
    { title: "Discount Amount",  align: "start", sortable: false, key: "discount_amount" },
    { title: "Net Amount",  align: "start", sortable: false, key: "net_amount" },
    { title: "Ancillary",  align: "start", sortable: false, key: "ancillary" },
    { title: "Request Qty",  align: "start", sortable: false, key: "request_qty" },
    { title: "Requested Item",  align: "start", sortable: false, key: "requested_item" },
    { title: "Requisition Price",  align: "start", sortable: false, key: "requisition_price" },
    { title: "Requisition DateTime",  align: "start", sortable: false, key: "requisition_datetime" },
    { title: "Requested By",  align: "start", sortable: false, key: "requested_by" },
    { title: "Rendered DateTime",  align: "start", sortable: false, key: "rendered_datetime" },
    { title: "Rendered By",  align: "start", sortable: false, key: "rendered_by" },
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

const selectDepartment = () => {
    open_ancillary_department_list.value = true;
}
const closeSelectDepartment = () => {
    open_ancillary_department_list.value = false;
}
const selectItemsServices = () => {
    open_items_services_list.value = true;
}
const closeSelectItemsServices = () => {
    open_items_services_list.value = false;
}

const emits = defineEmits(['close-dialog'])

const onSubmit = () => {
    alert("Test!");
    emits('close-dialog');
};


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