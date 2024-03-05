<template>
  <v-dialog :model-value="show" rounded="lg" persistent scrollable max-width="700px">
      <v-toolbar density="compact" color="#6984ff" hide-details>
          <v-toolbar-title>Units of Measures</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-btn color="white" @click="closeDialog">
              <v-icon>mdi-close</v-icon>
          </v-btn>
      </v-toolbar>
      <v-card>
          <v-card-title>
              <v-spacer></v-spacer>
              <v-text-field
                  label="Search by Description"
                  rounded
                  hide-details
                  density="compact"
                  variant="outlined"
                  prepend-inner-icon="mdi-magnify"
              >
              </v-text-field>
          </v-card-title>
          <v-card-text>
              <v-data-table density="compact" height="60vh" :headers="headers" :items="data" hide-details>
                  <template v-slot:item="{ item }">
                      <tr>
                          <td><v-checkbox v-model="item.systemDefault" density="compact" hide-details/></td>
                          <td>{{ item.description }}</td>
                          <td>
                              <v-icon color="green mr-3" @click="onEdit">mdi-pencil</v-icon>
                              <v-icon color="red" @click="onDelete">mdi-trash-can</v-icon>
                          </td>
                      </tr>
                  </template>
                  <template #bottom></template>
              </v-data-table>
          </v-card-text>
          <v-divider></v-divider>
          <v-card-actions>
              <v-btn color="blue-darken-1" @click="closeDialog"> Close </v-btn>
              <v-spacer></v-spacer>
              <v-btn class="bg-primary text-white" type="submit" @click="openUnitsOfMeasureForm">Add</v-btn>
          </v-card-actions>
      </v-card>
  </v-dialog>
  <unit-of-measures-form :open_units_of_measures_form="open_units_of_measures_form" @close-dialog="closeUnitsOfMeasureForm" @handle-submit="onSubmit" />
</template>

<script setup>
import UnitOfMeasuresForm from "./sub-forms/UnitOfMeasuresForm.vue";

const props = defineProps({
  show: {
      type: Boolean,
      default: () => false,
      required: true,
  },
})

const emits = defineEmits()

const open_units_of_measures_form = ref(false)

const headers = [
  {
      title: "System Default", 
      align: "start",
      sortable: true,
      width: "25%",
  },
  {
      title: "Description",
      align: "start",
      sortable: false,
      width: "60%",
  },
];

const data = [
    { systemDefault: true, description: 'Description1' },
    { systemDefault: false, description: 'Description2' },
    { systemDefault: true, description: 'Description3' },
];

const openUnitsOfMeasureForm = () => {
  open_units_of_measures_form.value = true;
}

const closeUnitsOfMeasureForm = () => {
  open_units_of_measures_form.value = false;
}

const onEdit = () => {
    alert("Edit")
}

const onDelete = () => {
    alert("Delete")
}

const onSubmit = () => {
  alert('Submitted')
}

const closeDialog = () => {
  emits('close-dialog')
}
</script>

<style scoped>
</style>