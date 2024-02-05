<template>
  <v-card>
    <v-card-title> System User Group Sub Modules </v-card-title>
    <v-divider></v-divider>
    <v-card-text style="height: 500px">
      <v-table density="compact">
        <thead>
          <tr>
            <th width="4">Select</th>
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
        <tbody v-if="isrefresh">
          <template v-for="(item, index) in list" :key="index">
            <tr>
              <template v-for="permission in item.items" :key="permission.id">
                <td
                  :key="permission.id"
                  v-if="browse_column(permission.key, item.module)"
                >
                  <v-icon
                    size="24"
                    @click="addPermission(permission, true)"
                    v-if="!checkpermission(permission.key)"
                    >mdi-checkbox-blank-outline</v-icon
                  >
                  <v-icon size="24" @click="addPermission(permission, false)" v-else
                    >mdi-checkbox-outline</v-icon
                  >
                </td>
              </template>
              <td width="280">
                {{ item.module }}
              </td>
              <template v-for="(permission, keyindex) in item.items">
                <td :key="keyindex" v-if="other_column(permission.key, item.module)">
                  <v-icon
                    size="24"
                    @click="addPermission(permission, true)"
                    v-if="
                      !checkpermission(permission.key) &&
                      check_can_select_permission(permission.key, item.module)
                    "
                    >mdi-checkbox-blank-outline</v-icon
                  >
                  <v-icon
                    size="24"
                    color="grey"
                    v-else-if="
                      !checkpermission(permission.key) &&
                      !check_can_select_permission(permission.key, item.module)
                    "
                    >mdi-checkbox-blank-outline</v-icon
                  >
                  <v-icon size="24" @click="addPermission(permission, false)" v-else
                    >mdi-checkbox-outline</v-icon
                  >
                </td>
              </template>
            </tr>
          </template>
        </tbody>
      </v-table>
    </v-card-text>
    <v-divider></v-divider>
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn @click="closeDialog">Close</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script setup>
const route = useRoute();
const config = useRuntimeConfig();
const token = useCookie("token");
const emits = defineEmits("getsubmodule_permisson");
const props = defineProps({
  subModuleData: {
    type: Object,
    default: () => {},
  },
  isrefresh: {
    type: Boolean,
    default: () => false,
  },
});

const closeDialog = () => {
  emits("close-dialog");
};

let { isrefresh } = props;

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

const checkpermission = (key) => {
  if (key) {
    if (props.subModuleData.some((permission) => permission.key == key)) {
      return key;
    }
  }
};

const check_can_select_permission = (key, table) => {
  let browse = "browse_" + key.split("_")[1];
  if (props.subModuleData.some((permission) => permission.key == browse)) {
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
  emits("getsubmodule_permisson",permission.module_id);
};


let list = ref([]);

const submoduleitems = computed(() => {
  const group_permission = {};
  props.subModuleData.forEach((item) => {
    if (!group_permission[item.module]) {
      group_permission[item.module] = [];
    }
    group_permission[item.module].push(item);
  });
  const result = [];
  for (const module in group_permission) {
    result.push({
      module,
      items: group_permission[module],
    });
  }
  return result;
});
isrefresh = true;
list = submoduleitems;
setTimeout(() => {
  isrefresh = false;
}, 1000);
console.log(list);
</script>

<style scoped></style>
