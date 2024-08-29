<template>
    <v-dialog :model-value="open_medical_package_list" rounded="lg" @update:model-value="closeDialog" scrollable max-width="700px">
        <v-card rounded="lg">
            <v-toolbar density="compact" color="#107bac" hide-details>
                <v-toolbar-title>Medical Package List</v-toolbar-title>
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
                ></v-text-field>
                <v-divider></v-divider>
                <v-data-table-server 
                    class="animated animatedFadeInUp fadeInUp"
                    v-model="selected_item"
                    v-model:items-per-page="itemsPerPage"
                    :headers="headers"
                    :items="serverItems"
                    :items-length="totalItems"
                    :loading="data.loading"
                    item-value="id"
                    :hover="true"
                    @update:options="initialize"
                    @update:model-value="handleSelectedRow"
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
                    <template #bottom></template>
                </v-data-table-server>
            </v-card-text>
            <v-divider></v-divider>
            <v-card-actions>
                <v-btn color="blue-darken-1 border border-info" @click="closeDialog"> Close </v-btn>
                <v-spacer></v-spacer>
                <v-btn class="bg-primary text-white" @click="onSubmit">Select Medical Package</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script setup>
const props = defineProps({
    open_medical_package_list: {
        type: Boolean,
        default: () => false,
        required: true,
    },
})

const emits = defineEmits(['close-dialog', 'handle-select']);
const selected_item = ref([]);
const isloading = ref(false);
const headers = [
    {
        title: 'ID',
        align: 'start',
        sortable: false,
        key: 'id',
    },
    { title: 'Description', key: 'package_description', align: 'start', width:"60%" },
    { title: 'Price', key: 'package_amount', align: 'start' },
];
const data = ref({
    title: "List of Medical Packages",
    keyword: "",
    loading: false,
    filter: {},
    tab: 0,
    param_tab: 1,
});
const itemsPerPage = ref(100);
const totalItems = ref(0);
const serverItems = ref([]);
const initialize =  ({ page, itemsPerPage, sortBy }) => {
    loadItems(page,itemsPerPage,sortBy) 
}
const loadItems = async(page = null,itemsPerPage = null,sortBy = null)=>{
    data.value.loading = true;
    let pageno = page || 1;
    let itemPerpageno = itemsPerPage || 10;
    let params = "page=" +pageno + "&per_page=" + itemPerpageno + "&keyword=" + data.value.keyword;
    const response = await useMethod("get","get-medical-package?","",params);
    if(response){
        serverItems.value = response.data;
        totalItems.value = response.total;
        data.value.loading = false;
    }
}
const search = ()=>{
    loadItems();
}

const handleSelectedRow = (selectedRows) => {
    const selectedItems = selectedRows.map(rowId => {
        const item = serverItems.value.find(item => item.id === rowId);
        if (item) {
            return {
                id: item.id,
                package_description: item.package_description,
                package_amount: item.package_amount,
            }
        }
        return null;
    }).filter(item => item !== null);
    emits('handle-select', selectedItems);
}

const onSubmit = () => {
    if (selected_item.value.length === 0) {
        return alert('Please select a package');
    } else {
        handleSelectedRow(selected_item.value);
        closeDialog();
    }
}

const closeDialog = () => {
    emits('close-dialog');
    selected_item.value = [];
}

</script>

<style scoped>
</style>