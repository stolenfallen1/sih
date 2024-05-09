export const NursingSubComponentsDialog = defineStore('NursingSubComponentsDialog',{
    state: () => ({
        ViewExaminationUpshot: false,
        TagAsMgh: false,
        UntagAsMgh: false,
        Discharge: false,
        ViewPatientDietHistory: false,
        DischargeInstruction: false,
        ClaimForm4Processing: false,
    }),
    actions:{
    setNursingSubComponentsDialog(dialog:any,type:Boolean) {
        if (this.hasOwnProperty(dialog)) {
            // Set the value of the property to true
            this[dialog] = type;
        }
    },
    }
})