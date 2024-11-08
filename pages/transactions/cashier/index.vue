<template>
  <v-dialog 
    v-model="isDialogOpen"
    fullscreen
    hide-overlay
    scrollable
    persistent
    >
      <v-card>
        <v-toolbar density="compact" color="#FFF">
          <v-toolbar-title>Cashier Payment Form</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-btn color="white" @click="closeDialog">
              <v-icon color="#000">mdi-close</v-icon>
          </v-btn>
        </v-toolbar>
        <v-card-text>
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
                    <CashierReports />
                  </v-window-item>
              </v-window>
            </v-col>
          </v-row>
        </v-card-text>
      </v-card>
    </v-dialog>
  <Snackbar />
</template>

<script setup>
import NewPayment from './forms/NewPayment.vue';
import CancelPayment from './forms/CancelPayment.vue';
import CashierReports from './forms/CashierReports.vue';

definePageMeta({
  layout: "root-layout",
});

const router = useRouter();
let tab = ref("0");
const isDialogOpen = ref(false);

const closeDialog = () => {
  isDialogOpen.value = false;
  router.push('/dashboard');
};

onMounted(() => {
  setTimeout(() => {
    isDialogOpen.value = true;
  }, 2000);
});
</script>

<style scoped>
.container {
  margin: 0;
  padding: 0;
}
</style>
