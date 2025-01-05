<template>
	<v-dialog
		:model-value="central_form_dialog"
		hide-overlay
		width="800"
		scrollable
		height="90vh"
		@update:model-value="closeDialog"
	>
		<form @submit.prevent="handleSearch">
			<v-card rounded="lg">
				<v-toolbar density="compact" color="#107bac" hide-details>
					<v-toolbar-title>Central Database Lookup Window</v-toolbar-title>
					<v-btn color="white" @click="closeDialog">
						<v-icon>mdi-close</v-icon>
					</v-btn>
				</v-toolbar>
				<v-divider></v-divider>
				<v-card-text>
					<v-container>
						<v-row>
							<v-col cols="3" class="pa-1">
								<v-text-field
								variant="outlined"
								v-model="search_payload.lastname"
								label="Lastname"
								autofocus
								required
								hide-details
								density="compact"
								></v-text-field>
							</v-col>
							<v-col cols="3" class="pa-1">
								<v-text-field
								variant="outlined"
								v-model="search_payload.firstname"
								label="Firstname"
								required
								hide-details
								density="compact"
								></v-text-field>
							</v-col>
							<v-col cols="3" class="pa-1">
								<v-text-field
								v-model="search_payload.middlename"
								class="custom-active-border"
								variant="outlined"
								label="Middlename"
								hide-details
								density="compact"
								></v-text-field>
							</v-col>
							<v-col cols="3" class="pt-1">
								<v-text-field
								label="Birth Date"
								density="compact"
								hide-details
								:max="new Date().toISOString().substr(0, 10)"
								v-model="search_payload.birthdate"
								type="date"
								variant="outlined"
								></v-text-field>
							</v-col>
							<v-btn
								class="bg-primary text-white mb-4 ml-1"
								type="submit"
								:loading="search_payload.isloading"
								density="compact"
								><v-icon>mdi-magnify</v-icon>Search</v-btn
							>
							<!-- <v-btn
								class="bg-success text-white mb-4 ml-1"
								type="submit"
								density="compact"
								@click.prevent="handleClearSearch"
								><v-icon>mdi-close-thick</v-icon>Clear</v-btn
							> -->
							<v-divider></v-divider>
							<v-col cols="12">
								<v-data-table-server
								:fixed-header="true"
								:items-length="40"
								density="compact"
								height="60vh"
								:items="search_results"
								:show-select="true"
								class="animated animatedFadeInUp fadeInUp"
								:headers="headers"
								:hover="true"
								:loading="search_payload.isloading"
								v-model="selectedRows"
								@click:row="handleSelectedRow"
								@update:modelValue="handleSelectedInput"
								select-strategy="single"
								item-value="id"
								>
								<template
									v-for="(head, index) of headers"
									v-slot:[`item.${head.value}`]="props"
								>
									<td class="test" :props="`props`" :key="head.id">
									<slot :name="head.value" :item="props.item">
										{{ props.item[head.value] || "..." }}
									</slot>
									</td>
								</template>
								<template v-slot:item.birthdate="{ item }">
									{{ useDateMMDDYYY(item.birthdate) }}
								</template>

								<template #bottom></template>
								</v-data-table-server>
							</v-col>
						</v-row>
					</v-container>
				</v-card-text>
				<v-divider></v-divider>
				<v-card-actions>
				<v-btn color="blue-darken-1 border border-info" @click="closeDialog"> Close </v-btn>
				<v-spacer></v-spacer>
				<v-btn
					class="bg-primary text-white"
					type="submit"
					:disabled="isButtonDisabled"
					@click="handleClickForOpeningForm('old')"
					>Select Active Record</v-btn
				>
				<v-btn
					class="bg-primary text-white"
					type="submit"
					:disabled="!isButtonDisabled"
					@click="handleClickForOpeningForm('new')"
					>Add New</v-btn
				>
				</v-card-actions>
			</v-card>
		</form>
	</v-dialog>
</template>

<script setup>
const props = defineProps({
  search_results: {
    type: Array,
    default: () => [],
  },
  central_form_dialog: {
    type: Boolean,
    default: () => false,
  },
  search_payload: {
    type: Object,
    default: () => {},
  },
});
const headers = ref([
  {
    title: "ID",
    align: "start",
    sortable: true,
    key: "patient_Id",
    width: "5%",
  },
  {
    title: "LASTNAME",
    align: "start",
    sortable: true,
    key: "lastname",
    width: "10%",
  },
  {
    title: "FIRSTNAME",
    align: "start",
    sortable: true,
    key: "firstname",
    width: "10%",
  },
  {
    title: "MIDDLENAME",
    align: "start",
    sortable: true,
    key: "middlename",
    width: "10%",
  },
  {
    title: "BIRTHDATE",
    align: "start",
    sortable: true,
    key: "birthdate",
    width: "10%",
  },
]);

const selectedRows = ref([]);
const isAllowAddNew = ref(false);
const emits = defineEmits(['selected-row', 'search', 'close-dialog', 'open-form']);

const isButtonDisabled = computed(() => props.search_results.length === 0);

const handleSearch = () => {
    emits("search", props.search_payload);
}

const handleSelectedInput = (selected) => {
	let seletedrow = props.search_results.find(item=>item.id === selected[0]);
	console.log('SELECTED ROW', seletedrow);
    selectedRows.value = [];
    const index = selectedRows.value.indexOf(selected[0]);
    selectedRows.value = [];
    let item = seletedrow;
	console.log('HOY NAA KO DRE', item);
    if (index === -1) {
        // selectedRows.value.push(selected[0]);
		selectedRows.value.push(seletedrow);
    } else {
        item = "";
        selectedRows.value.splice(index, 1);
    }
    emits("selected-row", item);
};

const handleSelectedRow = (event, selectedRow) => {
    const index = selectedRows.value.indexOf(selectedRow?.item.id);
    selectedRows.value = [];
    let item = selectedRow.item;
    if (index === -1) {
        selectedRows.value.push(selectedRow?.item.id);
    } else {
        item = "";
        selectedRows.value.splice(index, 1);
    }
    emits("selected-row", item);
};

const closeDialog = () => {
  emits("close-dialog");
  selectedRows.value = [];
};

const handleClickForOpeningForm = (type) => {
  emits("open-form", type);
  selectedRows.value = [];
};
</script>

<style scoped>
</style>
