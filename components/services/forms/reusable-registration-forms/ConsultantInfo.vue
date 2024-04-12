<template>
    <v-card rounded="lg">
        <v-row>
            <v-col cols="12">
                <v-table density="compact" height="30vh">
                    <thead>
                        <tr>
                            <th>Consultant Name</th>
                            <th>Specialization</th>
                            <th>Group</th>
                            <th>PHIC Type</th>
                            <th>Role Type</th>
                        </tr>
                    </thead>
                    <tbody>
                        <template>
                            <tr class="cursor-pointer">
                                <!-- contents -->
                            </tr>
                        </template>
                    </tbody>
                    <v-divider></v-divider>
                </v-table>
            </v-col>
        </v-row>
        <v-divider></v-divider>
        <v-card-actions>
            <v-btn color="blue-darken-1 border border-info" @click="openConsultantsList">
                <v-icon class="mr-2">mdi-account-multiple-plus-outline</v-icon>
                Add Physician
            </v-btn>
        </v-card-actions>
    </v-card>
    <consultant-list :open_consultants_list="open_consultants_list" @close-dialog="closeConsultantsList" @handle-select="handleAddConsultant" />
</template>

<script setup>
const props = defineProps({
    payload: {
        type: Object,
        required: true,
        default: () => ({})
    }
})

const open_consultants_list = ref(false);

const deleteRow = () => {
    alert('delete row');
}

const openConsultantsList = () => {
    open_consultants_list.value = true;
}

const handleAddConsultant = () => {
    alert('Consultant Selected');
    open_consultants_list.value = false;
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
</style>