<template>
    <v-dialog :model-value="show" rounded="lg" scrollable @update:model-value="closeDialog" max-width="750px">
        <v-card rounded="lg">
            <v-toolbar density="compact" color="#107bac" hide-details>
                <v-toolbar-title>Account Adjustments {{ selectedRowDetails.id }}</v-toolbar-title>
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
            <v-card-actions>
                <v-btn color="blue-darken-1 border border-info" @click="closeDialog"> Close </v-btn>
                <v-spacer></v-spacer>
                <v-btn class="bg-primary text-white" @click.prevent="openAccountAdjustment">Add</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>

    <v-dialog v-model="open_account_adjustment" scrollable @update:model-value="closeAccountAdjustment" max-width="600px">
        <form @submit.prevent="onSubmit">
            <v-card>
                <v-toolbar density="compact" color="#107bac" hide-details>
                    <v-toolbar-title>Post Adjustment Details</v-toolbar-title>
                    <v-btn color="white" @click="closeAccountAdjustment">
                        <v-icon>mdi-close</v-icon>
                    </v-btn>
                </v-toolbar>
                <v-card-text>
                    <v-card elevation="4">
                        <v-card-text>
                            <p>
                                <span style="font-weight: bold; font-style: italic">NOTE: </span>Please make sure to specify the correct adjustment information specifically the amount and entry type in order
                                to avoid erroneous account ledger as this process will directly create entries on both Journal and Subsidiary Ledger.
                            </p>
                        </v-card-text>
                    </v-card>
                    <v-row class="mt-2">
                        <v-col cols="6">
                            <v-text-field 
                                type="date"
                                label="Reference Date"
                                v-model="payload.refencedate" 
                                variant="outlined" 
                                density="compact" 
                                hide-details 
                            ></v-text-field>
                        </v-col>
                        <v-col cols="6">
                            <v-autocomplete
                                item-title="department_name"
                                item-value="id"
                                label="Department"
                                v-model="payload.department_id"
                                hide-details
                                clearable
                                density="compact"
                                variant="outlined"
                            ></v-autocomplete>
                        </v-col>
                        <v-col cols="4">
                            <v-radio-group inline hide-details density="compact">
                                <v-radio label="Credit" value="one"></v-radio>
                                <v-radio label="Debit" value="two"></v-radio>
                            </v-radio-group>
                        </v-col>
                        <v-col cols="8">
                            <v-autocomplete
                                item-title="description_name"
                                item-value="id"
                                label="Description"
                                v-model="payload.description_id"
                                hide-details
                                clearable
                                density="compact"
                                variant="outlined"
                            ></v-autocomplete>
                        </v-col>
                        <v-col cols="7">
                            <v-text-field
                                type="number"
                                label="Amount" 
                                v-model="payload.amount"
                                variant="outlined" 
                                density="compact" 
                                hide-details 
                            ></v-text-field>
                        </v-col>
                        <v-col cols="5">
                            <v-checkbox label="Beginning balance" hide-details density="compact"></v-checkbox>
                        </v-col>
                        <v-col cols="12">
                            <v-textarea v-model="payload.remarks" label="Remarks" variant="outlined" density="compact" hide-details></v-textarea>
                        </v-col>
                    </v-row>
                </v-card-text>
                <v-divider></v-divider>
                <v-card-actions>
                    <v-btn color="blue-darken-1 border border-info" @click="closeAccountAdjustment"> Close </v-btn>
                    <v-spacer></v-spacer>
                    <v-btn class="bg-primary text-white" type="submit">Submit</v-btn>
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

const open_account_adjustment = ref(false);

const { selectedRowDetails } = storeToRefs(useSubcomponentSelectedRowDetailsStore()); 

const headers = [
    { title: "Reference Date", key: "reference_date", align: "start", width: "10%" },
    { title: "Document No.", key: "document_no", align: "start", width: "10%" },
    { title: "Description", key: "description", align: "start", width: "45%" },
    { title: "Amount", key: "amount", align: "start", width: "10%" },
    { title: "Department", key: "department", align: "start", width: "10%" },
    { title: "Remarks", key: "remarks", align: "start", width: "10%" },
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

const openAccountAdjustment = () => {
    open_account_adjustment.value = true;
}

const closeAccountAdjustment = () => {
    open_account_adjustment.value = false;
}

const onSubmit = () => {
    alert('Submit');
    open_account_adjustment.value = false;
}

const emits = defineEmits(['close-dialog'])

const closeDialog = () => {
    emits('close-dialog');
}
</script>

<style scoped>
.toolbar-title {
    font-size: 16px; 
    font-style: italic; 
    text-align: center;
}
</style>