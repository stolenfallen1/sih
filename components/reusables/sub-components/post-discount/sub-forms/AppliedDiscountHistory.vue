<template>
    <v-dialog :model-value="open_applied_discount_history" rounded="lg" scrollable @update:model-value="closeDialog" max-width="900px">     
        <v-card rounded="lg">
            <v-toolbar density="compact" color="#6984ff" hide-details>
                <v-toolbar-title>Applied Discount Transaction History {{ selectedRowDetails.id }}</v-toolbar-title>
                <v-btn color="white" @click="closeDialog">
                    <v-icon>mdi-close</v-icon>
                </v-btn>
            </v-toolbar>
            <v-divider></v-divider>
            <v-card-text>
                <v-tabs 
                    v-model="tab"
                    color="primary"
                    class="mb-2"
                >
                    <v-tab value="0"><v-icon start>mdi-form-select</v-icon> Items and Services </v-tab>
                    <v-tab value="1"><v-icon start>mdi-form-select</v-icon> Miscellaneous </v-tab>
                </v-tabs>
                <v-window v-model="tab">
                    <v-window-item class="pa-1">
                        <v-table height="40vh">
                            <thead>
                                <tr>
                                    <th width="4"></th>
                                    <th>Type</th>
                                    <th>Document No.</th>
                                    <th>Document Date</th>
                                    <th>Description</th>
                                    <th>Rendered Qty</th>
                                    <th>Rendered Price</th>
                                    <th>Amount</th>
                                    <th>Discount Rate</th>
                                    <th>Discount Amount</th>
                                    <th>Credit Amount</th>
                                    <th>Allowed Amount</th>
                                    <th>RF Discount</th>
                                    <th>Net of RF Discount</th>
                                    <th>Net of Discount</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <!-- Contents -->
                                </tr>
                            </tbody>
                        </v-table>
                    </v-window-item>
                    <v-window-item class="pa-1">
                        <v-table height="40vh">
                            <thead>
                                <tr>
                                    <th width="4"></th>
                                    <th>Document Date</th>
                                    <th>Document No.</th>
                                    <th>Description</th>
                                    <th>Amount</th>
                                    <th>Discount Rate</th>
                                    <th>Discount Base</th>
                                    <th>Discount Amount</th>
                                    <th width="4"></th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <!-- Contents -->
                                </tr>
                            </tbody>
                        </v-table>
                    </v-window-item>
                </v-window>
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
    open_applied_discount_history: {
        type: Boolean,
        default: () => false,
    },
})

const { selectedRowDetails } = storeToRefs(useSubcomponentSelectedRowDetailsStore()); 

let tab = ref("0");

const emits = defineEmits(['close-dialog'])

const closeDialog = () => {
    emits('close-dialog');
}
</script>

<style scoped>
</style>