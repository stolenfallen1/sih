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
        :serverItems="tableData"
        :totalItems="totalItems"
        :loading="isLoading"
        :tabs="tableTabs"
        :tableTitle="pageTitle"
        :current-tab="currentTab"
        @tab-change="handleTabChange"
        @action-search="handleSearch"
        @action-refresh="handleRefresh"
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
const tableData = ref([]);
const totalItems = ref(0);
const isLoading = ref(false);
// Dialog state
const searchDialog = ref(false);
const inputDialog = ref(false);
// Tabs
const currentTab = ref("one");
const tableTabs = ref([
    {
        label: "Tab One",
        title: "Tab One",
        value: "one",
        endpoint: "https://jsonplaceholder.typicode.com/posts",
        columns: [
            { title: "User ID", key: "userId", align: "start", sortable: true },
            { title: "ID", key: "id", align: "end" },
            { title: "Title", key: "title", align: "start" },
            { title: "Body", key: "body", align: "start" },
        ],
    },
    {
        label: "Tab Two",
        title: "Tab Two",
        value: "two",
        endpoint: "https://jsonplaceholder.typicode.com/comments",
        columns: [
            { title: "Post ID", key: "postId", align: "start", sortable: true },
            { title: "ID", key: "id", align: "end" },
            { title: "Name", key: "name", align: "start" },
            { title: "Email", key: "email", align: "start" },
            { title: "Body", key: "body", align: "start" },
        ],
    },
    {
        label: "Tab Three",
        title: "Tab Three",
        value: "Tab Three",
        endpoint: "https://jsonplaceholder.typicode.com/todos",
        columns: [
            { title: "User ID", key: "userId", align: "start", sortable: true },
            { title: "ID", key: "id", align: "end" },
            { title: "Title", key: "title", align: "start" },
            { title: "Completed", key: "completed", align: "center" },
        ],
    },
]);
const pageTitle = ref(""); // This should be dynamic base on the current tab
// States for opening and closing dialogs
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

// Fetch Data sample
const fetchData = async () => {
    try {
        isLoading.value = true;
        const currentTabInfo = tableTabs.value.find(
            (tab) => tab.value === currentTab.value
        );
        const response = await fetch(currentTabInfo?.endpoint || "");
        const data = await response.json();
        updateTotalItems(data.length);
        updateServerItems(data);

        tableColumns.value = currentTabInfo?.columns || [];
    } catch (error) {
        console.error("Error fetching data:", error);
    } finally {
        isLoading.value = false;
    }
};
const updateTotalItems = (newTotalItems) => {
    totalItems.value = newTotalItems;
};
const updateServerItems = (newServerItems) => {
    tableData.value = newServerItems;
};
const handleTabChange = (tabValue) => {
    currentTab.value = tabValue;
    const currentTabInfo = tableTabs.value.find(
        (tab) => tab.value === tabValue
    );
    fetchData();
    pageTitle.value = currentTabInfo?.title || "";
};
fetchData();
handleTabChange(currentTab.value);

const handleSearch = () => {
    // Handle search action
};

const handleRefresh = () => {
    fetchData();
};

// const handleDots = () => {};
</script>

<style scoped></style>
