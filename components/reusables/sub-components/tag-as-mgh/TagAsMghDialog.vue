<script setup>
    import { defineProps, defineEmits, onMounted } from 'vue';
    import ConsultantRoleTypeForm from '../../build-file/consultant-role-types/sub-forms/ConsultantRoleTypeForm.vue';
    const props = defineProps({
        show: {
            type: Boolean,
            default: () => false,
            required: true,
        },
        form_type: {
            type: String,
            default: () => '',
        },
        show_has_unpaid_message: {
            type: Boolean,
            default: () => false,
        },
        show_istag_as_mgh_message: {
            type: Boolean,
            default: () => false,
        },
    });

    const emits = defineEmits(['close-dialog', 'check-pending-charges', 'patient-registered']);

    const payload = ref([{
        mgh_queue_no: 0,
        address: {},
        referred_From_HCI_address: {},
        referred_To_HCI_address: {},
        refering_Doctor: {},
    }])

    const showPFDialog = ref(false);
    const showDialog = ref(false);
    const isLoading = ref(false);
    const open_professionals_list = ref(false);
    const open_refering_hci_address_form = ref(false);
    const check_charges_data = ref([]);
    const check_charges_loading = ref(false);
    const istagmgh = ref(false);
    const hasUnpaidCharges = ref(false);
    const isProcessed = ref(false);
    const pageLoader = ref(false);
    const value = ref(0)
    const interval = ref(null)
    const case_No = ref('');
    const guarantor_Name = ref('');

    const fieldRules = [
        v => !!v || 'Field is required',
    ]

    const handleDoctorsList = () => {
        showPFDialog.value = true;
    } 

    const doctorsName = ref("");
    const onDoctorSelect = (selectedDoctors) => {
        if (selectedDoctors.length > 0) {
            console.log(selectedDoctors[0].fullname)
            payload.value.doctor_code = selectedDoctors[0].code;
            payload.value.refering_Doctor = selectedDoctors[0].fullname;
        }
    };

    const closePFDialog = () => {
        showPFDialog.value = false;
    };
    
    const openConfirmDialog = async () => {
        showDialog.value = true;
    }

    const closeConfirmDialog = () => {
        showDialog.value = false;
    }
    const address_form_dialog = ref(false);
    const handleOpenAddressForm = () => {
        if (props.clicked_option === 'view') return;
        address_form_dialog.value = true;
    };

    const address_form_dialogTo = ref(false);
    const handleOpenAddressFormTo = () => {
        if (props.clicked_option === 'view') return;
        address_form_dialogTo.value = true;
    }

    const fullFromHCIAddress = ref("");
        const handleSubmitAddress = (referred_From_HCI_address) => {
            console.log('FROM HCI ADDRESS : ', referred_From_HCI_address.region_name);
            const { bldgstreet, region_name, province_name, municipality_name, barangay_name, country_name } = referred_From_HCI_address;
            const { region_id, province_id, municipality_id, barangay_id, country_id } = referred_From_HCI_address;

            fullFromHCIAddress.value = [bldgstreet, barangay_name, municipality_name, province_name, region_name, country_name]
                .filter(Boolean)
                .join(', ');
            payload.referred_From_HCI_address = {
                bldgstreet,
                region_id,
                province_id,
                municipality_id,
                barangay_id,
                country_id
            };
            payload.value.FromHCIAddress = fullFromHCIAddress.value;
        };

        const fullToHCIAddress = ref("");
        const handleSubmitAddressTo = (referred_To_HCI_address) => {
            const { bldgstreet, region_name, province_name, municipality_name, barangay_name, country_name } = referred_To_HCI_address;
            const { region_id, province_id, municipality_id, barangay_id, country_id } = referred_To_HCI_address;

            fullToHCIAddress.value = [bldgstreet, barangay_name, municipality_name, province_name, region_name, country_name]
                .filter(Boolean)
                .join(', ');
            payload.referred_To_HCI_address = {
                bldgstreet,
                region_id,
                province_id,
                municipality_id,
                barangay_id,
                country_id
            };
            payload.value.ToHCIAddress = fullToHCIAddress.value;
        };

    const closeAddressForm = () => {
        address_form_dialog.value = false;
    };

    const closeAddressFormTo = () => {
        address_form_dialogTo.value = false;
    }

    const death_types_data = ref([]);
    const death_types_loading = ref(false);
    const getDeathTypes = async () => {
        death_types_loading.value = true;
        const response = await useMethod("get", "get-death-type", "", "");
        if (response) {
            death_types_data.value = response;
            death_types_loading.value = false;
        } 
    };

    const disposition_data = ref([]);
    const disposition_loading = ref(false);
    const getDisposition = async () => {
        disposition_loading.value = true;
        const response = await useMethod("get", "disposition", "", "");
        if (response) {
            disposition_data.value = response;
            disposition_loading.value = false;
        } 
    };

    const patient_status = ref([]);
    const patient_status_loading = ref(false);
    const getPatientStatus = async () => {
        patient_status_loading.value = true;
        const response = await useMethod("get", 'patient-status', "", "");
        if(response) {
            patient_status.value = response;
            payload.value.Status = patient_status.value[0].id;
            patient_status_loading.value = false;
        }
    }

    const erResult_data = ref([]);
    const filteredERData = ref([])
    const erResult_loading = ref(false);
    const getErResult = async () => {
        erResult_loading.value = true;
        try {
            const response = await useMethod("get", "get-er-result", "", "");
            if(response) {
                erResult_data.value = response;
            }
        } catch(error) {
            useSnackbar(true, "red", response.message || 'Failed to fetch er result');
            erResult_loading.value.false;
        }
    }

    const { selectedRowDetails } = storeToRefs(useSubcomponentSelectedRowDetailsStore()); 

    const closeDialog = () => {
        emits('close-dialog');
        emits('patient-registered');
        payload.value = {};
    }

    const CloseAlertMessageDialog = () => {
        show_has_unpaid_message.value = false;
        closeDialog();
    }

    const onSubmit = async () => {
        console.log('MGH Reuest : ', payload.value);
        let response;
        isLoading.value = true;
        try{
            response = await useMethod("put", "tag-patient-maygohome", payload.value, "", payload.value.case_No);
            if(response) {
                emits('patient-registered');
                useSnackbar(true, "green", response.message);
                isLoading.value = false;
                payload.value = {};
                closeConfirmDialog();
                useSubComponents('TagAsMgh', false);
            }
        } catch(error) { 
            isLoading.value = false;   
            useSnackbar(true, "red", response.message || 'Tagged Failed');
        }
    }

    const updateErResult = () => {
        payload.value.Status = patient_status.value[0].id;
        if(parseInt(payload.value.mscDisposition_Id) === 7) {
            payload.value.ERpatient_result = erResult_data.value[1].id
            filteredERData.value = erResult_data.value.filter(item => item.description === 'Died')
        } else {
            filteredERData.value = erResult_data.value.filter(item => item.description !== 'Died')
            if(parseInt(payload.value.mscDisposition_Id) === 2)
                payload.value.ERpatient_result = erResult_data.value[8].id

            else if(parseInt(payload.value.mscDisposition_Id) === 4)
                payload.value.ERpatient_result = erResult_data.value[10].id

            else if(parseInt(payload.value.mscDisposition_Id) === 5)
                payload.value.ERpatient_result = erResult_data.value[3].id

            else if(parseInt(payload.value.mscDisposition_Id) === 8)
                payload.value.ERpatient_result = erResult_data.value[6].id

            else if(parseInt(payload.value.mscDisposition_Id) === 10 )
                payload.value.ERpatient_result = erResult_data.value[5].id

            else 
                payload.value.ERpatient_result = '';
        }
    }

    const show_has_unpaid_message = ref(false);
    watch(
        () => payload.value.mscDisposition_Id,
        async (newValue) => {
            if (newValue === undefined || isNaN(parseInt(newValue))) return;
            updateErResult();
            if (parseInt(newValue) !== 10) {
                hasUnpaidCharges.value = await checkPendingCharges(case_No.value, guarantor_Name.value);
                show_has_unpaid_message.value = hasUnpaidCharges.value;
            } else {
                show_has_unpaid_message.value = false;
            }
        }
    );

    const startLoader = () => {
        clearInterval(interval.value);
        value.value = 0;
        interval.value = setInterval(() => {
            if (value.value === 100) {
                value.value = 0 
            } else {
                value.value += 10
            }
        }, 1000)
    }

    const stopLoader = () => {
        clearInterval(interval.value);
        value.value = 0; 
    };

    const checkPendingCharges = async (case_No, accountType) => {
        check_charges_loading.value = true;
        isProcessed.value = false;
        pageLoader.value = true;
        istagmgh.value = false;
        isLoading.value = true;
        startLoader();
        try {
            const response = await useMethod("get", "patient-billing-charges/", "", case_No);
            if (response) {
                if(parseInt(response.isMayGoHome)) {
                    istagmgh.value = true;
                } else {
                    istagmgh.value = false;
                    const data = Array.isArray(response) ? response : response.data;
                    if (data && Array.isArray(data) && data.length > 0) {
                        check_charges_data.value = data.map(item => ({
                            status: item.recordStatus,
                            ornumber: item.ORNumber,
                            code: item.revenue_Id
                        }));
                        if(accountType === 'Self Pay') {
                            hasUnpaidCharges.value = check_charges_data.value.some(item => 
                                item.status === "X" || 
                                item.status === "27" &&
                                item.ornumber === null
                            );
                        } else {
                            hasUnpaidCharges.value = check_charges_data.value.some(item => 
                                item.code !== 'EM' &&
                                item.code !== 'RS' &&
                                item.status === "X" ||
                                item.status === "27"
                            );
                        }
                    } else {
                        hasUnpaidCharges.value = false;
                    }
                }
            } else {
                hasUnpaidCharges.value = false; 
            }
        } catch (error) {
            hasUnpaidCharges.value = false;
        } finally {
            pageLoader.value = false;
            check_charges_loading.value = false;
            stopLoader();
            isLoading.value = false;
            isProcessed.value = true;
        }
        return hasUnpaidCharges.value;
    };

    onMounted(() => {
        getDisposition();
        getErResult();
        getDeathTypes();
        getPatientStatus();
    });

    onBeforeUnmount(() => {
        stopLoader();
    })

    const isDischarge = ref('');
    const isTagAsMgh = ref('')
    watch(() => selectedRowDetails.value, async (newRow, oldRow) => {
            if (newRow && newRow.id && (!oldRow || newRow.id !== oldRow.id)) {
                payload.value = {
                    ...newRow,
                    name: newRow.lastname && newRow.firstname
                        ? `${newRow.lastname}, ${newRow.firstname} ${newRow.middlename || ''}`
                        : '',
                    patient_Id: newRow.patient_Id || '',
                    suffix_id: parseInt(newRow.suffix_id) || '',
                    case_No: newRow.patient_registry?.[0]?.case_No || '',
                    er_Case_No: parseInt(newRow.patient_registry?.[0]?.er_Case_No) || '',
                    registry_Date: useDateMMDDYYY(newRow.registry_Date) || ''
                };
                case_No.value = newRow.patient_registry?.[0]?.case_No;
                guarantor_Name.value = newRow.patient_registry?.[0]?.guarantor_Name;

                isDischarge.value   = selectedRowDetails.value.patient_registry && selectedRowDetails.value.patient_registry[0].discharged_Date;
                isTagAsMgh.value    = selectedRowDetails.value.patient_registry && selectedRowDetails.value.patient_registry[0].mgh_Datetime;
                console.log('IS DISCHARGE : ', isDischarge.value);
                console.log('IS TAG AS MGH : ', isTagAsMgh.value);
            }
        },
        { immediate: true } 
    );
</script>

<template>
    <v-dialog 
        v-if="isDischarge !== null && isTagAsMgh !== null"
        :model-value="show" 
        rounded="lg" 
        scrollable 
        @update:model-value="closeDialog" 
        max-width="400px"
        >
        <v-card
            color="red"
            >
            <v-card-title
                class="bg-error text-white"
                >
                Alert Message
            </v-card-title>
            <v-card-text>
                <v-alert
                    border="left"
                    dismissible
                    elevation="24"
                    icon="mdi-alert-circle"
                    >
                    <div class="note">
                        <span>Note:</span>
                        <p class="message">Can't Untag May Go Home (MGH) for patients that have been already discharged.</p>
                    </div>
                </v-alert>
            </v-card-text>
            <v-card-actions
                    class="bg-error text-white"
                    elevation="24"
                >
                    <v-spacer></v-spacer>
                    <v-btn 
                        bg-color="primary" text
                        @click="CloseAlertMessageDialog">Close</v-btn>
                </v-card-actions>
        </v-card>
    </v-dialog>
    <v-dialog 
        v-if="isDischarge === null && isTagAsMgh !== null" 
        :model-value="show" 
        rounded="lg" 
        scrollable 
        @update:model-value="closeDialog" 
        max-width="400px">
        <v-card
            color="red"
        >
            <v-card-title
                class="bg-error text-white"
                >
                Alert Message
            </v-card-title>
            <v-card-text>
                <v-alert
                    border="left"
                    dismissible
                    elevation="24"
                    icon="mdi-alert-circle"
                >
                    <div class="note">
                        <span>Note:</span>
                        <p class="message">Can't Tag May Go Home (MGH) for patients that have already been tagged for May Go Home (MGH).</p>
                    </div>
                </v-alert>
            </v-card-text>
            <v-card-actions
                    class="bg-error text-white"
                    elevation="24"
                >
                    <v-spacer></v-spacer>
                    <v-btn 
                        bg-color="primary" text
                        @click="CloseAlertMessageDialog">Close</v-btn>
                </v-card-actions>
        </v-card> 
    </v-dialog>

    <v-dialog 
        :model-value="show" 
        rounded="lg" scrollable 
        @update:model-value="closeDialog" 
        max-width="800px" 
        v-if="isDischarge === null && isTagAsMgh === null"
    >
        <form @submit.prevent="openConfirmDialog">
            <v-card rounded="lg">
                <v-toolbar density="compact" color="#107bac" hide-details>
                    <v-toolbar-title>
                        {{ form_type === 'outpatient' ? 'Outpatient Case May Go Home Tagging' : (form_type === 'emergency' ? 'Emergency Case May Go Home Tagging' : 'Inpatient Case May Go Home Tagging') }} {{ selectedRowDetails.id }}
                    </v-toolbar-title>
                    <v-btn color="white" @click="closeDialog">
                        <v-icon>mdi-close</v-icon>
                    </v-btn>
                </v-toolbar>
                <v-card-text>
                    <div v-if="isLoading">
                        <div class="text-center">
                            <v-progress-circular :model-value="value" :rotate="360" :size="100" :width="15" color="#107bac">
                                <template v-slot:default> {{ value }} % </template>
                            </v-progress-circular><br/>
                            Checking Eligibility for May Go Home...
                        </div>
                    </div>
                    <div v-else>
                        <v-row>
                            <v-col cols="3">
                                <v-text-field
                                    label="MGH Queue No."
                                    v-model="payload.mgh_queue_no"
                                    :value="0"
                                    variant="outlined"
                                    density="compact"
                                    hide-details
                                    readonly
                                ></v-text-field>
                            </v-col>
                            <v-col cols="3">
                                <v-text-field
                                    label="Registry Track No."
                                    v-model="payload.er_Case_No"
                                    variant="outlined"
                                    density="compact"
                                    hide-details
                                    readonly
                                ></v-text-field>
                            </v-col>
                            <v-col cols="3">
                                <v-text-field
                                    :label="form_type === 'outpatient' ? 'Outpatient Case No.' : (form_type === 'emergency' ? 'ER Case No.' : 'Admission No.')"
                                    v-model="payload.case_No"
                                    variant="outlined"
                                    density="compact"
                                    hide-details
                                    readonly
                                ></v-text-field>
                            </v-col>
                            <v-col cols="3">
                                <v-text-field
                                    type="date"
                                    :label="form_type === 'outpatient' ? 'Outpatient Date' : (form_type === 'emergency' ? 'ER Case Date' : 'Admission Date')"
                                    v-model="payload.registry_Date"
                                    variant="outlined"
                                    density="compact"
                                    hide-details
                                    readonly
                                ></v-text-field>
                            </v-col>
                            <v-col :cols="form_type === 'inpatient' ? 3 : 4" class="form-col">
                                <v-text-field
                                    label="Patient ID"
                                    v-model="payload.patient_Id"
                                    variant="outlined"
                                    density="compact"
                                    hide-details
                                    readonly
                                ></v-text-field>
                            </v-col>
                            <v-col :cols="form_type === 'inpatient' ? 3 : 4" class="form-col">
                                <v-text-field
                                    label="Patient Name"
                                    v-model="payload.name"
                                    variant="outlined"
                                    density="compact"
                                    hide-details
                                    readonly
                                ></v-text-field>
                            </v-col>
                            <v-col :cols="form_type === 'inpatient' ? 3 : 4" class="form-col">
                                <v-autocomplete
                                    label="Disposition"
                                    v-model="payload.mscDisposition_Id"
                                    :items="disposition_data"
                                    item-title="description"
                                    item-value="id"
                                    :readonly="clicked_option === 'view'"
                                    :clearable="clicked_option === 'new' || clicked_option === 'edit'"
                                    :rules="fieldRules"
                                    variant="outlined"
                                    density="compact"
                                    hide-details
                                ></v-autocomplete>
                            </v-col>
                            <v-col v-if="form_type === 'inpatient'" cols="3" class="form-col">
                                <v-text-field
                                    label="Room No."
                                    variant="outlined"
                                    density="compact"
                                    hide-details
                                    readonly
                                ></v-text-field>
                            </v-col>
                            <v-col cols="12" class="form-col">
                                <v-autocomplete
                                    label="ER Result"
                                    variant="outlined"
                                    density="compact"
                                    :items="filteredERData"
                                    item-title="description"
                                    item-value="id"
                                    v-model="payload.ERpatient_result"
                                    :readonly="payload.ERpatient_result === 5 || payload.ERpatient_result === 11"
                                    clearable
                                    hide-details
                                ></v-autocomplete>
                            </v-col>
                            <v-col cols="12">
                                <v-card elevation="4" v-if="parseInt(payload.mscDisposition_Id) === 7 || parseInt(payload.ERpatient_result) === 5">
                                    <v-card-text>
                                        <v-list-subheader>Para Legal Indicators</v-list-subheader>
                                        <v-checkbox 
                                            label="Expired / Died in less than 48 hours upon admission" 
                                            density="compact"
                                            v-model="payload.DeathStatus"
                                            hide-details 
                                            :disabled="!enable && parseInt(payload.mscDisposition_Id) !== 7"
                                            :readonly="parseInt(payload.ERpatient_result) !== 5" 
                                        ></v-checkbox>
                                        <v-checkbox 
                                            label="Autopsy procedure is done?" 
                                            density="compact" 
                                            hide-details 
                                            v-model="payload.isAutopsyCompleted"
                                            :disabled="!enable && parseInt(payload.mscDisposition_Id) !== 7"
                                            :readonly="parseInt(payload.ERpatient_result) !== 5" 
                                        ></v-checkbox>
                                    </v-card-text>
                                </v-card>
                            </v-col>
                            <v-col v-if="parseInt(payload.mscDisposition_Id) === 7 || parseInt(payload.ERpatient_result) === 5" cols="6">
                                <v-text-field
                                    type="date"
                                    label="Died Date Time"
                                    v-model="payload.dateOfDate"
                                    variant="outlined"
                                    density="compact"
                                    hide-details
                                ></v-text-field>
                            </v-col>
                            <v-col v-if="parseInt(payload.mscDisposition_Id) === 7 || parseInt(payload.ERpatient_result) === 5" cols="6">
                                <v-autocomplete
                                    label="Type of Death"
                                    item-title="description"
                                    item-value="id"
                                    v-model="payload.typeOfDeath_id"
                                    :disabled="!enabled && parseInt(payload.mscDisposition_Id) !== 7"
                                    :readonly="clicked_option === 'view'"
                                    hide-details
                                    :clearable="clicked_option === 'new' || clicked_option === 'edit'"
                                    :items="death_types_data"
                                    density="compact"
                                    variant="outlined"
                            ></v-autocomplete>
                            </v-col>
                            <v-col cols="6" v-if="parseInt(payload.mscDisposition_Id) === 3">
                                <fieldset class="pa-2 rounded-fieldset">
                                    <legend class="pa-2">Refered From</legend>
                                    <v-col cols="12">
                                        <v-text-field
                                            type="text"
                                            label="Refered From HCI"
                                            variant="outlined"
                                            density="compact"
                                            v-model="payload.refered_Form_HCI"
                                            hide-details
                                        ></v-text-field>
                                    </v-col>
                                    <v-col cols="12">
                                        <v-textarea 
                                            hide-details 
                                            density="compact" 
                                            variant="outlined"
                                            v-model="payload.referred_From_HCI_address"
                                            :disabled="!enabled && parseInt(payload.mscDisposition_Id) !== 3"
                                            :value="!!payload.referred_From_HCI_address ? payload.referred_From_HCI_address : fullFromHCIAddress"
                                            class="cursor-pointer"
                                            readonly
                                            prepend-icon="mdi-plus-box"
                                            @click:prepend="handleOpenAddressForm"
                                        ></v-textarea>
                                    </v-col>
                            
                                    <v-col cols="12">
                                        <v-text-field
                                            type="text"
                                            label="Refered From HCI Code"
                                            variant="outlined"
                                            v-model="payload.refered_From_HCI_code"
                                            density="compact"
                                            hide-details
                                        ></v-text-field>
                                    </v-col>
                                </fieldset>
                            </v-col>
                            <v-col cols="6" v-if="parseInt(payload.mscDisposition_Id) === 3">
                                <fieldset class="pa-2 rounded-fieldset">
                                    <legend class="pa-2">Refered To</legend>
                                    <v-col cols="12">
                                        <v-text-field
                                            type="text"
                                            label="Refered To HCI"
                                            variant="outlined"
                                            v-model="payload.refered_To_HCI"
                                            density="compact"
                                            hide-details
                                        ></v-text-field>
                                    </v-col>
                                    <v-col cols="12">
                                        <v-textarea 
                                            hide-details 
                                            density="compact" 
                                            variant="outlined"
                                            v-model="payload.referred_To_HCI_address"
                                            :disabled="!enabled && parseInt(payload.mscDisposition_Id) !== 3"
                                            :value="!!payload.referred_To_HCI_address ? payload.referred_To_HCI_address : fullToHCIAddress"
                                            readonly
                                            class="cursor-pointer"
                                            prepend-icon="mdi-plus-box"
                                            @click:prepend="handleOpenAddressFormTo"
                                        ></v-textarea>
                                    </v-col>
                                    <v-col cols="12">
                                        <v-text-field
                                            type="text"
                                            label="Refered To HCI Code"
                                            variant="outlined"
                                            v-model="payload.refered_To_HCI_code"
                                            density="compact"
                                            hide-details
                                        ></v-text-field>
                                    </v-col>
                                </fieldset>
                            </v-col>
                            <v-col cols="12" v-if="parseInt(payload.mscDisposition_Id) === 3">
                                <v-text-field
                                    type="text"
                                    label="Refering Doctors"
                                    variant="outlined"
                                    v-model="payload.refering_Doctor"
                                    :value="!!payload.refering_Doctor ? payload.refering_Doctor : doctorsName"
                                    density="compact"
                                    hide-details
                                    class="cursor-pointer"
                                    readonly
                                    prepend-icon="mdi-plus-box"
                                    @click.prevent="handleDoctorsList"
                                ></v-text-field>
                            </v-col>
                            <v-col cols="12" v-if="parseInt(payload.mscDisposition_Id) === 3">
                                <v-textarea
                                    label="Reason For Referal"
                                    v-model="payload.referal_Reason"
                                    variant="outlined"
                                    density="compact"
                                    hide-details
                                ></v-textarea>
                            </v-col>
                            <v-col cols="6" class="form-col" v-if="form_type === 'inpatient'">
                                <v-autocomplete
                                    label="Type of Delivery"
                                    variant="outlined"
                                    density="compact"
                                    readonly
                                    hide-details
                                ></v-autocomplete>
                            </v-col>
                            <v-col cols="6" class="form-col" v-if="form_type === 'inpatient'">
                                <v-autocomplete
                                    label="Indication for CS"
                                    variant="outlined"
                                    density="compact"
                                    readonly
                                    hide-details
                                ></v-autocomplete>
                            </v-col>
                            <v-col cols="12" class="form-col">
                                <v-textarea
                                    label="Initial Impression"
                                    v-model="payload.initial_impression"
                                    variant="outlined"
                                    density="compact"
                                    hide-details
                                ></v-textarea>
                            </v-col>
                            <v-col cols="12" class="form-col">
                                <v-autocomplete
                                    label="Patient Status"
                                    :items="patient_status"
                                    item-title="description"
                                    item-value="id"
                                    v-model="payload.Status"
                                    variant="outlined"
                                    density="compact"
                                    hide-details
                                ></v-autocomplete>
                            </v-col>
                            <v-col cols="12" class="form-col">
                                <v-textarea
                                    label="Discharge Diagnosis"
                                    v-model="payload.discharge_diagnosis"
                                    variant="outlined"
                                    density="compact"
                                    hide-details
                                ></v-textarea>
                            </v-col>
                        </v-row>
                    </div>
                </v-card-text>
                <v-divider></v-divider>
                <v-card-actions>
                    <v-btn color="blue-darken-1 border border-info" @click="closeDialog"> Close </v-btn>
                    <v-spacer></v-spacer>
                    <v-btn class="bg-primary text-white" type="submit">Save</v-btn>
                </v-card-actions>
            </v-card>
        </form>
    </v-dialog>

    <v-dialog 
        :model-value="show_has_unpaid_message" 
        persistent 
        max-width="400"
        >
        <v-card
            color="red"
        >
            <v-card-title
                class="bg-error text-white"
            >
            Alert Message
            </v-card-title>
            <v-card-text>
                <v-alert
                    dismissible
                    elevation="24"
                    icon="mdi-alert-circle"
                >
                    <div class="note">
                        <span>Note:</span>
                        <p>
                            You can't send discharge order at this time. There are still pending requests.
                            Please cancel pending requests first or notify concered cost
                            centers to process requests for this patient.
                        </p>
                    </div>
                </v-alert>
            </v-card-text>
            <v-card-actions
                class="bg-error text-white"
                elevation="24"
            >
                <v-spacer></v-spacer>
                <v-btn 
                    bg-color="primary" text
                    @click="CloseAlertMessageDialog">Close</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>

    <v-dialog 
        :model-value="show_istag_as_mgh_message" 
        persistent 
        max-width="400"
        >
        <v-card
            color="red"
        >
            <v-card-title
                class="bg-error text-white"
            >
            Alert Message
            </v-card-title>
            <v-card-text>
                <v-alert
                    border="left"
                    color="red"
                    dismissible
                    elevation="24"
                    icon="mdi-alert-circle"
                >
                <div class="note">
                    <span>Note:</span>
                    <p>
                        This patient has already been tagged for MayGoHome or may already have a discharge order. Thank you.
                    </p>
                </div>
                </v-alert>
            </v-card-text>
            <v-card-actions
                class="bg-error text-white"
                elevation="24"
            >
                <v-spacer></v-spacer>
                <v-btn 
                    bg-color="primary" text
                    @click="CloseAlertMessageDialog">Close</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
    
    <e-r-address-details-form 
        :address_form_dialog="address_form_dialog" 
        :payload="payload" 
        @close-dialog="closeAddressForm"
        @handle-submit="handleSubmitAddress" 
    />

    <e-r-address-details-form 
        :address_form_dialog="address_form_dialogTo" 
        :payload="payload" 
        @close-dialog="closeAddressFormTo" 
        @handle-submit="handleSubmitAddressTo"
    />

    <Select-Doctor
        :open_select_doctor="showPFDialog"
        :payload="payload"
        @close-dialog="closePFDialog"
        @handle-select="onDoctorSelect"
    />

    <p-f-list
        :open_professionals_list="open_professionals_list"
        @handle-select="handleSelectedProfessionalFee"
        @close-dialog="closeProfessionalsList"
    />
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
        margin-top: -16px !important;
    }
    .fieldset-title {
        font-weight: bold;
        text-transform: uppercase;
        border-bottom: 1px solid #ccc;
        padding-bottom: 8px;
        margin-bottom: 16px;
    }
    .truncate-text .v-input__control {
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
    }

    .truncate-text .v-field__input {
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        max-height: 32px;
    }

    .text-muted {
        color: #6c757d;
        opacity: 0.7; 
    }
    .rounded-fieldset {
        padding: 16px;
        border-radius: 8px;
        border: 1px solid #c0c0c0;
    }
    .v-progress-circular {
        margin: 1rem;
    }
    .info-icon {
        font-size: 50px !important;
    }
    /* .alert-text {
        padding: 10px !important;
        color: #F44336 !important;
    } */

    .note {
        padding: 20 0px !important;
    }
    .note span {
        font-size: 20px;
        color: #000;
        font-weight: bold;
        font-style: italic;
    }
</style>