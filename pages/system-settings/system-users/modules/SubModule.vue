<template>
  <v-card>
     <v-toolbar density="compact">
      <v-toolbar-title>System User Group Sub Modules {{ title }}</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items>
        <v-btn icon>
          <v-icon @click="closeDialog">mdi-close</v-icon>
        </v-btn>
      </v-toolbar-items>
    </v-toolbar>

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
        <tbody>
          <template v-for="(item, index) in list" :key="index">
            <tr>
              <template v-for="permission in item.items" :key="permission.id">
                <td
                  :key="permission.id"
                  v-if="browse_column(permission.key, item.module)"
                >
                    <v-icon size="24" @click="SelectedModule(permission, permission.eventype,checkpermission(permission.key))">
                      <template v-if="!checkpermission(permission.key)">
                          {{ permission.eventype ? 'mdi-checkbox-outline' : 'mdi-checkbox-blank-outline' }}
                      </template>
                      <template v-else>
                          {{ permission.eventype ? 'mdi-checkbox-blank-outline' : 'mdi-checkbox-outline' }}
                      </template>
                    </v-icon>
                </td>
              </template>
              <td width="280">
                {{ item.module }}
              </td>
              <template v-for="(permission, keyindex) in item.items">
                <td :key="keyindex" v-if="other_column(permission.key, item.module)">
                  <template v-if="!loading">
                   <v-icon size="24" @click="SelectedModule(permission, permission.eventype,checkpermission(permission.key))">
                      <template v-if="!checkpermission(permission.key)">
                          {{ permission.eventype ? 'mdi-checkbox-outline' : 'mdi-checkbox-blank-outline' }}
                      </template>
                      <template v-else>
                          {{ permission.eventype ? 'mdi-checkbox-blank-outline' : 'mdi-checkbox-outline' }}
                      </template>
                    </v-icon>
                  </template>
                </td>
              </template>
            </tr>
          </template>
        </tbody>
      </v-table>
    </v-card-text>
    <v-divider></v-divider>
    <v-card-actions>
      <v-btn @click="closeDialog">Close</v-btn>
      <v-spacer></v-spacer>
      <v-btn color="primary" class="primary" :loading="isloading" @click="submit">Save and Close</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script setup>
import { storeToRefs } from "pinia";
const { selectedRowDetails } = storeToRefs(useSubcomponentSelectedRowDetailsStore()); 
const route = useRoute();
const token = useCookie("token");
const emits = defineEmits("getsubmodule_permisson","close-dialog");
const props = defineProps({
  subModuleData: {
    type: Array,
    default: () => [],
  },
  roleList: {
    type: Array,
    default: () => [],
  },
  isrefresh: {
    type: Boolean,
    default: () => false,
  },
  isloading: {
    type: Boolean,
    default: () => false,
  },
  loading: {
    type: Boolean,
    default: () => false,
  },
  submoduleTitle:{
    type: String,
    default: () => '',
  }
});

const closeDialog = () => {
  emits("close-dialog");
};
const payload = ref({});
let { isrefresh } = props;
const selectedModule = ref([]);
const removeModule = ref([]);
const selectedModuleDetails = ref({});

const SelectedModule = (permission,type,access,test,items)=>{
    selectedModuleDetails.value = Object.assign({});
    selectedModuleDetails.value.id = permission.id;
    selectedModuleDetails.value.role_id = selectedRowDetails.value.id;
    if(access){
        if(permission.eventype == false){
            let selectedkey = selectedModule.value.filter(item=>item.id !== permission.id);
            selectedModule.value = selectedkey.map(item => ({ id: item.id, role_id: item.role_id }));
            permission.eventype = true;
            removeModule.value.push(selectedModuleDetails.value);
        }else if(permission.eventype == true){
            let selectedkey = removeModule.value.filter(item=>item.id !== permission.id);
            removeModule.value = selectedkey.map(item => ({ id: item.id, role_id: item.role_id }));
            permission.eventype = false;
            selectedModule.value.push(selectedModuleDetails.value);
        }else{
            if(access){
                removeModule.value.push(selectedModuleDetails.value);
            }else{
                selectedModule.value.push(selectedModuleDetails.value);
            }
            permission.eventype = true;
        }
    }else{
        if(permission.eventype == false){
            let selectedkey = selectedModule.value.filter(item=>item.id !== permission.id);
            selectedModule.value = selectedkey.map(item => ({ id: item.id, role_id: item.role_id }));
            permission.eventype = true;
            
            removeModule.value.push(selectedModuleDetails.value);
        }else if(permission.eventype == true){
            let selectedkey = selectedModule.value.filter(item=>item.id !== permission.id);
            selectedModule.value = selectedkey.map(item => ({ id: item.id, role_id: item.role_id }));

            let removeselectedkey = removeModule.value.filter(item=>item.id !== permission.id);
            removeModule.value = removeselectedkey.map(item => ({ id: item.id, role_id: item.role_id }));
            permission.eventype = false;
        }else{
            if(access){
                removeModule.value.push(selectedModuleDetails.value);
            }else{
                selectedModule.value.push(selectedModuleDetails.value);
            }
            permission.eventype = true;
        }
    }
   
}

const submit = ()=>{
    payload.value.selectedModule = selectedModule.value;
    payload.value.removeModule = removeModule.value;
    emits('submit',payload.value);
}

const addPermission = async (permission, type) => {
  permission.type = type;
  permission.role_id = route.params.id;
  const { data } = await useFetch(useLaravelAPI() + `/add-permission`, {
    method: "post",
    headers: {
      Authorization: `Bearer `+ useToken(),
      "Content-Type": "application/json",
    },
    body: { payload: permission },
  });
  emits("getsubmodule_permisson", permission.module_id);
};
const title = computed(()=>{
    return '('+props.submoduleTitle+')';
})
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
watch(()=>{
  if(!props.loading){
    list = submoduleitems;
  }
})
onUpdated(()=>{
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
  list = submoduleitems;
});
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
    if (props.roleList.some((permission) => permission.key == key)) {
      return true;
    }
  }
};

const check_can_select_permission = (key, table) => {
  let browse = "browse_" + key.split("_")[1];
  if (props.roleList.some((permission) => permission.key == browse)) {
    return true;
  }
};

</script>

<style scoped></style>
