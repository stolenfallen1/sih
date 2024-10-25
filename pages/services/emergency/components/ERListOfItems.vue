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
                />
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
                    <template v-slot:[`item.id`]="props">
                        <td class="test" :props="props">
                            <v-checkbox
                                :value="props.item.map_item_id"
                                :disabled="parseInt(props.item.ware_house_items[0].item_OnHand) === 0"
                                v-model="selected_item"
                                @change="handleCheckboxChange(props.item)"
                            />
                        </td>
                    </template>

                    <template v-slot:item.id="{ item }">
                        <span>{{ item.map_item_id }}</span>
                    </template>

                    <template v-slot:item.item_name="{ item }">
                        <span>{{ item.item_name }} {{ item.item_Description }}</span>
                    </template>

                    <template v-slot:item.price="{ item }">
                        <span v-if="item.ware_house_items.length > 0">
                            <template v-for="(warehouseItem, index) in item.ware_house_items" :key="index">
                                ₱ {{ parseFloat(warehouseItem.price).toFixed(2) }}
                            </template>
                        </span>
                        <span v-else>No Price Found</span>
                    </template>

                    <template v-slot:item.item_OnHand="{ item }">
                        <span v-if="item.ware_house_items.length > 0">
                            <template v-for="(warehouseItem, index) in item.ware_house_items" :key="index">
                                <span :style="parseInt(warehouseItem.item_OnHand) > 0 ? 'color: blue;' : 'color: red;'">
                                    {{ parseInt(warehouseItem.item_OnHand) }}
                                </span>
                            </template>
                        </span>
                        <span v-else style="color: red;">No Price Found</span>
                    </template>

                </v-data-table-server>
            </v-card-text>
            <v-divider></v-divider>
            <v-card-actions>
                <v-btn color="blue-darken-1 border border-info" @click="closeDialog">Close</v-btn>
                <v-spacer></v-spacer>
                <v-btn class="bg-primary text-white" @click="onSelect" :disabled="isSelectDisabled">Select</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script setup>
    import { ref, computed } from 'vue';
    const props = defineProps({

        payload: {
            type: Object,
            required: true, 
            default: () => ({
                stocks_OnHand: [{}],
                total: 0 
            })
        },
    
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

        chargecode: {
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

        const response = await $fetch( useApiUrl() + `/er-get-medicine-suplies?page=${pageno}&per_page=${itemPerpageno}&keyword=${data.value.keyword}`, {
            method: 'post',
            headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + useToken()},
            body: { 
                revenuecode: props.user_input_revenue_code,
                warehouseID:parseInt(props.warehouse_id),
                patienttype: props.patienttype,
                // chargecode: props.chargecode, 
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

    const medicine_stocks = ref([]);
    const supply_stocks = ref([]);
    const price_array = ref([]);
    const price = ref(0);
    const medicine_stocks_array = ref([]);
    const supply_stocks_array = ref([]);
    const medicine_item_ListCost= ref([]);
    const supply_item_ListCost = ref([]);

    const handleSelectedRow = (selectedRows) => {
        const selectedItems = selectedRows.map(rowId => serverItems.value.find(item => item.id === rowId));  
        price_array.value = selectedItems.map(item => item.ware_house_items[0].price);
        
        const validSelectedItems = selectedItems.filter(item => item !== undefined && parseInt(item.ware_house_items[0].item_OnHand) > 0)
        
        if(validSelectedItems) {
            if(props.user_input_revenue_code === 'EM') {
                medicine_stocks.value = selectedItems.map(
                    item => item.ware_house_items[0].item_OnHand,
                );

                medicine_item_ListCost.value = selectedItems.map(
                    item => item.ware_house_items[0].item_ListCost,
                );

                medicine_stocks_array.value.push({ 
                    medicine_id: validSelectedItems[0].id, 
                    medicine_stock: medicine_stocks.value[0], 
                    item_List_Cost: medicine_item_ListCost.value[0]
                });
                props.payload.medicine_stocks_OnHand = medicine_stocks_array.value;
            }
            if(props.user_input_revenue_code === 'RS') {
                supply_stocks.value = selectedItems.map(
                    item => item.ware_house_items[0].item_OnHand
                );

                supply_item_ListCost.value = selectedItems.map(
                    item => item.ware_house_items[0].item_ListCost
                );
                
                supply_stocks_array.value.push({ 
                    supply_id: validSelectedItems[0].id, 
                    supply_stock: supply_stocks.value[0],
                    item_List_Cost: supply_item_ListCost.value[0]
                });
                props.payload.supply_stocks_OnHand = supply_stocks_array.value;
            }

            price.value  = price_array.value[0];

        }

        if(validSelectedItems.length === 0) {
            useSnackbar(true, "error", "No valid items selected. Please choose items with stock available.");
            selected_item.value = {};
        } else {
            selected_item.value = validSelectedItems[0];
        }
    };

    const isSelectDisabled = computed(() => {
        if (!selected_item.value || !selected_item.value.ware_house_items || selected_item.value.ware_house_items.length === 0) {
            return true;
        }
        return parseInt(selected_item.value.ware_house_items[0].item_OnHand) === 0;
    });

    const onSelect = () => {
        emits('handle-select', selected_item.value);
        emits('update-stocks', { ...props.payload });
        closeDialog();
    }

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
