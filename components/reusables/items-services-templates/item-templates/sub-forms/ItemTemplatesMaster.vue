<template>
  <v-dialog :model-value="open_item_templates_master" rounded="lg" persistent scrollable max-width="700px">
      <v-toolbar color="#6984ff" hide-details density="compact">
          <v-toolbar-title>Item Template Details</v-toolbar-title>
      </v-toolbar>
      <v-card>
          <v-card-text>
            <v-row>
                <v-col cols="12">
                  <v-card elevation="4">
                    <v-toolbar color="#FFF">
                      <v-toolbar-title style="font-size: medium;" class="text-center">Item Template Master</v-toolbar-title>
                    </v-toolbar>
                    <v-card-text>
                      <v-col cols="12">
                          <v-text-field
                              variant="outlined"
                              hide-details
                              label="Description"
                              density="compact"
                          ></v-text-field>
                      </v-col>
                    </v-card-text>
                  </v-card>
                </v-col>
            </v-row>
            <v-row>
                <v-col cols="12">
                  <v-card elevation="4">
                    <v-toolbar color="#FFF">
                      <v-toolbar-title style="font-size: medium;" class="text-center">Template Line Items</v-toolbar-title>
                    </v-toolbar>
                    <v-card-text>
                      <v-data-table density="compact" :headers="headers" :items="data" hide-details>
                        <template v-slot:item="{ item }">
                            <tr>
                                <td><v-checkbox density="compact" hide-details/></td>
                                <td>{{ item.item_name }}</td>
                                <td>{{ item.unit }}</td>
                                <td>{{ item.quantity }}</td>
                            </tr>
                        </template>
                        <template #bottom></template>
                      </v-data-table>
                    </v-card-text>
                  </v-card>
                </v-col>
                <v-divider class="mb-1"></v-divider>
                <v-btn class="ml-2 bg-info text-white mb-4 mt-3" type="submit" @click="openMedicalItemSelection">Add from Item Selection</v-btn>
                <v-btn class="ml-2 bg-error text-white mb-4 mt-3" type="submit">Delete Selection</v-btn>
            </v-row>
          </v-card-text>
          <v-divider></v-divider>
          <v-card-actions>
              <v-btn color="blue-darken-1" @click="closeDialog"> Close </v-btn>
              <v-spacer></v-spacer>
              <v-btn class="bg-primary text-white" type="submit" @click="handleSubmit">Submit</v-btn>
          </v-card-actions>
      </v-card>
  </v-dialog>
  <item-template-selection :open_item_template_selection_form="open_item_template_selection_form" @close-dialog="closeMedicalItemSelection" @handle-submit="onSubmit" />
</template>

<script setup>
import ItemTemplateSelection from './ItemTemplateSelection.vue';

const props = defineProps({
  open_item_templates_master: {
      type: Boolean,
      default: () => false,
      required: true,
  },
})

const open_item_template_selection_form = ref(false)

const emits = defineEmits(['close-dialog', 'handle-submit'])

const headers = [
{
        title: "", 
        align: "start",
        sortable: true,
        width: "5%",
    },
    {
        title: "Iten Name", 
        align: "start",
        sortable: true,
        width: "70%",
    },
    {
        title: "Unit",
        align: "start",
        sortable: false,
    },
    {
        title: "Quantity",
        align: "start",
        sortable: false,
    },
];

const data = [
    { item_name: "TEST NAME", unit: 'ml', quantity: 4 },
    { item_name: "LOREM IPSUM", unit: 'kilo', quantity: 7 },
];

const openMedicalItemSelection = () => {
  open_item_template_selection_form.value = true
}

const closeMedicalItemSelection = () => {
  open_item_template_selection_form.value = false
}

const onSubmit = () => {
  alert("Save Template")
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