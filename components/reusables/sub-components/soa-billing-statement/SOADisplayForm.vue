<template>
    <v-dialog v-model="isOpen" rounded="lg" @update:model-value="closeDialog" max-width="1120px">
        <v-card rounded="lg">
            <v-toolbar density="compact" color="#107bac" hide-details>
                <v-toolbar-title>Patient Statement of Accounts</v-toolbar-title>
                <v-btn color="white" @click="closeDialog">
                    <v-icon>mdi-close</v-icon>
                </v-btn>
            </v-toolbar>
            <v-card-text>
                <v-row>
                    <v-col cols="6">
                        <v-row>
                            <v-col cols="12" class="pa-1">
                                <v-text-field
                                    label="Patient Name"
                                    v-model="payload.patient_Name"
                                    density="compact"
                                    hide-details
                                    variant="solo"
                                    readonly
                                ></v-text-field>
                            </v-col>
                        </v-row>
                        <v-row>
                            <v-col cols="6" class="pa-1">
                                <v-text-field
                                    label="Birthdate"
                                    v-model="payload.birthdate"
                                    density="compact"
                                    hide-details
                                    variant="solo"
                                    readonly
                                ></v-text-field>
                            </v-col>
                            <v-col cols="6" class="pa-1">
                                <v-text-field
                                    label="Age"
                                    v-model="payload.age"
                                    density="compact"
                                    hide-details
                                    variant="solo"
                                    readonly
                                ></v-text-field>
                            </v-col>
                        </v-row>
                        <v-row>
                            <v-col cols="6" class="pa-1">
                                <v-text-field
                                    label="Sex"
                                    v-model="payload.sex"
                                    density="compact"
                                    hide-details
                                    variant="solo"
                                    readonly
                                ></v-text-field>
                            </v-col>
                            <v-col cols="6" class="pa-1">
                                <v-text-field
                                    label="Civil Status"
                                    v-model="payload.civil_status"
                                    density="compact"
                                    hide-details
                                    variant="solo"
                                    readonly
                                ></v-text-field>
                            </v-col>
                        </v-row>
                        <v-row>
                            <v-col cols="6" class="pa-1">
                                <v-text-field
                                    label="Registry Date"
                                    v-model="payload.registry_Date"
                                    density="compact"
                                    hide-details
                                    variant="solo"
                                    readonly
                                ></v-text-field>
                            </v-col>
                            <v-col cols="6" class="pa-1">
                                <v-text-field
                                    label="Billing Date"
                                    type="date"
                                    v-model="payload.billed_Date"
                                    density="compact"
                                    hide-details
                                    variant="solo"
                                    readonly
                                ></v-text-field>
                            </v-col>
                        </v-row>
                    </v-col>
                    <v-col cols="6">
                        <v-row>
                            <v-col cols="6" class="pa-1">
                                <v-text-field
                                    label="Patient ID"
                                    v-model="payload.patient_Id"
                                    density="compact"
                                    hide-details
                                    variant="solo"
                                    readonly
                                ></v-text-field>
                            </v-col>
                            <v-col cols="6" class="pa-1">
                                <v-text-field
                                    label="Case No"
                                    v-model="payload.case_No"
                                    density="compact"
                                    hide-details
                                    variant="solo"
                                    readonly
                                ></v-text-field>
                            </v-col>
                        </v-row>
                        <v-row>
                            <v-col cols="3" class="pa-1">
                                <v-text-field
                                    label="ID"
                                    v-model="payload.attending_Doctor"
                                    density="compact"
                                    hide-details
                                    variant="solo"
                                    readonly
                                ></v-text-field>
                            </v-col>
                            <v-col cols="9" class="pa-1">
                                <v-text-field
                                    label="Physician Name"
                                    v-model="payload.attending_Doctor_fullname"
                                    density="compact"
                                    hide-details
                                    variant="solo"
                                    readonly
                                ></v-text-field>
                            </v-col>
                        </v-row>
                        <v-row>
                            <v-col cols="12" class="pa-1">
                                <v-text-field
                                    label="Account"
                                    v-model="payload.account"
                                    density="compact"
                                    hide-details
                                    variant="solo"
                                    readonly
                                ></v-text-field>
                            </v-col>
                        </v-row>
                        <v-row>
                            <v-col cols="3" class="pa-1">
                                <v-text-field
                                    label="ID"
                                    v-model="payload.guarantor_Id"
                                    density="compact"
                                    hide-details
                                    variant="solo"
                                    readonly
                                ></v-text-field>
                            </v-col>
                            <v-col cols="9" class="pa-1">
                                <v-text-field
                                    label="Guarantor Name"
                                    v-model="payload.guarantor_Name"
                                    density="compact"
                                    hide-details
                                    variant="solo"
                                    readonly
                                ></v-text-field>
                            </v-col>
                        </v-row>
                    </v-col>
                </v-row>
                <v-row class="mt-5">
                    <v-divider></v-divider>
                    <v-data-table-server
                        class="animated animatedFadeInUp fadeInUp"
                        v-model:items-per-page="itemsPerPage"
                        :headers="headers"
                        :items="serverItems"
                        :items-length="totalItems"
                        :loading="data.loading"
                        item-value="id"
                        :hover="true"
                        select-strategy="single"
                        fixed-header
                        density="compact"
                        height="40vh"
                        >
                        <template v-slot:item.transDate="{ item }">
                            {{ useDateMMDDYYY(item.transDate) }}
                        </template>
                        <template v-slot:item.refNum="{ item }">
                            {{ item.item_description ? item.item_description?.transaction_code : "MB" }} - {{ item.refNum }}
                        </template>
                        <template v-slot:item.particulars="{ item }">
                            {{ item.item_description ? item.item_description.exam_description : (item.doctor_description ? item.doctor_description.doctor_name : 'Item has no particulars') }}
                        </template>
                        <template v-slot:item.quantity="{ item }">
                            {{ parseFloat(item.quantity) }}
                        </template>
                        <template v-slot:item.charge="{ item }">
                            {{ item.charge != 0 ? item.charge : '' }}
                        </template>
                        <template v-slot:item.credit="{ item }">
                            {{ item.credit != 0 ? `- ${item.credit}` : '' }}
                        </template>
                        <template v-slot:item.balance="{ item }">
                            {{ item.balance != 0 ? item.balance : '' }}
                        </template>
                        <template #bottom></template>
                    </v-data-table-server>
                </v-row>
            </v-card-text>
            <v-container>
                <v-row style="display: flex; justify-content: center; align-items: center;">
                    <v-spacer></v-spacer>
                    <p style="font-size: small; font-weight: bolder;"> Grand Total Balance : &nbsp;</p>
                    <v-col cols="2" class="pa-1">
                        <input v-model="grandTotal" readonly style="text-align: center; border-bottom: 1px solid #000;" />
                    </v-col>
                </v-row>
            </v-container>
            <v-divider></v-divider>
            <v-card-actions>
                <v-btn color="blue-darken-1 border border-info" @click="closeDialog"> Close </v-btn>
                <v-spacer></v-spacer>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script setup>
const props = defineProps({
    open_patient_soa: {
        type: Boolean,
        default: () => false,
        required: true,
    },
    patient: {
        type: Object,
        default: () => {},
        required: true,
    },
});

const payload = ref();
const headers = [
    { title: "Date", key: "transDate", align: "start", sortable: false, width: "15%" },
    { title: "Ref #", key: "refNum", align: "start", sortable: false, width: "10%" },
    { title: "Particulars", key: "particulars", align: "start", sortable: false, width: "25%" },
    { title: "Qty", key: "quantity", align: "start", sortable: false, width: "5%" },
    { title: "Charges", key: "charge", align: "start", sortable: false, width: "15%" },
    { title: "Credit", key: "credit", align: "start", sortable: false, width: "15%" },
    { title: "Balance", key: "balance", align: "start", sortable: false, width: "15%" },
];

const data = ref({
    title: "List of Patient SOA",
    keyword: "",
    loading: false,
    filter: {},
    tab: 0,
    param_tab: 1,
});
const itemsPerPage = ref(10);
const totalItems = ref(0);
const serverItems = ref([]);
const grandTotal = ref();

const emits = defineEmits(['close-dialog' ,'update:open_patient_soa'])

const isOpen = computed({
    get: () => props.open_patient_soa,
    set: (value) => emits('update:open_patient_soa', value),
});

const closeDialog = () => {
    emits('close-dialog');
}

const getPatientSOA = async () => {
    data.value.loading = true;
    try {
        const response = await useMethod("get", `get-his-patient-soa?patient_Id=${payload.value.patient_Id}&case_No=${payload.value.case_No}`, "", "");
        if (response) {
            serverItems.value = response.data;
            totalItems.value = response.total;
            grandTotal.value = response.grand_total;
        }
    } catch (error) {
        console.error(error);
    } finally {
        data.value.loading = false;
    }
};

onUpdated(() => {
    if (props.patient != null) {
        payload.value = Object.assign({}, props.patient);
        payload.value.patient_Name = props.patient.lastname + ", " + props.patient.firstname + " " + props.patient.middlename;
        payload.value.case_No = props.patient.patient_registry ? props.patient.patient_registry[0]?.case_No : "";
        payload.value.birthdate = useDateMMDDYYY(props.patient.birthdate) ? useDateMMDDYYY(props.patient.birthdate) : '';
        payload.value.sex = props.patient.sex ? props.patient.sex?.sex_description : 'TEST'; 
        payload.value.civil_status = props.patient.civil_status ? props.patient.civil_status?.civil_status_description : 'TEST';
        payload.value.attending_Doctor = props.patient.patient_registry ? props.patient.patient_registry[0]?.attending_Doctor : '';
        payload.value.attending_Doctor_fullname = props.patient.patient_registry ? props.patient.patient_registry[0]?.attending_Doctor_fullname : '';
        payload.value.guarantor_Id = props.patient.patient_registry ? props.patient.patient_registry[0]?.guarantor_Id : '';
        payload.value.guarantor_Name = props.patient.patient_registry ? props.patient.patient_registry[0]?.guarantor_Name : '';
        payload.value.registry_Date = props.patient.patient_registry ? useDateTimeFormater(props.patient.patient_registry[0]?.registry_Date) : '';
        payload.value.billed_Date = useDateTimeFormater(props.patient.patient_registry ? props.patient.patient_registry[0]?.billed_Date: null) || '';
        payload.value.account = props.patient.patient_registry && props.patient.patient_registry[0].mscPrice_Schemes == 1 ? "Self-Pay" : "Company / Insurance";

        getPatientSOA();
    }
})
</script>

<style scoped>
</style>