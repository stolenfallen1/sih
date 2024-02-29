<template>
<v-dialog :model-value="central_form_dialog" persistent hide-overlay width="700" scrollable>
    <form @submit.prevent="handleSearch">
    <v-card>
        <v-toolbar density="compact" color="#FFF">
            <v-toolbar-title>Central Database Lookup Window</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-btn color="black" @click="closeDialog">
            <v-icon>mdi-close</v-icon>
            </v-btn>
        </v-toolbar>
        <v-divider></v-divider>
        <v-card-text>
        <v-container>
            <v-row>
                <!-- <v-col cols="3" class="pa-1">
                    <v-text-field
                        variant="outlined"
                        label="Item Code"
                        hide-details
                        v-model="search_payload.itemcode"
                        density="compact"
                    ></v-text-field>
                </v-col> -->
                <v-col cols="10" class="pa-1">
                    <v-text-field
                        variant="outlined"
                        label="Item Name / Description"
                        v-model="search_payload.itemname"
                        required
                        hide-details
                        density="compact"
                    ></v-text-field>
                </v-col>
                <v-col cols="2" class="pa-1">
                        <v-btn class="bg-info text-white " type="submit" 
                        ><v-icon>mdi-magnify</v-icon>Search
                    </v-btn>
                </v-col>
                
                <v-divider></v-divider>
                <v-col cols="12">
                    <v-data-table-server
                        :fixed-header="true"
                        :items-length="40"
                        density="compact"
                        height="40vh"
                        :items="search_results"
                        :show-select="true"
                        class="animated animatedFadeInUp fadeInUp"
                        :headers="headers"
                        :loading="search_payload.isloading"
                        v-model="selectedRows"
                        @click:row="handleSelectedRow"
                        @update:modelValue="handleSelectedInput"
                        select-strategy="single"
                        item-value="id"
                    >
                        <template
                            v-for="(head, index) of headers"
                            v-slot:[`item.${head.value}`]="props"
                        >
                            <td class="test" :props="`props`" :key="head.id">
                            <slot :name="head.value" :item="props.item">
                                {{ props.item[head.value] || "..." }}
                            </slot>
                            </td>
                        </template>

                        <template #bottom></template>
                    </v-data-table-server>
                </v-col>
            </v-row>
        </v-container>
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions>
        <v-btn color="blue-darken-1" @click="closeDialog"> Close </v-btn>
        <v-spacer></v-spacer>
        <!-- This button should be disabled when there is no data displayed after search -->
        <v-btn
            class="bg-primary text-white"
            type="submit"
            :disabled="search_results.length == 0 ? true : false"
            @click="handleClickForOpeningForm('active')"
            >Select Active Record</v-btn
        >
        <v-btn
            class="bg-primary text-white"
            type="submit"
            :disabled="(search_results.length == 0 && isAllowAddNew) ? false : true"
            @click="handleClickForOpeningForm('new')"
            >Add New</v-btn
        >
        </v-card-actions>
    </v-card>
    </form>
</v-dialog>
</template>

<script setup>
const props = defineProps({
    search_results: {
        type: Array,
        default: () => [],
    },
    central_form_dialog: {
        type: Boolean,
        default: () => false,
    },
    search_payload: {
        type: Object,
        default: () => ({}),
    },
});
const selectedRows = ref([]);
const isAllowAddNew = ref(false);
const headers = ref([
{
    title: "Item Code",
    align: "start",
    sortable: false,
    width:"18%",
    key: "id",
},
{
    title: "Description",
    align: "start",
    sortable: false,
    key: "item_name",
},
]);

const handleSearch = () => {
    isAllowAddNew.value = true;
    emits("search", props.search_payload);
}

const handleSelectedInput = (selected) => {
    let seletedrow = props.search_results.find(item=>item.id === selected[0]);
    selectedRows.value = [];
    const index = selectedRows.value.indexOf(selected[0]);
    selectedRows.value = [];
    let item = seletedrow;
    if (index === -1) {
        selectedRows.value.push(selected[0]);
    } else {
        item = "";
        selectedRows.value.splice(index, 1);
    }
    emits("selected-row", item);
};

const handleSelectedRow = (event, selectedRow) => {
    const index = selectedRows.value.indexOf(selectedRow?.item.id);
    selectedRows.value = [];
    let item = selectedRow.item;
    if (index === -1) {
        selectedRows.value.push(selectedRow?.item.id);
    } else {
        item = "";
        selectedRows.value.splice(index, 1);
    }
    emits("selected-row", item);
};

const emits = defineEmits();

const closeDialog = () => {
    emits("close-dialog");
};

const handleClickForOpeningForm = (type) => {
    emits("open-form", type);
};
</script>

<style scoped></style>
