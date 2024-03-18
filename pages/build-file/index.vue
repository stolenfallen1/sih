<template>
    <v-container>
        <!-- title and text should be changed dynamically feel free to do so. -->
        <v-row justify="center">
            <v-col cols="12" sm="6" md="12">
                <v-card
                    title="Welcome back Juan"
                    text="Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptates.
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptates. 
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptates.
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptates."
                >
                </v-card>
            </v-col>
            <v-col cols="12" sm="6" md="4">
                <v-card  title="In Patients">
                    <template v-slot:prepend>
                        <v-icon icon="mdi-account" color="primary"></v-icon>
                    </template>
                    <template v-slot:append>
                        <v-icon
                            icon="mdi-arrow-top-right-bold-box-outline"
                            color="#6984FF"
                        ></v-icon>
                    </template>
                    <v-card-text>250</v-card-text>
                </v-card>
            </v-col>

            <v-col cols="12" sm="6" md="4">
                <v-card  title="Out Patients">
                    <template v-slot:prepend>
                        <v-icon icon="mdi-account" color="warning"></v-icon>
                    </template>
                    <template v-slot:append>
                        <v-icon
                            icon="mdi-arrow-top-right-bold-box-outline"
                            color="#6984FF"
                        ></v-icon>
                    </template>
                    <v-card-text>100</v-card-text>
                </v-card>
            </v-col>

            <v-col cols="12" sm="6" md="4">
                <v-card  title="ER Patients">
                    <template v-slot:prepend>
                        <v-icon icon="mdi-account" color="error"></v-icon>
                    </template>
                    <template v-slot:append>
                        <v-icon
                            icon="mdi-arrow-top-right-bold-box-outline"
                            color="#6984FF"
                        ></v-icon>
                    </template>
                    <v-card-text>25</v-card-text>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
    <AdmissionSourceFormDialog 
        :show="AdmissionSourceDialog"
        @close-dialog="close_dialog"
    />

    <AdmissionTypeFormDialog 
        :show="AdmissionTypeDialog"
        @close-dialog="close_dialog"
    />
     <AgeBracketFormDialog 
        :show="AgeBracketDialog"
        @close-dialog="close_dialog"
    />
    
     <BedStatusFormDialog 
        :show="BedStatusDialog"
        @close-dialog="close_dialog"
    />

   <BloodTypeFormDialog 
        :show="BloodTypeDialog"
        @close-dialog="close_dialog"
    />

    <DeathTypeFormDialog 
        :show="DeathTypeDialog"
        @close-dialog="close_dialog"
    />
    
</template>

<script setup>
definePageMeta({
    layout: "root-layout",
});
import { storeToRefs } from "pinia";
import AdmissionSourceFormDialog from "~/components/reusables/build-file/admission-source/AdmissionSourceDialog";
import AdmissionTypeFormDialog from "~/components/reusables/build-file/admission-type/AdmissionTypeDialog.vue";
import AgeBracketFormDialog from "~/components/reusables/build-file/age-bracket/AgeBracketDialog.vue";
import BedStatusFormDialog from "~/components/reusables/build-file/bed-status/BedStatusDialog.vue";
import BloodTypeFormDialog from "~/components/reusables/build-file/blood-type/BloodTypeDialog.vue";
import DeathTypeFormDialog from "~/components/reusables/build-file/death-types/DeathTypeDialog.vue";


// Table and templates store
const {
    AdmissionSourceDialog,
    AdmissionTypeDialog,
    AgeBracketDialog,
    BedStatusDialog,
    BloodTypeDialog,
    DeathTypeDialog,
} = storeToRefs(BuildFileDialog());

const close_dialog = ()=>{
    AdmissionSourceDialog.value = false;
    AdmissionTypeDialog.value = false;
    AgeBracketDialog.value = false;
    BedStatusDialog.value = false;
    BloodTypeDialog.value = false;
    DeathTypeDialog.value = false;
    
}
</script>

<style scoped></style>
