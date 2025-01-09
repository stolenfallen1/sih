// store/auth.ts

import { defineStore } from 'pinia';
import nuxtStorage from 'nuxt-storage';

interface UserPayloadInterface {
  idnumber: string;
  password: string;
}

export const useAuthStore = defineStore('auth', {
  state: () => ({
    authenticated: false,
    passcode:'',
    loading: false,
  }),
  actions: {

    async authenticateUser({ idnumber, password }: UserPayloadInterface) {
      // useFetch from nuxt 3
      const config = useRuntimeConfig();
      const { data, pending }: any = await useFetch(`${config.public.laravelAPI}` + `/login`, {
        method: 'post',
        headers: { 'Content-Type': 'application/json' },
        body: {
          idnumber,
          password,
        },
      });
      this.loading = pending;
      if (data.value) {
       
        const token = useCookie('token'); // useCookie new hook in nuxt 3
        token.value = data?.value?.access_token; // set token to cookie
        this.authenticated = true; // set authenticated  state value to true
        this.passcode = data.value.user.passcode;
        const {fetchUserDetails} = useUserDetailsStore();
        const { fetchPositions} = useDropdownOptionStore();
        await fetchUserDetails(token.value); 
        await fetchPositions(token.value); 
      }
    },

    logUserOut() {
      const router = useRouter();
      const token = useCookie('token'); // useCookie new hook in nuxt 3
      this.authenticated = false; // set authenticated  state value to false
      nuxtStorage.localStorage.clear();
      token.value = null; // clear the token cookie
      router.push('/login')
    },

    async getUser() {
      const token = useCookie('token'); // Access token cookie
      if (!token.value) {
        this.user = null;
        token.value = null; // Clear the token cookie
        this.authenticated = false;
        return navigateTo('/login'); // Redirect to login if no token
      }
    
      try {
        const config = useRuntimeConfig();
        const { data, error }: any = await useFetch(`${config.public.laravelAPI}/user-details`, {
          headers: {
            Authorization: `Bearer ${token.value}`,
          },
        });
        if (data.value) {
          this.user = data.value;
          this.authenticated = true;
        }else{
          this.logUserOut();
        }
      } catch (err: any) {
        this.logUserOut();
      }
    }
    
  },
});