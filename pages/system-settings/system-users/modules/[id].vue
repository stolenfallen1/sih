<template>
  <div>
    <v-dialog v-model="dialog" persistent hide-overlay width="950" scrollable>
      <v-card>
        <v-card-title> System User Group Modules </v-card-title>
        <v-divider></v-divider>
        <v-card-text>
          <v-tabs v-model="tab" center-active>
            <v-tab v-for="tab in moduleList" :key="tab.id">
              {{ tab.name }}
            </v-tab>
          </v-tabs>

          <v-window v-model="tab">
            <v-window-item v-for="module in moduleList" :key="module.name">
              <v-expansion-panels variant="accordion" multiple>
                <v-expansion-panel v-for="group in module.groups" :key="group.name">
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
                        <template v-for="(tabData,i) in group.modules" :key="i">
                          <tr >
                            <td>
                              <v-checkbox
                                hide-details
                                density="compact"
                                color="#117dad"
                              ></v-checkbox>
                            </td>
                            <td>
                              <v-btn
                                size="small"
                                density="compact"
                                color="#6984FF"
                                icon="mdi-link-circle-outline"
                              ></v-btn>
                            </td>
                            <td>{{ tabData.name }}</td>
                            <td>
                              <v-checkbox
                                hide-details
                                density="compact"
                                color="#117dad"
                              ></v-checkbox>
                            </td>
                            <td>
                              <v-checkbox
                                hide-details
                                density="compact"
                                color="#117dad"
                              ></v-checkbox>
                            </td>
                            <td>
                              <v-checkbox
                                hide-details
                                density="compact"
                                color="#117dad"
                              ></v-checkbox>
                            </td>
                            <td>
                              <v-checkbox
                                hide-details
                                density="compact"
                                color="#117dad"
                              ></v-checkbox>
                            </td>
                            <td>
                              <v-checkbox
                                hide-details
                                density="compact"
                                color="#117dad"
                              ></v-checkbox>
                            </td>
                            <td>
                              <v-checkbox
                                hide-details
                                density="compact"
                                color="#117dad"
                              ></v-checkbox>
                            </td>
                            <td>
                              <v-checkbox
                                hide-details
                                density="compact"
                                color="#117dad"
                              ></v-checkbox>
                            </td>
                          </tr>
                        </template>
                      </tbody>
                    </v-table>
                  </v-expansion-panel-text>
                </v-expansion-panel>
              </v-expansion-panels>
            </v-window-item>
          </v-window>
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn @click="router.back()">Close</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script setup>
import { reactive, computed } from "vue";
definePageMeta({
  layout: "root-layout",
});
const route = useRoute();

// When accessing /posts/1, route.params.id will be 1
console.log(route.params.id);
const dialog = ref(true);

const router = useRouter();
const panel = ref([0]);
const subdialog = ref(false);
let tab = ref("HIS");
const tabs = ref([
  {
    id: 1,
    name: "HIS",
    data: [
      {
        select: true,
        module: "Module 1",
        read: false,
        edit: false,
        add: true,
        print: false,
        post: true,
        approved: true,
        void: false,
      },
    ],
  },
  {
    id: 2,
    name: "BUILD_FILE",
    data: [
      {
        select: true,
        module: "Module 2",
        read: true,
        edit: false,
        add: true,
        print: false,
        post: true,
        approved: false,
        void: false,
      },
    ],
  },
  {
    id: 3,
    name: "MMIS",
    data: [
      {
        select: true,
        module: "Module 3",
        read: true,
        edit: true,
        add: true,
        print: false,
        post: true,
        approved: true,
        void: false,
      },
    ],
  },
  {
    id: 4,
    name: "POS",
    data: [
      {
        select: true,
        module: "Module 4",
        read: true,
        edit: false,
        add: true,
        print: false,
        post: true,
        approved: true,
        void: true,
      },
    ],
  },
  {
    id: 5,
    name: "ORSCHEDULES",
    data: [
      {
        select: true,
        module: "Module 5",
        read: true,
        edit: true,
        add: true,
        print: false,
        post: true,
        approved: true,
        void: false,
      },
    ],
  },
]);

const openSubModule = () => {
  subdialog.value = true;
};

const closeSubModule = () => {
  subdialog.value = false;
};
const modules = ref([]);
let moduleList = ref([]);
const config = useRuntimeConfig();
const token = useCookie("token");

const check_permission = async () => {
  console.log(route.params);
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
    modules.value = data.value.permission;
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
  console.log(moduleitems);
});
</script>

<style scoped></style>
