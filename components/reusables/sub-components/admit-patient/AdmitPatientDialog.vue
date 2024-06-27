<template>
    <v-dialog :model-value="show" rounded="lg" scrollable @update:model-value="closeDialog" max-width="600px">
        <form @submit.prevent="onSubmit">        
            <v-card rounded="lg">
                <v-toolbar density="compact" color="#107bac" hide-details>
                    <v-toolbar-title>Admit Patient / Transfer to Inpatient {{ selectedRowDetails.id }}</v-toolbar-title>
                    <v-btn color="white" @click="closeDialog">
                        <v-icon>mdi-close</v-icon>
                    </v-btn>
                </v-toolbar>
                <v-divider></v-divider>
                <v-card-text>
                    <v-card elevation="4">
                        <v-card-text>
                            <p>
                                <span style="font-weight: bold; font-style: italic;" >NOTE: </span>You are about to change the type of the selected registry account to "Inpatient"
                                with information displayed below. Please take note that succeeding transactions shall follow the new registry type, However, all transactions done
                                prior to the changing of type will be "as is" for accounting purposes.
                            </p><br/>
                            <p>Registry Case No. will also be generated based on the registry type but the old registry number is stamped in the equivalent table for recording purposes.</p>
                        </v-card-text>
                    </v-card>
                    <v-row class="mt-2">
                        <v-col cols="12">
                            <v-text-field
                                label="Registry Type"
                                v-model="payload.find(item => item.registry_case_type).registry_case_type"
                                variant="outlined"
                                density="compact"
                                hide-details
                                readonly
                            ></v-text-field>
                        </v-col>
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
                        <v-col cols="12">
                            <v-text-field
                                :label="form_type === 'outpatient' ? 'OPD Case No.' : 'ER Case No.'"
                                v-model="payload.find(item => item.case_no).case_no"
                                variant="outlined"
                                density="compact"
                                hide-details
                                readonly
                            ></v-text-field>
                        </v-col>
                        <v-col cols="12">
                            <v-text-field
                                type="date"
                                :label="form_type === 'outpatient' ? 'Outpatient Case Date' : 'ER Case Date'"
                                v-model="payload.find(item => item.case_date).case_date"
                                variant="outlined"
                                density="compact"
                                hide-details
                                readonly
                            ></v-text-field>
                        </v-col>
                        <v-col cols="12">
                            <v-text-field
                                label="Balance Amount"
                                v-model="payload.find(item => item.account_balance).account_balance"
                                variant="outlined"
                                density="compact"
                                hide-details
                                readonly
                            ></v-text-field>
                        </v-col>
                    </v-row>
                </v-card-text>
                <v-divider></v-divider>
                <v-card-actions>
                    <v-btn color="blue-darken-1 border border-info" @click="closeDialog"> Close </v-btn>
                    <v-spacer></v-spacer>
                    <v-btn class="bg-primary text-white" type="submit">Admit</v-btn>
                </v-card-actions>
            </v-card>
        </form>
    </v-dialog>
</template>

<script setup>
const props = defineProps({
    show: {
        type: Boolean,
        default: () => false,
        required: true,
    },
    form_type: {
        type: String,
        default: () => '',
    },
});

const { selectedRowDetails } = storeToRefs(useSubcomponentSelectedRowDetailsStore()); 

const payload = ref([
    {
        patient_name: 'John Doe',
    },
    {
        registry_case_type: 'Outpatient',
    },
    {
        case_no: '123',
    },
    {
        case_date: '2024-04-15',
    },
    {
        account_balance: '00.00',
    },
]);

const onSubmit = () => {
    alert('Submit');
}

const emits = defineEmits(['close-dialog'])

const closeDialog = () => {
    emits('close-dialog');
}
</script>

<style scoped>
</style>