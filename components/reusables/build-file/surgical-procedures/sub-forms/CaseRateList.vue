<template>
  <v-dialog :model-value="open_case_rate_list" rounded="lg"  scrollable max-width="825px">
    <form @submit.prevent="handleSubmit">
      <v-card rounded="lg">
          <v-toolbar density="compact" color="#6984ff" hide-details>
              <v-toolbar-title>Philhealth eClaims Case Rate</v-toolbar-title>
              <v-btn color="white" @click="closeDialog">
                  <v-icon>mdi-close</v-icon>
              </v-btn>
          </v-toolbar>
          <v-divider></v-divider>
          <v-card-text>
            <v-row>
                <v-col cols="5">
                  <v-text-field
                      label="Search by Code"
                      density="compact"
                      variant="outlined"
                      prepend-inner-icon="mdi-magnify"
                  ></v-text-field>
                </v-col>
                <v-col cols="7">
                  <v-text-field
                      label="Search by Description"
                      density="compact"
                      variant="outlined"
                      prepend-inner-icon="mdi-magnify"
                  ></v-text-field>
                </v-col>
              </v-row>
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
              </v-data-table-server>
          </v-card-text>
          <v-divider></v-divider>
          <v-card-actions>
              <v-btn color="blue-darken-1" @click="closeDialog"> Close </v-btn>
              <v-spacer></v-spacer>
              <v-btn class="bg-primary text-white" type="submit">Save</v-btn>
          </v-card-actions>
      </v-card>
    </form>
  </v-dialog>
</template>

<script setup>

const props = defineProps({
  open_case_rate_list: {
    type: Boolean,
    default: () => false,
    required: true,
  },
})

const emits = defineEmits(['close-dialog', 'handle-submit'])
const payload = ref({});
const isloading = ref(false);
const headers = [
  { title: 'Code', key: 'code', align: 'start' },
  { title: 'Description', key: 'description', align: 'start', width:"70%" },
];
const data = ref({
  title: "List of Unit",
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

const handleSubmit = () => {
  emits("handle-submit")
}
const closeDialog = () => {
  emits('close-dialog')
}

</script>

<style scoped>
</style>