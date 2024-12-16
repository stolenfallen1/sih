import nuxtStorage from 'nuxt-storage';
export const useCountry = async () => {
    const config = useRuntimeConfig();
    const { data}: any = await useFetch(useLaravelAPI() + `/get-country-list`, {
    method: 'GET',
    headers: { 
        'Content-Type': 'application/json',
        'Authorization': `Bearer `+useToken(),
    },
    });
    if (data.value) {
        nuxtStorage.localStorage.setData('country', JSON.stringify(data.value), 24, 'h');
    }
}