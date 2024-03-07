<template>
  <v-dialog :model-value="show" rounded="lg" persistent scrollable max-width="700px">
      <v-toolbar density="compact" color="#6984ff" hide-details>
          <v-toolbar-title>Departments. Warehouses</v-toolbar-title>
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
                        <td>
                          <v-btn
                            size="small"
                            density="compact"
                            color="primary"
                            icon="mdi-link-circle-outline"
                            @click="openSectionsDialog"
                          >
                          </v-btn>
                        </td>
                        <td>{{ item.code }}</td>
                        <td>{{ item.description }}</td>
                        <td>{{ item.code }}</td>
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
              <v-btn class="bg-primary text-white" type="submit" @click="openFormDialog">Add</v-btn>
          </v-card-actions>
      </v-card>
  </v-dialog>
  <department-warehouses-form :open_form_dialog="open_form_dialog" @close-dialog="closeFormDialog" @handle-submit="onSubmit" />
  <sections-dialog :open_sections_dialog="open_sections_dialog" @close-dialog="closeSectionsDialog" />
  <deleteConfirmation :show="confirmationDialog" @confirm="confirmDelete" @close="closeconfirmation" />
</template>

<script setup>
import DepartmentWarehousesForm from './sub-forms/DepartmentWarehousesForm.vue';
import SectionsDialog from './sub-forms/SectionsDialog.vue';

const props = defineProps({
  show: {
      type: Boolean,
      default: () => false,
      required: true,
  },
})

const emits = defineEmits(['close-dialog'])

const open_form_dialog = ref(false)
const open_sections_dialog = ref(false) 
const confirmationDialog  = ref(false)

const headers = [
    {
        title: "", 
        align: "start",
        sortable: true,
    },
    {
        title: "Internal SubAccount Code",
        align: "start",
        sortable: true,
    },
    {
        title: "Description",
        align: "start",
        sortable: false,
    },
    {
        title: "Warehouse Group",
        align: "start",
        sortable: false,
    },
    {
        title: "Code",
        align: "start",
        sortable: false,
    },
    {
        title: "Actions",
        align: "start",
        sortable: false,
        width: "14%",
    },
];

const data = [
    { systemDefault: true, code: 'Code1', description: 'Description1' },
    { systemDefault: false, code: 'Code2', description: 'Description2' },
    { systemDefault: true, code: 'Code3', description: 'Description3' },
];

const openFormDialog = () => {
  open_form_dialog.value = true;
}

const closeFormDialog = () => {
  open_form_dialog.value = false;
}

const openSectionsDialog = () => {
  open_sections_dialog.value = true;
}

const closeSectionsDialog = () => {
  open_sections_dialog.value = false;
}

const onEdit = () => {
  alert("Edit")
}

const onDelete = () => {
  confirmationDialog.value = true;
}

const confirmDelete = () => {
  confirmationDialog.value = false;
}

const closeconfirmation = () => {
  confirmationDialog.value = false;
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