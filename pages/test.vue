<template>
    <v-dialog v-model="dialog" persistent hide-overlay width="500">
        <v-card title="Dialog">
            <v-card-text>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </v-card-text>

            <v-card-actions>
                <v-spacer></v-spacer>

                <v-btn text="Close Dialog" @click="router.back()"></v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script setup>
definePageMeta({
    layout: "root-layout",
});

const router = useRouter();
const dialog = ref(true);
</script>

<style scoped></style>
