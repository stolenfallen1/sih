<template>
    <v-col cols="12">
        <v-card class="px-4" elevation="2">
            <v-list-subheader inset>
                Miscellanous Information
            </v-list-subheader>
            <v-card-text>
                <v-row>
                    <v-col lg="6">
                        <v-text-field
                            label="Primary Supplier"
                            type="text"
                            density="compact"
                            prepend-icon="mdi-plus-box"
                            disabled
                            variant="outlined"
                        ></v-text-field>
                    </v-col>
                    <v-col lg="6">
                        <v-text-field
                            label="Discount Specs"
                            type="text"
                            density="compact"
                            disabled
                            variant="outlined"
                        ></v-text-field>
                    </v-col>
                </v-row>
                <v-row>
                    <v-col lg="5">
                        <v-select
                            label="Billing Report Category"
                            :items="billing_category" 
                            variant="outlined"
                            density="compact"
                        ></v-select>
                    </v-col>
                    <v-col lg="3">
                        <v-text-field
                            label="Weighted Avg. Cost"
                            type="number"
                            density="compact"
                            disabled
                            variant="outlined"
                        ></v-text-field>
                    </v-col>
                    <v-col lg="2">
                        <v-text-field
                            label="Latest Purchase Price"
                            type="text"
                            density="compact"
                            disabled
                            variant="outlined"
                        ></v-text-field>
                    </v-col>
                    <v-col lg="2">
                        <v-text-field
                            label="Latest Purchase Price"
                            type="date"
                            density="compact"
                            disabled
                            variant="outlined"
                        ></v-text-field>
                    </v-col>
                </v-row>
            </v-card-text>
        </v-card>
    </v-col>
    <v-col cols="12">
        <v-row>
            <v-col lg="5">
                <v-card class="px-4" elevation="2">
                    <v-list-subheader inset>
                        Journal Account Codes
                    </v-list-subheader>
                    <v-card-text>
                        <v-row>
                            <v-col cols="12">
                                <v-list-subheader inset>
                                    Inpatients
                                </v-list-subheader>
                                <v-text-field
                                    label="Sales"
                                    type="text"
                                    density="compact"
                                    variant="outlined"
                                ></v-text-field>
                                <v-select
                                    label="Cost of Sales"
                                    disabled
                                    variant="outlined"
                                    density="compact"
                                ></v-select>
                            </v-col>
                        </v-row>
                        <v-row>
                            <v-col cols="12">
                                <v-list-subheader inset>
                                    Outpatients
                                </v-list-subheader>
                                <v-text-field
                                    label="Sales"
                                    type="text"
                                    density="compact"
                                    variant="outlined"
                                ></v-text-field>
                                <v-select
                                    label="Cost of Sales"
                                    disabled
                                    variant="outlined"
                                    density="compact"
                                ></v-select>
                            </v-col>
                        </v-row>
                        <v-row>
                            <v-col cols="12">
                                <v-list-subheader inset>
                                    Emergencies
                                </v-list-subheader>
                                <v-text-field
                                    label="Sales"
                                    type="text"
                                    density="compact"
                                    variant="outlined"
                                ></v-text-field>
                                <v-select
                                    label="Cost of Sales"
                                    disabled
                                    variant="outlined"
                                    density="compact"
                                ></v-select>
                            </v-col>
                        </v-row>
                        <v-row>
                            <v-col cols="12">
                                <v-list-subheader inset>
                                    General
                                </v-list-subheader>
                                <v-text-field
                                    label="Expenses"
                                    disabled
                                    type="text"
                                    density="compact"
                                    variant="outlined"
                                ></v-text-field>
                                <v-select
                                    label="Reader's Fee"
                                    :disabled="currentTabValue === '4' ? true : false"
                                    variant="outlined"
                                    density="compact"
                                ></v-select>
                                <v-select
                                    label="Inventories"
                                    disabled
                                    variant="outlined"
                                    density="compact"
                                ></v-select>
                            </v-col>
                        </v-row>
                    </v-card-text>
                </v-card>
            </v-col>
            <v-col lg="7">
                <v-card class="px-4" elevation="2">
                    <v-list-subheader inset>
                        Item Group Specific Information
                    </v-list-subheader>
                    <v-card-text>
                        <v-row v-if="currentTabValue === '1'">
                            <v-col lg="4">
                                <v-checkbox
                                    v-model="allowMultiTestCodes"
                                    label="Allow Multi Test Codes"
                                ></v-checkbox>
                            </v-col>
                            <v-col lg="4">
                                <v-btn class="mt-2" :disabled="!allowMultiTestCodes" @click="openTemplateDialog">Test Codes</v-btn>
                            </v-col>
                            <v-col lg="4">
                                <v-checkbox
                                    label="Is pathology?"
                                ></v-checkbox>
                            </v-col>
                        </v-row>
                        <v-row v-if="currentTabValue === '1'">
                            <v-col lg="4">
                                <v-list-subheader inset>
                                    Render's fee charge type
                                </v-list-subheader>
                                <v-select
                                    :items="charge_type"
                                    variant="outlined"
                                    density="compact"
                                ></v-select>
                            </v-col>
                            <v-col lg="4">
                                <v-list-subheader inset>
                                    Render's fee charge base
                                </v-list-subheader>
                                <v-text-field
                                    type="number"
                                    density="compact"
                                    variant="outlined"
                                ></v-text-field>
                            </v-col>
                            <v-col lg="4">
                                <v-list-subheader inset>
                                    Other hospital services
                                </v-list-subheader>
                                <v-select
                                    :items="other_hospital_services"
                                    variant="outlined"
                                    density="compact"
                                ></v-select>
                            </v-col>
                        </v-row>
                        <v-row v-if="currentTabValue === '1'">
                            <v-col lg="6">
                                <v-select
                                    label="Modality"
                                    variant="outlined"
                                    density="compact"
                                ></v-select>
                            </v-col>
                            <v-col lg="6">
                                <v-select
                                    label="Specimen"
                                    variant="outlined"
                                    density="compact"
                                ></v-select>
                            </v-col>
                        </v-row>
                        <v-row v-if="currentTabValue === '4'">
                            <v-col lg="8">
                                <v-select
                                    label="Surgical Case Item Type"
                                    variant="outlined"
                                    density="compact"
                                ></v-select>
                            </v-col>
                        </v-row>
                        <v-divider></v-divider>
                        <v-row class="mt-2">
                            <v-col lg="3">
                                <v-checkbox
                                    label="Sorting Priority"
                                ></v-checkbox>
                            </v-col>
                            <v-col lg="3">
                                <v-checkbox
                                    label="Include in For Reorder Report?"
                                ></v-checkbox>
                            </v-col>
                            <v-col lg="3">
                                <v-checkbox
                                    label="Primary Medical Team"
                                ></v-checkbox>
                            </v-col>
                            <v-col lg="3">
                                <v-checkbox
                                    label="Ortho Spine"
                                ></v-checkbox>
                            </v-col>
                        </v-row>
                        <v-row>
                            <v-col lg="4">
                                <v-list-subheader inset>
                                    Buffer Days
                                </v-list-subheader>
                                <v-text-field
                                    type="number"
                                    density="compact"
                                    variant="outlined"
                                ></v-text-field>
                            </v-col>
                            <v-col lg="4">
                                <v-list-subheader inset>
                                    Ordering Department
                                </v-list-subheader>
                                <v-select
                                    disabled
                                    variant="outlined"
                                    density="compact"
                                ></v-select>
                            </v-col>
                            <v-col lg="4">
                                <v-list-subheader inset>
                                    Report Inlusion Date
                                </v-list-subheader>
                                <v-text-field
                                    type="date"
                                    disabled
                                    density="compact"
                                    variant="outlined"
                                ></v-text-field>
                            </v-col>
                        </v-row>
                    </v-card-text>
                </v-card>
            </v-col>
        </v-row>
    </v-col>
    <test-code-list :template_dialog="template_dialog" @close-dialog="closeTemplateDialog" />
</template>

<script setup>
import TestCodeList from "./sub-forms/TestCodeList.vue";

const props = defineProps({
    currentTabValue: {
        type: String,
        default: () => "1",
    },
})

const billing_category = [
    'CT_Scan',
    'MRI',
    'X-ray',
]
const charge_type = [
    'Fixed',
    'Rated',
]
const other_hospital_services = [
    'Special Urinalysis',
    'Routine Urinalysis',
]

const allowMultiTestCodes = ref(false)
const template_dialog = ref(false)

const openTemplateDialog = () => {
    template_dialog.value = true
}

const closeTemplateDialog = () => {
    template_dialog.value = false
}

</script>

<style>
</style>