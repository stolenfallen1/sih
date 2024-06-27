<template>
  <v-dialog
    :model-value="open_medical_service_type_form"
    rounded="lg"
    @update:model-value="closeDialog"
    scrollable
    max-width="600px"
  >
    <form @submit.prevent="handleSubmit">
      <v-card rounded="lg">
        <v-toolbar density="compact" color="#107bac" hide-details>
          <v-toolbar-title>Medical Service Type Details</v-toolbar-title>
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
                density="compact"
                variant="outlined"
              ></v-text-field>
            </v-col>
            <v-col cols="12">
              <v-textarea 
                label="Remarks"
                variant="outlined"
                hide-details
                density="compact"
              ></v-textarea>
            </v-col>
            <v-col cols="12">
              <v-checkbox 
                v-model="is_active"
                label="Active"
                hide-details
                density="compact"
              ></v-checkbox>
            </v-col>
            <v-col cols="6">
              <v-text-field
                label="Allocated Beds (Pay)"
                hide-details
                density="compact"
                variant="outlined"
              ></v-text-field>
            </v-col>
            <v-col cols="6">
              <v-text-field
              label="Allocated Beds (Service)"
                hide-details
                density="compact"
                variant="outlined"
              ></v-text-field>
            </v-col>
          </v-row>
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions>
          <v-btn color="blue-darken-1 border border-info" @click="closeDialog"> Close </v-btn>
          <v-spacer></v-spacer>
          <v-btn class="bg-primary text-white" type="submit">Submit</v-btn>
        </v-card-actions>
      </v-card>
    </form>
  </v-dialog>
</template>

<script setup>
const props = defineProps({
  open_medical_service_type_form: {
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

const is_active = ref(true)

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
