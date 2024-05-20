<template>
    <v-dialog :model-value="open_price_update_dialog" rounded="lg" scrollable @update:model-value="closeDialog" max-width="800px">
        <form @submit.prevent="onSubmit">
            <v-card rounded="lg">
                <v-toolbar density="compact" color="#6984ff" hide-details>
                    <v-toolbar-title>Updating of Items and Services Selling Price {{ selectedRowDetails.id }}</v-toolbar-title>
                    <v-btn color="white" @click="closeDialog">
                        <v-icon>mdi-close</v-icon>
                    </v-btn>
                </v-toolbar>
                <v-divider></v-divider>
                <v-card-text>
                    <v-card elevation="4">
                        <v-card-text>
                            <p>
                                <span style="font-weight: bold; font-style: italic;" >NOTE: </span>Make sure that you've checked the specified mark-up for each pricing scheme before continuing with 
                                this process. Once this processing gets started, it can no longer be interrupted until completed. It is also important to note that the user trying to execute this 
                                process must be familiar with pricing and costing to avoid problems.
                            </p><br/>
                            <p>
                                Items or Services with zero or null costing will not be included in the calculation. Also take note that the basis in selling price calculation for non-inventory items
                                or services such as examinations and procedures is the current selling price, while inventory items such as medicines and supplies is based on the purchase cost.
                            </p><br/>
                            <p>
                                Click "UPDATE" button to proceed with this process. Or just click "CLOSE" button Otherwise.
                            </p>
                        </v-card-text>
                    </v-card>
                    <v-row class="mt-1">
                        <v-col cols="12">
                            <v-autocomplete
                                label="Department"
                                variant="outlined"
                                density="compact"
                                hide-details
                                readonly
                            ></v-autocomplete>
                        </v-col>
                        <v-col cols="6" class="form-col">
                            <v-autocomplete
                                label="Item Group"
                                variant="outlined"
                                density="compact"
                                hide-details
                                readonly
                            ></v-autocomplete>
                        </v-col>
                        <v-col cols="6" class="form-col">
                            <v-autocomplete
                                label="Category"
                                variant="outlined"
                                density="compact"
                                hide-details
                                readonly
                            ></v-autocomplete>
                        </v-col>
                    </v-row>
                    <v-divider class="mt-4"></v-divider>
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
                        <template v-slot:item.regular_price_markup="{ item }">
                            <input placeholder="0.00" />
                        </template>
                        <template v-slot:item.special_area_markup="{ item }">
                            <input placeholder="0.00" />
                        </template>
                        <template #bottom></template>
                    </v-data-table-server>
                </v-card-text>
                <v-divider></v-divider>
                <v-card-actions>
                    <v-btn color="blue-darken-1 border border-info" @click="closeDialog"> Close </v-btn>
                    <v-spacer></v-spacer>
                    <v-btn class="bg-primary text-white" type="submit">Continue</v-btn>
                </v-card-actions>
            </v-card>
        </form>
    </v-dialog>
</template>

<script setup>
const props = defineProps({
    open_price_update_dialog: {
        type: Boolean,
        default: () => false,
        required: true,
    },
});

const payload = ref({});

const { selectedRowDetails } = storeToRefs(useSubcomponentSelectedRowDetailsStore()); 

const emits = defineEmits(['close-dialog', 'handle-submit']);
const headers = [
    { title: 'Description', key: 'description', align: 'start' },
    { title: 'Regular Price % Markup', key: 'regular_price_markup', align: 'start' },
    { title: 'Special Area % Markup', key: 'special_area_markup', align: 'start' },
];
const data = ref({
    title: "List of Item Composition",
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
    loadItems(page,itemsPerPage,sortBy) 
    // null
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

const onSubmit = () => {
    emits('handle-submit');
    emits('close-dialog');
}

const closeDialog = () => {
    emits('close-dialog');
}
</script>

<style>
.form-col {
    margin-top: -16px !important;
}
</style>