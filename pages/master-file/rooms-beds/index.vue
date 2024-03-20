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
        @click="openAddFormDialog"
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
  <v-card class="mb-2" elevation="4">
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
      <template v-for="column in headers" v-slot:[`column-${column.key}`]="{ item }">
        <!-- customize rendering for each column here -->
        <span v-if="column.key ==='building'" :key="column.key">{{
          item.stations ? item.stations.floors.building.description : ""
        }}</span>
        <span v-if="column.key === 'floor'" :key="column.key">{{
          item.stations ?  item.stations.floors.description : ""
        }}</span>

        <span v-if="column.key === 'roomstatus'" :key="column.key">
          {{ item.room_status ? item.room_status.room_description : "" }}</span
        >
        <span v-if="column.key === 'roomClass'" :key="column.key">
          {{ item.room_class ? item.room_class.room_class_description : "" }}</span
        >
        <span v-if="column.key === 'station'" :key="column.key">
          {{ item.stations ? item.stations.station_description : "" }}</span
        >
        <span v-if="column.key === 'isactive'" :key="column.key">
          {{ item.isactive == 1 ? "Active" : "In Active" }}</span
        >
        <!-- Add more custom logic for other columns -->
      </template>
    </ReusableTable>
  </v-card>

  <!-- FORM HERE -->
  <RoomsandBedsForm @close-dialog="closeFormDialog" @submit="confirmation" :form_dialog="form_dialog" :form_payload="form_payload" />

  <Confirmation
    :show="confirmationDialog"
    :payload="form_payload"
    :error_msg="error_msg"
    :loading="loading"
    @close="closeConfirmation"
    @submit="submitRoomsandBedForm"
  />
</template>

<script setup>
import RoomsandBedsForm from "./Form.vue";
import ReusableTable from "~/components/reusables/ReusableTable.vue";

definePageMeta({
  layout: "root-layout",
});
import nuxtStorage from "nuxt-storage";
let userdetails = JSON.parse(nuxtStorage.localStorage.getData("user_details"));
const confirmationDialog = ref(false);
const error_msg = ref('');
const loading = ref(true);
const { selectedRowDetails, isrefresh } = storeToRefs(useSubcomponentSelectedRowDetailsStore());
const isSelectedUser = ref(true);
const pageTitle = ref("Rooms and Beds");
const currentTab = ref(false);
const showTabs = ref(false);
const tableTabs = ref([]);
const form_dialog = ref(false);
const totalItems = ref(0);
const itemsPerPage = ref(15);
const search = ref("");
const params = ref("");
const form_payload = ref({});
const headers = [
  {
    title: "Building",
    align: "start",
    sortable: true,
    key: "building",
    width: "10%",
  },
  { title: "Floor Name", key: "floor", align: "center", width: "10%", sortable: false },
  { title: "Room No.", key: "room_code", align: "center", width: "10%", sortable: false },
  {
    title: "No.Of Beds",
    key: "total_beds",
    align: "center",
    width: "10%",
    sortable: false,
  },
  { title: "Room Status", key: "roomstatus", align: "center", width: "15%", sortable: false },
  { title: "Room Type", key: "roomClass", align: "center", width: "15%", sortable: false },
  {
    title: "Nursing Station",
    key: "station",
    align: "center",
    width: "30%",
    sortable: false,
  },
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
  form_payload.value =  Object.assign({}); 
  if(item){
    selectedRowDetails.value =  Object.assign({}, item); //set state id for subcomponents ?id=item.id value
    form_payload.value =  Object.assign({}, item); 
    isrefresh.value = true;
    isSelectedUser.value = false;
  }else{
    isrefresh.value = false;
    isSelectedUser.value = true;
  }
};
const handleView = () => {
  form_payload.value.type = 'view';
  form_dialog.value = true;
};

const handleEdit = () => { 
  form_payload.value.type = 'edit';
  form_dialog.value = true;
};

const openAddFormDialog = () => {
  form_payload.value.type = 'new';
  form_dialog.value = true;
};

const closeFormDialog = () => {
  form_dialog.value = false;
};

const DeactiveUser = () => {
  form_payload.value.type = 'edit';
  form_dialog.value = true;
};

const closeConfirmation = ()=>{
  confirmationDialog.value = false;
}

const confirmation = ()=>{
  confirmationDialog.value = true;
}

const submitRoomsandBedForm = async(details)=>{
  if (userdetails.passcode == details.user_passcode) {
    if (form_payload.value) {
        loading.value = true;
        let method = "POST";
        let id = "";
        if (form_payload.value.id) {
          id = form_payload.value.id;
          method = "PUT";
        }
        const response = await $fetch(useApiUrl() + `/submit-rooms-and-beds/` + id, {
          method: method,
          headers: {
            Authorization: `Bearer ` + useToken(),
            "Content-Type": "application/json",
          },
          body: { form_payload: form_payload.value },
        });
        if (response.msg) {
          confirmationDialog.value = false;
          form_dialog.value = false;
          loading.value = false;
          loadItems(null, null);
          closeFormDialog();
          return useSnackbar(true,"success",response.msg);
        }else{
          loading.value = false;
        }
    }
  }else{
    error_msg.value = "Incorrect Passcode";
    setTimeout(() => {
      error_msg.value = "";
    }, 3000);
  }
}

const loadItems = async (options = null, searchkeyword = null) => {
  try {
    loading.value = true;

    let keyword = searchkeyword || "";
      params.value = options  ? "page=" + options.page + "&per_page=" + options.itemsPerPage + "&keyword=" + options.keyword
    : "page=1&per_page=10&keyword=" + keyword;
    const response = await fetch(useApiUrl()+'/rooms-and-beds'+ "?" + params.value || "", {
      headers: {
        Authorization: `Bearer `+ useToken(),
      },
    });
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

// Table and Templates methods
const closeBuildingsFloors = () => {
  BuildingsFloors.value = false;
}
const closeNursingStationsWards = () => {
  NursingStationsWards.value = false;
}
const closeRoomClassificationTypes = () => {
  RoomClassificationTypes.value = false;
}
const closeRoomChargeSettings = () => {
  RoomChargeSettings.value = false;
}
const closeRoomPriceSchemes = () => {
  RoomPriceSchemes.value = false;
}
const closeRoomStatus = () => {
  RoomStatus.value = false;
}
const closeRoomUsageTypes = () => {
  RoomUsageTypes.value = false;
}
const closeBedStatus = () => {
  BedStatus.value = false;
}

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
