import nuxtStorage from 'nuxt-storage';
export const useUserDetailsStore = defineStore('user',{
  state: () => ({
    user_details:{},
  }),
  actions: {
    async fetchUserDetails(token:any) {
      // useFetch from nuxt 3
      const config = useRuntimeConfig();
      const { data, pending }: any = await useFetch(`${config.public.laravelAPI}` + `/user-details`, {
        method: 'GET',
        headers: { 
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        },
      });
      if (data.value) {
         nuxtStorage.localStorage.setData('user_details', JSON.stringify(data.value.user.details), 24, 'h');
      }
    },
  },
})