<template>
    <div class="container">
        <h2>Login</h2>
        <form @submit.prevent="login" class="form">
            <div v-if="error" class="error">
                <p>{{ error }}</p>
            </div>
            <input type="email"
                   v-model="email"
                   :class="{'input-error': submitted && !email}"
                   placeholder="Email"
                   class="input"
                   name="email"
                   autocomplete="email">
            <div class="password-container">
                <input :type="showPassword ? 'text' : 'password'"
                       v-model="password"
                       :class="{'input-error': submitted && !password}"
                       placeholder="Password"
                       class="input password"
                       name="password"
                       autocomplete="current-password">
                <img :src="showPassword ? EyeOpen : EyeClosed" class="eye-icon" @click="showPassword = !showPassword">
            </div>
            <button type="submit" class="button" :disabled="loading">
                <div v-if="loading" class="loader"></div>
                <span v-else>Login</span>
            </button>
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
import { getDoc, doc } from 'firebase/firestore';
import { db } from '@/firebase';

import EyeOpen from '@/assets/eye-open.svg';
import EyeClosed from '@/assets/eye-closed.svg';

const auth = getAuth();
const store = useStore(); // access Vuex store
const router = useRouter(); // access vue-router

const email = ref('');
const password = ref('');
const error = ref(''); // initialized with empty string for consistency
const showPassword = ref(false); // new state for toggling password visibility
const loading = ref(false); // manage loading state
const submitted = ref(false); // New state to track if the form has been submitted

const login = async () => {
    submitted.value = true; // Mark the form as submitted to trigger validations
    error.value = ''; // Reset error message before attempting to log in

    if (!email.value || !password.value) {
        error.value = "Please fill in all fields.";
        return;
    }

    loading.value = true;

    try {
        const userCredential = await signInWithEmailAndPassword(auth, email.value, password.value);
        const docSnap = await getDoc(doc(db, 'users', userCredential.user.uid));

        if (docSnap.exists()) {
            store.commit('setUser', userCredential.user);
            store.commit('setRole', docSnap.data().role); // set role in Vuex store

            // redirect based on role
            const userRole = docSnap.data().role;
            redirectToDashboard(userRole);
        } else {
            // Handle error
            error.value = "Login failed. Please try again.";
        }
    } catch (err) {
        error.value = "Failed to log in. Please check your credentials and try again.";
    } finally {
        loading.value = false;
    }
};

function redirectToDashboard(role)
{
    if (role === 'landlord')
        router.push('/landlord-dashboard');
    else if (role === 'tenant')
        router.push('/tenant-dashboard');
    else if (role === 'caretaker')
        router.push('/caretaker-dashboard');
}
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
    font-family: Arial, Helvetica, sans-serif; /* ensure consistent font */
}

.input.password {
    padding-right: 120px; /* to make room for eye icon */
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
    display: flex;
    justify-content: center;
    align-items: center;
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

.loader {
    border: 3px solid rgba(255, 255, 255, 0.3);
    border-top: 3px solid #ffffff; /* Change the color as needed */
    border-radius: 50%;
    width: 14px;
    height: 14px;
    animation: spin 0.8s linear infinite;
    display: inline-block;
    vertical-align: middle;
}

@keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
}

.button:disabled {
    background-color: #007BFF;
    opacity: 0.5;
    cursor: default;
}

.input-error {
    border: 2px solid red;
}
</style>