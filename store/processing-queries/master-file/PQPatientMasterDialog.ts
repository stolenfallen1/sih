export const PQPatientMasterDialog = defineStore('PQPatientMasterDialog',{
    state: () => ({
        DocumentArchives: false,
        ReissuePrivilegeCard: false,
    }),
    actions:{
    setPQPatientMasterDialog(dialog:any,type:Boolean) {
        if (this.hasOwnProperty(dialog)) {
            // Set the value of the property to true
            this[dialog] = type;
        }
    },
    }
})