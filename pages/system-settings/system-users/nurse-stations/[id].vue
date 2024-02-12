<template>
    <!-- <div>{{ route.params}}</div> -->
    <v-dialog v-model="dialog" persistent hide-overlay width="800" scrollable>
        <v-card>
            <v-toolbar density="compact" >
                <v-toolbar-title>System User Nurse Station</v-toolbar-title>
            </v-toolbar>
            <v-divider></v-divider>
            <v-container class="mb-1">
                <v-row>
                    <v-col cols="12" sm="6" md="3">
                        <v-text-field :model-value="selectedRowDetails.idnumber" label="ID Number"  hide-details outlined readonly></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                        <v-text-field  :model-value="selectedRowDetails.name" label="Name"  hide-details outlined readonly></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="5">
                        <v-text-field  :model-value="selectedRowDetails.warehouse.warehouse_description" label="Department"  hide-details outlined readonly></v-text-field>
                    </v-col>
                </v-row>
            </v-container>
            <v-divider></v-divider>
            <v-card-text class="mt-1 pt-1 pl-2 pr-3" style="height:500px;">
                    <!-- Display the nurse data here for information purposes only -->
                    <v-row>
                        <v-col cols="12">
                            <v-tabs bg-color="primary" v-model="tab" center-active>
                                <v-tab v-for="(building, index) in buildings" :value="index" :key="index">
                                   {{ building.description }} ({{building.floors.length}} Floors)
                                </v-tab>
                            </v-tabs>
                            <v-divider class="mb-2"></v-divider>
                            <v-window v-model="tab">
                                <v-window-item v-for="(building, sectionIndex) in buildings" :key="sectionIndex" :value="index" class="pa-1">
                                    <v-expansion-panels v-model="panel"  :disabled="disabled" multiple>
                                            <v-expansion-panel  class="mb-1" v-for="(floor, floorIndex) in building.floors" :key="floorIndex" >
                                                <v-expansion-panel-title >Floor: {{floor.description}} ({{floor.stations.length}} items)</v-expansion-panel-title>
                                                <v-expansion-panel-text class="pa-0">
                                                    <v-table>
                                                        <tbody>
                                                            <tr v-for="(item, itemIndex) in floor.stations" :key="itemIndex">
                                                                <td width="20" :key="itemIndex"> 
                                                                    <v-icon size="26" @click="addStation(item,true)" v-if="!checkAssignedStation(item.id)">mdi-checkbox-blank-outline</v-icon>
                                                                    <v-icon size="26" @click="addStation(item,false)" v-else-if="checkAssignedStation(item.id)" >mdi-checkbox-outline</v-icon>
                                                                </td>
                                                                <td>{{item.station_description}}</td>
                                                            </tr>
                                                        </tbody>
                                                    </v-table>
                                                </v-expansion-panel-text>
                                            </v-expansion-panel>
                                    </v-expansion-panels>
                                </v-window-item>
                            </v-window>
                        </v-col>
                    </v-row>
            </v-card-text>
            <v-divider></v-divider>
            <v-card-actions>
                <v-btn  class="bg-primary text-white" @click="router.back()"> Close </v-btn>
                <v-spacer></v-spacer>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script setup>
import nuxtStorage from "nuxt-storage";
definePageMeta({
    layout: "root-layout",
});
const { selectedRowDetails } = storeToRefs(useSubcomponentSelectedRowDetailsStore()); //state id for subcomponents ?id=123
let buildings = JSON.parse(nuxtStorage.localStorage.getData("buildings"));
// Auth refs and config
const config = useRuntimeConfig();
const token = useCookie("token");

const tab = ref(null)
const assign_station_payload = ref({})
const panel = ref([0,1,2,3,4,5,6]);
const assign_station = ref([]);
const router = useRouter()
const route = useRoute()


const getAllAssignedStation = async()=>{
  const response = await fetch(
    `${config.public.apiBase}` + `/assign-station?user_id=` + route.params.id,
    {
      headers: {
        Authorization: `Bearer ${token.value}`,
      },
    }
  );
  const data = await response.json();
  assign_station.value = data;
}

onMounted(()=>{
    getAllAssignedStation();
});

const checkAssignedStation = (id) => {
  if(id) {
    return  assign_station.value.find((item) => parseInt(item.station_id) === parseInt(id));
  }
  return false; // Returning null if id is falsy or if assign_station or assign_station.value doesn't exist
};

const addStation = async (item,type) => {
    item.station_id = item.id;
    item.user_id = route.params.id;
    item.type = type;
    const { data } = await useFetch(`${config.public.apiBase}` + `/assigned-station`, {
        method: "post",
        headers: {
        Authorization: `Bearer ${token.value}`,
        "Content-Type": "application/json",
        },
        body: { payload: item },
    });
    if (data.value) {
        getAllAssignedStation();
    }
};
// When accessing /posts/1, route.params.id will be 1
console.log(route.params.id)
const dialog = ref(true);
</script>
<style >
.v-expansion-panel--active > .v-expansion-panel-title:not(.v-expansion-panel-title--static){
    height: 28px !important;
}
</style>
