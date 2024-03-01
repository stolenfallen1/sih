<template>
    <generic-names :show="show" @close-dialog="router.back()" />
</template>

<script setup>
import GenericNames from '../../../../../components/reusables/items-services-templates/generic-names/GenericNames.vue';

const show = ref(true);

const router = useRouter();

</script>

<style scoped>
</style>