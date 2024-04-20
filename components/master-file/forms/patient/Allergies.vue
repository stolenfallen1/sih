<template>
  <v-row>
    <v-col lg="12">
      <v-card>
        <v-toolbar density="compact" color="#2a73c5">
          <v-card-title class="d-flex align-center pe-2">
            <v-icon icon="mdi-form-select"></v-icon> &nbsp; List of Allergies
            <v-spacer></v-spacer>
          </v-card-title>
        </v-toolbar>
        <v-divider></v-divider>
        <v-card-text>
          <v-data-table density="compact" height="37vh" :headers="headers" :items="items">
            <template #bottom></template>
          </v-data-table>
        </v-card-text>
      </v-card>
    </v-col>
    <v-col lg="12">
      <v-textarea
        class="cursor-pointer"
        label="Enter Allergies"
        rows="3"
        variant="outlined"
      ></v-textarea>
    </v-col>
  </v-row>
</template>

<script setup>
import CreationTemplate from "./sub-forms/CreationTemplate.vue";
const items = ref([]);
const headers = [
  {
    title: "Quantity",
    key: "category",
    align: "start",
    width: "10%",
    sortable: false,
  },
  {
    title: "Description",
    align: "start",
    sortable: true,
    key: "doctor_code",
    width: "70%",
  },
];
const template_dialog = ref(false);

const openTemplateDialog = () => {
  template_dialog.value = true;
};

const closeTemplateDialog = () => {
  template_dialog.value = false;
};
</script>

<style scoped></style>
