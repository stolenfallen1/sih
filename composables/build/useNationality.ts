import nuxtStorage from 'nuxt-storage';
export const useNationality = async () => {
    const { data}: any = await useFetch(useApiUrl() + `/get-nationalities`, {
    method: 'GET',
    headers: { 
        'Content-Type': 'application/json',
        'Authorization': `Bearer `+useToken(),
    },
    });
    if (data.value) {
        nuxtStorage.localStorage.setData('nationality', JSON.stringify(data.value), 24, 'h');
    }
}