<template>
    <v-dialog :model-value="show" rounded="lg" @update:model-value="closeDialog"  scrollable max-width="750px">
        <v-card rounded="lg">
            <v-toolbar density="compact" color="#107bac" hide-details>
                <v-toolbar-title>Generic Names</v-toolbar-title>
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
                    show-select
                    select-strategy="single"
                    fixed-header
                    density="compact" 
                    height="60vh"
                    >
                    <template
                        v-for="(head, index) of headers"  v-slot:[`item.${head.value}`]="props" >
                        <td class="test" :props="props" :key="index">
                        <slot :name="head.value" :item="props.item">
                            {{ props.item[head.value] || "..." }}
                        </slot>
                        </td>
                    </template>
                    <template v-slot:item.isActive="{ item }">
                        {{ item.isActive == 1 ? "Active" : "In-active" }}
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
                <v-btn class="bg-primary text-white" type="submit" @click="openGenericNamesForm">Add</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
    <generic-names-form :payload="payload" :open_generic_names_form="open_generic_names_form" @close-dialog="closeGenericNamesForm" @handle-submit="onSubmit" /> 
    <deleteConfirmation :show="confirmation" @confirm="confirm" @close="closeconfirmation" />
</template>

<script setup>
import GenericNamesForm from './sub-forms/GenericNamesForm.vue';

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
const open_generic_names_form = ref(false)
const headers = [
    {
        title: 'code',
        align: 'start',
        sortable: false,
        key: 'id',
    },
    { title: 'Description', key: 'generic_name', align: 'start',width:"60%" },
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
    let params = "page=" +pageno + "&per_page=" + itemPerpageno + "&keyword=" + data.value.keyword;
    const response = await useMethod("get","get-generic-name?","",params);
    if(response){
        serverItems.value = response.data;
        totalItems.value = response.total;
        data.value.loading = false;
    }
}
const search = ()=>{
    loadItems();
}

const openGenericNamesForm = () => {
    payload.value = Object.assign({});
    open_generic_names_form.value = true;
}

const closeGenericNamesForm = () => {
    payload.value = Object.assign({});
    open_generic_names_form.value = false;
}

const onEdit = (item) => {
    openGenericNamesForm();
    payload.value = Object.assign({});
    payload.value = Object.assign({},item);
    payload.value.isActive = item.isActive == 1 ? true:false;
}



const onSubmit = async (payload) => {
    let response;
    isloading.value = true;
    if(payload.id){
        response = await useMethod("put","update-generic-name",payload,"",payload.id);
    }else{
        response = await useMethod("post","create-generic-name",payload);
    }
    if(response){
        useSnackbar(true,"green",response.msg);
        loadItems();
        closeGenericNamesForm();
        payload.value = Object.assign({});
        isloading.value = false;
    }
}
const confirm = async () => {
    if(payload.value.id){
        let response = await useMethod("delete","delete-generic-name",payload.value,"",payload.value.id);
        if(response){
            confirmation.value = false;
            useSnackbar(true,"green",response.msg);
            loadItems();
            closeGenericNamesForm();
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



</script>

<style scoped>
</style>