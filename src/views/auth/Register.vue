<template>
    <div class="container">
        <h2>Register</h2>
        <form @submit.prevent="register" class="form">
            <div v-if="error" class="error">
                <p>{{ error }}</p>
            </div>
            <input type="email" v-model="email" placeholder="Email" class="input" name="email" autocomplete="email">
            <div class="password-container">
                <input :type="showPassword ? 'text' : 'password'" v-model="password" placeholder="Password" class="input password" name="password" autocomplete="new-password">
                <!-- <span class="eye-icon" @click="showPassword = !showPassword">{{ showPassword ? 'Hide' : 'Show' }}</span> -->
                <img :src="showPassword ? EyeOpen : EyeClosed" class="eye-icon" @click="showPassword = !showPassword">
            </div>
            <select v-model="role" class="" name="role">
                <option disabled value="">Select Role</option>
                <option value="landlord">Landlord</option>
                <option value="tenant">Tenant</option>
            </select>
            <button type="submit" class="button">Register</button>
        </form>
    </div>
</template>

<script>
import { ref } from 'vue';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
import { setDoc, doc } from 'firebase/firestore';
import { db } from '@/firebase';

import EyeOpen from '@/assets/eye-open.svg';
import EyeClosed from '@/assets/eye-closed.svg'

const auth = getAuth();

export default {
    setup() {
        const email = ref('');
        const password = ref('');
        const role = ref('');
        const error = ref(null);
        const showPassword = ref(false); // new state for toggling password visibility
        const store = useStore(); // access Vuex Store
        const router = useRouter(); // access Vue Router

        const register = async () => {
            try {
                const userCredential = await createUserWithEmailAndPassword(auth, email.value, password.value);
                await setDoc(doc(db, 'users', userCredential.user.uid), {
                    role: role.value,
                });
                // Handle successful registration (store user state, redirect to home page)
                store.commit('setUser', userCredential.user);
                router.push('/'); // redirect to home page
            } catch (err) {
                error.value = err.message;
            }
        };

        return {
            email,
            password,
            role,
            error,
            register,
            showPassword,
            EyeOpen,
            EyeClosed
        };
    }
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
    padding-right: 120px;
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
</style>