import nuxtStorage from 'nuxt-storage';
export const useRegion = async () => {
    const config = useRuntimeConfig();
    const { data}: any = await useFetch(useApiUrl() + `/get-regions`, {
    method: 'GET',
    headers: { 
        'Content-Type': 'application/json',
        'Authorization': `Bearer `+useToken(),
    },
    });
    if (data.value) {
        nuxtStorage.localStorage.setData('region', JSON.stringify(data.value), 24, 'h');
    }
}