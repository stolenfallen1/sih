export const MFPatientsDialog = defineStore('MFPatientsDialog',{
    state: () => ({
        OutpatientCaseHistory: false,
        EmergencyCaseHistory: false,
        InpatientCaseHistory: false,
        HoldReleaseAccount: false,
        // MedicalRecordsSummary: false,
        ViewHs7HistoricalData: false,
        ViewingOfResultImage: false,
        DietCounseling: false,
    }),
    actions:{
    setMFPatientsDialog(dialog:any,type:Boolean) {
        if (this.hasOwnProperty(dialog)) {
            // Set the value of the property to true
            this[dialog] = type;
        }
    },
    }
})