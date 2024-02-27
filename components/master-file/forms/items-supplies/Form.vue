<template>
    <v-dialog :model-value="item_supplies_form" persistent hide-overlay width="950" scrollable>
        <v-toolbar density="compact" color="#6984ff" hide-details>
            <v-toolbar-title>Manage Items and Supplies Details</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-btn color="white" @click="closeDialog">
                <v-icon>mdi-close</v-icon>
            </v-btn>
        </v-toolbar>
        <v-card>
            <v-card-text>
                <v-row>
                    <v-col cols="6">
                        <v-row>
                            <v-col cols="12">
                                <v-text-field
                                    label="Name"
                                    required
                                    hide-details
                                    density="compact"
                                    variant="outlined"
                                ></v-text-field>
                            </v-col>
                        </v-row>
                        <v-row>
                            <v-col cols="12">
                                <v-text-field
                                    label="Description"
                                    required
                                    hide-details
                                    density="compact"
                                    variant="outlined"
                                ></v-text-field>
                            </v-col>
                        </v-row>
                        <v-row>
                            <v-col cols="6">
                                <v-autocomplete
                                    v-model="defaultValue"
                                    item-title="abbreviation"
                                    item-value="id"
                                    label="Item Group"
                                    :items="itemGroups"
                                    disabled
                                    hide-details
                                    density="compact"
                                    variant="outlined"
                                ></v-autocomplete>
                            </v-col>
                            <v-col cols="6">
                                <v-autocomplete
                                    item-title="abbreviation"
                                    item-value="id"
                                    label="Category Group"
                                    hide-details
                                    required
                                    density="compact"
                                    variant="outlined"
                                ></v-autocomplete>
                            </v-col>
                        </v-row>
                        <v-row>
                            <v-col cols="6">
                                <v-autocomplete
                                    item-title="abbreviation"
                                    item-value="id"
                                    label="Sub Category"
                                    hide-details
                                    required
                                    density="compact"
                                    variant="outlined"
                                ></v-autocomplete>
                            </v-col>
                            <v-col cols="6">
                                <v-autocomplete
                                    item-title="abbreviation"
                                    item-value="id"
                                    label="Brand"
                                    hide-details
                                    required
                                    density="compact"
                                    variant="outlined"
                                ></v-autocomplete>
                            </v-col>
                        </v-row>
                        <v-row>
                            <v-col cols="6">
                                <v-text-field
                                    label="Manufacturer"
                                    required
                                    hide-details
                                    density="compact"
                                    variant="outlined"
                                ></v-text-field>
                            </v-col>
                            <v-col cols="6">
                                <v-text-field
                                    label="Specification"
                                    required
                                    hide-details
                                    density="compact"
                                    variant="outlined"
                                ></v-text-field>
                            </v-col>
                        </v-row>
                        <v-row>
                            <v-col cols="6">
                                <v-text-field
                                    label="SKU"
                                    required
                                    hide-details
                                    density="compact"
                                    variant="outlined"
                                ></v-text-field>
                            </v-col>
                            <v-col cols="6">
                                <v-text-field
                                    label="Barcode"
                                    required
                                    hide-details
                                    density="compact"
                                    variant="outlined"
                                ></v-text-field>
                            </v-col>
                        </v-row>
                        <v-row>
                            <v-col cols="6">
                                <v-autocomplete
                                    item-title="abbreviation"
                                    item-value="id"
                                    label="Unit of Measurement"
                                    hide-details
                                    required
                                    density="compact"
                                    variant="outlined"
                                ></v-autocomplete>
                            </v-col>
                            <v-col cols="6">
                                <v-text-field
                                    label="Prescription"
                                    required
                                    hide-details
                                    density="compact"
                                    variant="outlined"
                                ></v-text-field>
                            </v-col>
                        </v-row>
                        <v-row>
                            <v-col cols="6">
                                <v-text-field
                                    label="Indication"
                                    required
                                    hide-details
                                    density="compact"
                                    variant="outlined"
                                ></v-text-field>
                            </v-col>
                            <v-col cols="6">
                                <v-text-field
                                    label="Dosage"
                                    required
                                    hide-details
                                    density="compact"
                                    variant="outlined"
                                ></v-text-field>
                            </v-col>
                        </v-row>
                        <v-row>
                            <v-col cols="6">
                                <v-text-field
                                    label="Precaution"
                                    required
                                    hide-details
                                    density="compact"
                                    variant="outlined"
                                ></v-text-field>
                            </v-col>
                            <v-col cols="6">
                                <v-text-field
                                    label="Adverse Reaction"
                                    required
                                    hide-details
                                    density="compact"
                                    variant="outlined"
                                ></v-text-field>
                            </v-col>
                        </v-row>
                        <v-row>
                            <v-col cols="6">
                                <v-text-field
                                    label="Interaction"
                                    required
                                    hide-details
                                    density="compact"
                                    variant="outlined"
                                ></v-text-field>
                            </v-col>
                        </v-row>
                        <v-row>
                            <v-col cols="12">
                                <v-textarea
                                    label="Remarks"
                                    class="cursor-pointer"
                                    variant="outlined"
                                ></v-textarea>
                            </v-col>
                        </v-row>
                    </v-col>
                    <v-col cols="6">
                        <v-row>
                            <v-col cols="6">
                                <v-autocomplete
                                    item-title="abbreviation"
                                    item-value="id"
                                    label="Dosage form"
                                    hide-details
                                    required
                                    density="compact"
                                    variant="outlined"
                                ></v-autocomplete>
                            </v-col>
                            <v-col cols="6">
                                <v-autocomplete
                                    item-title="abbreviation"
                                    item-value="id"
                                    label="Drug Admin Route"
                                    hide-details
                                    required
                                    density="compact"
                                    variant="outlined"
                                ></v-autocomplete>
                            </v-col>
                        </v-row>
                        <v-row>
                            <v-col cols="6">
                                <v-text-field
                                    label="Reconstituion"
                                    required
                                    hide-details
                                    density="compact"
                                    variant="outlined"
                                ></v-text-field>
                            </v-col>
                            <v-col cols="6">
                                <v-text-field
                                    label="Stability"
                                    required
                                    hide-details
                                    density="compact"
                                    variant="outlined"
                                ></v-text-field>
                            </v-col>
                        </v-row>
                        <v-row>
                            <v-col cols="6">
                                <v-text-field
                                    label="Storage"
                                    required
                                    hide-details
                                    density="compact"
                                    variant="outlined"
                                ></v-text-field>
                            </v-col>
                            <v-col cols="6">
                                <v-text-field
                                    label="Preparation"
                                    required
                                    hide-details
                                    density="compact"
                                    variant="outlined"
                                ></v-text-field>
                            </v-col>
                        </v-row>
                        <v-row>
                            <v-col cols="6">
                                <v-text-field
                                    label="DOH Code"
                                    required
                                    hide-details
                                    density="compact"
                                    variant="outlined"
                                ></v-text-field>
                            </v-col>
                            <v-col cols="6">
                                <v-text-field
                                    label="Model No."
                                    required
                                    hide-details
                                    density="compact"
                                    variant="outlined"
                                ></v-text-field>
                            </v-col>
                        </v-row>
                        <v-row>
                            <v-col cols="6">
                                <v-autocomplete
                                    item-title="abbreviation"
                                    item-value="id"
                                    label="Drug Administration"
                                    hide-details
                                    required
                                    density="compact"
                                    variant="outlined"
                                ></v-autocomplete>
                            </v-col>
                            <v-col cols="6">
                                <v-autocomplete
                                    item-title="abbreviation"
                                    item-value="id"
                                    label="Antibiotic Class"
                                    hide-details
                                    required
                                    density="compact"
                                    variant="outlined"
                                ></v-autocomplete>
                            </v-col>
                        </v-row>
                        <v-row>
                            <v-col cols="6">
                                <v-autocomplete
                                    item-title="abbreviation"
                                    item-value="id"
                                    label="Generic Name"
                                    hide-details
                                    required
                                    density="compact"
                                    variant="outlined"
                                ></v-autocomplete>
                            </v-col>
                            <v-col cols="6">
                                <v-autocomplete
                                    item-title="abbreviation"
                                    item-value="id"
                                    label="Therapeutic Class"
                                    hide-details
                                    required
                                    density="compact"
                                    variant="outlined"
                                ></v-autocomplete>
                            </v-col>
                        </v-row>
                        <v-row>
                            <v-col cols="12">
                                <v-text-field
                                    label="Stat Percent"
                                    required
                                    hide-details
                                    density="compact"
                                    variant="outlined"
                                ></v-text-field>
                            </v-col>
                        </v-row>
                        <v-row>
                            <v-col cols="6">
                                <v-radio-group hide-details density="compact">
                                    <v-checkbox label="is Supplies" hide-details density="compact"></v-checkbox>
                                    <v-checkbox label="is Medicine" hide-details density="compact"></v-checkbox>
                                    <v-checkbox label="is Fixed Asset" hide-details density="compact"></v-checkbox>
                                    <v-checkbox label="is Reagents" hide-details density="compact"></v-checkbox>
                                    <v-checkbox label="is MDRP" hide-details density="compact"></v-checkbox>
                                    <v-checkbox label="is Consignment" hide-details density="compact"></v-checkbox>
                                    <v-checkbox label="is Serial No. Required" hide-details density="compact"></v-checkbox>
                                    <v-checkbox label="is Expiry Date Required" hide-details density="compact"></v-checkbox>
                                    <v-checkbox label="is For Production" hide-details density="compact"></v-checkbox>
                                </v-radio-group>
                            </v-col>
                            <v-col cols="6">
                                <v-radio-group  hide-details  density="compact">
                                    <v-checkbox label="is Perishable" hide-details density="compact"></v-checkbox>
                                    <v-checkbox label="is Vatable" hide-details density="compact"></v-checkbox>
                                    <v-checkbox label="is Vat Exempt" hide-details density="compact"></v-checkbox>
                                    <v-checkbox label="is Allow Discount" hide-details density="compact"></v-checkbox>
                                    <v-checkbox label="is Zero Rated" hide-details density="compact"></v-checkbox>
                                    <v-checkbox label="is Open Price" hide-details density="compact"></v-checkbox>
                                    <v-checkbox label="is Allow Stat Order" hide-details density="compact"></v-checkbox>
                                    <v-checkbox label="is Stat" hide-details density="compact"></v-checkbox>
                                    <v-checkbox label="is Include in Statement" hide-details density="compact"></v-checkbox>
                                </v-radio-group>
                            </v-col>
                        </v-row>
                    </v-col>
                </v-row>
            </v-card-text>
            <v-divider></v-divider>
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn
                    class="bg-primary text-white"
                    type="submit"
                    @click="submitForm"
                    >Submit</v-btn
                >
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script setup>

const props = defineProps({
    item_supplies_form: {
        type: Boolean,
        required: true,
        default: () => false,
    },
    currentTabValue: {
        type: String,
        required: true,
        default: () => "2",
    },
})

const emits = defineEmits()

const defaultValue = ref("")

const itemGroups = [
    { id: 1, abbreviation: "Drugs and Medicines", value: "2" },
    { id: 2, abbreviation: "Supplies", value: "5" },
    { id: 3, abbreviation: "Assets", value: "6" },
    { id: 4, abbreviation: "Others", value: "3" },
]

const setInitialValue = () => {
    switch (props.currentTabValue) {
        case '2':
        defaultValue.value = 'Drugs and Medicines';
        break;
        case '5':
        defaultValue.value = 'Supplies';
        break;
        case '6':
        defaultValue.value = 'Assets';
        break;
        case '3':
        defaultValue.value = 'Others';
        break;
        default:
        defaultValue.value = '';
    }
};

watch(() => props.currentTabValue, () => {
    setInitialValue();
});

onMounted(() => {
    setInitialValue();    
});

const closeDialog = () => {
    emits('close-dialog')
}

const submitForm = () => {
    alert("Submitted")
}

</script>

<style scoped>
</style>
