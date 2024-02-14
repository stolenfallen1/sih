import nuxtStorage from 'nuxt-storage';
export const useSuffix = async () => {
    const config = useRuntimeConfig();
    const { data}: any = await useFetch(useApiUrl() + `/get-suffix`, {
    method: 'GET',
    headers: { 
        'Content-Type': 'application/json',
        'Authorization': `Bearer `+useToken(),
    },
    });
    if (data.value) {
        nuxtStorage.localStorage.setData('suffix', JSON.stringify(data.value.data), 24, 'h');
    }
}