<template>
  <v-snackbar   color="success" vertical="right" location="top"  :model-value="show">
    {{ text }}
  </v-snackbar>
</template>
<script setup>
const props = defineProps({
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
