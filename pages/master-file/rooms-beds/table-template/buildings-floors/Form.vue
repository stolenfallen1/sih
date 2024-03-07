<template>
    <form @submit.prevent="handleSubmit">
        <v-card>
            <v-toolbar color="#6984ff" hide-details density="compact">
                <v-toolbar-title>{{ form_title }}</v-toolbar-title> <!-- Either adding a building or a floor to a building -->
            </v-toolbar>
            <v-divider></v-divider>
            <v-card-text>
                <v-row v-if="form_data === `building`">
                    <v-col cols="12" class="pa-1">
                        <v-text-field
                        class="mt-3"
                        variant="outlined"
                        density="compact"
                        readonly
                        >Main Branch</v-text-field>
                        <v-text-field
                        class="mt-3"
                        label="Building Name"
                        variant="outlined"
                        density="compact"
                        ></v-text-field>
                    </v-col>
                </v-row>
                <v-row v-if="form_data === `floor`">
                    <v-col cols="12" class="pa-1">
                        <v-select
                            label="Select"
                            :items="['Main Building', 'Annex Building']"
                            variant="outlined"
                            density="compact"
                        ></v-select>
                        <v-text-field
                            class="mt-3"
                            label="Floor Name"
                            variant="outlined"
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
</template>

<script setup>
const props = defineProps({
    form_data: String,
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