<template>
    <v-dialog :model-value="open_allergy_list" rounded="lg" @update:model-value="closeDialog" scrollable max-width="700px">
        <form>
            <v-card rounded="lg">
                <v-toolbar density="compact" color="#107bac" hide-details>
                    <v-toolbar-title>Allergies List</v-toolbar-title>
                    <v-btn color="white" @click="closeDialog">
                        <v-icon>mdi-close</v-icon>
                    </v-btn>
                </v-toolbar>
                <v-divider></v-divider>
                <v-card-text>
                    <v-text-field
                        label="Search by Allergy Name"
                        density="compact"
                        variant="outlined"
                        prepend-inner-icon="mdi-magnify"
                        v-model="data.keyword"
                        @keyup.enter="search"
                    ></v-text-field>
                    <v-divider></v-divider>
                    <v-data-table-server 
                        class="animated animatedFadeInUp fadeInUp"
                        v-model="selected_item"
                        v-model:items-per-page="itemsPerPage"
                        :headers="headers"
                        :items="serverItems"
                        :items-length="totalItems"
                        :loading="data.loading"
                        item-value="id"
                        :hover="true"
                        @update:options="initialize"
                        @update:model-value="handleSelectedRow"
                        show-select
                        select-strategy="single"
                        fixed-header
                        density="compact" 
                        height="50vh"
                        >
                        <template
                            v-for="(head, index) of headers"  v-slot:[`item.${head.value}`]="props" >
                            <td class="test" :props="props" :key="index">
                                <slot :name="head.value" :item="props.item">
                                    {{ props.item[head.value] || "..." }}
                                </slot>
                            </td>
                        </template>
                        <template v-slot:[`item.edit`]="props">
                            <td>
                                <v-icon color="green" class="cursor-pointer" @click="editItem(props.item)">mdi-pencil</v-icon>
                            </td>
                        </template>
                        <template v-slot:[`item.archive`]="props">
                            <td>
                                <v-icon color="red" class="cursor-pointer" @click="archiveItem(props.item)">mdi-archive-arrow-down</v-icon> 
                            </td>
                        </template>
                    </v-data-table-server>
                </v-card-text>
                <v-divider></v-divider>
                <v-card-actions>
                    <v-btn color="blue-darken-1 border border-info" @click="closeDialog"> Close </v-btn>
                    <v-spacer></v-spacer>
                    <v-btn class="bg-info text-white" @click="handleAddAllergy">Add Allergy</v-btn>
                    <v-btn class="bg-primary text-white" @click="openNoteRemarksEntry">Select Allergy</v-btn>
                </v-card-actions>
            </v-card>
        </form>
    </v-dialog>

    <v-dialog 
        v-model="remarks_form_dialog"
        @update:model-value="closeRemarksEntry"
        hide-overlay
        width="450"
    >
        <v-card rounded="lg">
            <v-toolbar density="compact" color="#107bac" hide-details>
                <v-toolbar-title>Remarks Entry</v-toolbar-title>
                <v-btn color="white" @click="closeRemarksEntry">
                    <v-icon>mdi-close</v-icon>
                </v-btn>
            </v-toolbar>
            <v-divider></v-divider>
            <v-card-text>
                <v-row>
                    <v-col cols="12">
                        <v-list-subheader class="form-header">Cause</v-list-subheader>
                        <v-textarea
                            class="cursor-pointer"
                            placeholder="Enter Patient's Allergy Cause"
                            v-model="payload[0].cause"
                            density="compact"
                            hide-details
                            variant="solo"
                        ></v-textarea>
                    </v-col>
                    <v-col cols="12">
                        <v-list-subheader class="form-header">Symptoms</v-list-subheader>
                        <v-textarea
                            class="cursor-pointer"
                            placeholder="Enter Patient's Allergy Symptoms"
                            v-model="payload[0].symptoms"
                            density="compact"
                            hide-details
                            variant="solo"
                        ></v-textarea>
                    </v-col>
                </v-row>
            </v-card-text>
            <v-card-actions>
                <v-btn color="blue-darken-1 border border-info" @click="closeRemarksEntry"> Close </v-btn>
                <v-spacer></v-spacer>
                <v-btn class="bg-primary text-white" type="submit" @click="onSubmit">Continue</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>

    <v-dialog 
        v-model="add_allergy_dialog"
        @update:model-value="closeAddAllergy"
        hide-overlay
        width="450"
    >
        <v-card rounded="lg">
            <v-toolbar density="compact" color="#107bac" hide-details>
                <v-toolbar-title>Allergy Form</v-toolbar-title>
                <v-btn color="white" @click="closeAddAllergy">
                    <v-icon>mdi-close</v-icon>
                </v-btn>
            </v-toolbar>
            <v-divider></v-divider>
            <v-card-text>
                <v-row>
                    <v-col cols="12">
                        <v-list-subheader class="form-header">Allergy Name</v-list-subheader>
                        <v-textarea
                            class="cursor-pointer"
                            placeholder="Enter Allergy Name here..."
                            v-model="payload.allergy_name"
                            density="compact"
                            hide-details
                            variant="solo"
                        ></v-textarea>
                    </v-col>
                </v-row>
            </v-card-text>
            <v-card-actions>
                <v-btn color="blue-darken-1 border border-info" @click="closeAddAllergy"> Close </v-btn>
                <v-spacer></v-spacer>
                <v-btn class="bg-primary text-white" type="submit" :loading="isloading" @click="onSubmitAllergy">Submit</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>

    <Snackbar />
    <Confirmation 
        :show="confirm_password"
        :payload="password_payload"
        @close-dialog="closeConfirmPassword"
        @submit="handleConfirmPassword"
    />
</template>

<script setup>
const props = defineProps({
    open_allergy_list: {
        type: Boolean,
        default: () => false,
        required: true,
    },
})

const emits = defineEmits(['close-dialog', 'handle-select']);
const confirm_password = ref(false);
const remarks_form_dialog = ref(false);
const add_allergy_dialog = ref(false);
const payload = ref({});
const password_payload = ref({ user_passcode: "" });
const selected_item = ref([]);
const isloading = ref(false);
const headers = [
    { title: 'ID', align: 'start', sortable: false, key: 'id' },
    { title: 'Allergy Name', key: 'allergy_name', align: 'start', width:"60%" },
    { title: '', key: 'edit', align: 'start', width: "5%" },
    { title: '', key: 'archive', align: 'start', width: "5%" },
];
const data = ref({
    title: "List of Allergies",
    keyword: "",
    loading: false,
    filter: {},
    tab: 0,
    param_tab: 1,
});
const itemsPerPage = ref(15);
const totalItems = ref(0);
const serverItems = ref([]);
const initialize =  ({ page, itemsPerPage, sortBy }) => {
    loadItems(page,itemsPerPage,sortBy) 
}
const loadItems = async(page = null,itemsPerPage = null,sortBy = null)=>{
    data.value.loading = true;
    let pageno = page || 1;
    let itemPerpageno = itemsPerPage || 10;
    let params = "page=" +pageno + "&per_page=" + itemPerpageno + "&keyword=" + data.value.keyword;
    const response = await useMethod("get", "get-allergy-type?" , "" ,params);
    if(response) {
        serverItems.value = response.data;
        totalItems.value = response.total;
        data.value.loading = false;
    } else {
        data.value.loading = false;
    }
}
const search = ()=>{
    loadItems();
}

const openNoteRemarksEntry = () => {
    if (selected_item.value.length === 0) {
        return useSnackbar(true, "red", "Please select an item.");
    } else {
        remarks_form_dialog.value = true;
        handleSelectedRow(selected_item.value);
    }
};

const closeRemarksEntry = () => {
    remarks_form_dialog.value = false;
};

const handleAddAllergy = () => {
    add_allergy_dialog.value = true;
};

const onSubmitAllergy = async () => {
    try {
        isloading.value = true;
        if (payload.value.id) {
            const response = await useMethod("put", "update-allergy-type", payload.value, "", payload.value.id);
            if (response) {
                useSnackbar(true, "green", "Allergy successfully updated.");
                isloading.value = false;
                payload.value = "";
                closeAddAllergy();
                loadItems();
            } else {
                isloading.value = false;
                useSnackbar(true, "red", "Failed to update allergy.");
            }
        } else {
            if (!payload.value.allergy_name) {
                return useSnackbar(true, "red", "Please enter an allergy name.");
            } else {
                const response = await useMethod("post", "create-allergy-type", payload.value);
                if (response) {
                    useSnackbar(true, "green", "Allergy successfully added.");
                    isloading.value = false;
                    payload.value = "";
                    closeAddAllergy();
                    console.log("asdasda");
                    loadItems();
                } else {
                    isloading.value = false;
                    useSnackbar(true, "red", "Failed to add allergy.");
                }
            }
        }
    } catch (error) {
        isloading.value = false;
        console.log(error);
    } 
}

const closeAddAllergy = () => {
    add_allergy_dialog.value = false;
    payload.value = Object.assign({});
};

const handleSelectedRow = (selectedRows) => {
    const selectedItems = selectedRows.map(rowId => serverItems.value.find(item => item.id === rowId));
    const validSelectedItems = selectedItems.filter(item => item !== undefined);
    payload.value = validSelectedItems;
}

const editItem = (item) => {
    add_allergy_dialog.value = true;
    payload.value = Object.assign({}, item);
}

const archiveItem = async (item) => {
    payload.value = item;
    confirm_password.value = true;
}

const closeConfirmPassword = () => {
    confirm_password.value = false;
    password_payload.value = {};
}

const handleConfirmPassword = async (passcodeData) => {
    try {
        isloading.value = true;
        if (passcodeData.user_passcode === usePasscode()) {
            const response = await useMethod("put", "archive-allergy-type", "", "", payload.value.id);
            if (response) {
                loadItems();
                closeConfirmPassword();
                return useSnackbar(true, "green", "Allergy successfully archived.");
            } else {
                useSnackbar(true, "error", "Failed to archive allergy.");
            }
        } else {
            useSnackbar(true, "error", "Invalid passcode.");
        }
    } catch(error) {
        console.log(error);
    } finally {
        isloading.value = false;
    }
}

const onSubmit = () => {
    emits('handle-select', payload.value);
    closeDialog();
}

const closeDialog = () => {
    emits('close-dialog');
    closeRemarksEntry();
    itemsPerPage.value = 15;
    selected_item.value = [];
}

</script>

<style scoped>
.form-header {
    color: #000;
    margin: -12px 0px -12px 0px;
    font-weight: 500;
}
</style>