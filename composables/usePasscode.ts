import nuxtStorage from 'nuxt-storage';
export const usePasscode = () => {
    let userdetails = JSON.parse(nuxtStorage.localStorage.getData("user_details"));
    return userdetails.passcode;
}