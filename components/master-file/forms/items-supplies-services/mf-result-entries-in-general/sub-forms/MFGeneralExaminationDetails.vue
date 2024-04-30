<template>
    <v-dialog :model-value="open_form_dialog" rounded="lg" scrollable @update:model-value="closeDialog" max-width="700px">
        <form @submit.prevent="onSubmit">
            <v-card rounded="lg">
                <v-toolbar density="compact" color="#6984ff" hide-details>
                    <v-toolbar-title>Examination Result Template in General {{ selectedRowDetails.id }}</v-toolbar-title>
                    <v-btn color="white" @click="closeDialog">
                        <v-icon>mdi-close</v-icon>
                    </v-btn>
                </v-toolbar>
                <v-divider></v-divider>
                <v-card-text>
                    <v-row>
                        <v-col cols="6">
                            <v-autocomplete
                                label="Department"
                                density="compact"
                                variant="outlined"
                            ></v-autocomplete>
                        </v-col>
                        <v-col cols="6">
                            <v-text-field
                                label="Search by Description"
                                density="compact"
                                variant="outlined"
                            ></v-text-field>
                        </v-col>
                    </v-row>
                    <v-card elevation="4">
                        <v-toolbar density="compact" hide-details>
                            <v-toolbar-title class="toolbar-title">Examination Result Template Content</v-toolbar-title>
                        </v-toolbar>
                        <v-card-text>
                            <v-row>
                                <v-col cols="12">
                                    <v-textarea
                                        label="Enter Examination Result Template Content here..."
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
const props = defineProps({
    open_form_dialog: {
        type: Boolean,
        default: () => false,
        required: true,
    },
});

const { selectedRowDetails } = storeToRefs(useSubcomponentSelectedRowDetailsStore()); 

const confirmation = ref(false);
const emits = defineEmits(['close-dialog'])

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