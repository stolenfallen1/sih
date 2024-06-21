<template>
    <v-dialog :model-value="open_doctors_list" rounded="lg" @update:model-value="closeDialog" scrollable max-width="725px">
        <v-card rounded="lg">
            <v-toolbar density="compact" color="#6984ff" hide-details>
                <v-toolbar-title>Doctors List</v-toolbar-title>
                <v-spacer></v-spacer>
                <v-btn color="white" @click="closeDialog">
                <v-icon>mdi-close</v-icon>
                </v-btn>
            </v-toolbar>
            <v-divider></v-divider>
            <v-card-text>
                <v-text-field
                label="Search by Description"
                density="compact"
                variant="outlined"
                prepend-inner-icon="mdi-magnify"
                v-model="data.keyword"
                @keyup.enter="search"
                >
                </v-text-field>
                <v-divider></v-divider>
                <v-data-table-server
                    class="animated animatedFadeInUp fadeInUp"
                    v-model:items-per-page="itemsPerPage"
                    v-model="selected_item"
                    :headers="headers"
                    :items="serverItems"
                    :items-length="totalItems"
                    :loading="data.loading"
                    :hover="true"
                    show-select
                    @update:options="initialize"
                    @update:modelValue="handleSelectedRow"
                    select-strategy="single"
                    fixed-header
                    density="compact"
                    height="50vh"
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
                </v-data-table-server>
            </v-card-text>
            <v-divider></v-divider>
            <v-card-actions>
                <v-btn color="blue-darken-1 border border-info" @click="closeDialog"> Close </v-btn>
                <v-spacer></v-spacer>
                <v-btn class="bg-primary text-white" @click="onSelect">Select</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script setup>
const props = defineProps({
    open_doctors_list: {
        type: Boolean,
        default: () => false,
        required: true,
    },
});
const emits = defineEmits(["close-dialog", "handle-select"]);
const headers = [
    {
        title: "Code",
        align: "start",
        sortable: false,
        key: "doctor_code",
    },
    { title: "Doctor Name", key: "doctor_name", align: "start", width: "60%", sortable: false },
];
const data = ref({
    title: "List of Doctors",
    keyword: "",
    loading: false,
});

const itemsPerPage = ref(15);
const totalItems = ref(0);
const serverItems = ref([]);
const selected_item = ref({});
const initialize = ({ page, itemsPerPage }) => {
    loadItems(page, itemsPerPage);
};
const loadItems = async (page = null, itemsPerPage = null) => {
    data.value.loading = true;
    let pageno = page || 1;
    let itemPerpageno = itemsPerPage || 15;
    const response = await $fetch( useApiUrl() + `/his/doctors-list?page=${pageno}&per_page=${itemPerpageno}&keyword=${data.value.keyword}`, { 
        method: 'get',
        headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + useToken()},
    });
    if (response) {
        serverItems.value = response.data;
        totalItems.value = response.total; 
        data.value.loading = false;
    } else {
        useSnackbar(true, "error", "No data found.");
    }
};
const search = () => {
    loadItems();
};
const handleSelectedRow = (selectedRows) => {
    const selectedItems = selectedRows.map(rowId => serverItems.value.find(item => item.id === rowId));
    const validSelectedItems = selectedItems.filter(item => item !== undefined);
    emits('handle-select', validSelectedItems);
};
const onSelect = () => {
    handleSelectedRow(selected_item.value);
    closeDialog();
}
const closeDialog = () => {
    emits("close-dialog");
    selected_item.value = [];
};
</script>

<style scoped></style>
