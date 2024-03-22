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

    <AccountClassFormDialog 
        :show="AccountClassDialog"
        @close-dialog="useTableAndTemplate('AccountClassDialog',false);"
    />


     <AccountTypeFormDialog 
        :show="AccountTypeDialog"
        @close-dialog="useTableAndTemplate('AccountTypeDialog',false);"
    />

    <AccountGroupFormDialog 
        :show="AccountGroupDialog"
        @close-dialog="useTableAndTemplate('AccountGroupDialog',false);"
    />

     <CostCenterFormDialog
        :show="CostCenterDialog"
        @close-dialog="useTableAndTemplate('CostCenterDialog',false);"
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
import RefunTypeFormDialog from "~/components/reusables/build-file/refund-type/RefundTypeDialog.vue";
import ApproverLevelFormDialog from "~/components/reusables/build-file/approver-level/ApproverLevelDialog.vue";
import SupplierTermsFormDialog from "~/components/reusables/build-file/supplier-terms/SupplierTermsDialog.vue";
import SupplierTypesFormDialog from "~/components/reusables/build-file/supplier-types/SupplierTypesDialog.vue";
import BankFormDialog from "~/components/reusables/build-file/bank/BankDialog.vue";
import BankAccountFormDialog from "~/components/reusables/build-file/bank-account/BankAccountDialog.vue";
import BankAccountCreditCardFormDialog from "~/components/reusables/build-file/bank-credit-card/BankCreditCardDialog.vue";
import BankAccountDebitCardFormDialog from "~/components/reusables/build-file/bank-debit-card/BankDebitCardDialog.vue";
import AccountClassFormDialog from "~/components/reusables/build-file/account-class/AccountClassDialog.vue";
import AccountTypeFormDialog from "~/components/reusables/build-file/account-type/AccountTypeDialog.vue";
import AccountGroupFormDialog from "~/components/reusables/build-file/account-group/AccountGroupDialog.vue";
import CostCenterFormDialog from "~/components/reusables/build-file/cost-center/CostCenterDialog.vue";
// import SupplierTermsFormDialog from "~/components/reusables/build-file";

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
    PaymentMethodDialog,
    RefunTypeDialog,
    ApproverLevelDialog,
    SupplierTermsDialog,
    SupplierTypesDialog,
    BankDialog,
    BankAccountDialog,
    BankAccountCreditCardDialog,
    BankAccountDebitCardDialog,
    AccountClassDialog,
    AccountTypeDialog,
    AccountGroupDialog,
    CostCenterDialog,
} = storeToRefs(BuildFileDialog());

</script>

<style scoped></style>
