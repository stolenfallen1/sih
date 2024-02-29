<template>
    <department-groups :show="show" @close-dialog="router.back()" />
</template>

<script setup>
import DepartmentGroups from '../../../../../components/reusables/items-services-templates/department-groups/DepartmentGroups.vue';

const show = ref(true);

const router = useRouter();

</script>

<style scoped>
</style>