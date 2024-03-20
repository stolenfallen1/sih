<template>
    <v-card class="mb-2" elevation="4">
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
          
            <!-- Form here -->
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
    <v-card class="mb-2" elevation="4">
        <ReusableTable
            :items-per-page="itemsPerPage"
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
        <ItemSuppliesForm :form_payload="form_payload" @submit-form="confirmation" :item_supplies_form="item_supplies_form" :currentTabValue="currentTabValue" @close-dialog="closeFormDialog" />
        <Confirmation
            :show="confirmationDialog"
            :payload="form_payload"
            :error_msg="error_msg"
            :loading="loading"
            @close="closeConfirmation"
            @submit="submitItemandSuppliesForm"
        />

          <!-- Central Lookup Search Form -->
            <CentralSupplyLookUp 
                :central_form_dialog="central_form_dialog"
                @close-dialog="closeCentralFormDialog"
                :headers="center_form_headers"
                @search="SearchItemandSupplies"
                @selected-row="selectedItemAndSupplies"
                :search_results="search_results"
                :search_payload="search_payload"
                @open-form="openAddFormDialog"
            />
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
const confirmationDialog = ref(false);
const error_msg = ref('');
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
    { label: "Supplies", value: "1" },
    { label: "Assets. Equipments", value: "3" },
    { label: "Others", value: "6" },
]);
const serverItems = ref([]);
const central_form_dialog = ref(false);
const item_supplies_form = ref(false);
const form_payload = ref({
    item_InventoryGroup_Id:parseInt(2)
});
const totalItems = ref(0);
const itemsPerPage = ref(40);
const params = ref("");
const loading = ref(true);
const search_results = ref([]);
const search_payload = ref({});

const center_form_headers = ref([
   {
        title: "Code",
        align: "start",
        sortable: true,
        key: "id",
        width: "5%",
    },
    {
        title: "Item Description",
        key: "item_name",
        align: "start",
        width: "80%",
        sortable: false,
    },
]);
const headers = [
    {
        title: "Code",
        align: "start",
        sortable: true,
        key: "id",
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


const closeConfirmation = ()=>{
  confirmationDialog.value = false;
}
const confirmation = ()=>{
  confirmationDialog.value = true;
}

const handleTabChange = (tabValue) => {
    currentTabValue.value = tabValue;
    form_payload.value.item_InventoryGroup_Id = parseInt(tabValue);
    subcomponents.value = useItemsSuppliesTab(tabValue);
    loadItems(null, null, tabValue);
};

const handleRefresh = () => {
    loadItems(null, null, currentTabValue.value);
};
const handleSearch = (keyword) => {
    // Handle search action
    loadItems(null, keyword, currentTabValue.value);
};


const selectedItemAndSupplies = (item) => {
  form_payload.value.id = ""; //clear state id for subcomponents ?id=''
  form_payload.value.role_id = ""; //clear state id for subcomponents ?id=''
  form_payload.value = Object.assign({});
  if (item) {
    form_payload.value = Object.assign({},item);
    form_payload.value.item_InventoryGroup_Id = parseInt(item.item_InventoryGroup_Id) ? parseInt(item.item_InventoryGroup_Id) : "";
    form_payload.value.item_Med_AntibioticClass_Id = parseInt(item.item_Med_AntibioticClass_Id) ? parseInt(item.item_Med_AntibioticClass_Id) : "";
    form_payload.value.item_Med_Classification_Id = parseInt(item.item_Med_Classification_Id) ? parseInt(item.item_Med_Classification_Id) : "";
    form_payload.value.item_Manufacturer_Id = parseInt(item.item_Manufacturer_Id) ? parseInt(item.item_Manufacturer_Id) : "";
    form_payload.value.item_Med_Drug_Administration_Route_Id = parseInt(item.item_Med_Drug_Administration_Route_Id) ? parseInt(item.item_Med_Drug_Administration_Route_Id) :"";
    form_payload.value.item_Med_GenericName_Id = parseInt(item.item_Med_GenericName_Id) ? parseInt(item.item_Med_GenericName_Id) : "";
    form_payload.value.item_Med_TherapeuticClass_Id = parseInt(item.item_Med_TherapeuticClass_Id) ? parseInt(item.item_Med_TherapeuticClass_Id) : "";
    form_payload.value.item_Category_Id = parseInt(item.item_Category_Id);
    form_payload.value.item_SubCategory_Id = parseInt(item.item_SubCategory_Id) ? parseInt(item.item_SubCategory_Id) : "";
    form_payload.value.item_UnitOfMeasure_Id = parseInt(item.item_UnitOfMeasure_Id) ? parseInt(item.item_UnitOfMeasure_Id) : "";
    form_payload.value.item_Med_Dosage_Form_id = parseInt(item.item_Med_Dosage_Form_id) ? parseInt(item.item_Med_Dosage_Form_id) : "";
    form_payload.value.item_Brand_Id = parseInt(item.item_Brand_Id) ? parseInt(item.item_Brand_Id) : "";


    form_payload.value.isSupplies = parseInt(item.isSupplies) ? true : false;
    form_payload.value.isMedicines = parseInt(item.isMedicines) ? true : false;
    form_payload.value.isFixedAsset = parseInt(item.isFixedAsset) ? true : false;
    form_payload.value.isReagents = parseInt(item.isReagents) ? true : false;
    form_payload.value.isMDRP = parseInt(item.isMDRP) ? true : false;
    form_payload.value.isConsignment = parseInt(item.isConsignment) ? true : false;
    form_payload.value.isSerialNo_Required = parseInt(item.isSerialNo_Required) ? true : false;
    form_payload.value.isLotNo_Required = parseInt(item.isLotNo_Required) ? true : false;
    form_payload.value.isExpiryDate_Required = parseInt(item.isExpiryDate_Required) ? true : false;
    form_payload.value.isForProduction = parseInt(item.isForProduction) ? true : false;
    form_payload.value.isPerishable = parseInt(item.isPerishable) ? true : false;
    form_payload.value.isVatable = parseInt(item.isVatable) ? true : false;
    form_payload.value.isVatExempt = parseInt(item.isVatExempt) ? true : false;
    form_payload.value.isAllowDiscount = parseInt(item.isAllowDiscount) ? true : false;
    form_payload.value.isZeroRated = parseInt(item.isZeroRated) ? true : false;
    form_payload.value.isOpenPrice = parseInt(item.isOpenPrice) ? true : false;
    form_payload.value.isAllowStatOrder = parseInt(item.isAllowStatOrder) ? true : false;
    form_payload.value.isIncludeInStatement = parseInt(item.isIncludeInStatement) ? true : false;

  }
};


const selectedUser = (item) => {
    isSelectedUser.value = true;
    isrefresh.value = false;
    selectedRowDetails.value.id = ""; //clear state id for subcomponents ?id=''
    selectedRowDetails.value.role_id = ""; //clear state id for subcomponents ?id=''
    form_payload.value = Object.assign({});
    if (item) {  
        form_payload.value = Object.assign({}, item);
        selectedRowDetails.value = Object.assign({}, item); //set state id for subcomponents ?id=item.id value
        isrefresh.value = true;
        isSelectedUser.value = false;
    } else {
        isrefresh.value = false;
        isSelectedUser.value = true;
    }
};

const details = () => {
  if (form_payload.value) {
    form_payload.value.item_InventoryGroup_Id = parseInt(form_payload.value.item_InventoryGroup_Id) ? parseInt(form_payload.value.item_InventoryGroup_Id) : "";
    form_payload.value.item_Med_AntibioticClass_Id = parseInt(form_payload.value.item_Med_AntibioticClass_Id) ? parseInt(form_payload.value.item_Med_AntibioticClass_Id) : "";
    form_payload.value.item_Med_Classification_Id = parseInt(form_payload.value.item_Med_Classification_Id) ? parseInt(form_payload.value.item_Med_Classification_Id) : "";
    form_payload.value.item_Manufacturer_Id = parseInt(form_payload.value.item_Manufacturer_Id) ? parseInt(form_payload.value.item_Manufacturer_Id) : "";
    form_payload.value.item_Med_Drug_Administration_Route_Id = parseInt(form_payload.value.item_Med_Drug_Administration_Route_Id) ? parseInt(form_payload.value.item_Med_Drug_Administration_Route_Id) :"";
    form_payload.value.item_Med_GenericName_Id = parseInt(form_payload.value.item_Med_GenericName_Id) ? parseInt(form_payload.value.item_Med_GenericName_Id) : "";
    form_payload.value.item_Med_TherapeuticClass_Id = parseInt(form_payload.value.item_Med_TherapeuticClass_Id) ? parseInt(form_payload.value.item_Med_TherapeuticClass_Id) : "";
    form_payload.value.item_Category_Id = parseInt(form_payload.value.item_Category_Id);
    form_payload.value.item_SubCategory_Id = parseInt(form_payload.value.item_SubCategory_Id) ? parseInt(form_payload.value.item_SubCategory_Id) : "";
    form_payload.value.item_UnitOfMeasure_Id = parseInt(form_payload.value.item_UnitOfMeasure_Id) ? parseInt(form_payload.value.item_UnitOfMeasure_Id) : "";
    form_payload.value.item_Med_Dosage_Form_id = parseInt(form_payload.value.item_Med_Dosage_Form_id) ? parseInt(form_payload.value.item_Med_Dosage_Form_id) : "";
    form_payload.value.item_Brand_Id = parseInt(form_payload.value.item_Brand_Id) ? parseInt(form_payload.value.item_Brand_Id) : "";


    form_payload.value.isSupplies = parseInt(form_payload.value.isSupplies) ? true : false;
    form_payload.value.isMedicines = parseInt(form_payload.value.isMedicines) ? true : false;
    form_payload.value.isFixedAsset = parseInt(form_payload.value.isFixedAsset) ? true : false;
    form_payload.value.isReagents = parseInt(form_payload.value.isReagents) ? true : false;
    form_payload.value.isMDRP = parseInt(form_payload.value.isMDRP) ? true : false;
    form_payload.value.isConsignment = parseInt(form_payload.value.isConsignment) ? true : false;
    form_payload.value.isSerialNo_Required = parseInt(form_payload.value.isSerialNo_Required) ? true : false;
    form_payload.value.isLotNo_Required = parseInt(form_payload.value.isLotNo_Required) ? true : false;
    form_payload.value.isExpiryDate_Required = parseInt(form_payload.value.isExpiryDate_Required) ? true : false;
    form_payload.value.isForProduction = parseInt(form_payload.value.isForProduction) ? true : false;
    form_payload.value.isPerishable = parseInt(form_payload.value.isPerishable) ? true : false;
    form_payload.value.isVatable = parseInt(form_payload.value.isVatable) ? true : false;
    form_payload.value.isVatExempt = parseInt(form_payload.value.isVatExempt) ? true : false;
    form_payload.value.isAllowDiscount = parseInt(form_payload.value.isAllowDiscount) ? true : false;
    form_payload.value.isZeroRated = parseInt(form_payload.value.isZeroRated) ? true : false;
    form_payload.value.isOpenPrice = parseInt(form_payload.value.isOpenPrice) ? true : false;
    form_payload.value.isAllowStatOrder = parseInt(form_payload.value.isAllowStatOrder) ? true : false;
    form_payload.value.isIncludeInStatement = parseInt(form_payload.value.isIncludeInStatement) ? true : false;
  }
};

const handleView = () => {
    
    if (Object.keys(form_payload.value).length === 0)
    return useSnackbar(true, "error", "Select Patient");
    details();
    item_supplies_form.value = true;
};
const handleEdit = () => {
     if (Object.keys(form_payload.value).length === 0)
    return useSnackbar(true, "error", "Select Patient");
    details();
    item_supplies_form.value = true;
};

const handleNew = () => {
    form_payload.value = Object.assign({});
    central_form_dialog.value = true;
};
// const openAddFormDialog = () => {
//     form_payload.value = Object.assign({});
//     item_supplies_form.value = true;
// };

const openAddFormDialog = (type) => {
  if(type == 'new'){
    form_payload.value = Object.assign({});
  }
  if (form_payload.value.id) {
    search_results.value = [];
    form_payload.value.type = 'edit';
  } else {
    form_payload.value.item_name = search_payload.value.itemname;
  }
    item_supplies_form.value = true;
};
const closeCentralFormDialog = () => {
    form_payload.value = Object.assign({});
    central_form_dialog.value = false;
    search_payload.value =  Object.assign({});
};

const closeFormDialog = () => {
    item_supplies_form.value = false;
    isSelectedUser.value = true;
};

const DeactiveUser = () => {};

const SearchItemandSupplies = async (payload) => {
 
  let itemcode = payload.itemcode || "";
  let itemname = payload.itemname || "";
  if(itemname.length <= 3)  return useSnackbar(true,"error",'Search atleast 3 characters');
  search_payload.value.isloading = true;
  let params ="itemcode=" +itemcode +"&itemname=" +itemname;
  const response = await $fetch(useApiUrl() + "/search-item-and-supplies" + "?" + params || "", {
    headers: {
      Authorization: `Bearer ` + useToken(),
    },
  });

  console.log(response);
  if (response) {
    search_payload.value.isloading = false;
    search_results.value = response;
  }
};

const loadItems = async (
    options = null,
    searchkeyword = null,
    item_group_id = null
) => {
    try {
        loading.value = true;
        let itemgroup = item_group_id || currentTabValue.value;
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
            : "page=1&per_page=50&item_group_id=" +
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


const submitItemandSuppliesForm = async (details) => {
  if (usePasscode() == details.user_passcode) {
      if (form_payload.value) {

        loading.value = true;
        let method = "POST";
        let id = "";
        if (form_payload.value.id) {
          id = form_payload.value.id;
          method = "PUT";
        }
        const response = await $fetch(useApiUrl() + `/item-and-supplies/` + id, {
          method: method,
          headers: {
            Authorization: `Bearer ` + useToken(),
            "Content-Type": "application/json",
          },
          body: { payload: form_payload.value },
        });
        if (response.message) {
          confirmationDialog.value = false;
          loading.value = false;
          loadItems(null, form_payload.value.itemname);
          closeFormDialog();
          return useSnackbar(true,"success",response.message);
        }
      }
   }else {
    error_msg.value = "Incorrect Passcode";
    setTimeout(() => {
      error_msg.value = "";
    }, 3000);
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
