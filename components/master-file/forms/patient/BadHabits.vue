<template>
  <v-row>
    <v-col lg="12">
      <v-card>
        <v-toolbar density="compact">
          <v-card-title class="d-flex align-center pe-2">
            <v-icon icon="mdi-form-select"></v-icon> &nbsp; Bad Habits Information
            <v-spacer></v-spacer>
          </v-card-title>
        </v-toolbar>
        <v-divider></v-divider>
        <v-card-text>
          <v-data-table density="compact" height="70vh" :headers="headers" :items="items">
            <template #bottom></template>
          </v-data-table>
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>
</template>

<script setup>
import BadHabitsTemplate from "./sub-forms/BadHabitsTemplate.vue";

const badHabitsHeader = ["Description", "Remarks"];

const template_dialog = ref(false);

const showDispensaryTextFields = ref(false);
const dispensaryFields = ref([]);
const items = ref([]);
const headers = [
  {
    title: "Description",
    align: "start",
    sortable: true,
    key: "doctor_code",
    width: "70%",
  },
  {
    title: "Remarks",
    key: "category",
    align: "start",
    width: "30%",
    sortable: false,
  },
];
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

const handleSelectingHabits = () => {
  alert("This habit is Selected");
};
</script>

<style scoped></style>
