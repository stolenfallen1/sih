<template>
  <!-- <div>{{ route.params}}3</div> -->
  <v-dialog v-model="dialog"  hide-overlay width="800" scrollable>
    <v-card>
      <v-toolbar density="compact" dark color="primary">
        <v-toolbar-title>System User Reports</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-toolbar-items>
          <v-btn icon  >
            <v-icon @click="router.back()">mdi-close</v-icon>
          </v-btn>
        </v-toolbar-items>
      </v-toolbar>
      <v-card-text>
        <v-container>
          <v-row>
            <v-col
              v-for="(report, reportIndex) in reports"
              :key="reportIndex"
              cols="12"
              sm="6"
              md="12"
            >
              <h4>{{ report.title }}</h4>
              <v-divider></v-divider>
              <br />
              <v-expansion-panels>
                <v-expansion-panel
                  v-for="(settings, settingsIndex) in report.settings"
                  :key="settingsIndex"
                  :title="settings.settingsPanel"
                >
                  <v-expansion-panel-text>
                    <v-row v-for="(item, itemIndex) in settings.items" :key="itemIndex">
                      <v-checkbox
                        color="#117dad"
                        density="compact"
                        :label="item.label"
                      ></v-checkbox>
                    </v-row>
                  </v-expansion-panel-text>
                </v-expansion-panel>
              </v-expansion-panels>
            </v-col>
          </v-row>
        </v-container>
      </v-card-text>
      <v-divider></v-divider>
      <v-card-actions>
        <v-btn color="blue-darken-1" @click="router.back()"> Close </v-btn>
        <v-spacer></v-spacer>
        <v-btn class="bg-primary text-white" type="submit">Apply</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup>
definePageMeta({
  layout: "root-layout",
});
const reports = [
  {
    title: "Report Settings Group",
    settings: [
      {
        settingsPanel: "Group: Admissions, Emergencies and Outpatients",
        items: [{ label: "Reports Settings 1" }],
      },
      {
        settingsPanel: "Group: Cash Reciepts and Collections",
        items: [{ label: "Reports Settings 2" }],
      },
      {
        settingsPanel: "Group: Customized Reports",
        items: [{ label: "Reports Settings 3" }],
      },
      {
        settingsPanel: "Group: Government Reports",
        items: [{ label: "Reports Settings 4" }],
      },
      {
        settingsPanel: "Group: Master File and Templates",
        items: [{ label: "Reports Settings 5" }],
      },
      {
        settingsPanel: "Group: Requisitions, Charges and Billing Statements",
        items: [{ label: "Reports Settings 6" }],
      },
      {
        settingsPanel: "Group: Others",
        items: [{ label: "Reports Settings 7" }],
      },
    ],
  },
];

const tab = ref("option-1");
const router = useRouter();
const route = useRoute();

// When accessing /posts/1, route.params.id will be 1
console.log(route.params.id);
const dialog = ref(true);
</script>
<style scoped></style>
