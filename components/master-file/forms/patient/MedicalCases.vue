<template>
  <v-row>
    <v-col lg="12">
      <v-card>
        <v-toolbar density="compact" color="primary">
          <v-card-title class="d-flex align-center pe-2">
            <v-icon icon="mdi-form-select"></v-icon> &nbsp; Dispensary Registration
            History
            <v-spacer></v-spacer>
          </v-card-title>
        </v-toolbar>
        <v-divider></v-divider>
        <v-card-text>
          <v-data-table density="compact" height="23vh" :headers="headers" :items="items">
            <template #bottom></template>
          </v-data-table>
        </v-card-text>
      </v-card>
    </v-col>
    <v-col lg="12">
      <v-card>
        <v-card-title class="d-flex align-center pe-2">
          <v-icon icon="mdi-form-select"></v-icon> &nbsp; Medical Cases
          <v-spacer></v-spacer>
        </v-card-title>
        <v-divider></v-divider>
        <v-card-text>
          <v-data-table density="compact" height="23vh" :headers="headers" :items="items">
            <template #bottom></template>
          </v-data-table>
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>
</template>

<script setup>
import CreationTemplate from "./sub-forms/CreationTemplate.vue";

const dispensaryHeader = [
  "ICD10 Description",
  "Hospital / Clinic Name",
  "Registration Date",
  "Discharge Date",
];
const items = ref([]);
const headers = [
  {
    title: "Code",
    align: "start",
    sortable: true,
    key: "doctor_code",
    width: "5%",
  },
  {
    title: "Category",
    key: "category",
    align: "start",
    width: "5%",
    sortable: false,
  },
  {
    title: "Specialization",
    key: "specialization_id",
    align: "start",
    width: "5%",
    sortable: false,
  },
  {
    title: "Consultant Name",
    key: "doctor_name",
    align: "start",
    width: "40%",
    sortable: false,
  },
  {
    title: "PHIC No.",
    key: "philhealth_accreditation_no",
    align: "start",
    width: "10%",
    sortable: false,
  },
  {
    title: "Email",
    key: "email",
    align: "start",
    width: "30%",
    sortable: false,
  },
  {
    title: "Status",
    key: "isactive",
    align: "start",
    width: "30%",
    sortable: false,
  },
];
const showDispensaryTextFields = ref(false);
const dispensaryFields = ref([]);

const template_dialog = ref(false);

const addDispensaryField = () => {
  if (!showDispensaryTextFields.value) {
    showDispensaryTextFields.value = true;
    dispensaryFields.value = Array(dispensaryHeader.length).fill("");
  } else {
    // Save the data or perform any other action needed
    console.log("Saving Patient Information:", dispensaryFields.value);
    showDispensaryTextFields.value = false;
  }
};
const deleteDispensaryField = () => {
  showDispensaryTextFields.value = false;
  dispensaryFields.value = [];
};

const openTemplateDialog = () => {
  template_dialog.value = true;
};

const closeTemplateDialog = () => {
  template_dialog.value = false;
};
</script>

<style scoped></style>
