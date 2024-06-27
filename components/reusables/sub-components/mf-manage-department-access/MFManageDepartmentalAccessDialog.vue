<template>
    <v-dialog :model-value="show" rounded="lg" scrollable @update:model-value="closeDialog" max-width="1120px">
        <form @submit.prevent="onSubmit">
            <v-card rounded="lg">
                <v-toolbar density="compact" color="#107bac" hide-details>
                    <v-toolbar-title>Manage Warehouse Accessibility {{ selectedRowDetails.id }}</v-toolbar-title>
                    <v-btn color="white" @click="closeDialog">
                        <v-icon>mdi-close</v-icon>
                    </v-btn>
                </v-toolbar>
                <v-divider></v-divider>
                <v-card-text>
                    <v-row>
                        <v-col cols="4">
                            <v-text-field
                                label="Item ID"
                                density="compact"
                                variant="outlined"
                                readonly
                            ></v-text-field>
                        </v-col>
                        <v-col cols="8">
                            <v-text-field
                                label="Item Description"
                                density="compact"
                                variant="outlined"
                                readonly
                            ></v-text-field>
                        </v-col>
                    </v-row>
                    <v-divider></v-divider>
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
                        select-strategy="single"
                        fixed-header
                        density="compact" 
                        height="50vh"
                        >
                        <template
                            v-for="(head, index) of headers"  v-slot:[`item.${head.value}`]="props" >
                            <td class="test" :props="props" :key="index">
                            <slot :name="head.value" :item="props.item">
                                {{ props.item[head.value] || "..." }}
                            </slot>
                            </td>
                        </template>
                        <template v-slot:item.tradable="{ item }">
                            <v-checkbox density="compact" hide-details></v-checkbox>
                        </template>
                        <template v-slot:item.viewable="{ item }">
                            <v-checkbox density="compact" hide-details></v-checkbox>
                        </template>
                        <template v-slot:item.for_replenishment="{ item }">
                            <v-checkbox density="compact" hide-details></v-checkbox>
                        </template>
                        <template v-slot:item.actions="{ item }">
                            <v-icon color="green" @click="onEdit(item)">mdi-pencil</v-icon>
                        </template>
                        <template v-slot:item.invyty_days="{ item }">
                            <input placeholder="0.00" />
                        </template>
                        <template v-slot:item.minimum_level="{ item }">
                            <input placeholder="0.00" />
                        </template>
                        <template v-slot:item.critical_level="{ item }">
                            <input placeholder="0.00" />
                        </template>
                        <template v-slot:item.reorder_point="{ item }">
                            <input placeholder="0.00" />
                        </template>
                        <template v-slot:item.average_movement="{ item }">
                            <input placeholder="0.00" />
                        </template>
                        <template #bottom></template>
                    </v-data-table-server>
                </v-card-text>
                <v-divider></v-divider>
                <v-card-actions>
                    <v-btn color="blue-darken-1 border border-info" @click="closeDialog"> Close </v-btn>
                    <v-spacer></v-spacer>
                    <v-btn class="bg-info text-white" @click="openAncillaryDepList">Add</v-btn>
                    <v-btn class="bg-primary text-white" type="submit">Save</v-btn>
                </v-card-actions>
            </v-card>
        </form>
    </v-dialog>
    <MFAncillaryDepSelectionList :open_ancillary_department_list="open_ancillary_department_list" @close-dialog="closeAncillaryDepList" />
</template>

<script setup>
import MFAncillaryDepSelectionList from "./sub-forms/MFAncillaryDepSelectionList.vue";

const props = defineProps({
    show: {
        type: Boolean,
        default: () => false,
        required: true,
    },
});

const { selectedRowDetails } = storeToRefs(useSubcomponentSelectedRowDetailsStore()); 

const confirmation = ref(false);
const emits = defineEmits(['close-dialog'])
const open_ancillary_department_list = ref(false)
const headers = [
    { title: 'Tradable', key: 'tradable', align: 'start' },
    { title: 'Viewable', key: 'viewable', align: 'start' },
    { title: 'For Replenishment', key: 'for_replenishment', align: 'start' },
    { title: 'Warehouse Group', key: 'warehouse_group', align: 'start' },
    { title: 'Code', key: 'code', align: 'start' },
    { title: 'Department', key: 'department', align: 'start' },
    { title: 'Location', key: 'location', align: 'start' },
    { title: 'Invty Days', key: 'invyty_days', align: 'start' },
    { title: 'Minimum Level', key: 'minimum_level', align: 'start' },
    { title: 'Critical Level', key: 'critical_level', align: 'start' },
    { title: 'Reorder Point', key: 'reorder_point', align: 'start' },
    { title: 'Average Movement', key: 'average_movement', align: 'start' },
    { title: '', key: 'actions', align: 'start' },
];
const data = ref({
    title: "List of Item Composition",
    keyword: "",
    loading: false,
    filter: {},
    tab: 0,
    param_tab: 1,
});
const itemsPerPage = ref(10);
const totalItems = ref(0);
const serverItems = ref([]);
const initialize =  ({ page, itemsPerPage, sortBy }) => {
    loadItems(page,itemsPerPage,sortBy) 
    // null
}
const loadItems = async(page = null,itemsPerPage = null,sortBy = null)=>{
    data.value.loading = true;
    let pageno = page || 1;
    let itemPerpageno = itemsPerPage || 10;
    let params = "page=" +pageno + "&per_page=" + itemPerpageno + "&keyword=" + data.value.keyword;
    const response = await useMethod("get","get-warehouse-group?","",params);
    if(response){
        serverItems.value = response.data;
        totalItems.value = response.total;
        data.value.loading = false;
    }
}

const onEdit = (item) => {
    alert("Edit");
} 

const openAncillaryDepList = () => {
    open_ancillary_department_list.value = true;
}
const closeAncillaryDepList = () => {
    open_ancillary_department_list.value = false;
}

const onSubmit = () => {
    alert("Saved");
    emits('close-dialog');
}
const closeDialog = () => {
    emits('close-dialog')
}
</script>

<style scoped>
</style>