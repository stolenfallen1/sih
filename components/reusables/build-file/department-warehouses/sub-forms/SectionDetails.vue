<template>
  <v-dialog :model-value="open_section_details_dialog" rounded="lg" @update:model-value="closeDialog" scrollable max-width="700px">
      <v-toolbar density="compact" color="#6984ff" hide-details>
          <v-toolbar-title>Section Details</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-btn color="white" @click="closeDialog">
              <v-icon>mdi-close</v-icon>
          </v-btn>
      </v-toolbar>
      <v-card>
          <v-card-text>
              <v-row>
                <v-col cols="6">
                  <v-text-field
                    label="Code"
                    hide-details
                    density="compact"
                    variant="outlined"
                  >
                  </v-text-field>
                </v-col>
                <v-col cols="12">
                  <v-autocomplete
                    :items="departments"
                    label="Department"
                    hide-details
                    clearable
                    density="compact"
                    variant="outlined"
                  ></v-autocomplete>
                </v-col>
                <v-col cols="12">
                  <v-text-field
                    label="Description"
                    hide-details
                    density="compact"
                    variant="outlined"
                  >
                  </v-text-field>
                </v-col>
              </v-row>
              <v-data-table class="mt-5" density="compact" :headers="headers" :items="data" hide-details>
                  <template v-slot:item="{ item }">
                      <tr>
                          <td>{{ item.code }}</td>
                          <td>{{ item.description }}</td>
                      </tr>
                  </template>
                  <template #bottom></template>
              </v-data-table>
              <v-divider class="mb-1"></v-divider>
              <v-btn class="ml-2 bg-info text-white" type="submit" @click="openItemSectionList">Add</v-btn>
              <v-btn class="ml-2 bg-error text-white" type="submit" @click="onDelete">Delete</v-btn>
          </v-card-text>
          <v-divider></v-divider>
          <v-card-actions>
              <v-btn color="blue-darken-1" @click="closeDialog"> Close </v-btn>
              <v-spacer></v-spacer>
              <v-btn class="bg-primary text-white" type="submit" @click="onSubmit">Save</v-btn>
          </v-card-actions>
      </v-card>
  </v-dialog>
  <item-selection-list :open_item_selection_list="open_item_selection_list" @close-dialog="closeItemSelectionList" />
  <deleteConfirmation :show="confirmationDialog" @confirm="confirmDelete" @close="closeconfirmation" />
</template>

<script setup>
import ItemSelectionList from "./ItemSelectionList.vue"; 

const props = defineProps({
  open_section_details_dialog: {
      type: Boolean,
      default: () => false,
      required: true,
  },
})

const emits = defineEmits(['close-dialog'])

const confirmationDialog = ref(false)

const open_item_selection_list = ref(false)

const departments = ['HR' , 'Marketing']

const headers = [
  {
      title: "Item Code", 
      align: "start",
      sortable: true,
  },
  {
      title: "Item Description",
      align: "start",
      sortable: true,
      width: "75%",
  },
];

const data = [
  { systemDefault: true, code: 'Code1', description: 'Description1' },
  { systemDefault: false, code: 'Code2', description: 'Description2' },
  { systemDefault: true, code: 'Code3', description: 'Description3' },
];

const onDelete = () => {
  confirmationDialog.value = true;
}

const confirmDelete = () => {
  confirmationDialog.value = false;
}

const closeconfirmation = () => {
  confirmationDialog.value = false;
}

const openItemSectionList = () => {
  open_item_selection_list.value = true;
}

const closeItemSelectionList = () => {
  open_item_selection_list.value = false;
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