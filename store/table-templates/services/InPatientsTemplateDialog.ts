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
    NursingStationsWards: false,
    RoomClassificationTypes: false,
    RoomPriceSchemes: false,
    HospitalizationTypes: false, 
    HospitalizationPlans: false,  
    HospitalizationCaseTypes: false,  
    HospitalTransactionTypes: false, 
    InternalControlTable: false, 
    ListOfAttendant: false,
    SurgicalProcedures: false,  
    SurgicalProceduresCategory: false,
    BodySystems: false,  
    BodyOrgans: false,  
    TypesOfAnesthesia: false,  
    MedicalSocialServiceTemplate: false,
    OtherHospitalServices: false,
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