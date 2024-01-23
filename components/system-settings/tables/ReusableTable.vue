<template>
    <v-card rounded="lg" elevation="3">
        <v-tabs v-model="tab">
            <v-tab
                v-if="showTabs"
                v-for="tabItem in tabs"
                :key="tabItem.value"
                :value="tabItem.value"
                @click="handleTabClick(tabItem.value)"
            >
                {{ tabItem.label }}
            </v-tab>
        </v-tabs>
        <v-divider></v-divider>
        <v-toolbar density="compact" color="#FFF">
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

        <v-data-table-server
            :fixed-header="true"
            density="compact"
            height="60vh"
            class="animated animatedFadeInUp fadeInUp"
            v-model:items-per-page="itemsPerPage"
            :search="search"
            :headers="columns"
            :items-length="totalItems"
            :items="serverItems"
            :loading="loading"
            v-bind="showSelect ? { 'show-select': true } : {}"
            item-value="name"
        />
    </v-card>
</template>

<script setup>
import { onMounted, defineProps, defineEmits } from "vue";
import "../../../styes/animation.css";

const emits = defineEmits();

const props = defineProps({
    itemsPerPage: {
        type: Number,
        default: 5,
    },
    /*
    SIR AKOA USA GI COMMENT KAY MO ERROR NI
    */
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

onMounted(() => {
    // Additional initialization logic, if needed
});
</script>

<style scoped></style>
