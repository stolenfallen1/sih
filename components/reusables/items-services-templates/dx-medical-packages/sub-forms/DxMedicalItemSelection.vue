<template>
  <v-dialog :model-value="open_medical_item_selection" rounded="lg" persistent fullscreen>
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
              <v-card>TEST</v-card>
            </v-col>
            <v-col cols="9">
              <v-card>TEST</v-card>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12">
              <v-card>
                <v-toolbar>
                  <v-toolbar-title style="font-size: medium; text-align: center;">Selected Items</v-toolbar-title>
                </v-toolbar>
                <v-card-text>
                  <v-data-table density="compact" height="60vh" :headers="headers" :items="data" hide-details>
                    <template v-slot:item="{ item }">
                        <tr>
                            <td>{{ item.code }}</td>
                            <td>{{ item.description }}</td>
                            <td>{{ item.amount }}</td>
                            <td>{{ item.status === true ? "Acive" : "Inactive" }}</td>
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
  open_medical_item_selection: {
      type: Boolean,
      default: () => false,
      required: true,
  },
})

const headers = [
  {
      title: "Code", 
      align: "start",
      sortable: true,
      width: "15%",
  },
  {
      title: "Description",
      align: "start",
      sortable: false,
      width: "40%",
  },
  {
      title: "Amount",
      align: "start",
      sortable: false,
      width: "15%",
  },
  {
      title: "Status",
      align: "start",
      sortable: false,
  },
  {
      title: "Actions",
      align: "start",
      sortable: false,
  },
];

const data = [
  { code: 'Code1', description: 'Description1', amount: '1249.15', status: true },
  { code: 'Code2', description: 'Description2', amount: '1949.75', status: true },
  { code: 'Code3', description: 'Description3', amount: '2049.29', status: false },
];

const emits = defineEmits()

const handleSubmit = () => {
  emits('handle-submit')
}

const closeDialog = () => {
  emits('close-dialog')
}
</script>

<style scoped>
</style>