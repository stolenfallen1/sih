<template>
    <v-dialog :model-value="open_cashier_settings" rounded="lg" @update:model-value="closeDialog" max-width="600px">
        <form @submit.prevent="onSubmit">
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
                                v-model="ORSequence.LastORnumber"
                                required
                                hide-details
                            ></v-text-field>
                        </v-col>
                        <v-col cols="6">
                            <v-text-field
                                variant="solo"
                                density="compact"
                                label="OR Suffix"
                                v-model="payload.ORSuffix"
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
                                label="OR V Suffix"
                                hide-details
                            ></v-text-field>
                        </v-col>
                        <v-col cols="6">
                            <v-text-field
                                variant="solo"
                                density="compact"
                                label="Manual OR #"
                                v-model="payload.manualORNumber"
                                hide-details
                            ></v-text-field>
                        </v-col>
                        <v-col cols="6">
                            <v-text-field
                                variant="solo"
                                density="compact"
                                label="Manul OR Suffix"
                                v-model="payload.manualOrNumberSuffix"
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
                                v-model="payload.shift_id"
                                :items="shift_data"
                            ></v-autocomplete>
                        </v-col>
                    </v-row>
                </v-card-text>
                <v-divider></v-divider>
                <v-card-actions>
                    <v-btn variant="outlined" color="info" @click="closeDialog"> Close </v-btn>
                    <v-spacer></v-spacer>
                    <v-btn class="bg-primary text-white" type="submit">Proceed</v-btn>
                </v-card-actions>
            </v-card>
        </form>
    </v-dialog>
</template>
<script setup>
import { useLastORnumber } from '~/store/lastORNumber';

const ORSequence = useLastORnumber();

const props = defineProps({
    open_cashier_settings: {
        type: Boolean,
        required: false,
    },
    onSubmit: {
        type: Function,
        required: true,
    }
});

const payload = ref({
    LastORnumber: null,
    collection_date: new Date().toISOString().substr(0, 10),
    shift_id: null,
});
const emits = defineEmits(["close-dialog", "save-settings"]);

const closeDialog = () => {
    emits("close-dialog");
    payload.value = {
        collection_date: new Date().toISOString().substr(0, 10),
        shift_id: null,
    };
};

const onSubmit = async () => {
    ORSequence.LastORnumber ? payload.value.LastORnumber = ORSequence.LastORnumber : null;
    const response = await useMethod("post", "cashier-settings", payload.value);
    if (response) {
        useSnackbar(true, "green", "Cashier settings updated successfully.");
        closeDialog();
        emits("save-settings", response.data);
    }
    setTimeout(() => {
        payload.value = {
            collection_date: new Date().toISOString().substr(0, 10),
        };
    });
};

const shift_data = ref({});
const shift_loading = ref(false);
const getShiftSchedule = async () => {
    shift_loading.value = true;
    const response = await useMethod("get", "get-shift-schedules", "", "");
    if (response) {
        shift_data.value = response;
        shift_loading.value = false;
        useShift(shift_data.value, payload.value);  
    } 
};

const getORSequence = async () => {
    const response = await useMethod("get", "get-or-sequence", "", "");
    if (response && response.data.length > 0) {
        let ORNumber = parseInt(response.data[0].LastORnumber, 10);
        
        if (ORNumber) {
            ORSequence.setLastORnumber(ORNumber + 1);
        } else {
            console.error("Failed to convert LastORnumber to a number");
        }
    }
};

onUpdated(() => {
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

onMounted(async() => {
    getORSequence();
});

watchEffect(() => {
    if (props.onSubmit()) {
        getORSequence();
    }
});
</script>

<style scoped>
</style>