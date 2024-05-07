<template>
  <v-dialog :model-value="open_form_dialog" rounded="lg" @update:model-value="closeDialog" scrollable max-width="700px">
    <form @submit.prevent="handleSubmit">
      <v-card rounded="lg">
          <v-toolbar color="#6984ff" hide-details density="compact">
              <v-toolbar-title>Diet Meals Details</v-toolbar-title>
              <v-btn color="white" @click="closeDialog">
                <v-icon>mdi-close</v-icon>
              </v-btn>
          </v-toolbar>
            <v-card-text>
                <v-container>
                    <v-row>
                        <v-col cols="12" class="form-col">
                            <v-text-field
                            variant="outlined"
                            density="compact"
                            label="Description"
                            placeholder="Enter Description"
                            v-model="payload.meal_description"
                            required
                            clearable
                            hide-details
                            ></v-text-field>
                        </v-col>
                        <v-col cols="12" class="form-col">
                          <v-textarea
                            variant="outlined"
                            density="compact"
                            label="Remarks"
                            placeholder="Enter Remarks"
                            v-model="payload.meal_remarks"
                            required
                            clearable
                            hide-details
                          ></v-textarea>
                        </v-col>
                        <v-col cols="12" class="form-col">
                            <v-autocomplete
                                :items="diet_type_data"
                                item-title="description"
                                item-value="id"
                                v-model="payload.diet_type_id"
                                variant="outlined"
                                density="compact"
                                hide-details
                                label="Diet Type"
                                placeholder="Select Diet Type"
                            ></v-autocomplete>
                        </v-col>
                        <v-col cols="12" class="form-col">
                            <v-autocomplete
                                :items="diet_sub_type_data"
                                item-title="description"
                                item-value="id"
                                v-model="payload.diet_subtype_id"
                                variant="outlined"
                                density="compact"
                                hide-details
                                label="Diet Sub Type"
                                placeholder="Select Diet Sub Type"
                            ></v-autocomplete>
                        </v-col>
                        <v-col cols="12" class="form-col">
                            <v-text-field
                            variant="outlined"
                            type="number"
                            density="compact"
                            label="Meal Cost"
                            placeholder="Enter Meal Cost"
                            v-model="payload.meal_cost"
                            clearable
                            hide-details
                            ></v-text-field>
                        </v-col>
                        <v-col cols="12" class="form-col">
                          <v-checkbox label="Status" v-model="payload.isactive" density="compact" hide-details></v-checkbox>
                        </v-col>
                    </v-row>
                </v-container>
            </v-card-text>
            <v-divider></v-divider>
            <v-card-actions>
                <v-btn color="blue-darken-1 border border-info" @click="closeDialog"> Close </v-btn>
                <v-spacer></v-spacer>
                <v-btn class="bg-primary text-white" type="submit">Submit</v-btn>
            </v-card-actions>
      </v-card>
    </form>
  </v-dialog>
</template>

<script setup>
const props = defineProps({
  open_form_dialog: {
      type: Boolean,
      default: () => false,
      required: true,
  },
  payload: {
      type: Object,
      default: () => ({}),
  },
})

const diet_type_loading = ref(false);
const diet_type_data = ref([]);
const diet_sub_type_loading = ref(false);
const diet_sub_type_data = ref([]);

const emits = defineEmits(['close-dialog', 'handle-submit'])

const getDietType = async () => {
  diet_type_loading.value = true;
  const response = await useMethod("get", "diet-type", "", "");
  if (response) {
    diet_type_data.value = response.data;
    diet_type_loading.value = false;
  } 
};

const getDietSubType = async () => {
  diet_sub_type_loading.value = true;
  const response = await useMethod("get", "diet-sub-type", "", "");
  if (response) {
    diet_sub_type_data.value = response.data;
    diet_sub_type_loading.value = false;
  } 
};

const handleSubmit = () => {
  emits('handle-submit')
}

const closeDialog = () => {
  emits('close-dialog')
}
</script>

<style scoped>
.form-col {
    margin-top: -16px !important;
}
</style>