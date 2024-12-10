<template>
    <v-dialog :model-value="open_items_list" rounded="lg" @update:model-value="closeDialog" scrollable max-width="775px">
        <v-card rounded="lg">
            <v-toolbar density="compact" color="#107bac" hide-details>
                <v-toolbar-title>Warehouse Items List</v-toolbar-title>
                <v-spacer></v-spacer>
                <v-btn color="white" @click="closeDialog">
                <v-icon>mdi-close</v-icon>
                </v-btn>
            </v-toolbar>
            <v-divider></v-divider>
            <v-card-text>
                <v-text-field
                label="Search by Description"
                density="compact"
                variant="outlined"
                prepend-inner-icon="mdi-magnify"
                v-model="data.keyword"
                @keyup.enter="search"
                >
                </v-text-field>
                <v-divider></v-divider>
                <v-data-table-server
                    class="animated animatedFadeInUp fadeInUp"
                    v-model:items-per-page="itemsPerPage"
                    :headers="headers"
                    :items="serverItems"
                    :items-length="totalItems"
                    :loading="data.loading"
                    :hover="true"
                    @update:options="initialize"
                    @update:modelValue="handleSelectedRow"
                    show-select
                    select-strategy="single"
                    fixed-header
                    density="compact" 
                    height="50vh"
                >
                    <template
                        v-for="(head, index) of headers"  v-slot:[`item.${head.value}`]="props">
                        <td class="test" :props="props" :key="index">
                        <slot :name="head.value" :item="props.item">
                            {{ props.item[head.value] || "..." }}
                        </slot>
                        </td>
                    </template>
                    <template v-slot:item.id="{ item }">
                        <span>
                            {{ item.map_item_id }}
                        </span>
                    </template>
                    <template v-slot:item.item_name="{ item }">
                        <span>
                            {{ item.item_name }} {{ item.item_Description }}
                        </span>
                    </template>
                    <template v-slot:item.price="{ item }">
                        <span v-if="item.ware_house_items.length > 0">
                            <template v-for="(warehouseItem, index) in item.ware_house_items" :key="index">
                                ₱ {{ parseFloat(warehouseItem.price).toFixed(2) }}
                            </template>
                        </span>
                        <span v-else>
                            No Price Found
                        </span>
                    </template>
                    <template v-slot:item.item_OnHand="{ item }">
                        <span v-if="item.ware_house_items.length > 0">
                            <template v-for="(warehouseItem, index) in item.ware_house_items" :key="index">
                                <span :style="parseInt(warehouseItem.item_OnHand) > 0 ? 'color: blue;' : 'color: red;'">
                                    {{ parseInt(warehouseItem.item_OnHand) }}
                                </span>
                            </template>
                        </span>
                        <span v-else style="color: red;">
                            No Price Found
                        </span>
                    </template>
                </v-data-table-server>
            </v-card-text>
            <v-divider></v-divider>
            <v-card-actions>
                <v-btn color="blue-darken-1 border border-info" @click="closeDialog"> Close </v-btn>
                <v-spacer></v-spacer>
                <v-btn class="bg-primary text-white" @click="onSelect">Select</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
    <Snackbar />
</template>

<script setup>
const props = defineProps({
    open_items_list: {
        type: Boolean,
        default: () => false,
        required: true,
    },
    patienttype: {
        type: Number,
        default: () => "",
        required: true,
    },
    user_input_revenue_code: {
        type: String,
        default: () => "",
        required: true,
    },
    warehouse_id: {
        type: Number,
        default: () => "",
        required: true,
    },
    itemcodes: {
        type: Array,
        default: () => [],
        required: true,
    },
    
});
const emits = defineEmits(["close-dialog", "handle-select"]);
const headers = [
    {
        title: "Code",
        align: "start",
        sortable: false,
        key: "id",
    },
    { title: 
        "Description", 
        key: "item_name", 
        align: "start", 
        width: "50%", 
        sortable: false },
    {
        title: "Price",
        key: "price",
        align: "start",
        sortable: false,
    },
    {
        title: "On Hand",
        key: "item_OnHand",
        align: "start",
        sortable: false,
    },
];
const data = ref({
    title: "List of Items",
    keyword: "",
    loading: false,
});

const itemsPerPage = ref(15);
const totalItems = ref(0);
const serverItems = ref([]);
const selected_item = ref({});
const initialize = ({ page, itemsPerPage }) => {
    loadItems(page, itemsPerPage);
};
const loadItems = async (page = null, itemsPerPage = null) => {
    data.value.loading = true;
    let pageno = page || 1;
    let itemPerpageno = itemsPerPage || 15;

    const response = await $fetch( useApiUrl() + `/get-medicine-supplies?page=${pageno}&per_page=${itemPerpageno}&keyword=${data.value.keyword}`, {
        method: 'post',
        headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + useToken()},
        body: { 
            revenuecode: props.user_input_revenue_code,
            warehouseID: parseInt(props.warehouse_id),
            patienttype: props.patienttype,
            itemcodes: props.itemcodes, 
        }
    });
    if (response) {
        serverItems.value = response.data;
        totalItems.value = response.total;
        data.value.loading = false;
    } else {
        useSnackbar(true, "error", "No data found.");
    }
};
const handleSelectedRow = (selectedRows) => {
    const selectedItems = selectedRows.map(rowId => serverItems.value.find(item => item.id === rowId));  
    const validSelectedItems = selectedItems.filter(item => item !== undefined);
    selected_item.value = validSelectedItems[0];
};
const onSelect = () => {
    const wareHouseItems = selected_item.value?.ware_house_items[0];
    if (selected_item.value && wareHouseItems?.item_OnHand == 0) {
        useSnackbar(true, "error", "Item On Hand is Zero, Please select another item.");
        return;
    }
    emits('handle-select', selected_item.value);
    closeDialog();
};

const search = () => {
    loadItems();
};
const closeDialog = () => {
    emits("close-dialog");
    selected_item.value = {};
    data.value.keyword = "";
};
</script>

<style scoped></style>
