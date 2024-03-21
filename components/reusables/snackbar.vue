<template>
  <v-snackbar :color="snackbar.color" location="top" :model-value="snackbar.show">
    {{ snackbar.text }}
  </v-snackbar>
</template>
<script setup>
import { storeToRefs } from "pinia";
import { useSnackBarStore } from "~/store/SnackBar";
const { show,text,color } = storeToRefs(useSnackBarStore());
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
const snackbar = ref({});
snackbar.value.show = show;
snackbar.value.color = color;
snackbar.value.text = text;
</script>
