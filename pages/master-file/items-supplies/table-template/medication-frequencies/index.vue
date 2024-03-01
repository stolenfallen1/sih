<template>
    <medication-frequencies :show="show" @close-dialog="router.back()" />
</template>

<script setup>
import MedicationFrequencies from '../../../../../components/reusables/items-services-templates/medication-frequencies/MedicationFrequencies.vue';

const show = ref(true);

const router = useRouter();

</script>

<style scoped>
</style>