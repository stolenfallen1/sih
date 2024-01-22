<!-- ReusableTable.vue -->
<template>
    <v-card rounded="lg">
        <v-tabs v-model="tab" bg-color="#117dad">
            <v-tab
                v-for="tabItem in tabs"
                :key="tabItem.value"
                :value="tabItem.value"
            >
                {{ tabItem.label }}
            </v-tab>
        </v-tabs>

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
            class="animated animatedFadeInUp fadeInUp"
            v-model:items-per-page="itemsPerPage"
            :search="search"
            :headers="columns"
            :items-length="totalItems"
            :items="serverItems"
            :loading="loading"
            show-select
            item-value="name"
            @update:options="loadItems"
        />
    </v-card>
</template>

<script>
import { ref, onMounted } from "vue";
import "../../../styes/animation.css";

export default {
    props: {
        itemsPerPage: {
            type: Number,
            default: 5,
        },
        columns: {
            type: Array,
            required: true,
        },
        serverItems: {
            type: Array,
            default: () => [],
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
            default: "Table Title Here",
        },
    },
    setup(props) {
        const itemsPerPage = ref(props.itemsPerPage);
        const search = ref("");
        const tab = ref(null);

        const handleActionClick = (action) => {
            // Handle action button clicks (search, refresh)
            // Emit events or perform actions as needed
            emit(`action-${action}`);
        };

        const loadItems = ({ page, itemsPerPage, sortBy }) => {
            // Handle data loading logic
        };

        onMounted(() => {
            // Additional initialization logic, if needed
        });

        return {
            itemsPerPage,
            search,
            tab,
            handleActionClick,
            loadItems,
        };
    },
};
</script>

<style scoped></style>
