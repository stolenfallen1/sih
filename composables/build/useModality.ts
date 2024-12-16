import nuxtStorage from 'nuxt-storage';
export const useModality = async () => {
    const {data}:any = await useFetch(useLaravelAPI() + `/get-modalities`, {
        headers: { 
            'Content-Type': 'application/json',
            'Authorization': `Bearer `+useToken(),
        },
    });
    if (data.value) {
        nuxtStorage.localStorage.setData('modalities', JSON.stringify(data.value), 24, 'h');
    }
}