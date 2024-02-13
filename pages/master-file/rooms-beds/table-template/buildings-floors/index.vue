<template>
    <v-dialog v-model="dialog" persistent hide-overlay width="800" scrollable>
        <v-card>
            <v-card-title>Buildings and Floor Management</v-card-title>
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
                                        <v-btn class="bg-primary text-white" type="submit" density="compact" @click="useForm('building')">Add New</v-btn>
                                    </v-card-actions>
                                    <v-table>
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
                                                <td><v-icon @click="useForm('building')" color="green">{{ building.editIcon }}</v-icon></td>
                                                <td><v-icon @click="handleDelete" color="red">{{ building.deleteIcon }}</v-icon></td>
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
                                        <v-btn class="bg-primary text-white" type="submit" density="compact" @click="useForm('floor')">Add New</v-btn>
                                    </v-card-actions>
                                    <v-table>
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
                                                <td><v-icon @click="useForm('floor')" color="green">{{ floor.editIcon }}</v-icon></td>
                                                <td><v-icon @click="handleDelete" color="red">{{ floor.deleteIcon }}</v-icon></td>
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
                <v-btn color="blue-darken-1" @click="router.back()"> Close </v-btn>
                <v-spacer></v-spacer>
            </v-card-actions>
        </v-card>
        <v-dialog v-model="form_dialog" persistent hide-overlay width="650">
            <Form
                :form_data="form_data"
                :form_title="form_title"
                @add-new-item="onSubmit"
                @close-dialog="closeForm"
            ></Form>
        </v-dialog>
    </v-dialog>
</template>

<script setup>
import Form from './Form.vue';
definePageMeta({
    layout: "root-layout",
});

const router = useRouter()
const dialog = ref(true)
const panel = ref([]);
const form_dialog = ref(false);
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
                editIcon: "mdi-folder-edit-outline", 
                deleteIcon: "mdi-trash-can-outline",
                floor: [
                    { code:  "123", floor_name: "1st Floor", editIcon: "mdi-folder-edit-outline", deleteIcon: "mdi-trash-can-outline"},
                    { code:  "456", floor_name: "2nd Floor", editIcon: "mdi-folder-edit-outline", deleteIcon: "mdi-trash-can-outline"},
                    { code:  "789", floor_name: "3rd Floor", editIcon: "mdi-folder-edit-outline", deleteIcon: "mdi-trash-can-outline"},
                ],
            },
            { 
                branch:  "CDUH", 
                code: "10114", 
                building_name: "Annex Building", 
                editIcon: "mdi-folder-edit-outline", 
                deleteIcon: "mdi-trash-can-outline",
                floor: [
                    { code:  "987", floor_name: "1st Floor", editIcon: "mdi-folder-edit-outline", deleteIcon: "mdi-trash-can-outline"},
                    { code:  "654", floor_name: "2nd Floor", editIcon: "mdi-folder-edit-outline", deleteIcon: "mdi-trash-can-outline"},
                    { code:  "321", floor_name: "3rd Floor", editIcon: "mdi-folder-edit-outline", deleteIcon: "mdi-trash-can-outline"},
                ],
            },
        ],
    },
]

const handleFloor = (floor) => {
    subpanel.value = [];
    subpanel.value = floor;
}

const useForm = (formType) => {
    form_data.value = formType;
    form_title.value = formType === 'building' ? 'Building' : 'Floor';
    form_dialog.value = true;
};

const onSubmit = () => {
    alert("Submit");
};

const handleDelete = () => {
    alert("Delete");
};

const closeForm = () => {
    form_dialog.value = false;
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