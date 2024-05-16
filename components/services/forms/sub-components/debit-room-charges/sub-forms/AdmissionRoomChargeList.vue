<template>
    <v-dialog :model-value="open_admission_charge_list" rounded="lg" scrollable @update:model-value="closeDialog" max-width="850px">
        <form @submit.prevent="onSubmit">
            <v-card rounded="lg">
                <v-toolbar density="compact" color="#6984ff" hide-details>
                    <v-toolbar-title>Admission Room Charge List {{ selectedRowDetails.id }}</v-toolbar-title> 
                    <v-btn color="white" @click="closeDialog">
                        <v-icon>mdi-close</v-icon>
                    </v-btn>
                </v-toolbar>
                <v-card-text>
                    <v-row>
                        <v-col cols="12">
                            <v-text-field
                                label="Patient ID"
                                v-model="payload.patient_id"
                                variant="outlined"
                                density="compact"
                                hide-details
                                readonly
                            ></v-text-field>
                        </v-col>
                        <v-col cols="12" class="form-col">
                            <v-text-field
                                label="Patient Name"
                                v-model="payload.patient_name"
                                variant="outlined"
                                density="compact"
                                hide-details
                                readonly
                            ></v-text-field>
                        </v-col>
                        <v-col cols="12" class="form-col">
                            <v-text-field
                                label="Admission Date"
                                v-model="payload.admission_date"
                                type="date"
                                variant="outlined"
                                density="compact"
                                hide-details
                                readonly
                            ></v-text-field>
                        </v-col>
                        <v-col cols="12" class="form-col">
                            <v-text-field
                                label="Admission No."
                                v-model="payload.admission_no"
                                variant="outlined"
                                density="compact"
                                hide-details
                                readonly
                            ></v-text-field>
                        </v-col>
                    </v-row>
                    <v-card elevation="4" class="mt-4">
                        <v-card-text>
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
                                <template v-slot:item.no_of_days="{ item }">
                                    <v-autocomplete
                                        variant="outlined"
                                        density="compact"
                                        hide-details
                                    ></v-autocomplete>
                                </template>
                                <template v-slot:item.isoccupied="{ item }">
                                    <v-chip color="green" v-if="item.isoccupied == 1">Occupied</v-chip>
                                    <v-chip color="white" v-else></v-chip>
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
                    <v-btn class="bg-primary text-white" type="submit">Save</v-btn>
                </v-card-actions>
            </v-card>
        </form>
    </v-dialog>
</template>

<script setup>
const props = defineProps({
    open_admission_charge_list: {
        type: Boolean,
        default: () => false,
        required: true,
    },
});

const emits = defineEmits(['close-dialog', 'handle-submit']);

const { selectedRowDetails } = storeToRefs(useSubcomponentSelectedRowDetailsStore()); 
const payload = ref({});

const headers = [
    { title: "Occupancy Type", key: "occupancy_type", align: "start", sortable: true },
    { title: "No. of Days", key: "no_of_days", align: "start", sortable: false },
    { title: "Bed No.", key: "bed_no", align: "start", sortable: false },
    { title: "Bulding Name", key: "building_name", align: "start", sortable: false, width: "40%" },
    { title: "Status", key: "isoccupied", align: "start", sortable: false },
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

const onSubmit = () => {
    emits('handle-submit');
    emits('close-dialog');
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