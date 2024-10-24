<template>
    <v-dialog :model-value="open_frequency_list" rounded="lg" @update:model-value="closeDialog" scrollable max-width="540px">
        <v-card rounded="lg">
            <v-toolbar density="compact" color="#107bac" hide-details>
                <v-toolbar-title>Medicine Dosage</v-toolbar-title>
                <v-spacer></v-spacer>
                <v-btn color="white" @click="closeDialog">
                <v-icon>mdi-close</v-icon>
                </v-btn>
            </v-toolbar>
            <v-divider></v-divider>
            <v-card-text>
                <v-divider></v-divider>
                <v-data-table-server
                    class="animated animatedFadeInUp fadeInUp"
                    v-model:items-per-page="itemsPerPage"
                    :headers="headers"
                    :items="serverItems"
                    :items-length="totalItems"
                    :loading="data.loading"
                    :hover="true"
                    @update:options="initialize"
                    @update:modelValue="handleSelectedRow"
                    show-select
                    select-strategy="single"
                    fixed-header
                    density="compact" 
                    height="50vh"
                >
                    <template
                        v-for="(head, index) of headers"  v-slot:[`item.${head.value}`]="props">
                        <td class="test" :props="props" :key="index">
                            <slot :name="head.value" :item="props.item">
                                {{ props.item[head.value] || "..." }}
                            </slot>
                        </td>
                    </template>
                    <template #bottom/>
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
    open_frequency_list: {
        type: Boolean,
        default: () => false,
        required: true,
    },
});
const emits = defineEmits(["close-dialog", "handle-select"]);
const headers = [
    { title: "Description", key: "description", sortable: false, align: "start" },
];
const data = ref({
    title: "List of Medicine Frequency / Dosage",
    keyword: "",
    loading: false,
});

const serverItems = ref([]);
const selected_item = ref({});
const initialize = () => {
    loadItems();
};
const loadItems = async () => {
    data.value.loading = true;
    const dosage_res = await useMethod("get", "get-dosages", "", "");
    if (dosage_res) {
        serverItems.value = dosage_res;
        data.value.loading = false;
    } else {
        useSnackbar(true, "error", "No data found.");
    }
};
const handleSelectedRow = (selectedRows) => {
    const selectedItems = selectedRows.map(rowId => serverItems.value.find(item => item.id === rowId));  
    const validSelectedItems = selectedItems.filter(item => item !== undefined);
    selected_item.value = validSelectedItems[0];
};
const onSelect = () => {
    emits('handle-select', selected_item.value);
    closeDialog();
}
const closeDialog = () => {
    emits("close-dialog");
    selected_item.value = {};
    data.value.keyword = "";
};
</script>

<style scoped></style>
