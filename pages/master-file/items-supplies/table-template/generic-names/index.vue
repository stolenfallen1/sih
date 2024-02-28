<template>
    <v-dialog v-model="show" rounded="lg" persistent scrollable max-width="600px">
        <v-toolbar density="compact" color="#6984ff" hide-details>
            <v-toolbar-title>Generic Names</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-btn color="white" @click="router.back()">
                <v-icon>mdi-close</v-icon>
            </v-btn>
        </v-toolbar>
        <v-card>
            <v-card-text>
                <h1>TEST</h1>
            </v-card-text>
            <v-card-actions>
                <v-btn color="blue-darken-1" @click="router.back()"> Close </v-btn>
                <v-spacer></v-spacer>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script setup>

const show = ref(true);

const router = useRouter()
</script>

<style scoped>
</style>