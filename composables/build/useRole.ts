import nuxtStorage from 'nuxt-storage';
export const useRole = async () => {
    const config = useRuntimeConfig();
    const { data}: any = await useFetch(useLaravelAPI() + `/get-role`, {
    method: 'GET',
    headers: { 
        'Content-Type': 'application/json',
        'Authorization': `Bearer `+useToken(),
    },
    });
    if (data.value) {
        nuxtStorage.localStorage.setData('roles', JSON.stringify(data.value.data), 24, 'h');
    }
}