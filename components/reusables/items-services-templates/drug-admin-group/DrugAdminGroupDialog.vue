<template>
    <v-dialog :model-value="show" rounded="lg" persistent scrollable max-width="700px">
        <v-toolbar density="compact" color="#6984ff" hide-details>
            <v-toolbar-title>Drug Administration Group</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-btn color="white" @click="closeDialog">
                <v-icon>mdi-close</v-icon>
            </v-btn>
        </v-toolbar>
        <v-card>
            <v-card-title>
                <v-spacer></v-spacer>
                <v-text-field
                    label="Search by Description"
                    rounded
                    hide-details
                    density="compact"
                    variant="outlined"
                    prepend-inner-icon="mdi-magnify"
                >
                </v-text-field>
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
                <v-btn class="bg-primary text-white" type="submit" @click="openDrugAdminGroup">Add</v-btn>
                <v-btn class="bg-info text-white" type="submit">Edit</v-btn>
                <v-btn class="bg-error text-white" type="submit">Delete</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
    <drug-admin-group-form :drug_admin_group="drug_admin_group" @close-dialog="closeDrugAdminGroup" @handle-submit="onSubmit" />
</template>

<script setup>
import DrugAdminGroupForm from "./sub-forms/DrugAdminGroupForm.vue";

const props = defineProps({
    show: {
        type: Boolean,
        default: () => false,
        required: true,
    },
})

const emits = defineEmits()

const drug_admin_group = ref(false)

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
        sortable: false,
    },
    {
        title: "Description",
        align: "start",
        sortable: false,
    },
    {
        title: "Printer Path",
        align: "start",
        sortable: false,
    },
];

const openDrugAdminGroup = () => {
    drug_admin_group.value = true;
}

const closeDrugAdminGroup = () => {
    drug_admin_group.value = false;
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