<template>
  <v-dialog
    :model-value="open_form_dialog"
    @update:model-value="closeDialog"
    rounded="lg"
    scrollable
    max-width="600px"
  >
    <form @submit.prevent="handleSubmit">
      <v-card rounded="lg">
        <v-toolbar density="compact" color="#6984ff" hide-details>
          <v-toolbar-title>Adjustment Category Details</v-toolbar-title>
          <v-btn color="white" @click="closeDialog">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-toolbar>
        <v-divider></v-divider>

        <v-card-text>
          <v-row>
            <v-col cols="4">
              <v-text-field
                label="Adjustment Code"
                hide-details
                readonly
                density="compact"
                variant="outlined"
              ></v-text-field>
            </v-col>
            <v-col cols="12">
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
                  label="Journal Account"
                  readonly
                  :items="journal_account"
                  v-model="journal_account"
                  hide-details
                  clearable
                  density="compact"
                  variant="outlined"
              ></v-autocomplete>
            </v-col>
            <v-col cols="12">
              <v-card elevation="4">
                <v-card-text>
                  <v-radio-group  hide-details density="compact">
                      <v-list-subheader inset>
                        Debit/Credit Category
                      </v-list-subheader>
                      <v-checkbox label="Debit" value="0" hide-details density="compact"></v-checkbox>
                      <v-checkbox label="Credit" value="1" hide-details density="compact"></v-checkbox>
                  </v-radio-group>
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

const journal_account = ["Undefined"]

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
