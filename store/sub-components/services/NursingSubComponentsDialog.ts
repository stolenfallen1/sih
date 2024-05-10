export const NursingSubComponentsDialog = defineStore('NursingSubComponentsDialog',{
    state: () => ({
        ApplyCreditNote: false,
        ViewExaminationUpshot: false,
        TagAsMgh: false,
        UntagAsMgh: false,
        Discharge: false,
        DischargeInstruction: false,
        RelocatePatient: false,
        NurseEndorsementForm: false,
        ViewPatientDietHistory: false,
        ViewDrugsAndMedicines: false,
        ViewStatementOfAccount: false,
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