<template>
    <v-row>
        <v-col cols="12">
            <v-card elevation="2">
                <v-card-title class="text-center">Bad Habits</v-card-title>
                <v-card-text>
                    <v-table density="compact">
                        <thead>
                            <tr>
                                <th
                                    v-for="(header, index) in badHabitsHeader"
                                    :key="index"
                                >
                                    {{ header }}
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td
                                    v-for="(header, index) in badHabitsHeader"
                                    :key="index"
                                >
                                    <template v-if="showDispensaryTextFields">
                                        <v-text-field
                                            v-model="dispensaryFields[index]"
                                            type="text"
                                            density="compact"
                                            variant="outlined"
                                        ></v-text-field>
                                    </template>
                                </td>
                            </tr>
                        </tbody>
                    </v-table>
                </v-card-text>
                <v-card-actions>
                    <v-btn
                        class="bg-info text-white"
                        type="submit"
                        @click="openTemplateDialog"
                    >
                        Add New Template
                    </v-btn>
                    <v-btn
                        class="bg-primary text-white"
                        type="submit"
                        @click="addDispensaryField"
                    >
                        {{ showDispensaryTextFields ? "Save" : "Add" }}
                    </v-btn>
                    <v-btn
                        class="bg-error text-white"
                        type="submit"
                        @click="deleteDispensaryField"
                        v-if="showDispensaryTextFields"
                    >
                        Delete
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-col>
    </v-row>
    <bad-habits-template
        :template_dialog="template_dialog"
        @select-habits="handleSelectingHabits"
        @close-dialog="closeTemplateDialog"
    />
</template>

<script setup>
import BadHabitsTemplate from "./sub-forms/BadHabitsTemplate.vue";

const badHabitsHeader = ["Description", "Remarks"];

const template_dialog = ref(false);

const showDispensaryTextFields = ref(false);
const dispensaryFields = ref([]);

const addDispensaryField = () => {
    if (!showDispensaryTextFields.value) {
        showDispensaryTextFields.value = true;
        dispensaryFields.value = Array(dispensaryHeader.length).fill("");
    } else {
        // Save the data or perform any other action needed
        console.log("Saving Patient Information:", dispensaryFields.value);
        showDispensaryTextFields.value = false;
    }
};
const deleteDispensaryField = () => {
    showDispensaryTextFields.value = false;
    dispensaryFields.value = [];
};

const openTemplateDialog = () => {
    template_dialog.value = true;
};

const closeTemplateDialog = () => {
    template_dialog.value = false;
};

const handleSelectingHabits = () => {
    alert("This habit is Selected");
}
</script>

<style scoped></style>
