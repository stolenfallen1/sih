<template>
  <v-dialog
    :model-value="drug_admin_group"
    rounded="lg"
    persistent
    scrollable
    max-width="670px"
  >
    <form @submit.prevent="handleSubmit">
      <v-card rounded="lg">
        <v-toolbar density="compact" color="#6984ff" hide-details>
          <v-toolbar-title>Drug Admin Group Details</v-toolbar-title>
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
              ></v-text-field>
            </v-col>
            <v-col cols="12">
              <v-textarea
                label="Description"
                hide-details
                v-model="payload.route_description"
                density="compact"
                variant="outlined"
              ></v-textarea>
            </v-col>

            <v-col cols="4">
              <v-checkbox
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
          <v-btn class="bg-primary text-white" :loading="isloading" type="submit">Submit</v-btn>
        </v-card-actions>
      </v-card>
    </form>

    <!-- <v-card>
      <v-card-text>
        <v-container>
          <v-row>
            <v-col cols="12">
              <v-text-field
                variant="outlined"
                hide-details
                label="Description"
                density="compact"
              ></v-text-field>
            </v-col>
            <v-col cols="12">
              <v-text-field
                class="cursor-pointer"
                variant="outlined"
                hide-details
                label="Printer Path"
                density="compact"
                append-icon="mdi-printer"
                @click:append="openPrinterPath"
              ></v-text-field>
            </v-col>
          </v-row>
        </v-container>
      </v-card-text>
      <v-divider></v-divider>
      <v-card-actions>
        <v-btn color="blue-darken-1" @click="closeDialog"> Close </v-btn>
        <v-spacer></v-spacer>
        <v-btn class="bg-primary text-white" type="submit" @click="handleSubmit"
          >Submit</v-btn
        >
      </v-card-actions>
    </v-card> -->
    <!-- <print-details
      :printer_details="printer_details"
      @close-dialog="closePrinterPath"
      @handle-submit="handleSubmit"
    /> -->
  </v-dialog>
</template>

<script setup>
import PrintDetails from "./PrintDetails.vue";

const props = defineProps({
  drug_admin_group: {
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

const printer_details = ref(false);

const emits = defineEmits(["handle-submit", "close-dialog"]);
const handleSubmit = () => {
  console.log(props.payload);
  emits("handle-submit", props.payload);
};

const closeDialog = () => {
  emits("close-dialog");
};

const openPrinterPath = () => {
  printer_details.value = true;
};

const closePrinterPath = () => {
  printer_details.value = false;
};
</script>

<style scoped></style>
