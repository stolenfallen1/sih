import nuxtStorage from 'nuxt-storage';
export const useItemGroup = async () => {
    const {data}:any = await useFetch(useLaravelAPI() + `/items-group`, {
        headers: { 
            'Content-Type': 'application/json',
            'Authorization': `Bearer `+useToken(),
        },
    });
    if (data.value) {
        nuxtStorage.localStorage.setData('items-group', JSON.stringify(data.value.item_groups), 24, 'h');
    }
}