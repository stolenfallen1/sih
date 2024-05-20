export const PQItemsServicesDialog = defineStore('PQItemsServicesDialog',{
    state: () => ({
        BorrowedItems: false,
        GeneratePricesAndDiscounts: false,
    }),
    actions:{
    setPQItemsServicesDialog(dialog:any,type:Boolean) {
        if (this.hasOwnProperty(dialog)) {
            // Set the value of the property to true
            this[dialog] = type;
        }
    },
    }
})