<template>
    <v-dialog :model-value="show" rounded="lg" scrollable @update:model-value="closeDialog" max-width="1120px">
        <v-card rounded="lg">
            <v-toolbar density="compact" color="#6984ff" hide-details>
                <v-toolbar-title>Borrowed Items Management {{ selectedRowDetails.id }}</v-toolbar-title> 
                <v-btn color="white" @click="closeDialog">
                    <v-icon>mdi-close</v-icon>
                </v-btn>
            </v-toolbar>
            <v-divider></v-divider>
            <v-card-text>
                <v-card elevation="4">
                    <v-toolbar density="compact" hide-details>
                        <v-toolbar-title class="toolbar-title">Filter Preferences</v-toolbar-title>
                    </v-toolbar>
                    <v-card-text>
                        <v-row>
                            <v-col cols="6">
                                <v-checkbox label="Borrowed" v-model="payload.isBorrowed" :disabled="payload.isReturned === true" density="compact" hide-details></v-checkbox>
                            </v-col>
                            <v-col cols="6">
                                <v-checkbox label="Returned" v-model="payload.isReturned" :disabled="payload.isBorrowed === true" density="compact" hide-details></v-checkbox>
                            </v-col>
                            <v-col cols="4" v-if="payload.isBorrowed || payload.isReturned" class="form-col">
                                <v-autocomplete
                                    label="Department"
                                    variant="outlined"
                                    v-model="payload.department"
                                    density="compact"
                                    hide-details
                                ></v-autocomplete>
                            </v-col>
                            <v-col cols="4" v-if="payload.isBorrowed" class="form-col">
                                <v-text-field
                                    label="Borrowed Date From"
                                    type="date"
                                    variant="outlined"
                                    v-model="payload.borrowedDateFrom"
                                    density="compact"
                                    hide-details
                                ></v-text-field>
                            </v-col>
                            <v-col cols="4" v-if="payload.isBorrowed" class="form-col">
                                <v-text-field
                                    label="Borrowed Date To"
                                    type="date"
                                    variant="outlined"
                                    v-model="payload.borrowedDateFrom"
                                    density="compact"
                                    hide-details
                                ></v-text-field>
                            </v-col>
                            <v-col cols="4" v-if="payload.isReturned" class="form-col">
                                <v-text-field
                                    label="Returned Date From"
                                    type="date"
                                    variant="outlined"
                                    v-model="payload.borrowedDateFrom"
                                    density="compact"
                                    hide-details
                                ></v-text-field>
                            </v-col>
                            <v-col cols="4" v-if="payload.isReturned" class="form-col">
                                <v-text-field
                                    label="Returned Date To"
                                    type="date"
                                    variant="outlined"
                                    v-model="payload.borrowedDateFrom"
                                    density="compact"
                                    hide-details
                                ></v-text-field>
                            </v-col>
                        </v-row>
                    </v-card-text>
                </v-card>
                <v-card elevation="4" class="mt-4">
                    <v-toolbar density="compact" hide-details>
                        <v-toolbar-title class="toolbar-title">Item List</v-toolbar-title>
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
                    <v-card-actions>
                        <v-btn class="bg-info text-white" @click="selectItem">Add</v-btn>
                    </v-card-actions>
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
    <SelectItem :open_select_item="open_select_item" @close-dialog="closeSelectItem"  @handle-select="onSelect" />
</template>

<script setup>
import SelectItem from './sub-forms/SelectItem.vue';

const props = defineProps({
    show: {
        type: Boolean,
        default: () => false,
        required: true,
    },
});

const { selectedRowDetails } = storeToRefs(useSubcomponentSelectedRowDetailsStore()); 

const open_select_item = ref(false);

const payload = ref({
    isBorrowed: false,
    isReturned: false,
});

const headers = [
    { title: "Date Borrowed",  align: "start", sortable: false, key: "date_borrowed" },
    { title: "Qty Borrowed",  align: "start", sortable: false, key: "qty_borrowed" },
    { title: "Date Returned",  align: "start", sortable: false, key: "date_returned" },
    { title: "Description",  align: "start", sortable: false, key: "description" },
    { title: "Borrower Name",  align: "start", sortable: false, key: "borrower_name" },
    { title: "Remarks",  align: "start", sortable: false, key: "remarks" },
    { title: "",  align: "start", sortable: false, key: "actions" },
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
const emits = defineEmits(['close-dialog'])

const selectItem = () => {
    open_select_item.value = true;
};
const closeSelectItem = () => {
    open_select_item.value = false;
};

const onSelect = () => {
    alert("Test!");
};
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