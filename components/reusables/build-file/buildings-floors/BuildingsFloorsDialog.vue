<template>
    <v-dialog :model-value="show" rounded="lg" @update:model-value="closeDialog" hide-overlay width="800" scrollable>
        <v-card rounded="lg">
            <v-toolbar density="compact" color="#6984ff" hide-details>
                <v-toolbar-title>Buildings and Floor Management</v-toolbar-title>
                <v-spacer></v-spacer>
                <v-btn color="white" @click="closeDialog">
                    <v-icon>mdi-close</v-icon>
                </v-btn>
            </v-toolbar>
            <v-card-text>
                <v-container>
                    <v-row>
                    <v-col>
                        <v-divider></v-divider>
                        <br/>
                        <v-expansion-panels v-model="panel" variant="accordion" multiple>
                            <!-- Buildings -->
                            <v-expansion-panel v-for="(setting, i) in settings" :key="i">
                                <v-expansion-panel-title>Buildings</v-expansion-panel-title>
                                <v-expansion-text>
                                    <v-card-actions>
                                        <v-spacer></v-spacer>
                                        <v-btn class="bg-primary text-white" type="submit" density="compact" @click="openFormDialog('building')">Add New</v-btn>
                                    </v-card-actions>
                                    <v-table hide-details density="compact">
                                        <thead>
                                            <tr>
                                                <th>Branch</th>
                                                <th>Code</th>
                                                <th>Building Name</th>
                                                <th width="4"></th>
                                                <th width="4"></th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr v-for="(building, i) in setting.building" :key="i" @click="handleFloor(building.floor)" class="cursor-pointer">
                                                <td>{{ building.branch }}</td>
                                                <td>{{ building.code }}</td>
                                                <td>{{ building.building_name }}</td>
                                                <td><v-icon @click="openFormDialog('building')" color="green">{{ building.editIcon }}</v-icon></td>
                                                <td><v-icon @click="onDelete" color="red">{{ building.deleteIcon }}</v-icon></td>
                                            </tr>
                                        </tbody>
                                    </v-table>
                                </v-expansion-text>
                            </v-expansion-panel>
                            <!-- Floors -->
                            <v-expansion-panel>
                                <v-expansion-panel-title>Floors</v-expansion-panel-title>
                                <v-expansion-text>
                                    <v-card-actions>
                                        <v-spacer></v-spacer>
                                        <v-btn class="bg-primary text-white" type="submit" density="compact" @click="openFormDialog('floor')">Add New</v-btn>
                                    </v-card-actions>
                                    <v-table hide-details density="compact">
                                        <thead>
                                            <tr>
                                                <th>Code</th>
                                                <th>Floor Name</th>
                                                <th width="4"></th>
                                                <th width="4"></th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr v-for="(floor, i) in subpanel" :key="i">
                                                <td>{{ floor.code }}</td>
                                                <td>{{ floor.floor_name }}</td>
                                                <td><v-icon @click="openFormDialog('floor')" color="green">{{ floor.editIcon }}</v-icon></td>
                                                <td><v-icon @click="onDelete" color="red">{{ floor.deleteIcon }}</v-icon></td>
                                            </tr>
                                        </tbody>
                                    </v-table>
                                </v-expansion-text>
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
            </v-card-actions>
        </v-card>
    </v-dialog>
    <buildings-floor-form :open_form_dialog="open_form_dialog" :form_data="form_data" :form_title="form_title" @close-dialog="closeFormDialog" @handle-submit="onSubmit" />
    <deleteConfirmation :show="confirmation" @confirm="confirm" @close="closeconfirmation" />
</template>

<script setup>
import BuildingsFloorForm from "./sub-forms/BuildingsFloorForm.vue";
const props = defineProps({
    show: {
        type: Boolean,
        default: () => false,
        required: true,
    },
})

const emits = defineEmits(['close-dialog'])

const panel = ref([]);
const open_form_dialog = ref(false);
const confirmation = ref(false)
const form_title = ref("");
const form_data = ref("");
const subpanel = ref([]);
const settings = [
{
    building: [
        { 
            branch:  "CDUH", 
            code: "10114", 
            building_name: "Main Building", 
            editIcon: "mdi-pencil", 
            deleteIcon: "mdi-trash-can",
            floor: [
                { code:  "123", floor_name: "1st Floor", editIcon: "mdi-pencil", deleteIcon: "mdi-trash-can"},
                { code:  "456", floor_name: "2nd Floor", editIcon: "mdi-pencil", deleteIcon: "mdi-trash-can"},
                { code:  "789", floor_name: "3rd Floor", editIcon: "mdi-pencil", deleteIcon: "mdi-trash-can"},
            ],
        },
        { 
            branch:  "CDUH", 
            code: "10114", 
            building_name: "Annex Building", 
            editIcon: "mdi-pencil", 
            deleteIcon: "mdi-trash-can",
            floor: [
                { code:  "987", floor_name: "1st Floor", editIcon: "mdi-pencil", deleteIcon: "mdi-trash-can"},
                { code:  "654", floor_name: "2nd Floor", editIcon: "mdi-pencil", deleteIcon: "mdi-trash-can"},
                { code:  "321", floor_name: "3rd Floor", editIcon: "mdi-pencil", deleteIcon: "mdi-trash-can"},
            ],
        },
    ],
},
]

const handleFloor = (floor) => {
    subpanel.value = [];
    subpanel.value = floor;
}

const openFormDialog = (formType) => {
    open_form_dialog.value = true;
    form_data.value = formType;
    form_title.value = formType === 'building' ? 'Building' : 'Floor';
};

const closeDialog = () => {
    emits('close-dialog')
}

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

const closeFormDialog = () => {
    open_form_dialog.value = false;
};

onMounted(() => {
panel.value = [0, 1];
})
onUpdated(() => {
panel.value = [0, 1];
})
</script>

<style scoped>
</style>