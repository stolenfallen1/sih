import nuxtStorage from 'nuxt-storage';
export const useRoomClass = async () => {
    const config = useRuntimeConfig();
    const { data}: any = await useFetch(useApiUrl() + `/get-room-class`, {
    method: 'GET',
    headers: { 
        'Content-Type': 'application/json',
        'Authorization': `Bearer `+useToken(),
    },
    });
    if (data.value) {
        nuxtStorage.localStorage.setData('room_class', JSON.stringify(data.value), 24, 'h');
    }
}