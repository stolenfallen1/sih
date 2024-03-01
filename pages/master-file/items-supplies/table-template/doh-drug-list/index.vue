<template>
    <doh-drug-list :show="show" @close-dialog="router.back()" />
</template>

<script setup>
import DohDrugList from '../../../../../components/reusables/items-services-templates/doh-drug-list/DohDrugList.vue';

const show = ref(true);

const router = useRouter();

</script>

<style scoped>
</style>