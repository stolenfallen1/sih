import nuxtStorage from 'nuxt-storage';
export const useServiceType = async () => {
    const { data}: any = await useFetch(useApiUrl() + `/get-services-type`, {
    method: 'GET',
    headers: { 
        'Content-Type': 'application/json',
        'Authorization': `Bearer `+useToken(),
    },
    });
    if (data.value) {
        nuxtStorage.localStorage.setData('services-type', JSON.stringify(data.value), 24, 'h');
    }
}