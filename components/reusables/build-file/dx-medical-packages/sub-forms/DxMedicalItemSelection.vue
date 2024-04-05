<template>
  <v-dialog :model-value="open_medical_item_selection" rounded="lg" @update:model-value="closeDialog" fullscreen>
    <v-card>
      <v-toolbar color="#6984ff" density="compact">
        <v-toolbar-title>Multi Department Item Selection</v-toolbar-title>
        <v-btn icon @click="closeDialog" small>
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-toolbar>
      <v-card-text>
          <v-row>
            <v-col cols="3">
              <v-card elevation="4">
                  <v-text-field
                    class="mb-2 pa-2"
                    label="Search by Department"
                    hide-details
                    density="compact"
                    variant="outlined"
                    prepend-inner-icon="mdi-magnify"
                  ></v-text-field>
                <v-data-table density="compact" height="40vh" :headers="department_header" :items="department_data" hide-details>
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
                  <v-col cols="7">
                    <v-text-field
                      class="mb-2 pa-2"
                      label="Search what your looking for..."
                      hide-details
                      density="compact"
                      variant="outlined"
                      prepend-inner-icon="mdi-magnify"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="5">
                    <v-autocomplete
                        v-model="dropdownOptions"
                        class="mb-2 pa-2"
                        label="Dropdown"
                        hide-details
                        clearable
                        :items="dropdownOptions"
                        density="compact"
                        variant="outlined"
                    ></v-autocomplete>
                  </v-col>
                </v-row>
                <v-card-text>
                  <v-data-table density="compact" height="35vh" :headers="items_headers" :items="items_data" hide-details>
                    <template v-slot:item="{ item }">
                        <tr>
                            <!-- <td><v-checkbox density="compact" hide-details/></td> -->
                            <td>{{ item.item_id }}</td>
                            <td>{{ item.description }}</td>
                            <td>{{ item.category }}</td>
                            <td>{{ item.generic_name }}</td>
                            <td>{{ item.cpt_code }}</td>
                            <td>{{ item.price }}</td>
                            <td>{{ item.inventory_balance }}</td>
                            <td>{{ item.section }}</td>
                        </tr>
                    </template>
                    <template #bottom></template>
                  </v-data-table>
                </v-card-text>
              </v-card>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12">
              <v-card elevation="4">
                <v-toolbar>
                  <v-toolbar-title style="font-size: medium; text-align: center;">Selected Items</v-toolbar-title>
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
                                <v-icon color="green mr-3" @click="onEdit">mdi-pencil</v-icon>
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

const dropdownOptions = [ 'Not Applicable' ]

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

const items_headers = [
  // {
  //   title: "", 
  //   align: "start",
  //   sortable: true,
  // },
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
      title: "Generic Name",
      align: "start",
      sortable: false,
  },
  {
      title: "CPT Code",
      align: "start",
      sortable: false,
      width: "35%",
  },
  {
      title: "Price",
      align: "start",
      sortable: false,
  },
  {
      title: "Special Price",
      align: "start",
      sortable: false,
  },
  {
      title: "Inventory Balance",
      align: "start",
      sortable: false,
  },
  {
      title: "Section",
      align: "start",
      sortable: false,
  },
]

const items_data = [
  { item_id: '123', category: 'Medical Supplies', description: "Lorem Lorem Test", generic_name: "", cpt_code: "", price: 12, special_price: 149.99, inventory_balance: 0.00, section: "" },
  { item_id: '456', category: 'Other Supplies', description: "Lorem Lorem Test", generic_name: "", cpt_code: "", price: 12, special_price: 149.99, inventory_balance: 0.00, section: "" },
  { item_id: '789', category: 'IT Supplies', description: "Lorem Lorem Test", generic_name: "", cpt_code: "", price: 12, special_price: 149.99, inventory_balance: 0.00, section: "" },
]

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

const onEdit = () => {
    alert("Edit")
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
</style>