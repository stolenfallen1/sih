// https://nuxt.com/docs/api/configuration/nuxt-config
import vuetify, { transformAssetUrls } from "vite-plugin-vuetify";
export default defineNuxtConfig({
   runtimeConfig: {
    apiSecret:"1234",
    public: {
      apiBase: "http://10.4.15.12:8000/api" // Llyodieeee
      // apiBase: "http://10.4.15.15/api" // Sir Jucel Gwapooo
    },
  },
  app: {
    head: {
      title: "CDG HIS",
      meta: [{ name: "description", content: "CDG HIS" }],
      charset: "utf-8",
      viewport: "width=device-width, initial-scale=1",
    },
  },
  devtools: { enabled: true },
  build: {
    transpile: ["vuetify"],
  },
  css: [
    "~/assets/css/main.css",
  ],
  components: [
    {
      path: "~/components/",
      pathPrefix: false,
    }
  ],
  imports:{
    dirs: [
      'store', 
      'store/table-templates/master-file', 
      'store/table-templates/services',
      'store/table-templates/build-file',
      'store/sub-components/master-file',
      'store/sub-components/services',
      'store/sub-components/transactions',
      'store/processing-queries/master-file',
      'store/processing-queries/services',
      // 'store/processing-queries/services',
      // 'store/processing-queries/transactions',
      "composables/build",
      "composables/address"
    ]
  },
  modules: [
    "@pinia/nuxt",
    (_options, nuxt) => {
      nuxt.hooks.hook("vite:extendConfig", (config) => {
        // @ts-expect-error
        config.plugins.push(vuetify({ autoImport: true }));
      });
    },
    "@nuxtjs/google-fonts",
    //...
  ],
  googleFonts: {
    display: "swap",
    families: {
      Montserrat: true,
    }
  },
  vite: {
    vue: {
      template: {
        transformAssetUrls,
      },
    },
  },
});

