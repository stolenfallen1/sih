<template>
  <v-dialog
    :model-value="open_medication_routes_form"
    rounded="lg"
    persistent
    scrollable
    max-width="700px"
  >
    <form @submit.prevent="handleSubmit">
      <v-card rounded="lg">
        <v-toolbar density="compact" color="#6984ff" hide-details>
          <v-toolbar-title>Medication Route Details</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-btn color="white" @click="closeDialog">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-toolbar>
        <v-divider></v-divider>
        <v-card-text>
          <v-row>
            <v-col cols="4">
              <v-text-field
                label="Code"
                hide-details
                readonly
                v-model="payload.id"
                density="compact"
                variant="outlined"
              ></v-text-field>
            </v-col>
            <v-col cols="8">
              <v-text-field
                label="Route Name"
                hide-details
                v-model="payload.route_name"
                density="compact"
                variant="outlined"
                required
              ></v-text-field>
            </v-col>
            <v-col cols="12">
              <v-textarea
                label="Route Description"
                v-model="payload.route_description"
                hide-details
                variant="outlined"
              ></v-textarea>
            </v-col>
            <v-col cols="4">
              <v-checkbox
                class="mt-0 mb-0"
                v-model="payload.isActive"
                hide-details
                label="Is Active"
              ></v-checkbox>
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
  open_medication_routes_form: {
    type: Boolean,
    default: () => false,
    required: true,
  },
  payload: {
    type: Object,
    default: () => {},
  },
  isloading: {
    type: Boolean,
    default: () => false,
  },
});

const emits = defineEmits(["handle-submit", "close-dialog"]);
const handleSubmit = () => {
  console.log(props.payload);
  emits("handle-submit", props.payload);
};

const closeDialog = () => {
  emits("close-dialog");
};
</script>

<style scoped></style>
