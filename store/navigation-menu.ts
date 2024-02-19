export const useNavigationMenuStore = defineStore("navigationMenu", {
  state: () => ({
    subcomponents:[],
    processing_and_queries: [],
    table_and_template: [],
    isrefresh: false,
  }),
});
