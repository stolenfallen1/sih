<template>
    <v-app>
        <v-app-bar flat elevation="1" color="#117dad">
            <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
            <img src="/public/cduh_logo.png" width="50" height="50" />
            <v-app-bar-title>Hospital Information System</v-app-bar-title>
            <v-app-bar-nav @click="drawer = !drawer"> </v-app-bar-nav>
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
                    <v-list-item
                        v-for="(item, index) in profile_items"
                        :key="index"
                    >
                        <v-list-item-title>
                            <v-icon class="mr-4">{{ item.icon }}</v-icon
                            >{{ item.title }}</v-list-item-title
                        >
                    </v-list-item>
                </v-list>
            </v-menu>
        </v-app-bar>

        <!-- LEFT SIDEBAR -->
        <v-navigation-drawer class="drawer" v-model="drawer" permanent="true">
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
                        fluid
                    >
                        <template v-slot:activator="{ props }">
                            <v-list-item
                                v-bind="props"
                                :prepend-icon="item.icon"
                                :title="item.label"
                                density="compact"
                                exact="true"
                                slim="true"
                            ></v-list-item>
                        </template>
                        <v-list-item
                            class="ml-4 mt-2"
                            v-for="child in item.child"
                            :key="child.label"
                            :title="child.label"
                            :value="child.label"
                            :to="child.path"
                            :prepend-icon="child.icon"
                            density="compact"
                            exact="true"
                            slim="true"
                        ></v-list-item>
                    </v-list-group>
                </template>
            </v-list>
        </v-navigation-drawer>

        <!-- RIGHT SIDEBAR RENDER CONDITIONALLY -->
        <v-navigation-drawer
            location="right"
            class="drawer"
            v-model="drawer"
            permanent="true"
            v-if="rightSidebarDisplay"
        >
        </v-navigation-drawer>

        <!-- MAIN CONTENT -->
        <v-main>
            <v-container fluid="true">
                <NuxtPage />
            </v-container>
        </v-main>
    </v-app>
</template>

<script setup>
import { ref, onUpdated, onMounted } from "vue";
import ModalSettings from "~/components/system-settings/forms/global-settings/ModalSettings.vue";
import navigation_items from "../constants/navigation-menu";

const items = navigation_items;

const drawer = ref(null);

const profile_items = [
    { title: "View Profile", icon: "mdi-account-circle" },
    { title: "Logout", icon: "mdi-logout" },
];

const rightSidebarDisplay = ref(false);
onUpdated(() => {
    if (window.location.pathname !== "/dashboard") {
        rightSidebarDisplay.value = true;
    }
});
onMounted(() => {
    if (window.location.pathname !== "/dashboard") {
        rightSidebarDisplay.value = true;
    }
});
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
