export const PQInPatientDialog = defineStore('PQInPatientDialog',{
    state: () => ({
        ReAdmit: false,
        PostFinalDiagnosisForDischargedPatients: false,
        ForBillingRecalculation: false,
        MayGoHomePatientList: false,
        RoomStatusAvailability: false,
        DocumentArchives: false,
        Cf4ForDischargedPatients: false,
    }),
    actions:{
    setPQInPatientDialog(dialog:any,type:Boolean) {
        if (this.hasOwnProperty(dialog)) {
            // Set the value of the property to true
            this[dialog] = type;
        }
    },
    }
})