<template>
    <v-dialog :model-value="open_form_dialog" @update:model-value="closeDialog" hide-overlay width="650">
        <form @submit.prevent="handleSubmit">
            <v-card>
                <v-toolbar color="#6984ff" hide-details density="compact">
                    <v-toolbar-title>Nurse Station Details</v-toolbar-title>
                    <v-btn color="white" @click="closeDialog">
                        <v-icon>mdi-close</v-icon>
                    </v-btn>
                </v-toolbar>
                <v-divider></v-divider>
                <v-card-text>
                    <v-row>
                        <v-col cols="12">
                            <v-text-field
                            class="my-2"
                            variant="outlined"
                            density="compact"
                            hide-details
                            readonly
                            >Main Branch</v-text-field>
                            <v-select
                                class="my-2"
                                label="Select a Building"
                                :items="['Main Building', 'Annex Building']"
                                variant="outlined"
                                hide-details
                                density="compact"
                            ></v-select>
                            <v-select
                                class="my-2"
                                label="Select a Floor"
                                :items="['1st Floor','2nd Floor','3rd Floor','4th Floor','5th Floor']"
                                variant="outlined"
                                hide-details
                                density="compact"
                            ></v-select>
                            <v-text-field
                                class="my-2"
                                variant="outlined"
                                hide-details
                                label="Description"
                                density="compact"
                            ></v-text-field>
                            <v-select
                                label="Select a Department"
                                :items="['2A Station','2B Station','3A Station','3B Station']"
                                variant="outlined"
                                hide-details
                                density="compact"
                            ></v-select>
                        </v-col>
                    </v-row>
                </v-card-text>
                <v-divider></v-divider>
                <v-card-actions>
                    <v-btn color="blue-darken-1" @click="closeDialog">Close</v-btn>
                    <v-spacer></v-spacer>
                    <v-btn class="bg-primary text-white" type="submit">Submit</v-btn>
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
})

const emits = defineEmits(['handle-submit', 'close-dialog'])

const handleSubmit = () => {
    emits("handle-submit");
};

const closeDialog = () => {
    emits("close-dialog");
};
</script>

<style scoped></style>