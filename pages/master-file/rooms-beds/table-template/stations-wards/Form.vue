<template>
    <form @submit.prevent="handleSubmit">
        <v-card>
            <v-toolbar color="#6984ff" hide-details density="compact">
                <v-toolbar-title>{{ form_title }}</v-toolbar-title>
            </v-toolbar>
            <v-divider></v-divider>
            <v-card-text>
                <v-row>
                    <v-col cols="12" class="pa-1">
                        <v-text-field
                        class="mt-3"
                        variant="outlined"
                        density="compact"
                        disabled
                        >Main Branch</v-text-field>
                        <v-select
                            label="Select a Building"
                            :items="['Main Building', 'Annex Building']"
                            variant="outlined"
                            density="compact"
                        ></v-select>
                        <v-select
                            label="Select a Floor"
                            :items="['1st Floor','2nd Floor','3rd Floor','4th Floor','5th Floor']"
                            variant="outlined"
                            density="compact"
                        ></v-select>
                        <v-text-field
                        class="mt-3"
                        variant="outlined"
                        label="Description"
                        density="compact"
                        ></v-text-field>
                        <v-select
                            label="Select a Department"
                            :items="['2A Station','2B Station','3A Station','3B Station']"
                            variant="outlined"
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
</template>

<script setup>
const props = defineProps({
    form_title: String,
});
const emits = defineEmits();

const handleSubmit = () => {
    emits("add-new-item");
};

const closeDialog = () => {
    emits("close-dialog");
};
</script>

<style scoped></style>