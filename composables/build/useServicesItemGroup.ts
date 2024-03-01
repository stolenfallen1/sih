import nuxtStorage from 'nuxt-storage';
export const useServicesItemGroup = async () => {
    const {data}:any = await useFetch(useApiUrl() + `/services-items-group`, {
        headers: { 
            'Content-Type': 'application/json',
            'Authorization': `Bearer `+useToken(),
        },
    });
    if (data.value) {
        nuxtStorage.localStorage.setData('services-items-group', JSON.stringify(data.value.item_groups), 24, 'h');
    }
}