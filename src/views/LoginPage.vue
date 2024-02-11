<template>
    <div>
        <h2>Login</h2>
        <form @submit.prevent="login">
            <div v-if="error">
                <p>{{ error }}</p>
            </div>
            <input type="email" v-model="email" placeholder="Email">
            <input type="password" v-model="password" placeholder="Password">
            <button type="submit">Login</button>
        </form>
        <p>
            Don't have an account? <RouterLink to="/register">Register</RouterLink>
        </p>
    </div>
</template>

<script>
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
        router.push('/'); // redirect to home page
    } catch (error) {
        error.value = error.message;
    }
};
</script>