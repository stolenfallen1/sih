export const IpdSubComponentsDialog = defineStore('IpdSubComponentsDialog',{
    state: () => ({
        OpdSuspend: false,
        OpdPrintTransactionReceipt: false,
        OpdPostCorporateMedicalPackage: false,
        OpdPostDiagnosticMedicalPackage: false,
        OpdPostAdjustments: false,
        OpdPostProfessionalFees: false,
        OpdPostArTransfer: false,
        OpdViewExaminationUpshot: false,
        OpdApplyPromissoryNote: false,
        OpdApplyMedicalPackage: false,
        OpdTagAsMgh: false,
        OpdUntagAsMgh: false,
        OpdDischarge: false,
        OpdDischargeInstruction: false,
        OpdPostFinalDiagnosis: false,
        OpdSoaBillingStatement: false,
        OpdViewPrintReports: false,
        OpdAdmitPatient: false,
        OpdTransferToEr: false,
        OpdClaimForm4Processing: false,
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