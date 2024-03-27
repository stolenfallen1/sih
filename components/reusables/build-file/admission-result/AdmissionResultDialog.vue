<template>
    <v-dialog :model-value="show" rounded="lg" @update:model-value="closeDialog" scrollable max-width="900px">
        <v-card rounded="lg">
            <v-toolbar density="compact" color="#6984ff" hide-details>
                <v-toolbar-title>Admission Results Template</v-toolbar-title>
                <v-spacer></v-spacer>
                <v-btn color="white" @click="closeDialog">
                    <v-icon>mdi-close</v-icon>
                </v-btn>
            </v-toolbar>
            <v-divider></v-divider>
            <v-card-text>
                <v-text-field
                    label="Search by Description"
                    density="compact"
                    variant="outlined"
                    prepend-inner-icon="mdi-magnify"
                    v-model="data.keyword"
                    @keyup.enter="search"
                >
                </v-text-field>
                <v-divider></v-divider>
                <v-data-table-server 
                    class="animated animatedFadeInUp fadeInUp"
                    v-model:items-per-page="itemsPerPage"
                    :headers="headers"
                    :items="serverItems"
                    :items-length="totalItems"
                    :loading="data.loading"
                    item-value="id"
                    @update:options="initialize"
                    show-select
                    select-strategy="single"
                    fixed-header
                    density="compact" 
                    height="50vh"
                    >
                    <template
                        v-for="(head, index) of headers"  v-slot:[`item.${head.value}`]="props" >
                        <td class="test" :props="props" :key="index">
                        <slot :name="head.value" :item="props.item">
                            {{ props.item[head.value] || "..." }}
                        </slot>
                        </td>
                    </template>
                    <template v-slot:item.isactive="{ item }">
                        {{ item.isactive == 1 ? "Active" : "In-active" }}
                    </template>
                    <!--
                    <template v-slot:item.erd_apply="{ item }">
                      <v-checkbox density="compact" hide-details></v-checkbox>
                    </template>
                    <template v-slot:item.opd_apply="{ item }">
                      <v-checkbox density="compact" hide-details></v-checkbox>
                    </template> 
                    <template v-slot:item.ipd_apply="{ item }">
                      <v-checkbox density="compact" hide-details></v-checkbox>
                    </template>
                    -->
                    <template v-slot:item.actions="{ item }">
                        <v-icon color="green mr-3" @click="onEdit(item)">mdi-pencil</v-icon>
                        <v-icon color="red" @click="onDelete(item)">mdi-trash-can</v-icon>
                    </template>
                </v-data-table-server>
            </v-card-text>
            <v-divider></v-divider>
            <v-card-actions>
                <v-btn color="blue-darken-1" @click="closeDialog"> Close </v-btn>
                <v-spacer></v-spacer>
                <v-btn class="bg-primary text-white" @click="openFormDialog">Add</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>

    <v-dialog
      :model-value="open_form_dialog"
      @update:model-value="closeFormDialog"
      rounded="lg"
      scrollable
      max-width="600px"
    >
      <form @submit.prevent="onSubmit">
        <v-card rounded="lg">
          <v-toolbar density="compact" color="#6984ff" hide-details>
            <v-toolbar-title>Admission Results Details</v-toolbar-title>
            <v-btn color="white" @click="closeFormDialog">
              <v-icon>mdi-close</v-icon>
            </v-btn>
          </v-toolbar>
          <v-divider></v-divider>

          <v-card-text>
            <v-row>
              <v-col cols="12">
                <v-text-field
                  label="Description"
                  hide-details
                  required
                  density="compact"
                  variant="outlined"
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-card elevation="4">
                  <v-card-text>
                    <v-radio-group  hide-details density="compact">
                        <v-list-subheader inset>
                          Applicable Registry
                        </v-list-subheader>
                        <v-checkbox label="Emergency" value="0" hide-details density="compact"></v-checkbox>
                        <v-checkbox label="Inpatient" value="1" hide-details density="compact"></v-checkbox>
                        <v-checkbox label="Outpatient" value="2" hide-details density="compact"></v-checkbox>
                    </v-radio-group>
                  </v-card-text>
                </v-card>
              </v-col>
              <v-col cols="12">
                <v-checkbox label="Active" hide-details density="compact"></v-checkbox>
              </v-col>
            </v-row>
          </v-card-text>
          <v-divider></v-divider>
          <v-card-actions>
            <v-btn color="blue-darken-1" @click="closeFormDialog"> Close </v-btn>
            <v-spacer></v-spacer>
            <v-btn class="bg-primary text-white" type="submit">Submit</v-btn>
          </v-card-actions>
        </v-card>
      </form>
    </v-dialog>
    <deleteConfirmation 
      :show="confirmation" 
      @confirm="confirm" 
      @close="closeconfirmation" 
    />
  </template>
  
  <script setup>

  const props = defineProps({
    show: {
        type: Boolean,
        default: () => false,
        required: true,
    },
  })
  
  let dialogStack = ref([]);
  const confirmation = ref(false);
  const emits = defineEmits(['close-dialog'])
  const open_form_dialog = ref(false)
  const headers = [
    {
        title: 'Code',
        align: 'start',
        sortable: false,
        key: 'id',
    },
    { title: 'Description', key: 'description', align: 'start', width:"40%" },
    { title: 'Is Active', key: 'is_active', align: 'start' },
    // { title: '?', key: 'erd_apply', align: 'start' }, // ERD Apply
    // { title: '?', key: 'opd_apply', align: 'start' }, // OPD Apply
    // { title: '?', key: 'ipd_apply', align: 'start' }, // IPD Apply
    { title: '', key: 'actions', align: 'start', width: "15%" },
  ];
  const data = ref({
    title: "List of Admission Results",
    keyword: "",
    loading: false,
    filter: {},
    tab: 0,
    param_tab: 1,
  });
  const itemsPerPage = ref(10);
  const totalItems = ref(0);
  const serverItems = ref([]);
  const initialize =  ({ page, itemsPerPage, sortBy }) => {
    // loadItems(page,itemsPerPage,sortBy) 
    null
  }
  const loadItems = async(page = null,itemsPerPage = null,sortBy = null)=>{
    data.value.loading = true;
    let pageno = page || 1;
    let itemPerpageno = itemsPerPage || 10;
    let params = "page=" +pageno + "&per_page=" + itemPerpageno + "&keyword=" + data.value.keyword;
    const response = await useMethod("get","get-warehouse-group?","",params);
    if(response){
        serverItems.value = response.data;
        totalItems.value = response.total;
        data.value.loading = false;
    }
  }
  const search = ()=>{
    loadItems();
  }
  
  const openFormDialog = () => {
    // payload.value = Object.assign({});
    open_form_dialog.value = true;
  }

  const closeFormDialog = () => {
    // payload.value = Object.assign({});
    open_form_dialog.value = false;
  }
  
  const onEdit = (item) => {
    openFormDialog();
    // payload.value = Object.assign({});
    // payload.value = Object.assign({},item);
    // payload.value.isactive = item.isactive == 1 ? true:false;
  }
  
  
  const onSubmit = async (payload) => {
    alert("Submitted");
  //   let response;
  //   isloading.value = true;
  //   if(payload.id){
  //       response = await useMethod("put","update-warehouse-group",payload,"",payload.id);
  //   }else{
  //       response = await useMethod("post","create-warehouse-group",payload);
  //   }
  //   if(response){
  //       useSnackbar(true,"green",response.msg);
  //       loadItems();
  //       closeFormDialog();
  //       payload.value = Object.assign({});
  //       isloading.value = false;
  //   }
  // }
  // const confirm = async () => {
  //   if(payload.value.id){
  //       let response = await useMethod("delete","delete-warehouse-group",payload.value,"",payload.value.id);
  //       if(response){
  //           confirmation.value = false;
  //           useSnackbar(true,"green",response.msg);
  //           loadItems();
  //           closeFormDialog();
  //           payload.value = Object.assign({});
  //           isloading.value = false;
  //       }
  //   }
  
  }
  
  const confirm = () => {
    confirmation.value = false;
  }
  const closeconfirmation = () => {
  confirmation.value = false;
  }
  const onDelete = (item) => {
    // payload.value = Object.assign({});
    // payload.value = Object.assign({},item);
    confirmation.value = true;
  }
  const closeDialog = () => {
    emits('close-dialog')
  }
  </script>
  
  <style scoped>
  </style>