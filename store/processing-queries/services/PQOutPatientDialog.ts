export const PQOutpatientDialog = defineStore('PQOutpatientDialog',{
    state: () => ({
        ItemsAndServicesStatusReport: false,
        DocumentArchives: false,
        MayGoHomePatientList: false,
        Cf4ForDischargedPatients: false,
    }),
    actions:{
    setPQOutpatientDialog(dialog:any,type:Boolean) {
        if (this.hasOwnProperty(dialog)) {
            // Set the value of the property to true
            this[dialog] = type;
        }
    },
    }
})