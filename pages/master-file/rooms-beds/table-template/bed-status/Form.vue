<template>
    <v-card>
        <v-card-title>Bed Status Template Details</v-card-title>
        <v-card-text>
            <v-container>
                <v-row>
                    <v-col cols="12" class="pa-1">
                        <v-text-field
                            class="mt-3"
                            variant="outlined"
                            label="Description"
                            density="compact"
                        ></v-text-field>
                    </v-col>
                </v-row>
            </v-container>
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions>
            <v-btn color="blue-darken-1" @click="closeDialog"> Close </v-btn>
            <v-spacer></v-spacer>
            <v-btn class="bg-primary text-white" type="submit" @click="handleSubmit">Submit</v-btn>
        </v-card-actions>
    </v-card>
</template>

<script setup>
const emits = defineEmits()

const handleSubmit = () => {
    emits('handle-submit')
}

const closeDialog = () => {
    emits('close-dialog')
}
</script>

<style scoped>
</style>