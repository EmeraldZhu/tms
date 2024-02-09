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
        async login() {
            try {
                const userCredential = await auth.signInWithEmailAndPassword(this.email, this.password);

                // Handle successful login (store user state, redirect to home page)
                this.$store.commit('setUser', userCredential.user)
                this.$router.push('/') // redirect to home page
                // console.log('Logged in successfully:', userCredential.user); 
            } catch (error) {
                this.error = error.message;
            }
        }
    }
}
</script>