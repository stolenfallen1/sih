export const useSubcomponentSelectedRowDetailsStore = defineStore('selectedRowDetails',{
  state: () => ({
    selectedRowDetails:{
      role_id:'',
      id:'',
      tab:1
    },
    isrefresh:false
  }),
})