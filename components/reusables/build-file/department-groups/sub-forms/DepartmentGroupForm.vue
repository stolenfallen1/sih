<template>
  <v-dialog
    :model-value="department_groups_form"
    rounded="lg"
    @update:model-value="closeDialog"
    scrollable
    max-width="600px"
  >
    <form @submit.prevent="handleSubmit">
      <v-card rounded="lg">
        <v-toolbar density="compact" color="#6984ff" hide-details>
          <v-toolbar-title>Department Group Details</v-toolbar-title>
          <v-btn color="white" @click="closeDialog">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-toolbar>
        <v-divider></v-divider>
        <v-card-text>
          <v-row>
            <v-col cols="12">
              <v-text-field
                density="compact"
                variant="outlined"
                required
                label="Description"
                v-model="payload.description"
                hide-details
                placeholder="Enter Description"
                clearable
              ></v-text-field>
            </v-col>
            <v-col cols="6">
              <v-text-field
                density="compact"
                variant="outlined"
                label="Prefix"
                hide-details
                v-model="payload.prefix"
                placeholder="Enter Prefix.."
                clearable
              ></v-text-field>
            </v-col>
            <v-col cols="6">
              <v-text-field
                hide-details
                density="compact"
                label="PostFix"
                variant="outlined"
                v-model="payload.postfix"
                placeholder="Enter PostFix.."
                clearable
              ></v-text-field>
            </v-col>
            <v-col cols="6">
              <v-text-field
                density="compact"
                variant="outlined"
                required
                label="Code"
                v-model="payload.id"
                hide-details
                readonly
                placeholder="Enter Code"
              ></v-text-field>
            </v-col>
            <v-col cols="6">
              <v-checkbox
                class="mb-0"
                hide-details
                v-model="payload.isactive"
                label="Status"
              ></v-checkbox>
            </v-col>
          </v-row>
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions>
          <v-btn color="blue-darken-1 border border-info" type="button" @click="closeDialog"> Close </v-btn>
          <v-spacer></v-spacer>
          <v-btn class="bg-primary text-white" type="submit">Submit</v-btn>
        </v-card-actions>
      </v-card>
    </form>
  </v-dialog>
</template>

<script setup>
const props = defineProps({
  department_groups_form: {
    type: Boolean,
    default: () => false,
    required: true,
  },
  payload: {
    type: Object,
    default: () => {},
  },
  isloading: {
    type: Boolean,
    default: () => false,
  },
});

const emits = defineEmits(["handle-submit", "close-dialog"]);
const handleSubmit = () => {
  console.log(props.payload);
  emits("handle-submit", props.payload);
};

const closeDialog = () => {
  emits("close-dialog");
};
</script>

<style scoped></style>
