<template>
  <v-dialog :model-value="open_medical_item_selection" rounded="lg" persistent fullscreen>
    <v-card>
      <v-toolbar color="#6984ff" hide-details density="compact">
          <v-toolbar-title>Medical Package Details</v-toolbar-title>
      </v-toolbar>
      <v-card-text>
          <h1>Multi Item Selection</h1>
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

const branch = ['Main Branch']

const headers = [
  {
      title: "Item ID", 
      align: "start",
      sortable: true,
      width: "15%",
  },
  {
      title: "Description",
      align: "start",
      sortable: false,
      width: "45%",
  },
  {
      title: "Quantity",
      align: "start",
      sortable: false,
      width: "25%",
  },
  {
      title: "Price",
      align: "start",
      sortable: false,
      width: "15%",
  },
];

const data = [
  { item_id: 'Item1', description: 'Description1', qty: '2', price: '123.123' },
  { item_id: 'Item2', description: 'Description2', qty: '4', price: '456.123' },
  { item_id: 'Item3', description: 'Description3', qty: '7', price: '765.433' },
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