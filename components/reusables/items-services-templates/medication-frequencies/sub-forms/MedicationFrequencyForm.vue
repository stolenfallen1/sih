<template>
    <v-dialog :model-value="open_medication_duration_form" rounded="lg" persistent scrollable max-width="700px">
        <v-toolbar color="#6984ff" hide-details density="compact">
            <v-toolbar-title>Medication Frequency Details</v-toolbar-title>
        </v-toolbar>
        <v-card>
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
                                label="Value"
                                type="number"
                                hide-details
                                density="compact"
                                variant="outlined"
                            ></v-text-field>
                        </v-col>
                        <v-checkbox v-model="is_inactive" label="Inactive"></v-checkbox>
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

const is_inactive = ref(false)

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