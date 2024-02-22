import nuxtStorage from 'nuxt-storage';
export const useCivilstatus = async () => {
    const { data}: any = await useFetch(useApiUrl() + `/get-civil-status`, {
    method: 'GET',
    headers: { 
        'Content-Type': 'application/json',
        'Authorization': `Bearer `+useToken(),
    },
    });
    if (data.value) {
        nuxtStorage.localStorage.setData('civil-status', JSON.stringify(data.value), 24, 'h');
    }
}