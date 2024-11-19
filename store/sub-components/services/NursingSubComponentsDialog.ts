export const NursingSubComponentsDialog = defineStore('NursingSubComponentsDialog',{
    state: () => ({
        PatientProfile: false,
        Requisitions: false,
        PostCharges: false,
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
        NurseActivit: false
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