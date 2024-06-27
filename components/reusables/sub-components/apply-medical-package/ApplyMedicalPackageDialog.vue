<template>
    <v-dialog :model-value="show" rounded="lg" scrollable @update:model-value="closeDialog" max-width="1120px">
        <form @submit.prevent="onSubmit">        
            <v-card rounded="lg">
                <v-toolbar density="compact" color="#107bac" hide-details>
                    <v-toolbar-title>Apply Medical Package {{ selectedRowDetails.id }}</v-toolbar-title>
                    <v-btn color="white" @click="closeDialog">
                        <v-icon>mdi-close</v-icon>
                    </v-btn>
                </v-toolbar>
                <v-divider></v-divider>
                <v-card-text>
                    <v-card elevation="4">
                        <v-card-text>
                            <v-row>
                                <v-col cols="5">
                                    <v-col cols="12">
                                        <v-text-field
                                            label="Patient Name"
                                            v-model="payload.find(item => item.patient_name).patient_name"
                                            variant="outlined"
                                            density="compact"
                                            hide-details
                                            readonly
                                        ></v-text-field>
                                    </v-col>
                                    <v-col cols="12" class="form-col">
                                        <v-text-field
                                            label="Medical Package Type"
                                            variant="outlined"
                                            density="compact"
                                            hide-details
                                            :append-icon="finalized_package ? '' : 'mdi-plus-box'"   
                                            @click:append="openMedicalPackageType"
                                            class="cursor-pointer" 
                                            readonly
                                        ></v-text-field>
                                    </v-col>
                                    <v-col cols="12" class="form-col">
                                        <v-text-field
                                            label="Medical Package Amount"
                                            type="number"
                                            variant="outlined"
                                            density="compact"
                                            hide-details
                                            readonly
                                        ></v-text-field>
                                    </v-col>
                                    <v-col cols="12" class="form-col">
                                        <v-text-field
                                            label="Room Days Credit"
                                            type="number"
                                            variant="outlined"
                                            density="compact"
                                            hide-details
                                            readonly
                                        ></v-text-field>
                                    </v-col>
                                    <v-col cols="12" class="form-col">
                                        <v-row>
                                            <v-col cols="6">
                                                <v-checkbox label=" With PHIC Benefits?" density="compact" hide-details></v-checkbox>
                                            </v-col>
                                            <v-col cols="6">
                                                <v-checkbox v-model="finalized_package" label=" Finalized Package?" density="compact" hide-details></v-checkbox>
                                            </v-col>
                                        </v-row>
                                    </v-col>
                                </v-col>
                                <v-col cols="3">
                                    <v-col cols="12">
                                        <v-text-field
                                            label="DR(CR) Amount Items"
                                            type="number"
                                            variant="outlined"
                                            density="compact"
                                            hide-details
                                            readonly
                                        ></v-text-field>
                                    </v-col>
                                    <v-col cols="12" class="form-col">
                                        <v-text-field
                                            label="DR(CR) Amount Rooms"
                                            type="number"
                                            variant="outlined"
                                            density="compact"
                                            hide-details
                                            readonly
                                        ></v-text-field>
                                    </v-col>
                                    <v-col cols="12" class="form-col">
                                        <v-text-field
                                            label="Total DR(CR) Amount"
                                            type="number"
                                            variant="outlined"
                                            density="compact"
                                            hide-details
                                            readonly
                                        ></v-text-field>
                                    </v-col>
                                    <v-col cols="12" class="form-col">
                                        <v-text-field
                                            label="For DR(CR) Adjustment"
                                            type="number"
                                            variant="outlined"
                                            density="compact"
                                            hide-details
                                            readonly
                                        ></v-text-field>
                                    </v-col>
                                </v-col>
                                <v-col cols="4">
                                    <v-card elevation="4">
                                        <v-toolbar density="compact" hide-details>
                                            <v-toolbar-title class="toolbar-title">Posted Medical Package</v-toolbar-title>
                                        </v-toolbar>
                                        <v-card-text>
                                            <v-table>
                                                <thead>
                                                    <tr>
                                                        <th>Package Description</th>
                                                        <th>Price</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <tr>
                                                        <th>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Reiciendis, earum.</th>
                                                        <th>1000</th>
                                                    </tr>
                                                </tbody>
                                            </v-table>
                                        </v-card-text>
                                    </v-card>
                                </v-col>
                            </v-row>
                        </v-card-text>
                    </v-card>
                    <v-card elevation="4" class="mt-4">
                        <v-tabs 
                            v-model="tab"
                            color="primary"
                        >
                            <v-tab v-if="!finalized_package" value="0"><v-icon start>mdi-form-select</v-icon>Items and Services</v-tab>
                            <v-tab v-if="!finalized_package" value="1"><v-icon start>mdi-form-select</v-icon>Rooms and Beds</v-tab>
                            <v-tab v-if="finalized_package" value="2"><v-icon start>mdi-form-select</v-icon>Finalized Package</v-tab>
                        </v-tabs>
                        <v-card-text>
                            <v-window v-model="tab">
                                <v-window-item v-if="!finalized_package" class="pa-1">
                                    <v-table height="60vh">
                                        <thead>
                                            <tr>
                                                <th>Document Date</th>
                                                <th>Document No</th>
                                                <th>Item ID</th>
                                                <th>Item Description</th>
                                                <th>Department</th>
                                                <th>Item Price</th>
                                                <th>PHIC Amount</th>
                                                <th>Rendered Qty</th>
                                                <th>Applied Qty</th>
                                                <th>Qty Balance</th>
                                                <th>For Allocation</th>
                                                <th width="4"></th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <!-- contents -->
                                            </tr>
                                        </tbody>
                                    </v-table>
                                </v-window-item>
                                <v-window-item v-if="!finalized_package" class="pa-1">
                                    <v-table height="60vh">
                                        <thead>
                                            <tr>
                                                <th>Reference Date</th>
                                                <th>Room No</th>
                                                <th>Bed No</th>
                                                <th>Room Rate</th>
                                                <th>No. Of Days</th>
                                                <th>Applied Qty</th>
                                                <th>Qty. Balance</th>
                                                <th>For Allocation</th>
                                                <th width="4"></th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <!-- contents -->
                                            </tr>
                                        </tbody>
                                    </v-table>
                                </v-window-item>
                                <v-window-item v-if="finalized_package" class="pa-1">
                                    <v-expansion-panels
                                        v-model="panel"
                                        multiple
                                    >
                                        <v-expansion-panel>
                                            <v-expansion-panel-title class="expansion-title">Items and Services</v-expansion-panel-title>
                                            <v-expansion-panel-text>
                                                <v-table height="60vh">
                                                    <thead>
                                                        <tr>
                                                            <th>Document Date</th>
                                                            <th>Document No</th>
                                                            <th>Department</th>
                                                            <th>Item Description</th>
                                                            <th>Item Price</th>
                                                            <th>Rendered Qty</th>
                                                            <th>Package Qty</th>
                                                            <th>Total Price</th>
                                                            <th>PHIC Amount</th>
                                                            <th>Package Covered Amount</th>
                                                            <th>Excess Amount</th>
                                                            <th width="4"></th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        <tr>
                                                            <!-- contents -->
                                                        </tr>
                                                    </tbody>
                                                </v-table>
                                            </v-expansion-panel-text>
                                        </v-expansion-panel>
                                        <v-expansion-panel>
                                            <v-expansion-panel-title class="expansion-title">Rooms and Beds</v-expansion-panel-title>
                                            <v-expansion-panel-text>
                                                <v-table height="60vh">
                                                    <thead>
                                                        <tr>
                                                            <th>Reference Date</th>
                                                            <th>Room No</th>
                                                            <th>Bed No</th>
                                                            <th>No. Of Days</th>
                                                            <th>Room Rate</th>
                                                            <th>Amount</th>
                                                            <th>Applied Qty</th>
                                                            <th>PHIC Amount</th>
                                                            <th>Package Covered Amount</th>
                                                            <th>Excess Amount</th>
                                                            <th width="4"></th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        <tr>
                                                            <!-- contents -->
                                                        </tr>
                                                    </tbody>
                                                </v-table>
                                            </v-expansion-panel-text>
                                        </v-expansion-panel>
                                    </v-expansion-panels>
                                </v-window-item>
                            </v-window>
                        </v-card-text>
                    </v-card>
                </v-card-text>
                <v-divider></v-divider>
                <v-card-actions>
                    <v-btn color="blue-darken-1 border border-info" @click="closeDialog"> Close </v-btn>
                    <v-spacer></v-spacer>
                    <v-btn :disabled="!finalized_package"class="bg-primary text-white" type="submit">Finalized Package</v-btn>
                    <v-btn :disabled="finalized_package"class="bg-primary text-white" type="submit">Post To Patient Account</v-btn>
                </v-card-actions>
            </v-card>
        </form>
        <ApplyMedicalPackage :open_medical_package_type="open_medical_package_type" @close-dialog="closeMedicalPackageType" @handle-submit="handleSelectMedicalPackageType" />
    </v-dialog>
    
</template>

<script setup>
import ApplyMedicalPackage from './sub-forms/ApplyMedicalPackage.vue';

const props = defineProps({
    show: {
        type: Boolean,
        default: () => false,
        required: true,
    },
});

const { selectedRowDetails } = storeToRefs(useSubcomponentSelectedRowDetailsStore()); 

const finalized_package = ref(false);

const open_medical_package_type = ref(false);

const payload = ref([
    {
        patient_name: 'John Doe',
    },
]);

let tab = ref("0");
const panel = ref([0, 1]);

const onSubmit = () => {
    alert('Submit');
}

const emits = defineEmits(['close-dialog'])

const openMedicalPackageType = () => {
    open_medical_package_type.value = true;
}
const handleSelectMedicalPackageType = () => {
    alert("TEST");
}
const closeMedicalPackageType = () => {
    open_medical_package_type.value = false;
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
.expansion-title {
    font-size: 16px; 
    font-style: italic;
}
</style>