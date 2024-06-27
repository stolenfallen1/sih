<template>
    <v-dialog :model-value="open_charges_list" rounded="lg" @update:model-value="closeDialog" scrollable max-width="725px">
        <v-card rounded="lg">
            <v-toolbar density="compact" color="#107bac" hide-details>
                <v-toolbar-title>Charges List</v-toolbar-title>
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
                    <template v-slot:item.prices="{ item }">
                        <span v-if="item.prices && item.prices.length > 0">
                            <template v-for="(price, index) in item.prices" :key="index">
                                {{ `₱${parseFloat(price.price).toFixed(2)}` }}{{ index < item.prices.length - 1 ? ',' : '' }}
                            </template>
                        </span>
                        <span v-else>
                            No prices found
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
</template>

<script setup>
const props = defineProps({
    open_charges_list: {
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
        key: "map_item_id",
    },
    { title: "Description", key: "exam_description", align: "start", width: "60%", sortable: false },
    {
        title: "Price",
        key: "prices",
        align: "start",
        sortable: false,
    },
];
const data = ref({
    title: "List of Charges",
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

   
    const response = await $fetch( useApiUrl() + `/get-charges-code?page=${pageno}&per_page=${itemPerpageno}&keyword=${data.value.keyword}`, {
        method: 'post',
        headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + useToken()},
        body: { 
            revenuecode: props.user_input_revenue_code,
            patienttype: props.patienttype,
            chargecode: props.chargecode, 
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
    emits('handle-select', selected_item.value);
    closeDialog();
}
const search = () => {
    loadItems();
};
const closeDialog = () => {
    emits("close-dialog");
    selected_item.value = {};
};
</script>

<style scoped></style>
