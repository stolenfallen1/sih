<script setup>
    const props = defineProps({
        showDeathInfoDialog: {
            type: Boolean,
            default: () => false
        }
    })
    const emits = defineEmits(['close-dialog', 'submit-death-info']);

    const handleClose = () => {
        emits('close-dialog');
    }

    const handleSubmitDeathInfo = () => {
        emits('submit-death-info')
    }

</script>

<template>
    <v-dialog
        :show-death-info="showDeathInfoDialog" 
        @update:model-value="closeDialog"
        transition="dialog-bottom-transition"
        width="auto"
        >
        <template v-slot:activator="{ props: activatorProps }">
            <v-btn
            v-bind="activatorProps"
            text="Transition from Bottom"
            block
            ></v-btn>
        </template>
        <template v-slot:default="{ isActive }">
            <v-card>
            <v-toolbar title="Opening from the Bottom"></v-toolbar>

            <v-card-text class="text-h2 pa-12">
                Hello world!
            </v-card-text>

            <v-card-actions class="justify-end">
                <v-btn
                text="Close"
                @click="handleClose"
                ></v-btn>
            </v-card-actions>
            </v-card>
        </template>
    </v-dialog>
  </template>