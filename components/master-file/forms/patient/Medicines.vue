<!-- In bizbox it is just a empty table only the header was visible -->
<template>
  <v-row>
    <v-col lg="12">
      <v-card>
        <v-toolbar density="compact">
          <v-card-title class="d-flex align-center pe-2">
            <v-icon icon="mdi-form-select"></v-icon> &nbsp; List of Drugs and Medicine
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
</script>

<style scoped></style>
