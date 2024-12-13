import nuxtStorage from 'nuxt-storage';
export const useUnits = async () => {
    const {data}: any = await useFetch(useLaravelAPI() + `/units`, {
    method: 'GET',
    headers: { 
        'Content-Type': 'application/json',
        'Authorization': `Bearer `+useToken(),
    },
    });
    if (data.value) {
        nuxtStorage.localStorage.setData('units', JSON.stringify(data.value.units), 24, 'h');
    }
}