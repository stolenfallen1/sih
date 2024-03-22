export const InPatientsTemplateDialog = defineStore('InPatientsTemplateDialog' , {
  state: () => ({
    AdjustmentTypes: false,  
    AdmissionResult: false, 
    Allergies: false, 
    BillingTemplates: false, 
    BillingTemplateGroups: false, 
    CsCaseIndicators: false, 
    DeathType: false, 
    DiscountSchemes: false, 
    ExcellenceCenters: false, 
    ReferringCenters: false, 
    DispositionTypes: false, 
    MedicalServiceTypes: false, 
    MedicalSubServiceTypes: false, 
    NursingStation: false,
    RoomClassifications: false,
    RoomPriceSchemes: false,
    HospitalizationTypes: false, 
    HospitalizationPlan: false,  
    HospitalizationCaseTypes: false,  
    HospitalTransactionTypes: false, 
    InternalControlTable: false, 
    ListOfAttendants: false,
    SurgicalProcedures: false,  
    SurgicalProceduresCategory: false,
    BodySystems: false,  
    BodyOrgans: false,  
    TypesOfAnesthesia: false,  
    MedicalSocialServiceTemplate: false,
    OtherHospitalServicesTemplate: false,
    ListOfPetBreed: false, 
    RegistryGroup: false,
  }),
  actions: {
    setInPatientsDialog(dialog: any, type: Boolean) {
      if (this.hasOwnProperty(dialog)) {
        // Set the value of the property to true
        this[dialog] = type;
      }
    }
  }
})