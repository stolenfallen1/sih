<script setup>

    import { usePatientStore } from '@/store/selectedPatient';
    const patientStore = usePatientStore();

    const props = defineProps({
        patient_for_admission_dialog: {
            type: Boolean,
            default: false,
        },
    });

    const payload = ref({
        selectedPatients: [],
    });

    const emits = defineEmits(['close-main-dialog','close-dialog', 'patient-count', 'patient-registered', 'open-inpatient-form']);
    const showDialog = ref(false);

    const handleOpenConfirmDialog = () => {
        if (!patientId.value || patientId.value === null) {
            console.log("No patient selected.");
            useSnackbar(true, "error", "Please select a patient to register.");
            return;
        }
        showDialog.value = true;
    };

    const closeDialog = () => {
        emits('close-main-dialog');
    };

    const closeConfirmDialog = () => {
        emits('close-dialog');
        showDialog.value = false;
        payload.value = {};
    }

    const patientForAdmission = ref([
        { title: "",                    key: "select",         sortable: false },
        { title: "Patient_Id",          key: "patient_Id",     sortable: false },
        { title: 'Case No.',            key: 'case_No',        sortable: false },
        { title: 'Lastname',            key: 'lastname',       sortable: false },
        { title: 'Firstname',           key: 'firstname',      sortable: false },
        { title: 'Discharge Date',      key: 'discharge_date', sortable: false },
    ]);

    let interval = null;
    let data = [];
    const patientList = ref([]);
    const serverItems = ref([]);
    const loading = ref(false);
    const case_No = ref(null);

    const handleLoadPatientList = async () => {
        try {
            loading.value = true;
            const response = await useMethod("get", "patient-for-admission", "", "");
            if (response) {
                data = Array.isArray(response) ? response : response.data;
                emits("patient-count", data.length);
                if(data && Array.isArray(data) && data.length > 0) {
                    patientList.value = data.map(patient => ({
                        id: patient.patient_registry.id,
                        patient_Id: patient.patient_Id,
                        case_No: patient.case_No,
                        lastname: patient.patient_master.lastname,
                        firstname: patient.patient_master.firstname,
                        discharge_date: useDateMMDDYYY(patient.patient_registry.discharge_date),
                    }));
                }
            } else {
                useSnackbar(true, "error", "No data found.");
            }
        } catch (error) {
            useSnackbar(true, "error", "Failed to load patient list.");
        } finally {
            loading.value = false;
        }
    };

    watch(() => props.patient_for_admission_dialog, (value) => {
        if (value) {
            props.patient_for_admission_dialog = value;
            interval = setInterval(async () => {
                await handleLoadPatientList();
            }, 5000);
        } else {
            clearInterval(interval);
            interval = null;
            loading.value = false;
        }
    });

    const isLoading = ref(false);
    const handleSelectedRow = async (value) => {
        if(Array.isArray(value) && value.length === 0) {
            case_No.value = null;
        } else {
            case_No.value = value;
            isLoading.value = true;
            let response
            try {
                response = await useMethod("get", "get-selected-patient-for-admission/","" , case_No.value);
                if(response) {
                    const selectedPatient = Object.assign({}, response.data[0]);
                    patientStore.setSelectedPatient(selectedPatient);
                } else {
                    useSnackbar(true, "error", "Failed to get selected patient.");
                }
            } catch (error) {
                useSnackbar(true, "error", "Failed to get selected patient.");
            } finally {
                isLoading.value = false;
            }
        };
    }
        
    const handlePatientRegistration = () => {
        emits('open-inpatient-form');
        emits('close-main-dialog');
    };

    onMounted(async () => {
        await handleLoadPatientList();
    });
    
    onUnmounted(() => {
        if (interval) {
            clearInterval(interval);
        }
    });

</script>

<template>
    <v-dialog
        transition="dialog-top-transition"
        :model-value="patient_for_admission_dialog"
        @close-dialog="closeDialog"
        hide-overlay
        width="1200"
        scrollable
        height="68vh"
        persistent
    >
        <v-card>
            <v-toolbar title="Patient For Admission" persistent density="compact" color="#107bac" hide-details></v-toolbar>
            <v-card-text>
                <v-progress-linear
                    v-if="loading"
                    color="green"
                    indeterminate
                ></v-progress-linear>
                <v-data-table
                    :headers="patientForAdmission"
                    :items="patientList"
                    :items-per-page="10"
                    class="elevation-1"
                    item-value="case_No"
                    height="48vh"
                    density="compact"
                    show-select
                    select-strategy="single"
                    @update:modelValue="handleSelectedRow"
                >

                </v-data-table>
            </v-card-text>

        <v-card-actions class="justify-end">
            <v-spacer></v-spacer>
            <v-btn
                class="bg-primary text-white"
                @click="handlePatientRegistration"
            >
                Register Selected Patient
            </v-btn>
            <v-btn
                text="Close"
                @click="closeDialog"
            ></v-btn>
        </v-card-actions>
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
