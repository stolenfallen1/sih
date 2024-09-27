<template>
    <v-dialog :model-value="open_patient_info_and_charges" rounded="lg" @update:model-value="closeDialog" max-width="1120px">
        <v-card rounded="lg">
        <v-toolbar density="compact" color="#107bac" hide-details>
            <v-toolbar-title>Patient Lab Charges</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-btn color="white" @click="closeDialog">
            <v-icon>mdi-close</v-icon>
            </v-btn>
        </v-toolbar>
        <v-divider></v-divider>
        <v-card-text>
            <v-row>
                <v-col cols="6">
                    <v-row>
                        <v-col cols="12">
                            <v-text-field
                                v-model="payload.patient_name"
                                label="Patient Name"
                                variant="outlined"
                                density="compact"
                                hide-details
                                outlined
                                readonly
                            ></v-text-field>
                        </v-col>
                    </v-row>
                </v-col>
                <v-col cols="3">
                    <v-row>
                        <v-col cols="12">
                            <v-text-field
                                v-model="payload.patient_Id"
                                label="Patient ID"
                                variant="outlined"
                                density="compact"
                                hide-details
                                outlined
                                readonly
                            ></v-text-field>
                        </v-col>
                    </v-row>
                </v-col>
                <v-col cols="3">
                    <v-row>
                        <v-col cols="12">
                            <v-text-field
                                v-model="payload.case_No"
                                label="Case No"
                                variant="outlined"
                                density="compact"
                                hide-details
                                outlined
                                readonly
                            ></v-text-field>
                        </v-col>
                    </v-row>
                </v-col>
            </v-row>
            <v-row>
                <v-col cols="2">
                    <v-row>
                        <v-col cols="12">
                            <v-text-field
                                v-model="payload.patient_Age"
                                label="Age"
                                variant="outlined"
                                density="compact"
                                hide-details
                                outlined
                                readonly
                            ></v-text-field>
                        </v-col>
                    </v-row>
                </v-col>
                <v-col cols="2">
                    <v-row>
                        <v-col cols="12">
                            <v-text-field
                                v-model="payload.registry_Date"
                                label="Registry Date"
                                variant="outlined"
                                density="compact"
                                hide-details
                                outlined
                                readonly
                            ></v-text-field>
                        </v-col>
                    </v-row>
                </v-col>
                <v-col cols="5">
                    <v-row>
                        <v-col cols="12">
                            <v-text-field
                                v-model="payload.attending_Doctor_fullname"
                                label="Requesting Physician"
                                variant="outlined"
                                density="compact"
                                hide-details
                                outlined
                                readonly
                            ></v-text-field>
                        </v-col>
                    </v-row>
                </v-col>
                <v-col cols="3">
                    <v-row>
                        <v-col cols="12">
                            <v-text-field
                                v-model="payload.account"
                                label="Account"
                                variant="outlined"
                                density="compact"
                                hide-details
                                outlined
                                readonly
                            ></v-text-field>
                        </v-col>
                    </v-row>
                </v-col>
            </v-row>
            <v-divider style="margin-top: 20px;"></v-divider>
            <v-row>
                <v-col cols="12">
                    <v-data-table-server
                        class="animated animatedFadeInUp fadeInUp"
                        v-model:items-per-page="itemsPerPage"
                        :headers="filteredHeaders"
                        :items="serverItems"
                        :items-length="totalItems"
                        :loading="data.loading"
                        :hover="true"
                        item-value="uniqueKey"
                        @update:options="initialize"
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
                        <template v-slot:item.renderdate="{ item }">
                            {{ item.renderdate ? useDateMMDDYYY(item.renderdate) : "" }}
                        </template>
                        <template v-slot:item.cancelleddate="{ item }">
                            {{ item.cancelleddate ? useDateMMDDYYY(item.cancelleddate) : "" }}
                        </template>
                        <template v-slot:item.requestStatus="{ item }">
                            <v-chip color="orange" v-if="item.requestStatus == 'X'">Pending</v-chip>
                            <v-chip color="green" v-else>Done</v-chip>
                        </template>
                        <template v-slot:item.resultStatus="{ item }">
                            <v-chip color="orange" v-if="item.resultStatus == 'X'">Pending</v-chip>
                            <v-chip color="green" v-else>Done</v-chip>
                        </template>
                    </v-data-table-server>
                </v-col>
            </v-row>
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue-darken-1 border border-info" @click="closeDialog"> Close </v-btn>
        </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script setup>
const props = defineProps({
    open_patient_info_and_charges: {
        type: Boolean,
        default: () => false,
        required: true,
    },
    items: {
        type: Object,
        default: () => {},
        required: true,
    }
});

const { selectedRowDetails, isrefresh } = storeToRefs(useSubcomponentSelectedRowDetailsStore());
const payload = ref({});
const emits = defineEmits(["close-dialog"]);

const data = ref({
    title: "List of Patient Lab Charges",
    keyword: "",
    loading: false,
    filter: {},
    tab: 0,
    param_tab: 1,
});
const headers = [
    { title: "Ref No.", key: "refNum", align: "start", sortable: false },
    { title: "Profile ID", key: "itemcharged", align: "start", sortable: false },
    { title: "Exam ID", key: "itemid", align: "start", sortable: false },
    { title: "Exam", key: "exam", align: "start", sortable: false },
    { title: "Specimen", key: "specimen", align: "start", sortable: false },
    { title: "Quantity", key: "qty", align: "start", sortable: false },
    { title: "Rendered By", key: "renderby", align: "start", sortable: false },
    { title: "Rendered Date", key: "renderdate", align: "start", sortable: false },
    { title: "Cancelled By", key: "cancelledby", align: "start", sortable: false },
    { title: "Cancelled Date", key: "cancelleddate", align: "start", sortable: false },
    { title: "Request Status", key: "requestStatus", align: "start", sortable: false },
    { title: "Result Status", key: "resultStatus", align: "start", sortable: false },
];
const filteredHeaders = computed(() => {
    const itemsArray = Array.isArray(serverItems) ? serverItems : [];
    const hasCancelledDate = itemsArray.some(item => item.cancelleddate && item.cancelleddate !== null);
    const hasCancelledBy = itemsArray.some(item => item.cancelledby && item.cancelledby !== null);

    return headers.filter(header => {
        if (header.key === 'cancelleddate' && !hasCancelledDate) return false;
        if (header.key === 'cancelledby' && !hasCancelledBy) return false;
        return true;
    });
});

const itemsPerPage = ref(20);
const totalItems = ref(0);
const serverItems = ref([]);

const initialize = ({ page, itemsPerPage }) => {
    loadItems(page, itemsPerPage);
};

const loadItems = async (page = null, itemsPerPage = null) => {
    data.value.loading = true;
    let pageno = page || 1;
    let itemPerpageno = itemsPerPage || 20;
    let params = `page=${pageno}&per_page=${itemPerpageno}`;

    try {
        const response = await fetch(useApiUrl() + `/get-laboratory-exams?${params}`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + useToken() 
            },
            body: JSON.stringify({
                items: props.items,
            })
        });

        if (response.ok) {
            const responseData = await response.json();
            serverItems.value = responseData.data.map((item, index) => ({
                ...item,
                uniqueKey: `${item.patientid}-${item.caseno}-${index}`,
            }));
            totalItems.value = responseData.total;
        } else {
            useSnackbar(true, "green", "Error fetching data");
        }
    } catch (error) {
        useSnackbar(true, "green", "Error fetching data");
        console.error(error);
    } finally {
        data.value.loading = false;
    }
};

const closeDialog = () => {
    emits("close-dialog");
};

onUpdated(() => {
    if (selectedRowDetails.value != null) {
        payload.value.patient_name = 
        (selectedRowDetails.value?.patient_details?.lastname ? selectedRowDetails.value?.patient_details?.lastname : "N/A") + 
        ", " + (selectedRowDetails.value?.patient_details?.firstname ? selectedRowDetails.value?.patient_details?.firstname : "N/A") + 
        " " + (selectedRowDetails.value?.patient_details?.middlename ? selectedRowDetails.value?.patient_details?.middlename : "N/A");
        payload.value.patient_Id = selectedRowDetails.value?.patient_Id;
        payload.value.case_No = selectedRowDetails.value?.case_No;
        payload.value.patient_Age = selectedRowDetails.value?.patient_Age ? selectedRowDetails.value?.patient_Age : "N/A";
        payload.value.registry_Date = selectedRowDetails.value?.registry_Date ? useDateMMDDYYY(selectedRowDetails.value?.registry_Date) : "N/A";
        payload.value.attending_Doctor_fullname = selectedRowDetails.value?.attending_Doctor_fullname ? selectedRowDetails.value?.attending_Doctor_fullname : "N/A";
        payload.value.account = selectedRowDetails.value?.mscPrice_Schemes && selectedRowDetails.value?.mscPrice_Schemes  == 1 ? "Self-Pay" : "Company / Insurance";
    } 
})
</script>

<style scoped>
</style>