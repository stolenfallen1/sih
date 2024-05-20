<template>
    <v-dialog :model-value="show" rounded="lg" scrollable @update:model-value="closeDialog" max-width="650px">
        <v-card rounded="lg">
            <v-toolbar density="compact" color="#6984ff" hide-details>
                <v-toolbar-title>Doctor Accreditation Number Utility {{ selectedRowDetails.id }}</v-toolbar-title>
                <v-btn color="white" @click="closeDialog">
                    <v-icon>mdi-close</v-icon>
                </v-btn>
            </v-toolbar>
            <v-divider></v-divider>
            <v-card-text>
                <v-card>
                    <v-toolbar density="compact" hide-details>
                        <v-toolbar-title class="toolbar-title">Doctor's Information</v-toolbar-title>
                    </v-toolbar>
                    <v-card-text>
                        <v-row>
                            <v-col cols="12">
                                <v-text-field 
                                    label="TIN No."
                                    v-model="payload.find(item => item.tin_no).tin_no"
                                    variant="outlined" 
                                    density="compact" 
                                    hide-details 
                                    readonly
                                ></v-text-field>
                            </v-col>
                            <v-col cols="6" class="form-col">
                                <v-text-field 
                                    label="Last name" 
                                    v-model="payload.find(item => item.lastname).lastname"
                                    variant="outlined" 
                                    density="compact" 
                                    hide-details 
                                    readonly
                                ></v-text-field>
                            </v-col>
                            <v-col cols="6" class="form-col">
                                <v-text-field 
                                    label="First name" 
                                    v-model="payload.find(item => item.firstname).firstname"
                                    variant="outlined" 
                                    density="compact" 
                                    hide-details 
                                    readonly
                                ></v-text-field>
                            </v-col>
                            <v-col cols="4" class="form-col">
                                <v-text-field 
                                    label="Middle name" 
                                    v-model="payload.find(item => item.middlename).middlename"
                                    variant="outlined" 
                                    density="compact" 
                                    hide-details 
                                    readonly
                                ></v-text-field>
                            </v-col>
                            <v-col cols="4" class="form-col">
                                <v-text-field 
                                    label="Suffix" 
                                    v-model="payload.find(item => item.suffix).suffix"
                                    variant="outlined" 
                                    density="compact" 
                                    hide-details 
                                    readonly
                                ></v-text-field>
                            </v-col>
                            <v-col cols="4" class="form-col">
                                <v-text-field 
                                    type="date"
                                    label="Birth Date" 
                                    v-model="payload.find(item => item.birth_date).birth_date"
                                    variant="outlined" 
                                    density="compact" 
                                    hide-details 
                                    readonly
                                ></v-text-field>
                            </v-col>
                            <v-col cols="8" class="form-col">
                                <v-text-field
                                    label="Accreditation No." 
                                    variant="outlined" 
                                    density="compact" 
                                    hide-details 
                                    readonly
                                ></v-text-field>
                            </v-col>
                            <v-col cols="4" class="form-col">
                                <v-btn><v-icon>mdi-account-key</v-icon>Check Acc No.</v-btn>
                            </v-col>
                        </v-row>
                        </v-card-text>
                </v-card>
            </v-card-text>
            <v-divider></v-divider>
            <v-card-actions>
                <v-btn color="blue-darken-1 border border-info" @click="closeDialog"> Close </v-btn>
                <v-spacer></v-spacer>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script setup>

const props = defineProps({
    show: {
        type: Boolean,
        default: () => false,
        required: true,
    },
});

const payload = ref([
    {
        tin_no: '9999',
    },
    {
        lastname: 'Doe',
    },
    {
        firstname: 'John',
    },
    {
        middlename: 'smith',
    },
    {
        suffix: 'Jr.',
    },
    {
        birth_date: '2024-04-15',
    },
]);


const { selectedRowDetails } = storeToRefs(useSubcomponentSelectedRowDetailsStore()); 

const emits = defineEmits(['close-dialog']);

const closeDialog = () => {
    emits('close-dialog')
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