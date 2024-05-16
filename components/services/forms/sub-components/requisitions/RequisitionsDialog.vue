<template>
    <v-dialog :model-value="show" rounded="lg" scrollable @update:model-value="closeDialog" max-width="1120px">    
        <v-card rounded="lg">
            <v-toolbar density="compact" color="#6984ff" hide-details>
                <v-toolbar-title>Patient Account Transaction List {{ selectedRowDetails.id }}</v-toolbar-title>
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
                <v-btn color="blue-lighten-1 border border-primary" @click="openPrintSlip"> Print Requisition Slip </v-btn>
                <v-spacer></v-spacer>
                <v-btn class="bg-primary text-white" @click="openMultiDepartmentSelection">Add</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
    <DxMedicalItemSelection :open_medical_item_selection="open_medical_item_selection" @close-dialog="closeMultiDepartmentSelection" @handle-submit="onSubmitSelectedItem" />
    <RequisitionPrintSlip :print_slip="print_slip" :form_type="form_type" @close-dialog="closePrintSlip" />
</template>

<script setup>
import DxMedicalItemSelection from '~/components/reusables/build-file/dx-medical-packages/sub-forms/DxMedicalItemSelection.vue';
import RequisitionPrintSlip from './sub-forms/RequisitionPrintSlip.vue';

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
const print_slip = ref(false);

const openMultiDepartmentSelection = () => {
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
    { title: "Ancillary",  align: "start", sortable: false, key: "ancillary" },
    { title: "Requisition No.",  align: "start", sortable: false, key: "requisition_no" },
    { title: "Request DateTime",  align: "start", sortable: false, key: "request_datetime" },
    { title: "Render DateTime",  align: "start", sortable: false, key: "render_datetime" },
    { title: "Documnet No.",  align: "start", sortable: false, key: "document_no" },
    { title: "Amount",  align: "start", sortable: false, key: "amount" },
    { title: "Output Tax",  align: "start", sortable: false, key: "output_tax" },
    { title: "Discount Amount",  align: "start", sortable: false, key: "discount_amount" },
    { title: "Net Amount",  align: "start", sortable: false, key: "net_amount" },
    { title: "Rendered By",  align: "start", sortable: false, key: "rendered_by" },
    { title: "Requested By",  align: "start", sortable: false, key: "requested_by" },
    { title: "Cancelled By",  align: "start", sortable: false, key: "cancelled_by" },
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