<template>
    <div>
        <div>
            <v-label>Beacon API URL</v-label>
            <v-text-field
                v-model="beaconData.beacon_url"
                variant="outlined"
                density="compact"
            ></v-text-field>
        </div>
        <div>
            <v-label>eClaims API URL</v-label>
            <v-text-field
                v-model="beaconData.eclaims_url"
                variant="outlined"
                density="compact"
            ></v-text-field>
        </div>
        <div>
            <v-label>QMeUp API URL</v-label>
            <v-text-field
                v-model="beaconData.qmeup_url"
                variant="outlined"
                density="compact"
            ></v-text-field>
        </div>
        <div>
            <v-label>Client ID</v-label>
            <v-text-field
                v-model="beaconData.client_id"
                variant="outlined"
                density="compact"
            ></v-text-field>
        </div>
        <div>
            <v-label>Access Key</v-label>
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
const props = defineProps(["beaconData"]);
const emits = defineEmits(['close']);

const closeTab = () => {
    // Emit the close event to notify the parent component
    emits("close");
};
</script>
