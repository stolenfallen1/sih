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
              hide-details
              density="compact"
              variant="outlined"
            ></v-text-field>
          </v-col>
          <v-col lg="4" class="pa-1">
            <v-text-field
              label="First Name"
              type="text"
              hide-details
              density="compact"
              variant="outlined"
            ></v-text-field>
          </v-col>
          <v-col lg="4" class="pa-1">
            <v-text-field
              label="Middle Name"
              type="text"
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
              hide-details
              density="compact"
              variant="outlined"
            ></v-autocomplete>
          </v-col>
          <v-col lg="2" class="pa-1">
            <v-autocomplete
              label="Sex"
              type="text"
              hide-details
              density="compact"
              variant="outlined"
            ></v-autocomplete>
          </v-col>
          <v-col lg="3" class="pa-1">
            <v-text-field
              label="Birthdate"
              type="date"
              hide-details
              density="compact"
              variant="outlined"
            ></v-text-field>
          </v-col>
          <v-col lg="1" class="pa-0">
            <v-text-field
              class="mt-1"
              label="Age"
              hide-details
              density="compact"
              variant="outlined"
            ></v-text-field>
          </v-col>
          <v-col lg="4" class="pa-1">
            <v-text-field
              label="Birth Place"
              type="text"
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
              hide-details
              density="compact"
              variant="outlined"
            ></v-autocomplete>
          </v-col>
          <v-col lg="4" class="pa-1">
            <v-autocomplete
              label="Nationality "
              type="text"
              hide-details
              density="compact"
              variant="outlined"
            ></v-autocomplete>
          </v-col>
          <v-col lg="4" class="pa-1">
            <v-autocomplete
              label="Religion"
              type="text"
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
        <v-card >
          <v-toolbar density="compact" color="primary">
            <v-card-title class="d-flex align-center pe-2">
              <v-icon icon="mdi-account-circle-outline"></v-icon> &nbsp;Profile
              <v-spacer></v-spacer>
            </v-card-title>
          </v-toolbar>
          <v-divider></v-divider>
          <v-avatar rounded="0" size="200">
            <v-img cover width="100%" alt="Selected Image"></v-img>
          </v-avatar>
        </v-card>
      </v-col>
      <v-file-input
        class="mt-2"
        type="file"
        variant="outlined"
        bg-color="primary"
        clearable
        label="Manage Picture"
        density="compact"
        hide-details
      ></v-file-input>
    </v-col>
  </v-row>
</template>

<script setup>
const suffix = ["Available", "Not Available"];
const civil_status = ["Single", "Married", "Widowed"];
const gender = ["Male", "Female"];
const nationality = ["Filipino", "Non-Filipino", "Black", "Brown", "Insik"];
const religion = ["Catholic", "Muslim", "Iglesia ni Cristo", "Born Again"];
const blood_type = ["A", "B", "AB", "O"];
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
</script>

<style scoped></style>
