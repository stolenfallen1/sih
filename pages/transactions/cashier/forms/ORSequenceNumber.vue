<template>
    <div>
        <v-dialog :model-value="open_sequence_setting" rounded="lg" @update:model-value="closeDialog"  scrollable max-width="600px">
            <v-card rounded="lg">
                <v-toolbar density="compact" color="#107bac" hide-details>
                    <v-toolbar-title>Cashier Environment Setting</v-toolbar-title>
                    <v-btn color="white" @click="closeDialog">
                        <v-icon>mdi-close</v-icon>
                    </v-btn>
                </v-toolbar>
                <v-divider></v-divider>
                <v-card-text>
                    <v-row>
                        <v-col cols="12">
                            <v-text-field
                                readonly
                                variant="solo"
                                density="compact"
                                label="Cashier"
                                v-model="payload.cashier_name"
                                hide-details
                            ></v-text-field>
                        </v-col>
                        <v-col cols="6">
                            <v-text-field
                                variant="solo"
                                density="compact"
                                label="OR Number"
                                hide-details
                            ></v-text-field>
                        </v-col>
                        <v-col cols="6">
                            <v-text-field
                                variant="solo"
                                density="compact"
                                hide-details
                            ></v-text-field>
                        </v-col>
                        <v-col cols="6">
                            <v-text-field
                                variant="solo"
                                density="compact"
                                label="OR Number (V)"
                                hide-details
                            ></v-text-field>
                        </v-col>
                        <v-col cols="6">
                            <v-text-field
                                variant="solo"
                                density="compact"
                                hide-details
                            ></v-text-field>
                        </v-col>
                        <v-col cols="6">
                            <v-text-field
                                variant="solo"
                                density="compact"
                                label="Manual OR #"
                                hide-details
                            ></v-text-field>
                        </v-col>
                        <v-col cols="6">
                            <v-text-field
                                variant="solo"
                                density="compact"
                                hide-details
                            ></v-text-field>
                        </v-col>
                        <v-col cols="12">
                            <v-text-field
                                type="date"
                                variant="solo"
                                v-model="payload.collection_date"
                                readonly
                                density="compact"
                                label="Collection Date"
                                hide-details
                            ></v-text-field>
                        </v-col>
                        <v-col cols="12">
                            <v-autocomplete
                                item-title="shift_description"
                                item-value="id"
                                variant="solo"
                                density="compact"
                                label="Shift"
                                hide-details
                                v-model="payload.shift"
                                :items="shift_data"
                            ></v-autocomplete>
                        </v-col>
                    </v-row>
                </v-card-text>
                <v-divider></v-divider>
                <v-card-actions>
                    <v-btn variant="outlined" color="info" @click="closeDialog"> Close </v-btn>
                    <v-spacer></v-spacer>
                    <v-btn class="bg-primary text-white" @click="onSubmit">Proceed</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </div>
</template>
<script setup>
const props = defineProps({
    open_sequence_setting: {
        type: Boolean,
        default: () => false,
    },
});

const payload = ref({
    collection_date: new Date().toISOString().substr(0, 10),
});
const emits = defineEmits(["close-dialog", "save-settings"]);

const closeDialog = () => {
    emits("close-dialog");
};

const onSubmit = () => {
    emits("save-settings", payload.value);
};

const shift_data = ref({});
const shift_loading = ref(false);
const getShiftSchedule = async () => {
    shift_loading.value = true;
    const response = await useMethod("get", "get-shift-schedules", "", "");
    if (response) {
        shift_data.value = response;
        shift_loading.value = false;
        determineCurrentShift();
    } 
};

const determineCurrentShift = () => {
    const currentHour = new Date().getHours();
    let nearestShift = null;
    let smallestDiff = 24;

    for (const shift of shift_data.value) {
        const beginHour = parseInt(shift.beginning_military_hour);
        const endHour = parseInt(shift.end_military_hour);

        let diff = 0;
        if (beginHour <= endHour) {
            if (currentHour >= beginHour && currentHour < endHour) {
                diff = 0;
            } else if (currentHour < beginHour) {
                diff = beginHour - currentHour;
            } else {
                diff = 24 - (currentHour - beginHour);
            } 
        } else {
            if (currentHour >= beginHour || currentHour < endHour) {
                diff = 0;
            } else if (currentHour < beginHour) {
                diff = beginHour - currentHour;
            } else {
                diff = 24 - (currentHour - beginHour);
            }
        }
        
        if (diff < smallestDiff) {
            smallestDiff = diff;
            nearestShift = shift;
        }
    }
    if (nearestShift) {
        payload.value.shift = nearestShift.id;
    }
};

onMounted(() => {
    getShiftSchedule();
    const userDetails = localStorage.getItem("user_details");
    if (userDetails) {
        try {
            const parsedDetails = JSON.parse(userDetails);
            const userData = JSON.parse(parsedDetails.value);
            payload.value.cashier_name = userData.name || '';
        } catch (error) {
            console.error('Error parsing user details from localStorage:', error);
        }
    }
});
</script>

<style scoped>
</style>