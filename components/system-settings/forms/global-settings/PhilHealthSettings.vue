<template>
    <div class="form-container">
        <div>
            <v-label>Category</v-label>
            <v-select
                label="Select"
                :items="['Tertiary', 'Secondary']"
                variant="outlined"
                density="compact"
            ></v-select>
        </div>
        <div>
            <v-label>Facility Type</v-label>
            <v-select
                label="Select"
                :items="['N/A', 'Anonymous']"
                variant="outlined"
                density="compact"
            ></v-select>
        </div>
        <div>
            <v-label>Accreditation No.</v-label>
            <v-text-field
                v-model="phicData.accr_no"
                variant="outlined"
                density="compact"
            ></v-text-field>
        </div>
        <div>
            <v-label>Days Covered</v-label>
            <v-text-field
                v-model="phicData.days_covered"
                variant="outlined"
                density="compact"
            ></v-text-field>
        </div>
        <div>
            <v-label>PMCC No.</v-label>
            <v-text-field
                v-model="phicData.pmcc_no"
                variant="outlined"
                density="compact"
            ></v-text-field>
        </div>
        <div>
            <v-label>Public Key</v-label>
            <v-file-input
                clearable
                label="File input"
                variant="outlined"
                density="compact"
            ></v-file-input>
        </div>
        <v-title>PHIC Storage</v-title>
        <div class="phic-storage">
            <v-label>Username</v-label>
            <v-text-field
                v-model="phicData.phic_storage_username"
                variant="outlined"
                density="compact"
            ></v-text-field>
            <v-label>Password</v-label>
            <v-text-field
                v-model="phicData.phic_storage_password"
                variant="outlined"
                density="compact"
            ></v-text-field>
            <v-checkbox
                label="Human health resource shortage area"
            ></v-checkbox>
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

const props = defineProps(["phicData"]);
const emits = defineEmits();

const closeTab = () => {
    // Emit the close event to notify the parent component
    emits("close");
};
</script>

<style scoped>
.form-container {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-gap: 1rem;
}
.phic-storage {
    grid-column: 1 / 4;
}
</style>
