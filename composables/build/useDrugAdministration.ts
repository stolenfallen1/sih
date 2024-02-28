import nuxtStorage from 'nuxt-storage';
export const useDrugAdministration = async () => {
    const {data}: any = await useFetch(useApiUrl() + `/drug-administration`, {
    method: 'GET',
    headers: { 
        'Content-Type': 'application/json',
        'Authorization': `Bearer `+useToken(),
    },
    });
    if (data.value) {
        nuxtStorage.localStorage.setData('drug_administration', JSON.stringify(data.value.drug_administration), 24, 'h');
    }
}