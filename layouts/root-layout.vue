<template>
  <v-app>
    <v-app-bar v-if="authenticated" flat elevation="1" color="#107bac">
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
      <img src="/cdg_logo.png" width="50" height="50" @click="router.push('/dashboard')" class="cursor-pointer" />
      <img src="/cduh_logo.png" width="50" height="50" @click="router.push('/dashboard')" class="cursor-pointer" />
      <div class="ml-4 cursor-pointer" @click="router.push('/dashboard')">
        <p>Cebu Doctors University Hospital</p>
        <span class="title-span">Hospital Information System</span>
      </div>
      <v-spacer></v-spacer>
      <ClientOnly>
        <div class="mr-10">{{ currentDay + " - " + currentTime }}</div>
      </ClientOnly>
      <ModalSettings />
      <v-btn icon="mdi-bell-alert-outline"></v-btn>
      <v-menu>
        <template v-slot:activator="{ props }">
          <v-btn color="#FFF" v-bind="props" icon>
            <v-icon>mdi-account</v-icon>
          </v-btn>
        </template>

        <v-list>
          <v-list-item @click="openUserProfile">
            <v-list-item-title
              ><v-icon class="mr-4">mdi-account-circle</v-icon>View
              Profile</v-list-item-title
            >
          </v-list-item>
          <v-list-item @click="logout">
            <v-list-item-title
              ><v-icon class="mr-4">mdi-logout</v-icon>Logout</v-list-item-title
            >
          </v-list-item>
        </v-list>
      </v-menu>
    </v-app-bar>

    <!-- LEFT SIDEBAR -->
    <v-navigation-drawer
      v-if="authenticated"
      class="drawer"
      v-model="drawer"
      elevation="4"
    >
      <v-list :lines="false" density="compact" nav v-model:opened="open">
        <template v-for="(item, i) in items" :key="i">
          <template v-if="item.child.length == 0">
            <v-list-item :value="item">
              <v-list-item-title v-text="item.label"></v-list-item-title>
            </v-list-item>
          </template>
          <v-list-group
            :value="item.label"
            v-if="item.child.length > 0 && can_browse(item.rule)"
            :fluid="true"
            group
          >
            <template v-slot:activator="{ props }">
              <v-list-item
                v-bind="props"
                :prepend-icon="item.icon"
                :title="item.label"
                density="compact"
                :exact="true"
                :slim="true"
              ></v-list-item>
            </template>
            <template v-for="child in item.child" :key="child.label">
              <v-list-item
                class="ml-4 mt-1"
                v-if="can_browse(child.rule)"
                :title="child.label"
                :value="child.label"
                :to="child.path"
                density="compact"
                :exact="true"
                :slim="true"
                @click="displayRightOptions(child)"
              >
                <template v-slot:prepend>
                  <v-btn
                    class="mr-2 pa-1"
                    size="medium"
                    color="#107bac"
                    :icon="child.icon"
                  >
                  </v-btn>
                </template>
              </v-list-item>
            </template>
          </v-list-group>
        </template>
      </v-list>
    </v-navigation-drawer>
    <!-- RIGHT SIDEBAR RENDER CONDITIONALLY -->
    <v-navigation-drawer
      location="right"
      class="drawer"
      v-model="drawer"
      elevation="4"
      v-if="rightSidebarDisplay && authenticated && subcomponents.length > 0"
    >
      <v-list
        rounded="lg"
        :lines="false"
        density="compact"
        nav
        v-model:opened="openedGroups"
      >
        <v-list-group value="group1" :fluid="true" group>
          <template v-slot:activator="{ props }">
            <v-list-item v-bind="props" :title="'Sub Components' + selectedRowDetails.id"></v-list-item>
          </template>
          <v-list-item
            class="mt-1"
            v-for="item in subcomponents"
            :key="item.label"
            :title="item.label"
            :value="item.label"
            @click="computeSubcomponent(item.form, selectedRowDetails)"
            density="compact"
            :exact="true"
            :slim="true"
          >
            <template v-slot:prepend>
              <v-btn class="mr-2 pa-1" size="medium" color="#107bac" :icon="item.icon">
              </v-btn>
            </template>
          </v-list-item>
        </v-list-group>
      </v-list>

      <v-list
        rounded="lg"
        :lines="false"
        density="compact"
        nav
        class="pa-1"
        v-model:opened="ProccessingAndQueriesopenedGroups"
      >
        <v-list-group value="group2" :fluid="true" v-if="processing_and_queries.length > 0" group>
          <template v-slot:activator="{ props }">
            <v-list-item v-bind="props" :title="'Processing and Queries' + selectedRowDetails.id"></v-list-item>
          </template>
          <v-list-item
            class="mt-2"
            v-for="item in processing_and_queries"
            :key="item.label"
            :title="item.label"
            :value="item.label"
            @click="computeProcessingQueries(item.form, selectedRowDetails)"
            density="compact"
            :exact="true"
            :slim="true"
          >
            <template v-slot:prepend>
              <v-btn class="mr-2 pa-1" size="medium" color="#107bac" :icon="item.icon">
              </v-btn>
            </template>
          </v-list-item>
        </v-list-group>
      </v-list>
        
      <v-list
        rounded="lg"
        :lines="false"
        density="compact"
        nav
        class="pa-1"
        v-model:opened="TemplateopenedGroups"
      >
        <v-list-group value="group3" :fluid="true" v-if="table_and_template.length > 0" group>
          <template v-slot:activator="{ props }">
            <v-list-item v-bind="props" :title="'Tables and Templates' + selectedRowDetails.id"></v-list-item>
          </template>
          <v-list-item
            class="mt-2"
            v-for="item in table_and_template"
            :key="item.label"
            :title="item.label"
            :value="item.label"
            @click="computeTableAndTemplate(item.form, selectedRowDetails)"
            density="compact"
            :exact="true"
            :slim="true"
          >
            <template v-slot:prepend>
              <v-btn class="mr-2 pa-1" size="medium" color="#107bac" :icon="item.icon">
              </v-btn>
            </template>
          </v-list-item>
        </v-list-group>
      </v-list>
      
    </v-navigation-drawer>
    <!-- MAIN CONTENT -->
    <v-main>
      <v-container  :fluid="true">
        <NuxtPage />
      </v-container>
    </v-main>
    <Snackbar />
    <GlobalTemplateDialog />
    <UserProfile :open_user_profile="open_user_profile" @close-dialog="closeUserProfile" />
  </v-app>
</template>

<script setup>
import nuxtStorage from "nuxt-storage";
import { storeToRefs } from "pinia";
import { useAuthStore } from "~/store/auth";
import { ref, onUpdated, onMounted } from "vue";
import ModalSettings from "~/components/system-settings/forms/global-settings/ModalSettings.vue";
import navigation_items from "../constants/navigation-menu";
import GlobalTemplateDialog from "~/components/GlobalTemplateDialog.vue";
import UserProfile from "../pages/UserProfile.vue";

const router = useRouter();
const route = useRoute();
const { authenticated } = storeToRefs(useAuthStore()); // make authenticated state reactive
const { selectedRowDetails } = storeToRefs(useSubcomponentSelectedRowDetailsStore()); //state id for subcomponents ?id=123
const  {subcomponents}  = storeToRefs(useNavigationMenuStore()); //state id for subcomponents ?id=123
const { logUserOut } = useAuthStore();
const items = navigation_items;
const open = ref(["0","1","2","3"]);
const drawer = ref(null);
const openedGroups = ref(["group1"]);
const TemplateopenedGroups = ref(["group2"]);
const ProccessingAndQueriesopenedGroups = ref(["group3"]);
const table_and_template = ref([]);
const processing_and_queries = ref([]);
const rightSidebarDisplay = ref(false);
const showWarning = ref(false);
const open_user_profile = ref(false);

// Current time state and update function
const currentTime = ref(new Date().toLocaleTimeString());
const currentDay = ref(new Date().toLocaleDateString());
const updateDateTime = () => {
  const currentDate = new Date();
  currentTime.value = currentDate.toLocaleTimeString();
  currentDay.value = currentDate.toLocaleDateString(undefined, {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  // currentTime.value = new Date().toLocaleTimeString();
};

const computeSubcomponent = (dialog,type) => {
    if(!selectedRowDetails.value.id) return  useSnackbar(true,'red','Please select a record first');
    if(dialog){
      useSubComponents(dialog)
    }
}
const computeTableAndTemplate = (dialog,type)=>{
    if(dialog){
      useTableAndTemplate(dialog)
    }
}
const computeProcessingQueries = (dialog,type) => {
    if(!selectedRowDetails.value.id) return  useSnackbar(true,'red','Please select a record first');
    if(dialog){
      useProcessingQueries(dialog)
    }
}

// const computeTo = (path, detail) => {
//   if(detail.id && path == '/system-settings/system-users/modules'){
//     return router.push({ path: `${path}/${detail.role_id}` });
//   }

//   if (detail.id) {
//     return router.push({ path: `${path}/${detail.id}` });
//   } else if(detail.id == "" || detail.id == null) {
//     useSnackbar(true,'red','Please select a record first');
//   }
// };

const displayRightOptions = (item) => {
  subcomponents.value = [];
  processing_and_queries.value = [];
  table_and_template.value = [];
  subcomponents.value = item.subcomponents;
  table_and_template.value = item.table_and_template;
  processing_and_queries.value = item.processing_and_queries;
};

const can_browse = (item) => {
  let userdetails = JSON.parse(nuxtStorage.localStorage.getData("user_details"));
  // return true;
  if (userdetails) {
    return userdetails.role.permissions.some((permission) => permission.key == item);
  }
};

onUpdated(() => {
  if (route.path !== "/dashboard") {
    rightSidebarDisplay.value = true;
  }
});

onMounted(async () => {
  updateDateTime();
  // Update the time every second
  const intervalId = setInterval(updateDateTime, 1000);
  // Stop the interval when the component is unmounted
  watchEffect(() => {
    onBeforeUnmount(() => {
      clearInterval(intervalId);
    });
  });
  if (route.path !== "/dashboard") {
    rightSidebarDisplay.value = true;
  }
  // Filter items based on the `active` property and map their indices
  const defaultOpenGroups = items
    .filter((item) => item.active)
    .map((item, index) => index);
  open.value = defaultOpenGroups;
  if(authenticated){
    useDropdownlist();
  }

});
const openUserProfile = () => {
  open_user_profile.value = true;
}
const closeUserProfile = () => {
  open_user_profile.value = false;
}
const logout = () => {
  logUserOut();
  router.push("/");
  subcomponents.value = [];
  processing_and_queries.value = [];
  table_and_template.value = [];
};
</script>

<style>
* {
  font-family: 'Montserrat', sans-serif;
}
.v-navigation-drawer{
  border-style: none !important;
}
.header {
  font-weight: bolder;
  text-align: center;
}
.v-list-group {
  margin-bottom: 4px;
  border: 1px solid #117dad;
  padding: 4px;
  border-radius: 8px;
}
.v-list-item--nav .v-list-item-title {
  font-weight: bold;
  font-size: 14.5px !important;
  color: #117dad;
}
.title-span {
  font-size: 14.5px;
  text-decoration: underline;
}
.title-span:hover {
  color: #000;
  font-weight: bold;
}
::-webkit-scrollbar {
    width: 12px;
}
::-webkit-scrollbar-thumb {
    background-color: #107bac; 
    border-radius: 10px; 
    border: 3px solid #f5f5f5; 
}
::-webkit-scrollbar-track {
    background-color: #f5f5f5; 
}
.v-overlay__scrim {
    pointer-events: auto;
    /* background: #fbfbfb !important; */
    bottom: 0;
    left: 0;
    /* opacity: 1 !important; */
    position: fixed;
    right: 0;
    top: 0;
}
.v-expansion-panel--active > .v-expansion-panel-title:not(.v-expansion-panel-title--static){
    height: 45px !important;
}
</style>
