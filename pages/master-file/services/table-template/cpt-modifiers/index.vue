<template>
    <cpt-modifiers :show="show" @close-dialog="router.back()" />
</template>

<script setup>
import CptModifiers from '../../../../../components/reusables/items-services-templates/cpt-modifiers/CptModifiers.vue';

const show = ref(true);

const router = useRouter();

</script>

<style scoped>
</style>