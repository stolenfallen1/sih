<template>
    <v-card rounded="lg">
        <v-row>
            <v-col cols="12">
                <v-table density="compact" height="40vh">
                    <thead>
                        <tr>
                            <th>Consultant Code</th>
                            <th>Consultant Name</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(item, index) in payload.selectedConsultant" :key="index">
                            <td> <input v-model="item.doctor_code" class="hmo-input" readonly/> </td>
                            <td width="100%"> <input v-model="item.doctor_name" class="hmo-input" readonly/> </td>
                            <td><v-icon color="red" @click="removeConsultant(index)">mdi-delete</v-icon></td>
                        </tr>
                    </tbody>
                    <v-divider></v-divider>
                </v-table>
            </v-col>
        </v-row>
        <v-divider></v-divider>
        <v-card-actions>
            <v-btn color="blue-darken-1 border border-info" @click="openConsultantsList" :disabled="clicked_option === 'view'">
                <v-icon class="mr-2">mdi-account-multiple-plus-outline</v-icon>
                Add Physician
            </v-btn>
        </v-card-actions>
    </v-card>
    <consultant-list :open_consultants_list="open_consultants_list" @close-dialog="closeConsultantsList" @handle-select="handleSelectConsultants" />
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

const open_consultants_list = ref(false);

const openConsultantsList = () => {
    open_consultants_list.value = true;
}

const handleSelectConsultants = (selected_item) => {
    props.payload.selectedConsultant = selected_item;
}

const removeConsultant = (index) => {
    props.payload.selectedConsultant.splice(index, 1);
}

const closeConsultantsList = () => {
    open_consultants_list.value = false;
}

</script>

<style scoped>
.form-col {
    padding: 3.25px 0px 3.25px 0px !important;
    margin: 0px !important;
}
.hmo-input {
    width: 100%;
    padding: 0px;
    margin: 0px;
    font-size: 14px;
    font-weight: 500;
    color: #000;
}
</style>