import nuxtStorage from 'nuxt-storage';
export const useDoctorCategory = async () => {
    const { data}: any = await useFetch(useLaravelAPI() + `/get-doctor-categories`, {
    method: 'GET',
    headers: { 
        'Content-Type': 'application/json',
        'Authorization': `Bearer `+useToken(),
    },
    });
    if (data.value) {
        nuxtStorage.localStorage.setData('doctorscategory', JSON.stringify(data.value), 24, 'h');
    }
}