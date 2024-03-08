<template>
    <v-dialog :model-value="open_form_dialog" persistent hide-overlay width="650">
        <form @submit.prevent="handleSubmit">
            <v-card>
                <v-toolbar color="#6984ff" hide-details density="compact">
                    <v-toolbar-title>{{ form_title }} Details</v-toolbar-title> 
                    <v-btn color="white" @click="closeDialog">
                        <v-icon>mdi-close</v-icon>
                    </v-btn>
                </v-toolbar>
                <v-divider></v-divider>
                <v-card-text>
                    <v-row v-if="form_data === `building`">
                        <v-col cols="12" class="pa-1">
                            <v-text-field
                            class="my-2"
                            variant="outlined"
                            density="compact"
                            hide-details
                            readonly
                            >Main Branch</v-text-field>
                            <v-text-field
                            class="my-2"
                            label="Building Name"
                            variant="outlined"
                            hide-details
                            density="compact"
                            ></v-text-field>
                        </v-col>
                    </v-row>
                    <v-row v-if="form_data === `floor`">
                        <v-col cols="12" class="pa-1">
                            <v-select
                                class="my-2"
                                label="Select"
                                :items="['Main Building', 'Annex Building']"
                                hide-details
                                variant="outlined"
                                density="compact"
                            ></v-select>
                            <v-text-field
                                class="my-2"
                                label="Floor Name"
                                variant="outlined"
                                hide-details
                                density="compact"
                            ></v-text-field>
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
    form_data: String,
    form_title: String,
});
const emits = defineEmits(['close-dialog' , 'handle-submit']);

const handleSubmit = () => {
emits("handle-submit");
};

const closeDialog = () => {
emits("close-dialog");
};
</script>

<style scoped></style>