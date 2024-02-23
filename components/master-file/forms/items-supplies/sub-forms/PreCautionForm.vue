<template>
    <v-dialog 
        :model-value="precaution_dialog"
        persistent
        hide-overlay
        width="700"
    >
        <v-card>
            <v-card-title>Precaution Type Details</v-card-title>
            <v-divider></v-divider>
            <v-card-text>
                <v-container>
                    <v-row>
                        <v-col cols="8">
                            <v-text-field
                                disabled
                                label="Code"
                                type="text"
                                density="compact"
                                variant="outlined"
                            ></v-text-field>
                        </v-col>
                        <v-col cols="12">
                            <v-text-field
                                label="Description"
                                type="text"
                                density="compact"
                                variant="outlined"
                            ></v-text-field>
                        </v-col>
                        <v-col cols="12">
                            <v-checkbox label="Is Default" density="compact" color="#117dad"></v-checkbox>
                        </v-col>
                    </v-row>
                </v-container>
            </v-card-text>
            <v-divider></v-divider>
            <v-card-actions>
                <v-btn color="blue-darken-1" @click="closeDialog">Close</v-btn>
                <v-spacer></v-spacer>
                <v-btn class="bg-primary text-white" type="submit" @click="handlePrecautionType">Select</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script setup>

const props = defineProps({
    precaution_dialog: {
        type: Boolean,
        default: () => false,
    },
})
const emits = defineEmits()

const closeDialog = () => {
    emits("close-dialog");
};

const handlePrecautionType = () => {
    emits("handle-precaution-type");
}


</script>

<style scoped>
</style>