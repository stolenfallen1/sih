import nuxtStorage from 'nuxt-storage';

export const useRevenueCode = () => {
    let revenue_code = JSON.parse(nuxtStorage.localStorage.getData("user_details"));
    return revenue_code.RevenueCode;
}