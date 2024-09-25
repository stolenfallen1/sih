<template>
    <v-dialog :model-value="open_discharge_notice" rounded="lg" @update:model-value="closeDialog" max-width="1120px">
        <v-card rounded="lg">
        <v-toolbar density="compact" color="#107bac" hide-details>
            <v-toolbar-title>Discharge Notice</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-btn color="white" @click="closeDialog">
            <v-icon>mdi-close</v-icon>
            </v-btn>
        </v-toolbar>
        <v-divider></v-divider>
        <v-card-text>
            <v-divider></v-divider>
            <v-data-table-server
                class="animated animatedFadeInUp fadeInUp"
                v-model:items-per-page="itemsPerPage"
                :headers="headers"
                :items="serverItems"
                :items-length="totalItems"
                :loading="data.loading"
                :hover="true"
                item-value="id"
                @update:options="initialize"
                show-select
                select-strategy="single"
                fixed-header
                density="compact"
                height="60vh"
            >
                <!-- <template
                    v-for="(head, index) of headers"
                    v-slot:[`item.${head.value}`]="props"
                >
                    <td class="test" :props="props" :key="index">
                    <slot :name="head.value" :item="props.item">
                        {{ props.item[head.value] || "..." }}
                    </slot>
                    </td>
                </template>
                    <template v-slot:item.acct_type="{ item }">
                    {{ item.get_account_type ? item.get_account_type.account_type : "" }}
                </template>
                <template v-slot:item.isactive="{ item }">
                    {{ item.isactive == 1 ? "Active" : "In-active" }}
                </template>
                <template v-slot:item.actions="{ item }">
                    <v-icon color="green mr-3" @click="onEdit(item)">mdi-pencil</v-icon>
                    <v-icon color="red" @click="onDelete(item)">mdi-trash-can</v-icon>
                </template> -->
                <template #bottom />
            </v-data-table-server>
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions>
            <div style="display: flex;">
                <p style="margin-right: 10px;">Legend: </p>
                <v-icon color="green">mdi-note-check-outline</v-icon> Cleared
                <v-icon color="red">mdi mdi-note-outline</v-icon> Not Cleared
            </div>
            <v-spacer></v-spacer>
            <v-btn class="bg-primary text-white" @click="openForm">Select</v-btn>
            <v-btn color="blue-darken-1 border border-info" @click="closeDialog"> Close </v-btn>
        </v-card-actions>
        </v-card>
    </v-dialog>

    <v-dialog
        :model-value="open_clear_patient"
        @update:model-value="closeForm"
        rounded="lg"
        max-width="900px"
    >
        <form>
            <v-card rounded="lg">
                <v-toolbar density="compact" color="#107bac" hide-details>
                    <v-toolbar-title>Clear Patient</v-toolbar-title>
                    <v-spacer></v-spacer>
                    <v-btn color="white" @click="closeForm">
                        <v-icon>mdi-close</v-icon>
                    </v-btn>
                </v-toolbar>
                <v-card-text>
                    <v-row>
                        <v-col cols="5">
                            <v-row style="border: 1px solid #E4E4E4; border-radius: 10px; padding: 10px; margin-right: 0.5px;">
                                <p style="font-weight: bolder;">Patient's Name</p>
                                <v-col cols="12" class="form-col">
                                    <v-text-field
                                        label="Lastname"
                                        variant="outlined"
                                        density="compact"
                                        hide-details
                                        readonly
                                    ></v-text-field>
                                </v-col>
                                <v-col cols="12" class="form-col">
                                    <v-text-field
                                        label="Firstname"
                                        variant="outlined"
                                        density="compact"
                                        hide-details
                                        readonly
                                    ></v-text-field>
                                </v-col>
                                <v-col cols="12" class="form-col">
                                    <v-text-field
                                        label="Middlename"
                                        variant="outlined"
                                        density="compact"
                                        hide-details
                                        readonly
                                    ></v-text-field>
                                </v-col>
                            </v-row>
                        </v-col>
                        <v-col cols="7">
                            <v-row style="border: 1px solid #E4E4E4; border-radius: 10px; padding: 10px;">
                                <p style="font-weight: bolder;">Hospital Information</p>
                                <v-col cols="12">
                                    <v-row>
                                        <v-col cols="6" class="form-col">
                                            <v-text-field
                                                style="margin-right: 3px;"
                                                label="Patient ID"
                                                variant="outlined"
                                                density="compact"
                                                hide-details
                                                readonly
                                            ></v-text-field>
                                        </v-col>
                                        <v-col cols="6" class="form-col">
                                            <v-text-field
                                                label="Room No."
                                                variant="outlined"
                                                density="compact"
                                                hide-details
                                                readonly
                                            ></v-text-field>
                                        </v-col>
                                    </v-row>
                                </v-col>
                                <v-col cols="12">
                                    <v-row>
                                        <v-col cols="6" class="form-col">
                                            <v-text-field
                                                style="margin-right: 3px;"
                                                label="Case No"
                                                variant="outlined"
                                                density="compact"
                                                hide-details
                                                readonly
                                            ></v-text-field>
                                        </v-col>
                                        <v-col cols="6" class="form-col">
                                            <v-text-field
                                                label="Registry Date"
                                                variant="outlined"
                                                density="compact"
                                                hide-details
                                                readonly
                                            ></v-text-field>
                                        </v-col>
                                    </v-row>
                                </v-col>
                                <v-col cols="12" class="form-col">
                                    <v-text-field
                                        label="Physician Name"
                                        variant="outlined"
                                        density="compact"
                                        hide-details
                                        readonly
                                    ></v-text-field>
                                </v-col>
                            </v-row>
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col cols="12" style="margin-top: 5px;">
                            <v-row style="border: 1px solid #E4E4E4; border-radius: 10px; padding: 10px; margin-right: 0.5px;">
                                <v-col cols="6">
                                    <v-row>
                                        <p style="font-weight: bolder;">Notice Information</p>
                                        <v-col cols="12" class="form-col">
                                            <v-text-field
                                                label="Notice Date / Time"
                                                type="datetime-local"
                                                variant="outlined"
                                                density="compact"
                                                hide-details
                                                readonly
                                            ></v-text-field>
                                        </v-col>
                                        <v-col cols="12" class="form-col">
                                            <v-text-field
                                                label="Order Date / Time"
                                                type="datetime-local"
                                                variant="outlined"
                                                density="compact"
                                                hide-details
                                                readonly
                                            ></v-text-field>
                                        </v-col>
                                        <v-col cols="12" class="form-col">
                                            <v-text-field
                                                label="Discharge Nurse"
                                                variant="outlined"
                                                density="compact"
                                                hide-details
                                                readonly
                                            ></v-text-field>
                                        </v-col>
                                    </v-row>
                                </v-col>
                                <v-col cols="6">
                                    <v-row>
                                        <v-col cols="12" style="margin-top: 10px">
                                            <v-textarea
                                                label="Remarks"
                                                variant="outlined"
                                                density="compact"
                                                hide-details
                                            ></v-textarea>
                                        </v-col>
                                    </v-row>
                                </v-col>
                            </v-row>
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col cols="5" style="margin-top: 5px;">
                            <v-row style="border: 1px solid #E4E4E4; border-radius: 10px; padding: 10px; margin-right: 0.5px;">
                                <p style="font-weight: bolder;">Patient's Name</p>
                                <v-col cols="12" class="form-col">
                                    <v-text-field
                                        label="Cleared By"
                                        variant="outlined"
                                        density="compact"
                                        hide-details
                                        readonly
                                    ></v-text-field>
                                </v-col>
                                <v-col cols="12" class="form-col">
                                    <v-text-field
                                        label="Cleared Date / Time"
                                        type="datetime-local"
                                        variant="outlined"
                                        density="compact"
                                        hide-details
                                    ></v-text-field>
                                </v-col>
                                <v-col cols="12" class="form-col">
                                    <v-text-field
                                        label="Remarks"
                                        variant="outlined"
                                        density="compact"
                                        hide-details
                                    ></v-text-field>
                                </v-col>
                            </v-row>
                        </v-col>
                    </v-row>
                </v-card-text>
                <v-divider></v-divider>
                <v-card-actions>
                    <v-btn class="bg-warning text-white">View Charges</v-btn>
                    <v-btn class="bg-info text-white">View SOA</v-btn>
                    <v-spacer></v-spacer>
                    <v-btn class="bg-primary text-white">Save</v-btn>
                    <v-btn color="blue-darken-1 border border-info" @click="closeForm">Close</v-btn>
                </v-card-actions>
            </v-card>
        </form>
    </v-dialog>
</template>

<script setup>
const props = defineProps({
    open_discharge_notice: {
        type: Boolean,
        default: () => false,
        required: true,
    },
});

const emits = defineEmits(["close-dialog"]);
const payload = ref({});
const open_clear_patient = ref(false);
const headers = [
    {
        title: "Code",
        align: "start",
        sortable: false,
        key: "id",
    },
    { title: "Account Type", key: "acct_type", align: "start", sortable: false,width: "20%" },
    { title: "Account Class", key: "Class", align: "start", sortable: false,width: "20%" },
    { title: "Description", key: "Description", align: "start",sortable: false, width: "30%" },
    { title: "", key: "actions", align: "start", width: "20%" },
];
const data = ref({
    title: "List of Patients for Discharge Notice",
    keyword: "",
    loading: false,
    filter: {},
    tab: 0,
    param_tab: 1,
});

const itemsPerPage = ref(10);
const totalItems = ref(0);
const serverItems = ref([]);
const initialize = ({ page, itemsPerPage, sortBy }) => {
    loadItems(page, itemsPerPage, sortBy);
};
const loadItems = async (page = null, itemsPerPage = null, sortBy = null) => {
    data.value.loading = true;
    let pageno = page || 1;
    let itemPerpageno = itemsPerPage || 10;
    let params =
        "page=" + pageno + "&per_page=" + itemPerpageno + "&keyword=" + data.value.keyword;
    const response = await useMethod("get", "account-classes?", "", params);
    if (response) {
        serverItems.value = response.data;
        totalItems.value = response.total;
        data.value.loading = false;
    }
};
const openForm = () => {
    payload.value = Object.assign({});
    open_clear_patient.value = true;
};

const closeForm = () => {
    payload.value = Object.assign({});
    open_clear_patient.value = false;
};

const closeDialog = () => {
    emits("close-dialog");
};
</script>

<style scoped>
.form-col {
    padding: 3.25px 0px 3.25px 0px !important;
    margin: 0px !important;
}
</style>