<template>
    <div>
        <h2>Register</h2>
        <form @submit.prevent="register">
            <div v-if="error">
                <p>{{ error }}</p>
            </div>
            <input type="email" v-model="email" placeholder="Email">
            <input type="password" v-model="password" placeholder="Password">
            <button type="submit">Register</button>
        </form>
    </div>
</template>

<script>
import { ref } from 'vue';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';

const auth = getAuth();

export default {
    setup() {
        const email = ref('');
        const password = ref('');
        const error = ref(null);
        const store = useStore(); // access Vuex Store
        const router = useRouter(); // access Vue Router

        const register = async () => {
            try {
                const userCredential = await createUserWithEmailAndPassword(auth, email.value, password.value);
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
            error,
            register
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