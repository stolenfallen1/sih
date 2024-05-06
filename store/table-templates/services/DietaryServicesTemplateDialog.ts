export const DietaryServicesTemplateDialog = defineStore('DietaryServicesTemplateDialog' , {
  state: () => ({
    DietList: false,
    DietMealType: false,
    DietType: false,
    DietSubTypes: false,
  }),
  actions: {
    setDietaryServicesDialog(dialog: any, type: Boolean) {
      if (this.hasOwnProperty(dialog)) {
        // Set the value of the property to true
        this[dialog] = type;
      }
    }
  }
})