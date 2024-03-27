<template>
  <v-dialog :model-value="open_form_dialog" rounded="lg" @update:model-value="closeDialog" scrollable max-width="500px">
      <v-card rounded="lg">
           <v-toolbar color="#6984ff" hide-details density="compact">
              <v-toolbar-title>Price Group Details</v-toolbar-title>
              <v-btn color="white" @click="closeDialog">
                  <v-icon>mdi-close</v-icon>
              </v-btn>
          </v-toolbar>
          <v-divider></v-divider>
          <v-card-text>
              <v-row>
                  <v-col cols="12">
                      <v-text-field
                          label="Description"
                          hide-details
                          v-model="payload.description"
                          density="compact"
                          variant="outlined"
                      ></v-text-field>
                  </v-col>
                  <v-col cols="5">
                      <v-text-field
                          label="Item ID"
                          hide-details
                          readonly
                          v-model="payload.id"
                          density="compact"
                          variant="outlined"
                      ></v-text-field>
                  </v-col>
                      <v-col cols="7">
                      <v-checkbox
                      class="mt-0 mb-0"
                      v-model="payload.isactive"
                      hide-details
                      label="Is Active"
                      ></v-checkbox>
                  </v-col>
              </v-row>
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
  open_form_dialog: {
      type: Boolean,
      default: () => false,
      required: true,
  },
  payload:{
      type:Object,
      default:()=>{}
  },
  isloading:{
      type:Boolean,
      default:()=>false
  }
})

const hospitalization_plans = []

const emits = defineEmits(["handle-submit","close-dialog"])
const handleSubmit = () => {
  console.log(props.payload);
  emits('handle-submit',props.payload)
}
const closeDialog = () => {
  emits('close-dialog')
}
</script>

<style scoped>
</style>