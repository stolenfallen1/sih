<template>
    <v-container>
        <!-- title and text should be changed dynamically feel free to do so. -->
        <v-row justify="center">
            <SearchTemplate />
        </v-row>
    </v-container>
    <AdmissionSourceFormDialog 
        :show="AdmissionSourceDialog"
        @close-dialog="useTableAndTemplate('AdmissionSourceDialog',false);"
    />

    <AdmissionTypeFormDialog 
        :show="AdmissionTypeDialog"
        @close-dialog="useTableAndTemplate('AdmissionTypeDialog',false);"
    />
     <AgeBracketFormDialog 
        :show="AgeBracketDialog"
        @close-dialog="useTableAndTemplate('BedStatusDialog',false);"
    />
    
     <BedStatusFormDialog 
        :show="BedStatusDialog"
        @close-dialog="useTableAndTemplate('BedStatusDialog',false);"
    />

   <BloodTypeFormDialog 
        :show="BloodTypeDialog"
      
        @close-dialog="useTableAndTemplate('BloodTypeDialog',false);"
    />

    <DeathTypeFormDialog 
        :show="DeathTypeDialog"
        @close-dialog="useTableAndTemplate('DeathTypeDialog',false);"
    />

    <TransactionTypeFormDialog 
        :show="TransactionTypeDialog"
        @close-dialog="useTableAndTemplate('TransactionTypeDialog',false);"
    />

    <HospitalPlanFormDialog 
        :show="HospitalPlanDialog"
        @close-dialog="useTableAndTemplate('HospitalPlanDialog',false);"
    />
    
    <IDTypesFormDialog 
        :show="IDTypesDialog"
        @close-dialog="useTableAndTemplate('IDTypesDialog',false);"
    />

    <NationalitFormDialog 
        :show="NationalitDialog"
        @close-dialog="useTableAndTemplate('NationalitDialog',false);"
    />

    <ReligionFormDialog 
        :show="ReligionDialog"
        @close-dialog="useTableAndTemplate('ReligionDialog',false);"
    />
     <SexFormDialog 
        :show="SexDialog"
        @close-dialog="useTableAndTemplate('SexDialog',false);"
    />

    <CivilStatusFormDialog 
        :show="CivilStatusDialog"
        @close-dialog="useTableAndTemplate('CivilStatusDialog',false);"
    />

    <StatusFormDialog 
        :show="StatusDialog"
        @close-dialog="useTableAndTemplate('StatusDialog',false);"
    />

    <ShiftFormDialog 
        :show="ShiftDialog"
        @close-dialog="useTableAndTemplate('ShiftDialog',false);"
    />
    
    <PatientRelationFormDialog 
        :show="PatientRelationDialog"
        @close-dialog="useTableAndTemplate('PatientRelationDialog',false);"
    />

    <DoctorCategoryFormDialog 
        :show="DoctorCategoryDialog"
        @close-dialog="useTableAndTemplate('DoctorCategoryDialog',false);"
    />

    <ServiceTypeFormDialog 
        :show="ServiceTypeDialog"
        @close-dialog="useTableAndTemplate('ServiceTypeDialog',false);"
    />

     <SuffixFormDialog 
        :show="SuffixDialog"
        @close-dialog="useTableAndTemplate('SuffixDialog',false);"
    />

     <PaymentMethodFormDialog 
        :show="PaymentMethodDialog"
        @close-dialog="useTableAndTemplate('PaymentMethodDialog',false);"
    />

    <RefunTypeFormDialog 
        :show="RefunTypeDialog"
        @close-dialog="useTableAndTemplate('RefunTypeDialog',false);"
    />
    
    <ApproverLevelFormDialog 
        :show="ApproverLevelDialog"
        @close-dialog="useTableAndTemplate('ApproverLevelDialog',false);"
    />

    <SupplierTermsFormDialog 
        :show="SupplierTermsDialog"
        @close-dialog="useTableAndTemplate('SupplierTermsDialog',false);"
    />
    <SupplierTypesFormDialog 
        :show="SupplierTypesDialog"
        @close-dialog="useTableAndTemplate('SupplierTypesDialog',false);"
    />

     <BankFormDialog 
        :show="BankDialog"
        @close-dialog="useTableAndTemplate('BankDialog',false);"
    />

     <BankAccountFormDialog 
        :show="BankAccountDialog"
        @close-dialog="useTableAndTemplate('BankAccountDialog',false);"
    />

    <BankAccountCreditCardFormDialog 
        :show="BankAccountCreditCardDialog"
        @close-dialog="useTableAndTemplate('BankAccountCreditCardDialog',false);"
    />

    <BankAccountDebitCardFormDialog 
        :show="BankAccountDebitCardDialog"
        @close-dialog="useTableAndTemplate('BankAccountDebitCardDialog',false);"
    />

</template>

<script setup>
definePageMeta({
    layout: "root-layout",
});
import SearchTemplate from "./SearchTemplate.vue";

</script>

<style scoped></style>
