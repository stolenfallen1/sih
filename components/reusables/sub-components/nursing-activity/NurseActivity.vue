<script setup>
</script>

<template>
    <v-dialog
        :model-value="showNursingActivity" 
        rounded="lg" scrollable 
        @update:model-value="closeDialog" 
        style="max-width: 1000px;" 
    >
        
    </v-dialog>
    <v-card rounded-lg>
        <v-toolbar density="compact" color="#107bac" hide-details>
            <v-toolbar-title>
                Nursing Activity
            </v-toolbar-title>
            <v-btn color="white" @click="closeDialog">
                <v-icon>mdi-close</v-icon>
            </v-btn>
        </v-toolbar>
    </v-card>
</template>

<style scope>
</style>