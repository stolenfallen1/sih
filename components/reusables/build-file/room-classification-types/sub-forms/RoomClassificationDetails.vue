<template>
    <v-dialog :model-value="open_form_classification_details"  hide-overlay width="650">
        <form @submit.prevent="handleSubmit">
        <v-card>
            <v-toolbar color="#6984ff" hide-details density="compact">
                <v-toolbar-title>Room Classification Details</v-toolbar-title>
                <v-btn color="white" @click="closeDialog">
                    <v-icon>mdi-close</v-icon>
                </v-btn>
            </v-toolbar>
            <v-card-text>
                <v-container>
                    <v-row>
                        <v-col cols="12">
                            <v-select
                                class="my-2"
                                label="Pricing Scheme"
                                :items="['Outpatient','Emergency','Room-in','Cash Transaction']"
                                variant="outlined"
                                density="compact"
                                hide-details
                            ></v-select>
                            <v-text-field
                                class="my-2"
                                variant="outlined"
                                label="Description"
                                density="compact"
                                hide-details
                            ></v-text-field>
                        </v-col>
                        <v-col cols="6">
                            <v-text-field
                                variant="outlined"
                                label="Credit Limit"
                                density="compact"
                                hide-details
                            ></v-text-field>
                        </v-col>
                        <v-checkbox
                            label="Is Ward (for PHIC CF2 Purposes)"
                            hide-details
                        ></v-checkbox>
                    </v-row>
                </v-container>
            </v-card-text>
            <v-divider></v-divider>
            <v-card-actions>
                <v-btn color="blue-darken-1" @click="closeDialog"> Close </v-btn>
                <v-spacer></v-spacer>
                <v-btn class="bg-primary text-white" type="submit">Submit</v-btn>
            </v-card-actions>
        </v-card>
        </form>
    </v-dialog>
</template>

<script setup>
const props = defineProps({
  open_form_classification_details: {
        type: Boolean,
        default: () => false,
        required: true,
    },
})

const emits = defineEmits(['close-dialog', 'handle-submit'])

const handleSubmit = () => {
  emits('handle-submit')
}

const closeDialog = () => {
  emits('close-dialog')
}
</script>

<style scoped>
</style>