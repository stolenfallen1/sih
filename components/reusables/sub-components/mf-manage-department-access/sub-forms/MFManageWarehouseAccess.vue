<template>
    <v-dialog :model-value="open_form_dialog" rounded="lg" scrollable @update:model-value="closeDialog" max-width="650px">
        <form @submit.prevent="onSubmit">
            <v-card>
                <v-toolbar density="compact" color="#6984ff" hide-details>
                    <v-toolbar-title>Ancillary Department Selection List {{ selectedRowDetails.id }}</v-toolbar-title>
                    <v-btn color="white" @click="closeDialog">
                        <v-icon>mdi-close</v-icon>
                    </v-btn>
                </v-toolbar>
                <v-card-text>
                    <v-row>
                        <v-col cols="12">
                            <v-text-field
                                label="Department Code"
                                v-model="payload.department_code"
                                variant="outlined"
                                density="compact"
                                hide-details
                                readonly
                            ></v-text-field>
                        </v-col>
                        <v-col cols="12" class="form-col">
                            <v-text-field
                                label="Description"
                                v-model="payload.description"
                                variant="outlined"
                                density="compact"
                                hide-details
                                readonly
                            ></v-text-field>
                        </v-col>
                        <v-col cols="12" class="my-2" style="border: 1px solid lightgrey; border-radius: 10px;">
                            <v-checkbox v-model="payload.is_trade" label="Is Trade" density="compact" hide-details></v-checkbox>
                            <v-checkbox v-model="payload.is_viewable" label="Is Viewable" density="compact" hide-details></v-checkbox>
                        </v-col>
                    </v-row>
                </v-card-text>
                <v-divider></v-divider>
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
    open_form_dialog: {
        type: Boolean,
        default: () => false,
        required: true,
    },
});

const payload = ref({});

const { selectedRowDetails } = storeToRefs(useSubcomponentSelectedRowDetailsStore()); 

const emits = defineEmits(['close-dialog', 'handle-submit'])

const onSubmit = async (payload) => {
    emits('handle-submit', payload)
    emits('close-dialog')
}

const closeDialog = () => {
    emits('close-dialog')
}
</script>

<style scoped>
.form-col {
    margin-top: -16px !important;
}
</style>