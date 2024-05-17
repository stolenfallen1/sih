<template>
    <v-card>
        <v-card-title>Setup and Options</v-card-title>
        <v-card-text>
            <v-container>
                <v-row>
                    <v-col v-for="(report, reportIndex) in reports" :key="reportIndex" cols="12" sm="6" md="12">
                        <v-divider></v-divider>
                        <br/>
                        <v-expansion-panels v-model="panel" variant="accordion" multiple>
                            <v-expansion-panel v-for="(settings, settingsIndex) in report.settings" :key="settingsIndex" :title="settings.settingsPanel">
                                <v-expansion-panel-text>
                                    <v-table density="compact">
                                        <thead>
                                            <tr>
                                                <th>Description</th>
                                                <th>Value</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <template v-for="(reportItem, reportItemIndex) in settings.report" :key="reportItemIndex">
                                                <tr>
                                                    <!-- For the Description -->
                                                    <template v-for="(value, key) in reportItem" :key="key">
                                                        <td v-if="key === 'description'">{{ value }}</td>
                                                    </template>
                                                    <!-- For the Values -->
                                                    <template v-for="(value, key) in reportItem" :key="key">
                                                        <template v-if="value === 'dropdown'">
                                                            <v-select
                                                                class="mt-2"
                                                                density="compact"
                                                                :items="reportItem.dropdown_values"
                                                            ></v-select>
                                                        </template>
                                                        <template v-else-if="value === 'text'">
                                                            <v-text-field
                                                                class="mt-2"
                                                                density="compact"
                                                            ></v-text-field>
                                                        </template>
                                                    </template>
                                                </tr>
                                            </template>
                                        </tbody>
                                    </v-table>
                                </v-expansion-panel-text>
                            </v-expansion-panel>
                        </v-expansion-panels>
                    </v-col>
                </v-row>
            </v-container>
        </v-card-text>
        <v-divider></v-divider>
        <!-- Buttons here if ever needed -->
        <!-- <v-card-actions>
        </v-card-actions> -->
    </v-card>
</template>

<script setup>
definePageMeta({
    layout: "root-layout",
});

const panel = ref([]);
const reports = [
    {
        settings: [
            {
                settingsPanel: "Group: 1",
                report: [
                    { description:  "Reports Settings 1 for Group 1", type: "dropdown", dropdown_values: ["Yes", "No"] },
                    { description:  "Reports Settings 2 for Group 1", type: "text"},
                ],
            },
            {
                settingsPanel: "Group: 2",
                report: [
                    { description:  "Reports Settings 1 for Group 2", type: "dropdown", dropdown_values: ["Item 1", "Item 2", "Item 3"] },
                    { description:  "Reports Settings 2 for Group 2", type: "text"},
                ],
            },
            {
                settingsPanel: "Group: 3",
                report: [
                    { description:  "Reports Settings 1 for Group 3", type: "dropdown", dropdown_values: ["Item A", "Item B", "Item C"]},
                    { description:  "Reports Settings 2 for Group 3", type: "dropdown", dropdown_values: ["Yes", "No"] },
                ],
            },
            {
                settingsPanel: "Group: 4",
                report: [
                    { description:  "Reports Settings 1 for Group 4", type: "text"},
                    { description:  "Reports Settings 2 for Group 4", type: "dropdown", dropdown_values: ["Yes", "No"] },
                ],
            },
            {
                settingsPanel: "Group: 5",
                report: [
                    { description:  "Reports Settings 1 for Group 5", type: "text"},
                    { description:  "Reports Settings 2 for Group 5", type: "dropdown", dropdown_values: ["Item A", "Item B", "Item C"] },
                ],
            },
            {
                settingsPanel: "Group: 6",
                report: [
                    { description:  "Reports Settings 1 for Group 6", type: "dropdown", dropdown_values: ["Yes", "No"] },
                    { description:  "Reports Settings 2 for Group 6", type: "text"},
                ],
            },
            {
                settingsPanel: "Group: 7",
                report: [
                    { description:  "Reports Settings 1 for Group 7", type: "text"},
                    { description:  "Reports Settings 2 for Group 7", type: "text"},
                ],
            },
            {
                settingsPanel: "Group: 8",
                report: [
                    { description:  "Reports Settings 2 for Group 8", type: "text"},
                    { description:  "Reports Settings 2 for Group 8", type: "text"},
                ],
            },
            {
                settingsPanel: "Group: 9",
                report: [
                    { description:  "Reports Settings 1 for Group 9", type: "text"},
                    { description:  "Reports Settings 2 for Group 9", type: "dropdown", dropdown_values: ["Item A", "Item B", "Item C"] },
                ],
            },
            {
                settingsPanel: "Group: 10",
                report: [
                    { description:  "Reports Settings 1 for Group 10", type: "dropdown", dropdown_values: ["Item 1", "Item 2", "Item 3"] },
                    { description:  "Reports Settings 2 for Group 10", type: "text"},
                ],
            },
            {
                settingsPanel: "Group: 11",
                report: [
                    { description:  "Reports Settings 1 for Group 11", type: "text"},
                    { description:  "Reports Settings 2 for Group 11", type: "dropdown", dropdown_values: ["Yes", "No"] },
                ],
            },
            {
                settingsPanel: "Group: 12",
                report: [
                    { description:  "Reports Settings 1 for Group 12", type: "dropdown", dropdown_values: ["Yes", "No"] },
                    { description:  "Reports Settings 2 for Group 12", type: "text"},
                ],
            },
            {
                settingsPanel: "Group: 13",
                report: [
                    { description:  "Reports Settings 1 for Group 13", type: "dropdown", dropdown_values: ["Yes", "No"] },
                    { description:  "Reports Settings 2 for Group 13", type: "text"},
                ],
            },
            {
                settingsPanel: "Group: 14",
                report: [
                    { description:  "Reports Settings 1 for Group 14", type: "dropdown", dropdown_values: ["Yes", "No"] },
                    { description:  "Reports Settings 2 for Group 14", type: "text"},
                ],
            },
        ],
    },
];

onMounted(() => {
    panel.value = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13];
})
onUpdated(() => {
    panel.value = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13];
})
</script>

<style scoped></style>
