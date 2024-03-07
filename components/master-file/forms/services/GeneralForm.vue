<template>
    <v-col cols="12">
        <v-row>
            <v-col lg="6">
                <v-card elevation="4">
                    <v-card-text>
                        <v-row>
                            <v-col lg="6">
                                <v-text-field
                                    label="Item Code ID"
                                    type="text"
                                    density="compact"
                                    variant="outlined"
                                ></v-text-field>
                            </v-col>
                            <v-col lg="6">
                                <v-text-field
                                    label="Standard Barcode ID"
                                    type="text"
                                    density="compact"
                                    variant="outlined"
                                    :rules="[
                                        (v) =>
                                            !!v || 'Standard Barcode ID is required',
                                    ]"
                                ></v-text-field>
                            </v-col>
                            <v-col lg="6">
                                <v-text-field
                                    label="Short Description"
                                    type="text"
                                    density="compact"
                                    variant="outlined"
                                    :rules="[
                                        (v) =>
                                            !!v || 'Short Description is required',
                                    ]"
                                ></v-text-field>
                            </v-col>
                            <v-col lg="6">
                                <v-text-field
                                    label="Standard Description"
                                    type="text"
                                    density="compact"
                                    variant="outlined"
                                    :rules="[
                                        (v) =>
                                            !!v || 'Short Description is required',
                                    ]"
                                ></v-text-field>
                            </v-col>
                            <v-col lg="6">
                                <v-text-field
                                    label="Custom Barcode ID"
                                    type="text"
                                    density="compact"
                                    variant="outlined"
                                ></v-text-field>
                            </v-col>
                            <v-col lg="6">
                                <v-text-field
                                    label="Manufacturer Barcode ID"
                                    type="text"
                                    readonly
                                    density="compact"
                                    variant="outlined"
                                ></v-text-field>
                            </v-col>
                            <v-col lg="6">
                                <v-text-field
                                    label="Custom Description"
                                    type="text"
                                    density="compact"
                                    variant="outlined"
                                ></v-text-field>
                            </v-col>
                            <v-col lg="6">
                                <v-select
                                    readonly
                                    :items="['Industry 1', 'Industry 2', 'Industry 3']"
                                    variant="outlined"
                                    density="compact"
                                ></v-select>
                            </v-col>
                            <v-col lg="12" class="px-4">
                                <v-textarea
                                    label="Specification"
                                    variant="outlined"
                                    density="compact"
                                ></v-textarea>
                            </v-col>
                            <v-col lg="12">
                                <v-checkbox label="Inventory?" density="compact" color="#117dad"></v-checkbox>
                            </v-col>
                        </v-row>
                        <v-row>
                            <!-- Default here is: Examinations / Procedures -->
                            <v-col lg="4">
                                <v-select
                                    readonly
                                    label="Item Group"
                                    :items="['Examinations']" 
                                    variant="outlined"
                                    density="compact"
                                ></v-select>
                            </v-col>
                            <v-col lg="4">
                                <v-select
                                    label="Item Category"
                                    :items="item_category" 
                                    variant="outlined"
                                    density="compact"
                                    :rules="[
                                        (v) =>
                                            !!v || 'Item Category is required',
                                    ]"
                                ></v-select>
                            </v-col>
                            <!-- Default here is: Not applicable -->
                            <v-col lg="4">
                                <v-select
                                    readonly
                                    label="Examination Types"
                                    :items="['Not Applicable', 'Applicable']" 
                                    variant="outlined"
                                    density="compact"
                                ></v-select>
                            </v-col>
                            <v-col lg="12">
                                <v-checkbox label="NHIP Compensable?" density="compact" color="#117dad"></v-checkbox>
                            </v-col>
                            <v-col lg="5">
                                <v-select
                                    label="NHIP Category"
                                    :items="nhip_category" 
                                    variant="outlined"
                                    density="compact"
                                ></v-select>
                            </v-col>
                            <v-col lg="3">
                                <v-text-field
                                    label="NHIP Price"
                                    type="number"
                                    density="compact"
                                    variant="outlined"
                                ></v-text-field>
                            </v-col>
                            <!-- Default here is: Not applicable -->
                            <v-col lg="4">
                                <v-select
                                    readonly
                                    label="Drug Admin Group"
                                    :items="['Not Applicable', 'Applicable']" 
                                    variant="outlined"
                                    density="compact"
                                ></v-select>
                            </v-col>
                            <!-- Default here is: None -->
                            <v-col lg="4">
                                <v-select
                                    readonly
                                    label="Small Unit"
                                    :items="['None']" 
                                    variant="outlined"
                                    density="compact"
                                ></v-select>
                            </v-col>
                            <!-- Default here is: 0 -->
                            <v-col lg="4">
                                <v-text-field
                                    label="Conversion"
                                    type="number"
                                    readonly
                                    density="compact"
                                    variant="outlined"
                                ></v-text-field>
                            </v-col>
                            <!-- Default here is: None -->
                            <v-col lg="4">
                                <v-select
                                    readonly
                                    label="Big Unit"
                                    :items="['None']" 
                                    variant="outlined"
                                    density="compact"
                                ></v-select>
                            </v-col>
                        </v-row>
                    </v-card-text>
                </v-card>
            </v-col>
            <v-col lg="6">
                <v-card elevation="4">
                    <v-card-text>
                        <v-row>
                            <v-col lg="4">
                                <v-checkbox
                                    v-model="is_active"
                                    label="Active?"
                                    density="compact"
                                    color="#117dad"
                                ></v-checkbox>
                            </v-col>
                            <v-col lg="4">
                                <v-checkbox
                                    label="Allow Discount?"
                                    density="compact"
                                    color="#117dad"
                                ></v-checkbox>
                            </v-col>
                            <v-col lg="4">
                                <v-checkbox
                                    label="Vatable?"
                                    density="compact"
                                    color="#117dad"
                                ></v-checkbox>
                            </v-col>
                        </v-row>
                        <v-row>
                            <v-col lg="4">
                                <v-checkbox
                                    v-model="is_vat_exempt"
                                    label="VAT Exempt?"
                                    density="compact"
                                    color="#117dad"
                                ></v-checkbox>
                            </v-col>
                            <v-col lg="4">
                                <v-checkbox
                                    label="Zero Rated?"
                                    density="compact"
                                    color="#117dad"
                                ></v-checkbox>
                            </v-col>
                            <v-col lg="4">
                                <v-checkbox
                                    label="Is Consultation?"
                                    density="compact"
                                    color="#117dad"
                                ></v-checkbox>
                            </v-col>
                        </v-row>
                        <v-row>
                            <v-col lg="6">
                                <!-- If checkbox is checked enable the text-field -->
                                <div>
                                    <v-checkbox
                                        label="Open Price?"
                                        density="compact"
                                        color="#117dad"
                                    ></v-checkbox>
                                    <v-text-field
                                        readonly
                                        label="Minimum Price"
                                        type="number"
                                        density="compact"
                                        variant="outlined"
                                    ></v-text-field>
                                    <v-text-field
                                        readonly
                                        label="Maximum Price"
                                        type="number"
                                        density="compact"
                                        variant="outlined"
                                    ></v-text-field>
                                </div>
                            </v-col>
                            <v-col lg="6">
                                <!-- If checkbox is checked enable the text-field -->
                                <div>
                                    <v-checkbox
                                        label="Allow stat order?"
                                        density="compact"
                                        color="#117dad"
                                    ></v-checkbox>
                                    <v-text-field
                                        readonly
                                        type="number"
                                        density="compact"
                                        variant="outlined"
                                    ></v-text-field>
                                </div>
                            </v-col>
                        </v-row>
                    </v-card-text>
                </v-card>
                <v-card elevation="4" class="mt-4">
                    <v-card-text>
                        <v-list-subheader inset>
                            Senior Citizen Reference Price Discount
                        </v-list-subheader>
                        <v-col cols="12">
                            <v-row>
                                <v-col lg="4">
                                    <v-text-field
                                        label="Inpatient Case"
                                        type="number"
                                        density="compact"
                                        variant="outlined"
                                    ></v-text-field>
                                </v-col>
                                <v-col lg="4">
                                    <v-text-field
                                        label="Outpatient Case"
                                        type="number"
                                        density="compact"
                                        variant="outlined"
                                    ></v-text-field>
                                </v-col>
                                <v-col lg="4">
                                    <v-text-field
                                        label="Emergency Case"
                                        type="number"
                                        density="compact"
                                        variant="outlined"
                                    ></v-text-field>
                                </v-col>
                            </v-row>
                        </v-col>
                    </v-card-text>
                </v-card>
                <v-card elevation="4" class="mt-4">
                    <v-card-text>
                        <v-list-subheader inset>
                            Bills of Materials
                        </v-list-subheader>
                        <v-col cols="12">
                            <v-row>
                                <v-col lg="6">
                                    <v-checkbox
                                        label="Include in Posting PF with Bill of Materials"
                                        density="compact"
                                        color="#117dad"
                                    ></v-checkbox>
                                </v-col>
                                <v-col lg="6">
                                    <v-checkbox
                                        label="Enforce Send-out Amount"
                                        density="compact"
                                        color="#117dad"
                                    ></v-checkbox>
                                </v-col>
                                <v-col lg="6">
                                    <v-checkbox
                                        label="Enforce Settlement Amount"
                                        density="compact"
                                        color="#117dad"
                                    ></v-checkbox>
                                </v-col>
                                <v-col lg="6">
                                    <v-text-field
                                        readonly
                                        label="Bills of Materials Amount"
                                        type="number"
                                        density="compact"
                                        variant="outlined"
                                    ></v-text-field>
                                </v-col>
                            </v-row>
                        </v-col>
                    </v-card-text>
                </v-card>
                <v-card elevation="4" class="mt-4">
                    <v-card-text>
                        <v-list-subheader inset>
                            Rebates Specification
                        </v-list-subheader>
                        <v-col cols="12">
                            <v-row>
                                <v-col lg="6">
                                    <v-row>
                                        <v-col cols="12">
                                            <v-checkbox
                                                label="Include in Calculating Doctor's Annual Rebates"
                                                density="compact"
                                                color="#117dad"
                                            >
                                            </v-checkbox>
                                            <v-checkbox
                                                label="Inpatient Cases"
                                                density="compact"
                                                color="#117dad"
                                            ></v-checkbox>
                                            <v-checkbox
                                                label="Outpatient Cases"
                                                density="compact"
                                                color="#117dad"
                                            ></v-checkbox>
                                            <v-checkbox
                                                label="Emergency Cases"
                                                density="compact"
                                                color="#117dad"
                                            ></v-checkbox>
                                        </v-col>
                                    </v-row>
                                </v-col>
                                <v-col lg="6">
                                    <v-row>
                                        <v-col cols="12">
                                            <v-list-subheader inset>
                                                Annual Rates for Annual Rebates
                                            </v-list-subheader>
                                            <v-text-field
                                                type="number"
                                                density="compact"
                                                variant="outlined"
                                            ></v-text-field>
                                            <v-list-subheader inset>
                                                Applicable Rate for Requesting Physician
                                            </v-list-subheader>
                                            <v-text-field
                                                type="number"
                                                density="compact"
                                                variant="outlined"
                                            ></v-text-field>
                                        </v-col>
                                    </v-row>
                                </v-col>
                            </v-row>
                        </v-col>
                    </v-card-text>
                </v-card>
            </v-col>
        </v-row>
    </v-col>
</template>

<script setup>

const item_category = ref([
    'Medical Supplies',
    'X-ray Examination',
    'Medicines',
    'Laboratory Examination',
    'Others',
]);
const nhip_category = ref([
    'Medical Supplies',
    'X-ray Examination',
    'Medicines',
    'Laboratory Examination',
    'Others',
]);
const is_active = ref(true)
const is_vat_exempt = ref(true)

</script>

<style scoped>
</style>