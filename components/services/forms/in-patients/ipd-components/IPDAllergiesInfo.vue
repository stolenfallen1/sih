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
                            <th width="4"></th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(item, index) in payload.selectedAllergy" :key="index">
                            <td> <input v-model="item.allergy_name" readonly /> </td>
                            <td> <p> {{ item.cause }} </p> </td>
                            <td> <p> {{ item.symptoms }} </p> </td>
                            <td> <v-icon color="red" class="cursor-pointer" @click="deleteRow(index)">mdi-delete</v-icon> </td>
                        </tr>
                    </tbody>
                    <v-divider></v-divider>
                </v-table>
            </v-col>
        </v-row>
        <v-divider></v-divider>
        <v-card-actions>
            <v-btn color="blue-darken-1 border border-info" @click="openHmoList" :disabled="clicked_option === 'view'">
                <v-icon class="mr-2">mdi-account-multiple-plus-outline</v-icon>
                Add Allergies
            </v-btn>
        </v-card-actions>
    </v-card>
    <o-p-d-allergies-list :open_allergy_list="open_allergy_list" @close-dialog="closeAllergyList" @handle-select="handleSelectedAllergy" />
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

const handleSelectedAllergy = (allergy) => {
    if (!props.payload.selectedAllergy) {
        props.payload.selectedAllergy = [];
    } 
    if (Array.isArray(allergy)) {
        props.payload.selectedAllergy.push(...allergy);
    } 
}

const deleteRow = (index) => {
    props.payload.selectedAllergy.splice(index, 1);
}

const openHmoList = () => {
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