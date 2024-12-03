<template>
    <v-dialog :model-value="show" rounded="lg" @update:model-value="closeDialog" scrollable max-width="650px">
        <div class="text-center" v-if="loading">
            <v-progress-circular :model-value="value" :rotate="360" :size="100" :width="15" color="#107bac">
                <template v-slot:default> {{ value }} % </template>
            </v-progress-circular><br/>
          Please wait ...
        </div>
        <v-card rounded="lg">
            <v-toolbar density="compact" color="#107bac" hide-details>
                <v-toolbar-title>{{ summary_header }} </v-toolbar-title>
                <v-btn color="white" @click="closeDialog">
                    <v-icon>mdi-close</v-icon>
                </v-btn>
            </v-toolbar>
            <v-card-text>
                <!-- <v-container>
                    <v-row justify="space-around">
                        <v-date-picker
                            v-model="payload.reportDate"
                            elevation="24"
                            @input="handleDateChange"
                        ></v-date-picker>
                    </v-row>
                </v-container> -->
                <v-list >
                    <v-subheader>REPORTS</v-subheader>
                    <v-text-field
                        type="date"
                        v-model="payload.reportDate"
                        variant="outlined"
                        density="compact"
                    >

                    </v-text-field>
                    <v-list-item-group
                        v-model="selectedItem"
                        color="primary"
                    >
                        <v-list-item
                        v-for="(item, i) in items"
                        :key="item.id"
                        class="d-flex align-center"
                        >
                            <input 
                                type="checkbox" 
                                :checked="selectedId === item.id" 
                                @change="toggleSelection(item.id)" 
                                class="me-4 box"
                            />
                            <v-icon small class="me-2">{{ item.icon }}</v-icon>
                            <span>{{ item.text }}</span>
                        </v-list-item>
                    </v-list-item-group>
                </v-list>
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
        isLoading: {
            type: Boolean,
            default: () => false,
        },
    });

    const payload = ref({});
    const closeDialog = () => {
        emits('close-dialog');
    };

    const value = ref(0)
    const interval = ref(null)

    const startLoader = () => {
        clearInterval(interval.value);
        value.value = 0;
        interval.value = setInterval(() => {
            if (value.value === 100) {
                value.value = 0 
            } else {
                value.value += 10
            }
        }, 1000)
    }

    const stopLoader = () => {
        clearInterval(interval.value);
        value.value = 0; 
    };

    const loading = ref(false);
    const items = ref([
        {text: 'Census Report (By Stations)', icon: 'mdi-newspaper', id: '1' },
        {text: 'Census Report (By Stations)', icon: 'mdi-newspaper', id: '2' }
    ]);

    const selectedId = ref(null);

    const toggleSelection = (id) => {
        selectedId.value = selectedId.value === id ? null : id;
        payload.value.reportId = id;
        if(id === '1') {
            handleReportByDept();
        }
    };

    // const handleDateChange = (newDate) => {
    //     payload.value.payload.reportDate = newDate;
    // };

  
    // watch(() => payload.value.payload.reportDate, (newDate) => {
    //     console.log('Report date changed to:', newDate);
    // });

    const handleReportByDept = async () => {
        loading.value = true;
        startLoader();
        try {
            const response = await useMethod("get", `generate-er-daily-report?reportDate=${payload.value.reportDate}&reportId=${payload.value.reportId}`, "", "");
            if (response) {
                const blobUrl = URL.createObjectURL(response);
                setTimeout(() => {
                    stopLoader();
                    loading.value = false;
                    window.open(blobUrl, '_blank');
                }, 1000);
            } else {
                useSnackbar(true, "red", response.message || 'Failed to generate statement');
                isLoading.value = false;
            }
        } catch (error) {
            if (error.response && error.response.status === 404) {
                useSnackbar(true, "red", error.response.message || 'Billing is empty');
            } else {
                useSnackbar(true, "red", error.response.message || 'Failed to generate statement');
            }
            isLoading.value = false;
        } finally {
            isLoading.value = false;
            stopLoader();
        }
    }

</script>

<style scoped>
    .form-col {
        margin-top: -16px !important;
    }
    .box {
        height: 18px !important;
        width: 18px !important;
    }
</style>