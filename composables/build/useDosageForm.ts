import nuxtStorage from 'nuxt-storage';
export const useDosageForm = async () => {
    const {data}: any = await useFetch(useApiUrl() + `/dosage-forms`, {
    method:"GET",
    headers: { 
        'Content-Type': 'application/json',
        'Authorization': `Bearer `+useToken(),
    },
    });
    if (data.value) {
        nuxtStorage.localStorage.setData('dosage_forms', JSON.stringify(data.value.dosage_forms), 24, 'h');
    }
}