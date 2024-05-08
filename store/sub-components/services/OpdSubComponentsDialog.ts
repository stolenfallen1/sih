export const OpdSubComponentsDialog = defineStore('OpdSubComponentsDialog',{
    state: () => ({
        Suspend: false,
        PrintTransactionReceipt: false,
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
        DischargeInstruction: false,
        PostFinalDiagnosis: false,
        SoaBillingStatement: false,
        ViewPrintReports: false,
        AdmitPatient: false,
        TransferToEr: false,
        ClaimForm4Processing: false,
    }),
    actions:{
    setOpdSubComponentsDialog(dialog:any,type:Boolean) {
        if (this.hasOwnProperty(dialog)) {
            // Set the value of the property to true
            this[dialog] = type;
        }
    },
    }
})