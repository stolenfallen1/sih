<template>
  <v-dialog :model-value="open_medical_item_selection" rounded="lg" @update:model-value="closeDialog" fullscreen>
    <v-card>
      <v-toolbar color="#107bac" density="compact">
        <v-toolbar-title>Multi Department Item Selection</v-toolbar-title>
        <v-btn icon @click="closeDialog" small>
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-toolbar>
      <v-card-text>
          <v-row>
            <v-col cols="3">
              <v-card elevation="4">
                <v-row>
                  <v-col cols="12">
                    <v-text-field
                      class="mb-2 pa-2"
                      label="Search by Department"
                      density="compact"
                      hide-details
                      variant="outlined"
                      prepend-inner-icon="mdi-magnify"
                    ></v-text-field>
                  </v-col>
                </v-row>
                <v-data-table density="compact" height="43.5vh" :headers="department_header" :items="department_data" hide-details>
                  <template v-slot:item="{ item }">
                      <tr>
                          <td>{{ item.department_name }}</td>
                      </tr>
                  </template>
                  <template #bottom></template>
                </v-data-table>
              </v-card>
            </v-col>
            <v-col cols="9">
              <v-card elevation="4">
                <v-row>
                  <v-col cols="12">
                    <v-text-field
                      class="mb-2 pa-2"
                      label="Search what your looking for..."
                      hide-details
                      density="compact"
                      variant="outlined"
                      prepend-inner-icon="mdi-magnify"
                    ></v-text-field>
                  </v-col>
                </v-row>
                <v-card-text>
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
                    <template #bottom></template>
                  </v-data-table-server>
                </v-card-text>
              </v-card>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12">
              <v-card elevation="4">
                <v-toolbar density="compact">
                  <v-toolbar-title class="toolbar-title">Selected Items</v-toolbar-title>
                </v-toolbar>
                <v-card-text>
                  <v-data-table density="compact" :headers="selected_item_headers" :items="selected_item_data" hide-details>
                    <template v-slot:item="{ item }">
                        <tr>
                            <td>{{ item.item_id }}</td>
                            <td>{{ item.category }}</td>
                            <td>{{ item.description }}</td>
                            <td>{{ item.requesting_physician }}</td>
                            <td>{{ item.section }}</td>
                            <td>{{ item.quantity }}</td>
                            <td>{{ item.price }}</td>
                            <td>{{ item.unit }}</td>
                            <td>
                                <v-icon color="red" @click="onDelete">mdi-trash-can</v-icon>
                            </td>
                        </tr>
                    </template>
                    <template #bottom></template>
                  </v-data-table>
                </v-card-text>
              </v-card>
              <v-divider class="mb-1"></v-divider>
              <v-btn class="ml-2 bg-info text-white" type="submit" @click="openMedicalTemplateSelection">Select from Item Template</v-btn>
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
  <dx-medical-template-selection :open_medical_template_selection="open_medical_template_selection" @close-dialog="closeMedicalTemplateSelection" @handle-submit="submitSelectedTemplate" />
</template>

<script setup>
import DxMedicalTemplateSelection from './DxMedicalTemplateSelection.vue';

const props = defineProps({
  open_medical_item_selection: {
      type: Boolean,
      default: () => false,
      required: true,
  },
})

const open_medical_template_selection = ref(false)

const department_header = [
  {
      title: "Department", 
      align: "start",
      sortable: true,
  },
];

const department_data = [
  { department_id: 1, department_name: 'Central Service' },
  { department_id: 2, department_name: 'Purchasing' },
  { department_id: 3, department_name: 'IT' },
  { department_id: 4, department_name: 'Engineering' },
  { department_id: 5, department_name: 'HR' },
  { department_id: 6, department_name: 'Marketing' },
  { department_id: 7, department_name: 'QA' },
]

const headers = [
    { title: "Item ID",  align: "start", sortable: false, key: "id" },
    { title: "Item Category",  align: "start", sortable: false, key: "item_category" },
    { title: "Item Description",  align: "start", sortable: false, key: "item_description" },
    { title: "Generic Name",  align: "start", sortable: false, key: "generic_name" },
    { title: "CPT Code",  align: "start", sortable: false, key: "cpt_code" },
    { title: "Price",  align: "start", sortable: false, key: "price" },
    { title: "Special Price",  align: "start", sortable: false, key: "special_price" },
    { title: "Inventory Balance",  align: "start", sortable: false, key: "inventory_balance" },
    { title: "Section",  align: "start", sortable: false, key: "section" },
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
// Sample 
const selected_item_headers = [
  {
      title: "Item ID", 
      align: "start",
      sortable: true,
  },
  {
      title: "Category", 
      align: "start",
      sortable: true,
  },
  {
      title: "Description",
      align: "start",
      sortable: false,
      width: "35%",
  },
  {
      title: "Requesting Physician",
      align: "start",
      sortable: false,
  },
  {
      title: "Section",
      align: "start",
      sortable: false,
  },
  {
      title: "Quantity",
      align: "start",
      sortable: false,
  },
  {
      title: "Price",
      align: "start",
      sortable: false,
  },
  {
      title: "Unit",
      align: "start",
      sortable: false,
  },
  {
      title: "Actions",
      align: "start",
      sortable: false,
      width: "7%",
  },
];
// Sample
const selected_item_data = [
  { item_id: '123', category: 'Medical Supplies', description: "Lorem Lorem Test", requesting_physician: "totoy brown", section: "section123", quantity: 12, price: 149.99, unit: "Liter" },
  { item_id: '456', category: 'I.T Supplies', description: "Lorem Lorem Test", requesting_physician: "black brown", section: "section456", quantity: 4, price: 5567.123, unit: "ML"  },
];

const emits = defineEmits(['close-dialog' , 'handle-submit'])

const openMedicalTemplateSelection = () => {
  open_medical_template_selection.value = true;
}

const closeMedicalTemplateSelection = () => {
  open_medical_template_selection.value = false;
}

const submitSelectedTemplate = () => {
  alert("Save selected template")
}

const onDelete = () => {
    alert("Delete")
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
</style>