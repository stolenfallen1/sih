<template>
    <v-card rounded="lg" ref="selectedConsultant" 
        :style="{
            border: 
                payload.mscAccount_Type !== '' && !payload.selectedConsultant
                ? '1px solid #ff0000'
                : ''
        }
    ">
        <v-row>
            <v-col cols="12">
                <v-table density="compact" height="40vh" class="styled-table">
                    <thead>
                        <tr>
                            <th>Consultant Code</th>
                            <th>Consultant Name</th>
                            <th width="4"></th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(item, index) in props.payload.selectedConsultant" :key="index">
                            <td> <input v-model="item.attending_Doctor" readonly/> </td>
                            <td> <p> {{ item.attending_Doctor_fullname }} </p> </td>
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
    <ER-Consultant-List :open_consultants_list="open_consultants_list" @close-dialog="closeConsultantsList" @handle-select="handleSelectConsultants" />
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
.custom-border {
    /* box-shadow: 0 2px 1px 1px rgba(255,0,0,1.00) !important; */
    border: 1px solid #ff0000 !important;
}
</style>