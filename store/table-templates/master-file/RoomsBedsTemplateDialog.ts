export const RoomsBedsTemplateDialog = defineStore('RoomsBedsTemplateDialog',{
  state: () => ({
    BuildingsFloors: false,
    NursingStationsWards: false,
    RoomClassificationTypes: false,
    RoomChargeSettings: false,
    RoomPriceSchemes: false,
    RoomStatus: false,
    RoomUsageTypes: false,
    BedStatus: false,
  }),
   actions:{
    setRoomsBedsDialog(dialog:any) {
       if (this.hasOwnProperty(dialog)) {
            // Set the value of the property to true
            this[dialog] = true;
        }
    },
  }
})