<template>
    <v-card>
        <v-card-title>Discount Details</v-card-title>
        <v-card-text>
            <v-container>
                <v-table density="compact">
                    <thead>
                        <tr>
                            <th>Description</th>
                            <th>Discount</th>
                        </tr>
                    </thead>
                    <tbody>
                        <template v-for="(types, typeIndex) in discount_types" :key="typeIndex">
                            <tr>                                 
                                <template v-for="(value, key) in types" :key="key">
                                    <td v-if="key === 'description'">{{ value }}</td>
                                </template>
                                <template v-for="(value, key) in types" :key="key">
                                    <td v-if="key === 'discount'">
                                        <v-text-field
                                            class="my-2"
                                            type="text"
                                            density="compact"
                                            variant="outlined"
                                        ></v-text-field>
                                    </td>
                                </template>
                            </tr>
                        </template>
                    </tbody>
                </v-table>
            </v-container>
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions>
            <v-btn color="blue-darken-1" @click="closeDialog"> Close </v-btn>
            <v-spacer></v-spacer>
            <v-btn class="bg-primary text-white" type="submit">Save</v-btn>
        </v-card-actions>
    </v-card>
</template>

<script setup>
definePageMeta({
    layout: "root-layout",
});
const props = defineProps({
    discount_types: Array,
});
const emits = defineEmits()

const closeDialog = () => {
    emits("close-dialog");
};

</script>

<style scoped>
</style>