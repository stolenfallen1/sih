<template>
    <div>
      <v-dialog
        :model-value="showWarning"
        @update:model-value="handleClose"
        max-width="300px"
      >
        <v-card>
          	<v-divider></v-divider>
          	<v-card-text>
				<div class="text-center">
				<v-icon size="80" color="red">mdi-alert</v-icon>
				</div>
				<h2 class="mt-3" style="text-align: center;">Warning</h2>
				<p>Total charges exceed the credit limit</p>
				<p>Would you like to continue?</p>
          	</v-card-text>
			<v-divider></v-divider>
			<v-card-actions>
				<v-btn color="blue darken-1" outlined @click="handleClose">
					No
				</v-btn>
				<v-spacer></v-spacer>
				<v-btn color="blue darken-1" @click="handleConfirm" outlined>
					Confirm
				</v-btn>
			</v-card-actions>
        </v-card>
      </v-dialog>
    </div>
  </template>
  
  <script setup>
  const emits = defineEmits(['close', 'confirm']);
  const props = defineProps({
    showWarning: {
      type: Boolean,
      default: () => false,
    },
  });
  
  const handleClose = () => {
    emits('close');
  };
  
  const handleConfirm = () => {
    emits('confirm');
  };
  </script>
  