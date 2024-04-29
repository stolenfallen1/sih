export const MFConsultantsDialog = defineStore('MFConsultantsDialog',{
    state: () => ({
        MFListOfItemExaminations: false,
        MFListOfPatients: false,
        MFGetDoctorAccreditationNo: false,
        // MFDoctorsAccreditationCheck: false,
    }),
    actions:{
    setMFConsultantsDialog(dialog:any,type:Boolean) {
        if (this.hasOwnProperty(dialog)) {
            // Set the value of the property to true
            this[dialog] = type;
        }
    },
    }
})