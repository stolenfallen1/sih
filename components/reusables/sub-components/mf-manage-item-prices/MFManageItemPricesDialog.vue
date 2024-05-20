<template>
    <v-dialog :model-value="show" rounded="lg" scrollable @update:model-value="closeDialog" max-width="1120px">
        <form @submit.prevent="onSubmit">
            <v-card rounded="lg">
                <v-toolbar density="compact" color="#6984ff" hide-details>
                    <v-toolbar-title>Manage Item Prices {{ selectedRowDetails.id }}</v-toolbar-title>
                    <v-btn color="white" @click="closeDialog">
                        <v-icon>mdi-close</v-icon>
                    </v-btn>
                </v-toolbar>
                <v-divider></v-divider>
                <v-card-text>
                    <v-row>
                        <v-col cols="3">
                            <p>Item ID: {{ selectedRowDetails.id }}</p>
                        </v-col>
                        <v-col cols="9">
                            <p>Item Description: {{ 'TEST test TEST test' }}</p>
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col cols="5">
                            <v-card>
                                <v-toolbar density="compact" hide-details>
                                    <v-toolbar-title class="toolbar-title">Filter Preferences</v-toolbar-title>
                                </v-toolbar>
                                <v-card-text>
                                    <v-row>
                                        <v-col cols="12">
                                            <v-autocomplete
                                                label="Price Group"
                                                v-model="payload.price_group"
                                                variant="outlined"
                                                density="compact"
                                                hide-details
                                            ></v-autocomplete>
                                        </v-col>
                                        <v-col cols="12" class="form-col">
                                            <v-autocomplete
                                                label="Price Scheme"
                                                v-model="payload.price_scheme"
                                                variant="outlined"
                                                density="compact"
                                                hide-details
                                            ></v-autocomplete>
                                        </v-col>
                                    </v-row>
                                </v-card-text>
                            </v-card>
                        </v-col>
                        <v-col cols="7">
                            <v-card>
                                <v-toolbar density="compact" hide-details>
                                    <v-toolbar-title class="toolbar-title">Apply Selling Price to the Selected Pricing Scheme</v-toolbar-title>
                                </v-toolbar>
                                <v-card-text>
                                    <v-row>
                                        <v-col cols="4">
                                            <v-checkbox v-model="payload.isRegularPrice" label="Regular Price" density="compact" hide-details></v-checkbox>
                                        </v-col>
                                        <v-col cols="8">
                                            <v-text-field 
                                                v-model="payload.regular_price" 
                                                variant="outlined" 
                                                density="compact" 
                                                :disabled="!payload.isRegularPrice" 
                                                :placeholder="!payload.isRegularPrice ? 'N/A' : 'Enter Regular Price'"
                                                hide-details
                                            ></v-text-field>
                                        </v-col>
                                        <v-col cols="4" class="form-col">
                                            <v-checkbox v-model="payload.isSpecialAreaPrice" label="Special Area Price" density="compact" hide-details></v-checkbox>
                                        </v-col>
                                        <v-col cols="5" class="form-col">
                                            <v-text-field 
                                                v-model="payload.special_area_price" 
                                                variant="outlined" 
                                                density="compact" 
                                                :disabled="!payload.isSpecialAreaPrice" 
                                                :placeholder="!payload.isSpecialAreaPrice ? 'N/A' : 'Enter Special Area Price'"
                                                hide-details
                                            ></v-text-field>
                                        </v-col>
                                        <v-col cols="3" class="form-col">
                                            <v-btn 
                                                :disabled="!payload.isRegularPrice && !payload.isSpecialAreaPrice" 
                                            >Apply</v-btn>
                                        </v-col>
                                    </v-row>
                                </v-card-text>
                            </v-card>
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
                        <template v-slot:item.regular_price="{ item }">
                            <input placeholder="0.00" />
                        </template>
                        <template v-slot:item.special_area_price="{ item }">
                            <input placeholder="0.00" />
                        </template>
                        <template #bottom></template>
                    </v-data-table-server>
                </v-card-text>
                <v-divider></v-divider>
                <v-card-actions>
                    <v-btn color="blue-darken-1 border border-info" @click="closeDialog"> Close </v-btn>
                    <v-spacer></v-spacer>
                    <v-btn class="bg-primary text-white" type="submit">Save</v-btn>
                </v-card-actions>
            </v-card>
        </form>
    </v-dialog>
</template>

<script setup>
const props = defineProps({
    show: {
        type: Boolean,
        default: () => false,
        required: true,
    },
});

const payload = ref({});

const { selectedRowDetails } = storeToRefs(useSubcomponentSelectedRowDetailsStore()); 

const emits = defineEmits(['close-dialog'])
const headers = [
    { title: 'Department', key: 'department', align: 'center' },
    { title: 'Regular Price', key: 'regular_price', align: 'start' },
    { title: 'Special Area Price', key: 'special_area_price', align: 'start' },
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
    alert("Saved");
    emits('close-dialog');
}
const closeDialog = () => {
    emits('close-dialog')
}
</script>

<style>
.toolbar-title {
    font-size: 16px; 
    font-style: italic; 
    text-align: center;
}
.form-col {
    margin-top: -16px !important;
}
</style>