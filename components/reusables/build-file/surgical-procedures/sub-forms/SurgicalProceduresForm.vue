<template>
  <v-dialog
    :model-value="open_form_dialog"
rounded="lg"
@update:model-value="closeForm"
    scrollable
    max-width="700px"
  >
    <form @submit.prevent="handleSubmit">
      <v-card rounded="lg">
        <v-toolbar density="compact" color="#6984ff" hide-details>
          <v-toolbar-title>Surgical Procedure Details</v-toolbar-title>
          <v-btn color="white" @click="closeDialog">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-toolbar>
        <v-divider></v-divider>

        <v-card-text>
          <v-row>
            <v-col cols="2">
              <v-text-field
                label="Code"
                readonly
                hide-details
                density="compact"
                variant="outlined"
              ></v-text-field>
            </v-col>
            <v-col cols="10">
              <v-text-field
                label="Description"
                required
                hide-details
                density="compact"
                variant="outlined"
              ></v-text-field>
            </v-col>
            <v-col cols="12">
              <v-autocomplete
                  label="Category"
                  hide-details
                  clearable
                  density="compact"
                  variant="outlined"
              ></v-autocomplete>
            </v-col>
            <v-col cols="6">
              <v-autocomplete
                  label="OR Type"
                  hide-details
                  clearable
                  density="compact"
                  variant="outlined"
              ></v-autocomplete>
            </v-col>
            <v-col cols="6">
              <v-autocomplete
                  label="Surgical Type"
                  hide-details
                  clearable
                  density="compact"
                  variant="outlined"
              ></v-autocomplete>
            </v-col>
            <v-col cols="6">
              <v-text-field
                label="RVS Code"
                required
                hide-details
                density="compact"
                variant="outlined"
              ></v-text-field>
            </v-col>
            <v-col cols="6">
              <v-text-field
                label="RUV Value"
                type="number"
                hide-details
                density="compact"
                variant="outlined"
              ></v-text-field>
            </v-col>
            <v-col cols="12">
              <v-autocomplete
                  label="Special Procedure"
                  hide-details
                  clearable
                  density="compact"
                  variant="outlined"
              ></v-autocomplete>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="3">
              <v-checkbox 
                v-model="is_case_rate"
                label="Is Case Rate?"
                density="compact"
                hide-details 
              ></v-checkbox>
            </v-col>
            <v-col cols="5">
              <v-autocomplete
                  label=""
                  readonly
                  hide-details
                  density="compact"
                  variant="outlined"
              ></v-autocomplete>
            </v-col>
            <v-col cols="4">
              <v-btn :disabled="is_case_rate === true ? false : true" @click="openCaseRateList">Choose case rate</v-btn>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="6">
              <v-card elevation="4">
                <v-toolbar density="compact" hide-details color="#FFF">
                  <v-toolbar-title style="font-size: medium; text-align: center;">First Case Rate</v-toolbar-title>
                </v-toolbar>
                <v-card-text>
                  <v-col cols="12">
                    <v-text-field
                      label="Hospital Bill"
                      hide-details
                      type="number"
                      density="compact"
                      variant="outlined"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12">
                    <v-text-field
                      label="Professional Fee"
                      hide-details
                      type="number"
                      density="compact"
                      variant="outlined"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12">
                    <v-text-field
                      label="Total"
                      readonly
                      hide-details
                      density="compact"
                      variant="outlined"
                    ></v-text-field>
                  </v-col>
                </v-card-text>
              </v-card>
            </v-col>
            <v-col cols="6">
              <v-card elevation="4">
                <v-toolbar density="compact" hide-details color="#FFF">
                  <v-toolbar-title style="font-size: medium; text-align: center;">Second Case Rate</v-toolbar-title>
                </v-toolbar>
                <v-card-text>
                  <v-col cols="12">
                    <v-text-field
                      label="Hospital Bill"
                      type="number"
                      hide-details
                      density="compact"
                      variant="outlined"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12">
                    <v-text-field
                      label="Professional Fee"
                      hide-details
                      type="number"
                      density="compact"
                      variant="outlined"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12">
                    <v-text-field
                      label="Total"
                      readonly
                      hide-details
                      density="compact"
                      variant="outlined"
                    ></v-text-field>
                  </v-col>
                </v-card-text>
              </v-card>
            </v-col>
          </v-row>
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions>
          <v-btn color="blue-darken-1" @click="closeDialog"> Close </v-btn>
          <v-spacer></v-spacer>
          <v-btn class="bg-primary text-white" type="submit">Submit</v-btn>
        </v-card-actions>
      </v-card>
    </form>
  </v-dialog>
  <case-rate-list :open_case_rate_list="open_case_rate_list" @close-dialog="closeCaseRateList" @handle-submit="saveCaseRate" />
</template>

<script setup>
import CaseRateList from "./CaseRateList.vue";

const props = defineProps({
  open_form_dialog: {
    type: Boolean,
    default: () => false,
    required: true,
  },
  // payload: {
  //   type: Object,
  //   default: () => {},
  // },
  // isloading: {
  //   type: Boolean,
  //   default: () => false,
  // },
});

const is_case_rate = ref(false)
const open_case_rate_list = ref(false)

const emits = defineEmits(["handle-submit", "close-dialog"]);

const openCaseRateList = () => {
  open_case_rate_list.value = true;
}

const closeCaseRateList = () => {
  open_case_rate_list.value = false;
}

const saveCaseRate = () => {
  alert("Saved");
}

const handleSubmit = () => {
  // console.log(props.payload);
  // emits("handle-submit", props.payload);
  emits("handle-submit");
};

const closeDialog = () => {
  emits("close-dialog");
};
</script>

<style scoped></style>
