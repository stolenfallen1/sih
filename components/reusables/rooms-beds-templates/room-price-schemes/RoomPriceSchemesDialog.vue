<template>
  <v-dialog :model-value="show" persistent hide-overlay width="800" scrollable>
      <v-toolbar density="compact" color="#6984ff" hide-details>
          <v-toolbar-title>Room Price Schemes</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-btn color="white" @click="closeDialog">
              <v-icon>mdi-close</v-icon>
          </v-btn>
      </v-toolbar>
      <v-card>
          <v-card-text>
              <v-container>
                  <v-table density="compact" hide-details>
                      <thead>
                          <tr>
                              <th><v-icon>mdi-desktop-classic</v-icon></th>
                              <th>Code</th>
                              <th>Description</th>
                              <th>Actions</th>
                          </tr>
                      </thead>
                      <tbody>
                          <template v-for="(prices, typeIndex) in room_price" :key="typeIndex">
                              <tr>    
                                  <template v-for="(value, key) in prices" :key="key">
                                      <td v-if="key === 'system_default'">
                                          <v-checkbox density="compact"></v-checkbox>
                                      </td>
                                  </template>                             
                                  <template v-for="(value, key) in prices" :key="key">
                                      <td v-if="key === 'code'">{{ value }}</td>
                                  </template>
                                  <template v-for="(value, key) in prices" :key="key">
                                      <td v-if="key === 'description'">{{ value }}</td>
                                  </template>
                                  <template v-for="(value, key) in prices" :key="key">
                                        <td v-if="key === 'actions'">
                                            <div v-if="value === true">
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
  <room-price-schemes-form :open_form_dialog="open_form_dialog" @close-dialog="closeFormDialog" @handle-submit="onSubmit" />
  <deleteConfirmation :show="confirmation" @confirm="confirm" @close="closeconfirmation" />
</template>

<script setup>
import RoomPriceSchemesForm from './sub-forms/RoomPriceSchemesForm.vue';

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
const room_price = [
  { system_default: "No", code: "Standard", description: "Standard", actions: true },
  { system_default: "No", code: "Non-standard", description: "Non-standard", actions: true },
]

const closeDialog = () => {
    emits('close-dialog')
}

const openFormDialog = () => {
  open_form_dialog.value = true
}

const closeFormDialog = () => {
  open_form_dialog.value = false
}

const onSubmit = () => {
  alert("Submitted")
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

</script>

<style scoped>
</style>