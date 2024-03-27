<template>
  <v-dialog :model-value="show" rounded="lg" @update:model-value="closeDialog"  hide-overlay width="800" scrollable>
    <v-card rounded="lg">
          <v-toolbar density="compact" color="#6984ff" hide-details>
              <v-toolbar-title>Room Charge Settings</v-toolbar-title>
              <v-spacer></v-spacer>
              <v-btn color="white" @click="closeDialog">
                  <v-icon>mdi-close</v-icon>
              </v-btn>
          </v-toolbar>
          <v-card-text>
              <v-container>
                  <v-table density="compact">
                      <thead>
                          <tr>
                              <th><v-icon>mdi-desktop-classic</v-icon></th>
                              <th>Calculated Hour(s) Range From</th>
                              <th>Calculated Hour(s) Range To</th>
                              <th>Hour(s) to Charge</th>
                              <th>Day(s) to Charge</th>
                              <th>Notes. Remarks</th>
                              <th>Actions</th>
                          </tr>
                      </thead>
                      <tbody>
                          <template v-for="(charges, typeIndex) in room_charge" :key="typeIndex">
                              <tr>
                                  <template v-for="(value, key) in charges" :key="key">
                                      <td v-if="key === 'system_default'">
                                          <v-checkbox density="compact"></v-checkbox>
                                      </td>
                                  </template>                                
                                  <template v-for="(value, key) in charges" :key="key">
                                      <td v-if="key === 'calculatedHoursFrom'">{{ value }}</td>
                                  </template>
                                  <template v-for="(value, key) in charges" :key="key">
                                      <td v-if="key === 'calculatedHoursTo'">{{ value }}</td>
                                  </template>
                                  <template v-for="(value, key) in charges" :key="key">
                                      <td v-if="key === 'hours_charge'">{{ value }}</td>
                                  </template>
                                  <template v-for="(value, key) in charges" :key="key">
                                      <td v-if="key === 'days_charge'">{{ value }}</td>
                                  </template>
                                  <template v-for="(value, key) in charges" :key="key">
                                      <td v-if="key === 'remarks'">{{ value }}</td>
                                  </template>
                                  <template v-for="(value, key) in charges" :key="key">
                                    <td v-if="key === 'actions'">
                                        <div v-if="value == true">
                                            <v-icon color="green" class="mr-1" @click="openFormDialog">mdi-pencil</v-icon>
                                            <v-icon color="red" @click="onDelete">mdi-trash-can</v-icon>
                                        </div>
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
              <v-btn class="bg-primary text-white" type="submit" @click="openFormDialog">Add</v-btn>
          </v-card-actions>
      </v-card>
  </v-dialog>
  <room-charge-settings-form :open_form_dialog="open_form_dialog" @close-dialog="closeFormDialog" @handle-submit="onSubmit" />
  <deleteConfirmation :show="confirmation" @confirm="confirm" @close="closeconfirmation" />
</template>

<script setup>
import RoomChargeSettingsForm from './sub-forms/RoomChargeSettingsForm.vue';

const props = defineProps({
    show: {
        type: Boolean,
        default: () => false,
        required: true,
    },
})

const emits = defineEmits(['close-dialog'])

const confirmation = ref(false)
const open_form_dialog = ref(false)
const room_charge = [
  { system_default: "No", calculatedHoursFrom: 1, calculatedHoursTo: 24, hours_charge: 24, days_charge: 1, remarks: "", actions: true },
  { system_default: "No", calculatedHoursFrom: 2, calculatedHoursTo: 18, hours_charge: 18, days_charge: 1, remarks: "", actions: true },
  { system_default: "No", calculatedHoursFrom: 1, calculatedHoursTo: 16, hours_charge: 16, days_charge: 1, remarks: "", actions: true },
]

const openFormDialog = () => {
  open_form_dialog.value = true
}

const closeFormDialog = () => {
  open_form_dialog.value = false
}

const confirm = () => {
    confirmation.value = false;
}
const closeconfirmation = () => {
    confirmation.value = false;
}
const onDelete = (item) => {
    confirmation.value = true;
}

const onSubmit = () => {
  alert("Submitted")
}

const closeDialog = () => {
  emits('close-dialog')
}


</script>

<style scoped>
</style>