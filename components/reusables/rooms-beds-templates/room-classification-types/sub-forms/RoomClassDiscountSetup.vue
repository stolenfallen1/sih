<template>
  <v-dialog :model-value="open_class_discount_setup" persistent hide-overlay width="650">
    <form @submit.prevent="handleSubmit">
      <v-card>
          <v-card-title>Discount Details</v-card-title>
          <v-card-text>
              <v-container>
                  <v-table density="compact" hide-details>
                      <thead>
                          <tr>
                              <th>Description</th>
                              <th>Discount</th>
                          </tr>
                      </thead>
                      <tbody>
                          <template v-for="(types, typeIndex) in discount_types" :key="typeIndex">
                              <tr>                                 
                                  <template v-for="(value, key) in types" :key="key">
                                      <td v-if="key === 'description'">{{ value }}</td>
                                  </template>
                                  <template v-for="(value, key) in types" :key="key">
                                      <td v-if="key === 'discount'">
                                          <v-text-field
                                              type="text"
                                              density="compact"
                                              variant="outlined"
                                          ></v-text-field>
                                      </td>
                                  </template>
                              </tr>
                          </template>
                      </tbody>
                  </v-table>
              </v-container>
          </v-card-text>
          <v-divider></v-divider>
          <v-card-actions>
              <v-btn color="blue-darken-1" @click="closeDialog"> Close </v-btn>
              <v-spacer></v-spacer>
              <v-btn class="bg-primary text-white" type="submit">Save</v-btn>
          </v-card-actions>
      </v-card>
    </form>
  </v-dialog>
</template>

<script setup>
definePageMeta({
  layout: "root-layout",
});
const props = defineProps({
  open_class_discount_setup: {
      type: Boolean,
      default: () => false,
      required: true,
  },
  discount_types: Array,
});
const emits = defineEmits(['close-dialog' , 'handle-submit'])

const closeDialog = () => {
  emits("close-dialog");
};

const handleSubmit = () => {
  emits("handle-submit")
}

</script>

<style scoped>
</style>