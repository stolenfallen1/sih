<template>
    <v-container>
        <v-row style="display: flex; align-items: center">
            <p>Date and Time of Delivery</p>
            <v-col cols="4">
                <v-text-field
                    label="Date"
                    type="date"
                    v-model="payload.delivery_date"
                    variant="outlined"
                    density="compact"
                    hide-details
                ></v-text-field>
            </v-col>
            <v-col cols="4">
                <v-text-field
                    label="Time"
                    v-model="payload.delivery_time"
                    variant="outlined"
                    density="compact"
                    hide-details
                ></v-text-field>
            </v-col>
        </v-row>
        <v-row style="display: flex; align-items: center">
            <p>Maternal Outcome</p>
            <v-col cols="2">
                <v-text-field
                    label="Obstetric Index"
                    v-model="payload.obstetric_index"
                    variant="outlined"
                    density="compact"
                    hide-details
                ></v-text-field>
            </v-col>
            <p>Pregnancy Uterine</p>
            <v-col cols="2">
                <v-text-field
                    label="AOG by LMP"
                    v-model="payload.aog_by_lmp"
                    variant="outlined"
                    density="compact"
                    hide-details
                ></v-text-field>
            </v-col>
            <v-col cols="2">
                <v-text-field
                    label="Manner of Delivery"
                    v-model="payload.manner_of_delivery"
                    variant="outlined"
                    density="compact"
                    hide-details
                ></v-text-field>
            </v-col>
            <v-col cols="2">
                <v-text-field
                    label="Presentation"
                    v-model="payload.presentation"
                    variant="outlined"
                    density="compact"
                    hide-details
                ></v-text-field>
            </v-col>
        </v-row>
        <v-row style="display: flex; align-items: center">
            <p>Birth Outcome</p>
            <v-col cols="3">
                <v-text-field
                    label="Fetal Outcome"
                    v-model="payload.fetal_outcome"
                    variant="outlined"
                    density="compact"
                    hide-details
                ></v-text-field>
            </v-col>
            <v-col cols="2">
                <v-text-field
                    label="Sex"
                    v-model="payload.sex"
                    variant="outlined"
                    density="compact"
                    hide-details
                ></v-text-field>
            </v-col>
            <v-col cols="2">
                <v-text-field
                    label="Birth Weight (grm)"
                    v-model="payload.birth_weight"
                    variant="outlined"
                    density="compact"
                    hide-details
                ></v-text-field>
            </v-col>
            <v-col cols="3">
                <v-text-field
                    label="APGAR Score"
                    v-model="payload.apgar_score"
                    variant="outlined"
                    density="compact"
                    hide-details
                ></v-text-field>
            </v-col>
        </v-row>
        <v-row style="display: flex; align-items: center">
            <p>Scheduled Postpartum follow-up consultation 1 week after delivery</p>
            <v-col cols="6">
                <v-text-field
                    label=""
                    v-model="payload.delivery_date"
                    variant="outlined"
                    density="compact"
                    hide-details
                ></v-text-field>
            </v-col>
        </v-row>
        <v-row style="display: flex; align-items: center">
            <p>Date and Time of Discharge</p>
            <v-col cols="3">
                <v-text-field
                    label="Date"
                    type="date"
                    v-model="payload.date_of_discharge"
                    variant="outlined"
                    density="compact"
                    hide-details
                ></v-text-field>
            </v-col>
            <v-col cols="3">
                <v-text-field
                    label="Time"
                    v-model="payload.time_of_discharge"
                    variant="outlined"
                    density="compact"
                    hide-details
                ></v-text-field>
            </v-col>
        </v-row>
    </v-container>
</template>

<script setup>
const props = defineProps({
    payload: {
        type: Object,
        default: () => ({}),
        required: true,
    }
});

let tab = ref("0");

const { selectedRowDetails } = storeToRefs(useSubcomponentSelectedRowDetailsStore()); 

const emits = defineEmits(['close-dialog'])
const payload = ref({});

const onSubmit = () => {
    alert('PhilHealth Claim 3');
    payload.value = {};
    emits('close-dialog');
    tab.value = '0';
}
</script>

<style scoped>
.sub-header {
    font-weight: bold; 
    font-style: italic; 
    text-decoration: underline;
}
.form-col {
    margin-top: -16px !important;
}
</style>