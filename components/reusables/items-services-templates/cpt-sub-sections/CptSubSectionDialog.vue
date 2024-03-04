<template>
    <v-dialog :model-value="show" rounded="lg" persistent scrollable max-width="700px">
        <v-toolbar density="compact" color="#6984ff" hide-details>
            <v-toolbar-title>CPT Sub Sections</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-btn color="white" @click="closeDialog">
                <v-icon>mdi-close</v-icon>
            </v-btn>
        </v-toolbar>
        <v-card>
            <v-card-title>
                <v-row>
                    <v-col cols="7">
                        <v-text-field
                            label="Search by Description"
                            rounded
                            hide-details
                            density="compact"
                            variant="outlined"
                            prepend-inner-icon="mdi-magnify"
                        >
                        </v-text-field>
                    </v-col>
                    <v-col cols="5">
                        <v-autocomplete
                            item-title="section"
                            item-value="id"
                            label="CPT Section"
                            :items="cptSection" 
                            hide-details
                            density="compact"
                            variant="outlined"
                        ></v-autocomplete>
                    </v-col>
                </v-row>
            </v-card-title>
            <v-card-text>
                <v-data-table density="compact" height="60vh" :headers="headers">
                    <template #bottom></template>
                </v-data-table>
            </v-card-text>
            <v-divider></v-divider>
            <v-card-actions>
                <v-btn color="blue-darken-1" @click="closeDialog"> Close </v-btn>
                <v-spacer></v-spacer>
                <v-btn class="bg-primary text-white" type="submit" @click="openCptSubSectionForm">Add</v-btn>
                <v-btn class="bg-info text-white" type="submit">Edit</v-btn>
                <v-btn class="bg-error text-white" type="submit">Delete</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
    <cpt-sub-section-form :open_cpt_sub_section_form="open_cpt_sub_section_form" @close-dialog="closeCptSubSectionForm" @handle-submit="onSubmit" />
</template>

<script setup>
import CptSubSectionForm from "./sub-forms/CptSubSectionForm.vue";

const props = defineProps({
    show: {
        type: Boolean,
        default: () => false,
        required: true,
    },
})

const emits = defineEmits()

const open_cpt_sub_section_form = ref(false)

const headers = [
    {
        title: "System Default", 
        align: "start",
        sortable: true,
        width: "25%",
    },
    {
        title: "Code",
        align: "start",
        sortable: true,
        width: "25%",
    },
    {
        title: "Description",
        align: "start",
        sortable: false,
    },
];

const cptSection = [
    { id: 1, section: "Section 1" },
    { id: 2, section: "Section 2" },
    { id: 3, section: "Section 3" },
];

const openCptSubSectionForm = () => {
    open_cpt_sub_section_form.value = true;
}

const closeCptSubSectionForm = () => {
    open_cpt_sub_section_form.value = false;
}

const onSubmit = () => {
    alert('Submitted')
}

const closeDialog = () => {
    emits('close-dialog')
}
</script>

<style scoped>
</style>