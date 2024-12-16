<template>
    <v-card rounded="lg" elevation="2">
        <v-row>
            <v-col cols="12">
                <v-table density="compact" height="40vh" class="styled-table">
                    <thead>
                        <tr>
                            <th>Allergy Type</th>
                            <th>Cause</th>
                            <th>Symptoms</th>
                            <th>Drug / Medication</th>
                            <th width="4"></th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(item, index) in payload.selectedAllergy" :key="index">
                            <td> <input v-model="item.allergy_name" readonly /> </td>
                            <td> <p> {{ item.cause }} </p> </td>
                            <td> 
                                <p v-if="item.symptoms && item.symptoms.length > 0">
                                    {{ item.symptoms.map(symptom => symptom.description).join(', ') }}
                                </p>
                                <p v-else>
                                    No symptoms recorded
                                </p>
                            </td>
                            <td>
                                <p>
                                    {{ item.drugUsed }}
                                </p>
                            </td>
                            <td> 
                                <v-icon v-if="clicked_option !== 'view'" color="red" class="cursor-pointer" @click="deleteRow(index)">
                                    mdi-delete
                                </v-icon> 
                            </td>
                        </tr>
                    </tbody>
                    <v-divider></v-divider>
                </v-table>
            </v-col>
        </v-row>
        <v-divider></v-divider>
        <v-card-actions>
            <v-btn color="blue-darken-1 border border-info" @click="openAllergyList" :disabled="clicked_option === 'view'">
                <v-icon class="mr-2">mdi-account-multiple-plus-outline</v-icon>
                Add Allergies
            </v-btn>
            <v-spacer></v-spacer>
            <v-btn color="blue-darken-1 border border-info" :disabled="clicked_option === 'view'" @click="getPatientAllergyHistory">
                <v-icon class="mr-2">mdi-folder-multiple-outline</v-icon>
                Look Allergy History
            </v-btn>
        </v-card-actions>
    </v-card>
    <ER-allergies-list :open_allergy_list="open_allergy_list" @close-dialog="closeAllergyList" @handle-select="handleSelectedAllergy" />
</template>

<script setup>
const props = defineProps({
    payload: {
        type: Object,
        required: true,
        default: () => ({})
    },
    clicked_option: {
        type: String,
        default: () => ''
    }
})

const open_allergy_list = ref(false);
const selectedAllergy = ref([]);
const drugUsed = ref('');
const selectedSymptoms = ref([]);

const handleSelectedAllergy = (allergy) => {
    selectedAllergy.value = allergy[0];
    selectedSymptoms.value = allergy.symptoms;
    drugUsed.value = allergy.drugUsed;

    if (!props.payload) {
        props.payload = {}; 
    }
    if (!props.payload.selectedAllergy) {
        props.payload.selectedAllergy = [];
    }

    props.payload.selectedAllergy.push({
        allergy_id: selectedAllergy.value.id,
        allergy_name: selectedAllergy.value.allergy_name,
        cause: selectedAllergy.value.cause,
        symptoms: selectedSymptoms.value,
        drugUsed: drugUsed.value
    });
};

const getPatientAllergyHistory = async () => {
    const items = {
        patient_Id: props.payload.patient_id
    };
    const response = await fetch(useLaravelAPI() + "/get-patient-allergy-history", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + useToken()
        },
        body: JSON.stringify({ items })
    });
    if (response.ok) {
        console.log(response);
    } else {
        alert("ERROR");
    }
}

const deleteRow = (index) => {
    props.payload.selectedAllergy.splice(index, 1);
}

const openAllergyList = () => {
    open_allergy_list.value = true;
}

const closeAllergyList = () => {
    open_allergy_list.value = false;
}

</script>

<style scoped>
.form-col {
    padding: 3.25px 0px 3.25px 0px !important;
    margin: 0px !important;
}
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