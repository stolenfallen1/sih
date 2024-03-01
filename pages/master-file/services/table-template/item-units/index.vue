<template>
    <item-units :show="show" @close-dialog="router.back()" />
</template>

<script setup>
import ItemUnits from '../../../../../components/reusables/items-services-templates/item-units/ItemUnits.vue';

const show = ref(true);

const router = useRouter();

</script>

<style scoped>
</style>