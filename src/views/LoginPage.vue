<template>
    <div class="container">
        <h2>Login</h2>
        <form @submit.prevent="login" class="form">
            <div v-if="error" class="error">
                <p>{{ error }}</p>
            </div>
            <input type="email" v-model="email" placeholder="Email" class="input">
            <div class="password-container">
                <input :type="showPassword ? 'text' : 'password'" v-model="password" placeholder="Password" class="input">
                <!-- <span class="eye-icon" @click="showPassword = !showPassword">{{ showPassword ? 'Hide' : 'Show' }}</span> -->
                <img :src="showPassword ? EyeOpen : EyeClosed" class="eye-icon" @click="showPassword = !showPassword">
            </div>
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

import EyeOpen from '@/assets/eye-open.svg';
import EyeClosed from '@/assets/eye-closed.svg';

const auth = getAuth();
const store = useStore(); // access Vuex store
const router = useRouter(); // access vue-router

const email = ref('');
const password = ref('');
const error = ref(null);
const showPassword = ref(false); // new state for toggling password visibility

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
    padding-right: 120px; /* to make room for eye icon */
    border-radius: 5px;
    border: 1px solid #ccc;
    font-family: Arial, Helvetica, sans-serif; /* ensure consistent font */
}

.password-container {
    position: relative;
}

.eye-icon {
    position: absolute;
    right: 10px;
    top: 50%;
    transform: translateY(-50%);
    cursor: pointer;
    width: 30px;
    height: 30px;
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