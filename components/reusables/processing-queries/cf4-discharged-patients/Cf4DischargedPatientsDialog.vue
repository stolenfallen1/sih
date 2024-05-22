<template>
    <v-dialog :model-value="show" rounded="lg" scrollable @update:model-value="closeDialog" max-width="1120px">
        <v-card rounded="lg">
            <v-toolbar density="compact" color="#6984ff" hide-details>
                <v-toolbar-title>
                    {{ form_type === 'outpatient' ? 'Outpatient Discharge List' : (form_type === 'emergency' ? 'Emergency Discharge List' : 'Inpatient Discharge List') }} {{ selectedRowDetails.id }}
                </v-toolbar-title> 
                <v-btn color="white" @click="closeDialog">
                    <v-icon>mdi-close</v-icon>
                </v-btn>
            </v-toolbar>
            <v-divider></v-divider>
            <v-card-text>
                <v-row>
                    <v-col cols="4">
                        <v-autocomplete
                            label="Nurse Station"
                            variant="outlined"
                            density="compact"
                            hide-details
                        ></v-autocomplete>
                    </v-col>
                    <v-col cols="4">
                        <v-text-field
                            label="MGH Date Range To"
                            type="date"
                            variant="outlined"
                            density="compact"
                            hide-details
                        ></v-text-field>
                    </v-col>
                    <v-col cols="4">
                        <v-text-field
                            label="MGH Date Range From"
                            type="date"
                            variant="outlined"
                            density="compact"
                            hide-details
                        ></v-text-field>
                    </v-col>
                    <v-col cols="12" class="form-col">
                        <v-text-field
                            label="Search here... "
                            density="compact"
                            variant="outlined"
                            prepend-inner-icon="mdi-magnify"
                            v-model="data.keyword"
                            @keyup.enter="search"
                        ></v-text-field>
                    </v-col>
                </v-row>
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
                    select-strategy="single"
                    fixed-header
                    density="compact"
                    height="40vh"
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
                <v-btn class="bg-primary text-white" @click="openClaimForm4">Select</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
    <ClaimForm4ProcessingDialog :show="open_claim_form_4" @close-dialog="closeClaimForm4" />
</template>

<script setup>
import ClaimForm4ProcessingDialog from '../../sub-components/clam-form4processing/ClaimForm4ProcessingDialog.vue';

const props = defineProps({
    show: {
        type: Boolean,
        default: () => false,
        required: true,
    },
    form_type: {
        type: String,
        default: () => '',
    }
});

const { selectedRowDetails } = storeToRefs(useSubcomponentSelectedRowDetailsStore()); 

const payload = ref({});

const headers = [
    { title: "Patient Name",  align: "start", sortable: false, key: "patient_name" },
    { title: "Registry No",  align: "start", sortable: false, key: "registry_no" },
    { title: "Registry Date",  align: "start", sortable: false, key: "registry_date" },
    { title: "Discharge Date",  align: "start", sortable: false, key: "discharge_date" },
    { title: "Birth Date",  align: "start", sortable: false, key: "birth_date" },
    { title: "Sex",  align: "start", sortable: false, key: "sex" },
    { title: "CF4 Status",  align: "start", sortable: false, key: "cf4_status" },
];
const data = ref({
    title: "List of payment-methods",
    keyword: "",
    loading: false,
    filter: {},
    tab: 0,
    param_tab: 1,
});

const itemsPerPage = ref(10);
const totalItems = ref(0);
const serverItems = ref([]);
const open_claim_form_4 = ref(false);
const initialize = ({ page, itemsPerPage, sortBy }) => {
    loadItems(page, itemsPerPage, sortBy);
};
const loadItems = async (page = null, itemsPerPage = null, sortBy = null) => {
    data.value.loading = true;
    let pageno = page || 1;
    let itemPerpageno = itemsPerPage || 10;
    let params =
        "page=" + pageno + "&per_page=" + itemPerpageno + "&keyword=" + data.value.keyword;
    const response = await useMethod("get", "payment-methods?", "", params);
    if (response) {
        serverItems.value = response.data;
        totalItems.value = response.total;
        data.value.loading = false;
    }
};

const search = () => {
    loadItems();
}

const emits = defineEmits(['close-dialog'])

const openClaimForm4 = () => {
    open_claim_form_4.value = true;
}
const closeClaimForm4 = () => {
    open_claim_form_4.value = false;
}

const onSubmit = () => {
    alert("Test!");
    emits('close-dialog');
};


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
.form-col {
    margin-top: -16px !important;
}
</style>