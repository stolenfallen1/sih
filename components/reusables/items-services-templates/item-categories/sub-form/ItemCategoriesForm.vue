<template>
    <v-dialog :model-value="open_form_dialog" rounded="lg" persistent scrollable max-width="800px">
        <v-toolbar color="#6984ff" hide-details density="compact">
            <v-toolbar-title>Item Category Details</v-toolbar-title>
        </v-toolbar>
        <v-card>
            <v-card-text>
                <v-row>
                    <v-col cols="6">
                        <v-card elevation="4">
                            <v-list-subheader inset class="px-2 text-black">
                                General Information
                            </v-list-subheader>
                            <v-divider></v-divider>
                            <v-card-text>
                                <v-row>
                                    <v-col cols="12">
                                        <v-autocomplete
                                            readonly
                                            label="Item Service Group"
                                            hide-details
                                            density="compact"
                                            variant="outlined"
                                        ></v-autocomplete>
                                    </v-col>
                                    <v-col cols="12">
                                        <v-text-field
                                            variant="outlined"
                                            label="Description"
                                            hide-details
                                            density="compact"
                                        ></v-text-field>
                                    </v-col>
                                    <v-col cols="12">
                                        <v-autocomplete
                                            readonly
                                            label="Exam Group"
                                            hide-details
                                            density="compact"
                                            variant="outlined"
                                        ></v-autocomplete>
                                    </v-col>
                                </v-row>
                            </v-card-text>
                        </v-card>
                    </v-col>
                    <v-col cols="6">
                        <v-card elevation="4" scrollable>
                            <v-list-subheader inset class="px-2 text-black">
                                Rebates Specification
                            </v-list-subheader>
                            <v-divider></v-divider>
                            <v-card-text>
                                <v-row>
                                    <v-col cols="12">
                                        <v-radio-group density="compact" hide-details>
                                            <v-checkbox label="Include in Calculating of Doctor's Annual Rebates" density="compact" hide-details></v-checkbox>
                                            <v-checkbox label="Inpatient Cases" density="compact" hide-details></v-checkbox>
                                            <v-checkbox label="Outpatient Cases" density="compact" hide-details></v-checkbox>
                                            <v-checkbox label="Emergency Cases" density="compact" hide-details></v-checkbox>
                                        </v-radio-group>
                                    </v-col>
                                    <v-col cols="12">
                                        <v-list-subheader inset>
                                            Applicable Rate for Annual Rebates (%)
                                        </v-list-subheader>
                                        <v-text-field
                                            readonly
                                            type="number"
                                            variant="outlined"
                                            hide-details
                                            density="compact"
                                        ></v-text-field>
                                    </v-col>
                                    <v-col cols="12">
                                        <v-list-subheader inset>
                                            Applicable Rate for Requesting Physician (%)
                                        </v-list-subheader>
                                        <v-text-field
                                            readonly
                                            type="number"
                                            variant="outlined"
                                            hide-details
                                            density="compact"
                                        ></v-text-field>
                                    </v-col>
                                    <v-col cols="12">
                                        <v-checkbox label="Auto-update Items and Services Rebates Specification" density="compact" hide-details></v-checkbox>
                                    </v-col>
                                </v-row>
                            </v-card-text>
                        </v-card>
                    </v-col>
                </v-row>
                <v-row>
                    <v-col cols="12">
                        <v-card elevation="4">
                            <v-list-subheader inset class="px-2 text-black">
                                Journal Account Codes
                            </v-list-subheader>
                            <v-divider></v-divider>
                            <v-card-text>
                                <v-row>
                                    <v-col cols="6">
                                        <v-list-subheader inset class="px-2 text-black">
                                            Inpatients
                                        </v-list-subheader>
                                        <v-row>
                                            <v-col cols="12">
                                                <v-autocomplete
                                                    readonly
                                                    label="Sales"
                                                    hide-details
                                                    density="compact"
                                                    variant="outlined"
                                                ></v-autocomplete>
                                            </v-col>
                                            <v-col cols="12">
                                                <v-autocomplete
                                                    readonly
                                                    label="Cost of Sales"
                                                    hide-details
                                                    density="compact"
                                                    variant="outlined"
                                                ></v-autocomplete>
                                            </v-col>
                                        </v-row>
                                        <v-list-subheader inset class="px-2 text-black">
                                            Outpatients
                                        </v-list-subheader>
                                        <v-row>
                                            <v-col cols="12">
                                                <v-autocomplete
                                                    readonly
                                                    label="Sales"
                                                    hide-details
                                                    density="compact"
                                                    variant="outlined"
                                                ></v-autocomplete>
                                            </v-col>
                                            <v-col cols="12">
                                                <v-autocomplete
                                                    readonly
                                                    label="Cost of Sales"
                                                    hide-details
                                                    density="compact"
                                                    variant="outlined"
                                                ></v-autocomplete>
                                            </v-col>
                                        </v-row>
                                    </v-col>
                                    <v-col cols="6">
                                        <v-list-subheader inset class="px-2 text-black">
                                            Emergencies
                                        </v-list-subheader>
                                        <v-row>
                                            <v-col cols="12">
                                                <v-autocomplete
                                                    readonly
                                                    label="Sales"
                                                    hide-details
                                                    density="compact"
                                                    variant="outlined"
                                                ></v-autocomplete>
                                            </v-col>
                                            <v-col cols="12">
                                                <v-autocomplete
                                                    readonly
                                                    label="Cost of Sales"
                                                    hide-details
                                                    density="compact"
                                                    variant="outlined"
                                                ></v-autocomplete>
                                            </v-col>
                                        </v-row>
                                        <v-list-subheader inset class="px-2 text-black">
                                            General
                                        </v-list-subheader>
                                        <v-row>
                                            <v-col cols="12">
                                                <v-autocomplete
                                                    readonly
                                                    label="Expenses"
                                                    hide-details
                                                    density="compact"
                                                    variant="outlined"
                                                ></v-autocomplete>
                                            </v-col>
                                            <v-col cols="12">
                                                <v-autocomplete
                                                    readonly
                                                    label="Reader's Fees"
                                                    hide-details
                                                    density="compact"
                                                    variant="outlined"
                                                ></v-autocomplete>
                                            </v-col>
                                            <v-col cols="12">
                                                <v-autocomplete
                                                    readonly
                                                    label="Inventories"
                                                    hide-details
                                                    density="compact"
                                                    variant="outlined"
                                                ></v-autocomplete>
                                            </v-col>
                                        </v-row>
                                    </v-col>
                                </v-row>
                            </v-card-text>
                        </v-card>
                    </v-col>
                </v-row>
                <v-row>
                    <v-col cols="6">
                        <v-card elevation="4">
                            <v-list-subheader inset class="px-2 text-black">
                                Report Group Header
                            </v-list-subheader>
                            <v-divider></v-divider>
                            <v-card-text>
                                <v-row>
                                    <v-col cols="12">
                                        <v-text-field
                                            variant="outlined"
                                            label="Receivable Patient"
                                            hide-details
                                            density="compact"
                                        ></v-text-field>
                                    </v-col>
                                    <v-col cols="12">
                                        <v-text-field
                                            variant="outlined"
                                            label="Receivable Jorunal"
                                            hide-details
                                            density="compact"
                                        ></v-text-field>
                                    </v-col>
                                    <v-col cols="12">
                                        <v-text-field
                                            variant="outlined"
                                            label="Cash Reciept Journal"
                                            hide-details
                                            density="compact"
                                        ></v-text-field>
                                    </v-col>
                                    <v-col cols="12">
                                        <v-text-field
                                            variant="outlined"
                                            label="Disbursement Journal"
                                            hide-details
                                            density="compact"
                                        ></v-text-field>
                                    </v-col>
                                </v-row>
                            </v-card-text>
                        </v-card>
                    </v-col>
                    <v-col cols="6">
                        <v-card elevation="4" scrollable>
                            <v-list-subheader inset class="px-2 text-black">
                                Reorder Point Default
                            </v-list-subheader>
                            <v-divider></v-divider>
                            <v-card-text>
                                <v-row>
                                    <v-col cols="12">
                                        <v-checkbox density="compact" hide-details label="Include in For Reorder Report?"></v-checkbox>
                                    </v-col>
                                    <v-col cols="12">
                                        <v-text-field
                                            variant="outlined"
                                            label="Buffer Days"
                                            hide-details
                                            density="compact"
                                        ></v-text-field>
                                    </v-col>
                                    <v-col cols="12">
                                        <v-autocomplete
                                            readonly
                                            label="Ordering Department"
                                            hide-details
                                            density="compact"
                                            variant="outlined"
                                        ></v-autocomplete>
                                    </v-col>
                                    <v-col cols="12">
                                        <v-text-field
                                            readonly
                                            label="Report Inclusion Date"
                                            type="date"
                                            hide-details
                                            density="compact"
                                            variant="outlined"
                                        ></v-text-field>
                                    </v-col>
                                    <v-col cols="12">
                                        <v-checkbox density="compact" hide-details label="Auto Update Items and Services Reorder Point Setup"></v-checkbox>
                                    </v-col>
                                </v-row>
                            </v-card-text>
                        </v-card>
                    </v-col>
                </v-row>
            </v-card-text>
            <v-divider></v-divider>
            <v-card-actions>
                <v-btn color="blue-darken-1" @click="closeDialog"> Close </v-btn>
                <v-spacer></v-spacer>
                <v-btn class="bg-primary text-white" type="submit" @click="handleSubmit">Submit</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script setup>

const props = defineProps({
    open_form_dialog: {
        type: Boolean,
        default: () => false,
        required: true,
    },
})

const emits = defineEmits(['close-dialog', 'handle-submit'])

const handleSubmit = () => {
    emits('handle-submit')
}

const closeDialog = () => {
    emits('close-dialog')
}
</script>

<style scoped>
</style>