<template>
    <v-dialog :model-value="open_select_doctor" rounded="lg" @update:model-value="closeDialog"  scrollable max-width="800px">
            <v-card rounded="lg">
                <v-toolbar density="compact" color="#107bac" hide-details>
                    <v-toolbar-title>Select Doctor</v-toolbar-title>
                    <v-spacer></v-spacer>
                    <v-btn color="white" @click="closeDialog">
                        <v-icon>mdi-close</v-icon>
                    </v-btn>
                </v-toolbar>
                <v-divider></v-divider>
                <v-card-text>
             
                    <v-text-field
                        label="Search here..."
                        density="compact"
                        variant="outlined"
                        prepend-inner-icon="mdi-magnify"
                        v-model="data.keyword"
                        @keyup.enter="search"
                    ></v-text-field> 
      
                    <v-divider></v-divider>
                    <v-data-table-server 
                        class="animated animatedFadeInUp fadeInUp"
                        v-model="selected_item"
                        v-model:items-per-page="itemsPerPage"
                        :headers="headers"
                        :items="serverItems"
                        :items-length="totalItems"
                        :loading="data.loading"
                        item-value="id"
                        :hover="true"
                        @update:options="initialize"
                        @update:model-value="handleSelectedRow"
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
                <v-card-actions>
                    <v-btn color="blue-darken-1 border border-info" @click="closeDialog"> Close </v-btn>
                    <v-spacer></v-spacer>
                    <v-btn class="bg-primary text-white" @click="handleSubmit">Select</v-btn>
                </v-card-actions>
            </v-card>
    </v-dialog>
</template>

<script setup>
    const props = defineProps({
        open_select_doctor: {
            type: Boolean,
            default: () => false,
            required: true,
        },
    })

    const emits = defineEmits(['close-dialog', 'handle-select']);
    const selected_item = ref([]);
    const isloading = ref(false);

    const headers = [
        { title: 'Code', key: 'code', align: 'start' },
        { title: 'Full Name', key: 'fullname', align: 'start',width:"70%" }
    ];

    const data = ref({
        title: "List of Doctors",
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

    const loadItems = async (page = 1, itemsPerPage = 10, sortBy = null) => {

        try {
            data.value.loading = true;
            let pageno = page || 1;
            let itemPerpageno = itemsPerPage || 50;
            let params = "page=" +pageno + "&per_page=" + itemPerpageno + "&keyword=" + data.value.keyword;
            const response = await useMethod("get", "doctors-list?", "",  params);

            if (response) {
                serverItems.value = response.data.map(item => ({
                    id: item.id,
                    code: item.doctor_code,
                    fullname: `${item.lastname}, ${item.firstname} ${item.middlename || ''}`.trim()
                }));
                totalItems.value = response.total;
                data.value.loading = false;
            } else {
                console.error('Error: Response data is undefined or not an array');
                serverItems.value = [];
                totalItems.value = 0;
                data.value.loading = false;
            }
        } catch (error) {
            console.error('Error loading doctors:', error);
            serverItems.value = [];
            totalItems.value = 0;
            data.value.loading = false;
        }
    }


    const search = ()=>{
        loadItems();
    }

    const handleSelectedRow = (selectedRows) => {
        console.log('Selected Rows : ', selectedRows)
        const selectedItems = selectedRows.map(rowId => serverItems.value.find(item => item.id === rowId));
        const validSelectedItems = selectedItems.filter(item => item !== undefined);
        emits('handle-select', validSelectedItems);
    };


const handleSubmit = () => {
    handleSelectedRow(selected_item.value);
    emits('close-dialog');
}

const closeDialog = () => {
    emits('close-dialog');
}

</script>

<style scoped>
</style>