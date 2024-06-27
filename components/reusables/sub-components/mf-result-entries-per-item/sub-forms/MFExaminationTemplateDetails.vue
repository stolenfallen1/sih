<template>
    <v-dialog :model-value="open_form_dialog" rounded="lg" scrollable @update:model-value="closeDialog" max-width="700px">
        <form @submit.prevent="onSubmit">
            <v-card rounded="lg">
                <v-toolbar density="compact" color="#107bac" hide-details>
                    <v-toolbar-title>Examination Template Item Details {{ selectedRowDetails.id }}</v-toolbar-title>
                    <v-btn color="white" @click="closeDialog">
                        <v-icon>mdi-close</v-icon>
                    </v-btn>
                </v-toolbar>
                <v-divider></v-divider>
                <v-card-text>
                    <v-card elevation="4">
                        <v-card-text>
                            <v-row>
                                <v-col cols="12">
                                    <v-text-field
                                        label="Template Category Description"
                                        placeholder="Enter Template Category Description"
                                        density="compact"
                                        variant="outlined"
                                        hide-details
                                        required
                                    ></v-text-field>
                                </v-col>
                            </v-row>
                            <v-table density="compact" class="mt-4" height="30vh">
                                <thead>
                                    <tr>
                                        <th>Description</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="(description, index) in descriptions" :key="index" class="cursor-pointer">
                                        <td>
                                            <input @click="selectedRow" v-model="descriptions[index]" type="text" style="background-color: lightgray;"/>
                                        </td>
                                        <td width="4">
                                            <v-icon color="red" @click="removeDescription">mdi-trash-can</v-icon>
                                        </td>
                                    </tr>
                                </tbody>
                            </v-table>
                        </v-card-text>
                        <v-divider></v-divider>
                        <v-card-actions>
                            <v-btn class="bg-info text-white" @click="addDescription">Add</v-btn>
                        </v-card-actions>
                    </v-card>
                    <v-card v-if="open_selected_row_textarea === true" class="mt-4">
                        <v-toolbar density="compact" hide-details>
                            <v-toolbar-title class="toolbar-title">Default Examination Result Content</v-toolbar-title>
                        </v-toolbar>
                        <v-card-text>
                            <v-row>
                                <v-col cols="12">
                                    <v-textarea
                                        label="Please Enter Default Examination Result Content here"
                                        variant="outlined"
                                        density="compact"
                                        hide-details
                                    ></v-textarea>
                                </v-col>
                            </v-row>
                        </v-card-text>
                    </v-card>
                </v-card-text>
                <v-divider></v-divider>
                <v-card-actions>
                    <v-btn color="blue-darken-1 border border-info" @click="closeDialog"> Close </v-btn>
                    <v-spacer></v-spacer>
                    <v-btn class="bg-primary text-white" type="submit">Save</v-btn>
                </v-card-actions>
            </v-card>
        </form>
    </v-dialog>
</template>

<script setup>
import { ref } from 'vue';

const props = defineProps({
    open_form_dialog: {
        type: Boolean,
        default: () => false,
        required: true,
    },
    payload: {
        type: Object,
        default: () => ({}),
    },
});

const { selectedRowDetails } = storeToRefs(useSubcomponentSelectedRowDetailsStore()); 

const emits = defineEmits(['close-dialog'])
const open_selected_row_textarea = ref(false);
const descriptions = ref([]);

const addDescription = () => {
    descriptions.value.push("");
}
const removeDescription = () => {
    descriptions.value.pop();
}
const selectedRow = () => {
    open_selected_row_textarea.value = !open_selected_row_textarea.value;
}
const onSubmit = () => {
    alert("Saved");
    emits('close-dialog');
}
const closeDialog = () => {
    emits('close-dialog')
}
</script>

<style scoped>
.toolbar-title {
    font-size: 16px; 
    font-style: italic; 
    text-align: center;
}
</style>