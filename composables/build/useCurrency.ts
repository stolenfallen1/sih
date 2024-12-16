import nuxtStorage from 'nuxt-storage';
export const useCurrency = async () => {
    const response: any = await $fetch(useLaravelAPI() + `/currencies`, {
    method: 'GET',
    headers: { 
        'Content-Type': 'application/json',
        'Authorization': `Bearer `+useToken(),
    },
    });
    if (response.currencies) {
        nuxtStorage.localStorage.setData('items-group', JSON.stringify(response.currencies), 24, 'h');
    }
}