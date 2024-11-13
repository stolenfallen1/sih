<template>
  <v-card class="mb-2" elevation="4">
    <v-card-actions>
      <div style="display: flex; align-items: center; padding-left: 10px;">
        <span style="font-size: larger; margin-right: 3px;">
          Ancillary Services -
        </span>
        <span style="color: #228B22; font-weight: bold; font-size: larger;">
          {{ warehouse_dept }}
        </span>
      </div>
      <v-spacer></v-spacer>
    </v-card-actions>
  </v-card>
  
  <v-card elevation="4" v-if="showTabs">
    <v-tabs v-model="tab" color="primary" center-active>
      <v-tab value="0" v-if="showSuppliesTab"><v-icon start>mdi-archive</v-icon> Supplies </v-tab>
      <v-tab value="1" v-if="showProcedureTab"><v-icon start>mdi-needle</v-icon> Procedure </v-tab>
    </v-tabs>
    <v-window v-model="tab">
      <v-window-item class="pa-1" v-if="showSuppliesTab">
        <h1>Supplies Test</h1>
      </v-window-item>
      <v-window-item style="width:100%;" class="pa-1" v-if="showProcedureTab">
        <h1>Procedure Test</h1>
      </v-window-item>
    </v-window>
  </v-card>

  <Snackbar />
  <!-- Ancillary Services Sub components -->
  <!-- <PatientProfileDialog :show="PatientProfile" :form_payload="form_payload" @close-dialog="useSubComponents('PatientProfile', false)" />
  <DirectRenderDialog :show="DirectRender" @close-dialog="useSubComponents('DirectRender', false)" />
  <DrugAdministrationDialog :show="DrugAdministration" @close-dialog="useSubComponents('DrugAdministration', false)" />
  <ApplyCreditNoteDialog :show="ApplyCreditNote" @close-dialog="useSubComponents('ApplyCreditNote', false)" />
  <CentralizedCreditNoteDialog :show="CentralizedCreditNote" @close-dialog="useSubComponents('CentralizedCreditNote', false)" /> -->
</template>

<script setup>
import nuxtStorage from 'nuxt-storage'; 

const {
  PatientProfile,
  DirectRender,
  DrugAdministration,
  ApplyCreditNote,
  CentralizedCreditNote,
} = storeToRefs(AncillarySubComponentsDialog());

const { 
  PrintPendingRequisition
} = storeToRefs(PQAncillaryServicesDialog());

definePageMeta({
layout: "root-layout",
});

const { selectedRowDetails, isrefresh } = storeToRefs(useSubcomponentSelectedRowDetailsStore());
const payload = ref({});
const items = ref({});
const isSelectedUser = ref(true);
const currentTab = ref(1);
const pageTitle = ref("");
const showTabs = ref(false);  
const showSuppliesTab = ref(false); 
const showProcedureTab = ref(false); 
const user_detail = ref({});
const warehouse_dept = ref('');
const revenueID = ref([]);
const totalItems = ref(0);
let tab = ref("0");

onMounted(async () => {
  const userDetails = JSON.parse(nuxtStorage.localStorage.getData('user_details') || '{}');
  user_detail.value = userDetails;
  
  warehouse_dept.value = user_detail.value?.warehouse?.warehouse_description;
  revenueID.value = user_detail.value?.RevenueCode;

  const response = await useMethod("get", "get-transaction-codes", "", "");
  if (response) {
    const revenueIDs = Array.isArray(revenueID.value) ? revenueID.value : [revenueID.value];
    const matchingItems = response.filter(item => revenueIDs.includes(String(item.id)));
    
    const hasSupplies = matchingItems.some(item => item.isSupplies === "1");
    const hasProcedure = matchingItems.some(item => item.isProcedure === "1");

    showTabs.value = hasSupplies || hasProcedure;
    showSuppliesTab.value = hasSupplies;
    showProcedureTab.value = hasProcedure;
  }
});
</script>

<style>
</style>
