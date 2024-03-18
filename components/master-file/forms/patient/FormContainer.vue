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
                </v-card-title>
                <v-divider></v-divider>
                <v-card-text>
                    <v-row>
                        <v-col cols="2" >
                        <v-tabs
                            v-model="tab"
                            direction="vertical"
                            color="primary"
                            center-active
                            density="compact"
                        >
                            <v-tab value="0"><v-icon start>mdi-form-select</v-icon> General</v-tab>
                            <v-tab value="1"><v-icon start>mdi-form-select</v-icon>Additional Info</v-tab>
                            <v-tab value="2"><v-icon start>mdi-form-select</v-icon>Contacts .Addresses</v-tab>
                            <v-tab value="3"><v-icon start>mdi-form-select</v-icon>Family Info</v-tab>
                            <v-tab value="4"><v-icon start>mdi-form-select</v-icon>Medical Cases</v-tab>
                            <v-tab value="5"><v-icon start>mdi-form-select</v-icon>Bad Habits</v-tab>
                            <v-tab value="6"><v-icon start>mdi-form-select</v-icon>Drugs .Medicines Taken</v-tab>
                            <v-tab value="7"><v-icon start>mdi-form-select</v-icon>Procedures</v-tab>
                            <v-tab value="8"><v-icon start>mdi-form-select</v-icon>Allergies</v-tab>
                            <v-tab value="9"><v-icon start>mdi-form-select</v-icon>Family Medical History</v-tab>
                            <v-tab value="10"><v-icon start>mdi-form-select</v-icon>Social History</v-tab>
                            <v-tab value="11"><v-icon start>mdi-form-select</v-icon>HMO. Guarantors History</v-tab>
                        </v-tabs>
                        </v-col>
                        <v-col cols="10">
                        <v-window v-model="tab">
                            <v-window-item class="pa-1">
                              <general-form :form_payload="form_payload" />
                            </v-window-item>
                            <v-window-item style="width:100%;" class="pa-1">
                                <additional-info :form_payload="form_payload"  />
                            </v-window-item>
                            <v-window-item  class="pa-1">
                                <contacts-address :form_payload="form_payload" />
                            </v-window-item>
                             <v-window-item  class="pa-1">
                                <family-info :form_payload="form_payload" />
                            </v-window-item>
                             <v-window-item value="option-4" class="pa-1">
                                 <medical-cases :form_payload="form_payload" />
                            </v-window-item>
                             <v-window-item value="option-4" class="pa-1">
                                <bad-habits :form_payload="form_payload" />
                            </v-window-item>
                             <v-window-item value="option-4" class="pa-1">
                                <drugs-medicines :form_payload="form_payload" />
                            </v-window-item>
                             <v-window-item value="option-4" class="pa-1">
                                  <procedures :form_payload="form_payload" />
                            </v-window-item>
                            <v-window-item value="option-4" class="pa-1">
                               <allergies :form_payload="form_payload" />
                            </v-window-item>
                             <v-window-item value="option-4" class="pa-1">
                              <family-medical :form_payload="form_payload" />
                            </v-window-item >
                             <v-window-item value="option-4" class="pa-1">
                                <social-history :form_payload="form_payload" />
                            </v-window-item>
                            <v-window-item value="option-4" class="pa-1">
                                <hmo-guantors-history :form_payload="form_payload" />
                            </v-window-item>
                        </v-window>
                        </v-col>
                    </v-row>
                </v-card-text>
                <v-divider></v-divider>
                <!-- <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn
                        class="bg-primary text-white"
                        type="submit"
                        @click.prevent="submit"
                        >Save and Close</v-btn
                    >
                </v-card-actions> -->
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
    form_payload:{
        type:Object,
        default:()=>{}
    }
})
const emits = defineEmits(['close-dialog'])

let tab = ref("0");

const closeDialog = () => {
    emits("close-dialog");
    tab.value = "0";
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