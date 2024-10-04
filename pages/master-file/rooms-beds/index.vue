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
      <v-btn
        @click="ViewSummary"
        prepend-icon="mdi-information-box-outline"
        width="150"
        color="primary"
        class="bg-warning text-white"
      >
        Summary</v-btn
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
      @open-filter="openFilterOptions"
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

  <SummaryModal 
    :show="open_summary_modal"
    :summary_header="'Rooms and Beds'"
    :data="rooms_beds_test_data"
    @close-dialog="closeViewSummary"
  />

  <v-menu
    v-model="open_filter_options"
    :close-on-content-click="false"
    offset-y
    activator="#filter-button"
  >
    <template v-slot:activator="{ on, attrs }">
      <div></div>
    </template>
    <v-card width="450px" rounded="lg">
      <v-toolbar density="compact">
        <v-toolbar-title>Filter Options</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn icon @click="closeFilterOptions">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-toolbar>
      <v-divider></v-divider>
      <v-card-text>
        <v-row>
          <!-- <v-col cols="12" md="6">
            <v-select label="Status" variant="outlined" density="compact" v-model="filter.status"></v-select>
          </v-col> -->
          <!-- Add filter options as needed -->
        </v-row>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn class="bg-primary text-white" @click="applyFilters">Apply Filters</v-btn>
      </v-card-actions>
    </v-card>
  </v-menu>

  <!-- Master File Rooms and Beds Sub components -->
  <MFRoomOccupantsDialog :show="MFRoomOccupants" @close-dialog="useSubComponents('MFRoomOccupants', false)" />
</template>

<script setup>
import RoomsandBedsForm from "./Form.vue";
import ReusableTable from "~/components/reusables/ReusableTable.vue";
const {
  MFRoomOccupants,
} = storeToRefs(MFRoomsAndBedsDialog());

definePageMeta({
  layout: "root-layout",
});
import nuxtStorage from "nuxt-storage";
// let userdetails = JSON.parse(nuxtStorage.localStorage.getData("user_details"));
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
const filter = ref({});
const open_filter_options = ref(false);
const params = ref("");
const form_payload = ref({});
const open_summary_modal = ref(false);
const rooms_beds_test_data = ref([
  { label: "Total No. of Rooms", value: "123" },
  { label: "Available Rooms", value: "456" },
  { label: "For Renovation", value: "789" },
  { label: "Fully Occupied", value: "333" },
  { label: "Total No. of Beds", value: "666" },
  { label: "Available Beds", value: "999" },
  { label: "Occupied Beds", value: "111" },
  { label: "Beds for Cleaning", value: "222" },
  { label: "Beds for Repair", value: "846" },
]);  

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
const openFilterOptions = () => {
  setTimeout(() => {
    open_filter_options.value = true;
  }, 100);
};
const closeFilterOptions = () => {
  open_filter_options.value = false;
};
const applyFilters = () => {
  console.log('Filters applied:', filter.value);
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

const ViewSummary = () => {
  open_summary_modal.value = true;
}
const closeViewSummary = () => {
  open_summary_modal.value = false;
}

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
