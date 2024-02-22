<!-- In bizbox it is just a empty table only the header was visible -->
<template>
    <v-dialog
        :model-value="template_dialog"
        persistent
        hide-overlay
        width="650"
    >
        <v-card>
            <v-card-title>Applicable Test Codes</v-card-title>
            <v-divider></v-divider>
            <v-card-text>
                <v-table density="compact">
                    <thead>
                        <tr>
                            <th width="4"></th>
                            <th>Test Code</th>
                            <th class="text-center">Description</th>
                        </tr>
                    </thead>
                    <tbody>
                        <!-- Body here -->
                    </tbody>
                </v-table>
            </v-card-text>
            <v-divider></v-divider>
            <v-card-actions>
                <v-btn color="blue-darken-1" @click="closeDialog">Close</v-btn>
                <v-spacer></v-spacer>
                <v-btn class="bg-primary text-white" type="submit" @click="selectTestCode">Select</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script setup>

const props = defineProps({
    template_dialog: {
        type: Boolean,
        default: () => false,
    }
})

const emits = defineEmits()

const closeDialog = () => {
    emits('close-dialog')
}

const selectTestCode = () => {
    // emits('select-test-code')
    alert('Select Test Code')
}

</script>

<style scoped>
</style>