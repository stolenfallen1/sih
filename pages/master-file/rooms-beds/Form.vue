<template>
    <v-dialog
        :model-value="form_dialog"
        fullscreen
        :scrim="false"
        transition="dialog-bottom-transition"
        scrollable
    >
        <v-card>
            <v-card-title>
                <v-card-actions>
                    <p>Room and Bed Maintenance</p>
                    <v-spacer></v-spacer>
                    <v-btn color="black" @click="closeDialog">X</v-btn>
                </v-card-actions>
            </v-card-title>
            <v-divider></v-divider>
            <v-card-text style="max-height: auto">
                <v-col cols="12">
                    <v-list-subheader inset>
                        Rooms and Beds Information
                    </v-list-subheader>
                    <v-row>
                        <v-col lg="3">
                            <v-text-field
                                label="Main Branch"
                                type="text"
                                disabled
                                density="compact"
                                variant="outlined"
                            ></v-text-field>
                        </v-col>
                        <v-col lg="3">
                            <v-select
                                label="Building Name"
                                :items="buildings"
                                required
                                :rules="[
                                    (v) =>
                                        !!v || 'Building name is required',
                                ]"
                                variant="outlined"
                                density="compact"
                            ></v-select>
                        </v-col>
                        <v-col lg="3">
                            <v-select
                                label="Floor Level"
                                :items="floors"
                                required
                                :rules="[
                                    (v) =>
                                        !!v || 'Floor level is required',
                                ]"
                                variant="outlined"
                                density="compact"
                            ></v-select>
                        </v-col>
                        <v-col lg="3">
                            <v-select
                                label="Nursing Ward Station"
                                :items="nursing_ward_stations"
                                required
                                :rules="[
                                    (v) =>
                                        !!v || 'Nursing Station is required',
                                ]"
                                variant="outlined"
                                density="compact"
                            ></v-select>
                        </v-col>
                        <v-col lg="3">
                            <v-select
                                label="Room Type Class"
                                :items="room_type"
                                required
                                :rules="[
                                    (v) =>
                                        !!v || 'Room type is required',
                                ]"
                                variant="outlined"
                                density="compact"
                            ></v-select>
                        </v-col>
                        <v-col lg="2">
                            <v-text-field
                                label="Room No."
                                type="text"
                                required
                                :rules="[
                                    (v) =>
                                        !!v || 'Room No. is required',
                                ]"
                                density="compact"
                                variant="outlined"
                            ></v-text-field>
                        </v-col>
                        <v-col lg="2">
                            <v-text-field
                                label="No. of Beds"
                                type="text"
                                density="compact"
                                variant="outlined"
                            ></v-text-field>
                        </v-col>
                        <v-col lg="3">
                            <v-select
                                label="Room Status"
                                :items="room_status"
                                required
                                :rules="[
                                    (v) =>
                                        !!v || 'Room Status is required',
                                ]"
                                variant="outlined"
                                density="compact"
                            ></v-select>
                        </v-col>
                        <v-col lg="2">
                            <v-text-field
                                label="Average Bed Rate"
                                type="text"
                                density="compact"
                                variant="outlined"
                            ></v-text-field>
                        </v-col>
                        <v-col lg="12">
                                <v-textarea
                                    class="cursor-pointer"
                                    label="Notes for Remarks / Room Feature / Amenities"
                                    variant="outlined"
                                ></v-textarea>
                            </v-col>
                    </v-row>
                </v-col>
                <v-divider></v-divider>
                <v-col cols="12" class="mt-1">
                    <v-row>
                        <v-col lg="6">
                            <v-card>
                                <v-card-title>List of Beds</v-card-title>
                                <v-card-text>
                                    <v-table density="compact">
                                        <thead>
                                            <tr>
                                                <th>Bed Number</th>
                                                <th>Bed Status</th>
                                                <th width="4"></th>
                                                <th width="4"></th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <template v-for="(status, typeIndex) in bed_status" :key="typeIndex">
                                                <tr>                                 
                                                    <template v-for="(value, key) in status" :key="key">
                                                        <td v-if="key === 'bed_number'">{{ value }}</td>
                                                    </template>
                                                    <template v-for="(value, key) in status" :key="key">
                                                        <td v-if="key === 'status'">{{ value }}</td>
                                                    </template>
                                                    <template v-for="(value, key) in status" :key="key">
                                                        <td v-if="key === 'checkbox1'">
                                                            <v-checkbox density="compact"></v-checkbox>
                                                        </td>
                                                    </template>
                                                    <template v-for="(value, key) in status" :key="key">
                                                        <td v-if="key === 'checkbox2'">
                                                            <v-checkbox density="compact"></v-checkbox>
                                                        </td>
                                                    </template>
                                                </tr>
                                            </template>
                                        </tbody>
                                    </v-table>
                                </v-card-text>
                                <v-card-actions>
                                    <v-btn class="bg-primary text-white" type="submit" @click="handleAdd">Add</v-btn>
                                    <v-btn class="bg-error text-white" type="submit" @click="handleDelete">Delete</v-btn>
                                </v-card-actions>
                            </v-card>
                        </v-col>
                        <v-col lg="6">
                            <v-card>
                                <v-card-title>Price Schemes</v-card-title>
                                <v-card-text>
                                    <v-table density="compact">
                                        <thead>
                                            <tr>
                                                <th>Price Scheme Description</th>
                                                <th>Price</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <template v-for="(schemes, typeIndex) in price_schemes" :key="typeIndex">
                                                <tr>                                 
                                                    <template v-for="(value, key) in schemes" :key="key">
                                                        <td v-if="key === 'price_scheme_description'">
                                                            {{ value }}
                                                        </td>
                                                    </template>
                                                    <template v-for="(value, key) in schemes" :key="key">
                                                        <td v-if="key === 'price'">
                                                            <v-text-field
                                                                class="mt-2"
                                                                variant="outlined"
                                                                density="compact"
                                                            ></v-text-field>
                                                        </td>
                                                    </template>
                                                </tr>
                                            </template>
                                        </tbody>
                                    </v-table>
                                </v-card-text>
                            </v-card>
                        </v-col>
                    </v-row>
                </v-col>
            </v-card-text>
            <v-divider></v-divider>
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn
                    class="bg-primary text-white"
                    type="submit"
                    @click.prevent="submit"
                    >Submit</v-btn
                >
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script setup>

const props = defineProps({
    form_dialog: {
        type: Boolean,
        default: () => false,
    },
});
const emits = defineEmits();

const closeDialog = () => {
    emits('close-dialog');
}

const buildings = [
    'Main Building',
    'Annex Building'
]
const floors = [
    '1st Floor',
    '2nd Floor',
    '3rd Floor'
]
const nursing_ward_stations = [
    '2A',
    '2B',
    '3A',
    '3B'
]
const room_type = [
    'Private',
    'Luxury',
    'Public'
]
const room_status = [
    'Available',
    'Not Available'
]

const bed_status = [
    {
        bed_number: 1,
        status: 'Available',
        checkbox1: false,
        checkbox2: false,
    },
    {
        bed_number: 2,
        status: 'Not Available',
        checkbox1: false,
        checkbox2: false,
    },
]
const price_schemes = [
    {
        price_scheme_description: 'Standard',
        price: 0
    },
    {
        price_scheme_description: 'Non-standard',
        price: 0
    }
]

const handleAdd = () => {
    alert('Add');
}
const handleDelete = () => {
    alert('Delete');
}

const submit = () => {
    alert('Submit');
}

</script>

<style scoped>
.dialog-bottom-transition-enter-active,
.dialog-bottom-transition-leave-active {
    transition: transform 0.2s ease-in-out;
}
</style>