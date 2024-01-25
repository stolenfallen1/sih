<template>
  <v-card>
    <v-card-title>Search User</v-card-title>
    <v-divider></v-divider>
    <v-card-text class="pa-4">
      <v-row>
        <v-col cols="12" sm="6" md="3">
          <v-text-field
            label="Employee Number*"
            density="compact"
            variant="outlined"
            hide-details
          ></v-text-field>
        </v-col>
        <v-col cols="12" sm="6" md="3">
          <v-text-field
            label="Lastname*"
            required
            :rules="[(v) => !!v || 'Lastname is required']"
            density="compact"
            variant="outlined"
            hide-details
          ></v-text-field>
        </v-col>
        <v-col cols="12" sm="6" md="3">
          <v-text-field
            label="Firstname*"
            required
            :rules="[(v) => !!v || 'Firstname is required']"
            density="compact"
            variant="outlined"
            hide-details
          ></v-text-field>
        </v-col>
        <v-col cols="12" sm="6" md="3">
          <v-text-field
            label="Middlename"
            density="compact"
            variant="outlined"
            hide-details
          ></v-text-field>
        </v-col>
        <v-col cols="12" sm="6">
          <v-btn class="mr-2" density="compact" color="success">Search</v-btn>
          <!-- THIS BUTTON SHOULD OPEN THE SECOND DIALOG MODAL WHICH IS THE FORM -->
          <v-btn @click="openAddRecordDialog" color="#117dad" density="compact">
            + Add Record</v-btn
          >
        </v-col>
        <v-divider></v-divider>
        <v-data-table-server
          :fixed-header="true"
          density="compact"
          height="40vh"
          class="animated animatedFadeInUp fadeInUp"
          v-model:items-per-page="itemsPerPage"
          :headers="columns"
          :items="tableData"
          :items-length="totalItems"
          item-value="name"
          @update:options="loadItems"
        />
      </v-row>
    </v-card-text>
     <v-divider></v-divider>
     <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="blue-darken-1" @click="closeSearchDialog"> Close </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script setup>
const emits = defineEmits();

const openAddRecordDialog = () => {
  emits("open-dialog");
};

const closeSearchDialog = () => {
  emits("close-search-dialog");
};

const itemsPerPage = ref(10);
const totalItems = ref(10);
const columns = ref([
  { title: "Name", key: "name", align: "start", sortable: true },
  { title: "Calories", key: "calories", align: "end" },
  { title: "Fat (g)", key: "fat", align: "end" },
  { title: "Protein (g)", key: "protein", align: "end" },
  { title: "Iron (%)", key: "iron", align: "end" },
]);
const tableData = ref([]);
</script>

<style scoped></style>
