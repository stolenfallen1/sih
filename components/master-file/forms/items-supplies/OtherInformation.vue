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
                            @click.prepend="openSupplierDialog"
                            class="cursor-pointer"
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
                                    :disabled="currentTabValue === '3'"
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
                                    :disabled="currentTabValue === '3'"
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
                                    :disabled="currentTabValue === '3'"
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
                                    :disabled="currentTabValue === '3'"
                                    type="text"
                                    density="compact"
                                    variant="outlined"
                                ></v-text-field>
                                <v-select
                                    label="Reader's Fee"
                                    :disabled="currentTabValue === '3' ? false : true"
                                    variant="outlined"
                                    density="compact"
                                ></v-select>
                                <v-select
                                    label="Inventories"
                                    :disabled="currentTabValue === '3'"
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
                        <v-row>
                            <v-col lg="4">
                                <v-text-field
                                    label="Minimum Inventory"
                                    type="text"
                                    density="compact"
                                    variant="outlined"
                                ></v-text-field>
                            </v-col>
                            <v-col lg="4">
                                <v-text-field
                                    label="Maximum Inventory"
                                    type="text"
                                    density="compact"
                                    variant="outlined"
                                ></v-text-field>
                            </v-col>
                            <v-col lg="4">
                                <v-text-field
                                    label="Lead Time"
                                    type="text"
                                    density="compact"
                                    variant="outlined"
                                ></v-text-field>
                            </v-col>
                        </v-row>
                        <v-row>
                            <v-col lg="6">
                                <v-text-field
                                    label="On Transit"
                                    disabled
                                    type="text"
                                    density="compact"
                                    variant="outlined"
                                ></v-text-field>
                            </v-col>
                            <v-col lg="6">
                                <v-text-field
                                    label="On Pruchase Order"
                                    disabled
                                    type="text"
                                    density="compact"
                                    variant="outlined"
                                ></v-text-field>
                            </v-col>
                        </v-row>
                        <v-divider></v-divider>
                        <v-row v-if="currentTabValue === '2'" class="mt-2">
                            <v-col lg="4">
                                <v-checkbox
                                    label="For Production"
                                ></v-checkbox>
                            </v-col>
                            <v-col lg="4">
                                <v-checkbox
                                    label="Reagents"
                                ></v-checkbox>
                            </v-col>
                            <v-col lg="4">
                                <v-checkbox
                                    label="PNF"
                                ></v-checkbox>
                            </v-col>
                            <v-col lg="4">
                                <v-checkbox
                                    label="Consignment?"
                                ></v-checkbox>
                            </v-col>
                            <v-col lg="4">
                                <v-checkbox
                                    label="Control Drug"
                                ></v-checkbox>
                            </v-col>
                            <v-col lg="4">
                                <v-checkbox
                                    label="Sorting Priority"
                                ></v-checkbox>
                            </v-col>
                        </v-row>
                        <v-row v-if="currentTabValue === '5'" class="mt-2">
                            <v-col lg="6">
                                <v-checkbox
                                    label="For Production"
                                ></v-checkbox>
                            </v-col>
                            <v-col lg="6">
                                <v-checkbox
                                    label="Reagents"
                                ></v-checkbox>
                            </v-col>
                            <v-col lg="6">
                                <v-checkbox
                                    label="Consignment?"
                                ></v-checkbox>
                            </v-col>
                            <v-col lg="6">
                                <v-checkbox
                                    label="Sorting Priority"
                                ></v-checkbox>
                            </v-col>
                        </v-row>
                        <v-row v-if="currentTabValue === '6'" class="mt-2">
                            <v-col lg="12">
                                <v-checkbox
                                    v-model="fixed_asset"
                                    label="Fixed Asset"
                                ></v-checkbox>
                            </v-col>
                            <v-col lg="4">
                                <v-checkbox
                                    label="For Production"
                                ></v-checkbox>
                            </v-col>
                            <v-col lg="4">
                                <v-checkbox
                                    label="Reagents"
                                ></v-checkbox>
                            </v-col>
                            <v-col lg="4">
                                <v-checkbox
                                    label="PNF"
                                ></v-checkbox>
                            </v-col>
                            <v-col lg="4">
                                <v-checkbox
                                    label="Immunization"
                                ></v-checkbox>
                            </v-col>
                            <v-col lg="4">
                                <v-checkbox
                                    label="Consignment?"
                                ></v-checkbox>
                            </v-col>
                            <v-col lg="4">
                                <v-checkbox
                                    label="Sorting Priority"
                                ></v-checkbox>
                            </v-col>
                        </v-row>
                        <v-row v-if="currentTabValue === '3'" class="mt-2">
                            <v-col lg="4">
                                <v-checkbox
                                    label="For Production"
                                ></v-checkbox>
                            </v-col>
                            <v-col lg="4">
                                <v-checkbox
                                    label="Reagents"
                                ></v-checkbox>
                            </v-col>
                            <v-col lg="4">
                                <v-checkbox
                                    label="PNF"
                                ></v-checkbox>
                            </v-col>
                            <v-col lg="4">
                                <v-checkbox
                                    label="Immunization"
                                ></v-checkbox>
                            </v-col>
                            <v-col lg="4">
                                <v-checkbox
                                    label="Consignment?"
                                ></v-checkbox>
                            </v-col>
                            <v-col lg="4">
                                <v-checkbox
                                    label="Sorting Priority"
                                ></v-checkbox>
                            </v-col>
                        </v-row>
                        <v-divider></v-divider>
                        <v-row class="mt-2">
                            <v-col lg="4">
                                <v-checkbox
                                    label="Include in For Reorder Report?"
                                ></v-checkbox>
                            </v-col>
                            <v-col lg="4">
                                <v-checkbox
                                    label="Primary Medical Team"
                                ></v-checkbox>
                            </v-col>
                            <v-col lg="4">
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
    <primary-supplier :template_dialog="template_dialog" @close-dialog="closeSupplierDialog" @select-supplier="handleSelectingSupplier" />
</template>

<script setup>
import PrimarySupplier from "./sub-forms/PrimarySupplier.vue";

const props = defineProps({
    currentTabValue: {
        type: String,
        default: () => "2",
    },
})

const fixed_asset = ref(true)

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

const openSupplierDialog = () => {
    template_dialog.value = true
}

const closeSupplierDialog = () => {
    template_dialog.value = false
}

const handleSelectingSupplier = () => {
    alert('Supplier selected')
}

</script>

<style>
</style>