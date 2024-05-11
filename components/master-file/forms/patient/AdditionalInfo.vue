<template>
  <v-row>
    <v-col lg="12">
      <v-card>
        <v-toolbar density="compact">
          <v-card-title class="d-flex align-center pe-2">
            <v-icon icon="mdi-form-select"></v-icon> &nbsp; Other ID Information
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
        <v-toolbar density="compact">
          <v-card-title class="d-flex align-center pe-2">
            <v-icon icon="mdi-form-select"></v-icon> &nbsp;Other Patient Information
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
  </v-row>
</template>

<script setup>

const idHeaders = [
  "ID Type",
  "ID Number",
  "Date Issue",
  "Date Expiry",
  "Serial Number",
  "Authority",
];
const patientHeaders = ["Description", "Value"];

const showIdTextFields = ref(false);
const idFields = ref([]);

const showPatientTextFields = ref(false);
const patientFields = ref([]);

const addIdField = () => {
  if (!showIdTextFields.value) {
    showIdTextFields.value = true;
    idFields.value = Array(idHeaders.length).fill("");
  } else {
    // Save the data or perform any other action needed
    console.log("Saving ID Information:", idFields.value);
    showIdTextFields.value = false;
  }
};

const deleteIdField = () => {
  showIdTextFields.value = false;
  idFields.value = [];
};

const addPatientField = () => {
  if (!showPatientTextFields.value) {
    showPatientTextFields.value = true;
    patientFields.value = Array(patientHeaders.length).fill("");
  } else {
    // Save the data or perform any other action needed
    console.log("Saving Patient Information:", patientFields.value);
    showPatientTextFields.value = false;
  }
};

const deletePatientField = () => {
  showPatientTextFields.value = false;
  patientFields.value = [];
};

const search = ref({});
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
</script>

<style scoped></style>
