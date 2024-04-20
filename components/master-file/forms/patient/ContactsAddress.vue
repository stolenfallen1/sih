<template>
  <v-row>
    <v-col lg="12">
      <v-card density="compact" min-height="20vh">
        <v-toolbar density="compact" color="#2a73c5">
          <v-card-title class="d-flex align-center pe-2">
            <v-icon icon="mdi-form-select"></v-icon> &nbsp; Contact and Address
            Information
            <v-spacer></v-spacer>
          </v-card-title>
        </v-toolbar>
        <v-divider></v-divider>
        <v-card-text>
          <v-row no-gutters>
            <v-col cols="3" class="pr-1">
              <v-text-field
                label="Email"
                type="text"
                hide-details
                v-model="form_payload.email_address"
                density="compact"
                variant="outlined"
              ></v-text-field>
            </v-col>
            <v-col cols="3" class="pr-1">
              <v-text-field
                label="Telephone No"
                type="text"
                hide-details
                v-model="form_payload.telephone_number"
                density="compact"
                variant="outlined"
              ></v-text-field>
            </v-col>
            <v-col cols="3" class="pr-1">
              <v-text-field
                label="Mobile No"
                type="text"
                hide-details
                v-model="form_payload.mobile_number"
                density="compact"
                variant="outlined"
              ></v-text-field>
            </v-col>
            <v-col cols="3">
              <v-checkbox
                hide-details
                label="Send patient result(s) online?"
              ></v-checkbox>
            </v-col>
            <v-col cols="12">
              <v-text-field
                label="Address"
                type="text"
                v-model="form_payload.bldgstreet"
                hide-details
                density="compact"
                variant="outlined"
              ></v-text-field>
            </v-col>
          </v-row>
        </v-card-text>
      </v-card>
    </v-col>
    <v-col lg="6">
      <v-card density="compact" min-height="30vh">
        <v-card-title class="d-flex align-center pe-2">
          <v-icon icon="mdi-form-select"></v-icon> &nbsp; Next of Kin Information
          <v-spacer></v-spacer>
        </v-card-title>
        <v-divider></v-divider>
        <v-card-text>
          <v-row>
            <v-col cols="6">
              <v-text-field
                label="Full Name"
                type="text"
                hide-details
                density="compact"
                variant="outlined"
              ></v-text-field>
            </v-col>
            <v-col cols="6">
              <v-text-field
                label="Relationship"
                type="text"
                hide-details
                density="compact"
                variant="outlined"
              ></v-text-field>
            </v-col>
            <v-col cols="6">
              <v-text-field
                label="Telephone No"
                type="text"
                hide-details
                density="compact"
                variant="outlined"
              ></v-text-field>
            </v-col>
            <v-col cols="6">
              <v-text-field
                label="Email"
                type="text"
                hide-details
                density="compact"
                variant="outlined"
              ></v-text-field>
            </v-col>
            <v-col cols="12">
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
    <v-col lg="6">
      <v-card density="compact" min-height="30vh">
        <v-card-title class="d-flex align-center pe-2">
          <v-icon icon="mdi-form-select"></v-icon> &nbsp; In-charge of Account
          <v-spacer></v-spacer>
        </v-card-title>
        <v-divider></v-divider>
        <v-card-text>
          <v-row>
            <v-col cols="6">
              <v-text-field
                label="Full Name"
                type="text"
                hide-details
                density="compact"
                variant="outlined"
              ></v-text-field>
            </v-col>
            <v-col cols="6">
              <v-text-field
                label="Relationship"
                type="text"
                hide-details
                density="compact"
                variant="outlined"
              ></v-text-field>
            </v-col>
            <v-col cols="6">
              <v-text-field
                label="Telephone No"
                type="text"
                hide-details
                density="compact"
                variant="outlined"
              ></v-text-field>
            </v-col>
            <v-col cols="6">
              <v-text-field
                label="Email"
                type="text"
                hide-details
                density="compact"
                variant="outlined"
              ></v-text-field>
            </v-col>
            <v-col cols="12">
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
    <v-col lg="6">
      <v-card density="compact" min-height="30vh">
        <v-card-title class="d-flex align-center pe-2">
          <v-icon icon="mdi-form-select"></v-icon> &nbsp; Contact Person in case of
          Emergency Information
          <v-spacer></v-spacer>
        </v-card-title>
        <v-divider></v-divider>
        <v-card-text>
          <v-row>
            <v-col cols="12">
              <v-text-field
                label="Contact Name"
                type="text"
                hide-details
                density="compact"
                variant="outlined"
              ></v-text-field>
            </v-col>
            <v-col cols="6">
              <v-text-field
                label="Relationship"
                type="text"
                hide-details
                density="compact"
                variant="outlined"
              ></v-text-field>
            </v-col>
            <v-col cols="6">
              <v-text-field
                label="Contact Occupation"
                type="text"
                hide-details
                density="compact"
                variant="outlined"
              ></v-text-field>
            </v-col>
            <v-col cols="6">
              <v-text-field
                label="Telephone No"
                type="text"
                hide-details
                density="compact"
                variant="outlined"
              ></v-text-field>
            </v-col>
            <v-col cols="6">
              <v-text-field
                label="Email"
                type="text"
                hide-details
                density="compact"
                variant="outlined"
              ></v-text-field>
            </v-col>
            <v-col cols="12">
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
    <v-col lg="6">
      <v-card density="compact">
        <v-card-title class="d-flex align-center pe-2">
          <v-icon icon="mdi-form-select"></v-icon> &nbsp; Employment Information
          Information
          <v-spacer></v-spacer>
        </v-card-title>
        <v-divider></v-divider>
        <v-card-text>
          <v-row>
            <v-col cols="12">
              <v-text-field
                label="Employer Name"
                type="text"
                hide-details
                density="compact"
                variant="outlined"
              ></v-text-field>
            </v-col>
            <v-col cols="6">
              <v-text-field
                label="Position"
                type="text"
                hide-details
                density="compact"
                variant="outlined"
              ></v-text-field>
            </v-col>

            <v-col cols="6">
              <v-text-field
                label="Telephone No"
                type="text"
                hide-details
                density="compact"
                variant="outlined"
              ></v-text-field>
            </v-col>
            <v-col cols="6">
              <v-text-field
                label="Email"
                type="text"
                hide-details
                density="compact"
                variant="outlined"
              ></v-text-field>
            </v-col>
            <v-col cols="12">
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
  </v-row>
</template>

<script setup>
import AddressForm from "./sub-forms/AddressForm.vue";
const props = defineProps({
    form_payload:{
        type:Object,
        default:()=>{}
    }
});
let tab_option1 = ref("1");
let tab_option2 = ref("1");
const address_form_dialog = ref(false);
const address_form_type = ref();
const items = ref([]);

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
