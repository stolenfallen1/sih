<template>
    <v-card class="mb-2" elevation="2">
        <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
                @click="handleView"
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
            <CentralLookUpForm
                :central_form_dialog="central_form_dialog"
                @close-dialog="closeCentralFormDialog"
                :search_results="search_results"
                :search_payload="search_payload"
                @open-form="openAddFormDialog"
            />
            <FormContainer
                :form_container="form_dialog"
                @close-dialog="closeFormContainer"
            />
            <v-btn
                @click="handleEdit"
                prepend-icon="mdi-pencil"
                width="100"
                color="primary"
                class="bg-success text-white"
            >
                Edit
            </v-btn>
            <v-btn
                @click="DeactiveUser"
                prepend-icon="mdi-toggle-switch"
                width="150"
                color="primary"
                class="bg-error text-white"
            >
                Deactive</v-btn
            >
        </v-card-actions>
    </v-card>
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
    >
        <!-- Custom templates for each column -->
        <template
            v-for="column in headers"
            v-slot:[`column-${column.key}`]="{ item }"
        >
            <span v-if="column.key === 'birthdate'" :key="column.key">
                {{ useDateMMDDYYY(item.birthdate)}}
            </span>
            <span v-if="column.key === 'isactive'" :key="column.key">
                {{ item.isactive == 1 ? "Active" : "In Active" }}
            </span>

            <!-- Add more custom logic for other columns -->
        </template>
    </ReusableTable>
</template>

<script setup>
import ReusableTable from "~/components/reusables/ReusableTable.vue";
import CentralLookUpForm from "~/components/reusables/CentralLookUpForm.vue";
import FormContainer from "~/components/master-file/forms/patient/FormContainer.vue";

definePageMeta({
    layout: "root-layout",
});

const central_form_dialog = ref(false);
const form_dialog = ref(false);
const search_payload = ref({});
const { selectedRowDetails, isrefresh } = storeToRefs(
    useSubcomponentSelectedRowDetailsStore()
);
const isSelectedUser = ref(true);
const pageTitle = ref("Patient Master");
const currentTab = ref(false);
const showTabs = ref(false);
const tableTabs = ref([]);

const totalItems = ref(0);
const itemsPerPage = ref(15);
const search = ref("");
const params = ref("");
const loading = ref(true);
const headers = [
    {
        title: "Patient ID",
        align: "start",
        sortable: true,
        key: "patient_id",
        width: "9%",
    },
    {
        title: "Patient Name",
        key: "patient_name",
        align: "start",
        width: "30%",
        sortable: false,
    },
    {
        title: "Birthdate",
        key: "birthdate",
        align: "start",
        width: "15%",
        sortable: false,
    },
    {
        title: "Address",
        key: "bldgstreet",
        align: "start",
        width: "25%",
        sortable: false,
    },
    {
        title: "Mobile No.",
        key: "mobile_number",
        align: "start",
        width: "15%",
        sortable: false,
    }
];
const serverItems = ref([]);
const handleRefresh = () => {
    loadItems();
};
const handleSearch = (keyword) => {
    // Handle search action
    loadItems(null, keyword);
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
const handleView = () => {
    // handle View action
};

const handleNew = () => {
    central_form_dialog.value = true;
};
const closeCentralFormDialog = () => {
    central_form_dialog.value = false;
};
const openAddFormDialog = () => {
    form_dialog.value = true;
};
const closeFormContainer = () => {
    form_dialog.value = false;
};

const handleEdit = () => {
    // handle Edit action
};

const DeactiveUser = () => {
    // handle Deactive action
};

const loadItems = async (options = null, searchkeyword = null) => {
    try {
        loading.value = true;

        let keyword = searchkeyword || "";
        params.value = options
            ? "page=" +
              options.page +
              "&per_page=" +
              options.itemsPerPage +
              "&keyword=" +
              options.keyword
            : "page=1&per_page=10&keyword=" + keyword;
        const response = await fetch(
            useApiUrl() + "/patient-master" + "?" + params.value || "",
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

<style scoped></style>
