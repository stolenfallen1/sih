<template>
    <v-row>
        <v-col cols="12">
            <v-textarea
                variant="outlined"
                label="Remarks"
                placeholder="Enter remarks here..."
                v-model="payload.registration_remarks"
                hide-details
                density="compact"
            ></v-textarea>
        </v-col>
    </v-row>
</template>

<script setup>
const props = defineProps({
    payload: {
        type: Object,
        required: true,
        default: () => ({})
    }
})
</script>

<style scoped>
</style>