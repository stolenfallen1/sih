export const TableAndTemplateFormDialog = defineStore('TableAndTemplateFormDialog',{
  state: () => ({
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