<template>
    <v-expansion-panel>
        <v-expansion-panel-title>{{ PanelTitle }}</v-expansion-panel-title>
        <v-expansion-panel-text>
            <v-data-table-server
                density="compact"
                :headers="headers"
                :items="tableData"
            >
                <template #bottom></template>
            </v-data-table-server>
        </v-expansion-panel-text>
    </v-expansion-panel>
</template>

<script setup>
const props = defineProps({
    PanelTitle: {
        type: String,
        default: "",
    },
    headers: {
        type: Array,
        required: true,
    },
    tableData: {
        type: Array,
        required: true,
    },
});
</script>

<style scoped></style>
