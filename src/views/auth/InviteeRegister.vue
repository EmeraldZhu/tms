<template>
    <div class="container">
        <h2>Register</h2>
        <form @submit.prevent="register" class="form">
            <div v-if="error" class="error">
                <p>{{ error }}</p>   
            </div>
            <input type="email"  v-model="email" placeholder="Email" class="input" name="email" autocomplete="email" readonly>
            <div class="password-container">
                <input :type="showPassword ? 'text' : 'password'" v-model="password" placeholder="Password" class="input password" name="password" autocomplete="new-password">
                <img :src="showPassword ? EyeOpen : EyeClosed" class="eye-icon" @click="showPassword = !showPassword">
            </div>
            <button type="submit" class="button">Register</button>
        </form>
    </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { useStore } from 'vuex';
import { useRouter, useRoute } from 'vue-router';
import { setDoc, doc, deleteDoc } from 'firebase/firestore';
import { db } from '@/firebase';

import EyeOpen from '@/assets/eye-open.svg';
import EyeClosed from '@/assets/eye-closed.svg';

const auth = getAuth();

export default {
    setup() {
        const route = useRoute();
        const email = ref('');
        const password = ref('');
        const role = ref(null);
        const error = ref(null);
        const showPassword = ref(false); // new state for toggling password visibility
        const store = useStore(); // access Vuex Store
        const router = useRouter(); // access Vue Router

        onMounted(async () => {
            const docSnap = await getDoc(doc(db, 'invitations', route.query.id));

            if (docSnap.exists()) {
                email.value = docSnap.data().email;
                role.value = docSnap.data().role;
            } else {
                // Handle invitation link
            }
        });

        const register = async () => {
            try {
                const userCredential = await createUserWithEmailAndPassword(auth, email.value, password.value);
                await setDoc(doc(db, 'users', userCredential.user.uid), {
                    role: role.value,
                });
                await deleteDoc(doc(db, 'invitations', route.query.id));

                // handle successful registration (store user state, redir to home page)
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
            register,
            showPassword,
            EyeOpen,
            EyeClosed
        };
    }
}
</script>