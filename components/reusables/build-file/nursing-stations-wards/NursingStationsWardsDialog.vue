<template>
    <v-dialog :model-value="show" rounded="lg" @update:model-value="closeDialog"  hide-overlay width="800" scrollable>
        <v-card rounded="lg">
            <v-toolbar density="compact" color="#6984ff" hide-details>
                <v-toolbar-title>Nurse Stations. Wards</v-toolbar-title>
                <v-spacer></v-spacer>
                <v-btn color="white" @click="closeDialog">
                    <v-icon>mdi-close</v-icon>
                </v-btn>
            </v-toolbar>
            <v-card-text>
                <v-container>
                    <v-row>
                        <v-col v-for="(report, reportIndex) in reports" :key="reportIndex" cols="12" sm="6" md="12">
                            <v-divider></v-divider>
                            <br/>
                            <v-expansion-panels v-model="panel" variant="accordion" multiple>
                                <v-expansion-panel v-for="(settings, settingsIndex) in report.settings" :key="settingsIndex" :title="settings.settingsPanel">
                                    <v-expansion-panel-text>
                                        <v-table hide-details density="compact">
                                            <thead>
                                                <tr>
                                                    <th><v-icon>mdi-desktop-classic</v-icon></th>
                                                    <th>Code</th>
                                                    <th>Internal Subaccount Code</th>
                                                    <th>Floor</th>
                                                    <th>Description</th>
                                                    <th>Department</th>
                                                    <th width="4"></th>
                                                    <th width="4"></th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <template v-for="(reportItem, reportItemIndex) in settings.report" :key="reportItemIndex">
                                                    <tr>
                                                        <template v-for="(value, key) in reportItem" :key="key">
                                                            <td v-if="key === 'system_default'">
                                                                <v-checkbox density="compact"></v-checkbox>
                                                            </td>
                                                        </template> 
                                                        <!-- For the Report Code -->
                                                        <template v-for="(value, key) in reportItem" :key="key">
                                                            <td v-if="key === 'code'">{{ value }}</td>
                                                        </template>
                                                        <!-- For the Internal Sub Code -->
                                                        <template v-for="(value, key) in reportItem" :key="key">
                                                            <td v-if="key === 'sub_code'">{{ value }}</td>
                                                        </template>
                                                        <!-- For the Floor -->
                                                        <template v-for="(value, key) in reportItem" :key="key">
                                                            <td v-if="key === 'floor'">{{ value }}</td>
                                                        </template>
                                                        <!-- For the Description -->
                                                        <template v-for="(value, key) in reportItem" :key="key">
                                                            <td v-if="key === 'description'">{{ value }}</td>
                                                        </template>
                                                        <!-- For the Department -->
                                                        <template v-for="(value, key) in reportItem" :key="key">
                                                            <td v-if="key === 'department'">{{ value }}</td>
                                                        </template>
                                                        <template v-for="(value, key) in reportItem" :key="key">
                                                            <td v-if="key === 'editIcon'"><v-btn density="compact"><v-icon color="green" @click="openFormDialog">{{ value }}</v-icon></v-btn></td>
                                                        </template>
                                                        <template v-for="(value, key) in reportItem" :key="key">
                                                            <td v-if="key === 'deleteIcon'"><v-btn density="compact"><v-icon color="orange" @click="onDelete">{{ value }}</v-icon></v-btn></td>
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
            <v-card-actions>
                <v-btn color="blue-darken-1" @click="closeDialog"> Close </v-btn>
                <v-spacer></v-spacer>
                <v-btn class="bg-primary text-white" type="submit" @click="openFormDialog">Add New</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
    <nursing-station-wards-form :open_form_dialog="open_form_dialog" @close-dialog="closeFormDialog" @handle-submit="onSubmit" />
    <deleteConfirmation :show="confirmation" @confirm="confirm" @close="closeconfirmation" />
</template>

<script setup>
import NursingStationWardsForm from './sub-forms/NursingStationWardsForm.vue';

const props = defineProps({
    show: {
        type: Boolean,
        default: () => false,
        required: true,
    },
})

const emits = defineEmits(['close-dialog'])
const open_form_dialog = ref(false)
const confirmation = ref(false)
const panel = ref([]);
const reports = [
    {
        settings: [
            {
                settingsPanel: "Annex Building",
                report: [
                    { 
                        system_default: "No",
                        code:  "1001", 
                        sub_code: "NS0001", 
                        floor: "1st Floor",
                        description: "Test description",
                        department: "Test Department",
                        editIcon: "mdi-pencil",
                        deleteIcon: "mdi-trash-can",
                    },
                ],
            },
            {
                settingsPanel: "Main Building",
                report: [
                    { 
                        system_default: "No",
                        code:  "1004", 
                        sub_code: "NS0004", 
                        floor: "4th Floor",
                        description: "Test description",
                        department: "Test Department",
                        editIcon: "mdi-pencil",
                        deleteIcon: "mdi-trash-can",
                    },
                ],
            },
        ],
    },
];

const closeDialog = () => {
    emits('close-dialog')
}

const openFormDialog = () => {
  open_form_dialog.value = true;
};

const closeFormDialog = () => {
  open_form_dialog.value = false;
};

const onSubmit = () => {
  alert("Submit");
};

const confirm = () => {
    confirmation.value = false;
}
const closeconfirmation = () => {
    confirmation.value = false;
}
const onDelete = (item) => {
    confirmation.value = true;
}

onMounted(() => {
  panel.value = [0, 1];
})
onUpdated(() => {
  panel.value = [0, 1];
})
</script>

<style scoped></style>
