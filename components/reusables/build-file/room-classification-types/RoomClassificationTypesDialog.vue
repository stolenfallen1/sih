<template>
    <v-dialog :model-value="show" rounded="lg" persistent hide-overlay width="800" scrollable>
        <v-card rounded="lg">
            <v-toolbar density="compact" color="#6984ff" hide-details>
                <v-toolbar-title>Room Classification</v-toolbar-title>
                <v-spacer></v-spacer>
                <v-btn color="white" @click="closeDialog">
                    <v-icon>mdi-close</v-icon>
                </v-btn>
            </v-toolbar>
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
                                <th>Actions</th>
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
                                            <v-icon color="orange" @click="openDicountTablesDialog">{{ value }}</v-icon>
                                        </td>
                                    </template>
                                    <template v-for="(value, key) in types" :key="key">
                                        <td v-if="key === 'actions'">
                                            <div v-if="value === true">
                                                <v-icon color="green" class="mr-1" @click="openFormDialog">mdi-pencil</v-icon>
                                                <v-icon color="red" @click="onDelete">mdi-trash-can</v-icon>
                                            </div>
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
                <v-btn color="blue-darken-1" @click="closeDialog"> Close </v-btn>
                <v-spacer></v-spacer>
                <v-btn class="bg-primary text-white" type="submit" @click="openFormDialog">Add</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
    <room-classification-details :open_form_classification_details="open_form_classification_details" @close-dialog="closeFormDialog" @handle-submit="onSubmitDetails" />
    <room-class-discount-setup :open_class_discount_setup="open_class_discount_setup" :discount_types="discount_types" @close-dialog="closeDiscountTablesDialog" @handle-submit="onSubmitDiscountSetup" />
    <deleteConfirmation :show="confirmation" @confirm="confirm" @close="closeconfirmation" />
</template>

<script setup>
import RoomClassificationDetails from './sub-forms/RoomClassificationDetails.vue';
import RoomClassDiscountSetup from "./sub-forms/RoomClassDiscountSetup.vue";

const props = defineProps({
    show: {
        type: Boolean,
        default: () => false,
        required: true,
    },
})

const emits = defineEmits(['close-dialog'])

const open_class_discount_setup = ref(false)
const open_form_classification_details = ref(false)
const confirmation = ref(false)
const room_types = [
  { system_default: "No", sub_code: "RT0004", scheme: "Private/Aircon", description: "PRIVATE/AIRCON", credit_limit: 0, discount_icon: "mdi-settings-helper", actions: true },
  { system_default: "No", sub_code: "RT0005", scheme: "Suite-Luxury", description: "SUITE-LUXURY", credit_limit: 0, discount_icon: "mdi-settings-helper", actions: true },
  { system_default: "No", sub_code: "RT0006", scheme: "Private/Aircon", description: "PRIVATE/AIRCON", credit_limit:0, discount_icon: "mdi-settings-helper", actions: true },
  { system_default: "No", sub_code: "RT0003", scheme: "Private/Aircon", description: "PRIVATE/AIRCON", credit_limit: 0, discount_icon: "mdi-settings-helper", actions: true },
]
const discount_types = [
  { description: "GSIS Discount", discount: 2 },
  { description: "DOCTORS REFERRAL DISCOUNT", discount: 0 },
  { description: "CASH DISCOUNT", discount: 0 },
  { description: "PWD Discount", discount: 1 },
]
const openDicountTablesDialog = () => {
  open_class_discount_setup.value = true
}
const closeDiscountTablesDialog = () => {
  open_class_discount_setup.value = false
}

const openFormDialog = () => {
  open_form_classification_details.value = true
}

const closeFormDialog = () => {
  open_form_classification_details.value = false
}

const onSubmitDetails = () => {
  alert("Submitted")
}

const onSubmitDiscountSetup = () => {
    alert("Submitted")
}

const confirm = () => {
    confirmation.value = false;
}
const closeconfirmation = () => {
    confirmation.value = false;
}
const onDelete = (item) => {
    confirmation.value = true;
}

const closeDialog = () => {
  emits('close-dialog')
}

</script>

<style scoped>
</style>