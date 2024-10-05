<template>
    <v-row class="mb-2">
        <v-col cols="6">
            <v-row>
                <v-col cols="12">
                    <p style="font-weight: bolder; color: #107bac; font-size: larger; padding-bottom: 10px;">Detailed Reports</p>
                    <v-list-subheader class="form-header">Report Date</v-list-subheader>
                    <v-text-field
                        variant="solo"
                        density="compact"
                        type="date"
                        required
                        hide-details
                    ></v-text-field>
                </v-col>
                <v-col cols="12">
                    <v-list-subheader class="form-header">Encoder Options</v-list-subheader>
                    <v-radio-group density="compact" hide-details>
                        <v-checkbox label="All Encoders" value="0" hide-details density="compact"></v-checkbox>
                        <v-row>
                            <v-col cols="6">
                                <v-checkbox label="Per Encoder" value="1" hide-details density="compact"></v-checkbox>
                            </v-col>
                            <v-col cols="6">
                                <v-text-field
                                    placeholder="Enter Encoder Name"
                                    variant="solo"
                                    density="compact"
                                    hide-details
                                    readonly
                                />
                            </v-col>
                        </v-row>
                    </v-radio-group>
                </v-col>
                <v-col cols="12">
                    <v-list-subheader class="form-header">Shift Options</v-list-subheader>
                    <v-radio-group density="compact" hide-details>
                        <v-checkbox label="All Shifts" value="0" hide-details density="compact"></v-checkbox>
                        <v-row>
                            <v-col cols="6">
                                <v-checkbox label="Specific Shift" value="0" hide-details density="compact"></v-checkbox>
                            </v-col>
                            <v-col cols="6">
                                <v-autocomplete
                                    placeholder="Select Shift"
                                    variant="solo"
                                    density="compact"
                                    hide-details
                                    readonly
                                />
                            </v-col>
                        </v-row>
                    </v-radio-group>
                </v-col>
                <v-btn class="bg-primary text-white" style="margin-left: 10px;">Print Preview</v-btn>
            </v-row>
        </v-col>
        <v-col cols="6">
            <v-row>
                <v-col cols="12">
                    <p style="font-weight: bolder; color: #107bac; font-size: larger; padding-bottom: 10px;">Summary Reports</p>
                    <v-list-subheader class="form-header">Report Date</v-list-subheader>
                    <v-text-field
                        variant="solo"
                        density="compact"
                        type="date"
                        required
                        hide-details
                    ></v-text-field>
                </v-col>
                <v-col cols="12">
                    <v-list-subheader class="form-header">Encoder Options</v-list-subheader>
                    <v-radio-group density="compact" hide-details>
                        <v-checkbox label="All Encoders" value="0" hide-details density="compact"></v-checkbox>
                        <v-row>
                            <v-col cols="6">
                                <v-checkbox label="Per Encoder" value="1" hide-details density="compact"></v-checkbox>
                            </v-col>
                            <v-col cols="6">
                                <v-text-field
                                    placeholder="Enter Encoder Name"
                                    variant="solo"
                                    
                                    density="compact"
                                    hide-details
                                    readonly
                                />
                            </v-col>
                        </v-row>
                    </v-radio-group>
                </v-col>
                <v-col cols="12">
                    <v-list-subheader class="form-header">Shift Options</v-list-subheader>
                    <v-radio-group density="compact" hide-details>
                        <v-checkbox label="All Shifts" value="0" hide-details density="compact"></v-checkbox>
                        <v-row>
                            <v-col cols="6">
                                <v-checkbox label="Specific Shift" value="0" hide-details density="compact"></v-checkbox>
                            </v-col>
                            <v-col cols="6">
                                <v-autocomplete
                                    placeholder="Select Shift"
                                    variant="solo"
                                    density="compact"
                                    hide-details
                                    readonly
                                />
                            </v-col>
                        </v-row>
                    </v-radio-group>
                </v-col>
                <v-btn class="bg-primary text-white" style="margin-left: 10px;">Print Preview</v-btn>
            </v-row>
        </v-col>
    </v-row>
</template>
<script setup>
</script>

<style scoped>
.form-header {
    color: #000;
    margin: -12px 0px -12px 0px;
    font-weight: 500;
}
.styled-table th {
    max-width: 100%;
    padding: 8px;
    margin: 0;
}
.styled-table {
    background-color: #f8f8f8;
    border: 1px solid #D3D3D3;
    margin-top: 1px;
}
.styled-table {
    overflow-y: auto;
    scrollbar-width: thin; 
    scrollbar-color: #727272 #f5f5f5; 
}
.styled-table::-webkit-scrollbar {
    width: 12px;
}
.styled-table::-webkit-scrollbar-thumb {
    background-color: #107bac; 
    border-radius: 10px; 
    border: 3px solid #f5f5f5; 
}
.styled-table::-webkit-scrollbar-track {
    background-color: #f5f5f5; 
}
.styled-table::-webkit-scrollbar {
    width: 12px;
}
</style>