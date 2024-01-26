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
                    <SettingPanels
                        v-for="(item, index) in panelData"
                        :key="index"
                        :PanelTitle="item.name"
                        :headers="headers"
                        :tableData="item.desserts"
                    >
                    </SettingPanels>
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
import SettingPanels from "~/components/system-settings/panels/SettingPanels.vue";
import paneldata from "~/components/system-settings/panels/paneldata.js";

definePageMeta({
    layout: "root-layout",
});

const panel = ref([0]);
const disabled = ref(false);
const router = useRouter();
const dialog = ref(true);
const panelData = paneldata;

const headers = ref([
    {
        title: "Description",
        align: "start",
        sortable: false,
        key: "name",
    },
    { title: "Value", key: "calories", align: "end" },
]);
</script>

<style scoped></style>
