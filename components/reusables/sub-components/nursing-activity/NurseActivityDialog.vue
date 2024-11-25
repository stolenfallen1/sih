<script setup>
    import { ref, watch, toRef } from 'vue';
    import { usePatientStore } from '@/store/selectedPatient';
    const { selectedRowDetails } = storeToRefs(useSubcomponentSelectedRowDetailsStore());
    const patientStore = usePatientStore();
    const props = defineProps({
        show: {
            type: Boolean,
            required: true,
        },
    });

    const payload                   = ref({});
    const processedChargeList       = ref([]);
    const pendingChargeList         = ref([]);
    const cashAssessnentChargeList  = ref([]);
    let panel                       = ref([0, 1, 2]);
    const isLoading                 = ref(false);
    const showDialog                = ref(false);

    const openConfirmDialog = async () => {
        showDialog.value = true;
    }

    const closeConfirmDialog = () => {
        showDialog.value = false;
    }


    const emit = defineEmits(['close-dialog']);

    const dialogVisible = toRef(props, 'show');

    const closeDialog = () => {
        emit('close-dialog');
    };

    const reference_id = ref(0);
    const medsys_assess_id = ref(0);
    const handleCancelCharges = async (request_id, assess_num) => {
       reference_id.value = request_id;
       medsys_assess_id.value = assess_num;
       openConfirmDialog()
        
    }

    const onSubmit = async () => {
        isLoading.value = true;
        let response;
        payload.value.reference_id = reference_id.value;
        payload.value.medsys_AssessNum = medsys_assess_id.value;
        try{
            response = await useMethod("post", "er-cancel-charge", payload.value);
            if(response) {
                useSnackbar(true, "success", response.message);
                isLoading.value = false;
                closeConfirmDialog();
            } else {
                useSnackbar(true, "error", 'Failed to post charges. Please try again.');
            }
        } catch(error) {
            useSnackbar(true, "error", 'There was an error.');
        } finally {
            isLoading.value = false;
            closeConfirmDialog();
        }
    }


    
    const processedRequest = ref([
        { title: "Description",         key: "description",     sortable: false },
        { title: 'Quantity',            key: 'quantity',        sortable: false },
        { title: 'Department',          key: 'department',      sortable: false },
        { title: 'Code',                key: 'code',            sortable: false },
        { title: 'Requested By',        key: 'requestBy',       sortable: false },
        { title: 'Date Process',        key: 'processedDate',   sortable: false },
        { title: 'Processed By',        key: 'processedBy',     sortable: false },
        { title: 'Action',              key: 'action',          sortable: false }
    ]);

    const pendingData = ref([
  
        { title: "Description",         key: "description",     sortable: false },
        { title: 'Quantity',            key: 'quantity',        sortable: false },
        { title: 'Department',          key: 'department',      sortable: false },
        { title: 'Date Requested',      key: 'processedDate',   sortable: false },
        { title: 'Code',                key: 'code',            sortable: false },
        { title: 'Requested By',        key: 'requestedBy',     sortable: false },
        { title: 'Action',              key: 'action',          sortable: false }
    ]);

    const cashAssessmentData = ref([
        { title: "Revenue ID",          key: "revenue_id",      sortable: false },
        { title: "Description",         key: "description",     sortable: false },
        { title: 'Quantity',            key: 'quantity',        sortable: false },
        { title: 'Department',          key: 'department',      sortable: false },
        { title: 'Date Process',        key: 'processedDate',   sortable: false },
        { title: 'Action',              key: 'action',          sortable: false }
    ]);

    const allCharges = ref([]);
    const getAllCharges = async (case_No, accountType) => {
        processedChargeList.value       = [];
        pendingChargeList.value         = [];
        cashAssessnentChargeList.value  = [];
        let response;
        try {
           response = await useMethod("get", "get-charges-list/", "", case_No)
           const data = Array.isArray(response) ? response : response.data;
           if(data && Array.isArray(data) && data.length > 0) {
                if(accountType !== 'Self Pay') {
                    const filteredProcessedData  = data.filter( 
                        item => item.record_Status === 'W'
                    );
                    processedChargeList.value = filteredProcessedData.map(item => ({
                        description:    toTitleCase(item.description),
                        department:     toTitleCase(item.department),
                        code:           item.item_Id,
                        requestDate:    getDateTime(item.created_at),
                        requestBy:      item.requestBy,
                        processedBy:    item.revenue_Id === 'EM' ||
                                        item.revenue_Id === 'RS'
                                        ? item.requestBy 
                                        : item.process_By,
                        item_name:      item.description || '-',
                        quantity:       item.Quantity ? parseInt(item.Quantity) : '-',
                        request_num:    item.referenceNum,
                        assess_num:     item.assessnum,
                        processedDate:  item.revenue_Id === 'EM' ||
                                        item.revenue_Id === 'RS'
                                        ? getDateTime(item.updated_at) 
                                        : getDateTime(item.process_Date) 
                    }));

                    const filteredPendingData  = data.filter(
                        item => item.record_Status !== 'W' && 
                                item.record_Status !== 'R'
                    );
                    pendingChargeList.value = filteredPendingData.map(item => ({
                        description:    toTitleCase(item.description),
                        department:     toTitleCase(item.department),
                        code:           item.item_Id,
                        revenue_id:     item.revenue_Id,
                        item_name:      item.description || '-',
                        quantity:       item.Quantity ? parseInt(item.Quantity) : '-',
                        request_num:    item.referenceNum,
                        assess_num:     item.assessnum,
                        processedDate:  getDateTime(item.created_at)
                    }))

                } else {
                    const filteredCashAssessmentRequestData = data.filter(item => item.record_Status !== 'R');
                    cashAssessnentChargeList.value = filteredCashAssessmentRequestData.map(item => ({
                        description:    toTitleCase(item.description),
                        department:     toTitleCase(item.department),
                        code:           item.item_Id,
                        revenue_id:     item.revenue_Id,
                        item_name:      item.description || '-',
                        quantity:       item.Quantity ? parseInt(item.Quantity) : '-',
                        request_num:    item.referenceNum,
                        assess_num:     item.assessnum,
                        processedDate:  item.updated_at !== null 
                                        ? getDateTime(item.updated_at) 
                                        : getDateTime(item.created_at),
                    }))
                }
           } else {
            console.log('Na walay nakuha nga data oy')
           }
        } catch (error) {
            console.error("An error occurred while fetching charges:", error);
        }
    };

    const getDateTime = (dateString) => {
        if(dateString === null) {
            return '';
        }
        const date = new Date(dateString);
        if (isNaN(date)) {
            return '';
        }

        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, "0"); 
        const day = String(date.getDate()).padStart(2, "0");
        const hours = date.getHours() % 12 || 12; 
        const minutes = String(date.getMinutes()).padStart(2, "0");
        const ampm = date.getHours() >= 12 ? "PM" : "AM"; 

        return `${year}-${month}-${day} ${hours}:${minutes} ${ampm}`;
    }

    const toTitleCase = (str) => {
        return str
            .split(' ') 
            .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()) 
            .join(' '); 
     }


    watch(() => selectedRowDetails.value, async (newRow, oldRow) => {
            if (newRow && newRow.id && (!oldRow || newRow.id !== oldRow.id)) {
                payload.value = {
                    ...newRow,
                    patient_name:       newRow.lastname && newRow.firstname
                                        ? `${newRow.lastname}, ${newRow.firstname} ${newRow.middlename || ''}`
                                        : '',
                    patient_id:         newRow.patient_Id || '',
                    attending_doctor:   newRow.patient_registry?.[0]?.attending_Doctor_fullname || '',
                    admission_date:     useDateMMDDYYY(newRow.patient_registry?.[0]?.registry_Date) || '',
                    suffix_id:          parseInt(newRow.suffix_id) || '',
                    case_No:            newRow.patient_registry?.[0]?.case_No || '',
                    bed_number:         newRow.patient_registry?.[0]?.er_Bedno || '',
                    birthdate:          useDateMMDDYYY(newRow.birthdate) || '',
                    age:                newRow.age || '',
                    er_Case_No:         parseInt(newRow.patient_registry?.[0]?.er_Case_No) || '',
                    registry_Date:      useDateMMDDYYY(newRow.registry_Date) || '',
                    accountType:        newRow.patient_registry?.[0]?.guarantor_Name || ''
                };
                getAllCharges(newRow.patient_registry?.[0]?.case_No, newRow.patient_registry?.[0]?.guarantor_Name);
            }
        },
        { immediate: true } 
    );

</script>

<template>
    <v-dialog
        :model-value="dialogVisible"
        rounded="lg"
        scrollable
        @update:model-value="closeDialog"
        style="max-width: 1300px;"
        >
        <v-card rounded-lg>
            <v-toolbar density="compact" color="#107bac" hide-details>
                <v-toolbar-title>
                    Nursing Activity
                </v-toolbar-title>
                <v-btn color="white" @click="closeDialog">
                    <v-icon>mdi-close</v-icon>
                </v-btn>
            </v-toolbar>
            <v-card-text>
                <v-card>
                    <v-card-title>Patient Information</v-card-title>
                    <v-card-text>
                        <v-row>
                            <v-col cols="4">
                                <v-col cols="12" class="form-col">
                                    <v-text-field
                                        label="Patient Name"
                                        v-model="payload.patient_name"
                                        variant="outlined"
                                        density="compact"
                                        readonly
                                    >
                                    </v-text-field>
                                </v-col>
                                <v-col cols="12" class="form-col">
                                    <v-text-field
                                        label="Attending Doctor"
                                        v-model="payload.attending_doctor"
                                        variant="outlined"
                                        density="compact"
                                        readonly
                                    >
                                    </v-text-field>
                                </v-col>
                                <v-col cols=12 class="form-col">
                                    <v-text-field
                                        label="Admission Date"
                                        v-model="payload.admission_date"
                                        variant="outlined"
                                        density="compact"
                                        readonly
                                    ></v-text-field>
                                </v-col>
                            </v-col>
                            <v-col cols="4">
                                <v-col cols="12" class="form-col">
                                    <v-text-field
                                        label="Admission Number"
                                        v-model="payload.case_No"
                                        variant="outlined"
                                        density="compact"
                                        readonly
                                    ></v-text-field>
                                </v-col>
                                <v-col cols="12" class="form-col">
                                    <v-text-field
                                        label="Patient Number"
                                        v-model="payload.patient_id"
                                        variant="outlined"
                                        density="compact"
                                        readonly
                                    ></v-text-field>
                                </v-col>
                                <v-col cols="12" class="form-col">
                                    <v-text-field
                                        label="Bed Number"
                                        v-model="payload.bed_number"
                                        variant="outlined"
                                        density="compact"
                                        readonly
                                    ></v-text-field>
                                </v-col>
                            </v-col>
                            <v-col cols="4">
                                <v-col cols="12" class="form-col">
                                    <v-text-field
                                        label="Birthdate"
                                        v-model="payload.birthdate"
                                        variant="outlined"
                                        density="compact"
                                        readonly
                                    ></v-text-field>
                                </v-col>
                                <v-col cols="12" class="form-col">
                                    <v-text-field
                                        label="Age"
                                        v-model="payload.age"
                                        variant="outlined"
                                        density="compact"
                                        readonly
                                    ></v-text-field>
                                </v-col>
                                <v-col cols="12" class="form-col">
                                    <v-text-field
                                        label="Account"
                                        v-model="payload.accountType"
                                        variant="outlined"
                                        density="compact"
                                        readonly
                                    ></v-text-field>
                                </v-col>
                            </v-col>
                        </v-row>
                    </v-card-text>
                </v-card>
                <v-expansion-panels
                    v-model="panel"
                    variant="accordion"
                    multiple
                >
                    <v-expansion-panel>
                        <v-expansion-panel-title color="#107bac">
                            List Of Prossesed Request
                        </v-expansion-panel-title>
                        <v-expansion-panel-text>
                            <v-data-table 
                                :items="processedChargeList" 
                                :headers="processedRequest" 
                                density="compact" 
                                height="40vh" 
                                class="styled-table"
                                >
                                <template v-slot:item.action="{ item }">
                                    <v-btn
                                        flat
                                        size="medium"
                                        class="p-2 text-capitalize"
                                        desity="default"
                                        @click.prevent="handleCancelCharges(item.request_num, item.assess_num)"
                                    >
                                    <v-icon 
                                        color="#D50000">
                                        mdi-trash-can-outline
                                    </v-icon>
                                        <v-tooltip
                                            activator="parent"
                                            location="top"
                                        >
                                            Cancel Charges 

                                        </v-tooltip>
                                    </v-btn>
                                </template>
                            </v-data-table>
                        </v-expansion-panel-text>
                    </v-expansion-panel>

                    <v-expansion-panel>
                        <v-expansion-panel-title color="#107bac">
                            List Of Pending Request
                        </v-expansion-panel-title>
                        <v-expansion-panel-text>
                            <v-data-table 
                                :items="pendingChargeList" 
                                :headers="pendingData" 
                                density="compact" 
                                height="40vh" 
                                class="styled-table"
                                >
                                <template v-slot:item.action="{ item }">
                                    <v-btn
                                        flat
                                        size="medium"
                                        class="p-2 text-capitalize"
                                        desity="default"
                                        @click.prevent="handleCancelCharges(item.request_num, item.assess_num)"
                                    >
                                    <v-icon 
                                        color="#D50000">
                                        mdi-trash-can-outline
                                    </v-icon>
                                        <v-tooltip
                                            activator="parent"
                                            location="top"
                                        >
                                            Cancel Charges 

                                        </v-tooltip>
                                    </v-btn>
                                </template>
                            </v-data-table>
                        </v-expansion-panel-text>
                    </v-expansion-panel>

                    <v-expansion-panel>
                        <v-expansion-panel-title color="#107bac">
                            List Of Assessment Entered
                        </v-expansion-panel-title>
                        <v-expansion-panel-text>
                            <v-data-table 
                                :items="cashAssessnentChargeList" 
                                :headers="cashAssessmentData" 
                                density="compact" 
                                height="40vh" 
                                class="styled-table"
                                >
                            
                                <template v-slot:item.action="{ item }">
                                    <v-btn
                                        flat
                                        size="medium"
                                        class="p-2 text-capitalize"
                                        desity="default"
                                        @click.prevent="handleCancelCharges(item.request_num, item.assess_num)"
                                    >
                                    <v-icon 
                                        color="#D50000">
                                        mdi-trash-can-outline
                                    </v-icon>
                                        <v-tooltip
                                            activator="parent"
                                            location="top"
                                        >
                                            Cancel Charges 

                                        </v-tooltip>
                                    </v-btn>
                                </template>
                            </v-data-table>
                        </v-expansion-panel-text>
                    </v-expansion-panel>
                </v-expansion-panels>
            </v-card-text>
        </v-card>
    </v-dialog>
    <Confirmation 
        :show="showDialog"
        :payload="payload"
        :loading="isLoading"
        @submit="onSubmit"
        @close="closeConfirmDialog"
    />
</template>

<style scoped>
     .form-col {
        /* padding: 3.25px 0px 3.25px 0px !important; */
        padding: 0px 0px 0px 0px !important;
        margin: 0px !important;
    }
</style>