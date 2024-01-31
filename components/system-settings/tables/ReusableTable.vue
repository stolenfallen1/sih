<template>
    <v-card rounded="lg" elevation="3">
        <v-tabs v-model="tab"  v-if="showTabs">
            <v-tab
                v-for="tabItem in tabs"
                :key="tabItem.value"
                :value="tabItem.value"
                @click="handleTabClick(tabItem.value)"
            >
                {{ tabItem.label }}
            </v-tab>
        </v-tabs>
        <v-divider  v-if="showTabs"></v-divider>
        <v-toolbar color="#FFF">
            <v-btn icon @click="handleActionClick('refresh')">
                <v-icon>mdi-refresh</v-icon>
            </v-btn>
            <span>|</span>
            <v-toolbar-title>{{ tableTitle }}</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-text-field
                class="mt-5 mr-2"
                label="Search"
                rounded
                v-model="keyword"
                @keyup.enter="handleSearch"
                density="compact"
                variant="outlined"
                prepend-inner-icon="mdi-magnify"
            >
            </v-text-field>
        </v-toolbar>
        <v-divider></v-divider>
        <v-data-table-server
            :fixed-header="true"
            v-model="selectedRows"
            density="compact"
            height="60vh"
            class="animated animatedFadeInUp fadeInUp"
            :headers="columns"
            :items-length="totalItems"
            :items="serverItems"
            :items-per-page="options.itemsPerPage"
            :loading="loading"
            @update:options="refetch"
            :show-select="showSelect ?  true : false"
            select-strategy="single"
            @click:row="handleSelectedRow"
            item-value="id"
        >
            <template
                v-for="column in columns"
                v-slot:[`item.${column.key}`]="props"
            >
                <!-- Dynamically use slots based on column key -->
                <slot :name="`column-${column.key}`" :item="props.item">
                    {{ props.item[column.key] || "..." }}
                </slot>
            </template>
            <template v-slot:loading>
                <v-skeleton-loader type="table-row@10"></v-skeleton-loader>
            </template>
        </v-data-table-server>
    </v-card>
</template>

<script setup>
import "../../../styes/animation.css";

const emits = defineEmits(['fetchPage', 'tab-change','selected-row','action-search']);
const options = reactive({
    itemsPerPage: 10,
    page:1
})
const props = defineProps({
    serverItems: {
        type: Array,
        default: () => [],
    },
    columns: {
        type: Array,
        required: true,
    },
    totalItems: {
        type: Number,
        default: 0,
    },
    loading: {
        type: Boolean,
        default: false,
    },
    tabs: {
        type: Array,
        default: () => [],
    },
    tableTitle: {
        type: String,
        default: "",
    },
    showSelect: {
        type: Boolean,
        default: true,
    },
    showTabs: {
        type: Boolean,
        default: true,
    },
});

const tab = ref("");
const selectedRows = ref([]);
const keyword = ref('');

const refetch =(options) =>{
    selectedRows.value = [];
    options.keyword = keyword.value;
    emits('fetchPage', options)
}


const handleSelectedRow = (event,selectedRow)=>{
    const index = selectedRows.value.indexOf(selectedRow?.item.id);
    selectedRows.value = [];
    let item = selectedRow.item;
    if (index === -1) {
      selectedRows.value.push(selectedRow?.item.id);
    } else {
      item = '';
      selectedRows.value.splice(index, 1);
    }
    emits('selected-row', item)
}

const handleActionClick = (action) => {
    // Handle action button clicks (search, refresh)
    // Emit events or perform actions as needed
    emits(`action-${action}`);
};

const handleTabClick = (tabValue) => {
    emits("tab-change", tabValue);
};

const search = () => {
    emits("action-search", '');
};

const handleSearch = () => {
    emits("action-search", keyword.value);
}
// options.itemsPerPage.value = props

onMounted(() => {
    // Additional initialization logic, if needed
});
</script>

<style scoped></style>
