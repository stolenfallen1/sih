<template>
  <v-snackbar
    :style="{ 'margin-top': calcMargin(index) }"
    v-for="(error, index) in messages"
    :key="index"
    :color="snackbar.color"
    location="top right"
    :model-value="show"
  >
    {{ error }}
  </v-snackbar>
</template>
<script setup>
import { storeToRefs } from "pinia";
import { useMultipleSnackBarStore } from "~/store/MultipleSnackBar";
const { show, messages, color } = storeToRefs(useMultipleSnackBarStore());
const props = defineProps({
  color: {
    type: String,
    default: () => "success",
  },
  show: {
    type: Boolean,
    default: () => false,
  },
  messages: {
    type: Array,
    default: () => [],
  },
});
const snackbar = ref({});
snackbar.value.show = show;
snackbar.value.color = color;
snackbar.value.messages = messages;
const calcMargin = (i) => {
  return i * 52 + "px";
};
</script>
