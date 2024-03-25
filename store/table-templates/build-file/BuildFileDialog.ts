export const BuildFileDialog = defineStore('BuildFileDialog',{
  state: () => ({
    AdmissionSource: false,
    AdmissionType: false,
    AgeBracket:false,
    BedStatus:false,
    BloodType:false,
    DeathType:false,
    TransactionType:false,
    HospitalPlan:false,
    IDTypes:false,
    Nationality:false,
    Religion:false,
    Sex:false,
    CivilStatus:false,
    Status:false,
    Shift:false,
    PatientRelation:false,
    DoctorCategory:false,
    ServiceType:false,
    Suffix:false,
    PaymentMethod:false,
    RefundType:false,
    ApproverLevel:false,
    SupplierTerms:false,
    SupplierTypes:false,
    Bank:false,
    BankAccount:false,
    BankAccountCreditCard:false,
    BankAccountDebitCard:false,
    AccountClass:false,
    AccountType:false,
    AccountGroup:false,
    CostCenter:false,
    MedicareType:false,
    RevenueClass:false,
    TransactionClassification:false,
    TransactionCode:false, 
    Country: false,
    Region: false,
    Province: false,
    Municipality: false,
    Barangay: false,
    ZipCode: false,
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