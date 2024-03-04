<template>
    <v-dialog :model-value="show" rounded="lg" persistent scrollable max-width="700px">
        <v-toolbar density="compact" color="#6984ff" hide-details>
            <v-toolbar-title>DOH Drug List Build Up</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-btn color="white" @click="closeDialog">
                <v-icon>mdi-close</v-icon>
            </v-btn>
        </v-toolbar>
        <v-card>
            <v-card-title>
                <v-row>
                    <v-col cols="5">
                        <v-text-field
                            label="Search by Drug Code"
                            rounded
                            hide-details
                            density="compact"
                            variant="outlined"
                            prepend-inner-icon="mdi-magnify"
                        >
                        </v-text-field>
                    </v-col>
                    <v-col cols="7">
                        <v-text-field
                            label="Search by Drug Description"
                            rounded
                            hide-details
                            density="compact"
                            variant="outlined"
                            prepend-inner-icon="mdi-magnify"
                        >
                        </v-text-field>
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
                <v-btn class="bg-primary text-white" type="submit" @click="openDohDrugListForm">Add</v-btn>
                <v-btn class="bg-info text-white" type="submit">Edit</v-btn>
                <v-btn class="bg-error text-white" type="submit">Delete</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
    <doh-drug-list-form :doh_drug_list_form="doh_drug_list_form" @close-dialog="closeDohDrugListForm" @handle-submit="onSubmit" />
</template>

<script setup>
import DohDrugListForm from "./sub-forms/DohDrugListForm.vue";

const props = defineProps({
    show: {
        type: Boolean,
        default: () => false,
        required: true,
    },
})

const emits = defineEmits()

const doh_drug_list_form = ref(false)

const headers = [
    {
        title: "System Default", 
        align: "start",
        sortable: true,
        width: "25%",
    },
    {
        title: "Drug Code",
        align: "start",
        sortable: true,
        width: "25%",
    },
    {
        title: "Drug Description",
        align: "start",
        sortable: false,
    },
    {
        title: "Status",
        align: "start",
        sortable: false,
    },
];

const openDohDrugListForm = () => {
    doh_drug_list_form.value = true;
}

const closeDohDrugListForm = () => {
    doh_drug_list_form.value = false;
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