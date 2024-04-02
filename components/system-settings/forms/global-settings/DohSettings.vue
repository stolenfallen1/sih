<template>
    <div class="form-container">
        <div class="online-statistics">
            <div>
                <v-title>Online Statistics</v-title>
            </div>
            <v-label>Facility Codes</v-label>
            <v-text-field
                v-model="dohData.facility_codes"
                variant="outlined"
                density="compact"
            ></v-text-field>
            <v-label>Company Code</v-label>
            <v-text-field
                v-model="dohData.company_code"
                variant="outlined"
                density="compact"
            ></v-text-field>
            <v-label>API URL</v-label>
            <v-text-field
                v-model="dohData.api_url"
                variant="outlined"
                density="compact"
            ></v-text-field>
        </div>
        <div>
            <div>
                <v-title>EDPMS</v-title>
            </div>
            <v-label>Username</v-label>
            <v-text-field
                v-model="dohData.comp_username"
                variant="outlined"
                density="compact"
            ></v-text-field>
            <v-label>Password</v-label>
            <v-text-field
                v-model="dohData.comp_password"
                variant="outlined"
                density="compact"
            ></v-text-field>
        </div>
        <div>
            <v-label>Accerditation No.</v-label>
            <v-text-field
                v-model="dohData.accr_no"
                variant="outlined"
                density="compact"
            ></v-text-field>
        </div>
        <div>
            <v-label>Accredited Beds</v-label>
            <v-text-field
                v-model="dohData.accr_beds"
                variant="outlined"
                density="compact"
            ></v-text-field>
        </div>
        <div>
            <v-label>Authorized Bed Capacity</v-label>
            <v-text-field
                v-model="dohData.auth_beds"
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
const props = defineProps(["dohData"]);
const emits = defineEmits(['close']);

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
</style>
