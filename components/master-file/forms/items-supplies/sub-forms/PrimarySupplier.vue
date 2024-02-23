<template>
    <v-dialog 
        :model-value="template_dialog"
        persistent
        hide-overlay
        width="700"
    >
        <v-card>
            <v-card-title>Select Primary Supplier</v-card-title>
            <v-divider></v-divider>
            <v-card-text>
                <v-container>
                    <v-row>
                        <v-col cols="12" class="pa-1">
                            <v-text-field
                                class="mt-3"
                                variant="outlined"
                                density="compact"
                                append-inner-icon="mdi-magnify"
                            ></v-text-field>
                        </v-col>
                        <v-divider></v-divider>
                        <v-col cols="12">
                            <v-table density="compact" class="text-center">
                                <thead>
                                    <tr>
                                        <th class="text-center">Full Name</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <template v-for="(supplier, typeIndex) in suppliers" :key="typeIndex">
                                        <tr>
                                            <template v-for="(value, key) in supplier" :key="key">
                                                <td v-if="key === 'description'">{{ value }}</td>
                                            </template>
                                        </tr>
                                    </template>
                                </tbody>
                            </v-table>
                        </v-col>
                    </v-row>
                </v-container>
            </v-card-text>
            <v-divider></v-divider>
            <v-card-actions>
                <v-btn color="blue-darken-1" @click="closeDialog">Close</v-btn>
                <v-spacer></v-spacer>
                <v-btn class="bg-primary text-white" type="submit" @click="handleSelectingSupplier">Select</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script setup>

const props = defineProps({
    template_dialog: {
        type: Boolean,
        default: () => false,
    },
})
const emits = defineEmits()

const suppliers = [
    { supplier_id: 1, description: "Smoking" },
    { supplier_id: 2, description: "Drinking Alcohol" },
    { supplier_id: 3, description: "Drugs" },
]

const closeDialog = () => {
    emits("close-dialog");
};

const handleSelectingSupplier = () => {
    emits("select-supplier");
}

</script>

<style scoped>
</style>