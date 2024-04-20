<template>
  <v-row>
    <v-col lg="12">
      <v-card>
        <v-toolbar density="compact" color="#2a73c5">
          <v-card-title color="primary" class="d-flex align-center pe-2">
            <v-icon icon="mdi-form-select"></v-icon> &nbsp; List of Patient HMO Guarantors
            History
            <v-spacer></v-spacer>
          </v-card-title>
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
    title: "Guarantor Name",
    key: "category",
    align: "start",
    width: "70%",
    sortable: false,
  },
  {
    title: "Account No.",
    align: "start",
    sortable: true,
    key: "doctor_code",
    width: "30%",
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
