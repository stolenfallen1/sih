<template>
  <v-dialog :model-value="open_form_dialog" rounded="lg" persistent scrollable max-width="600px">
    <form @submit.prevent="handleSubmit">
      <v-card rounded="lg">
          <v-toolbar color="#6984ff" hide-details density="compact">
              <v-toolbar-title>Diet Details</v-toolbar-title>
              <v-btn color="white" @click="closeDialog">
                <v-icon>mdi-close</v-icon>
              </v-btn>
          </v-toolbar>
            <v-card-text>
                <v-container>
                    <v-row>
                        <v-col cols="4">
                            <v-text-field
                                readonly
                                variant="outlined"
                                label="Code"
                                hide-details
                                density="compact"
                            ></v-text-field>
                        </v-col>
                        <v-col cols="12">
                            <v-text-field
                            variant="outlined"
                            density="compact"
                            label="Description"
                            required
                            clearable
                            hide-details
                            ></v-text-field>
                        </v-col>
                        <v-col cols="12">
                            <v-text-field
                                variant="outlined"
                                hide-details
                                label="Type"
                                density="compact"
                                prepend-icon="mdi-plus-box"
                                @click.prepend="openTypeDialog"
                            ></v-text-field>
                        </v-col>
                        <v-col cols="12">
                            <v-text-field
                                variant="outlined"
                                hide-details
                                label="Class"
                                density="compact"
                                prepend-icon="mdi-plus-box"
                                @click.prepend="openClassDialog"
                            ></v-text-field>
                        </v-col>
                        <v-col cols="12">
                          <v-textarea
                            variant="outlined"
                            density="compact"
                            label="Remarks"
                            required
                            clearable
                            hide-details
                          ></v-textarea>
                        </v-col>
                        <v-col cols="12">
                          <v-checkbox label="Osterized Diet?" density="compact" hide-details></v-checkbox>
                        </v-col>
                    </v-row>
                </v-container>
            </v-card-text>
            <v-divider></v-divider>
            <v-card-actions>
                <v-btn color="blue-darken-1" @click="closeDialog"> Close </v-btn>
                <v-spacer></v-spacer>
                <v-btn class="bg-primary text-white" type="submit">Submit</v-btn>
            </v-card-actions>
      </v-card>
    </form>
  </v-dialog>
  <select-diet-type-list :open_diet_type_dialog="open_diet_type_dialog" @close-dialog="closeTypeDialog" @handle-submit="saveTypeDialog" />
  <select-diet-class-list :open_diet_class_dialog="open_diet_class_dialog" @close-dialog="closeClassDialog" @handle-submit="saveClassDialog" />
</template>

<script setup>
import SelectDietTypeList from './SelectDietTypeList.vue';
import SelectDietClassList from './SelectDietClassList.vue';

const props = defineProps({
  open_form_dialog: {
      type: Boolean,
      default: () => false,
      required: true,
  },
})

const emits = defineEmits(['close-dialog', 'handle-submit'])

const open_diet_type_dialog = ref(false)
const open_diet_class_dialog = ref(false)

const openTypeDialog = () => {
  open_diet_type_dialog.value = true
}

const closeTypeDialog = () => {
  open_diet_type_dialog.value = false
}

const saveTypeDialog = () => {
  alert("Save Type Dialog")
}

const openClassDialog = () => {
  open_diet_class_dialog.value = true
}

const closeClassDialog = () => {
  open_diet_class_dialog.value = false
}

const saveClassDialog = () => {
  alert("Save Class Dialog")
}

const handleSubmit = () => {
  emits('handle-submit')
}

const closeDialog = () => {
  emits('close-dialog')
}
</script>

<style scoped>
</style>