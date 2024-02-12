import nuxtStorage from 'nuxt-storage';

export const useDropdownOptionStore = defineStore('dropdownoption',{
  state: () => ({
    branches:[],
    roles:[],
    positions:[],
    sections:[],
    systems:[],
    buildings:[],
  }),
  actions: {
    async fetchBranch(token:any) {
      // useFetch from nuxt 3
      const config = useRuntimeConfig();
      const { data}: any = await useFetch(`${config.public.apiBase}` + `/get-branch`, {
        method: 'GET',
        headers: { 
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        },
      });
      if (data.value) {
         nuxtStorage.localStorage.setData('branches', JSON.stringify(data.value.data), 24, 'h');
      }
    },

    async fetchRoles(token:any) {
      // useFetch from nuxt 3
      const config = useRuntimeConfig();
      const { data}: any = await useFetch(`${config.public.apiBase}` + `/get-role`, {
        method: 'GET',
        headers: { 
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        },
      });
      if (data.value) {
         nuxtStorage.localStorage.setData('roles', JSON.stringify(data.value.data), 24, 'h');
      }
    },

    async fetchPositions(token:any) {
      // useFetch from nuxt 3
      const config = useRuntimeConfig();
      const { data}: any = await useFetch(`${config.public.apiBase}` + `/positions`, {
        method: 'GET',
        headers: { 
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        },
      });
      if (data.value) {
         nuxtStorage.localStorage.setData('position', JSON.stringify(data.value.positions), 24, 'h');
      }
    },



     async fetchSuffix(token:any) {
      // useFetch from nuxt 3
      const config = useRuntimeConfig();
      const { data}: any = await useFetch(`${config.public.apiBase}` + `/get-suffix`, {
        method: 'GET',
        headers: { 
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        },
      });
      if (data.value) {
         nuxtStorage.localStorage.setData('suffix', JSON.stringify(data.value), 24, 'h');
      }
    },

    async fetchSystems(token:any) {
      // useFetch from nuxt 3
      const config = useRuntimeConfig();
      const { data}: any = await useFetch(`${config.public.apiBase}` + `/systems-list`, {
        method: 'GET',
        headers: { 
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        },
      });
      if (data.value) {
         nuxtStorage.localStorage.setData('systems', JSON.stringify(data.value), 24, 'h');
      }
    },
    
    async fetchBuildings(token:any) {
      // useFetch from nuxt 3
      const config = useRuntimeConfig();
      const { data}: any = await useFetch(`${config.public.apiBase}` + `/buildings`, {
        method: 'GET',
        headers: { 
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        },
      });
      if (data.value) {
         nuxtStorage.localStorage.setData('buildings', JSON.stringify(data.value), 24, 'h');
      }
    },
  },
})