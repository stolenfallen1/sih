import nuxtStorage from 'nuxt-storage';
export const useMscPriceGroup = async () => {
    const {data}:any = await useFetch(useApiUrl() + `/list-price-groups`, {
        headers: { 
            'Content-Type': 'application/json',
            'Authorization': `Bearer `+useToken(),
        },
    });
    if (data.value) {
        nuxtStorage.localStorage.setData('msc-price-group', JSON.stringify(data.value), 24, 'h');
    }
}