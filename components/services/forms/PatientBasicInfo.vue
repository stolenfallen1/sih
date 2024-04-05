<template>
    <v-row>
        <v-col cols="3">
            <v-col cols="12" class="form-col">
                <v-text-field
                    variant="outlined"
                    label="Patient No."
                    placeholder="Patient No."
                    v-model="payload.patient_no"
                    readonly
                    hide-details
                    density="compact"
                ></v-text-field>
            </v-col>
            <v-col cols="12" class="form-col">
                <v-text-field
                    variant="outlined"
                    label="Patient ID"
                    placeholder="Patient ID"
                    v-model="payload.patient_id"
                    readonly
                    hide-details
                    density="compact"
                ></v-text-field>
            </v-col>
            <v-col cols="12" class="form-col">
                <v-text-field
                    label="Last Name"
                    placeholder="Enter Patient Last Name"
                    v-model="payload.lastname"
                    type="text"
                    required
                    hide-details
                    density="compact"
                    variant="outlined"
                    ></v-text-field>
            </v-col>
            <v-col cols="12" class="form-col">
                <v-text-field
                    variant="outlined"
                    label="First Name"
                    placeholder="Enter Patient First Name"
                    v-model="payload.firstname"
                    required
                    hide-details
                    density="compact"
                ></v-text-field>
            </v-col>
            <v-col cols="12" class="form-col">
                <v-text-field
                    variant="outlined"
                    label="Middle Name"
                    placeholder="Enter Patient Middle Name"
                    v-model="payload.middlename"
                    hide-details
                    density="compact"
                ></v-text-field>
            </v-col>
            <v-col cols="12" class="form-col">
                <v-text-field
                    variant="outlined"
                    label="Alias"
                    placeholder="Enter Patient Alias"
                    v-model="payload.alias"
                    hide-details
                    density="compact"
                ></v-text-field>
            </v-col>
            <v-col cols="12" class="form-col">
                <v-autocomplete
                    item-title="suffix_name"
                    item-value="id"
                    label="Suffix"
                    placeholder="Select Suffix"
                    :items="[]"
                    v-model="payload.suffix"
                    hide-details
                    clearable
                    density="compact"
                    variant="outlined"
                ></v-autocomplete>
            </v-col>
        </v-col>
        <v-col cols="3">
            <v-col cols="12" class="form-col">
                <v-autocomplete
                    item-title="sex"
                    item-value="id"
                    label="Sex"
                    placeholder="Select Gender"
                    :items="[]"
                    v-model="payload.sex"
                    required
                    hide-details
                    clearable
                    density="compact"
                    variant="outlined"
                ></v-autocomplete>
            </v-col>
            <v-col cols="12" class="form-col">
                <v-autocomplete
                    item-title="civil_status"
                    item-value="id"
                    label="Civil Status"
                    placeholder="Select Civil Status"
                    :items="[]"
                    required
                    v-model="payload.civil_status"
                    hide-details
                    clearable
                    density="compact"
                    variant="outlined"
                ></v-autocomplete>
            </v-col>
            <v-col cols="12" class="form-col">
                <v-text-field
                    variant="outlined"
                    label="Telephone No."
                    placeholder="Enter Telephone No."
                    v-model="payload.telephone_no"
                    type="number"
                    hide-details
                    density="compact"
                ></v-text-field>
            </v-col>
            <v-col cols="12" class="form-col">
                <v-text-field
                    variant="outlined"
                    label="Mobile No."
                    placeholder="Enter Mobile No."
                    v-model="payload.mobile_no"
                    type="number"
                    hide-details
                    density="compact"
                ></v-text-field>
            </v-col>
            <v-col cols="12" class="form-col">
                <v-text-field
                    variant="outlined"
                    label="Email Address"
                    placeholder="Enter Email Address"
                    v-model="payload.email"
                    type="email"
                    hide-details
                    density="compact"
                ></v-text-field>
            </v-col>
            <v-col cols="12" class="form-col">
                <v-checkbox label="Send result(s) online?" v-model="payload.sendResultsOnline" disabled hide-details density="compact"></v-checkbox>
            </v-col>
        </v-col>
        <v-col cols="3">
            <v-col cols="12" class="form-col">
                <v-text-field
                    variant="outlined"
                    label="Dialect"
                    placeholder="Enter Dialect"
                    v-model="payload.dialect"
                    hide-details
                    density="compact"
                ></v-text-field>
            </v-col>
            <v-col cols="12" class="form-col">
                <v-text-field
                    variant="outlined"
                    label="Blood Pressure"
                    placeholder="Enter Blood Pressure"
                    v-model="payload.blood_pressure"
                    hide-details
                    density="compact"
                ></v-text-field>
            </v-col>
            <v-col cols="12" class="form-col">
                <v-text-field
                    variant="outlined"
                    label="Temperature"
                    placeholder="Enter Temperature"
                    v-model="payload.temperature"
                    hide-details
                    density="compact"
                ></v-text-field>
            </v-col>
            <v-col cols="12" class="form-col">
                <v-text-field
                    variant="outlined"
                    label="Weight"
                    placeholder="Enter Weight"
                    v-model="payload.weight"
                    hide-details
                    density="compact"
                ></v-text-field>
            </v-col>
            <v-col cols="12" class="form-col">
                <v-text-field
                    variant="outlined"
                    label="Height"
                    placeholder="Enter Height"
                    v-model="payload.height"
                    hide-details
                    density="compact"
                ></v-text-field>
            </v-col>
            <v-col cols="12" class="form-col">
                <v-text-field
                    variant="outlined"
                    label="Body Mass Index"
                    v-model="payload.bmi"
                    readonly
                    hide-details
                    density="compact"
                ></v-text-field>
            </v-col>
        </v-col>
        <v-col cols="3">
            <v-col cols="12" class="form-col">
                <v-text-field
                    variant="outlined"
                    label="Birthdate"
                    v-model="payload.birthdate"
                    type="date"
                    required
                    hide-details
                    density="compact"
                ></v-text-field>
            </v-col>
            <v-col cols="12" class="form-col">
                <v-text-field
                    variant="outlined"
                    label="Birth Time"
                    v-model="payload.birthtime"
                    readonly
                    hide-details
                    density="compact"
                ></v-text-field>
            </v-col>
            <v-col cols="12" class="form-col">
                <v-text-field
                    variant="outlined"
                    label="Age"
                    placeholder="Enter Age"
                    v-model="payload.age"
                    type="number"
                    hide-details
                    density="compact"
                ></v-text-field>
            </v-col>
            <v-col cols="12" class="form-col">
                <v-checkbox label="Is Child?" v-model="payload.isChild" disabled hide-details density="compact"></v-checkbox>
            </v-col>
            <v-col cols="12" class="form-col">
                <v-checkbox label="Is Non-local?" v-model="payload.isNonLocal" disabled hide-details density="compact"></v-checkbox>
            </v-col>
            <v-col cols="12" class="form-col">
                <v-checkbox label="Is Confidential Patient Record?" v-model="payload.isConfidential" hide-details density="compact"></v-checkbox>
            </v-col>
        </v-col>
    </v-row>
</template>

<script setup>
const props = defineProps({
    payload: {
        type: Object,
        required: true,
        default: () => ({})
    }
})
</script>

<style scoped>
.form-col {
    padding: 3.25px 0px 3.25px 0px !important;
    margin: 0px !important;
}
</style>