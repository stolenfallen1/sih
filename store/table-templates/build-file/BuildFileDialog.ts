export const BuildFileDialog = defineStore('BuildFileDialog',{
  state: () => ({
    AdmissionSourceDialog: false,
    AdmissionTypeDialog: false,
    AgeBracketDialog:false,
    BedStatusDialog:false,
    BloodTypeDialog:false,
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