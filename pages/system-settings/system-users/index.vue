<template>
    <v-container>
        <v-row justify="start">
            <v-dialog v-model="searchDialog" width="800">
                <template v-slot:activator="{ props }">
                    <v-btn color="#117dad" v-bind="props">+ Add User</v-btn>
                </template>
                <search-user
                    @close-search-dialog="closeSearchDialog"
                    @open-dialog="openAddRecordDialog"
                />
            </v-dialog>
        </v-row>
        <v-row>
            <v-dialog v-model="inputDialog" width="1024">
                <registration-form
                    @close-dialog="closeDialog"
                ></registration-form>
            </v-dialog>
        </v-row>
    </v-container>

    <ReusableTable
        :items-per-page="10"
        :columns="tableColumns"
        :serverItems="tableData"
        :totalItems="totalItems"
        :loading="isLoading"
        :tabs="tableTabs"
        :tableTitle="pageTitle"
        @action-search="handleSearch"
        @action-refresh="handleRefresh"
        @action-dots="handleDots"
    />
</template>

<script setup>
import RegistrationForm from "~/components/system-settings/forms/system-users/RegistrationForm.vue";
import SearchUser from "~/components/system-settings/forms/system-users/SearchUser.vue";
import ReusableTable from "~/components/system-settings/tables/ReusableTable.vue";
import { ref } from "vue";

definePageMeta({
    layout: "root-layout",
});

const tableColumns = ref([
    { title: "User Name", key: "name", align: "start", sortable: true },
    { title: "User Group", key: "calories", align: "end" },
    { title: "Position", key: "fat", align: "end" },
    { title: "Branch", key: "protein", align: "end" },
    { title: "Department", key: "iron", align: "end" },
    { title: "Section", key: "iron", align: "end" },
]);
const totalItems = ref(0);
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
]);
const isLoading = ref(false);
const searchDialog = ref(false);
const inputDialog = ref(false);
const tableTabs = ref([
    { label: "Tab One", value: "one" },
    { label: "Tab Two", value: "two" },
    { label: "Tab Three", value: "three" },
]);
const pageTitle = ref("Dynamic Table Title");

const closeSearchDialog = () => {
    searchDialog.value = false;
};

const closeDialog = () => {
    inputDialog.value = false;
};

const openAddRecordDialog = () => {
    searchDialog.value = false;
    inputDialog.value = true;
};

const handleSearch = () => {
    // Handle search action
};

const handleRefresh = () => {
    // Handle refresh action
};

const handleDots = () => {
    // Handle dots action
};
</script>

<style scoped></style>
