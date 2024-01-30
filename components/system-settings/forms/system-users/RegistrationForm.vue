<template>
  <v-form ref="form">
    <v-card>
      <v-card-title>
        <span class="text-h7">User Registration</span>
        <v-divider></v-divider>
        <v-tabs v-model="tab">
          <v-tab value="one">General</v-tab>
          <v-tab value="two">Miscellaneous</v-tab>
        </v-tabs>
      </v-card-title>

      <v-card-text style="max-height:450px">
        <v-window v-model="tab">
          <v-window-item value="one">
            <v-container>
              <!-- Personal Information -->
              <v-row>
                <v-col cols="12">
                  <v-card>
                    <v-card-title>Personal Information</v-card-title>
                    <v-card-text>
                      <v-row>
                        <v-col cols="12" sm="6" md="6">
                          <v-text-field
                                label="Lastname*"
                                type="text"
                                v-model="payload.lastname"
                                required
                                :rules="[(v) => !!v || 'Lastname is required']"
                                density="compact"
                                variant="outlined"
                              ></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="6" md="6">
                          <v-text-field
                                label="Firstname*"
                                type="text"
                                required
                                v-model="payload.firstname"
                                :rules="[(v) => !!v || 'Firstname is required']"
                                density="compact"
                                variant="outlined"
                              ></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="6" md="4">
                          <v-text-field
                                label="Middlename"
                                type="text"
                                v-model="payload.middlename"
                                density="compact"
                                variant="outlined"
                              ></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="6" md="4">
                          <v-select
                                :items="suffix"
                                item-title="name"
                                item-value="value"
                                label="Suffix"
                                required
                                v-model="payload.suffix"
                                clearable
                                density="compact"
                                variant="outlined"
                              ></v-select>
                        </v-col>
                        <v-col cols="12" sm="6" md="4">
                          <v-text-field
                                label="Birth Date"
                                @click="openDatePicker"
                                v-model="payload.birthdate"
                                density="compact"
                                type="date"
                                variant="outlined"
                              ></v-text-field>
                        </v-col>
                      </v-row>
                    </v-card-text>
                  </v-card>
                </v-col>
              </v-row>

              <!-- Employment Details -->
              <v-row>
                <v-col cols="12">
                  <v-card>
                    <v-card-title>Employment Details</v-card-title>
                    <v-card-text>
                      <v-row>
                        <v-col cols="12" sm="6" md="4">
                          <v-text-field
                                label="Email"
                                type="email"
                                v-model="payload.email"
                                density="compact"
                                variant="outlined"
                              ></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="6" md="4">
                          <v-text-field
                                label="Employee id*"
                                type="text"
                                v-model="payload.idnumber"
                                required
                                :rules="[(v) => !!v || 'Employee id is required']"
                                density="compact"
                                variant="outlined"
                              ></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="6" md="4">
                          <v-text-field
                                label="Password*"
                                type="password"
                                v-model="payload.password"
                                required
                                :rules="[(v) => !!v || 'Password is required']"
                                density="compact"
                                variant="outlined"
                              ></v-text-field>
                        </v-col>
                      </v-row>
                    </v-card-text>
                  </v-card>
                </v-col>
              </v-row>

              <!-- Organizational Details -->
              <v-row>
                <v-col cols="12">
                  <v-card>
                    <v-card-title>Organizational Details</v-card-title>
                    <v-card-text>
                      <v-row>
                        <v-col cols="12" sm="6" md="4">
                          <v-select
                                :items="branch"
                                item-title="name"
                                item-value="value"
                                label="Branch"
                                v-model="payload.branch_id"
                                required
                                :rules="[(v) => !!v || 'Branch is required']"
                                clearable
                                density="compact"
                                variant="outlined"
                              ></v-select>
                        </v-col>
                        <v-col cols="12" sm="6" md="4">
                          <v-autocomplete
                                :items="department"
                                item-title="name"
                                item-value="value"
                                label="Department"
                                v-model="payload.warehouse_id"
                                clearable
                                required
                                :rules="[(v) => !!v || 'Department is required']"
                                density="compact"
                                variant="outlined"
                              ></v-autocomplete>
                        </v-col>
                        <v-col cols="12" sm="6" md="4">
                          <v-autocomplete
                                :items="position"
                                item-title="name"
                                item-value="value"
                                v-model="payload.position_id"
                                label="Position"
                                clearable
                                required
                                density="compact"
                                variant="outlined"
                              ></v-autocomplete>
                        </v-col>
                        <v-col cols="12" sm="6" md="6">
                          <v-autocomplete
                                :items="section"
                                item-title="name"
                                item-value="value"
                                v-model="payload.section_id"
                                label="Section"
                                density="compact"
                                variant="outlined"
                              ></v-autocomplete>
                        </v-col>
                        <v-col cols="12" sm="6" md="6">
                          <v-autocomplete
                                :items="usergroup"
                                item-title="name"
                                item-value="value"
                                v-model="payload.role_id"
                                label="User Group"
                                clearable
                                required
                                :rules="[(v) => !!v || 'User Group is required']"
                                density="compact"
                                variant="outlined"
                              ></v-autocomplete>
                        </v-col>
                      </v-row>
                    </v-card-text>
                  </v-card>
                </v-col>
              </v-row>

              <!-- Avatar -->
              <v-row>
                <v-col cols="12" sm="6" md="4">                
                  <v-card>
                    <v-card-title>Avatar</v-card-title>
                    <v-card-text>
                      <v-avatar size="80">
                        <v-img src="https://cdn.vuetifyjs.com/images/john.jpg" alt="John"></v-img>
                      </v-avatar>
                    </v-card-text>
                  </v-card>
                </v-col>
              </v-row>
            </v-container>

          </v-window-item>

          <v-window-item value="two">
            <v-container>
              <!--Administrative Accessibility -->
              <v-row>
                <v-col cols="12" sm="6" md="12">                
                  <v-card>
                    <v-card-title>Administrative Accessibility</v-card-title>
                    <v-card-text>
                      <p>
                        Users who have given administrative type of accessibility could access all modules and reports of the system, including System Users. However the right to access
                        modules or reports that has been granted prior to giving the user an administrative type of accessbility will be preserved and will be available for restoration in 
                        case the user goes back to non-administrative type of accessbility.
                      </p>
                      <v-checkbox
                        v-model="grantAdminAccess"
                        label="Grant this user administrative type of accessibility"
                        color="#117dad"
                        @change="checkUncheckAll"
                      ></v-checkbox>
                    </v-card-text>
                  </v-card>
                </v-col>
              </v-row>
              <!-- System Accessibility -->
              <v-row>
                <v-col cols="12">
                  <v-card>
                    <v-card-title>Organizational Details</v-card-title>
                    <v-card-text>
                      <v-row>
                        <v-col cols="12" sm="6" md="6">
                          <v-checkbox label="Hospital Information System" density="compact" color="#117dad" v-model="hisAccess"></v-checkbox>
                        </v-col>
                        <v-col cols="12" sm="6" md="6">
                          <v-checkbox label="Grant Administrative access" density="compact" color="#117dad" v-model="hisAccessAdmin"></v-checkbox>
                        </v-col>
                        <v-col cols="12" sm="6" md="6">
                          <v-checkbox label="Material Management System" density="compact" color="#117dad" v-model="mmisAccess"></v-checkbox>
                        </v-col>
                        <v-col cols="12" sm="6" md="6">
                          <v-checkbox label="Grant Administrative access" density="compact" color="#117dad" v-model="mmisAccessAdmin"></v-checkbox>
                        </v-col>
                        <v-col cols="12" sm="6" md="6">
                          <v-checkbox label="Point of Sale System" density="compact" color="#117dad" v-model="posAccess"></v-checkbox>
                        </v-col>
                        <v-col cols="12" sm="6" md="6">
                          <v-checkbox label="Grant Administrative access" density="compact" color="#117dad" v-model="posAccessAdmin"></v-checkbox>
                        </v-col>
                        <v-col cols="12" sm="6" md="6">
                          <v-checkbox label="Financial Management System" density="compact" color="#117dad" v-model="fmsAccess"></v-checkbox>
                        </v-col>
                        <v-col cols="12" sm="6" md="6">
                          <v-checkbox label="Grant Administrative access" density="compact" color="#117dad" v-model="fmsAccessAdmin"></v-checkbox>
                        </v-col>
                      </v-row>
                    </v-card-text>
                  </v-card>
                </v-col>
              </v-row>
            </v-container> 
          </v-window-item>
        </v-window>
        <small>*indicates required field</small>
      </v-card-text>

      <v-divider></v-divider>
      <v-card-actions>
        <v-btn color="blue-darken-1" @click="closeDialog"> Close </v-btn>
        <v-spacer></v-spacer>
        <v-btn class="bg-primary text-white" @click="handleRegisterUser">
          Register
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-form>
</template>

<script setup>
const props = defineProps({
  payload: {
    type: Object,
    default: () => {},
  },
});
const tab = ref(null);
const grantAdminAccess = ref(false);
const hisAccess = ref(false);
const mmisAccess = ref(false);
const posAccess = ref(false);
const fmsAccess = ref(false);
const hisAccessAdmin = ref(false);
const mmisAccessAdmin = ref(false);
const posAccessAdmin = ref(false);
const fmsAccessAdmin = ref(false);
const checkUncheckAll = () => {
  hisAccess.value = grantAdminAccess.value;
  mmisAccess.value = grantAdminAccess.value;
  posAccess.value = grantAdminAccess.value;
  fmsAccess.value = grantAdminAccess.value;
  hisAccessAdmin.value = grantAdminAccess.value;
  mmisAccessAdmin.value = grantAdminAccess.value;
  posAccessAdmin.value = grantAdminAccess.value;
  fmsAccessAdmin.value = grantAdminAccess.value;
};
const suffix = ref([
  { id: 1, name: "Suffix 1", value: 1 },
  { id: 2, name: "Suffix 2", value: 2 },
  { id: 3, name: "Suffix 3", value: 3 },
  { id: 4, name: "Suffix 4", value: 4 },
]);
const position = ref([
  { id: 1, name: "Position 1", value: 1 },
  { id: 2, name: "Position 2", value: 2 },
  { id: 3, name: "Position 3", value: 3 },
  { id: 4, name: "Position 4", value: 4 },
]);
const branch = ref([
  { id: 1, name: "Branch 1", value: 1 },
  { id: 2, name: "Branch 2", value: 2 },
  { id: 3, name: "Branch 3", value: 3 },
  { id: 4, name: "Branch 4", value: 4 },
]);
const department = ref([
  { id: 1, name: "Department 1", value: 1 },
  { id: 2, name: "Department 2", value: 2 },
  { id: 3, name: "Department 3", value: 3 },
  { id: 4, name: "Department 4", value: 4 },
]);
const section = ref([
  { id: 1, name: "Section 1", value: 1 },
  { id: 2, name: "Section 2", value: 2 },
  { id: 3, name: "Section 3", value: 3 },
  { id: 4, name: "Section 4", value: 4 },
]);
const usergroup = ref([
  { id: 1, name: "User Group 1", value: 1 },
  { id: 2, name: "User Group 2", value: 2 },
  { id: 3, name: "User Group 3", value: 3 },
  { id: 4, name: "User Group 4", value: 4 },
]);
const systems = ref([
  { id: 1, name: "System 1", value: 1 },
  { id: 2, name: "System 2", value: 2 },
  { id: 3, name: "System 3", value: 3 },
  { id: 4, name: "System 4", value: 4 },
]);

const emits = defineEmits(["register-user"]);

const isDatePickerOpen = ref(false);
const selectedDate = ref(null);

const openDatePicker = () => {
  isDatePickerOpen.value = true;
};

const closeDatePicker = () => {
  isDatePickerOpen.value = false;
};

const closeDialog = () => {
  emits("close-dialog");
};

const handleRegisterUser = async () => {
  emits("register-user", payload.value);
};
</script>

<style scoped>
</style>