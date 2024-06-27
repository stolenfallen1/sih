<template>
<v-dialog :model-value="open_item_selection_list" rounded="lg" @update:model-value="closeDialog" scrollable max-width="700px">
    <v-toolbar density="compact" color="#107bac" hide-details>
        <v-toolbar-title>Item Selecion List</v-toolbar-title>
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
                        label="Search by Item ID"
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
                        label="Search by Description"
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
            <v-data-table density="compact" :headers="headers" :items="data" hide-details>
                <template v-slot:item="{ item }">
                    <tr>
                        <td><v-checkbox v-model="item.systemDefault" density="compact" hide-details/></td>
                        <td>{{ item.code }}</td>
                        <td>{{ item.description }}</td>
                        <td>
                            <v-icon color="green mr-3" @click="onEdit">mdi-pencil</v-icon>
                            <v-icon color="red" @click="onDelete">mdi-trash-can</v-icon>
                        </td>
                    </tr>
                </template>
                <template #bottom></template>
            </v-data-table>
            <v-card class="mt-4">
                <v-toolbar density="compact">
                    <v-toolbar-title style="font-size: medium; text-align: center;">Selected Items</v-toolbar-title>
                </v-toolbar>
                <v-data-table density="compact" :headers="headers" :items="data" hide-details>
                <template v-slot:item="{ item }">
                    <tr>
                        <td><v-checkbox v-model="item.systemDefault" density="compact" hide-details/></td>
                        <td>{{ item.code }}</td>
                        <td>{{ item.description }}</td>
                        <td>
                            <v-icon color="green mr-3" @click="onEdit">mdi-pencil</v-icon>
                            <v-icon color="red" @click="onDelete">mdi-trash-can</v-icon>
                        </td>
                    </tr>
                </template>
                <template #bottom></template>
            </v-data-table>
            </v-card>
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions>
            <v-btn color="blue-darken-1 border border-info" @click="closeDialog"> Close </v-btn>
            <v-spacer></v-spacer>
            <v-btn class="bg-primary text-white" type="submit" @click="onSubmit">Save</v-btn>
        </v-card-actions>
    </v-card>
    </v-dialog>
</template>

<script setup>

const props = defineProps({
    open_item_selection_list: {
        type: Boolean,
        default: () => false,
        required: true,
    },
})

const emits = defineEmits(['close-dialog', 'handle-submit'])

const headers = [
    {
        title: "Item Code", 
        align: "start",
        sortable: true,
    },
    {
        title: "Item Description",
        align: "start",
        sortable: true,
    },
    {
        title: "Unit",
        align: "start",
        sortable: true,
    },
    {
        title: "Inventory Balance",
        align: "start",
        sortable: true,
    },
];

const data = [];

const onSubmit = () => {
    alert('Submitted')
}

const closeDialog = () => {
    emits('close-dialog')
}
</script>

<style scoped>
</style>