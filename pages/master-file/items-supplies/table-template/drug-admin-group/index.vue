<template>
    <drug-admin-group :show="show" @close-dialog="router.back()" />
</template>

<script setup>
import DrugAdminGroup from '../../../../../components/reusables/items-services-templates/drug-admin-group/DrugAdminGroup.vue';

const show = ref(true);

const router = useRouter();

</script>

<style scoped>
</style>