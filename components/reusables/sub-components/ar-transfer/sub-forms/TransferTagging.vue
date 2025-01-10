<template>
    <v-dialog :model-value="open_tag_transactions" rounded="lg" scrollable @update:model-value="closeDialog" max-width="1120px">
        <form @submit.prevent="onSubmit">
            <v-card>
                <v-toolbar density="compact" color="#107bac" hide-details>
                    <v-toolbar-title>Transfer Tagging {{ selectedRowDetails.id }}</v-toolbar-title>
                    <v-btn color="white" @click="closeDialog">
                        <v-icon>mdi-close</v-icon>
                    </v-btn>
                </v-toolbar>
                <v-card-text>
                    <v-row>
                        <v-col cols="4">
                            <v-card elevation="4" height="32vh">
                                <v-toolbar density="compact" hide-details>
                                    <v-toolbar-title class="toolbar-title">Coverage Options</v-toolbar-title>
                                </v-toolbar>
                                <v-card-text>
                                    <v-row>
                                        <v-col cols="12">
                                            <v-autocomplete
                                                label="Classification"
                                                variant="outlined"
                                                density="compact"
                                                hide-details
                                                :items=[]
                                                clearable
                                            ></v-autocomplete>
                                        </v-col>
                                        <v-col cols="6" class="form-col">
                                            <v-checkbox label="Net of Discounts" density="compact" hide-details></v-checkbox>
                                        </v-col>
                                        <v-col cols="6" class="form-col">
                                            <v-checkbox label="Net of Philhealth" density="compact" hide-details></v-checkbox>
                                        </v-col>
                                        <v-col cols="6" class="form-col">
                                            <v-checkbox label="Net of Payment" density="compact" hide-details></v-checkbox>
                                        </v-col>
                                        <v-col cols="6" class="form-col">
                                            <v-checkbox label="Net of Guaranted Amount" density="compact" hide-details></v-checkbox>
                                        </v-col>
                                    </v-row>
                                </v-card-text>
                            </v-card>
                        </v-col>
                        <v-col cols="4">
                            <v-card elevation="4" height="32vh">
                                <v-toolbar density="compact" hide-details>
                                    <v-toolbar-title class="toolbar-title">Apply Guaranted Fixed Amount</v-toolbar-title>
                                </v-toolbar>
                                <v-card-text>
                                    <v-row>
                                        <v-col cols="7">
                                            <v-text-field
                                                label="Hospital Bill"
                                                variant="outlined"
                                                density="compact"
                                                hide-details
                                            ></v-text-field>
                                        </v-col>
                                        <v-col cols="5">
                                            <v-btn>Distribute</v-btn>
                                        </v-col>
                                        <v-col cols="12" class="form-col">
                                            <v-text-field
                                                label="Professional Fee"
                                                variant="outlined"
                                                density="compact"
                                                hide-details
                                                readonly
                                            ></v-text-field>
                                        </v-col>
                                        <v-col cols="12" class="form-col">
                                            <v-text-field
                                                label="Total Amount"
                                                variant="outlined"
                                                density="compact"
                                                hide-details
                                                readonly
                                            ></v-text-field>
                                        </v-col>
                                    </v-row>
                                </v-card-text>
                            </v-card>
                        </v-col>
                        <v-col cols="4">
                            <v-card elevation="4" height="32vh">
                                <v-toolbar density="compact" hide-details>
                                    <v-toolbar-title class="toolbar-title">Statement of Accounts Balance</v-toolbar-title>
                                </v-toolbar>
                                <v-card-text>
                                    <v-row>
                                        <v-col cols="12">
                                            <v-text-field
                                                label="Hospital Bill"
                                                variant="outlined"
                                                density="compact"
                                                hide-details
                                                readonly
                                            ></v-text-field>
                                        </v-col>
                                        <v-col cols="12" class="form-col">
                                            <v-text-field
                                                label="Professional Fee"
                                                variant="outlined"
                                                density="compact"
                                                hide-details
                                                readonly
                                            ></v-text-field>
                                        </v-col>
                                        <v-col cols="12" class="form-col">
                                            <v-text-field
                                                label="Unapplied Deposit"
                                                variant="outlined"
                                                density="compact"
                                                hide-details
                                                readonly
                                            ></v-text-field>
                                        </v-col>
                                        <v-col cols="12" class="form-col">
                                            <v-text-field
                                                label="Balance"
                                                variant="outlined"
                                                density="compact"
                                                hide-details
                                                readonly
                                            ></v-text-field>
                                        </v-col>
                                    </v-row>
                                </v-card-text>
                            </v-card>
                        </v-col>
                    </v-row>
                    <v-card elevation="4" class="mt-4">
                        <v-tabs
                            v-model="tab"
                            color="primary"
                        >
                            <v-tab value="0"><v-icon start>mdi-form-select</v-icon> Item and Services </v-tab>
                            <v-tab value="1"><v-icon start>mdi-cash</v-icon> Professional Fees </v-tab>
                            <v-tab value="2"><v-icon start>mdi-hospital-building</v-icon> Miscellaneous </v-tab>
                        </v-tabs>
                        <v-card-text>
                            <v-window v-model="tab">
                                <!-- <v-window-item v-for="(tab_items, index) in headers" :key="index" class="pa-1">
                                    <v-row>
                                        <v-col cols="8" style="display: flex; gap: 20px; text-decoration: underline;">
                                            <button @click.prevent="showColumn">Show Credit Details</button>
                                            <button @click.prevent="hideColumn">Hide Credit Details</button>
                                        </v-col>
                                        <v-col cols="4">
                                            <v-text-field
                                                :label="tab === '0' ? 'Item and Services Balance' : tab === '1' ? 'Professional Fees Balance' : 'Miscellaneous Balance'"
                                                variant="outlined"
                                                density="compact"
                                                hide-details
                                            ></v-text-field>
                                        </v-col>
                                    </v-row>
                                    <v-row class="mt-1">
                                        <v-col cols="12">
                                            <v-table density="compact" height="60vh">
                                                <thead>
                                                    <tr>
                                                        <th 
                                                            v-for="header in tab_items" 
                                                            :key="header.value" 
                                                            v-if="show_column"
                                                    >{{ header.text }}</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <template>
                                                        <tr class="cursor-pointer"></tr>
                                                    </template>
                                                </tbody>
                                                <v-divider></v-divider>
                                            </v-table>
                                        </v-col>
                                    </v-row>
                                </v-window-item> -->
                                <v-window-item class="pa-1">
                                    <v-row>
                                        <v-col cols="8" style="display: flex; gap: 20px; text-decoration: underline;">
                                            <button @click.prevent="showColumn">Show Credit Details</button>
                                            <button @click.prevent="hideColumn">Hide Credit Details</button>
                                        </v-col>
                                        <v-col cols="4">
                                            <v-text-field
                                                :label="tab === '0' ? 'Item and Services Balance' : tab === '1' ? 'Professional Fees Balance' : 'Miscellaneous Balance'"
                                                variant="outlined"
                                                density="compact"
                                                hide-details
                                            ></v-text-field>
                                        </v-col>
                                    </v-row>
                                    <v-row class="mt-1">
                                        <v-col cols="12">
                                            <v-table density="compact" height="60vh">
                                                <thead>
                                                    <tr>
                                                        <th width="4"></th>
                                                        <th>Document Date</th>
                                                        <th>Document No</th>
                                                        <th>Item Description</th>
                                                        <th>Debit Amount</th>
                                                        <th>Credit Amount</th>
                                                        <th>Allowed Amount</th>
                                                        <th>For Guarantee Amount</th>
                                                        <th v-if="show_column">Discount Amount</th>
                                                        <th v-if="show_column">Credit Note Amount</th>
                                                        <th v-if="show_column">Guaranted Amount</th>
                                                        <th v-if="show_column">Adjustment Amount</th>
                                                        <th v-if="show_column">PHIC Amount</th>
                                                        <th v-if="show_column">O.R Amount</th>
                                                        <th>Qty</th>
                                                        <th>Item Price</th>
                                                        <th>Item ID</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <!-- <template> -->
                                                        <tr class="cursor-pointer">
                                                            <!-- contents -->
                                                        </tr>
                                                    <!-- </template> -->
                                                </tbody>
                                                <v-divider></v-divider>
                                            </v-table>
                                        </v-col>
                                    </v-row>
                                </v-window-item>
                                <v-window-item class="pa-1">
                                    <v-row>
                                        <v-col cols="8" style="display: flex; gap: 20px; text-decoration: underline;">
                                            <button @click.prevent="showColumn">Show Credit Details</button>
                                            <button @click.prevent="hideColumn">Hide Credit Details</button>
                                        </v-col>
                                        <v-col cols="4">
                                            <v-text-field
                                                :label="tab === '0' ? 'Item and Services Balance' : tab === '1' ? 'Professional Fees Balance' : 'Miscellaneous Balance'"
                                                variant="outlined"
                                                density="compact"
                                                hide-details
                                            ></v-text-field>
                                        </v-col>
                                    </v-row>
                                    <v-row class="mt-1">
                                        <v-col cols="12">
                                            <v-table density="compact" height="60vh">
                                                <thead>
                                                    <tr>
                                                        <th width="4"></th>
                                                        <th>Reference Date</th>
                                                        <th>Consultant Name</th>
                                                        <th>PF Amount</th>
                                                        <th>Instrument Fee</th>
                                                        <th>Other Amount</th>
                                                        <th>SC Amount</th>
                                                        <th v-if="show_column">Discount Amount</th>
                                                        <th>Debit Amount</th>
                                                        <th>Credit Amount</th>
                                                        <th>Allowed Amount</th>
                                                        <th>For Guarantee Amount</th>
                                                        <th v-if="show_column">Adjustment Amount</th>
                                                        <th v-if="show_column">Guaranted Amount</th>
                                                        <th>PHIC Amount</th>
                                                        <th v-if="show_column">PHIC Account</th>
                                                        <th v-if="show_column">O.R Amount</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <!-- <template> -->
                                                        <tr class="cursor-pointer">
                                                            <!-- contents -->
                                                        </tr>
                                                    <!-- </template> -->
                                                </tbody>
                                                <v-divider></v-divider>
                                            </v-table>
                                        </v-col>
                                    </v-row>
                                </v-window-item>
                                <v-window-item  class="pa-1">
                                    <v-row>
                                        <v-col cols="8" style="display: flex; gap: 20px; text-decoration: underline;">
                                            <button @click.prevent="showColumn">Show Credit Details</button>
                                            <button @click.prevent="hideColumn">Hide Credit Details</button>
                                        </v-col>
                                        <v-col cols="4">
                                            <v-text-field
                                                :label="tab === '0' ? 'Item and Services Balance' : tab === '1' ? 'Professional Fees Balance' : 'Miscellaneous Balance'"
                                                variant="outlined"
                                                density="compact"
                                                hide-details
                                            ></v-text-field>
                                        </v-col>
                                    </v-row>
                                    <v-row class="mt-1">
                                        <v-col cols="12">
                                            <v-table density="compact" height="60vh">
                                                <thead>
                                                    <tr>
                                                        <th width="4"></th>
                                                        <th>Reference Date</th>
                                                        <th>Reference No</th>
                                                        <th>Description</th>
                                                        <th>Debit Amount</th>
                                                        <th>Credit Amount</th>
                                                        <th>Allowed Amount</th>
                                                        <th>For Guarantee Amount</th>
                                                        <th v-if="show_column">Discount Amount</th>
                                                        <th v-if="show_column">Adjustment Amount</th>
                                                        <th v-if="show_column">Guaranted Amount</th>
                                                        <th v-if="show_column">O.R Amount</th>
                                                        <th v-if="show_column">PHIC Amount</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <!-- <template> -->
                                                        <tr class="cursor-pointer">
                                                            <!-- contents -->
                                                        </tr>
                                                    <!-- </template> -->
                                                </tbody>
                                                <v-divider></v-divider>
                                            </v-table>
                                        </v-col>
                                    </v-row>
                                </v-window-item>
                            </v-window>
                        </v-card-text>
                    </v-card>
                </v-card-text>
                <v-card-actions>
                    <v-btn color="blue-darken-1 border border-info" @click="closeDialog"> Close </v-btn>
                    <v-spacer></v-spacer>
                    <v-btn class="bg-primary text-white" type="submit">Post</v-btn>
                </v-card-actions>
            </v-card>
        </form>
    </v-dialog>
</template>

<script setup>
const props = defineProps({
    open_tag_transactions: {
        type: Boolean,
        default: () => false,
        required: true,
    },
});

const { selectedRowDetails } = storeToRefs(useSubcomponentSelectedRowDetailsStore()); 
const emits = defineEmits(['close-dialog']);

let tab = ref('0');
const show_column = ref(false);
// const headers = ref({
//     items: [
//         { text: 'Document Date', value: 'document_date' },
//         { text: 'Document No', value: 'document_no' },
//         { text: 'Item Description', value: 'item_description' },
//         { text: 'Debit Amount', value: 'debit_amount' },
//         { text: 'Credit Amount', value: 'credit_amount' },
//         { text: 'Allowed Amount', value: 'allowed_amount' },
//         { text: 'For Guarantee Amount', value: 'for_guarantee_amount' },
//         { text: 'Discount Amount', value: 'discount_amount' },
//         { text: 'Credit Note Amount', value: 'credit_note_amount' },
//         { text: 'Guaranted Amount', value: 'guaranted_amount' },
//         { text: 'Adjustment Amount', value: 'adjustment_amount' },
//         { text: 'PHIC Amount', value: 'phic_amount' },
//         { text: 'O.R Amount', value: 'or_amount' },
//         { text: 'Qty', value: 'qty' },
//         { text: 'Item Price', value: 'item_price' },
//         { text: 'Item ID', value: 'item_id' },
//     ],
//     professional_fees: [
//         { text: 'Reference Date', value: 'reference_date' },
//         { text: 'Consultant Name', value: 'consultant_name' },
//         { text: 'PF Amount', value: 'pf_amount' },
//         { text: 'Instrument Fee', value: 'instrument_fee' },
//         { text: 'Other Amount', value: 'other_amount' },
//         { text: 'SC Amount', value: 'sc_amount' },
//         { text: 'Discount Amount', value: 'discount_amount' },
//         { text: 'Debit Amount', value: 'debit_amount' },
//         { text: 'Credit Amount', value: 'credit_amount' },
//         { text: 'Allowed Amount', value: 'allowed_amount' },
//         { text: 'For Guarantee Amount', value: 'for_guarantee_amount' },
//         { text: 'Adjustment Amount', value: 'adjustment_amount' },
//         { text: 'Guaranted Amount', value: 'guaranted_amount' },
//         { text: 'PHIC Amount', value: 'phic_amount' },
//         { text: 'PHIC Account', value: 'phic_account' },
//         { text: 'O.R Amount', value: 'or_amount' },
//     ],
//     miscellaneous: [
//         { text: 'Reference Date', value: 'reference_date' },
//         { text: 'Reference No', value: 'reference_no' },
//         { text: 'Description', value: 'description' },
//         { text: 'Debit Amount', value: 'debit_amount' },
//         { text: 'Credit Amount', value: 'credit_amount' },
//         { text: 'Allowed Amount', value: 'allowed_amount' },
//         { text: 'For Guarantee Amount', value: 'for_guarantee_amount' },
//         { text: 'Discount Amount', value: 'discount_amount' },
//         { text: 'Adjustment Amount', value: 'adjustment_amount' },
//         { text: 'Guaranted Amount', value: 'guaranted_amount' },
//         { text: 'O.R Amount', value: 'or_amount' },
//         { text: 'PHIC Amount', value: 'phic_amount' },
//     ],
// })

const showColumn = () => {
    show_column.value = true;
}
const hideColumn = () => {
    show_column.value = false;
}

const onSubmit = () => {
    alert("Submit A/R Tagging");
    emits('close-dialog');
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
.form-col {
    margin-top: -16px !important;
}
</style>