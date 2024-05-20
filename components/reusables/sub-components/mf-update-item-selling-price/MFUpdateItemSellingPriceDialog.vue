<template>
    <v-dialog :model-value="show" rounded="lg" scrollable @update:model-value="closeDialog" max-width="900px">
        <v-card rounded="lg">
            <v-toolbar density="compact" color="#6984ff" hide-details>
                <v-toolbar-title>Select Items and Services for Selling Price Update Processing {{ selectedRowDetails.id }}</v-toolbar-title>
                <v-btn color="white" @click="closeDialog">
                    <v-icon>mdi-close</v-icon>
                </v-btn>
            </v-toolbar>
            <v-divider></v-divider>
            <v-card-text>
                <v-row>
                    <v-col cols="12">
                        <v-autocomplete
                            label="Department"
                            variant="outlined"
                            density="compact"
                            hide-details
                        ></v-autocomplete>
                    </v-col>
                    <v-col cols="6" class="form-col">
                        <v-autocomplete
                            label="Item Group"
                            variant="outlined"
                            density="compact"
                            hide-details
                        ></v-autocomplete>
                    </v-col>
                    <v-col cols="6" class="form-col">
                        <v-autocomplete
                            label="Category"
                            variant="outlined"
                            density="compact"
                            hide-details
                        ></v-autocomplete>
                    </v-col>
                </v-row>
                <v-divider class="mt-4"></v-divider>
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
                    <template #bottom></template>
                </v-data-table-server>
            </v-card-text>
            <v-divider></v-divider>
            <v-card-actions>
                <v-btn color="blue-darken-1 border border-info" @click="closeDialog"> Close </v-btn>
                <v-spacer></v-spacer>
                <v-btn class="bg-primary text-white" @click="openPriceUpdateDialog">Continue</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
    <MFPriceUpdateDialog :open_price_update_dialog="open_price_update_dialog" @close-dialog="closePriceUpdateDialog" @handle-submit="onSubmitEditedPrice" />
</template>

<script setup>
import MFPriceUpdateDialog from "./sub-forms/MFPriceUpdateDialog.vue";

const props = defineProps({
    show: {
        type: Boolean,
        default: () => false,
        required: true,
    },
});

const payload = ref({});
const open_price_update_dialog = ref(false);

const { selectedRowDetails } = storeToRefs(useSubcomponentSelectedRowDetailsStore()); 

const emits = defineEmits(['close-dialog'])
const headers = [
    { title: 'Item ID', key: 'item_id', align: 'center' },
    { title: 'Item Description', key: 'item_description', align: 'start' },
    { title: 'Unit', key: 'unit', align: 'start' },
    { title: 'Cost', key: 'cost', align: 'start' },
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

const openPriceUpdateDialog = () => {
    open_price_update_dialog.value = true;
}
const onSubmitEditedPrice = () => {
    alert('Updated Successfully');
    emits('close-dialog');
}
const closePriceUpdateDialog = () => {
    open_price_update_dialog.value = false;
}

const closeDialog = () => {
    emits('close-dialog')
}
</script>

<style>
.form-col {
    margin-top: -16px !important;
}
</style>