<template>
    <v-dialog :model-value="open_cpt_sub_section_form" rounded="lg" @update:model-value="closeDialog" scrollable max-width="600px">
        <v-card rounded="lg">
            <v-toolbar color="#6984ff" hide-details density="compact">
                <v-toolbar-title>CPT Sub Section Details</v-toolbar-title>
                <v-btn color="white" @click="closeDialog">
                    <v-icon>mdi-close</v-icon>
                </v-btn>
            </v-toolbar>
            <v-card-text>
                <v-container>
                    <v-row>
                        <v-col cols="6">
                            <v-text-field
                                readonly
                                variant="outlined"
                                label="Sub Section Code"
                                hide-details
                                density="compact"
                            ></v-text-field>
                        </v-col>
                        <v-col cols="12">
                            <v-autocomplete
                                item-title="section"
                                item-value="id"
                                label="CPT Section"
                                :items="cptSection" 
                                hide-details
                                density="compact"
                                variant="outlined"
                            ></v-autocomplete>
                        </v-col>
                        <v-col cols="12">
                            <v-text-field
                                variant="outlined"
                                hide-details
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
    </v-dialog>
</template>

<script setup>

const props = defineProps({
    open_cpt_sub_section_form: {
        type: Boolean,
        default: () => false,
        required: true,
    },
})

const emits = defineEmits(['close-dialog', 'handle-submit'])

const cptSection = [
    { id: 1, section: "Section 1" },
    { id: 2, section: "Section 2" },
    { id: 3, section: "Section 3" },
];

const handleSubmit = () => {
    emits('handle-submit')
}

const closeDialog = () => {
    emits('close-dialog')
}
</script>

<style scoped>
</style>