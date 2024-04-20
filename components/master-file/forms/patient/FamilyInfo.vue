<template>
  <v-row>
    <v-col cols="12">
      <v-card density="compact" min-height="20vh">
        <v-toolbar density="compact" color="#2a73c5">
          <v-card-title class="d-flex align-center pe-2">
            <v-icon icon="mdi-form-select"></v-icon> &nbsp; Spouse Information
            <v-spacer></v-spacer>
          </v-card-title>
        </v-toolbar>
        <v-divider></v-divider>
        <v-card-text>
          <v-row no-gutters>
            <v-col cols="4" class="pr-1">
              <v-text-field
                label="Spouse Name"
                type="text"
                hide-details
                density="compact"
                variant="outlined"
              ></v-text-field>
            </v-col>
            <v-col cols="3" class="pr-1">
              <v-text-field
                label="Spouse Occupation"
                type="text"
                hide-details
                density="compact"
                variant="outlined"
              ></v-text-field>
            </v-col>
            <v-col cols="2" class="pr-1">
              <v-text-field
                label="Birth Date "
                type="date"
                hide-details
                density="compact"
                variant="outlined"
              ></v-text-field>
            </v-col>
            <v-col cols="3" class="pr-1">
              <v-text-field
                label="Telephone No."
                hide-details
                density="compact"
                variant="outlined"
              ></v-text-field>
            </v-col>
            <v-col cols="4" class="pr-1 pt-2">
              <v-text-field
                label="Email"
                hide-details
                density="compact"
                variant="outlined"
              ></v-text-field>
            </v-col>
            <v-col cols="3" class="pr-1 pt-2">
              <v-text-field
                label="TIN"
                hide-details
                density="compact"
                variant="outlined"
              ></v-text-field>
            </v-col>
            <v-col cols="2" class="pr-1 pt-2">
              <v-text-field
                label="Marriage Date "
                type="date"
                hide-details
                density="compact"
                variant="outlined"
              ></v-text-field>
            </v-col>
            <v-col cols="12" class="pt-1">
              <v-text-field
                label="Address"
                type="text"
                hide-details
                density="compact"
                variant="outlined"
              ></v-text-field>
            </v-col>
          </v-row>
        </v-card-text>
      </v-card>
    </v-col>
    <v-col cols="6">
      <v-card density="compact" min-height="20vh">
        <v-card-title class="d-flex align-center pe-2">
          <v-icon icon="mdi-form-select"></v-icon> &nbsp; Father's Information
          <v-spacer></v-spacer>
        </v-card-title>
        <v-divider></v-divider>
        <v-card-text>
          <v-row no-gutters>
            <v-col cols="9" class="pr-1">
              <v-text-field
                label="Full Name"
                type="text"
                hide-details
                density="compact"
                variant="outlined"
              ></v-text-field>
            </v-col>
            <v-col cols="3" class="pr-1">
              <v-text-field
                label="Birth Date "
                type="date"
                hide-details
                density="compact"
                variant="outlined"
              ></v-text-field>
            </v-col>
            <v-col cols="4" class="pr-1 pt-2">
              <v-text-field
                label="Occupation"
                hide-details
                density="compact"
                variant="outlined"
              ></v-text-field>
            </v-col>
            <v-col cols="4" class="pr-1 pt-2">
              <v-text-field
                label="Contact No."
                hide-details
                density="compact"
                variant="outlined"
              ></v-text-field>
            </v-col>
            <v-col cols="4" class="pr-1 pt-2">
              <v-text-field
                label="Email"
                hide-details
                density="compact"
                variant="outlined"
              ></v-text-field>
            </v-col>
            <v-col cols="12" class="pr-1 pt-2">
              <v-text-field
                label="Birth Place"
                hide-details
                density="compact"
                variant="outlined"
              ></v-text-field>
            </v-col>
            <v-col cols="12" class="pr-1 pt-2">
              <v-text-field
                label="Address"
                hide-details
                density="compact"
                variant="outlined"
              ></v-text-field>
            </v-col>
          </v-row>
        </v-card-text>
      </v-card>
    </v-col>
    <v-col cols="6">
      <v-card density="compact" min-height="20vh">
        <v-card-title class="d-flex align-center pe-2">
          <v-icon icon="mdi-form-select"></v-icon> &nbsp; Mother's Information
          <v-spacer></v-spacer>
        </v-card-title>
        <v-divider></v-divider>
        <v-card-text>
          <v-row no-gutters>
            <v-col cols="9" class="pr-1">
              <v-text-field
                label="Full Name"
                type="text"
                hide-details
                density="compact"
                variant="outlined"
              ></v-text-field>
            </v-col>
            <v-col cols="3" class="pr-1">
              <v-text-field
                label="Birth Date "
                type="date"
                hide-details
                density="compact"
                variant="outlined"
              ></v-text-field>
            </v-col>
            <v-col cols="4" class="pr-1 pt-2">
              <v-text-field
                label="Occupation"
                hide-details
                density="compact"
                variant="outlined"
              ></v-text-field>
            </v-col>
            <v-col cols="4" class="pr-1 pt-2">
              <v-text-field
                label="Contact No."
                hide-details
                density="compact"
                variant="outlined"
              ></v-text-field>
            </v-col>
            <v-col cols="4" class="pr-1 pt-2">
              <v-text-field
                label="Email"
                hide-details
                density="compact"
                variant="outlined"
              ></v-text-field>
            </v-col>
            <v-col cols="12" class="pr-1 pt-2">
              <v-text-field
                label="Birth Place"
                hide-details
                density="compact"
                variant="outlined"
              ></v-text-field>
            </v-col>
            <v-col cols="12" class="pr-1 pt-2">
              <v-text-field
                label="Address"
                hide-details
                density="compact"
                variant="outlined"
              ></v-text-field>
            </v-col>
          </v-row>
        </v-card-text>
      </v-card>
    </v-col>
    <v-col cols="12">
      <v-card density="compact" min-height="20vh">
        <v-card-title class="d-flex align-center pe-2">
          <v-icon icon="mdi-form-select"></v-icon> &nbsp; Other's Information
          <v-spacer></v-spacer>
        </v-card-title>
        <v-divider></v-divider>
        <v-card-text>
          <v-table density="compact">
            <thead>
              <tr>
                <th v-for="(header, index) in other_family_headers" :key="index">
                  {{ header }}
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td v-for="(header, index) in other_family_headers" :key="index">
                  <template v-if="showIdTextFields">
                    <v-text-field
                      v-model="idFields[index]"
                      type="text"
                      density="compact"
                      variant="outlined"
                    ></v-text-field>
                  </template>
                </td>
              </tr>
            </tbody>
          </v-table>
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>
</template>

<script setup>
import AddressForm from "./sub-forms/AddressForm.vue";

let tab = ref("1");
const other_family_headers = [
  "Relationship",
  "Last name",
  "First name",
  "Middle name",
  "Suffix name",
  "Birth Date",
  "Contact No.",
];
const showIdTextFields = ref(false);
const idFields = ref([]);

const address_form_dialog = ref(false);
const address_form_type = ref();

const addIdField = () => {
  if (!showIdTextFields.value) {
    showIdTextFields.value = true;
    idFields.value = Array(idHeaders.length).fill("");
  } else {
    // Save the data or perform any other action needed
    console.log("Saving ID Information:", idFields.value);
    showIdTextFields.value = false;
  }
};
const deleteIdField = () => {
  showIdTextFields.value = false;
  idFields.value = [];
};

const handleOpenAddressForm = (type) => {
  address_form_type.value = type;
  address_form_dialog.value = true;
  alert(`Address Form Opened. Type: ${type}`);
};

const closeAddressForm = () => {
  address_form_dialog.value = false;
};

const handleAddressSubmission = () => {
  alert(`Address Submitted. Type: ${address_form_type.value}`);
};
</script>

<style scoped></style>
