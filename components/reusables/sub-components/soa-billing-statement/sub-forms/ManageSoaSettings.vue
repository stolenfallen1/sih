<template>
    <v-dialog :model-value="open_manage_soa_settings" scrollable @update:model-value="closeDialog" max-width="900px">
        <form @submit.prevent="onSubmit">
            <v-card rounded="lg">
                <v-toolbar density="compact" color="#107bac" hide-details>
                    <v-toolbar-title>Manage SOA Settings {{ selectedRowDetails.id }}</v-toolbar-title>
                    <v-btn color="white" @click="closeDialog">
                        <v-icon>mdi-close</v-icon>
                    </v-btn>
                </v-toolbar>
                <v-card-text>
                    <v-row>
                        <v-col cols="12">
                            <v-card>
                                <v-toolbar density="compact" hide-details>
                                    <v-toolbar-title class="toolbar-title">Report Summary List</v-toolbar-title>
                                </v-toolbar>
                                <v-card-text>
                                    <h4 class="mb-2">Print Summary</h4>
                                    <v-divider class="mb-2"></v-divider>
                                    <v-row>
                                        <v-col cols="4">
                                            <v-checkbox @update:model-value="handleChangeSettings" v-model="settings.summarized_by_department" label="Summarized by Department" hide-details density="compact"></v-checkbox>
                                            <v-checkbox @update:model-value="handleChangeSettings" v-model="settings.summarized_by_department_for_package_deals" label="Summarized by Department for Package Details" hide-details density="compact"></v-checkbox>
                                            <v-checkbox @update:model-value="handleChangeSettings" v-model="settings.summarized_by_department_for_medical_packages" label="Summarized by Department for Medical Packages" hide-details density="compact"></v-checkbox>
                                            <v-checkbox @update:model-value="handleChangeSettings" v-model="settings.summarized_by_billing_category_1" label="Summarized by Billing Category 1" hide-details density="compact"></v-checkbox>
                                            <v-checkbox @update:model-value="handleChangeSettings" v-model="settings.summarized_by_billing_category_2" label="Summarized by Billing Category 2" hide-details density="compact"></v-checkbox>
                                            <v-checkbox @update:model-value="handleChangeSettings" v-model="settings.summarized_by_billing_category_3" label="Summarized by Billing Category 3" hide-details density="compact"></v-checkbox>
                                        </v-col>
                                        <v-col cols="4">
                                            <v-checkbox @update:model-value="handleChangeSettings" v-model="settings.summarized_by_billing_category_4" label="Summarized by Billing Category 4" hide-details density="compact"></v-checkbox>
                                            <v-checkbox @update:model-value="handleChangeSettings" v-model="settings.summarized_by_billing_category_4_with_discounts" label="Summarized by Billing Category 4 with Discounts" hide-details density="compact"></v-checkbox>
                                            <v-checkbox @update:model-value="handleChangeSettings" v-model="settings.summarized_by_billing_category_5" label="Summarized by Billing Category 5" hide-details density="compact"></v-checkbox>
                                            <v-checkbox @update:model-value="handleChangeSettings" v-model="settings.summarized_by_billing_category_6" label="Summarized by Billing Category 6" hide-details density="compact"></v-checkbox>
                                            <v-checkbox @update:model-value="handleChangeSettings" v-model="settings.summarized_by_billing_category_7_for_nonphic" label="Summarized by Billing Category 7 for Non-PHIC" hide-details density="compact"></v-checkbox>
                                            <v-checkbox @update:model-value="handleChangeSettings" v-model="settings.summarized_by_billing_category_8_for_phicnonphic" label="Summarized by Billing Category 8 for PHIC / Non-PHIC" hide-details density="compact"></v-checkbox>
                                        </v-col>
                                        <v-col cols="4">
                                            <v-checkbox @update:model-value="handleChangeSettings" v-model="settings.summarized_by_billing_category_9_from_hmo" label="Summarized by Billing Category 9 for HMO" hide-details density="compact"></v-checkbox>
                                            <v-checkbox @update:model-value="handleChangeSettings" v-model="settings.modified_soa_with_medical_package_per_cost_center" label="Modified SOA with Medical Package Per Cost Center" hide-details density="compact"></v-checkbox>
                                            <v-checkbox @update:model-value="handleChangeSettings" v-model="settings.modified_soa_with_medical_package_and_excess" label="Modified SOA with Medical Package and Excess" hide-details density="compact"></v-checkbox>
                                            <v-checkbox label="Tax Invoice" hide-details density="compact"></v-checkbox>
                                            <v-checkbox label="Summary for Pay or Service" hide-details density="compact"></v-checkbox>
                                        </v-col>
                                    </v-row>
                                </v-card-text>
                            </v-card>
                            <v-card class="mt-4">
                                <v-toolbar density="compact" hide-details>
                                    <v-toolbar-title class="toolbar-title">Report Details List</v-toolbar-title>
                                </v-toolbar>
                                <v-card-text>
                                    <h4 class="mb-2">Print Details</h4>
                                    <v-divider class="mb-2"></v-divider>
                                    <v-row>
                                        <v-col cols="6">
                                            <v-checkbox @update:model-value="handleChangeSettings" v-model="settings.transaction_document" label="Group by Transaction Document" hide-details density="compact"></v-checkbox>
                                            <v-checkbox @update:model-value="handleChangeSettings" v-model="settings.department" label="Group by Department" hide-details density="compact"></v-checkbox>
                                            <v-checkbox @update:model-value="handleChangeSettings" v-model="settings.phic_category" label="Group by PHIC Category" hide-details density="compact"></v-checkbox>
                                        </v-col>
                                        <v-col cols="6">
                                            <v-checkbox @update:model-value="handleChangeSettings" v-model="settings.transaction_date" label="Group by Transaction Date" hide-details density="compact"></v-checkbox>
                                            <v-checkbox @update:model-value="handleChangeSettings" v-model="settings.billing_category" label="Group by Billing Category" hide-details density="compact"></v-checkbox>
                                            <v-checkbox @update:model-value="handleChangeSettings" v-model="settings.print_category" label="Group by Bill Print Category" hide-details density="compact"></v-checkbox>
                                        </v-col>
                                    </v-row>
                                </v-card-text>
                            </v-card>
                        </v-col>
                    </v-row>
                </v-card-text>
                <v-divider></v-divider>
                <v-card-actions>
                    <v-btn color="blue-darken-1 border border-info" @click="closeDialog"> Close </v-btn>
                    <v-spacer></v-spacer>
                    <v-btn class="bg-primary text-white" type="submit">Save</v-btn>
                </v-card-actions>
            </v-card>
        </form>
    </v-dialog>
</template>

<script setup>
const props = defineProps({
    open_manage_soa_settings: {
        type: Boolean,
        default: () => false,
        required: true
    },
    settings: {
        type: Object,
        default: () => ({})
    }
})

const emits = defineEmits(['close-dialog', 'handle-submit'])

const handleChangeSettings = () => {
    props.settings.summarized_by_department = props.settings.summarized_by_department
    props.settings.summarized_by_department_for_package_deals = props.settings.summarized_by_department_for_package_deals
    props.settings.summarized_by_department_for_medical_packages = props.settings.summarized_by_department_for_medical_packages
    props.settings.summarized_by_billing_category_1 = props.settings.summarized_by_billing_category_1
    props.settings.summarized_by_billing_category_2 = props.settings.summarized_by_billing_category_2
    props.settings.summarized_by_billing_category_3 = props.settings.summarized_by_billing_category_3
    props.settings.summarized_by_billing_category_4 = props.settings.summarized_by_billing_category_4
    props.settings.summarized_by_billing_category_4_with_discounts = props.settings.summarized_by_billing_category_4_with_discounts
    props.settings.summarized_by_billing_category_5 = props.settings.summarized_by_billing_category_5
    props.settings.summarized_by_billing_category_6 = props.settings.summarized_by_billing_category_6
    props.settings.summarized_by_billing_category_7_for_nonphic = props.settings.summarized_by_billing_category_7_for_nonphic
    props.settings.summarized_by_billing_category_8_for_phicnonphic = props.settings.summarized_by_billing_category_8_for_phicnonphic
    props.settings.summarized_by_billing_category_9_from_hmo = props.settings.summarized_by_billing_category_9_from_hmo
    props.settings.modified_soa_with_medical_package_per_cost_center = props.settings.modified_soa_with_medical_package_per_cost_center
    props.settings.modified_soa_with_medical_package_and_excess = props.settings.modified_soa_with_medical_package_and_excess
}

const { selectedRowDetails } = storeToRefs(useSubcomponentSelectedRowDetailsStore()); 

const closeDialog = () => {
    emits('close-dialog')
}

const onSubmit = () => {
    emits('handle-submit')
}
</script>

<style scoped>
.toolbar-title {
    font-size: 16px; 
    font-style: italic; 
    text-align: center;
}
</style>