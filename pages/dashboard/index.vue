<template>
    <v-container>
        <v-row>
            <v-col cols="12" sm="6" md="4">
                <v-card class="mx-auto" max-width="368">
                    <v-card-item>
                        <template v-slot:subtitle>
                            <v-icon
                                icon="mdi-information-slab-circle-outline"
                                size="18"
                                color="info"
                                class="me-1 pb-1"
                            ></v-icon>

                            In Patients
                        </template>
                    </v-card-item>

                    <v-card-text class="py-0">
                        <v-row align="center" no-gutters>
                            <v-col class="text-h2" cols="6"> 250 </v-col>

                            <v-col cols="6" class="text-right">
                                <v-icon
                                    color="primary"
                                    icon="mdi-account-check"
                                    size="88"
                                ></v-icon>
                            </v-col>
                        </v-row>
                    </v-card-text>

                    <v-expand-transition>
                        <div v-if="expand">
                            <div class="py-2">
                                <v-slider
                                    v-model="time"
                                    :max="6"
                                    :step="1"
                                    :ticks="labels"
                                    class="mx-4"
                                    color="primary"
                                    density="compact"
                                    hide-details
                                    show-ticks="always"
                                    thumb-size="10"
                                ></v-slider>
                            </div>

                            <v-list class="bg-transparent">
                                <v-list-item
                                    v-for="item in forecast"
                                    :key="item.day"
                                    :title="item.day"
                                    :append-icon="item.icon"
                                    :subtitle="item.temp"
                                >
                                </v-list-item>
                            </v-list>
                        </div>
                    </v-expand-transition>

                    <v-divider></v-divider>

                    <v-card-actions>
                        <v-btn @click="expand = !expand">
                            {{ !expand ? "Full Report" : "Hide Report" }}
                        </v-btn>
                    </v-card-actions>
                </v-card>
            </v-col>
            <v-col cols="12" sm="6" md="4">
                <v-card class="mx-auto" max-width="368">
                    <v-card-item>
                        <template v-slot:subtitle>
                            <v-icon
                                icon="mdi-information-slab-circle-outline"
                                size="18"
                                color="info"
                                class="me-1 pb-1"
                            ></v-icon>

                            Out Patients
                        </template>
                    </v-card-item>

                    <v-card-text class="py-0">
                        <v-row align="center" no-gutters>
                            <v-col class="text-h2" cols="6"> 100 </v-col>

                            <v-col cols="6" class="text-right">
                                <v-icon
                                    color="warning"
                                    icon="mdi-account-cancel"
                                    size="88"
                                ></v-icon>
                            </v-col>
                        </v-row>
                    </v-card-text>

                    <v-expand-transition>
                        <div v-if="expand">
                            <div class="py-2">
                                <v-slider
                                    v-model="time"
                                    :max="6"
                                    :step="1"
                                    :ticks="labels"
                                    class="mx-4"
                                    color="primary"
                                    density="compact"
                                    hide-details
                                    show-ticks="always"
                                    thumb-size="10"
                                ></v-slider>
                            </div>

                            <v-list class="bg-transparent">
                                <v-list-item
                                    v-for="item in forecast"
                                    :key="item.day"
                                    :title="item.day"
                                    :append-icon="item.icon"
                                    :subtitle="item.temp"
                                >
                                </v-list-item>
                            </v-list>
                        </div>
                    </v-expand-transition>

                    <v-divider></v-divider>

                    <v-card-actions>
                        <v-btn @click="expand = !expand">
                            {{ !expand ? "Full Report" : "Hide Report" }}
                        </v-btn>
                    </v-card-actions>
                </v-card>
            </v-col>
            <v-col cols="12" sm="6" md="4">
                <v-card class="mx-auto" max-width="368">
                    <v-card-item>
                        <template v-slot:subtitle>
                            <v-icon
                                icon="mdi-information-slab-circle-outline"
                                size="18"
                                color="info"
                                class="me-1 pb-1"
                            ></v-icon>

                            Emergency Patients
                        </template>
                    </v-card-item>

                    <v-card-text class="py-0">
                        <v-row align="center" no-gutters>
                            <v-col class="text-h2" cols="6"> 25 </v-col>

                            <v-col cols="6" class="text-right">
                                <v-icon
                                    color="error"
                                    icon="mdi-account-alert"
                                    size="88"
                                ></v-icon>
                            </v-col>
                        </v-row>
                    </v-card-text>

                    <v-expand-transition>
                        <div v-if="expand">
                            <div class="py-2">
                                <v-slider
                                    v-model="time"
                                    :max="6"
                                    :step="1"
                                    :ticks="labels"
                                    class="mx-4"
                                    color="primary"
                                    density="compact"
                                    hide-details
                                    show-ticks="always"
                                    thumb-size="10"
                                ></v-slider>
                            </div>

                            <v-list class="bg-transparent">
                                <v-list-item
                                    v-for="item in forecast"
                                    :key="item.day"
                                    :title="item.day"
                                    :append-icon="item.icon"
                                    :subtitle="item.temp"
                                >
                                </v-list-item>
                            </v-list>
                        </div>
                    </v-expand-transition>

                    <v-divider></v-divider>

                    <v-card-actions>
                        <v-btn @click="expand = !expand">
                            {{ !expand ? "Full Report" : "Hide Report" }}
                        </v-btn>
                    </v-card-actions>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>

<script setup>
definePageMeta({
    layout: "root-layout",
});

const labels = ref({
    0: "SU",
    1: "MO",
    2: "TU",
    3: "WED",
    4: "TH",
    5: "FR",
    6: "SA",
});
const expand = ref(false);
const time = ref(0);
const forecast = ref([
    { day: "Tuesday", icon: "mdi-white-balance-sunny", temp: "24\xB0/12\xB0" },
    {
        day: "Wednesday",
        icon: "mdi-white-balance-sunny",
        temp: "22\xB0/14\xB0",
    },
    { day: "Thursday", icon: "mdi-cloud", temp: "25\xB0/15\xB0" },
]);
</script>

<style scoped>
.v-card-title {
    color: #117dad;
}
</style>
