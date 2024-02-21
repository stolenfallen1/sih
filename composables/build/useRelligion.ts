import nuxtStorage from 'nuxt-storage';
export const useReligion = async () => {
    const config = useRuntimeConfig();
    const { data}: any = await useFetch(useApiUrl() + `/positions`, {
    method: 'GET',
    headers: { 
        'Content-Type': 'application/json',
        'Authorization': `Bearer `+useToken(),
    },
    });
    if (data.value) {
        nuxtStorage.localStorage.setData('religion', JSON.stringify(data.value.data), 24, 'h');
    }
}