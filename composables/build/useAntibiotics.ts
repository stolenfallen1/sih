import nuxtStorage from 'nuxt-storage';
export const useAntibiotics = async () => {
    const {data}: any = await useFetch(useLaravelAPI() + `/antibiotic`, {
    method: 'GET',
    headers: { 
        'Content-Type': 'application/json',
        'Authorization': `Bearer `+useToken(),
    },
    });
    if (data.value) {
        nuxtStorage.localStorage.setData('antibiotics', JSON.stringify(data.value.antibiotics), 24, 'h');
    }
}