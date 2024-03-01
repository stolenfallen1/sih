<template>
    <indications :show="show" @close-dialog="router.back()" />
</template>

<script setup>
import Indications from '../../../../../components/reusables/items-services-templates/indications/Indications.vue';

const show = ref(true);

const router = useRouter();

</script>

<style scoped>
</style>