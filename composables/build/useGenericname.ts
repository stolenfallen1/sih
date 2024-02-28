import nuxtStorage from 'nuxt-storage';
export const useGenericName = async () => {
    const {data}: any = await useFetch(useApiUrl() + `/generic-name`, {
    method: 'GET',
    headers: { 
        'Content-Type': 'application/json',
        'Authorization': `Bearer `+useToken(),
    },
    });
    if (data.value) {
        nuxtStorage.localStorage.setData('generic-name', JSON.stringify(data.value.generic_name), 24, 'h');
    }
}