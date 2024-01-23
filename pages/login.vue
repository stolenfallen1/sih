<template>
    <div class="container">
        <h2 class="header">Hospital Information System</h2>
        <v-card class="card">
            <v-form @submit.prevent="login">
                <v-text-field
                    class="input"
                    clearable
                    v-model="user.idnumber"
                    label="Username"
                    placeholder="Enter your id as username"
                ></v-text-field>

                <v-text-field
                    class="input"
                    clearable
                    v-model="user.password"
                    type="password"
                    label="Password"
                    placeholder="Enter your password"
                ></v-text-field>

                <br />

                <v-btn
                    block
                    type="submit"
                    color="info"
                    size="large"
                    variant="elevated"
                >
                    Login
                </v-btn>
            </v-form>
        </v-card>
    </div>
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

const login = async () => {
  await authenticateUser(user.value); // call authenticateUser and pass the user object
  // redirect to homepage if user is authenticated
  if (authenticated) {
    router.push({ path: "/dashboard" });
  }
};

</script>

<style scoped>
.container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100vh;
}
.header {
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
</style>
