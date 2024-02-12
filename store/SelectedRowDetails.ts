export const useSubcomponentSelectedRowDetailsStore = defineStore('selectedRowDetails',{
  state: () => ({
    selectedRowDetails:{
      role_id:'',
      id:''
    },
    isrefresh:false
  }),
})