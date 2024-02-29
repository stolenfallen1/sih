<template>
    <cpt-sub-sections :show="show" @close-dialog="router.back()" />
</template>

<script setup>
import CptSubSections from '../../../../../components/reusables/items-services-templates/cpt-sub-sections/CptSubSections.vue';

const show = ref(true);

const router = useRouter();

</script>

<style scoped>
</style>