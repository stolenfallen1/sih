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

    <HospitalPlanFormDialog 
        :show="HospitalPlanDialog"
        @close-dialog="close_dialog"
    />
    <IDTypesFormDialog 
        :show="IDTypesDialog"
        @close-dialog="close_dialog"
    />

    <NationalitFormDialog 
        :show="NationalitDialog"
        @close-dialog="close_dialog"
    />

    <ReligionFormDialog 
        :show="ReligionDialog"
        @close-dialog="close_dialog"
    />
     <SexFormDialog 
        :show="SexDialog"
        @close-dialog="close_dialog"
    />

    <CivilStatusFormDialog 
        :show="CivilStatusDialog"
        @close-dialog="close_dialog"
    />

    <StatusFormDialog 
        :show="StatusDialog"
        @close-dialog="close_dialog"
    />

    <ShiftFormDialog 
        :show="ShiftDialog"
        @close-dialog="close_dialog"
    />
    
    <PatientRelationFormDialog 
        :show="PatientRelationDialog"
        @close-dialog="close_dialog"
    />

    <DoctorCategoryFormDialog 
        :show="DoctorCategoryDialog"
        @close-dialog="close_dialog"
    />

    <ServiceTypeFormDialog 
        :show="ServiceTypeDialog"
        @close-dialog="close_dialog"
    />

     <SuffixFormDialog 
        :show="SuffixDialog"
        @close-dialog="close_dialog"
    />

     <PaymentMethodFormDialog 
        :show="PaymentMethodDialog"
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
import HospitalPlanFormDialog from "~/components/reusables/build-file/hospital-plan/HospitalPlanDialog.vue";
import IDTypesFormDialog from "~/components/reusables/build-file/id-types/IDTypesDialog.vue";
import NationalitFormDialog from "~/components/reusables/build-file/nationality/NationalityDialog.vue";
import ReligionFormDialog from "~/components/reusables/build-file/religion/ReligionDialog.vue";
import SexFormDialog from "~/components/reusables/build-file/sex/SexDialog.vue";
import CivilStatusFormDialog from "~/components/reusables/build-file/civil-status/CivilStatusDialog.vue";
import StatusFormDialog from "~/components/reusables/build-file/status/StatusDialog.vue";
import ShiftFormDialog from "~/components/reusables/build-file/shift/ShiftDialog.vue";
import PatientRelationFormDialog from "~/components/reusables/build-file/patient-relation/PatientRelationDialog.vue";
import DoctorCategoryFormDialog from "~/components/reusables/build-file/doctor-category/DoctorCategoryDialog.vue";
import ServiceTypeFormDialog from "~/components/reusables/build-file/service-type/ServiceTypeDialog.vue";
import SuffixFormDialog from "~/components/reusables/build-file/suffix/SuffixDialog.vue";
import PaymentMethodFormDialog from "~/components/reusables/build-file/payment-method/PaymentMethodDialog.vue";


// Table and templates store
const {
    AdmissionSourceDialog,
    AdmissionTypeDialog,
    AgeBracketDialog,
    BedStatusDialog,
    BloodTypeDialog,
    DeathTypeDialog,
    TransactionTypeDialog,
    HospitalPlanDialog,
    IDTypesDialog,
    NationalitDialog,
    ReligionDialog,
    SexDialog,
    CivilStatusDialog,
    StatusDialog,
    ShiftDialog,
    PatientRelationDialog,
    DoctorCategoryDialog,
    ServiceTypeDialog,
    SuffixDialog,
    PaymentMethodDialog
} = storeToRefs(BuildFileDialog());

const close_dialog = ()=>{
    AdmissionSourceDialog.value = false;
    AdmissionTypeDialog.value = false;
    AgeBracketDialog.value = false;
    BedStatusDialog.value = false;
    BloodTypeDialog.value = false;
    DeathTypeDialog.value = false;
    TransactionTypeDialog.value = false;
    HospitalPlanDialog.value = false;
    IDTypesDialog.value = false;
    NationalitDialog.value = false;
    ReligionDialog.value = false;
    SexDialog.value = false;
    CivilStatusDialog.value = false;
    StatusDialog.value = false;
    ShiftDialog.value = false;
    PatientRelationDialog.value = false;
    DoctorCategoryDialog.value = false;
    ServiceTypeDialog.value = false;
    SuffixDialog.value = false;
    PaymentMethodDialog.value = false;
}
</script>

<style scoped></style>
