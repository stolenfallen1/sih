<template>
    <v-dialog :model-value="show" rounded="lg" scrollable @update:model-value="closeDialog" max-width="850px">
        <form @submit.prevent="onSubmit">
            <v-card rounded="lg">
                <v-toolbar density="compact" color="#6984ff" hide-details>
                    <v-toolbar-title>List of Radiology Examination Readers {{ selectedRowDetails.id }}</v-toolbar-title>
                    <v-btn color="white" @click="closeDialog">
                        <v-icon>mdi-close</v-icon>
                    </v-btn>
                </v-toolbar>
                <v-divider></v-divider>
                <v-card-text>
                    <v-data-table-server 
                        class="animated animatedFadeInUp fadeInUp cursor-pointer"
                        v-model:items-per-page="itemsPerPage"
                        :headers="headers"
                        :items="serverItems"
                        :items-length="totalItems"
                        :loading="data.loading"
                        item-value="id"
                        :hover="true"
                        @update:options="initialize"
                        @update:model-value="selectedRow"
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
                        <template v-slot:item.actions="{ item }">
                            <v-icon color="red" @click="onDelete(item)">mdi-trash-can</v-icon>
                        </template>
                        <template #bottom></template>
                    </v-data-table-server>
                    <v-card v-if="open_selected_row_textarea === true">
                        <v-toolbar density="compact" hide-details>
                            <v-toolbar-title class="toolbar-title">Default Examination Result Content</v-toolbar-title>
                        </v-toolbar>
                        <v-card-text>
                            <v-row>
                                <v-col cols="12">
                                    <v-textarea
                                        label="Please Enter Default Examination Result Content here"
                                        variant="outlined"
                                        density="compact"
                                        hide-details
                                    ></v-textarea>
                                </v-col>
                            </v-row>
                        </v-card-text>
                    </v-card>
                </v-card-text>
                <v-divider></v-divider>
                <v-card-actions>
                    <v-btn color="blue-darken-1 border border-info" @click="closeDialog"> Close </v-btn>
                    <v-spacer></v-spacer>
                    <v-btn class="bg-info text-white" @click="openConsultantList">Add</v-btn>
                    <v-btn class="bg-primary text-white" type="submit">Save</v-btn>
                </v-card-actions>
            </v-card>
        </form>
    </v-dialog>
    <MFConsultantSelectionList :open_consultant_list="open_consultant_list" @close-dialog="closeConsultantList" />
    <deleteConfirmation :show="confirmation" @confirm="confirm" @close="closeconfirmation" />
</template>

<script setup>
import MFConsultantSelectionList from "./sub-forms/MFConsultantSelectionList.vue";

const props = defineProps({
    show: {
        type: Boolean,
        default: () => false,
        required: true,
    },
});

const { selectedRowDetails } = storeToRefs(useSubcomponentSelectedRowDetailsStore()); 

const confirmation = ref(false);
const emits = defineEmits(['close-dialog'])
const payload = ref({});
const open_selected_row_textarea = ref(false);
const open_consultant_list = ref(false);
const headers = [
    { title: 'Consultant .Reader Name', key: 'consultant_reader_name', align: 'start' },
    { title: 'RF Charge Type', key: 'description', align: 'start' },
    { title: 'RF Base', key: 'rf_base', align: 'start' },
    { title: '', key: 'actions', align: 'start' },
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

const selectedRow = () => {
    open_selected_row_textarea.value = !open_selected_row_textarea.value;
}

const openConsultantList = () => {
    open_consultant_list.value = true;
}
const closeConsultantList = () => {
    open_consultant_list.value = false;
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
const onSubmit = () => {
    alert("Saved");
    emits('close-dialog');
}
const closeDialog = () => {
    emits('close-dialog')
}
</script>

<style scoped>
.toolbar-title {
    font-size: 16px; 
    font-style: italic; 
    text-align: center;
}
</style>