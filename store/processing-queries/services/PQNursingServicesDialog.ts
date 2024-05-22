export const PQNursingServicesDialog = defineStore('PQNursingServicesDialog',{
    state: () => ({
        DietaryTransactions: false,
        MayGoHomePatientList: false,
        RoomStatusAvailability: false,
    }),
    actions:{
    setPQNursingServicesDialog(dialog:any,type:Boolean) {
        if (this.hasOwnProperty(dialog)) {
            // Set the value of the property to true
            this[dialog] = type;
        }
    },
    }
})