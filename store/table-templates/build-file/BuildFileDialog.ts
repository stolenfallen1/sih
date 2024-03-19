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
  }),
   actions:{
    setBuildFileDialog(dialog:any) {
       if (this.hasOwnProperty(dialog)) {
            // Set the value of the property to true
            this[dialog] = true;
        }
    },
  }
})