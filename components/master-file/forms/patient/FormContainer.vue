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
                    <v-toolbar density="compact" color="#FFF">
                        <v-toolbar-title>Patient Information Form</v-toolbar-title>
                        <v-spacer></v-spacer>
                        <v-btn color="black" @click="closeDialog">
                            <v-icon>mdi-close</v-icon>
                        </v-btn>
                    </v-toolbar>
                    <v-tabs v-model="tab" bg-color="#6984FF" center-active>
                        <v-tab value="1">General</v-tab>
                        <v-tab value="2">Additional Info</v-tab>
                        <v-tab value="3">Contacts .Addresses</v-tab>
                        <v-tab value="4">Family Info</v-tab>
                        <v-tab value="5">Medical Cases</v-tab>
                        <v-tab value="6">Bad Habits</v-tab>
                        <v-tab value="7">Drugs .Medicines Taken</v-tab>
                        <v-tab value="8">Procedures</v-tab>
                        <v-tab value="9">Allergies</v-tab>
                        <v-tab value="10">Family Medical History</v-tab>
                        <v-tab value="11">Social History</v-tab>
                        <v-tab value="12">HMO. Guarantors History</v-tab>
                    </v-tabs>
                </v-card-title>
                <v-card-text>
                    <!-- Conditionally render content based on the selected tab -->
                    <div v-if="tab === '1'">
                        <general-form />
                    </div>
                    <div v-if="tab === '2'">
                        <additional-info />
                    </div>
                    <div v-if="tab === '3'">
                        <contacts-address />
                    </div>
                    <div v-if="tab === '4'">
                        <family-info />
                    </div>
                    <div v-if="tab === '5'">
                        <medical-cases />
                    </div>
                    <div v-if="tab === '6'">
                        <bad-habits />
                    </div>
                    <div v-if="tab === '7'">
                        <drugs-medicines />
                    </div>
                    <div v-if="tab === '8'">
                        <procedures />
                    </div>
                    <div v-if="tab === '9'">
                        <allergies />
                    </div>
                    <div v-if="tab === '10'">
                        <family-medical />
                    </div>
                    <div v-if="tab === '11'">
                        <social-history />
                    </div>
                    <div v-if="tab === '12'">
                        <hmo-guantors-history />
                    </div>
                </v-card-text>
                <v-divider></v-divider>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn
                        class="bg-primary text-white"
                        type="submit"
                        @click.prevent="submit"
                        >Save and Close</v-btn
                    >
                </v-card-actions>
            </v-card>
    </v-dialog>
</template>

<script setup>
import GeneralForm from "./GeneralForm.vue";
import AdditionalInfo from "./AdditionalInfo.vue";
import ContactsAddress from "./ContactsAddress.vue";
import FamilyInfo from "./FamilyInfo.vue";
import MedicalCases from "./MedicalCases.vue";
import BadHabits from "./BadHabits.vue";
import DrugsMedicines from "./DrugsMedicines.vue";
import Procedures from "./Procedures.vue";
import Allergies from "./Allergies.vue";
import FamilyMedical from "./FamilyMedical.vue";
import SocialHistory from "./SocialHistory.vue";
import HmoGuantorsHistory from "./HmoGuantorsHistory.vue";

const props = defineProps({
    form_container: {
        type: Boolean,
        default: () => false,
    },
})
const emits = defineEmits()

let tab = ref("1");

const closeDialog = () => {
    emits("close-dialog");
    tab.value = "1";
};

const submit = () => {
    alert("Submitted");
}

</script>

<style scoped>
.dialog-bottom-transition-enter-active,
.dialog-bottom-transition-leave-active {
    transition: transform 0.2s ease-in-out;
}
</style>