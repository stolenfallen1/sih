<template>
    <v-card>
        <v-card-text>
                <v-row>
                    <v-col cols="12">
                        <v-list-subheader class="form-header">Remarks</v-list-subheader>
                        <v-textarea
                            variant="solo"
                            placeholder="Enter remarks here..."
                            v-model="payload.registration_remarks"
                            hide-details
                            density="compact"
                            :readonly="clicked_option === 'view'"
                        ></v-textarea>
                    </v-col>
                </v-row>
            </v-card-text>
        </v-card>
</template>

<script setup>
const props = defineProps({
    payload: {
        type: Object,
        required: true,
        default: () => ({})
    },
    clicked_option: {
        type: String,
        default: () => ''
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