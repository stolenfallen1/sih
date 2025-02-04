export const ItemServicesSuppliesTemplateDialog = defineStore('ItemServicesSuppliesTemplateDialog',{
  state: () => ({
    BillingReportCategory: false,
    CollectionReportMainHeader: false,
    CollectionReportGroupHeader: false,
    CptModifiers: false,
    CptSections: false,
    CptSubSections: false,
    DepartmentGroups: false,
    DepartmentWarehouses: false,
    Dosages: false,
    DrugAdminGroups: false,
    DohDrugLists: false,
    GenericNames: false,
    Indications: false,
    ItemCategories: false,
    PriceGroup: false,
    ItemPricingSchemes: false,
    ItemTemplates: false,
    ItemUnits: false,
    MedicationDurations: false,
    MedicationFrequencies: false,
    MedicationPreparations: false,
    Routes: false,
    Others: false,
    PhicItemCategories: false,
    UnitOfMeasures: false,
    Modalities: false,
    Specimens: false,
  }),
   actions:{
    setItemServicesSuppliesDialog(dialog:any, type: Boolean) {
       if (this.hasOwnProperty(dialog)) {
            // Set the value of the property to true
            this[dialog] = type;
        }
    },
  }
})