<template>
    <v-dialog :model-value="show" rounded="lg" scrollable @update:model-value="closeDialog" max-width="1120px">
        <v-card rounded="lg">
            <v-toolbar density="compact" color="#6984ff" hide-details>
                <v-toolbar-title>Room Inquiry {{ selectedRowDetails.id }}</v-toolbar-title> 
                <v-btn color="white" @click="closeDialog">
                    <v-icon>mdi-close</v-icon>
                </v-btn>
            </v-toolbar>
            <v-card-text>
                <v-row>
                    <v-col cols="6">
                        <v-text-field
                            label="Search by Room No."
                            density="compact"
                            variant="outlined"
                            prepend-inner-icon="mdi-magnify"
                            hide-details
                            v-model="data.keyword"
                            @keyup.enter="search"
                        ></v-text-field> 
                    </v-col>  
                    <v-col cols="3">
                        <v-autocomplete
                            label="Building"
                            placeholder="Select Building"
                            variant="outlined"
                            density="compact"
                            hide-details
                        ></v-autocomplete>
                    </v-col>
                    <v-col cols="3">
                        <v-autocomplete
                            label="Room Class"
                            placeholder="Select Room Class"
                            variant="outlined"
                            density="compact"
                            hide-details
                        ></v-autocomplete>
                    </v-col>
                    <v-col cols="12" class="form-col">
                        <v-tabs v-model="tab" color="#2a73c5">
                            <v-tab value="0"><v-icon start>mdi-form-select</v-icon>Available Rooms</v-tab>
                            <v-tab value="1"><v-icon start>mdi-form-select</v-icon>Occupied Rooms</v-tab>
                        </v-tabs>
                    </v-col>
                    <v-col cols="12">
                        <v-window v-model="tab">
                            <v-window-item class="pa-1">
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
                            </v-window-item>
                            <v-window-item class="pa-1">
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
                            </v-window-item>
                        </v-window>
                    </v-col>
                </v-row>
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

const emits = defineEmits(['close-dialog'])

let tab = ref("0");
const { selectedRowDetails } = storeToRefs(useSubcomponentSelectedRowDetailsStore()); 
const payload = ref({});

const headers = [
    { title: "Building", key: "building", align: "start", sortable: true },
    { title: "Room Class", key: "room_class", align: "start", sortable: true },
    { title: "Floor", key: "floor", align: "start", sortable: false },
    { title: "Nurse Station", key: "nurse_station", align: "start", sortable: false },
    { title: "Room No.", key: "room_no", align: "start", sortable: false },
    { title: "Total No. of Beds", key: "total_no_of_beds", align: "start", sortable: false },
    { title: "Occupied No. of Beds", key: "occupied_no_of_beds", align: "start", sortable: false },
    { title: "Available Beds", key: "available_beds", align: "start", sortable: false },
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
    // loadItems(page, itemsPerPage, sortBy);
    null
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


const closeDialog = () => {
    emits('close-dialog');
}

</script>

<style scoped>
.form-col {
    margin-top: -16px !important;
}
</style>