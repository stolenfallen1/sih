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
          <v-toolbar-title>Department . Ancillary . Warehouse</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-btn color="white" @click="closeDialog">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-toolbar>
        <v-divider></v-divider>
        <v-card-text>
          <v-row>
            <v-col cols="4">
              <v-autocomplete
                label="Branch"
                item-title="abbreviation"
                item-value="id"
                hide-details
                :items="branch"
                v-model="payload.warehouse_Branch_Id"
                density="compact"
                variant="outlined"
              ></v-autocomplete>
            </v-col>
            <v-col cols="8">
              <v-autocomplete
                item-title="description"
                item-value="id"
                :items="warehouse_group"
                label="Warehouse Group"
                v-model="payload.warehouse_Group_Id"
                hide-details
                density="compact"
                variant="outlined"
              ></v-autocomplete>
            </v-col>
            <v-col cols="4">
              <v-text-field
                label="Code"
                hide-details
                v-model="payload.warehouse_Code"
                density="compact"
                variant="outlined"
              ></v-text-field>
            </v-col>
            <v-col cols="8">
              <v-text-field
                label="Description"
                hide-details
                v-model="payload.warehouse_description"
                density="compact"
                variant="outlined"
              ></v-text-field>
            </v-col>
            <v-col cols="4">
                <v-checkbox
                  v-model="payload.isWarehouse"
                  hide-details
                  label="Is Warehouse"
                ></v-checkbox>
                <v-checkbox
                  v-model="payload.isDispensing"
                  hide-details
                  label="Is Despensing"
                ></v-checkbox>
                <v-checkbox
                  v-model="payload.isPurchasing"
                  hide-details
                  label="Is Purchasing"
                ></v-checkbox>
                <v-checkbox
                  v-model="payload.isAllowedRR"
                  hide-details
                  label="Is Allowed RR"
                ></v-checkbox>
                <v-checkbox
                  v-model="payload.isHemodialysis"
                  hide-details
                  label="Is Hemodialysis"
                ></v-checkbox>
            </v-col>
            <v-col cols="4">
                <v-checkbox
                  v-model="payload.isPeritoneal"
                  hide-details
                  label="Is Peritoneal"
                ></v-checkbox>
                <v-checkbox
                  v-model="payload.isLINAC"
                  hide-details
                  label="Is LINAC"
                ></v-checkbox>
                <v-checkbox
                  v-model="payload.isCOBALT"
                  hide-details
                  label="Is COBALT"
                ></v-checkbox>
                <v-checkbox
                  v-model="payload.isChemotherapy"
                  hide-details
                  label="Is Chemotherapy"
                ></v-checkbox>
                <v-checkbox
                  v-model="payload.isBrachytherapy"
                  hide-details
                  label="Is Brachytherapy"
                ></v-checkbox>
              
            </v-col>
            <v-col cols="4">
              
                <v-checkbox
                  v-model="payload.isDebridement"
                  hide-details
                  label="Is Debridement"
                ></v-checkbox>
                <v-checkbox
                  v-model="payload.isTBDots"
                  hide-details
                  label="Is TBDots"
                ></v-checkbox>
                <v-checkbox
                  v-model="payload.isPAD"
                  hide-details
                  label="Is PAD"
                ></v-checkbox>
                <v-checkbox
                  v-model="payload.isRadioTherapy"
                  hide-details
                  label="Is RadioTherapy"
                ></v-checkbox>
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
          <v-btn class="bg-primary text-white" type="submit">Submit</v-btn>
        </v-card-actions>
      </v-card>
    </form>

    <!-- <v-toolbar color="#6984ff" hide-details density="compact">
          <v-toolbar-title>Department . Ancillary . Warehouse Details</v-toolbar-title>
      </v-toolbar>
      <v-card>
          <v-card-text>
              <v-row>
                  <v-col cols="12">
                      <v-card elevation="4">
                          <v-card-text>
                              <v-row>
                                  <v-col cols="6">
                                      <v-row>
                                          <v-col cols="12">
                                              <v-autocomplete
                                                  label="Branch"
                                                  :items="branches"
                                                  hide-details
                                                  density="compact"
                                                  variant="outlined"
                                              ></v-autocomplete>
                                          </v-col>
                                          <v-col cols="12">
                                              <v-autocomplete
                                                  label="Group"
                                                  :items="groups"
                                                  hide-details
                                                  density="compact"
                                                  variant="outlined"
                                              ></v-autocomplete>
                                          </v-col>
                                          <v-col cols="12">
                                              <v-text-field
                                                  variant="outlined"
                                                  label="Receivable Patient"
                                                  hide-details
                                                  density="compact"
                                              ></v-text-field>
                                          </v-col>
                                      </v-row>
                                  </v-col>
                                  <v-col cols="6">
                                      <v-row>
                                          <v-col cols="12">
                                              <v-text-field
                                                  variant="outlined"
                                                  label="Long Description"
                                                  hide-details
                                                  density="compact"
                                              ></v-text-field>
                                          </v-col>
                                          <v-col cols="12">
                                              <v-text-field
                                                  variant="outlined"
                                                  label="Short Description"
                                                  hide-details
                                                  density="compact"
                                              ></v-text-field>
                                          </v-col>
                                          <v-col cols="12">
                                              <v-autocomplete
                                                  label="Reagent Setup"
                                                  :items="reagent_setup"
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
                  <v-row class="px-4">
                    <v-col cols="12">
                      <v-card>
                          <v-toolbar>
                            <v-toolbar-title style="text-align: center; font-size: medium;">Transactional Settings ( Check all that applies )</v-toolbar-title>
                          </v-toolbar>
                          <v-col cols="12">
                            <v-tabs
                                v-model="tab"
                                color="primary"
                                density="compact"
                            >
                                <v-tab value="0"><v-icon start>mdi mdi-cog</v-icon>Settings 1</v-tab>
                                <v-tab value="1"><v-icon start>mdi mdi-cog</v-icon>Settings 2</v-tab>
                            </v-tabs>
                          </v-col>
                          <v-col cols="12">
                            <v-window v-model="tab">
                                  <v-window-item class="pa-1">
                                    <v-row>
                                      <v-col cols="6">
                                        <v-radio-group hide-details density="compact">
                                          <v-checkbox hide-details label="Apply Special Area Price" density="compact"></v-checkbox>
                                          <v-checkbox hide-details label="Apply Special Area Price to Requisitions in Non-Special Area" density="compact"></v-checkbox>
                                          <v-checkbox hide-details label="Allow Viewing of Update Components" density="compact"></v-checkbox>
                                          <v-checkbox hide-details label="Include to List of Departments where Requisition is enforced" density="compact"></v-checkbox>
                                          <v-checkbox hide-details label="Auto-Render Requisitions to this Department" density="compact"></v-checkbox>
                                          <v-checkbox hide-details label="Auto-Render Requisitions by this Department" density="compact"></v-checkbox>
                                          <v-checkbox hide-details label="Set as Ancillary Service. Income Center" density="compact"></v-checkbox>
                                          <v-checkbox hide-details label="Is Purchasing Department?" density="compact"></v-checkbox>
                                          <v-checkbox hide-details label="Enable Allergy Alert" density="compact"></v-checkbox>
                                        </v-radio-group>
                                      </v-col>
                                      <v-col cols="6">
                                        <v-radio-group hide-details density="compact">
                                          <v-checkbox hide-details label="Allow Staggered Rendering" density="compact"></v-checkbox>
                                          <v-checkbox hide-details label="Allow Issuance of Official Receipt" density="compact"></v-checkbox>
                                          <v-checkbox hide-details label="Enforce Restrictions on MMIS Modules" density="compact"></v-checkbox>
                                          <v-checkbox hide-details label="Enforce Relocation" density="compact"></v-checkbox>
                                          <v-checkbox hide-details label="Enable option to print Barcode ID per Transaction" density="compact"></v-checkbox>
                                          <v-checkbox hide-details label="Enforce VAT on Inpatient Transaction" density="compact"></v-checkbox>
                                          <v-checkbox hide-details label="Enforce VAT on Outpatient Transactions" density="compact"></v-checkbox>
                                          <v-checkbox hide-details label="Enforce VAT on Emergency Case Transactions" density="compact"></v-checkbox>
                                        </v-radio-group>
                                      </v-col>
                                    </v-row>
                                  </v-window-item>
                                  <v-window-item  class="pa-1">
                                    <v-row>
                                      <v-col cols="12">
                                        <v-radio-group hide-details density="compact">
                                          <v-checkbox hide-details label="Enable Inventory Barcoding" density="compact"></v-checkbox>
                                          <v-checkbox hide-details label="Forward Results Online" density="compact"></v-checkbox>
                                          <v-checkbox hide-details label="Enforce Validation of Inventory with Zero Balance" density="compact"></v-checkbox>
                                        </v-radio-group>
                                      </v-col>
                                    </v-row>
                                  </v-window-item>
                            </v-window>
                          </v-col>
                      </v-card>
                    </v-col>
                  </v-row>
              </v-row>
              <v-row>
                  <v-col cols="6">
                    <v-card>
                          <v-toolbar>
                            <v-toolbar-title style="text-align: center; font-size: medium;">Transactional Settings ( Check all that applies )</v-toolbar-title>
                          </v-toolbar>
                          <v-col cols="12">
                            <v-tabs
                                v-model="tab"
                                color="primary"
                                density="compact"
                            >
                                <v-tab value="0"><v-icon start>mdi-text-box-outline</v-icon>Charge Slip</v-tab>
                                <v-tab value="1"><v-icon start>mdi-text-box-outline</v-icon>Cash Slip</v-tab>
                            </v-tabs>
                          </v-col>
                          <v-col cols="12">
                            <v-window v-model="tab">
                                  <v-window-item class="pa-1">
                                    <v-row>
                                      <v-col cols="12">
                                        <v-radio-group hide-details density="compact">
                                          <v-list-subheader inset>
                                            Document File Name for Inpatient Transaction
                                          </v-list-subheader>
                                          <v-text-field hide-details density="compact" variant="outlined" readonly></v-text-field>
                                          <v-checkbox hide-details label="Apply this file to all departments" density="compact" readonly></v-checkbox>
                                          <v-divider></v-divider>
                                          <v-list-subheader inset>
                                            Document File Name for Outpatient Transaction
                                          </v-list-subheader>
                                          <v-text-field hide-details density="compact" variant="outlined" readonly></v-text-field>
                                          <v-checkbox hide-details label="Apply this file to all departments" density="compact" readonly></v-checkbox>
                                          <v-divider></v-divider>
                                          <v-list-subheader inset>
                                            Document File Name for Emergency Transaction
                                          </v-list-subheader>
                                          <v-text-field hide-details density="compact" variant="outlined" readonly></v-text-field>
                                          <v-checkbox hide-details label="Apply this file to all departments" density="compact" readonly></v-checkbox>
                                          <v-divider></v-divider>
                                        </v-radio-group>
                                      </v-col>
                                    </v-row>
                                  </v-window-item>
                                  <v-window-item  class="pa-1">
                                    <v-row>
                                      <v-col cols="12">
                                        <h1>Disabled on BizBox</h1>
                                      </v-col>
                                    </v-row>
                                  </v-window-item>
                            </v-window>
                          </v-col>
                      </v-card>
                  </v-col>
                  <v-col cols="6">
                      <v-card elevation="4" scrollable>
                          <v-toolbar>
                            <v-toolbar-title style="text-align: center; font-size: medium;">Other Transactional Settings</v-toolbar-title>
                          </v-toolbar>
                          <v-card-text>
                              <v-row>
                                <v-col cols="7">
                                  <label>
                                      Maximum No. of Items to be Requested or Charged in a Single Transaction
                                  </label>
                                </v-col>
                                <v-col cols="5">
                                    <v-text-field
                                        readonly
                                        class="mt-3"
                                        variant="outlined"
                                        type="number"
                                        hide-details
                                        density="compact"
                                    ></v-text-field>
                                </v-col>
                              </v-row>
                          </v-card-text>
                      </v-card>
                      <v-card class="mt-4" elevation="4" scrollable>
                          <v-toolbar>
                            <v-toolbar-title style="text-align: center; font-size: medium;">Applicable Item Groups ( Check all that applies )</v-toolbar-title>
                          </v-toolbar>
                          <v-card-text>
                              <v-row>
                                <v-col cols="6">
                                  <v-radio-group hide-details density="compact">
                                    <v-checkbox hide-details label="Drugs. Medicines" density="compact"></v-checkbox>
                                    <v-checkbox hide-details label="Supplies" density="compact"></v-checkbox>
                                    <v-checkbox hide-details label="Laboratory Exams .X-Rays" density="compact"></v-checkbox>
                                  </v-radio-group>
                                </v-col>
                                <v-col cols="6">
                                  <v-radio-group hide-details density="compact">
                                    <v-checkbox hide-details label="Procedures" density="compact"></v-checkbox>
                                    <v-checkbox hide-details label="Assets .Equipments" density="compact"></v-checkbox>
                                    <v-checkbox hide-details label="Others" density="compact"></v-checkbox>
                                  </v-radio-group>
                                </v-col>
                              </v-row>
                          </v-card-text>
                      </v-card>
                  </v-col>
              </v-row>
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
  branch: {
    type: Array,
    default: () => [],
  },
  warehouse_group: {
    type: Array,
    default: () => [],
  },
});

const branches = ["Main Branch"];
const groups = ["Administrative"];
const reagent_setup = ["Prompt User with Reagents Lists"];
let tab = ref("0");

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
