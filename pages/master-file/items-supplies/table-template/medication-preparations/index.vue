<template>
    <medication-preparations :show="show" @close-dialog="router.back()" />
</template>

<script setup>
import MedicationPreparations from '../../../../../components/reusables/items-services-templates/medication-preparations/MedicationPreparations.vue';

const show = ref(true);

const router = useRouter();

</script>

<style scoped>
</style>