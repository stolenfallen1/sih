<template>
    <v-dialog :model-value="open_form_dialog" @update:model-value="closeDialog" hide-overlay width="550">
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
                           <v-autocomplete
                            label="Branch"
                            type="text"
                            :items="branch"
                            item-title="name"
                            item-value="id"
                            density="compact"
                            variant="outlined"
                            clearable
                        ></v-autocomplete>
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
                            <v-autocomplete
                                label="Building Name"
                                :items="buildings"
                                item-title="description"
                                item-value="id"
                                variant="outlined"
                                density="compact"
                                :rules="[(v) => !!v || 'Building Name is required']"
                                return-object
                                clearable
                            ></v-autocomplete>
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
import nuxtStorage from "nuxt-storage";
const branch = JSON.parse(nuxtStorage.localStorage.getData("branches"));
const buildings = JSON.parse(nuxtStorage.localStorage.getData("buildings"));
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