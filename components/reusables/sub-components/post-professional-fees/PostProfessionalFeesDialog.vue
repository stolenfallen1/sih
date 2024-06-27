<template>
    <v-dialog :model-value="show" rounded="lg" scrollable @update:model-value="closeDialog" max-width="1120px">
        <form @submit.prevent="onSubmit">
            <v-card rounded="lg">
                <v-toolbar density="compact" color="#107bac" hide-details>
                    <v-toolbar-title>Post Professional Fees {{ selectedRowDetails.id }}</v-toolbar-title>
                    <v-btn color="white" @click="closeDialog">
                        <v-icon>mdi-close</v-icon>
                    </v-btn>
                </v-toolbar>
                <v-card-text>
                    <v-card elevation="4">
                        <v-toolbar density="compact" hide-details> 
                            <v-toolbar-title class="toolbar-title">Registry Case Basic Information</v-toolbar-title>
                        </v-toolbar>
                        <v-card-text>
                            <v-row>
                                <v-col cols="6">
                                    <v-text-field 
                                        label="Patient Name"
                                        v-model="payload.find(item => item.patient_name).patient_name"
                                        variant="outlined" 
                                        density="compact" 
                                        hide-details 
                                        readonly
                                    ></v-text-field>
                                </v-col>
                                <v-col cols="6">
                                    <v-text-field 
                                        label="Registry Case Type" 
                                        v-model="payload.find(item => item.registry_case_type).registry_case_type"
                                        variant="outlined" 
                                        density="compact" 
                                        hide-details 
                                        readonly
                                    ></v-text-field>
                                </v-col>
                                <v-col cols="6">
                                    <v-text-field 
                                        label="Patient ID"
                                        v-model="selectedRowDetails.id" 
                                        variant="outlined" 
                                        density="compact" 
                                        hide-details 
                                        readonly
                                    ></v-text-field>
                                </v-col>
                                <v-col cols="6">
                                    <v-text-field 
                                        label="Outpatient Case No." 
                                        v-model="payload.find(item => item.registry_case_no).registry_case_no"
                                        variant="outlined" 
                                        density="compact" 
                                        hide-details 
                                        readonly
                                    ></v-text-field>
                                </v-col>
                            </v-row>
                            <v-row>
                                <v-col cols="6">
                                    <v-textarea 
                                        label="Remarks per doctor" 
                                        placeholder="Enter remarks per doctor here..."
                                        v-model="payload.remarks_per_doctor"
                                        variant="outlined" 
                                        density="compact" 
                                        hide-details
                                    ></v-textarea>
                                    <v-col cols="12">
                                        <v-checkbox v-model="payload.isSeniorDiscount" label="Apply Senior Citizen Discount (Net of VAT)" density="compact" hide-details></v-checkbox>
                                    </v-col>
                                </v-col>
                                <v-col cols="6">
                                    <v-col cols="12">
                                        <v-text-field 
                                            type="date"
                                            label="Registry Case Date" 
                                            v-model="payload.find(item => item.registry_case_date).registry_case_date"
                                            variant="outlined" 
                                            density="compact" 
                                            hide-details 
                                            readonly
                                        ></v-text-field>
                                    </v-col>
                                    <v-col cols="12">
                                        <v-text-field 
                                            type="date"
                                            label="Posting Reference Date" 
                                            v-model="payload.posting_reference_date"
                                            variant="outlined" 
                                            density="compact" 
                                            hide-details
                                        ></v-text-field>
                                    </v-col>
                                </v-col>
                            </v-row>
                        </v-card-text>
                    </v-card>
                    <v-card elevation="4" class="mt-4">
                        <v-toolbar density="compact" hide-details>
                            <v-toolbar-title class="toolbar-title">Professional Fee Posting Details</v-toolbar-title>
                        </v-toolbar>
                        <v-card-text>
                            <v-row>
                                <v-col cols="12">
                                    <v-table density="compact" height="60vh" class="table-container" hover="true">
                                        <thead>
                                            <tr>
                                                <th width="4"></th>
                                                <th>Doctor Name</th>
                                                <th>Specializations</th>
                                                <th>PHIC Type</th>
                                                <th>PF Amount</th>
                                                <th>Other Amount</th>
                                                <th>Instrument Fee</th>
                                                <th>SC / PWD Discount</th>
                                                <th>Discount</th>
                                                <th>Net Amount</th>
                                                <th>Total Credit</th>
                                                <th>Output Tax</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <template>
                                                <tr class="cursor-pointer">
                                                    <!-- contents -->
                                                </tr>
                                            </template>
                                        </tbody>
                                    </v-table>
                                </v-col>
                                <v-divider></v-divider>
                            </v-row>
                        </v-card-text>
                        <v-divider></v-divider>
                        <v-card-actions>
                            <v-btn color="blue-darken-1 border border-info" @click.prevent="openSelectDoctor">+<v-icon>mdi-doctor</v-icon> Add Doctor </v-btn>
                        </v-card-actions>
                    </v-card>
                </v-card-text>
                <v-divider></v-divider>
                <v-card-actions>
                    <v-btn color="blue-darken-1 border border-info" @click="closeDialog"> Close </v-btn>
                    <v-spacer></v-spacer>
                    <v-btn class="bg-primary text-white" type="submit">Post</v-btn>
                </v-card-actions>
            </v-card>
        </form>
    </v-dialog>
    <select-doctor :open_select_doctor="open_select_doctor" @close-dialog="closeSelectDoctor" @handle-submit="handleSelectDoctor" />
</template>

<script setup>
import SelectDoctor from './sub-forms/SelectDoctor.vue';

const props = defineProps({
    show: {
        type: Boolean,
        default: () => false,
        required: true,
    },
});

const open_select_doctor = ref(false);


const { selectedRowDetails } = storeToRefs(useSubcomponentSelectedRowDetailsStore()); 

const payload = ref([
    {
        patient_name: 'John Doe',
    },
    {
        registry_case_type: 'Outpatient',
    },
    {
        registry_case_no: '666',
    },
    {
        registry_case_date: '2024-04-12',
    },
]);

const emits = defineEmits(['close-dialog'])

const openSelectDoctor = () => {
    open_select_doctor.value = true;
}
const handleSelectDoctor = () => {
    alert('Doctor Selected');
}
const closeSelectDoctor = () => {
    open_select_doctor.value = false;
}

const onSubmit = () => {
    alert('Post Professional Fees Submitted');
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
</style>