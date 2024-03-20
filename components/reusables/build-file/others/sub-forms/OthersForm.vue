<template>
  <v-dialog :model-value="open_others_form" rounded="lg" persistent scrollable max-width="700px">
      <v-toolbar color="#6984ff" hide-details density="compact">
          <v-toolbar-title>Others Details</v-toolbar-title>
      </v-toolbar>
      <v-card>
          <v-card-text>
              <v-container>
                  <v-row>
                      <v-col cols="12">
                          <v-text-field
                              label="Description"
                              hide-details
                              density="compact"
                              variant="outlined"
                          ></v-text-field>
                      </v-col>
                  </v-row>
              </v-container>
          </v-card-text>
          <v-divider></v-divider>
          <v-card-actions>
              <v-btn color="blue-darken-1" @click="closeDialog"> Close </v-btn>
              <v-spacer></v-spacer>
              <v-btn class="bg-primary text-white" type="submit" @click="handleSubmit">Submit</v-btn>
          </v-card-actions>
      </v-card>
  </v-dialog>
</template>

<script setup>

const props = defineProps({
  open_others_form: {
      type: Boolean,
      default: () => false,
      required: true,
  },
})

const emits = defineEmits(['close-dialog', 'handle-submit'])

const handleSubmit = () => {
  emits('handle-submit')
}

const closeDialog = () => {
  emits('close-dialog')
}
</script>

<style scoped>
</style>