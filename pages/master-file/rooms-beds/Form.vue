<template>
  <v-dialog
    :model-value="form_dialog"
    width="870px"
    transition="dialog-bottom-transition"
    scrollable
    persistent
  >
    <form @submit.prevent="handleSubmit">
       <template v-if="!isrefresh">
        <v-card>
            <v-card-title>
            <v-toolbar density="compact" color="#FFF">
                <v-toolbar-title>Room and Bed Maintenance</v-toolbar-title>
                <v-spacer></v-spacer>
                <v-btn color="black" @click="closeDialog">
                <v-icon>mdi-close</v-icon>
                </v-btn>
            </v-toolbar>
            </v-card-title>
            <v-divider></v-divider>
            <v-card-text style="max-height: auto">
            <v-row>
                <v-col lg="6">
                <v-autocomplete
                    label="Branch"
                    type="text"
                    :items="branch"
                    item-title="name"
                    item-value="id"
                    density="compact"
                    variant="outlined"
                    v-model="payload.branch_id"
                    clearable
                ></v-autocomplete>
                <v-autocomplete
                    label="Building Name"
                    :items="buildings"
                    item-title="description"
                    item-value="id"
                    variant="outlined"
                    density="compact"
                    :rules="[(v) => !!v || 'Building Name is required']"
                    v-model="payload.building"
                    @update:model-value="getBuildingFloors"
                    return-object
                    clearable
                ></v-autocomplete>
                <v-autocomplete
                    label="Floor Level"
                    :items="floors"
                    item-title="description"
                    item-value="id"
                    v-model="payload.floor"
                    :rules="[(v) => !!v || 'Floor Level is required']"
                    @update:model-value="getBuildingFloorsStation"
                    return-object
                    variant="outlined"
                    density="compact"
                    clearable
                ></v-autocomplete>

                <v-autocomplete
                    label="Nursing Ward Station"
                    :items="nursing_ward_stations"
                    item-title="station_description"
                    item-value="id"
                    return-object
                    variant="outlined"
                    density="compact"
                    :rules="[(v) => !!v || 'Nursing Station is required']"
                    v-model="payload.station_id"
                    clearable
                    hide-details
                ></v-autocomplete>
                </v-col>
                <v-col lg="6">
                <v-row>
                    <v-col lg="12">
                    <v-autocomplete
                        label="Room Accomodation"
                        :items="room_accomodation"
                        item-title="accomodation_description"
                        item-value="id"
                        :rules="[(v) => !!v || 'Nursing Station is required']"
                        variant="outlined"
                        density="compact"
                        hide-details
                        v-model="payload.accomodation_id"
                    ></v-autocomplete>
                    </v-col>
                    <v-col lg="7">
                    <v-autocomplete
                        label="Room Type Class"
                        :items="room_type"
                        item-title="room_class_description"
                        item-value="id"
                        
                        :rules="[(v) => !!v || 'Room type is required']"
                        variant="outlined"
                        hide-details
                        density="compact"
                        v-model="payload.room_class_id"
                    ></v-autocomplete>
                    </v-col>
                    <v-col lg="5">
                    <v-text-field
                        label="Room Rate"
                        type="text"
                        hide-details
                        density="compact"
                        :rules="[(v) => !!v || 'Price Scheme is required']"
                        v-model="payload.room_rate"
                        variant="outlined"
                    ></v-text-field>
                    </v-col>
                    <v-col cols="7">
                    <v-text-field
                        label="Room No."
                        type="text"
                        :rules="[(v) => !!v || 'Room No. is required']"
                        density="compact"
                        variant="outlined"
                        v-model="payload.room_code"
                    ></v-text-field>

                    <v-autocomplete
                        label="Room Status"
                        :items="room_status"
                        item-title="room_description"
                        item-value="id"
                        :rules="[(v) => !!v || 'Room Status is required']"
                        variant="outlined"
                        density="compact"
                        hide-details
                        v-model="payload.room_status_id"
                    ></v-autocomplete>
                        <v-checkbox
                        hide-details
                        v-model="payload.isActive"
                        label="Active"
                        ></v-checkbox>
                    </v-col>
                    <v-col cols="5">
                    <v-text-field
                        label="No. of Beds"
                        type="text"
                        density="compact"
                        variant="outlined"
                        v-model="payload.total_beds"
                        @update:model-value="calculateAverageBed"
                    ></v-text-field>
                    <v-text-field
                        label="Average Bed Rate"
                        type="text"
                        v-model="payload.average_bed"
                        density="compact"
                        variant="outlined"
                        hide-details
                    ></v-text-field>
                    
                    </v-col>
                </v-row>
                </v-col>
                <v-col lg="12">
                <v-textarea
                    class="cursor-pointer"
                    label="Notes for Remarks / Room Feature / Amenities"
                    variant="outlined"
                    v-model="payload.remarks"
                ></v-textarea>
                </v-col>
            </v-row>
            </v-card-text>
            <v-divider></v-divider>
            <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn v-if="payload.type !='view'" class="bg-primary text-white" type="submit"
                >Submit</v-btn
            >
            </v-card-actions>
        </v-card>
      </template>
    </form>
  </v-dialog>
</template>

<script setup>
import nuxtStorage from "nuxt-storage";
const props = defineProps({
  form_dialog: {
    type: Boolean,
    default: () => false,
  },
  form_payload: {
    type: Object,
    default: () => {},
  },
});

const payload = ref({});
const emits = defineEmits();

const closeDialog = () => {
  emits("close-dialog");
};

const branch = JSON.parse(nuxtStorage.localStorage.getData("branches"));
const buildings = JSON.parse(nuxtStorage.localStorage.getData("buildings"));
const room_accomodation = JSON.parse(
  nuxtStorage.localStorage.getData("room_accomodations")
);
const room_type = JSON.parse(nuxtStorage.localStorage.getData("room_class"));
const room_status = JSON.parse(nuxtStorage.localStorage.getData("room_status"));
const floors = ref([]);
const nursing_ward_stations = ref([]);

const bed_status = [
  {
    bed_number: 1,
    status: "Available",
    checkbox1: false,
    checkbox2: false,
  },
  {
    bed_number: 2,
    status: "Not Available",
    checkbox1: false,
    checkbox2: false,
  },
];
const price_schemes = [
  {
    price_scheme_description: "Standard",
    price: 0,
  },
  {
    price_scheme_description: "Non-standard",
    price: 0,
  },
];

const getBuildingFloors = () => {
  floors.value = [];
  floors.value = payload.value.building.floors;
  payload.value.floor = "";
  payload.value.station_id = "";
};

const getBuildingFloorsStation = () => {
  nursing_ward_stations.value = [];
  nursing_ward_stations.value = payload.value.floor.stations;
  payload.value.station_id = "";
};

const handleAdd = () => {
  alert("Add");
};
const handleDelete = () => {
  alert("Delete");
};
const calculateAverageBed = ()=>{
    let roomrate = parseFloat(payload.value.room_rate);
    let total_beds = parseFloat(payload.value.total_beds);
    let total_average = 0;
    if(total_beds != 0 && !isNaN(parseFloat(roomrate / total_beds))){
        total_average= roomrate / total_beds;
    }
    props.form_payload.average_bed = parseFloat(total_average).toFixed(2);
    payload.value.average_bed = parseFloat(total_average).toFixed(2);
}
const handleSubmit = () => {
  props.form_payload.branch_id = payload.value.branch_id;
  props.form_payload.building_id = payload.value.building.id;
  props.form_payload.floor_id = payload.value.floor.id;
  props.form_payload.station_id = payload.value.station_id.id;
  props.form_payload.accomodation_id = payload.value.accomodation_id;
  props.form_payload.total_beds = payload.value.total_beds;
  props.form_payload.room_status_id = payload.value.room_status_id;
  props.form_payload.room_rate = payload.value.room_rate;
  props.form_payload.room_code = payload.value.room_code;
  props.form_payload.room_class_id = payload.value.room_class_id;
  props.form_payload.remarks = payload.value.remarks;
  props.form_payload.average_bed = payload.value.average_bed;
  props.form_payload.isActive = payload.value.isActive;
  emits("submit",props.form_payload);
};
const isrefresh = ref(false);
const assignpayload = ()=>{
    payload.value = Object.assign({});
    if(props.form_payload.type ==='new') return;
    payload.value.id = props.form_payload.id;
    payload.value.branch_id = parseInt(1);
    if(props.form_payload.stations){
        payload.value.building = props.form_payload.stations.floors.building;
        const buildingdetails = buildings.filter(item => item.id === props.form_payload.stations.floors.building.id);
        floors.value = buildingdetails[0].floors;
        payload.value.floor = props.form_payload.stations.floors;
        const floorslist = floors.value.filter(item => item.id === props.form_payload.stations.floors.id);
        nursing_ward_stations.value = floorslist[0].stations;
        payload.value.station_id =props.form_payload.stations;
    }
    
    payload.value.accomodation_id = parseInt(props.form_payload.accomodation_id);
    payload.value.total_beds = props.form_payload.total_beds;
    payload.value.room_status_id =parseInt(props.form_payload.room_status_id);
    payload.value.room_rate = props.form_payload.room_rate;
    payload.value.room_code = props.form_payload.room_code;
    payload.value.room_class_id = parseInt( props.form_payload.room_class_id);
    payload.value.remarks = props.form_payload.remarks;
    payload.value.average_bed = props.form_payload.average_bed;
    payload.value.type = props.form_payload.type;
    payload.value.isActive = parseInt(props.form_payload.isActive) == 1 ? true : false;
}

onUpdated(()=>{
   isrefresh.value = true;
    assignpayload();
   setTimeout(()=>{
    isrefresh.value = false;
   },100)

   console.log(props.form_payload.type)
});
</script>

<style scoped>
.dialog-bottom-transition-enter-active,
.dialog-bottom-transition-leave-active {
  transition: transform 0.2s ease-in-out;
}
</style>
