<template>
    <v-card rounded="lg">
        <v-row>
            <v-col cols="12">
                <v-table density="compact" height="40vh">
                    <thead>
                        <tr>
                            <th>Code</th>
                            <th>Description</th>
                            <th>Remarks</th>
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
            <v-btn color="blue-darken-1 border border-info" @click="openHmoList" :disabled="clicked_option === 'view'">
                <v-icon class="mr-2">mdi-account-multiple-plus-outline</v-icon>
                Add Allergies
            </v-btn>
        </v-card-actions>
    </v-card>
    <allergies-list :open_allergy_list="open_allergy_list" @close-dialog="closeAllergyList" @handle-select="handleAddAllegy" />
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

const deleteRow = () => {
    alert('delete row');
}

const openHmoList = () => {
    open_allergy_list.value = true;
}

const handleAddAllegy = () => {
    alert('Allergy Added');
    open_allergy_list.value = false;
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
</style>