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
        <v-toolbar density="compact" color="#6984ff" hide-details>
          <v-toolbar-title>Discount Scheme Details</v-toolbar-title>
          <v-btn color="white" @click="closeDialog">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-toolbar>
        <v-divider></v-divider>

        <v-card-text>
          <v-row>
            <v-col cols="6">
              <v-text-field
                label="Description"
                hide-details
                readonly
                density="compact"
                variant="outlined"
              ></v-text-field>
            </v-col>
            <v-col cols="6">
              <v-autocomplete
                label="Discount Basis"
                :items="discount_basis"
                hide-details
                clearable
                density="compact"
                variant="outlined"
            ></v-autocomplete>
            </v-col>
            <v-col cols="6" class="form-col">
              <v-autocomplete
                label="Room Class"
                :items="room_class"
                hide-details
                clearable
                density="compact"
                variant="outlined"
            ></v-autocomplete>
            </v-col>
            <v-col cols="6" class="form-col">
              <v-autocomplete
                label="Journal Account"
                :items="journal_account"
                hide-details
                clearable
                density="compact"
                variant="outlined"
            ></v-autocomplete>
            </v-col>
            <v-col cols="4">
              <v-checkbox 
                label="Active?"
                hide-details
                density="compact"
              ></v-checkbox>
            </v-col>
            <v-col cols="4">
              <v-checkbox 
                label="Stockholders Discount?"
                hide-details
                density="compact"
              ></v-checkbox>
            </v-col>
            <v-col cols="4">
              <v-checkbox 
                label="PWD Discount?"
                hide-details
                density="compact"
              ></v-checkbox>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12">
              <v-card elevation="4">
                <v-toolbar color="white" flat density="compact">
                  <v-toolbar-title style="font-size: medium; text-align: center;">Default Discount to be Applied on Items. Services</v-toolbar-title>
                </v-toolbar>
                <v-divider></v-divider>
                <v-card-text>
                  <v-col col="12" class="form-col">
                    <v-text-field
                      label="Drugs and Medicines"
                      type="number"
                      hide-details
                      density="compact"
                      variant="outlined"
                    ></v-text-field>
                  </v-col>
                  <v-col col="12" class="form-col">
                    <v-text-field
                      label="Supplies"
                      type="number"
                      hide-details
                      density="compact"
                      variant="outlined"
                    ></v-text-field>
                  </v-col>
                  <v-col col="12" class="form-col">
                    <v-text-field
                      label="Examinations"
                      type="number"
                      hide-details
                      density="compact"
                      variant="outlined"
                    ></v-text-field>
                  </v-col>
                  <v-col col="12" class="form-col">
                    <v-text-field
                      label="Procedures"
                      type="number"
                      hide-details
                      density="compact"
                      variant="outlined"
                    ></v-text-field>
                  </v-col>
                  <v-col col="12" class="form-col">
                    <v-text-field
                      label="Others"
                      type="number"
                      hide-details
                      density="compact"
                      variant="outlined"
                    ></v-text-field>
                  </v-col>
                  <v-col col="12" class="form-col">
                    <v-text-field
                      label="Adjustments"
                      type="number"
                      hide-details
                      density="compact"
                      variant="outlined"
                    ></v-text-field>
                  </v-col>
                  <v-col col="12" class="form-col">
                    <v-text-field
                      label="Readers Fee"
                      type="number"
                      hide-details
                      density="compact"
                      variant="outlined"
                    ></v-text-field>
                  </v-col>
                </v-card-text>
              </v-card>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12">
              <v-card elevation="4">
                <v-toolbar color="white" flat density="compact">
                  <v-toolbar-title style="font-size: medium; text-align: center;">Important</v-toolbar-title>
                </v-toolbar>
                <v-divider></v-divider>
                <v-card-text>
                  <v-col col="12">
                    <p>Upon Creation of new discount scheme, changes on the discount rate on the items and services won't take effect immediately. Discounts on the items and services must also be set in the Manage Item Discounts</p>
                  </v-col>
                </v-card-text>
              </v-card>
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

const discount_basis = []
const room_class = []
const journal_account = []

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

<style scoped>
.form-col {
    margin-top: -16px !important;
}
</style>
