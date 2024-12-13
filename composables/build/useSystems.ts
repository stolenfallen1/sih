import nuxtStorage from 'nuxt-storage';
export const useSystems = async () => {
    const config = useRuntimeConfig();
    const { data}: any = await useFetch(useLaravelAPI() + `/systems-list`, {
    method: 'GET',
    headers: { 
        'Content-Type': 'application/json',
        'Authorization': `Bearer `+useToken(),
    },
    });
    if (data.value) {
        nuxtStorage.localStorage.setData('systems', JSON.stringify(data.value), 24, 'h');
    }
}