<template>
  <v-row>
    <v-col cols="9" xl="9">
      <v-card density="compact">
        <v-toolbar density="compact" color="primary">
          <v-card-title class="d-flex align-center pe-2">
            <v-icon icon="mdi-form-select"></v-icon> &nbsp;Personal Information
            <v-spacer></v-spacer>
          </v-card-title>
        </v-toolbar>
        <v-divider class="mt-2"></v-divider>
        <v-row no-gutters class="pa-1">
          <v-col lg="2" class="pa-1">
            <v-text-field
              label="Patient No"
              type="text"
              v-model="form_payload.patient_id"
              disabled
              hide-details
              density="compact"
              variant="outlined"
            ></v-text-field>
          </v-col>
          <v-col lg="2" class="pa-1">
            <v-text-field
              label="Patient ID"
              type="text"
              v-model="form_payload.patient_id"
              hide-details
              density="compact"
              variant="outlined"
            ></v-text-field>
          </v-col>
          <v-col lg="2" class="pa-1">
            <v-text-field
              label="Xray File #"
              type="text"
              hide-details
              density="compact"
              variant="outlined"
            ></v-text-field>
          </v-col>
        </v-row>
        <v-row no-gutters class="pa-1">
          <v-col lg="4" class="pa-1">
            <v-text-field
              label="Last Name"
              type="text"
              v-model="form_payload.lastname"
              hide-details
              density="compact"
              variant="outlined"
            ></v-text-field>
          </v-col>
          <v-col lg="4" class="pa-1">
            <v-text-field
              label="First Name"
              type="text"
              v-model="form_payload.firstname"
              hide-details
              density="compact"
              variant="outlined"
            ></v-text-field>
          </v-col>
          <v-col lg="4" class="pa-1">
            <v-text-field
              label="Middle Name"
              type="text"
              v-model="form_payload.middlename"
              hide-details
              density="compact"
              variant="outlined"
            ></v-text-field>
          </v-col>
        </v-row>
        <v-row no-gutters class="pa-1">
          <v-col lg="2" class="pa-1">
            <v-autocomplete
              label="Suffix"
              type="text"
              item-title="description"
              item-value="id"
              :items="suffix"
              v-model="form_payload.suffix_id"
              hide-details
              density="compact"
              variant="outlined"
            ></v-autocomplete>
          </v-col>
          <v-col lg="2" class="pa-1">
            <v-autocomplete
              label="Sex"
              type="text"
              item-title="sex_description"
              item-value="id"
              :items="gender"
              v-model="form_payload.sex_id"
              hide-details
              density="compact"
              variant="outlined"
            ></v-autocomplete>
          </v-col>
          <v-col lg="3" class="pa-1">
            <v-text-field
              label="Birthdate"
              type="date"
              v-model="form_payload.birthdate"
              hide-details
              density="compact"
              variant="outlined"
            ></v-text-field>
          </v-col>
          <v-col lg="1" class="pa-0">
            <v-text-field
              class="mt-1"
              label="Age"
              readonly
              v-model="form_payload.age"
              hide-details
              density="compact"
              variant="outlined"
            ></v-text-field>
          </v-col>
          <v-col lg="12" class="pa-1">
            <v-text-field
              label="Birth Place"
              type="text"
              v-model="form_payload.birthplace"
              hide-details
              density="compact"
              variant="outlined"
            ></v-text-field>
          </v-col>
        </v-row>

        <v-row no-gutters class="pa-1">
          <v-col lg="4" class="pa-1">
            <v-autocomplete
              label="Civil Status"
              type="text"
              :items="civil_status"
              item-title="CivilStatus_name"
              item-value="id"
              v-model="form_payload.civilstatus_id"
              hide-details
              density="compact"
              variant="outlined"
            ></v-autocomplete>
          </v-col>
          <v-col lg="4" class="pa-1">
            <v-autocomplete
              label="Nationality "
              type="text"
              :items="nationality"
              item-title="natinality_name"
              item-value="id"
              v-model="form_payload.nationality_id"
              hide-details
              density="compact"
              variant="outlined"
            ></v-autocomplete>
          </v-col>
          <v-col lg="4" class="pa-1">
            <v-autocomplete
              label="Religion"
              type="text"
              :items="religion"
              item-title="religion_name"
              item-value="id"
              v-model="form_payload.religion_id"
              hide-details
              density="compact"
              variant="outlined"
            ></v-autocomplete>
          </v-col>
        </v-row>
        <v-row no-gutters class="pa-1 mt-2">
          <v-col lg="4" class="pa-1">
            <v-text-field
              label="Citizenship"
              type="text"
              hide-details
              density="compact"
              variant="outlined"
            ></v-text-field>
          </v-col>
          <v-col lg="4" class="pa-1">
            <v-text-field
              label="Passport No."
              type="text"
              hide-details
              density="compact"
              variant="outlined"
            ></v-text-field>
          </v-col>
        </v-row>
        <v-row no-gutters class="pa-1 mt-2">
          <v-col lg="2" class="pa-1">
            <v-text-field
              label="Blood Type"
              type="text"
              hide-details
              density="compact"
              variant="outlined"
            ></v-text-field>
          </v-col>
          <v-col lg="2" class="pa-1">
            <v-text-field
              label="Weight"
              type="text"
              hide-details
              density="compact"
              variant="outlined"
            ></v-text-field>
          </v-col>
          <v-col lg="2" class="pa-1">
            <v-text-field
              label="Height"
              type="text"
              hide-details
              density="compact"
              variant="outlined"
            ></v-text-field>
          </v-col>
          <v-col lg="2" class="pa-1">
            <v-text-field
              label="Temperature"
              type="text"
              hide-details
              density="compact"
              variant="outlined"
            ></v-text-field>
          </v-col>
          <v-col lg="2" class="pa-1">
            <v-text-field
              label="Blood Pressure"
              type="text"
              hide-details
              density="compact"
              variant="outlined"
            ></v-text-field>
          </v-col>
        </v-row>

        <v-row no-gutters class="pa-1 mt-3">
          <v-col lg="4" class="pa-1">
            <v-select
              label="Industry"
              :items="industry"
              variant="outlined"
              hide-details
              density="compact"
            ></v-select>
          </v-col>
          <v-col lg="4" class="pa-1">
            <v-select
              label="Work Level"
              :items="work_level"
              hide-details
              variant="outlined"
              density="compact"
            ></v-select>
          </v-col>
          <v-col lg="4" class="pa-1">
            <v-text-field
              label="Company"
              type="text"
              hide-details
              density="compact"
              variant="outlined"
            ></v-text-field>
          </v-col>
        </v-row>
        <v-row no-gutters class="pa-1 mt-1">
          <v-col lg="4" class="pa-1">
            <v-text-field
              label="Tin No."
              type="text"
              hide-details
              density="compact"
              variant="outlined"
            ></v-text-field>
          </v-col>
          <v-col lg="4" class="pa-1">
            <v-text-field
              label="Address"
              type="text"
              v-model="form_payload.bldgstreet"
              hide-details
              density="compact"
              variant="outlined"
            ></v-text-field>
          </v-col>
          <v-col lg="4" class="pa-1">
            <v-text-field
              label="Remarks"
              type="text"
              hide-details
              density="compact"
              variant="outlined"
            ></v-text-field>
          </v-col>
        </v-row>
        <v-row no-gutters class="pa-1">
          <v-col lg="12" class="pa-1">
            <!-- <v-radio-group hide-details inline>
            <v-checkbox hide-details label="Asian"></v-checkbox>
            <v-checkbox hide-details label="American"></v-checkbox>
            <v-checkbox hide-details label="African American"></v-checkbox>
            <v-checkbox hide-details label="American"></v-checkbox>
            <v-checkbox hide-details label="Hispanic / Latino"></v-checkbox>
            <v-checkbox
              hide-details
              label="Native Hawaiian or Pacific Islander"
            ></v-checkbox>
            <v-checkbox hide-details label="Others"></v-checkbox>
          </v-radio-group> -->

            <v-radio-group hide-details inline>
              <v-checkbox hide-details label="Child?"></v-checkbox>
              <v-checkbox hide-details label="Non-local?"></v-checkbox>
              <v-checkbox hide-details label="Hospital Employee"></v-checkbox>
              <v-checkbox hide-details label="No communication from company"></v-checkbox>
              <v-checkbox
                hide-details
                label="No personal data released to other parties"
              ></v-checkbox>
              <v-checkbox
                hide-details
                label="Mark this patient as Black Listed or On Hold"
              ></v-checkbox>
            </v-radio-group>
          </v-col>
        </v-row>
      </v-card>
    </v-col>
    <v-col cols="3" xl="3" class="pa-0">
      <v-col cols="12">
        <v-card>
          <v-toolbar density="compact" color="primary">
            <v-card-title class="d-flex align-center pe-2">
              <v-icon icon="mdi-account-circle-outline"></v-icon> &nbsp;Profile
              <v-spacer></v-spacer>
            </v-card-title>
          </v-toolbar>
          <v-divider></v-divider>
          <v-avatar rounded="0" size="200">
           <center>
             <v-img
              cover
              width="100%"
              v-if="imageUrl"
              :src="imageUrl"
              alt="Selected Image"
            ></v-img>
           </center>
          </v-avatar>
        </v-card>
      </v-col>
      <v-file-input
        class="mt-2"
        type="file"
        v-model="image"
        @update:model-value="checkfile"
        @change="onFileChange"
        variant="outlined"
        bg-color="primary"
        clearable
        accept="image/png, image/gif, image/jpeg"
        label="Manage Picture"
        density="compact"
        hide-details
      ></v-file-input>
    </v-col>
  </v-row>
</template>

<script setup>
import nuxtStorage from "nuxt-storage";
const props = defineProps({
  form_payload: {
    type: Object,
    default: () => {},
  },
});
const image = ref("");
const imageUrl = ref("/patient.jpg");
const gender = JSON.parse(nuxtStorage.localStorage.getData("sex"));
const suffix = JSON.parse(nuxtStorage.localStorage.getData("suffix"));
const nationality = JSON.parse(nuxtStorage.localStorage.getData("nationality"));
const religion = JSON.parse(nuxtStorage.localStorage.getData("religion"));
const civil_status = JSON.parse(nuxtStorage.localStorage.getData("civil-status"));
const industry = [
  "Healthcare",
  "Information Technology",
  "Education",
  "Manufacturing",
  "Retail",
  "Finance",
  "Real Estate",
  "Construction",
  "Transportation",
  "Others",
];
const work_level = ["Entry Level", "Supervisor", "Manager", "Executive", "Others"];

const createImage = (file) => {
  if (!file || !(file instanceof Blob)) {
    console.error("Invalid file");
    return;
  }
  const reader = new FileReader();
  reader.onload = (e) => {
    imageUrl.value = e.target.result;
  };

  reader.readAsDataURL(file);
};
const onFileChange = (event) => {
  const file = event.target.files[0];
  if (!file) {
    return (imageUrl.value = "");
  }
  createImage(file);
};
const checkfile = () => {
  if (image.value == "") {
    imageUrl.value = "";
  }
};
</script>

<style scoped></style>
