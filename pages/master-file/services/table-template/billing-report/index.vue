<template>
    <billing-report-categories :show="show" @close-dialog="router.back()" />
</template>

<script setup>
import BillingReportCategories from '../../../../../components/reusables/items-services-templates/billing-report/BillingReportCategories.vue';

const show = ref(true);

const router = useRouter();

</script>

<style scoped>
</style>