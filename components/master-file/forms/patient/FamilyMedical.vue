<template>
  <v-row>
    <v-col lg="12">
      <v-card>
        <v-toolbar density="compact" color="primary">
          <v-card-title class="d-flex align-center pe-2">
            <v-icon icon="mdi-form-select"></v-icon> &nbsp; List of Family Medical History
          </v-card-title>
          <v-spacer></v-spacer>
          <v-btn class="bg-primary text-white" type="submit" @click="openTemplateDialog">
            Add New Family Medical History
          </v-btn>
        </v-toolbar>
        <v-divider></v-divider>
        <v-card-text>
          <v-data-table density="compact" height="60vh" :headers="headers" :items="items">
            <template #bottom></template>
          </v-data-table>
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>
  <creation-template
    :template_dialog="template_dialog"
    @close-dialog="closeTemplateDialog"
  />
</template>

<script setup>
import CreationTemplate from "./sub-forms/CreationTemplate.vue";
const items = ref([]);
const headers = [
  {
    title: "Description",
    key: "category",
    align: "start",
    width: "10%",
    sortable: false,
  },
  {
    title: "Notes",
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
