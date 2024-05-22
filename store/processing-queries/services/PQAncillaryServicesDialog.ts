export const PQAncillaryServicesDialog = defineStore('PQAncillaryServicesDialog',{
    state: () => ({
        PrintPendingRequisition: false,
    }),
    actions:{
    setPQAncillaryServicesDialog(dialog:any,type:Boolean) {
        if (this.hasOwnProperty(dialog)) {
            // Set the value of the property to true
            this[dialog] = type;
        }
    },
    }
})