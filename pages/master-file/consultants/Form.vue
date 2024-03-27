<template>
  <v-dialog
        :model-value="form_dialog"
        width="1220"
        
        hide-overlay
        transition="dialog-bottom-transition"
        scrollable
      >
  <v-card>
      <form @submit.prevent="handleSubmit">
        <v-card-title>
          <v-card-actions>
            <p>Consultant Information Form</p>
            <v-spacer></v-spacer>
            <v-btn color="black" @click="closeDialog">
              <v-icon>mdi-close</v-icon>
            </v-btn>
          </v-card-actions>
          <v-tabs v-model="tab" bg-color="primary">
            <v-tab value="one">General Information</v-tab>
            <v-tab value="two">Contacts and Addresses</v-tab>
          </v-tabs>
        </v-card-title>
        <v-card-text style="max-height: auto">
          <v-window v-model="tab" class="pa-0">
            <v-window-item value="one" class="pa-1">
              <v-row>
                <v-col cols="12" sm="8" md="9">
                  <v-list-subheader inset> Personal Information </v-list-subheader>
                  <v-row  class="pa-2">
                    <v-col lg="4"   class="pa-1"> 
                      <v-text-field
                        label="Lastname*"
                        type="text"
                        v-model="payload.lastname"
                        :rules="[(v) => !!v || 'Lastname is required']"
                        density="compact"
                        variant="outlined"
                      ></v-text-field>
                    </v-col>
                    <v-col lg="4"   class="pa-1">
                      <v-text-field
                        label="Firstname*"
                        type="text"
                        v-model="payload.firstname"
                        :rules="[(v) => !!v || 'Firstname is required']"
                        density="compact"
                        variant="outlined"
                      ></v-text-field>
                    </v-col>
                    <v-col lg="4"   class="pa-1">
                      <v-text-field
                        label="Middlename"
                        type="text"
                        v-model="payload.middlename"
                        density="compact"
                        hide-details
                        variant="outlined"
                      ></v-text-field>
                    </v-col>
                  </v-row>
                  <v-row class="mt-1 pa-2">
                    <v-col lg="2"  class="pa-1">
                      <v-autocomplete
                        item-title="abbreviations"
                        item-value="id"
                        :items="suffix"
                        v-model="payload.suffix_id"
                        label="Suffix"
                        hide-details
                        clearable
                        density="compact"
                        variant="outlined"
                      ></v-autocomplete>
                    </v-col>
                    <v-col cols="2" class="pa-1">
                      <v-text-field
                        label="Birth Date"
                        density="compact"
                        v-model="payload.birthdate"
                        @update:model-value="updatebirthdate"
                        type="date"
                        variant="outlined"
                        :max="new Date().toISOString().substr(0, 10)"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="2" class="pa-1">
                      <v-text-field
                        label="Age"
                        density="compact"
                        readonly
                        v-model="payload.age"
                        variant="outlined"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="2" class="pa-1">
                      <v-autocomplete
                        item-title="sex_description"
                        item-value="id"
                        :items="gender"
                        v-model="payload.sex_id"
                        label="Gender"
                        hide-details
                        density="compact"
                        variant="outlined"
                      ></v-autocomplete>
                    </v-col>
                    
                    <v-col cols="4" class="pa-1">
                      <v-autocomplete
                        item-title="CivilStatus_name"
                        item-value="id"
                        :items="civil_status"
                        v-model="payload.civil_status_id"
                        label="Civil Status"
                        hide-details
                        density="compact"
                        variant="outlined"
                      ></v-autocomplete>
                    </v-col>
                  </v-row>
                  <v-row class="mt-1">
                    <v-col lg="4">
                      <v-text-field
                        label="TIN*"
                        type="text"
                        v-model="payload.TIN"
                        :rules="[(v) => !!v || 'TIN is required']"
                        density="compact"
                        variant="outlined"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="4">
                      <v-text-field
                        label="Bank Account Name"
                        type="text"
                        v-model="payload.bank_account_name"
                        density="compact"
                        variant="outlined"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="4">
                      <v-text-field
                        label="Bank Account Number"
                        v-model="payload.bank_account_no"
                        type="text"
                        density="compact"
                        variant="outlined"
                      ></v-text-field>
                    </v-col>
                  </v-row>
                  <v-list-subheader inset> PTR and S2 Information </v-list-subheader>
                  <v-divider color="primary"></v-divider>
                  <v-row class="mt-1">
                    <v-col lg="6">
                      <v-text-field
                        label="PTR Number"
                        v-model="payload.ptr_no"
                        type="text"
                        density="compact"
                        variant="outlined"
                      ></v-text-field>
                    </v-col>
                    <v-col lg="6">
                      <v-text-field
                        label="S2 Consultant Number"
                        type="text"
                        v-model="payload.s2_no"
                        density="compact"
                        variant="outlined"
                      ></v-text-field>
                    </v-col>
                  </v-row>
                  <v-list-subheader inset> PRC Information </v-list-subheader>
                  <v-divider color="primary"></v-divider>
                  <v-row class="mt-1">
                    <v-col lg="4">
                      <v-autocomplete
                        item-title="value"
                        item-value="id"
                        label="PRC License Type"
                        :items="prcType"
                        v-model="payload.prc_type_id"
                        hide-details
                        clearable
                        density="compact"
                        variant="outlined"
                      ></v-autocomplete>
                    </v-col>
                    <v-col cols="4">
                      <v-text-field
                        label="PRC License Number"
                        type="text"
                        v-model="payload.prc_license_no"
                        density="compact"
                        variant="outlined"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="4">
                      <v-text-field
                        label="PRC Expiry Date"
                        v-model="payload.prc_license_expiry_date"
                        :min="new Date().toISOString().substr(0, 10)"
                        density="compact"
                        type="date"
                        variant="outlined"
                      ></v-text-field>
                    </v-col>
                  </v-row>
                  <v-list-subheader inset> PHIC Information </v-list-subheader>
                  <v-divider color="primary"></v-divider>
                  <v-row class="mt-1">
                    <v-col lg="3">
                      <v-autocomplete
                        item-title="value"
                        item-value="id"
                        label="PHIC Number"
                        :items="phicNo"
                        v-model="payload.philhealth_accreditation_no"
                        hide-details
                        clearable
                        density="compact"
                        variant="outlined"
                      ></v-autocomplete>
                    </v-col>
                    <v-col cols="3">
                      <v-autocomplete
                        item-title="value"
                        item-value="id"
                        :items="phicGroup"
                        v-model="payload.phic_group_id"
                        label="PHIC Group"
                        hide-details
                        clearable
                        density="compact"
                        variant="outlined"
                      ></v-autocomplete>
                    </v-col>
                    <v-col cols="3">
                      <v-text-field
                        v-model="payload.philhealth_accreditation_expiry_date"
                        label="PHIC Expiry Date"
                        :min="new Date().toISOString().substr(0, 10)"
                        density="compact"
                        type="date"
                        variant="outlined"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="3">
                      <v-text-field
                        label="PMCC Number"
                        type="text"
                        v-model="payload.pmcc_no"
                        density="compact"
                        variant="outlined"
                      ></v-text-field>
                    </v-col>
                  </v-row>
                  <v-list-subheader inset> VAT and Tax Information </v-list-subheader>
                  <v-divider color="primary"></v-divider>
                  <v-row class="mt-1">
                    <v-col cols="4">
                      <v-autocomplete
                        item-title="value"
                        item-value="id"
                        :items="vatCondition"
                        v-model="payload.isVatable"
                        label="VAT Condition"
                        hide-details
                        clearable
                        density="compact"
                        variant="outlined"
                      ></v-autocomplete>
                    </v-col>
                    <v-col cols="4">
                      <v-text-field
                        label="Professional Fee VAT Rate"
                        type="text"
                        density="compact"
                        v-model="payload.professional_fee_vat_rate"
                        variant="outlined"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="4">
                      <v-text-field
                        label="Reader's Fee VAT Rate"
                        type="text"
                        density="compact"
                        v-model="payload.readers_fee_vat_rate"
                        variant="outlined"
                      ></v-text-field>
                    </v-col>
                  </v-row>
                  <v-row class="mt-1">
                    <v-col lg="6">
                      <v-autocomplete
                        item-title="value"
                        item-value="id"
                        label="EWT Tax Description"
                        :items="EWTTax"
                        v-model="payload.EWTTax"
                        hide-details
                        @update:model-value="ComputeEWTTax"
                        clearable
                        density="compact"
                        variant="outlined"
                      ></v-autocomplete>
                    </v-col>
                    <v-col lg="6">
                      <v-text-field
                        label="Expanded WTax Rate"
                        type="text"
                        hide-details
                        readonly
                        v-model="payload.WithHolding__tax_rate"
                        density="compact"
                        variant="outlined"
                      ></v-text-field>
                    </v-col>
                  </v-row>
                </v-col>
                <v-col cols="12" sm="4" md="3">
                  <v-row>
                    <!-- Digital Signature -->
                   
                    <v-col cols="12" align="center">
                      <v-card class="pa-1">
                        <v-avatar rounded="0" size="155">
                           <v-img
                              cover
                              width="100%"
                              v-if="imageUrl"
                              :src="imageUrl"
                              alt="Selected Image"
                            ></v-img>
                        </v-avatar>
                      </v-card>
                    </v-col>
                    <v-col cols="12">
                      <v-file-input
                        class="mt-3"
                        type="file"
                        v-model="image"
                        @update:model-value="checkfile"
                        @change="onFileChange"
                        variant="outlined"
                        bg-color="primary"
                        clearable
                        label="Manage Picture"
                        density="compact"
                        hide-details
                      ></v-file-input>
                    </v-col>
                    <v-col lg="12">
                      <v-text-field
                        label="Doctors ID*"
                        v-model="payload.doctor_code"
                        type="text"
                        hide-details
                        :rules="[(v) => !!v || 'Doctors ID is required']"
                        density="compact"
                        variant="outlined"
                      ></v-text-field>
                    </v-col>
                    <v-col lg="12">
                      <v-text-field
                        label="Custom Specialization"
                        type="text"
                        hide-details
                        density="compact"
                        variant="outlined"
                      ></v-text-field>
                    </v-col>
                    <v-col lg="12">
                      <v-autocomplete
                        item-title="category_description"
                        item-value="id"
                        label="Category"
                        v-model="payload.category_id"
                        :items="doctor_category"
                        hide-details
                        clearable
                        density="compact"
                        variant="outlined"
                      ></v-autocomplete>
                    </v-col>
                    <v-col lg="12">
                      <v-autocomplete
                        item-title="value"
                        item-value="id"
                        :items="serviceClass"
                        v-model="payload.service_class_id"
                        label="Service Class"
                        hide-details
                        clearable
                        density="compact"
                        variant="outlined"
                      ></v-autocomplete>
                    </v-col>
                    <v-col lg="12">
                      <v-autocomplete
                        item-title="specialization_description"
                        item-value="id"
                        label="Specialization"
                        :items="specializations"
                        v-model="payload.specialization_primary_id"
                        hide-details
                        clearable
                        density="compact"
                        variant="outlined"
                      ></v-autocomplete>
                    </v-col>
                    <v-col lg="12">
                      <v-autocomplete
                        item-title="description"
                        item-value="id"
                        :items="service_type"
                        v-model="payload.service_type"
                        label="Service Type"
                        hide-details
                        clearable
                        density="compact"
                        variant="outlined"
                      ></v-autocomplete>
                    </v-col>
                    <v-col lg="12">
                      <v-autocomplete
                        item-title="value"
                        item-value="id"
                        :items="classCode"
                        v-model="payload.class_code_id"
                        label="Class Codes"
                        hide-details
                        clearable
                        density="compact"
                        variant="outlined"
                      ></v-autocomplete>
                    </v-col>
                    <v-col lg="12">
                      <v-autocomplete
                        item-title="abbreviations"
                        item-value="id"
                        label="Department"
                        hide-details
                        clearable
                        density="compact"
                        variant="outlined"
                      ></v-autocomplete>
                    </v-col>
                    <v-col lg="12">
                      <v-checkbox
                        v-model="payload.isactive"
                        label="Active Consultant?"
                      ></v-checkbox>
                    </v-col>
                  </v-row>
                </v-col>
              </v-row>
            </v-window-item>

            <v-window-item value="two">
              <v-row class="mt-2">
                <v-col lg="4" >
                  <v-text-field
                    label="Email Address"
                    v-model="payload.email"
                    hide-details
                    density="compact"
                    variant="outlined"
                  ></v-text-field>
                </v-col>
                <v-col lg="4">
                  <v-text-field
                    label="Telephone Number"
                    hide-details
                    v-model="payload.telephoneno"
                    density="compact"
                    variant="outlined"
                  ></v-text-field>
                </v-col>
                <v-col lg="4">
                  <v-text-field
                    label="Mobile Number"
                    hide-details
                    v-model="payload.mobile_no"
                    density="compact"
                    variant="outlined"
                  ></v-text-field>
                </v-col>
              </v-row>
              <v-row>
                <v-col lg="11" class="mt-1">
                  <v-textarea
                    class="cursor-pointer"
                    label="Residential Address"
                    prepend-icon="mdi-plus-box"
                    v-model="payload.residentialaddress"
                    readonly
                    @click:prepend="handleOpenAddressForm('residential')"
                    variant="outlined"
                  ></v-textarea>
                </v-col>
              </v-row>
              <v-row>
                <v-col lg="11" class="mt-1">
                  <v-textarea
                    class="cursor-pointer"
                    label="Clinic Address"
                    prepend-icon="mdi-plus-box"
                    v-model="payload.clinicaddress"
                    readonly
                    @click:prepend="handleOpenAddressForm('clinic')"
                    variant="outlined"
                  ></v-textarea>
                </v-col>
              </v-row>
            </v-window-item>
          </v-window>
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn class="bg-primary text-white" type="submit" v-if="payload.type != 'view'">Save and Close</v-btn>
        </v-card-actions>
      </form>
      <v-dialog
        v-model="address_form_dialog"
        
        hide-overlay
        width="650"
      >
        <AddressForm
          :payload="payload"
          @close-dialog="closeAddressForm"
          @handle-submit="handleAddressSubmission"
        />
      </v-dialog>
  </v-card>
  </v-dialog>

</template>

<script setup>
import nuxtStorage from "nuxt-storage";
import AddressForm from "./AddressForm.vue";
const emits = defineEmits(['close-dialog', 'handle-submit']);
const props = defineProps({
  payload: {
    type: Object,
    default: () => {},
  },
  form_dialog:{
    type:Boolean,
    default:()=>false
  }
});

const image = ref("");
const imageUrl = ref("");
const phicNo = ref([
    {id:0,value:'Not Applicable'},
    {id:1,value:'1111',},
    {id:2,value:'0123'},
])
const phicGroup = ref([
    {id:0,value:'Not Applicable'},
    {id:1,value:'1111',},
    {id:2,value:'0123'},
])


const prcType = ref([
    {id:0,value:'Not Applicable'},
    {id:1,value:'MD'},
    {id:2,value:'DMD'},
])

const serviceClass = ref([
    {id:0,value:'Not Applicable'},
    {id:1,value:'Sonology'},
    {id:2,value:'Spondolits'},
    {id:3,value:'Surgical'},
])
const classCode = ref([
    {id:0,value:'Not Applicable'},
    {id:1,value:'A'},
    {id:2,value:'B'},
    {id:3,value:'C'},
    {id:4,value:'D'},
])
const vatCondition = ref([
    {id:1,value:'VAT'},
    {id:2,value:'Non-VAT'},
])
const EWTTax = ref([
    {id:1,value:'1%'},
    {id:10,value:'10%'},
    {id:2,value:'2%'},
    {id:5,value:'5%'},
    {id:0,value:'Not Applicable'},
])

const address_form_dialog = ref(false);
const gender = JSON.parse(nuxtStorage.localStorage.getData("sex"));
const suffix = JSON.parse(nuxtStorage.localStorage.getData("suffix"));
const service_type = JSON.parse(nuxtStorage.localStorage.getData("services-type"));
const doctor_category = JSON.parse(nuxtStorage.localStorage.getData("doctorscategory"));
const civil_status = JSON.parse(nuxtStorage.localStorage.getData("civil-status"));
const specializations = JSON.parse(
  nuxtStorage.localStorage.getData("doctor-specialization")
);
const updatebirthdate = ()=>{
  props.payload.age = 0;
  if(props.payload.birthdate){
    props.payload.age = useCalculateAge(useDateMMDDYYY(props.payload.birthdate));
  }
}
const createImage = (file) => {
  if (!file || !(file instanceof Blob)) {
    console.error("Invalid file");
    return;
  }
  const reader = new FileReader();
  reader.onload = (e) => {
    imageUrl.value = e.target.result;
  };

  reader.readAsDataURL(file);
};
const onFileChange = (event) => {
  const file = event.target.files[0];
  if (!file) {
    return (imageUrl.value = "");
  }
  createImage(file);
};
const checkfile = () => {
  if (image.value == "") {
    imageUrl.value = "";
  }
};
const ComputeEWTTax= () => {
  let ewttax = props.payload.EWTTax;
  props.payload.WithHolding__tax_rate = ewttax;
};

const handleSubmit = (e) => {
  e.preventDefault();
  if(props.payload){
    emits("submit-form", props.payload);
  }
};

const closeDialog = () => {
  emits("close-dialog");
};

const handleOpenAddressForm = (type) => {
  props.payload.type = type;
  address_form_dialog.value = true;
};

const closeAddressForm = () => {
  address_form_dialog.value = false;
};

const handleAddressSubmission = (payload) => {
  if(props.payload.type == 'residential'){
    props.payload.residentialaddress = payload.value.full_address;
    props.payload.residential_barangay_id = payload.value.barangay.id;
    props.payload.residential_municipality_id = payload.value.municipality.id;
    props.payload.residential_province_id = payload.value.province.id;
    props.payload.residential_region_id = payload.value.region.id;
    props.payload.residential_zicode_id = payload.value.zicode_id.id;
    props.payload.residential_country_id = payload.value.country.id;
    props.payload.residential_building = payload.value.building;
  }
  else if(props.payload.type == 'clinic'){
    props.payload.clinicaddress = payload.value.full_address;
    props.payload.clinic_barangay_id = payload.value.barangay.id;
    props.payload.clinic_municipality_id = payload.value.municipality.id;
    props.payload.clinic_province_id = payload.value.province.id;
    props.payload.clinic_region_id = payload.value.region.id;
    props.payload.clinic_zicode_id = payload.value.zicode_id.id;
    props.payload.clinic_country_id = payload.value.country.id;
    props.payload.clinic_building = payload.value.building;
  }
  address_form_dialog.value = false;
  console.log(payload)
};

const tab = ref(null);
</script>

<style scoped></style>
