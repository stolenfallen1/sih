<template>
  <div>
    <v-dialog :model-value="show" rounded="lg" @update:model-value="handleclose"  scrollable max-width="350px">
		<form @submit.prevent="handleSubmit(payload)">
			<v-card rounded="lg">
				<v-toolbar density="compact" color="#107bac" hide-details>
					<v-toolbar-title>User Validation</v-toolbar-title>
					<v-btn color="white" @click="handleclose">
						<v-icon>mdi-close</v-icon>
					</v-btn>
				</v-toolbar>
				<v-divider></v-divider>
				<v-card-text>
					<v-row>
						<v-col v-if="roleID == '27'" cols="12" class="pa-1">
							<v-text-field
								class="mt-3"
								:type="text"
								v-model="payload.user_userid"
								label="Enter user ID"
								variant="outlined"
								density="compact"
								required
								focused
								hide-details
							></v-text-field>
							<!-- <v-alert :closable="true" flat color="danger"  class="mt-3 pa-2" v-if="error_msg" :text="error_msg"></v-alert> --> <!-- Removed: Only use one validation here or add condition -->
						</v-col>
						
						<v-col cols="12" class="pa-1">
							<v-text-field
								class="mt-3"
								:type="!showPassword ? 'password' : 'text'"
								v-model="payload.user_passcode"
								label="Enter Passcode"
								variant="outlined"
								density="compact"
								required
								focused
								hide-details
								@click:append="showPassword = !showPassword"
								:append-icon="showPassword ? 'mdi-eye-outline ' : 'mdi-eye-off-outline'"
							></v-text-field>
							<v-alert :closable="true" flat style="color: #FFF; background-color: red;"  class="mt-3 pa-2" v-if="error_msg" :text="error_msg"></v-alert>
						</v-col>
					</v-row>
					<div class="mt-3">
						By entering your passcode, you confirm this transaction.
					</div>
				</v-card-text>
				<v-divider></v-divider>
				<v-card-actions>
					<v-btn variant="outlined" color="info" @click="handleclose"> Close </v-btn>
					<v-spacer></v-spacer>
					<v-btn :loading="loading" :disabled="loading" class="bg-primary text-white" type="submit">Submit</v-btn>
				</v-card-actions>
			</v-card>
		</form>
    </v-dialog>
  </div>
</template>
<script setup>
import nuxtStorage from 'nuxt-storage'; 
const props = defineProps({
	show: {
		type: Boolean,
		default: () => false,
		required: false,
	},
	loading: {
		type: Boolean,
		default: () => false,
		required: false,
	},
	payload: {
		type: Object,
		default: () => {},
		required: false,
	},
	error_msg:{
		type: String,
		default: () => '',
		required: false,
	}
});
const emits = defineEmits(["close", "submit"]);
const showPassword = ref(false);
const user_detail = ref({});
const roleID = ref('');

const handleclose = () => {
	emits("close");
};


const handleSubmit = (payload) => {
	emits("submit", payload);
};

onMounted(() => {
    const userDetails = JSON.parse(nuxtStorage.localStorage.getData('user_details') || '{}');
    user_detail.value = userDetails;
    
    roleID.value = user_detail.value?.role_id;
    console.log(roleID);
});
</script>
