<template>
    <v-dialog :model-value="open_ancillary_department_list" rounded="lg" scrollable @update:model-value="closeDialog" max-width="750px">
        <v-card rounded="lg">
            <v-toolbar density="compact" color="#6984ff" hide-details>
                <v-toolbar-title>Ancillary Department Selection List {{ selectedRowDetails.id }}</v-toolbar-title>
                <v-btn color="white" @click="closeDialog">
                    <v-icon>mdi-close</v-icon>
                </v-btn>
            </v-toolbar>
            <v-divider></v-divider>
            <v-card-text>
                <v-text-field
                    label="Search here..."
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
                        v-for="(head, index) of headers"  v-slot:[`item.${head.value}`]="props">
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
                <v-btn class="bg-primary text-white" @click="openFormDialog">Select</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
    <MFManageWarehouseAccess :open_form_dialog="open_form_dialog" @close-dialog="closeFormDialog" @handle-submit="onSubmit" />
</template>

<script setup>
import MFManageWarehouseAccess from './MFManageWarehouseAccess.vue';

const props = defineProps({
    open_ancillary_department_list: {
        type: Boolean,
        default: () => false,
        required: true,
    },
});

const { selectedRowDetails } = storeToRefs(useSubcomponentSelectedRowDetailsStore()); 

const emits = defineEmits(['close-dialog'])
const open_form_dialog = ref(false)
const headers = [
    { title: 'Department Name', key: 'department_name', align: 'center' },
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

const openFormDialog = () => {
    open_form_dialog.value = true;
}

const closeFormDialog = () => {
    open_form_dialog.value = false;
}


const onSubmit = async (payload) => {
    alert("Item Selected");
    emits('close-dialog');
}

const closeDialog = () => {
    emits('close-dialog')
}
</script>

<style scoped>
</style>