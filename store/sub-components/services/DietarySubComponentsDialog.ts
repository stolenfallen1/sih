export const DietarySubComponentsDialog = defineStore('DietarySubComponentsDialog',{
    state: () => ({
        AcknowledgePostedDiet: false,
        PostDietMealasServed: false,
        ViewPrintDietCard: false,
        ViewPatientDietHistory: false,
    }),
    actions:{
    setDietarySubComponentsDialog(dialog:any,type:Boolean) {
        if (this.hasOwnProperty(dialog)) {
            // Set the value of the property to true
            this[dialog] = type;
        }
    },
    }
})