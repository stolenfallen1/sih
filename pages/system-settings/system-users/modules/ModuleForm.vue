<template>
  <v-dialog :model-value="moduleDialog" @update:model-value="handleclose" hide-overlay width="350" scrollable>
    <form  @submit.prevent="handleSubmit(usergroup_payload)">
      <v-card rounded="lg">
        <v-toolbar density="compact" color="#6984ff" hide-details>
            <v-toolbar-title>User Groups</v-toolbar-title>
            <v-btn color="white" @click="handleclose">
                <v-icon>mdi-close</v-icon>
            </v-btn>
        </v-toolbar>
        <v-divider></v-divider>
        <v-card-text>
          <v-text-field
            required
            variant="outlined"
            density="compact"
            v-model="usergroup_payload.name"
            :readonly="usergroup_payload.type == 'view'"
            label="User Group Name"
          ></v-text-field>

          <v-text-field
            required
            variant="outlined"
            density="compact"
            v-model="usergroup_payload.display_name"
            :readonly="usergroup_payload.type == 'view'"
            label="User Group Display Name"
          ></v-text-field>
          <v-checkbox
            required
            label="Is Active"
            density="compact"
            color="#117dad"
            v-model="usergroup_payload.isactive"
            :readonly="usergroup_payload.type == 'view'"
          ></v-checkbox>
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions>
          <v-btn color="blue-darken-1 border border-info" @click="handleclose"> Close </v-btn>
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
