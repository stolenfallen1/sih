<template>
    <v-dialog :model-value="open_user_profile" rounded="lg" @update:model-value="closeDialog" scrollable max-width="550px">
        <v-card rounded="lg">
            <v-toolbar density="compact" color="#FFFF" hide-details>
                <v-toolbar-title>Profile</v-toolbar-title>
                <v-btn color="#FFF" @click="closeDialog">
                    <v-icon color="#000">mdi-close</v-icon>
                </v-btn>
            </v-toolbar>
            <v-card-text>
                <v-row>
                    <v-col cols="12" class="text-center">
                        <v-avatar size="180" class="mb-2">
                            <img src="https://via.placeholder.com/180" alt="User Avatar">
                        </v-avatar>
                        <p>Greetings! {{ name }}</p>
                    </v-col>
                </v-row>
                <v-card elevation="0" class="mt-4 tab-container">
                    <v-tabs v-model="tab" background-color="transparent" grow>
                        <v-tab ref="tab0" :class="{ 'active-tab': tab === 0 }" class="tab-button" @click="updateTab(0)">
                            <v-icon start>mdi-account</v-icon> Account Information
                        </v-tab>
                        <v-tab ref="tab1" :class="{ 'active-tab': tab === 1 }" class="tab-button" @click="updateTab(1)">
                            <v-icon start>mdi-file-document-outline</v-icon> Logs
                        </v-tab>
                    </v-tabs>
                    <v-window v-model="tab">
                        <v-window-item>
                            <v-container>
                                <form @submit.prevent="onUpdate">
                                    <v-row>
                                        <v-col cols="6">
                                            <v-text-field
                                                label="Last Name"
                                                variant="outlined"
                                                density="compact"
                                                hide-details
                                                readonly
                                            ></v-text-field>
                                        </v-col>
                                        <v-col cols="6">
                                            <v-text-field
                                                label="First Name"
                                                variant="outlined"
                                                density="compact"
                                                hide-details
                                                readonly
                                            ></v-text-field>
                                        </v-col>
                                        <v-col cols="6" class="form-col">
                                            <v-text-field
                                                label="Age"
                                                variant="outlined"
                                                density="compact"
                                                hide-details
                                                readonly
                                            ></v-text-field>
                                        </v-col>
                                        <v-col cols="6" class="form-col">
                                            <v-text-field
                                                label="Birthdate"
                                                type="date"
                                                variant="outlined"
                                                density="compact"
                                                hide-details
                                                readonly
                                            ></v-text-field>
                                        </v-col>
                                        <v-col cols="12" class="form-col">
                                            <v-text-field
                                                label="Username"
                                                variant="outlined"
                                                density="compact"
                                                hide-details
                                            ></v-text-field>
                                        </v-col>
                                        <v-col cols="12" class="form-col">
                                            <v-text-field
                                                label="Password"
                                                variant="outlined"
                                                density="compact"
                                                hide-details
                                            ></v-text-field>
                                        </v-col>
                                    </v-row>
                                    <v-btn class="bg-primary text-white mt-2" type="submit">Update</v-btn>
                                </form>
                            </v-container>
                        </v-window-item>
                        <v-window-item>
                            <v-container> 
                                <p>Charge Patient 1</p>
                                <p>Discharge Patient 666</p>
                                <p>Tagged Test Patient 456</p>
                            </v-container>
                        </v-window-item>
                    </v-window>
                </v-card>
            </v-card-text>
        </v-card>
    </v-dialog>
</template>

<script setup>
const props = defineProps({
    open_user_profile: {
        type: Boolean,
        default: () => false,
        required: true,
    },
});

const name = ref('');
const emits = defineEmits(["close-dialog"]);
const tab = ref(0);

onMounted(() => {
    const userDetails = localStorage.getItem("user_details");
    if (userDetails) {
        try {
            const parsedDetails = JSON.parse(userDetails);
            const userData = JSON.parse(parsedDetails.value);
            name.value = userData.name || '';
        } catch (error) {
            console.error('Error parsing user details from localStorage:', error);
        }
    }
});

const updateTab = (index) => {
    tab.value = index;
};

const onUpdate = () => {
    alert('Update button clicked!');
}

const closeDialog = () => {
    emits("close-dialog");
};
</script>

<style scoped>
.text-center {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 20px;
}
.tab-container {
    background: none;
    box-shadow: none;
    border-radius: 20px;
}
.tab-button {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 10px;
    font-size: 18px;
    font-weight: 500;
    color: #107bac;
}
.tab-button.active-tab {
    color: #ffffff;
    background-color: #107bac;
}
.tab-button:not(.active-tab) {
    color: #107bac; 
    background-color: transparent;
}
.form-col {
    margin-top: -16px !important;
}
</style>
