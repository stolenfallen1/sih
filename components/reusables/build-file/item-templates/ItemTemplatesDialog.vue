<template>
  <v-dialog :model-value="show" rounded="lg" @update:model-value="closeDialog"  scrollable max-width="700px">
    <v-card rounded="lg">
        <v-toolbar density="compact" color="#6984ff" hide-details>
            <v-toolbar-title>Item Template - Master List</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-btn color="white" @click="closeDialog">
                <v-icon>mdi-close</v-icon>
            </v-btn>
        </v-toolbar>
          <v-card-title>
              <v-spacer></v-spacer>
              <v-row>
                <v-col cols="6">
                  <v-text-field
                    label="Search by Description"
                    rounded
                    hide-details
                    density="compact"
                    variant="outlined"
                    prepend-inner-icon="mdi-magnify"
                  ></v-text-field>
                </v-col>
                <v-col cols="6">
                  <v-autocomplete
                      label="Choose Station"
                      hide-details
                      density="compact"
                      :items="stations"
                      variant="outlined"
                  ></v-autocomplete>
                </v-col>
              </v-row>
          </v-card-title>
          <v-card-text>
              <v-card elevation="4" class="mb-5">
                <v-toolbar color="#FFF">
                  <v-toolbar-title style="font-size: medium;" class="text-center">Template Master List</v-toolbar-title>
                </v-toolbar>
                <v-card-text>
                  <v-data-table density="compact" :headers="template_master_list_header" :items="template_master_list_data" hide-details>
                    <template v-slot:item="{ item }">
                        <tr>
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
              </v-card>
              <v-card elevation="4">
                <v-toolbar color="#FFF">
                  <v-toolbar-title style="font-size: medium;" class="text-center">Template Details</v-toolbar-title>
                </v-toolbar>
                <v-card-text>
                  <v-data-table density="compact" :headers="template_details_header" :items="template_details_data" hide-details>
                    <template v-slot:item="{ item }">
                        <tr>
                            <td>{{ item.code }}</td>
                            <td>{{ item.item_name }}</td>
                            <td>{{ item.generic_name }}</td>
                            <td>{{ item.unit }}</td>
                            <td>{{ item.quantity }}</td>
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
          </v-card-text>
          <v-divider></v-divider>
          <v-card-actions>
              <v-btn color="blue-darken-1" @click="closeDialog"> Close </v-btn>
              <v-spacer></v-spacer>
              <v-btn class="bg-primary text-white" type="submit" @click="openItemTemplatesForm">Add</v-btn>
          </v-card-actions>
      </v-card>
  </v-dialog>
  <item-templates-master :open_item_templates_master="open_item_templates_master" @close-dialog="closeItemTemplatesForm" @handle-submit="onSubmit" />
</template>

<script setup>
import ItemTemplatesMaster from './sub-forms/ItemTemplatesMaster.vue';

const props = defineProps({
  show: {
      type: Boolean,
      default: () => false,
      required: true,
  },
})

const emits = defineEmits(['close-dialog'])

const open_item_templates_master = ref(false)

const stations = ['2A STATION' , '2B STATION' , '3A STATION' , '3B STATTION']

const template_master_list_header = [
    {
        title: "Code", 
        align: "start",
        sortable: true,
    },
    {
        title: "Description",
        align: "start",
        sortable: false,
        width: "70%",
    },
    {
        title: "Actions",
        align: "start",
        sortable: false,
    },
];

const template_master_list_data = [
    { code: 123, description: 'Description1' },
    { code: 456, description: 'Description2' },
];

const template_details_header = [
    {
        title: "Code", 
        align: "start",
        sortable: true,
    },
    {
        title: "Item Name",
        align: "start",
        sortable: false,
    },
    {
        title: "Generic Name",
        align: "start",
        sortable: false,
    },
    {
        title: "Unit", 
        align: "start",
        sortable: true,
    },
    {
        title: "Quantity", 
        align: "start",
        sortable: true,
    },
    {
        title: "Actions", 
        align: "start",
        sortable: true,
    },
];

const template_details_data = [
    { code: 123, item_name: 'Item Name 1', generic_name: "Generic Name 1", unit: "liters", quantity: 4 },
    { code: 456, item_name: 'Item Name 2', generic_name: "Generic Name 1", unit: "liters", quantity: 6 },
];

const openItemTemplatesForm = () => {
  open_item_templates_master.value = true;
}

const closeItemTemplatesForm = () => {
  open_item_templates_master.value = false;
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