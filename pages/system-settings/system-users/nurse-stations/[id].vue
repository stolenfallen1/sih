<template>
    <!-- <div>{{ route.params}}</div> -->
    <v-dialog v-model="dialog" persistent hide-overlay width="800" scrollable>
        <v-card>
            <v-card-title>System User Nurse Station</v-card-title>
            <v-card-text>
                <v-container>
                    <!-- Display the nurse data here for information purposes only -->
                    <v-row>
                        <v-col cols="12" sm="6" md="4">
                            <v-text-field label="ID of the nurse here" density="compact" outlined readonly></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="6" md="4">
                            <v-text-field label="Name of the nurse here" density="compact" outlined readonly></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="6" md="4">
                            <v-text-field label="Birthdate of the nurse here" density="compact" outlined readonly></v-text-field>
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col v-for="(section, sectionIndex) in sections" :key="sectionIndex" cols="12" sm="6" md="6">
                            <h4>{{ section.title }}</h4>
                            <v-expansion-panels>
                                <v-expansion-panel v-for="(floor, floorIndex) in section.floors" :key="floorIndex" :title="`Floor: ${floor.floorNumber} (${floor.items.length} items)`">
                                    <v-expansion-panel-text>
                                        <v-row v-for="(item, itemIndex) in floor.items" :key="itemIndex">
                                            <v-checkbox color="#117dad" density="compact" :label="item.label"></v-checkbox>
                                        </v-row>
                                    </v-expansion-panel-text>
                                </v-expansion-panel>
                            </v-expansion-panels>
                        </v-col>
                    </v-row>
                </v-container>
            </v-card-text>
            <v-divider></v-divider>
            <v-card-actions>
                <v-btn color="blue-darken-1" @click="router.back()"> Close </v-btn>
                <v-spacer></v-spacer>
                <v-btn
                class="bg-primary text-white"
                type="submit"
                >Apply</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script setup>
definePageMeta({
    layout: "root-layout",
});

const sections = [
    {
        title: "Annex Building",
        floors: [
            {
                floorNumber: "2nd floor",
                items: [
                    { label: "2c red zone c & d ( mild cases )" },
                    { label: "2d station" },
                ],
            },
            {
                floorNumber: "3rd floor",
                items: [
                    { label: "CVU" },
                ],
            },
            {
                floorNumber: "4th floor",
                items: [
                    { label: "4b station" },
                ],
            },
            {
                floorNumber: "5th floor",
                items: [
                    { label: "5b station" },
                ],
            },
        ],
    },
    {
        title: "Main Building",
        floors: [
            {
                floorNumber: "2nd floor",
                items: [
                    { label: "2a station" },
                    { label: "iccu" },
                    { label: "resserved 13" },
                    { label: "pediatrics icu" },
                ],
            },
            {
                floorNumber: "3rd floor",
                items: [
                    { label: "3a station" },
                    { label: "nursery room" },
                ],
            },
            {
                floorNumber: "4th floor",
                items: [
                    { label: "4a moderate & severe cases" },
                ],
            },
            {
                floorNumber: "5th floor",
                items: [
                    { label: "5a stepdown cases" },
                ],
            },
        ],
    },
];

const router = useRouter()
const route = useRoute()

// When accessing /posts/1, route.params.id will be 1
console.log(route.params.id)
const dialog = ref(true);
</script>
<style scoped>
</style>
