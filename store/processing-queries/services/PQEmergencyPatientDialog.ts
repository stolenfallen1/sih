export const PQEmergencyPatientDialog = defineStore('PQEmergencyPatientDialog',{
    state: () => ({
        MayGoHomePatientList: false,
        DocumentArchives: false,
        Cf4ForDischargedPatients: false,
    }),
    actions:{
    setPQEmergencyPatientDialog(dialog:any,type:Boolean) {
        if (this.hasOwnProperty(dialog)) {
            // Set the value of the property to true
            this[dialog] = type;
        }
    },
    }
})