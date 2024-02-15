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
</script>