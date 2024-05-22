<template>
    <v-dialog :model-value="show" rounded="lg" scrollable @update:model-value="closeDialog" max-width="1120px">
        <v-card rounded="lg">
            <v-toolbar density="compact" color="#6984ff" hide-details>
                <v-toolbar-title>Dietary Transactions {{ selectedRowDetails.id }}</v-toolbar-title> 
                <v-btn color="white" @click="closeDialog">
                    <v-icon>mdi-close</v-icon>
                </v-btn>
            </v-toolbar>
            <v-divider></v-divider>
            <v-card-text>
                <v-row>
                    <v-col cols="3">
                        <v-text-field
                            label="Reference Date"
                            type="date"
                            variant="outlined"
                            density="compact"
                            hide-details
                        ></v-text-field>
                    </v-col>
                    <v-col cols="6">
                        <v-text-field
                            label="Search here... "
                            density="compact"
                            variant="outlined"
                            prepend-inner-icon="mdi-magnify"
                            v-model="data.keyword"
                            @keyup.enter="search"
                        ></v-text-field>
                    </v-col>
                    <v-col cols="3">
                        <v-autocomplete
                            label="Meal Type"
                            variant="outlined"
                            density="compact"
                            hide-details
                        ></v-autocomplete>
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
                    <template v-slot:item.change_diet="{ item }">
                        <v-icon @click="openDietLists" class="cursor-pointer">mdi-plus-box</v-icon>
                    </template>
                    <template #bottom></template>
                </v-data-table-server>
            </v-card-text>
            <v-divider></v-divider>
            <v-card-actions>
                <v-btn color="blue-darken-1 border border-info" @click="closeDialog"> Close </v-btn>
                <v-spacer></v-spacer>
                <v-btn class="bg-info text-white">Unpost Diet</v-btn>
                <v-btn class="bg-primary text-white">Post Diet</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
    <DietDescList :open_diet_desc="open_diet_desc" @close-dialog="closeDietLists" />
</template>

<script setup>
import DietDescList from '~/components/services/forms/registration-main-forms/sub-forms/DietDescList.vue';

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
    { title: "Registration Date",  align: "start", sortable: true, key: "registration_date" },
    { title: "Patient ID",  align: "start", sortable: false, key: "patient_id" },
    { title: "Patient Name",  align: "start", sortable: false, key: "patient_name" },
    { title: "Diet Description",  align: "start", sortable: false, key: "diet_description" },
    { title: "",  align: "start", sortable: false, key: "change_diet" },
    { title: "Allergy",  align: "start", sortable: false, key: "allergy" },
    { title: "Room No.",  align: "start", sortable: false, key: "room_no" },
    { title: "Registration No.",  align: "start", sortable: false, key: "registration_no" },
    { title: "Nationality",  align: "start", sortable: false, key: "nationality" },
    { title: "Citizenship",  align: "start", sortable: false, key: "citizenship" },
    { title: "Religion",  align: "start", sortable: false, key: "religion" },
    { title: "Attending doctor",  align: "start", sortable: false, key: "attending_doctor" },
    { title: "",  align: "start", sortable: false, key: "Post Status" },
    { title: "",  align: "start", sortable: false, key: "Acknowledgement Status" },
    { title: "",  align: "start", sortable: false, key: "Served Status" },
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
const open_diet_desc = ref(false);
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

const openDietLists = () => {
    open_diet_desc.value = true;
}
const closeDietLists = () => {
    open_diet_desc.value = false;
}

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