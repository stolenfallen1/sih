<template>
    <v-dialog :model-value="item_supplies_form" :persistent="true" hide-overlay width="1120" scrollable>
         <form @submit.prevent="handleSubmit">
            <v-card rounded="lg">
                <v-toolbar density="compact" color="#107bac" hide-details>
                    <v-toolbar-title>Manage Items and Supplies Details</v-toolbar-title>
                    <v-spacer></v-spacer>
                    <v-btn color="white" @click="closeDialog">
                        <v-icon>mdi-close</v-icon>
                    </v-btn>
                </v-toolbar>
                <v-card-text>
                    <v-row>
                        <v-col cols="6">
                            <v-row>
                                <v-col cols="12">
                                    <v-text-field
                                        label="Name"
                                        required
                                        v-model="form_payload.item_name"
                                        hide-details
                                        density="compact"
                                        variant="outlined"
                                    ></v-text-field>
                                </v-col>
                            </v-row>
                            <v-row>
                                <v-col cols="12">
                                    <v-text-field
                                        label="Description"
                                        required
                                        v-model="form_payload.item_Description"
                                        hide-details
                                        density="compact"
                                        variant="outlined"
                                    ></v-text-field>
                                </v-col>
                            </v-row>
                            <v-row>
                                <v-col cols="6">
                                    <v-autocomplete
                                        item-title="name"
                                        item-value="id"
                                        label="Item Group"
                                        hide-details
                                        clearable
                                        :items="itemGroups"
                                        v-model="form_payload.item_InventoryGroup_Id"
                                        @update:model-value="getcategory"
                                        density="compact"
                                        variant="outlined"
                                    ></v-autocomplete>
                                </v-col>
                                <v-col cols="6">
                                    <v-autocomplete
                                        item-title="name"
                                        item-value="id"
                                        label="Category Group"
                                        hide-details
                                        v-model="form_payload.item_Category_Id"
                                        @update:model-value="getsubcategory"
                                        :items="category_list"
                                        density="compact"
                                        variant="outlined"
                                    ></v-autocomplete>
                                </v-col>
                            </v-row>
                            <v-row>
                                <v-col cols="6">
                                    <v-autocomplete
                                        item-title="name"
                                        item-value="id"
                                        label="Sub Category"
                                        :items="sub_category_list"
                                        hide-details
                                        
                                        v-model="form_payload.item_SubCategory_Id"
                                        density="compact"
                                        variant="outlined"
                                    ></v-autocomplete>
                                
                                </v-col>
                                <v-col cols="6">
                                    <v-autocomplete
                                        item-title="name"
                                        item-value="id"
                                        label="Brand"
                                        :items="brand_list"
                                        hide-details
                                        
                                        v-model="form_payload.item_Brand_Id"
                                        density="compact"
                                        variant="outlined"
                                    ></v-autocomplete>
                                </v-col>
                            </v-row>
                            <v-row>
                                <v-col cols="6">
                                    <v-text-field
                                        label="Manufacturer"
                                        
                                        v-model="form_payload.item_Manufacturer_Id"
                                        hide-details
                                        density="compact"
                                        variant="outlined"
                                    ></v-text-field>
                                </v-col>
                                <v-col cols="6">
                                    <v-text-field
                                        label="Specification"
                                        
                                        v-model="form_payload.item_specification"
                                        hide-details
                                        density="compact"
                                        variant="outlined"
                                    ></v-text-field>
                                </v-col>
                            </v-row>
                            <v-row>
                                <v-col cols="6">
                                    <v-text-field
                                        label="SKU"
                                        
                                        v-model="form_payload.item_SKU"
                                        hide-details
                                        density="compact"
                                        variant="outlined"
                                    ></v-text-field>
                                </v-col>
                                <v-col cols="6">
                                    <v-text-field
                                        label="Barcode"
                                        
                                        v-model="form_payload.item_Barcode"
                                        hide-details
                                        density="compact"
                                        variant="outlined"
                                    ></v-text-field>
                                </v-col>
                            </v-row>
                            <v-row>
                                <v-col cols="6">
                                    <v-autocomplete
                                        item-title="name"
                                        item-value="id"
                                        label="Unit of Measurement"
                                        :items="unit_list"
                                        hide-details
                                        
                                        v-model="form_payload.item_UnitOfMeasure_Id"
                                        density="compact"
                                        variant="outlined"
                                    ></v-autocomplete>
                                </v-col>
                                <v-col cols="6">
                                    <v-text-field
                                        label="Prescription"
                                        
                                        v-model="form_payload.item_Med_Prescription"
                                        hide-details
                                        density="compact"
                                        variant="outlined"
                                    ></v-text-field>
                                </v-col>
                            </v-row>
                            <v-row>
                                <v-col cols="6">
                                    <v-text-field
                                        label="Indication"
                                        
                                        v-model="form_payload.item_Med_Indication"
                                        hide-details
                                        density="compact"
                                        variant="outlined"
                                    ></v-text-field>
                                </v-col>
                                <v-col cols="6">
                                    <v-text-field
                                        label="Dosage"
                                        
                                        v-model="form_payload.item_Med_Dosage"
                                        hide-details
                                        density="compact"
                                        variant="outlined"
                                    ></v-text-field>
                                </v-col>
                            </v-row>
                            <v-row>
                                <v-col cols="6">
                                    <v-text-field
                                        label="Precaution"
                                        
                                        v-model="form_payload.item_Med_Precaution"
                                        hide-details
                                        density="compact"
                                        variant="outlined"
                                    ></v-text-field>
                                </v-col>
                                <v-col cols="6">
                                    <v-text-field
                                        label="Adverse Reaction"
                                        
                                        v-model="form_payload.item_Med_AdverseReaction"
                                        hide-details
                                        density="compact"
                                        variant="outlined"
                                    ></v-text-field>
                                </v-col>
                            </v-row>
                            <v-row>
                                <v-col cols="6">
                                    <v-text-field
                                        label="Interaction"
                                        
                                        v-model="form_payload.item_Med_Interaction"
                                        hide-details
                                        density="compact"
                                        variant="outlined"
                                    ></v-text-field>
                                </v-col>
                            </v-row>
                            <v-row>
                                <v-col cols="12">
                                    <v-textarea
                                        label="Remarks"
                                        class="cursor-pointer"
                                        v-model="form_payload.item_Remarks"
                                        variant="outlined"
                                    ></v-textarea>
                                </v-col>
                            </v-row>
                        </v-col>
                        <v-col cols="6">
                            <v-row>
                                <v-col cols="6">
                                    <v-autocomplete
                                        item-title="form_name"
                                        item-value="id"
                                        label="Dosage form"
                                        :items="dosage_form"
                                        hide-details
                                        
                                        v-model="form_payload.item_Med_Dosage_Form_id"
                                        density="compact"
                                        variant="outlined"
                                    ></v-autocomplete>
                                </v-col>
                                <v-col cols="6">
                                    <v-autocomplete
                                        item-title="route_name"
                                        item-value="id"
                                        label="Drug Admin Route"
                                        hide-details
                                        :items="drug_administration"
                                        v-model="form_payload.item_Med_Drug_Administration_Route_Id"
                                        density="compact"
                                        variant="outlined"
                                    ></v-autocomplete>
                                </v-col>
                            </v-row>
                            <v-row>
                                <v-col cols="6">
                                    <v-text-field
                                        label="Reconstituion"
                                        v-model="form_payload.item_Med_Reconstitution"
                                        hide-details
                                        density="compact"
                                        variant="outlined"
                                    ></v-text-field>
                                </v-col>
                                <v-col cols="6">
                                    <v-text-field
                                        label="Stability"
                                        v-model="form_payload.item_Med_Stability"
                                        hide-details
                                        density="compact"
                                        variant="outlined"
                                    ></v-text-field>
                                </v-col>
                            </v-row>
                            <v-row>
                                <v-col cols="6">
                                    <v-text-field
                                        label="Storage"
                                        v-model="form_payload.item_Med_Storage"
                                        hide-details
                                        density="compact"
                                        variant="outlined"
                                    ></v-text-field>
                                </v-col>
                                <v-col cols="6">
                                    <v-text-field
                                        label="Preparation"
                                        v-model="form_payload.item_Med_Preparation"
                                        hide-details
                                        density="compact"
                                        variant="outlined"
                                    ></v-text-field>
                                </v-col>
                            </v-row>
                            <v-row>
                                <v-col cols="6">
                                    <v-text-field
                                        label="DOH Code"
                                        v-model="form_payload.item_Med_DOH_Code"
                                        hide-details
                                        density="compact"
                                        variant="outlined"
                                    ></v-text-field>
                                </v-col>
                                <v-col cols="6">
                                    <v-text-field
                                        label="Model No."
                                        v-model="form_payload.item_Model_No"
                                        hide-details
                                        density="compact"
                                        variant="outlined"
                                    ></v-text-field>
                                </v-col>
                            </v-row>
                            <v-row>
                                <v-col cols="6">
                                    <v-autocomplete
                                        item-title="route_name"
                                        item-value="id"
                                        label="Drug Administration"
                                        :items="drug_administration"
                                        hide-details
                                        v-model="form_payload.item_Med_Drug_Administration_Route_Id"
                                        density="compact"
                                        variant="outlined"
                                    ></v-autocomplete>
                                </v-col>
                                <v-col cols="6">
                                    <v-autocomplete
                                        item-title="name"
                                        item-value="id"
                                        label="Antibiotic Class"
                                        :items="antibiotic_class"
                                        hide-details
                                        v-model="form_payload.item_Med_AntibioticClass_Id"
                                        density="compact"
                                        variant="outlined"
                                    ></v-autocomplete>
                                </v-col>
                            </v-row>
                            <v-row>
                                <v-col cols="6">
                                    <v-autocomplete
                                        item-title="generic_names"
                                        item-value="id"
                                        label="Generic Name"
                                        :items="generic_name_list"
                                        hide-details
                                        v-model="form_payload.item_Med_GenericName_Id"
                                        density="compact"
                                        variant="outlined"
                                    ></v-autocomplete>
                                </v-col>
                                <v-col cols="6">
                                    <v-autocomplete
                                        item-title="name"
                                        item-value="id"
                                        label="Therapeutic Class"
                                        :items="therapeutic_class"
                                        hide-details
                                        v-model="form_payload.item_Med_TherapeuticClass_Id"
                                        density="compact"
                                        variant="outlined"
                                    ></v-autocomplete>
                                </v-col>
                            </v-row>
                            <v-row>
                                <v-col cols="12">
                                    <v-text-field
                                        label="Stat Percent"
                                        v-model="form_payload.item_StatPercent"
                                        hide-details
                                        density="compact"
                                        variant="outlined"
                                    ></v-text-field>
                                </v-col>
                            </v-row>
                            <v-row>
                                <v-col cols="6">
                                    <!-- <v-radio-group hide-details density="compact"> -->
                                        <v-checkbox label="is Supplies" v-model="form_payload.isSupplies" hide-details density="compact"></v-checkbox>
                                        <v-checkbox label="is Medicine" v-model="form_payload.isMedicines" hide-details density="compact"></v-checkbox>
                                        <v-checkbox label="is Fixed Asset" v-model="form_payload.isFixedAsset" hide-details density="compact"></v-checkbox>
                                        <v-checkbox label="is Reagents" v-model="form_payload.isReagents" hide-details density="compact"></v-checkbox>
                                        <v-checkbox label="is MDRP" v-model="form_payload.isMDRP" hide-details density="compact"></v-checkbox>
                                        <v-checkbox label="is Consignment" v-model="form_payload.isConsignment" hide-details density="compact"></v-checkbox>
                                        <v-checkbox label="is Serial No. Required" v-model="form_payload.isSerialNo_Required" hide-details density="compact"></v-checkbox>
                                        <v-checkbox label="is Expiry Date Required"  v-model="form_payload.isExpiryDate_Required" hide-details density="compact"></v-checkbox>
                                        <v-checkbox label="is For Production" v-model="form_payload.isForProduction" hide-details density="compact"></v-checkbox>
                                    <!-- </v-radio-group> -->
                                </v-col>
                                <v-col cols="6">
                                    <!-- <v-radio-group  hide-details  density="compact"> -->
                                        <v-checkbox label="is Perishable" v-model="form_payload.isPerishable" hide-details density="compact"></v-checkbox>
                                        <v-checkbox label="is Vatable" v-model="form_payload.isVatable" hide-details density="compact"></v-checkbox>
                                        <v-checkbox label="is Vat Exempt" v-model="form_payload.isVatExempt" hide-details density="compact"></v-checkbox>
                                        <v-checkbox label="is Allow Discount" v-model="form_payload.isAllowDiscount" hide-details density="compact"></v-checkbox>
                                        <v-checkbox label="is Zero Rated" v-model="form_payload.isZeroRated" hide-details density="compact"></v-checkbox>
                                        <v-checkbox label="is Open Price" v-model="form_payload.isOpenPrice" hide-details density="compact"></v-checkbox>
                                        <v-checkbox label="is Allow Stat Order" v-model="form_payload.isAllowStatOrder" hide-details density="compact"></v-checkbox>
                                        <v-checkbox label="is Stat" v-model="form_payload.item_StatPercent" hide-details density="compact"></v-checkbox>
                                        <v-checkbox label="is Include in Statement" v-model="form_payload.isIncludeInStatement" hide-details density="compact"></v-checkbox>
                                    <!-- </v-radio-group> -->
                                </v-col>
                            </v-row>
                        </v-col>
                    </v-row>
                </v-card-text>
                <v-divider></v-divider>
                <v-card-actions>
                    <v-btn color="blue-darken-1 border border-info" @click="closeDialog"> Close </v-btn>
                    <v-spacer></v-spacer>
                    <v-btn
                        class="bg-primary text-white"
                        type="submit"
                        >Submit</v-btn
                    >
                </v-card-actions>
            </v-card>
        </form>
    </v-dialog>
</template>

<script setup>

import nuxtStorage from "nuxt-storage";
const props = defineProps({
    item_supplies_form: {
        type: Boolean,
        default: () => false,
    },
    currentTabValue: {
        type: String,
        default: () => "2",
    },
    form_payload: {
        type: Object,
        default: () => {},
    },
})

const emits = defineEmits(['close-dialog', 'submit-form'])
const defaultValue = ref("");
const payload = ref({});
const itemGroups = JSON.parse(nuxtStorage.localStorage.getData("items-group"))|| [];
const brand_list = JSON.parse(nuxtStorage.localStorage.getData("brands"))|| [];
const drug_administration = JSON.parse(nuxtStorage.localStorage.getData("drug_administration"))|| [];
const dosage_form = JSON.parse(nuxtStorage.localStorage.getData("dosage_forms"))|| [];
const antibiotic_class = JSON.parse(nuxtStorage.localStorage.getData("antibiotics"))|| [];
const generic_name_list = JSON.parse(nuxtStorage.localStorage.getData("generic-name")) || [];
const therapeutic_class = JSON.parse(nuxtStorage.localStorage.getData("therapeutic-class")) || [];
const unit_list = JSON.parse(nuxtStorage.localStorage.getData("units")) || [];

const category_list = ref([]);
const sub_category_list = ref([]);
const setInitialValue = () => {
   
};

watch(() => props.currentTabValue, () => {
    // setInitialValue();
});
const getcategory = async ()=>{
    category_list.value = [];
    if(!props.form_payload.item_InventoryGroup_Id) return;
    let response = await $fetch(useApiUrl()+'/categories?invgroup_id='+props.form_payload.item_InventoryGroup_Id,
    {
        headers: {
            Authorization: `Bearer ` + useToken(),
        },
    })
    if(response.categories){
        category_list.value = response.categories;
    }
}
const getsubcategory = async ()=>{
    sub_category_list.value = [];
    // props.form_payload.item_SubCategory_Id = '';
    if(!props.form_payload.item_Category_Id) return;
    let response = await $fetch(useApiUrl()+'/sub-categories?category_id='+props.form_payload.item_Category_Id,
    {
        headers: {
            Authorization: `Bearer ` + useToken(),
        },
    })
    if(response.subcategories){
        sub_category_list.value = response.subcategories;
    }
}

onMounted(() => {
    // setInitialValue(); 
    // category();  
    useItemGroup();
    getcategory();  
    getsubcategory();
    useBrand();
    useUnits();
    useDosageForm();
    useDrugAdministration();
    useAntibiotics();
    useGenericName();
    useTherapeutics();
});
onUpdated(()=>{
    getcategory();  
    getsubcategory();
})
const closeDialog = () => {
    emits('close-dialog')
}

const handleSubmit = () => {
   if(props.form_payload){
    emits("submit-form", props.form_payload);
  }
}

</script>

<style scoped>
</style>
