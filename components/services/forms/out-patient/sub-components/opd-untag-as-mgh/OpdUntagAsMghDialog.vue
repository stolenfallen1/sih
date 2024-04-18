<template>
    <v-dialog :model-value="show" rounded="lg" scrollable @update:model-value="closeDialog" max-width="600px">
        <form @submit.prevent="onSubmit">        
            <v-card rounded="lg">
                <v-toolbar density="compact" color="#6984ff" hide-details>
                    <v-toolbar-title>Untag as May Go Home {{ selectedRowDetails.id }}</v-toolbar-title>
                    <v-btn color="white" @click="closeDialog">
                        <v-icon>mdi-close</v-icon>
                    </v-btn>
                </v-toolbar>
                <v-divider></v-divider>
                <v-card-text>
                    <v-card elevation="4">
                        <v-card-text>
                            <p>
                                <span style="font-weight: bold; font-style: italic;" >NOTE: </span>You are about to untag this registry from May Go Home Status.
                                Please specify in the remarks entry box the reason before pushing through with this process.
                            </p>
                        </v-card-text>
                    </v-card>
                    <v-row class="mt-2">
                        <v-col cols="12">
                            <v-textarea
                                label="Remarks"
                                v-model="payload.remarks"
                                variant="outlined"
                                density="compact"
                                hide-details
                            ></v-textarea>
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
    show: {
        type: Boolean,
        default: () => false,
        required: true,
    },
});

const payload = ref({});

const { selectedRowDetails } = storeToRefs(useSubcomponentSelectedRowDetailsStore()); 

const onSubmit = () => {
    alert('Submit');
    emits('close-dialog');
}

const emits = defineEmits(['close-dialog'])

const closeDialog = () => {
    emits('close-dialog');
}
</script>

<style scoped>
</style>