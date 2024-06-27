<template>
    <v-dialog :model-value="show" rounded="lg" scrollable @update:model-value="closeDialog" max-width="1120px">    
        <v-card rounded="lg">
            <v-toolbar density="compact" color="#107bac" hide-details>
                <v-toolbar-title>Diet Card {{ selectedRowDetails.id }}</v-toolbar-title>
                <v-btn color="white" @click="closeDialog">
                    <v-icon>mdi-close</v-icon>
                </v-btn>
            </v-toolbar>
            <v-divider></v-divider>
            <v-card-text>
                <v-card elevation="4">
                    <v-card-text>
                        <v-row>
                            <v-col cols="3">
                                <v-text-field
                                    label="Reference Date From."
                                    variant="outlined"
                                    type="date"
                                    density="compact"
                                    hide-details
                                ></v-text-field>
                            </v-col>
                            <v-col cols="3">
                                <v-text-field
                                    label="Reference Date To."
                                    variant="outlined"
                                    type="date"
                                    density="compact"
                                    hide-details
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
                            <v-col cols="3">
                                <v-autocomplete
                                    label="Nursing Station"
                                    variant="outlined"
                                    density="compact"
                                    hide-details
                                ></v-autocomplete>
                            </v-col>
                            <v-col cols="3">
                                <v-btn color="border border-primary">Apply Filter</v-btn>
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
                            show-select
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
                            <template #bottom></template>
                        </v-data-table-server>
                    </v-card-text>
                </v-card>
            </v-card-text>
            <v-divider></v-divider>
            <v-card-actions>
                <v-btn color="blue-darken-1 border border-info" @click="closeDialog"> Close </v-btn>
                <v-spacer></v-spacer>
                <v-btn class="bg-info text-white" @click="onPreview">Preview</v-btn>
                <v-btn class="bg-primary text-white" @click="onPrint">Print</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script setup>
const props = defineProps({
    show: {
        type: Boolean,
        default: () => false,
    },
})

const { selectedRowDetails } = storeToRefs(useSubcomponentSelectedRowDetailsStore()); 

const onPrint = () => {
    alert('Print');
    emits('close-dialog');
}

const onPreview = () => {
    alert('Preview');
    emits('close-dialog');
}

const emits = defineEmits(['close-dialog'])

const closeDialog = () => {
    emits('close-dialog');
}

const headers = [
    { title: "Registry No.",  align: "start", sortable: false, key: "registry_no", },
    { title: "Registry DateTime",  align: "start", sortable: false, key: "registry_datetime", },
    { title: "Patient ID",  align: "start", sortable: false, key: "id", },
    { title: "Patient Name",  align: "start", sortable: false, key: "patient_name", },
    { title: "Age",  align: "start", sortable: false, key: "age", },
    { title: "Room No.",  align: "start", sortable: false, key: "room_no", },
    { title: "Nationality",  align: "start", sortable: false, key: "nationality", },
    { title: "Diagnosis",  align: "start", sortable: false, key: "diagnosis", },
    { title: "Citizenship",  align: "start", sortable: false, key: "citizenship", },
    { title: "Religion",  align: "start", sortable: false, key: "religion", },
    { title: "Diet Description",  align: "start", sortable: false, key: "diet_description", },
    { title: "Diet Remarks",  align: "start", sortable: false, key: "diet_remarks", },
    { title: "Date Posted",  align: "start", sortable: false, key: "date_posted", },
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
</script>

<style scoped>
</style>