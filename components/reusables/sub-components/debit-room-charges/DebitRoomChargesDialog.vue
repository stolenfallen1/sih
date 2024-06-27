<template>
    <v-dialog :model-value="show" rounded="lg" scrollable @update:model-value="closeDialog" max-width="950px">
        <v-card rounded="lg">
            <v-toolbar density="compact" color="#107bac" hide-details>
                <v-toolbar-title>Room Charges for Debit {{ selectedRowDetails.id }}</v-toolbar-title> 
                <v-btn color="white" @click="closeDialog">
                    <v-icon>mdi-close</v-icon>
                </v-btn>
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
                    show-select
                    item-value="id"
                    :hover="true"
                    @update:options="initialize"
                    select-strategy="single"
                    fixed-header
                    density="compact"
                    height="60vh"
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
                    <template v-slot:item.room_charge_option="{ item }">
                        <v-icon @click="openAdmissionChargeList">mdi-plus-box</v-icon>
                    </template>
                    <template v-slot:item.isactive="{ item }">
                        <v-chip color="green" v-if="item.isactive == 1">Active</v-chip>
                        <v-chip color="red" v-else>Inactive</v-chip>
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
    <AdmissionRoomChargeList :open_admission_charge_list="open_admission_charge_list" @close-dialog="closeAdmissionChargeList" @handle-submit="onSubmit" />
</template>

<script setup>
import AdmissionRoomChargeList from "./sub-forms/AdmissionRoomChargeList.vue";

const props = defineProps({
    show: {
        type: Boolean,
        default: () => false,
        required: true,
    },
});

const emits = defineEmits(['close-dialog']);
const open_admission_charge_list = ref(false);

const { selectedRowDetails } = storeToRefs(useSubcomponentSelectedRowDetailsStore()); 
const payload = ref({});

const headers = [
    { title: "", key: "room_charge_option", align: "start", sortable: true },
    { title: "Admission No.", key: "admission_no", align: "start", sortable: true },
    { title: "Admission Case Date", key: "admission_case_date", align: "start", sortable: true },
    { title: "Patient Name", key: "patient_name", align: "start", sortable: false },
    { title: "Room No", key: "room_no", align: "start", sortable: false },
    { title: "Bed No.", key: "bed_no", align: "start", sortable: false },
    { title: "Room Price", key: "total_no_of_beds", align: "start", sortable: false },
    { title: "Status", key: "isactive", align: "start", sortable: false },
];

const data = ref({
    title: "List of Rooms",
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
    // null
};

const loadItems = async (page = null, itemsPerPage = null, sortBy = null) => {
    data.value.loading = true;
    let pageno = page || 1;
    let itemPerpageno = itemsPerPage || 10;
    let params =
        "page=" + pageno + "&per_page=" + itemPerpageno + "&keyword=" + data.value.keyword;
    const response = await useMethod("get", "banks?", "", params);
    if (response) {
        serverItems.value = response.data;
        totalItems.value = response.total; 
        data.value.loading = false;
    }
};

const search = () => {
    loadItems();
}

const onSubmit = () => {
    alert('Saved!!!');
}

const openAdmissionChargeList = () => {
    open_admission_charge_list.value = true;
}
const closeAdmissionChargeList = () => {
    open_admission_charge_list.value = false;
}

const closeDialog = () => {
    emits('close-dialog');
}

</script>

<style scoped>
.form-col {
    margin-top: -16px !important;
}
</style>