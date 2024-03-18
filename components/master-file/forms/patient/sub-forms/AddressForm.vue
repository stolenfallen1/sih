<template>
    <v-card>
        <v-card-title>Address Form</v-card-title>
        <v-card-text>
            <v-container>
                <v-row>
                    <v-col cols="6" class="pa-1">
                        <v-text-field
                            v-model="form_data.building_no"
                            variant="outlined"
                            label="Building No. / Street"
                            density="compact"
                        ></v-text-field>
                    </v-col>
                    <v-col cols="6" class="pa-1">
                        <v-select
                            v-model="form_data.barangay"
                            item-title="abbreviations"
                            item-value="id"
                            label="Barangay"
                            hide-details
                            clearable
                            density="compact"
                            variant="outlined"
                        ></v-select>
                    </v-col>
                    <v-col cols="6" class="pa-1">
                        <v-select
                            v-model="form_data.town_city"
                            item-title="abbreviations"
                            item-value="id"
                            label="Town/City"
                            hide-details
                            clearable
                            density="compact"
                            variant="outlined"
                        ></v-select>
                    </v-col>
                    <v-col cols="6" class="pa-1">
                        <v-select
                            v-model="form_data.province_state"
                            item-title="abbreviations"
                            item-value="id"
                            label="Province/State"
                            hide-details
                            clearable
                            density="compact"
                            variant="outlined"
                        ></v-select>
                    </v-col>
                    <v-col cols="6" class="pa-1">
                        <v-select
                            v-model="form_data.region"
                            item-title="abbreviations"
                            item-value="id"
                            label="Region"
                            hide-details
                            clearable
                            density="compact"
                            variant="outlined"
                        ></v-select>
                    </v-col>
                    <v-col cols="6" class="pa-1">
                        <v-select
                            v-model="form_data.country"
                            item-title="abbreviations"
                            item-value="id"
                            label="Country"
                            hide-details
                            clearable
                            density="compact"
                            variant="outlined"
                        ></v-select>
                    </v-col>
                    <v-col cols="6" class="pa-1">
                        <v-select
                            v-model="form_data.area"
                            item-title="abbreviations"
                            item-value="id"
                            label="Area"
                            hide-details
                            clearable
                            density="compact"
                            variant="outlined"
                        ></v-select>
                    </v-col>
                    <v-col cols="6" class="pa-1">
                        <v-select
                            v-model="form_data.zip_code"
                            item-title="abbreviations"
                            item-value="id"
                            label="ZIP Code"
                            hide-details
                            clearable
                            density="compact"
                            variant="outlined"
                        ></v-select>
                    </v-col>
                    <v-col lg="12" class="pa-1">
                        <v-textarea
                            v-model="form_data.full_address"
                            class="cursor-pointer"
                            label="Full Address"
                            variant="outlined"
                        ></v-textarea>
                    </v-col>
                </v-row>
            </v-container>
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions>
            <v-btn color="blue-darken-1" @click="closeDialog"> Close </v-btn>
            <v-spacer></v-spacer>
            <v-btn
                class="bg-primary text-white"
                type="submit"
                @click="handleSubmit"
            >
                Save
            </v-btn>
        </v-card-actions>
    </v-card>
</template>

<script setup>
const emits = defineEmits(['close-dialog', 'handle-submit']);
const props = defineProps({
    form_data: {
        type: Object,
        default: () => ({}),
        required: false, // Change to true if required na for dyanmic purposes
    },
})

const handleSubmit = () => {
    emits("handle-submit");
};

const closeDialog = () => {
    emits("close-dialog");
};
</script>

<style scoped></style>
