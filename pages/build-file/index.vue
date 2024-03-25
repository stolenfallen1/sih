<template>
    <v-container>
        <!-- title and text should be changed dynamically feel free to do so. -->
        <v-row justify="center">
            <SearchTemplate />
        </v-row>
    </v-container>
</template>

<script setup>
definePageMeta({
    layout: "root-layout",
});
import SearchTemplate from "./SearchTemplate.vue";

</script>

<style scoped></style>
