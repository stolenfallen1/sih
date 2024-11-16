<script setup>
    import { defineProps, defineEmits, onMounted } from 'vue';
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
    });

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
    const hasUnpaidCharges = ref(false);
    const patientAccount = ref('');
    const isProcessed = ref(false);
    const pageLoader = ref(false);
    const value = ref(0)
    const interval = ref(null)


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
        isProcessed.value = false;
    };
    const openConfirmDialog = async () => {
        isProcessed.value = false; 
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
            patient_status_loading.value = false;
        }
    }

    const erResult_data = ref([]);
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

    const emits = defineEmits(['close-dialog']);
    const { selectedRowDetails } = storeToRefs(useSubcomponentSelectedRowDetailsStore()); 

    const closeDialog = () => {
        emits('close-dialog');
    }

    const onSubmit = async () => {
        console.log('MGH Reuest : ', payload.value);
        let response;
        isLoading.value = true;
        try{
            
            response = await useMethod("put", "tag-patient-maygohome", payload.value, "", payload.value.case_No);
            if(response) {
                useSnackbar(true, "green", response.message);
                isLoading.value = false;
                payload.value = {};
                closeConfirmDialog();
                useSubComponents('TagAsMgh', false)
            }
        } catch(error) { 
            isLoading.value = false;   
            useSnackbar(true, "red", response.message || 'Tagged Failed');
        }
    }

    const updateErResult = () => {
        if(parseInt(payload.value.mscDisposition_Id) === 7) {
            payload.value.ERpatient_result = erResult_data.value[1].id
        } else {
            payload.value.ERpatient_result = '';
        }
    }

    watch(() => payload.value.mscDisposition_Id, (newVal, oldVal) => {
        if (newVal !== oldVal) {
            updateErResult()
        }
    });

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

    
    const checkPendingCharges = async (case_No) => {

        check_charges_loading.value = true;
        isProcessed.value = false;
        pageLoader.value = true;
        startLoader();

        try {
            const response = await useMethod("get", "patient-billing-charges/", "", case_No);
            if (response) {
                const data = Array.isArray(response) ? response : response.data;
                if (data && Array.isArray(data) && data.length > 0) {
                    check_charges_data.value = data.map(item => ({
                        status: item.recordStatus,
                        ornumber: item.ORNumber
                    }));
                    hasUnpaidCharges.value = check_charges_data.value.some(item => 
                        item.status === "X" || 
                        item.status === "27" || 
                        item.ornumber === null
                    );
                } else {
                    hasUnpaidCharges.value = false;
                }
            } else {
                hasUnpaidCharges.value = false; 
            }
        } catch (error) {
            console.error("Error fetching charges data:", error);
            hasUnpaidCharges.value = false;
        } finally {
            pageLoader.value = false;
            check_charges_loading.value = false;
            stopLoader();
            isProcessed.value = true;
        }
        return hasUnpaidCharges.value;
    };

    onMounted(() => {
        getDisposition();
        getErResult();
        getDeathTypes();
        getPatientStatus();
        startLoader()
    });

    onBeforeUnmount(() => {
        stopLoader();
    })

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
                await checkPendingCharges(newRow.patient_registry?.[0]?.case_No);
            }
        },
        { immediate: true } 
    );


    // onUpdated(() => {
    //     if (selectedRowDetails.value && selectedRowDetails.value.id) {
    //         if (payload.value.id !== selectedRowDetails.value.id) { 
    //             payload.value                   = Object.assign({}, selectedRowDetails.value);
    //             payload.value.name              = (selectedRowDetails.value.lastname &&
    //                                                 selectedRowDetails.value.firstname
    //                                             ) 
    //                                             ? selectedRowDetails.value.lastname + ', ' + selectedRowDetails.value.firstname + ' ' + selectedRowDetails.value.middlename 
    //                                             : '';
    //             payload.value.patient_Id        = selectedRowDetails.value.patient_Id ? selectedRowDetails.value.patient_Id : '';
    //             payload.value.suffix_id         = parseInt(selectedRowDetails.value.suffix_id) ? parseInt(selectedRowDetails.value.suffix_id) : '';
    //             payload.value.case_No           = selectedRowDetails.value.patient_registry && selectedRowDetails.value.patient_registry[0].case_No ? selectedRowDetails.value.patient_registry[0].case_No : '';
    //             payload.value.er_Case_No        = selectedRowDetails.value.patient_registry && parseInt(selectedRowDetails.value.patient_registry[0].er_Case_No) ? parseInt(selectedRowDetails.value.patient_registry[0].er_Case_No) : '';
    //             payload.value.registry_Date     = useDateMMDDYYY(selectedRowDetails.value.registry_Date) ? useDateMMDDYYY(selectedRowDetails.value.registry_Date) : '';
    //             patientAccount.value            = selectedRowDetails.value.patient_registry && selectedRowDetails.value.patient_registry[0].guarantor_Name ? selectedRowDetails.value.patient_registry[0].guarantor_Name : '';
                
    //             if(patientAccount) {
    //                 pageLoader.value = true;
    //                 startLoder();
    //                 setTimeout(async () => {
    //                     await checkPendingCharges(selectedRowDetails.value.patient_registry[0].case_No);
    //                     pageLoader.value = false;
    //                     isProcessed.value = true;
    //                 }, 1000)
    //             } 
    //         }
    //     } 
    // })

</script>

<template>
    <div v-if="isProcessed">
        <div v-if="!hasUnpaidCharges">
            <v-dialog 
                :model-value="show" 
                rounded="lg" scrollable 
                @update:model-value="closeDialog" 
                :style="{maxWidth: isProcessed ? '800px' : '500px'}" 
                v-if="show"
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
                                    :items="erResult_data"
                                    item-title="description"
                                    item-value="id"
                                    v-model="payload.ERpatient_result"
                                    :readonly="payload.ERpatient_result === 5"
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
                                    v-model="payload.patient_status"
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
        </div>
        <div v-if="hasUnpaidCharges">
            <v-dialog 
                :model-value="show" 
                rounded="lg" scrollable 
                @update:model-value="closeDialog" 
                :style="{maxWidth: isProcessed ? '800px' : '500px'}" 
                v-if="show"
                >
                <v-card>
                    <v-card-title>
                        <h3>Notification</h3>
                    </v-card-title>
                    <v-card-text>
                        <v-row>
                            <v-col cols="1">
                                <v-icon
                                    color="#107bac"
                                    class="info-icon pa-4"
                                >mdi-information-outline</v-icon>
                            </v-col>
                            <v-col cols="11">
                                <h5 class="alert-text">
                                    You can't send discharge order at this time. There are still pending requests.<br/>
                                    Please cancel pending requests first or notify concered cost<br/>
                                    centers to process requests for this patient.
                                </h5>
                            </v-col>
                        </v-row>
                    </v-card-text>
                    <v-divider></v-divider>
                    <v-card-actions>
                        <v-btn color="blue-darken-1 border border-info" @click="closeDialog"> Close </v-btn>
                    </v-card-actions>
                </v-card>
            </v-dialog>
        </div>
    </div>
    <div v-else>
        <v-dialog 
            :model-value="show" 
            rounded="lg" scrollable 
            @update:model-value="closeDialog" 
            :style="{maxWidth: isProcessed ? '800px' : '500px'}" 
            v-if="show"
            >
            <v-card size="small" color="transparent">
                <v-card-text>
                    <div class="text-center">
                        <v-progress-circular :model-value="value" :rotate="360" :size="100" :width="15" color="#107bac">
                            <template v-slot:default> {{ value }} % </template>
                        </v-progress-circular><br/>
                        Checking Eligibility for May Go Home...
                    </div>
                </v-card-text>
            </v-card>
        </v-dialog>
    </div>

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
    .alert-text {
        padding: 10px !important;
        color: #F44336 !important;
    }
</style>