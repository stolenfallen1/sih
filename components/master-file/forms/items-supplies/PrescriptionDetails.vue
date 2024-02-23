<template>
    <v-col cols="12">
        <v-card class="px-4" elevation="2">
            <v-card-text>
                <v-row>
                    <v-col lg="7">
                        <v-row>
                            <v-col lg="6">
                                <v-text-field
                                    label="Dosage"
                                    type="number"
                                    density="compact"
                                    variant="outlined"
                                ></v-text-field>
                            </v-col>
                            <v-col lg="6">
                                <v-select
                                    label="Unit of measurement"
                                    :items="unit_of_measurement" 
                                    variant="outlined"
                                    density="compact"
                                ></v-select>
                            </v-col>
                            <v-col lg="6">
                                <v-select
                                    label="Preparation"
                                    :items="preparation" 
                                    variant="outlined"
                                    density="compact"
                                ></v-select>
                            </v-col>
                            <v-col lg="6">
                                <v-text-field
                                    label="Default Quantity"
                                    type="number"
                                    density="compact"
                                    variant="outlined"
                                ></v-text-field>
                            </v-col>
                            <v-col cols="12">
                                <v-textarea
                                    class="cursor-pointer"
                                    label="Rx Line Item"
                                    variant="outlined"
                                ></v-textarea>
                            </v-col>
                        </v-row>
                    </v-col>
                    <v-col lg="5">
                        <v-row>
                            <v-col lg="12">
                                <v-select
                                    label="Frequency"
                                    :items="frequency" 
                                    variant="outlined"
                                    density="compact"
                                ></v-select>
                            </v-col>
                            <v-col lg="12">
                                <v-select
                                    label="Indication"
                                    :items="indication" 
                                    variant="outlined"
                                    density="compact"
                                ></v-select>
                            </v-col>
                            <v-col lg="12">
                                <v-select
                                    label="Duration"
                                    :items="duration" 
                                    variant="outlined"
                                    density="compact"
                                ></v-select>
                            </v-col>
                            <v-col lg="12">
                                <v-select
                                    label="Others"
                                    :items="others" 
                                    variant="outlined"
                                    density="compact"
                                ></v-select>
                            </v-col>
                            <v-col lg="12">
                                <v-select
                                    label="Route"
                                    :items="route" 
                                    variant="outlined"
                                    density="compact"
                                ></v-select>
                            </v-col>
                        </v-row>
                    </v-col>
                </v-row>
            </v-card-text>
        </v-card>
    </v-col>
    <v-col cols="12">
        <v-card class="mt-4" elevation="2">
            <v-row>
                <v-col lg="12">
                    <v-card-title class="text-center">Precautions</v-card-title>
                    <v-card-text>
                        <v-table density="compact">
                            <thead>
                                <tr>
                                    <th class="text-center">Description</th>
                                    <th width="4"></th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>
                                        <!-- Body of the table --> 
                                    </td>
                                </tr>
                            </tbody>
                        </v-table>
                    </v-card-text>
                    <v-card-actions>
                        <v-btn class="bg-primary text-white" type="submit" @click="handleAdd">
                            Add
                        </v-btn>
                        <v-btn class="bg-info text-white" type="submit" @click="handleEdit">
                            Edit
                        </v-btn>
                        <v-btn class="bg-error text-white" type="submit" @click="handleDelete">
                            Delete
                        </v-btn>
                    </v-card-actions>
                </v-col>
            </v-row>
        </v-card>
    </v-col>
    <pre-caution-form 
        :precaution_dialog="precaution_dialog" 
        @close-dialog="closePrecautionDialog" 
        @handle-precaution-type="handlePrecautionType"
    />
</template>

<script setup>
import PreCautionForm from './sub-forms/PreCautionForm.vue'

const precaution_dialog = ref(false)

const unit_of_measurement = [
    'Pieces',
    'Boxes',
    'Bottles',
]
const preparation = [
    'Ampule',
    'Capsule',
    'Tablet',
]
const frequency = [
    'Once a day',
    'Twice a day',
    'Thrice a day',
]
const indication = [
    'Before meal',
    'After meal',
    'With meal',
]
const duration = [
    '1 day',
    '2 days',
    '3 days',
]
const others = [
    'As needed',
    'PRN',
    'Stat',
]
const route = [
    'Oral',
    'IV',
    'IM',
]

// Same form UI for add and edit
const handleAdd = () => {
    precaution_dialog.value = true
}

const handleEdit = () => {
    alert("handleEdit")
}

const handleDelete = () => {
    alert("handleDelete")
}

const closePrecautionDialog = () => {
    precaution_dialog.value = false
}

const handlePrecautionType = () => {
    alert('Submit Precaution Type')
}



</script>

<style>
</style>