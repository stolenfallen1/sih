export const AncillaryServicesTemplateDialog = defineStore('AncillaryServicesTemplateDialog' , {
    state: () => ({
        DiscountSchemes: false,
        PriceSchemes: false,
    }),
    actions: {
        setAncillaryServicesDialog(dialog: any, type: Boolean) {
            if (this.hasOwnProperty(dialog)) {
                // Set the value of the property to true
                this[dialog] = type;
            }
        }
    }
})