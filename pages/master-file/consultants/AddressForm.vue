<template>
    <v-card rounded="lg">
        <v-toolbar density="compact" color="#107bac" hide-details>
            <v-toolbar-title>Address Form</v-toolbar-title>
            <v-btn color="white" @click="closeDialog">
              <v-icon>mdi-close</v-icon>
            </v-btn>
          </v-toolbar>
        <v-card-text>
            <v-container>
                <v-row>
                    <v-col cols="12" class="pa-1">
                        <v-text-field
                            variant="outlined"
                            label="Building No. / Street"
                            hide-details
                            v-model="address_payload.building"
                            @update:model-value="building"
                            density="compact"
                        ></v-text-field>
                    </v-col>
                    <v-col cols="6" class="pa-1">
                        <v-autocomplete
                            item-title="region_name"
                            item-value="region_code"
                            v-model="address_payload.region"
                            :items="region"
                            @update:model-value="getProvince"
                            label="Region"
                            hide-details
                            clearable
                            return-object
                            density="compact"
                            variant="outlined"
                        ></v-autocomplete>
                    </v-col>
                    <v-col cols="6" class="pa-1">
                        <v-autocomplete
                            item-title="province_name"
                            item-value="province_code"
                            v-model="address_payload.province"
                            :items="province"
                            label="Province/State"
                            @update:model-value="getMunicipality"
                            hide-details
                            clearable
                            return-object
                            density="compact"
                            variant="outlined"
                        ></v-autocomplete>
                    </v-col>
                     <v-col cols="6" class="pa-1">
                        <v-autocomplete
                            item-title="municipality_name"
                            item-value="municipality_code"
                            v-model="address_payload.municipality"
                            label="Municipality / City"
                            :items="municipality"
                            @update:model-value="getBarangay"
                            hide-details
                            clearable
                            return-object
                            density="compact"
                            variant="outlined"
                        ></v-autocomplete>
                    </v-col>
                    <v-col cols="6" class="pa-1">
                        <v-autocomplete
                            item-title="barangay_name"
                            item-value="id"
                            label="Barangay"
                            v-model="address_payload.barangay"
                            :items="barangay"
                            @update:model-value="getZipCode"
                            hide-details
                            clearable
                            return-object
                            density="compact"
                            variant="outlined"
                        ></v-autocomplete>
                    </v-col>
                    <v-col cols="6" class="pa-1">
                        <v-autocomplete
                            item-title="zip_code"
                            item-value="id"
                            v-model="address_payload.zicode_id"
                            :items="zipcode"
                            label="Zipcode"
                            hide-details
                            @update:model-value="getZipcodeValue"
                            clearable
                            density="compact"
                            return-object
                            variant="outlined"
                        ></v-autocomplete>
                    </v-col>
                    <v-col cols="6" class="pa-1">
                        <v-autocomplete
                            item-title="country_name"
                            item-value="id"
                            v-model="address_payload.country"
                            :items="country"
                            label="Country"
                            hide-details
                            return-object
                            @update:model-value="getCountry"
                            clearable
                            density="compact"
                            variant="outlined"
                        ></v-autocomplete>
                    </v-col>
                    <v-col cols="6" class="pa-1">
                        <v-autocomplete
                            item-title="abbreviations"
                            item-value="id"
                            label="Area"
                            hide-details
                            clearable
                            density="compact"
                            variant="outlined"
                        ></v-autocomplete>
                    </v-col>
                   
                    <v-col lg="12" class="pa-1">
                        <v-textarea
                            v-model="address_payload.full_address"
                            class="cursor-pointer"
                            label="Full Address"
                            variant="outlined"
                        ></v-textarea>
                    </v-col>
                </v-row>
            </v-container>
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions>
            <v-btn color="blue-darken-1 border border-info" @click="closeDialog"> Close </v-btn>
            <v-spacer></v-spacer>
            <v-btn
                class="bg-primary text-white"
                type="submit"
                @click="handleSubmit"
            >
                Save
            </v-btn>
        </v-card-actions>
    </v-card>
</template>

<script setup>

const emits = defineEmits(['close-dialog', 'handle-submit']);
const props = defineProps({
    payload:{
        type:Object,
        default:()=>{}
    }
});
import nuxtStorage from "nuxt-storage";
const province = ref([]);
const municipality = ref([]);
const barangay = ref([]);
const zipcode = ref([]);
const region = ref(null);
const country = ref(null);
const address = ref("");
const address_payload = ref({});
const building = ()=>{
    address_payload.value.building = address_payload.value.building;
    address_payload.value.full_address = address_payload.value.building;
};
const getProvince = async()=>{
    if(!address_payload.value.region) return;
    const response = await fetch(useLaravelAPI() + "/get-province?region_code=" + address_payload.value.region.region_code, {
      headers: {
        Authorization: `Bearer ` + useToken(),
      },
    });
    const data = await response.json();
    province.value = data.data;
    address_payload.value.regionname = address_payload.value.region.region_name;
    address_payload.value.full_address =  address_payload.value.building+' '+address_payload.value.region.region_name;
}
const getMunicipality = async()=>{
      if(!address_payload.value.province) return;
      const response = await fetch(useLaravelAPI() + "/get-municipality?region_code=" +address_payload.value.region.region_code + "&province_code=" +address_payload.value.province.province_code, {
      headers: {
        Authorization: `Bearer ` + useToken(),
      },
    });
    const data = await response.json();
    municipality.value = data.data;
    address_payload.value.provincename = address_payload.value.province.province_name;
    address_payload.value.full_address = address_payload.value.building+' '+address_payload.value.province.province_name + ', '+ address_payload.value.regionname;
}
const getBarangay = async()=>{
      if(!address_payload.value.municipality) return;
      const response = await fetch(useLaravelAPI() + "/get-barangays?region_code=" + address_payload.value.region.region_code + "&province_code=" + address_payload.value.province.province_code + "&municipality_code=" + address_payload.value.municipality.municipality_code, {
      headers: {
        Authorization: `Bearer ` + useToken(),
      },
    });
    const data = await response.json();
    barangay.value = data.data;
    address_payload.value.municipalityname =address_payload.value.municipality.municipality_name;
    address_payload.value.full_address =  address_payload.value.building+' '+address_payload.value.municipality.municipality_name + ', '+ address_payload.value.provincename + ', '+ address_payload.value.regionname;
}

const getZipCode = async()=>{
    if(!address_payload.value.barangay) return;
     const response = await fetch(useLaravelAPI() + "/zip-code-list?region_code=" + address_payload.value.region.region_code + "&province_code=" + address_payload.value.province.province_code + "&municipality_code=" + address_payload.value.municipality.municipality_code, {
      headers: {
        Authorization: `Bearer ` + useToken(),
      },
    });
    const data = await response.json();
    zipcode.value = data.data;
    address_payload.value.barangayname = address_payload.value.barangay.barangay_name;
    address_payload.value.full_address = address_payload.value.building+' '+address_payload.value.barangay.barangay_name+ ', '+ address_payload.value.municipalityname + ', '+ address_payload.value.provincename + ', '+ address_payload.value.regionname;
}

const getZipcodeValue = ()=>{
 if(!address_payload.value.zicode_id) return;
 address_payload.value.zicodevalue = address_payload.value.zicode_id.zip_code;
 address_payload.value.full_address = address_payload.value.building+' '+address_payload.value.barangayname+ ', '+ address_payload.value.municipalityname +', '+ address_payload.value.zicode_id.zip_code+', '+address_payload.value.provincename + ', '+ address_payload.value.regionname;
}

const getCountry = ()=>{
 if(!address_payload.value.country) return;
 address_payload.value.countryname = address_payload.value.country.country_name;
 address_payload.value.full_address = address_payload.value.building+' '+address_payload.value.barangayname+ ', '+ address_payload.value.municipalityname +', '+ address_payload.value.zicodevalue+', '+address_payload.value.provincename + ', '+ address_payload.value.regionname+ ', '+ address_payload.value.country.country_name;
}
const handleSubmit = () => {
    emits("handle-submit",address_payload);
};

const closeDialog = () => {
    emits("close-dialog");
};

onMounted(() => {
    region.value = useGetData("region");
    country.value = useGetData("country");
})

</script>

<style scoped></style>
