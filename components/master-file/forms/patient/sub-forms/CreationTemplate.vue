<template>
    <v-dialog 
        :model-value="template_dialog"
        
        hide-overlay
        width="650"
    >
        <v-card>
            <v-card-title>Creation . Selection of Template Record</v-card-title>
            <v-divider></v-divider>
            <v-card-text>
                <v-container>
                    <v-row>
                        <v-col cols="9" class="pa-1">
                            <v-text-field
                                class="mt-3"
                                variant="outlined"
                                density="compact"
                                append-inner-icon="mdi-magnify"
                            ></v-text-field>
                        </v-col>
                        <v-col cols="3" class="mt-3">
                            <v-btn class="bg-primary text-white p-2" type="submit" density="compact">Add to List</v-btn>
                        </v-col>
                        <v-divider></v-divider>
                        <v-col cols="12">
                            <v-table density="compact">
                                <thead>
                                    <tr>
                                        <th class="font-weight-bold text-center">Description</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <!-- <template>
                                        <tr>
                                            Table here for the list of templates
                                        </tr>
                                    </template> -->
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
                <v-btn class="bg-error text-white" type="submit">Delete</v-btn>
                <v-btn class="bg-info text-white" type="submit" @click="openNoteRemarksEntry">Select</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
    <!-- Remarks Entry please refer to bizbox for more info hihi thanks sir cel! -->
    <!-- Wala nalang nako siya gi separate nga file sir for now. -->
    <v-dialog 
        v-model="remarks_form_dialog"
        
        hide-overlay
        width="450"
    >
        <v-card>
            <v-card-title>Notes . Remarks Entry</v-card-title>
            <v-divider></v-divider>
            <v-card-text>
                <v-row>
                    <v-col cols="12">
                        <v-text-field
                            label="Description"
                            type="text"
                            density="compact"
                            variant="outlined"
                        ></v-text-field>
                    </v-col>
                    <v-col cols="12">
                        <v-textarea
                            class="cursor-pointer"
                            label="Remarks"
                            variant="outlined"
                        ></v-textarea>
                    </v-col>
                </v-row>
            </v-card-text>
            <v-card-actions>
                <v-btn color="blue-darken-1" @click="closeRemarksEntry"> Close </v-btn>
                <v-spacer></v-spacer>
                <v-btn class="bg-primary text-white" type="submit" @click="submitRemarks">Continue</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script setup>

const props = defineProps({
    template_dialog: {
        type: Boolean,
        default: () => false,
    },
})
const emits = defineEmits(['close-dialog'])

const remarks_form_dialog = ref(false);

const openNoteRemarksEntry = () => {
    remarks_form_dialog.value = true;
};

const submitRemarks = () => {
    alert("Remarks submitted!");
}

const closeRemarksEntry = () => {
    remarks_form_dialog.value = false;
};

const closeDialog = () => {
    emits("close-dialog");
};

</script>

<style scoped>
</style>

<!--
    This component can be reusable in 
    - Medical Cases
    - Allergies
    - Family Medical History
    - Social History
-->