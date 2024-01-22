<template>
    <div class="container">
        <h2 class="header">Hospital Information System</h2>
        <v-card class="card">
            <v-form @submit.prevent="login">
                <v-text-field
                    class="input"
                    clearable
                    label="Username"
                    placeholder="Enter your id as username"
                ></v-text-field>

                <v-text-field
                    class="input"
                    clearable
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
const router = useRouter();

function login() {
    router.push({ path: "/dashboard" });
}
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
