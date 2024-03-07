<template>
  <v-dialog :model-value="show" rounded="lg" persistent scrollable max-width="700px">
    <v-toolbar density="compact" color="#6984ff" hide-details>
        <v-toolbar-title>Item Categories</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn color="white" @click="closeDialog">
            <v-icon>mdi-close</v-icon>
        </v-btn>
    </v-toolbar>
    <v-card>
        <v-card-title>
            <v-row>
                <v-col cols="6">
                    <v-text-field
                        label="Search by Description"
                        rounded
                        hide-details
                        density="compact"
                        variant="outlined"
                        prepend-inner-icon="mdi-magnify"
                    >
                    </v-text-field>
                </v-col>
                <v-col cols="6">
                    <v-autocomplete
                        item-title="section"
                        item-value="id"
                        label="Choose a Category"
                        :items="itemCategories" 
                        hide-details
                        density="compact"
                        variant="outlined"
                    ></v-autocomplete>
                </v-col>
            </v-row>
        </v-card-title>
        <v-card-text>
            <v-data-table density="compact" height="60vh" :headers="headers" :items="data">
                <template v-slot:item="{ item }">
                    <tr>
                        <td>{{ item.description }}</td>
                        <td>{{ item.inpatient_sales }}</td>
                        <td>{{ item.outpatient_sales }}</td>
                        <td>{{ item.emergency_sales }}</td>
                        <td>{{ item.inpatient_ocd }}</td>
                        <td>{{ item.outpatient_ocd }}</td>
                        <td>{{ item.emergency_ocd }}</td>
                        <td>{{ item.inventory }}</td>
                        <td>{{ item.reader_fees }}</td>
                        <td>{{ item.expenses }}</td>
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
<item-categories-form :open_form_dialog="open_form_dialog" @close-dialog="closeFormDialog" @handle-submit="onSubmit" /> 
</template>

<script setup>
import ItemCategoriesForm from './sub-form/ItemCategoriesForm.vue';

const props = defineProps({
  show: {
      type: Boolean,
      default: () => false,
      required: true,
  },
})

const emits = defineEmits(['close-dialog'])

const open_form_dialog = ref(false)

const headers = [
  {
      title: "Description",
      align: "start",
      sortable: true,
  },
  {
      title: "Inpatient Sales",
      align: "start",
      sortable: false,
  },
  {
      title: "Outpatient Sales",
      align: "start",
      sortable: false,
  },
  {
      title: "Emergency Sales",
      align: "start",
      sortable: true,
  },
  {
      title: "Inpatient Cost of Sales",
      align: "start",
      sortable: true,
  },
  {
      title: "Outpatient Cost of Sales",
      align: "start",
      sortable: true,
  },
  {
      title: "Emergency Cost of Sales",
      align: "start",
      sortable: true,
  },
  {
      title: "Inventory",
      align: "start",
      sortable: true,
  },
  {
      title: "Reader Fees",
      align: "start",
      sortable: true,
  },
  {
      title: "Expenses",
      align: "start",
      sortable: true,
  },
];

const data = [
  { 
    description: "TEST description", 
    inpatient_sales: "SALES IPD", 
    outpatient_sales: "SALES OPD", 
    emergency_sales: "SALES ERD",
    inpatient_ocd: "Cost of Sales IPD",
    outpatient_ocd: "Cost of Sales OPD",
    emergency_ocd: "Cost of Sales ERD",
    inventory: "INVENTORY",
    reader_fees: "",
    expenses: "",
  },
  { 
    description: "TEST description", 
    inpatient_sales: "SALES IPD", 
    outpatient_sales: "SALES OPD", 
    emergency_sales: "SALES ERD",
    inpatient_ocd: "Cost of Sales IPD",
    outpatient_ocd: "Cost of Sales OPD",
    emergency_ocd: "Cost of Sales ERD",
    inventory: "INVENTORY",
    reader_fees: "",
    expenses: "",
  }
];

const itemCategories = [
  { id: 1, section: "Drugs and Medicines" },
  { id: 2, section: "Services" },
  { id: 3, section: "Examinations" },
];

const openFormDialog = () => {
  open_form_dialog.value = true;
}

const closeFormDialog = () => {
  open_form_dialog.value = false;
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