// store/auth.ts

import { defineStore } from 'pinia';

interface UserPayloadInterface {
  idnumber: string;
  password: string;
}

export const useAuthStore = defineStore('auth', {
  state: () => ({
    authenticated: false,
    loading: false,
  }),
  actions: {
    async authenticateUser({ idnumber, password }: UserPayloadInterface) {
      // useFetch from nuxt 3
      const { data, pending }: any = await useFetch('http://10.4.15.15/api/login', {
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
      }
    },
    logUserOut() {
      const token = useCookie('token'); // useCookie new hook in nuxt 3
      this.authenticated = false; // set authenticated  state value to false
      token.value = null; // clear the token cookie
    },
  },
});