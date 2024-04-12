<template>
    <v-dialog
        :model-value="address_form_dialog"
        @update:model-value="closeDialog"
        hide-overlay
        width="650"
    >
        <form @submit.prevent="handleSubmit">
            <v-card rounded="lg">
                <v-toolbar density="compact" color="#6984ff" hide-details>
                    <v-toolbar-title>Address Form</v-toolbar-title>
                    <v-btn color="white" @click="closeDialog">
                        <v-icon>mdi-close</v-icon>
                    </v-btn>
                </v-toolbar>
                <v-card-text>
                    <v-container>
                        <v-row>
                            <v-col cols="6" class="pa-1">
                                <v-list-subheader class="form-header">Building No. / Street <span style="color: red;" class="mdi mdi-check"></span></v-list-subheader>
                                <v-text-field
                                    v-model="form_data.building_no"
                                    variant="solo"
                                    required
                                    placeholder="Enter Building No. / Street"
                                    density="compact"
                                    hide-details
                                ></v-text-field>
                            </v-col>
                            <v-col cols="6" class="pa-1">
                                <v-list-subheader class="form-header">Barangay <span style="color: red;" class="mdi mdi-check"></span></v-list-subheader>
                                <v-select
                                    v-model="form_data.barangay"
                                    item-title="abbreviations"
                                    item-value="id"
                                    placeholder="Select Barangay"
                                    required
                                    hide-details
                                    clearable
                                    density="compact"
                                    variant="solo"
                                ></v-select>
                            </v-col>
                            <v-col cols="6" class="pa-1">
                                <v-list-subheader class="form-header">Town / City <span style="color: red;" class="mdi mdi-check"></span></v-list-subheader>
                                <v-select
                                    v-model="form_data.town_city"
                                    item-title="abbreviations"
                                    item-value="id"
                                    placeholder="Select Town / City"
                                    required
                                    hide-details
                                    clearable
                                    density="compact"
                                    variant="solo"
                                ></v-select>
                            </v-col>
                            <v-col cols="6" class="pa-1">
                                <v-list-subheader class="form-header">Province / State <span style="color: red;" class="mdi mdi-check"></span></v-list-subheader>
                                <v-select
                                    v-model="form_data.province_state"
                                    item-title="abbreviations"
                                    item-value="id"
                                    placeholder="Select Province / State"
                                    required
                                    hide-details
                                    clearable
                                    density="compact"
                                    variant="solo"
                                ></v-select>
                            </v-col>
                            <v-col cols="6" class="pa-1">
                                <v-list-subheader class="form-header">Region <span style="color: red;" class="mdi mdi-check"></span></v-list-subheader>
                                <v-select
                                    v-model="form_data.region"
                                    item-title="abbreviations"
                                    item-value="id"
                                    placeholder="Select Region"
                                    required
                                    hide-details
                                    clearable
                                    density="compact"
                                    variant="solo"
                                ></v-select>
                            </v-col>
                            <v-col cols="6" class="pa-1">
                                <v-list-subheader class="form-header">Country <span style="color: red;" class="mdi mdi-check"></span></v-list-subheader>
                                <v-select
                                    v-model="form_data.country"
                                    item-title="abbreviations"
                                    item-value="id"
                                    placeholder="Select Country"
                                    required
                                    hide-details
                                    clearable
                                    density="compact"
                                    variant="solo"
                                ></v-select>
                            </v-col>
                            <v-col cols="6" class="pa-1">
                                <v-list-subheader class="form-header">Area </v-list-subheader>
                                <v-select
                                    v-model="form_data.area"
                                    item-title="abbreviations"
                                    item-value="id"
                                    placeholder="Select Area"
                                    hide-details
                                    clearable
                                    density="compact"
                                    variant="solo"
                                ></v-select>
                            </v-col>
                            <v-col cols="6" class="pa-1">
                                <v-list-subheader class="form-header">Zip Code</v-list-subheader>
                                <v-select
                                    v-model="form_data.zip_code"
                                    item-title="abbreviations"
                                    item-value="id"
                                    placeholder="Select Zip Code"
                                    hide-details
                                    clearable
                                    density="compact"
                                    variant="solo"
                                ></v-select>
                            </v-col>
                            <v-col lg="12" class="pa-1">
                                <v-textarea
                                    v-model="form_data.full_address"
                                    class="cursor-pointer"
                                    readonly
                                    variant="solo"
                                ></v-textarea>
                            </v-col>
                        </v-row>
                    </v-container>
                </v-card-text>
                <v-divider></v-divider>
                <v-card-actions>
                    <v-btn color="blue-darken-1 border border-info" @click="closeDialog"> Close </v-btn>
                    <v-spacer></v-spacer>
                    <v-btn
                        class="bg-primary text-white"
                        type="submit"
                    >
                        Submit Address
                    </v-btn>
                </v-card-actions>
            </v-card>
        </form>
    </v-dialog>
</template>

<script setup>
const emits = defineEmits(['close-dialog', 'handle-submit']);
const props = defineProps({
    address_form_dialog: {
        type: Boolean,
        default: () => false,
        required: true,
    },
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

<style scoped>
.form-header {
    color: #000;
    margin: -12px 0px -12px 0px;
    font-weight: 500;
}
</style>
