import nuxtStorage from 'nuxt-storage';
export const useServiceClass = async () => {
    const { data}: any = await useFetch(useApiUrl() + `/sex`, {
    method: 'GET',
    headers: { 
        'Content-Type': 'application/json',
        'Authorization': `Bearer `+useToken(),
    },
    });
    if (data.value) {
        nuxtStorage.localStorage.setData('doctor-services-class', JSON.stringify(data.value), 24, 'h');
    }
}