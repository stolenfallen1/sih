<template>
    <v-dialog :model-value="open_reciepts_form" rounded="lg" @update:model-value="closeDialog"  scrollable max-width="350px">
        <form @submit.prevent="handleSubmit(payload)">
            <v-card rounded="lg">
                <v-toolbar density="compact" color="#107bac" hide-details>
                    <v-toolbar-title>Receipts Info</v-toolbar-title>
                    <v-btn color="white" @click="closeDialog">
                        <v-icon>mdi-close</v-icon>
                    </v-btn>
                    </v-toolbar>
                <v-divider></v-divider>
                <v-card-text>
                    <v-row>
                        <v-col cols="12" class="pa-1">
                            <v-text-field
                                label="Business Style"
                                variant="solo"
                                density="compact"
                            ></v-text-field>
                        </v-col>
                        <v-col cols="12" class="pa-1">
                            <v-text-field
                                label="TIN"
                                variant="solo"
                                density="compact"
                            ></v-text-field>
                        </v-col>
                        <v-col cols="12" class="pa-1">
                            <v-text-field
                                label="OSCA / PWD ID"
                                variant="solo"
                                density="compact"
                            ></v-text-field>
                        </v-col>
                    </v-row>
                </v-card-text>
                <v-divider></v-divider>
                <v-card-actions>
                    <v-btn variant="outlined" color="info" @click="closeDialog"> Close </v-btn>
                    <v-spacer></v-spacer>
                    <v-btn class="bg-primary text-white" type="submit">Accept</v-btn>
                </v-card-actions>
            </v-card>
        </form>
    </v-dialog>
</template>
<script setup>
const props = defineProps({
open_reciepts_form: {
    type: Boolean,
    default: () => false,
    required: false,
},
});
const emits = defineEmits(["close-dialog"]);

const closeDialog = () => {
    emits("close-dialog");
};
</script>
