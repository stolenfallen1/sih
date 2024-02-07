<template>
  <div>
    <v-dialog v-model="dialog" persistent hide-overlay width="950" scrollable>
      <v-card>
        <v-card-title> System User Group {{ selectedGroup }} </v-card-title>
        <v-divider></v-divider>
        <v-card-text>
          <v-tabs v-model="tab" center-active>
            <v-tab v-for="(tabs, index) in moduleList" :value="index" :key="index">
              {{ tabs.name }}
            </v-tab>
          </v-tabs>
          <v-divider></v-divider>
          <v-window v-model="tab">
            <v-skeleton-loader
              :loading="loading"
              v-if="loading"
              type="list-item-two-line"
            >
              <v-list-item lines="two" rounded></v-list-item>
            </v-skeleton-loader>
            <template v-for="(module, index) in moduleList" :key="module.name">
              <v-window-item :value="index" class="pa-1">
                <v-expansion-panels v-model="panel" variant="accordion" multiple>
                  <v-expansion-panel
                    class="mb-1"
                    v-for="group in module.groups"
                    :key="group.name"
                  >
                    <v-expansion-panel-title>{{ group.name }}</v-expansion-panel-title>
                    <v-expansion-panel-text>
                      <v-table density="compact">
                        <thead>
                          <tr>
                            <th width="4">Select</th>
                            <th width="4"></th>
                            <th width="420">Module</th>
                            <th>Read</th>
                            <th>Edit</th>
                            <th>Add</th>
                            <th>Print</th>
                            <th>Post</th>
                            <th>Approved</th>
                            <th>Void</th>
                          </tr>
                        </thead>
                        <tbody>
                          <template v-for="(tabData, i) in group.modules" :key="i">
                            <tr>
                              <template v-for="permission in tabData.items">
                                <td
                                  :key="permission.id"
                                  v-if="browse_column(permission.key, tabData.name)"
                                >
                                  <v-icon
                                    size="24"
                                    @click="addPermission(permission, true)"
                                    v-if="!checkpermission(permission.key)"
                                    >mdi-checkbox-blank-outline</v-icon
                                  >
                                  <v-icon
                                    size="24"
                                    @click="addPermission(permission, false)"
                                    v-else
                                    >mdi-checkbox-outline</v-icon
                                  >
                                </td>
                              </template>
                              <template v-for="permission in tabData.items">
                                <td
                                  :key="permission.key"
                                  v-if="browse_column(permission.key, tabData.name)"
                                >
                                  <v-btn
                                    @click="openSubModule(permission)"
                                    size="small"
                                    density="compact"
                                    color="#6984FF"
                                    icon="mdi-link-circle-outline"
                                  >
                                  </v-btn>
                                </td>
                              </template>
                              <td width="280">
                                {{
                                  tabData.name != null ? tabData.name.toUpperCase() : ""
                                }}
                              </td>
                              <template v-for="(permission, keyindex) in tabData.items">
                                <td
                                  :key="keyindex"
                                  v-if="other_column(permission.key, tabData.name)"
                                >
                                  <v-icon
                                    size="24"
                                    @click="addPermission(permission, true)"
                                    v-if="
                                      !checkpermission(permission.key) &&
                                      check_can_select_permission(
                                        permission.key,
                                        tabData.name
                                      )
                                    "
                                    >mdi-checkbox-blank-outline</v-icon
                                  >
                                  <v-icon
                                    size="24"
                                    color="grey"
                                    v-else-if="
                                      !checkpermission(permission.key) &&
                                      !check_can_select_permission(
                                        permission.key,
                                        tabData.name
                                      )
                                    "
                                    >mdi-checkbox-blank-outline</v-icon
                                  >
                                  <v-icon
                                    size="24"
                                    @click="addPermission(permission, false)"
                                    v-else
                                    >mdi-checkbox-outline</v-icon
                                  >
                                </td>
                              </template>
                            </tr>
                          </template>
                        </tbody>
                      </v-table>
                    </v-expansion-panel-text>
                  </v-expansion-panel>
                </v-expansion-panels>
              </v-window-item>
            </template>
          </v-window>
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn to="/system-settings/system-users">Close</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog v-model="subdialog" persistent hide-overlay width="950" scrollable>
      <sub-module
        :subModuleData="subModuleData"
        :roleList="roleList"
        :isrefresh="isrefresh"
        :submoduleTitle="submoduleTitle"
        @getsubmodule_permisson="check_permission"
        @close-dialog="closeSubModule"
      ></sub-module>
    </v-dialog>
  </div>
</template>

<script setup>
import SubModule from "./SubModule.vue";
import { reactive, computed } from "vue";
definePageMeta({
  layout: "root-layout",
});
const route = useRoute();
const panel = ref([0]);
const show = ref(false);
// When accessing /posts/1, route.params.id will be 1
const loading = ref(true);
const dialog = ref(true);
const router = useRouter();
const subdialog = ref(false);
const isrefresh = ref(false);
const tab = ref(null);
const selectedGroup = ref("");
const submoduleTitle = ref('');

const modules = ref([]);
let moduleList = ref([]);
let subModuleData = ref([]);
let roleList = ref([]);
const config = useRuntimeConfig();
const token = useCookie("token");

const browse_column = (item, table) => {
  if (item.split("_")[0] == "browse" && table != null) {
    return true;
  }
  return false;
};
const other_column = (item, table) => {
  if (item.split("_")[0] != "browse" && table != null) {
    return true;
  }
  return false;
};

const check_permission = async () => {
  console.log(route.params);
  loading.value = true;
  const { data } = await useFetch(
    `${config.public.apiBase}` + `/get-role-permission?role_id=` + route.params.id,
    {
      headers: {
        Authorization: `Bearer ${token.value}`,
        "Content-Type": "application/json",
      },
    }
  );
  if (data.value) {
    loading.value = false;
    modules.value = data.value.permission;
    roleList.value = data.value.role.permissions;
    selectedGroup.value = " (" + data.value.role.display_name + ")";
    tab.value = 0;
  }
};

// Usage:
onMounted(async () => {
  check_permission();
  const moduleitems = computed(() => {
    const group_permission = {};
    modules.value.forEach((item) => {
      const driverName = item.database_driver.name;
      const sidebarGroupName = item.sidebar_group?.name;
      const moduleName = item.module;

      // Group by database_driver.name
      if (!group_permission[driverName]) {
        group_permission[driverName] = [];
      }

      // Find existing group for module
      const existingGroup = group_permission[driverName].find(
        (group) => group.name === sidebarGroupName
      );

      if (existingGroup) {
        // Find existing module
        const existingModule = existingGroup.modules.find(
          (module) => module.name === moduleName
        );

        if (existingModule) {
          // Add item to existing module
          existingModule.items.push(item);
        } else {
          // Create new module for the existing group
          existingGroup.modules.push({
            name: moduleName,
            items: [item],
          });
        }
      } else {
        // Create new group for the driver
        group_permission[driverName].push({
          name: sidebarGroupName,
          modules: [
            {
              name: moduleName,
              items: [item],
            },
          ],
        });
      }
    });

    return Object.keys(group_permission).map((name) => ({
      name,
      groups: group_permission[name],
    }));
  });

  moduleList = moduleitems;
  panel.value = [0, 1, 2];

});
onUpdated(() => {
  panel.value = [0, 1, 2];
});

const checkpermission = (key) => {
  if (key) {
    if (roleList.value.some((permission) => permission.key == key)) {
      return key;
    }
  }
};

const check_can_select_permission = (key, table) => {
  let browse = "browse_" + key.split("_")[1];
  if (roleList.value.some((permission) => permission.key == browse)) {
    return true;
  }
};

const addPermission = async (permission, type) => {
  permission.type = type;
  permission.role_id = route.params.id;
  const { data } = await useFetch(`${config.public.apiBase}` + `/add-permission`, {
    method: "post",
    headers: {
      Authorization: `Bearer ${token.value}`,
      "Content-Type": "application/json",
    },
    body: { payload: permission },
  });
  if (data.value) {
    check_permission();
  }
};

const openSubModule = async (permission) => {
  subdialog.value = true;
  isrefresh.value = true;
  submoduleTitle.value = permission.module;
  getsubmodule_permisson(permission.module_id);
};
const getsubmodule_permisson = async(id)=>{
  const response = await fetch(
    `${config.public.apiBase}` + `/get-permissions?id=` + id,
    {
      headers: {
        Authorization: `Bearer ${token.value}`,
      },
    }
  );
  const data = await response.json();
  subModuleData.value = data.data;
  isrefresh.value = false;
}
const closeSubModule = () => {
  subdialog.value = false;
};
</script>

<style scoped></style>
