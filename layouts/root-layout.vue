<template>
  <v-app>
    <v-app-bar v-if="authenticated" flat elevation="1" color="#6984FF">
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
      <img src="/cdg_logo.png" width="50" height="50" />
      <img src="/cduh_logo.png" width="50" height="50" />
      <div class="ml-4">
        <p>Cebu Doctors University Hospital</p>
        <span class="title-span">Hospital Information System</span>
      </div>
      <v-spacer></v-spacer>
      <v-btn icon="mdi-home" @click="router.push('/dashboard')"></v-btn>
      <v-spacer></v-spacer>
      <div class="mr-10">{{ currentTime }}</div>
      <ModalSettings />
      <v-btn icon="mdi-bell-alert-outline"></v-btn>
      <v-menu>
        <template v-slot:activator="{ props }">
          <v-btn color="#FFF" v-bind="props" icon>
            <v-icon>mdi-account</v-icon>
          </v-btn>
        </template>

        <v-list>
          <v-list-item>
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
      :permanent="true"
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
                    color="#6984FF"
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
      :permanent="true"
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
            @click="computeTo(item.path, selectedRowDetails)"
            density="compact"
            :exact="true"
            :slim="true"
          >
            <template v-slot:prepend>
              <v-btn class="mr-2 pa-1" size="medium" color="#6984FF" :icon="item.icon">
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
        <v-list-group value="group1" :fluid="true" v-if="table_and_template.length > 0" group>
          <template v-slot:activator="{ props }">
            <v-list-item v-bind="props" :title="'Tables and Templates' + selectedRowDetails.id"></v-list-item>
          </template>
          <v-list-item
            class="mt-2"
            v-for="item in table_and_template"
            :key="item.label"
            :title="item.label"
            :value="item.label"
            @click="computeTo(item.path, selectedRowDetails)"
            density="compact"
            :exact="true"
            :slim="true"
          >
            <template v-slot:prepend>
              <v-btn class="mr-2 pa-1" size="medium" color="#6984FF" :icon="item.icon">
              </v-btn>
            </template>
          </v-list-item>
        </v-list-group>
      </v-list>
      
    </v-navigation-drawer>
    <!-- MAIN CONTENT -->
    <v-main>
      <v-container class="pa-2" :fluid="true">
        <NuxtPage />
      </v-container>
    </v-main>

    <Snackbar :show="showWarning" color="red" text="Please select a record first" />
  </v-app>
</template>

<script setup>
import nuxtStorage from "nuxt-storage";
import { storeToRefs } from "pinia";
import { useAuthStore } from "~/store/auth";
import { ref, onUpdated, onMounted } from "vue";
import ModalSettings from "~/components/system-settings/forms/global-settings/ModalSettings.vue";
import navigation_items from "../constants/navigation-menu";

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
const TemplateopenedGroups = ref(["group1"]);
// const subcomponents = ref([]);
const table_and_template = ref([]);
const token = useCookie("token");
const rightSidebarDisplay = ref(false);
const showWarning = ref(false);

// Current time state and update function
const currentTime = ref(new Date().toLocaleTimeString());
const updateTime = () => {
  currentTime.value = new Date().toLocaleTimeString();
};


const computeTo = (path, detail) => {
  console.log(path,'51qweqwe ');
  if(detail.id && path == '/system-settings/system-users/modules'){
    return router.push({ path: `${path}/${detail.role_id}` });
  }

  if (detail.id) {
    return router.push({ path: `${path}/${detail.id}` });
  } else if(detail.id == "" || detail.id == null) {
    showWarning.value = true;
    setTimeout(() => {
      showWarning.value = false;
    }, 1000);
  }
};
const displayRightOptions = (item) => {
  subcomponents.value = [];
  table_and_template.value = [];
  subcomponents.value = item.subcomponents;
  table_and_template.value = item.table_and_template;
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
  console.log(selectedRowDetails.value.id,'test asdasdasd');
});

onMounted(async () => {
   updateTime();
  // Update the time every second
  const intervalId = setInterval(updateTime, 1000);
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
  console.log(selectedRowDetails.value.id,'test asdasdasd');
});

const logout = () => {
  logUserOut();
  router.push("/");
};
</script>

<style>
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
  /* font-style: italic; */
}
/* .v-list-item__prepend {
    margin-right: 8px;
    background-color: #6984ff;
    border-radius: 50%;
    padding: 4px;
} */
</style>
