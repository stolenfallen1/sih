<template>
    <cpt-sections :show="show" @close-dialog="router.back()" />
</template>

<script setup>
import CptSections from '../../../../../components/reusables/items-services-templates/cpt-sections/CptSections.vue';

const show = ref(true);

const router = useRouter();

</script>

<style scoped>
</style>