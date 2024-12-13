// import nuxtStorage from 'nuxt-storage';
// export const useDoctorSpecialization = async () => {
//     const { data}: any = await useFetch(useLaravelAPI() + `/get-doctors-specializations`, {
//     method: 'GET',
//     headers: { 
//         'Content-Type': 'application/json',
//         'Authorization': `Bearer `+useToken(),
//     },
//     });
//     if (data.value) {
//         nuxtStorage.localStorage.setData('doctor-specialization', JSON.stringify(data.value), 24, 'h');
//     }
// }