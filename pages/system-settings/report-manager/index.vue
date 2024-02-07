<template>
    <v-card>
        <v-card-title>Report Manager</v-card-title>
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
                                                <th width="4"></th>
                                                <th width="4"></th>
                                                <th>Report Description</th>
                                                <th>Remarks</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <template v-for="(reportItem, reportItemIndex) in settings.report" :key="reportItemIndex">
                                                <tr>
                                                    <template v-for="(value, key) in reportItem" :key="key">
                                                        <td v-if="key === 'printIcon'"><v-btn density="compact"><v-icon color="green">{{ value }}</v-icon></v-btn></td>
                                                    </template>
                                                    <template v-for="(value, key) in reportItem" :key="key">
                                                        <td v-if="key === 'toolIcon'"><v-btn density="compact"><v-icon color="orange">{{ value }}</v-icon></v-btn></td>
                                                    </template>
                                                    <!-- For the Report Description -->
                                                    <template v-for="(value, key) in reportItem" :key="key">
                                                        <td v-if="key === 'description'">{{ value }}</td>
                                                    </template>
                                                    <!-- For the Remarks -->
                                                    <template v-for="(value, key) in reportItem" :key="key">
                                                        <td v-if="key === 'remarks'">{{ value }}</td>
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
                settingsPanel: "Group: Admissions, Emergencies and Outpatients",
                report: [
                    { printIcon: "mdi-printer", toolIcon: "mdi-tools", description:  "Reports Settings 1A", remarks: "TEST REMARKS"},
                    { printIcon: "mdi-printer", toolIcon: "mdi-tools", description:  "Reports Settings 1B", remarks: "TEST REMARKS"},
                ],
            },
            {
                settingsPanel: "Group: Cash Reciepts and Collections",
                report: [
                    { printIcon: "mdi-printer", toolIcon: "mdi-tools", description:  "Reports Settings 2", remarks: "TEST REMARKS"},
                ],
            },
            {
                settingsPanel: "Group: Customized Reports",
                report: [
                    { printIcon: "mdi-printer", toolIcon: "mdi-tools", description:  "Reports Settings 3", remarks: "TEST REMARKS"},
                ],
            },
            {
                settingsPanel: "Group: Government Reports",
                report: [
                    { printIcon: "mdi-printer", toolIcon: "mdi-tools", description:  "Reports Settings 4A", remarks: "TEST REMARKS"},
                    { printIcon: "mdi-printer", toolIcon: "mdi-tools", description:  "Reports Settings 4B", remarks: "TEST REMARKS"},
                ],
            },
            {
                settingsPanel: "Group: Master File and Templates",
                report: [
                    { printIcon: "mdi-printer", toolIcon: "mdi-tools", description:  "Reports Settings 5", remarks: "TEST REMARKS"},
                ],
            },
            {
                settingsPanel: "Group: Requisitions, Charges and Billing Statements",
                report: [
                    { printIcon: "mdi-printer", toolIcon: "mdi-tools", description:  "Reports Settings 6", remarks: "TEST REMARKS"},
                ],
            },
            {
                settingsPanel: "Group: Others",
                report: [
                    { printIcon: "mdi-printer", toolIcon: "mdi-tools", description:  "Reports Settings 7A", remarks: "TEST REMARKS"},
                    { printIcon: "mdi-printer", toolIcon: "mdi-tools", description:  "Reports Settings 7B", remarks: "TEST REMARKS"},
                ],
            },
        ],
    },
];

onMounted(() => {
    panel.value = [0, 1, 2, 3, 4, 5, 6];
})
onUpdated(() => {
    panel.value = [0, 1, 2, 3, 4, 5, 6];
})
</script>

<style scoped></style>
