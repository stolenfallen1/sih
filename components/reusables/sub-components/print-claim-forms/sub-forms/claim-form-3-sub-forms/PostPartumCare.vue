<template>
    <v-container>
        <v-row style="display: flex;">
            <v-col cols="4" class="mt-3">
                <label>Perineal Wound Care</label>
            </v-col>
            <v-col cols="2">
                <v-checkbox label="Done" density="compact"></v-checkbox>
            </v-col>
            <v-col cols="6">
                <v-text-field v-model="perinealWoundCareRemarks" label="Remarks" density="compact" variant="outlined" hide-details></v-text-field>
            </v-col>
        </v-row>
        <v-row style="display: flex;">
            <v-col cols="4" class="mt-3">
                <label>Signs of Maternal Postpartum Complications</label>
            </v-col>
            <v-col cols="2">
                <v-checkbox label="Done" density="compact"></v-checkbox>
            </v-col>
            <v-col cols="6">
                <v-text-field v-model="postpartumComplicationsRemarks" label="Remarks" density="compact" variant="outlined" hide-details></v-text-field>
            </v-col>
        </v-row>
        <v-row style="display: flex;">
            <v-col cols="4" class="mt-3">
                <label>Breastfeeding and Nutrition</label>
            </v-col>
            <v-col cols="2">
                <v-checkbox label="Done" density="compact"></v-checkbox>
            </v-col>
            <v-col cols="6">
                <v-text-field v-model="breastfeedingRemarks" label="Remarks" density="compact" variant="outlined" hide-details></v-text-field>
            </v-col>
        </v-row>
        <v-row style="display: flex;">
            <v-col cols="4" class="mt-3">
                <label>Family Planning</label>
            </v-col>
            <v-col cols="2">
                <v-checkbox label="Done" density="compact"></v-checkbox>
            </v-col>
            <v-col cols="6">
                <v-text-field v-model="familyPlanningRemarks" label="Remarks" density="compact" variant="outlined" hide-details></v-text-field>
            </v-col>
        </v-row>
        <v-row style="display: flex;">
            <v-col cols="4" class="mt-3">
                <label>Provided family planning services to the patient ( as requested by the patient )</label>
            </v-col>
            <v-col cols="2">
                <v-checkbox label="Done" density="compact"></v-checkbox>
            </v-col>
            <v-col cols="6">
                <v-text-field v-model="familyPlanningServicesRemarks" label="Remarks" density="compact" variant="outlined" hide-details></v-text-field>
            </v-col>
        </v-row>
        <v-row style="display: flex;">
            <v-col cols="4" class="mt-3">
                <label>Referred to partner physician for voluntary surgical sterilization ( as requested by pt )</label>
            </v-col>
            <v-col cols="2">
                <v-checkbox label="Done" density="compact"></v-checkbox>
            </v-col>
            <v-col cols="6">
                <v-text-field v-model="referredPartnerPhysicianRemarks" label="Remarks" density="compact" variant="outlined" hide-details></v-text-field>
            </v-col>
        </v-row>
        <v-row style="display: flex;">
            <v-col cols="4" class="mt-3">
                <label>Schedule the next postpartum followup</label>
            </v-col>
            <v-col cols="2">
                <v-checkbox label="Done" density="compact"></v-checkbox>
            </v-col>
            <v-col cols="6">
                <v-text-field v-model="nextPostpartumRemarks" label="Remarks" density="compact" variant="outlined" hide-details></v-text-field>
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