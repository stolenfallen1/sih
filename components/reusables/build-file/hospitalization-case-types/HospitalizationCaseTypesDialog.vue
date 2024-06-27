<template>
  <v-dialog :model-value="show" rounded="lg" @update:model-value="closeDialog"  scrollable max-width="900px">
      <v-card rounded="lg">
          <v-toolbar density="compact" color="#107bac" hide-details>
              <v-toolbar-title>Hospitalization Case Types</v-toolbar-title>
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
                  :hover="true"
                  @update:options="initialize"
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
                      <v-chip color="green" v-if="item.isactive == 1">Active</v-chip>
                      <v-chip color="red" v-else>Inactive</v-chip>
                  </template>
                  <template v-slot:item.actions="{ item }">
                      <v-icon color="green mr-3" @click="onEdit(item)">mdi-pencil</v-icon>
                      <v-icon color="red" @click="onDelete(item)">mdi-trash-can</v-icon>
                  </template>
              </v-data-table-server>
          </v-card-text>
          <v-divider></v-divider>
          <v-card-actions>
              <v-btn color="blue-darken-1 border border-info" @click="closeDialog"> Close </v-btn>
              <v-spacer></v-spacer>
              <v-btn class="bg-primary text-white" @click="openFormDialog">Add</v-btn>
          </v-card-actions>
      </v-card>
  </v-dialog>
  <hospitalization-case-types-form :payload="payload" :open_form_dialog="open_form_dialog" @close-dialog="closeFormDialog" @handle-submit="onSubmit(payload)" />
  <deleteConfirmation :show="confirmation" @confirm="confirm" @close="closeconfirmation" />
</template>

<script setup>
import HospitalizationCaseTypesForm from './sub-forms/HospitalizationCaseTypesForm.vue';

const props = defineProps({
  show: {
      type: Boolean,
      default: () => false,
      required: true,
  },
})

const confirmation = ref(false);
const emits = defineEmits(['close-dialog'])
const payload = ref({});
const isloading = ref(false);
const open_form_dialog = ref(false)
const headers = [
  {
      title: 'Code',
      align: 'start',
      sortable: false,
      key: 'id',
  },
  { title: 'Description', key: 'description', align: 'start', width:"40%" },
  { title: 'Status', key: 'isactive', align: 'start' },
  { title: '', key: 'actions', align: 'start', width: "15%" },
];
const data = ref({
  title: "List of Hospitalization Case Types",
  keyword: "",
  loading: false,
  filter: {},
  tab: 0,
  param_tab: 1,
});
const itemsPerPage = ref(10);
const totalItems = ref(0);
const serverItems = ref([]);
const default_page = ref(1);
const initialize =  ({ page, itemsPerPage, sortBy }) => {
  loadItems(page,itemsPerPage,sortBy) 
}
const loadItems = async(page = null,itemsPerPage = null,sortBy = null)=>{
  data.value.loading = true;
  let pageno = page || default_page.value;
  let itemPerpageno = itemsPerPage || 10;
  let params = "page=" +pageno + "&per_page=" + itemPerpageno + "&keyword=" + data.value.keyword;
  const response = await useMethod("get","case-type?","",params);
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
  payload.value = Object.assign({});
  open_form_dialog.value = true;
}

const closeFormDialog = () => {
  payload.value = Object.assign({});
  open_form_dialog.value = false;
  default_page.value = 1;
}

const onEdit = (item) => {
  openFormDialog();
  payload.value = Object.assign({});
  payload.value = Object.assign({},item);
  payload.value.isactive = item.isactive == 1 ? true:false;
}


const onSubmit = async (payload) => {
  let response;
  isloading.value = true;
  if(payload.id){
      response = await useMethod("put","case-type",payload,"",payload.id);
  }else{
      response = await useMethod("post","case-type",payload);
  }
  if(response){
      useSnackbar(true,"green",response.msg);
      loadItems();
      closeFormDialog();
      payload.value = Object.assign({});
      default_page.value = 1;
      isloading.value = false;
  }
}
const confirm = async () => {
  if(payload.value.id){
      let response = await useMethod("delete","case-type",payload.value,"",payload.value.id);
      if(response){
          confirmation.value = false;
          useSnackbar(true,"green",response.msg);
          loadItems();
          closeFormDialog();
          payload.value = Object.assign({});
          default_page.value = 1;
          isloading.value = false;
      }
  }
}
const closeconfirmation = () => {
  confirmation.value = false;
}
const onDelete = (item) => {
  payload.value = Object.assign({});
  payload.value = Object.assign({},item);
  confirmation.value = true;
}
const closeDialog = () => {
  emits('close-dialog')
}

</script>

<style scoped>
</style>