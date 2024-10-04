<template>
  <v-form ref="form" @submit.prevent="handleSubmit(payload)">
    <v-card>
      <v-toolbar density="compact" color="#107bac" hide-details>
          <v-toolbar-title>User Registration Form</v-toolbar-title>
          <v-btn color="white" @click="closeDialog">
              <v-icon>mdi-close</v-icon>
          </v-btn>
      </v-toolbar>
      <v-divider></v-divider>
      <v-tabs color="primary" v-model="tab">
        <v-tab value="one">General</v-tab>
        <v-tab value="two">Miscellaneous</v-tab>
      </v-tabs>
      <v-divider></v-divider>
      <v-card-text style="max-height: 450px" class="pa-1">
        <v-window v-model="tab" class="pa-0">
          <v-window-item value="one" class="pa-1">
            <!-- Personal Information -->
            <v-card>
              <v-card-text>
                <v-row>
                  <v-col cols="12" sm="8" md="9">
                    <v-row>
                      <v-col lg="6">
                        <v-text-field
                          label="Lastname*"
                          type="text"
                          v-model="payload.lastname"
                          :readonly="payload.type == 'view'"
                          required
                          :rules="[(v) => !!v || 'Lastname is required']"
                          density="compact"
                          variant="outlined"
                        ></v-text-field>
                      </v-col>
                      <v-col lg="6">
                        <v-text-field
                          label="Firstname*"
                          type="text"
                          required
                          v-model="payload.firstname"
                          :readonly="payload.type == 'view'"
                          :rules="[(v) => !!v || 'Firstname is required']"
                          density="compact"
                          variant="outlined"
                        ></v-text-field>
                      </v-col>
                    </v-row>
                    <v-row class="mt-1">
                      <v-col lg="6">
                        <v-text-field
                          label="Middlename"
                          type="text"
                          v-model="payload.middlename"
                          :readonly="payload.type == 'view'"
                          density="compact"
                          hide-details
                          variant="outlined"
                        ></v-text-field>
                      </v-col>
                      <v-col lg="6">
                        <v-select
                          :items="suffix"
                          item-title="abbreviations"
                          item-value="id"
                          label="Suffix"
                          required
                          hide-details
                          v-model="payload.suffix"
                          :readonly="payload.type == 'view'"
                          :clearable="payload.type == 'edit' || payload.type == 'new'"
                          density="compact"
                          variant="outlined"
                        ></v-select>
                      </v-col>
                    </v-row>
                    <v-row>
                      <v-col cols="6">
                        <v-text-field
                          label="Birth Date"
                          v-model="payload.birthdate"
                          :readonly="payload.type == 'view'"
                          density="compact"
                          type="date"
                          variant="outlined"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="6">
                        <v-text-field
                          label="Email"
                          type="email"
                          v-model="payload.email"
                          :readonly="payload.type == 'view'"
                          density="compact"
                          variant="outlined"
                        ></v-text-field>
                      </v-col>
                    </v-row>
                    <v-divider></v-divider>
                    <v-row class="mt-1">
                      <v-col cols="6">
                        <v-autocomplete
                          :items="branch"
                          item-title="abbreviation"
                          item-value="id"
                          label="Branch"
                          v-model="payload.branch_id"
                          @update:model-value="handleBranch(payload)"
                          :readonly="payload.type == 'view'"
                          :clearable="payload.type == 'edit' || payload.type == 'new'"
                          required
                          :rules="[(v) => !!v || 'Branch is required']"
                          clearable
                          density="compact"
                          variant="outlined"
                        ></v-autocomplete>
                        <v-autocomplete
                          :items="department"
                          item-title="warehouse_description"
                          item-value="id"
                          class="mt-2"
                          label="Department"
                          :loading="isdepartmentLoading"
                          v-model="payload.warehouse_id"
                          :readonly="payload.type == 'view'"
                          :clearable="payload.type == 'edit' || payload.type == 'new'"
                          clearable
                          required
                          :rules="[(v) => !!v || 'Department is required']"
                          density="compact"
                          variant="outlined"
                        ></v-autocomplete>
                        <v-autocomplete
                          :items="section"
                          item-title="name"
                          item-value="value"
                          class="mt-2"
                          v-model="payload.section_id"
                          :readonly="payload.type == 'view'"
                          :clearable="payload.type == 'edit' || payload.type == 'new'"
                          label="Section"
                          density="compact"
                          variant="outlined"
                        ></v-autocomplete>
                      </v-col>
                      <v-col cols="6">
                        <v-autocomplete
                          :items="usergroup"
                          item-title="display_name"
                          item-value="id"
                          v-model="payload.role_id"
                          :readonly="payload.type == 'view'"
                          :clearable="payload.type == 'edit' || payload.type == 'new'"
                          label="User Group"
                          clearable
                          required
                          :rules="[(v) => !!v || 'User Group is required']"
                          density="compact"
                          variant="outlined"
                        ></v-autocomplete>
                        <v-autocomplete
                          :items="position"
                          item-title="description"
                          class="mt-2"
                          item-value="code"
                          v-model="payload.position_id"
                          :readonly="payload.type == 'view'"
                          :clearable="payload.type == 'edit' || payload.type == 'new'"
                          label="Position"
                          clearable
                          required
                          density="compact"
                          variant="outlined"
                        ></v-autocomplete>
                        <v-radio-group v-model="payload.isactive" :readonly="payload.type == 'view'" inline>
                          <v-radio label="Is Active" value="1"></v-radio>
                          <v-radio label="Is Inactive" value="0"></v-radio>
                        </v-radio-group>
                      </v-col>
                    </v-row>
                  </v-col>
                  <v-col cols="12" sm="4" md="3">
                    <v-row>
                      <v-col cols="12" align="center">
                        <v-card class="pa-1">
                          <v-avatar rounded="0" size="155">
                            <v-img
                              cover
                              width="100%"
                              v-if="imageUrl"
                              :src="imageUrl"
                              alt="Selected Image"
                            ></v-img>
                          </v-avatar>
                        </v-card>
                      </v-col>
                      <v-col cols="12">
                        <v-file-input
                          class="mt-3"
                          v-model="image"
                          type="file"
                          @update:model-value="checkfile"
                          @change="onFileChange"
                          variant="outlined"
                          bg-color="primary"
                          clearable
                          label="Browse Image"
                          density="compact"
                          hide-details
                        ></v-file-input>
                      </v-col>
                      <v-col lg="12">
                        <v-text-field
                          label="Employee ID*"
                          type="text"
                          v-model="payload.idnumber"
                          :readonly="payload.type == 'view'"
                          required
                          hide-details
                          :rules="[(v) => !!v || 'Employee id is required']"
                          density="compact"
                          variant="outlined"
                        ></v-text-field>
                      </v-col>
                      <v-col lg="12">
                        <v-text-field
                          label="Employee Passcode*"
                          type="text"
                          v-model="payload.passcode"
                          :readonly="payload.type == 'view'"
                          required
                          hide-details
                          :rules="[(v) => !!v || 'Employee Passcode is required']"
                          density="compact"
                          variant="outlined"
                        ></v-text-field>
                      </v-col>
                      <v-col lg="12">
                        <!-- <v-checkbox
                          v-if="payload.type == 'edit'"
                          hide-details
                          label="Change Password"
                          density="compact"
                          color="#117dad"
                          class="mt-0"
                          v-model="ischangepassword"
                        ></v-checkbox> -->
                        <v-text-field
                          label="Password*"
                          type="password"
                          class="mt-2"
                          v-model="payload.password"
                          :readonly="payload.type == 'view'"
                          required
                          :rules="[(v) => !!v || 'Password is required']"
                          density="compact"
                          variant="outlined"
                        ></v-text-field>
                      </v-col>
                    </v-row>
                  </v-col>
                </v-row>
              </v-card-text>
            </v-card>
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
                        Users who have given administrative type of accessibility could
                        access all modules and reports of the system, including System
                        Users. However the right to access modules or reports that has
                        been granted prior to giving the user an administrative type of
                        accessbility will be preserved and will be available for
                        restoration in case the user goes back to non-administrative type
                        of accessbility.
                      </p>
                      <v-checkbox
                        v-model="grantAdminAccess"
                        :readonly="payload.type == 'view'"
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
                    <v-card-title>System Accessibility</v-card-title>
                    <v-card-text>
                      <v-row>
                        <v-col
                          cols="12"
                          sm="6"
                          md="6"
                          v-for="item in systems"
                          :key="item.id"
                        >
                          <v-checkbox
                            hide-details
                            v-model="system"
                            @update:model-value="selectedsystem"
                            :readonly="payload.type == 'view'"
                            :label="item.system_description"
                            :value="item.id"
                            density="compact"
                            color="#117dad"
                          ></v-checkbox>
                        </v-col>
                      </v-row>
                    </v-card-text>
                  </v-card>
                </v-col>
              </v-row>
            </v-container>
          </v-window-item>
        </v-window>
      </v-card-text>

      <v-divider></v-divider>
      <v-card-actions>
        <v-btn color="blue-darken-1 border border-info" @click="closeDialog"> Close </v-btn>
        <v-spacer></v-spacer>
        <v-btn
          v-if="payload.type == 'edit' || payload.type == 'new'"
          class="bg-primary text-white"
          type="submit"
        >
          {{ payload.type == "new" ? "Save and Close" : "Update and Close" }}
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-form>
</template>

<script setup>
import nuxtStorage from "nuxt-storage";
const token = useCookie("token"); // useCookie new hook in nuxt 3
const config = useRuntimeConfig();
const emits = defineEmits(["register-user", "update-user", "close-dialog"]);
const props = defineProps({
  payload: {
    type: Object,
    default: () => {},
  },
});
const { payload } = props;
const form = ref(null);
const system = ref([]);
const image = ref("");
const imageUrl = ref("");
const tab = ref(null);
const isdepartmentLoading = ref(false);
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
  let systemIds = systems.map((system) => system.id); //get all system id
  if (grantAdminAccess.value) {
    system.value = systemIds;
    grantAdminAccess.value = true;
    payload.system = systemIds;
  } else {
    system.value = [];
    payload.system = [];
    grantAdminAccess.value = false;
  }
  console.log(grantAdminAccess.value);
};

// const suffix = JSON.parse(nuxtStorage.localStorage.getData("suffix")) || [];
// const position = JSON.parse(nuxtStorage.localStorage.getData("position")) || [];
// const branch = JSON.parse(nuxtStorage.localStorage.getData("branches")) || [];
// const usergroup = JSON.parse(nuxtStorage.localStorage.getData("roles")) || [];
// const systems = JSON.parse(nuxtStorage.localStorage.getData("systems")) || [];
// const suffix = ref([]);
// const position = ref([]);
// const branch = ref([]);
// const usergroup = ref([]);
const department = ref([]);
const section = ref([
  { id: 1, name: "Section 1", value: 1 },
  { id: 2, name: "Section 2", value: 2 },
  { id: 3, name: "Section 3", value: 3 },
  { id: 4, name: "Section 4", value: 4 },
]);
const selectedsystem = () => {
  const systemIds = system.value.map((system) => system);
  console.log(systemIds);
  payload.system = systemIds;
};
const createImage = (file) => {
  if (!file || !(file instanceof Blob)) {
    console.error("Invalid file");
    return;
  }
  const reader = new FileReader();
  reader.onload = (e) => {
    imageUrl.value = e.target.result;
  };

  reader.readAsDataURL(file);
};
const onFileChange = (event) => {
  const file = event.target.files[0];
  if (!file) {
    return (imageUrl.value = "");
  }
  createImage(file);
};

const checkfile = () => {
  if (image.value == "") {
    imageUrl.value = "";
  }
};

const closeDialog = () => {
  emits("close-dialog");
};

const handleBranch = async () => {
  department.value = [];
  isdepartmentLoading.value = true;
  if (!payload.branch_id) {
    isdepartmentLoading.value = false;
    return;
  }
  const response = await fetch(
    `${config.public.apiBase}` + `/get-branch-warehouse?branch_id=` + payload.branch_id,
    {
      headers: {
        Authorization: `Bearer ${token.value}`,
      },
    }
  );
  const json = await response.json();
  if (json) {
    isdepartmentLoading.value = false;
    department.value = json.data || [];
  }
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

onUpdated(() => {
  if (payload.system_user_access) {
    const systemIds = payload.system_user_access.map((system) =>
      parseInt(system.subsystem_id)
    );
    system.value = systemIds;
  }
  tab.value = "one";
});
onMounted(async () => {
  if (payload.system_user_access) {
    const systemIds = payload.system_user_access.map((system) =>
      parseInt(system.subsystem_id)
    );
    system.value = systemIds;
  }
  handleBranch();
  tab.value = "one";
  
});
</script>

<style scoped></style>
