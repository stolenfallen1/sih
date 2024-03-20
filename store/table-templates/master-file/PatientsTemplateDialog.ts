export const PatientsTemplateDialog = defineStore('PatientsTemplateDialog',{
  state: () => ({
    DiscountSchemes: false,
    MedicalServiceTypes: false,
    MedicalSubServiceTypes: false,
    PriceSchemes: false,
    PriceGroup: false,
    DocumentCategories: false,
    PatientAddtionalInformation: false,
    BadHabits: false,
    IdTypes: false,
    Authorities: false,
    EmploymentInformationPositions: false,
    EmployerName: false,
    OtherSpecialist: false,
    Facilities: false,
    LoaDepartment: false,
    MilitaryClassification: false,
  }),
   actions:{
    setPatientsDialog(dialog:any, type: Boolean) {
       if (this.hasOwnProperty(dialog)) {
            // Set the value of the property to true
            this[dialog] = type;
        }
    },
  }
})