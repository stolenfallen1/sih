<template>
    <v-dialog :model-value="show" rounded="lg" scrollable @update:model-value="closeDialog" max-width="1120px">
        <form @submit.prevent="onSubmit">
            <v-card rounded="lg">
                <v-toolbar density="compact" color="#6984ff" hide-details>
                    <v-toolbar-title>Discharge Registry Account {{ selectedRowDetails.id }}</v-toolbar-title>
                    <v-btn color="white" @click="closeDialog">
                        <v-icon>mdi-close</v-icon>
                    </v-btn>
                </v-toolbar>
                <v-card-text>
                    <v-card elevation="4">
                        <v-toolbar density="compact" hide-details>
                                <v-toolbar-title class="toolbar-title">Final Diagnosis (Dx) Summary</v-toolbar-title>
                            </v-toolbar>
                        <v-card-text>
                            <v-row>
                                <v-col cols="6" class="pa-1">
                                    <v-textarea
                                        label="Discharge Diagnosis (Dx)"
                                        variant="outlined"
                                        density="compact"
                                        v-model="payload.discharge_diagnosis"
                                        hide-details
                                        readonly
                                    ></v-textarea>
                                </v-col>
                                <v-col cols="6" class="pa-1">
                                    <v-textarea
                                        label="Final Diagnosis (Dx) Code"
                                        v-model="payload.final_diagnosis_code"
                                        variant="outlined"
                                        density="compact"
                                        hide-details
                                        readonly
                                    ></v-textarea>
                                </v-col>
                                <v-col cols="6" class="pa-1">
                                    <v-textarea
                                        label="Final Diagnsis (Dx) Description"
                                        v-model="payload.final_diagnosis_description"
                                        variant="outlined"
                                        density="compact"
                                        hide-details
                                        readonly
                                    ></v-textarea>
                                </v-col>
                                <v-col cols="6" class="pa-1">
                                    <v-textarea
                                        label="Secondary Discharge Diagnosis (Dx)"
                                        v-model="payload.secondary_discharge_diagnosis"
                                        variant="outlined"
                                        density="compact"
                                        hide-details
                                        readonly
                                    ></v-textarea>
                                </v-col>
                                <v-col cols="12" class="pa-1">
                                    <v-textarea
                                        label="Remarks"
                                        placeholder="Enter Remarks here"
                                        v-model="payload.remarks"
                                        variant="outlined"
                                        density="compact"
                                        hide-details
                                    ></v-textarea>
                                </v-col>
                            </v-row>
                        </v-card-text>
                    </v-card>
                    <v-card elevation="4" class="mt-2">
                        <v-tabs color="primary" v-model="tab">
                            <v-tab value="0"><v-icon start>mdi-medication</v-icon> ICD-10 Final Diagnosis</v-tab>
                            <v-tab value="1"><v-icon start>mdi-needle</v-icon> Surgical Procedures</v-tab>
                        </v-tabs>
                        <v-window v-model="tab">
                            <v-window-item class="pa-1">
                                <v-card>
                                    <v-card-text>
                                        <v-row>
                                            <v-col cols="12">
                                                <v-table density="compact" height="40vh">
                                                    <thead>
                                                        <tr>
                                                            <th width="4"></th> <!-- Primary -->
                                                            <th width="4"></th> <!-- First Case Rate -->
                                                            <th width="4"></th> <!-- Second Case Rate -->
                                                            <th width="4"></th> <!-- Is Cause of Death -->
                                                            <th>ICD-10 Code</th>
                                                            <th>LOA / RCS No.</th>
                                                            <th>Description</th>
                                                            <th>Discharge Diagnosis</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        <template>
                                                            <tr class="cursor-pointer">
                                                                <!-- contents -->
                                                            </tr>
                                                        </template>
                                                    </tbody>
                                                </v-table>
                                            </v-col>
                                            <v-divider></v-divider>
                                        </v-row>
                                    </v-card-text>
                                    <v-card-actions>
                                        <v-btn color="blue-darken-1 border border-info" @click.prevent="openSelectICDMaster">+<v-icon>mdi-pill-multiple</v-icon> Select from ICD Master </v-btn>
                                    </v-card-actions>
                                </v-card>
                            </v-window-item>
                            <v-window-item class="pa-1">
                                <v-card>
                                    <v-card-text>
                                        <v-row>
                                            <v-col cols="12">
                                                <v-table density="compact" height="40vh">
                                                    <thead>
                                                        <tr>
                                                            <th>Type of Operation</th>
                                                            <th>Surgical Procedure</th>
                                                            <th>Surgeon</th>
                                                            <th>Anesthesiologist</th>
                                                            <th>Type of Anesthesia</th>
                                                            <th>Reference Date</th>
                                                            <th>RUV Value</th>
                                                            <th>Body Systems</th>
                                                            <th>Body Organ</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        <template>
                                                            <tr class="cursor-pointer">
                                                                <!-- contents -->
                                                            </tr>
                                                        </template>
                                                    </tbody>
                                                </v-table>
                                            </v-col>
                                            <v-divider></v-divider>
                                        </v-row>
                                    </v-card-text>
                                    <v-card-actions>
                                        <v-btn color="blue-darken-1 border border-info" @click.prevent="openSelectSurgeonMaster">+<v-icon>mdi-doctor</v-icon> Select from Surgeon Master </v-btn>
                                    </v-card-actions>
                                </v-card>
                            </v-window-item>
                        </v-window>
                    </v-card>
                </v-card-text>
                <v-divider></v-divider>
                <v-card-actions>
                    <v-btn color="blue-darken-1 border border-info" @click="closeDialog"> Close </v-btn>
                    <v-spacer></v-spacer>
                    <v-btn class="bg-primary text-white" type="submit">Post</v-btn>
                </v-card-actions>
            </v-card>
        </form>
    </v-dialog>
    <opd-icd-master :open_icd_master="open_icd_master" @close-dialog="closeSelectIDCMaster" @handle-submit="handleSelectICDMaster" />
    <opd-surgeon-master :open_surgeon_master="open_surgeon_master" @close-dialog="closeSelectSurgeonMaster" @handle-submit="handleSelectSurgeonMaster" />
</template>

<script setup>
import OpdIcdMaster from './sub-forms/OpdIcdMaster.vue';
import OpdSurgeonMaster from './sub-forms/OpdSurgeonMaster.vue';

const props = defineProps({
    show: {
        type: Boolean,
        default: () => false,
        required: true,
    },
});

const payload = ref({});

const open_icd_master = ref(false);
const open_surgeon_master = ref(false);

const { selectedRowDetails } = storeToRefs(useSubcomponentSelectedRowDetailsStore()); 
const tab = ref('0');

const emits = defineEmits(['close-dialog'])

const openSelectICDMaster = () => {
    open_icd_master.value = true;
}
const handleSelectICDMaster = () => {
    alert('ICD Master Selected');
}
const closeSelectIDCMaster = () => {
    open_icd_master.value = false;
}

const openSelectSurgeonMaster = () => {
    open_surgeon_master.value = true;
}
const handleSelectSurgeonMaster = () => {
    alert('Surgeon Master Selected');
}
const closeSelectSurgeonMaster = () => {
    open_surgeon_master.value = false;
}

const onSubmit = () => {
    alert('Post Final Diagnosis Submitted');
    emits('close-dialog')
    tab.value = '0'
}

const closeDialog = () => {
    emits('close-dialog')
    tab.value = '0'
}
</script>

<style scoped>
.toolbar-title {
    font-size: 16px; 
    font-style: italic; 
    text-align: center;
}
</style>