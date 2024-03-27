<template>
    <v-dialog :model-value="open_medication_duration_form" rounded="lg" @update:model-value="closeDialog"  scrollable max-width="600px">
        <v-card rounded="lg">
            <v-toolbar color="#6984ff" hide-details density="compact">
                <v-toolbar-title>Durations Template Details</v-toolbar-title>
                <v-btn color="white" @click="closeDialog">
                    <v-icon>mdi-close</v-icon>
                </v-btn>
            </v-toolbar>
            <v-card-text>
                <v-container>
                    <v-row>
                        <v-col cols="12">
                            <v-text-field
                                label="Description"
                                hide-details
                                density="compact"
                                variant="outlined"
                            ></v-text-field>
                        </v-col>
                        <v-col cols="5">
                            <v-text-field
                                label="No. in Days"
                                hide-details
                                density="compact"
                                variant="outlined"
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
    </v-dialog>
</template>

<script setup>

const props = defineProps({
    open_medication_duration_form: {
        type: Boolean,
        default: () => false,
        required: true,
    },
})

const emits = defineEmits(['handle-submit', 'close-dialog'])

const handleSubmit = () => {
    emits('handle-submit')
}

const closeDialog = () => {
    emits('close-dialog')
}
</script>

<style scoped>
</style>