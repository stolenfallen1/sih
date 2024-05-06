<template>
  <v-dialog :model-value="show" rounded="lg" @update:model-value="closeDialog"  scrollable max-width="1120px">
      <v-card rounded="lg">
          <v-toolbar density="compact" color="#6984ff" hide-details>
              <v-toolbar-title>Diet Meals</v-toolbar-title>
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
                  :items-length="reset_indicator ? 0 : totalItems"
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
  <diet-list-form :payload="payload":open_form_dialog="open_form_dialog" @close-dialog="closeFormDialog" @handle-submit="onSubmit(payload)" />
  <deleteConfirmation :show="confirmation" @confirm="confirm" @close="closeconfirmation" />
</template>

<script setup>
import DietListForm from "./sub-forms/DietListForm.vue";

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
  { title: 'Description', key: 'meal_description', align: 'start',width:"25%" },
  { title: 'Remarks', key: 'meal_remarks', align: 'start',width:"25%" },
  { title: 'Diet Type', key: 'diet_types.description', align: 'start', width: "20%" },
  { title: 'Diet Sub Type', key: 'diet_sub_types.description', align: 'start', width: "20%" },
  { title: 'Meal Cost', key: 'meal_cost', align: 'start' }, 
  { title: 'Status', key: 'isactive', align: 'start' }, 
  { title: '', key: 'actions', align: 'start' },
];
const data = ref({
  title: "List of Unit",
  keyword: "",
  loading: false,
  filter: {},
  tab: 0,
  param_tab: 1,
});
const itemsPerPage = ref(15);
const totalItems = ref(0);
const serverItems = ref([]);
const default_page = ref(1);
const reset_indicator = ref(false);
const initialize =  ({ page, itemsPerPage, sortBy }) => {
  loadItems(page,itemsPerPage,sortBy) 
}
const loadItems = async(page = null,itemsPerPage = null,sortBy = null)=>{
  data.value.loading = true;
  let pageno = page || default_page.value;
  let itemPerpageno = itemsPerPage || 15;
  let params = "page=" +pageno + "&per_page=" + itemPerpageno + "&keyword=" + data.value.keyword;
  const response = await useMethod("get","diet-meals?","",params);
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
      response = await useMethod("put","diet-meals",payload,"",payload.id);
  }else{
      response = await useMethod("post","diet-meals",payload);
  }
  if(response){
      useSnackbar(true,"green",response.msg);
      loadItems();
      closeFormDialog();
      reset_indicator.value = true;
      payload.value = Object.assign({});
      default_page.value = 1;
      isloading.value = false;
      setTimeout(() => {
        reset_indicator.value = false;
      }, 100);
  }
}
const confirm = async () => {
  if(payload.value.id){
      let response = await useMethod("delete","diet-meals",payload.value,"",payload.value.id);
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