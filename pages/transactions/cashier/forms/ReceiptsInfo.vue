<template>
    <v-dialog :model-value="open_reciepts_form" rounded="lg" @update:model-value="closeDialog" max-width="400px">
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
                            <v-list-subheader class="form-header">Business Style</v-list-subheader> 
                            <v-text-field
                                variant="solo"
                                v-model="payload.business_style"
                                density="compact"
                                hide-details
                            ></v-text-field>
                        </v-col>
                        <v-col cols="12" class="pa-1">
                            <v-list-subheader class="form-header">TIN</v-list-subheader> 
                            <v-text-field
                                variant="solo"
                                v-model="payload.tin"
                                density="compact"
                                hide-details
                            ></v-text-field>
                        </v-col>
                        <v-col cols="12" class="pa-1">
                            <v-list-subheader class="form-header">OSCA / PWD ID</v-list-subheader> 
                            <v-text-field
                                variant="solo"
                                v-model="payload.osca_pwd_id"
                                density="compact"
                                hide-details
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
    payload: {
        type: Object,
        default: () => ({}),
        required: true,
    },
});
const emits = defineEmits(["close-dialog", "submit"]);

const closeDialog = () => {
    emits("close-dialog");
};

const handleSubmit = (payload) => {
    emits("submit", payload);
}
</script>
<style scoped>
.form-header {
    color: #000;
    margin: -12px 0px -12px 0px;
    font-weight: 500;
}
</style>
