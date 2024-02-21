<template>
    <v-row>
        <v-col cols="12" sm="8" md="9">
            <v-card class="px-4" elevation="2">
                <v-list-subheader inset>
                    Personal Information
                </v-list-subheader>
                <v-row>
                    <v-col lg="4">
                        <v-text-field
                            label="Patient No"
                            type="text"
                            disabled
                            density="compact"
                            variant="outlined"
                        ></v-text-field>
                    </v-col>
                    <v-col lg="4">
                        <v-text-field
                            label="Patient ID"
                            type="text"
                            density="compact"
                            variant="outlined"
                        ></v-text-field>
                    </v-col>
                    <v-col lg="4">
                        <v-text-field
                            label="MR Locator No."
                            type="text"
                            density="compact"
                            variant="outlined"
                        ></v-text-field>
                    </v-col>
                </v-row>
                <v-row class="mt-1">
                    <v-col lg="3">
                        <v-text-field
                            label="Lastname*"
                            type="text"
                            density="compact"
                            variant="outlined"
                            :rules="[
                                (v) =>
                                    !!v || 'Lastname is required',
                            ]"
                        ></v-text-field>
                    </v-col>
                    <v-col lg="3">
                        <v-text-field
                            label="Firstname*"
                            type="text"
                            density="compact"
                            variant="outlined"
                            :rules="[
                                (v) =>
                                    !!v || 'Firstname is required',
                            ]"
                        ></v-text-field>
                    </v-col>
                    <v-col lg="3">
                        <v-text-field
                            label="Middlename"
                            type="text"
                            density="compact"
                            variant="outlined"
                        ></v-text-field>
                    </v-col>
                    <v-col lg="3">
                        <v-select
                            label="Suffix"
                            :items="suffix"
                            variant="outlined"
                            density="compact"
                        ></v-select>
                    </v-col>
                </v-row>
                <v-row class="mt-1">
                    <v-col lg="3">
                        <v-select
                            label="Civil Status"
                            :items="civil_status"
                            variant="outlined"
                            density="compact"
                        ></v-select>
                    </v-col>
                    <v-col lg="3">
                        <v-select
                            label="Gender"
                            :items="gender"
                            variant="outlined"
                            density="compact"
                        ></v-select>
                    </v-col>
                    <v-col lg="3">
                        <v-select
                            label="Nationality"
                            :items="nationality"
                            variant="outlined"
                            density="compact"
                        ></v-select>
                    </v-col>
                    <v-col lg="3">
                        <v-select
                            label="Religion"
                            :items="religion"
                            variant="outlined"
                            density="compact"
                        ></v-select>
                    </v-col>
                </v-row>
            </v-card>
            <v-card class="px-4 mt-4" elevation="2">
                <v-list-subheader inset>
                    Personal Statistics
                </v-list-subheader>
                <v-row class="mt-1">
                    <v-col lg="3">
                        <v-select
                            label="Blood Type"
                            :items="blood_type"
                            variant="outlined"
                            density="compact"
                        ></v-select>
                    </v-col>
                    <v-col lg="2">
                        <v-text-field
                            label="Weight"
                            type="text"
                            density="compact"
                            variant="outlined"
                        ></v-text-field>
                    </v-col>
                    <v-col lg="2">
                        <v-text-field
                            label="Height"
                            type="text"
                            density="compact"
                            variant="outlined"
                        ></v-text-field>
                    </v-col>
                    <v-col lg="2">
                        <v-text-field
                            label="Temperature"
                            type="text"
                            density="compact"
                            variant="outlined"
                        ></v-text-field>
                    </v-col>
                    <v-col lg="3">
                        <v-text-field
                            label="Blood Pressure"
                            type="text"
                            density="compact"
                            variant="outlined"
                        ></v-text-field>
                    </v-col>
                </v-row>
            </v-card>    
            <v-col cols="12" class="mt-1">
                <v-row>
                    <v-col lg="6">
                        <v-card elevation="2">
                            <v-list-subheader inset class="ml-4">
                                Race / Ethnicity
                            </v-list-subheader>
                            <v-card-text>
                                <v-row>
                                    <v-col lg="6">
                                        <v-checkbox
                                            label="Asian"
                                        ></v-checkbox>
                                    </v-col>
                                    <v-col lg="6">
                                        <v-checkbox
                                            label="African American"
                                        ></v-checkbox>
                                    </v-col>
                                    <v-col lg="6">
                                        <v-checkbox
                                            label="American"
                                        ></v-checkbox>
                                    </v-col>
                                    <v-col lg="6">
                                        <v-checkbox
                                            label="Hispanic / Latino"
                                        ></v-checkbox>
                                    </v-col>
                                    <v-col lg="6">
                                        <v-checkbox
                                            label="Native Hawaiian or Pacific Islander"
                                        ></v-checkbox>
                                    </v-col>
                                    <v-col lg="6">
                                        <v-checkbox
                                            label="Others"
                                        ></v-checkbox>
                                    </v-col>
                                </v-row>
                            </v-card-text>
                        </v-card>
                    </v-col>
                    <v-col lg="6">
                        <v-card elevation="2">
                            <v-list-subheader inset class="ml-4">
                                Other Personal Infos
                            </v-list-subheader>
                            <v-card-text>
                                <v-row>
                                    <v-col lg="6">
                                        <v-text-field
                                            label="Age"
                                            type="text"
                                            density="compact"
                                            variant="outlined"
                                        ></v-text-field>
                                    </v-col>
                                    <v-col lg="6">
                                        <v-text-field
                                            label="Birth Date"
                                            density="compact"
                                            type="date"
                                            variant="outlined"
                                        ></v-text-field>
                                    </v-col>
                                    <v-col lg="6">
                                        <v-text-field
                                            label="Birth place"
                                            type="text"
                                            density="compact"
                                            variant="outlined"
                                        ></v-text-field>
                                    </v-col>
                                    <v-col lg="6">
                                        <v-text-field
                                            label="Citizenship"
                                            type="text"
                                            density="compact"
                                            variant="outlined"
                                        ></v-text-field>
                                    </v-col>
                                    <v-col lg="6">
                                        <v-text-field
                                            label="Passport No."
                                            type="text"
                                            density="compact"
                                            variant="outlined"
                                        ></v-text-field>
                                    </v-col>
                                    <v-col lg="6">
                                        <v-text-field
                                            label="X-ray File No."
                                            type="text"
                                            density="compact"
                                            variant="outlined"
                                        ></v-text-field>
                                    </v-col>
                                    <v-col lg="12">
                                        <v-text-field
                                            label="Localizataion"
                                            type="text"
                                            disabled
                                            density="compact"
                                            variant="outlined"
                                        ></v-text-field>
                                    </v-col>
                                </v-row>
                            </v-card-text>
                        </v-card>
                    </v-col>
                </v-row>
            </v-col>
        </v-col>
        <v-col cols="12" sm="4" md="3">
            <v-card class="px-4" elevation="2">
                <v-row>
                    <!-- Digital Signature -->
                    <!-- <v-col cols="12" align="center">
                        <v-card class="pa-1">
                            <v-avatar rounded="0" size="155">
                                <v-img
                                    cover
                                    width="100%"
                                    alt="Selected Image"
                                ></v-img>
                            </v-avatar>
                        </v-card>
                    </v-col> -->
                    <v-col cols="12" align="center">
                        <v-card class="pa-1 mt-2">
                            <v-avatar rounded="0" size="155">
                                <v-img
                                    cover
                                    width="100%"
                                    alt="Selected Image"
                                ></v-img>
                            </v-avatar>
                        </v-card>
                    </v-col>
                    <v-col cols="12">
                        <v-file-input
                            class="mt-3"
                            type="file"
                            variant="outlined"
                            bg-color="primary"
                            clearable
                            label="Manage Picture"
                            density="compact"
                            hide-details
                        ></v-file-input>
                    </v-col>
                    <v-col lg="6">
                        <v-checkbox
                            label="Child?"
                        ></v-checkbox>
                    </v-col>
                    <v-col lg="6">
                        <v-checkbox
                            label="Non-local?"
                        ></v-checkbox>
                    </v-col>
                    <v-col lg="12">
                        <v-checkbox
                            label="Hospital Employee"
                        ></v-checkbox>
                    </v-col>
                    <v-col lg="12">
                        <v-checkbox
                            label="No communication from company"
                        ></v-checkbox>
                    </v-col>
                    <v-col lg="12">
                        <v-checkbox
                            label="No personal data released to other parties"
                        ></v-checkbox>
                    </v-col>
                    <v-col lg="12">
                        <v-checkbox
                            label="Mark this patient as Black Listed or On Hold"
                        ></v-checkbox>
                    </v-col>
                </v-row>
            </v-card>
        </v-col>
    </v-row>
    <v-row>
        <v-col cols="12">
            <v-card class="px-4" elevation="2">
                <v-list-subheader inset>
                    Work Related Information
                </v-list-subheader>
                <v-row class="mt-1">
                    <v-col lg="4">
                        <v-select
                            label="Industry"
                            :items="industry"
                            variant="outlined"
                            density="compact"
                        ></v-select>
                    </v-col>
                    <v-col lg="4">
                        <v-select
                            label="Work Level"
                            :items="work_level"
                            variant="outlined"
                            density="compact"
                        ></v-select>
                    </v-col>
                    <v-col lg="4">
                        <v-text-field
                            label="Company"
                            type="text"
                            density="compact"
                            variant="outlined"
                        ></v-text-field>
                    </v-col>
                </v-row>
                <v-row>
                    <v-col lg="3">
                        <v-text-field
                            label="Tin No."
                            type="text"
                            density="compact"
                            variant="outlined"
                        ></v-text-field>
                    </v-col>
                    <v-col lg="3">
                        <v-text-field
                            label="Address"
                            type="text"
                            density="compact"
                            variant="outlined"
                        ></v-text-field>
                    </v-col>
                    <v-col lg="3">
                        <v-text-field
                            label="Remarks"
                            type="text"
                            density="compact"
                            variant="outlined"
                        ></v-text-field>
                    </v-col>
                    <v-col lg="3">
                        <v-text-field
                            label="Occupation"
                            type="text"
                            density="compact"
                            variant="outlined"
                        ></v-text-field>
                    </v-col>
                </v-row>
            </v-card>
        </v-col>
    </v-row>
</template>

<script setup>
const suffix = [
    'Available',
    'Not Available'
]
const civil_status = [
    'Single',
    'Married',
    'Widowed',
]
const gender = [
    'Male',
    'Female',
]
const nationality = [
    'Filipino',
    'Non-Filipino',
    'Black',
    'Brown',
    'Insik',
]
const religion = [
    'Catholic',
    'Muslim',
    'Iglesia ni Cristo',
    'Born Again',
]
const blood_type = [
    'A',
    'B',
    'AB',
    'O',
]
const industry = [
    'Healthcare',
    'Information Technology',
    'Education',
    'Manufacturing',
    'Retail',
    'Finance',
    'Real Estate',
    'Construction',
    'Transportation',
    'Others',
]
const work_level = [
    'Entry Level',
    'Supervisor',
    'Manager',
    'Executive',
    'Others',
]
</script>

<style scoped>

</style>