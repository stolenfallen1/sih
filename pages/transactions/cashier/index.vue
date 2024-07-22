<template>
    <v-row class="container">
      <v-col cols="12" style="margin: 0; padding: 0;">
        <v-tabs
            v-model="tab"
            color="primary"
            center-active
            density="compact"
        >
            <v-tab value="0"><v-icon start>mdi-account-credit-card-outline</v-icon> Transaction </v-tab>
            <v-tab value="1"><v-icon start>mdi-file-cancel-outline</v-icon> OR Cancellation </v-tab>
            <v-tab value="2"><v-icon start>mdi-chart-line</v-icon> Reports </v-tab>
          </v-tabs>
      </v-col>
      <v-col cols="12" style="margin: 0; padding: 0;">
        <v-divider vertical color="#2a73c5"></v-divider>
        <v-window v-model="tab">
            <v-window-item class="pa-1" value="0">
                <NewPayment />
            </v-window-item>
            <v-window-item class="pa-1" value="1">
                <CancelPayment />
            </v-window-item>
            <v-window-item class="pa-1" value="2">
                <h1>Reports</h1>
            </v-window-item>
        </v-window>
      </v-col>
    </v-row>
  <Snackbar />
</template>

<script setup>
import NewPayment from './forms/NewPayment.vue';
import CancelPayment from './forms/CancelPayment.vue';

definePageMeta({
  layout: "root-layout",
});

let tab = ref("0");
</script>

<style scoped>
.container {
  margin: 0;
  padding: 0;
}
</style>