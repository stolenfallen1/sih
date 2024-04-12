<template>
    <v-row>
        <v-col cols="12">
            <v-list-subheader class="form-header">Remarks</v-list-subheader>
            <v-textarea
                variant="solo"
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
.form-header {
    color: #000;
    margin: -12px 0px -12px 0px;
    font-weight: 500;
}
</style>