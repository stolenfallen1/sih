<template>
    <v-card>
        <v-card-title>Central Database Lookup Window</v-card-title>
        <v-divider></v-divider>
        <v-card-text>
            <v-container>
                <v-row>
                    <v-col cols="3" class="pa-1">
                        <v-text-field
                            class="mt-3"
                            variant="outlined"
                            label="Lastname"
                            density="compact"
                            :rules="[(v) => !!v || 'Lastname is required']"
                        ></v-text-field>
                    </v-col>
                    <v-col cols="3" class="pa-1">
                        <v-text-field
                            class="mt-3"
                            variant="outlined"
                            label="Firstname"
                            density="compact"
                            :rules="[(v) => !!v || 'Firstname is required']"
                        ></v-text-field>
                    </v-col>
                    <v-col cols="3" class="pa-1">
                        <v-text-field
                            class="mt-3"
                            variant="outlined"
                            label="Middlename"
                            density="compact"
                        ></v-text-field>
                    </v-col>
                    <v-col cols="3" class="pt-4">
                        <v-text-field
                            label="Birth Date"
                            density="compact"
                            type="date"
                            variant="outlined"
                            :rules="[(v) => !!v || 'Birthdate is required']"
                        ></v-text-field>
                    </v-col>
                    <v-btn class="bg-info text-white mb-4 ml-1" type="submit" density="compact" @click="handleSearch"><v-icon>mdi-magnify</v-icon>Search</v-btn>
                    <v-divider></v-divider>
                    <v-col cols="12">
                        <v-table density="compact">
                        <thead>
                            <tr>
                                <th class="font-weight-bold">Lastname</th>
                                <th class="font-weight-bold">Firstname</th>
                                <th class="font-weight-bold">Middlename</th>
                                <th class="font-weight-bold">Birthdate</th>
                            </tr>
                        </thead>
                        <tbody>
                            <template v-for="(results, typeIndex) in search_results" :key="typeIndex">
                                <tr>
                                    <template v-for="(value, key) in results" :key="key">
                                        <td v-if="key === 'Lastname'">{{ value }}</td>
                                    </template>
                                    <template v-for="(value, key) in results" :key="key">
                                        <td v-if="key === 'Firstname'">{{ value }}</td>
                                    </template>
                                    <template v-for="(value, key) in results" :key="key">
                                        <td v-if="key === 'Middlename'">{{ value }}</td>
                                    </template>
                                    <template v-for="(value, key) in results" :key="key">
                                        <td v-if="key === 'Birthdate'">{{ value }}</td>
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
            <v-btn color="blue-darken-1" @click="closeDialog"> Close </v-btn>
            <v-spacer></v-spacer>
            <!-- This button should be disabled when there is no data displayed after search -->
            <v-btn class="bg-primary text-white" type="submit" @click="handleClickForOpeningForm">Add</v-btn>
        </v-card-actions>
    </v-card>
</template>

<script setup>
const props = defineProps({
    search_results: {
        type: Array,
        default: () => []
    }
})
const emits = defineEmits()

const handleSearch = () => {
    emits('search')
}

const closeDialog = () => {
    emits('close-dialog')
}

const handleClickForOpeningForm = () => {
    emits('open-form')
}
</script>

<style scoped>
</style>