<template>
    <v-row>
        <v-col cols="3">
            <v-col cols="12" class="form-col">
                <v-list-subheader class="form-header">Patient No.</v-list-subheader>
                <v-text-field
                    variant="solo"
                    v-model="payload.patient_no"
                    readonly
                    hide-details
                    density="compact"
                ></v-text-field>
            </v-col>
            <v-col cols="12" class="form-col">
                <v-list-subheader class="form-header">Patient ID</v-list-subheader>
                <v-text-field
                    variant="solo"
                    v-model="payload.patient_id"
                    readonly
                    hide-details
                    density="compact"
                ></v-text-field>
            </v-col>
            <v-col cols="12" class="form-col">
                <v-list-subheader class="form-header">Last name <span style="color: red;" class="mdi mdi-check"></span></v-list-subheader>
                <v-text-field
                    placeholder="Enter Patient Last Name"
                    v-model="payload.lastname"
                    type="text"
                    required
                    hide-details
                    density="compact"
                    variant="solo"
                    ></v-text-field>
            </v-col>
            <v-col cols="12" class="form-col">
                <v-list-subheader class="form-header">First name <span style="color: red;" class="mdi mdi-check"></span></v-list-subheader>
                <v-text-field
                    variant="solo"
                    placeholder="Enter Patient First Name"
                    v-model="payload.firstname"
                    required
                    hide-details
                    density="compact"
                ></v-text-field>
            </v-col>
            <v-col cols="12" class="form-col">
                <v-list-subheader class="form-header">Middle name</v-list-subheader>
                <v-text-field
                    variant="solo"
                    placeholder="Enter Patient Middle Name"
                    v-model="payload.middlename"
                    hide-details
                    density="compact"
                ></v-text-field>
            </v-col>
            <v-col cols="12" class="form-col">
                <v-list-subheader class="form-header">Alias</v-list-subheader>
                <v-text-field
                    variant="solo"
                    placeholder="Enter Patient Alias"
                    v-model="payload.alias"
                    hide-details
                    density="compact"
                ></v-text-field>
            </v-col>
            <v-col cols="12" class="form-col">
                <v-list-subheader class="form-header">Suffix</v-list-subheader>
                <v-autocomplete
                    item-title="suffix_name"
                    item-value="id"
                    placeholder="Select Suffix"
                    :items="[]"
                    v-model="payload.suffix_id"
                    hide-details
                    clearable
                    density="compact"
                    variant="solo"
                ></v-autocomplete>
            </v-col>
        </v-col>
        <v-col cols="3">
            <v-col cols="12" class="form-col">
                <v-list-subheader class="form-header">Sex <span style="color: red;" class="mdi mdi-check"></span></v-list-subheader>
                <v-autocomplete
                    item-title="sex"
                    item-value="id"
                    placeholder="Select Sex"
                    :items="[]"
                    v-model="payload.sex_id"
                    required
                    hide-details
                    clearable
                    density="compact"
                    variant="solo"
                ></v-autocomplete>
            </v-col>
            <v-col cols="12" class="form-col">
                <v-list-subheader class="form-header">Civil Status <span style="color: red;" class="mdi mdi-check"></span></v-list-subheader>
                <v-autocomplete
                    item-title="civil_status"
                    item-value="id"
                    placeholder="Select Civil Status"
                    :items="[]"
                    required
                    v-model="payload.civilstatus_id"
                    hide-details
                    clearable
                    density="compact"
                    variant="solo"
                ></v-autocomplete>
            </v-col>
            <v-col cols="12" class="form-col">
                <v-list-subheader class="form-header">Telephone No.</v-list-subheader>
                <v-text-field
                    variant="solo"
                    placeholder="Enter Telephone No."
                    v-model="payload.telephone_number"
                    type="number"
                    hide-details
                    density="compact"
                ></v-text-field>
            </v-col>
            <v-col cols="12" class="form-col">
                <v-list-subheader class="form-header">Mobile No.</v-list-subheader>
                <v-text-field
                    variant="solo"
                    placeholder="Enter Mobile No."
                    v-model="payload.mobile_number"
                    type="number"
                    hide-details
                    density="compact"
                ></v-text-field>
            </v-col>
            <v-col cols="12" class="form-col">
                <v-list-subheader class="form-header">Email Address</v-list-subheader>
                <v-text-field
                    variant="solo"
                    placeholder="Enter Email Address"
                    v-model="payload.email_address"
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
                <v-list-subheader class="form-header">Dialect</v-list-subheader>
                <v-text-field
                    variant="solo"
                    placeholder="Enter Dialect"
                    v-model="payload.dialect"
                    hide-details
                    density="compact"
                ></v-text-field>
            </v-col>
            <v-col cols="12" class="form-col">
                <v-list-subheader class="form-header">Blood Pressure</v-list-subheader>
                <v-text-field
                    variant="solo"
                    placeholder="Enter Blood Pressure"
                    v-model="payload.blood_pressure"
                    hide-details
                    density="compact"
                ></v-text-field>
            </v-col>
            <v-col cols="12" class="form-col">
                <v-list-subheader class="form-header">Temperature</v-list-subheader>
                <v-text-field
                    variant="solo"
                    placeholder="Enter Temperature"
                    v-model="payload.temperature"
                    hide-details
                    density="compact"
                ></v-text-field>
            </v-col>
            <v-col cols="12" class="form-col">
                <v-list-subheader class="form-header">Weight</v-list-subheader>
                <v-text-field
                    variant="solo"
                    placeholder="Enter Weight"
                    v-model="payload.weight"
                    hide-details
                    density="compact"
                ></v-text-field>
            </v-col>
            <v-col cols="12" class="form-col">
                <v-list-subheader class="form-header">Height</v-list-subheader>
                <v-text-field
                    variant="solo"
                    placeholder="Enter Height"
                    v-model="payload.height"
                    hide-details
                    density="compact"
                ></v-text-field>
            </v-col>
            <v-col cols="12" class="form-col">
                <v-list-subheader class="form-header">BMI</v-list-subheader>
                <v-text-field
                    variant="solo"
                    v-model="payload.bmi"
                    readonly
                    hide-details
                    density="compact"
                ></v-text-field>
            </v-col>
        </v-col>
        <v-col cols="3">
            <v-col cols="12" class="form-col">
                <v-list-subheader class="form-header">Birth Date <span style="color: red;" class="mdi mdi-check"></span></v-list-subheader>
                <v-text-field
                    variant="solo"
                    v-model="payload.birthdate"
                    type="date"
                    required
                    hide-details
                    density="compact"
                ></v-text-field>
            </v-col>
            <v-col cols="12" class="form-col">
                <v-list-subheader class="form-header">Birth Time</v-list-subheader>
                <v-text-field
                    variant="solo"
                    v-model="payload.birthtime"
                    readonly
                    hide-details
                    density="compact"
                ></v-text-field>
            </v-col>
            <v-col cols="12" class="form-col">
                <v-list-subheader class="form-header">Age</v-list-subheader>
                <v-text-field
                    variant="solo"
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
.form-header {
    color: #000;
    margin: -12px 0px -12px 0px;
    font-weight: 500;
}
.form-col {
    padding: 3.25px 0px 3.25px 0px !important;
    margin: 0px !important;
}
</style>