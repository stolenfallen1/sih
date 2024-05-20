<template>
    <v-dialog :model-value="show" rounded="lg" scrollable @update:model-value="closeDialog" max-width="1120px">       
        <v-card rounded="lg">
            <v-toolbar density="compact" color="#6984ff" hide-details>
                <v-toolbar-title>Patient Register Selection {{ selectedRowDetails.id }}</v-toolbar-title>
                <v-btn color="white" @click="closeDialog">
                    <v-icon>mdi-close</v-icon>
                </v-btn>
            </v-toolbar>
            <v-divider></v-divider>
            <v-card-text>
                <v-row>
                    <v-col cols="3">
                        <v-autocomplete
                            label="Registry Case Type"
                            v-model="payload.case_type"
                            variant="outlined"
                            density="compact"
                            hide-details
                            :items="['Inpatient', 'Outpatient', 'Emergency']"
                        ></v-autocomplete>
                    </v-col>
                    <v-col cols="9">
                        <v-text-field
                            label="Search here..."
                            density="compact"
                            variant="outlined"
                            prepend-inner-icon="mdi-magnify"
                            v-model="data.keyword"
                            @keyup.enter="search"
                        ></v-text-field> 
                    </v-col> 
                </v-row>
                <v-row class="form-col">
                    <v-col cols="3" class="form-col" v-if="payload.case_type === 'Outpatient' || payload.case_type === 'Emergency' || payload.case_type === 'Inpatient'">
                        <v-autocomplete
                            label="Case Status"
                            variant="outlined"
                            density="compact"
                            hide-details
                        ></v-autocomplete>
                    </v-col>
                    <v-col cols="3" class="form-col" v-if="payload.case_type === 'Outpatient' || payload.case_type === 'Emergency' || payload.case_type === 'Inpatient'">
                        <v-autocomplete
                            label="Nurse Station"
                            variant="outlined"
                            density="compact"
                            hide-details
                        ></v-autocomplete>
                    </v-col>
                    <v-col cols="3" class="form-col" v-if="payload.case_type === 'Inpatient'">
                        <v-text-field
                            label="Admission Date"
                            type="date"
                            variant="outlined"
                            density="compact"
                            hide-details
                        ></v-text-field>
                    </v-col>
                    <v-col cols="3" class="form-col" v-if="payload.case_type === 'Outpatient' || payload.case_type === 'Emergency'">
                        <v-text-field
                            label="Case Date"
                            type="date"
                            variant="outlined"
                            density="compact"
                            hide-details
                        ></v-text-field>
                    </v-col>
                    <v-col cols="3" class="form-col" v-if="payload.case_type === 'Inpatient'">
                        <v-text-field
                            label="Discharge Date"
                            type="date"
                            variant="outlined"
                            density="compact"
                            hide-details
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
            <v-divider></v-divider>
            <v-card-actions>
                <v-btn color="blue-darken-1 border border-info" @click="closeDialog"> Close </v-btn>
                <v-spacer></v-spacer>
                <v-btn class="bg-primary text-white" @click="openPostCharge">Select</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
    <PostChargesDialog :show="open_post_charge" @close-dialog="closePostCharge" />
</template>

<script setup>
import PostChargesDialog from '../post-charges/PostChargesDialog.vue';

const props = defineProps({
    show: {
        type: Boolean,
        default: () => false,
    },
})

const { selectedRowDetails } = storeToRefs(useSubcomponentSelectedRowDetailsStore()); 

const payload = ref({});

const emits = defineEmits(['close-dialog'])

const headers = [
    { title: "Case No.",  align: "start", sortable: false, key: "case_no" },
    { title: "Reference Date",  align: "start", sortable: false, key: "reference_date" },
    { title: "Patient ID",  align: "start", sortable: false, key: "patient_id" },
    { title: "Full Name",  align: "start", sortable: false, key: "fullname" },
    { title: "Age",  align: "start", sortable: false, key: "age" },
    { title: "Room No.",  align: "start", sortable: false, key: "room_no" },
    { title: "Status",  align: "start", sortable: false, key: "isactive" },
];
const open_post_charge = ref(false);
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

const openPostCharge = () => {
    open_post_charge.value = true;
}
const closePostCharge = () => {
    open_post_charge.value = false;
}

const onSubmit = () => {
    alert('Finalized');
    emits('close-dialog');
}

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