<template>
   <div>{{ route.params}}1</div>
</template>

<script setup>
definePageMeta({
    layout: "root-layout",
});
const route = useRoute()

// When accessing /posts/1, route.params.id will be 1
console.log(route.params.id)
const dialog = ref(true);
</script>
<style scoped></style>
