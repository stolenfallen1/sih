<template>
    <v-card rounded="lg">
        <v-row>
            <v-col cols="12">
                <v-table density="compact" height="40vh">
                    <thead>
                        <tr>
                            <th>Guarantor Name</th>
                            <th>Approval Code</th>
                            <th>Approval No.</th>
                            <th>Approval Date</th>
                            <th>Validity Date</th>
                            <th>Credit Limit</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(item, index) in payload.selectedGuarantor" :key="index">
                            <td style="margin: 0; padding: 1px;" width="100%"> <input v-model="item.guarantor_name" class="hmo-input" readonly/> </td>
                            <td style="margin: 0; padding: 1px;" width="100%"> <input v-model="item.guarantor_approval_code" class="hmo-input fillable"/> </td>
                            <td style="margin: 0; padding: 1px;" width="100%"> <input v-model="item.guarantor_approval_no" class="hmo-input fillable"/> </td>
                            <td style="margin: 0; padding: 1px;" width="100%"> <input v-model="item.guarantor_approval_date" type="date" class="hmo-input fillable"/> </td>
                            <td style="margin: 0; padding: 1px;" width="100%"> <input v-model="item.guarantor_validity_date" type="date" class="hmo-input fillable"/> </td>
                            <td style="margin: 0; padding: 1px;" width="100%"> <input v-model="item.guarantor_credit_Limit" class="hmo-input fillable"/> </td>
                            <td><v-icon color="red" @click="removeGuarantor(index)">mdi-delete</v-icon></td>
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
    <hmo-list :open_hmo_list="open_hmo_list" @close-dialog="closeHmoList" @handle-select="handleHmoList" /> 
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
</style>