<template>
    <div class="container">
        <div>
            <img class="img" src="/public/login-img-asset.svg" alt="Hospital IMG SVG" />
        </div>
        <div>
            <h2 class="header">Hospital Information System</h2>
            <v-card class="card">
                <v-form>
                    <v-text-field
                    class="input"
                    variant="outlined"
                    clearable
                    append-inner-icon="mdi-account"
                    type="text"
                    :rules="[(v) => !!v || 'Username is required']"
                    label="Username"
                    placeholder="Enter your id as username"
                    v-model="user.idnumber"
                    ></v-text-field>   
                    
                    <v-text-field
                    class="input"
                    variant="outlined"
                    clearable
                    label="Password"
                    placeholder="Enter your password"
                    :append-inner-icon="showPassword ? 'mdi-eye-off':'mdi-eye'"
                    name="password"
                    :rules="[(v) => !!v || 'Password is required']"
                    :type="showPassword ? 'text':'password'"
                    v-model="user.password"
                    @keypress.enter="login"
                    @click:append-inner="showPassword = !showPassword"
                    ></v-text-field>
                    <v-checkbox
                        class="mt-0 mb-0"
                        color="#117dad"
                        hide-details
                        density="compact"
                        label="Remember me"
                        v-model="rememberMe"
                        @change="handleRememberMe"
                    ></v-checkbox>
                    <br/>
                    <v-btn
                        :disabled="!user.idnumber || !user.password"
                        block
                        type="submit"
                        color="#107bac"
                        size="large"
                        variant="elevated"
                        :loading="isLoading"
                        @click.prevent="login"
                    >
                        Login
                    </v-btn>
                </v-form>
            </v-card>
        </div>
    </div>
    <Snackbar />
</template>

<script setup>
import { storeToRefs } from 'pinia'; // import storeToRefs helper hook from pinia
import { useAuthStore } from '~/store/auth'; // import the auth store we just created
const { authenticateUser } = useAuthStore(); // use authenticateUser action from  auth store

const { authenticated } = storeToRefs(useAuthStore()); // make authenticated state reactive with storeToRefs
const user = ref({
    idnumber: '', 
    password: '',
});
const router = useRouter();
const showPassword = ref(false);
const isLoading = ref(false);
const rememberMe = ref(false);

const login = async () => {
    try {
        isLoading.value = true;
        await authenticateUser(user.value); 
        if (authenticated.value) {
            isLoading.value = false;
            useSnackbar(true, "success", "Login successful. Redirecting...");
            router.push({ path: "/dashboard" });
        } else {
            return useSnackbar(true, "error", "Invalid credentials. Please try again");
        }
    } catch(error) {
        console.error(error);
        return useSnackbar(true, "error", "An error occurred. Please try again");
    } finally {
        isLoading.value = false;
    }
};

const handleRememberMe = () => {
    if (rememberMe.value) {
        localStorage.setItem('idnumber', user.value.idnumber);
        localStorage.setItem('password', user.value.password);
    } else {
        localStorage.removeItem('idnumber');
        localStorage.removeItem('password');
    }
}

watchEffect(() => {
    if (rememberMe.value) {
        localStorage.setItem('idnumber', user.value.idnumber);
        localStorage.setItem('password', user.value.password);
    }
})


onMounted(() => {
    const rememberMeId = localStorage.getItem('idnumber');
    const rememberMePassword = localStorage.getItem('password');
    if (rememberMeId && rememberMePassword) {
        user.value.idnumber = rememberMeId;
        user.value.password = rememberMePassword;
        rememberMe.value = true;
    }
})

</script>

<style scoped>
.container {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    height: 100vh;
    gap: 60px;
    font-family: 'Montserrat', sans-serif;
}
.img {
    width: 450px;
    height: auto;
}
.header {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 25px;
}
.card {
    padding: 25px;
    border: 0.75px solid #ccc;
    border-radius: 10px;
}
.input {
    width: 400px;
}
.error-class{
    color: red;
}
@media (max-width: 1024px) {
    .container {
        gap: 15px;
    }
    .img {
        width: 400px;
    }
    .card {
        padding: 20px;
    }
}
@media (max-width: 768px) {
    .container {
        flex-direction: column;
    }
    .img {
        width: 300px;
    }
    .card {
        padding: 15px;
    }
}
</style>
