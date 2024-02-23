<template>
  <v-dialog
    :model-value="form_dialog"
    width="870px"
    transition="dialog-bottom-transition"
    scrollable
    persistent
  >
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
              v-model="form_payload.branch_id"
              clearable
            ></v-autocomplete>
            <v-autocomplete
              label="Building Name"
              :items="buildings"
              required
              item-title="description"
              item-value="id"
              :rules="[(v) => !!v || 'Building name is required']"
              variant="outlined"
              density="compact"
              v-model="form_payload.building"
              @update:model-value="getBuildingFloors"
              return-object
              clearable
            ></v-autocomplete>
            <v-autocomplete
              label="Floor Level"
              :items="floors"
              item-title="description"
              item-value="id"
              v-model="form_payload.floor"
              @update:model-value="getBuildingFloorsStation"
              required
              return-object
              :rules="[(v) => !!v || 'Floor level is required']"
              variant="outlined"
              density="compact"
              clearable
            ></v-autocomplete>

            <v-autocomplete
              label="Nursing Ward Station"
              :items="nursing_ward_stations"
              item-title="station_description"
              item-value="id"
              required
              return-object
              :rules="[(v) => !!v || 'Nursing Station is required']"
              variant="outlined"
              density="compact"
              v-model="form_payload.station_id"
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
                  required
                  :rules="[(v) => !!v || 'Nursing Station is required']"
                  variant="outlined"
                  density="compact"
                  hide-details
                  v-model="form_payload.accomodation_id"
                ></v-autocomplete>
              </v-col>
              <v-col lg="7">
                <v-autocomplete
                  label="Room Type Class"
                  :items="room_type"
                  item-title="room_class_description"
                  item-value="id"
                  required
                  :rules="[(v) => !!v || 'Room type is required']"
                  variant="outlined"
                  hide-details
                  density="compact"
                  v-model="form_payload.room_class_id"
                ></v-autocomplete>
              </v-col>
              <v-col lg="5">
                <v-text-field
                  label="Price Scheme"
                  type="text"
                  hide-details
                  density="compact"
                  v-model="form_payload.room_rate"
                  variant="outlined"
                ></v-text-field>
              </v-col>
              <v-col cols="7">
                <v-text-field
                  label="Room No."
                  type="text"
                  required
                  :rules="[(v) => !!v || 'Room No. is required']"
                  density="compact"
                  variant="outlined"
                  v-model="form_payload.room_code"
                ></v-text-field>

                <v-autocomplete
                  label="Room Status"
                  :items="room_status"
                  item-title="room_description"
                  item-value="id"
                  required
                  :rules="[(v) => !!v || 'Room Status is required']"
                  variant="outlined"
                  density="compact"
                  hide-details
                  v-model="form_payload.room_status_id"
                ></v-autocomplete>
              </v-col>
              <v-col cols="5">
                <v-text-field
                  label="No. of Beds"
                  type="text"
                  density="compact"
                  variant="outlined"
                  v-model="form_payload.total_beds"
                ></v-text-field>
                <v-text-field
                  label="Average Bed Rate"
                  type="text"
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
              v-model="form_payload.remarks"
            ></v-textarea>
          </v-col>
        </v-row>
      </v-card-text>
      <v-divider></v-divider>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn class="bg-primary text-white" type="submit" @click.prevent="submit"
          >Submit</v-btn
        >
      </v-card-actions>
    </v-card>
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
  floors.value = props.form_payload.building.floors;
  props.form_payload.floor = "";
  props.form_payload.station_id = "";
};

const getBuildingFloorsStation = () => {
  nursing_ward_stations.value = [];
  nursing_ward_stations.value = props.form_payload.floor.stations;
  props.form_payload.station_id = "";
};

const handleAdd = () => {
  alert("Add");
};
const handleDelete = () => {
  alert("Delete");
};

const submit = () => {
  alert("Submit");
};
</script>

<style scoped>
.dialog-bottom-transition-enter-active,
.dialog-bottom-transition-leave-active {
  transition: transform 0.2s ease-in-out;
}
</style>
