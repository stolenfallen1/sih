<template>
    <v-dialog :model-value="show" rounded="lg" scrollable @update:model-value="closeDialog" max-width="600px">
        <form @submit.prevent="onSubmit">
            <v-card rounded="lg">
                <v-toolbar density="compact" color="#107bac" hide-details>
                    <v-toolbar-title>Privilege Card Details {{ selectedRowDetails.id }}</v-toolbar-title> 
                    <v-btn color="white" @click="closeDialog">
                        <v-icon>mdi-close</v-icon>
                    </v-btn>
                </v-toolbar>
                <v-divider></v-divider>
                <v-card-text>
                    <v-card elevation="4">
                        <v-toolbar density="compact" hide-details>
                            <v-toolbar-title class="toolbar-title">New Privelege Card Details</v-toolbar-title>
                        </v-toolbar>
                        <v-card-text>
                            <v-row>
                                <v-col cols="12">
                                    <v-text-field
                                        label="Card No."
                                        v-model="payload.cardNo"
                                        variant="outlined"
                                        density="compact"
                                        hide-details
                                    ></v-text-field>
                                </v-col>
                                <v-col cols="12" class="form-col">
                                    <v-text-field
                                        label="Card Holder"
                                        v-model="payload.cardHolder"
                                        variant="outlined"
                                        density="compact"
                                        hide-details
                                        readonly
                                        prepend-icon="mdi-plus-box"
                                        @click:prepend="showCardHolder"
                                    ></v-text-field>
                                </v-col>
                                <v-col cols="6" class="form-col">
                                    <v-text-field
                                        label="Issuance Date"
                                        v-model="payload.issuanceDate"
                                        type="date"
                                        variant="outlined"
                                        density="compact"
                                        hide-details
                                    ></v-text-field>
                                </v-col>
                                <v-col cols="6" class="form-col">
                                    <v-text-field
                                        label="Expiry Date"
                                        v-model="payload.expiryDate"
                                        type="date"
                                        variant="outlined"
                                        density="compact"
                                        hide-details
                                    ></v-text-field>
                                </v-col>
                            </v-row>
                        </v-card-text>
                    </v-card>
                    <v-card elevation="4" class="mt-4">
                        <v-toolbar density="compact" hide-details>
                            <v-toolbar-title class="toolbar-title">Privilege Card Details to be Transferred</v-toolbar-title>
                        </v-toolbar>
                        <v-card-text>
                            <v-row>
                                <v-col cols="12">
                                    <v-text-field
                                        label="Card No."
                                        v-model="payload.cardNo"
                                        variant="outlined"
                                        density="compact"
                                        hide-details
                                    ></v-text-field>
                                </v-col>
                                <v-col cols="12" class="form-col">
                                    <v-text-field
                                        label="Card Holder"
                                        v-model="payload.cardHolder"
                                        variant="outlined"
                                        density="compact"
                                        hide-details
                                        readonly
                                        prepend-icon="mdi-plus-box"
                                        @click:prepend="showCardHolder"
                                    ></v-text-field>
                                </v-col>
                                <v-col cols="6" class="form-col">
                                    <v-text-field
                                        label="Issuance Date"
                                        v-model="payload.issuanceDate"
                                        type="date"
                                        variant="outlined"
                                        density="compact"
                                        hide-details
                                        readonly
                                    ></v-text-field>
                                </v-col>
                                <v-col cols="6" class="form-col">
                                    <v-text-field
                                        label="Expiry Date"
                                        v-model="payload.expiryDate"
                                        type="date"
                                        variant="outlined"
                                        density="compact"
                                        hide-details
                                        readonly
                                    ></v-text-field>
                                </v-col>
                                <v-col cols="12" class="form-col">
                                    <v-text-field
                                        label="Total Points Earned"
                                        v-model="payload.totalPointsEarned"
                                        variant="outlined"
                                        density="compact"
                                        hide-details
                                        readonly
                                    ></v-text-field>
                                </v-col>
                                <v-col cols="12" class="form-col">
                                    <v-text-field
                                        label="Total Points Redeemed"
                                        v-model="payload.totalPointsRedemeed"
                                        variant="outlined"
                                        density="compact"
                                        hide-details
                                        readonly
                                    ></v-text-field>
                                </v-col>
                                <v-col cols="12" class="form-col">
                                    <v-text-field
                                        label="Total Points Transferred"
                                        v-model="payload.totalPointsTransferred"
                                        variant="outlined"
                                        density="compact"
                                        hide-details
                                        readonly
                                    ></v-text-field>
                                </v-col>
                                <v-col cols="12" class="form-col">
                                    <v-text-field
                                        label="Available Balance"
                                        v-model="payload.availableBalance"
                                        variant="outlined"
                                        density="compact"
                                        hide-details
                                        readonly
                                    ></v-text-field>
                                </v-col>
                                <v-col cols="12" class="form-col">
                                    <v-text-field
                                        label="Balance to be Transferred"
                                        v-model="payload.balanceToBeTransferred"
                                        variant="outlined"
                                        density="compact"
                                        hide-details
                                        readonly
                                    ></v-text-field>
                                </v-col>
                            </v-row>
                        </v-card-text>
                    </v-card>
                </v-card-text>
                <v-divider></v-divider>
                <v-card-actions>
                    <v-btn color="blue-darken-1 border border-info" @click="closeDialog"> Close </v-btn>
                    <v-spacer></v-spacer>
                    <v-btn class="bg-primary text-white" type="submit">Select</v-btn>
                </v-card-actions>
            </v-card>
        </form>
    </v-dialog>
    <SelectPrivilegeCard :open_card_holder="open_card_holder" @close-dialog="closeCardHolder" @handle-select="onSelect" />
</template>

<script setup>
import SelectPrivilegeCard from "./sub-forms/SelectPrivilegeCard.vue";

const props = defineProps({
    show: {
        type: Boolean,
        default: () => false,
        required: true,
    },
});

const open_card_holder = ref(false);
const { selectedRowDetails } = storeToRefs(useSubcomponentSelectedRowDetailsStore()); 

const payload = ref({});

const onSubmit = () => {
    alert("Test!");
    emits('closeDialog');
};
const onSelect = () => {
    alert("Test!");
};

const showCardHolder = () => {
    open_card_holder.value = true;
};
const closeCardHolder = () => {
    open_card_holder.value = false;
};

const emits = defineEmits(['close-dialog'])

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