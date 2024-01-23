<template>
    <v-app>
        <v-app-bar v-if="authenticated" flat elevation="1" color="#117dad">
            <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
            <img src="/cduh_logo.png" width="50" height="50" />
            <v-app-bar-title>Hospital Information System</v-app-bar-title>
            <!-- <v-app-bar-nav @click="drawer = !drawer"> </v-app-bar-nav> -->
            <!-- GLOBAL SETTINGS MODAL -->
            <v-btn icon="mdi-home"></v-btn>
            <v-spacer></v-spacer>
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
                            ><v-icon class="mr-4">mdi-account-circle</v-icon
                            >View Profile</v-list-item-title
                        >
                    </v-list-item>
                    <v-list-item @click="logout">
                        <v-list-item-title
                            ><v-icon class="mr-4">mdi-logout</v-icon
                            >Logout</v-list-item-title
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
            <v-list :lines="false" density="compact" nav>
                <template v-for="(item, i) in items" :key="i">
                    <template v-if="item.child.length == 0">
                        <v-list-item :value="item" color="primary">
                            <template v-slot:prepend>
                                <v-icon :icon="item.icon"></v-icon>
                            </template>
                            <v-list-item-title
                                v-text="item.label"
                            ></v-list-item-title>
                        </v-list-item>
                    </template>
                    <v-list-group
                        :value="item.label"
                        v-if="item.child.length > 0"
                        :fluid="true"
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
                        <v-list-item
                            class="ml-4 mt-2"
                            v-for="child in item.child"
                            :key="child.label"
                            :title="child.label"
                            :value="child.label"
                            :to="child.path"
                            density="compact"
                            :exact="true"
                            :slim="true"
                            @click="displayRightOptions(child)"
                        >
                            <template v-slot:prepend>
                            <v-icon  :icon="child.icon"></v-icon>
                            </template>
                        </v-list-item>
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
            v-if="!rightSidebarDisplay && authenticated"
        >
            <v-list v-for="options in subcomponents">
                <v-list-item :to="options.path" :key="options.label" link
                    >TEST</v-list-item
                >
            </v-list>
        </v-navigation-drawer>

        <!-- MAIN CONTENT -->
        <v-main>
            <v-container :fluid="true">
                <NuxtPage />
            </v-container>
        </v-main>
    </v-app>
</template>

<script setup>
import { storeToRefs } from "pinia";
import { useAuthStore } from "~/store/auth";
import { ref, onUpdated, onMounted } from "vue";
import ModalSettings from "~/components/system-settings/forms/global-settings/ModalSettings.vue";
import navigation_items from "../constants/navigation-menu";

const router = useRouter();
const route = useRoute();
const { authenticated } = storeToRefs(useAuthStore()); // make authenticated state reactive
const { logUserOut } = useAuthStore();
const items = navigation_items;
const drawer = ref(null);
const subcomponents = ref([]);

const rightSidebarDisplay = ref(false);

const displayRightOptions = (item) => {
    subcomponents.value = [];
    subcomponents.value = item.subcomponents;
};

onUpdated(() => {
    if (
        route.path !== "/dashboard" ||
        route.path !== "/system-settings/setup-options"
    ) {
        rightSidebarDisplay.value = true;
    }
});
onMounted(() => {
    if (
        route.path !== "/dashboard" ||
        route.path !== "/system-settings/setup-options"
    ) {
        rightSidebarDisplay.value = true;
    }
});
const logout = () => {
    logUserOut();
    router.push("/login");
};
</script>

<style>
.header {
    font-weight: bolder;
    text-align: center;
}
.v-list-item--nav .v-list-item-title {
    font-size: 16px !important;
}
</style>
