export const IpdSubComponentsDialog = defineStore('IpdSubComponentsDialog',{
    state: () => ({
        PatientProfile: false,
        Suspend: false,
        PostCorporateMedicalPackage: false,
        PostDiagnosticMedicalPackage: false,
        PostAdjustments: false,
        PostProfessionalFees: false,
        PostArTransfer: false,
        ViewExaminationUpshot: false,
        ApplyPromissoryNote: false,
        ApplyMedicalPackage: false,
        TagAsMgh: false,
        UntagAsMgh: false,
        Discharge: false,
        PostFinalDiagnosis: false,
        SoaBillingStatement: false,
        ViewPrintReports: false,
        ClaimForm4Processing: false,
    }),
    actions:{
    setIpdSubComponentsDialog(dialog:any,type:Boolean) {
        if (this.hasOwnProperty(dialog)) {
            // Set the value of the property to true
            this[dialog] = type;
        }
    },
    }
})