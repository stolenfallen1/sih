export const BuildFileDialog = defineStore('BuildFileDialog',{
  state: () => ({
    AdmissionSourceDialog: false,
    AdmissionTypeDialog: false,
    AgeBracketDialog:false,
    BedStatusDialog:false,
    BloodTypeDialog:false,
    DeathTypeDialog:false,
    TransactionTypeDialog:false,
    HospitalPlanDialog:false,
    IDTypesDialog:false,
    NationalitDialog:false,
    ReligionDialog:false,
    SexDialog:false,
    CivilStatusDialog:false,
    StatusDialog:false,
    ShiftDialog:false,
    PatientRelationDialog:false,
    DoctorCategoryDialog:false,
    ServiceTypeDialog:false,
    SuffixDialog:false,
    PaymentMethodDialog:false,
    RefunTypeDialog:false,
    ApproverLevelDialog:false,
    SupplierTermsDialog:false,
    SupplierTypesDialog:false,
    BankDialog:false,
    BankAccountDialog:false,
    BankAccountCreditCardDialog:false,
    BankAccountDebitCardDialog:false,
    AccountClassDialog:false,
    AccountTypeDialog:false,
    AccountGroupDialog:false,
    CostCenterDialog:false,
  }),
   actions:{
    setBuildFileDialog(dialog:any,type:Boolean) {
       if (this.hasOwnProperty(dialog)) {
            // Set the value of the property to true
            this[dialog] = type;
        }
    },
  }
})