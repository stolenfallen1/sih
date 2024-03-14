<template>
  <v-dialog :model-value="show" rounded="lg" persistent scrollable max-width="650px">
      <v-card rounded="lg">
          <v-toolbar density="compact" color="#6984ff" hide-details>
              <v-toolbar-title>Price Schemes</v-toolbar-title>
              <v-spacer></v-spacer>
              <v-btn color="white" @click="closeDialog">
                  <v-icon>mdi-close</v-icon>
              </v-btn>
          </v-toolbar>
          <v-divider></v-divider>
          <v-card-text>
              <v-row>
                  <v-col cols="4">
                      <v-autocomplete
                          item-title="description"
                          item-value="id"
                          label="Price Group"
                          :items="msc_price_group" 
                          v-model="data.price_group"
                          @update:model-value="search"
                          hide-details
                          density="compact"
                          variant="outlined"
                      ></v-autocomplete>
                  </v-col>
                  <v-col cols="8">
                      <v-text-field
                          label="Search by Description"
                          density="compact"
                          variant="outlined"
                          append-inner-icon="mdi-magnify"
                          v-model="data.keyword"
                          @keyup.enter="search"
                      >
                      </v-text-field>
                  </v-col>
              </v-row>
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
                  <template v-slot:item.price_group="{ item }">
                      {{ item.price_groups ? item.price_groups.description : ''}}
                  </template>
                  <template v-slot:item.isactive="{ item }">
                      {{ item.isactive == 1 ? "Active" : "In-active" }}
                  </template>
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
              <v-btn class="bg-primary text-white" type="submit" @click="openFormDialog">Add</v-btn>
          </v-card-actions>
      </v-card>
  </v-dialog>
  <price-schemes-form :msc_price_group="msc_price_group" :payload="payload" :open_form_dialog="open_form_dialog" @close-dialog="closeFormDialog" @handle-submit="onSubmit" />
  <deleteConfirmation  :show="confirmation" @confirm="confirm" @close="closeconfirmation" />
</template>

<script setup>
import PriceSchemesForm from "./sub-forms/PriceSchemesForm.vue";

import nuxtStorage from "nuxt-storage";
const msc_price_group = JSON.parse(nuxtStorage.localStorage.getData("msc-price-group")) || [];
const props = defineProps({
show: {
  type: Boolean,
  default: () => false,
  required: true,
},
})

const emits = defineEmits(['close-dialog'])
const confirmation = ref(false);
const payload = ref({});
const isloading = ref(false);
const open_form_dialog = ref(false)
const headers = [
{
  title: 'code',
  align: 'start',
  sortable: false,
  key: 'id',
},
{
  title: 'Price Group',
  align: 'start',
  sortable: false,
  key: 'price_group',
},
{ title: 'Description', key: 'description', align: 'start',width:"40%" },
{ title: '', key: 'actions', align: 'start' },
];

const data = ref({
title: "List of Unit",
keyword: "",
price_group:parseInt(2),
loading: false,
filter: {},
tab: 0,
param_tab: 1,
});
const itemsPerPage = ref(10);
const totalItems = ref(0);
const serverItems = ref([]);
const initialize =  ({ page, itemsPerPage, sortBy }) => {
loadItems(page,itemsPerPage,sortBy)

}
const loadItems = async(page = null,itemsPerPage = null,sortBy = null)=>{
data.value.loading = true;
let pageno = page || 1;
let itemPerpageno = itemsPerPage || 10;
let params = "page=" +pageno + "&per_page=" + itemPerpageno + "&keyword=" + data.value.keyword + "&price_group=" + data.value.price_group;
const response = await useMethod("get","get-price-schemes?","",params);
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
payload.value.msc_price_group_id = parseInt(data.value.price_group);
open_form_dialog.value = true;
}

const closeFormDialog = () => {
payload.value = Object.assign({});
open_form_dialog.value = false;
}

const onEdit = (item) => {
openFormDialog();
payload.value = Object.assign({});
payload.value = Object.assign({},item);
payload.value.msc_price_group_id = parseInt(item.msc_price_group_id);
payload.value.isactive = item.isactive == 1 ? true:false;
}



const onSubmit = async (payload) => {
let response;
isloading.value = true;
if(payload.id){
  response = await useMethod("put","update-price-schemes",payload,"",payload.id);
}else{
  response = await useMethod("post","create-price-schemes",payload);
}
if(response){
  useSnackbar(true,"green",response.msg);
  loadItems();
  closeFormDialog();
  payload.value = Object.assign({});
  isloading.value = false;
}
}
const confirm = async () => {
if(payload.value.id){
  let response = await useMethod("delete","delete-price-schemes",payload.value,"",payload.value.id);
  if(response){
      confirmation.value = false;
      useSnackbar(true,"green",response.msg);
      loadItems();
      closeFormDialog();
      payload.value = Object.assign({});
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
onMounted(()=>{
useMscPriceGroup();
})
</script>

<style scoped>
</style>