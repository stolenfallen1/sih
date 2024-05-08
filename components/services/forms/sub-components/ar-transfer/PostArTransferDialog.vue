<template>
    <v-dialog :model-value="show" rounded="lg" scrollable @update:model-value="closeDialog" max-width="900px">
        <form @submit.prevent="onSubmit">
            <v-card>
                <v-toolbar density="compact" color="#6984ff" hide-details>
                    <v-toolbar-title>Post A/R Transfer {{ selectedRowDetails.id }}</v-toolbar-title>
                    <v-btn color="white" @click="closeDialog">
                        <v-icon>mdi-close</v-icon>
                    </v-btn>
                </v-toolbar>
                <v-card-text>
                    <v-card elevation="4">
                        <v-toolbar density="compact" hide-details>
                            <v-toolbar-title class="toolbar-title">Patient Registry Information</v-toolbar-title>
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
                                        label="Patient ID" 
                                        v-model="selectedRowDetails.id"
                                        variant="outlined" 
                                        density="compact" 
                                        hide-details 
                                        readonly
                                    ></v-text-field>
                                </v-col>
                                <v-col cols="4" class="form-col">
                                    <v-text-field 
                                        label="Outpatient No." 
                                        v-model="payload.find(item => item.outpatient_case_no).outpatient_case_no"
                                        variant="outlined" 
                                        density="compact" 
                                        hide-details 
                                        readonly
                                    ></v-text-field>
                                </v-col>
                                <v-col cols="4" class="form-col">
                                    <v-text-field 
                                        label="Registry Case Type" 
                                        v-model="payload.find(item => item.registry_case_type).registry_case_type"
                                        variant="outlined" 
                                        density="compact" 
                                        hide-details 
                                        readonly
                                    ></v-text-field>
                                </v-col>
                                <v-col cols="4" class="form-col">
                                    <v-text-field 
                                        type="date"
                                        label="Outpatient Date" 
                                        v-model="payload.find(item => item.outpatient_date).outpatient_date"
                                        variant="outlined" 
                                        density="compact" 
                                        hide-details 
                                        readonly
                                    ></v-text-field>
                                </v-col>
                                <v-col cols="6" class="form-col">
                                    <v-text-field 
                                        label="Room No." 
                                        v-model="payload.find(item => item.room_no).room_no"
                                        variant="outlined" 
                                        density="compact" 
                                        hide-details 
                                        readonly
                                    ></v-text-field>
                                </v-col>
                                <v-col cols="6" class="form-col">
                                    <v-text-field 
                                        label="Bed No." 
                                        v-model="payload.find(item => item.bed_no).bed_no"
                                        variant="outlined" 
                                        density="compact" 
                                        hide-details 
                                        readonly
                                    ></v-text-field>
                                </v-col>
                            </v-row>
                        </v-card-text>
                    </v-card>
                    <v-card elevation="4" class="mt-4">
                        <v-toolbar density="compact" hide-details>
                            <v-toolbar-title class="toolbar-title">A/R Transfer. Billing Ledger Information</v-toolbar-title>
                        </v-toolbar>
                        <v-card-text>
                            <v-row>
                                <v-col cols="4">
                                    <v-autocomplete
                                        item-title="guarantor_name"
                                        v-model="payload.guarantor_name"
                                        item-value="id"
                                        label="Guarantor Name"
                                        hide-details
                                        clearable
                                        :items="[]"
                                        density="compact"
                                        variant="outlined"
                                    ></v-autocomplete>
                                </v-col>
                                <v-col cols="4">
                                    <v-text-field 
                                        type="date"
                                        label="Date Posted" 
                                        v-model="payload.date_posted"
                                        variant="outlined" 
                                        density="compact" 
                                        hide-details 
                                    ></v-text-field>
                                </v-col>
                                <v-col cols="4">
                                    <v-text-field 
                                        type="date"
                                        label="Date Due" 
                                        v-model="payload.date_due"
                                        variant="outlined" 
                                        density="compact" 
                                        hide-details 
                                    ></v-text-field>
                                </v-col>
                                <v-row class="px-4">
                                    <v-col cols="6">                                        
                                        <v-card elevation="2">
                                            <v-card-text>
                                                <v-col cols="12" class="form-col">
                                                    <v-text-field 
                                                        label="Debit"
                                                        v-model="payload.debit"
                                                        variant="outlined" 
                                                        density="compact" 
                                                        hide-details 
                                                        readonly
                                                    ></v-text-field>
                                                </v-col>
                                                <v-col cols="12" class="form-col">
                                                    <v-text-field 
                                                        label="Credit"
                                                        v-model="payload.credit"
                                                        variant="outlined" 
                                                        density="compact" 
                                                        hide-details 
                                                        readonly
                                                    ></v-text-field>
                                                </v-col>
                                                <v-col cols="12" class="form-col">
                                                    <v-text-field 
                                                        label="Balance"
                                                        v-model="payload.find(item => item.balance).balance"
                                                        variant="outlined" 
                                                        density="compact" 
                                                        hide-details 
                                                        readonly
                                                    ></v-text-field>
                                                </v-col>
                                            </v-card-text>
                                        </v-card>
                                    </v-col>
                                    <v-col cols="6">
                                        <v-card elevation="2">
                                            <v-card-text>
                                                <v-col cols="12" class="form-col">
                                                    <v-text-field 
                                                        label="Items and Services"
                                                        v-model="payload.find(item => item.items_and_services).items_and_services"
                                                        variant="outlined" 
                                                        density="compact" 
                                                        hide-details 
                                                        readonly
                                                    ></v-text-field>
                                                </v-col>
                                                <v-col cols="12" class="form-col">
                                                    <v-text-field 
                                                        label="Professional Fees"
                                                        v-model="payload.find(item => item.professional_fees).professional_fees"
                                                        variant="outlined" 
                                                        density="compact" 
                                                        hide-details 
                                                        readonly
                                                    ></v-text-field>
                                                </v-col>
                                                <v-col cols="12" class="form-col">
                                                    <v-text-field 
                                                        label="Rooms and Beds"
                                                        v-model="payload.find(item => item.rooms_and_beds).rooms_and_beds"
                                                        variant="outlined" 
                                                        density="compact" 
                                                        hide-details 
                                                        readonly
                                                    ></v-text-field>
                                                </v-col>
                                                <v-col cols="12" class="form-col">
                                                    <v-text-field 
                                                        label="Miscellaneous"
                                                        v-model="payload.find(item => item.miscellaneous).miscellaneous"
                                                        variant="outlined" 
                                                        density="compact" 
                                                        hide-details 
                                                        readonly
                                                    ></v-text-field>
                                                </v-col>                                     
                                                <v-col cols="12" class="form-col">
                                                    <v-text-field 
                                                        label="Total Amount Transfer"
                                                        v-model="payload.find(item => item.total_amount_transfer).total_amount_transfer"
                                                        variant="outlined" 
                                                        density="compact" 
                                                        hide-details 
                                                        readonly
                                                    ></v-text-field>
                                                </v-col>
                                            </v-card-text>
                                        </v-card>
                                    </v-col>
                                </v-row>
                                <v-col cols="12">
                                    <v-textarea
                                        label="Remarks"
                                        v-model="payload.remarks"
                                        variant="outlined" 
                                        density="compact" 
                                        hide-details 
                                    ></v-textarea>
                                </v-col>
                            </v-row>
                        </v-card-text>
                    </v-card>
                </v-card-text>
                <v-card-actions>
                    <v-btn color="blue-darken-1 border border-info" @click="closeDialog"> Close </v-btn>
                    <v-spacer></v-spacer>
                    <v-btn class="bg-info text-white" @click="openTagTransactions">Tag transactions</v-btn>
                    <v-btn class="bg-primary text-white" type="submit">Post</v-btn>
                </v-card-actions>
            </v-card>
        </form>
    </v-dialog>
    <TransferTagging :open_tag_transactions="open_tag_transactions" @close-dialog="closeTagTransactions" />
</template>

<script setup>
import TransferTagging from './sub-forms/TransferTagging.vue';

const props = defineProps({
    show: {
        type: Boolean,
        default: () => false,
        required: true,
    },
});

const open_tag_transactions = ref(false); 
const payload = ref([
    {
        patient_name: 'John Doe',
    },
    {
        registry_case_type: 'Outpatient',
    },
    {
        outpatient_case_no: '123',
    },
    {
        outpatient_date: '2024-04-15',
    },
    {
        room_no: 'N/A',
    },
    {
        bed_no: 'N/A',
    },
    {
        balance: '0.00',
    },
    {
        items_and_services: '0.00',
    },
    {
        professional_fees: '0.00',
    },
    {
        rooms_and_beds: '0.00',
    },
    {
        miscellaneous: '0.00',
    },
    {
        total_amount_transfer: '0.00',
    },
]);

const { selectedRowDetails } = storeToRefs(useSubcomponentSelectedRowDetailsStore()); 

const emits = defineEmits(['close-dialog'])

const openTagTransactions = () => {
    open_tag_transactions.value = true;
}
const closeTagTransactions = () => {
    open_tag_transactions.value = false;
}   

const onSubmit = () => {
    alert("Submit");
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