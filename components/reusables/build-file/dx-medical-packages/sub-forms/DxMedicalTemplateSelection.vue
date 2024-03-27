<template>
    <v-dialog :model-value="open_medical_template_selection" rounded="lg" @update:model-value="closeDialog"scrollable max-width="875px">
        <v-card rounded="lg">
            <v-toolbar color="#6984ff" hide-details density="compact">
                <v-toolbar-title>Item Template Selection List</v-toolbar-title>
                <v-btn color="white" @click="closeDialog">
                    <v-icon>mdi-close</v-icon>
                </v-btn>
            </v-toolbar>
            <v-card-text>
                <v-row>
                    <v-col cols="4">
                        <v-card elevation="4">
                            <v-list-subheader inset class="text-black px-2">
                                Template List
                            </v-list-subheader>
                            <v-text-field
                                class="mb-2 px-2"
                                label="Search by Department"
                                hide-details
                                density="compact"
                                variant="outlined"
                                prepend-inner-icon="mdi-magnify"
                            ></v-text-field>
                            <v-data-table density="compact" height="40vh" :headers="template_list_header" :items="template_list_data" hide-details>
                                <template v-slot:item="{ item }">
                                    <tr>
                                        <td>{{ item.description }}</td>
                                    </tr>
                                </template>
                                <template #bottom></template>
                            </v-data-table>
                        </v-card>
                    </v-col>
                    <v-col cols="8">
                        <v-card elevation="4">
                            <v-list-subheader inset class="text-black px-2">
                                Template Line Item(s)
                            </v-list-subheader>
                            <v-data-table density="compact" height="47.5vh" :headers="template_line_items_header" :items="template_line_items_data" hide-details>
                                <template v-slot:item="{ item }">
                                    <tr>
                                        <td>{{ item.department_name }}</td>
                                    </tr>
                                </template>
                                <template #bottom></template>
                            </v-data-table>
                        </v-card>
                    </v-col>
                </v-row>
            </v-card-text>
            <v-divider></v-divider>
            <v-card-actions>
                <v-btn color="blue-darken-1" @click="closeDialog"> Close </v-btn>
                <v-spacer></v-spacer>
                <v-btn class="bg-primary text-white" type="submit" @click="handleSubmit">Submit</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script setup>

const props = defineProps({
    open_medical_template_selection: {
        type: Boolean,
        default: () => false,
        required: true,
    },
})

const template_list_header = [
    {
        title: "Department", 
        align: "start",
        sortable: true,
    },
];

const template_list_data = [
    { department_id: 1, description: 'Description1' },
    { department_id: 2, description: 'Description2' },
    { department_id: 3, description: 'Description3' },
    { department_id: 4, description: 'Description4' },
    { department_id: 5, description: 'Description5' },
    { department_id: 6, description: 'Description6' },
    { department_id: 7, description: 'Description7' },
]

const template_line_items_header = [
    {
        title: "Item ID", 
        align: "start",
        sortable: true,
    },
    {
        title: "Description", 
        align: "start",
        sortable: true,
    },
    {
        title: "Qty", 
        align: "start",
        sortable: true,
    },
    {
        title: "Unit", 
        align: "start",
        sortable: true,
    },
]

const template_line_items_data = []


const emits = defineEmits(['close-dialog', 'handle-submit'])

const handleSubmit = () => {
    emits('handle-submit')
}

const closeDialog = () => {
    emits('close-dialog')
}
</script>

<style scoped>
</style>