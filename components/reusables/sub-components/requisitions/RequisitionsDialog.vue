<template>
    <v-dialog :model-value="show" rounded="lg" scrollable @update:model-value="closeDialog" max-width="1120px">    
        <v-card rounded="lg">
            <v-toolbar density="compact" color="#107bac" hide-details>
                <v-toolbar-title>Requisitions Charges to Patient's Account</v-toolbar-title>
                <v-btn color="white" @click="closeDialog">
                    <v-icon>mdi-close</v-icon>
                </v-btn>
            </v-toolbar>
            <v-divider></v-divider>
            <v-card-text>
                <v-row>
                    <v-col cols="12">
                        <v-text-field
                            label="Searh here..."
                            variant="outlined"
                            density="compact"
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
            <v-divider></v-divider>
            <v-card-actions>
                <v-btn color="blue-darken-1 border border-info" @click="closeDialog"> Close </v-btn>
                <v-btn class="bg-success text-white" @click="openPrintSlip"> Rendered Transactions </v-btn>
                <v-spacer></v-spacer>
                <v-btn class="bg-primary text-white" @click="openMultiDepartmentSelection('supply')" prepend-icon="mdi-warehouse">Add Supplies</v-btn>
                <v-btn class="bg-primary text-white" @click="openMultiDepartmentSelection('medicine')" prepend-icon="mdi-pill">Add Medicines</v-btn>
                <v-btn class="bg-primary text-white" @click="openMultiDepartmentSelection('procedure')" prepend-icon="mdi-needle">Add Procedures</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
    <RequisitionMultiItemSelection :open_medical_item_selection="open_medical_item_selection" :category="category" @close-dialog="closeMultiDepartmentSelection" @handle-submit="onSubmitSelectedItem" />
    <RequisitionPrintSlip :print_slip="print_slip" :form_type="form_type" @close-dialog="closePrintSlip" />
</template>

<script setup>
import RequisitionPrintSlip from './sub-forms/RequisitionPrintSlip.vue';
import RequisitionMultiItemSelection from './sub-forms/RequisitionMultiItemSelection.vue';

const props = defineProps({
    show: {
        type: Boolean,
        default: () => false,
    },
    form_type: {
        type: String,
        default: () => '',
    },
})

const { selectedRowDetails } = storeToRefs(useSubcomponentSelectedRowDetailsStore()); 

const emits = defineEmits(['close-dialog'])

const open_medical_item_selection = ref(false);
const category = ref(null);
const print_slip = ref(false);

const openMultiDepartmentSelection = (selectedCategory) => {
    category.value = selectedCategory;
    open_medical_item_selection.value = true;
}
const closeMultiDepartmentSelection = () => {
    open_medical_item_selection.value = false;
}
const openPrintSlip = () => {
    print_slip.value = true;
}
const onSubmitSelectedItem = () => {
    alert('Successfully selected item')
}
const closePrintSlip = () => {
    print_slip.value = false;
}

const closeDialog = () => {
    emits('close-dialog');
}

const headers = [
    { title: "",  align: "start", sortable: false, key: "" },
    { title: "Code",  align: "start", sortable: false, key: "" },
    { title: "Category",  align: "start", sortable: false, key: "" },
    { title: "Description",  align: "start", sortable: false, key: "" },
    { title: "Quantity",  align: "start", sortable: false, key: "" },
    { title: "Frequency",  align: "start", sortable: false, key: "" },
    { title: "Amount",  align: "start", sortable: false, key: "" },
    { title: "Request Date",  align: "start", sortable: false, key: "" },
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
.form-col {
    margin-top: -16px !important;
}
</style>