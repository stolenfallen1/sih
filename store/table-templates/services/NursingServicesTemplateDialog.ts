import NurseActivity from "~/components/reusables/sub-components/nursing-activity/NurseActivityDialog.vue";

export const NursingServicesTemplateDialog = defineStore('NursingServicesTemplateDialog' , {
  state: () => ({
    AdmissionResult: false,
    CsCaseIndicators: false,
    DeathTypeDialog: false,
    NursingEndorsement: false,
    ReferralCauses: false,
    NursingServce: false,
    NurseActivity: false,
    Requisitions: false,
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