<template>
  <div>
    <v-dialog :model-value="show" rounded="lg" @update:model-value="handleclose"  scrollable max-width="350px">
      <form @submit.prevent="handleSubmit(payload)">
        <v-card>
          <v-toolbar color="white" flat density="compact">
            <v-toolbar-title>Enter your Passcode</v-toolbar-title>
            <v-btn icon @click="handleclose" small>
              <v-icon>mdi-close</v-icon>
            </v-btn>
          </v-toolbar>
          <v-divider></v-divider>
          <v-card-text>
            <v-row>
              <v-col cols="12" class="pa-1">
                <v-text-field
                  class="mt-3"
                  :type="!showPassword ? 'password' : 'text'"
                  v-model="payload.user_passcode"
                  placeholder="Enter passcode"
                  label="Enter Passcode"
                  variant="outlined"
                  density="compact"
                  required
                  autofocus
                  hide-details
                  @click:append="showPassword = !showPassword"
                  :append-icon="showPassword ? 'mdi-eye-outline ' : 'mdi-eye-off-outline'"
                ></v-text-field>
                <v-alert :closable="true" flat color="danger"  class="mt-3 pa-2" v-if="error_msg" :text="error_msg"></v-alert>
              </v-col>
            </v-row>
            <div class="mt-3">
              By entering your passcode, you confirm this transaction.
            </div>
          </v-card-text>
          <v-divider></v-divider>
          <v-card-actions>
            <v-btn variant="outlined" @click="handleclose" color="green"> Close </v-btn>
            <v-spacer></v-spacer>
            <v-btn variant="outlined" :loading="loading" bg-color="primary" color="primary" type="submit">
              Submit
            </v-btn>
          </v-card-actions>
        </v-card>
      </form>
    </v-dialog>
  </div>
</template>
<script setup>
const props = defineProps({
  show: {
    type: Boolean,
    default: () => false,
  },
  loading: {
    type: Boolean,
    default: () => false,
  },
  payload: {
    type: Object,
    default: () => {},
  },
  error_msg:{
    type: String,
    default: () => '',
  }
});
const emits = defineEmits(["close", "submit"]);
const showDialog = ref(false);
const showPassword = ref(false);

const handleclose = () => {
  emits("close");
};

const handleSubmit = (payload) => {
  emits("submit", payload);
};
</script>
