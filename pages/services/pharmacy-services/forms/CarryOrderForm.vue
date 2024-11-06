<template>
    <v-dialog :model-value="open_carry_order_form" rounded="lg" @update:model-value="closeDialog" max-width="1120px">
        <v-card rounded="lg">
            <v-toolbar density="compact" color="#107bac" hide-details>
                <v-toolbar-title>
                    Adjustment of Posted Medicines
                    {{ patient_type == 2 ? '( OUTPATIENT )' : (patient_type == 5 ? '( EMERGENCY )' : '( INPATIENT )') }}
                </v-toolbar-title>
                <v-spacer></v-spacer>
                <v-btn color="white" @click="closeDialog">
                <v-icon>mdi-close</v-icon>
                </v-btn>
            </v-toolbar>
            <v-card-text>
                <v-card elevation="4" class="mb-4">
                    <v-card-text>
                        <v-row>
                            <v-col cols="4">
                                <v-text-field
                                    label="Patient ID"
                                    variant="outlined"
                                    class="cursor-pointer"
                                    v-model="item.patient_Id"
                                    density="compact"
                                    hide-details
                                ></v-text-field>
                            </v-col>
                            <v-col cols="4">
                                <v-text-field
                                    label="Case No."
                                    variant="outlined"
                                    class="cursor-pointer"
                                    v-model="item.case_No"
                                    density="compact"
                                    hide-details
                                ></v-text-field>
                            </v-col>
                            <v-col cols="4">
                                <v-text-field
                                    label="Request No."
                                    variant="outlined"
                                    class="cursor-pointer"
                                    v-model="item.requestNum"
                                    density="compact"
                                    hide-details
                                ></v-text-field>
                            </v-col>
                        </v-row>
                    </v-card-text>
                </v-card>
                <v-card elevation="4">
                    <v-card-text>
                        <p>List of Requests</p>
                        <v-data-table
                            density="compact"
                            height="60vh"
                            :headers="table_headers"
                            :items="item?.items"  
                            :hover="true"
                            hide-details
                        >
                            <template v-slot:item="{ item }">
                                <tr style="cursor: pointer;">
                                    <td>{{ item.item_Id }}</td>
                                    <td>{{ item.description }}</td>
                                    <td>
                                        {{ item.dosage ? item.dosage?.description : 'N/A' }}
                                    </td>
                                    <td>{{ parseInt(item.Quantity) }}</td>
                                    <td>{{ usePeso(item.amount) }}</td>
                                </tr>
                            </template>
                            <template #bottom></template>
                        </v-data-table>
                    </v-card-text>
                </v-card>
            </v-card-text>
            <v-card-actions>
                <v-btn color="blue-darken-1 border border-info border border-info" @click="closeDialog"> Close </v-btn>
                <v-spacer></v-spacer>
                <v-btn class="bg-primary text-white" @click="onSubmit">Carry Order</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog> 
</template>

<script setup>
const props = defineProps({
    open_carry_order_form: {
        type: Boolean,
        default: () => false,
        required: true,
    },
    patient_type: {
        type: Number,
        default: () => '',
        required: true,
    },
    item: {
        type: Object,
        default: () => {},
        required: true,
    },
});

const payload = ref({});

const table_headers = [
    { title: "Item ID", align: "start", key: "item_Id", sortable: false },
    { title: "Description", align: "start", key: "description", sortable: false },
    { title: "Frequency", align: "start", key: "dosage", sortable: false },
    { title: "Quantity", align: "start", key: "Quantity", sortable: false },
    { title: "Amount", align: "start", key: "amount", sortable: false },
];

const emits = defineEmits(["close-dialog"]);

const closeDialog = () => {
    emits("close-dialog");
};

const onSubmit = () => {
    alert('Carry Order');
}

</script>

<style scoped>
</style>