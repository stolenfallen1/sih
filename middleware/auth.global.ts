import { storeToRefs } from 'pinia';
import { useAuthStore } from '~/store/auth';

export default defineNuxtRouteMiddleware(async (to) => {
  const authStore = useAuthStore();
  const token = useCookie('token'); // Access token from cookies
 
  // Attempt to fetch the user if there's a token
  if(token.value){
    await authStore.getUser();
  }
  if (!token.value && to?.name !== 'login') {
    return navigateTo('/login');
  }


  // If the user is authenticated but is trying to access the login page, redirect to the dashboard
  if (token.value && to?.name === 'login') {
    return navigateTo('/dashboard');
  }
});
