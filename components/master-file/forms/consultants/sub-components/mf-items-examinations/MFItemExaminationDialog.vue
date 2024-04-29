<template>
    <v-dialog :model-value="show" rounded="lg" scrollable @update:model-value="closeDialog" max-width="800px">
        <v-card rounded="lg">
            <v-toolbar density="compact" color="#6984ff" hide-details>
                <v-toolbar-title>List of Item Examination {{ selectedRowDetails.id }}</v-toolbar-title>
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
                    item-value="id"
                    :hover="true"
                    @update:options="initialize"
                    show-select
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
                    <template v-slot:item.actions="{ item }">
                        <v-icon color="green mr-3" @click="onEdit(item)">mdi-pencil</v-icon>
                        <v-icon color="red" @click="onDelete(item)">mdi-trash-can</v-icon>
                    </template>
                    <template #bottom></template>
                </v-data-table-server>
            </v-card-text>
            <v-card-actions>
                <v-btn color="blue-darken-1 border border-info" @click="closeDialog"> Close </v-btn>
                <v-spacer></v-spacer>
                <v-btn class="bg-primary text-white" @click="openItemSelectionList">Add</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
    <MFItemSelectionList :open_selection_list="open_selection_list" @close-dialog="closeItemSelectionList" />
    <deleteConfirmation :show="confirmation" @confirm="confirm" @close="closeconfirmation" />
</template>

<script setup>
import MFItemSelectionList from "./sub-forms/MFItemSelectionList.vue";

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
const open_selection_list = ref(false)
const headers = [
    {
        title: 'Item Name',
        align: 'start',
        sortable: false,
        key: 'id',
        width: '35%',
    },
    { title: 'Category', key: 'category', align: 'start', width:"25%" },
    { title: 'RF Comp Type', key: 'rf_comp_type', align: 'start', width:"15%" },
    { title: 'RF Base', key: 'rf_base', align: 'start', width:"15%" },
    { title: '', key: 'actions', align: 'start' },
];
const data = ref({
    title: "List of Item Examination",
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
    // loadItems(page,itemsPerPage,sortBy) 
    null
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
const search = ()=>{
    loadItems();
}

const openItemSelectionList = () => {
    open_selection_list.value = true;
}
const closeItemSelectionList = () => {
    open_selection_list.value = false;
}

const onEdit = (item) => {
    openFormDialog();
  // payload.value = Object.assign({});
  // payload.value = Object.assign({},item);
  // payload.value.isactive = item.isactive == 1 ? true:false;
}

const confirm = () => {
    confirmation.value = false;
}
const closeconfirmation = () => {
    confirmation.value = false;
}
const onDelete = (item) => {
    // payload.value = Object.assign({});
    // payload.value = Object.assign({},item);
    confirmation.value = true;
}
const closeDialog = () => {
    emits('close-dialog')
}
</script>

<style scoped>
</style>