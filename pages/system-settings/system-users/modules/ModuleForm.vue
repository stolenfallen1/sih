<template>
  <v-dialog :model-value="moduleDialog"  hide-overlay width="350" scrollable>
    <form  @submit.prevent="handleSubmit(usergroup_payload)">
    <v-card>
      <v-card-title> User Groups</v-card-title>
      <v-divider></v-divider>
      <v-card-text>
        <v-text-field
          required
          variant="outlined"
          density="compact"
          v-model="usergroup_payload.name"
          label="User Group Name"
        ></v-text-field>

        <v-text-field
          required
          variant="outlined"
          density="compact"
          v-model="usergroup_payload.display_name"
          label="User Group Display Name"
        ></v-text-field>
        <v-checkbox
          required
          label="Is Active"
          density="compact"
          color="#117dad"
          v-model="usergroup_payload.isactive"
        ></v-checkbox>
      </v-card-text>
      <v-divider></v-divider>
      <v-card-actions>
        <v-btn class="bg-grey" @click="handleclose">Close</v-btn>
        <v-spacer></v-spacer>
        <v-btn type="submit" v-if="usergroup_payload.type == 'edit' || usergroup_payload.type == 'new'" class="bg-primary">Save and Close</v-btn>
      </v-card-actions>
    </v-card>
    </form>
  </v-dialog>
</template>
<script setup>
const emit = defineEmits(["close-dialog"]);
const props = defineProps({
  moduleDialog: {
    type: Boolean,
    default: () => false,
  },
  usergroup_payload: {
    type: Object,
    default: () => {},
  },
});
const handleclose = () => {
  emit("close-dialog");
};
const handleSubmit = (usergroup_payload)=>{
    emit("submit-user-group",usergroup_payload)
    console.log(usergroup_payload);
}
</script>
