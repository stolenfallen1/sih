import nuxtStorage from 'nuxt-storage';
export const useTherapeutics = async () => {
    const {data}: any = await useFetch(useApiUrl() + `/therapeutic-class`, {
    method: 'GET',
    headers: { 
        'Content-Type': 'application/json',
        'Authorization': `Bearer `+useToken(),
    },
    });
    if (data.value) {
        nuxtStorage.localStorage.setData('therapeutic-class', JSON.stringify(data.value.therapeutic_class), 24, 'h');
    }
}