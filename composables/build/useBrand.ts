import nuxtStorage from 'nuxt-storage';
export const useBrand = async () => {
    const {data}: any = await useFetch(useApiUrl() + `/brand`, {
    method: 'GET',
    headers: { 
        'Content-Type': 'application/json',
        'Authorization': `Bearer `+useToken(),
    },
    });
    if (data.value) {
        nuxtStorage.localStorage.setData('brands', JSON.stringify(data.value.brand), 24, 'h');
    }
}