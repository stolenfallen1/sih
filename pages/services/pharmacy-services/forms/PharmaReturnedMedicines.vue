<template>
    <v-dialog :model-value="open_returned_medicines" rounded="lg" @update:model-value="closeDialog" max-width="1120px">
        <v-card rounded="lg">
        <v-toolbar density="compact" color="#107bac" hide-details>
            <v-toolbar-title>
                Post Returned Medicines
                {{ patient_type == 2 ? '( OUTPATIENT )' : (patient_type == 5 ? '( EMERGENCY )' : '( INPATIENT )') }}
            </v-toolbar-title>
            <v-spacer></v-spacer>
            <v-btn color="white" @click="closeDialog">
            <v-icon>mdi-close</v-icon>
            </v-btn>
        </v-toolbar>
        <v-divider></v-divider>
        <v-card-text>
            <v-card elevation="4" class="mb-4">
                <v-card-text>
                    <v-row>
                        <v-col cols="3" class="pa-1">
                            <v-row>
                                <v-col cols="12">
                                    <v-text-field
                                        label="Case No."
                                        v-model="payload.caseNo"
                                        variant="outlined"
                                        class="cursor-pointer"
                                        append-icon="mdi-plus-box"
                                        hint="Case No."
                                        density="compact"
                                        hide-details
                                        outlined
                                        focused
                                    ></v-text-field>
                                </v-col>
                            </v-row>
                        </v-col>
                        <v-col :cols="patient_type == 6 ? '5' : '9'" class="pa-1">
                            <v-row>
                                <v-col cols="12">
                                    <v-text-field
                                        label="Patient Name"
                                        v-model="payload.patientName"
                                        variant="outlined"
                                        density="compact"
                                        hide-details
                                        outlined
                                        readonly
                                    ></v-text-field>
                                </v-col>
                            </v-row>
                        </v-col>
                        <v-col v-if="patient_type == 6" cols="2" class="pa-1">
                            <v-row>
                                <v-col cols="12">
                                    <v-text-field
                                        label="Room No."
                                        v-model="payload.room_No"
                                        variant="outlined"
                                        density="compact"
                                        hide-details
                                        outlined
                                        readonly
                                    ></v-text-field>
                                </v-col>
                            </v-row>
                        </v-col>
                        <v-col v-if="patient_type == 6" cols="2" class="pa-1">
                            <v-row>
                                <v-col cols="12">
                                    <v-text-field
                                        label="Station"
                                        v-model="payload.station_No"
                                        variant="outlined"
                                        density="compact"
                                        hide-details
                                        outlined
                                        readonly
                                    ></v-text-field>
                                </v-col>
                            </v-row>
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col cols="3" class="pa-1">
                            <v-row>
                                <v-col cols="12">
                                    <v-text-field
                                        label="Patient ID"
                                        v-model="payload.patient_Id"
                                        variant="outlined"
                                        density="compact"
                                        hide-details
                                        outlined
                                        readonly
                                    ></v-text-field>
                                </v-col>
                            </v-row>
                        </v-col>
                        <v-col cols="3" class="pa-1">
                            <v-row>
                                <v-col cols="12">
                                    <v-text-field
                                        label="ID"
                                        v-model="payload.attending_Doctor"
                                        variant="outlined"
                                        density="compact"
                                        hide-details
                                        outlined
                                        readonly
                                    ></v-text-field>
                                </v-col>
                            </v-row>
                        </v-col>
                        <v-col cols="6" class="pa-1">
                            <v-row>
                                <v-col cols="12">
                                    <v-text-field
                                        label="Requesting Physician"
                                        v-model="payload.attending_Doctor_fullname"
                                        variant="outlined"
                                        density="compact"
                                        hide-details
                                        outlined
                                        readonly
                                    ></v-text-field>
                                </v-col>
                            </v-row>
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col cols="4" class="pa-1">
                            <v-row>
                                <v-col cols="12">
                                    <v-text-field
                                        label="Credit Memo"
                                        v-model="payload.credit_Memo"
                                        variant="outlined"
                                        density="compact"
                                        hide-details
                                        outlined
                                        readonly
                                    ></v-text-field>
                                </v-col>
                            </v-row>
                        </v-col>
                        <v-col cols="4" class="pa-1">
                            <v-row>
                                <v-col cols="12">
                                    <v-text-field
                                        label="Total"
                                        v-model="payload.total"
                                        variant="outlined"
                                        density="compact"
                                        hide-details
                                        outlined
                                        readonly
                                    ></v-text-field>
                                </v-col>
                            </v-row>
                        </v-col>
                        <v-col cols="2" class="pa-1">
                            <v-row>
                                <v-col cols="12">
                                    <v-text-field
                                        label="Age"
                                        v-model="payload.patientAge"
                                        variant="outlined"
                                        density="compact"
                                        hide-details
                                        outlined
                                        readonly
                                    ></v-text-field>
                                </v-col>
                            </v-row>
                        </v-col>
                        <v-col cols="2" class="pa-1">
                            <v-row>
                                <v-col cols="12">
                                    <v-text-field
                                        label="Sex"
                                        v-model="payload.sex"
                                        variant="outlined"
                                        density="compact"
                                        hide-details
                                        outlined
                                        readonly
                                    ></v-text-field>
                                </v-col>
                            </v-row>
                        </v-col>
                    </v-row>
                </v-card-text>
            </v-card>
            <v-card elevation="4">
                <v-card-text>
                    <p>List of Requests</p>
                    <v-table density="compact" height="45vh" class="styled-table">
                        <thead>
                            <tr>
                                <th>Trans Date</th>
                                <th>Encoder</th>
                                <th>Code</th> 
                                <th>Description</th>
                                <th>Quantity</th>
                                <th>Amount</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td> </td>
                                <td> </td>
                                <td> </td>
                                <td> </td>
                                <td> </td>
                                <td> </td>
                            </tr>
                        </tbody>
                    </v-table>
                </v-card-text>
            </v-card>
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions>
            <v-btn color="blue-darken-1 border border-info" @click="closeDialog"> Close </v-btn>
            <v-spacer></v-spacer>
            <v-btn class="bg-primary text-white" type="submit">Submit</v-btn>
        </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script setup>
const props = defineProps({
    open_returned_medicines: {
        type: Boolean,
        default: () => false,
        required: true,
    },
    patient_type: {
        type: Number,
        default: () => '',
        required: true,
    }
});

const { selectedRowDetails } = storeToRefs(useSubcomponentSelectedRowDetailsStore());
const payload = ref({});
const emits = defineEmits(["close-dialog"]);

const closeDialog = () => {
    emits("close-dialog");
};
</script>

<style scoped>
.styled-table th, .styled-table td {
    padding: 8px;
    border: 1px solid #eceaea;
    margin: 0;
}
.input {
    border-bottom: 1px solid #A9A9A9;
    padding: 4px 8px;
}
.styled-table {
    overflow-y: auto;
    scrollbar-width: thin; 
    scrollbar-color: #727272 #f5f5f5; 
}
.styled-table::-webkit-scrollbar {
    width: 12px;
}
.styled-table::-webkit-scrollbar-thumb {
    background-color: #107bac; 
    border-radius: 10px; 
    border: 3px solid #f5f5f5; 
}
.styled-table::-webkit-scrollbar-track {
    background-color: #f5f5f5; 
    border-radius: 10px; 
}
</style>