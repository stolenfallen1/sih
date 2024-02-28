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
                prepend-icon="mdi-plus-outline"
                width="100"
                color="primary"
                class="bg-primary text-white"
            >
                New
            </v-btn>
            <!-- Central Lookup Search Form -->
            <CentralSupplyLookUp 
                :central_form_dialog="central_form_dialog"
                @close-dialog="closeCentralFormDialog"
                @open-form="openAddFormDialog"
            />
            <!-- Form here -->
            <ItemSuppliesForm :item_supplies_form="item_supplies_form" :currentTabValue="currentTabValue" @close-dialog="closeFormDialog" />
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
                        item.item_category ? item.item_category.name : ""
                    }}</span
                >
                <span v-if="column.key === 'unit'" :key="column.key">
                    {{ item.unit ? item.unit.name : "" }}</span
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
import CentralSupplyLookUp from "~/components/reusables/CentralSupplyLookUp.vue";
import ItemSuppliesForm from "~/components/master-file/forms/items-supplies/Form.vue";

definePageMeta({
    layout: "root-layout",
});

const { selectedRowDetails, isrefresh } = storeToRefs(
    useSubcomponentSelectedRowDetailsStore()
);
const { subcomponents } = storeToRefs(useNavigationMenuStore())
const isSelectedUser = ref(true);
const pageTitle = ref("Item and Supplies");
const currentTab = ref(false);
const showTabs = ref(true);
const currentTabValue = ref("2");
const tableTabs = ref([
    { label: "Drugs and Medicines", value: "2" },
    { label: "Supplies", value: "5" },
    { label: "Assets. Equipments", value: "6" },
    { label: "Others", value: "3" },
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
        title: "Item Category",
        key: "category_id",
        align: "start",
        width: "30%",
        sortable: false,
    },
    {
        title: "Item Description",
        key: "item_name",
        align: "start",
        width: "40%",
        sortable: false,
    },
    {
        title: "Unit",
        key: "unit",
        align: "start",
        width: "10%",
        sortable: false,
    },
    {
        title: "Barcode ID",
        key: "item_Barcode",
        align: "start",
        width: "25%",
        sortable: false,
    },
];
const serverItems = ref([]);
const central_form_dialog = ref(false);
const item_supplies_form = ref(false);

const handleTabChange = (tabValue) => {
    currentTabValue.value = tabValue;
    if (tabValue == "2") {
        drugsAndMedicines();
    } else if (tabValue == "5") {
        supplies();
    } else if (tabValue == "6") {
        assetsAndEquipments();
    } else if (tabValue == "3") {
        others();
    }
    loadItems(null, null, tabValue);
};

const drugsAndMedicines = () => {
    subcomponents.value = useItemsSuppliesTab('one');
}

const supplies = () => {
    subcomponents.value = useItemsSuppliesTab('two');
}

const assetsAndEquipments = () => {
    subcomponents.value = useItemsSuppliesTab('three');
}

const others = () => {
    subcomponents.value = useItemsSuppliesTab('four');
}

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
const handleNew = () => {
    central_form_dialog.value = true;
};
const closeCentralFormDialog = () => {
    central_form_dialog.value = false;
};
const openAddFormDialog = () => {
    item_supplies_form.value = true;
};
const closeFormDialog = () => {
    item_supplies_form.value = false;
};

const DeactiveUser = () => {};

const loadItems = async (
    options = null,
    searchkeyword = null,
    item_group_id = null
) => {
    try {
        loading.value = true;
        let itemgroup = item_group_id || 2;
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
            useApiUrl() + "/item-and-supplies" + "?" + params.value || "",
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
