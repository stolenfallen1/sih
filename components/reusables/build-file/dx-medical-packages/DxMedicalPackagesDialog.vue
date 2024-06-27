<template>
  <v-dialog :model-value="show" rounded="lg" @update:model-value="closeDialog" scrollable max-width="800px">
    <v-card rounded="lg">
        <v-toolbar density="compact" color="#107bac" hide-details>
            <v-toolbar-title>Diagnostic Package Deals</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-btn color="white" @click="closeDialog">
                <v-icon>mdi-close</v-icon>
            </v-btn>
        </v-toolbar>
          <v-card-text>
            <v-row>
              <v-col cols="12">
                  <v-text-field
                      label="Searh here..."
                      variant="outlined"
                      density="compact"
                      prepend-inner-icon="mdi-magnify"
                      v-model="data.keyword"
                      @keyup.enter="search"
                  ></v-text-field>
              </v-col>
            </v-row>
            <v-data-table-server
                class="animated animatedFadeInUp fadeInUp mt-4"
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
                height="40vh"
                >
                <template
                    v-for="(head, index) of headers"
                    v-slot:[`item.${head.value}`]="props"
                >
                    <td class="test" :props="props" :key="index">
                    <slot :name="head.value" :item="props.item">
                        {{ props.item[head.value] || "..." }}
                    </slot>
                    </td>
                </template>
                <template #bottom></template>
            </v-data-table-server>
          </v-card-text>
          <v-divider></v-divider>
          <v-card-actions>
              <v-btn color="blue-darken-1 border border-info" @click="closeDialog"> Close </v-btn>
              <v-spacer></v-spacer>
              <v-btn class="bg-primary text-white" type="submit" @click="openMedicalPackagesDetails">Add</v-btn>
          </v-card-actions>
      </v-card>
  </v-dialog>
  <dx-medical-package-details :open_medical_package_details="open_medical_package_details" @close-dialog="closeMedicalPackagesDetails" @handle-submit="onSubmit" />
</template>

<script setup>
import DxMedicalPackageDetails from "./sub-forms/DxMedicalPackageDetails.vue";

const props = defineProps({
  show: {
      type: Boolean,
      default: () => false,
      required: true,
  },
})

const emits = defineEmits(['close-dialog'])

const open_medical_package_details = ref(false)

const headers = [
  { title: "Code",  align: "start", sortable: false, key: "id" },
  { title: "Description",  align: "start", sortable: false, key: "description" },
  { title: "Amount",  align: "start", sortable: false, key: "amount" },
  { title: "Status",  align: "start", sortable: false, key: "isactive" },
];

const data = ref({
    title: "List of payment-methods",
    keyword: "",
    loading: false,
    filter: {},
    tab: 0,
    param_tab: 1,
});

const itemsPerPage = ref(10);
const totalItems = ref(0);
const serverItems = ref([]);
const initialize = ({ page, itemsPerPage, sortBy }) => {
    loadItems(page, itemsPerPage, sortBy);
};
const loadItems = async (page = null, itemsPerPage = null, sortBy = null) => {
    data.value.loading = true;
    let pageno = page || 1;
    let itemPerpageno = itemsPerPage || 10;
    let params =
        "page=" + pageno + "&per_page=" + itemPerpageno + "&keyword=" + data.value.keyword;
    const response = await useMethod("get", "payment-methods?", "", params);
    if (response) {
        serverItems.value = response.data;
        totalItems.value = response.total;
        data.value.loading = false;
    }
};

const search = () => {
  loadItems();
}

const openMedicalPackagesDetails = () => {
  open_medical_package_details.value = true;
}

const closeMedicalPackagesDetails = () => {
  open_medical_package_details.value = false;
}

const onEdit = () => {
  alert("Edit")
}

const onDelete = () => {
  alert("Delete")
}

const onSubmit = () => {
  alert('Submitted')
}

const closeDialog = () => {
  emits('close-dialog')
}
</script>

<style scoped>
</style>