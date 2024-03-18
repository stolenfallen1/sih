<template>
    <div>
        <div>
            <v-label>No. of Tries For User Accout Login</v-label>
            <v-text-field
                v-model="userAccountData.no_of_tries"
                variant="outlined"
                density="compact"
            ></v-text-field>
        </div>
        <div>
            <v-label>User Account Lockout Duration (mins/hours)</v-label>
            <v-text-field
                v-model="userAccountData.lockout_duration"
                variant="outlined"
                density="compact"
            ></v-text-field>
        </div>
    </div>
    <div class="pa-4 text-end">
        <v-btn
            class="text-none mr-4"
            color="primary"
            min-width="92"
            rounded
            variant="outlined"
        >
            Save Changes
        </v-btn>
        <v-btn
            class="text-none"
            color="red"
            min-width="92"
            rounded
            variant="outlined"
            @click="closeTab"
        >
            Close
        </v-btn>
    </div>
</template>

<script setup>
import { defineProps, defineEmits } from "vue";

const props = defineProps(["userAccountData"]);
const emits = defineEmits(['close']);

const closeTab = () => {
    // Emit the close event to notify the parent component
    emits("close");
};
</script>
