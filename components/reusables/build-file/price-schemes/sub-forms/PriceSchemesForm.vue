<template>
  <v-dialog
    :model-value="open_form_dialog"
    rounded="lg"
    @update:model-value="closeDialog"
    scrollable
    max-width="600px"
  >
  <form @submit.prevent="handleSubmit">
    <v-card rounded="lg">
        <v-toolbar color="#107bac" hide-details density="compact">
          <v-toolbar-title>Price Scheme Details</v-toolbar-title>
          <v-btn color="white" @click="closeDialog">
              <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-toolbar>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="5">
                <v-autocomplete
                  item-title="description"
                  item-value="id"
                  label="Standard"
                  :items="msc_price_group"
                  v-model="payload.msc_price_group_id"
                  hide-details
                  density="compact"
                  variant="outlined"
                ></v-autocomplete>
              </v-col>
              <v-col cols="7">
                <v-text-field
                  label="Description"
                  required
                  hide-details
                  v-model="payload.description"
                  density="compact"
                  variant="outlined"
                ></v-text-field>
              </v-col>
              <v-col cols="5">
                <v-text-field
                  label="Item ID"
                  hide-details
                  readonly
                  v-model="payload.id"
                  density="compact"
                  variant="outlined"
                ></v-text-field>
              </v-col>
              <v-col cols="7">
                <v-checkbox
                  class="mt-0 mb-0"
                  v-model="payload.isactive"
                  hide-details
                  label="Status"
                ></v-checkbox>
              </v-col>
              <!-- <v-col cols="12">
                            <v-card class="pa-4"> 
                                <v-list-subheader inset>
                                    Important
                                </v-list-subheader>
                                <p>Price structure for items and services will be generated when creating new pricing scheme. It will take a minute ( more or less ) - depending on the number of items and services - to complete this process</p>
                            </v-card>
                        </v-col> -->
            </v-row>
          </v-container>
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
  open_form_dialog: {
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
  msc_price_group: {
    type: Array,
    default: () => [],
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
