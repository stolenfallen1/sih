<template>
    <v-dialog :model-value="open_itemized_discount_application" rounded="lg" scrollable @update:model-value="closeDialog" max-width="1120px">
        <v-card rounded="lg">
            <v-toolbar density="compact" color="#6984ff" hide-details>
                <v-toolbar-title>Itemized Discount Application {{ selectedRowDetails.id }}</v-toolbar-title>
                <v-btn color="white" @click="closeDialog">
                    <v-icon>mdi-close</v-icon>
                </v-btn>
            </v-toolbar>
            <v-divider></v-divider>
            <v-card-text>
                <v-row>
                    <v-col cols="6">
                        <v-row>
                            <v-col cols="6">
                                <v-text-field
                                    label="Patient ID"
                                    variant="outlined"
                                    density="compact"
                                    hide-details
                                    readonly
                                ></v-text-field>
                            </v-col>
                            <v-col cols="6">
                                <v-text-field
                                    label="Patient Name"
                                    variant="outlined"
                                    density="compact"
                                    hide-details
                                    readonly
                                ></v-text-field>
                            </v-col>
                            <v-col cols="4" class="form-col">
                                <v-text-field
                                    label="Registry Type"
                                    variant="outlined"
                                    density="compact"
                                    hide-details
                                    readonly
                                ></v-text-field>
                            </v-col>
                            <v-col cols="4" class="form-col">
                                <v-text-field
                                    label="Registry Date"
                                    type="date"
                                    variant="outlined"
                                    density="compact"
                                    hide-details
                                    readonly
                                ></v-text-field>
                            </v-col>
                            <v-col cols="4" class="form-col">
                                <v-text-field
                                    label="Registry Case No."
                                    variant="outlined"
                                    density="compact"
                                    hide-details
                                    readonly
                                ></v-text-field>
                            </v-col>
                            <v-col cols="12" class="form-col">
                                <v-textarea
                                    label="Remarks"
                                    variant="outlined"
                                    density="compact"
                                    hide-details
                                ></v-textarea>
                            </v-col>
                            <v-col cols="12" class="form-col">
                                <p>Discount Coverage</p>
                                <v-card>
                                    <v-card-text>
                                        <v-row>
                                            <v-col cols="6" class="form-col">
                                                <v-checkbox label="Net of Discounts" density="compact" hide-details></v-checkbox>
                                            </v-col>
                                            <v-col cols="6" class="form-col">
                                                <v-checkbox label="Net of PhilHealth" density="compact" hide-details></v-checkbox>
                                            </v-col>
                                            <v-col cols="6" class="form-col">
                                                <v-checkbox label="Net of Payment" density="compact" hide-details></v-checkbox>
                                            </v-col>
                                            <v-col cols="6" class="form-col">
                                                <v-checkbox label="Net of Guaranteed Amount" density="compact" hide-details></v-checkbox>
                                            </v-col>
                                        </v-row>
                                    </v-card-text>
                                </v-card>
                            </v-col>
                        </v-row>
                    </v-col>
                    <v-col cols="6">
                        <v-row>
                            <v-col cols="6">
                                <v-autocomplete
                                    label="Discount Scheme"
                                    variant="outlined"
                                    density="compact"
                                    hide-details
                                ></v-autocomplete>
                            </v-col>
                            <v-col cols="6">
                                <v-autocomplete
                                    label="Classification"
                                    variant="outlined"
                                    density="compact"
                                    hide-details
                                ></v-autocomplete>
                            </v-col>
                            <v-col cols="12" class="form-col">
                                <v-text-field
                                    label="Items and Services"
                                    variant="outlined"
                                    density="compact"
                                    hide-details
                                    readonly
                                ></v-text-field>
                            </v-col>
                            <v-col cols="12" class="form-col">
                                <v-text-field
                                    label="Rooms and Beds"
                                    variant="outlined"
                                    density="compact"
                                    hide-details
                                    readonly
                                ></v-text-field>
                            </v-col>
                            <v-col cols="12" class="form-col">
                                <v-text-field
                                    label="Miscellaneous"
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
                            <v-col cols="12" class="form-col">
                                <v-text-field
                                    label="Total Discount"
                                    variant="outlined"
                                    density="compact"
                                    hide-details
                                    readonly
                                ></v-text-field>
                            </v-col>
                            <v-col cols="12" class="form-col">
                                <v-text-field
                                    label="Net Amount"
                                    variant="outlined"
                                    density="compact"
                                    hide-details
                                    readonly
                                ></v-text-field>
                            </v-col>
                            <v-col cols="5" class="form-col">
                                <v-text-field
                                    label="Discount Amount"
                                    variant="outlined"
                                    density="compact"
                                    hide-details
                                ></v-text-field>
                            </v-col>
                            <v-col cols="4" class="form-col">
                                <v-text-field
                                    label="Discount %"
                                    variant="outlined"
                                    density="compact"
                                    hide-details
                                ></v-text-field>
                            </v-col>
                            <v-col cols="3" class="form-col">
                                <v-btn>Distribute</v-btn>
                            </v-col>
                        </v-row>
                    </v-col>
                </v-row>
                <v-card elevation="4" class="mt-4">
                    <v-tabs 
                        v-model="tab"
                        color="primary"
                    >
                        <v-tab value="0"><v-icon start>mdi-form-select</v-icon> Items and Services </v-tab>
                        <v-tab value="1"><v-icon start>mdi-form-select</v-icon> Miscellaneous </v-tab>
                    </v-tabs>
                    <v-card-text>
                        <v-window v-model="tab">
                            <v-window-item class="pa-1">
                                <v-row>
                                    <v-col cols="4">
                                        <v-autocomplete
                                            label="Department"
                                            placeholder="Select Department"
                                            variant="outlined"
                                            density="compact"
                                            hide-details
                                        ></v-autocomplete>
                                    </v-col>
                                    <v-col cols="4">
                                        <v-autocomplete
                                            label="Item Group"
                                            placeholder="Select Item Group"
                                            variant="outlined"
                                            density="compact"
                                            hide-details
                                        ></v-autocomplete>
                                    </v-col>
                                    <v-col cols="4">
                                        <v-text-field
                                            label="Tagged Amount"
                                            variant="outlined"
                                            density="compact"
                                            hide-details
                                            readonly
                                        ></v-text-field>
                                    </v-col>
                                    <v-divider></v-divider>
                                </v-row>
                                <v-table class="mt-4" height="40vh">
                                    <thead>
                                        <tr>
                                            <th width="4"></th>
                                            <th>Type</th>
                                            <th>Document No.</th>
                                            <th>Document Date</th>
                                            <th>Description</th>
                                            <th>Rendered Qty</th>
                                            <th>Rendered Price</th>
                                            <th>Amount</th>
                                            <th>Discount Rate</th>
                                            <th>Discount Amount</th>
                                            <th>Credit Amount</th>
                                            <th>Allowed Amount</th>
                                            <th>RF Discount</th>
                                            <th>Net of RF Discount</th>
                                            <th>Net of Discount</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <!-- Contents -->
                                        </tr>
                                    </tbody>
                                </v-table>
                            </v-window-item>
                            <v-window-item class="pa-1">
                                <v-row style="display: flex; justify-content: flex-end">
                                    <v-col cols="4">
                                        <v-text-field
                                            label="Tagged Amount"
                                            variant="outlined"
                                            density="compact"
                                            hide-details
                                            readonly
                                        ></v-text-field>
                                    </v-col>
                                    <v-divider></v-divider>
                                </v-row>
                                <v-table class="mt-4" height="40vh">
                                    <thead>
                                        <tr>
                                            <th width="4"></th>
                                            <th>Document Date</th>
                                            <th>Document No.</th>
                                            <th>Description</th>
                                            <th>Amount</th>
                                            <th>Credit Amount</th>
                                            <th>Allowed Amount</th>
                                            <th>Discount Rate</th>
                                            <th>Discount Amount</th>
                                            <th>Net of Discount</th>
                                            <th width="4"></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <!-- Contents -->
                                        </tr>
                                    </tbody>
                                </v-table>
                            </v-window-item>
                        </v-window>
                    </v-card-text>
                </v-card>
            </v-card-text>
            <v-divider></v-divider>
            <v-card-actions>
                <v-btn color="blue-darken-1 border border-info" @click="closeDialog"> Close </v-btn>
                <v-btn class="bg-info text-white" @click="openDiscountHistory">Discount History</v-btn>
                <v-spacer></v-spacer>
                <v-btn class="bg-primary text-white">Apply</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
    <AppliedDiscountHistory :open_applied_discount_history="open_applied_discount_history" @close-dialog="closeDiscountHistory" />
</template>

<script setup>
import AppliedDiscountHistory from './AppliedDiscountHistory.vue';

const props = defineProps({
    open_itemized_discount_application: {
        type: Boolean,
        default: () => false,
        required: true,
    },
});

const open_applied_discount_history = ref(false);

const { selectedRowDetails } = storeToRefs(useSubcomponentSelectedRowDetailsStore()); 

let tab = ref("0");

const emits = defineEmits(['close-dialog'])

const openDiscountHistory = () => {
    open_applied_discount_history.value = true;
}
const closeDiscountHistory = () => {
    open_applied_discount_history.value = false;
}

const closeDialog = () => {
    emits('close-dialog');
}
</script>

<style scoped>
.form-col {
    margin-top: -16px !important;
}
</style>