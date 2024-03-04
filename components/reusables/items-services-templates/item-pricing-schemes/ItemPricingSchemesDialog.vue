<template>
    <v-dialog :model-value="show" rounded="lg" persistent scrollable max-width="700px">
        <v-toolbar density="compact" color="#6984ff" hide-details>
            <v-toolbar-title>Item Pricing Schemes</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-btn color="white" @click="closeDialog">
                <v-icon>mdi-close</v-icon>
            </v-btn>
        </v-toolbar>
        <v-card>
            <v-card-title>
                <v-row>
                    <v-col cols="7">
                        <v-text-field
                            label="Search by Description"
                            rounded
                            hide-details
                            density="compact"
                            variant="outlined"
                            prepend-inner-icon="mdi-magnify"
                        >
                        </v-text-field>
                    </v-col>
                    <v-col cols="5">
                        <v-autocomplete
                            item-title="section"
                            item-value="id"
                            label="Price Groups"
                            :items="price_schemes" 
                            hide-details
                            density="compact"
                            variant="outlined"
                        ></v-autocomplete>
                    </v-col>
                </v-row>
            </v-card-title>
            <v-card-text>
                <v-data-table density="compact" height="60vh" :headers="headers">
                    <template #bottom></template>
                </v-data-table>
            </v-card-text>
            <v-divider></v-divider>
            <v-card-actions>
                <v-btn color="blue-darken-1" @click="closeDialog"> Close </v-btn>
                <v-spacer></v-spacer>
                <v-btn class="bg-primary text-white" type="submit" @click="openItemPricingSchemeForm">Add</v-btn>
                <v-btn class="bg-info text-white" type="submit">Edit</v-btn>
                <v-btn class="bg-error text-white" type="submit">Delete</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
    <item-pricing-scheme-form :open_item_pricing_schemes_form="open_item_pricing_schemes_form" @close-dialog="closeItemPricingSchemeForm" @handle-submit="onSubmit" />
</template>

<script setup>
import ItemPricingSchemeForm from "./sub-forms/ItemPricingSchemeForm.vue";

const props = defineProps({
    show: {
        type: Boolean,
        default: () => false,
        required: true,
    },
})

const emits = defineEmits()

const open_item_pricing_schemes_form = ref(false)

const headers = [
    {
        title: "System Default", 
        align: "start",
        sortable: true,
        width: "25%",
    },
    {
        title: "Code",
        align: "start",
        sortable: true,
        width: "25%",
    },
    {
        title: "Description",
        align: "start",
        sortable: false,
    },
];

const price_schemes = [];

const openItemPricingSchemeForm = () => {
    open_item_pricing_schemes_form.value = true;
}

const closeItemPricingSchemeForm = () => {
    open_item_pricing_schemes_form.value = false;
}

const onSubmit = () => {
    alert('Submitted')
}

const closeDialog = () => {
    emits('close-dialog')
}
</script>

<style scoped>
</style>