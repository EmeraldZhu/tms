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
import { auth } from '../firebase';

export default {
    data() {
        return {
            email: '',
            password: '',
            error: null
        };
    },
    methods: {
        async register() {
            try {
                const userCredential = await auth.createUserWithEmailAndPassword(this.email, this.password);
                // Handle successful registration (store user state, redirect to home page)
                this.$store.commit('setUser', userCredential.user)
                this.$router.push('/') // redirect to home page
            } catch (error) {
                this.error = error.message;
            }
        }
    }
}
</script>