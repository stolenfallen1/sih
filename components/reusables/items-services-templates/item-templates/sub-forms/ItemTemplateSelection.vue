<template>
  <v-dialog :model-value="open_item_template_selection_form" rounded="lg" persistent scrollable max-width="700px">
      <v-toolbar color="#6984ff" hide-details density="compact">
          <v-toolbar-title>Item Selection</v-toolbar-title>
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
                      <v-row>
                        <v-col cols="12">
                          <v-autocomplete
                              label="Choose Category"
                              hide-details
                              :items="itemSelectionOptions"
                              clearable
                              density="compact"
                              variant="outlined"
                          ></v-autocomplete>
                        </v-col>
                      </v-row>
                      <v-row>
                        <v-col cols="6">
                          <v-text-field
                              label="Search by Description"
                              hide-details
                              density="compact"
                              variant="outlined"
                              prepend-inner-icon="mdi-magnify"
                          >
                          </v-text-field>
                        </v-col>
                        <v-col cols="6">
                          <v-text-field
                              label="Search by Generic Name"
                              hide-details
                              density="compact"
                              variant="outlined"
                              prepend-inner-icon="mdi-magnify"
                          >
                          </v-text-field>
                        </v-col>
                      </v-row>
                      <v-data-table class="mt-4" density="compact" :headers="headers" :items="data" hide-details>
                        <template v-slot:item="{ item }">
                            <tr>
                              <td></td>
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
                    <v-toolbar color="#FFF">
                      <v-toolbar-title style="font-size: medium;" class="text-center">Selected Items</v-toolbar-title>
                    </v-toolbar>
                    <v-card-text>
                      <v-row>
                        <v-col cols="12">
                          <v-text-field
                              label="Search by Description"
                              hide-details
                              density="compact"
                              variant="outlined"
                              prepend-inner-icon="mdi-magnify"
                          >
                          </v-text-field>
                        </v-col>
                      </v-row>
                      <v-data-table class="mt-4" density="compact" :headers="headers" :items="data" hide-details>
                        <template v-slot:item="{ item }">
                            <tr>
                              <td></td>
                            </tr>
                        </template>
                        <template #bottom></template>
                      </v-data-table>
                    </v-card-text>
                  </v-card>
                </v-col>
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
</template>

<script setup>

const props = defineProps({
  open_item_template_selection_form: {
      type: Boolean,
      default: () => false,
      required: true,
  },
})

const emits = defineEmits(['close-dialog', 'handle-submit'])

const itemSelectionOptions = ['Drugs and Medicines', 'Supplies', 'Assets and Equipments']

const headers = [
{
        title: "", 
        align: "start",
        sortable: true,
    },
    {
        title: "Quantity", 
        align: "start",
        sortable: true,
    },
    {
        title: "Item ID",
        align: "start",
        sortable: false,
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
        sortable: true,
    },
    {
        title: "Unit", 
        align: "start",
        sortable: true,
    },
];

const data = [];

const handleSubmit = () => {
  emits('handle-submit')
}

const closeDialog = () => {
  emits('close-dialog')
}
</script>

<style scoped>
</style>