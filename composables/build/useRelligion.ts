import nuxtStorage from 'nuxt-storage';
export const useReligion = async () => {
    const config = useRuntimeConfig();
    const { data}: any = await useFetch(useApiUrl() + `/get-religions`, {
    method: 'GET',
    headers: { 
        'Content-Type': 'application/json',
        'Authorization': `Bearer `+useToken(),
    },
    });
    if (data.value) {
        nuxtStorage.localStorage.setData('religion', JSON.stringify(data.value), 24, 'h');
    }
}