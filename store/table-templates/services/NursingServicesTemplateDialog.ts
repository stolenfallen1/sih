export const NursingServicesTemplateDialog = defineStore('NursingServicesTemplateDialog' , {
  state: () => ({
    AdmissionResult: false,
    CsCaseIndicators: false,
    DeathTypeDialog: false,
    NursingEndorsement: false,
    ReferralCauses: false,
  }),
  actions: {
    setNursingServicesDialog(dialog: any, type: Boolean) {
      if (this.hasOwnProperty(dialog)) {
        // Set the value of the property to true
        this[dialog] = type;
      }
    }
  }
})