<template>
    <medication-durations :show="show" @close-dialog="router.back()" />
</template>

<script setup>
import MedicationDurations from '../../../../../components/reusables/items-services-templates/medication-durations/MedicationDurations.vue';

const show = ref(true);

const router = useRouter();

</script>

<style scoped>
</style>