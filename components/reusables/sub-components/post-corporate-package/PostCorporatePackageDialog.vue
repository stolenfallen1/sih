<template>
    <v-dialog :model-value="show" rounded="lg" scrollable @update:model-value="closeDialog" max-width="850px">
        <form @submit.prevent="onSubmit">
            <v-card>
                <v-toolbar density="compact" color="#107bac" hide-details>
                    <v-toolbar-title>Post Corporate Medical Package {{ selectedRowDetails.id }}</v-toolbar-title>
                    <v-btn color="white" @click="closeDialog">
                        <v-icon>mdi-close</v-icon>
                    </v-btn>
                </v-toolbar>
                <v-card-text>
                    <v-row>
                        <v-col cols="12">
                            <v-card elevation="4">
                                <v-toolbar density="compact" color="#2a73c5" hide-details> 
                                    <v-toolbar-title class="toolbar-title">Corporate Medical Package List</v-toolbar-title>
                                </v-toolbar>
                                <v-card-text>
                                    <v-row>
                                        <v-col cols="12">
                                            <v-text-field
                                                label="Search here..."
                                                density="compact"
                                                variant="outlined"
                                                prepend-inner-icon="mdi-magnify"
                                                v-model="data.keyword"
                                                @keyup.enter="search"
                                            ></v-text-field> 
                                        </v-col>  
                                    </v-row>
                                    <v-table density="compact" :hover=true>
                                        <thead>
                                            <tr>
                                                <th>Code</th>
                                                <th>Description</th>
                                                <th>Amount</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr v-for="(packages, index) in diagnostic_medical_package" :key="index" class="cursor-pointer" @click.prevent="handleClickRow(packages)">
                                                <td>{{ packages.code }}</td>
                                                <td>{{ packages.description }}</td>
                                                <td>{{ packages.amount }}</td>
                                            </tr>
                                        </tbody>
                                    </v-table>
                                </v-card-text>
                            </v-card>
                        </v-col>
                        <v-col cols="12">
                            <v-card elevation="4" v-if="subpanel != ''">
                                <v-toolbar density="compact" color="#2a73c5" hide-details> 
                                    <v-toolbar-title class="toolbar-title">Corporate Medical Package Line Items</v-toolbar-title>
                                </v-toolbar>
                                <v-card-text>
                                    <v-row>
                                        <v-col cols="12">
                                            <v-text-field
                                                label="Search here..."
                                                density="compact"
                                                variant="outlined"
                                                prepend-inner-icon="mdi-magnify"
                                                v-model="data.keyword"
                                                @keyup.enter="search"
                                            ></v-text-field> 
                                        </v-col>  
                                    </v-row>
                                    <v-expansion-panels 
                                        v-model="panel"
                                        multiple
                                        flat
                                        variant="outlined"
                                    >
                                        <v-expansion-panel elevation="4" v-for="(panels, index) in subpanel.expansion_items" :key="index">
                                            <v-expansion-panel-title>{{ panels.title }}</v-expansion-panel-title>
                                            <v-expansion-panel-text>
                                                <v-table density="compact" :hover=true>
                                                    <thead>
                                                        <tr>
                                                            <th>Item ID</th>
                                                            <th>Description</th>
                                                            <th>Quantity</th>
                                                            <th>Price</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        <tr v-for="(package_item, index) in panels.medical_package_item" :key="index" class="cursor-pointer">
                                                            <td>{{ package_item.item_id }}</td>
                                                            <td>{{ package_item.description }}</td>
                                                            <td>{{ package_item.qty }}</td>
                                                            <td>{{ package_item.price }}</td>
                                                        </tr>
                                                    </tbody>
                                                </v-table>
                                            </v-expansion-panel-text>
                                        </v-expansion-panel>
                                    </v-expansion-panels>
                                </v-card-text>
                            </v-card>
                        </v-col>
                    </v-row>
                </v-card-text>
                <v-divider></v-divider>
                <v-card-actions>
                    <v-btn color="blue-darken-1 border border-info" @click="closeDialog"> Close </v-btn>
                    <v-spacer></v-spacer>
                    <v-btn class="bg-primary text-white" type="submit">Post</v-btn>
                </v-card-actions>
            </v-card>
        </form>
    </v-dialog>
</template>

<script setup>
const props = defineProps({
    show: {
        type: Boolean,
        default: () => false,
        required: true,
    },
});

const { selectedRowDetails } = storeToRefs(useSubcomponentSelectedRowDetailsStore()); 

const emits = defineEmits(['close-dialog'])

const payload = ref({});
const panel = ref([0, 1, 2, 3, 4, 5, 6, 7, 8, 9]); // Open all panels
const disabled = ref(false);
const subpanel = ref([]);

const data = ref({
    title: "List of Diagnostic Medical Package",
    keyword: "",
    loading: false,
    filter: {},
    tab: 0,
    param_tab: 1,
});

const diagnostic_medical_package = ref([
    {
        id: 1,
        code: "DMP001",
        description: "Corporate Medical Package 1",
        amount: 1000.00,
        expansion_items: [
            {
                id: 1,
                title: "DEPARTMENT",
                medical_package_item: [
                    {
                        id: 1,
                        item_id: 123,
                        description: "CBC",
                        qty: "1.00",
                        price: "1000.00",
                    },
                    {
                        id: 2,
                        item_id: 124,
                        description: "FBS",
                        qty: "1.00",
                        price: "1000.00",
                    },
                ]
            },
            {
                id: 2,
                title: "X-RAY",
                medical_package_item: [
                    {
                        id: 1,
                        item_id: 125,
                        description: "X-RAY CHEST PA VIEW",
                        qty: "1.00",
                        price: "1000.00",
                    }
                ]
            },
        ]
    },
    {
        id: 2,
        code: "DMP002",
        description: "Corporate Medical Package 2",
        amount: 2000.00,
        expansion_items: [
            {
                id: 1,
                title: "DEPARTMENT",
                medical_package_item: [
                    {
                        id: 1,
                        item_id: 123,
                        description: "CBC",
                        qty: "1.00",
                        price: "1000.00",
                    },
                    {
                        id: 2,
                        item_id: 124,
                        description: "FBS",
                        qty: "1.00",
                        price: "1000.00",
                    },
                ]
            },
            {
                id: 2,
                title: "ULTRASOUND",
                medical_package_item: [
                    {
                        id: 1,
                        item_id: 125,
                        description: "WHOLE ABDOMEN ULTRASOUND",
                        qty: "1.00",
                        price: "1000.00",
                    }
                ]
            },
            {
                id: 3,
                title: "X-RAY",
                medical_package_item: [
                    {
                        id: 1,
                        item_id: 126,
                        description: "X-RAY CHEST PA VIEW",
                        qty: "1.00",
                        price: "1000.00",
                    }
                ]
            }
        ]
    },
])

const handleClickRow = (packages) => {
    subpanel.value = [];
    subpanel.value = packages;
}

const search = () => {}

const onSubmit = () => {
    alert('Post Corporate Medical Package Submitted');
    emits('close-dialog');
    subpanel.value = [];
}

const closeDialog = () => {
    emits('close-dialog');
    subpanel.value = [];
}

</script>

<style scoped>
.toolbar-title {
    font-size: 16px; 
    font-style: italic; 
    text-align: center;
}
.hover:hover {
    background-color: #f5f5f5;
}
</style>