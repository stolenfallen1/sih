<template>
  <v-card>
    <v-form ref="form" @submit.prevent="handleSubmit(payload)">
      <v-card-title>
        <span class="text-h7">User Registration</span>
      </v-card-title>
      <v-divider></v-divider>
      <v-card-text>
        <v-container>
          <v-row>
            <v-col cols="12" sm="6" md="3">
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
            <v-col cols="12" sm="6" md="3">
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
            <v-col cols="12" sm="6" md="3">
              <v-text-field
                label="Middlename"
                type="text"
                v-model="payload.middlename"
                density="compact"
                variant="outlined"
              ></v-text-field>
            </v-col>
            <v-col cols="12" sm="6" md="3">
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
            <v-col cols="12" sm="6" md="3">
              <v-text-field
                label="Birth Date"
                @click="openDatePicker"
                v-model="payload.birthdate"
                density="compact"
                type="date"
                variant="outlined"
              ></v-text-field>
            </v-col>
            <v-col cols="12" sm="6" md="3">
              <v-text-field
                label="Email"
                type="email"
                v-model="payload.email"
                density="compact"
                variant="outlined"
              ></v-text-field>
            </v-col>
            <v-col cols="12" sm="6" md="3">
              <v-text-field
                label="Employee Number*"
                type="text"
                v-model="payload.idnumber"
                required
                :rules="[(v) => !!v || 'Employee number is required']"
                density="compact"
                variant="outlined"
              ></v-text-field>
            </v-col>
            <v-col cols="12" sm="6" md="3">
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
            <v-col cols="12" sm="6" md="3">
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
            <v-col cols="12" sm="6" md="3">
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
            <v-col cols="12" sm="6" md="3">
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
            <v-col cols="12" sm="6" md="3">
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
            <v-col cols="12" sm="6" md="4">
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
            <v-col cols="12" sm="6" md="4">
              <v-autocomplete
                :items="systems"
                item-title="name"
                item-value="value"
                label="System Accessiblity"
                clearable
                multiple
                required
                :rules="[(v) => !!v || 'System Access is required']"
                density="compact"
                variant="outlined"
              ></v-autocomplete>
            </v-col>
            <v-col cols="12" sm="2" md="4">
              <v-radio-group v-model="payload.isactive" inline>
                <v-radio label="Active" value="1"></v-radio>
                <v-radio label="In-Active" value="0"></v-radio>
              </v-radio-group>
            </v-col>
          </v-row>
        </v-container>
        <small>*indicates required field</small>
      </v-card-text>
      <v-divider></v-divider>
      <v-card-actions>
        <v-btn color="blue-darken-1" @click="closeDialog"> Close </v-btn>
        <v-spacer></v-spacer>
        <v-btn
          v-if="payload.type == 'edit' || payload.type == 'new'"
          class="bg-primary text-white"
          type="submit"
        >
          {{ payload.type == "new" ? "Save and Close" : "Update and Close" }}
        </v-btn>
      </v-card-actions>
    </v-form>
  </v-card>
</template>

<script setup>
const emits = defineEmits(["register-user", "update-user"]);
const props = defineProps({
  payload: {
    type: Object,
    default: () => {},
  },
});
const form = ref(null);
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


const isDatePickerOpen = ref(false);


const closeDialog = () => {
  emits("close-dialog");
};

const handleSubmit = async (payload) => {
  const { valid } = await form.value.validate();
  if (!valid) return;
  if (payload.type == "new") {
    handleRegisterUser(payload);
  } else if (payload.type == "edit") {
    handleUpdateUser(payload);
  }
};
const handleRegisterUser = (payload) => {
  emits("register-user", payload);
};

const handleUpdateUser = (payload) => {
  emits("update-user", payload);
};
</script>

<style scoped></style>
