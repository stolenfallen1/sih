<template>
  <div>
    <v-dialog  :model-value="show" width="950"  scrollable>
      <v-card>
        <v-toolbar density="compact">
          <v-toolbar-title>System User Group {{ selectedGroup }}</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-toolbar-items>
            <v-btn icon>
              <v-icon @click="handleClose">mdi-close</v-icon>
            </v-btn>
          </v-toolbar-items>
        </v-toolbar>
        <v-divider></v-divider>
        <v-card-text style="height:600px;">
          <v-tabs v-model="tab" bg-color="primary" center-active>
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
                    color="primary"
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
                                <td :key="permission.id" v-if="browse_column(permission.key, tabData.name)">
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
                              <template v-for="permission in tabData.items">
                                <td :key="permission.key" v-if="browse_column(permission.key, tabData.name)">
                                  <v-btn @click="openSubModule(permission)"
                                    size="small"
                                    density="compact"
                                    color="#107bac"
                                    icon="mdi-link-circle-outline"
                                  >
                                  </v-btn>
                                </td>
                              </template>
                              <td width="280">
                                {{tabData.name != null ? tabData.name.toUpperCase() : ""}}
                              </td>
                              <template v-for="(permission, keyindex) in tabData.items">
                                <td :key="keyindex" v-if="other_column(permission.key, tabData.name)">
                                   <v-icon 
                                        size="24" 
                                        @click="SelectedModule(permission, permission.eventype,checkpermission(permission.key),can_select_permission(permission.key,tabData.name))"
                                    >
                                        <template v-if="!checkpermission(permission.key) && check_can_select_permission(permission.key,tabData.name)">
                                            {{ permission.eventype ? 'mdi-checkbox-outline' : 'mdi-checkbox-blank-outline' }}
                                        </template>
                                        <template v-else-if="!checkpermission(permission.key) && !check_can_select_permission(permission.key,tabData.name)">
                                            {{ permission.eventype ? 'mdi-checkbox-outline' : 'mdi-checkbox-blank-outline' }}
                                        </template>
                                        <template v-else>
                                            {{ permission.eventype ? 'mdi-checkbox-blank-outline' : 'mdi-checkbox-outline' }}
                                        </template>
                                    </v-icon>
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
          <v-btn @click="handleClose">Close</v-btn>
          <v-spacer></v-spacer>
          <v-btn color="primary" class="primary" :loading="isloading" @click="saveandclose">Save and Close</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog v-model="subdialog"  hide-overlay width="950" scrollable>
      <sub-module
        :subModuleData="subModuleData"
        :roleList="roleList"
        :isrefresh="isrefresh"
        :isloading="isloading"
        @submit="submitsubModule"
        :submoduleTitle="submoduleTitle"
        @getsubmodule_permisson="check_permission"
        @close-dialog="closeSubModule"
      ></sub-module>
    </v-dialog>

    <Confirmation
        :show="confirmationDialog"
        :payload="payload"
        :loading="loading"
        :error_msg="error_msg"
        @close="closeConfirmation"
        @submit="submit"
    />
  </div>
</template>
<script setup>
import SubModule from "./SubModule.vue";
import nuxtStorage from "nuxt-storage";
import { storeToRefs } from "pinia";
const { selectedRowDetails, isrefresh } = storeToRefs(useSubcomponentSelectedRowDetailsStore()); 
import { reactive, computed } from "vue";
const emits = defineEmits(["close","submit"])
const props = defineProps({
  show: {
    type: Boolean,
    default: () => false,
  },
  id: {
    type: Number,
    default: () => 0,
  },
  isloading:{
    type:Boolean,
    default:()=>false
  }
});

const confirmationDialog = ref(false);
const error_msg = ref('');

const selectedGroup = ref("");
const submoduleTitle = ref("");
const modules = ref([]);
let moduleList = ref([]);
let roleList = ref([]);
let subModuleData = ref([]);
const panel = ref([0]);
const loading = ref(false);
const isloading = ref(false);
const subdialog = ref(false);

const tab = ref(null);
const payload = ref({});
const handleClose = ()=>{
    emits("close");
}
const selectedModule = ref([]);
const removeModule = ref([]);
const selectedModuleDetails = ref({});

const saveandclose = ()=>{
  confirmationDialog.value = true;
}

const closeConfirmation = ()=>{
  confirmationDialog.value = false;
}



const can_select_permission = (key,tablename)=>{
    if(!checkpermission(key) && !check_can_select_permission(key,tablename)){
        return true;
    }else{
        return false;
    }
}

const openSubModule = async (permission) => {
  subdialog.value = true;
  isrefresh.value = true;
  submoduleTitle.value = permission.module;
  getsubmodule_permisson(permission.module_id);
};
const getsubmodule_permisson = async (id) => {
  isloading.value = true;
  const response = await $fetch(useApiUrl()  + `/get-permissions?id=` + id, {
    headers: {
      Authorization: `Bearer `+ useToken(),
    },
  });
  if(response.data){
    subModuleData.value = response.data;
    isloading.value = false;
  }
};

const closeSubModule = () => {
  subdialog.value = false;
};

const SelectedModule = (permission,type,access,test,items)=>{
    selectedModuleDetails.value = Object.assign({});
    selectedModuleDetails.value.id = permission.id;
    selectedModuleDetails.value.role_id = selectedRowDetails.value.id;

    if(permission.key == access){
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

    console.log(removeModule.value,'1231231 123',selectedModule.value)
   
}

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
  if(selectedRowDetails.value.tab == 2){
    if(selectedRowDetails.value.id == "") return;
    loading.value = true;
    const response = await $fetch(
      useApiUrl()  + `/get-role-permission?role_id=` + selectedRowDetails.value.id,
      {
        headers: {
          
        Authorization: `Bearer `+ useToken(),
          "Content-Type": "application/json",
        },
      }
    );
    if (response) {
      loading.value = false;
      modules.value = response.permission;
      roleList.value = response.role.permissions;
      selectedGroup.value = " (" + response.role.display_name + ")";
      tab.value = 0;
    }
  };
};

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
  return false;
};

const submit = (details)=>{
   if(selectedModule.value.length == 0 && removeModule.value.length == 0)  return useSnackbar(true, "error", "Select Atleast one Module");
   if (usePasscode() == details.user_passcode) {
    payload.value.selectedModule = selectedModule.value;
    payload.value.removeModule = removeModule.value;
    payload.value.type = 'module';
    loading.value = true;
    emits('submit',payload.value);
    if(!props.isloading){
      loading.value = false;
      confirmationDialog.value = false;
    }
   }else{
        error_msg.value = 'Incorrect Passcode';
        setTimeout(()=>{
            error_msg.value = '';
        },1000);
    }
}
const submitsubModule = (payload)=>{
    payload.type = 'submodule';
    emits('submit',payload);
    setTimeout(()=>{
      subdialog.value = false; 
    },1000);
}
onMounted(()=>{
  selectedModule.value = [];
  removeModule.value = [];// 
})
onUpdated(()=>{
})
watch(async () => {
    

  check_permission();
  console.log(selectedRowDetails.value.id,'asdasda');
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
  panel.value = [0, 1, 2,3];

});
</script>
