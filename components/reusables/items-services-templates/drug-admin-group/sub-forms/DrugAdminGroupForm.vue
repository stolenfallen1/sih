<template>
    <v-dialog :model-value="drug_admin_group" rounded="lg" persistent scrollable max-width="700px">
        <v-toolbar color="#6984ff" hide-details density="compact">
            <v-toolbar-title>Drug Admin Group Details</v-toolbar-title>
        </v-toolbar>
        <v-card>
            <v-card-text>
                <v-container>
                    <v-row>
                        <v-col cols="12">
                            <v-text-field
                                variant="outlined"
                                hide-details
                                label="Description"
                                density="compact"
                            ></v-text-field>
                        </v-col>
                        <v-col cols="12">
                            <v-text-field
                                class="cursor-pointer"
                                variant="outlined"
                                hide-details
                                label="Printer Path"
                                density="compact"
                                append-icon="mdi-printer"
                                @click:append="openPrinterPath"
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
        <print-details :printer_details="printer_details" @close-dialog="closePrinterPath" @handle-submit="handleSubmit" />
    </v-dialog>
</template>

<script setup>
import PrintDetails from './PrintDetails.vue';

const props = defineProps({
    drug_admin_group: {
        type: Boolean,
        default: () => false,
        required: true,
    },
})

const emits = defineEmits()

const printer_details = ref(false)

const handleSubmit = () => {
    emits('handle-submit')
}

const closeDialog = () => {
    emits('close-dialog')
}

const openPrinterPath = () => {
    printer_details.value = true
}

const closePrinterPath = () => {
    printer_details.value = false
}
</script>

<style scoped>
</style>