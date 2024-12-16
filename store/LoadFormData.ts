import { defineStore } from "pinia";

export const useloadPatientDataStore = defineStore('registrationFormData', {
    state: () => ({
        storePatientTransactionType: null,
        storePatientDeathTypes: null,
        storeHospitalizationPlan: null,
        storePriceGroup: null,
        storePriceScheme: null,
        storePatientIdTypes: null,
        storePatientDisposition: null,
        storePatientBroughtBy: null,
        storePatientNationality: null,
        storePatientServiceType: null,
        storePatientRegisterSource: null,
        storePatientCaseType: null,
    }),
    actions: {
        setPatientTransactionType(patientTransType: any) {
            this.storePatientTransactionType = patientTransType;
        },
        setPatientDeathTypes(patientDeathTypes: any) {
            this.storePatientDeathTypes = patientDeathTypes;
        },
        setPatientHospitalizationPlan(hosp_plan: any) {
            this.storeHospitalizationPlan = hosp_plan;
        },
        setPatientAccountGroup(price_group: any) {
            this.storePriceGroup = price_group;
        },
        setPatientAccountPriceScheme(price_scheme: any) {
            this.storePriceScheme = price_scheme;
        },
        setPatientIDTypes(id_type: any) {
            this.storePatientIdTypes = id_type;
        },
        setPatientDisposition(patient_disposition: any) {
            this.storePatientDisposition = patient_disposition;
        },
        setPatientBroughtBy(patient_broughtBy: any) {
            this.storePatientBroughtBy = patient_broughtBy;
        },
        setPatientNationalityId(patient_nationality: any) {
            this.storePatientNationality = patient_nationality;
        },
        setPatientServiceType(service_type: any) {
            this.storePatientServiceType = service_type;
        },
        setPatientRegisterSource(register_source: any) {
            this.storePatientRegisterSource = register_source;
        },
        setPatientCaseType(patient_case_Type: any) {
            this.storePatientCaseType = patient_case_Type;
        },
        clearPatentLoadData() {
            this.storePatientTransactionType = null;
            this.storePatientDeathTypes = null;
            this.storeHospitalizationPlan = null;
            this.storePriceGroup = null;
            this.storePriceScheme = null;
            this.storePatientIdTypes = null;
            this.storePatientBroughtBy = null;
            this.storePatientNationality = null;
            this.storePatientRegisterSource = null;
            this.storePatientCaseType = null
        }
    }
})