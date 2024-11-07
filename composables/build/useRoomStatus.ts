// import nuxtStorage from 'nuxt-storage';
// export const useRoomStatus = async () => {
//     const config = useRuntimeConfig();
//     const { data}: any = await useFetch(useApiUrl() + `/get-room-status`, {
//     method: 'GET',
//     headers: { 
//         'Content-Type': 'application/json',
//         'Authorization': `Bearer `+useToken(),
//     },
//     });
//     if (data.value) {
//         nuxtStorage.localStorage.setData('room_status', JSON.stringify(data.value), 24, 'h');
//     }
// }