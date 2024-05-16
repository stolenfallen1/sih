export const AncillarySubComponentsDialog = defineStore('AncillarySubComponentsDialog',{
    state: () => ({
        PatientProfile: false,
        DirectRender: false,
        DrugAdministration: false,
        ApplyCreditNote: false,
        CentralizedCreditNote: false,
    }),
    actions:{
    setAncillarySubComponentsDialog(dialog:any,type:Boolean) {
        if (this.hasOwnProperty(dialog)) {
            // Set the value of the property to true
            this[dialog] = type;
        }
    },
    }
})