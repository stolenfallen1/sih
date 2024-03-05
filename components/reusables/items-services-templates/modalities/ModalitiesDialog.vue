<template>
    <v-dialog :model-value="show" rounded="lg" persistent scrollable max-width="700px">
        <v-toolbar density="compact" color="#6984ff" hide-details>
            <v-toolbar-title>Modalities</v-toolbar-title>
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
                <v-data-table density="compact" height="60vh" :headers="headers" :items="data" hide-details>
                    <template v-slot:item="{ item }">
                        <tr>
                            <td><v-checkbox v-model="item.systemDefault" density="compact" hide-details/></td>
                            <td>{{ item.modality }}</td>
                            <td>{{ item.description }}</td>
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
                <v-btn color="blue-darken-1" @click="closeDialog"> Close </v-btn>
                <v-spacer></v-spacer>
                <v-btn class="bg-primary text-white" type="submit" @click="openModalitiesForm">Add</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
    <modalities-form :open_modalities_form="open_modalities_form" @close-dialog="closeModalitiesForm" @handle-submit="onSubmit" />
</template>

<script setup>
import ModalitiesForm from './sub-forms/ModalitiesForm.vue';

const props = defineProps({
    show: {
        type: Boolean,
        default: () => false,
        required: true,
    },
})

const emits = defineEmits()

const open_modalities_form = ref(false)

const headers = [
    {
        title: "Code", 
        align: "start",
        sortable: true,
        width: "25%",
    },
    {
        title: "Modalitiy",
        align: "start",
        sortable: false,
        width: "25%",
    },
    {
        title: "Description",
        align: "start",
        sortable: false,
    },
];

const data = [
    { systemDefault: true, modality: "test", description: 'Description1' },
    { systemDefault: false, modality: "test", description: 'Description2' },
    { systemDefault: true, modality: "test", description: 'Description3' },
];

const openModalitiesForm = () => {
    open_modalities_form.value = true;
}

const closeModalitiesForm = () => {
    open_modalities_form.value = false;
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