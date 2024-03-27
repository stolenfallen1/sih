export const ConsultantsTemplateDialog = defineStore('ConsultantsTemplateDialog',{
  state: () => ({
    ConsultantSpecializations: false,
    MedicalServiceTypes: false,
    MedicalSubServiceTypes: false,
    ConsultantRoleTypes: false,
    DoctorsDepartment: false,
    DoctorCategory: false,
    DoctorsRebateCategory: false,
  }),
   actions:{
    setConsultantsDialog(dialog:any, type: Boolean) {
       if (this.hasOwnProperty(dialog)) {
            // Set the value of the property to true
            this[dialog] = type;
        }
    },
  }
})