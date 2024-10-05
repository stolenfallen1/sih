<template>
    <v-dialog :model-value="item_supplies_form"  hide-overlay width="980" :persistent="true" scrollable>
         <form @submit.prevent="handleSubmit">
            <v-card rounded="lg">
                <v-toolbar density="compact" color="#107bac" hide-details>
                    <v-toolbar-title>Form Examination and Procedures </v-toolbar-title>
                    <v-spacer></v-spacer>
                    <v-btn color="white" @click="closeDialog">
                        <v-icon>mdi-close</v-icon>
                    </v-btn>
                </v-toolbar>
                <v-card-text>
                    <v-row>
                        <v-col cols="7">
                             <v-row>
                                <v-col cols="6">
                                    <v-text-field
                                        label="Item Code . ID"
                                        readonly
                                        v-model="form_payload.id"
                                        hide-details
                                        density="compact"
                                        variant="outlined"
                                    ></v-text-field>
                                </v-col>
                                <v-col cols="6">
                                    <v-text-field
                                        label="Standard Barcode ID"
                                        v-model="form_payload.barcodeid"
                                        readonly
                                        hide-details
                                        density="compact"
                                        variant="outlined"
                                    ></v-text-field>
                                </v-col>
                             </v-row>
                             <v-row>
                                <v-col cols="12">
                                    <v-text-field
                                        label="Short Description"
                                        required
                                        v-model="form_payload.exam_description"
                                        hide-details
                                        density="compact"
                                        variant="outlined"
                                    ></v-text-field>
                                </v-col>
                                <v-col cols="12">
                                    <v-text-field
                                        label="Standard Description"
                                        required
                                        :model-value="form_payload.exam_resultName"
                                        hide-details
                                        density="compact"
                                        variant="outlined"
                                    ></v-text-field>
                                </v-col>
                            </v-row>
                            <v-row>
                                <v-col cols="6">
                                    <v-autocomplete
                                        item-title="item_description"
                                        item-value="id"
                                        label="Item Group"
                                        hide-details
                                        :items="itemGroups"
                                        v-model="form_payload.msc_item_group"
                                        @update:model-value="getcategory"
                                        density="compact"
                                        variant="outlined"
                                    ></v-autocomplete>
                                </v-col>
                                <v-col cols="6">
                                    <v-text-field
                                        label="Custom Barcode ID"
                                        v-model="form_payload.barcodeidcustom"
                                        hide-details
                                        density="compact"
                                        variant="outlined"
                                    ></v-text-field>
                                    
                                </v-col>
                                
                            </v-row>
                            <v-row>
                                
                                <!-- <v-col cols="6">
                                    <v-autocomplete
                                        item-title="category_description"
                                        item-value="id"
                                        label="Category Group"
                                        hide-details
                                        v-model="form_payload.msc_item_category_ID"
                                        return-object
                                        @update:model-value="getSection"
                                        :items="category_list"
                                        density="compact"
                                        variant="outlined"
                                    ></v-autocomplete>
                                </v-col> -->
                                <v-col cols="6">
                                    <v-autocomplete
                                        item-title="name"
                                        item-value="id"
                                        label="Examination Type"
                                        hide-details
                                        v-model="form_payload.msc_exam_type_id"
                                        density="compact"
                                        variant="outlined"
                                    ></v-autocomplete>
                                </v-col>
                                 <v-col cols="6">
                                    <v-autocomplete
                                        item-title="section_description"
                                        item-value="id"
                                        label="Section"
                                        hide-details
                                        :loading="sectionLoading"
                                        v-model="form_payload.exam_section"
                                        :items="section_list"
                                        density="compact"
                                        variant="outlined"
                                    ></v-autocomplete>
                                </v-col>
                                <v-col cols="6">
                                    <v-autocomplete
                                        item-title="modilaty_description"
                                        item-value="id"
                                        label="Modality"
                                        hide-details 
                                        v-model="form_payload.msc_modalities_id"
                                        :items="modality_list"
                                        density="compact"
                                        variant="outlined"
                                    ></v-autocomplete>
                                </v-col>
                              <v-col cols="12"  >
                                    <v-textarea
                                        label="Remarks"
                                        v-model="form_payload.remarks"
                                        hide-details
                                        density="compact"
                                        variant="outlined"
                                        rows="3"
                                    ></v-textarea>
                                </v-col>
                            </v-row>
                        </v-col>
                        <v-col cols="5">
                            <v-row >
                                <!-- <v-col cols="12"  class="pa-1">
                                    <label>Classification</label>
                                    <v-radio-group  hide-details density="compact" v-model="form_payload.exam_classification" inline>
                                        <v-checkbox label="is Charging" value="0" hide-details density="compact"></v-checkbox>
                                        <v-checkbox label="is Result Entry" value="1" hide-details density="compact"></v-checkbox>
                                    </v-radio-group>
                                </v-col> -->
                                <v-col cols="6" class="pa-1">
                                    <v-checkbox label="is Active" v-model="form_payload.isactive" hide-details density="compact"></v-checkbox>
                                    <v-checkbox label="is Allow Stat" :value="true" v-model="form_payload.isallowstat" hide-details density="compact"></v-checkbox>
                                    <v-checkbox label="is Allow Discount" v-model="form_payload.isallowdiscount" hide-details density="compact"></v-checkbox>
                                    <v-checkbox label="is Vatable" v-model="form_payload.isVatable" hide-details density="compact"></v-checkbox>
                                    <v-checkbox label="is VAT Exmpt" v-model="form_payload.isVATExempt" hide-details density="compact"></v-checkbox>
                                    <v-checkbox label="is Zero Rated"  v-model="form_payload.isZeroRated" hide-details density="compact"></v-checkbox>
                                </v-col>
                                <v-col cols="6"  class="pa-1">
                                    <v-checkbox label="is Charging" v-model="form_payload.isImaging" hide-details density="compact"></v-checkbox>
                                    <v-checkbox label="is Consultation" v-model="form_payload.isConsultation" hide-details density="compact"></v-checkbox>
                                    <v-checkbox label="is PHIC" v-model="form_payload.isPhic" hide-details density="compact"></v-checkbox>
                                    <v-checkbox label="is Doctor Fee" v-model="form_payload.isDoctorfee" hide-details density="compact"></v-checkbox>
                                    <v-checkbox label="is Profile" v-model="form_payload.isProfile" hide-details density="compact"></v-checkbox>
                                    <v-checkbox label="is includeInStatement" v-model="form_payload.includeInStatement" hide-details density="compact"></v-checkbox>
                                </v-col>
                                <v-col cols="12" v-if="form_payload.isallowstat"  class="pa-1">
                                    <v-text-field
                                        label="Stat Persent"
                                        v-model="form_payload.statpercent"
                                        hide-details
                                        density="compact"
                                        variant="outlined"
                                    ></v-text-field>
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
const itemGroups = ref(null);
const modality_list = ref(null);

const category_list = ref([]);
const section_list = ref([]);
const sectionLoading = ref(false);
const setInitialValue = () => {
   
};

watch(() => props.currentTabValue, () => {
    // setInitialValue();
});
const getcategory = async ()=>{
    category_list.value = [];
    if(!props.form_payload.msc_item_group) return;
    let response = await $fetch(useApiUrl()+'/services-categories?invgroup_id='+props.form_payload.msc_item_group,
    {
        headers: {
            Authorization: `Bearer ` + useToken(),
        },
    })
    if(response){
        category_list.value = response;
    }
}
const getSection = async ()=>{
    section_list.value = [];
    if(!props.form_payload.msc_item_category_ID) return;
    sectionLoading.value = true;
    var categoryid = props.form_payload.msc_item_category_ID.fms_transaction_id || props.form_payload.msc_item_category_ID
    let response = await $fetch(useApiUrl()+'/services-section?revenue_id='+categoryid,
    {
        headers: {
            Authorization: `Bearer ` + useToken(),
        },
    })
    if(response){
        sectionLoading.value = false;
        section_list.value = response;
    }
}

onMounted(() => {
    itemGroups.value = useGetData("services-items-group");
    modality_list.value = useGetData("modalities");
    useServicesItemGroup();
    getcategory();  
    getSection();   
    useModality();
});
onUpdated(()=>{
    useServicesItemGroup();
    getcategory(); 
    getSection();   
})
const closeDialog = () => {
    emits('close-dialog')
}

const handleSubmit = () => {
   if(props.form_payload){
    props.form_payload.cagetory_id = props.form_payload.msc_item_category_ID.id;
    emits("submit-form", props.form_payload);
  }
}

</script>

<style scoped>
</style>
