export const TableAndTemplateFormDialog = defineStore('TableAndTemplateFormDialog',{
  state: () => ({
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