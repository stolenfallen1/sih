<template>
  <v-dialog
    :model-value="dosage_form"
    rounded="lg"
    @update:model-value="closeDialog"
    scrollable
    max-width="600px"
  >
    <form @submit.prevent="handleSubmit">
      <v-card rounded="lg">
        <v-toolbar density="compact" color="#6984ff" hide-details>
          <v-toolbar-title>Dosage Details</v-toolbar-title>
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
                label="ID"
                hide-details
                readonly
                v-model="payload.id"
                density="compact"
                variant="outlined"
              ></v-text-field>
            </v-col>
            <v-col cols="8">
              <v-text-field
                label="Form Name"
                hide-details
                v-model="payload.form_name"
                density="compact"
                variant="outlined"
              ></v-text-field>
            </v-col>
            <v-col cols="4">
              <v-text-field
                label="Form Code"
                hide-details
                v-model="payload.form_code"
                density="compact"
                variant="outlined"
              ></v-text-field>
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
          <v-btn class="bg-primary text-white" :loading="isloading" type="submit"
            >Submit</v-btn
          >
        </v-card-actions>
      </v-card>
    </form>

    <!-- <v-toolbar color="#6984ff" hide-details density="compact">
            <v-toolbar-title>Dosage Template Details</v-toolbar-title>
        </v-toolbar>
        <v-card>
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
                    </v-row>
                </v-container>
            </v-card-text>
            <v-divider></v-divider>
            <v-card-actions>
                <v-btn color="blue-darken-1" @click="closeDialog"> Close </v-btn>
                <v-spacer></v-spacer>
                <v-btn class="bg-primary text-white" type="submit" @click="handleSubmit">Submit</v-btn>
            </v-card-actions>
        </v-card> -->
  </v-dialog>
</template>

<script setup>
const props = defineProps({
  dosage_form: {
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
