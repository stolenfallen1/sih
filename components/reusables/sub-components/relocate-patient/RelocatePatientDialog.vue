<template>
    <v-dialog :model-value="show" rounded="lg" scrollable @update:model-value="closeDialog" max-width="600px">
        <form @submit.prevent="onSubmit">
            <v-card rounded="lg">
                <v-toolbar density="compact" color="#107bac" hide-details>
                    <v-toolbar-title>Relocate Patient {{ selectedRowDetails.id }}</v-toolbar-title>
                    <v-btn color="white" @click="closeDialog">
                        <v-icon>mdi-close</v-icon>
                    </v-btn>
                </v-toolbar>
                <v-divider></v-divider>
                <v-card-text>
                    <v-card elevation="4">
                        <v-toolbar density="compact" hide-details>
                            <v-toolbar-title class="toolbar-title">Registry Information</v-toolbar-title>
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
                                        label="Admission No." 
                                        v-model="payload.find(item => item.admission_no).admission_no"
                                        variant="outlined" 
                                        density="compact" 
                                        hide-details 
                                        readonly
                                    ></v-text-field>
                                </v-col>
                                <v-col cols="6" class="form-col">
                                    <v-text-field 
                                        type="date"
                                        label="Admission Date" 
                                        v-model="payload.find(item => item.admission_date).admission_date"
                                        variant="outlined" 
                                        density="compact" 
                                        hide-details 
                                        readonly
                                    ></v-text-field>
                                </v-col>
                                <v-col cols="6" class="form-col">
                                    <v-text-field 
                                        type="date"
                                        label="Relocation Date" 
                                        v-model="payload.find(item => item.relocation_date).relocation_date"
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
                            <v-toolbar-title class="toolbar-title">Relocate Patient From</v-toolbar-title>
                        </v-toolbar>
                        <v-card-text>
                            <v-row>
                                <v-col cols="12">
                                    <v-autocomplete
                                        label="Building Name"
                                        v-model="payload.building_name_from"
                                        variant="outlined"
                                        density="compact"
                                        hide-details
                                    ></v-autocomplete>
                                </v-col>
                                <v-col cols="12" class="form-col">
                                    <v-autocomplete
                                        label="Floor Level"
                                        v-model="payload.floor_level_from"
                                        variant="outlined"
                                        density="compact"
                                        hide-details
                                    ></v-autocomplete>
                                </v-col>
                                <v-col cols="12" class="form-col">
                                    <v-autocomplete
                                        label="Nurse Station"
                                        v-model="payload.nurse_station_from"
                                        variant="outlined"
                                        density="compact"
                                        hide-details
                                    ></v-autocomplete>
                                </v-col>
                                <v-col cols="12" class="form-col">
                                    <v-autocomplete
                                        label="Room Type"
                                        v-model="payload.room_type_from"
                                        variant="outlined"
                                        density="compact"
                                        hide-details
                                    ></v-autocomplete>
                                </v-col>
                                <v-col cols="12" class="form-col">
                                    <v-autocomplete
                                        label="Room No."
                                        v-model="payload.room_no_from"
                                        variant="outlined"
                                        density="compact"
                                        hide-details
                                    ></v-autocomplete>
                                </v-col>
                                <v-col cols="12" class="form-col">
                                    <v-autocomplete
                                        label="Bed No."
                                        variant="outlined"
                                        v-model="payload.bed_no_from"
                                        density="compact"
                                        hide-details
                                    ></v-autocomplete>
                                </v-col>
                            </v-row>
                        </v-card-text>
                    </v-card>
                    <v-card elevation="4" class="mt-4">
                        <v-toolbar density="compact" hide-details>
                            <v-toolbar-title class="toolbar-title">Relocate Patient To</v-toolbar-title>
                        </v-toolbar>
                        <v-card-text>
                            <v-row>
                                <v-col cols="12">
                                    <v-autocomplete
                                        label="Building Name"
                                        v-model="payload.building_name_to"
                                        variant="outlined"
                                        density="compact"
                                        hide-details
                                    ></v-autocomplete>
                                </v-col>
                                <v-col cols="12" class="form-col">
                                    <v-autocomplete
                                        label="Floor Level"
                                        v-model="payload.floor_level_to"
                                        variant="outlined"
                                        density="compact"
                                        hide-details
                                    ></v-autocomplete>
                                </v-col>
                                <v-col cols="12" class="form-col">
                                    <v-autocomplete
                                        label="Nurse Station"
                                        v-model="payload.nurse_station_to"
                                        variant="outlined"
                                        density="compact"
                                        hide-details
                                    ></v-autocomplete>
                                </v-col>
                                <v-col cols="12" class="form-col">
                                    <v-autocomplete
                                        label="Room Type"
                                        v-model="payload.room_type_to"
                                        variant="outlined"
                                        density="compact"
                                        hide-details
                                    ></v-autocomplete>
                                </v-col>
                                <v-col cols="12" class="form-col">
                                    <v-autocomplete
                                        label="Room No."
                                        v-model="payload.room_no_to"
                                        variant="outlined"
                                        density="compact"
                                        hide-details
                                    ></v-autocomplete>
                                </v-col>
                                <v-col cols="12" class="form-col">
                                    <v-autocomplete
                                        label="Bed No."
                                        v-model="payload.bed_no_to"
                                        variant="outlined"
                                        density="compact"
                                        hide-details
                                    ></v-autocomplete>
                                </v-col>
                            </v-row>
                        </v-card-text>
                    </v-card>
                </v-card-text>
                <v-divider></v-divider>
                <v-card-actions>
                    <v-btn color="blue-darken-1 border border-info" @click="closeDialog"> Close </v-btn>
                    <v-spacer></v-spacer>
                    <v-btn class="bg-primary text-white" type="submit">Relocate Patient</v-btn>
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
});

const { selectedRowDetails } = storeToRefs(useSubcomponentSelectedRowDetailsStore()); 

const payload = ref([
    {
        patient_name: 'John Doe',
    },
    {
        admission_no: '123',
    },
    {
        admission_date: '2024-04-15',
    },
    {
        relocation_date: '2024-04-20',
    },
    {
        debit: '00.00',
    },
    {
        credit: '00.00',
    },
    {
        account_balance: '00.00',
    },
]);

const onSubmit = () => {
    alert("Test!");
    emits('closeDialog');
};

const emits = defineEmits(['close-dialog'])

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