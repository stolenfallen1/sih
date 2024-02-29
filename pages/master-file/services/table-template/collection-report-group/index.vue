<template>
    <collection-report-group :show="show" @close-dialog="router.back()" />
</template>

<script setup>
import CollectionReportGroup from '../../../../../components/reusables/items-services-templates/collection-report-group/CollectionReportGroup.vue';

const show = ref(true);

const router = useRouter();

</script>

<style scoped>
</style>