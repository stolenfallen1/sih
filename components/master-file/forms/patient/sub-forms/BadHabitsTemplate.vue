<template>
    <v-dialog 
        :model-value="template_dialog"
        persistent
        hide-overlay
        width="650"
    >
        <v-card>
            <v-card-title>Select Bad Habits</v-card-title>
            <v-divider></v-divider>
            <v-card-text>
                <v-container>
                    <v-row>
                        <v-col cols="12" class="pa-1">
                            <v-text-field
                                class="mt-3"
                                variant="outlined"
                                density="compact"
                                append-inner-icon="mdi-magnify"
                            ></v-text-field>
                        </v-col>
                        <v-divider></v-divider>
                        <v-col cols="12">
                            <v-table density="compact">
                                <thead>
                                    <tr>
                                        <!-- <th width="4"></th> -->
                                        <th>Description</th>
                                        <th>Remarks</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <template v-for="(vice, typeIndex) in vices" :key="typeIndex">
                                        <tr>
                                            <!-- 
                                                Instead of Adding a table to show the selected items like bizbox 
                                                lets just add a checkbox to basically choose the items ( bad habits ) 
                                                we want to add.
                                            -->
                                            <!-- <template v-for="(value, key) in vice" :key="key">
                                                <td v-if="key === 'checkbox'">
                                                    <v-checkbox>{{ value }}</v-checkbox>
                                                </td>
                                            </template> -->
                                            <template v-for="(value, key) in vice" :key="key">
                                                <td v-if="key === 'description'">{{ value }}</td>
                                            </template>
                                            <template v-for="(value, key) in vice" :key="key">
                                                <td v-if="key === 'remarks'">{{ value }}</td>
                                            </template>
                                        </tr>
                                    </template>
                                </tbody>
                            </v-table>
                        </v-col>
                    </v-row>
                </v-container>
            </v-card-text>
            <v-divider></v-divider>
            <v-card-actions>
                <v-btn color="blue-darken-1" @click="closeDialog">Close</v-btn>
                <v-spacer></v-spacer>
                <v-btn class="bg-primary text-white" type="submit">Select</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script setup>

const props = defineProps({
    template_dialog: {
        type: Boolean,
        default: () => false,
    },
})
const emits = defineEmits()

const vices = [
    { description: "Smoking", remarks: "Smoking" },
    { description: "Drinking Alcohol", remarks: "Drinking Alcohol" },
    { description: "Drugs", remarks: "Drugs" },
]

const closeDialog = () => {
    emits("close-dialog");
};

</script>

<style scoped>
</style>

<!--
    This component can be reusable in 
    - Medical Cases
    - Allergies
    - Family Medical History
    - Social History
-->