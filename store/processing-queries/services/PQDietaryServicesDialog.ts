export const PQDietaryServicesDialog = defineStore('PQDietaryServicesDialog',{
    state: () => ({
        ViewPatientsWithChangedDiet: false,
    }),
    actions:{
    setPQDietaryServicesDialog(dialog:any,type:Boolean) {
        if (this.hasOwnProperty(dialog)) {
            // Set the value of the property to true
            this[dialog] = type;
        }
    },
    }
})