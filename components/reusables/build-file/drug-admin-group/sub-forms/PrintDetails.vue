<template>
    <v-dialog :model-value="printer_details" rounded="lg"  scrollable max-width="650px">
        <v-toolbar density="compact" color="#6984ff" hide-details>
            <v-toolbar-title>Print</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-btn color="white" @click="closeDialog">
                <v-icon>mdi-close</v-icon>
            </v-btn>
        </v-toolbar>
        <v-card>
            <v-card class="mx-4 my-4">
                <v-card-text>
                    <v-list-subheader inset color="#FFF">Printer</v-list-subheader>   
                    <v-row>
                        <v-col cols="9">
                            <v-autocomplete
                                hide-details
                                clearable
                                :items="printer_items"
                                density="compact"
                                variant="outlined"
                            ></v-autocomplete>       
                        </v-col>
                        <v-col cols="3">
                            <v-btn color="blue-darken-1" @click="handleProperties"> Properties </v-btn>       
                        </v-col>
                        <v-col cols="12"><label>Status: {{ status }}</label></v-col>
                        <v-col cols="12"><label>Type: {{ type }}</label></v-col>
                        <v-col cols="12"><label>Where: {{ print_location }}</label></v-col>
                        <v-col cols="12"><label>Comment: {{ comment }}</label></v-col>
                    </v-row>    
                </v-card-text>
                <v-divider></v-divider>
            </v-card>
            <v-divider></v-divider>
            <v-row>
                <v-col cols="12">
                    <v-card-text> 
                        <v-row>
                            <v-col cols="6">
                                <v-card class="px-4 py-4">
                                    <v-list-subheader inset color="#FFF" class="mb-4">Print Range</v-list-subheader>
                                    <v-row>
                                        <v-radio-group density="compact" hide-details inline class="align-center">
                                            <v-radio label="All" value="one" density="compact" hide-details></v-radio>
                                            <v-radio label="Pages" value="two" density="compact" hide-details></v-radio>
                                            <v-radio label="Selection" value="three" density="compact" hide-details></v-radio>
                                        </v-radio-group>
                                    </v-row>
                                    <v-row class="mt-6">
                                        <v-text-field label="From" density="compact" hide-details variant="outlined" class="mr-2"></v-text-field>
                                        <v-text-field label="To" density="compact" hide-details variant="outlined"></v-text-field>
                                    </v-row>
                                </v-card>
                            </v-col>
                            <v-col cols="6">
                                <v-card class="px-4 py-4">
                                    <v-list-subheader inset color="#FFF" class="mb-4">Number of copies</v-list-subheader>
                                    <v-row class="mt-6">
                                        <v-text-field label="Number of copies" type="number" density="compact" hide-details variant="outlined"></v-text-field>
                                    </v-row>
                                </v-card>
                            </v-col>
                        </v-row>
                    </v-card-text>
                </v-col>
            </v-row>
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn class="bg-primary text-white" type="submit" @click="handleSubmit">Ok</v-btn>
                <v-btn color="blue-darken-1" @click="closeDialog"> Close </v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script setup>

const emits = defineEmits(['close-dialog', 'handle-submit'])

const props = defineProps({
    printer_details: {
        type: Boolean,
        default: () => false,
        required: true,
    },
})

const printer_items = []
const status = 'Ready'
const type = 'Lorem Ipsum'
const print_location = '192.168.1.1'
const comment = 'Lorem Ipsum'

const closeDialog = () => {
    emits('close-dialog')
}

const handleSubmit = () => {
    emits('handle-submit')
}

const handleProperties = () => {
    alert('Properties')
}
</script>

<style scoped>
</style>