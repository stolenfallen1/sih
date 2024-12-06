<template>
  <v-dialog :model-value="open_medical_item_selection" rounded="lg" @update:model-value="closeDialog" fullscreen scrollable>
    <v-card>
      <v-toolbar color="#107bac" density="compact">
        <v-toolbar-title>
          Multi {{ props.category === "medicine" ? "Medicine" : props.category === "supply" ? "Supply" : "Procedure" }} Selection
        </v-toolbar-title>
        <v-btn icon @click="closeDialog" small>
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-toolbar>
      <v-card-text>
          <v-row>
            <v-col cols="4">
              <v-card elevation="4">
                <v-row>
                  <v-col cols="12">
                    <v-text-field
                      v-model="warehouse_search"  
                      class="mb-2 pa-2"
                      label="Search by Department Name"
                      density="compact"
                      hide-details
                      variant="outlined"
                      prepend-inner-icon="mdi-magnify"
                      @keyup.enter="handleSearchWarehouse"
                    ></v-text-field>
                  </v-col>
                </v-row>
                <v-data-table-server 
                  :items-per-page="warehouse_perpage"
                  :headers="warehouse_header" 
                  :items="warehouse_data" 
                  :items-length="warehouse_total_items"
                  :loading="warehouse_loading"
                  item-value="id"
                  :hover="true"
                  @update:options="initializeWarehouse"
                  @update:modelValue="handleSelectWarehouse"
                  show-select
                  select-strategy="single"
                  fixed-header
                  density="compact"
                  height="45vh"
                  >
                    <template
                        v-for="(head, index) of headers"
                        v-slot:[`item.${head.value}`]="props"
                    >
                      <td>
                        <slot :name="head.value" :item="props.item">
                            {{ props.item[head.value] || "..." }}
                        </slot>
                      </td>
                    </template>
                </v-data-table-server>
              </v-card>
            </v-col>
            <v-col cols="8">
              <v-card elevation="4">
                <v-row>
                  <v-col cols="12">
                    <v-text-field
                      v-model="warehouse_item_keyword"
                      class="mb-2 pa-2"
                      label="Search by Item Description"
                      hide-details
                      density="compact"
                      variant="outlined"
                      prepend-inner-icon="mdi-magnify"
                      @keyup.enter="handleSearchWarehouseItems"
                    ></v-text-field>
                  </v-col>
                </v-row>
                <v-data-table-server
                  :items-per-page="warehouse_item_perpage"
                  :headers="props.category === 'procedure' ? procedure_headers : items_headers"
                  :items="warehouse_items_data"
                  :items-length="warehouse_item_total_items"
                  :loading="warehouse_item_loading"
                  item-value="id"
                  show-select
                  :hover="true"
                  :model-value="selectedWarehouseItems"
                  @update:options="initializeWarehouseItems"
                  @update:modelValue="handleSelectWarehouseItems"
                  select-strategy="multiple"
                  fixed-header
                  density="compact"
                  height="45vh"
                  >
                    <template
                        v-for="(head, index) of headers"  v-slot:[`item.${head.value}`]="props">
                        <td class="test" :props="props" :key="index">
                        <slot :name="head.value" :item="props.item">
                            {{ props.item[head.value] || "..." }}
                        </slot>
                        </td>
                      </template>
                      <template v-slot:item.id="{ item }">
                        <span>
                            {{ item.map_item_id }}
                        </span>
                      </template>
                      <template v-slot:item.item_name="{ item }">
                        <span>
                            {{ item.item_name }} {{ item.item_Description }}
                        </span>
                      </template>
                      <template v-slot:item.price="{ item }">
                          <span v-if="item.ware_house_items.length > 0">
                            <template v-for="(warehouseItem, index) in item.ware_house_items" :key="index">
                                {{ usePeso(warehouseItem.price) }}
                            </template>
                          </span>
                          <span v-else style="color: red;">
                              No Price Found
                          </span>
                      </template>
                      <template v-slot:item.prices="{ item }">
                          <span>
                              {{ item.prices && item.prices.length > 0 ? usePeso(item.prices[0].price) : 'No Price Found' }}
                          </span>
                      </template>
                      <template v-slot:item.item_OnHand="{ item }">
                        <span v-if="item.ware_house_items.length > 0">
                            <template v-for="(warehouseItem, index) in item.ware_house_items" :key="index">
                                <span :style="parseInt(warehouseItem.item_OnHand) > 0 ? 'color: blue;' : 'color: red;'">
                                    {{ parseInt(warehouseItem.item_OnHand) }}
                                </span>
                            </template>
                        </span>
                        <span v-else style="color: red;">
                            No Stocks Found
                        </span>
                    </template>
                </v-data-table-server>
              </v-card>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12">
              <v-card elevation="4">
                <v-toolbar density="compact" color="#107bac">
                  <v-toolbar-title class="toolbar-title">Selected Items</v-toolbar-title>
                  <v-btn prepend-icon="mdi-trash-can" class="bg-error text-white" @click="onDeleteAll()">Clear All</v-btn>
                </v-toolbar>
                <v-card-text style="max-height: 400px; overflow-y: auto;">
                  <v-data-table
                    density="compact"
                    :headers="tableHeaders"
                    :items="selected_item_data"
                    :items-per-page="100"
                    hide-details
                    fixed-header
                    style="max-height: 350px; overflow-y: auto;"
                  >
                    <template v-slot:[`item.frequency`]="{ item }" v-if="props.category === 'medicine'">
                      <input
                        style="border-bottom: 1px solid #A9A9A9;"
                        :value="item.frequency ? item.frequency.description : ''"
                        @keyup.enter="openFrequencyList(item)"
                        readonly
                      />
                    </template>
                    
                    <template v-slot:[`item.on_hand`]="{ item }" v-if="props.category === 'medicine' || props.category === 'supply'">
                      <input
                        style="border-bottom: 1px solid #A9A9A9;"
                        :value="item.ware_house_items && item.ware_house_items.length > 0
                          ? parseInt(item.ware_house_items[0].item_OnHand)
                          : 'No Quantity Found'"
                        readonly
                      />
                    </template>

                    <template v-slot:[`item.stat`]="{ item }" v-if="props.category === 'medicine' || props.category === 'procedure'">
                        <select class="input charge-focus" v-model="item.stat" style="border: 1px solid #A9A9A9; padding: 1px 7px 1px 7px;">
                            <option value="1">Routine</option>
                            <option value="2">Stat</option>
                        </select>
                    </template>

                    <template v-slot:[`item.price`]="{ item }" v-if="props.category === 'medicine' || props.category === 'supply'">
                      <input
                        style="border-bottom: 1px solid #A9A9A9;"
                        :value="item.ware_house_items && item.ware_house_items.length > 0
                          ? usePeso(item.ware_house_items[0].price)
                          : 'No Price Found'"
                        readonly
                      />
                    </template>

                    <template v-slot:[`item.quantity`]="{ item }" v-if="props.category === 'medicine' || props.category === 'supply'">
                      <input
                        style="border-bottom: 1px solid #A9A9A9;"
                        v-model="item.quantity"
                        @input="updateAmount(item)"
                      />
                    </template>

                    <template v-slot:[`item.amount`]="{ item }" v-if="props.category === 'medicine' || props.category === 'supply'">
                      <input style="border-bottom: 1px solid #A9A9A9;" :value="item.amount" readonly />
                    </template>

                    <template v-slot:[`item.quantity`]="{ item }" v-if="props.category === 'procedure'">
                      <input 
                        style="border-bottom: 1px solid #A9A9A9;" 
                        :value="1" 
                        readonly 
                      />
                    </template>

                    <template v-slot:[`item.prices`]="{ item }" v-if="props.category === 'procedure'">
                      <input 
                        style="border-bottom: 1px solid #A9A9A9;" 
                        :value="item.prices && item.prices.length > 0 
                          ? usePeso(item.prices[0].price)
                          : 'No Price Found'" 
                        readonly 
                      />
                    </template>

                    <template v-slot:[`item.specimens`]="{ item }">
                        <select v-model="item.specimen" style="border: 1px solid #A9A9A9; padding: 1px 7px 1px 7px; width: 175px;" v-if="item.category === 'LABORATORY' && item.specimen != []">
                            <option v-for="(specimen, sIndex) in item.specimens" :key="sIndex" :value="specimen.id">
                                {{ specimen.description }} 
                            </option>
                        </select>
                        <span style="color: red;" v-else>Not Applicable</span>
                    </template>

                    <template v-slot:[`item.actions`]="{ item }">
                      <v-icon color="red" @click="onDelete(item.id)">mdi-trash-can</v-icon>
                    </template>

                    <template #bottom></template>
                  </v-data-table>
                </v-card-text>
              </v-card>
            </v-col>
          </v-row>
      </v-card-text>
      <v-divider></v-divider>
      <v-card-actions>
          <v-btn color="blue-darken-1 border border-info" @click="closeDialog"> Close </v-btn>
          <v-spacer></v-spacer>
          <p style="margin-right: 25px; font-weight: bolder; font-size: larger;">Total Amount: {{ usePeso(totalAmount) }}</p>
          <v-btn class="bg-primary text-white" type="submit" @click="confirmRequisition">Submit</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>

  <Confirmation 
      :show="requisitionconfirmation"
      :payload="payload"
      :loading="isLoadingBtn"
      :error_msg="error_msg"
      @submit="onSubmit"
      @close="closeConfirmation"
  />

  <frequency-list
    :open_frequency_list="open_frequency_list"
    @handle-select="handleSelectedFrequency"
    @close-dialog="closeFrequencyList"
  />
</template>

<script setup>
import FrequencyList from "../../../../../pages/services/out-patient/components/OPDFrequencyList.vue";

const props = defineProps({
  open_medical_item_selection: {
      type: Boolean,
      default: () => false,
      required: false,
  },
  category: {
      type: String,
      default: () => "",
      required: false,
  },
  roleID: {
      type: Number,
      required: false,
  }
})

const { selectedRowDetails } = storeToRefs(useSubcomponentSelectedRowDetailsStore()); 
const emits = defineEmits(['close-dialog' , 'submit-requisition']);
const payload = ref({
  selectedItems: [],
});

const error_msg = ref('');
const isLoadingBtn = ref(false);
const user_attempts = ref(0);
const requisitionconfirmation = ref(false);
const selected_warehouse = ref({});
const selected_warehouse_item = ref([]);
const open_frequency_list = ref(false);
const current_item = ref({});

const warehouse_header = [
  { title: "Department", align: "start", key: "description", sortable: false }
];

const warehouse_perpage = ref(10);
const warehouse_loading = ref(false);
const warehouse_total_items = ref(0);
const warehouse_data = ref([]);
const warehouse_search = ref(""); 

const initializeWarehouse = ({ page, itemsPerPage, keyword }) => {
    getWarehouse(page, itemsPerPage, warehouse_search.value, keyword); 
};

const handleSearchWarehouse = () => {
  initializeWarehouse({ page: 1, itemsPerPage: warehouse_perpage.value, keyword: warehouse_search.value });
};

const getWarehouse = async (page = null, itemsPerPage = null, keyword = "") => {
    warehouse_loading.value = true;
    const pageno = page || 1;
    const itemPerpageno = itemsPerPage || warehouse_perpage.value;
    const params = "category=" + props.category + "&page=" + pageno + "&per_page=" + itemPerpageno + "&keyword=" + keyword;

    if (!props.category) throw new Error("Category is required.");
    if (props.category === "medicine" || props.category === "supply") {
      const response = await useMethod("get", "get-warehouses?", "", params);
      if (response) {
          warehouse_data.value = response.data.filter(item => item.code === 'PH' || item.code === 'CS'); // For now only PH ( Pharmacy ) and CS ( Supply ) will be shown in the list as per sir joe instruction, if dili gani just remove this line and uncomment the next line
          // warehouse_data.value = response.data;
          warehouse_total_items.value = response.total;
      }
      warehouse_loading.value = false;
    } else if (props.category === "procedure") {
      const response = await useMethod("get", "get-warehouses?", "", params);
      if (response) {
          warehouse_data.value = response.data;
          warehouse_total_items.value = response.total;
      }
      warehouse_loading.value = false;
    } else {
        throw new Error("Invalid category.");
    }
};

const warehouse_item_keyword = ref("");
const warehouse_item_loading = ref(false);
const warehouse_item_perpage = ref(10);
const warehouse_item_total_items = ref(0);
const warehouse_items_data = ref([]);
const items_headers = [
    { title: "Code", align: "start", sortable: false, key: "map_item_id" },
    { title: "Description", key: "item_name", align: "start", width: "50%", sortable: false },
    { title: "Price", key: "price", align: "start", sortable: false },
    { title: "On Hand", key: "item_OnHand", align: "start", sortable: false }
];
const procedure_headers = [
    { title: "Code", align: "start", sortable: false, key: "map_item_id" },
    { title: "Description", key: "exam_description", align: "start", width: "50%", sortable: false },
    { title: "Price", key: "prices", align: "start", sortable: false },
];

const handleSelectWarehouse = async (selectedRow, page = 1, itemsPerPage = warehouse_item_perpage.value) => {
    const selectedWarehouse = selectedRow.map(rowId => warehouse_data.value.find(item => item.id === rowId));
    const validSelectedWarehouse = selectedWarehouse.filter(item => item !== undefined);
    selected_warehouse.value = validSelectedWarehouse[0];

    try {
      if (selected_warehouse.value) {
        warehouse_item_loading.value = true;
        
        if (props.category === 'medicine' || props.category === 'supply') {
          const response = await $fetch(useApiUrl() + `/get-warehouse-items?page=${page}&per_page=${itemsPerPage}&keyword=${warehouse_item_keyword.value}`, {
              method: 'post',
              headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + useToken()},
              body: { 
                  revenuecode: selected_warehouse.value.code,
                  warehouseID: parseInt(selected_warehouse.value.warehouse_id),
                  patienttype: selectedRowDetails.value.patient_registry ? parseInt(selectedRowDetails.value.patient_registry[0].mscPrice_Schemes) : "",
                  // roleID: props.roleID
              }
          });
  
          if (response) {
            warehouse_items_data.value = response.data.map(item => ({
                ...item,
                category: selected_warehouse.value.description || "",
                revenueID: selected_warehouse.value.code || null,
                warehouseID: selected_warehouse.value.warehouse_id || null,
                warehouse_identifier: selected_warehouse.value.isMedicine == 1 ? "isMedicine" : (selected_warehouse.value.isSupplies == 1 ? "isSupplies" : null),
            }));
            warehouse_item_total_items.value = response.total;
            warehouse_item_loading.value = false;
          }
        } else if (props.category === 'procedure') {
          const response = await $fetch(useApiUrl() + `/get-his-charges?page=${page}&per_page=${itemsPerPage}&keyword=${warehouse_item_keyword.value}`, {
              method: 'post',
              headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + useToken()},
              body: { 
                  revenuecode: selected_warehouse.value.code,
                  patienttype: selectedRowDetails.value.patient_registry ? parseInt(selectedRowDetails.value.patient_registry[0].mscPrice_Schemes) : "",
                  // warehouseID: parseInt(selected_warehouse.value.warehouse_id),
                  // chargecode: ""
              }
          });
  
          if (response) {
            warehouse_items_data.value = response.data.map(item => ({
                ...item,
                category: selected_warehouse.value.description || "",
                revenueID: selected_warehouse.value.code || null,
                warehouse_identifier: selected_warehouse.value.isMedicine == 1 ? "isMedicine" : (selected_warehouse.value.isSupplies == 1 ? "isSupplies" : selected_warehouse.value.isProcedure == 1 ? "isProcedure" : null),
            }));
            warehouse_item_total_items.value = response.total;
            warehouse_item_loading.value = false;
          }
        } else {
          throw new Error("Invalid category.");
        }
      }
    } catch (error) {
        warehouse_items_data.value = [];
        warehouse_item_total_items.value = 0;
    } finally {
        warehouse_item_loading.value = false;
    }
};

const initializeWarehouseItems = ({ page, itemsPerPage }) => {
    handleSelectWarehouse([selected_warehouse.value.id], page, itemsPerPage);
};

const handleSearchWarehouseItems = () => {
    initializeWarehouseItems({ page: 1, itemsPerPage: warehouse_item_perpage.value, keyword: warehouse_item_keyword.value });
};

const selected_medicine_headers = [
  { title: "Code", align: "start", sortable: false, key: "map_item_id" },
  { title: "Category", align: "start", sortable: false, key: "category" },
  { title: "Description", align: "start", sortable: false, key: "item_name" },
  { title: "Frequency", align: "start", sortable: false, key: "frequency" },
  { title: "On Hand Quantity", align: "start", sortable: false, key: "on_hand" },
  { title: "Request Quantity", align: "start", sortable: false, key: "quantity" },
  { title: "Price", align: "start", sortable: false, key: "price" },
  { title: "Amount", align: "start", sortable: false, key: "amount" },
  { title: "Stat", align: "start", sortable: false, key: "stat" },
  { title: "", align: "start", sortable: false, key: "actions" },
];

const selected_supply_headers = [
  { title: "Code", align: "start", sortable: false, key: "map_item_id" },
  { title: "Category", align: "start", sortable: false, key: "category" },
  { title: "Description", align: "start", sortable: false, key: "item_name" },
  { title: "On Hand Quantity", align: "start", sortable: false, key: "on_hand" },
  { title: "Request Quantity", align: "start", sortable: false, key: "quantity" },
  { title: "Price", align: "start", sortable: false, key: "price" },
  { title: "Amount", align: "start", sortable: false, key: "amount" },
  { title: "", align: "start", sortable: false, key: "actions" },
];

const selected_procedure_headers = [
  { title: "Code", align: "start", sortable: false, key: "map_item_id" },
  { title: "Category", align: "start", sortable: false, key: "category" },
  { title: "Description", align: "start", sortable: false, key: "exam_description" },
  { title: "Request Quantity", align: "start", sortable: false, key: "quantity" },
  { title: "Amount", align: "start", sortable: false, key: "prices" },
  { title: "Specimen", align: "start", sortable: false, key: "specimens" },
  { title: "Stat", align: "start", sortable: false, key: "stat" },
  { title: "", align: "start", sortable: false, key: "actions" },
];

const tableHeaders = computed(() => {
  if (props.category === "medicine") return selected_medicine_headers;
  if (props.category === "supply") return selected_supply_headers;
  if (props.category === "procedure") return selected_procedure_headers;
  return [];
});

const selected_item_data = ref([]);
const selectedWarehouseItems = ref([]); 
const handleSelectWarehouseItems = async (selectedRow) => {
    selectedWarehouseItems.value = selectedRow;

    const selectedItems = selectedRow.map(rowId => warehouse_items_data.value.find(item => item.id === rowId));
    const validSelectedItems = selectedItems.filter(item => item !== undefined);

    for (const item of validSelectedItems) {
        if (props.category === 'procedure') {
            item.quantity = 1;
            if (item.category === 'LABORATORY') {
                try {
                    const response = await useMethod("get", "get-charges-specimen?map_item_id=", "", item.map_item_id);
                    if (response && response.data) {
                        item.specimens = response.data.map(specimen => {
                            return {
                                id: specimen.specimens.id,
                                description: specimen.specimens.description
                            };
                        }) || [];

                        item.specimen = item.specimens.length > 0 ? item.specimens[0].id : '';
                    } else {
                        item.specimens = [];
                        item.specimen = '';
                    }
                } catch (error) {
                    console.error('Error fetching specimens:', error);
                    item.specimens = [];
                    item.specimen = '';
                }
            }
        } else {
            item.specimens = [];
            item.specimen = ''; 
        }

        if (props.category === 'medicine' || props.category === 'supply') {
            const hasZeroStock = item.ware_house_items.some(warehouseItem => parseInt(warehouseItem.item_OnHand) === 0);
            if (hasZeroStock) {
                continue;
            }
        }

        if (props.category === 'medicine' || props.category === 'procedure') {
            item.stat = item.stat || '1'; 
        }

        if (!selected_item_data.value.some(selected => selected.id === item.id)) {
            selected_item_data.value.push(item);
        }
    }
};


const updateAmount = (item) => {
    const cleanedPrice = item.ware_house_items && item.ware_house_items.length > 0 
                          ? item.ware_house_items[0].price.replace(/[^\d.-]/g, '') 
                          : '0';
    const quantity = Number(item.quantity) || 0; 
    const price = Number(cleanedPrice) || 0; 
    item.amount = usePeso(quantity * price); 
}

const totalAmount = computed(() => {
    if (props.category == 'medicine' || props.category == 'supply') {
      return selected_item_data.value.reduce((acc, item) => {
          const cleanedPrice = item.ware_house_items && item.ware_house_items.length > 0 
                                ? item.ware_house_items[0].price.replace(/[^\d.-]/g, '') 
                                : '0';
          const quantity = Number(item.quantity) || 0; 
          const price = Number(cleanedPrice) || 0; 
          return acc + (quantity * price); 
      }, 0);
    } else if (props.category == 'procedure') {
      return selected_item_data.value.reduce((acc, item) => {
            const cleanedPrice = item.prices && item.prices.length > 0 
                                  ? item.prices[0].price.replace(/[^\d.-]/g, '') 
                                  : '0';
            const price = Number(cleanedPrice) || 0; 
            return acc + price; 
        }, 0);
    }
    return 0;
});


const openFrequencyList = (item) => {
  current_item.value = item; 
  open_frequency_list.value = true; 
};

const handleSelectedFrequency = (selected_item) => {
  if (selected_item && selected_item.description) {
    current_item.value.frequency = {
      id: selected_item.dosage_id, 
      description: selected_item.description,
    };
  } else {
    current_item.value.frequency = { id: null, description: '' }; 
  }
  closeFrequencyList(); 
};

const closeFrequencyList = () => {
  open_frequency_list.value = false;
};

const onDelete = (itemId) => {
  selected_item_data.value = selected_item_data.value.filter(item => item.id !== itemId);
  selectedWarehouseItems.value = selectedWarehouseItems.value.filter(id => id !== itemId);
};

const onDeleteAll = () => {
  selected_item_data.value = [];
  selectedWarehouseItems.value = []; 
};

const confirmRequisition = () => {
  if (selected_item_data.value.length === 0) {
    useSnackbar(true, "error", "Can't submit empty requisition. Select at least one item.");
    return;
  }

  if (selected_item_data.value.some(item => item.quantity == null || item.quantity == "" || item.quantity == 0)) {
    useSnackbar(true, "error", "Quantity can't be empty or zero.");
    return;
  }

  if (props.category == 'supply' && props.category == 'medicine' && (selected_item_data.value.some(item => parseInt(item.quantity) > parseInt(item.ware_house_items[0].item_OnHand)))) {
    useSnackbar(true, "error", "Request Quantity can't be higher than Stocks On hand.");
    return;
  }

  const drcr = ref("");
  const lgrp = ref("");
  if (props.category == 'procedure') {
    drcr.value = selected_warehouse.value.drcr;
    lgrp.value = selected_warehouse.value.lgrp;
  }

  payload.value.selectedItems = selected_item_data.value.map(item => ({
    code: item.revenueID,
    warehouse_id: item.warehouseID,
    map_item_id: item.map_item_id,
    category: item.category,
    item_name: item.item_name ?? item.exam_description,
    frequency: item.frequency?.id || null,
    stat: item.stat,
    drcr: drcr.value || null,
    lgrp: lgrp.value || null,
    form: item.form || null,
    barcode_prefix: item?.sections?.barcodeid_prefix || null,
    specimen: item.specimen,
    item_OnHand: parseInt(item.ware_house_items?.[0]?.item_OnHand) || 0,
    item_ListCost: item.ware_house_items?.[0]?.item_ListCost || 0,
    quantity: item.quantity,
    price: item.ware_house_items?.[0]?.price || 0,
    amount: item.amount ?? item.prices?.[0]?.price,
  }));

  if (props.category == 'medicine' && payload.value.selectedItems.some(item => item.frequency == null || item.frequency == "")) {
    useSnackbar(true, "error", "Frequency is required");
    return;
  }

  requisitionconfirmation.value = true;
};

const submitMedicineRequest = async () => {
    const medicine_res = await useMethod("post", "save-medicine-requisition", payload.value);
    if (medicine_res) {
        useSnackbar(true, "success", "Successfully posted medicine requests.");
        emits('submit-requisition');
        closeConfirmation();
        closeDialog();
    } else {
        useSnackbar(true, "error", "Failed to post charges.");
    }
}

const submitSupplyRequest = async () => {
    const supply_res = await useMethod("post", "save-supply-requisition", payload.value);
    if (supply_res) {
        useSnackbar(true, "success", "Successfully posted supply requests.");
        emits('submit-requisition');
        closeConfirmation();
        closeDialog();
    } else {
        useSnackbar(true, "error", "Failed to post charges.");
    }
}

const submitProcedureRequest = async () => {
  const procedure_res = await useMethod("post", "save-procedure-requisition", payload.value);
    if (procedure_res) {
        useSnackbar(true, "success", "Successfully posted supply requests.");
        emits('submit-requisition');
        closeConfirmation();
        closeDialog();
    } else {
        useSnackbar(true, "error", "Failed to post charges.");
    }
}

const onSubmit = async (user_details) => {
  switch (props.roleID) {
    case '27':
      switch (props.category) {
          case "medicine":
            submitMedicineRequest();
            break;
          case "supply":
            submitSupplyRequest();
            break;
          case "procedure":
            submitProcedureRequest();
            break;
        }
      break;
    default:
      if (user_details.user_passcode === usePasscode()) {
        switch (props.category) {
          case "medicine":
            submitMedicineRequest();
            break;
          case "supply":
            submitSupplyRequest();
            break;
          case "procedure":
            submitProcedureRequest();
            break;
        }
      } else {
            user_attempts.value += 1;
            useSnackbar(true, "error", "Password incorrect.");
            if (user_attempts.value == 5) {
                error_msg.value = "Too many wrong attempts, Please try again after 20 seconds.";
                isLoadingBtn.value = true;
                setTimeout(() => {
                    isLoadingBtn.value = false;
                    user_attempts.value = 0;
                    error_msg.value = "";
                }, 20000);
            }
        }
      break;
  }
};

const closeConfirmation = () => {
  requisitionconfirmation.value = false;
};

const closeDialog = () => {
  warehouse_data.value = [];
  warehouse_items_data.value = [];
  selected_item_data.value = [];
  warehouse_search.value = "";
  warehouse_item_keyword.value = "";
  selected_warehouse.value = {};
  selected_warehouse_item.value = [];
  selectedWarehouseItems.value = [];
  emits('close-dialog')
}

onUpdated(() => {
  if (props.open_medical_item_selection) {
    payload.value.patient_Id = selectedRowDetails.value.patient_Id || '';
    payload.value.case_No = selectedRowDetails.value.patient_registry && selectedRowDetails.value.patient_registry[0]?.case_No || '';
    payload.value.patient_Name = selectedRowDetails.value.lastname + ', ' + selectedRowDetails.value.firstname + ' ' + selectedRowDetails.value.middlename || '';
    payload.value.account = selectedRowDetails.value.patient_registry && selectedRowDetails.value.patient_registry[0]?.mscPrice_Schemes == 1 ? 'Cash Transaction' : 'Insurance Transaction';
    payload.value.attending_Doctor = selectedRowDetails.value.patient_registry && selectedRowDetails.value.patient_registry[0]?.attending_Doctor || 'N/A';
    payload.value.attending_Doctor_fullname = selectedRowDetails.value.patient_registry && selectedRowDetails.value.patient_registry[0]?.attending_Doctor_fullname || 'N/A';
    payload.value.guarantor_Id = selectedRowDetails.value.patient_registry && selectedRowDetails.value.patient_registry[0]?.guarantor_Id || '';
    payload.value.patient_Type = selectedRowDetails.value.patient_registry && 
                                  selectedRowDetails.value.patient_registry[0]?.mscAccount_Trans_Types == 2 ? 'Out-Patient' 
                                  : (selectedRowDetails.value.patient_registry[0]?.mscAccount_Trans_Types == 5 ? 'Emergency' : 'In-Patient');
  }
})
</script>

<style scoped>
.toolbar-title {
  font-size: 16px; 
  font-style: italic; 
  text-align: center;
}
</style>