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