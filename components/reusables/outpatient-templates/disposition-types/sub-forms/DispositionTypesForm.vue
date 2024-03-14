<template>
  <v-dialog
    :model-value="open_form_dialog"
    rounded="lg"
    persistent
    scrollable
    max-width="600px"
  >
    <form @submit.prevent="handleSubmit">
      <v-card rounded="lg">
        <v-toolbar density="compact" color="#6984ff" hide-details>
          <v-toolbar-title>Disposition Details</v-toolbar-title>
          <v-btn color="white" @click="closeDialog">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-toolbar>
        <v-divider></v-divider>

        <v-card-text>
          <v-row>
            <v-col cols="12">
              <v-text-field
                label="Description"
                hide-details
                required
                density="compact"
                variant="outlined"
              ></v-text-field>
            </v-col>
            <v-col cols="12">
              <v-card elevation="4">
                <v-card-text>
                  <v-radio-group  hide-details density="compact">
                      <v-list-subheader inset>
                        Applicable Registry
                      </v-list-subheader>
                      <v-checkbox label="Emergency" value="0" hide-details density="compact"></v-checkbox>
                      <v-checkbox label="Inpatient" value="1" hide-details density="compact"></v-checkbox>
                      <v-checkbox label="Outpatient" value="2" hide-details density="compact"></v-checkbox>
                  </v-radio-group>
                </v-card-text>
              </v-card>
            </v-col>
            <v-col cols="12">
              <v-checkbox label="Active" hide-details density="compact"></v-checkbox>
            </v-col>
            <v-col cols="12">
              <v-autocomplete
                  label="PHIC Disposition Code"
                  :items="phic_disposition_code"
                  hide-details
                  clearable
                  density="compact"
                  variant="outlined"
              ></v-autocomplete>
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
</template>

<script setup>
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

const phic_disposition_code = []

const emits = defineEmits(["handle-submit", "close-dialog"]);
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
