<template>
    <v-card rounded="lg">
        <v-row>
            <v-col cols="12">
                <v-table density="compact" height="40vh" class="styled-table">
                    <thead>
                        <tr>
                            <th>Guarantor Name</th>
                            <th>Approval Code</th>
                            <th>Approval No.</th>
                            <th>Approval Date</th>
                            <th>Validity Date</th>
                            <th>Credit Limit</th>
                            <th>isOpen</th>
                            <th width="4"></th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(item, index) in payload.selectedGuarantor" :key="index">
                            <td style="margin: 0; padding: 1px;" width="100%"> <input   v-model="item.guarantor_name" class="hmo-input" readonly/> </td>
                            <td style="margin: 0; padding: 1px;" width="100%"> <input v-model="item.guarantor_Approval_code" :readonly="clicked_option === 'view'" class="hmo-input fillable"/> </td>
                            <td style="margin: 0; padding: 1px;" width="100%"> <input v-model="item.guarantor_Approval_no" :readonly="clicked_option === 'view'" class="hmo-input fillable"/> </td>
                            <td style="margin: 0; padding: 1px;" width="100%"> <input v-model="item.guarantor_Approval_date" :readonly="clicked_option === 'view'" type="date" class="hmo-input fillable"/> </td>
                            <td style="margin: 0; padding: 1px;" width="100%"> <input v-model="item.guarantor_Validity_date" :readonly="clicked_option === 'view'" type="date" class="hmo-input fillable"/> </td>
                            <td style="margin: 0; padding: 1px;" width="100%"> <input v-model="item.guarantor_Credit_Limit" :readonly="item.isOpen === true || clicked_option=== 'view'" class="hmo-input fillable" />  </td>
                            <td style="text-align: center"><input type="checkbox" v-model="item.isOpen" :checked="item.isOpen === true" /></td>
                            <td> 
                                <v-icon v-if="clicked_option !== 'view'" color="red" class="cursor-pointer" @click="removeGuarantor(index)">
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
            <v-btn 
                color="blue-darken-1 border border-info" 
                @click="openHmoList" 
                :disabled="payload.mscAccount_type !== 2"
            >
                <v-icon class="mr-2">mdi-account-multiple-plus-outline</v-icon>
                Add HMO Guarantor
            </v-btn>
        </v-card-actions>
    </v-card>
    <o-p-d-hmo-list :open_hmo_list="open_hmo_list" @close-dialog="closeHmoList" @handle-select="handleHmoList" /> 
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
    },
    formErrors: {
        type: Object,
        default: () => ({})
    },
})

const open_hmo_list = ref(false);

const openHmoList = () => {
    open_hmo_list.value = true;
}

const handleHmoList = (selected_item) => {
    props.payload.selectedGuarantor = selected_item;
};

const removeGuarantor = (index) => {
    props.payload.selectedGuarantor.splice(index, 1);
}

const closeHmoList = () => {
    open_hmo_list.value = false;
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
.fillable {
    border: 1px solid #A9A9A9;
    border-radius: 5px;
    padding: 2.5px;
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