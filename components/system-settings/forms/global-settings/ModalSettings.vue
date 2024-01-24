<template>
    <v-dialog v-model="dialogVisible" width="800">
        <template v-slot:activator="{ props }">
            <v-btn v-bind="props" icon="mdi-cog"></v-btn>
        </template>

        <template v-slot:default>
            <v-card>
                <v-tabs v-model="tab" bg-color="#6984FF" center-active>
                    <v-tab value="one">Hospital Settings</v-tab>
                    <v-tab value="two">DOH Settings</v-tab>
                    <v-tab value="three">PHIC Settings</v-tab>
                    <v-tab value="four">Beacon Settings</v-tab>
                    <v-tab value="five">User Account Settings</v-tab>
                </v-tabs>

                <v-card-text>
                    <!-- Conditionally render content based on the selected tab -->
                    <div v-if="tab === 'one'">
                        <HospitalSettings
                            :hospital-data="hospitalData"
                            @close="closeTab"
                        />
                    </div>
                    <div v-if="tab === 'two'">
                        <DohSettings :doh-data="dohData" @close="closeTab" />
                    </div>
                    <div v-if="tab === 'three'">
                        <PhilHealthSettings
                            :phic-data="phicData"
                            @close="closeTab"
                        />
                    </div>
                    <div v-if="tab === 'four'">
                        <BeaconSettings
                            :beacon-data="beaconData"
                            @close="closeTab"
                        />
                    </div>
                    <div v-if="tab === 'five'">
                        <UserAccountSettings
                            :user-account-data="userAccountData"
                            @close="closeTab"
                        />
                    </div>
                </v-card-text>
            </v-card>
        </template>
    </v-dialog>
</template>

<script setup>
import { ref } from "vue";
import HospitalSettings from "./HospitalSettings.vue";
import DohSettings from "./DohSettings.vue";
import PhilHealthSettings from "./PhilHealthSettings.vue";
import BeaconSettings from "./BeaconSettings.vue";
import UserAccountSettings from "./UserAccountSettings.vue";

let dialogVisible = ref(false);
let tab = ref("one");
let hospitalData = ref({});
let dohData = ref({});
let phicData = ref({});
let beaconData = ref({});
let userAccountData = ref({});

const closeTab = () => {
    dialogVisible.value = false;
};
</script>

<style scoped></style>
