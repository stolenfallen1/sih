<template>
    <v-dialog v-model="dialog" persistent hide-overlay width="800" scrollable>
        <v-toolbar density="compact" color="#6984ff" hide-details>
            <v-toolbar-title>Room Price Schemes</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-btn color="white" @click="router.back()">
                <v-icon>mdi-close</v-icon>
            </v-btn>
        </v-toolbar>
        <v-card>
            <v-card-text>
                <v-container>
                    <v-table density="compact">
                        <thead>
                            <tr>
                                <th><v-icon>mdi-desktop-classic</v-icon></th>
                                <th>Code</th>
                                <th>Description</th>
                            </tr>
                        </thead>
                        <tbody>
                            <template v-for="(prices, typeIndex) in room_price" :key="typeIndex">
                                <tr>    
                                    <template v-for="(value, key) in prices" :key="key">
                                        <td v-if="key === 'system_default'">
                                            <v-checkbox density="compact"></v-checkbox>
                                        </td>
                                    </template>                             
                                    <template v-for="(value, key) in prices" :key="key">
                                        <td v-if="key === 'code'">{{ value }}</td>
                                    </template>
                                    <template v-for="(value, key) in prices" :key="key">
                                        <td v-if="key === 'description'">{{ value }}</td>
                                    </template>
                                </tr>
                            </template>
                        </tbody>
                    </v-table>
                </v-container>
            </v-card-text>
            <v-divider></v-divider>
            <v-card-actions>
                <v-btn color="blue-darken-1" @click="router.back()"> Close </v-btn>
                <v-spacer></v-spacer>
                <v-btn class="bg-primary text-white" type="submit" @click="openFormDialog">Add</v-btn>
                <v-btn class="bg-info text-white" type="submit" @click="openFormDialog">Edit</v-btn>
                <v-btn class="bg-error text-white" type="submit" @click="onDelete">Delete</v-btn>
            </v-card-actions>
        </v-card>
        <v-dialog v-model="form_dialog" persistent hide-overlay width="650">
            <Form @close-dialog="closeFormDialog" @handle-submit="onSubmit" />
        </v-dialog>
    </v-dialog>
</template>

<script setup>
import Form from "./Form.vue"

definePageMeta({
    layout: "root-layout",
});

const router = useRouter()

const dialog = ref(true)
const form_dialog = ref(false)
const room_price = [
    { system_default: "No", code: "Standard", description: "Standard" },
    { system_default: "No", code: "Non-standard", description: "Non-standard" },
]

const openFormDialog = () => {
    form_dialog.value = true
}

const closeFormDialog = () => {
    form_dialog.value = false
}

const onSubmit = () => {
    alert("Submitted")
}

const onDelete = () => {
    alert('Delete')
}

</script>

<style scoped>
</style>