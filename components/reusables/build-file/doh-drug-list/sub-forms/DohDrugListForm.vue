<template>
    <v-dialog :model-value="doh_drug_list_form" rounded="lg" @update:model-value="closeDialog"  scrollable max-width="600px">
        <v-card rounded="lg">
            <v-toolbar color="#107bac" hide-details density="compact">
                <v-toolbar-title>DOH Drug List Details</v-toolbar-title>
                <v-btn color="white" @click="closeDialog">
                    <v-icon>mdi-close</v-icon>
                </v-btn>
            </v-toolbar>
            <v-card-text>
                <v-container>
                    <v-row>
                        <v-col cols="6">
                            <v-text-field
                                variant="outlined"
                                label="Drug Code"
                                hide-details
                                density="compact"
                            ></v-text-field>
                        </v-col>
                        <v-col cols="12">
                            <v-text-field
                                variant="outlined"
                                hide-details
                                label="Description"
                                density="compact"
                            ></v-text-field>
                        </v-col>
                        <v-checkbox v-model="is_active" label="is Active?"></v-checkbox>
                    </v-row>
                </v-container>
            </v-card-text>
            <v-divider></v-divider>
            <v-card-actions>
                <v-btn color="blue-darken-1 border border-info" @click="closeDialog"> Close </v-btn>
                <v-spacer></v-spacer>
                <v-btn class="bg-primary text-white" type="submit" @click="handleSubmit">Submit</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script setup>

const props = defineProps({
    doh_drug_list_form: {
        type: Boolean,
        default: () => false,
        required: true,
    },
})

const is_active = ref(true)

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