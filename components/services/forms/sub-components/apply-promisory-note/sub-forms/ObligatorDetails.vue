<template>
    <v-dialog :model-value="open_obligator_details" rounded="lg" scrollable @update:model-value="closeDialog" max-width="700px">
        <form @submit.prevent="onSubmit">
            <v-card>
                <v-toolbar density="compact" color="#6984ff" hide-details>
                    <v-toolbar-title>Apply Promissory Note {{ selectedRowDetails.id }}</v-toolbar-title>
                    <v-btn color="white" @click="closeDialog">
                        <v-icon>mdi-close</v-icon>
                    </v-btn>
                </v-toolbar>
                <v-card-text>
                    <v-card>
                        <v-toolbar density="compact" hide-details>
                            <v-toolbar-title class="toolbar-title">Obligator Information</v-toolbar-title>
                        </v-toolbar>
                        <v-card-text>
                            <v-row>
                                <v-col cols="12">
                                    <v-text-field
                                        label="Full name"
                                        v-model="payload.full_name"
                                        variant="outlined"
                                        density="compact"
                                        hide-details
                                    ></v-text-field>
                                </v-col>
                                <v-col cols="12" class="form-col">
                                    <v-autocomplete
                                        item-title="obligator_type"
                                        item-value="id"
                                        label="Obligator Type"
                                        v-model="payload.obligator_type"
                                        hide-details
                                        clearable
                                        density="compact"
                                        variant="outlined"
                                    ></v-autocomplete>
                                </v-col>
                                <v-col cols="12" class="form-col">
                                    <v-autocomplete
                                        item-title="relation_to_patient"
                                        item-value="id"
                                        label="Relation to Patient"
                                        v-model="payload.relation_to_patient"
                                        hide-details
                                        clearable
                                        density="compact"
                                        variant="outlined"
                                    ></v-autocomplete>
                                </v-col>
                                <v-col cols="12" class="form-col">
                                    <v-text-field
                                        label="Contact No."
                                        v-model="payload.contact_no"
                                        variant="outlined"
                                        density="compact"
                                        hide-details
                                    ></v-text-field>
                                </v-col>
                                <v-col cols="12" class="form-col">
                                    <v-textarea
                                        label="Address"
                                        v-model="payload.address"
                                        variant="outlined"
                                        density="compact"
                                        hide-details
                                    ></v-textarea>
                                </v-col>
                            </v-row>
                        </v-card-text>
                    </v-card>
                </v-card-text>
                <v-card-actions>
                    <v-btn color="blue-darken-1 border border-info" @click="closeDialog"> Close </v-btn>
                    <v-spacer></v-spacer>
                    <v-btn class="bg-primary text-white" type="submit">Save</v-btn>
                </v-card-actions>
            </v-card>
        </form>
    </v-dialog>
</template>

<script setup>
const props = defineProps({
    open_obligator_details: {
        type: Boolean,
        default: () => false,
        required: true,
    },
});

const payload = ref({});

const { selectedRowDetails } = storeToRefs(useSubcomponentSelectedRowDetailsStore()); 

const emits = defineEmits(['close-dialog', 'handle-submit']);

const onSubmit = () => {
    alert("Save Obligator Details");
    emits('handle-submit', payload.value);
    emits('close-dialog');
    payload.value = {};
}

const closeDialog = () => {
    emits('close-dialog');
}
</script> 

<style scoped>
.toolbar-title {
    font-size: 16px; 
    font-style: italic; 
    text-align: center;
}
.form-col {
    margin-top: -16px !important;
}
</style>