<template>
    <v-dialog :model-value="open_item_master_file" rounded="lg" @update:model-value="closeDialog"scrollable max-width="950px">
        <v-card rounded="lg">
            <v-toolbar color="#6984ff" hide-details density="compact">
                <v-toolbar-title>Item Master File Selection</v-toolbar-title>
                <v-btn color="white" @click="closeDialog">
                    <v-icon>mdi-close</v-icon>
                </v-btn>
            </v-toolbar>
            <v-card-text>
                <v-row>
                    <v-col cols="12">
                        <v-text-field
                            label="Search here..."
                            density="compact"
                            variant="outlined"
                            prepend-inner-icon="mdi-magnify"
                            hide-details
                            v-model="data.keyword"
                            @keyup.enter="search"
                        ></v-text-field> 
                    </v-col>
                    <v-col cols="12" class="form-col">
                        <div style="display: flex;">
                            <v-checkbox label="Items and Services" density="compact" hide-details></v-checkbox>
                            <v-checkbox label="Supplies" density="compact" hide-details></v-checkbox>
                            <v-checkbox label="Examinations" density="compact" hide-details></v-checkbox>
                            <v-checkbox label="Procedures" density="compact" hide-details></v-checkbox>
                            <v-checkbox label="Miscellaneous" density="compact" hide-details></v-checkbox>
                        </div>
                    </v-col>
                    <v-col cols="12" class="form-col">
                        <v-data-table-server
                            class="animated animatedFadeInUp fadeInUp"
                            v-model:items-per-page="itemsPerPage"
                            :headers="headers"
                            :items="serverItems"
                            :items-length="totalItems"
                            :loading="data.loading"
                            item-value="id"
                            show-select
                            :hover="true"
                            @update:options="initialize"
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
                            <template v-slot:item.actions="{ item }">
                                <v-icon color="red" @click="onDelete(item)">mdi-trash-can</v-icon>
                            </template>
                            <template #bottom></template>
                        </v-data-table-server>
                    </v-col>
                </v-row>
            </v-card-text>
            <v-divider></v-divider>
            <v-card-actions>
                <v-btn color="blue-darken-1 border border-info" @click="closeDialog"> Close </v-btn>
                <v-spacer></v-spacer>
                <v-btn class="bg-primary text-white" type="submit" @click="handleSubmit">Select</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script setup>

const props = defineProps({
    open_item_master_file: {
        type: Boolean,
        default: () => false,
        required: true,
    },
})

const headers = [
    { title: "Item ID",  align: "start", sortable: false, key: "id" },
    { title: "Item Category",  align: "start", sortable: false, key: "item_category" },
    { title: "Description",  align: "start", sortable: false, key: "description" },
    { title: "Generic Name",  align: "start", sortable: false, key: "generic_name" },
    { title: "CPT Code",  align: "start", sortable: false, key: "cpt_code" },
    { title: "Price",  align: "start", sortable: false, key: "price" },
    { title: "Special Price",  align: "start", sortable: false, key: "special_price" },
    { title: "Unit",  align: "start", sortable: false, key: "unit" },
    { title: "", align: "start", sortable: false, key: "actions" },
];

const data = ref({
    title: "List of Item Master File",
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


const emits = defineEmits(['close-dialog', 'handle-submit'])

const handleSubmit = () => {
    emits('handle-submit')
}

const closeDialog = () => {
    emits('close-dialog')
}
</script>

<style scoped>
.form-col {
    margin-top: -16px !important;
}
</style>