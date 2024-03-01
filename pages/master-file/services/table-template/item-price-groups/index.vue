<template>
    <item-price-groups :show="show" @close-dialog="router.back()" />
</template>

<script setup>
import ItemPriceGroups from '../../../../../components/reusables/items-services-templates/item-price-groups/ItemPriceGroups.vue';

const show = ref(true);

const router = useRouter();

</script>

<style scoped>
</style>