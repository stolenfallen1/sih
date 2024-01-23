<template>
    <div></div>
    <ReusableTable
        :items-per-page="10"
        :columns="tableColumns"
        :serverItems="tableData"
        :totalItems="totalItems"
        :loading="isLoading"
        :tabs="tableTabs"
        :show-select="false"
        @action-search="handleSearch"
        @action-refresh="handleRefresh"
        @action-dots="handleDots"
    />
</template>

<script setup>
import ReusableTable from "~/components/system-settings/tables/ReusableTable.vue"; // This reusable table is from the system settings table component

definePageMeta({
    layout: "root-layout",
});

const tableColumns = ref([
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
]);
const isLoading = ref(false);
const tableTabs = ref([
    { label: "Drugs and Medicines", value: "one" },
    { label: "Supplies", value: "two" },
    { label: "Examinations", value: "three" },
    { label: "Procedures", value: "four" },
    { label: "Assets. Equipments", value: "five" },
    { label: "Others", value: "six" },
]);

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
