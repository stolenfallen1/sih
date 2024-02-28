<template>
    <v-dialog v-model="dialog" persistent hide-overlay width="800" scrollable>
        <v-toolbar density="compact" color="#6984ff" hide-details>
            <v-toolbar-title>Room Classification Types</v-toolbar-title>
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
                                <th>Internal Subaccount Code</th>
                                <th>Price Scheme</th>
                                <th>Description</th>
                                <th>Credit Limit</th>
                                <th>Discount Details</th>
                            </tr>
                        </thead>
                        <tbody>
                            <template v-for="(types, typeIndex) in room_types" :key="typeIndex">
                                <tr>      
                                    <template v-for="(value, key) in types" :key="key">
                                        <td v-if="key === 'system_default'">
                                            <v-checkbox density="compact"></v-checkbox>
                                        </td>
                                    </template>                            
                                    <template v-for="(value, key) in types" :key="key">
                                        <td v-if="key === 'sub_code'">{{ value }}</td>
                                    </template>
                                    <template v-for="(value, key) in types" :key="key">
                                        <td v-if="key === 'scheme'">{{ value }}</td>
                                    </template>
                                    <template v-for="(value, key) in types" :key="key">
                                        <td v-if="key === 'description'">{{ value }}</td>
                                    </template>
                                    <template v-for="(value, key) in types" :key="key">
                                        <td v-if="key === 'credit_limit'">{{ value }}</td>
                                    </template>
                                    <template v-for="(value, key) in types" :key="key">
                                        <td v-if="key === 'discount_icon'">
                                            <v-icon color="orange" @click="openDicountTables">{{ value }}</v-icon>
                                        </td>
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
        <!-- Discount table dialog -->
        <v-dialog v-model="discount_dialog" persistent hide-overlay width="650">
            <discount-details @close-dialog="closeDiscountDialog" :discount_types="discount_types" />
        </v-dialog>
        <!-- Form Dialog -->
        <v-dialog v-model="form_dialog" persistent hide-overlay width="650">
            <Form @close-dialog="closeFormDialog" @handle-submit="onSubmit" />
        </v-dialog>
    </v-dialog>
</template>

<script setup>
import Form from './Form.vue';
import discountDetails from './discount-details.vue';

definePageMeta({
    layout: "root-layout",
});

const router = useRouter()

const dialog = ref(true)
const discount_dialog = ref(false)
const form_dialog = ref(false)
const room_types = [
    { system_default: "No", sub_code: "RT0004", scheme: "Private/Aircon", description: "PRIVATE/AIRCON", credit_limit: 0, discount_icon: "mdi-settings-helper" },
    { system_default: "No", sub_code: "RT0005", scheme: "Suite-Luxury", description: "SUITE-LUXURY", credit_limit: 0, discount_icon: "mdi-settings-helper" },
    { system_default: "No", sub_code: "RT0006", scheme: "Private/Aircon", description: "PRIVATE/AIRCON", credit_limit:0, discount_icon: "mdi-settings-helper" },
    { system_default: "No", sub_code: "RT0003", scheme: "Private/Aircon", description: "PRIVATE/AIRCON", credit_limit: 0, discount_icon: "mdi-settings-helper" },
]
const discount_types = [
    { description: "GSIS Discount", discount: 2 },
    { description: "DOCTORS REFERRAL DISCOUNT", discount: 0 },
    { description: "CASH DISCOUNT", discount: 0 },
    { description: "PWD Discount", discount: 1 },
]
const openDicountTables = () => {
    discount_dialog.value = true
}
const closeDiscountDialog = () => {
    discount_dialog.value = false
}

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