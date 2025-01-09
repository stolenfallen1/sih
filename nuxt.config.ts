import vuetify, { transformAssetUrls } from "vite-plugin-vuetify";

export default defineNuxtConfig({
  runtimeConfig: {
    apiSecret: process.env.NUXT_API_SECRET,
    public: {
      laravelAPI: process.env.NUXT_LARAVEL_API_BASE,
      nodeAPI: process.env.NUXT_NODE_API_BASE,
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
  router: {
    middleware: ['auth.global'], // Run the auth middleware on all routes
  },
  components: [
    {
      path: "~/components/",
      pathPrefix: false,
    }
  ],

  imports: {
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

  compatibilityDate: "2024-10-29",
});
