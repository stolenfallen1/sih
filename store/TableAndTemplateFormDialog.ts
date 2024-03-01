export const TableAndTemplateFormDialog = defineStore('TableAndTemplateFormDialog',{
  state: () => ({
     BillingReportCategoryDialog:false,
     BillingReportCategoryDialog1:false
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