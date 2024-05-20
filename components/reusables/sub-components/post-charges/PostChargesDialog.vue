<template>
    <v-dialog :model-value="show" rounded="lg" scrollable @update:model-value="closeDialog" max-width="1120px">
        <v-card rounded="lg">
            <v-toolbar density="compact" color="#6984ff" hide-details>
                <v-toolbar-title>Post Charges to Patient's Account {{ selectedRowDetails.id }}</v-toolbar-title>
                <v-btn color="white" @click="closeDialog">
                    <v-icon>mdi-close</v-icon>
                </v-btn>
            </v-toolbar>
            <v-divider></v-divider>
            <v-card-text>
                <v-card elevation="4" class="mb-4">
                    <v-card-text>
                        <v-tabs 
                            v-model="tab"
                            color="primary"
                            class="mb-4"
                        >
                            <v-tab value="0"><v-icon start>mdi-form-select</v-icon> Patient Info</v-tab>
                            <v-tab value="1"><v-icon start>mdi-form-select</v-icon> Transaction Info </v-tab>
                        </v-tabs>
                        <v-window v-model="tab">
                            <v-window-item class="pa-1">
                                <v-row>
                                    <v-col cols="6">
                                        <v-row>
                                            <v-col cols="12">
                                                <v-text-field 
                                                    label="Patient Name"
                                                    v-model="payload.patient_name"
                                                    variant="outlined"
                                                    density="compact"
                                                    hide-details
                                                    readonly
                                                ></v-text-field>
                                            </v-col>
                                            <v-col cols="12" class="form-col">
                                                <v-text-field 
                                                    label="ID No."
                                                    v-model="payload.id_no"
                                                    variant="outlined"
                                                    density="compact"
                                                    hide-details
                                                    readonly
                                                ></v-text-field>
                                            </v-col>
                                        </v-row>
                                        <v-row class="form-col">
                                            <v-col cols="6">
                                                <v-text-field 
                                                    label="Civil Status"
                                                    v-model="payload.civil_status"
                                                    variant="outlined"
                                                    density="compact"
                                                    hide-details
                                                    readonly
                                                ></v-text-field>
                                            </v-col>
                                            <v-col cols="6">
                                                <v-text-field 
                                                    label="Gender"
                                                    v-model="payload.gender"
                                                    variant="outlined"
                                                    density="compact"
                                                    hide-details
                                                    readonly
                                                ></v-text-field>
                                            </v-col>
                                        </v-row>
                                        <v-row class="form-col">
                                            <v-col cols="6">
                                                <v-text-field 
                                                    label="Birthdate"
                                                    v-model="payload.birthdate"
                                                    type="date"
                                                    variant="outlined"
                                                    density="compact"
                                                    hide-details
                                                    readonly
                                                ></v-text-field>
                                            </v-col>
                                            <v-col cols="6">
                                                <v-text-field 
                                                    label="Age"
                                                    v-model="payload.age"
                                                    type="number"
                                                    variant="outlined"
                                                    density="compact"
                                                    hide-details
                                                    readonly
                                                ></v-text-field>
                                            </v-col>
                                        </v-row>
                                        <v-row class="form-col">
                                            <v-col cols="12">
                                                <v-autocomplete
                                                    label="Department"
                                                    v-model="payload.department"
                                                    variant="outlined"
                                                    density="compact"
                                                    hide-details
                                                ></v-autocomplete>
                                            </v-col>
                                            <v-col cols="12" class="form-col">
                                                <v-autocomplete
                                                    label="Guarantor Name"
                                                    v-model="payload.guarantor_name"
                                                    variant="outlined"
                                                    density="compact"
                                                    hide-details
                                                ></v-autocomplete>
                                            </v-col>
                                        </v-row>
                                    </v-col>
                                    <v-col cols="6">
                                        <v-row>
                                            <v-col cols="12">
                                                <v-text-field 
                                                    label="Registry Case No."
                                                    v-model="payload.registry_case_no"
                                                    variant="outlined"
                                                    density="compact"
                                                    hide-details
                                                    readonly
                                                ></v-text-field>
                                            </v-col>
                                            <v-col cols="12" class="form-col">
                                                <v-text-field 
                                                    label="Registry Case Date"
                                                    v-model="payload.registry_case_date"
                                                    type="date"
                                                    variant="outlined"
                                                    density="compact"
                                                    hide-details
                                                    readonly
                                                ></v-text-field>
                                            </v-col>
                                            <v-col cols="12" class="form-col">
                                                <v-text-field 
                                                    label="Referral Fee Setup"
                                                    v-model="payload.referral_fee_setup"
                                                    variant="outlined"
                                                    density="compact"
                                                    hide-details
                                                    readonly
                                                ></v-text-field>
                                            </v-col>
                                            <v-col cols="12" class="form-col">
                                                <v-autocomplete
                                                    label="Physician Name"
                                                    v-model="payload.physician_name"
                                                    variant="outlined"
                                                    density="compact"
                                                    hide-details
                                                ></v-autocomplete>
                                            </v-col>
                                            <v-col cols="12" class="form-col">
                                                <v-text-field 
                                                    label="Referring Physician"
                                                    v-model="payload.referring_physician"
                                                    variant="outlined"
                                                    density="compact"
                                                    hide-details
                                                    readonly
                                                ></v-text-field>
                                            </v-col>
                                        </v-row>
                                    </v-col>
                                </v-row>
                            </v-window-item>
                            <v-window-item class="pa-1">
                                <v-row>
                                    <v-col cols="3">
                                        <v-row>
                                            <v-col cols="12">
                                                <v-text-field 
                                                    label="Transaction No."
                                                    v-model="payload.transaction_no"
                                                    variant="outlined"
                                                    density="compact"
                                                    hide-details
                                                    readonly
                                                ></v-text-field>
                                            </v-col>
                                            <v-col cols="12" class="form-col">
                                                <v-text-field 
                                                    label="Price Group"
                                                    v-model="payload.price_group"
                                                    variant="outlined"
                                                    density="compact"
                                                    hide-details
                                                    readonly
                                                ></v-text-field>
                                            </v-col>
                                            <v-col cols="12" class="form-col">
                                                <v-text-field 
                                                    label="Price Scheme"
                                                    v-model="payload.price_scheme"
                                                    variant="outlined"
                                                    density="compact"
                                                    hide-details
                                                    readonly
                                                ></v-text-field>
                                            </v-col>
                                            <v-col cols="12" class="form-col">
                                                <v-text-field 
                                                    label="Hospitalization Plan"
                                                    v-model="payload.hospitalization_plan"
                                                    variant="outlined"
                                                    density="compact"
                                                    hide-details
                                                    readonly
                                                ></v-text-field>
                                            </v-col>
                                            <v-col cols="12" class="form-col">
                                                <v-autocomplete
                                                    label="Discount Scheme"
                                                    v-model="payload.discount_scheme"
                                                    variant="outlined"
                                                    density="compact"
                                                    hide-details
                                                    readonly
                                                ></v-autocomplete>
                                            </v-col>
                                        </v-row>
                                    </v-col>
                                    <v-col cols="3">
                                        <v-row>
                                            <v-col cols="12">
                                                <v-autocomplete 
                                                    label="Document Type"
                                                    v-model="payload.document_type"
                                                    variant="outlined"
                                                    density="compact"
                                                    hide-details
                                                ></v-autocomplete>
                                            </v-col>
                                            <v-col cols="12" class="form-col">
                                                <v-text-field 
                                                    label="Document Date"
                                                    v-model="payload.document_date"
                                                    type="date"
                                                    variant="outlined"
                                                    density="compact"
                                                    hide-details
                                                    readonly
                                                ></v-text-field>
                                            </v-col>
                                            <v-col cols="12" class="form-col">
                                                <v-text-field 
                                                    label="Document No."
                                                    v-model="payload.document_no"
                                                    variant="outlined"
                                                    density="compact"
                                                    hide-details
                                                    readonly
                                                ></v-text-field>
                                            </v-col>
                                            <v-col cols="12" class="form-col">
                                                <v-text-field 
                                                    label="Regulated Doc No."
                                                    v-model="payload.regulated_doc_no"
                                                    variant="outlined"
                                                    density="compact"
                                                    hide-details
                                                    readonly
                                                ></v-text-field>
                                            </v-col>
                                            <v-col cols="12" class="form-col">
                                                <v-text-field 
                                                    label="Payer Name"
                                                    v-model="payload.payer_name"
                                                    variant="outlined"
                                                    density="compact"
                                                    hide-details
                                                    readonly
                                                ></v-text-field>
                                            </v-col>
                                        </v-row>
                                    </v-col>
                                    <v-col cols="3">
                                        <v-row>
                                            <v-col cols="12">
                                                <v-text-field 
                                                    label="Requisition Date"
                                                    v-model="payload.requisition_date"
                                                    type="date"
                                                    variant="outlined"
                                                    density="compact"
                                                    hide-details
                                                    readonly
                                                ></v-text-field>
                                            </v-col>
                                            <v-col cols="12" class="form-col">
                                                <v-text-field 
                                                    label="Requisition No."
                                                    v-model="payload.requisition_no"
                                                    variant="outlined"
                                                    density="compact"
                                                    hide-details
                                                    readonly
                                                ></v-text-field>
                                            </v-col>
                                            <v-col cols="12" class="form-col">
                                                <v-text-field 
                                                    label="Total Items"
                                                    v-model="payload.total_items"
                                                    variant="outlined"
                                                    density="compact"
                                                    hide-details
                                                    readonly
                                                ></v-text-field>
                                            </v-col>
                                            <v-col cols="12" class="form-col">
                                                <v-text-field 
                                                    label="Total Qty"
                                                    v-model="payload.total_qty"
                                                    variant="outlined"
                                                    density="compact"
                                                    hide-details
                                                    readonly
                                                ></v-text-field>
                                            </v-col>
                                            <v-col cols="12" class="form-col">
                                                <v-text-field 
                                                    label="OSCA ID"
                                                    v-model="payload.osca_id"
                                                    variant="outlined"
                                                    density="compact"
                                                    hide-details
                                                    readonly
                                                ></v-text-field>
                                            </v-col>
                                        </v-row>
                                    </v-col>
                                    <v-col cols="3">
                                        <v-row>
                                            <v-col cols="12">
                                                <v-text-field 
                                                    label="Gross Amount"
                                                    v-model="payload.gross_amount"
                                                    variant="outlined"
                                                    density="compact"
                                                    hide-details
                                                    readonly
                                                ></v-text-field>
                                            </v-col>
                                            <v-col cols="12" class="form-col">
                                                <v-text-field 
                                                    label="Discount"
                                                    v-model="payload.discount"
                                                    variant="outlined"
                                                    density="compact"
                                                    hide-details
                                                    readonly
                                                ></v-text-field>
                                            </v-col>
                                            <v-col cols="12" class="form-col">
                                                <v-text-field 
                                                    label="Output Tax"
                                                    v-model="payload.output_tax"
                                                    variant="outlined"
                                                    density="compact"
                                                    hide-details
                                                    readonly
                                                ></v-text-field>
                                            </v-col>
                                            <v-col cols="12" class="form-col">
                                                <v-text-field 
                                                    label="Net Amount"
                                                    v-model="payload.net_amount"
                                                    variant="outlined"
                                                    density="compact"
                                                    hide-details
                                                    readonly
                                                ></v-text-field>
                                            </v-col>
                                        </v-row>
                                    </v-col>
                                </v-row>
                            </v-window-item>
                        </v-window>
                    </v-card-text>
                </v-card>
                <v-expansion-panels
                    v-model="panel"
                    variant="accordion"
                    multiple
                    >
                    <v-expansion-panel>
                        <v-expansion-panel-title>Transaction Line Items</v-expansion-panel-title>
                        <v-expansion-panel-text>
                            <v-table density="compact" height="40vh">
                                <thead>
                                    <tr>
                                        <th width="4"></th>
                                        <th width="4"></th>
                                        <th>Frequency</th>
                                        <th>Route</th>
                                        <th>Description</th>
                                        <th>Balance</th>
                                        <th>Qty</th>
                                        <th>Stat %</th>
                                        <th>Price</th>
                                        <th>Amount</th>
                                        <th>Amount</th>
                                        <th>Output Tax</th>
                                        <th>Discount Rate</th>
                                        <th>Discount Amount</th>
                                        <th>RF Discount</th>
                                        <th>Net of RF Discount</th>
                                        <th>Reader's Fee</th>
                                        <th>CPT Code</th>
                                        <th>CPT Symbol</th>
                                        <th>CPT Modifier Code</th>
                                        <th>CPT Modifier Price</th>
                                        <th>Barcode ID</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <!-- Contents -->
                                    </tr>
                                </tbody>
                            </v-table>
                            <div class="button-container mt-4">
                                <button class="text-blue-darken-1 border border-primary px-3 py-1 rounded" @click="openItemMasterFile">Select from Item Master File</button> 
                                <button class="text-blue-darken-1 border border-primary px-3 py-1 rounded" @click="openItemTemplate">Select from Item Template</button>
                                <button class="text-blue-darken-1 border border-primary px-3 py-1 rounded">CPT Modifier</button> 
                                <button class="text-blue-darken-1 border border-primary px-3 py-1 rounded">Select Service Fee</button>
                                <button class="text-blue-darken-1 border border-primary px-3 py-1 rounded">Item Notes. Remarks</button> 
                            </div>
                        </v-expansion-panel-text>
                    </v-expansion-panel>

                    <v-expansion-panel>
                        <v-expansion-panel-title>Requisition Notes .Remarks</v-expansion-panel-title>
                        <v-expansion-panel-text>
                            <v-row>
                                <v-col cols="12">
                                    <v-textarea
                                        label="Requisition Remarks"
                                        v-model="payload.requisition_remarks"
                                        placeholder="Enter requisition remarks here"
                                        variant="outlined"
                                        density="compact"
                                        hide-details
                                    ></v-textarea>
                                </v-col>
                            </v-row>
                        </v-expansion-panel-text>
                    </v-expansion-panel>

                    <v-expansion-panel>
                        <v-expansion-panel-title>Rendering Notes .Remarks</v-expansion-panel-title>
                        <v-expansion-panel-text>
                            <v-row>
                                <v-col cols="12">
                                    <v-textarea
                                        label="Rendering Remarks"
                                        v-model="payload.rendering_remarks"
                                        placeholder="Enter rendering remarks here"
                                        variant="outlined"
                                        density="compact"
                                        hide-details
                                    ></v-textarea>
                                </v-col>
                            </v-row>
                        </v-expansion-panel-text>
                    </v-expansion-panel>
                </v-expansion-panels>
            </v-card-text>
            <v-divider></v-divider>
            <v-card-actions>
                <v-btn color="blue-darken-1 border border-info" @click="closeDialog"> Close </v-btn>
                <v-spacer></v-spacer>
                <v-btn class="bg-primary text-white">Save</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
    <ItemMasterFile :open_item_master_file="open_item_master_file" @close-dialog="closeItemMasterFile" />
    <DxMedicalTemplateSelection :open_medical_template_selection="open_medical_template_selection" @close-dialog="closeItemTemplate" />
</template>

<script setup>
import ItemMasterFile from "./sub-forms/ItemMasterFile.vue";
import DxMedicalTemplateSelection from '~/components/reusables/build-file/dx-medical-packages/sub-forms/DxMedicalTemplateSelection.vue';

const props = defineProps({
    show: {
        type: Boolean,
        default: () => false,
        required: true,
    },
});

let tab = ref("0");
let panel = ref([0]);
const open_item_master_file = ref(false);
const open_medical_template_selection = ref(false);

const { selectedRowDetails } = storeToRefs(useSubcomponentSelectedRowDetailsStore()); 

const payload = ref({});

const emits = defineEmits(['close-dialog']) 

const openItemMasterFile = () => {
    open_item_master_file.value = true;
}
const closeItemMasterFile = () => {
    open_item_master_file.value = false;
}

const openItemTemplate = () => {
    open_medical_template_selection.value = true;
}
const closeItemTemplate = () => {
    open_medical_template_selection.value = false;
}

const closeDialog = () => {
    emits('close-dialog');
    panel.value = [0];
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
.button-container {
    display: flex;
    flex-wrap: wrap;
    gap: 5px;
}
.button-container v-btn {
    flex: 1 1 auto;
    margin-bottom: 5px;
}
</style>