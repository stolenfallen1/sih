<template>
    <v-dialog :model-value="show" rounded="lg" scrollable @update:model-value="closeDialog" max-width="1120px">    
        <v-card rounded="lg">
            <v-toolbar density="compact" color="#107bac" hide-details>
                <v-toolbar-title>Out-patient Post Medicine / Supplies Entry</v-toolbar-title>
                <v-btn color="white" @click="closeDialog">
                    <v-icon>mdi-close</v-icon>
                </v-btn>
            </v-toolbar>
            <v-divider></v-divider>
            <v-card-text>
                <v-card elevation="4" class="mb-4">
                    <v-card-text>
                        <p style="font-style: italic; font-weight: bold; font-size: 16px;">Patient Info</p>
                        <v-row class="mt-1">
                            <v-col cols="6">
                                <v-row>
                                    <v-col cols="12">
                                        <v-text-field 
                                            label="Patient Name"
                                            variant="solo"
                                            density="compact"
                                            hide-details
                                            readonly
                                        ></v-text-field>
                                    </v-col>
                                    <v-col cols="12">
                                        <v-text-field 
                                            label="ID No."
                                            variant="solo"
                                            density="compact"
                                            hide-details
                                            readonly
                                        ></v-text-field>
                                    </v-col>
                                </v-row>
                                <v-row>
                                    <v-col cols="6">
                                        <v-text-field 
                                            label="Civil Status"
                                            variant="solo"
                                            density="compact"
                                            hide-details
                                            readonly
                                        ></v-text-field>
                                    </v-col>
                                    <v-col cols="6">
                                        <v-text-field 
                                            label="Gender"
                                            variant="solo"
                                            density="compact"
                                            hide-details
                                            readonly
                                        ></v-text-field>
                                    </v-col>
                                </v-row>
                                <v-row>
                                    <v-col cols="4">
                                        <v-text-field 
                                            label="Age"
                                            type="number"
                                            variant="solo"
                                            density="compact"
                                            hide-details
                                            readonly
                                        ></v-text-field>
                                    </v-col>
                                    <v-col cols="4">
                                        <v-text-field 
                                            label="Birthdate"
                                            type="date"
                                            variant="solo"
                                            density="compact"
                                            hide-details
                                            readonly
                                        ></v-text-field>
                                    </v-col>
                                    <v-col cols="4">
                                        <v-text-field 
                                            label="Registry Case Date"
                                            type="date"
                                            variant="solo"
                                            density="compact"
                                            hide-details
                                            readonly
                                        ></v-text-field>
                                    </v-col>
                                </v-row>
                            </v-col>
                            <v-col cols="6">
                                <v-row>
                                    <v-col cols="6">
                                        <v-text-field 
                                            label="Case No."
                                            variant="solo"
                                            density="compact"
                                            hide-details
                                            readonly
                                        ></v-text-field>
                                    </v-col>
                                    <v-col cols="6">
                                        <v-text-field 
                                            label="Account"
                                            variant="solo"
                                            density="compact"
                                            hide-details
                                            readonly
                                        ></v-text-field>
                                    </v-col>
                                    <v-col cols="3">
                                        <v-text-field
                                            label="ID"
                                            variant="solo"
                                            density="compact"
                                            hide-details
                                            readonly
                                        ></v-text-field>
                                    </v-col>
                                    <v-col cols="9">
                                        <v-text-field
                                            label="Physician Name"
                                            variant="solo"
                                            density="compact"
                                            hide-details
                                            readonly
                                        ></v-text-field>
                                    </v-col>
                                    <v-col cols="3">
                                        <v-text-field
                                            label="ID"
                                            variant="solo"
                                            density="compact"
                                            hide-details
                                            readonly
                                        ></v-text-field>
                                    </v-col>
                                    <v-col cols="9">
                                        <v-text-field
                                            label="Guarantor Name"
                                            variant="solo"
                                            density="compact"
                                            hide-details
                                            readonly
                                        ></v-text-field>
                                    </v-col>
                                    <v-col cols="6">
                                        <v-text-field
                                            label="Credit Limit"
                                            variant="solo"
                                            density="compact"
                                            hide-details
                                            readonly
                                        />
                                    </v-col>
                                    <v-col cols="6">
                                        <v-autocomplete
                                            bg-color="#C0C0C0"
                                            label="Charge To"
                                            item-title="text"
                                            item-value="id"
                                            variant="solo"
                                            density="compact"
                                            hide-details
                                        ></v-autocomplete>
                                    </v-col>
                                </v-row>
                            </v-col>
                        </v-row>
                    </v-card-text>
                </v-card>
                <v-expansion-panels
                    v-model="panel"
                    variant="accordion"
                    multiple
                >
                    <v-expansion-panel>
                        <v-expansion-panel-title color="#107bac">
                            Post Medicine Transactions
                            <!-- <v-spacer></v-spacer>
                            <v-btn class="mr-4" density="compact">
                                <v-icon>mdi-help-circle-outline</v-icon>
                                &nbsp; View Help Code
                                <v-menu activator="parent">
                                    <v-list>
                                    <v-list-item
                                        v-for="(item, index) in revenue_code_data_display"
                                        :key="index"
                                        :value="index"
                                    >
                                        <v-list-item-title>{{ item.code }} - {{ item.description }}</v-list-item-title>
                                    </v-list-item>
                                    </v-list>
                                </v-menu>
                            </v-btn> -->
                        </v-expansion-panel-title>
                        <v-expansion-panel-text>
                            <v-table density="compact" height="40vh" class="styled-table">
                                <thead>
                                    <tr>
                                        <th>Code</th>
                                        <th>Item Description</th>
                                        <th>Frequency</th>
                                        <th>Quantity</th> 
                                        <th>Amount</th> 
                                        <th>Remarks</th>
                                        <th>STAT</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                    </tr>
                                </tbody>
                                <tfoot>
                                    <tr>
                                        <td colspan="4" class="text-right">Total Amount: </td>
                                        <!-- <td>{{ usePeso(totalAmount) }}</td> -->
                                    </tr>
                                </tfoot>
                            </v-table>
                        </v-expansion-panel-text>
                    </v-expansion-panel>
                    <v-expansion-panel>
                        <v-expansion-panel-title color="#107bac">
                            Post Supplies Transactions
                            <!-- <v-spacer></v-spacer>
                            <v-btn class="mr-4" density="compact">
                                <v-icon>mdi-help-circle-outline</v-icon>
                                &nbsp; View Help Code
                                <v-menu activator="parent">
                                    <v-list>
                                    <v-list-item
                                        v-for="(item, index) in revenue_code_data_display"
                                        :key="index"
                                        :value="index"
                                    >
                                        <v-list-item-title>{{ item.code }} - {{ item.description }}</v-list-item-title>
                                    </v-list-item>
                                    </v-list>
                                </v-menu>
                            </v-btn> -->
                        </v-expansion-panel-title>
                        <v-expansion-panel-text>
                            <v-table density="compact" height="40vh" class="styled-table">
                                <thead>
                                    <tr>
                                        <th>Code</th>
                                        <th>Item Description</th>
                                        <th>Quantity</th> 
                                        <th>Amount</th> 
                                        <th>Remarks</th>
                                        <th>STAT</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                    </tr>
                                </tbody>
                                <tfoot>
                                    <tr>
                                        <td colspan="3" class="text-right">Total Amount: </td>
                                        <!-- <td>{{ usePeso(totalAmount) }}</td> -->
                                    </tr>
                                </tfoot>
                            </v-table>
                        </v-expansion-panel-text>
                    </v-expansion-panel>
                </v-expansion-panels>
            </v-card-text>
            <v-card-actions>
                <v-btn color="blue-darken-1 border border-info" @click="closeDialog"> Close </v-btn>
                <v-spacer></v-spacer>
                <v-btn class="bg-error text-white" @click="closeDialog"> Remove All </v-btn>
                <v-btn class="bg-primary text-white" @click="closeDialog"> Save Entry </v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script setup>
const props = defineProps({
    show: {
        type: Boolean,
        default: () => false,
    },
})

const emits = defineEmits(['close-dialog'])

let panel = ref([0, 1]);

const closeDialog = () => {
    emits('close-dialog');
}
</script>

<style scoped>
:deep(.v-expansion-panel-text__wrapper) {
    padding: 0 !important;
}
.styled-table th, .styled-table td {
    padding: 8px;
    border: 1px solid #eceaea;
    margin: 0;
}
.input {
    border-bottom: 1px solid #A9A9A9;
    padding: 4px 8px;
}
.styled-table {
    overflow-y: auto;
    scrollbar-width: thin; 
    scrollbar-color: #727272 #f5f5f5; 
}
.styled-table::-webkit-scrollbar {
    width: 12px;
}
.styled-table::-webkit-scrollbar-thumb {
    background-color: #107bac; 
    border-radius: 10px; 
    border: 3px solid #f5f5f5; 
}
.styled-table::-webkit-scrollbar-track {
    background-color: #f5f5f5; 
    border-radius: 10px; 
}
</style>
<!-- 
Code
Item Description
Frequency
Quantity 
Amount
Remarks 
STAT
-->