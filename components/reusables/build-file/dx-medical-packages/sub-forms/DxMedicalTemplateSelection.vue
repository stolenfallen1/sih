<template>
    <v-dialog :model-value="open_medical_template_selection" rounded="lg" @update:model-value="closeDialog"scrollable max-width="1120px">
        <v-card rounded="lg">
            <v-toolbar color="#107bac" hide-details density="compact">
                <v-toolbar-title>Item Template Selection List</v-toolbar-title>
                <v-btn color="white" @click="closeDialog">
                    <v-icon>mdi-close</v-icon>
                </v-btn>
            </v-toolbar>
            <v-card-text>
                <v-row>
                    <v-col cols="4">
                        <v-card elevation="4">
                            <v-list-subheader inset class="text-black px-2">
                                Template List
                            </v-list-subheader>
                            <v-text-field
                                class="mb-2 px-2"
                                label="Search by Department"
                                hide-details
                                density="compact"
                                variant="outlined"
                                prepend-inner-icon="mdi-magnify"
                            ></v-text-field>
                            <v-data-table density="compact" height="35vh" :headers="template_list_header" :items="template_list_data" hide-details>
                                <template v-slot:item="{ item }">
                                    <tr>
                                        <td>{{ item.description }}</td>
                                    </tr>
                                </template>
                                <template #bottom></template>
                            </v-data-table>
                        </v-card>
                    </v-col>
                    <v-col cols="8">
                        <v-card elevation="4">
                            <v-list-subheader inset class="text-black px-2">
                                Template Line Item(s)
                            </v-list-subheader>
                            <v-data-table-server
                                class="animated animatedFadeInUp fadeInUp"
                                v-model:items-per-page="itemsPerPage"
                                :headers="headers"
                                :items="serverItems"
                                :items-length="totalItems"
                                :loading="data.loading"
                                item-value="id"
                                show-select
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
                                <template v-slot:item.actions="{ item }">
                                    <v-icon color="red" @click="onDelete(item)">mdi-trash-can</v-icon>
                                </template>
                                <template #bottom></template>
                            </v-data-table-server>
                        </v-card>
                    </v-col>
                </v-row>
            </v-card-text>
            <v-divider></v-divider>
            <v-card-actions>
                <v-btn color="blue-darken-1 border border-info" @click="closeDialog"> Close </v-btn>
                <v-spacer></v-spacer>
                <v-btn class="bg-primary text-white" type="submit" @click="handleSubmit">Submit</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script setup>

const props = defineProps({
    open_medical_template_selection: {
        type: Boolean,
        default: () => false,
        required: true,
    },
})

const template_list_header = [
    {
        title: "Department", 
        align: "start",
        sortable: true,
    },
];

const template_list_data = [
    { department_id: 1, description: 'Description1' },
    { department_id: 2, description: 'Description2' },
    { department_id: 3, description: 'Description3' },
    { department_id: 4, description: 'Description4' },
    { department_id: 5, description: 'Description5' },
    { department_id: 6, description: 'Description6' },
]

const headers = [
    { title: "Item ID",  align: "start", sortable: false, key: "id" },
    { title: "Description",  align: "start", sortable: false, key: "description" },
    { title: "Qty",  align: "start", sortable: false, key: "quantity" },
    { title: "Unit",  align: "start", sortable: false, key: "unit" },
    { title: "", align: "start", sortable: false, key: "actions" },
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


const emits = defineEmits(['close-dialog', 'handle-submit'])

const handleSubmit = () => {
    emits('handle-submit')
}

const closeDialog = () => {
    emits('close-dialog')
}
</script>

<style scoped>
</style>