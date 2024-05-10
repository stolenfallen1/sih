<template>
    <v-dialog :model-value="show" rounded="lg" scrollable @update:model-value="closeDialog" max-width="1120px">    
        <v-card rounded="lg">
            <v-toolbar density="compact" color="#6984ff" hide-details>
                <v-toolbar-title>List of Medicines {{ selectedRowDetails.id }}</v-toolbar-title>
                <v-btn color="white" @click="closeDialog">
                    <v-icon>mdi-close</v-icon>
                </v-btn>
            </v-toolbar>
            <v-divider></v-divider>
            <v-card-text>
                <v-row>
                    <v-col cols="12">
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
                    class="animated animatedFadeInUp fadeInUp mt-4"
                    v-model:items-per-page="itemsPerPage"
                    :headers="headers"
                    :items="serverItems"
                    :items-length="totalItems"
                    :loading="data.loading"
                    item-value="id"
                    :hover="true"
                    @update:options="initialize"
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
                <v-btn class="bg-primary text-white" @click="onPrint" disabled>Print List of Medicines</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script setup>
const props = defineProps({
    show: {
        type: Boolean,
        default: () => false,
    },
})

const { selectedRowDetails } = storeToRefs(useSubcomponentSelectedRowDetailsStore()); 

const onPrint = () => {
    alert('Print');
    emits('close-dialog');
}

const onPreview = () => {
    alert('Preview');
    emits('close-dialog');
}

const emits = defineEmits(['close-dialog'])

const closeDialog = () => {
    emits('close-dialog');
}

const headers = [
    { title: "Item ID",  align: "start", sortable: false, key: "item_id", },
    { title: "Description",  align: "start", sortable: false, key: "description", },
    { title: "Rendered Qty",  align: "start", sortable: false, key: "rendered_qty", },
    { title: "Returned Qty",  align: "start", sortable: false, key: "returned_qty", },
    { title: "Balance",  align: "start", sortable: false, key: "balance", },
    { title: "Unit",  align: "start", sortable: false, key: "unit", },
    { title: "Render DateTime",  align: "start", sortable: false, key: "render_datetime", },
    { title: "Remarks",  align: "start", sortable: false, key: "remarks", },
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
</script>

<style scoped>
</style>