<template>
    <item-pricing-schemes :show="show" @close-dialog="router.back()" />
</template>

<script setup>
import ItemPricingSchemes from '../../../../../components/reusables/items-services-templates/item-pricing-schemes/ItemPricingSchemes.vue';

const show = ref(true);

const router = useRouter();

</script>

<style scoped>
</style>