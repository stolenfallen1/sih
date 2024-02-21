import nuxtStorage from 'nuxt-storage';
export const usePositions = async () => {
    const { data}: any = await useFetch(useApiUrl() + `/positions`, {
    method: 'GET',
    headers: { 
        'Content-Type': 'application/json',
        'Authorization': `Bearer `+useToken(),
    },
    });
    if (data.value) {
        nuxtStorage.localStorage.setData('position', JSON.stringify(data.value), 24, 'h');
    }
}