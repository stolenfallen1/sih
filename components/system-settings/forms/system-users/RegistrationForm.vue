<template>
    <v-card>
        <v-card-title>
            <span class="text-h7">User Registration</span>
        </v-card-title>
        <v-card-text>
            <v-form ref="form">
                <v-container>
                    <v-row>
                        <v-col cols="12" sm="6" md="4">
                            <v-text-field
                                label="Lastname*"
                                required
                                :rules="nameRules"
                                density="compact"
                                variant="outlined"
                            ></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="6" md="4">
                            <v-text-field
                                label="Firstname*"
                                required
                                :rules="nameRules"
                                density="compact"
                                variant="outlined"
                            ></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="6" md="4">
                            <v-text-field
                                label="Middlename"
                                density="compact"
                                variant="outlined"
                            ></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="6" md="2">
                            <v-text-field
                                label="Suffix"
                                density="compact"
                                variant="outlined"
                            ></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="6" md="4">
                            <v-text-field
                                label="Position"
                                density="compact"
                                variant="outlined"
                            ></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="6" md="4">
                            <v-text-field
                                label="Email"
                                density="compact"
                                variant="outlined"
                            ></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="6" md="2">
                            <v-select
                                :items="['CDUH', 'MDUH', 'SGH', 'NGH']"
                                label="Branch"
                                required
                                :rules="[(v) => !!v || 'Item is required']"
                                clearable
                                density="compact"
                                variant="outlined"
                            ></v-select>
                        </v-col>
                        <v-col cols="12" sm="6" md="4">
                            <v-menu v-model="isDatePickerOpen" width="300">
                                <template v-slot:activator="{ props }">
                                    <v-text-field
                                        v-bind="props"
                                        v-model="selectedDate"
                                        label="Birth Date"
                                        readonly
                                        @click="openDatePicker"
                                        density="compact"
                                        variant="outlined"
                                    ></v-text-field>
                                </template>
                                <v-date-picker
                                    v-model="selectedDate"
                                    @input="closeDatePicker"
                                    input-mode="calendar"
                                    show-adjacent-months
                                ></v-date-picker>
                            </v-menu>
                        </v-col>
                        <v-col cols="12" sm="6" md="4">
                            <v-select
                                :items="[
                                    'IT',
                                    'Dietary',
                                    'Audit',
                                    'Engineering',
                                ]"
                                label="Department"
                                clearable
                                required
                                :rules="[(v) => !!v || 'Item is required']"
                                density="compact"
                                variant="outlined"
                            ></v-select>
                        </v-col>
                        <v-col cols="12" sm="6" md="4">
                            <v-select
                                :items="[
                                    'Section 1',
                                    'Section 2',
                                    'Section 3',
                                    'Section 4',
                                    'Section 5',
                                ]"
                                label="Section"
                                density="compact"
                                variant="outlined"
                            ></v-select>
                        </v-col>
                        <v-col cols="12" sm="6">
                            <v-select
                                :items="[
                                    'User Group 1',
                                    'User Group 2',
                                    'User Group 3',
                                    'User Group 4',
                                    'User Group 5',
                                ]"
                                label="User Group"
                                clearable
                                required
                                :rules="[(v) => !!v || 'Item is required']"
                                density="compact"
                                variant="outlined"
                            ></v-select>
                        </v-col>
                        <v-col cols="12" sm="6">
                            <v-autocomplete
                                :items="[
                                    'System 1',
                                    'System 2',
                                    'System 3',
                                    'System 4',
                                    'System 5',
                                ]"
                                label="System Accessiblity"
                                clearable
                                multiple
                                required
                                :rules="[(v) => !!v || 'Item is required']"
                                density="compact"
                                variant="outlined"
                            ></v-autocomplete>
                        </v-col>
                    </v-row>
                </v-container>
            </v-form>
            <small>*indicates required field</small>
        </v-card-text>
        <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue-darken-1" @click="closeDialog"> Close </v-btn>
            <v-btn color="blue-darken-1" @click="registerUser">
                Register
            </v-btn>
        </v-card-actions>
    </v-card>
</template>

<script setup>
import { ref, defineEmits } from "vue";

const nameRules = [(v) => !!v || "Name is required"];

// const validate = async () => {
//     const { valid } = await this.$refs.form.validate();

//     if (valid) alert("Form is valid");
// };

// const reset = () => {
//     this.$refs.form.reset();
// };

// const resetValidation = () => {
//     this.$refs.form.resetValidation();
// };

const emits = defineEmits();

const isDatePickerOpen = ref(false);
const selectedDate = ref(null);

const openDatePicker = () => {
    isDatePickerOpen.value = true;
};

const closeDatePicker = () => {
    isDatePickerOpen.value = false;
};

const closeDialog = () => {
    emits("close-dialog");
};

const registerUser = () => {
    // Perform user registration logic here
    closeDialog(); // Close the dialog after registration
};
</script>

<style scoped></style>
