export const OutPatientsTemplateDialog = defineStore('OutPatientsTemplateDialog', {
  state: () => ({
    AdjustmentTypes: false,
    Allergies: false,
    BillingTemplates: false,
    BillingTemplateGroups: false,
    CsCaseIndicators: false,
    DeathType: false,
    DiscountSchemes: false,
    DispositionTypes: false,
    ExcellenceCenters: false,
    ReferringCenters: false,
    MedicalServiceTypes: false,
    MedicalSubServiceTypes: false,
    PriceSchemes: false,
    TransactionType: false,
    HospitalizationTypes: false,
    HospitalPlan: false,
    HospitalizationCaseTypes: false,
    InternalControlTable: false,
    ListOfAttendant: false,
    SurgicalProcedures: false,
    SurgicalProceduresCategory: false,
    BodySystems: false,
    BodyOrgans: false,
    TypesOfAnesthesia: false,
    DocumentCategories: false,
    OtherHospitalServices: false,
    MedicalSocialServiceTemplate: false,
    ListOfPetBreed: false,
    EducationalAttainments: false,
  }),
  actions: {
    setOutPatientsDialog(dialog: any, type: Boolean) {
      if (this.hasOwnProperty(dialog)) {
        // Set the value of the property to true
        this[dialog] = type;
      }
    }
  }
})