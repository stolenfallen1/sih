export const MFItemsAndServicesDialog = defineStore('MFItemsAndServicesDialog',{
    state: () => ({
        // MFItemServicesDetails: false,
        MFManageDepartmentalAccess: false,
        MFManageItemPrices: false,
        MFManageItemDiscounts: false,
        MFUpdateItemSellingPrice: false,
        // MFMedicalPackages: false,
        MFItemManufacturer: false,
        MFItemComposition: false,
        MFResultEntriesInGeneral: false,
        MFConsultantReaderList: false,
        MFResultEntriesPerItem: false,
    }),
    actions:{
    setMFItemsAndServicesDialog(dialog:any,type:Boolean) {
        if (this.hasOwnProperty(dialog)) {
            // Set the value of the property to true
            this[dialog] = type;
        }
    },
    }
})