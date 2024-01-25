<template>
    <v-card>
        <v-container>
            <v-title>Search User</v-title>
            <v-row>
                <v-col cols="12" sm="6" md="3">
                    <v-text-field
                        label="Employee Number*"
                        required
                        :rules="[(v) => !!v || 'Employee # is required']"
                        density="compact"
                        variant="outlined"
                    ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="3">
                    <v-text-field
                        label="Lastname*"
                        required
                        :rules="[(v) => !!v || 'Lastname is required']"
                        density="compact"
                        variant="outlined"
                    ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="3">
                    <v-text-field
                        label="Firstname*"
                        required
                        :rules="[(v) => !!v || 'Firstname is required']"
                        density="compact"
                        variant="outlined"
                    ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="3">
                    <v-text-field
                        label="Middlename"
                        density="compact"
                        variant="outlined"
                    ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6">
                    <v-btn class="mr-2" density="compact" color="success"
                        >Search</v-btn
                    >
                    <!-- THIS BUTTON SHOULD OPEN THE SECOND DIALOG MODAL WHICH IS THE FORM -->
                    <v-btn
                        @click="openAddRecordDialog"
                        color="#117dad"
                        density="compact"
                    >
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
                <v-divider></v-divider>
                <v-card-actions>
                    <v-btn color="blue-darken-1" @click="closeSearchDialog">
                        Close
                    </v-btn>
                </v-card-actions>
            </v-row>
        </v-container>
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
const tableData = ref([
    {
        name: "Frozen Yogurt",
        calories: 159,
        fat: 6.0,
        carbs: 24,
        protein: 4.0,
        iron: "1",
    },
    {
        name: "Jelly bean",
        calories: 375,
        fat: 0.0,
        carbs: 94,
        protein: 0.0,
        iron: "0",
    },
    {
        name: "KitKat",
        calories: 518,
        fat: 26.0,
        carbs: 65,
        protein: 7,
        iron: "6",
    },
    {
        name: "Eclair",
        calories: 262,
        fat: 16.0,
        carbs: 23,
        protein: 6.0,
        iron: "7",
    },
    {
        name: "Gingerbread",
        calories: 356,
        fat: 16.0,
        carbs: 49,
        protein: 3.9,
        iron: "16",
    },
    {
        name: "Gingerbread",
        calories: 356,
        fat: 16.0,
        carbs: 49,
        protein: 3.9,
        iron: "16",
    },
    {
        name: "Gingerbread",
        calories: 356,
        fat: 16.0,
        carbs: 49,
        protein: 3.9,
        iron: "16",
    },
]);
</script>

<style scoped></style>
