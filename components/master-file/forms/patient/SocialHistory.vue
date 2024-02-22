<template>
    <v-row>
        <v-col lg="12">
            <v-card elevation="2">
                <v-card-title class="text-center">List of Social History</v-card-title>
                <v-card-text>
                    <v-table density="compact">
                        <thead>
                            <tr>
                                <th>Description</th>
                                <th class="text-center">Notes</th>
                            </tr>
                        </thead>
                    </v-table>
                </v-card-text>
                <v-card-actions>
                    <v-btn class="bg-primary text-white" type="submit" @click="openTemplateDialog">
                        Add New Social History
                    </v-btn>
                    <v-btn class="bg-error text-white" type="submit">
                        Delete
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-col>
    </v-row>
    <creation-template :template_dialog="template_dialog" @close-dialog="closeTemplateDialog" />
</template>

<script setup>
import CreationTemplate from "./sub-forms/CreationTemplate.vue";

const template_dialog = ref(false);

const openTemplateDialog = () => {
    template_dialog.value = true;
};

const closeTemplateDialog = () => {
    template_dialog.value = false;
};

</script>

<style scoped>

</style>