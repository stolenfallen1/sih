<template>
    <v-dialog :model-value="open_patient_check_lab_status" rounded="lg" @update:model-value="closeDialog" scrollable max-width="1120px">
        <v-card rounded="lg">
            <v-toolbar density="compact" color="#107bac" hide-details>
                <v-toolbar-title>Check the Status of Lab Requests</v-toolbar-title>
                <v-btn class="mr-4" density="compact" style="background-color: #FFF;">
                    <v-icon style="color: #000;">mdi-human-handsdown</v-icon>
                    <v-menu activator="parent">
                        <v-list>
                            <v-list-item>
                                <div style="display: flex; align-items: center;">
                                    <span style="width: 10px; height: 10px; background-color: blue; margin-right: 10px;"></span>
                                    <v-list-item-title>Out-Patient</v-list-item-title>
                                </div>
                            </v-list-item>
                            <v-list-item>
                                <div style="display: flex; align-items: center;">
                                    <span style="width: 10px; height: 10px; background-color: orangered; margin-right: 10px;"></span>
                                    <v-list-item-title>Emergency</v-list-item-title>
                                </div>
                            </v-list-item>
                            <v-list-item>
                                <div style="display: flex; align-items: center;">
                                    <span style="width: 10px; height: 10px; background-color: green; margin-right: 10px;"></span>
                                    <v-list-item-title>In-Patient</v-list-item-title>
                                </div>
                            </v-list-item>
                        </v-list>
                    </v-menu>
                </v-btn>
                <v-btn class="mr-4" density="compact" style="background-color: #FFF;">
                    <v-icon style="color: #000;">mdi-help-circle-outline</v-icon>
                    <v-menu activator="parent">
                        <v-list>
                            <v-list-item>
                                <div style="display: flex; align-items: center;">
                                    <span style="width: 10px; height: 10px; background-color: violet; margin-right: 10px;"></span>
                                    <v-list-item-title>Processed</v-list-item-title>
                                </div>
                            </v-list-item>
                            <v-list-item>
                                <div style="display: flex; align-items: center;">
                                    <span style="width: 10px; height: 10px; background-color: purple; margin-right: 10px;"></span>
                                    <v-list-item-title>With Result</v-list-item-title>
                                </div>
                            </v-list-item>
                            <v-list-item>
                                <div style="display: flex; align-items: center;">
                                    <span style="width: 10px; height: 10px; background-color: green; margin-right: 10px;"></span>
                                    <v-list-item-title>Result Released</v-list-item-title>
                                </div>
                            </v-list-item>
                            <v-list-item>
                                <div style="display: flex; align-items: center;">
                                    <span style="width: 10px; height: 10px; background-color: red; margin-right: 10px;"></span>
                                    <v-list-item-title>Cancelled</v-list-item-title>
                                </div>
                            </v-list-item>
                        </v-list>
                    </v-menu>
                </v-btn>
                <v-btn color="white" @click="closeDialog">
                    <v-icon>mdi-close</v-icon>
                </v-btn>
            </v-toolbar>
            <v-divider></v-divider>
            <v-card-text>
                <v-row>
                    <v-col cols="5" class="pa-1">
                        <v-row>
                            <v-col cols="12">
                                <v-text-field
                                    v-model="payload.lastname"
                                    type="text"
                                    label="Lastname"
                                    variant="outlined"
                                    density="compact"
                                    hide-details
                                    outlined
                                ></v-text-field>
                            </v-col>
                        </v-row>
                    </v-col>
                    <v-col cols="3" class="pa-1">
                        <v-row>
                            <v-col cols="12">
                                <v-text-field
                                    v-model="payload.case_No"
                                    label="Case No"
                                    variant="outlined"
                                    density="compact"
                                    hide-details
                                    outlined
                                ></v-text-field>
                            </v-col>
                        </v-row>
                    </v-col>
                    <v-col cols="2" class="pa-1">
                        <v-row>
                            <v-col cols="12">
                                <v-btn style="width: 100%; margin-top: 2px;" @click="searchPatientToday">Today</v-btn>
                            </v-col>
                        </v-row>
                    </v-col>
                    <v-col cols="2" class="pa-1">
                        <v-row>
                            <v-col cols="12">
                                <v-btn style="width: 100%; margin-top: 2px;" @click="searchPatientYesterday">Yesterday</v-btn>
                            </v-col>
                        </v-row>
                    </v-col>
                </v-row>
                <v-row>
                    <v-col cols="3" class="pa-1">
                        <v-row>
                            <v-col cols="12">
                                <v-text-field
                                    v-model="payload.date_from"
                                    type="date"
                                    label="Date From"
                                    variant="outlined"
                                    density="compact"
                                    hide-details
                                    outlined
                                ></v-text-field>
                            </v-col>
                        </v-row>
                    </v-col>
                    <v-col cols="3" class="pa-1">
                        <v-row>
                            <v-col cols="12">
                                <v-text-field
                                    v-model="payload.date_to"
                                    type="date"
                                    label="Date To"
                                    variant="outlined"
                                    density="compact"
                                    hide-details
                                    outlined
                                ></v-text-field>
                            </v-col>
                        </v-row>
                    </v-col>
                    <v-col cols="3" class="pa-1">
                        <v-row>
                            <v-col cols="12">
                                <v-btn color="blue-darken-1" style="width: 100%; margin-top: 2px;" @click="clearSearchOption">Clear Seach Options</v-btn>
                            </v-col>
                        </v-row>
                    </v-col>
                    <v-col cols="3" class="pa-1">
                        <v-row>
                            <v-col cols="12">
                                <v-btn color="green-darken-1" style="width: 100%; margin-top: 2px;" @click="searchPatient">Search</v-btn>
                            </v-col>
                        </v-row>
                    </v-col>
                </v-row>
                <v-divider style="margin-top: 20px;"></v-divider>
                <v-row>
                    <v-col cols="12">
                        <v-data-table-server
                            class="animated animatedFadeInUp fadeInUp cursor-pointer"
                            :items-per-page="100"
                            :headers="headers"
                            :items="serverItems"
                            :items-length="totalItems"
                            :loading="data.loading"
                            :hover="true"
                            item-value="patientid"
                            @update:options="initialize"
                            @click:row="checkPatientMoreInfo"
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

                            <template v-slot:item.trans_types="{ item }">
                            <span 
                                :style="{
                                    display: 'inline-block',
                                    width: '12px',
                                    height: '12px',
                                    borderRadius: '2px',
                                    backgroundColor: item.trans_types == 2 ? 'blue' : 
                                                    item.trans_types == 5 ? 'orangered' : 
                                                    item.trans_types == 6 ? 'green' : 'yellowgreen'
                                }"
                                :title="item.trans_types == 2 ? 'OPD' :
                                        item.trans_types == 5 ? 'ER' :
                                        item.trans_types == 6 ? 'IPD' : 'N/A'"
                            >
                            </span>
                        </template>

                            <template v-slot:item.lastname="{ item }">
                                <span> {{ item?.lastname + ", " + item?.firstname + item?.middlename }} </span>
                            </template>

                            <template v-slot:item.renderdate="{ item }">
                                <span> {{ item.renderdate != null ? useDateMMDDYYY(item.renderdate) : useDateMMDDYYY(item.cancelleddate) }} </span>
                            </template>

                            <template v-slot:item.requestStatus="{ item }">
                                <v-chip style="color: violet;" v-if="item.requestStatus == 'W'">Processed</v-chip>
                                <v-chip style="color: red;" v-if="item.requestStatus == 'R'">Cancelled</v-chip>
                            </template>

                            <template v-slot:item.price_schemes="{ item }">
                                <v-chip style="color: blue"v-if="item.price_schemes == 1">Cash</v-chip>
                                <v-chip style="color: orange;" v-if="item.price_schemes == 2">Insurance</v-chip>
                            </template>

                            <template #bottom />
                        </v-data-table-server>
                    </v-col>
                </v-row>
                <v-card rounded="lg" v-if="isPatientSelected">
                    <v-toolbar density="compact" hide-details>
                        <v-toolbar-title>More Info</v-toolbar-title>
                        <v-spacer></v-spacer>
                        <v-btn color="black" @click="closeCheckPatientMoreInfo">
                        <v-icon>mdi-close</v-icon>
                        </v-btn>
                    </v-toolbar>
                    <v-card-text>
                        <v-row>
                            <v-col cols="6">
                                <v-text-field
                                    v-model="selected_patient.patient_Name"
                                    label="Patient Name"
                                    variant="solo"
                                    density="compact"
                                    hide-details
                                    readonly
                                ></v-text-field>
                            </v-col>
                            <v-col cols="2">
                                <v-text-field
                                    v-model="selected_patient.birthdate"
                                    label="Birthdate"
                                    variant="solo"
                                    density="compact"
                                    hide-details
                                    readonly
                                ></v-text-field>
                            </v-col>
                            <v-col cols="2">
                                <v-text-field
                                    v-model="selected_patient.age"
                                    label="Age"
                                    variant="solo"
                                    density="compact"
                                    hide-details
                                    readonly
                                ></v-text-field>
                            </v-col>
                            <v-col cols="2">
                                <v-text-field
                                    v-model="selected_patient.sex"
                                    label="Sex"
                                    variant="solo"
                                    density="compact"
                                    hide-details
                                    readonly
                                ></v-text-field>
                            </v-col>
                        </v-row>
                        <v-row>
                            <v-col cols="2">
                                <v-text-field
                                    v-model="selected_patient.patientid"
                                    label="Patient ID"
                                    variant="solo"
                                    density="compact"
                                    hide-details
                                    readonly
                                ></v-text-field>
                            </v-col>
                            <v-col cols="2">
                                <v-text-field
                                    v-model="selected_patient.caseno"
                                    label="Case No"
                                    variant="solo"
                                    density="compact"
                                    hide-details
                                    readonly
                                ></v-text-field>
                            </v-col>
                            <v-col cols="2">
                                <v-text-field
                                    v-model="selected_patient.refNum"
                                    label="Ref No."
                                    variant="solo"
                                    density="compact"
                                    hide-details
                                    readonly
                                ></v-text-field>
                            </v-col>
                            <v-col cols="3">
                                <v-text-field
                                    v-model="selected_patient.account"
                                    label="Account"
                                    variant="solo"
                                    density="compact"
                                    hide-details
                                    readonly
                                ></v-text-field>
                            </v-col>
                            <v-col cols="3" v-if="selected_patient.account == 'Cash'">
                                <v-text-field
                                    v-model="selected_patient.ORNumber"
                                    label="OR Number"
                                    variant="solo"
                                    density="compact"
                                    hide-details
                                    readonly
                                ></v-text-field>
                            </v-col>
                            <v-col cols="3" v-if="selected_patient.account == 'Insurance'">
                                <v-text-field
                                    v-model="selected_patient.guarantorID"
                                    label="Guarantor ID"
                                    variant="solo"
                                    density="compact"
                                    hide-details
                                    readonly
                                ></v-text-field>
                            </v-col>
                        </v-row>
                        <v-row>
                            <v-col cols="2">
                                <v-text-field
                                    v-model="selected_patient.itemid"
                                    label="Exam ID"
                                    variant="solo"
                                    density="compact"
                                    hide-details
                                    readonly
                                ></v-text-field>
                            </v-col>
                            <v-col cols="5">
                                <v-text-field
                                    v-model="selected_patient.exam"
                                    label="Exam Description"
                                    variant="solo"
                                    density="compact"
                                    hide-details
                                    readonly
                                ></v-text-field>
                            </v-col>
                            <v-col cols="5">
                                <v-text-field
                                    v-model="selected_patient.doctor_name"
                                    label="Requesting Doctor"
                                    variant="solo"
                                    density="compact"
                                    hide-details
                                    readonly
                                ></v-text-field>
                            </v-col>
                        </v-row>
                        <v-row v-if="selected_patient.status == 'Processed'">
                            <v-col cols="4">
                                <v-text-field
                                    v-model="selected_patient.status"
                                    label="Exam Status"
                                    variant="solo"
                                    density="compact"
                                    hide-details
                                    readonly
                                ></v-text-field>
                            </v-col>
                            <v-col cols="4">
                                <v-text-field
                                    v-model="selected_patient.renderby"
                                    label="Render By"
                                    variant="solo"
                                    density="compact"
                                    hide-details
                                    readonly
                                ></v-text-field>
                            </v-col>
                            <v-col cols="4">
                                <v-text-field
                                    v-model="selected_patient.renderdate"
                                    label="Render Date"
                                    variant="solo"
                                    density="compact"
                                    hide-details
                                    readonly
                                ></v-text-field>
                            </v-col>
                        </v-row>
                        <v-row v-if="selected_patient.status == 'Cancelled'">
                            <v-col cols="4">
                                <v-text-field
                                    v-model="selected_patient.status"
                                    label="Exam Status"
                                    variant="solo"
                                    density="compact"
                                    hide-details
                                    readonly
                                ></v-text-field>
                            </v-col>
                            <v-col cols="4">
                                <v-text-field
                                    v-model="selected_patient.cancelledby"
                                    label="Cancelled By"
                                    variant="solo"
                                    density="compact"
                                    hide-details
                                    readonly
                                ></v-text-field>
                            </v-col>
                            <v-col cols="4">
                                <v-text-field
                                    v-model="selected_patient.cancelleddate"
                                    label="Cancelled Date"
                                    variant="solo"
                                    density="compact"
                                    hide-details
                                    readonly
                                ></v-text-field>
                            </v-col>
                        </v-row>
                    </v-card-text>
                </v-card>
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
    open_patient_check_lab_status: {
        type: Boolean,
        default: () => false,
        required: true,
    },
    items: {
        type: Object,
        default: () => {},
        required: false,
    }
});
const payload = ref({});
const emits = defineEmits(["close-dialog"]);
const isPatientSelected = ref(false);
const selected_patient = ref({});

const data = ref({
    title: "List of Patient Lab Charges",
    keyword: "",
    loading: false,
    filter: {},
    tab: 0,
    param_tab: 1,
});
const headers = [
    { title: "", key: "trans_types", align: "start", sortable: false },
    { title: "Patient ID", key: "patientid", align: "start", sortable: false },
    { title: "Case No", key: "caseno", align: "start", sortable: false },
    { title: "Ref No.", key: "refNum", align: "start", sortable: false },
    { title: "Patient Name", key: "lastname", align: "start", sortable: false },
    { title: "Exam ID", key: "itemid", align: "start", sortable: false },
    { title: "Description", key: "exam", align: "start", sortable: false },
    { title: "TransDate", key: "renderdate", align: "start", sortable: false },
    { title: "Status", key: "requestStatus", align: "start", sortable: false },
    { title: "Account", key: "price_schemes", align: "start", sortable: false },
];

const totalItems = ref(0);
const serverItems = ref([]);

const initialize = () => {
    loadItems();
};

const searchPatient = () => {
    payload.value = {
        case_No: payload.value.case_No,
        lastname: payload.value.lastname,
        date_from: payload.value.date_from,
        date_to: payload.value.date_to,
        filter_date: null,
    };
    loadItems();
};

const searchPatientToday = () => {
    payload.value = {
        case_No: null,
        lastname: null,
        date_from: null,
        date_to: null,
        filter_date: "Today",
    };
    loadItems();
};

const searchPatientYesterday = () => {
    payload.value = {
        case_No: null,
        lastname: null,
        date_from: null,
        date_to: null,
        filter_date: "Yesterday",
    };
    loadItems();
};

const clearSearchOption = () => {
    payload.value = {
        case_No: null,
        lastname: null,
        date_from: null,
        date_to: null,
        filter_date: null,
    };
    loadItems();
};

const loadItems = async () => {
    data.value.loading = true;

    let params = new URLSearchParams();
    if (payload.value?.case_No != null || payload.value?.case_No != undefined) params.append("case_No", payload.value.case_No);
    if (payload.value?.lastname != null || payload.value?.lastname != undefined) params.append("lastname", payload.value.lastname);
    if (payload.value?.filter_date != null || payload.value?.filter_date != undefined) params.append("filter_date", payload.value.filter_date);
    if (payload.value?.date_from != null || payload.value?.date_from != undefined) params.append("date_from", payload.value.date_from);
    if (payload.value?.date_to != null || payload.value?.date_to != undefined) params.append("date_to", payload.value.date_to);

    try {
        const response = await fetch(useLaravelAPI() + `/get-patient-lab-request-status?${params}`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + useToken() 
            },
        });
        if (response.ok) {
            serverItems.value = await response.json();
            totalItems.value = serverItems.value.length;
        } 
    } catch (error) {
        useSnackbar(true, "green", "Error fetching data");
        console.error(error);
    } finally {
        data.value.loading = false;
    }
};

const checkPatientMoreInfo = (event, selectedRow) => {
    selected_patient.value = selectedRow.item;
    selected_patient.value.patient_Name = selected_patient.value.lastname + ", " + selected_patient.value.firstname + " " + selected_patient.value.middlename;
    selected_patient.value.birthdate = useDateMMDDYYY(selected_patient.value.birthdate);
    selected_patient.value.sex = selected_patient.value.sex == "Male" ? "M" : "F";
    selected_patient.value.account = selected_patient.value.price_schemes == 1 ? "Cash" : "Insurance";
    selected_patient.value.ORNumber = selected_patient.value.ornumber;
    selected_patient.value.guarantorID = selected_patient.value.guarantor_id;
    selected_patient.value.status = selected_patient.value.requestStatus == "W" ? "Processed" : "Cancelled";
    selected_patient.value.renderby = selected_patient.value.renderby;
    selected_patient.value.renderdate = selected_patient.value.renderdate != null ? useDateTimeFormater(selected_patient.value.renderdate) : useDateTimeFormater(selected_patient.value.cancelleddate);
    selected_patient.value.cancelledby = selected_patient.value.cancelledby;
    selected_patient.value.cancelleddate = selected_patient.value.cancelleddate != null ? useDateTimeFormater(selected_patient.value.cancelleddate) : useDateTimeFormater(selected_patient.value.renderdate);
    isPatientSelected.value = true;
}

const closeCheckPatientMoreInfo = () => {
    isPatientSelected.value = false;
}

const closeDialog = () => {
    emits("close-dialog");
    isPatientSelected.value = false;
    payload.value = {};
};
</script>

<style scoped>
</style>