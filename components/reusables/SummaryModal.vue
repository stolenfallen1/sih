<template>
    <v-dialog :model-value="show" rounded="lg" @update:model-value="closeDialog" scrollable max-width="650px">
        <v-card rounded="lg">
            <v-toolbar density="compact" color="#6984ff" hide-details>
                <v-toolbar-title>{{ summary_header }} Summaries</v-toolbar-title>
                <v-btn color="white" @click="closeDialog">
                    <v-icon>mdi-close</v-icon>
                </v-btn>
            </v-toolbar>
            <v-card-text>
                <v-row>
                    <v-col cols="12" style="display: flex;" v-for="(item, index) in data" :key="index" :class="index === 0 ? '' : 'form-col'">
                        <div :style="{ backgroundColor: item.color, width: '5px', marginRight: '5px' }"></div>
                        <v-text-field 
                            :label="item.label"
                            :model-value="item.value"
                            variant="outlined"
                            density="compact"
                            hide-details 
                            readonly
                        ></v-text-field>
                    </v-col>
                </v-row>
            </v-card-text>
            <v-divider></v-divider>
            <v-card-actions>
                <v-btn color="blue-darken-1 border border-info" @click="closeDialog"> Close </v-btn>
                <v-spacer></v-spacer>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script setup>
const emits = defineEmits(['close-dialog']);
const props = defineProps({
    show: {
        type: Boolean,
        default: () => false,
    },
    summary_header: {
        type: String,
        default: () => '',
    },
    data: {
        type: Array,
        default: () => [],
    },
});

const closeDialog = () => {
    emits('close-dialog');
};
</script>

<style scoped>
.form-col {
    margin-top: -16px !important;
}
</style>