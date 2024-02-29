<template>
    <dosage :show="show" @close-dialog="router.back()" />
</template>

<script setup>
import Dosage from '../../../../../components/reusables/items-services-templates/dosages/Dosage.vue';

const show = ref(true);

const router = useRouter();

</script>

<style scoped>
</style>