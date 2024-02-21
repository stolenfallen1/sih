import nuxtStorage from 'nuxt-storage';
export const useBuildings = async () => {
    const config = useRuntimeConfig();
    const { data}: any = await useFetch(useApiUrl() + `/buildings`, {
    method: 'GET',
    headers: { 
        'Content-Type': 'application/json',
        'Authorization': `Bearer `+useToken(),
    },
    });
    if (data.value) {
        nuxtStorage.localStorage.setData('buildings', JSON.stringify(data.value), 24, 'h');
    }
}