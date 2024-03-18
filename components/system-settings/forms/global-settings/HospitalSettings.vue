<template>
    <div class="form-container">
        <div>
            <v-label>Hospital Type</v-label>
            <v-select
                label="Select"
                :items="['Private Hospital', 'Public Hospital']"
                variant="outlined"
                density="compact"
            ></v-select>
        </div>
        <div>
            <v-label>Hospital Code</v-label>
            <v-text-field
                v-model="hospitalData.hcode"
                variant="outlined"
                density="compact"
            ></v-text-field>
        </div>
        <div>
            <v-label>T.I.N #</v-label>
            <v-text-field
                v-model="hospitalData.tin"
                variant="outlined"
                density="compact"
            ></v-text-field>
        </div>
        <div>
            <v-label>BIR Permit No.</v-label>
            <v-text-field
                v-model="hospitalData.owner"
                variant="outlined"
                density="compact"
            ></v-text-field>
        </div>
        <div>
            <v-label>Branch Code</v-label>
            <v-text-field
                v-model="hospitalData.email"
                variant="outlined"
                density="compact"
            ></v-text-field>
        </div>
        <div>
            <v-label>Hospital Name</v-label>
            <v-text-field
                v-model="hospitalData.hname"
                variant="outlined"
                density="compact"
            ></v-text-field>
        </div>
        <div>
            <v-label>Owner</v-label>
            <v-text-field
                v-model="hospitalData.owner"
                variant="outlined"
                density="compact"
            ></v-text-field>
        </div>
        <div>
            <v-label>Website</v-label>
            <v-text-field
                v-model="hospitalData.website"
                variant="outlined"
                density="compact"
            ></v-text-field>
        </div>
        <div>
            <v-label>Email Address</v-label>
            <v-text-field
                v-model="hospitalData.email"
                variant="outlined"
                density="compact"
            ></v-text-field>
        </div>
        <div>
            <v-label>Address</v-label>
            <v-text-field
                v-model="hospitalData.address"
                variant="outlined"
                density="compact"
            ></v-text-field>
        </div>
        <div>
            <v-label>Fax No.</v-label>
            <v-text-field
                v-model="hospitalData.email"
                variant="outlined"
                density="compact"
            ></v-text-field>
        </div>
        <div>
            <v-label>Report Server URL</v-label>
            <v-text-field
                v-model="hospitalData.email"
                variant="outlined"
                density="compact"
            ></v-text-field>
        </div>
        <div>
            <v-label>Historical Data URL</v-label>
            <v-text-field
                v-model="hospitalData.email"
                variant="outlined"
                density="compact"
            ></v-text-field>
        </div>
        <div>
            <v-label>Telephone Number</v-label>
            <v-text-field
                v-model="hospitalData.address"
                variant="outlined"
                density="compact"
            ></v-text-field>
        </div>
        <div>
            <v-label>EMR Report Path</v-label>
            <v-file-input
                clearable
                label="File input"
                variant="outlined"
                density="compact"
            ></v-file-input>
        </div>
        <div>
            <v-label>Hospital Logo</v-label>
            <v-file-input
                clearable
                label="File input"
                variant="outlined"
                density="compact"
            ></v-file-input>
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

const props = defineProps(["hospitalData"]);
const emits = defineEmits(['close']);

const closeTab = () => {
    // Emit the close event to notify the parent component
    emits("close");
};
</script>

<style scoped>
.form-container {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    grid-gap: 1rem;
}
</style>
