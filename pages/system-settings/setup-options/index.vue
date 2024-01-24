<template>
    <v-dialog v-model="dialog" persistent hide-overlay width="800" scrollable>
        <v-card title="Setup and Options">
            <v-card-text style="height: 450px">
                <v-expansion-panels
                    v-model="panel"
                    variant="accordion"
                    :disabled="disabled"
                    multiple
                >
                    <v-expansion-panel>
                        <v-expansion-panel-title
                            >Panel 1</v-expansion-panel-title
                        >
                        <v-expansion-panel-text>
                            <v-text-field
                                variant="outlined"
                                density="compact"
                            ></v-text-field>
                        </v-expansion-panel-text>
                    </v-expansion-panel>
                    <v-expansion-panel>
                        <v-expansion-panel-title
                            >Panel 2</v-expansion-panel-title
                        >
                        <v-expansion-panel-text>
                            <v-text-field
                                variant="outlined"
                                density="compact"
                            ></v-text-field>
                        </v-expansion-panel-text>
                    </v-expansion-panel>
                    <v-expansion-panel>
                        <v-expansion-panel-title
                            >Panel 3</v-expansion-panel-title
                        >
                        <v-expansion-panel-text>
                            <v-text-field
                                variant="outlined"
                                density="compact"
                            ></v-text-field>
                        </v-expansion-panel-text>
                    </v-expansion-panel>
                    <v-expansion-panel>
                        <v-expansion-panel-title
                            >Panel 4</v-expansion-panel-title
                        >
                        <v-expansion-panel-text>
                            <v-text-field
                                variant="outlined"
                                density="compact"
                            ></v-text-field>
                        </v-expansion-panel-text>
                    </v-expansion-panel>
                    <v-expansion-panel>
                        <v-expansion-panel-title
                            >Panel 5</v-expansion-panel-title
                        >
                        <v-expansion-panel-text>
                            <v-text-field
                                variant="outlined"
                                density="compact"
                            ></v-text-field>
                        </v-expansion-panel-text>
                    </v-expansion-panel>
                    <v-expansion-panel>
                        <v-expansion-panel-title
                            >Panel 6</v-expansion-panel-title
                        >
                        <v-expansion-panel-text>
                            <v-text-field
                                variant="outlined"
                                density="compact"
                            ></v-text-field>
                        </v-expansion-panel-text>
                    </v-expansion-panel>
                    <v-expansion-panel>
                        <v-expansion-panel-title
                            >Panel 7</v-expansion-panel-title
                        >
                        <v-expansion-panel-text>
                            <v-text-field
                                variant="outlined"
                                density="compact"
                            ></v-text-field>
                        </v-expansion-panel-text>
                    </v-expansion-panel>
                    <v-expansion-panel>
                        <v-expansion-panel-title
                            >Panel 8</v-expansion-panel-title
                        >
                        <v-expansion-panel-text>
                            <v-text-field
                                variant="outlined"
                                density="compact"
                            ></v-text-field>
                        </v-expansion-panel-text>
                    </v-expansion-panel>
                    <v-expansion-panel>
                        <v-expansion-panel-title
                            >Panel 9</v-expansion-panel-title
                        >
                        <v-expansion-panel-text>
                            <v-text-field
                                variant="outlined"
                                density="compact"
                            ></v-text-field>
                        </v-expansion-panel-text>
                    </v-expansion-panel>
                    <v-expansion-panel>
                        <v-expansion-panel-title
                            >Panel 10</v-expansion-panel-title
                        >
                        <v-expansion-panel-text>
                            <v-text-field
                                variant="outlined"
                                density="compact"
                            ></v-text-field>
                        </v-expansion-panel-text>
                    </v-expansion-panel>
                    <v-expansion-panel>
                        <v-expansion-panel-title
                            >Panel 11</v-expansion-panel-title
                        >
                        <v-expansion-panel-text>
                            <v-text-field
                                variant="outlined"
                                density="compact"
                            ></v-text-field>
                        </v-expansion-panel-text>
                    </v-expansion-panel>
                    <v-expansion-panel>
                        <v-expansion-panel-title
                            >Panel 12</v-expansion-panel-title
                        >
                        <v-expansion-panel-text>
                            <v-text-field
                                variant="outlined"
                                density="compact"
                            ></v-text-field>
                        </v-expansion-panel-text>
                    </v-expansion-panel>
                    <v-expansion-panel>
                        <v-expansion-panel-title
                            >Panel 13</v-expansion-panel-title
                        >
                        <v-expansion-panel-text>
                            <v-text-field
                                variant="outlined"
                                density="compact"
                            ></v-text-field>
                        </v-expansion-panel-text>
                    </v-expansion-panel>
                    <v-expansion-panel>
                        <v-expansion-panel-title
                            >Panel 14</v-expansion-panel-title
                        >
                        <v-expansion-panel-text>
                            <v-text-field
                                variant="outlined"
                                density="compact"
                            ></v-text-field>
                        </v-expansion-panel-text>
                    </v-expansion-panel>
                </v-expansion-panels>
            </v-card-text>
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn text="Close Dialog" @click="router.back()"></v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script setup>
definePageMeta({
    layout: "root-layout",
});

const panel = ref([0]);
const disabled = ref(false);
const router = useRouter();
const dialog = ref(true);
</script>

<style scoped></style>
