<template>
    <v-col cols="12">
        <v-card class="px-4" elevation="4">
            <v-list-subheader inset>
                CPT Information
            </v-list-subheader>
            <v-card-text>
                <v-row>
                    <v-col lg="4">
                        <v-text-field
                            label="CPT Code"
                            type="text"
                            density="compact"
                            variant="outlined"
                        ></v-text-field>
                    </v-col>
                    <v-col lg="4">
                        <v-select
                            label="Section"
                            :items="section" 
                            variant="outlined"
                            density="compact"
                        ></v-select>
                    </v-col>
                    <v-col lg="4">
                        <v-select
                            label="Sub Section"
                            :items="sub_section" 
                            variant="outlined"
                            density="compact"
                        ></v-select>
                    </v-col>
                </v-row>
                <v-row>
                    <v-col lg="4">
                        <v-text-field
                            label="Symbol"
                            type="text"
                            density="compact"
                            variant="outlined"
                        ></v-text-field>
                    </v-col>
                    <v-col lg="4">
                        <v-text-field
                            label="RUV No."
                            type="number"
                            density="compact"
                            variant="outlined"
                        ></v-text-field>
                    </v-col>
                    <v-col lg="4">
                        <v-text-field
                            label="RUV Rate"
                            type="number"
                            density="compact"
                            variant="outlined"
                        ></v-text-field>
                    </v-col>
                </v-row>
            </v-card-text>
        </v-card>
        <v-card class="mt-4" elevation="4">
            <v-row>
                <v-col lg="12">
                    <v-card-title class="text-center">Modifiers</v-card-title>
                    <v-card-text>
                        <v-table density="compact">
                            <thead>
                                <tr>
                                    <th v-for="(header, index) in modifierHeaders" :key="index">
                                        {{ header }}
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td v-for="(header, index) in modifierHeaders" :key="index">
                                        <template v-if="showModifierTextFields">
                                            <v-text-field
                                                v-model="modifierFields[index]"
                                                type="text"
                                                density="compact"
                                                variant="outlined"
                                            ></v-text-field>
                                        </template>
                                    </td>
                                </tr>
                            </tbody>
                        </v-table>
                    </v-card-text>
                    <v-card-actions>
                        <v-btn class="bg-primary text-white" type="submit" @click="addModifierFields">
                            {{ showModifierTextFields ? 'Save' : 'Add' }}
                        </v-btn>
                        <v-btn class="bg-error text-white" type="submit" @click="deleteModifierFields" v-if="showModifierTextFields">
                            Delete
                        </v-btn>
                    </v-card-actions>
                </v-col>
            </v-row>
        </v-card>
    </v-col>
</template>

<script setup>

const section = [
    'Section 1',
    'Section 2',
]

const sub_section = [
    'Sub Section 1',
    'Sub Section 2',
]

const modifierHeaders = ['Modifier Description', 'Price', 'Empty Header name'];

const showModifierTextFields = ref(false);
const modifierFields = ref([]);

const addModifierFields = () => {
    if (!showModifierTextFields.value) {
        showModifierTextFields.value = true;
        modifierFields.value = Array(modifierHeaders.length).fill('');
    } else {
        // Save the data or perform any other action needed
        console.log('Saving Patient Information:', modifierFields.value);
        showModifierTextFields.value = false;
    }
}

const deleteModifierFields = () => {
    showModifierTextFields.value = false;
    modifierFields.value = [];
};
</script>

<style>
</style>