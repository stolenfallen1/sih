<template>
    <v-dialog :model-value="show" rounded="lg" scrollable @update:model-value="closeDialog" max-width="1120px">
        <v-card rounded="lg">
            <v-toolbar density="compact" color="#107bac" hide-details>
                <v-toolbar-title>May Go Home Patient List {{ selectedRowDetails.id }}</v-toolbar-title> 
                <v-btn color="white" @click="closeDialog">
                    <v-icon>mdi-close</v-icon>
                </v-btn>
            </v-toolbar>
            <v-divider></v-divider>
            <v-card-text>
                <v-row>
                    <v-col cols="4">
                        <v-autocomplete
                            label="Nurse Station"
                            variant="outlined"
                            density="compact"
                            hide-details
                        ></v-autocomplete>
                    </v-col>
                    <v-col cols="4">
                        <v-text-field
                            label="MGH Date Range To"
                            type="date"
                            variant="outlined"
                            density="compact"
                            hide-details
                        ></v-text-field>
                    </v-col>
                    <v-col cols="4">
                        <v-text-field
                            label="MGH Date Range From"
                            type="date"
                            variant="outlined"
                            density="compact"
                            hide-details
                        ></v-text-field>
                    </v-col>
                    <v-col cols="12" class="form-col">
                        <v-text-field
                            label="Search by Patient Name"
                            density="compact"
                            variant="outlined"
                            prepend-inner-icon="mdi-magnify"
                            v-model="data.keyword"
                            @keyup.enter="search"
                        ></v-text-field>
                    </v-col>
                </v-row>
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
                <v-spacer></v-spacer>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script setup>
const props = defineProps({
    show: {
        type: Boolean,
        default: () => false,
        required: true,
    },
});

const { selectedRowDetails } = storeToRefs(useSubcomponentSelectedRowDetailsStore()); 

const payload = ref({});

const headers = [
    { title: "",  align: "start", sortable: false, key: "soa_billing_statement" },
    { title: "",  align: "start", sortable: false, key: "hospital_bill_processing_sheet" },
    { title: "MGH No.",  align: "start", sortable: false, key: "mgh_no" },
    { title: "Patient Name",  align: "start", sortable: false, key: "patient_name" },
    { title: "Room No",  align: "start", sortable: false, key: "room_no" },
    { title: "Registry No",  align: "start", sortable: false, key: "registry_no" },
    { title: "Registry Case Date",  align: "start", sortable: false, key: "registry_case_date" },
    { title: "MGH DateTime",  align: "start", sortable: false, key: "mgh_datetime" },
    { title: "Tagged for MGH By",  align: "start", sortable: false, key: "tagged_for_mgh_by" },
    { title: "MGH Clearance DateTime",  align: "start", sortable: false, key: "mgh_clearance_datetime" },
    { title: "Tagged for MGH Clearance By",  align: "start", sortable: false, key: "tagged_for_mgh_clearance_by" },
    { title: "Untagged for MGH Clearance DateTime",  align: "start", sortable: false, key: "untagged_for_mgh_clearance_datetime" },
    { title: "Untagged for MGH Clearance By",  align: "start", sortable: false, key: "untagged_for_mgh_clearance_by" },
    { title: "Untagged for MGH DateTime",  align: "start", sortable: false, key: "untagged_for_mgh_datetime" },
    { title: "Untagged for MGH By",  align: "start", sortable: false, key: "untagged_for_mgh_by" },
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