<template>
    <v-card class="mb-2" elevation="2">
        <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
                @click="handleView"
                :disabled="isSelectedUser"
                prepend-icon="mdi-eye-outline"
                width="100"
                color="primary"
                class="bg-info text-white"
            >
                View
            </v-btn>
            <v-btn
                @click="handleNew"
                :disabled="serverItems.length > 0 ? true : false"
                prepend-icon="mdi-plus-outline"
                width="100"
                color="primary"
                class="bg-primary text-white"
            >
                New
            </v-btn>
            <v-btn
                @click="handleEdit"
                prepend-icon="mdi-pencil"
                :disabled="isSelectedUser"
                width="100"
                color="primary"
                class="bg-success text-white"
            >
                Edit
            </v-btn>
            <v-btn
                @click="DeactiveUser"
                prepend-icon="mdi-toggle-switch"
                :disabled="isSelectedUser"
                width="150"
                color="primary"
                class="bg-error text-white"
            >
                Deactive</v-btn
            >
        </v-card-actions>
    </v-card>
    <v-card class="mb-2" elevation="2">
        <ReusableTable
            :items-per-page="10"
            :serverItems="serverItems"
            :totalItems="totalItems"
            :loading="loading"
            :tabs="tableTabs"
            :columns="headers"
            :showTabs="showTabs"
            :itemsPerPage="itemsPerPage"
            :tableTitle="pageTitle"
            :current-tab="currentTab"
            @fetchPage="loadItems"
            @selected-row="selectedUser"
            @action-search="handleSearch"
            @action-refresh="handleRefresh"
            @tab-change="handleTabChange"
        >
            <!-- Custom templates for each column -->
            <template
                v-for="column in headers"
                v-slot:[`column-${column.key}`]="{ item }"
            >
                <!-- customize rendering for each column here -->
                <span v-if="column.key === 'category_id'" :key="column.key">
                    {{
                        item.category ? item.category.category_description : ""
                    }}</span
                >
                <span v-if="column.key === 'isactive'" :key="column.key">
                    {{ item.isactive == 1 ? "Active" : "In Active" }}</span
                >

                <!-- Add more custom logic for other columns -->
            </template>
        </ReusableTable>
    </v-card>
</template>

<script setup>
import { storeToRefs } from "pinia";
import ReusableTable from "~/components/reusables/ReusableTable.vue";

definePageMeta({
    layout: "root-layout",
});

const { selectedRowDetails, isrefresh } = storeToRefs(
    useSubcomponentSelectedRowDetailsStore()
);
const { subcomponents } = storeToRefs(useNavigationMenuStore())
const isSelectedUser = ref(true);
const pageTitle = ref("Services");
const currentTab = ref(false);
const showTabs = ref(true);
const currentTabValue = ref(1);
const tableTabs = ref([
    { label: "Examinations", value: "one" },
    { label: "Procedures", value: "two" }
]);
const totalItems = ref(0);
const itemsPerPage = ref(40);
const params = ref("");
const loading = ref(true);
const headers = [
    {
        title: "Code",
        align: "start",
        sortable: true,
        key: "map_item_id",
        width: "5%",
    },
    {
        title: "Revenue Code",
        key: "map_revenue_code",
        align: "start",
        width: "20%",
        sortable: false,
    },
    {
        title: "Item Category",
        key: "category_id",
        align: "start",
        width: "10%",
        sortable: false,
    },
    {
        title: "Item Description",
        key: "exam_description",
        align: "start",
        width: "50%",
        sortable: false,
    },
    {
        title: "Barcode ID",
        key: "barcodeid",
        align: "start",
        width: "20%",
        sortable: false,
    },
];
const serverItems = ref([]);

const handleTabChange = (tabValue) => {
    currentTabValue.value = tabValue;
    if (tabValue == "one") {
        examinations();
    } else if (tabValue == "two") {
        procedures();
    }
};

const examinations = () => {
    subcomponents.value = useServicesTab("one");
};

const procedures = () => {
    subcomponents.value = useServicesTab("two");
};

const handleRefresh = () => {
    loadItems();
};
const handleSearch = (keyword) => {
    // Handle search action
    loadItems(null, keyword, currentTabValue.value);
};
const selectedUser = (item) => {
    isSelectedUser.value = true;
    isrefresh.value = false;
    selectedRowDetails.value.id = ""; //clear state id for subcomponents ?id=''
    selectedRowDetails.value.role_id = ""; //clear state id for subcomponents ?id=''
    if (item) {
        selectedRowDetails.value = Object.assign({}, item); //set state id for subcomponents ?id=item.id value
        isrefresh.value = true;
        isSelectedUser.value = false;
    } else {
        isrefresh.value = false;
        isSelectedUser.value = true;
    }
};
const handleView = () => {};
const handleEdit = () => {};
const handleNew = () => {};
const DeactiveUser = () => {};

const loadItems = async (
    options = null,
    searchkeyword = null,
    item_group_id = null
) => {
    try {
        loading.value = true;
        let itemgroup = item_group_id || 1;
        let keyword = searchkeyword || "";
        params.value = options
            ? "page=" +
              options.page +
              "&per_page=" +
              options.itemsPerPage +
              "&item_group_id=" +
              itemgroup +
              "&keyword=" +
              options.keyword
            : "page=1&per_page=10&item_group_id=" +
              itemgroup +
              "&keyword=" +
              keyword;
        const response = await fetch(
            useApiUrl() + "/services" + "?" + params.value || "",
            {
                headers: {
                    Authorization: `Bearer ` + useToken(),
                },
            }
        );
        const data = await response.json();
        updateTotalItems(data.total);
        updateServerItems(data.data);
        loading.value = false;
        // tableColumns.value = currentTabInfo?.columns || [];
    } catch (error) {
        console.error("Error fetching data:", error);
        loading.value = false;
    } finally {
        loading.value = false;
    }
};
const updateTotalItems = (newTotalItems) => {
    totalItems.value = newTotalItems;
};

const updateServerItems = (newServerItems) => {
    serverItems.value = newServerItems;
};
</script>

<style>
.v-data-table {
    overflow-x: auto;
}
</style>
