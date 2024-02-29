<template>
    <collection-report-main :show="show" @close-dialog="router.back()" />
</template>

<script setup>
import CollectionReportMain from '../../../../../components/reusables/items-services-templates/collection-report-main/CollectionReportMain.vue';

const show = ref(true);

const router = useRouter();

</script>

<style scoped>
</style>