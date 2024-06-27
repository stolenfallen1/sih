<template>
    <v-dialog :model-value="show" rounded="lg" scrollable @update:model-value="closeDialog" max-width="900px">
        <v-card rounded="lg">
            <v-toolbar density="compact" color="#107bac" hide-details>
                <v-toolbar-title>PF Items / Services Per Service Type {{ selectedRowDetails.id }}</v-toolbar-title> 
                <v-btn color="white" @click="closeDialog">
                    <v-icon>mdi-close</v-icon>
                </v-btn>
            </v-toolbar>
            <v-divider></v-divider>
            <v-card-text>
                <v-card elevation="4">
                    <v-toolbar density="compact" hide-details>
                        <v-toolbar-title class="toolbar-title">List of Professional Fees Services</v-toolbar-title>
                    </v-toolbar>
                    <v-card-text>
                        <v-row>
                            <v-col cols="6">
                                <v-row>
                                    <v-col cols="12">
                                        <v-autocomplete
                                            label="Item Group"
                                            v-model="payload.itemGroup"
                                            variant="outlined"
                                            density="compact"
                                            hide-details
                                        ></v-autocomplete>
                                    </v-col>
                                    <v-col cols="12" class="form-col">
                                        <v-autocomplete
                                            label="Price Group"
                                            v-model="payload.priceGroup"
                                            variant="outlined"
                                            density="compact"
                                            hide-details
                                        ></v-autocomplete>
                                    </v-col>
                                    <v-col cols="12" class="form-col">
                                        <v-autocomplete
                                            label="Service Type"
                                            v-model="payload.serviceType"
                                            variant="outlined"
                                            density="compact"
                                            hide-details
                                        ></v-autocomplete>
                                    </v-col>
                                </v-row>
                            </v-col>
                            <v-col cols="6">
                                <v-row>
                                    <v-col cols="12">
                                        <v-autocomplete
                                            label="Item Category"
                                            v-model="payload.itemCategory"
                                            variant="outlined"
                                            density="compact"
                                            hide-details
                                        ></v-autocomplete>
                                    </v-col>
                                    <v-col cols="12" class="form-col">
                                        <v-autocomplete
                                            label="Pricing Scheme"
                                            v-model="payload.pricingScheme"
                                            variant="outlined"
                                            density="compact"
                                            hide-details
                                        ></v-autocomplete>
                                    </v-col>
                                </v-row>
                            </v-col>
                        </v-row>
                    </v-card-text>
                </v-card>
                <v-card elevation="4" class="mt-4">
                    <v-card-text>
                        <v-text-field
                            label="Search by description"
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
                </v-card>
            </v-card-text>
            <v-divider></v-divider>
            <v-card-actions>
                <v-btn color="blue-darken-1 border border-info" @click="closeDialog"> Close </v-btn>
                <v-spacer></v-spacer>
                <v-btn class="bg-primary text-white" @click.prevent="onSubmit">Select</v-btn>
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
    { title: "Department",  align: "start", sortable: false, key: "department" },
    { title: "Item Description",  align: "start", sortable: false, key: "item_description" },
    { title: "Original Price",  align: "start", sortable: false, key: "original_price" },
    { title: "Practitioner's Price",  align: "start", sortable: false, key: "practitioner_price" },
    { title: "Status",  align: "start", sortable: false, key: "isactive" },
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