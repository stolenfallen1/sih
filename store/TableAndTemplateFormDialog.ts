export const TableAndTemplateFormDialog = defineStore('TableAndTemplateFormDialog',{
  state: () => ({
    // This states are for Items and Supplies & Services ( master-file )
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

    // This states are for Rooms and Beds ( master-file )
    BuildingsFloors: false,
    NursingStationsWards: false,
    RoomClassificationTypes: false,
    RoomChargeSettings: false,
    RoomPriceSchemes: false,
    RoomStatus: false,
    RoomUsageTypes: false,
    BedStatus: false,

    // This states are for Consultants ( master-file )
    ConsultantSpecializations: false,
    MedicalServiceTypes: false,
    MedicalSubServiceTypes: false,
    ConsultantRoleTypes: false,
    DoctorsDepartment: false,
    DoctorsCategory: false,
    DoctorsRebateCategory: false,
    
    // This states are for system users 
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