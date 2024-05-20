export const PQConsultantsDialog = defineStore('PQConsultantsDialog',{
    state: () => ({
        PFItemsPerServiceType: false,
        DoctorsWithExpiringLicense: false,
    }),
    actions:{
    setPQConsultantsDialog(dialog:any,type:Boolean) {
        if (this.hasOwnProperty(dialog)) {
            // Set the value of the property to true
            this[dialog] = type;
        }
    },
    }
})