<template>
    <v-card>
        <v-card-title>Setup and Options</v-card-title>
        <v-card-text>
            <v-row>
                <v-col cols="12">
                    <v-expansion-panels v-model="panel" multiple>
                        <v-expansion-panel v-for="(group, index) in groupedSettings" :key="index">
                            <template v-slot:title>
                                <h3 style="font-style: italic;">{{ index }}</h3>
                            </template>
                            <v-expansion-panel-text>
                                <v-table density="compact">
                                    <thead>
                                        <tr>
                                            <th style="font-weight: bold;">Setting Description</th>
                                            <th v-if="group.some(setting => setting.valuedesc)" style="font-weight: bold;">
                                                Setting Explanation
                                            </th>
                                            <th></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr v-for="(setting, index) in group" :key="index">
                                            <td>{{ setting.description }}</td>
                                            <td>{{ setting.valuedesc }}</td>
                                            <td>
                                                <v-select
                                                    :value="setting.value === 'True' ? 'Yes' : 'No'"
                                                    :items="['Yes', 'No']"
                                                    density="compact"
                                                    hide-details
                                                    variant="underlined"
                                                    @update:model-value="newValue => handleValueChange(newValue, setting)"
                                                />
                                            </td>
                                        </tr>
                                    </tbody>
                                </v-table>
                            </v-expansion-panel-text>
                        </v-expansion-panel>
                    </v-expansion-panels>
                </v-col>
            </v-row>
        </v-card-text>
        <v-divider></v-divider>
    </v-card>
</template>

<script setup>
definePageMeta({
    layout: "root-layout",
});

const panel = ref([]);
const settings_panel = ref([]);

const getGlobalSettings = async () => {
    const response = await useMethod("get", "get-his-setup-options", "", "");
    if (response) {
        settings_panel.value = response;
    }
};

const groupedSettings = computed(() => {
    return settings_panel.value.reduce((groups, setting) => {
        const module = setting.group_module;
        if (!groups[module]) {
            groups[module] = [];
        }
        groups[module].push(setting);
        return groups;
    }, {});
});

const handleValueChange = async (newValue, setting) => {
    setting.value = newValue === 'Yes' ? 'True' : 'False';
    let item = {
        id: setting.id,
        group_module: setting.group_module,
        value: setting.value,
    };
    const response = await useMethod("post", "update-his-setup-options", item);
    if (response) {
        getGlobalSettings();
    } 
};

onMounted(() => {
    panel.value = [0, 1, 2, 3, 4, 5];
    getGlobalSettings();
});
</script>

<style scoped></style>
