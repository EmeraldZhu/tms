<template>
    <div class="container">
        <h2>Login</h2>
        <form @submit.prevent="login" class="form">
            <div v-if="error" class="error">
                <p>{{ error }}</p>
            </div>
            <input type="email" v-model="email" placeholder="Email" class="input">
            <input type="password" v-model="password" placeholder="Password" class="input">
            <button type="submit" class="button">Login</button>
        </form>
        <p class="register-link">
            Don't have an account? <RouterLink to="/register">Register</RouterLink>
        </p>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';

const auth = getAuth();
const store = useStore(); // access Vuex store
const router = useRouter(); // access vue-router

const email = ref('');
const password = ref('');
const error = ref(null);

const login = async () => {
    try {
        const userCredential = await signInWithEmailAndPassword(auth, email.value, password.value);
        store.commit('setUser', userCredential.user);
        router.push('/home'); // redirect to home page
    } catch (error) {
        error.value = error.message;
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
    background: linear-gradient(to right, #ff9966, #ff5e62);
    font-family: Arial, sans-serif;
}

.form {
    display: flex;
    flex-direction: column;
    width: 300px;
    padding: 20px;
    border-radius: 10px;
    background: white;
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
}

.input {
    margin-bottom: 10px;
    padding: 10px;
    border-radius: 5px;
    border: 1px solid #ccc;
}

.button {
    padding: 10px;
    border-radius: 5px;
    border: none;
    background-color: #007BFF;
    color: white;
    cursor: pointer;
    transition: background-color 0.3s ease;
}

.button:hover {
    background-color: #0056b3;
}

.error {
    color: red;
    margin-bottom: 10px;
}

.register-link {
    margin-top: 10px;
    text-align: center;
}
</style>