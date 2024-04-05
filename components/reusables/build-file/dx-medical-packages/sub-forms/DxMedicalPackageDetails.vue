<template>
  <v-dialog :model-value="open_medical_package_details" rounded="lg" @update:model-value="closeDialog"rollable max-width="700px">
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
                      <v-col cols="4">
                          <v-text-field
                              readonly
                              variant="outlined"
                              hide-details
                              label="Code"
                              density="compact"
                          ></v-text-field>
                      </v-col>
                      <v-col cols="8">
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
                      <v-col cols="8">
                          <v-text-field
                              variant="outlined"
                              hide-details
                              label="Description"
                              density="compact"
                          ></v-text-field>
                      </v-col>
                      <v-col cols="4">
                          <v-text-field
                              readonly
                              variant="outlined"
                              hide-details
                              label="Amount"
                              density="compact"
                          ></v-text-field>
                      </v-col>
                      <v-col cols="12">
                          <v-checkbox
                              variant="outlined"
                              hide-details
                              label="Active?"
                              density="compact"
                          ></v-checkbox>
                      </v-col>
                  </v-row>
                  <v-card class="mt-6" elevation="4">
                    <v-toolbar>
                      <v-toolbar-title style="font-size: medium; text-align: center;">Medical Package Details</v-toolbar-title>
                    </v-toolbar>
                    <v-card-text>
                        <v-row>
                          <v-col cols="12">
                            <v-data-table density="compact" :headers="headers" :items="data" hide-details>
                                <template v-slot:item="{ item }">
                                    <tr>
                                        <td>{{ item.item_id }}</td>
                                        <td>{{ item.description }}</td>
                                        <td>{{ item.qty }}</td>
                                        <td>{{ item.price }}</td>
                                    </tr>
                                </template>
                                <template #bottom></template>
                            </v-data-table>
                          </v-col>
                          <v-divider class="mb-1"></v-divider>
                          <v-btn class="ml-2 bg-info text-white" type="submit" @click="openMedicalItemSelection">Add</v-btn>
                          <v-btn class="ml-2 bg-error text-white" type="submit">Delete</v-btn>
                        </v-row>
                    </v-card-text>
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

const open_medical_item_selection = ref(false)

const branch = ['Main Branch']

const headers = [
  {
      title: "Item ID", 
      align: "start",
      sortable: true,
      width: "20%",
  },
  {
      title: "Description",
      align: "start",
      sortable: false,
      width: "40%",
  },
  {
      title: "Quantity",
      align: "start",
      sortable: false,
      width: "20%",
  },
  {
      title: "Price",
      align: "start",
      sortable: false,
      width: "20%",
  },
];

const data = [
  { item_id: 'Item1', description: 'Description1', qty: '2', price: '123.123' },
  { item_id: 'Item2', description: 'Description2', qty: '4', price: '456.123' },
  { item_id: 'Item3', description: 'Description3', qty: '7', price: '765.433' },
];

const emits = defineEmits(['close-dialog', 'handle-submit'])

const openMedicalItemSelection = () => {
  open_medical_item_selection.value = true
}

const closeMedicalItemSelection = () => {
  open_medical_item_selection.value = false
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
</style>