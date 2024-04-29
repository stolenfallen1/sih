export const MFRoomsAndBedsDialog = defineStore('MFRoomsAndBedsDialog',{
    state: () => ({
        MFRoomOccupants: false,
    }),
    actions:{
    setMFRoomsAndBedsDialog(dialog:any,type:Boolean) {
        if (this.hasOwnProperty(dialog)) {
            // Set the value of the property to true
            this[dialog] = type;
        }
    },
    }
})