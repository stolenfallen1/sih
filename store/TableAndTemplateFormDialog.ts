export const TableAndTemplateFormDialog = defineStore('TableAndTemplateFormDialog',{
  state: () => ({
    // This states are for Items and Supplies & Services
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
    DxMedicalPackages: false,
    GenericNames: false,
    Indications: false,
    ItemCategories: false,
    ItemPriceGroups: false,
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
     BillingReportCategoryDialog:false,
     ModuleDialog:false,
     NurseStationDialog:false
  }),
   actions:{
     setDialog(dialog:any) {
       if (this.hasOwnProperty(dialog)) {
            // Set the value of the property to true
            this[dialog] = true;
        }
    },
  }
})