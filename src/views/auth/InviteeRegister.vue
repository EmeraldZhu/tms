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

            </div>
            <button type="submit" class="button">Register</button>
        </form>
    </div>
</template>