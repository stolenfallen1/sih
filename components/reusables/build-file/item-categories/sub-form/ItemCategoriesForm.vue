<template>
  <v-dialog
    :model-value="open_form_dialog"
    rounded="lg"
    @update:model-value="closeDialog"
    scrollable
    max-width="550px"
  >
    <form @submit.prevent="handleSubmit">
      <v-card rounded="lg">
        <v-toolbar density="compact" color="#6984ff" hide-details>
          <v-toolbar-title>Item Category Details</v-toolbar-title>
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
              <v-autocomplete
                item-title="name"
                item-value="id"
                label="Item Group"
                :items="itemCategories"
                v-model="payload.invgroup_id"
                hide-details
                density="compact"
                variant="outlined"
              ></v-autocomplete>
            </v-col>
            <v-col cols="12">
              <v-text-field
                label="Category"
                hide-details
                v-model="payload.name"
                density="compact"
                variant="outlined"
              ></v-text-field>
            </v-col>
            <v-col cols="4">
              <v-checkbox
                v-model="payload.isactive"
                hide-details
                label="Status"
              ></v-checkbox>
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

    <!-- <v-toolbar color="#6984ff" hide-details density="compact">
      <v-toolbar-title>Item Category Details</v-toolbar-title>
    </v-toolbar>
    <v-card>
      <v-card-text>
        <v-row>
          <v-col cols="6">
            <v-card elevation="4">
              <v-list-subheader inset class="px-2 text-black">
                General Information
              </v-list-subheader>
              <v-divider></v-divider>
              <v-card-text>
                <v-row>
                  <v-col cols="12">
                    <v-autocomplete
                      readonly
                      label="Item Service Group"
                      hide-details
                      density="compact"
                      variant="outlined"
                    ></v-autocomplete>
                  </v-col>
                  <v-col cols="12">
                    <v-text-field
                      variant="outlined"
                      label="Description"
                      hide-details
                      density="compact"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12">
                    <v-autocomplete
                      readonly
                      label="Exam Group"
                      hide-details
                      density="compact"
                      variant="outlined"
                    ></v-autocomplete>
                  </v-col>
                </v-row>
              </v-card-text>
            </v-card>
          </v-col>
          <v-col cols="6">
            <v-card elevation="4" scrollable>
              <v-list-subheader inset class="px-2 text-black">
                Rebates Specification
              </v-list-subheader>
              <v-divider></v-divider>
              <v-card-text>
                <v-row>
                  <v-col cols="12">
                    <v-radio-group density="compact" hide-details>
                      <v-checkbox
                        label="Include in Calculating of Doctor's Annual Rebates"
                        density="compact"
                        hide-details
                      ></v-checkbox>
                      <v-checkbox
                        label="Inpatient Cases"
                        density="compact"
                        hide-details
                      ></v-checkbox>
                      <v-checkbox
                        label="Outpatient Cases"
                        density="compact"
                        hide-details
                      ></v-checkbox>
                      <v-checkbox
                        label="Emergency Cases"
                        density="compact"
                        hide-details
                      ></v-checkbox>
                    </v-radio-group>
                  </v-col>
                  <v-col cols="12">
                    <v-list-subheader inset>
                      Applicable Rate for Annual Rebates (%)
                    </v-list-subheader>
                    <v-text-field
                      readonly
                      type="number"
                      variant="outlined"
                      hide-details
                      density="compact"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12">
                    <v-list-subheader inset>
                      Applicable Rate for Requesting Physician (%)
                    </v-list-subheader>
                    <v-text-field
                      readonly
                      type="number"
                      variant="outlined"
                      hide-details
                      density="compact"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12">
                    <v-checkbox
                      label="Auto-update Items and Services Rebates Specification"
                      density="compact"
                      hide-details
                    ></v-checkbox>
                  </v-col>
                </v-row>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12">
            <v-card elevation="4">
              <v-list-subheader inset class="px-2 text-black">
                Journal Account Codes
              </v-list-subheader>
              <v-divider></v-divider>
              <v-card-text>
                <v-row>
                  <v-col cols="6">
                    <v-list-subheader inset class="px-2 text-black">
                      Inpatients
                    </v-list-subheader>
                    <v-row>
                      <v-col cols="12">
                        <v-autocomplete
                          readonly
                          label="Sales"
                          hide-details
                          density="compact"
                          variant="outlined"
                        ></v-autocomplete>
                      </v-col>
                      <v-col cols="12">
                        <v-autocomplete
                          readonly
                          label="Cost of Sales"
                          hide-details
                          density="compact"
                          variant="outlined"
                        ></v-autocomplete>
                      </v-col>
                    </v-row>
                    <v-list-subheader inset class="px-2 text-black">
                      Outpatients
                    </v-list-subheader>
                    <v-row>
                      <v-col cols="12">
                        <v-autocomplete
                          readonly
                          label="Sales"
                          hide-details
                          density="compact"
                          variant="outlined"
                        ></v-autocomplete>
                      </v-col>
                      <v-col cols="12">
                        <v-autocomplete
                          readonly
                          label="Cost of Sales"
                          hide-details
                          density="compact"
                          variant="outlined"
                        ></v-autocomplete>
                      </v-col>
                    </v-row>
                  </v-col>
                  <v-col cols="6">
                    <v-list-subheader inset class="px-2 text-black">
                      Emergencies
                    </v-list-subheader>
                    <v-row>
                      <v-col cols="12">
                        <v-autocomplete
                          readonly
                          label="Sales"
                          hide-details
                          density="compact"
                          variant="outlined"
                        ></v-autocomplete>
                      </v-col>
                      <v-col cols="12">
                        <v-autocomplete
                          readonly
                          label="Cost of Sales"
                          hide-details
                          density="compact"
                          variant="outlined"
                        ></v-autocomplete>
                      </v-col>
                    </v-row>
                    <v-list-subheader inset class="px-2 text-black">
                      General
                    </v-list-subheader>
                    <v-row>
                      <v-col cols="12">
                        <v-autocomplete
                          readonly
                          label="Expenses"
                          hide-details
                          density="compact"
                          variant="outlined"
                        ></v-autocomplete>
                      </v-col>
                      <v-col cols="12">
                        <v-autocomplete
                          readonly
                          label="Reader's Fees"
                          hide-details
                          density="compact"
                          variant="outlined"
                        ></v-autocomplete>
                      </v-col>
                      <v-col cols="12">
                        <v-autocomplete
                          readonly
                          label="Inventories"
                          hide-details
                          density="compact"
                          variant="outlined"
                        ></v-autocomplete>
                      </v-col>
                    </v-row>
                  </v-col>
                </v-row>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="6">
            <v-card elevation="4">
              <v-list-subheader inset class="px-2 text-black">
                Report Group Header
              </v-list-subheader>
              <v-divider></v-divider>
              <v-card-text>
                <v-row>
                  <v-col cols="12">
                    <v-text-field
                      variant="outlined"
                      label="Receivable Patient"
                      hide-details
                      density="compact"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12">
                    <v-text-field
                      variant="outlined"
                      label="Receivable Jorunal"
                      hide-details
                      density="compact"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12">
                    <v-text-field
                      variant="outlined"
                      label="Cash Reciept Journal"
                      hide-details
                      density="compact"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12">
                    <v-text-field
                      variant="outlined"
                      label="Disbursement Journal"
                      hide-details
                      density="compact"
                    ></v-text-field>
                  </v-col>
                </v-row>
              </v-card-text>
            </v-card>
          </v-col>
          <v-col cols="6">
            <v-card elevation="4" scrollable>
              <v-list-subheader inset class="px-2 text-black">
                Reorder Point Default
              </v-list-subheader>
              <v-divider></v-divider>
              <v-card-text>
                <v-row>
                  <v-col cols="12">
                    <v-checkbox
                      density="compact"
                      hide-details
                      label="Include in For Reorder Report?"
                    ></v-checkbox>
                  </v-col>
                  <v-col cols="12">
                    <v-text-field
                      variant="outlined"
                      label="Buffer Days"
                      hide-details
                      density="compact"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12">
                    <v-autocomplete
                      readonly
                      label="Ordering Department"
                      hide-details
                      density="compact"
                      variant="outlined"
                    ></v-autocomplete>
                  </v-col>
                  <v-col cols="12">
                    <v-text-field
                      readonly
                      label="Report Inclusion Date"
                      type="date"
                      hide-details
                      density="compact"
                      variant="outlined"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12">
                    <v-checkbox
                      density="compact"
                      hide-details
                      label="Auto Update Items and Services Reorder Point Setup"
                    ></v-checkbox>
                  </v-col>
                </v-row>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-card-text>
      <v-divider></v-divider>
      <v-card-actions>
        <v-btn color="blue-darken-1 border border-info" @click="closeDialog"> Close </v-btn>
        <v-spacer></v-spacer>
        <v-btn class="bg-primary text-white" type="submit" @click="handleSubmit"
          >Submit</v-btn
        >
      </v-card-actions>
    </v-card> -->
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
  itemCategories: {
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
