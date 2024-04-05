<template>
    <v-dialog :model-value="open_referring_hci_address_form" rounded="lg" @update:model-value="closeDialog" scrollable max-width="600px">
        <form @submit.prevent="onSubmit">
            <v-card rounded="lg">
                <v-toolbar density="compact" color="#6984ff" hide-details>
                    <v-toolbar-title>Health Care Institution (HCI) Address</v-toolbar-title>
                    <v-btn color="white" @click="closeDialog">
                        <v-icon>mdi-close</v-icon>
                    </v-btn>
                </v-toolbar>
                <v-divider></v-divider>
                <v-card-text>
                    <v-row>
                        <v-col cols="12">
                            <v-text-field
                                variant="outlined"
                                label="Bldg No. / Street"
                                placeholder="Enter Bldg No. / Street"
                                v-model="address_payload.bldg_no_street"
                                required
                                outlined
                                hide-details
                                density="compact"
                            ></v-text-field>
                        </v-col>
                        <v-col cols="12">
                            <v-autocomplete
                                item-title="city"
                                item-value="id"
                                label="Province"
                                v-model="address_payload.province"
                                required
                                hide-details
                                clearable
                                :items="[]"
                                density="compact"
                                variant="outlined"
                            ></v-autocomplete>
                        </v-col>
                        <v-col cols="12">
                            <v-autocomplete
                                item-title="city"
                                item-value="id"
                                label="City / Municipality"
                                v-model="address_payload.city"
                                required
                                hide-details
                                clearable
                                :items="[]"
                                density="compact"
                                variant="outlined"
                            ></v-autocomplete>
                        </v-col>
                        <v-col cols="12">
                            <v-autocomplete
                                item-title="city"
                                item-value="id"
                                label="Zip Code"
                                v-model="address_payload.zip_code"
                                hide-details
                                clearable
                                :items="[]"
                                density="compact"
                                variant="outlined"
                            ></v-autocomplete>
                        </v-col>
                    </v-row>
                </v-card-text>
                <v-divider></v-divider>
                <v-card-actions>
                    <v-btn color="blue-darken-1 border border-info border border-info" @click="closeDialog"> Close </v-btn>
                    <v-spacer></v-spacer>
                    <v-btn class="bg-primary text-white" type="submit">Submit Address</v-btn>
                </v-card-actions>
            </v-card>
        </form>
    </v-dialog>
</template>

<script setup>
const props = defineProps({
    open_referring_hci_address_form: {
        type: Boolean,
        required: true,
        default: () => false,
    },
    address_payload: {
        type: Object,
        required: true,
        default: () => ({}),
    },
})

const emits = defineEmits(['close-dialog', 'submit-address'])

const getProvince = async () => {
};

const getMunicipality = async () => {
};

const getZipCode = async () => {
};

const closeDialog = () => {
    emits('close-dialog')
}

const onSubmit = () => {
    emits('submit-address');
}
</script>

<style scoped>
</style>