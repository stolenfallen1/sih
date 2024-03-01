<template>
    <v-dialog :model-value="open_item_pricing_schemes_form" rounded="lg" persistent scrollable max-width="700px">
        <v-toolbar color="#6984ff" hide-details density="compact">
            <v-toolbar-title>Price Scheme Details</v-toolbar-title>
        </v-toolbar>
        <v-card>
            <v-card-text>
                <v-container>
                    <v-row>
                        <v-col cols="12">
                            <v-autocomplete
                                item-title="section"
                                item-value="id"
                                label="Standard"
                                disabled
                                :items="price_schemes" 
                                hide-details
                                density="compact"
                                variant="outlined"
                            ></v-autocomplete>
                        </v-col>
                        <v-col cols="12">
                            <v-text-field
                                class="mt-3"
                                variant="outlined"
                                hide-details
                                label="Description"
                                density="compact"
                            ></v-text-field>
                        </v-col>
                        <v-divider></v-divider>
                        <v-col cols="12">
                            <v-card class="pa-4"> 
                                <v-list-subheader inset>
                                    Important
                                </v-list-subheader>
                                <p>Price structure for items and services will be generated when creating new pricing scheme. It will take a minute ( more or less ) - depending on the number of items and services - to complete this process</p>
                            </v-card>
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
    open_item_pricing_schemes_form: {
        type: Boolean,
        default: () => false,
        required: true,
    },
})

const emits = defineEmits()

const price_schemes = [
    { id: 1, description: "Section 1" },
    { id: 2, description: "Section 2" },
    { id: 3, description: "Section 3" },
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