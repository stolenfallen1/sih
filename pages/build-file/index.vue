<template>
    <v-container>
        <!-- title and text should be changed dynamically feel free to do so. -->
        <v-row justify="center">
            <SearchTemplate />
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

    <TransactionTypeFormDialog 
        :show="TransactionTypeDialog"
        @close-dialog="close_dialog"
    />

    
</template>

<script setup>
definePageMeta({
    layout: "root-layout",
});
import { storeToRefs } from "pinia";
import SearchTemplate from "./SearchTemplate.vue";

import AdmissionSourceFormDialog from "~/components/reusables/build-file/admission-source/AdmissionSourceDialog";
import AdmissionTypeFormDialog from "~/components/reusables/build-file/admission-type/AdmissionTypeDialog.vue";
import AgeBracketFormDialog from "~/components/reusables/build-file/age-bracket/AgeBracketDialog.vue";
import BedStatusFormDialog from "~/components/reusables/build-file/bed-status/BedStatusDialog.vue";
import BloodTypeFormDialog from "~/components/reusables/build-file/blood-type/BloodTypeDialog.vue";
import DeathTypeFormDialog from "~/components/reusables/build-file/death-types/DeathTypeDialog.vue";
import TransactionTypeFormDialog from "~/components/reusables/build-file/transaction-type/TransactionTypeDialog.vue";


// Table and templates store
const {
    AdmissionSourceDialog,
    AdmissionTypeDialog,
    AgeBracketDialog,
    BedStatusDialog,
    BloodTypeDialog,
    DeathTypeDialog,
    TransactionTypeDialog
} = storeToRefs(BuildFileDialog());

const close_dialog = ()=>{
    AdmissionSourceDialog.value = false;
    AdmissionTypeDialog.value = false;
    AgeBracketDialog.value = false;
    BedStatusDialog.value = false;
    BloodTypeDialog.value = false;
    DeathTypeDialog.value = false;
    TransactionTypeDialog.value = false;
}
</script>

<style scoped></style>
