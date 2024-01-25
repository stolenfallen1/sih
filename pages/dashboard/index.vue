<template>
    <v-container>
        <!-- title and text should be changed dynamically feel free to do so. -->
        <v-row justify="center">
            <v-col cols="12" sm="6" md="12">
                <v-card
                    title="Welcome back Juan"
                    text="Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptates.
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptates. 
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptates.
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptates."
                >
                </v-card>
            </v-col>
            <v-col cols="12" sm="6" md="4">
                <v-card class="mx-auto" max-width="344" title="In Patients">
                    <template v-slot:prepend>
                        <v-icon icon="mdi-account" color="primary"></v-icon>
                    </template>
                    <template v-slot:append>
                        <v-icon
                            icon="mdi-arrow-top-right-bold-box-outline"
                            color="#6984FF"
                        ></v-icon>
                    </template>
                    <v-card-text>250</v-card-text>
                </v-card>
            </v-col>

            <v-col cols="12" sm="6" md="4">
                <v-card class="mx-auto" max-width="344" title="Out Patients">
                    <template v-slot:prepend>
                        <v-icon icon="mdi-account" color="warning"></v-icon>
                    </template>
                    <template v-slot:append>
                        <v-icon
                            icon="mdi-arrow-top-right-bold-box-outline"
                            color="#6984FF"
                        ></v-icon>
                    </template>
                    <v-card-text>100</v-card-text>
                </v-card>
            </v-col>

            <v-col cols="12" sm="6" md="4">
                <v-card class="mx-auto" max-width="344" title="ER Patients">
                    <template v-slot:prepend>
                        <v-icon icon="mdi-account" color="error"></v-icon>
                    </template>
                    <template v-slot:append>
                        <v-icon
                            icon="mdi-arrow-top-right-bold-box-outline"
                            color="#6984FF"
                        ></v-icon>
                    </template>
                    <v-card-text>25</v-card-text>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>

<script setup>
definePageMeta({
    layout: "root-layout",
});
</script>

<style scoped></style>
