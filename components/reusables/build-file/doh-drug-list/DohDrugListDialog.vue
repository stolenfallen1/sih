<template>
    <v-dialog :model-value="show" rounded="lg" @update:model-value="closeDialog"  scrollable max-width="700px">
        <v-card rounded="lg">
            <v-toolbar density="compact" color="#6984ff" hide-details>
                <v-toolbar-title>DOH Drug List Build Up</v-toolbar-title>
                <v-spacer></v-spacer>
                <v-btn color="white" @click="closeDialog">
                    <v-icon>mdi-close</v-icon>
                </v-btn>
            </v-toolbar>
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
                <v-data-table density="compact" height="60vh" :headers="headers" :items="data" hide-details>
                    <template v-slot:item="{ item }">
                        <tr>
                            <td><v-checkbox v-model="item.systemDefault" density="compact" hide-details/></td>
                            <td>{{ item.code }}</td>
                            <td>{{ item.description }}</td>
                            <td>{{ item.status === true ? "Active" : "Inactive" }}</td>
                            <td>
                                <v-icon color="green mr-3" @click="onEdit">mdi-pencil</v-icon>
                                <v-icon color="red" @click="onDelete">mdi-trash-can</v-icon>
                            </td>
                        </tr>
                    </template>
                    <template #bottom></template>
                </v-data-table>
            </v-card-text>
            <v-divider></v-divider>
            <v-card-actions>
                <v-btn color="blue-darken-1 border border-info" @click="closeDialog"> Close </v-btn>
                <v-spacer></v-spacer>
                <v-btn class="bg-primary text-white" type="submit" @click="openDohDrugListForm">Add</v-btn>
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

const emits = defineEmits(['close-dialog'])

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
    {
        title: "Actions",
        align: "start",
        sortable: false,
    },
];

const data = [
    { systemDefault: true, code: 'Code1', description: 'Description1', status: true },
    { systemDefault: false, code: 'Code2', description: 'Description2', status: false },
    { systemDefault: true, code: 'Code3', description: 'Description3' , status: true },
];

const openDohDrugListForm = () => {
    doh_drug_list_form.value = true;
}

const closeDohDrugListForm = () => {
    doh_drug_list_form.value = false;
}

const onEdit = () => {
    alert("Edit")
}

const onDelete = () => {
    alert("Delete")
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