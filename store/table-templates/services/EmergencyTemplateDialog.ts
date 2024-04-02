export const EmergencyTemplateDialog = defineStore('EmergencyTemplateDialog', {
    state: () => ({
        AdjustmentTypes: false,
        Allergies: false,
        BillingTemplates: false,
        BillingTemplateGroups: false,
        CsCaseIndicators: false,
        DeathType: false,
        DiscountSchemes: false,
        DispositionTypes: false,
        ErAreas: false,
        ExcellenceCenters: false,
        ReferringCenters: false,
        MedicalServiceTypes: false,
        MedicalSubServiceTypes: false,
        PriceSchemes: false,
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
        ListOfPetBreed: false,
        RegistryGroup: false,
    }),
    actions: {
      setEmergencyDialog(dialog: any, type: Boolean) {
        if (this.hasOwnProperty(dialog)) {
          // Set the value of the property to true
          this[dialog] = type;
        }
      }
    }
  })