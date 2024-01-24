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
                density="compact"
                variant="outlined"
            >
            </v-text-field>
        </v-toolbar>
        <v-divider></v-divider>
        <v-data-table-server
            :fixed-header="true"
            density="compact"
            height="60vh"
            class="animated animatedFadeInUp fadeInUp"
            :search="search"
            :headers="columns"
            :items-length="totalItems"
            :items="serverItems"
            :items-per-page="options.itemsPerPage"
            :loading="loading"
            @update:options="refetch"
            v-bind="showSelect ? { 'show-select': true } : {}"
            item-value="name"
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
        </v-data-table-server>
    </v-card>
</template>

<script setup>
import "../../../styes/animation.css";

const emits = defineEmits(['fetchPage', 'tab-change']);
const options = reactive({
    itemsPerPage: 10,
    page:1
})


function refetch(options){
    emits('fetchPage', options)
}

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

const { itemsPerPage, search, tab } = toRefs(props);

const handleActionClick = (action) => {
    // Handle action button clicks (search, refresh)
    // Emit events or perform actions as needed
    emits(`action-${action}`);
};

const handleTabClick = (tabValue) => {
    emits("tab-change", tabValue);
};

// options.itemsPerPage.value = props

onMounted(() => {
    // Additional initialization logic, if needed
});
</script>

<style scoped></style>
