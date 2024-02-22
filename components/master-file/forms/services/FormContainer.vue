<template>
    <v-dialog
        :model-value="form_container"
        fullscreen
        :scrim="false"
        transition="dialog-bottom-transition"
        scrollable
    >
        <v-card>
            <v-card-title>
                <v-card-actions>
                    <p>Manage Services Details</p>
                    <v-spacer></v-spacer>
                    <v-btn color="black" @click="closeDialog">X</v-btn>
                </v-card-actions>
                <v-tabs v-model="tab" bg-color="#6984FF" center-active>
                    <v-tab value="1">General</v-tab>
                    <v-tab value="2">Other Information</v-tab>
                    <v-tab value="3">CPT Specs</v-tab>
                </v-tabs>
            </v-card-title>
            <v-card-text>
                <div v-if="tab === '1'">
                    <general-form />
                </div>
                <div v-if="tab === '2'">
                    <other-information />
                </div>
                <div v-if="tab === '3'">
                    <cpt-specs />
                </div>
            </v-card-text>
            <v-divider></v-divider>
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn
                    class="bg-primary text-white"
                    type="submit"
                    @click.prevent="submit"
                >
                    Add Services
                </v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script setup>
import GeneralForm from "./GeneralForm.vue";
import OtherInformation from "./OtherInformation.vue";
import CptSpecs from "./CptSpecs.vue";

const props = defineProps({
    form_container: {
        type: Boolean,
        default: () => false,
    },
})

const tab = ref("1")

const emits = defineEmits()

const closeDialog = () => {
    emits("close-dialog")
    tab.value = "1"
}

const submit = () => {
    alert("Submitted")
}
</script>

<style scoped>
.dialog-bottom-transition-enter-active,
.dialog-bottom-transition-leave-active {
    transition: transform 0.2s ease-in-out;
}
</style>