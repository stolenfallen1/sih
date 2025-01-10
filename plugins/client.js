// plugins/client.js
export default defineNuxtPlugin((nuxtApp) => {
    nuxtApp.provide('isClient', process.client);
  });
  