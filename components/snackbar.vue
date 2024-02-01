<template>
  <v-snackbar :color="color" location="top" :model-value="show">
    {{ text }}
  </v-snackbar>
</template>
<script setup>
const props = defineProps({
  color: {
    type: String,
    default: () => 'success',
  },
  show: {
    type: Boolean,
    default: () => false,
  },
  text: {
    type: String,
    default: () => {},
  },
});
</script>
