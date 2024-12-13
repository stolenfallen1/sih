import nuxtStorage from 'nuxt-storage';
export const useRoomAccomodation = async () => {
    const config = useRuntimeConfig();
    const { data}: any = await useFetch(useLaravelAPI() + `/get-room-accomodations`, {
    method: 'GET',
    headers: { 
        'Content-Type': 'application/json',
        'Authorization': `Bearer `+useToken(),
    },
    });
    if (data.value) {
        nuxtStorage.localStorage.setData('room_accomodations', JSON.stringify(data.value), 24, 'h');
    }
}