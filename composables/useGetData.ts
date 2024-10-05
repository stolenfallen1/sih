import { ref } from 'vue';
// import nuxtStorage from "nuxt-storage";

export function useGetData(key: string, fallback: any = []) {
    const data = ref(fallback); 

    const initializeData = () => {
        if (import.meta.client) { 
        try {
            const storedData = localStorage.getItem(key);
            // const storedData = nuxtStorage.localStorage.getData(key);
            data.value = storedData ? JSON.parse(storedData) : fallback;
        } catch (error) {
            console.error(`Failed to parse ${key}:`, error);
            data.value = fallback; 
        }
        }
    };

    initializeData(); 

    return data; 
}
