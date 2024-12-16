<template>
    <v-card rounded="lg">
        <v-row>
            <v-col cols="12">
                <v-table density="compact" height="40vh" class="styled-table">
                    <thead>
                        <tr>
                            <th>Consultant Code</th>
                            <th>Consultant Name</th>
                            <th>specialization</th>
                            <th>Doctors Role</th>
                            <th width="4"></th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(item, index) in props.payload.selectedConsultant" :key="index">
                            <td><input v-model="item.attending_Doctor" readonly/> </td>
                            <td><p> {{ item.attending_Doctor_fullname }} </p></td>
                            <td> 
                                <select v-model="item.Doctors_Specialization_Id" class="select-items">
                                    <option v-for="specialization in doctorsSpecialization" :key="specialization.id" :value="specialization.id">
                                        {{ specialization.specialization_description }}
                                    </option>
                                </select>
                            </td>
                            <td> 
                                <select v-model="item.Doctors_Role_Id" class="select-items">
                                    <option v-for="role in doctors_role" :key="role.id" :value="role.id">
                                        {{ role.category_description }}
                                    </option>
                                </select>
                            </td>
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
    <ConsultantRoleTypeForm :open_consultant_role="open_consultant_role_list" @close-dialog="closeConsultantRoleList" @handle-select="handleSelectConsultantRole" />
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
const open_consultant_role_list = ref(false);

const openConsultantsRole = () => {
    open_consultant_role_list.value = true;
}
const openConsultantsList = () => {
    open_consultants_list.value = true;
}

const closeConsultantRoleList = () => {
    open_consultants_list.value = false;
}

const handleSelectConsultants = (selected_item) => {
    props.payload.selectedConsultant = selected_item;
}

const handleSelectConsultantRole = () => {
    alert('test')
}

const removeConsultant = (index) => {
    props.payload.selectedConsultant.splice(index, 1);
}

const closeConsultantsList = () => {
    open_consultants_list.value = false;
}

const loading = ref(false);

const doctors_role = ref([]);
const handleDoctorsRole = async () => {
    let response;
    loading.value = true;
    try {
        response = await useMethod("get", "doctors-categories", "", "");
        if(response) {
            doctors_role.value = response;
            console.log('Doctors role : ', doctors_role.value);
            loading.value = false;
        }
    } catch(error) {
        console.log('ERROR! ', + error);
    }
}

const doctorsSpecialization = ref([]);
const handleDoctorsSpecialization = async () => {
    loading.value = true;
    let response;
    try {
        response = await useMethod("get", "doctors-specialization", "", "");
        if(response) {
            doctorsSpecialization.value = response;
            console.log('Doctors Specializations : ', doctorsSpecialization.value);
        }
    } catch(error) {
        console.log('ERROR! ', + error);
    } finally {
        loading.value = false;
    }
}

onMounted(() => {
    handleDoctorsRole();
    handleDoctorsSpecialization();
})

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
.select-items {
    width: 100%;
}
</style>