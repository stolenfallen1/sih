import nuxtStorage from 'nuxt-storage';
export const useSex = async () => {
    const { data}: any = await useFetch(useApiUrl() + `/get-sex`, {
    method: 'GET',
    headers: { 
        'Content-Type': 'application/json',
        'Authorization': `Bearer `+useToken(),
    },
    });
    if (data.value) {
        nuxtStorage.localStorage.setData('sex', JSON.stringify(data.value), 24, 'h');
    }
}