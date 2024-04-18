<template>
    <v-dialog :model-value="open_generate_report" scrollable @update:model-value="closeDialog" max-width="1120px">
        <form @submit.prevent="onSubmit">
            <v-card rounded="lg">
                <v-toolbar density="compact" color="#6984ff" hide-details>
                    <v-toolbar-title>Statement of Account for {{ selectedRowDetails.id }}</v-toolbar-title>
                    <v-btn color="white" @click="closeDialog">
                        <v-icon>mdi-close</v-icon>
                    </v-btn>
                </v-toolbar>
                <v-card-text>
                    <v-row>
                        <v-col cols="12">
                            <v-toolbar density="compact" hide-details>
                                <v-toolbar-title class="toolbar-title">Report Summary List</v-toolbar-title>
                            </v-toolbar>
                            <v-card>
                                <v-card-text>
                                    <div style="display: flex;">
                                        <v-checkbox label="Print Summary" v-model="payload.print_summary" density="compact" hide-details></v-checkbox>
                                        <v-btn hide-details @click.prevent="openManageSoaSettings">Manage SOA Settings</v-btn>
                                    </div>
                                    <v-divider></v-divider>
                                    <v-row class="my-2">
                                        <v-col cols="4">
                                            <v-radio v-if="settings.summarized_by_department" label="Summarized by Department" v-model="payload.summarized_by_department" hide-details density="compact"></v-radio>
                                            <v-radio v-if="settings.summarized_by_department_for_package_deals" label="Summarized by Department for Package Deals" v-model="payload.summarized_by_department_for_package_deals" hide-details density="compact"></v-radio>
                                            <v-radio v-if="settings.summarized_by_department_for_medical_packages" label="Summarized by Department for Medical Packages" v-model="payload.summarized_by_department_for_medical_packages" hide-details density="compact"></v-radio>
                                            <v-radio v-if="settings.summarized_by_billing_category_1" label="Summarized by Billing Category 1" v-model="payload.summarized_by_billing_category_1" hide-details density="compact"></v-radio>
                                            <v-radio v-if="settings.summarized_by_billing_category_2" label="Summarized by Billing Category 2" v-model="payload.summarized_by_billing_category_2"  hide-details density="compact"></v-radio>
                                            <v-radio v-if="settings.summarized_by_billing_category_3" label="Summarized by Billing Category 3" v-model="payload.summarized_by_billing_category_3" hide-details density="compact"></v-radio>
                                        </v-col>
                                        <v-col cols="4">
                                            <v-radio v-if="settings.summarized_by_billing_category_4" label="Summarized by Billing Category 4" v-model="payload.summarized_by_billing_category_4" hide-details density="compact"></v-radio>
                                            <v-radio v-if="settings.summarized_by_billing_category_4_with_discounts" label="Summarized by Billing Category 4 with Discounts" v-model="payload.summarized_by_billing_category_4_with_discounts" hide-details density="compact"></v-radio>
                                            <v-radio v-if="settings.summarized_by_billing_category_5" label="Summarized by Billing Category 5" v-model="payload.summarized_by_billing_category_5" hide-details density="compact"></v-radio>
                                            <v-radio v-if="settings.summarized_by_billing_category_6" label="Summarized by Billing Category 6" v-model="payload.summarized_by_billing_category_6" hide-details density="compact"></v-radio>
                                            <v-radio v-if="settings.summarized_by_billing_category_7_for_nonphic" label="Summarized by Billing Category 7 for Non-PHIC" v-model="payload.summarized_by_billing_category_7_for_nonphic"  hide-details density="compact"></v-radio>
                                            <v-radio v-if="settings.summarized_by_billing_category_8_for_phicnonphic" label="Summarized by Billing Category 8 for PHIC / Non-PHIC" v-model="payload.summarized_by_billing_category_8_for_phicnonphic" hide-details density="compact"></v-radio>
                                        </v-col>
                                        <v-col cols="4">
                                            <v-radio v-if="settings.summarized_by_billing_category_9_from_hmo" label="Summarized by Billing Category 9 from HMO" v-model="payload.summarized_by_billing_category_9_from_hmo" hide-details density="compact"></v-radio>
                                            <v-radio  v-if="settings.modified_soa_with_medical_package_per_cost_center" label="Modified SOA with Medical Package Per Cost Center" v-model="payload.modified_soa_with_medical_package_per_cost_center" hide-details density="compact"></v-radio>
                                            <v-radio v-if="settings.modified_soa_with_medical_package_and_excess" label="Modified SOA with Medical Package and Excess" v-model="payload.modified_soa_with_medical_package_and_excess" hide-details density="compact"></v-radio>
                                        </v-col>
                                    </v-row>
                                </v-card-text>
                            </v-card>
                        </v-col>
                        <v-col cols="12">
                            <v-card>
                                <v-toolbar density="compact" hide-details>
                                    <v-toolbar-title class="toolbar-title">Filter Preferences and Options</v-toolbar-title>
                                </v-toolbar>
                                <v-card-text>
                                    <v-row>
                                        <v-col cols="6">
                                            <v-checkbox label="Payment / Settlement Details" v-model="payload.payment_details" hide-details density="compact"></v-checkbox>
                                            <v-checkbox label="Other Account Information" v-model="payload.other_account_information" hide-details density="compact"></v-checkbox>
                                            <v-checkbox label="Separate Professional Fees from Hospital Bill" v-model="payload.separate_professional_fees_from_hosp_bill" hide-details density="compact"></v-checkbox>
                                            <v-checkbox label="Exclude Promisorry Note from Top Page" v-model="payload.exclude_promissory_note_from_top_page" hide-details density="compact"></v-checkbox>
                                            <v-checkbox label="Exclude Guaranteed Accounts from Top Page" v-model="payload.exclude_guaranteed_accounts_from_top_page" hide-details density="compact"></v-checkbox>
                                            <v-checkbox label="Print with Hospital Membership % Column" v-model="payload.print_with_hospital_membership" hide-details density="compact"></v-checkbox>
                                            <v-checkbox label="Print PHIC, Guaranteed and Discount by Column" v-model="payload.print_phic_guaranteed_discount_by_column" hide-details density="compact"></v-checkbox>
                                        </v-col>
                                        <v-col cols="6">
                                            <v-checkbox label="Show Gross Amount" v-model="payload.show_gross_amount" hide-details density="compact"></v-checkbox>
                                            <v-checkbox label="Show Payment Details" v-model="payload.show_payment_details" hide-details density="compact"></v-checkbox>
                                            <v-checkbox label="Net of Credit Notes" v-model="payload.net_of_credit_notes" hide-details density="compact"></v-checkbox>
                                        </v-col>
                                    </v-row>
                                </v-card-text>
                            </v-card>
                        </v-col>
                        <v-col cols="12">
                            <v-row>
                                <v-col cols="5">
                                    <v-card>
                                        <v-toolbar density="compact" hide-details>
                                            <v-toolbar-title class="toolbar-title">Report List Details</v-toolbar-title>
                                        </v-toolbar>
                                        <v-card-text>
                                            <v-row>
                                                <v-col cols="6">
                                                    <v-checkbox label="Print Details" v-model="payload.print_details" density="compact" hide-details></v-checkbox>
                                                </v-col>
                                                <v-col cols="6">
                                                    <v-checkbox label="Date Range" v-model="payload.date_range" density="compact" hide-details></v-checkbox>
                                                </v-col>
                                                <v-col cols="6">
                                                    <v-text-field type="date" label="From" v-model="payload.date_range_from" variant="outlined" density="compact" hide-details></v-text-field>
                                                </v-col>
                                                <v-col cols="6">
                                                    <v-text-field type="date" label="To" v-model="payload.date_range_to" variant="outlined" density="compact" hide-details></v-text-field>
                                                </v-col>
                                            </v-row>
                                        </v-card-text>
                                    </v-card>
                                </v-col>
                                <v-col cols="7">
                                    <v-card>
                                        <v-toolbar density="compact" hide-details>
                                            <v-toolbar-title class="toolbar-title">Grouped by</v-toolbar-title>
                                        </v-toolbar>
                                        <v-card-text>
                                            <v-row>
                                                <v-col cols="4">
                                                    <v-radio v-if="settings.transaction_document" label="Transaction Document" v-model="payload.transaction_document" hide-details density="compact"></v-radio>
                                                    <v-radio v-if="settings.department" label="Department" v-model="payload.department" hide-details density="compact"></v-radio>
                                                </v-col>
                                                <v-col cols="4">
                                                    <v-radio v-if="settings.phic_category" label="PHIC Category" v-model="payload.phic_category" hide-details density="compact"></v-radio>
                                                    <v-radio v-if="settings.transaction_date" label="Transaction Date" v-model="payload.transaction_date" hide-details density="compact"></v-radio>
                                                </v-col>
                                                <v-col cols="4">
                                                    <v-radio v-if="settings.billing_category" label="Billing Category" v-model="payload.billing_category" hide-details density="compact"></v-radio>
                                                    <v-radio v-if="settings.print_category" label="Bill Print Category" v-model="payload.print_category" hide-details density="compact"></v-radio>
                                                </v-col>
                                                <v-col cols="12">
                                                    <v-radio label="Summarized per Item" v-model="payload.summarized_per_item" hide-details density="compact" class="mr-2"></v-radio>
                                                    <v-radio label="Detailed per Item" v-model="payload.detailed_per_item" hide-details density="compact"></v-radio>
                                                </v-col>
                                            </v-row>
                                        </v-card-text>
                                    </v-card>
                                </v-col>
                            </v-row>
                        </v-col>
                        <v-col cols="12">
                            <v-row>
                                <v-col cols="5">
                                    <v-card>
                                        <v-toolbar density="compact" hide-details>
                                            <v-toolbar-title class="toolbar-title">Inclusions</v-toolbar-title>
                                        </v-toolbar>
                                        <v-card-text>
                                            <v-row>
                                                <v-col cols="12">
                                                    <v-radio label="All Debits and Credits" v-model="payload.debits_and_credits" hide-details density="compact"></v-radio>
                                                </v-col>
                                            </v-row>
                                        </v-card-text>
                                    </v-card>
                                </v-col>
                                <v-col cols="7">
                                    <v-card>
                                        <v-toolbar density="compact" hide-details>
                                            <v-toolbar-title class="toolbar-title">Copy Furnish</v-toolbar-title>
                                        </v-toolbar>
                                        <v-card-text>
                                            <v-row>
                                                <v-col cols="12">
                                                    <v-radio-group inline>
                                                        <v-radio label="Accounting Copy" v-model="payload.accounting_copy" value="0" hide-details density="compact" class="mr-2"></v-radio>
                                                        <v-radio label="Patient Copy" v-model="payload.patient_copy" value="1" hide-details density="compact"></v-radio>
                                                    </v-radio-group>
                                                </v-col>
                                            </v-row>
                                        </v-card-text>
                                    </v-card>
                                </v-col>
                            </v-row>
                        </v-col>
                        <v-col cols="12">
                            <v-row>
                                <v-col cols="5">
                                    <v-card>
                                        <v-toolbar density="compact" hide-details>
                                            <v-toolbar-title class="toolbar-title">Remarks</v-toolbar-title>
                                        </v-toolbar>
                                        <v-card-text>
                                            <v-row>
                                                <v-col cols="12">
                                                    <v-textarea variant="outlined" label="Remarks" v-model="payload.remarks" density="compact" hide-details></v-textarea>
                                                </v-col>
                                            </v-row>
                                        </v-card-text>
                                    </v-card>
                                </v-col>
                                <v-col cols="7">
                                    <v-card>
                                        <v-toolbar density="compact" hide-details>
                                            <v-toolbar-title class="toolbar-title">Other Information</v-toolbar-title>
                                        </v-toolbar>
                                        <v-card-text>
                                            <v-row>
                                                <v-col cols="12">
                                                    <v-checkbox label="Tag as Final Bill" density="compact" hide-details></v-checkbox>
                                                </v-col>
                                                <v-col cols="12">
                                                    <v-text-field 
                                                        label="Verified By" 
                                                        v-model="payload.verified_by"
                                                        variant="outlined" 
                                                        density="compact" 
                                                        hide-details
                                                    ></v-text-field>
                                                </v-col>
                                                <v-col cols="6">
                                                    <v-text-field 
                                                        label="Bill No. (Pay)" 
                                                        v-model="payload.bill_no_pay"
                                                        type="number"
                                                        variant="outlined" 
                                                        density="compact" 
                                                        hide-details
                                                    ></v-text-field>
                                                </v-col>
                                                <v-col cols="6">
                                                    <v-text-field 
                                                        label="Bill No. (Service)" 
                                                        v-model="payload.bill_no_service"
                                                        type="number"
                                                        variant="outlined" 
                                                        density="compact" 
                                                        hide-details
                                                    ></v-text-field>
                                                </v-col>
                                            </v-row>
                                        </v-card-text>
                                    </v-card>
                                </v-col>
                            </v-row>
                        </v-col>
                    </v-row>
                </v-card-text>
                <v-divider></v-divider>
                <v-card-actions>
                    <v-btn color="blue-darken-1 border border-info" @click="closeDialog"> Close </v-btn>
                    <v-spacer></v-spacer>
                    <v-btn class="bg-info text-white" type="submit">Preview</v-btn>
                    <v-btn class="bg-primary text-white" type="submit">Print</v-btn>
                </v-card-actions>
            </v-card>
        </form>
    </v-dialog>
    <opd-manage-soa-settings :settings="settings" :open_manage_soa_settings="open_manage_soa_settings" @close-dialog="closeManageSoaSettings" @handle-submit="handleManageSoaSettings" />
</template>

<script setup>
import OpdManageSoaSettings from './OpdManageSoaSettings.vue';

const props = defineProps({
    open_generate_report: {
        type: Boolean,
        default: () => false,
        required: true,
    },
})

const { selectedRowDetails } = storeToRefs(useSubcomponentSelectedRowDetailsStore()); 
const open_manage_soa_settings = ref(false);
const settings = ref({
    // Print Summary
    summarized_by_department: true,
    summarized_by_department_for_package_deals: true,
    summarized_by_department_for_medical_packages: true,
    summarized_by_billing_category_1: true,
    summarized_by_billing_category_2: true,
    summarized_by_billing_category_3: true,
    summarized_by_billing_category_4: true,
    summarized_by_billing_category_4_with_discounts: true,
    summarized_by_billing_category_5: true,
    summarized_by_billing_category_6: true,
    summarized_by_billing_category_7_for_nonphic: true,
    summarized_by_billing_category_8_for_phicnonphic: true,
    summarized_by_billing_category_9_from_hmo: true,
    modified_soa_with_medical_package_per_cost_center: true,
    modified_soa_with_medical_package_and_excess: true,
    // Print Details
    transaction_document: true,
    department: true,
    phic_category: true,
    transaction_date: true,
    billing_category: true,
    print_category: true,
});
const payload = ref({});

const emits = defineEmits(['close-dialog', 'handle-submit']);

const onSubmit = () => {
    emits('handle-submit');
}

const openManageSoaSettings = () => {
    open_manage_soa_settings.value = true;
}

const handleManageSoaSettings = () => {
    alert('Manage SOA Settings');
    open_manage_soa_settings.value = false;
}

const closeManageSoaSettings = () => {
    open_manage_soa_settings.value = false;
}

const closeDialog = () => {
    emits('close-dialog');
}
</script>

<style scoped>
.toolbar-title {
    font-size: 16px; 
    font-style: italic; 
    text-align: center;
}
</style>