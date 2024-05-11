<template>
    <v-dialog :model-value="open_medical_package_details" rounded="lg" @update:model-value="closeDialog"rollable max-width="750px">
        <v-card rounded="lg">
            <v-toolbar color="#6984ff" hide-details density="compact">
                <v-toolbar-title>Medical Package Details</v-toolbar-title>
                <v-btn color="white" @click="closeDialog">
                    <v-icon>mdi-close</v-icon>
                </v-btn>
            </v-toolbar>
            <v-card-text>
                <v-container>
                    <v-row>
                        <v-col cols="4" class="form-col">
                            <v-text-field
                                readonly
                                variant="outlined"
                                hide-details
                                label="Code"
                                density="compact"
                            ></v-text-field>
                        </v-col>
                        <v-col cols="8" class="form-col"> 
                            <v-autocomplete
                            v-model="branch"
                            :items="branch"
                            readonly
                            hide-details
                            clearable
                            density="compact"
                            variant="outlined"
                        ></v-autocomplete>
                        </v-col>
                        <v-col cols="8" class="form-col">
                            <v-text-field
                                variant="outlined"
                                hide-details
                                label="Description"
                                density="compact"
                            ></v-text-field>
                        </v-col>
                        <v-col cols="4" class="form-col">
                            <v-text-field
                                readonly
                                variant="outlined"
                                hide-details
                                label="Amount"
                                density="compact"
                            ></v-text-field>
                        </v-col>
                        <v-col cols="12" class="form-col">
                            <v-checkbox
                                variant="outlined"
                                hide-details
                                label="Status"
                                density="compact"
                            ></v-checkbox>
                        </v-col>
                    </v-row>
                    <v-card class="mt-6" elevation="4">
                        <v-toolbar>
                        <v-toolbar-title class="toolbar-title">Medical Package Details</v-toolbar-title>
                        </v-toolbar>
                        <v-card-text>
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
                        </v-card-text>
                        <v-card-actions>
                            <v-btn class="bg-info text-white" type="submit" @click="openMedicalItemSelection">Add</v-btn>
                        </v-card-actions>
                    </v-card>
                </v-container>
            </v-card-text>
            <v-divider></v-divider>
            <v-card-actions>
                <v-btn color="blue-darken-1 border border-info" @click="closeDialog"> Close </v-btn>
                <v-spacer></v-spacer>
                <v-btn class="bg-primary text-white" type="submit" @click="handleSubmit">Submit</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
    <dx-medical-item-selection :open_medical_item_selection="open_medical_item_selection" @close-dialog="closeMedicalItemSelection" @handle-submit="submitSelectedItem" />
</template>

<script setup>
import DxMedicalItemSelection from './DxMedicalItemSelection.vue';

const props = defineProps({
    open_medical_package_details: {
        type: Boolean,
        default: () => false,
        required: true,
    },
})

const open_medical_item_selection = ref(false);

const branch = ['Main Branch']

const headers = [
    { title: "Item ID",  align: "start", sortable: false, key: "id" },
    { title: "Description",  align: "start", sortable: false, key: "description" },
    { title: "Quantity",  align: "start", sortable: false, key: "quantity" },
    { title: "Price",  align: "start", sortable: false, key: "price" },
    { title: "",  align: "start", sortable: false, key: "actions" },
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

const openMedicalItemSelection = () => {
  open_medical_item_selection.value = true;
}

const closeMedicalItemSelection = () => {
  open_medical_item_selection.value = false;
}

const submitSelectedItem = () => {
  alert("Save the selected item")
}

const handleSubmit = () => {
  emits('handle-submit')
}

const closeDialog = () => {
  emits('close-dialog')
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