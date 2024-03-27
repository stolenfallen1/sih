<template>
  <v-dialog
    :model-value="open_modalities_form"
    rounded="lg"
    @update:model-value="closeDialog"
    scrollable
    max-width="600px"
  >
    <form @submit.prevent="handleSubmit">
      <v-card>
        <v-toolbar color="#6984ff" hide-details density="compact">
          <v-toolbar-title>Modalities Details</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-btn color="white" @click="closeDialog">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-toolbar>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="5">
                <v-text-field
                  density="compact"
                  variant="outlined"
                  required
                  label="Modality"
                  v-model="payload.modality"
                  hide-details
                  placeholder="Enter Modality"
                  clearable
                ></v-text-field>
              </v-col>
              <v-col cols="7">
                <v-text-field
                  density="compact"
                  variant="outlined"
                  required
                  label="Description"
                  v-model="payload.modilaty_description"
                  hide-details
                  placeholder="Enter Description"
                  clearable
                ></v-text-field>
              </v-col>
              <v-col cols="5">
                <v-text-field
                  density="compact"
                  variant="outlined"
                  required
                  label="Code"
                  v-model="payload.id"
                  hide-details
                  readonly
                  placeholder="Enter Code"
                ></v-text-field>
              </v-col>
              <v-col cols="6">
                <v-checkbox
                  class="mb-0"
                  hide-details
                  v-model="payload.isActive"
                  label="Status"
                ></v-checkbox>
              </v-col>
            </v-row>
          </v-container>
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
  open_modalities_form: {
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
