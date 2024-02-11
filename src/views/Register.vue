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
import { ref, onMounted } from 'vue';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';

const auth = getAuth();

export default {
    setup() {
        const email = ref('');
        const password = ref('');
        const error = ref(null);

        const register = async () => {
            try {
                const userCredential = await createUserWithEmailAndPassword(auth, email.value, passsword.value);
                // Handle successful registration (store user state, redirect to home page)
                this.$store.commit('setUser', userCredential.user);
                this.$router.push('/'); // redirect to home page
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