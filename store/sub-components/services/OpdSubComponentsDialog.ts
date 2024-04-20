export const OpdSubComponentsDialog = defineStore('OpdSubComponentsDialog',{
    state: () => ({
        OpdSuspend: false,
        OpdPrintTransactionReceipt: false,
        OpdPostDiagnosticMedicalPackage: false,
        OpdPostAdjustments: false,
        OpdPostProfessionalFees: false,
        OpdViewExaminationUpshot: false,
        OpdTagAsMgh: false,
        OpdUntagAsMgh: false,
        OpdDischarge: false,
        OpdPostFinalDiagnosis: false,
        OpdSoaBillingStatement: false,
        OpdViewPrintReports: false,
        OpdAdmitPatient: false,
        OpdTransferToEr: false,
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