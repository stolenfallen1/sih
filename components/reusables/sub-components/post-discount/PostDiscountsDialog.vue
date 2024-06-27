<template>
    <v-dialog :model-value="show" rounded="lg" scrollable @update:model-value="closeDialog" max-width="750px">
        <v-card rounded="lg">
            <v-toolbar density="compact" color="#107bac" hide-details>
                <v-toolbar-title>Post Discounts {{ selectedRowDetails.id }}</v-toolbar-title>
                <v-btn color="white" @click="closeDialog">
                    <v-icon>mdi-close</v-icon>
                </v-btn>
            </v-toolbar>
            <v-divider></v-divider>
            <v-card-text>
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
                        v-for="(head, index) of headers"
                        v-slot:[`item.${head.value}`]="props"
                    >
                        <td class="test" :props="props" :key="index">
                            <slot :name="head.value" :item="props.item">
                                {{ props.item[head.value] || "..." }}
                            </slot>
                        </td>
                    </template>
                    <template #bottom></template>
                </v-data-table-server>
            </v-card-text>
            <v-divider></v-divider>
            <v-card-actions>
                <v-btn color="blue-darken-1 border border-info" @click="closeDialog"> Close </v-btn>
                <v-spacer></v-spacer>
                <v-btn class="bg-primary text-white" @click.prevent="openItemizedDiscount">Add</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
    <ItemizedDiscountApplication :open_itemized_discount_application="open_itemized_discount_application" @close-dialog="closeItemizedDiscount" />
</template>

<script setup>
import ItemizedDiscountApplication from "./sub-forms/ItemizedDiscountApplication.vue";

const props = defineProps({
    show: {
        type: Boolean,
        default: () => false,
        required: true,
    },
});

const open_itemized_discount_application = ref(false);

const { selectedRowDetails } = storeToRefs(useSubcomponentSelectedRowDetailsStore()); 

const headers = [
    { title: "Description", key: "description", align: "center" },
];

const payload = ref({});


const data = ref({
    title: "List of Bank",
    keyword: "",
    loading: false,
    filter: {},
    tab: 0,
    param_tab: 1,
});
const itemsPerPage = ref(10);
const totalItems = ref(0);
const serverItems = ref([]);
const initialize = ({ page, itemsPerPage, sortBy }) => {
    // loadItems(page, itemsPerPage, sortBy);
    null
};

const loadItems = async (page = null, itemsPerPage = null, sortBy = null) => {
    data.value.loading = true;
    let pageno = page || 1;
    let itemPerpageno = itemsPerPage || 10;
    let params =
        "page=" + pageno + "&per_page=" + itemPerpageno + "&keyword=" + data.value.keyword;
    const response = await useMethod("get", "banks?", "", params);
    if (response) {
        serverItems.value = response.data;
        totalItems.value = response.total;
        data.value.loading = false;
    }
};
const emits = defineEmits(['close-dialog'])

const openItemizedDiscount = () => {
    open_itemized_discount_application.value = true;
}
const closeItemizedDiscount = () => {
    open_itemized_discount_application.value = false;
}

const closeDialog = () => {
    emits('close-dialog');
}
</script>

<style scoped>
</style>