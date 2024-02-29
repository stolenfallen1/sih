<template>
    <v-card>
        <v-toolbar color="#6984ff" hide-details density="compact">
            <v-toolbar-title>Room Classification Details</v-toolbar-title>
        </v-toolbar>
        <v-card-text>
            <v-container>
                <v-row>
                    <v-col cols="12" class="pa-1">
                        <v-select
                            label="Prinig Scheme"
                            :items="['Outpatient','Emergency','Room-in','Cash Transaction']"
                            variant="outlined"
                            density="compact"
                        ></v-select>
                        <v-text-field
                            class="mt-3"
                            variant="outlined"
                            label="Description"
                            density="compact"
                        ></v-text-field>
                    </v-col>
                    <v-col cols="6" class="pa-1">
                        <v-text-field
                            class="mt-3"
                            variant="outlined"
                            label="Credit Limit"
                            density="compact"
                        ></v-text-field>
                        <v-checkbox
                            label="Is Ward (for PHIC CF2 Purposes)"
                        ></v-checkbox>
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