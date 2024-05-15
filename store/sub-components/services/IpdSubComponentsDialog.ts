export const IpdSubComponentsDialog = defineStore('IpdSubComponentsDialog',{
    state: () => ({
        PatientProfile: false,
        RoomInquiry: false,
        Suspend: false,
        RelocatePatient: false,
        Requisitions: false,
        PostCharges: false,
        PostCorporateMedicalPackage: false,
        PostDiagnosticMedicalPackage: false,
        PostAdjustments: false,
        PostProfessionalFees: false,
        PostDiscounts: false,
        PostArTransfer: false,
        ViewExaminationUpshot: false,
        ApplyPromissoryNote: false,
        ApplyMedicalPackage: false,
        DebitRoomCharges: false,
        TagAsMgh: false,
        UntagAsMgh: false,
        Discharge: false,
        PostFinalDiagnosis: false,
        SoaBillingStatement: false,
        ViewPrintReports: false,
        PrintClaimForms: false,
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