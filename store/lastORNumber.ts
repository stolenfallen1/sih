import { defineStore } from 'pinia'

export const useLastORnumber = defineStore('LastORnumber', {
    state: () => ({
        LastORnumber: null
    }),
    actions: {
        setLastORnumber(LastORnumber: any) {
            this.LastORnumber = LastORnumber;
        },
    }
});
