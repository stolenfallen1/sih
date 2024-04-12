<template>
    <v-card rounded="lg">
        <v-row>
            <v-col cols="12">
                <v-table density="compact" height="40vh">
                    <thead>
                        <tr>
                            <th>Guarantor Fullname</th>
                            <th>Document Date</th>
                            <th>HMO Account No.</th>
                            <th>LOE No.</th>
                            <th>Approval Code</th>
                            <th>Approval No.</th>
                            <th>Approval Date</th>
                            <th>Card Expiry Date / No</th>
                            <th>Credit Limit</th>
                            <th>Amount</th>
                            <th>Co-Pay</th>
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
            <v-btn color="blue-darken-1 border border-info" @click="openHmoList" :disabled="payload.hosp_plan === 'Insurance' || payload.hosp_plan === 'Company' ? false : true">
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
})

const open_hmo_list = ref(false);

const deleteRow = () => {
    alert('delete row');
}

const openHmoList = () => {
    open_hmo_list.value = true;
}

const handleHmoList = () => {
    alert('HMO Guarantor Selected');
    open_hmo_list.value = false;
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
</style>