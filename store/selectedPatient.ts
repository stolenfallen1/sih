import { defineStore } from 'pinia'

export const usePatientStore = defineStore('patient', {
    state: () => ({
        selectedPatient: null
    }),
    actions: {
        setSelectedPatient(patient: any) {
            this.selectedPatient = patient;
        },
        clearSelectedPatient() {
            this.selectedPatient = null;
        }
    }
});
