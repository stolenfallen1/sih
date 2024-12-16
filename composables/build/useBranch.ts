import nuxtStorage from 'nuxt-storage';
export const useBranch = async () => {
    const config = useRuntimeConfig();
    const { data}: any = await useFetch(useLaravelAPI() + `/get-branch`, {
    method: 'GET',
    headers: { 
        'Content-Type': 'application/json',
        'Authorization': `Bearer `+useToken(),
    },
    });
    if (data.value) {
        nuxtStorage.localStorage.setData('branches', JSON.stringify(data.value.data), 24, 'h');
    }
}