<template>
    <v-card class="mb-4">
        <v-card-text>
            <v-row class="py-2">
                <v-col cols="6">
                    <fieldset class="pa-3 rounded-fieldset">
                        <legend class="pa-2">Registry Source & Plan</legend>
                        <v-row>
                            <v-col cols="5">
                                <v-list-subheader class="form-header">Source</v-list-subheader>
                            </v-col>
                            <v-col>
                                <v-autocomplete
                                    variant="outlined"
                                    :items="register_source_data"
                                    item-title="description"
                                    item-value="id"
                                    v-model="payload.register_Source"
                                    hide-details
                                    density="compact"
                                ></v-autocomplete>
                            </v-col>
                        </v-row>
                        <v-row>
                            <v-col cols="5">
                                <v-list-subheader class="form-header">Case Type <span style="color: red;" class="mdi mdi-check"></span></v-list-subheader>
                            </v-col>
                            <v-col>
                                <v-autocomplete
                                    ref="register_Casetype"
                                    :items="register_casetype_data"
                                    item-title="description"
                                    item-value="id"
                                    v-model="payload.register_Casetype"
                                    :readonly="clicked_option === 'view'"
                                    :clearable="clicked_option === 'new' || clicked_option === 'edit'"
                                    density="compact"
                                    variant="outlined"
                                    :error-messages="formErrors.register_Casetype ? [formErrors.register_Casetype] : []"
                                    hide-details
                                ></v-autocomplete>
                            </v-col>
                        </v-row>
                        <v-row>
                            <v-col cols="5">
                                <v-list-subheader class="form-header">Trans Type<span style="color: red;" class="mdi mdi-check"></span></v-list-subheader>
                            </v-col>
                            <v-col>
                                <v-autocomplete
                                    ref="mscAccount_Trans_Types"
                                    :items="transaction_type_data"
                                    item-title="description"
                                    item-value="id"
                                    v-model="payload.mscAccount_Trans_Types"
                                    :readonly="clicked_option === 'view'"
                                    :clearable="clicked_option === 'new' || clicked_option === 'edit'"
                                    density="compact"
                                    variant="outlined"
                                    :error-messages="formErrors.mscAccount_Trans_Types ? [formErrors.mscAccount_Trans_Types] : []"
                                    hide-details
                                ></v-autocomplete>
                            </v-col>
                        </v-row>
                        <v-row>
                            <v-col cols="5">
                                <v-list-subheader class="form-header">Hosp Plan <span style="color: red;" class="mdi mdi-check"></span></v-list-subheader>
                            </v-col>
                            <v-col>
                                <v-autocomplete
                                    ref="mscAccount_Type"
                                    :items="hospitalization_plan_data"
                                    item-title="description"
                                    item-value="id"
                                    v-model="payload.mscAccount_Type"
                                    :readonly="clicked_option === 'view'"
                                    :clearable="clicked_option === 'new' || clicked_option === 'edit'"
                                    :error-messages="formErrors.mscAccount_Type ? [formErrors.mscAccount_Type] : []"
                                    hide-details
                                    density="compact"
                                    variant="outlined"
                                    @update:model-value="handleHospitalizationPlan"
                                ></v-autocomplete>
                            </v-col>
                        </v-row>
                        <v-row>
                            <v-col cols="5">
                                <v-list-subheader class="form-header">Price Group <span style="color: red;" class="mdi mdi-check"></span></v-list-subheader>
                            </v-col>
                            <v-col>
                                <v-autocomplete
                                    ref="mscPrice_Groups"
                                    :items="price_group_data"
                                    item-title="description"
                                    item-value="id"
                                    v-model="payload.mscPrice_Groups"
                                    :error-messages="formErrors.mscPrice_Groups ? [formErrors.mscPrice_Groups] : []"
                                    hide-details
                                    density="compact"
                                    readonly
                                    variant="outlined"
                                ></v-autocomplete>
                            </v-col>
                        </v-row>
                        <v-row>
                            <v-col cols="5">
                                <v-list-subheader class="form-header">Price Scheme <span style="color: red;" class="mdi mdi-check"></span></v-list-subheader>
                            </v-col>
                            <v-col>
                                <v-autocomplete
                                    ref="mscPrice_Schemes"
                                    :items="price_scheme_data"
                                    item-title="description"
                                    item-value="id"
                                    v-model="payload.mscPrice_Schemes"
                                    :disabled="clicked_option === 'view'"
                                    :error-messages="formErrors.mscPrice_Schemes ? [formErrors.mscPrice_Schemes] : []"
                                    hide-details
                                    readonly
                                    density="compact"
                                    variant="outlined"
                                ></v-autocomplete>
                            </v-col>
                        </v-row>
                    </fieldset>
                </v-col>
                <v-col cols="6">
                        <fieldset class="pa-3 rounded-fieldset">
                            <legend class="pa-2">Admission & Service</legend>
                            <v-row>
                                <v-col cols="5">
                                    <v-list-subheader class="form-header">Admission Date<span style="color: red;" class="mdi mdi-check"></span></v-list-subheader>
                                </v-col>
                                <v-col>
                                    <v-text-field
                                        ref="registry_date"
                                        variant="outlined"
                                        v-model="payload.registry_Date"
                                        :readonly="clicked_option === 'view'"
                                        type="date"
                                        :error-messages="formErrors.registry_Date ? [formErrors.registry_Date] : []"
                                        hide-details
                                        density="compact"
                                    ></v-text-field>
                                </v-col>
                            </v-row>
                            <v-row>
                                <v-col cols="5">
                                    <v-list-subheader class="form-header">Brought By</v-list-subheader>
                                </v-col>
                                <v-col>
                                    <v-autocomplete
                                        ref="mscBroughtBy_Relationship_Id"
                                        v-model="payload.mscBroughtBy_Relationship_Id"
                                        :items="patient_brought_by"
                                        item-title="description"
                                        item-value="id"
                                        :readonly="clicked_option === 'view'"
                                        :clearable="clicked_option === 'new' || clicked_option === 'edit'"
                                        variant="outlined"
                                        density="compact"
                                        hide-details
                                        :error-messages="formErrors.mscBroughtBy_Relationship_Id ? [formErrors.mscBroughtBy_Relationship_Id] : []"
                                    ></v-autocomplete>
                                </v-col>
                            </v-row>
                            <v-row>
                                <v-col cols="5">
                                    <v-list-subheader class="form-header">Service Type </v-list-subheader>
                                </v-col>
                                <v-col>
                                    <v-autocomplete
                                        ref="mscService_Type"
                                        :items="service_type_data"
                                        item-title="description"
                                        item-value="id"
                                        variant="outlined"
                                        v-model="payload.mscService_Type"
                                        :readonly="clicked_option === 'view'"
                                        hide-details
                                        density="compact"
                                        :error-messages="formErrors.mscService_Type ? [formErrors.mscService_Type] : []"
                                    ></v-autocomplete>
                                </v-col>
                            </v-row>
                            <v-row>
                                <v-col cols="5">
                                    <v-list-subheader class="form-header">Medical Package </v-list-subheader>
                                </v-col>
                                <v-col>
                                    <v-text-field
                                        v-model="payload.medical_Package_Id"
                                        :value="payload.medical_Package_Name"
                                        prepend-icon="mdi-plus-box"
                                        @click:prepend="openMedicalPackageList"
                                        readonly
                                        class="cursor-pointer"
                                        density="compact"
                                        variant="outlined"
                                        hide-details
                                    ></v-text-field>
                                </v-col>
                            </v-row>
                            <v-row>
                                <v-col cols="5">
                                    <v-list-subheader class="form-header">Select Room </v-list-subheader>
                                </v-col>
                                <v-col>
                                    <v-text-field
                                        v-model="payload.room_Id"
                                        prepend-icon="mdi-plus-box"
                                        @click:prepend="openHandleRoomList"
                                        readonly
                                        class="cursor-pointer"
                                        density="compact"
                                        variant="outlined"
                                        hide-details
                                    ></v-text-field>
                                </v-col>
                            </v-row>
                            <v-row>
                                <v-col cols="5">
                                    <v-list-subheader class="form-header">Room Rate</v-list-subheader>
                                </v-col>
                                <v-col>
                                    <v-text-field
                                        v-model="payload.room_Rate"
                                        readonly
                                        class="cursor-pointer"
                                        density="compact"
                                        variant="outlined"
                                    ></v-text-field>
                                </v-col>
                            </v-row>
                        </fieldset>
                </v-col>
            </v-row>
            <v-row class="p-2">
                <v-col cols="6">
                    <fieldset class="pa-3 rounded-fieldset">
                        <legend class="pa-2">Registry Death Info</legend>
                        <v-row>
                            <v-col cols="12">
                                <v-checkbox 
                                    label="Dead on Arrival?" 
                                    v-model="payload.dead_on_arrival" 
                                    color="primary" 
                                    :readonly="clicked_option === 'view'" 
                                    hide-details 
                                    density="compact"
                                ></v-checkbox>
                            </v-col>
                        </v-row>
                        <v-row>
                            <v-col cols="4">
                                <v-list-subheader :class="{'text-muted' : !payload.dead_on_arrival, 'form-header': true}">Date of Death</v-list-subheader>
                            </v-col>
                            <v-col>
                                <v-text-field
                                        variant="outlined"
                                        v-model="payload.dateOfDeath"
                                        :disabled="!payload.dead_on_arrival"
                                        :readonly="clicked_option === 'view'"
                                        type="date"
                                        hide-details
                                        density="compact"
                                    ></v-text-field>
                            </v-col>
                        </v-row>
                        <v-row>
                            <v-col cols="4">
                                <v-list-subheader :class="{'text-muted' : !payload.dead_on_arrival, 'form-header': true}">Time of Death</v-list-subheader>
                            </v-col>
                            <v-col>
                                <v-text-field
                                    variant="outlined"
                                    v-model="payload.timeOfDeath"
                                    :disabled="!payload.dead_on_arrival"
                                    :readonly="clicked_option === 'view'"
                                    type="time"
                                    density="compact"
                                    hide-details
                                ></v-text-field>
                            </v-col>
                        </v-row>
                        <v-row>
                            <v-col cols="4">
                                <v-list-subheader :class="{'text-muted' : !payload.dead_on_arrival, 'form-header': true}">Type of Death</v-list-subheader>
                            </v-col>
                            <v-col>
                                <v-autocomplete
                                    item-title="description"
                                    item-value="id"
                                    placeholder="Choose Type of Death"
                                    v-model="payload.typeOfDeath_id"
                                    :disabled="!payload.dead_on_arrival"
                                    :readonly="clicked_option === 'view'"
                                    hide-details
                                    :clearable="clicked_option === 'new' || clicked_option === 'edit'"
                                    :items="death_types_data"
                                    density="compact"
                                    variant="outlined"
                                ></v-autocomplete>
                            </v-col>
                        </v-row>
                    </fieldset>
                </v-col>
                <v-col cols="6">
                    <fieldset class="pa-3 rounded-fieldset">
                        <legend class="pa-2">Registry Other Info</legend>
                        <v-row>
                            <v-col cols="5">
                                <v-list-subheader class="form-header">Patient Identifier</v-list-subheader>
                            </v-col>
                            <v-col>
                                <v-autocomplete
                                    v-model="payload.patientIdentifier"
                                    :items="patientIdentifiers"
                                    item-title="name"
                                    item-value="id"
                                    :readonly="clicked_option === 'view'"
                                    :clearable="clicked_option === 'new' || clicked_option === 'edit'"
                                    variant="outlined"
                                    density="compact"
                                    hide-details
                                ></v-autocomplete>
                            </v-col>
                        </v-row>
                        <v-row>
                            <v-col cols="5">
                                <v-list-subheader class="form-header">Patient Diet </v-list-subheader>
                            </v-col>
                            <v-col>
                                <v-text-field
                                    v-model="payload.mscDiet_Meal_Id"
                                    readonly
                                    class="cursor-pointer"
                                    density="compact"
                                    variant="outlined"
                                    hide-details
                                ></v-text-field>
                            </v-col>
                        </v-row>
                        <v-row>
                            <v-col cols="5">
                                <v-list-subheader class="form-header">Case Indicator </v-list-subheader>
                            </v-col>
                            <v-col>
                                <v-autocomplete
                                    :items="case_indicator_data"
                                    item-title="description"
                                    item-value="id"
                                    v-model="payload.mscCase_Indicators_Id"
                                    :readonly="clicked_option === 'view'"
                                    :clearable="clicked_option === 'new' || clicked_option === 'edit'"
                                    density="compact"
                                    variant="outlined"
                                ></v-autocomplete>
                            </v-col>
                        </v-row>
                    </fieldset>
                </v-col>
            </v-row>
        </v-card-text>
    </v-card>
    <v-card>
        <v-card-text>
            <v-row class="py-2">
                <v-col cols="6">
                    <v-col cols="12" class="form-col">
                        <v-checkbox-btn
                            label="Referred from another hospital?"
                            v-model="enabled"
                            class="pe-2"
                            size="large"
                            color="primary"
                        ></v-checkbox-btn>
                    </v-col>
                </v-col>
                <v-col cols="6">
                    <v-row>
                        <v-col cols="4">
                            <v-list-subheader class="form-header">Dispostion:</v-list-subheader>
                        </v-col>
                        <v-col>
                            <v-autocomplete
                                v-model="payload.mscDisposition_Id"
                                :items="disposition_data"
                                item-title="description"
                                item-value="id"
                                :readonly="clicked_option === 'view'"
                                :clearable="clicked_option === 'new' || clicked_option === 'edit'"
                                :disabled="enabled"
                                variant="outlined"
                                density="compact"
                                hide-details
                            ></v-autocomplete>
                        </v-col>
                    </v-row>
                </v-col>
            </v-row>
            <v-divider class="py-2"></v-divider>
            <v-row class="py-2">
                <v-col cols="6">
                    <fieldset class="pa-3 rounded-fieldset">
                        <legend class="pa-2"> {{ fieldsetLabel }} From HCI Details </legend>
                        <v-row>
                            <v-col cols="4">
                                <v-list-subheader :class="{'text-muted': !enabled && parseInt(payload.mscDisposition_Id) !== 3, 'form-header': true}">Name</v-list-subheader>
                            </v-col>
                            <v-col>
                                <v-text-field
                                    v-model="payload.referred_From_HCI"
                                    :readonly="clicked_option === 'view'"
                                    :clearable="clicked_option === 'new' || clicked_option === 'edit'"
                                    :disabled="!enabled && parseInt(payload.mscDisposition_Id) !== 3"
                                    variant="outlined"
                                    density="compact"
                                    hide-details
                                ></v-text-field>
                            </v-col>
                        </v-row>
                        <v-row>
                            <v-col cols="4">
                                <v-list-subheader :class="{'text-muted': !enabled && parseInt(payload.mscDisposition_Id) !== 3, 'form-header': true}">Code</v-list-subheader>
                            </v-col>
                            <v-col>
                                <v-text-field
                                    v-model="payload.referred_From_HCI_code"
                                    :readonly="clicked_option === 'view'"
                                    :clearable="clicked_option === 'new' || clicked_option === 'edit'"
                                    :disabled="!enabled && parseInt(payload.mscDisposition_Id) !== 3"
                                    variant="outlined"
                                    density="compact"
                                    hide-details
                                ></v-text-field>
                            </v-col>
                        </v-row>
                        <v-row>
                            <v-col cols="4">
                                <v-list-subheader :class="{'text-muted': !enabled && parseInt(payload.mscDisposition_Id) !== 3, 'form-header': true}">Address</v-list-subheader>
                            </v-col>
                            <v-col>
                                <v-textarea 
                                    hide-details 
                                    density="compact" 
                                    variant="outlined"
                                    v-model="payload.FromHCIAddress"
                                    :disabled="!enabled && parseInt(payload.mscDisposition_Id) !== 3"
                                    class="cursor-pointer"
                                    readonly
                                    prepend-icon="mdi-plus-box"
                                    @click:prepend="handleOpenAddressForm"
                                ></v-textarea>
                            </v-col>
                        </v-row>
                    </fieldset>
                </v-col>
                <v-col cols="6">
                    <fieldset class="pa-3 rounded-fieldset">
                        <legend class="pa-2"> {{ fieldsetLabel }} To HCI Details</legend>
                        <v-row>
                            <v-col cols="4">
                                <v-list-subheader :class="{'text-muted': !enabled && parseInt(payload.mscDisposition_Id) !== 3, 'form-header': true}">Name</v-list-subheader>
                            </v-col>
                            <v-col>
                                <v-text-field
                                    v-model="payload.referred_To_HCI"
                                    :readonly="clicked_option === 'view'"
                                    :clearable="clicked_option === 'new' || clicked_option === 'edit'"
                                    :disabled="!enabled && parseInt(payload.mscDisposition_Id) !== 3"
                                    variant="outlined"
                                    density="compact"
                                    hide-details
                                ></v-text-field>
                            </v-col>
                        </v-row>
                        <v-row>
                            <v-col cols="4">
                                <v-list-subheader :class="{'text-muted': !enabled && parseInt(payload.mscDisposition_Id) !== 3, 'form-header': true}">Code</v-list-subheader>
                            </v-col>
                            <v-col>
                                <v-text-field
                                    v-model="payload.referred_To_HCI_code"
                                    :readonly="clicked_option === 'view'"
                                    :clearable="clicked_option === 'new' || clicked_option === 'edit'"
                                    :disabled="!enabled && parseInt(payload.mscDisposition_Id) !== 3"
                                    variant="outlined"
                                    density="compact"
                                    hide-details
                                ></v-text-field>
                            </v-col>
                        </v-row>
                        <v-row>
                            <v-col cols="4">
                                <v-list-subheader :class="{'text-muted': !enabled && parseInt(payload.mscDisposition_Id) !== 3, 'form-header': true}">Address</v-list-subheader>
                            </v-col>
                            <v-col>
                                <v-textarea 
                                    hide-details 
                                    density="compact" 
                                    variant="outlined"
                                    v-model="payload.ToHCIAddress"
                                    :disabled="!enabled && parseInt(payload.mscDisposition_Id) !== 3"
                                    readonly
                                    class="cursor-pointer"
                                    prepend-icon="mdi-plus-box"
                                    @click:prepend="handleOpenAddressFormTo"
                                ></v-textarea>
                            </v-col>
                        </v-row>
                    </fieldset>
                </v-col>
            </v-row>
            <v-row class="py-2 px-4">
                <v-col cols="6">
                    <v-row>
                        <v-col cols="4" class="form-col">
                            <v-list-subheader :class="{'text-muted': !enabled && parseInt(payload.mscDisposition_Id) !== 3, 'form-header': true}">Refering Doctor</v-list-subheader>
                        </v-col>
                        <v-col>
                            <v-text-field
                                v-model="payload.referring_Doctor"
                                :value="!!payload.refering_Doctor ? payload.refering_Doctor : doctorsName"
                                :readonly="clicked_option === 'view'"
                                :clearable="clicked_option === 'new' || clicked_option === 'edit'"
                                :disabled="parseInt(payload.mscDisposition_Id) !== 3 && !enabled"
                                variant="outlined"
                                density="compact"
                                hide-details
                                @click.prevent="handleDoctorsList"
                            ></v-text-field>
                        </v-col>
                    </v-row>
                </v-col>
                <v-col cols="6">
                    <v-row>
                        <v-col cols="5">
                            <v-list-subheader :class="{'text-muted': !enabled && parseInt(payload.mscDisposition_Id) !== 3, 'form-header': true}">Reason for Referal</v-list-subheader>
                        </v-col>
                        <v-col>
                            <v-textarea
                                v-model="payload.referral_Reason"
                                :readonly="clicked_option === 'view'"
                                :clearable="clicked_option === 'new' || clicked_option === 'edit'"
                                :disabled="parseInt(payload.mscDisposition_Id) !== 3 && !enabled"
                                variant="outlined"
                                hide-details
                            ></v-textarea>
                        </v-col>
                    </v-row>
                </v-col>
            </v-row>
        </v-card-text>
    </v-card>

    <i-p-d-room-list :open_room_list="open_room_list" @close-dialog="closeRoomList" @handle-select="handleSelectRoom" />
    <i-p-d-medical-package-list :open_medical_package_list="open_medical_package_list" @close-dialog="closeMedicalPackageList" @handle-select="handleSelectPackage" />
    <i-p-d-address-details-form :address_form_dialog="address_form_dialog" :payload="payload" @close-dialog="closeAddressForm" @handle-submit="handleSubmitAddress" />
    <i-p-d-address-details-form :address_form_dialog="address_form_dialogTo" :payload="payload" @close-dialog="closeAddressFormTo" @handle-submit="handleSubmitAddressTo" />
    <Select-Doctor :open_select_doctor="showPFDialog" :payload="payload" @close-dialog="closePFDialog" @handle-select="onDoctorSelect"
    />
    
</template>

<script setup>

    import { useloadPatientDataStore } from '~/store/LoadFormData';
    const patientDataStore = useloadPatientDataStore();

    const props = defineProps({
        payload: {
            type: Object,
            required: true,
            default: () => ({})
        },
        form_type: {
            type: String,
            required: true,
            default: () => ''
        },
        clicked_option: {
            type: String,
            default: () => ''
        },
        formErrors: {
            type: Object,
            default: () => ({})
        },
    });

    const emits = defineEmits(['hospitalization-plan']);
    let referring_hci_code = ref([]);
    const address_form_dialog = ref(false);
    const address_form_dialogTo = ref(false);
    const showPFDialog = ref(false);
    const open_discount_scheme_table = ref(false);
    const open_referring_hci_code_table = ref(false);
    const open_referring_hci_address_form = ref(false);
    const open_diet_desc = ref(false);
    const open_room_list = ref(false);
    const open_medical_package_list = ref(false);
    const enabled = ref(false);
    const fieldsetLabel = ref('');
    const value = ref(0)
    const interval = ref(null)

    const startLoader = () => {
        emits('toggle-loader', true);
        clearInterval(interval.value);
        value.value = 0;
        interval.value = setInterval(() => {
            if (value.value === 100) {
                value.value = 0 
            } else {
                value.value += 10
            }
            emits('update-progress', value.value);
        }, 1000)
    }

    const stopLoader = () => {
        emits('toggle-loader', false);
        clearInterval(interval.value);
        value.value = 0; 
        emits('update-progress', value.value);
    }

    const handleOpenAddressForm = () => {
        if (props.clicked_option === 'view') return;
        address_form_dialog.value = true;
    };

    const handleOpenAddressFormTo = () => {
        if (props.clicked_option === 'view') return;
        address_form_dialogTo.value = true;
    }

    const handleDoctorsList = () => {
        showPFDialog.value = true;
    }

    const fullFromHCIAddress = ref("");
    const handleSubmitAddress = (referred_From_HCI_address) => {
        const { bldgstreet, region_name, province_name, municipality_name, barangay_name, country_name } = referred_From_HCI_address;
        const { region_id, province_id, municipality_id, barangay_id, country_id } = referred_From_HCI_address;

        fullFromHCIAddress.value = [bldgstreet, barangay_name, municipality_name, province_name, region_name, country_name]
            .filter(Boolean)
            .join(', ');

        console.log('Full Address : ',fullFromHCIAddress.value)
        props.payload.FromHCIAddress = fullFromHCIAddress.value;
        props.payload.referred_From_HCI_address = {
            bldgstreet,
            region_id,
            province_id,
            municipality_id,
            barangay_id,
            country_id
        };
        console.log('Full Address to save : ',props.payload.referred_From_HCI_address);
    };

    const fullToHCIAddress = ref("");
    const handleSubmitAddressTo = (referred_To_HCI_address) => {
        const { bldgstreet, region_name, province_name, municipality_name, barangay_name, country_name } = referred_To_HCI_address;
        const { region_id, province_id, municipality_id, barangay_id, country_id } = referred_To_HCI_address;

        fullToHCIAddress.value = [bldgstreet, barangay_name, municipality_name, province_name, region_name, country_name]
            .filter(Boolean)
            .join(', ');
        props.payload.referred_To_HCI_address = {
            bldgstreet,
            region_id,
            province_id,
            municipality_id,
            barangay_id,
            country_id
        };
        props.payload.ToHCIAddress = fullToHCIAddress.value;
    };

    const closeAddressForm = () => {
        address_form_dialog.value = false;
    }

    const closeAddressFormTo = () => {
        address_form_dialogTo.value = false;
    }

    const closePFDialog = () => {
        showPFDialog.value = false;
    }

    const doctorsName = ref("");
    const onDoctorSelect = (selectedDoctors) => {
        if (selectedDoctors.length > 0) {
            console.log(selectedDoctors[0].fullname)
            props.payload.doctor_code = selectedDoctors[0].code;
            props.payload.refering_Doctor = selectedDoctors[0].fullname;
        }
    };

    const openHandleRoomList = () => {
        open_room_list.value = true;
    }
    const handleSelectRoom = (selected_item) => {
        props.payload.room_Id = selected_item[0].room_id;
        if (selected_item[0].room_rate === null) selected_item[0].room_rate = 'N/A';
        props.payload.room_Rate = selected_item[0].room_rate;
    };
    const closeRoomList = () => {
        open_room_list.value = false;
    }
    const openMedicalPackageList = () => {
        open_medical_package_list.value = true;
    }
    const handleSelectPackage = (selected_item) => {
        props.payload.medical_Package_Id = selected_item[0].id;
        props.payload.medical_Package_Name = selected_item[0].package_description;
        props.payload.medical_Package_Amount = selected_item[0].package_amount;
    };
    const closeMedicalPackageList = () => {
        open_medical_package_list.value = false;
    }

    const openHandleDiscountScheme = () => {
        open_discount_scheme_table.value = true;
    }
    const handleSelectDiscountScheme = (selected_item) => {
        // props.payload.discount_scheme = selected_item.item.description;
        // props.payload.discount_scheme_id = selected_item.item.id;
        open_discount_scheme_table.value = false;
    }
    const closeHandleDiscountScheme = () => {
        open_discount_scheme_table.value = false;
    }

    const openReferringHciCode = () => {
        open_referring_hci_code_table.value = true;
    }
    const handleReferringHciCode = (selected_item) => {
        referring_hci_code.value = selected_item.item;
        open_referring_hci_code_table.value = false;
    }
    const closeReferringHciCode = () => {
        open_referring_hci_code_table.value = false;
    }
    const openReferringHciAddress = () => {
        open_referring_hci_address_form.value = true;
    }
    // const handleReferringHciAddress = () => {

    // }
    const closeReferringHciAddress = () => {
        open_referring_hci_address_form.value = false;
    }

    const openDietDesc = () => {
        open_diet_desc.value = true;
    }
    const handleDietDesc = () => {
        alert('Diet Desc');
        open_diet_desc.value = false;
    }
    const closeDietDesc = () => {
        open_diet_desc.value = false;
    }

    // const patientIdentifiers = ref([
    //     { id: 1, name: 'Hemo Patient' },
    //     { id: 2, name: 'Peritoneal Patient' },
    //     { id: 3, name: 'LINAC' },
    //     { id: 4, name: 'COBALT' },
    //     { id: 5, name: 'Blood Trans Patient' },
    //     { id: 6, name: 'Chemo Patient' },
    //     { id: 7, name: 'Brachytherapy Patient' },
    //     { id: 8, name: 'Debridement' },
    //     { id: 9, name: 'TB DOTS' },
    //     { id: 10, name: 'PAD Patient' },
    //     { id: 11, name: 'Radio Patient' },
    // ]);
    const patientIdentifiers = ref([
        "Hemo Patient",
        "Peritoneal Patient",
        "LINAC",
        "COBALT",
        "Blood Trans Patient",
        "Chemo Patient",
        "Brachytherapy Patient",
        "Debridement",
        "TB DOTS",
        "PAD Patient",
        "Radio Patient",
    ])

    const register_source_data = ref([]);
    const register_source_loading = ref(false);
    const getRegisterSource = async () => {
        register_source_loading.value = true;
        try {
            const response = await useMethod("get", "get-admission-source", "", "");
            if (response) {
                const allowedDescriptions = [
                    "Inpatient",
                    "Not Applicable",
                    "Delivery Room",
                    "Direct Admission"
                ];
                register_source_data.value = response
                    .filter(source => allowedDescriptions.includes(source.description))
                    .map(source => ({
                        id: source.id,
                        description: source.description
                    }));
                props.payload.register_Source   = register_source_data.value[2].id
            }
        } catch (error) {
            console.error("Error fetching register source data:", error);
        } finally {
            register_source_loading.value = false;
        }
    };


    const transaction_type_data = ref([]);
    const transaction_type_loading = ref(false);
    const getTransactionType = async () => {
        transaction_type_loading.value = true;
        const response = await useMethod("get", "get-transaction-type", "", "");
        if (response) {
            transaction_type_data.value = response;
            transaction_type_loading.value = false;
        } 
        let ipd_filter = ["Emergency Case", "Outpatient Consultation", "HappyDoc OutPatient", "Annual Physical Examination"];
        transaction_type_data.value = response.filter(item => !ipd_filter.includes(item.description));
        let transaction_type = response.find(item => item.description === "Inpatient Case");
        props.payload.mscAccount_Trans_Types = parseInt(transaction_type.id);
    };

    const register_casetype_data = ref([]);
    const register_casetype_loading = ref(false);
    const getRegisteryCaseType = async () => {
        register_casetype_loading.value = true;
        const response = await useMethod("get", "get-case-type", "", "");
        if (response) {
            register_casetype_data.value = response;
            register_casetype_loading.value = false;
        } 

        let ipd_filter = ["Outpatient", "Emergency Patient", "Day Patient (Day Case)"];
        register_casetype_data.value = response.filter(item => !ipd_filter.includes(item.description));
        let register_casetype = response.find(item => item.description === "Inpatient");
        props.payload.register_Casetype = parseInt(register_casetype.id);
    };

    const hospitalization_plan_data = ref([]);
    const hospitalization_plan_loading = ref(false);
    const getHospitalizationPlan = async () => {
        hospitalization_plan_loading.value = true;
        const response = await useMethod("get", "get-hospital-plan", "", "");
        if (response) {
            hospitalization_plan_data.value = response;
            console.log('Hospitalization Data : ', hospitalization_plan_data);
            if (!props.payload.mscAccount_Type && hospitalization_plan_data.value.length > 0) {
                props.payload.mscAccount_Type = hospitalization_plan_data.value[0].id;
            }
            hospitalization_plan_loading.value = false;
        } 
    };


    const price_group_data = ref([]);
    const price_group_loading = ref(false);
    const getPriceGroup = async () => {
        price_group_loading.value = true;
        const response = await useMethod("get", "list-price-groups", "", "");
        if (response) {
            price_group_data.value = response;
            updatePriceGroup()
        }
        price_group_loading.value = false;
    };

    const price_scheme_data = ref([]);
    const price_scheme_loading = ref(false);
    const getPriceScheme = async () => {
        price_scheme_loading.value = true;
        const response = await useMethod("get", "list-price-schemes", "", "");
        if (response) {
            price_scheme_data.value = response;
            updatePriceScheme();
        } 
        price_scheme_loading.value = false;
    };

    const updatePriceGroup = () => {
        if (price_group_data.value.length > 0) {
            if (parseInt(props.payload.mscAccount_Type) === 1) {
                props.payload.mscPrice_Groups = price_group_data.value[1].id;
            } else {
                props.payload.mscPrice_Groups = price_group_data.value[1].id;
            }
        }
    };

    const updatePriceScheme = () => {
        if (price_scheme_data.value.length > 0) {
            if (parseInt(props.payload.mscAccount_Type) === 1) {
                props.payload.mscPrice_Schemes = price_scheme_data.value[0].id;
            } else {
                props.payload.mscPrice_Schemes = price_scheme_data.value[1].id;
            }
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

    const case_indicator_data = ref([]);
    const case_indicator_loading = ref(false);
    const getCaseIndicator = async () => {
        case_indicator_loading.value = true;
        const response = await useMethod("get", "get-case-indicators", "", "");
        if(response) {
            case_indicator_data.value = response;
            case_indicator_loading.value = false;
        }
    };

    const service_type_data = ref([]);
    const service_type_loading = ref(false);
    const getServiceType = async () => {
        service_type_loading.value = true;
        const response = await useMethod("get", "get-services-type", "", "");
        if (response) {
            service_type_data.value = response;
            service_type_loading.value = false;
        } 
    };

    const patient_brought_by = ref([]);
    const patient_brought_by_loading = ref(false);
    const getPatientBroughtBy = async () => {
        patient_brought_by_loading.value = true;
        const response = await useMethod("get", "patient-brought-by", "", "");
        if(response) {
            patient_brought_by.value = response;
            props.payload.mscBroughtBy_Relationship_Id = patient_brought_by.value[0].id;
            patient_brought_by_loading.value = false;
        }
    };

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

    const id_types_data = ref([]);
    const id_types_loading = ref(false);
    const getIdTypes = async () => {
        id_types_loading.value = true;
        const response = await useMethod("get", "get-id-types", "", "");
        if (response) {
            id_types_data.value = response;
            id_types_loading.value = false;
        } 
    };

    const runCheckerFunction = () =>  {
        startLoader();
        try {
            if(
                !patientDataStore.storePatientTransactionType &&
                !patientDataStore.storePatientDeathTypes &&
                !patientDataStore.storeHospitalizationPlan &&
                !patientDataStore.storePriceGroup &&
                !patientDataStore.storePriceScheme &&
                !patientDataStore.storePatientIdTypes &&
                !patientDataStore.storePatientDisposition &&
                !patientDataStore.storePatientBroughtBy &&
                !patientDataStore.storePatientServiceType &&
                !patientDataStore.storePatientRegisterSource &&
                !patientDataStore.storePatientCaseType
            ) {
                loadData();
            } else {
                transaction_type_data.value     = patientDataStore.storePatientTransactionType
                death_types_data.value          = patientDataStore.storePatientDeathTypes 
                hospitalization_plan_data.value = patientDataStore.storeHospitalizationPlan 
                price_group_data.value          = patientDataStore.storePriceGroup 
                price_scheme_data.value         = patientDataStore.storePriceScheme 
                id_types_data.value             = patientDataStore.storePatientIdTypes
                disposition_data.value          = patientDataStore.storePatientDisposition 
                patient_brought_by.value        = patientDataStore.storePatientBroughtBy
                service_type_data.value         = patientDataStore.storePatientServiceType 
                register_source_data.value      = patientDataStore.storePatientRegisterSource 
                register_casetype_data.value    = patientDataStore.storePatientCaseType

                props.payload.register_Source   = register_source_data.value[2].id
                if (!props.payload.mscAccount_Type && hospitalization_plan_data.value.length > 0) {
                    props.payload.mscAccount_Type = hospitalization_plan_data.value[0].id;
                }
                props.payload.mscAccount_Trans_Types = transaction_type_data.value[1].id;
                props.payload.register_Casetype = register_casetype_data.value[0].id;
                props.payload.mscBroughtBy_Relationship_Id = patient_brought_by.value[0].id;
            }
        } catch(error) {
            console.log('An error occur' + error);
        } finally {
            stopLoader();
        }
    }

    const loadData = async () => {
        try {
            await getRegisterSource();
            await getTransactionType();
            await getDeathTypes();
            await getRegisteryCaseType();
            await getHospitalizationPlan();
            await getPriceGroup();
            await getPriceScheme();
            await getDisposition();
            await getCaseIndicator();
            await getServiceType();
            await getPatientBroughtBy();
            await getIdTypes();
            if(
                register_source_data &&
                transaction_type_data && 
                death_types_data &&
                register_casetype_data &&
                hospitalization_plan_data &&
                price_group_data &&
                price_scheme_data &&
                disposition_data &&
                case_indicator_data &&
                service_type_data &&
                id_types_data &&
                patient_brought_by
            ) {
                patientDataStore.setPatientTransactionType(transaction_type_data.value);
                patientDataStore.setPatientDeathTypes(death_types_data.value);
                patientDataStore.setPatientHospitalizationPlan(hospitalization_plan_data.value);
                patientDataStore.setPatientAccountGroup(price_group_data.value);
                patientDataStore.setPatientAccountPriceScheme(price_scheme_data.value);
                patientDataStore.setPatientIDTypes(id_types_data.value);
                patientDataStore.setPatientDisposition(disposition_data.value);
                patientDataStore.setPatientBroughtBy(patient_brought_by.value);
                patientDataStore.setPatientServiceType(service_type_data.value);
                patientDataStore.setPatientRegisterSource(register_source_data.value);
                patientDataStore.setPatientCaseType(register_casetype_data.value);
            }
        } catch(error) {
            console.log('ERROR! ' + error);
        }

    }


    watch(() => props.payload.mscAccount_Type, (newVal, oldVal) => {
        if (newVal !== oldVal) {
            updatePriceGroup();
            updatePriceScheme();
        }
    });

    watch(() => enabled,(newValue) => {
        props.payload.isreferredFrom = newValue ? true : false;
    });

    watch(() => props.payload.mscDisposition_Id, (newValue) => {
        fieldsetLabel.value = (parseInt(newValue) ===  3) ? 'Transfered' : 'Refered';
    })

    onMounted(() => {
        startLoader();
        runCheckerFunction();
        if(props.payload.mscAccount_Type) {
            updatePriceGroup();
            updatePriceScheme();
        }
        fieldsetLabel.value = 'Refered'
    });
</script>

<style scoped>
    .form-header {
        color: #000;
        /* margin: -12px 0px -12px 0px; */
        font-weight: 500;
    }
    .form-col {
        padding: 3.25px 0px 3.25px 0px !important;
        margin: 0px !important;
    } 
    .fieldset-title {
        font-weight: bold;
        text-transform: uppercase;
        border-bottom: 1px solid #ccc;
        padding-bottom: 8px;
        margin-bottom: 16px;
    }

    .field-group-label {
        color: #2196F3; 
    }

    .rounded-fieldset {
        padding: 16px;
        border-radius: 8px;
        border: 1px solid #c0c0c0;
    }

    .v-row {
        margin: -18px !important;
    }
</style>